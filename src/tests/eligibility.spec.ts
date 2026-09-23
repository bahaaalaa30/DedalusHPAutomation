import { test, expect, config } from '../fixtures/baseTest';
import { VisitBookingPage } from '../pages/VisitBookingPage';

test(
  'Verify Check Eligibility with Eligible Patient',
  async ({ page, loginPage }) => {
    console.log('🚀 Started: Valid Credentials Login Test');

    await page.goto(config.payerUrl);
    await loginPage.login(config.cmoB6, config.cmoPassword);

    console.log('⏳ Verifying redirection to Clinical Diary...');
    await expect(page).toHaveURL(/clinicaldiary|user\/dairy/, {
      timeout: 5000
    });

    console.log('📍 Navigating to the Visit Booking page...');
    await page.goto(config.payerVisitBookingUrl);

    const bookingPage = new VisitBookingPage(page);

    await bookingPage.selectPayerFacility();
    await bookingPage.selectPayerClinic();
    await bookingPage.selectPayerDoctor();

    // Same flow as Selenium: book the 09:00 pm appointment slot.
    await bookingPage.bookTimeSlot('09:00 pm');

    await bookingPage.EligibilityCheck('A100057372');
    await bookingPage.sendRequestAndWaitForResponse();

    console.log('✅ Appointment booked and visit created successfully!');
  }
);
