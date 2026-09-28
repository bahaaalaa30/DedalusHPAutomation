import { test, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';

test.describe('CMO patient search', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(config.url);
    await loginPage.login(config.username, config.password);
    await page.goto(config.visitBookingUrl);
  });

  test('search patient by ID', async ({ page }) => await new VisitBookingPage(page).SearchPatientID('B600007148'));
  test('search patient by name', async ({ page }) => await new VisitBookingPage(page).SearchPatientName('test'));
  test('search patient by national ID', async ({ page }) => await new VisitBookingPage(page).SearchNationalID('43213431234234'));
  test('search patient by male gender', async ({ page }) => await new VisitBookingPage(page).SearchPatientGenderMale('test'));
  test('search patient by female gender', async ({ page }) => await new VisitBookingPage(page).SearchPatientGenderFemale('test'));
});
