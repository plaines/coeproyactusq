import { BaseElement } from './BaseElement';

export class Dropdown extends BaseElement {
  // Texto que muestra el dropdown con la opción ya elegida
  readonly selectedText = this.locator.locator('.oxd-select-text-input');

  async select(option: string): Promise<void> {
    await this.locator.click();                         // 1. abrir la lista
    try {
      await this.locator.page()                         // 2. elegir la opción
        .locator('.oxd-select-dropdown .oxd-select-option')
        .filter({ hasText: new RegExp(`^${option}$`) })
        .click();
    } catch (error) {
      // Traducimos el error a uno claro y lo RELANZAMOS: el test sigue fallando
      throw new Error(
        `Dropdown "${this.name}": the option "${option}" is not available.\n${String(error)}`,
      );
    }
  }

  describe(): string {
    return `Dropdown "${this.name}"`;
  }
}