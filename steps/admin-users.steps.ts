import { createBdd } from 'playwright-bdd';
import { test, expect } from '../tests/fixtures/test';

// Conectamos Gherkin con NUESTRA fixture personalizada
const { Given, When, Then } = createBdd(test);

Given('I am logged in as an admin', async ({ authedPages, page }) => {
  // Pedir la fixture authedPages ya hace el login (su setup).
  // Aquí solo verificamos con nuestro matcher personalizado.
  await expect(page).toBeLoggedIn();
});

Given('I am on the user management page', async ({ authedPages }) => {
  await authedPages.admin.goto();
});

When('I search users with the role {string}', async ({ authedPages }, role: string) => {
  await authedPages.admin.searchByRole(role);
});

Then('the role filter should show {string}', async ({ authedPages }, role: string) => {
  await expect(authedPages.admin.el.userRole.selectedText).toHaveText(role);
});

Then('the first result should have the role {string}', async ({ authedPages }, role: string) => {
  await expect(authedPages.admin.el.firstRowRole).toHaveText(role);
});
