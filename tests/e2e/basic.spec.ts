import { test, expect } from "@playwright/test";
import { setupMocks } from "./_mocks";
import { ensureServer } from "./_helpers";

test("search → pick → city page", async ({ page }) => {
  await ensureServer(page, '/');
  await setupMocks(page);
  await page.getByPlaceholder("Rechercher une ville...").fill("paris");
  await page.waitForTimeout(500);
  await page.getByRole("option").first().click();
  await expect(page).toHaveURL(/\/city\//);
  await expect(page.getByText(/Météo actuelle/i)).toBeVisible();
});
