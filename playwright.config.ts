import 'dotenv/config';

import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './src/tests',
  timeout: 60000,
  workers: 5,
  expect: {
    timeout: 60000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
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
