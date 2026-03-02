import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly pageTitle: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.pageTitle = page.locator('.title');
    this.errorMessages = page.locator('[data-test="error"]');
  }

  async isCheckoutPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement('.title');
      return await this.pageTitle.isVisible();
    } catch {
      return false;
    }
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  async getPostalCodeValue(): Promise<string> {
    return await this.postalCodeInput.inputValue();
  }

  async isContinueButtonVisible(): Promise<boolean> {
    return await this.continueButton.isVisible();
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return await this.cancelButton.isVisible();
  }

  async getErrorMessages(): Promise<string[]> {
    const errorElements = await this.errorMessages.all();
    const errorTexts: string[] = [];
    
    for (const error of errorElements) {
      const text = await error.textContent();
      if (text) {
        errorTexts.push(text);
      }
    }
    
    return errorTexts;
  }

  async hasErrorMessages(): Promise<boolean> {
    const errors = await this.getErrorMessages();
    return errors.length > 0;
  }

  async clearForm(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.postalCodeInput.clear();
  }

  async isFormEmpty(): Promise<boolean> {
    const firstName = await this.getFirstNameValue();
    const lastName = await this.getLastNameValue();
    const postalCode = await this.getPostalCodeValue();
    
    return firstName === '' && lastName === '' && postalCode === '';
  }
}
