import { type Page, type Locator } from "@playwright/test";

export class AuthPage{

    readonly page:Page

    readonly continueWithEmailButton:Locator;
    readonly rasText:Locator;
    readonly releaseAutomationSystemText: Locator;
    readonly selectAnAppCombobox: Locator;

    readonly signInWithSamlText: Locator;
    readonly noSamRasAccountExistInText: Locator;
    readonly pleaseSelectAnExistingText: Locator;
    readonly addNewAccountButton: Locator;

    readonly infoCustomClaimsCanBeText: Locator;
    readonly autoGenerateUserInformationButton: Locator;
    readonly emailTexbox: Locator;
    readonly displayNameTexbox: Locator;
    readonly screenNameTexbox: Locator;
    readonly profilePhotoUrlTexbox: Locator;
    readonly backButton: Locator;
    readonly singInwithSamRasButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.continueWithEmailButton = page.getByRole('button', { name: 'Continue with Email' });
        this.rasText = page.getByText('RAS');
        this.releaseAutomationSystemText = page.getByText('Release Automation System');
        this.selectAnAppCombobox = page.getByRole('combobox');

        this.signInWithSamlText = page.getByText('Sign-in with Saml.ras');
        this.noSamRasAccountExistInText = page.getByText('No Saml.ras accounts exist in');
        this.pleaseSelectAnExistingText = page.getByText('Please select an existing');
        this.addNewAccountButton = page.getByRole('button', { name: 'Add new account' });

        this.infoCustomClaimsCanBeText = page.getByText('info Custom claims can be');
        this.autoGenerateUserInformationButton = page.getByRole('button', { name: 'Auto-generate user information' });
        this.emailTexbox = page.getByLabel('Email');
        this.displayNameTexbox = page.getByLabel('Display name');
        this.screenNameTexbox = page.getByLabel('Screen name');
        this.profilePhotoUrlTexbox = page.getByLabel('Profile photo URL');
        this.backButton = page.getByRole('button', { name: 'Back' });
        this.singInwithSamRasButton = page.getByRole('button', { name: 'Sign in with Saml.ras' });      
         
    }

    async goto() {
        await this.page.goto('');
    }

    async selectApp(optionLabel: string): Promise<void> {
        await this.selectAnAppCombobox.selectOption({ label: optionLabel });
      }

    async openSamlPopup(): Promise<Page> {     
        const popupPromise = this.page.waitForEvent('popup');
        await this.continueWithEmailButton.click ();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        return popup;
   
    }

    async signIn(email: string): Promise<void> {     
        const popup = await this.openSamlPopup();
        const popupSignin = new AuthPage(popup);
        await popupSignin.clickUser(email);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailTexbox.fill(email);
    }

    async fillDisplayName(name: string): Promise<void> {
        await this.displayNameTexbox.fill(name);
    }

    async fillScreenName(screenName: string): Promise<void> {
        await this.screenNameTexbox.fill(screenName);
    }

    async fillProfilePhotoUrl(photoUrl: string): Promise<void> {
        await this.profilePhotoUrlTexbox.fill(photoUrl);
    }

    getUserByEmail(email: string): Locator {
        return this.page.getByText(email, { exact: true });
    }

    async clickUser(email: string): Promise<void> {
        await this.getUserByEmail(email).click();
    }

    async clickAddNewAccount(): Promise<void> {
        await this.addNewAccountButton.click();
    }

    async clickBack(): Promise<void> {
        await this.backButton.click();
    }

    async clickSignInWithSamRas(): Promise<void> {
        await this.singInwithSamRasButton.click();
    } 

    getMessageText(text: string, index: number = 0) {
        return this.page.getByText(text).nth(index);
    }

    async clickAutoGenerateUserInformation(): Promise<void> {
        await this.autoGenerateUserInformationButton.click();
      }

    getDivByExactText(text: string): Locator {
        return this.page.locator('div').filter({ hasText: new RegExp(`^${text}$`) }).first();
    }
    
}

