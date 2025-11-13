import { test, expect } from "@playwright/test";

test("full city flow: search -> city page -> export", async ({ page }) => {
  await page.goto("/");

  // barre de recherche principale
  const input = page.getByPlaceholder("Rechercher une ville"); // adapte au texte exact
  await input.fill("Paris");
  await page.waitForTimeout(500); // debounce + API

  // sélection ville
  await page.getByText("Paris", { exact: false }).first().click();

  // city page
  await expect(page).toHaveURL(/\/city\//);
  await expect(page.getByText("Qualité de l’air")).toBeVisible();
  await expect(page.getByText("Météo")).toBeVisible();

  // bouton export PDF
  await expect(page.getByText("Exporter le rapport")).toBeVisible();
});
