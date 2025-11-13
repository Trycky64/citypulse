# Technical structure

This document explains the high-level structure of the CityPulse repository.

Top-level folders
- src/: application sources.
  - components/: small, reusable Vue components.
  - features/: highest-level reusable UI features (e.g. `CitySearch`).
  - pages/: route-level pages (Home.vue, City.vue, Compare.vue).
  - services/: HTTP layer and API normalization services (weather, air, geo, teleport).
  - stores/: Pinia stores (app, prefs, toast, favorites).
  - styles/: central styling and theme variables.

Key files
- `src/services/http.ts` — axios instance, baseURL, retry interceptor.
- `src/services/cache.ts` — SWR-like cache using `idb-keyval`, with an in-memory fallback for tests.
- `src/services/weather.service.ts` — normalizes Open-Meteo responses to `WeatherSummary`.
- `tests/` — unit & e2e tests.

Notes for maintainers
- Follow existing TypeScript and ESLint conventions. The project uses `vue-tsc` for type-checking.
- Tests are run with Vitest (jsdom). E2E tests are in `tests/e2e` and use Playwright. E2E tests include mocked API routes for determinism.
