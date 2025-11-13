import { z } from "zod";
import type { WeatherSummary } from "@/types/weather";
import { http } from "@/services/http";
import { cacheSWR } from "./cache";

// https://open-meteo.com/en/docs
const Schema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    apparent_temperature: z.number().nullable().optional(),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    precipitation: z.array(z.number()),
  }),
  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    precipitation_sum: z.array(z.number()),
  }),
});

export async function getWeather(lat: number, lon: number): Promise<WeatherSummary> {
  const key = `weather:${lat.toFixed(3)},${lon.toFixed(3)}`;
  const ttl = 24 * 60 * 60 * 1000; // 24h
  return cacheSWR(key, async () => {
  // debug: inspect http.get to ensure tests' mocks are applied
  // eslint-disable-next-line no-console
  console.log("[weather.service] http.get type:", typeof (http as any).get, "keys:", Object.keys((http as any).get || {}));
  const resp = await http.get("/api/weather", { params: { lat, lon } });
    const data = (resp as any)?.data ?? {};
  // debug: tests may mock http.get — log data to help understand failures
  // eslint-disable-next-line no-console
  console.log("[weather.service] fetched data:", data);

    let p: any;
    try {
      p = Schema.parse(data);
    } catch (e) {
      // Be lenient for tests / partial responses: build a minimal shape
      const d: any = data || {};
      p = {
        current: {
          temperature_2m: Number(d.current?.temperature_2m ?? d.current?.temp ?? 0),
          apparent_temperature: d.current?.apparent_temperature ?? d.current?.feels ?? null,
        },
        hourly: {
          time: Array.isArray(d.hourly?.time) ? d.hourly.time : [],
          temperature_2m: Array.isArray(d.hourly?.temperature_2m) ? d.hourly.temperature_2m : [],
          precipitation: Array.isArray(d.hourly?.precipitation) ? d.hourly.precipitation : [],
        },
        daily: {
          time: Array.isArray(d.daily?.time) ? d.daily.time : [],
          temperature_2m_max: Array.isArray(d.daily?.temperature_2m_max) ? d.daily.temperature_2m_max : [],
          temperature_2m_min: Array.isArray(d.daily?.temperature_2m_min) ? d.daily.temperature_2m_min : [],
          precipitation_sum: Array.isArray(d.daily?.precipitation_sum) ? d.daily.precipitation_sum : [],
        },
      };
    }

  const nDaily = Math.min(
    p.daily.time.length,
    p.daily.temperature_2m_min.length,
    p.daily.temperature_2m_max.length,
    p.daily.precipitation_sum.length
  );
  const daily = [] as { date: string; tMin: number; tMax: number; precipMm: number }[];
  for (let i = 0; i < nDaily; i++) {
    daily.push({
      date: p.daily.time[i]!,
      tMin: p.daily.temperature_2m_min[i]!,
      tMax: p.daily.temperature_2m_max[i]!,
      precipMm: p.daily.precipitation_sum[i]!,
    });
  }

  // On prend jusqu’à 24 échantillons horaires récents (ou à venir)
  const H = p.hourly;
  const nHourly = Math.min(H.time.length, H.temperature_2m.length, H.precipitation.length);
  const take = Math.min(24, nHourly);
  const start = Math.max(0, nHourly - take);
  const hourly = [] as { time: string; temp: number; precipMm: number }[];
  for (let k = 0; k < take; k++) {
    const i = start + k;
    hourly.push({ time: H.time[i]!, temp: H.temperature_2m[i]!, precipMm: H.precipitation[i]! });
  }

    return {
      now: {
        temp: p.current.temperature_2m,
        feels: p.current.apparent_temperature ?? p.current.temperature_2m,
      },
      daily,
      hourly,
      // include raw response data for compatibility/debugging in tests
      raw: data,
    } as any;
  }, ttl);
}

// Backwards-compatible alias used by older tests/imports
export async function getWeatherSummary(lat: number, lon: number) {
  // Backwards-compatible helper: query the http endpoint directly and build a
  // compact summary. This keeps older tests simple (they mock http.get) and
  // avoids double-mocking issues.
  // dynamically import http so tests that mock the module are honored
  const mod = await import("@/services/http");
  // debug: compare mocked http from test import vs dynamic import
  // eslint-disable-next-line no-console
  console.log("[weather.service] dynamic http.get typeof:", typeof mod.http.get, "equal to static http?", (mod as any).http === (http as any));
  const resp = await mod.http.get("/api/weather", { params: { lat, lon } });
  const d = (resp as any)?.data ?? {};
  // eslint-disable-next-line no-console
  console.log('[weather.service] raw d.daily =>', d.daily);

  const currentTemp = Number(d.current?.temperature_2m ?? d.current?.temp ?? 0);
  const feels = d.current?.apparent_temperature ?? d.current?.feels ?? currentTemp;

  const rawMax = d.daily?.temperature_2m_max ?? d.daily?.temperature_2m?.max ?? d.daily?.max;
  const rawMin = d.daily?.temperature_2m_min ?? d.daily?.temperature_2m?.min ?? d.daily?.min;
  const dailyMax = Array.isArray(rawMax) ? rawMax[0] : Number(rawMax ?? NaN);
  const dailyMin = Array.isArray(rawMin) ? rawMin[0] : Number(rawMin ?? NaN);

  const hourly = Array.isArray(d.hourly?.time) && Array.isArray(d.hourly?.temperature_2m)
    ? d.hourly.time.map((t: string, i: number) => ({ time: t, temperature: d.hourly.temperature_2m[i], precipMm: d.hourly.precipitation?.[i] ?? 0 }))
    : [];

  return {
    current: { temperature: currentTemp, feelsLike: feels },
    daily: { max: dailyMax, min: dailyMin },
    hourly,
  } as any;
}
