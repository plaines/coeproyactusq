import { Locator } from '@playwright/test';

export interface IElement {
  readonly locator: Locator;
  click(): Promise<void>;
  describe(): string;
}


export abstract class BaseElement implements IElement {
  constructor(
    protected readonly name: string,
    public readonly locator: Locator,
  ) { }

  async click(): Promise<void> {
    await this.locator.click();
  }

  abstract describe(): string;
}