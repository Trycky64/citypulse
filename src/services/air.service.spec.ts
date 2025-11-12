import { describe, it, expect, vi } from "vitest";
import * as air from "./air.service";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: any };

describe("air.service", () => {
  it("retourne un AQI approximatif et une catégorie", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({
      data: {
        results: [
          { parameter: "pm25", value: 10, date: { utc: "2025-11-12T10:00:00Z" } },
          { parameter: "pm10", value: 20, date: { utc: "2025-11-12T10:00:00Z" } },
        ]
      }
    });
    const res = await air.getAirQuality(48.85, 2.35);
    expect(res.category).toBe("Good");
    expect(res.aqi).toBeGreaterThan(0);
  });
});
