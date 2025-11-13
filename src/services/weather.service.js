import { z } from "zod";
import { http } from "./http";
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
export async function getWeather(lat, lon) {
    const key = `weather:${lat.toFixed(3)},${lon.toFixed(3)}`;
    const ttl = 24 * 60 * 60 * 1000; // 24h
    return cacheSWR(key, async () => {
        const { data } = await http.get("/api/weather", { params: { lat, lon } });
        const p = Schema.parse(data);
        const nDaily = Math.min(p.daily.time.length, p.daily.temperature_2m_min.length, p.daily.temperature_2m_max.length, p.daily.precipitation_sum.length);
        const daily = [];
        for (let i = 0; i < nDaily; i++) {
            daily.push({
                date: p.daily.time[i],
                tMin: p.daily.temperature_2m_min[i],
                tMax: p.daily.temperature_2m_max[i],
                precipMm: p.daily.precipitation_sum[i],
            });
        }
        // On prend jusqu’à 24 échantillons horaires récents (ou à venir)
        const H = p.hourly;
        const nHourly = Math.min(H.time.length, H.temperature_2m.length, H.precipitation.length);
        const take = Math.min(24, nHourly);
        const start = Math.max(0, nHourly - take);
        const hourly = [];
        for (let k = 0; k < take; k++) {
            const i = start + k;
            hourly.push({ time: H.time[i], temp: H.temperature_2m[i], precipMm: H.precipitation[i] });
        }
        return {
            now: {
                temp: p.current.temperature_2m,
                feels: p.current.apparent_temperature ?? p.current.temperature_2m,
            },
            daily,
            hourly,
        };
    }, ttl);
}
