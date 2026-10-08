import { BaseElement } from './BaseElement';

export class Dropdown extends BaseElement {

  readonly selectedText = this.locator.locator('.oxd-select-text-input');

  async select(option: string): Promise<void> {
    await this.locator.click();
    try {
      await this.locator.page()
        .locator('.oxd-select-dropdown .oxd-select-option')
        .filter({ hasText: new RegExp(`^${option}$`) })
        .click();
    } catch (error) {
      throw new Error(
        `Dropdown "${this.name}": the option "${option}" is not available.\n${String(error)}`,
      );
    }
  }

  describe(): string {
    return `Dropdown "${this.name}"`;
  }
}