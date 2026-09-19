# API sources

CityPulse uses its Hono API proxy for all external data requests.

- `GET /api/city/search`: Nominatim city search, normalized to `id`, `name`, `country`, `lat`, and `lon`.
- `GET /api/weather`: Open-Meteo current, hourly, and daily forecast data.
- `GET /api/air`: Open-Meteo hourly air quality data.

The web application normalizes these responses in `src/services`. Playwright tests intercept the three routes through `tests/e2e/_mocks.ts` so CI does not depend on external services.
