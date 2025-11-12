import { test, expect } from "@playwright/test";

test("search → pick → city page", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByPlaceholder("Rechercher une ville...").fill("paris");
  await page.waitForTimeout(500);
  await page.getByRole("option").first().click();
  await expect(page).toHaveURL(/\/city\//);
  await expect(page.getByText(/Météo actuelle/i)).toBeVisible();
});
