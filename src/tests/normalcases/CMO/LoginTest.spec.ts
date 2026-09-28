import { test, expect, config } from '../../../fixtures/baseTest';

test.describe('CMO normal cases', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(config.url, { waitUntil: 'commit' });

    await page.waitForURL(/login/, { timeout: 30000 });

    await expect(page.locator('#user-id')).toBeVisible({
      timeout: 30000,
    });

    await loginPage.login(config.username, config.password);
    await expect(page).toHaveURL(/clinicaldiary/, { timeout: 5000 });
  });

  test('login with valid credentials', async ({ page }) => {
    await expect(page).toHaveURL(/clinicaldiary/, { timeout: 5000 });
  });

  test('login with invalid credentials', async ({ page, loginPage }) => {
    await page.goto(config.url);
    await loginPage.login('wrong_user', 'wrong_pass');
    await expect(page.getByText('Unauthorized use of this system is strictly prohibited')).toBeVisible({ timeout: 5000 });
  });
});
