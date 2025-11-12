import { z } from "zod";
import type { AirQuality } from "@/types/air";
import axios from "axios";

const OpenAQSchema = z.object({
  results: z.array(z.object({
    parameter: z.string(),
    value: z.number(),
    date: z.object({ utc: z.string() }),
  })),
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
  const { data } = await axios.get("https://api.openaq.org/v2/measurements", {
    params: {
      coordinates: `${lat},${lon}`,
      radius: 10000,
      limit: 50,
      sort: "desc",
      order_by: "datetime",
    },
  });
  const parsed = OpenAQSchema.parse(data);

  // Regroupe quelques paramètres récents
  const samples = parsed.results.slice(0, 24).map((r) => ({
    time: r.date.utc,
    pm25: r.parameter === "pm25" ? r.value : undefined,
    pm10: r.parameter === "pm10" ? r.value : undefined,
    no2:  r.parameter === "no2"  ? r.value : undefined,
    o3:   r.parameter === "o3"   ? r.value : undefined,
  }));

  // calc AQI simplifié basé sur dernier PM2.5
  const lastPM25 = samples.find(s => s.pm25 != null)?.pm25;
  const category = categoryFromPM25(lastPM25);
  const aqiApprox = lastPM25 == null ? 60 : Math.round(Math.min(500, lastPM25 * 4)); // approximation visuelle

  return { aqi: aqiApprox, category, samples };
}
