import { z } from "zod";
import { http } from "./http";
import type { City } from "@/types/city";

const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
});

// On reçoit déjà des objets normalisés par le proxy : [{id,name,country,lat,lon}]
export async function searchCities(q: string, limit = 8): Promise<City[]> {
  if (!q.trim()) return [];
  const { data } = await http.get("/api/city/search", { params: { q, limit } });
  const arr = z.array(CitySchema).parse(data);
  return arr;
}
