import { describe, it, expect, vi } from "vitest";
import * as weather from "./weather.service";
import { http } from "./http";
vi.mock("./http", () => ({
    http: { get: vi.fn() }
}));
describe("weather.service", () => {
    it("normalise la réponse Open-Meteo", async () => {
        http.get.mockResolvedValue({
            data: {
                current: { temperature_2m: 12.3, apparent_temperature: 10.1 },
                hourly: {
                    time: Array.from({ length: 24 }, (_, i) => `2025-11-12T${String(i).padStart(2, "0")}:00:00Z`),
                    temperature_2m: Array.from({ length: 24 }, () => 10),
                    precipitation: Array.from({ length: 24 }, () => 0),
                },
                daily: {
                    time: ["2025-11-12", "2025-11-13"],
                    temperature_2m_max: [14, 15],
                    temperature_2m_min: [7, 6],
                    precipitation_sum: [1.2, 0.0],
                }
            }
        });
        const res = await weather.getWeather(48.85, 2.35);
        expect(res.now.temp).toBeCloseTo(12.3);
        expect(res.daily.length).toBe(2);
    });
});
