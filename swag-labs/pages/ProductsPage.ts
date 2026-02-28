import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly productsTitle: Locator;
  readonly sortDropdown: Locator;
  readonly shoppingCartLink: Locator;
  readonly menuButton: Locator;
  readonly productItems: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    super(page);
    this.productsTitle = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('[data-test="react-burger-menu-btn"]');
    this.productItems = page.locator('.inventory_item');
    this.footer = page.locator('.footer');
  }

  async isProductsPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement('[data-test="title"]');
      return await this.productsTitle.isVisible();
    } catch {
      return false;
    }
  }

  async getProductsTitle(): Promise<string> {
    return await this.productsTitle.textContent() || '';
  }

  async getSortOptions(): Promise<string[]> {
    const options = await this.sortDropdown.locator('option').allTextContents();
    return options.map(option => option.trim());
  }

  async selectSortOption(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getSelectedSortOption(): Promise<string> {
    return await this.sortDropdown.inputValue();
  }

  async getAllProductNames(): Promise<string[]> {
    const names = await this.page.locator('.inventory_item_name').allTextContents();
    return names.map(name => name.trim());
  }

  async getAllProductPrices(): Promise<string[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => price.trim());
  }

  async getAllProductDescriptions(): Promise<string[]> {
    const descriptions = await this.page.locator('.inventory_item_desc').allTextContents();
    return descriptions.map(desc => desc.trim());
  }

  async getProductByName(productName: string): Promise<Locator> {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = await this.getProductByName(productName);
    await product.locator('[data-test^="add-to-cart"]').click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const product = await this.getProductByName(productName);
    await product.locator('[data-test^="remove"]').click();
  }

  async isAddToCartButtonVisible(productName: string): Promise<boolean> {
    const product = await this.getProductByName(productName);
    return await product.locator('[data-test^="add-to-cart"]').isVisible();
  }

  async isRemoveButtonVisible(productName: string): Promise<boolean> {
    const product = await this.getProductByName(productName);
    return await product.locator('[data-test^="remove"]').isVisible();
  }

  async clickProductImage(productName: string): Promise<void> {
    const product = await this.getProductByName(productName);
    await product.locator('.inventory_item_img').click();
  }

  async clickProductName(productName: string): Promise<void> {
    const product = await this.getProductByName(productName);
    await product.locator('.inventory_item_name').click();
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = await this.getProductByName(productName);
    return await product.locator('.inventory_item_price').textContent() || '';
  }

  async getProductDescription(productName: string): Promise<string> {
    const product = await this.getProductByName(productName);
    return await product.locator('.inventory_item_desc').textContent() || '';
  }

  async getNumberOfProducts(): Promise<number> {
    return await this.productItems.count();
  }

  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async clickMenuButton(): Promise<void> {
    await this.menuButton.click();
  }

  async getCartBadgeCount(): Promise<string> {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    if (await badge.isVisible()) {
      return await badge.textContent() || '';
    }
    return '0';
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.page.locator('[data-test="shopping-cart-badge"]').isVisible();
  }

  async isFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }

  async getSocialMediaLinks(): Promise<{ twitter: string, facebook: string, linkedin: string }> {
    return {
      twitter: await this.page.locator('[data-test="social-twitter"]').getAttribute('href') || '',
      facebook: await this.page.locator('[data-test="social-facebook"]').getAttribute('href') || '',
      linkedin: await this.page.locator('[data-test="social-linkedin"]').getAttribute('href') || ''
    };
  }

  async getCopyrightText(): Promise<string> {
    return await this.page.locator('.footer_copy').textContent() || '';
  }
}
