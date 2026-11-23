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

  // Diagnosis: Acute headache, Acute ST elevation myocardial infarction, and Gastroparesis.
  await practitioner.selectAcuteHeadacheDiagnosis();
  await practitioner.completeAcuteHeadacheDiagnosisDetails();
  await practitioner.recordAcuteHeadacheDiagnosis();

  await practitioner.selectAcuteSTElevationMyocardialInfarctionDiagnosis();
  await practitioner.completeAcuteSTElevationMyocardialInfarctionDiagnosisDetails();
  await practitioner.recordAcuteSTElevationMyocardialInfarctionDiagnosis();

  await practitioner.selectGastroparesisDiagnosis();
  await practitioner.completeGastroparesisDiagnosisDetails();
  await practitioner.recordGastroparesisDiagnosis();

  // Lab orders: CBC, Serum Albumin, and Serum Creatinine.
  await practitioner.selectCBCLabOrder();
  await practitioner.selectSerumAlbuminLabOrder();
  await practitioner.selectSerumCreatinineLabOrder();

  // Radiology orders: CT of larynx, Chest x-ray (one view), and CT of kidney.
  await practitioner.selectCTOfLarynxRadiologyOrder();
  await practitioner.selectChestXrayOneViewRadiologyOrder();
  await practitioner.selectCTOfKidneyRadiologyOrder();

  // Prescription orders: CLOPAM 2mg,PARACETAMOL 500mg and CLOPRAM 10mg.
  await practitioner.selectCLOPAM2mgPrescriptionOrder();
  await practitioner.selectParacetamol500mgPrescriptionOrder();
  await practitioner.selectCLOPRAM10mgPrescriptionOrder();

  // Submit the predetermination orders to the payer.
  await practitioner.submitPredeterminationOrdersToPayer();
});

