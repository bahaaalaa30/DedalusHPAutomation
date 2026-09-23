import path from 'node:path';
import { test, expect, config } from '../../fixtures/baseTest';
import { VisitBookingPage } from '../../pages/VisitBookingPage';
import { PatientBMS } from '../../utils/patientBms';
import { getRandomPatientId } from '../../utils/csvDataReader';

test(
  'approved eligibility patient can be found and validated in the queue',
  async ({ page, loginPage }) => {
    await page.goto(config.payerUrl);
    await loginPage.login(config.cmoB6, config.cmoPassword);
    await expect(page).toHaveURL(/clinicaldiary/);
    await page.goto(config.payerVisitBookingUrl);

    const booking = new VisitBookingPage(page);

    await booking.selectPayerFacility();
    await booking.selectPayerClinic();
    await booking.selectPayerDoctor();
    await booking.bookNextAvailableTimeSlot();

    const patientId = getRandomPatientId(
      path.resolve('src/test-data/BMS.csv')
    );

    PatientBMS.setPatientId(patientId);

    await booking.EligibilityCheck(patientId);
    await booking.selectVisitType2();
    await booking.sendRequestAndWaitForResponse();

    await booking.SearchBMS(patientId);

    const patientIdFromBms = await booking.selectPatientIDByBMS();

    await booking.ValidateEligiblePatient(patientIdFromBms);
    await booking.verifyStatusIsApproved();
  }
);
