import { test, expect } from '@playwright/test';

test('admin can log in', async ({ page }) => {
  // 1. Ir a la página
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Actuar: escribir usuario y password, y hacer click
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  // 3. Verificar: llegamos al Dashboard
  await expect(page).toHaveURL(/dashboard\/index/);
  await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText('Dashboard');
});