import { expect as baseExpect, Page } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { ZodType } from 'zod';
import { PageManager } from '../../pom/PageManager';
import { BookingApi } from '../../api/BookingApi';
import { AuthApi } from '../../api/AuthApi';
import { AdminUser } from '../../domain/AdminUser';
import { env } from '../../configs/env';
import { ROUTES } from '../../configs/constants';

// ---------- expect personalizado ----------
export const expect = baseExpect.extend({
  async toBeLoggedIn(page: Page, options?: { timeout?: number }) {
    const name = 'toBeLoggedIn';
    let pass: boolean;
    let matcherResult: any;
    try {
      await baseExpect(page).toHaveURL(ROUTES.dashboard, options);
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }
    return {
      name,
      pass,
      message: () => matcherResult?.message ?? 'Expected the user to be logged in',
    };
  },

  // Verifica que un objeto cumpla un esquema de zod
  toMatchSchema(received: unknown, schema: ZodType) {
    const result = schema.safeParse(received);
    return {
      name: 'toMatchSchema',
      pass: result.success,
      message: () => (result.success ? 'Schema matched' : result.error.message),
    };
  },
});

// ---------- fixtures personalizadas ----------
type Fixtures = {
  pages: PageManager;
  authedPages: PageManager;
  bookingApi: BookingApi;
  authApi: AuthApi;
};

export const test = base.extend<Fixtures>({
  pages: async ({ page }, use) => {
    await use(new PageManager(page));
  },

  authedPages: async ({ pages, page }, use, testInfo) => {
    const admin = new AdminUser(env.ui.username, env.ui.password);
    testInfo.annotations.push({ type: 'user', description: admin.describe() });

    await pages.login.goto();
    await pages.login.loginAs(admin);
    await expect(page).toBeLoggedIn();

    await use(pages);

    await pages.dashboard.logout();
  },

  // `request`: cliente HTTP de Playwright, sin navegador
  bookingApi: async ({ request }, use) => {
    await use(new BookingApi(request));
  },
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
});