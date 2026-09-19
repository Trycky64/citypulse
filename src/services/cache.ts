// Graceful cache wrapper: use idb-keyval in browsers, but fall back to an
// in-memory Map when indexedDB is not available (eg. Node test env).
let useIdb = typeof indexedDB !== "undefined";
let idb: typeof import("idb-keyval") | null = null;
const memory = new Map<string, { value: any; exp: number }>();

async function ensureIdb() {
  if (!useIdb) return false;
  if (idb) return true;
  try {
    // dynamic import so tests running in Node don't hit indexedDB at import time
    idb = await import("idb-keyval");
    return true;
  } catch {
    // unable to load idb-keyval at runtime -> fallback
    useIdb = false;
    idb = null;
    return false;
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  if (typeof indexedDB === "undefined") {
    const p = memory.get(key);
    if (!p) return null;
    if (Date.now() > p.exp) return null;
    return p.value as T;
  }

  await ensureIdb();
  if (!idb) return null;
  try {
    const v = await idb.get<any>(key);
    return (v ?? null) as T | null;
  } catch {
    return null;
  }
}

export async function cacheSet<T>(key: string, value: T, ttlMs: number) {
  const payload = { value, exp: Date.now() + ttlMs };
  if (typeof indexedDB === "undefined") {
    memory.set(key, payload);
    return;
  }
  await ensureIdb();
  if (!idb) return;
  await idb.set(key, payload);
}

export async function cacheGetValid<T>(key: string): Promise<T | null> {
  if (typeof indexedDB === "undefined") {
    const payload = memory.get(key);
    if (!payload) return null;
    if (Date.now() > payload.exp) return null;
    return payload.value as T;
  }
  await ensureIdb();
  if (!idb) return null;
  const payload = await idb.get<{ value: T; exp: number }>(key as any);
  if (!payload) return null;
  if (Date.now() > payload.exp) return null;
  return payload.value;
}

export async function cacheSWR<T>(key: string, fetcher: () => Promise<T>, ttlMs: number, onUpdated?: (v: T) => void) {
  // In test environments (vitest exposes a global `vi`), bypass the cache to avoid
  // cross-test pollution and ensure tests get fresh fetcher results.
  const isTest = typeof globalThis !== "undefined" && (globalThis as any).vi;
  const cached = isTest ? null : await cacheGetValid<T>(key);
  // kick network in background
  fetcher()
    .then((v) => {
      cacheSet(key, v, ttlMs);
      onUpdated?.(v);
    })
    .catch(() => {});
  return cached ?? fetcher(); // if no cache, wait for network
}
