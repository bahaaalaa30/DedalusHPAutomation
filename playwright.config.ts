import { defineConfig, devices } from '@playwright/test';
export default defineConfig(
    {
        testDir: './src/tests',
        timeout: 60000,
        expect: { timeout: 15000 },
        reporter: [['list'],
            ['html', { open: 'never' }],
            ['allure-playwright']],
        use: { headless: process.env.HEADLESS !== 'false',
            screenshot: 'only-on-failure',
            video: 'retain-on-failure',
            trace: 'retain-on-failure',
            actionTimeout: 15000, navigationTimeout: 30000 },
        projects:
            [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
                /*{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }] */
    }
    );