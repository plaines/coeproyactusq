import { test, expect } from '../fixtures/test';
import { ROLES } from '../../configs/constants';

test.describe('Admin - User Management', () => {
  test.beforeEach(async ({ authedPages }) => {
    await authedPages.admin.goto();
  });

  test('filter users by role (dropdown)', async ({ authedPages }) => {
    const { admin } = authedPages;
    await admin.searchByRole(ROLES.ess);

    await expect(admin.el.userRole.selectedText).toHaveText(ROLES.ess);
    await expect(admin.el.firstRowRole).toHaveText(ROLES.ess);
  });

  test('select and unselect a row (checkbox)', async ({ authedPages }) => {
    const checkbox = authedPages.admin.el.firstRowCheckbox;

    try {
      await checkbox.set(true);
      await expect(checkbox.input).toBeChecked();
    } finally {
      await checkbox.set(false);
    }
  });
});