# CityPulse

CityPulse is a Vue 3 web application for searching cities and viewing weather and air quality data. It also supports city comparisons, favorites, saved preferences, map display, and printable city reports.

## Stack

- Vue 3, TypeScript, Vite, Vue Router, and Pinia
- Tailwind CSS and PostCSS
- Axios and Zod for HTTP access and response validation
- Leaflet for maps
- Chart.js and vue-chartjs for data visualization
- Hono on Node.js for the API proxy
- Vitest for unit tests and Playwright for end-to-end tests

## Data sources

The Node API under `apps/api` proxies these public services:

- Nominatim for city search
- Open-Meteo Forecast API for weather
- Open-Meteo Air Quality API for air data

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Setup

```bash
npm ci
cp .env.example .env
npm run dev:api
npm run dev
```

The web application runs at `http://localhost:5173`. The API runs at `http://localhost:8787` by default. Set `VITE_API_BASE` to the API origin when they are served separately.

## Environment variables

| Variable | Used by | Purpose |
| --- | --- | --- |
| `VITE_API_BASE` | Web application | Base URL for CityPulse API requests |
| `VITE_MAP_TILE_URL` | Web application | Leaflet tile URL template |
| `ALLOWED_ORIGIN` | Node API | Browser origin allowed by CORS |
| `PORT` | Node API | API listening port; defaults to `8787` |

Only placeholders belong in `.env.example`. Local `.env` files are ignored by Git.

## Commands

```bash
npm run dev             # Vite development server
npm run dev:api         # Hono API server
npm run lint            # ESLint
npm run type-check      # TypeScript and Vue type checks
npm run test:unit -- --run
npm run test:coverage
npm run test:e2e
npm run build
npm run preview
```

Install the Playwright browsers once before running the end-to-end suite:

```bash
npx playwright install chromium firefox
```

## Project structure

```text
apps/api/               Hono API proxy
public/                 PWA manifest, icons, and service worker
src/components/         Reusable Vue components
src/features/           Reusable feature modules
src/pages/              Route-level views
src/services/           HTTP, caching, and data normalization
src/stores/             Pinia state and persisted preferences
tests/                  Unit and Playwright end-to-end tests
```

Weather and air results use a stale-while-revalidate cache backed by IndexedDB, with an in-memory fallback when IndexedDB is unavailable. Playwright intercepts API routes so end-to-end tests remain deterministic.

## PWA

The production build registers `public/sw.js`. The manifest and supplied icon sizes support installation, and the service worker caches application and API responses for basic offline use.

## License

CityPulse is released under the MIT License. See [LICENSE](LICENSE).
