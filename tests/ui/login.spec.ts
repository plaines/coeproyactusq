import { test, expect } from '../fixtures/test';
import { env } from '../../configs/env';
import { MESSAGES } from '../../configs/constants';
import loginCases from '../data/login.data.json';

test.describe('Login', () => {
  test.beforeEach(async ({ pages }) => {
    await pages.login.goto();
  });

  test('admin can log in', async ({ pages, page }) => {
    await pages.login.login(env.ui.username, env.ui.password);
    await expect(page).toBeLoggedIn();
  });


  for (const tc of loginCases) {
    test(`rejects invalid login: ${tc.name}`, async ({ pages }) => {
      await pages.login.login(tc.username, tc.password);
      await expect(pages.login.el.error).toHaveText(MESSAGES.invalidCredentials);
    });
  }
});