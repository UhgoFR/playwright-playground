import { test as base, expect } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

// Extend the base test to include API setup and teardown
export const test = base.extend({
  // This runs before each test
  beforeEach: [async ({}, use) => {
    // Ensure we have a fresh request context for each test
    await ApiHelper.closeRequestContext();
    await use({});
  }],

  // This runs after each test
  afterEach: [async ({}, use) => {
    await use({});
    // Clean up request context after each test
    await ApiHelper.closeRequestContext();
  }]
});

export { expect };
