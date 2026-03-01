import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage } from '../../swag-labs/pages';
import { TestUsers, DEFAULT_PASSWORD } from '../../swag-labs/types';

test.describe('Add to Cart Tests', () => {
  test('Add product to cart by name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login first
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);

    // Verify products page is loaded
    const isLoaded = await productsPage.isProductsPageLoaded();
    await expect(isLoaded).toBe(true);

    // Add specific product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Verify the button changed to "Remove"
    const isRemoveButtonVisible = await productsPage.isRemoveButtonVisible('Sauce Labs Backpack');
    await expect(isRemoveButtonVisible).toBe(true);

    // Verify shopping cart has badge (optional)
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    const badgeCount = await cartBadge.textContent();
    await expect(badgeCount).toBe('1');
  });

  test('Add multiple products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login first
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);

    // Add multiple products
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Verify all products are in cart
    const isBackpackInCart = await productsPage.isRemoveButtonVisible('Sauce Labs Backpack');
    const isBikeLightInCart = await productsPage.isRemoveButtonVisible('Sauce Labs Bike Light');
    const isTShirtInCart = await productsPage.isRemoveButtonVisible('Sauce Labs Bolt T-Shirt');

    await expect(isBackpackInCart).toBe(true);
    await expect(isBikeLightInCart).toBe(true);
    await expect(isTShirtInCart).toBe(true);

    // Verify cart badge count
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    const badgeCount = await cartBadge.textContent();
    await expect(badgeCount).toBe('3');
  });

  test('Add product and then remove from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login first
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);

    // Add product to cart
    await productsPage.addProductToCart('Sauce Labs Fleece Jacket');

    // Verify product is in cart
    let isRemoveButtonVisible = await productsPage.isRemoveButtonVisible('Sauce Labs Fleece Jacket');
    await expect(isRemoveButtonVisible).toBe(true);

    // Remove product from cart
    await productsPage.removeProductFromCart('Sauce Labs Fleece Jacket');

    // Verify product is removed (button should be "Add to cart" again)
    const isAddToCartButtonVisible = await productsPage.isAddToCartButtonVisible('Sauce Labs Fleece Jacket');
    await expect(isAddToCartButtonVisible).toBe(true);
  });

  test('Get product information before adding to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Login first
    await loginPage.navigate();
    await loginPage.login(TestUsers.STANDARD_USER, DEFAULT_PASSWORD);

    // Get product details
    const productName = 'Sauce Labs Onesie';
    const productPrice = await productsPage.getProductPrice(productName);
    const productDescription = await productsPage.getProductDescription(productName);

    // Verify product information
    await expect(productName).toBe('Sauce Labs Onesie');
    await expect(productPrice).toBe('$7.99');
    await expect(productDescription).toContain('Rib snap infant onesie');

    // Add product to cart
    await productsPage.addProductToCart(productName);

    // Verify it's in cart
    const isRemoveButtonVisible = await productsPage.isRemoveButtonVisible(productName);
    await expect(isRemoveButtonVisible).toBe(true);
  });
});
