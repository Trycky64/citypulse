export function cityIdFrom(lat, lon, name, country) {
    // id URL-safe
    const raw = JSON.stringify({ lat, lon, name, country });
    return btoa(unescape(encodeURIComponent(raw))).replace(/=+$/, "");
}
export function cityFromId(id) {
    const json = decodeURIComponent(escape(atob(id)));
    return JSON.parse(json);
}
