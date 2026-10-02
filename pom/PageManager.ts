import { Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { DashboardPage } from './pages/DashboardPage';

export class PageManager {
  readonly login: LoginPage;
  readonly admin: AdminPage;
  readonly dashboard: DashboardPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.admin = new AdminPage(page);
    this.dashboard = new DashboardPage(page);
  }
}