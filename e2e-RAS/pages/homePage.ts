import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly welcomeToRasText: Locator;
  readonly beforeContinuingPleaseText: Locator;
  readonly itButton: Locator;
  readonly productButton: Locator;
  readonly productStrong: Locator;
  readonly itStrong: Locator;
  readonly backButton: Locator;
  readonly continueButton: Locator;
  readonly positionRoleCombobox: Locator;
  readonly closeModalButton: Locator;

  readonly rasButton: Locator;
  readonly releaseButton: Locator;
  readonly calendarButton: Locator;
  readonly extraToolsButton: Locator;
  readonly faqsButton: Locator;
  readonly perfomanceButton: Locator;
  readonly settingsButton: Locator; //Done
  readonly slackButton: Locator;
  readonly avatarButton: Locator; //Done

  readonly adminUsersMenuItem: Locator;
  //Accoun Menú
  readonly adminPanelButton: Locator;
  readonly myProfileButton: Locator;
  readonly myTicketsButton: Locator;
  readonly signOutButton: Locator;
  readonly myDevicesButton: Locator;
  //Releases Menú
  readonly releaseListMenu: Locator;

  readonly goToNextStepButton: Locator;
  readonly closeTourButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.welcomeToRasText = page.getByRole('heading', { name: 'Welcome to RAS!' });
    this.beforeContinuingPleaseText = page.getByText('Before continuing please');
    this.itButton = page.getByRole('button', { name: 'IT' });
    this.productButton = page.getByRole('button', { name: 'Product' });
    this.productStrong = page.getByText('Selected Role: Product');
    this.itStrong = page.getByText('Selected Role: IT');
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.positionRoleCombobox = page
      .locator('div')
      .filter({ hasText: /^Select optionIC1IC2IC3IC4IC5IC6IC7IC8IC9IC10M1M2M3M4M5M6$/ })
      .getByRole('combobox');
    this.closeModalButton = page.getByRole('button', { name: 'Close' });

    this.goToNextStepButton = page.getByRole('button', { name: 'Go to next step' });
    this.closeTourButton = page.getByRole('button', { name: 'Close Tour' });

    this.rasButton = page.getByRole('heading', { name: 'RAS' });
    this.releaseButton = page.getByRole('button', { name: 'Releases' }); //OK
    this.calendarButton = page.getByRole('button', { name: 'Calendar' });
    this.extraToolsButton = page.getByRole('button', { name: 'Extra tools' });
    this.faqsButton = page.getByRole('button', { name: 'FAQs' });
    this.perfomanceButton = page.getByRole('button', { name: 'Performance' });
    this.settingsButton = page.locator('div.css-1hwzzs3 svg').nth(0); //OK
    this.slackButton = page.locator('div.css-1hwzzs3 svg').nth(1);
    this.avatarButton = page.getByRole('button', { name: 'avatar' }); //OK
    //Accoun Option
    this.adminUsersMenuItem = page.getByRole('menuitem', { name: 'Admin Users' });
    this.adminPanelButton = page.getByRole('menuitem', { name: 'Admin Panel' });
    this.myProfileButton = page.getByRole('menuitem', { name: 'My Profile' });
    this.myTicketsButton = page.getByRole('menuitem', { name: 'My Tickets' });
    this.myDevicesButton = page.getByRole('menuitem', { name: 'My Devices' });
    this.signOutButton = page.getByRole('menuitem', { name: 'Sign Out' });
    //Releases Menú
    this.releaseListMenu = page.getByRole('menuitem', { name: 'Release List' });
  }

  async clickIt(): Promise<void> {
    await this.itButton.click();
  }

  async clickProduct() {
    await this.productButton.click();
  }

  async clickRasButton(): Promise<void> {
    await this.rasButton.click();
  }

  async clickCloseModal(): Promise<void> {
    await this.closeModalButton.click();
  }
  //OK
  async clickRelease(): Promise<void> {
    await this.releaseButton.click();
  }

  async clickCalendarButton(): Promise<void> {
    await this.calendarButton.click();
  }

  async clickExtraToolsButton(): Promise<void> {
    await this.extraToolsButton.click();
  }

  async clickFaqsButton(): Promise<void> {
    await this.faqsButton.click();
  }

  async clickPerformanceButton(): Promise<void> {
    await this.perfomanceButton.click();
  }
  //OK
  async clickSettings(): Promise<void> {
    await this.settingsButton.click();
  }

  async clickSlackButton(): Promise<void> {
    await this.slackButton.click();
  }

  async clickAvatarButton(): Promise<void> {
    await this.avatarButton.click();
  }

  async clickAdminPanelButton(): Promise<void> {
    await this.adminPanelButton.click();
  }

  async clickMyProfileButton(): Promise<void> {
    await this.myProfileButton.click();
  }

  async clickMyTicketsButton(): Promise<void> {
    await this.myTicketsButton.click();
  }

  async clickMyDevicesButton(): Promise<void> {
    await this.myDevicesButton.click();
  }

  async clickSignOutButton(): Promise<void> {
    await this.signOutButton.click();
  }

  async clickgoToNextStep(): Promise<void> {
    await this.goToNextStepButton.click();
  }

  getStepText(value: string): Locator {
    return this.page.getByText(value, { exact: true });
  }

  async closeTour(): Promise<void> {
    await this.closeTourButton.click();
  }
  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  //OK
  async goToAdminUsers(): Promise<void> {
    await this.adminUsersMenuItem.click();
  }
  //OK
  async selectPositionRole(roleName: string): Promise<void> {
    await this.positionRoleCombobox.selectOption({ label: roleName });
  }
  //OK
  async clickReleaseList(): Promise<void> {
    await this.releaseListMenu.click();
  }
}
