import { z } from "zod";
import { http } from "./http";

const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
});
export type SearchCity = z.infer<typeof CitySchema>;

export async function searchCities(q: string): Promise<SearchCity[]> {
  if (!q?.trim()) return [];
  const { data } = await http.get(`/api/city/search`, { params: { q } });
  const arr = z.array(CitySchema).parse(data);
  return arr;
}
