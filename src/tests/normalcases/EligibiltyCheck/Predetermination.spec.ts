import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';
import { PatientBMS } from '../../../utils/patientBms';

test('predetermination orders', async ({ page, loginPage }) => {
  const patient = PatientBMS.getCapturedPatient();
  console.log(
    `🔎 Predetermination patient: ${patient.patientName} | ${patient.patientId} | BMS: ${patient.bms}`
  );

  await page.goto(config.payerVisitBookingUrl, { waitUntil: 'commit' });
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  await expect(page).toHaveURL(/user/);
  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient(patient.patientName, patient.patientId);
  await practitioner.startConsultation();
  await practitioner.createOrder();
});