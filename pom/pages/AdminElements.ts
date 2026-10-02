import { Page } from '@playwright/test';
import { Dropdown } from '../elements/Dropdown';
import { Checkbox } from '../elements/Checkbox';
import { Button } from '../elements/Button';

export class AdminElements {
  readonly userRole: Dropdown;
  readonly status: Dropdown;
  readonly search: Button;
  readonly resultRows;
  readonly firstRowRole;
  readonly firstRowCheckbox: Checkbox;

  constructor(page: Page) {
    // Locators encadenados: grupo del formulario -> filtrado por etiqueta -> control
    const field = (label: string) =>
      page.locator('.oxd-input-group').filter({ hasText: label }).locator('.oxd-select-text');

    this.userRole = new Dropdown('User Role', field('User Role'));
    this.status = new Dropdown('Status', field('Status'));
    this.search = new Button('Search', page.locator('.oxd-form-actions button[type="submit"]'));

    this.resultRows = page.locator('.oxd-table-body .oxd-table-card');
    const firstRow = this.resultRows.first();
    this.firstRowRole = firstRow.locator('.oxd-table-cell').nth(2);   // columna "User Role"
    this.firstRowCheckbox = new Checkbox('First row', firstRow.locator('.oxd-checkbox-wrapper'));
  }
}