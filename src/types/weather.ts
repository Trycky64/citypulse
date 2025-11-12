export interface DailyForecast {
  date: string;
  tMin: number;
  tMax: number;
  precipMm: number;
}
export interface WeatherSummary {
  now: { temp: number; feels: number; icon?: string };
  daily: DailyForecast[];
}
