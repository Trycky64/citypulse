# UI & design notes

Overview
- The UI is mobile-first and uses TailwindCSS for utility styles. The app focuses on clarity: search input, cards for weather & air, and a compare view for two cities.

Key components
- `CitySearch` — accessible autocomplete with keyboard navigation.
- `CityMap` — Leaflet map centered on selected city.
- `AirCard` & `WeatherCard` — show summarized metrics with small charts.

Accessibility
- Use ARIA roles for lists and options, ensure keyboard navigation for the search dropdown, and always provide visible focus states.

Color & theme
- Theme toggling controlled via `stores/app.ts` and CSS variables in `src/styles/theme.css`.

Testing / Visual QA
- Unit tests for components should assert accessibility attributes and basic render.
- E2E tests cover main flows (search → select → city page; compare flow).
