const STATIC_CACHE = "citypulse-static-v3";
const WEATHER_CACHE = "citypulse-weather-v1";
const AIR_CACHE = "citypulse-air-v1";
const OSM_CACHE = "citypulse-osm-v1";

// Fichiers statiques de base à mettre en cache
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/offline.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png"
];

// INSTALL : precache assets de base
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE : cleanup anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              ![STATIC_CACHE, WEATHER_CACHE, AIR_CACHE, OSM_CACHE].includes(key)
          )
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH : cache-first simple + stratégies pour API / OSM
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // On ne s'occupe que des GET
  if (request.method !== "GET") return;

  // 1) API météo : network-first avec fallback cache
  if (url.pathname.startsWith("/api/weather")) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          const cache = await caches.open(WEATHER_CACHE);
          if (res.ok) cache.put(request, res.clone());
          return res;
        } catch (_err) {
          const cache = await caches.open(WEATHER_CACHE);
          const cached = await cache.match(request);
          return (
            cached ||
            new Response("{}", {
              status: 503,
              headers: { "Content-Type": "application/json" }
            })
          );
        }
      })()
    );
    return;
  }

  // 2) API air : network-first avec fallback cache
  if (url.pathname.startsWith("/api/air")) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          const cache = await caches.open(AIR_CACHE);
          if (res.ok) cache.put(request, res.clone());
          return res;
        } catch (_err) {
          const cache = await caches.open(AIR_CACHE);
          const cached = await cache.match(request);
          return (
            cached ||
            new Response("{}", {
              status: 503,
              headers: { "Content-Type": "application/json" }
            })
          );
        }
      })()
    );
    return;
  }

  // 3) Tuiles OSM : cache-first
  if (url.hostname.includes("tile.openstreetmap.org")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(OSM_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const res = await fetch(request);
          if (res.ok) cache.put(request, res.clone());
          return res;
        } catch (_err) {
          return new Response(null, { status: 504 });
        }
      })()
    );
    return;
  }

  // 4) Tout le reste same-origin : cache-first (index.html, JS, CSS, etc.)
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const res = await fetch(request);
          if (res.ok) cache.put(request, res.clone());
          return res;
        } catch (_err) {
          if (request.mode === "navigate") {
            return (await cache.match("/")) || (await cache.match("/offline.html"));
          }
          return new Response(null, { status: 504 });
        }
      })()
    );
  }
});
