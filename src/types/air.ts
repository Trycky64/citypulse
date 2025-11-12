export interface AirSample {
  time: string;
  pm25?: number;
  pm10?: number;
  no2?: number;
  o3?: number;
}
export interface AirQuality {
  aqi: number;
  category: "Good" | "Moderate" | "Unhealthy" | "Very Unhealthy" | "Hazardous";
  samples: AirSample[];
}
