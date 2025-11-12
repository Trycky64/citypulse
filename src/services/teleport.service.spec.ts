import { describe, it, expect, vi } from "vitest";
import { getTeleportInfo } from "./teleport.service";
import { http } from "./http";

vi.mock("./http", () => {
  return {
    http: {
      get: vi.fn(),
    }
  };
});

describe("teleport.service", () => {
  it("parse la réponse complète", async () => {
    (http.get as any).mockResolvedValue({
      data: {
        slug: "paris",
        scores: { cityScore: 75.3, categories: [{ name: "Safety", score: 7.1 }] },
        cost: { currency: "USD", items: [{ label: "Coffee", value: 3.2, unit: "USD" }] }
      }
    });
    const res = await getTeleportInfo("Paris");
    expect(res.slug).toBe("paris");
  expect(res.scores?.categories[0]?.name).toBe("Safety");
  });

  it("graceful fallback", async () => {
    (http.get as any).mockResolvedValue({ data: { slug: null, scores: null, cost: null } });
    const res = await getTeleportInfo("Nowhere");
    expect(res.slug).toBeNull();
    expect(res.scores).toBeNull();
  });
});
