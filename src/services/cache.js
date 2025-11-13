import { get, set } from "idb-keyval";
export async function cacheGet(key) {
    try {
        const v = await get(key);
        return (v ?? null);
    }
    catch {
        return null;
    }
}
export async function cacheSet(key, value, ttlMs) {
    const payload = { value, exp: Date.now() + ttlMs };
    await set(key, payload);
}
export async function cacheGetValid(key) {
    const payload = await get(key);
    if (!payload)
        return null;
    if (Date.now() > payload.exp)
        return null;
    return payload.value;
}
export async function cacheSWR(key, fetcher, ttlMs, onUpdated) {
    const cached = await cacheGetValid(key);
    // kick network in background
    fetcher().then(v => { cacheSet(key, v, ttlMs); onUpdated?.(v); }).catch(() => { });
    return cached ?? fetcher(); // si pas de cache, attend le réseau
}
