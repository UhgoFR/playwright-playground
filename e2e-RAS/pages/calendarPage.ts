import { type Page, type Locator, type Download } from "@playwright/test";

export class CalendarPage {
    readonly page:Page

    readonly calendarYearViewMenuItem: Locator;
    readonly calendarMenuItem: Locator;

    readonly yearViewLabel: Locator;
    readonly downloadButton: Locator;

    readonly calendarLabel: Locator;
    readonly filterByEventsLabel: Locator;
    readonly eventsMenuButton: Locator;
    readonly filterByReleaseVersionLabel: Locator;
    readonly selectReleaseVersionComboBox: Locator;
    readonly selectMonthComboBox: Locator;
    readonly deleteAllEventsButton: Locator;
    readonly todayButton: Locator;
    readonly backButton: Locator;
    readonly nextButton: Locator;
    readonly monthButton: Locator;
    readonly weekButton: Locator;
    readonly dayButton: Locator;
    readonly agendaButton: Locator;
    readonly sundayCalendarButton: Locator;
    readonly invalidDateMessage: Locator;
    readonly mondayCalendarButton: Locator;

    readonly closeCreateEventButton: Locator;
    readonly selectReleaseEventsComboBox: Locator;
    readonly addNameEventsTextbox: Locator;
    readonly categoryEventsComboBox: Locator;
    readonly startDateEventsDate: Locator;
    readonly endDateEventsDate: Locator;
    readonly startTimeEventsComboBox: Locator;
    readonly endTimeEventsComboBox: Locator;
    readonly multipleDayEventCheckbox: Locator;
    readonly fullDayEventsCheckBox: Locator;
    readonly recurrenceEventsCheckBox: Locator;
    readonly tituloLinksEventsTextBox : Locator;
    readonly linkEventsTextBox: Locator;
    readonly notasEventsTextBox: Locator;
    readonly agregarLinkEventsButton: Locator;
    readonly eliminarLinkEventsButton: Locator;
    readonly createEventsButton: Locator;
    readonly updateEventsButton: Locator;
    readonly deleteEventsButton: Locator;

    readonly selectEventButton: Locator;
    readonly editionEventButton: Locator;
    readonly closeSelectEvent: Locator;
    readonly cancelDeleteEvent: Locator;
    readonly duplicateEventButton: Locator;
    readonly titleEventTexbox: Locator;
    


    constructor(page: Page) {
        this.page = page;

        this.calendarYearViewMenuItem = page.getByRole('menuitem', { name: 'Year View' });
        this.calendarMenuItem = page.getByRole('menuitem', { name: 'Calendar' });
        this.yearViewLabel = page.getByRole('heading', { name: 'YEAR VIEW' });
        this.downloadButton = page.getByRole('button', { name: 'Download' });

        this.calendarLabel = page.getByRole('heading', { name: 'CALENDAR' });
        this.filterByEventsLabel = page.getByText('Filter by events');
        this.eventsMenuButton = page.getByRole('button', { name: 'Events', exact: true });
        this.filterByReleaseVersionLabel = page.getByText('Filter by Release Version');
        this.selectReleaseVersionComboBox = page.getByTestId('select-version').getByRole('combobox');
        this.selectMonthComboBox = page.getByRole('combobox').nth(1);
        this.deleteAllEventsButton = page.getByRole('button', { name: 'Delete all events' });
        this.todayButton = page.getByRole('button', { name: 'Today' });
        this.backButton = page.getByRole('button', { name: 'Back' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.monthButton = page.getByRole('button', { name: 'Month' });
        this.weekButton = page.getByRole('button', { name: 'Week' });
        this.dayButton = page.getByRole('button', { name: 'Day', exact: true });
        this.agendaButton = page.getByRole('button', { name: 'Agenda' });
        this.sundayCalendarButton = page.locator('.rbc-day-bg').first();
        this.invalidDateMessage = page.getByText('Invalid date');
        this.mondayCalendarButton = page.locator('.rbc-row-bg > div:nth-child(2)').first();

        this.closeCreateEventButton = page.getByRole('img').first();
        this.selectReleaseEventsComboBox = page.locator('#release');
        this.addNameEventsTextbox = page.getByRole('textbox', { name: 'Add a name' });
        this.categoryEventsComboBox = page.locator('#category');
        this.startDateEventsDate = page.locator('#start_date');
        this.endDateEventsDate = page.locator('#end_date');
        this.startTimeEventsComboBox = page.locator('#start_time');
        this.endTimeEventsComboBox  = page.locator('#end_time');
        this.multipleDayEventCheckbox = page.getByRole('dialog', { name: 'Create Event' }).locator('span').nth(0);
        this.fullDayEventsCheckBox = page.getByRole('dialog', { name: 'Create Event' }).locator('span').nth(2);
        this.recurrenceEventsCheckBox = page.locator('#recurrency');
        this.tituloLinksEventsTextBox = page.getByRole('textbox', { name: 'Title...' });
        this.linkEventsTextBox = page.getByRole('textbox', { name: 'Url...' });
        this.notasEventsTextBox = page.getByRole('textbox', { name: 'Add notes' });
        this.agregarLinkEventsButton = page.getByRole('button').filter({ hasText: /^$/ });
        this.eliminarLinkEventsButton = page.getByRole('img').nth(1);
        this.createEventsButton = page.getByRole('button', { name: 'Create' }); 
        this.updateEventsButton = page.getByRole('button', { name: 'Update' });
        this.deleteEventsButton = page.getByRole('button', { name: 'Delete' });

        this.editionEventButton = page.getByRole('dialog').getByRole('img').first();
        this.closeSelectEvent = page.getByRole('dialog').getByRole('img').nth(2);

        this.cancelDeleteEvent = page.getByRole('button', { name: 'Cancel' });   
        this.duplicateEventButton = page.getByRole('button', { name: 'Duplicate' });
        this.titleEventTexbox = page.getByRole('textbox', { name: 'Event title' });
      

    }

    async clickCalendarYearViewMenuItem(): Promise<void> {
        await this.calendarYearViewMenuItem.click();
      }
    
    async clickCalendarMenuItem(): Promise<void> {
        await this.calendarMenuItem.click();
      }
    
    async clickEventsMenuButton(): Promise<void> {
        await this.eventsMenuButton.click();
      }

    async selectReleaseVersion(versionName: string): Promise<void> {
        await this.selectReleaseVersionComboBox.selectOption({ label: versionName });
      }

    async selectMonth(monthName: string): Promise<void> {
        await this.selectMonthComboBox.selectOption({ label: monthName });
      }

    async clickDeleteAllEventsButton(): Promise<void> {
        await this.deleteAllEventsButton.click();
      }

    async clickTodayButton(): Promise<void> {
        await this.todayButton.click();
      }
    async clickBackButton(): Promise<void> {
        await this.backButton.click();
      }

    async clickNextButton(): Promise<void> {
        await this.nextButton.click();
      }

    async clickMonthButton(): Promise<void> {
        await this.monthButton.click();
      }

    async clickWeekButton(): Promise<void> {
        await this.weekButton.click();
      }

    async clickDayButton(): Promise<void> {
        await this.dayButton.click();
      }

    async clickAgendaButton(): Promise<void> {
        await this.agendaButton.click();
      }

    async clickSundayCalendarButton(): Promise<void> {
        await this.sundayCalendarButton.click();
      }

    async clickMondayCalendarButton(): Promise<void> {
        await this.mondayCalendarButton.click();
      }

    async clickCloseCreateEventButton(): Promise<void> {
        await this.closeCreateEventButton.click();
      }

    async selectReleaseEventByLabel(optionLabel: string): Promise<void> {
        await this.selectReleaseEventsComboBox.selectOption({ label: optionLabel });
      }

    async fillAddNameEventsTextbox(name: string): Promise<void> {
        await this.addNameEventsTextbox.fill(name);
      }

    async selectCategoryByLabel(categoryLabel: string): Promise<void> {
        await this.categoryEventsComboBox.selectOption({ label: categoryLabel });
      }

    async setStartDate(date: string): Promise<void> {
        await this.startDateEventsDate.fill(date);
      }
    
    async setEndDate(date: string): Promise<void> {
        await this.endDateEventsDate.fill(date);
      }      

    async selectStartTimeByLabel(timeLabel: string): Promise<void> {
        await this.startTimeEventsComboBox.selectOption({ label: timeLabel });
      }

    async selectEndTimeByLabel(timeLabel: string): Promise<void> {
        await this.endTimeEventsComboBox.selectOption({ label: timeLabel });
      }

    async toggleFullDayEvents(): Promise<void> {
        await this.fullDayEventsCheckBox.click();
      }

    async selectRecurrenceOptionByLabel(optionLabel: string): Promise<void> {
        await this.recurrenceEventsCheckBox.selectOption({ label: optionLabel });
      }

    async fillTituloLinksEventsTextBox(title: string): Promise<void> {
        await this.tituloLinksEventsTextBox.fill(title);
      }
    
    async fillLinkEventsTextBox(url: string): Promise<void> {
        await this.linkEventsTextBox.fill(url);
      }
      
    async fillNotasEventsTextBox(notes: string): Promise<void> {
        await this.notasEventsTextBox.fill(notes);
      }
    
    async clickAgregarLinkEventsButton(): Promise<void> {
        await this.agregarLinkEventsButton.click();
      }
      
    async clickEliminarLinkEventsButton(): Promise<void> {
        await this.eliminarLinkEventsButton.click();
      }
      
    async clickCreateEventsButton(): Promise<void> {
        await this.createEventsButton.click();
      }

    getSelectEventButtonByText(text: string, index?: number, exact: boolean = true) {
        const locator = this.page.getByText(text, { exact });
        return index !== undefined ? locator.nth(index) : locator;
      }
      
    async clickSelectEventButtonByText(text: string, index?: number, exact: boolean = true): Promise<void> {
        await this.getSelectEventButtonByText(text, index, exact).click();
      }

    getSelectEventButtonMothView(text: string, index?: number, exact: boolean = true) {
        const locator = this.page.getByLabel('Month View').getByText(text, { exact });
        return index !== undefined ? locator.nth(index) : locator;
      }
      
    async clickSelectEventMothView(text: string, index?: number, exact: boolean = true): Promise<void> {
        await this.getSelectEventButtonMothView(text, index, exact).click();
      }
      
    async clickEditarEventButton(): Promise<void> {
        await this.editionEventButton.click();
      }

    async clickCloseSelectEvent(): Promise<void> {
        await this.closeSelectEvent.click();
      }
   
    async clickUpdateEventsButton(): Promise<void> {
        await this.updateEventsButton.click();
      }

    async clickDeleteEventsButton(): Promise<void> {
        await this.deleteEventsButton.click();
      }

    async clickCancelDeleteEvent(): Promise<void> {
        await this.cancelDeleteEvent.click();
      }
      
    getMessageText(text: string, index: number = 0) {
        return this.page.getByText(text).nth(index);
      }

    async clickDuplicateEventButton(): Promise<void> {
        await this.duplicateEventButton.click();
      }

    async fillTitleEventTextbox(title: string): Promise<void> {
        await this.titleEventTexbox.fill(title);
      }
      
    async triggerDownload(): Promise<Download> {
      const downloadPromise = this.page.waitForEvent('download');
      await this.page.getByText('Download').click();
      const download = await downloadPromise;
      return download; 
    }  
  
    async toggleMultipleDayEvent(): Promise<void> {
      await this.multipleDayEventCheckbox.click();
    }

}