import { z } from "zod";
import { http } from "./http";
import type { TeleportInfo } from "@/types/teleport";

const RespSchema = z.object({
  slug: z.string().nullable().optional(),
  scores: z.object({
    cityScore: z.number(),
    categories: z.array(z.object({ name: z.string(), score: z.number() })),
    summary: z.string().optional(),
  }).nullable().optional(),
  cost: z.object({
    currency: z.string().optional(),
    items: z.array(z.object({
      label: z.string(),
      value: z.number().nullable(),
      unit: z.string().optional(),
    })),
  }).nullable().optional(),
});

export async function getTeleportInfo(cityName: string): Promise<TeleportInfo> {
  const { data } = await http.get("/api/teleport", { params: { city: cityName } });
  return RespSchema.parse(data);
}
