import { type Page, type Locator } from "@playwright/test";

export class UsersPage{

    readonly page:Page

    readonly userPageText: Locator;
    readonly editUserButton: Locator;
    readonly closeEditUserButton: Locator;
    readonly fullNameInput: Locator;
    readonly saveUserButton: Locator;
    

    constructor(page: Page) {
        this.page = page;

        this.userPageText = page.getByRole('heading', { name: 'USER PAGE' });
        this.closeEditUserButton = page.getByRole('button', { name: 'Close' });
        this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
        this.saveUserButton = page.getByRole('button', { name: 'Update' });
        
        
    }

    getEditUserButton(email: string): Locator {
        return this.page.locator('table >> tbody >> tr', {
            has: this.page.locator(`text=${email}`)
             }).getByRole('button', { name: 'Edit user' });            
    }

    async clickEditUserByEmail(email: string): Promise<void> {
        await this.getEditUserButton(email).click();
    }

    async closeEditUserModal(): Promise<void> {
        await this.closeEditUserButton.click();
    }

    async fillFullName(name: string): Promise<void> {
        await this.fullNameInput.fill(name);
    }

    async saveUser(): Promise<void> {
        await this.saveUserButton.click();
    }

   getDeleteUserButton(email: string): Locator {
    return this.page.locator('table tbody tr', {
        has: this.page.locator(`text=${email}`)
        }).getByRole('button', { name: 'Delete user' });
    }

    async clickDeleteUserByEmail(email: string): Promise<void> {
        await this.getDeleteUserButton(email).click();
    }

    getMessageText(text: string, index: number = 0) {
        return this.page.getByText(text).nth(index);
      } 

    getFullNameText(email: string, name: string): Locator {
        return this.page.locator('table tbody tr', {
        has: this.page.getByText(email, { exact: true })
        }).getByRole('cell', { name });
    }   



}