import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly swagLabsHeader: Locator;
  readonly acceptedUsernamesSection: Locator;
  readonly passwordSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.swagLabsHeader = page.locator('.login_logo');
    this.acceptedUsernamesSection = page.locator('[data-test="login-credentials"]');
    this.passwordSection = page.locator('[data-test="login-password"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getUsernamePlaceholder(): Promise<string> {
    return await this.usernameInput.getAttribute('placeholder') || '';
  }

  async getPasswordPlaceholder(): Promise<string> {
    return await this.passwordInput.getAttribute('placeholder') || '';
  }

  async getAcceptedUsernames(): Promise<string[]> {
    const usernamesText = await this.acceptedUsernamesSection.textContent();
    if (!usernamesText) return [];
    
    // Remove the header line
    const textWithoutHeader = usernamesText.replace('Accepted usernames are:', '');
    
    // The usernames are concatenated without spaces, need to split them properly
    // Use regex to find all usernames ending with _user
    const matches = textWithoutHeader.match(/(standard_user|locked_out_user|problem_user|performance_glitch_user|error_user|visual_user)/g);
    
    return matches || [];
  }

  async getPasswordForAllUsers(): Promise<string> {
    const passwordText = await this.passwordSection.textContent();
    if (!passwordText) return '';
    
    // Remove header and extract password
    const textWithoutHeader = passwordText.replace('Password for all users:', '');
    const password = textWithoutHeader.trim();
    
    return password;
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async isSwagLabsHeaderVisible(): Promise<boolean> {
    return await this.swagLabsHeader.isVisible();
  }

  async getLoginButtonText(): Promise<string> {
    return await this.loginButton.textContent() || '';
  }

  async pressEnterOnPassword(): Promise<void> {
    await this.passwordInput.press('Enter');
  }

  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }
}
