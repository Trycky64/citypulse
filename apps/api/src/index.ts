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
  return c.body(await res.text(), 200, { "content-type": "application/json" });
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

// Root sanity route
app.get("/", (c) => c.text("CityPulse API up"));

export default app;
