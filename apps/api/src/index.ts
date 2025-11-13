import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { z } from "zod";

const app = new Hono();

// CORS : en vrai, comme on va être même origine (front + api), on pourrait le désactiver.
// Je laisse en mode permissif, ça ne gêne pas.
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
  }),
);

// ----------- SCHEMAS -----------
const qSchema = z.object({
  q: z.string().min(1),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 8)),
});

const latlonSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

// ----------- ROUTE CITY SEARCH -----------
app.get("/api/city/search", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const { q, limit } = qSchema.parse(params);

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

  const raw = await res.json();

  const out = (Array.isArray(raw) ? raw : []).map((it: any, i: number) => {
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
  const { lat, lon } = latlonSchema.parse(params);

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "temperature_2m,apparent_temperature");
  url.searchParams.set("hourly", "temperature_2m,precipitation");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
  const data = await res.json();
  return c.json(data);
});

// ----------- ROUTE AIR QUALITY -----------
app.get("/api/air", async (c) => {
  const params = Object.fromEntries(new URL(c.req.url).searchParams);
  const { lat, lon } = latlonSchema.parse(params);

  const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", "pm2_5,pm10,nitrogen_dioxide,ozone");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
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
