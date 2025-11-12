import { del, get, set } from "idb-keyval";

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const v = await get<any>(key);
    return (v ?? null) as T | null;
  } catch { return null; }
}

export async function cacheSet<T>(key: string, value: T, ttlMs: number) {
  const payload = { value, exp: Date.now() + ttlMs };
  await set(key, payload);
}

export async function cacheGetValid<T>(key: string): Promise<T | null> {
  const payload = await get<{ value:T; exp:number }>(key as any);
  if (!payload) return null;
  if (Date.now() > payload.exp) return null;
  return payload.value;
}

export async function cacheSWR<T>(key: string, fetcher: () => Promise<T>, ttlMs: number, onUpdated?: (v:T)=>void) {
  const cached = await cacheGetValid<T>(key);
  // kick network in background
  fetcher().then(v => { cacheSet(key, v, ttlMs); onUpdated?.(v); }).catch(()=>{});
  return cached ?? fetcher(); // si pas de cache, attend le réseau
}
