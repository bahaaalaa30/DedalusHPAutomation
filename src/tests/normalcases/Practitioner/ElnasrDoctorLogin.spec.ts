import { test, expect, config } from '../../../fixtures/baseTest';

test('El Nasr doctor login', async ({ page, loginPage }) => {
  await page.goto(config.payerVisitBookingUrl, { waitUntil: 'commit' });
  await page.waitForURL(/login/, { timeout: 30000 });
  await expect(page.locator('#user-id')).toBeVisible({ timeout: 30000 });

  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  await expect(page).toHaveURL(/user/, { timeout: 5000 });
});
