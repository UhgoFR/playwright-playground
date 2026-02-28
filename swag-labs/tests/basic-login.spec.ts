import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage } from '../../swag-labs/pages';
import { TestUsers, DEFAULT_PASSWORD } from '../../swag-labs/types';

test.describe('Basic Login Tests', () => {
  test('Successful login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);

    const isLoaded = await productsPage.isProductsPageLoaded();
    await expect(isLoaded).toBe(true);
    const productsTitle = await productsPage.getProductsTitle();
    await expect(productsTitle).toBe('Products');
  });

  test('Failed login with locked user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(TestUsers.LOCKED_OUT_USER, DEFAULT_PASSWORD);

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
