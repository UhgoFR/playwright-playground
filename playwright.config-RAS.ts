import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: [
    'e2e/tests/**/*.spec.{js,ts}',
    'RegressionTests/tests/**/*.spec.{js,ts}'
  ],
  /* Run tests in files in parallel */
  timeout: 30 * 1000, // ✅ Tiempo máximo por test (1min)
  expect: {
    timeout: 5000, // Tiempo máximo para una assertion
  },

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ['github'], // Anotaciones de GitHub
        ['list'], // Output en consola
        ['html'], // Reporte HTML para artefactos
      ]
    : [['html', { open: 'on-failure' }]], // Solo HTML en desarrollo

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure', // ✅ Evidencia visual en fallos
    video: 'retain-on-failure', // ✅ Graba video si falla el test
    trace: 'on',
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
