export function cityIdFrom(lat: number, lon: number, name: string, country: string) {
  // id URL-safe
  const raw = JSON.stringify({ lat, lon, name, country });
  return btoa(unescape(encodeURIComponent(raw))).replace(/=+$/, "");
}

export function cityFromId(id: string): { lat: number; lon: number; name: string; country: string } {
  const json = decodeURIComponent(escape(atob(id)));
  return JSON.parse(json);
}
