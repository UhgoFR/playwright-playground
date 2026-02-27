import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { HomePage } from '../pages/homePage';
import { MyTicketsPage } from '../pages/myTicketsPage';
import { TicketsPage } from '../pages/ticketsPage';

(async () => {
  test.beforeEach(async ({ page }) => {
    const auth = new AuthPage(page);
    await test.step('Navegar a RAS (Release Automation System)', async () => {
      await auth.goto();
      await auth.signIn('it@ras.com');
    });
  });

  test.describe('My Tickets', () => {
    test('Debería permitir mostrar solo los tickets del release seleccionado', async ({ page }) => {
      test.info().annotations.push({
        type: 'Objetivo',
        description:
          'Validar que se permita buscar y entrar al detalle de los ticket de un release en especifico',
      });
      const home = new HomePage(page);
      const myTickets = new MyTicketsPage(page);
      const tickets = new TicketsPage(page);

      await test.step('Ir a My Tickets', async () => {
        await home.clickAvatarButton();
        await home.clickMyTicketsButton();
        await expect(myTickets.myTicketsHeading, 'El elemento no está visible').toBeVisible();
        await expect(myTickets.alertTicketsIcon, 'El elemento no está visible').toBeVisible();
      });

      await test.step('Seleccionar Release con Tickets', async () => {
        await myTickets.clickSelectOneOptionDropdown();
        await myTickets.selectReleaseOption('July 2nd');
        await myTickets.clickDoneButton();
        await expect(myTickets.ticketDetailsTrMioxxo, 'El elemento no esta visible').toBeVisible();
      });

      await test.step('Ir al detalle del ticket', async () => {
        await myTickets.clickTicketDetailsButton();
        await expect(tickets.ticketDetailHeading, 'El elemento no está visible').toBeVisible();
      });
    });

    test('No debería mostrar tickets de un release donde no se crearon tickets', async ({
      page,
    }) => {
      test.info().annotations.push({
        type: 'Objetivo',
        description:
          'Validar que se permita buscar y entrar al detalle de los ticket de un release en especifico',
      });
      const home = new HomePage(page);
      const myTickets = new MyTicketsPage(page);

      await test.step('Ir a My Tickets', async () => {
        await home.clickAvatarButton();
        await home.clickMyTicketsButton();
      });

      await test.step('Seleccionar Release con Tickets', async () => {
        await myTickets.clickSelectOneOptionDropdown();
        await myTickets.selectReleaseOption('July 1st');
        await myTickets.clickClearSelectionButton();
        await myTickets.selectReleaseOption('July 1st');
        await myTickets.clickDoneButton();
        await expect(myTickets.ticketDetailsTrMioxxo, 'El elemento está visible').not.toBeVisible();
        await expect(myTickets.alertTicketsIcon, 'El elemento no está visible').toBeVisible();
      });
    });
  });

  test.afterEach(async ({ page, context }) => {
    await context.close();
    await page.close();
  });
})();
