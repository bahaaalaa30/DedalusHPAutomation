import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';
import { PatientBMS } from '../../../utils/patientBms';

test('predetermination acute headache CBC and CT of larynx orders', async ({ page, loginPage }) => {
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
  await practitioner.selectPhysicianOrderFormUHI();
  await practitioner.selectAcuteHeadacheDiagnosis();
  await practitioner.completeAcuteHeadacheDiagnosisDetails();
  await practitioner.recordAcuteHeadacheDiagnosis();
  await practitioner.selectCBCLabOrder();
  await practitioner.selectCTOfLarynxRadiologyOrder();
  await practitioner.selectCLOPAM2mgPrescriptionOrder();
  await practitioner.submitPredeterminationOrdersToPayer();
});