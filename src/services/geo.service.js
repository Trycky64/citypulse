import { z } from "zod";
import { http } from "./http";
const CitySchema = z.object({
    id: z.string(),
    name: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
});
export async function searchCities(q, limit = 8) {
    if (!q.trim())
        return [];
    try {
        const { data } = await http.get("/api/city/search", { params: { q, limit } });
        let raw = data;
        // 🔧 Si c'est une string, on ne parse QUE si ça ressemble à du JSON
        if (typeof raw === "string") {
            const s = raw.trim();
            if (s.startsWith("[") || s.startsWith("{")) {
                try {
                    raw = JSON.parse(s);
                }
                catch (e) {
                    console.error("[CityPulse] /api/city/search: JSON.parse failed", e, s);
                    return [];
                }
            }
            else {
                console.error("[CityPulse] /api/city/search: non-JSON string response", s);
                return [];
            }
        }
        const parsed = z.array(CitySchema).safeParse(raw);
        if (!parsed.success) {
            console.error("[CityPulse] /api/city/search: invalid schema", parsed.error, raw);
            return [];
        }
        return parsed.data;
    }
    catch (err) {
        console.error("[CityPulse] /api/city/search: request failed", err);
        return [];
    }
}
