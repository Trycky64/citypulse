import { describe, it, expect, vi, beforeEach } from "vitest";
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
  });

  it("returns [] when query is empty", async () => {
    const res = await searchCities("   ");
    expect(res).toEqual([]);
    expect(mockedGet).not.toHaveBeenCalled();
  });

  it("normalizes API response", async () => {
    mockedGet.mockResolvedValueOnce({
      data: [
        {
          lat: 48.8566,
          lon: 2.3522,
          address: { city: "Paris", country: "France" },
        },
      ],
    });

    const res = await searchCities("Paris", 5);
    expect(res).toHaveLength(1);
    expect(res[0]).toMatchObject({
      name: "Paris",
      country: "France",
      lat: 48.8566,
      lon: 2.3522,
    });
  });

  it("handles non-array response", async () => {
    mockedGet.mockResolvedValueOnce({ data: { foo: "bar" } });

    const res = await searchCities("X");
    expect(res).toEqual([]);
  });
});
