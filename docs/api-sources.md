# API sources

CityPulse consumes data from a few external sources (via the proxy endpoints in `/api/*`). The project currently normalizes these APIs under `src/services`.

Primary sources
- Open-Meteo — weather (hourly/daily/current). Normalized by `weather.service.ts` to an internal `WeatherSummary` model.
- OpenAQ / other air APIs — used for hourly particulate and gas measurements. Normalized by `air.service.ts` to `AirQuality`.
- Teleport Urban Areas — city scores and metadata (cost of living, scores) via `teleport.service.ts`.

Proxy endpoints (serverless / frontend proxy)
- `/api/weather` — returns Open-Meteo data (the app expects the shape but is tolerant to missing fields).
- `/api/air` — returns air hourly arrays used to compute recent AQI approximation.
- `/api/city/search` — city search; normalized to `id, name, country, lat, lon`.

Testing
- E2E tests mock these endpoints via Playwright route handlers in `tests/e2e/_mocks.ts` to make flows deterministic for CI.
