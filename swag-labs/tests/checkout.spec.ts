import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage, CheckoutPage, CheckoutCompletePage } from '../../swag-labs/pages';
import { TestUsers, DEFAULT_PASSWORD } from '../../swag-labs/types';

test.describe('Checkout Tests', () => {
  test('Complete checkout flow with valid information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Login first
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);

    // Add products to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    // Verify cart has items
    const cartCount = await productsPage.getShoppingCartBadgeCount();
    await expect(cartCount).toBe(2);

    // Go to checkout
    await productsPage.goToCheckout();

    // Verify checkout page is loaded
    const isCheckoutLoaded = await checkoutPage.isCheckoutPageLoaded();
    await expect(isCheckoutLoaded).toBe(true);

    // Fill checkout information
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

    // Continue to next step
    await checkoutPage.clickContinue();

    // Verify checkout complete page
    const isCompleteLoaded = await checkoutCompletePage.isCheckoutCompletePageLoaded();
    await expect(isCompleteLoaded).toBe(true);

    // Click finish button
    await checkoutCompletePage.clickFinish();

    // Verify success message
    const completeHeader = await checkoutCompletePage.getCompleteHeaderText();
    await expect(completeHeader).toBe('Checkout: Complete!');

    // Verify pony express image is visible
    const isPonyExpressVisible = await checkoutCompletePage.isPonyExpressImageVisible();
    await expect(isPonyExpressVisible).toBe(true);
  });

  test('Checkout with empty form shows error messages', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login and add product
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);
    await productsPage.addProductToCart('Sauce Labs Fleece Jacket');

    // Go to checkout
    await productsPage.goToCheckout();

    // Try to continue without filling form
    await checkoutPage.clickContinue();

    // Verify error messages
    const hasErrors = await checkoutPage.hasErrorMessages();
    await expect(hasErrors).toBe(true);

    const errorMessages = await checkoutPage.getErrorMessages();
    await expect(errorMessages.length).toBeGreaterThan(0);
  });

  test('Checkout with valid information and cancel', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login and add product
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Go to checkout
    await productsPage.goToCheckout();

    // Fill checkout information
    await checkoutPage.fillCheckoutInformation('Jane', 'Smith', '67890');

    // Cancel checkout
    await checkoutPage.clickCancel();

    // Verify returned to products page
    const isProductsLoaded = await productsPage.isProductsPageLoaded();
    await expect(isProductsLoaded).toBe(true);

    // Verify cart still has items
    const cartCount = await productsPage.getShoppingCartBadgeCount();
    await expect(cartCount).toBe(1);
  });

  test('Checkout form validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login and add product
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);
    await productsPage.addProductToCart('Sauce Labs Onesie');

    // Go to checkout
    await productsPage.goToCheckout();

    // Test form is initially empty
    const isFormEmpty = await checkoutPage.isFormEmpty();
    await expect(isFormEmpty).toBe(true);

    // Fill form with test data
    await checkoutPage.fillCheckoutInformation('Test', 'User', '54321');

    // Verify form values
    const firstName = await checkoutPage.getFirstNameValue();
    const lastName = await checkoutPage.getLastNameValue();
    const postalCode = await checkoutPage.getPostalCodeValue();

    await expect(firstName).toBe('Test');
    await expect(lastName).toBe('User');
    await expect(postalCode).toBe('54321');

    // Clear form
    await checkoutPage.clearForm();

    // Verify form is empty again
    const isFormEmptyAfterClear = await checkoutPage.isFormEmpty();
    await expect(isFormEmptyAfterClear).toBe(true);
  });

  test('Complete checkout and return to products', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Login and add product
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);
    await productsPage.addProductToCart('Sauce Labs T-Shirt (Red)');

    // Complete checkout flow
    await productsPage.goToCheckout();
    await checkoutPage.fillCheckoutInformation('Mike', 'Johnson', '98765');
    await checkoutPage.clickContinue();

    // Verify complete page
    const isCompleteLoaded = await checkoutCompletePage.isCheckoutCompletePageLoaded();
    await expect(isCompleteLoaded).toBe(true);

    // Click back to products
    await checkoutCompletePage.clickBackToProducts();

    // Verify returned to products page
    const isProductsLoaded = await productsPage.isProductsPageLoaded();
    await expect(isProductsLoaded).toBe(true);

    // Verify cart is empty
    const cartCount = await productsPage.getShoppingCartBadgeCount();
    await expect(cartCount).toBe(0);
  });

  test('Checkout with multiple items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Login and add multiple products
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);
    
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Fleece Jacket');

    // Verify cart has 3 items
    const cartCount = await productsPage.getShoppingCartBadgeCount();
    await expect(cartCount).toBe(3);

    // Complete checkout
    await productsPage.goToCheckout();
    await checkoutPage.fillCheckoutInformation('Alice', 'Brown', '11111');
    await checkoutPage.clickContinue();

    // Verify checkout complete
    const isCompleteLoaded = await checkoutCompletePage.isCheckoutCompletePageLoaded();
    await expect(isCompleteLoaded).toBe(true);

    // Verify order confirmation
    const orderText = await checkoutCompletePage.getOrderConfirmationText();
    await expect(orderText).toContain('Thank you for your order!');
  });
});
