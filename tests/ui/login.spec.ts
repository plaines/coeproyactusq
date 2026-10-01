import { test, expect } from '@playwright/test';
import { env } from '../../configs/env';
import { ROUTES, MESSAGES } from '../../configs/constants';
import { LoginPage } from '../../pom/pages/LoginPage';

test('admin can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(env.ui.username, env.ui.password);

  await expect(page).toHaveURL(ROUTES.dashboard);
});

test('invalid password shows an error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(env.ui.username, 'wrong-password');

  await expect(loginPage.el.error).toHaveText(MESSAGES.invalidCredentials);
});