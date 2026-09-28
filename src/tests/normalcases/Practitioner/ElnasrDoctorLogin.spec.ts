import { test, expect, config } from '../../../fixtures/baseTest';

test('El Nasr doctor login', async ({ page, loginPage }) => {
  await page.goto(config.payerVisitBookingUrl);
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  await expect(page).toHaveURL(/user/);
});
