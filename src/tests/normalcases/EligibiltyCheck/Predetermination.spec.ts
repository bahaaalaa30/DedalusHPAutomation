import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';

test('predetermination lab order', async ({ page, loginPage }) => {
  await page.goto(config.payerVisitBookingUrl);
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  await expect(page).toHaveURL(/user/);
  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient();
  await practitioner.startConsultation();
  await practitioner.createOrder();
});
