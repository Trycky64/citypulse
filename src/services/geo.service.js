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
        // If the response is a JSON string, parse it
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
            // Try to tolerate Nominatim-like responses (raw items with lat/lon and address)
            if (Array.isArray(raw)) {
                try {
                    const maybe = raw.map((it) => {
                        const lat = it.lat !== undefined ? Number(it.lat) : undefined;
                        const lon = it.lon !== undefined ? Number(it.lon) : undefined;
                        const addr = it.address || {};
                        const name = addr.city || addr.town || addr.village || it.display_name || addr.county || "";
                        const country = addr.country || "";
                        const id = (it.place_id !== undefined && String(it.place_id)) || (it.osm_id && String(it.osm_id)) || `${lat},${lon}`;
                        return { id, name, country, lat, lon };
                    });
                    const reparsed = z.array(CitySchema).safeParse(maybe);
                    if (reparsed.success)
                        return reparsed.data;
                }
                catch (e) {
                    // fallthrough to default error
                }
            }

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
