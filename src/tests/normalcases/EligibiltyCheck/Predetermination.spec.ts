import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';
import { PatientBMS } from '../../../utils/patientBms';
import { getRandomPatientId } from '../../../utils/csvDataReader';
import path from 'node:path';


test('predetermination orders', async ({ page, loginPage }) => {
  const patient = PatientBMS.getCapturedPatient();
  console.log(
    `🔎 Predetermination patient: ${patient.patientName} | ${patient.patientId} | BMS: ${patient.bms}`
  );
  await page.goto(config.payerUrl, { waitUntil: 'commit' });
  await expect(page.locator('#user-id')).toBeVisible({ timeout: 30000 });
  await loginPage.login(config.AlArabDoctorUserName, config.AlArabDoctorPassword);
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


test('PredetermenationMultiOrders', async ({ page, loginPage }) => {
  const patient = PatientBMS.getCapturedPatient();
  console.log(
    `🔎 Multi-orders Predetermination patient: ${patient.patientName} | ${patient.patientId} | BMS: ${patient.bms}`
  );

  await page.goto(config.payerUrl, { waitUntil: 'commit' });
  await expect(page.locator('#user-id')).toBeVisible({ timeout: 30000 });
  await loginPage.login(config.AlArabDoctorUserName, config.AlArabDoctorPassword);

  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient(patient.patientName, patient.patientId);
  await practitioner.selectPhysicianOrderFormUHI();

  // First diagnosis: Acute headache.
  await practitioner.selectAcuteHeadacheDiagnosis();
  await practitioner.completeAcuteHeadacheDiagnosisDetails();
  await practitioner.recordAcuteHeadacheDiagnosis();

  // Second diagnosis: Acute ST elevation myocardial infarction.
  await practitioner.selectAcuteSTElevationMyocardialInfarctionDiagnosis();
  await practitioner.completeAcuteSTElevationMyocardialInfarctionDiagnosisDetails();
  await practitioner.recordAcuteSTElevationMyocardialInfarctionDiagnosis();

  // Third diagnosis: Gastroparesis.
  await practitioner.selectGastroparesisDiagnosis();
  await practitioner.completeGastroparesisDiagnosisDetails();
  await practitioner.recordGastroparesisDiagnosis();

  // Add multiple lab orders.
  await practitioner.selectCBCLabOrder();
  await practitioner.selectSerumAlbuminLabOrder();
  await practitioner.selectSerumCreatinineLabOrder();
});

