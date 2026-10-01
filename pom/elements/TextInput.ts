import { BaseElement } from './BaseElement';

export class TextInput extends BaseElement {
  async fill(value: string): Promise<void> {
    await this.locator.fill(value);
  }

  describe(): string {
    return `TextInput "${this.name}"`;
  }
}