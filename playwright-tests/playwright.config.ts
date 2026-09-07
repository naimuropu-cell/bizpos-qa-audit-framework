import { defineConfig, devices } from '@playwright/test';

/**
 * Enterprise Playwright Configuration for BizPOS / YesSME ERP
 * Environment-ready for local execution, staging pipelines, and CI/CD audit suites.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 7 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/audit-execution-results.json' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://sme.yesbangladesh.net',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'Chromium-Desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox-Desktop',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
