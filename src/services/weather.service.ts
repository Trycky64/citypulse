import { z } from "zod";
import type { WeatherSummary } from "@/types/weather";
import { http } from "./http";

const NowSchema = z.object({ temp: z.number(), feels: z.number(), icon: z.string().optional() });
const DailySchema = z.object({ date: z.string(), tMin: z.number(), tMax: z.number(), precipMm: z.number() });
const WeatherSchema = z.object({ now: NowSchema, daily: z.array(DailySchema) });

export async function getWeather(lat: number, lon: number): Promise<WeatherSummary> {
  const { data } = await http.get(`/api/weather`, { params: { lat, lon } });
  return WeatherSchema.parse(data);
}
