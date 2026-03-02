import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly completeHeader: Locator;
  readonly completeMessage: Locator;
  readonly ponyExpressImage: Locator;
  readonly backToProductsButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeader = page.locator('[data-test="title"]');
    this.completeMessage = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async isCheckoutCompletePageLoaded(): Promise<boolean> {
    try {
      await this.completeHeader.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getCompleteHeaderText(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  async getCompleteMessage(): Promise<string> {
    return await this.completeMessage.textContent() || '';
  }

  async isPonyExpressImageVisible(): Promise<boolean> {
    return await this.ponyExpressImage.isVisible();
  }

  async isBackToProductsButtonVisible(): Promise<boolean> {
    return await this.backToProductsButton.isVisible();
  }

  async clickBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async getOrderConfirmationText(): Promise<string> {
    const header = await this.getCompleteHeaderText();
    const message = await this.getCompleteMessage();
    return `${header} - ${message}`;
  }
}
