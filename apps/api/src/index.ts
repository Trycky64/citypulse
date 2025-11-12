import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

const app = new Hono<{ Bindings: { ALLOWED_ORIGIN: string } }>();

// ✅ CORS: bonne signature (origin, c)
app.use("*", cors({
  origin: (origin, c) => c.env?.ALLOWED_ORIGIN ?? "*",
  allowMethods: ["GET"],
}));

// Rate-limit hyper simple (mémoire volatile par instance)
const buckets = new Map<string, { t: number; count: number }>();
app.use("*", async (c, next) => {
  const ip = c.req.header("CF-Connecting-IP") || "anon";
  const now = Date.now();
  const b = buckets.get(ip) ?? { t: now, count: 0 };
  if (now - b.t > 60_000) { b.t = now; b.count = 0; }
  b.count++;
  buckets.set(ip, b);
  if (b.count > 60) return c.text("Too Many Requests", 429);
  await next();
});

// Validators
const latlon = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});
const qSchema = z.object({ q: z.string().min(2).max(60) });

// /api/city/search → Nominatim
app.get("/api/city/search", async (c) => {
  const { q } = qSchema.parse(Object.fromEntries(new URL(c.req.url).searchParams));
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("q", q);
  url.searchParams.set("limit", "8");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url, {
    headers: { "Accept-Language": "en,fr", "User-Agent": "CityPulse/1.0" },
  } as RequestInit);
  const raw = await res.json();

  // Normalisation
  const out = raw.map((it: any, i: number) => {
    const name = it.address?.city || it.address?.town || it.address?.village || (it.display_name?.split(",")[0] ?? "").trim();
    const country = it.address?.country ?? "";
    const lat = Number(it.lat);
    const lon = Number(it.lon);
    return { id: `${i}-${lat.toFixed(4)}-${lon.toFixed(4)}`, name, country, lat, lon };
  });

  return c.json(out);
});

// /api/weather → Open-Meteo
app.get("/api/weather", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const { lat, lon } = latlon.parse(params);
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "temperature_2m,apparent_temperature");
  url.searchParams.set("hourly", "temperature_2m,precipitation");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum");
  url.searchParams.set("timezone", "auto");
  const res = await fetch(url);
  return c.body(await res.text(), 200, { "content-type": "application/json" });
});

// /api/air → Open-Meteo AQ
app.get("/api/air", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const { lat, lon } = latlon.parse(params);
  const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", "pm2_5,pm10,nitrogen_dioxide,ozone");
  url.searchParams.set("timezone", "auto");
  const res = await fetch(url);
  return c.body(await res.text(), 200, { "content-type": "application/json" });
});

// Teleport proxy
const UAIndexSchema = z.object({
  _links: z.object({
    "ua:item": z.array(z.object({ name: z.string(), href: z.string().url() })),
  }),
});
const ScoresSchema = z.object({
  teleport_city_score: z.number(),
  categories: z.array(z.object({ name: z.string(), score_out_of_10: z.number() })),
  summary: z.string().optional(),
});
const DetailsSchema = z.object({
  categories: z.array(z.object({
    id: z.string(),
    label: z.string(),
    data: z.array(z.object({
      id: z.string(),
      label: z.string(),
      currency_dollar_value: z.number().nullable().optional(),
      float_value: z.number().nullable().optional(),
      string_value: z.string().nullable().optional(),
    })),
  })),
});

function toSlugCandidate(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function resolveSlug(cityName: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.teleport.org/api/urban_areas/");
    const data = await res.json();
    const idx = UAIndexSchema.parse(data);
    const target = cityName.toLowerCase();
    const hit = idx._links["ua:item"].find(x => x.name.toLowerCase() === target)
      ?? idx._links["ua:item"].find(x => x.name.toLowerCase().includes(target));
    if (!hit) return null;
    const m = hit.href.match(/slug:([^/]+)\//);
    return m?.[1] ?? null;
  } catch {
    const s = toSlugCandidate(cityName);
    return s || null;
  }
}

app.get("/api/teleport", async (c) => {
  const name = new URL(c.req.url).searchParams.get("city") ?? "";
  if (!name || name.length < 2) return c.json({ slug: null, scores: null, cost: null });

  const slug = await resolveSlug(name);
  if (!slug) return c.json({ slug: null, scores: null, cost: null });

  const [scoresRes, detailsRes] = await Promise.allSettled([
    fetch(`https://api.teleport.org/api/urban_areas/slug:${slug}/scores/`),
    fetch(`https://api.teleport.org/api/urban_areas/slug:${slug}/details/`),
  ]);

  let scores: any = null;
  if (scoresRes.status === "fulfilled") {
    try {
      const raw = await scoresRes.value.json();
      const p = ScoresSchema.parse(raw);
      scores = {
        cityScore: Math.round(p.teleport_city_score * 10) / 10,
        categories: p.categories.map(c => ({ name: c.name, score: Math.round(c.score_out_of_10 * 10) / 10 })),
        summary: p.summary,
      };
    } catch {
      scores = null;
    }
  }

  let cost: any = null;
  if (detailsRes.status === "fulfilled") {
    try {
      const raw = await detailsRes.value.json();
      const p = DetailsSchema.parse(raw);
      const col = p.categories.find(c => c.id === "COST-OF-LIVING");
      cost = {
        currency: "USD",
        items: (col?.data ?? []).map(d => ({
          label: d.label,
          value: d.currency_dollar_value ?? d.float_value ?? null,
          unit: d.string_value ?? undefined,
        })),
      };
    } catch {
      cost = null;
    }
  }

  return c.json({ slug, scores, cost });
});

// Root sanity route
app.get("/", (c) => c.text("CityPulse API up"));

export default app;
