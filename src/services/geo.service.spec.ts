import { describe, it, expect, vi } from "vitest";
import * as geo from "./geo.service";
import { http } from "./http";

vi.mock("./http", () => ({
  http: { get: vi.fn() }
}));

describe("geo.service", () => {
  it("mappe correctement les résultats Nominatim", async () => {
    (http.get as any).mockResolvedValue({
      data: [
        { display_name: "Paris, Île-de-France, France", lat: "48.8566", lon: "2.3522", address: { city: "Paris", country: "France" } }
      ]
    });
    const r = await geo.searchCities("paris");
    expect(r.length).toBeGreaterThan(0);
    expect(r[0]!.name).toBeDefined();
  });
});
