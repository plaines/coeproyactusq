import { Page } from '@playwright/test';
import { TextInput } from '../elements/TextInput';
import { Button } from '../elements/Button';

export class LoginElements {
  readonly username: TextInput;
  readonly password: TextInput;
  readonly submit: Button;
  readonly error;
  readonly fieldErrors;

  constructor(page: Page) {
    this.username = new TextInput('Username', page.locator('input[name="username"]'));
    this.password = new TextInput('Password', page.locator('input[name="password"]'));
    this.submit = new Button('Login', page.locator('button[type="submit"]'));
    this.error = page.locator('.oxd-alert-content-text');
    this.fieldErrors = page.locator('.oxd-input-field-error-message');
  }
}