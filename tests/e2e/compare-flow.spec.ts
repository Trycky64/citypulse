import { test, expect } from "@playwright/test";

test("compare two cities and share URL", async ({ page }) => {
  await page.goto("/compare");

  const leftInput = page.getByPlaceholder("Rechercher une ville").first();
  const rightInput = page.getByPlaceholder("Rechercher une ville").nth(1);

  await leftInput.fill("Paris");
  await page.waitForTimeout(500);
  await page.getByText("Paris", { exact: false }).first().click();

  await rightInput.fill("London");
  await page.waitForTimeout(500);
  await page.getByText("London", { exact: false }).first().click();

  await expect(page.getByText("Comparer deux villes")).toBeVisible();
  await expect(page.getByText("Qualité de l’air", { exact: false })).toBeVisible();

  // bouton "Copier le lien"
  await expect(page.getByText("Copier le lien")).toBeVisible();
});
