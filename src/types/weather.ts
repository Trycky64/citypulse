export interface HourSample {
  time: string;
  temp: number;
  precipMm: number;
}

export interface DailyForecast {
  date: string;
  tMin: number;
  tMax: number;
  precipMm: number;
}

export interface WeatherSummary {
  now: { temp: number; feels: number; icon?: string };
  daily: DailyForecast[];
  hourly: HourSample[]; // dernières 24h (ou prochaines 24h selon dispo)
}
