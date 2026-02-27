import { type Page, type Locator } from "@playwright/test";

export class SetthingsPage{
    readonly page:Page
    //Calendar
    readonly calendarHeading: Locator;
    readonly categoryNameText: Locator;
    readonly categoryDescriptionText: Locator;
    readonly colorCategoryText: Locator;

    readonly categoryNameTextbox: Locator;
    readonly categoryDescriptionTextbox: Locator
    readonly colorCategoryButton: Locator;
    readonly closeButton: Locator;
    readonly saveCategoryButton: Locator;

    readonly tablaColumnaNameCalendar:Locator;
    readonly rowsCalendarTable: Locator;
    readonly updateCategoryButton: Locator;
    readonly viewMoreButton: Locator;

    //POD´s
    readonly podsHeading: Locator;
    readonly projectText: Locator;
    readonly namePodsText: Locator;
    readonly boardUrlText: Locator;
    readonly membersText: Locator;

    readonly projectCombobox: Locator;
    readonly podNameTextbox: Locator;
    readonly boardUrlTextbox: Locator;
    readonly membersCombobox: Locator;
    readonly addPodButton: Locator;
    readonly rowsPodTable: Locator; 
    readonly updatePodButton: Locator;
    readonly projectEditCombobox: Locator;
    readonly membersEditCombobox: Locator;
    readonly saveChangesButton: Locator;
    readonly confirmCategoryDelete: Locator;
    readonly confirmDelete: Locator;


    constructor(page: Page) {
        this.page = page;
        // Calendar
        this.calendarHeading = page.getByRole('heading', { name: 'CALENDAR' });
        this.categoryNameText = page.getByText('Category Name*');
        this.categoryDescriptionText = page.getByText('Category Description*');
        this.colorCategoryText = page.getByText('Color category*');

        this.categoryNameTextbox = page.getByRole('textbox', { name: 'Category Name', exact: true });
        this.categoryDescriptionTextbox = page.getByRole('textbox', { name: 'Category Description' });
        this.colorCategoryButton = page.getByRole('group').filter({ hasText: 'Color category*#' }).locator('div').nth(1);
        this.closeButton = page.getByText('Close');
        this.saveCategoryButton = page.getByRole('button', { name: 'Save category' });

        this.rowsCalendarTable = page.locator('table').nth(0).locator('tbody tr');
        this.updateCategoryButton = page.getByRole('button', { name: 'Update category' });
        this.viewMoreButton = page.getByText('View more...');
        this.confirmCategoryDelete = page.getByRole('dialog', { name: 'Confirm Category Delete' }).locator('span').first();
        this.confirmDelete = page.getByRole('button', { name: 'Confirm' });

        // POD´s
        this.podsHeading = page.getByRole('heading', { name: 'PODS' });
        this.projectText = page.getByText('Project', { exact: true });
        this.namePodsText = page.locator('label').filter({ hasText: /^Name$/ });
        this.boardUrlText = page.getByText('Board Url');
        this.membersText = page.getByText('Members', { exact: true });
        
        this.projectCombobox = page.getByLabel('Project', { exact: true });
        this.podNameTextbox = page.getByRole('textbox', { name: 'Name', exact: true });
        this.boardUrlTextbox = page.getByRole('textbox', { name: 'Board Url' });
        this.membersCombobox = page.locator('div').filter({ hasText: /^Select an item$/ }).first();
        this.addPodButton = page.getByRole('button', { name: 'Add Pod' });
        this.rowsPodTable = page.locator('table').nth(2).locator('tbody tr');
        this.updatePodButton = page.getByRole('img').nth(0);
        this.projectEditCombobox = page.getByRole('combobox');
        this.membersEditCombobox = page.locator('[id="chakra-modal--body-\\:r75\\:"]').getByText('Select an item');
        this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });

    }

    async fillCategoryName(value: string): Promise<void> {
        await this.categoryNameTextbox.fill(value);
    }

    async fillCategoryDescription(value: string): Promise<void> {
        await this.categoryDescriptionTextbox.fill(value);
    }

    async clickSelectColor(title: string): Promise<void> {
        await this.page.getByTitle(title).click();
    }

    async clickColorCategory(): Promise<void> {
        await this.colorCategoryButton.click();
    }

    async clickCloseButton(): Promise<void> {
        await this.closeButton.click();
    }

    async clickSaveCategory(): Promise<void> {
        await this.saveCategoryButton.click();
    }

    getMessageText(text: string, index: number = 0) {
        return this.page.getByText(text).nth(index);
    } 

    getButtonInRowByNameCalendar(name: string, index: number = 0): Locator {
        return this.page.getByRole('row', { name }).getByRole('button').nth(index);
    }

    async clickButtonInRowByNameCalendar(name: string, index: number = 0): Promise<void> {
        await this.getButtonInRowByNameCalendar(name, index).click();
    }

    async clickUpdateCategoryButton(): Promise<void> {
        await this.updateCategoryButton.click();
    }

    async selectProject(projectName: string): Promise<void> {
        await this.projectCombobox.selectOption({ label: projectName });
    }

    async fillPodName(name: string): Promise<void> {
        await this.podNameTextbox.fill(name);
    }

    async fillBoardUrl(url: string): Promise<void> {
        await this.boardUrlTextbox.fill(url);
    }

    async clickMembersCombobox(): Promise<void> {
        await this.membersCombobox.click();
    }

    async selectMemberOption(memberName: string): Promise<void> {
        const option = this.page.locator('div').filter({ hasText: new RegExp(`^${memberName}$`) }).first();
        await option.click();
    }

    async clickAddPod(): Promise<void> {
        await this.addPodButton.click();
    }

    getTableButtonByRowAndColumn(row: number, column: number): Locator {
        return this.page.locator(`tr:nth-child(${row}) > td:nth-child(${column}) > .chakra-button`);
    }

    async clickTableButtonInfoPod(row: number, column: number): Promise<void> {
        await this.getTableButtonByRowAndColumn(row, column).click();
    }

    async clickUpdatePod(): Promise<void> {
        await this.updatePodButton.click();
    }

    async selectProjectInEdit(projectName: string): Promise<void> {
        await this.projectEditCombobox.selectOption({ label: projectName });
    }

    async clickMembersEdit(): Promise<void> {
        await this.membersEditCombobox.click();
    }

    async selectMemberInEditModalByText(text: string): Promise<void> {
        const option = this.page
        .locator('[id="chakra-modal--body-\\:r75\\:"]')
        .getByText(text, { exact: true });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async clickDeleteReviewByName(name: string): Promise<void> {
        const container = this.page
        .locator('div')
        .filter({ hasText: new RegExp(`^${name}$`) });

        const deleteButton = container.getByLabel('Delete review');

        await deleteButton.click();
    }

    async clickSaveChanges(): Promise<void> {
        await this.saveChangesButton.click();
    }

    async clickViewMore(): Promise<void> {
        await this.viewMoreButton.click();
    }

    async checkConfirmCategoryDelete(): Promise<void> {
        await this.confirmCategoryDelete.check();
    }

    async clickConfirmDelete(): Promise<void> {
        await this.confirmDelete.click();
    }

}