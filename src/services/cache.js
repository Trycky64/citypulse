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
        idb = await import("idb-keyval");
        return true;
    }
    catch (e) {
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
    const cached = await cacheGetValid(key);
    fetcher().then((v) => {
        cacheSet(key, v, ttlMs);
        onUpdated === null || onUpdated === void 0 ? void 0 : onUpdated(v);
    }).catch(() => { });
    return cached ?? fetcher();
}
