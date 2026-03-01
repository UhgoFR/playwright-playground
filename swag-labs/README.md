# Swag Labs POM (Page Object Model)

This directory contains the Page Object Model implementation for Swag Labs demo site (https://www.saucedemo.com/).

## Structure

```
swag-labs/
├── pages/
│   ├── BasePage.ts      # Base page with common functionality
│   ├── LoginPage.ts     # Login page object
│   ├── ProductsPage.ts  # Products/inventory page object
│   └── index.ts         # Export all pages
├── types/
│   └── index.ts         # TypeScript interfaces and enums
├── tests/
│   └── login-all-users.spec.ts  # Login tests for all users
└── README.md            # This file
```

## Pages

### BasePage
Contains common functionality shared across all pages:
- Wait methods
- Element interaction helpers
- Navigation utilities
- Screenshot capabilities

### LoginPage
Handles the login functionality:
- Username and password input
- Login button interaction
- Access to test credentials
- Form validation methods

### ProductsPage
Manages the products/inventory page:
- Product listing and details
- Sorting functionality
- Add/remove from cart
- Shopping cart navigation
- Menu interactions

## Usage Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage } from '../pages';

test('Login and verify products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Navigate and login
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify products page
  await expect(productsPage.isProductsPageLoaded()).toBe(true);
  await expect(productsPage.getProductsTitle()).toBe('Products');

  // Add product to cart
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await expect(productsPage.isCartBadgeVisible()).toBe(true);
});
```

## Test Users

The following test users are available:
- `standard_user` - Valid user
- `locked_out_user` - Locked account
- `problem_user` - Problematic user
- `performance_glitch_user` - Performance issues
- `error_user` - Error prone user
- `visual_user` - Visual testing user

All users use the password: `secret_sauce`

## Running Tests

### Execute All Tests
```bash
npx playwright test
```

### Execute Specific Test Files
```bash
# Run basic login tests
npx playwright test basic-login.spec.ts

# Run all users login tests
npx playwright test login-all-users.spec.ts

# Run tests with specific reporter
npx playwright test --reporter=list
npx playwright test --reporter=html
```

### View Test Results
```bash
# Open HTML report in browser
npx playwright show-report

# View results in terminal
npx playwright test --reporter=list
```

### Test Configuration
The Playwright configuration is set up to:
- Run tests in parallel across multiple browsers (Chromium, Firefox, WebKit)
- Generate HTML reports by default
- Include both `./tests` and `./swag-labs/tests` directories
- **Run in headless mode by default** for CI optimization
- **Slow down operations** (100ms delay) for better local debugging

### Execution Modes

#### Default Mode (Headless)
Tests run in headless mode by default for optimal performance:
```bash
# Default execution (headless)
npx playwright test swag-labs/tests/

# CI execution (headless)
npx playwright test swag-labs/tests/
```

#### Debug Mode (Headed)
For debugging and visual verification:
```bash
# Run with visible browser UI
npx playwright test swag-labs/tests/ --headed

# Run with specific browser
npx playwright test swag-labs/tests/ --project=chromium --headed
```

#### Speed Control
Adjust execution speed during testing:
```bash
# Run faster (less delay)
npx playwright test swag-labs/tests/ --slow-mo=50

# Run slower (more delay)
npx playwright test swag-labs/tests/ --slow-mo=200

# Run without delay (fastest)
npx playwright test swag-labs/tests/ --slow-mo=0
```

## Locators

All locators use data-test attributes when available for better test stability:
- `[data-test="username"]` - Username input
- `[data-test="password"]` - Password input
- `[data-test="login-button"]` - Login button
- `[data-test="product-sort-container"]` - Sort dropdown
- `[data-test="shopping-cart-link"]` - Shopping cart link
