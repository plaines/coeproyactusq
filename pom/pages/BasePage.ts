import { Page } from '@playwright/test';

export abstract class BasePage {
  protected abstract readonly path: string;   // cada página dice cuál es su ruta

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }
}