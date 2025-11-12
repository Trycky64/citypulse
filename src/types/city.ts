export interface City {
  id: string;       // provider-specific id
  name: string;
  country: string;
  lat: number;
  lon: number;
  population?: number;
  teleportSlug?: string;
}
