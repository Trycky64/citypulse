import { Page } from '@playwright/test';

export async function ensureServer(page: Page, path = '/', attempts = 12, delayMs = 1000) {
  // Try to navigate to the app root until it succeeds or attempts exhausted.
  // This handles flaky dev-server startup when Playwright spawns or when running locally.
  for (let i = 0; i < attempts; i++) {
    try {
      // try a fast navigation; if successful, go back to start so test proceeds from known URL
      await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 5000 });
      return;
    } catch (err) {
      // swallow and retry after delay

      console.log(`[e2e] ensureServer: attempt ${i + 1} failed - ${(err as any)?.message ?? err}`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  // final attempt to surface the error
  await page.goto(path, { waitUntil: 'load', timeout: 15000 });
}
