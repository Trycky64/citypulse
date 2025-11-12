import { z } from "zod";
import type { AirQuality } from "@/types/air";
import axios from "axios";

/**
 * On utilise l'API Air Quality d'Open-Meteo (CORS OK, pas de clé).
 * https://open-meteo.com/en/docs/air-quality-api
 *
 * Paramètres utiles : pm2_5, pm10, nitrogen_dioxide, ozone (hourly)
 */

const OpenMeteoAqSchema = z.object({
  hourly: z.object({
    time: z.array(z.string()),
    pm2_5: z.array(z.number()).nullable().optional(),
    pm10: z.array(z.number()).nullable().optional(),
    nitrogen_dioxide: z.array(z.number()).nullable().optional(),
    ozone: z.array(z.number()).nullable().optional(),
  })
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
  const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: "pm2_5,pm10,nitrogen_dioxide,ozone",
      timezone: "auto"
    },
  });

  const parsed = OpenMeteoAqSchema.parse(data);
  const H = parsed.hourly;
  const len = H.time.length;

  // On prend ~24 derniers points (si disponibles)
  const take = Math.min(24, len);
  const start = Math.max(0, len - take);

  const samples = Array.from({ length: take }, (_, k) => {
    const i = start + k;
    return {
      time: H.time[i],
      pm25: H.pm2_5?.[i] ?? undefined,
      pm10: H.pm10?.[i] ?? undefined,
      no2:  H.nitrogen_dioxide?.[i] ?? undefined,
      o3:   H.ozone?.[i] ?? undefined,
    };
  });

  const lastPM25 = samples.slice().reverse().find(s => s.pm25 != null)?.pm25;
  const category = categoryFromPM25(lastPM25);
  const aqiApprox = lastPM25 == null ? 60 : Math.round(Math.min(500, lastPM25 * 4)); // approx visuelle

  return { aqi: aqiApprox, category, samples };
}
