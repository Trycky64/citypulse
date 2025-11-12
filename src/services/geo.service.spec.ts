import { describe, it, expect, vi } from "vitest";
import * as geo from "./geo.service";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: any };

describe("geo.service", () => {
  it("mappe correctement les résultats Nominatim", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({
      data: [
        { display_name: "Paris, Île-de-France, France", lat: "48.8566", lon: "2.3522", address: { city: "Paris", country: "France" } }
      ]
    });
    const r = await geo.searchCities("paris");
    expect(r[0].name).toBe("Paris");
    expect(r[0].country).toBe("France");
  });
});
