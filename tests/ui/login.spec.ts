import { test, expect } from '@playwright/test';
import { env } from '../../configs/env';
import { ROUTES } from '../../configs/constants';

test('admin can log in', async ({ page }) => {
  await page.goto(ROUTES.login);   // ya no hay URL completa ni credenciales

  await page.locator('input[name="username"]').fill(env.ui.username);
  await page.locator('input[name="password"]').fill(env.ui.password);
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(ROUTES.dashboard);
  await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText('Dashboard');
});