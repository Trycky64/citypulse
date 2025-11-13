import type { Page } from '@playwright/test';

export async function setupMocks(page: Page) {
  // Mock city search
  await page.route('**/api/city/search**', async (route) => {
    const url = new URL(route.request().url());
    const q = url.searchParams.get('q') || '';
    const items = [] as any[];
    if (/paris/i.test(q)) {
      items.push({ id: 'paris:1', name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 });
    }
    if (/london/i.test(q)) {
      items.push({ id: 'london:1', name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 });
    }
    // Fallback: return one item matching query
    if (!items.length && q) {
      items.push({ id: `c:${q}`, name: q, country: 'Unknown', lat: 0, lon: 0 });
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(items),
    });
  });

  // Mock weather
  await page.route('**/api/weather**', async (route) => {
    const body = {
      current: { temperature_2m: 20.5, apparent_temperature: 18.2 },
      hourly: { time: ['2025-11-13T00:00:00Z'], temperature_2m: [20.5], precipitation: [0] },
      daily: { time: ['2025-11-13'], temperature_2m_max: [25], temperature_2m_min: [10], precipitation_sum: [0] },
    };
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
  });

  // Mock air
  await page.route('**/api/air**', async (route) => {
    const body = {
      hourly: { time: ['2025-11-13T00:00:00Z'], pm2_5: [12], pm10: [20], nitrogen_dioxide: [5], ozone: [10] },
    };
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
  });
}
