import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';
import { PatientBMS } from '../../../utils/patientBms';

test('predetermination orders', async ({ page, loginPage }) => {
  const patient = PatientBMS.getCapturedPatient();
  console.log(
    `🔎 Predetermination patient: ${patient.patientName} | ${patient.patientId} | BMS: ${patient.bms}`
  );

  // Start from the actual login route. The clinical diary URL is protected
  // and does not contain the #user-id login form.
  await page.goto(config.payerUrl, { waitUntil: 'commit' });
  await expect(page.locator('#user-id')).toBeVisible({ timeout: 30000 });
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);

  // The doctor account must enter the clinician role before opening the diary.
  const practitioner = new PractitionerPage(page);
  await practitioner.selectRole();
  await practitioner.continueRole();
  await expect(page).toHaveURL(/clinicaldiary/, { timeout: 30000 });
  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient(patient.patientName, patient.patientId);
  await practitioner.startConsultation();
  await practitioner.createOrder();
});