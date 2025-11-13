import { http } from "./http";
import { cacheSWR } from "./cache";

export interface AirSample {
  time: string;
  pm25?: number;
  pm10?: number;
  no2?: number;
  o3?: number;
}

export interface AirQuality {
  aqi: number;
  category: string;
  samples: AirSample[];
}

function categoryFromPM25(pm25?: number): string {
  if (pm25 == null || Number.isNaN(pm25)) return "Unknown";
  if (pm25 <= 12) return "Good";
  if (pm25 <= 35) return "Moderate";
  if (pm25 <= 55) return "Unhealthy for Sensitive Groups";
  if (pm25 <= 150) return "Unhealthy";
  if (pm25 <= 250) return "Very Unhealthy";
  return "Hazardous";
}

export async function getAirQuality(lat: number, lon: number): Promise<AirQuality> {
  const key = `air:${lat.toFixed(3)},${lon.toFixed(3)}`;
  const ttl = 24 * 60 * 60 * 1000; // 24h

  return cacheSWR(
    key,
    async () => {
      try {
        const { data } = await http.get("/api/air", { params: { lat, lon } });

        const hourly = (data as any)?.hourly ?? {};
        const times: string[] = Array.isArray(hourly.time) ? hourly.time : [];

        const pm25Arr: (number | null | undefined)[] = Array.isArray(hourly.pm2_5)
          ? hourly.pm2_5
          : [];
        const pm10Arr: (number | null | undefined)[] = Array.isArray(hourly.pm10)
          ? hourly.pm10
          : [];
        const no2Arr: (number | null | undefined)[] = Array.isArray(hourly.nitrogen_dioxide)
          ? hourly.nitrogen_dioxide
          : [];
        const o3Arr: (number | null | undefined)[] = Array.isArray(hourly.ozone)
          ? hourly.ozone
          : [];

        const n = times.length;
        if (!n) {
          return {
            aqi: 0,
            category: "Unknown",
            samples: [],
          };
        }

        const take = Math.min(24, n);
        const start = Math.max(0, n - take);

        const samples: AirSample[] = [];

        for (let k = 0; k < take; k++) {
          const i = start + k;

          const pm25Raw = pm25Arr[i] ?? null;
          const pm10Raw = pm10Arr[i] ?? null;
          const no2Raw = no2Arr[i] ?? null;
          const o3Raw = o3Arr[i] ?? null;

          samples.push({
            time: times[i],
            pm25: pm25Raw != null && !Number.isNaN(pm25Raw) ? pm25Raw : undefined,
            pm10: pm10Raw != null && !Number.isNaN(pm10Raw) ? pm10Raw : undefined,
            no2: no2Raw != null && !Number.isNaN(no2Raw) ? no2Raw : undefined,
            o3: o3Raw != null && !Number.isNaN(o3Raw) ? o3Raw : undefined,
          });
        }

        const lastPM25 = [...samples].reverse().find((s) => s.pm25 != null)?.pm25;
        const category = categoryFromPM25(lastPM25);
        const aqiApprox =
          lastPM25 == null || Number.isNaN(lastPM25)
            ? 0
            : Math.round(Math.min(500, lastPM25 * 4));

        return {
          aqi: aqiApprox,
          category,
          samples,
        };
      } catch (err) {
        console.error("[CityPulse] /api/air: request failed", err);
        return {
          aqi: 0,
          category: "Error",
          samples: [],
        };
      }
    },
    ttl,
  );
}
