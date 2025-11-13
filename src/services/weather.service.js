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
    const resp = await http.get("/api/weather", { params: { lat, lon } });
    const data = (resp === null || resp === void 0 ? void 0 : resp.data) || {};
            let p;
            try {
                p = Schema.parse(data);
            }
            catch (e) {
                const d = data || {};
                p = {
                    current: {
                        temperature_2m: Number((d.current === null || d.current === void 0 ? void 0 : d.current.temperature_2m) ?? (d.current === null || d.current === void 0 ? void 0 : d.current.temp) ?? 0),
                        apparent_temperature: (d.current === null || d.current === void 0 ? void 0 : d.current.apparent_temperature) ?? (d.current === null || d.current === void 0 ? void 0 : d.current.feels) ?? null,
                    },
                    hourly: {
                        time: Array.isArray(d.hourly === null || d.hourly === void 0 ? void 0 : d.hourly.time) ? d.hourly.time : [],
                        temperature_2m: Array.isArray(d.hourly === null || d.hourly === void 0 ? void 0 : d.hourly.temperature_2m) ? d.hourly.temperature_2m : [],
                        precipitation: Array.isArray(d.hourly === null || d.hourly === void 0 ? void 0 : d.hourly.precipitation) ? d.hourly.precipitation : [],
                    },
                    daily: {
                        time: Array.isArray(d.daily === null || d.daily === void 0 ? void 0 : d.daily.time) ? d.daily.time : [],
                        temperature_2m_max: Array.isArray(d.daily === null || d.daily === void 0 ? void 0 : d.daily.temperature_2m_max) ? d.daily.temperature_2m_max : [],
                        temperature_2m_min: Array.isArray(d.daily === null || d.daily === void 0 ? void 0 : d.daily.temperature_2m_min) ? d.daily.temperature_2m_min : [],
                        precipitation_sum: Array.isArray(d.daily === null || d.daily === void 0 ? void 0 : d.daily.precipitation_sum) ? d.daily.precipitation_sum : [],
                    },
                };
            }
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

export async function getWeatherSummary(lat, lon) {
    const w = await getWeather(lat, lon);
    return {
        current: {
            temperature: w.now.temp,
            feelsLike: w.now.feels,
        },
        daily: {
            max: (w.daily[0] && w.daily[0].tMax) || NaN,
            min: (w.daily[0] && w.daily[0].tMin) || NaN,
        },
        hourly: w.hourly.map((h) => ({ time: h.time, temperature: h.temp, precipMm: h.precipMm })),
    };
}
