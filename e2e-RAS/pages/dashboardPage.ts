import { type Page, type Locator } from "@playwright/test";

export class DashboardPage{
    readonly page:Page

    readonly passengers: Locator;
    readonly tickets: Locator;
    readonly releasecarousel: Locator;
    readonly participantsRelease: Locator;

    constructor(page: Page) {
        this.page = page;

        this.passengers = page.getByTestId('passengersCount');
        this.tickets = page.getByTestId('ticketsCount');
        this.releasecarousel = page.getByTestId('releasecarousel25.7.2');
        this.participantsRelease = page.getByTestId('participantsReleaseDashboard');

    }

    async clickReleaseCarousel(): Promise<void> {
        await this.releasecarousel.click();
    }



}