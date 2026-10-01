import { Locator } from '@playwright/test';

// Contrato: todo elemento debe poder esto
export interface IElement {
  readonly locator: Locator;
  click(): Promise<void>;
  describe(): string;
}

// Clase abstracta: lógica común, y obliga a las hijas a implementar describe()
export abstract class BaseElement implements IElement {
  constructor(
    protected readonly name: string,      // visible para las hijas, no para el exterior
    public readonly locator: Locator,
  ) {}

  async click(): Promise<void> {
    await this.locator.click();
  }

  abstract describe(): string;
}