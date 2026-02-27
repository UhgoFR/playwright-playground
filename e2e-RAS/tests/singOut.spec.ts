import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { HomePage } from '../pages/homePage';

(async () => {
  test.beforeEach(async ({ page }) => {
    const auth = new AuthPage(page);
    await test.step('Navegar a RAS (Release Automation System)', async () => {
      await auth.goto();
      await auth.signIn('it@ras.com');
    });
  });

  test.describe('SingOut', () => {
    test('Debería permitir cerrar sesión', async ({ page }) => {
      test.info().annotations.push({
        type: 'Objetivo',
        description: 'Validar que se permita cerrar sesión del usuario',
      });
      const auth = new AuthPage(page);
      const home = new HomePage(page);

      await test.step('Ir a las opciones de avatar y dar clic en cerrar sesión', async () => {
        await home.clickAvatarButton();
        await home.clickSignOutButton();
      });

      await test.step('Validar cierre de sesión', async () => {
        await expect(auth.continueWithEmailButton).toBeVisible();
      });
    });
  });

  test.afterEach(async ({ page, context }) => {
    await context.close();
    await page.close();
  });
})();
