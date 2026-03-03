# API Petstore Regression Tests

## Overview

This project contains comprehensive API regression tests for the Swagger Petstore API, built with Playwright and TypeScript. The test suite covers all major endpoints including Pet management, Store operations, and User management.

## Test Structure

```
api-petstore/
├── config/
│   └── api-config.ts          # API configuration and constants
├── models/
│   ├── Pet.ts                 # Pet data model
│   ├── Order.ts               # Order data model
│   ├── User.ts                # User data model
│   └── index.ts               # Model exports
├── services/
│   ├── PetService.ts          # Pet API service (POM)
│   ├── StoreService.ts        # Store API service (POM)
│   ├── UserService.ts         # User API service (POM)
│   └── index.ts               # Service exports
├── utils/
│   └── api-helper.ts          # Utility functions for API testing
├── data/
│   ├── valid-pet.json         # Valid pet test data
│   ├── invalid-pet.json       # Invalid pet test data
│   ├── valid-order.json       # Valid order test data
│   └── valid-user.json        # Valid user test data
├── test/
│   ├── PetTest.spec.ts        # Pet API tests (TC001-TC008)
│   ├── StoreTest.spec.ts      # Store API tests (TC009-TC012)
│   ├── UserTest.spec.ts       # User API tests (TC013-TC018)
│   └── setup.ts               # Test setup and teardown
├── petstore_test_plan.md      # Detailed test plan
├── playwright.config.ts       # Playwright configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Test Cases

### Pet Tests (TC001-TC008)
- **TC001**: Create pet with valid data
- **TC002**: Create pet with invalid data (validation error)
- **TC003**: Get pet by valid ID
- **TC004**: Get pet by invalid ID (404 error)
- **TC005**: Update existing pet
- **TC006**: Delete pet by ID
- **TC007**: Find pets by status
- **TC008**: Find pets with invalid status (validation error)

### Store Tests (TC009-TC012)
- **TC009**: Place order with valid data
- **TC010**: Get order by ID
- **TC011**: Delete order by ID
- **TC012**: Get inventory (public endpoint)

### User Tests (TC013-TC018)
- **TC013**: Create user with valid data
- **TC014**: Login with valid credentials
- **TC015**: Login with invalid credentials (authentication error)
- **TC016**: Get user by username
- **TC017**: Update existing user
- **TC018**: Delete user by username

## Installation

Since this project uses the main package.json configuration, install dependencies from the project root directory:

```bash
# Navigate to project root (if not already there)
cd ..

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

Since this project uses the main package.json configuration, run tests from the project root directory:

```bash
# Navigate to project root (if not already there)
cd ..

# Run all API tests
npm run test:api

# Run specific test suites
npm run test:pet      # Pet API tests only
npm run test:store    # Store API tests only
npm run test:user     # User API tests only

# Run tests in debug mode
npm run test:debug

# View test reports
npm run test:report
```

### Alternative: Run from api-petstore directory

```bash
# From api-petstore directory, use npx to access parent package.json
npx playwright test test/PetTest.spec.ts
npx playwright test test/StoreTest.spec.ts
npx playwright test test/UserTest.spec.ts
```

## Configuration

The tests are configured to run against the Swagger Petstore API at `https://petstore.swagger.io/v2`.

### Test Data
- Valid test data is stored in JSON files in the `data/` directory
- Dynamic data is generated using utility functions for uniqueness
- API key `special-key` is used for authentication where required

### Test Tags
All tests are tagged with `RegressionTest` for traceability and filtering.

## Reports

Test results are generated in multiple formats:
- HTML report (interactive)
- JSON report (for CI/CD integration)
- JUnit XML report (for test management systems)

## Best Practices Implemented

1. **Page Object Model (POM)**: Services encapsulate API interactions
2. **Data-Driven Testing**: Test data separated from test logic
3. **Error Handling**: Comprehensive validation and error scenarios
4. **Logging**: Detailed request/response logging for debugging
5. **Cleanup**: Proper setup and teardown procedures
6. **Traceability**: Test IDs and names match the test plan exactly
7. **Modularity**: Reusable utilities and helper functions

## Requirements

- Node.js 18+
- Playwright Test
- TypeScript

## API Documentation

The Swagger Petstore API documentation is available at:
https://petstore.swagger.io/v2/swagger.json
