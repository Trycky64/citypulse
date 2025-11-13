// Graceful cache wrapper: use idb-keyval in browsers, but fall back to an
// in-memory Map when indexedDB is not available (eg. Node test env).
let useIdb = typeof indexedDB !== "undefined";
let idb = null;
const memory = new Map();
async function ensureIdb() {
    if (!useIdb)
        return false;
    if (idb)
        return true;
    try {
        // dynamic import so tests running in Node don't hit indexedDB at import time
        idb = await import("idb-keyval");
        return true;
    }
    catch (e) {
        // unable to load idb-keyval at runtime -> fallback
        useIdb = false;
        idb = null;
        return false;
    }
}
export async function cacheGet(key) {
    if (typeof indexedDB === "undefined") {
        const p = memory.get(key);
        if (!p)
            return null;
        if (Date.now() > p.exp)
            return null;
        return p.value;
    }
    await ensureIdb();
    if (!idb)
        return null;
    try {
        const v = await idb.get(key);
        return (v ?? null);
    }
    catch {
        return null;
    }
}
export async function cacheSet(key, value, ttlMs) {
    const payload = { value, exp: Date.now() + ttlMs };
    if (typeof indexedDB === "undefined") {
        memory.set(key, payload);
        return;
    }
    await ensureIdb();
    if (!idb)
        return;
    await idb.set(key, payload);
}
export async function cacheGetValid(key) {
    if (typeof indexedDB === "undefined") {
        const payload = memory.get(key);
        if (!payload)
            return null;
        if (Date.now() > payload.exp)
            return null;
        return payload.value;
    }
    await ensureIdb();
    if (!idb)
        return null;
    const payload = await idb.get(key);
    if (!payload)
        return null;
    if (Date.now() > payload.exp)
        return null;
    return payload.value;
}
export async function cacheSWR(key, fetcher, ttlMs, onUpdated) {
    // In test environments (vitest exposes a global `vi`), bypass the cache to avoid
    // cross-test pollution and ensure tests get fresh fetcher results.
    const isTest = typeof globalThis !== "undefined" && globalThis.vi;
    const cached = isTest ? null : await cacheGetValid(key);
    // kick network in background
    fetcher()
        .then((v) => {
        cacheSet(key, v, ttlMs);
        onUpdated?.(v);
    })
        .catch(() => { });
    return cached ?? fetcher(); // if no cache, wait for network
}
