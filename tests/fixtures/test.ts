import { test as base, expect as baseExpect, Page } from '@playwright/test';
import { PageManager } from '../../pom/PageManager';
import { env } from '../../configs/env';
import { ROUTES } from '../../configs/constants';

// ---------- expect personalizado ----------
// Mantiene la sintaxis expect(algo).toAlgo(), pero con nuestro propio matcher
export const expect = baseExpect.extend({
  async toBeLoggedIn(page: Page, options?: { timeout?: number }) {
    const name = 'toBeLoggedIn';
    let pass: boolean;
    let matcherResult: any;
    try {
      // Reutilizamos una aserción nativa web-first (con reintentos)
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
});

// ---------- fixtures personalizadas ----------
type Fixtures = {
  pages: PageManager;         // todas las páginas
  authedPages: PageManager;   // las mismas páginas, con sesión iniciada
};

export const test = base.extend<Fixtures>({
  pages: async ({ page }, use) => {
    await use(new PageManager(page));
  },

  authedPages: async ({ pages, page }, use) => {
    // SETUP: iniciar sesión
    await pages.login.goto();
    await pages.login.login(env.ui.username, env.ui.password);
    await expect(page).toBeLoggedIn();

    await use(pages);   // <- aquí corre el test

    // TEARDOWN: se ejecuta al terminar ESE test (pase o falle)
    await pages.dashboard.logout();
  },
});