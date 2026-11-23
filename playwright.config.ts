import 'dotenv/config';

import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './src/tests',
  timeout: 600000,
  workers:1,
  expect: {
    timeout: 600000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        // Use the suite-specific results directory provided by run-suite.js.
        // Fall back to the default directory for direct Playwright runs.
        resultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results',
      },
    ],
  ],
  use: {
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 60000,
    navigationTimeout: 60000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        launchOptions: {
          args: [
            '--start-maximized',
            '--kiosk-printing',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--remote-allow-origins=*',
          ],
        },
      },
    }
/*    ,
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
     },*/
  ],
});
