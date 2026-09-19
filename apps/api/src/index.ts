import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { z } from "zod";

const app = new Hono();
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "http://localhost:5173";

app.use(
  "*",
  cors({
    origin: allowedOrigin,
    allowMethods: ["GET"],
  }),
);

// ----------- SCHEMAS -----------
const qSchema = z.object({
  q: z.string().trim().min(1).max(100),
  limit: z.coerce.number().int().min(1).max(10).default(8),
});

const latlonSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

// ----------- ROUTE CITY SEARCH -----------
app.get("/api/city/search", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const parsed = qSchema.safeParse(params);
  if (!parsed.success) return c.json({ error: "Invalid query parameters" }, 400);
  const { q, limit } = parsed.data;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("q", q);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url.toString(), {
    headers: {
      "Accept-Language": "en,fr",
      "User-Agent": "CityPulse/1.0 (citypulse.quentinperriere.com)",
    },
  } as RequestInit);

  if (!res.ok) {
    return c.json([], 200);
  }

  const raw: unknown = await res.json();

  const out = (Array.isArray(raw) ? raw : []).map((item: unknown, i: number) => {
    const it = item as {
      address?: { city?: string; town?: string; village?: string; country?: string };
      display_name?: string;
      lat?: string | number;
      lon?: string | number;
    };
    const name =
      it.address?.city ||
      it.address?.town ||
      it.address?.village ||
      (it.display_name?.split(",")[0] ?? "").trim();

    const country = it.address?.country ?? "";
    const lat = Number(it.lat);
    const lon = Number(it.lon);

    return {
      id: `${i}-${lat.toFixed(4)}-${lon.toFixed(4)}`,
      name: name || "Unknown",
      country,
      lat,
      lon,
    };
  });

  return c.json(out);
});

// ----------- ROUTE WEATHER -----------
app.get("/api/weather", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const parsed = latlonSchema.safeParse(params);
  if (!parsed.success) return c.json({ error: "Invalid coordinates" }, 400);
  const { lat, lon } = parsed.data;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "temperature_2m,apparent_temperature");
  url.searchParams.set("hourly", "temperature_2m,precipitation");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
  if (!res.ok) return c.json({ error: "Weather provider unavailable" }, 502);
  const data = await res.json();
  return c.json(data);
});

// ----------- ROUTE AIR QUALITY -----------
app.get("/api/air", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const parsed = latlonSchema.safeParse(params);
  if (!parsed.success) return c.json({ error: "Invalid coordinates" }, 400);
  const { lat, lon } = parsed.data;

  const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", "pm2_5,pm10,nitrogen_dioxide,ozone");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
  if (!res.ok) return c.json({ error: "Air quality provider unavailable" }, 502);
  const data = await res.json();
  return c.json(data);
});

// ----------- PING ROOT -----------
app.get("/", (c) => c.text("CityPulse API OK"));

// ----------- LANCEMENT NODE -----------
const port = Number(process.env.PORT) || 8787;
console.log(`CityPulse API listening on http://127.0.0.1:${port}`);

serve({
  fetch: app.fetch,
  port,
});
