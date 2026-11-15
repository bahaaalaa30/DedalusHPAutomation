import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';

test('predetermination orders', async ({ page, loginPage }) => {
  await page.goto(config.payerVisitBookingUrl);
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  await expect(page).toHaveURL(/user/);
  const practitioner = new PractitionerPage(page);
  //select eligbale patient from the choosen patient at the log that printed after the patient is created from the BMS.csv file
  await practitioner.selectPatient();
  await practitioner.startConsultation();
  await practitioner.createOrder();
});