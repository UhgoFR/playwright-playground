import { type Page, type Locator } from '@playwright/test';

export class TicketsPage {
  readonly page: Page;

  readonly getTicketButton: Locator;
  readonly ticketFormHeader: Locator;
  readonly closeTicketButton: Locator;

  readonly progressActiveFirstStep: Locator;
  readonly progressFirstStep: Locator;
  readonly progressFirstStepTitle: Locator;
  readonly progressFirstStepDescription: Locator;
  readonly progressCompleteFirstStep: Locator;

  readonly progressIncompleteSecondStep: Locator;
  readonly progressSecondStep: Locator;
  readonly progressSecondStepTitle: Locator;
  readonly progressSecondStepDescription: Locator;

  readonly progressIncompleteThirdStep: Locator;
  readonly progressThirdStep: Locator;
  readonly progressThirdStepTitle: Locator;
  readonly progressThirdStepDescription: Locator;

  readonly progressIncompleteFourthStep: Locator;
  readonly progressFourthStep: Locator;
  readonly progressFourthStepTitle: Locator;
  readonly progressFourthStepDescription: Locator;

  readonly packageTeamHeading: Locator;
  readonly podHeading: Locator;
  readonly PodCombobox: Locator;
  readonly pkgHeading: Locator;
  readonly selectPkgCombobox: Locator;
  readonly modalPkgHeading: Locator;
  readonly closePkgModalButton: Locator;
  readonly searchPkgModalImput: Locator;
  readonly checkoutPackageOption: Locator;
  readonly contentClientPackageOption: Locator;
  readonly geolocationPackageOption: Locator;
  readonly nethoneProfilingPackageOption: Locator;
  readonly queriesPackageOption: Locator;
  readonly gamificationPackageOption: Locator;
  readonly spinPlatformPackageOption: Locator;
  readonly alliesPackageOption: Locator;
  readonly coalicionPackageOption: Locator;
  readonly mapsServicesPackageOption: Locator;
  readonly miOxxoPackageOption: Locator;
  readonly clearSelectionButton: Locator;
  readonly donePackageButton: Locator;
  readonly packageMaxSelectAlert: Locator;
  readonly selectPackageCheckout: Locator;
  readonly selectVersionCheckoutCombobox: Locator;
  readonly selectVersionMiOxxoCombobox: Locator;
  readonly validationBranchMainText: Locator;
  readonly supportPackageAlert: Locator;
  readonly orderVersionAlert: Locator;
  readonly namePodText: Locator;
  readonly namePodValue: Locator;
  readonly rolUserValue: Locator;
  readonly userValue: Locator;
  readonly jiraLinkButton: Locator;
  readonly nextStepButton: Locator;
  //Second
  readonly dependenciesHeading: Locator;
  readonly NoRegisteredDependencesText: Locator;
  readonly selectPkgDependenciesCombobox: Locator;
  readonly selectVersionDependenciesCombobox: Locator;
  readonly addDependencyButton: Locator;
  readonly packageDependenceValue: Locator;
  readonly versionDependenceValue: Locator;
  readonly deleteDependencyButton: Locator;
  //Third
  readonly releaseScopeHeading: Locator;
  readonly jiraProject: Locator;
  readonly selectVersionScopeCombobox: Locator;
  readonly changelogHeading: Locator;
  readonly titleFeatureTextbox: Locator;
  readonly descriptionFeatureTextbox: Locator;
  readonly featureTypeCombobox: Locator;
  readonly submitFeatureButton: Locator;
  readonly editChangelogButton: Locator;
  readonly deleteChangelogButton: Locator;
  readonly cancelEditChangelogButton: Locator;
  readonly allIssuesIncludedAlert: Locator;
  readonly issuesTable: Locator;
  readonly previousStepButton: Locator;
  //Fourth
  readonly confirmationHeading: Locator;
  readonly namePodConfirmationText: Locator;
  readonly namePodConfirmationValue: Locator;
  readonly sectionPodInformationCard: Locator;
  readonly packagesHeading: Locator;
  readonly packageText: Locator;
  readonly packageValue: Locator;
  readonly versionText: Locator;
  readonly versionValue: Locator;
  readonly dependenciesCard: Locator;
  readonly changelogCard: Locator;
  readonly releaseScopeHeadingCard: Locator;
  readonly confirmDemoModal: Locator;
  readonly textDemoModal: Locator;
  readonly cancelDemoButton: Locator;
  readonly confirmDemoButton: Locator;
  readonly closeDemoButton: Locator;
  //Downgrade
  readonly detailsTicketMiOxxoButton: Locator;
  readonly downgradeButton: Locator;
  readonly confirmDowngradeDialog: Locator;
  readonly confirmDowngradeButton: Locator;
  readonly closeDowngradeModal: Locator;
  readonly cancelDowngradeModal: Locator;
  readonly additionalInformationTextarea: Locator;
  readonly confirmDowngradeTicketModal: Locator;
  readonly dowgradeMiOxxoBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getTicketButton = page.getByTestId('getTicketReleaseDetailButton');
    this.ticketFormHeader = page.getByTestId('ticketFormHeader');
    this.closeTicketButton = page.getByTestId('close-form-ticket');
    //Progress
    this.progressActiveFirstStep = page.getByTestId('stepNumberActive_0');
    this.progressFirstStep = page.getByTestId('stepIndicator_0');
    this.progressFirstStepTitle = page.getByTestId('stepTitle_0');
    this.progressFirstStepDescription = page.getByTestId('stepDescription_0');
    this.progressCompleteFirstStep = page.getByTestId('stepIconComplete_0');

    this.progressIncompleteSecondStep = page.getByTestId('stepNumberIncomplete_1');
    this.progressSecondStep = page.getByTestId('stepIndicator_1');
    this.progressSecondStepTitle = page.getByTestId('stepTitle_1');
    this.progressSecondStepDescription = page.getByTestId('stepDescription_1');

    this.progressIncompleteThirdStep = page.getByTestId('stepNumberIncomplete_2');
    this.progressThirdStep = page.getByTestId('stepIndicator_2');
    this.progressThirdStepTitle = page.getByTestId('stepTitle_2');
    this.progressThirdStepDescription = page.getByTestId('stepDescription_2');

    this.progressIncompleteFourthStep = page.getByTestId('stepNumberIncomplete_3');
    this.progressFourthStep = page.getByTestId('stepIndicator_3');
    this.progressFourthStepTitle = page.getByTestId('stepTitle_3');
    this.progressFourthStepDescription = page.getByTestId('stepDescription_3');
    //First
    this.packageTeamHeading = page.getByTestId('package&team');
    this.PodCombobox = page.getByTestId('podSelect');
    this.pkgHeading = page.getByTestId('pkgHeading');
    this.selectPkgCombobox = page.getByTestId('pkgCombobox');
    this.modalPkgHeading = page.getByTestId('modalHeaderPakage');
    this.closePkgModalButton = page.getByTestId('closePkgModal');
    this.searchPkgModalImput = page.getByTestId('searchPkgModal');
    this.checkoutPackageOption = page.getByTestId('checkout');
    this.contentClientPackageOption = page.getByTestId('content_client');
    this.geolocationPackageOption = page.getByTestId('geolocation');
    this.nethoneProfilingPackageOption = page.getByTestId('nethone-profiling');
    this.queriesPackageOption = page.getByTestId('queries');
    this.gamificationPackageOption = page.getByTestId('tr-rn-sp-gamification');
    this.spinPlatformPackageOption = page.getByTestId('tr-spinplatform-sdks');
    this.alliesPackageOption = page.getByTestId('tr_allies');
    this.coalicionPackageOption = page.getByTestId('tr_coalicion');
    this.mapsServicesPackageOption = page.getByTestId('tr_maps_services');
    this.miOxxoPackageOption = page.getByTestId('tr_mioxxo');
    this.clearSelectionButton = page.getByTestId('clearSelectionPkgModal');
    this.donePackageButton = page.getByTestId('donePkgModal');
    this.packageMaxSelectAlert = page.getByTestId('alertMaxPkgSelect');
    this.selectPackageCheckout = page.getByTestId('select-package-checkout');
    this.selectVersionCheckoutCombobox = page.getByTestId('select-version-checkout');
    this.selectVersionMiOxxoCombobox = page.getByTestId('select-version-tr_mioxxo');
    this.validationBranchMainText = page.getByTestId('validationVersionBranch');
    this.supportPackageAlert = page.getByTestId('description-support-alert');
    this.orderVersionAlert = page.getByTestId('alertVersion');
    this.namePodText = page.getByTestId('namePod');
    this.namePodValue = page.getByTestId('namePodValue');
    this.rolUserValue = page.getByTestId('rolUser');
    this.userValue = page.getByTestId('userText');
    this.jiraLinkButton = page.getByTestId('boardJira');
    this.nextStepButton = page.getByTestId('nextStepButton');
    //second
    this.dependenciesHeading = page.getByTestId('dependenciesHeading');
    this.NoRegisteredDependencesText = page.getByTestId('dependeciesRegisterText');
    this.selectPkgDependenciesCombobox = page.getByTestId('packageDepencies');
    this.selectVersionDependenciesCombobox = page.getByTestId('versionDependencies');
    this.addDependencyButton = page.getByTestId('addDependencyButton');
    this.packageDependenceValue = page.getByTestId('ValuePackageDependence');
    this.versionDependenceValue = page.getByTestId('valueVersionDependence');
    this.deleteDependencyButton = page.getByTestId('ButtonDeleteDependencies');
    //Third
    this.releaseScopeHeading = page.getByTestId('releaseScopeText');
    this.jiraProject = page.getByTestId('jiraProject');
    this.selectVersionScopeCombobox = page.getByTestId('versionScope');
    this.changelogHeading = page.getByTestId('changeLogHeading');
    this.titleFeatureTextbox = page.getByTestId('titleTextImput');
    this.descriptionFeatureTextbox = page.getByTestId('descriptionTextImput');
    this.featureTypeCombobox = page.getByTestId('typeComboBox');
    this.submitFeatureButton = page.getByTestId('submitButton');
    this.editChangelogButton = page.getByTestId('editButton');
    this.deleteChangelogButton = page.getByTestId('deleteButton');
    this.cancelEditChangelogButton = page.getByTestId('cancelButton');
    this.allIssuesIncludedAlert = page.getByTestId('allIssuesIncludedAlert');
    this.issuesTable = page.getByTestId('issuesTable');
    this.previousStepButton = page.getByTestId('previousStepButton');
    //Fourth
    this.confirmationHeading = page.getByTestId('confirmationHeading');
    this.namePodConfirmationText = page.getByTestId('namePod');
    this.namePodConfirmationValue = page.getByTestId('namePodValue');
    this.sectionPodInformationCard = page.getByTestId('podInformationCard');
    this.packagesHeading = page.getByTestId('pakage/sHeading');
    this.packageText = page.getByTestId('packageListText');
    this.packageValue = page.getByTestId('valuePackageList');
    this.versionText = page.getByTestId('versionListText');
    this.versionValue = page.getByTestId('valueVersion');
    this.dependenciesCard = page.getByTestId('dependenciesCard');
    this.changelogCard = page.getByTestId('changelogCard');
    this.releaseScopeHeadingCard = page.getByTestId('releaseScopeCard');
    this.confirmDemoModal = page.getByTestId('confirm-demo-modal');
    this.textDemoModal = page.getByTestId('text-demo-modal');
    this.cancelDemoButton = page.getByTestId('cancel-demo-button');
    this.confirmDemoButton = page.getByTestId('confirm-demo-button');
    this.closeDemoButton = page.getByTestId('close-demo-button');
    //Downgrade
    this.detailsTicketMiOxxoButton = page.getByTestId('btn-details-release-tr_mioxxo');
    this.downgradeButton = page.getByTestId('downgradeButton');
    this.confirmDowngradeDialog = page.getByTestId('confirmationDowngradeCheckbox');
    this.confirmDowngradeButton = page.getByTestId('downgradeTicketButton');
    this.closeDowngradeModal = page.getByTestId('closeModalDowngradeButton');
    this.cancelDowngradeModal = page.getByTestId('cancelDowngradeButton');
    this.additionalInformationTextarea = page.getByTestId('additionalInformationTextarea');
    this.confirmDowngradeTicketModal = page.getByTestId('confirmDowngradeTicketHeader');
    this.dowgradeMiOxxoBadge = page.getByTestId('downgradeText-tr_mioxxo');
  }

  async clickGetTickets(): Promise<void> {
    await this.getTicketButton.click();
  }

  async selectPod(value: string): Promise<void> {
    await this.PodCombobox.selectOption(value);
  }

  async clickSelectPackages(): Promise<void> {
    await this.selectPkgCombobox.click();
  }

  async clickCloseModalPackage(): Promise<void> {
    await this.closePkgModalButton.click();
  }

  async fillSearchPkgModal(text: string): Promise<void> {
    await this.searchPkgModalImput.fill(text);
  }

  async clickCheckoutPackageOption(): Promise<void> {
    await this.checkoutPackageOption.click();
  }

  async clickContentClientPackageOption(): Promise<void> {
    await this.contentClientPackageOption.click();
  }

  async clickGeolocationPackageOption(): Promise<void> {
    await this.geolocationPackageOption.click();
  }

  async clickNethoneProfilingPackageOption(): Promise<void> {
    await this.nethoneProfilingPackageOption.click();
  }

  async clickQueriesPackageOption(): Promise<void> {
    await this.queriesPackageOption.click();
  }

  async clickGamificationPackageOption(): Promise<void> {
    await this.gamificationPackageOption.click();
  }

  async clickSpinPlatformPackageOption(): Promise<void> {
    await this.spinPlatformPackageOption.click();
  }

  async clickAlliesPackageOption(): Promise<void> {
    await this.alliesPackageOption.click();
  }

  async clickCoalicionPackageOption(): Promise<void> {
    await this.coalicionPackageOption.click();
  }

  async clickMapsServicesPackageOption(): Promise<void> {
    await this.mapsServicesPackageOption.click();
  }

  async clickMiOxxoPackageOption(): Promise<void> {
    await this.miOxxoPackageOption.click();
  }

  async clickClearSelectionModalPackage(): Promise<void> {
    await this.clearSelectionButton.click();
  }

  async clickDonePackage(): Promise<void> {
    await this.donePackageButton.click();
  }

  async selectVersionCheckout(versionValue: string): Promise<void> {
    await this.selectVersionCheckoutCombobox.selectOption(versionValue);
  }

  async selectVersionMiOxxo(versionValue: string): Promise<void> {
    await this.selectVersionMiOxxoCombobox.selectOption(versionValue);
  }

  async clickLinkJira(): Promise<void> {
    await this.jiraLinkButton.click();
  }

  async clickNextStep(): Promise<void> {
    await this.nextStepButton.click();
  }

  async clickCloseTickets(): Promise<void> {
    await this.closeTicketButton.click();
  }

  async selectPackageDependency(label: string): Promise<void> {
    await this.selectPkgDependenciesCombobox.selectOption({ label });
  }

  async selectVersionDependency(value: string): Promise<void> {
    await this.selectVersionDependenciesCombobox.selectOption(value);
  }

  async clickAddDependency(): Promise<void> {
    await this.addDependencyButton.click();
  }

  async clickDeleteDependency(): Promise<void> {
    await this.deleteDependencyButton.click();
  }

  async selectVersionScope(label: string): Promise<void> {
    await this.selectVersionScopeCombobox.selectOption({ label });
  }

  async fillTitleFeature(title: string): Promise<void> {
    await this.titleFeatureTextbox.fill(title);
  }

  async fillDescriptionFeature(description: string): Promise<void> {
    await this.descriptionFeatureTextbox.fill(description);
  }

  async selectFeatureType(label: string): Promise<void> {
    await this.featureTypeCombobox.selectOption({ label });
  }

  async clickSubmitFeature(): Promise<void> {
    await this.submitFeatureButton.click();
  }

  async clickEditChangelog(): Promise<void> {
    await this.editChangelogButton.click();
  }

  async clickDeleteChangelog(): Promise<void> {
    await this.deleteChangelogButton.click();
  }

  async clickCancelEditChangelog(): Promise<void> {
    await this.cancelEditChangelogButton.click();
  }

  async clickPreviousStep(): Promise<void> {
    await this.previousStepButton.click();
  }

  async clickCancelDemo(): Promise<void> {
    await this.cancelDemoButton.click();
  }

  async clickConfirmDemo(): Promise<void> {
    await this.confirmDemoButton.click();
  }

  async clickCloseModalDemo(): Promise<void> {
    await this.closeDemoButton.click();
  }

  async clickDetailsTicketMiOxxo(): Promise<void> {
    await this.detailsTicketMiOxxoButton.click();
  }

  getMessageText(text: string, index: number = 0) {
    return this.page.getByText(text).nth(index);
  }

  async clickDowngrade(): Promise<void> {
    await this.downgradeButton.click();
  }

  async checkConfirmDowngrade(): Promise<void> {
    await this.confirmDowngradeDialog.check();
  }

  async clickConfirmDowngrade(): Promise<void> {
    await this.confirmDowngradeButton.click();
  }

  async clickCloseDowngradeModal(): Promise<void> {
    await this.closeDowngradeModal.click();
  }

  async clickCancelDowngradeModal(): Promise<void> {
    await this.cancelDowngradeModal.click();
  }

  async fillAditionalInformationDowngradeModal(text: string): Promise<void> {
    await this.additionalInformationTextarea.fill(text);
  }
}
