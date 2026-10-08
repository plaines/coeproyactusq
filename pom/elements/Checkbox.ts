import { BaseElement } from './BaseElement';

export class Checkbox extends BaseElement {
  readonly input = this.locator.locator('input[type="checkbox"]');
  private readonly box = this.locator.locator('.oxd-checkbox-input');

  async set(checked: boolean): Promise<void> {
    if ((await this.input.isChecked()) !== checked) {
      await this.box.click();
    }
  }

  describe(): string {
    return `Checkbox "${this.name}"`;
  }
}