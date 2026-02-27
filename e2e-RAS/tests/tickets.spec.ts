import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { HomePage } from '../pages/homePage';
import { ReleasesPage } from '../pages/releasesPage';
import { TicketsPage } from '../pages/ticketsPage';

(async () => {
  test.beforeEach(async ({ page }) => {
    const auth = new AuthPage(page);
    await auth.goto();
    await auth.signIn('it@ras.com');
  });

  test.describe('Get Tickets', () => {
    test('Debería permitir crear un ticket para el release', async ({ page }) => {
      test.info().annotations.push({
        type: 'Objetivo',
        description: 'Validar que se permita crear un ticket para subirse al release train',
      });
      const home = new HomePage(page);
      const release = new ReleasesPage(page);
      const tickets = new TicketsPage(page);

      await test.step('Ir a release List', async () => {
        await home.clickRelease();
        await home.clickReleaseList();
      });

      await test.step('Navegar a la pagina del release', async () => {
        await release.clickNext();
        await release.clickNext();
      });

      await test.step('Seleccionar release a editar dando clic a [View Details]', async () => {
        await release.clickViewDetailsRelease('25.7.3');
      });

      await test.step('Click a get tickets', async () => {
        await tickets.clickGetTickets();
      });
      await test.step('Validar elementos del form tickets', async () => {
        await expect(tickets.ticketFormHeader).toBeVisible();
      });

      await test.step('First Ticket Form ', async () => {
        await tickets.selectPod('Valor en tienda');
        await tickets.clickSelectPackages();
        await tickets.clickMiOxxoPackageOption();
        await tickets.clickDonePackage();
        await tickets.selectVersionMiOxxo('4.8.0-rc.181');
      });

      await test.step('Click a Next Step', async () => {
        await tickets.clickNextStep();
      });

      await test.step('Second Ticket Form', async () => {
        await tickets.selectPackageDependency('tr_superapp_theme');
        await tickets.selectVersionDependency('7.15.0');
        await tickets.clickAddDependency();
      });

      await test.step('Click a Next Step', async () => {
        await tickets.clickNextStep();
      });

      await test.step('Third Ticket Form', async () => {
        await tickets.selectVersionScope('2506.02');
        await tickets.fillTitleFeature('Update React Native');
        await tickets.fillDescriptionFeature('Update de react Native a la versión 75');
        await tickets.selectFeatureType('IMPROVEMENT');
        await tickets.clickSubmitFeature();
      });

      await test.step('Click a Next Step', async () => {
        await tickets.clickNextStep();
      });

      await test.step('Fourth Ticket Form', async () => {
        await tickets.clickNextStep();
        await tickets.clickConfirmDemo();
      });

      await test.step('Validar generación de ticket', async () => {
        await expect(tickets.getMessageText('Tickets created.')).toBeVisible();
      });
    });

    test('Debería permitir realizar downgrade a un paquete', async ({ page }) => {
      test.info().annotations.push({
        type: 'Objetivo',
        description: 'Validar que se permita realizar downgrade a un paquete del release',
      });
      const home = new HomePage(page);
      const release = new ReleasesPage(page);
      const tickets = new TicketsPage(page);

      await test.step('Ir a release List', async () => {
        await home.clickRelease();
        await home.clickReleaseList();
      });

      await test.step('Navegar a la pagina del release', async () => {
        await release.clickNext();
        await release.clickNext();
      });

      await test.step('Seleccionar release a editar dando clic a [View Details]', async () => {
        await release.clickViewDetailsRelease('25.7.3');
      });

      await test.step('Flujo downgrade paquete', async () => {
        await tickets.clickDetailsTicketMiOxxo();
        await tickets.clickDowngrade();
        await expect(
          tickets.confirmDowngradeTicketModal,
          'El elemento no está visible'
        ).toBeVisible();
        await tickets.clickCloseDowngradeModal();
        await tickets.clickDowngrade();
        await tickets.clickCancelDowngradeModal();
        await tickets.clickDowngrade();
        await expect(tickets.confirmDowngradeButton).not.toBeEnabled();
        await tickets.checkConfirmDowngrade();
        await expect(tickets.confirmDowngradeButton).toBeEnabled();
        await tickets.clickConfirmDowngrade();
        await expect(tickets.dowgradeMiOxxoBadge).toBeVisible();
      });
    });
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.close();
  });
})();
