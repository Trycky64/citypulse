import { z } from "zod";
import type { AirQuality } from "@/types/air";
import { http } from "./http";

// https://open-meteo.com/en/docs/air-quality-api
const Schema = z.object({
  hourly: z.object({
    time: z.array(z.string()),
    pm2_5: z.array(z.number()).nullable().optional(),
    pm10: z.array(z.number()).nullable().optional(),
    nitrogen_dioxide: z.array(z.number()).nullable().optional(),
    ozone: z.array(z.number()).nullable().optional(),
  }),
});

function categoryFromPM25(pm25?: number): AirQuality["category"] {
  if (pm25 == null) return "Moderate";
  if (pm25 <= 12) return "Good";
  if (pm25 <= 35.4) return "Moderate";
  if (pm25 <= 55.4) return "Unhealthy";
  if (pm25 <= 150.4) return "Very Unhealthy";
  return "Hazardous";
}

export async function getAirQuality(lat: number, lon: number): Promise<AirQuality> {
  const { data } = await http.get("/api/air", { params: { lat, lon } });

  const p = Schema.parse(data);
  const H = p.hourly;
  const n = H.time.length;
  const take = Math.min(24, n);
  const start = Math.max(0, n - take);

  const samples = [] as { time: string; pm25?: number; pm10?: number; no2?: number; o3?: number }[];
  for (let k = 0; k < take; k++) {
    const i = start + k;
    samples.push({
      time: H.time[i]!,
      pm25: H.pm2_5?.[i] ?? undefined,
      pm10: H.pm10?.[i] ?? undefined,
      no2: H.nitrogen_dioxide?.[i] ?? undefined,
      o3: H.ozone?.[i] ?? undefined,
    });
  }

  const lastPM25 = [...samples].reverse().find(s => s.pm25 != null)?.pm25;
  const category = categoryFromPM25(lastPM25);
  const aqiApprox = lastPM25 == null ? 60 : Math.round(Math.min(500, lastPM25 * 4));

  return { aqi: aqiApprox, category, samples };
}
