import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/http", () => ({
  http: {
    get: vi.fn(),
  },
}));

import { getWeather, getWeatherSummary } from "@/services/weather.service";
import { http } from "@/services/http";

describe("weather.service", () => {
  const mockedGet = http.get as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("normalizes open-meteo data for the compatibility summary", async () => {
    mockedGet.mockResolvedValue({
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

  it("handles missing fields gracefully in the compatibility summary", async () => {
    mockedGet.mockResolvedValue({
      data: {},
    });

    const res = await getWeatherSummary(0, 0);
    expect(res.current.temperature).toBeTypeOf("number");
    expect(res.hourly).toEqual([]);
  });

  it("builds current, daily, and hourly weather models", async () => {
    mockedGet.mockResolvedValue({
      data: {
        current: {
          temperature_2m: 12,
          apparent_temperature: 10,
        },
        hourly: {
          time: ["10:00", "11:00"],
          temperature_2m: [11, 12],
          precipitation: [0, 0.4],
        },
        daily: {
          time: ["2026-09-19", "2026-09-20"],
          temperature_2m_max: [16, 17],
          temperature_2m_min: [8, 9],
          precipitation_sum: [1, 2],
        },
      },
    });

    const res = await getWeather(43.48, -1.56);

    expect(res.now).toEqual({ temp: 12, feels: 10 });
    expect(res.daily).toEqual([
      { date: "2026-09-19", tMin: 8, tMax: 16, precipMm: 1 },
      { date: "2026-09-20", tMin: 9, tMax: 17, precipMm: 2 },
    ]);
    expect(res.hourly).toEqual([
      { time: "10:00", temp: 11, precipMm: 0 },
      { time: "11:00", temp: 12, precipMm: 0.4 },
    ]);
  });

  it("falls back to a minimal model for partial provider responses", async () => {
    mockedGet.mockResolvedValue({
      data: {
        current: { temp: 7, feels: 5 },
        hourly: {
          time: ["10:00"],
          temperature_2m: [7],
        },
      },
    });

    const res = await getWeather(0.123, 0.456);

    expect(res.now).toEqual({ temp: 7, feels: 5 });
    expect(res.daily).toEqual([]);
    expect(res.hourly).toEqual([]);
  });
});
