import { beforeEach, describe, expect, it, vi } from "vitest";
import { searchCities } from "@/services/geo.service";
import { http } from "@/services/http";

vi.mock("@/services/http", () => ({
  http: {
    get: vi.fn(),
  },
}));

describe("geo.service searchCities", () => {
  const mockedGet = http.get as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockedGet.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("returns [] when query is empty", async () => {
    const res = await searchCities("   ");
    expect(res).toEqual([]);
    expect(mockedGet).not.toHaveBeenCalled();
  });

  it("accepts the normalized API schema", async () => {
    mockedGet.mockResolvedValue({
      data: [
        {
          id: "paris",
          name: "Paris",
          country: "France",
          lat: 48.8566,
          lon: 2.3522,
        },
      ],
    });

    await expect(searchCities("Paris", 5)).resolves.toEqual([
      {
        id: "paris",
        name: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
      },
    ]);
    expect(mockedGet).toHaveBeenCalledWith("/api/city/search", {
      params: { q: "Paris", limit: 5 },
    });
  });

  it("normalizes a Nominatim-style response", async () => {
    mockedGet.mockResolvedValue({
      data: [
        {
          place_id: 123,
          lat: "48.8566",
          lon: "2.3522",
          address: { city: "Paris", country: "France" },
        },
      ],
    });

    const res = await searchCities("Paris");

    expect(res).toEqual([
      {
        id: "123",
        name: "Paris",
        country: "France",
        lat: 48.8566,
        lon: 2.3522,
      },
    ]);
  });

  it("parses JSON string responses", async () => {
    mockedGet.mockResolvedValue({
      data: JSON.stringify([
        {
          id: "bordeaux",
          name: "Bordeaux",
          country: "France",
          lat: 44.8378,
          lon: -0.5792,
        },
      ]),
    });

    const res = await searchCities("Bordeaux");

    expect(res[0]?.name).toBe("Bordeaux");
  });

  it("rejects malformed and non-JSON string responses", async () => {
    mockedGet.mockResolvedValueOnce({ data: "[invalid" });
    await expect(searchCities("X")).resolves.toEqual([]);

    mockedGet.mockResolvedValueOnce({ data: "<html>maintenance</html>" });
    await expect(searchCities("X")).resolves.toEqual([]);
  });

  it("handles invalid schemas and request failures", async () => {
    mockedGet.mockResolvedValueOnce({ data: { foo: "bar" } });
    await expect(searchCities("X")).resolves.toEqual([]);

    mockedGet.mockRejectedValueOnce(new Error("network"));
    await expect(searchCities("X")).resolves.toEqual([]);
  });
});
