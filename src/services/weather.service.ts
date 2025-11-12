import { z } from "zod";
import type { WeatherSummary } from "@/types/weather";
import axios from "axios";

const OpenMeteoSchema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    apparent_temperature: z.number().optional(),
  }),
  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    precipitation_sum: z.array(z.number()),
  }),
});

export async function getWeather(lat: number, lon: number): Promise<WeatherSummary> {
  const url = "https://api.open-meteo.com/v1/forecast";
  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,apparent_temperature",
      daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
      timezone: "auto",
    },
  });
  const parsed = OpenMeteoSchema.parse(data);
  const daily = parsed.daily.time.map((date, i) => ({
    date,
    tMin: parsed.daily.temperature_2m_min[i],
    tMax: parsed.daily.temperature_2m_max[i],
    precipMm: parsed.daily.precipitation_sum[i],
  }));
  return {
    now: { temp: parsed.current.temperature_2m, feels: parsed.current.apparent_temperature ?? parsed.current.temperature_2m },
    daily,
  };
}
