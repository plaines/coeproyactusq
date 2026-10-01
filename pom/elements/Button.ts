import { BaseElement } from './BaseElement';

export class Button extends BaseElement {
  describe(): string {
    return `Button "${this.name}"`;
  }
}