import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage } from '../../swag-labs/pages';
import { TestUsers, DEFAULT_PASSWORD } from '../../swag-labs/types';

test.describe('Login Tests - All Users', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigate();
  });

  for (const user of Object.values(TestUsers)) {
    test(`Login with ${user}`, async ({ page }) => {
      // Attempt login with current user
      await loginPage.login(user, DEFAULT_PASSWORD);

      // Check if login was successful by looking for products page
      const isProductsPageLoaded = await productsPage.isProductsPageLoaded().catch(() => false);

      if (user === TestUsers.LOCKED_OUT_USER) {
        // Locked out user should not be able to login
        expect(isProductsPageLoaded).toBe(false);
        
        // Check for error message
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
      } else if (user === TestUsers.PROBLEM_USER) {
        // Problem user should login but have issues
        expect(isProductsPageLoaded).toBe(true);
        
        // Verify products page loaded but check for potential issues
        const productsTitle = await productsPage.getProductsTitle();
        expect(productsTitle).toBe('Products');
        
        // Problem user might have image issues, but basic functionality should work
        const productCount = await productsPage.getNumberOfProducts();
        expect(productCount).toBeGreaterThan(0);
      } else if (user === TestUsers.ERROR_USER) {
        // Error user should login but encounter errors during interaction
        expect(isProductsPageLoaded).toBe(true);
        
        const productsTitle = await productsPage.getProductsTitle();
        expect(productsTitle).toBe('Products');
        
        // Error user might have issues with certain actions
        // Basic page load should work
        const productCount = await productsPage.getNumberOfProducts();
        expect(productCount).toBeGreaterThan(0);
      } else if (user === TestUsers.PERFORMANCE_GLITCH_USER) {
        // Performance glitch user should login but be slow
        expect(isProductsPageLoaded).toBe(true);
        
        const productsTitle = await productsPage.getProductsTitle();
        expect(productsTitle).toBe('Products');
        
        const productCount = await productsPage.getNumberOfProducts();
        expect(productCount).toBeGreaterThan(0);
      } else if (user === TestUsers.VISUAL_USER) {
        // Visual user should login normally
        expect(isProductsPageLoaded).toBe(true);
        
        const productsTitle = await productsPage.getProductsTitle();
        expect(productsTitle).toBe('Products');
        
        const productCount = await productsPage.getNumberOfProducts();
        expect(productCount).toBeGreaterThan(0);
      } else {
        // Standard user should login normally
        expect(isProductsPageLoaded).toBe(true);
        
        const productsTitle = await productsPage.getProductsTitle();
        expect(productsTitle).toBe('Products');
        
        const productCount = await productsPage.getNumberOfProducts();
        expect(productCount).toBeGreaterThan(0);
        
        // Verify all expected products are visible
        const productNames = await productsPage.getAllProductNames();
        expect(productNames).toContain('Sauce Labs Backpack');
        expect(productNames).toContain('Sauce Labs Bike Light');
        expect(productNames).toContain('Sauce Labs Bolt T-Shirt');
      }
    });
  }

  test('Verify all test users credentials are displayed', async ({ page }) => {
    // Check that all test users are displayed on login page
    const displayedUsernames = await loginPage.getAcceptedUsernames();
    
    Object.values(TestUsers).forEach(user => {
      expect(displayedUsernames).toContain(user);
    });

    // Verify default password is displayed
    const displayedPassword = await loginPage.getPasswordForAllUsers();
    expect(displayedPassword).toBe(DEFAULT_PASSWORD);
  });

  test('Login with invalid credentials', async ({ page }) => {
    // Test with invalid username
    await loginPage.login('invalid_user', DEFAULT_PASSWORD);
    
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match');

    // Test with invalid password
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, 'wrong_password');
    
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match');

    // Test with both invalid
    await loginPage.navigate();
    await loginPage.login('invalid_user', 'wrong_password');
    
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match');
  });

  test('Login form validation', async ({ page }) => {
    // Test empty username
    await loginPage.login('', DEFAULT_PASSWORD);
    
    let errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');

    // Test empty password
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, '');
    
    errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Password is required');

    // Test both empty
    await loginPage.navigate();
    await loginPage.login('', '');
    
    errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });
});
