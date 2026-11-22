import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';
import { PatientBMS } from '../../../utils/patientBms';

test('predetermination orders', async ({ page, loginPage }) => {
  const patient = PatientBMS.getCapturedPatient();
  console.log(
    `🔎 Predetermination patient: ${patient.patientName} | ${patient.patientId} | BMS: ${patient.bms}`
  );
  await page.goto(config.payerUrl, { waitUntil: 'commit' });
  await expect(page.locator('#user-id')).toBeVisible({ timeout: 30000 });
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient(patient.patientName, patient.patientId);
  //await practitioner.startConsultation();
  await practitioner.createOrder();
  await practitioner.chooseDiagnoseMethod();
  await practitioner.completeDiagnosisDetails();
  await practitioner.recordDiagnosis();
  await practitioner.selectLabOrder();
  await practitioner.selectRadiologyOrder();
  await practitioner.SendPredOrderstoPayer();
});