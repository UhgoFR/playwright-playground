import { type Page, type Locator } from "@playwright/test";

export class ReleasesPage{
    
    readonly page:Page

    readonly addNewReleaseButton: Locator;
    readonly createReleaseHeading: Locator;
    readonly nameText: Locator;
    readonly versionText: Locator;
    readonly startDateText: Locator;
    readonly endDateText: Locator;
    readonly colorCategoryText: Locator;
    readonly descriptionNotesText: Locator;
    readonly nameReleaseTextbox: Locator;
    readonly versionReleaseTextbox: Locator;
    readonly startDateReleaseTextbox: Locator;
    readonly endDateReleaseTextbox: Locator;
    readonly colorCategoryReleaseButton: Locator;
    readonly closeButton: Locator;
    readonly descriptionNotesTextbox: Locator;
    readonly saveReleaseButton: Locator;
    readonly releaseInformationHeading: Locator;
    readonly editReleaseButton: Locator;
    readonly gitBranchTextbox: Locator;
    readonly slackNotificationsCheckbox: Locator 
    readonly updateReleaseButton: Locator;
    readonly nextButton: Locator;
    

    
    

constructor(page: Page) {

    this.page = page;

    this.addNewReleaseButton = page.getByRole('button', { name: 'Add New Release' });
    this.createReleaseHeading = page.getByRole('heading', { name: 'CREATE RELEASE' });
    this.nameText = page.getByText('Name*');
    this.versionText = page.getByText('Version*');
    this.startDateText = page.getByText('Start date*');
    this.endDateText = page.getByText('End date*');
    this.colorCategoryText = page.getByText('Calendar Color*');
    this.descriptionNotesText = page.getByText('Description/Notes');
    this.nameReleaseTextbox = page.getByRole('textbox', { name: 'Name' });
    this.versionReleaseTextbox = page.getByRole('textbox', { name: 'Version' });
    this.startDateReleaseTextbox = page.getByRole('textbox', { name: 'Start date' });
    this.endDateReleaseTextbox = page.getByRole('textbox', { name: 'End date' });
    this.colorCategoryReleaseButton = page.getByRole('group').filter({ hasText: 'Calendar Color*#' }).locator('div').nth(1);
    this.closeButton = page.getByText('Close');
    this.descriptionNotesTextbox = page.getByRole('textbox', { name: 'Description/Notes' });
    this.saveReleaseButton = page.getByRole('button', { name: 'Save Release' });
    this.releaseInformationHeading = page.getByRole('heading', { name: 'RELEASE INFORMATION' });
    this.editReleaseButton = page.getByRole('button', { name: 'Edit Release' });
    this.gitBranchTextbox = page.getByRole('textbox', { name: 'Git Branc' });
    this.slackNotificationsCheckbox = page.getByRole('group').filter({ hasText: 'Enabled' }).locator('span').first();
    this.updateReleaseButton = page.getByRole('button', { name: 'Update Release' });
    this.nextButton= page.getByRole('button', { name: 'Next' });


}

async clickAddNewRelease(): Promise<void> {
  await this.addNewReleaseButton.click();
}

async fillNameRelease(name: string): Promise<void> {
  await this.nameReleaseTextbox.fill(name);
}

async fillVersionRelease(version: string): Promise<void> {
  await this.versionReleaseTextbox.fill(version);
}

async fillStartDateRelease(date: string): Promise<void> {
  await this.startDateReleaseTextbox.fill(date);
}

async fillEndDateRelease(date: string): Promise<void> {
  await this.endDateReleaseTextbox.fill(date);
}

async clickColorCategory(): Promise<void> {
  await this.colorCategoryReleaseButton.click();
}

async clickSelectColor(title: string): Promise<void> {
  await this.page.getByTitle(title).click();
}

async clickCloseButton(): Promise<void> {
  await this.closeButton.click();
}

async fillDescriptionNotes(text: string): Promise<void> {
  await this.descriptionNotesTextbox.fill(text);
}

async clickSaveRelease(): Promise<void> {
  await this.saveReleaseButton.click();
}

getMessageText(text: string, index: number = 0) {
  return this.page.getByText(text).nth(index);
}

async clickViewDetailsRelease(rowName: string): Promise<void> {
  const button = this.page.getByRole('row', { name: rowName }).getByRole('button');
  await button.click();
}

async clickEditRelease(): Promise<void> {
  await this.editReleaseButton.click();
}

async toggleSlackNotifications(): Promise<void> {
  await this.slackNotificationsCheckbox.click();
}

async clickUpdateRelease(): Promise<void> {
  await this.updateReleaseButton.click();
}

async clickNext(): Promise<void> {
  await this.nextButton.click();
}


}