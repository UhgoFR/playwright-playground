import { type Page, type Locator } from '@playwright/test';

export class MyProfilePage {
  readonly page: Page;

  readonly myProfileSection: Locator;
  readonly imgProfile: Locator;
  readonly changePhotoButton: Locator;
  readonly profileInformationText: Locator;
  readonly nameText: Locator;
  readonly imputName: Locator;
  readonly emailText: Locator;
  readonly imputEmail: Locator;
  readonly positionText: Locator;
  readonly imputPosition: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myProfileSection = page.getByTestId('myProfile');
    this.imgProfile = page.getByTestId('imgProfile');
    this.changePhotoButton = page.getByTestId('changePhotoButton');
    this.profileInformationText = page.getByTestId('profileInformationText');
    this.nameText = page.getByTestId('nameText');
    this.imputName = page.getByTestId('imputName');
    this.emailText = page.getByTestId('emailText');
    this.imputEmail = page.getByTestId('imputEmail');
    this.positionText = page.getByTestId('positionText');
    this.imputPosition = page.getByTestId('imputPosition');
  }

  async clickChangePhotoButton(): Promise<void> {
    await this.changePhotoButton.click();
  }
}
