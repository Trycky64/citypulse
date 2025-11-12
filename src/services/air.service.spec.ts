import { describe, it, expect, vi } from "vitest";
import * as air from "./air.service";
import { http } from "./http";

vi.mock("./http", () => ({
  http: { get: vi.fn() }
}));

describe("air.service", () => {
  it("retourne un AQI approximatif et une catégorie", async () => {
    (http.get as any).mockResolvedValue({
      data: {
        hourly: {
          time: Array.from({ length: 4 }, (_, i) => `2025-11-12T0${i}:00:00Z`),
          pm2_5: [10, 12, 15, 18],
          pm10: [20, 25, 22, 19],
          nitrogen_dioxide: [5, 6, 7, 8],
          ozone: [30, 28, 27, 26],
        }
      }
    });
    const res = await air.getAirQuality(48.85, 2.35);
  expect(["Good","Moderate","Unhealthy","Very Unhealthy","Hazardous"]).toContain(res.category);
    expect(res.aqi).toBeGreaterThan(0);
  });
});
