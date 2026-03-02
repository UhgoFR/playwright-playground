import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async waitForURL(url: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(fileName: string): Promise<Buffer> {
    return await this.page.screenshot({ path: fileName, fullPage: true });
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
