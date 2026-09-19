# Technical structure

- `apps/api/`: Hono server for city search, weather, and air quality proxy routes.
- `src/components/`: reusable Vue components.
- `src/features/`: reusable feature modules such as city search.
- `src/pages/`: route-level pages for home, city details, comparisons, and favorites.
- `src/services/`: Axios client, IndexedDB cache, and API response normalization.
- `src/stores/`: Pinia preferences and notifications.
- `tests/`: unit and Playwright end-to-end tests.

`src/services/http.ts` configures the API base URL and retry behavior. `src/services/cache.ts` provides stale-while-revalidate caching through `idb-keyval`, with an in-memory fallback for test environments.

Type checking uses `vue-tsc` for the web application and the referenced TypeScript project for `apps/api`. End-to-end tests mock external API routes for deterministic CI runs.
