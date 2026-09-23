import path from 'node:path';
import { test } from '../../fixtures/baseTest';
import { VisitBookingPage } from '../../pages/VisitBookingPage';
import { getRandomPatientId } from '../../utils/csvDataReader';

test('approved eligibility patient can be found and validated in the queue', async ({ page, loginPage }) => {
  await page.goto(process.env.PAYER_URL ?? '');
  await loginPage.login(process.env.CMO_B6 ?? '', process.env.CMO_PASSWORD ?? '');
  await page.goto(process.env.PAYER_VISIT_BOOKING_URL ?? '');
  const booking = new VisitBookingPage(page);
  const patientId = getRandomPatientId(path.resolve('src/test-data/BMS.csv'));
  await booking.SearchBMS(patientId);
  const patientIdFromBms = await booking.selectPatientIDByBMS();
  await booking.ValidateEligiblePatient(patientIdFromBms);
  await booking.verifyStatusIsApproved();
});
