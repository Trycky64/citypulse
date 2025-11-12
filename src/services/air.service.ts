import { z } from "zod";
import type { AirQuality } from "@/types/air";
import { http } from "./http";

const AQISchema = z.object({
  aqi: z.number(),
  category: z.enum(["Good","Moderate","Unhealthy","Very Unhealthy","Hazardous"]),
  samples: z.array(
    z.object({ time: z.string(), pm25: z.number().optional(), pm10: z.number().optional(), no2: z.number().optional(), o3: z.number().optional() })
  )
});

export async function getAirQuality(lat: number, lon: number): Promise<AirQuality> {
  const { data } = await http.get(`/api/air`, { params: { lat, lon } });
  return AQISchema.parse(data);
}
