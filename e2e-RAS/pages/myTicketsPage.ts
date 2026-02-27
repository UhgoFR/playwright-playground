import { type Page, type Locator } from '@playwright/test';

export class MyTicketsPage {
  readonly page: Page;

  readonly myTicketsHeading: Locator;
  readonly alertTicketsIcon: Locator;
  readonly selectOneOptionDropdown: Locator;
  readonly releaseOptionByText: (release: string) => Locator;
  readonly clearSelectionButton: Locator;
  readonly doneButton: Locator;
  readonly ticketDetailsTrMioxxo: Locator;
  readonly ticketDetailsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.myTicketsHeading = page.getByTestId('myTickets');
    this.alertTicketsIcon = page.getByTestId('alert-tickets');
    this.selectOneOptionDropdown = page
      .locator('div')
      .filter({ hasText: /^Select one option$/ })
      .nth(1);
    this.releaseOptionByText = (release: string) => page.getByText(release, { exact: true });
    this.clearSelectionButton = page.getByRole('button', { name: 'Clear Selection' });
    this.doneButton = page.getByRole('button', { name: 'Done' });
    this.ticketDetailsTrMioxxo = page.getByTestId('ticket-details tr_mioxxo');
    this.ticketDetailsButton = page
      .getByTestId('ticket-details tr_mioxxo')
      .getByRole('button', { name: 'Details' });
  }

  async clickSelectOneOptionDropdown(): Promise<void> {
    await this.selectOneOptionDropdown.click();
  }

  async selectReleaseOption(release: string): Promise<void> {
    await this.releaseOptionByText(release).click();
  }

  async clickClearSelectionButton(): Promise<void> {
    await this.clearSelectionButton.click();
  }

  async clickDoneButton(): Promise<void> {
    await this.doneButton.click();
  }

  async clickTicketDetailsButton(): Promise<void> {
    await this.ticketDetailsButton.click();
  }
}
