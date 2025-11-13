import { describe, it, expect, vi, beforeEach } from "vitest";
import { getWeatherSummary } from "@/services/weather.service";
import { http } from "@/services/http";

vi.mock("@/services/http", () => ({
  http: {
    get: vi.fn(),
  },
}));

describe("weather.service getWeatherSummary", () => {
  const mockedGet = http.get as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("normalizes open-meteo data", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        current: {
          temperature_2m: 20.5,
          apparent_temperature: 18.2,
        },
        daily: {
          temperature_2m_max: [25],
          temperature_2m_min: [15],
        },
      },
    });

    const res = await getWeatherSummary(48.8566, 2.3522);
    expect(res.current.temperature).toBe(20.5);
    expect(res.current.feelsLike).toBe(18.2);
    expect(res.daily.max).toBe(25);
    expect(res.daily.min).toBe(15);
  });

  it("handles missing fields gracefully", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {},
    });

    const res = await getWeatherSummary(0, 0);
    expect(res.current.temperature).toBeTypeOf("number");
  });
});
