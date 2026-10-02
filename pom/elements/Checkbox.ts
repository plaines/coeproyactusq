import { BaseElement } from './BaseElement';

export class Checkbox extends BaseElement {
  // `locator` es el contenedor del checkbox. Dentro hay dos partes:
  readonly input = this.locator.locator('input[type="checkbox"]');  // el real (oculto): lo usamos para LEER el estado
  private readonly box = this.locator.locator('.oxd-checkbox-input'); // el visible: lo usamos para HACER CLICK

  async set(checked: boolean): Promise<void> {
    if ((await this.input.isChecked()) !== checked) {
      await this.box.click();
    }
  }

  describe(): string {
    return `Checkbox "${this.name}"`;
  }
}