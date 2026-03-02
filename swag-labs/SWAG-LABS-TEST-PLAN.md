# Swag Labs Test Plan

## Test Plan Overview

**Application:** Swag Labs E-commerce Demo Site  
**URL:** https://www.saucedemo.com/  
**Test Framework:** Playwright with TypeScript  
**Test Environment:** Automated testing environment  

### Test Objectives
- Verify user authentication functionality across different user types
- Validate product browsing and cart management features
- Test complete checkout flow from login to order completion
- Ensure form validation and error handling works correctly
- Verify UI elements and user interactions

---

## Test Summary - Test Cases List

### 1. Authentication Tests (Login)
| Test ID | Test Case Description | Priority |
|---------|----------------------|----------|
| AUTH-001 | Successful login with standard user | High |
| AUTH-002 | Failed login with locked out user | High |
| AUTH-003 | Login with all user types (6 users) | Medium |
| AUTH-004 | Verify test users credentials display | Low |
| AUTH-005 | Login with invalid credentials | High |
| AUTH-006 | Login form validation (empty fields) | High |

### 2. Product Management Tests
| Test ID | Test Case Description | Priority |
|---------|----------------------|----------|
| PROD-001 | Add single product to cart by name | High |
| PROD-002 | Add multiple products to cart | High |
| PROD-003 | Add product then remove from cart | High |
| PROD-004 | Get product information before adding to cart | Medium |

### 3. Checkout Flow Tests
| Test ID | Test Case Description | Priority |
|---------|----------------------|----------|
| CHK-001 | Complete checkout flow with valid information | High |
| CHK-002 | Checkout with empty form shows error messages | High |
| CHK-003 | Checkout with valid information and cancel | Medium |
| CHK-004 | Checkout form validation | High |
| CHK-005 | Complete checkout and return to products | Medium |
| CHK-006 | Checkout with multiple items | High |

---

## Detailed Test Cases

### Authentication Tests

#### AUTH-001: Successful login with standard user
**Priority:** High  
**Preconditions:** User is on login page  

**Test Steps:**
1. Navigate to login page
2. Enter username: `standard_user`
3. Enter password: `secret_sauce`
4. Click login button
5. Verify products page loads

**Expected Results:**
- Products page loads successfully
- Page title displays "Products"
- User is redirected to inventory page

**Test Data:**
- Username: `standard_user`
- Password: `secret_sauce`

---

#### AUTH-002: Failed login with locked out user
**Priority:** High  
**Preconditions:** User is on login page  

**Test Steps:**
1. Navigate to login page
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click login button
5. Verify error message appears

**Expected Results:**
- Login fails
- Error message displays: "Epic sadface: Sorry, this user has been locked out."
- User remains on login page

**Test Data:**
- Username: `locked_out_user`
- Password: `secret_sauce`

---

#### AUTH-003: Login with all user types
**Priority:** Medium  
**Preconditions:** User is on login page  

**Test Steps:**
1. Test login for each user type:
   - `standard_user`
   - `locked_out_user`
   - `problem_user`
   - `performance_glitch_user`
   - `error_user`
   - `visual_user`
2. Verify appropriate behavior for each user type

**Expected Results:**
- Standard users login successfully
- Locked out user fails with error message
- Problem/performance/error users login but may have issues
- Visual user logs in normally

**Test Data:**
- All 6 test usernames
- Password: `secret_sauce` (for all)

---

#### AUTH-004: Verify test users credentials display
**Priority:** Low  
**Preconditions:** User is on login page  

**Test Steps:**
1. Navigate to login page
2. Extract displayed usernames from login page
3. Extract displayed password from login page
4. Verify all test users are listed

**Expected Results:**
- All 6 test usernames are displayed
- Default password `secret_sauce` is displayed

---

#### AUTH-005: Login with invalid credentials
**Priority:** High  
**Preconditions:** User is on login page  

**Test Steps:**
1. Test invalid username with valid password
2. Test valid username with invalid password
3. Test both invalid username and password
4. Verify error messages for each scenario

**Expected Results:**
- All invalid login attempts fail
- Error message: "Epic sadface: Username and password do not match"
- User remains on login page

**Test Data:**
- Invalid username: `invalid_user`
- Invalid password: `wrong_password`

---

#### AUTH-006: Login form validation
**Priority:** High  
**Preconditions:** User is on login page  

**Test Steps:**
1. Test empty username with valid password
2. Test valid username with empty password
3. Test both username and password empty
4. Verify validation messages

**Expected Results:**
- Empty username shows: "Epic sadface: Username is required"
- Empty password shows: "Epic sadface: Password is required"
- Both empty shows username required message

---

### Product Management Tests

#### PROD-001: Add single product to cart by name
**Priority:** High  
**Preconditions:** User is logged in and on products page  

**Test Steps:**
1. Login with standard user
2. Navigate to products page
3. Find "Sauce Labs Backpack" product
4. Click "Add to cart" button
5. Verify cart badge shows "1"
6. Verify button changes to "Remove"

**Expected Results:**
- Product added to cart successfully
- Cart badge displays count "1"
- Add button changes to Remove button

**Test Data:**
- Product: "Sauce Labs Backpack"

---

#### PROD-002: Add multiple products to cart
**Priority:** High  
**Preconditions:** User is logged in and on products page  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs Backpack" to cart
3. Add "Sauce Labs Bike Light" to cart
4. Add "Sauce Labs Bolt T-Shirt" to cart
5. Verify cart badge shows "3"
6. Verify all products show Remove buttons

**Expected Results:**
- All 3 products added to cart
- Cart badge displays count "3"
- All product buttons changed to Remove

**Test Data:**
- Products: "Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"

---

#### PROD-003: Add product then remove from cart
**Priority:** High  
**Preconditions:** User is logged in and on products page  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs Fleece Jacket" to cart
3. Verify Remove button is visible
4. Click Remove button
5. Verify Add to Cart button reappears

**Expected Results:**
- Product successfully added and then removed
- Button toggles between Add and Remove states
- Cart count updates accordingly

**Test Data:**
- Product: "Sauce Labs Fleece Jacket"

---

#### PROD-004: Get product information before adding to cart
**Priority:** Medium  
**Preconditions:** User is logged in and on products page  

**Test Steps:**
1. Login with standard user
2. Get details for "Sauce Labs Onesie"
3. Verify product name, price, and description
4. Add product to cart
5. Verify product is in cart

**Expected Results:**
- Product name: "Sauce Labs Onesie"
- Price: "$7.99"
- Description contains: "Rib snap infant onesie"
- Product successfully added to cart

**Test Data:**
- Product: "Sauce Labs Onesie"
- Expected price: "$7.99"

---

### Checkout Flow Tests

#### CHK-001: Complete checkout flow with valid information
**Priority:** High  
**Preconditions:** User is logged in with items in cart  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs Backpack" and "Sauce Labs Bike Light" to cart
3. Navigate to checkout (cart → checkout)
4. Fill checkout form:
   - First Name: "John"
   - Last Name: "Doe"
   - Postal Code: "12345"
5. Click Continue button
6. Verify checkout complete page
7. Verify success message and pony express image

**Expected Results:**
- Checkout completes successfully
- Success message: "Thank you for your order!"
- Pony express image is visible
- Order confirmation displayed

**Test Data:**
- Products: "Sauce Labs Backpack", "Sauce Labs Bike Light"
- First Name: "John"
- Last Name: "Doe"
- Postal Code: "12345"

---

#### CHK-002: Checkout with empty form shows error messages
**Priority:** High  
**Preconditions:** User is logged in with items in cart  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs Fleece Jacket" to cart
3. Navigate to checkout
4. Click Continue without filling form
5. Verify error messages appear

**Expected Results:**
- Form validation errors displayed
- User remains on checkout page
- Error messages are visible for required fields

**Test Data:**
- Product: "Sauce Labs Fleece Jacket"
- Form fields: all empty

---

#### CHK-003: Checkout with valid information and cancel
**Priority:** Medium  
**Preconditions:** User is logged in with items in cart  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs Bolt T-Shirt" to cart
3. Navigate to checkout
4. Fill checkout form:
   - First Name: "Jane"
   - Last Name: "Smith"
   - Postal Code: "67890"
5. Click Cancel button
6. Verify returned to products page
7. Verify cart still contains items

**Expected Results:**
- Cancel returns user to products page
- Cart items are preserved
- Cart badge still shows "1"

**Test Data:**
- Product: "Sauce Labs Bolt T-Shirt"
- First Name: "Jane"
- Last Name: "Smith"
- Postal Code: "67890"

---

#### CHK-004: Checkout form validation
**Priority:** High  
**Preconditions:** User is logged in with items in cart  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs Onesie" to cart
3. Navigate to checkout
4. Verify form is initially empty
5. Fill form with test data:
   - First Name: "Test"
   - Last Name: "User"
   - Postal Code: "54321"
6. Verify form values are correctly entered
7. Clear form
8. Verify form is empty again

**Expected Results:**
- Form accepts and retains values correctly
- Clear functionality works properly
- Form validation detects empty state

**Test Data:**
- Product: "Sauce Labs Onesie"
- First Name: "Test"
- Last Name: "User"
- Postal Code: "54321"

---

#### CHK-005: Complete checkout and return to products
**Priority:** Medium  
**Preconditions:** User is logged in with items in cart  

**Test Steps:**
1. Login with standard user
2. Add "Sauce Labs T-Shirt (Red)" to cart
3. Complete checkout flow:
   - Navigate to checkout
   - Fill form: "Mike", "Johnson", "98765"
   - Click Continue
4. On complete page, click "Back to Products"
5. Verify returned to products page
6. Verify cart is empty

**Expected Results:**
- Successful checkout completion
- Return to products page works
- Cart is cleared after checkout
- Cart badge shows "0" or is hidden

**Test Data:**
- Product: "Sauce Labs T-Shirt (Red)"
- First Name: "Mike"
- Last Name: "Johnson"
- Postal Code: "98765"

---

#### CHK-006: Checkout with multiple items
**Priority:** High  
**Preconditions:** User is logged in with multiple items in cart  

**Test Steps:**
1. Login with standard user
2. Add 3 products to cart:
   - "Sauce Labs Backpack"
   - "Sauce Labs Bike Light"
   - "Sauce Labs Fleece Jacket"
3. Verify cart badge shows "3"
4. Complete checkout:
   - Navigate to checkout
   - Fill form: "Alice", "Brown", "11111"
   - Click Continue
5. Verify checkout complete page
6. Verify order confirmation

**Expected Results:**
- Multiple items processed correctly
- Checkout completes successfully
- Order confirmation includes thank you message

**Test Data:**
- Products: "Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Fleece Jacket"
- First Name: "Alice"
- Last Name: "Brown"
- Postal Code: "11111"

---

## Test Environment Setup

### Required Dependencies
- Node.js
- Playwright Test Framework
- TypeScript
- Page Object Model classes

### Test Data
- **Default Password:** `secret_sauce`
- **Test Users:** standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user
- **Sample Products:** Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, etc.

### Test Execution
```bash
npx playwright test swag-labs/tests/
```

---

## Test Coverage Summary

- **Total Test Cases:** 16
- **Authentication Tests:** 6
- **Product Management Tests:** 4
- **Checkout Flow Tests:** 6
- **Priority Distribution:** 9 High, 5 Medium, 2 Low

### Coverage Areas
✅ User Authentication & Authorization  
✅ Product Browsing & Selection  
✅ Shopping Cart Management  
✅ Checkout Process & Validation  
✅ Error Handling & Form Validation  
✅ UI Element Verification  

---

## Test Success Criteria

- All test cases execute without errors
- All assertions pass
- No unhandled exceptions
- Test execution completes within reasonable time limits
- Cross-browser compatibility (if applicable)

---

*Last Updated: March 2026*  
*Test Framework: Playwright with TypeScript*
