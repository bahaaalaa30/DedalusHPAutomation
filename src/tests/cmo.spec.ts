import { test, expect, config } from '../fixtures/baseTest';
import { VisitBookingPage } from '../pages/VisitBookingPage';

test.describe('CMO normal cases', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(config.url);
    await loginPage.login(config.username, config.password);
    await expect(page).toHaveURL(/clinicaldiary/, { timeout: 5000 });
  });

  test('login with valid credentials', async ({ page }) => {
    await expect(page).toHaveURL(/clinicaldiary/, { timeout: 5000 });
  });

  test('login with invalid credentials', async ({ page, loginPage }) => {
    await page.goto(config.url);
    await loginPage.login('wrong_user', 'wrong_pass');
    await expect(
      page.getByText('Unauthorized use of this system is strictly prohibited')
    ).toBeVisible({ timeout: 5000 });
  });

  test('visit booking and visit creation', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    const booking = new VisitBookingPage(page);
    await booking.selectClinic();
    await booking.selectPractitioner();
    await booking.bookTimeSlot('09:00 pm');
    await booking.createVisitWorkflow('B600007148', '100');
  });

  test('cancel visit', async ({ page }) => {
    await new VisitBookingPage(page).CancelBookedVisit();
  });

  test('cancel appointment', async ({ page }) => {
    await new VisitBookingPage(page).CancelAppointment();
  });

  test('change language to Arabic', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    const booking = new VisitBookingPage(page);
    await booking.switchToArabicLanguage();
    expect(await booking.isNoResultsMessageDisplayed()).toBe(true);
  });

  test('search patient by ID', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).SearchPatientID('B600007148');
  });

  test('search patient by name', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).SearchPatientName('test');
  });

  test('search patient by national ID', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).SearchNationalID('43213431234234');
  });

  test('search patient by male gender', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).SearchPatientGenderMale('test');
  });

  test('search patient by female gender', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).SearchPatientGenderFemale('test');
  });

  test('print bill', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).BillPage('test');
  });

  test('pay bill', async ({ page }) => {
    await page.goto(config.visitBookingUrl);
    await new VisitBookingPage(page).PayBill('test');
  });
});
