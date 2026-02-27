import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { HomePage } from '../pages/homePage';
import { MyProfilePage } from '../pages/myProfilePage';

(async () => {
  test.beforeEach(async ({ page }) => {
    const auth = new AuthPage(page);
    await test.step('Navegar a RAS (Release Automation System)', async () => {
      await auth.goto();
      await auth.signIn('it@ras.com');
    });
  });

  test.describe('My Profile', () => {
    test('Debería permitir visualizar mi perfil', async ({ page }) => {
      test.info().annotations.push({
        type: 'Objetivo',
        description: 'Validar que se permita ingresar a mi perfil y la información sea la correcta',
      });
      const home = new HomePage(page);
      const myProfile = new MyProfilePage(page);

      await test.step('Ir a My Profile', async () => {
        await home.clickAvatarButton();
        await home.clickMyProfileButton();
      });
      await test.step('Validar acceso a "My Profile"', async () => {
        await expect(myProfile.myProfileSection, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.imgProfile, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.changePhotoButton, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.profileInformationText, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.nameText, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.imputName, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.emailText, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.imputEmail, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.positionText, 'El elemento no está visible').toBeVisible();
        await expect(myProfile.imputPosition, 'El elemento no está visible').toBeVisible();
      });

      await test.step('Click a Change Photo', async () => {
        await myProfile.clickChangePhotoButton();
        await expect(page.getByText('Your photo comes from Slack')).toBeVisible();
      });
    });
  });

  test.afterEach(async ({ page, context }) => {
    await context.close();
    await page.close();
  });
})();
