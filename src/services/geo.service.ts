import { z } from "zod";
import axios from "axios";
import type { City } from "@/types/city";

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

const NominatimItem = z.object({
  display_name: z.string(),
  lat: z.string(),
  lon: z.string(),
  address: z.object({
    city: z.string().optional(),
    town: z.string().optional(),
    village: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    country_code: z.string().optional(),
  }).optional(),
});

export async function searchCities(q: string, limit = 8): Promise<City[]> {
  if (!q.trim()) return [];
  const { data } = await axios.get(NOMINATIM, {
    params: { format: "json", q, limit, addressdetails: 1 },
    headers: { "Accept-Language": "en,fr", "User-Agent": "CityPulse/1.0" },
  });
  const arr = z.array(NominatimItem).parse(data);
  return arr.map((it, i) => {
    const name = it.address?.city || it.address?.town || it.address?.village || it.display_name.split(",")[0].trim();
    const country = it.address?.country || "";
    const lat = Number(it.lat);
    const lon = Number(it.lon);
    return {
      id: `${i}-${lat.toFixed(4)}-${lon.toFixed(4)}`, // pas utilisé pour la route, juste clé UI
      name,
      country,
      lat,
      lon,
    } satisfies City;
  });
}
