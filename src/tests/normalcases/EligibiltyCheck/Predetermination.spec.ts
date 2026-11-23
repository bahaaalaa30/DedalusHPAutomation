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

test('FullPredOrder', async ({ page, loginPage }) => {
  // Step 1: Run the complete Eligible Patient flow and capture its patient data.
  PatientBMS.clearCapturedPatient();

  await page.goto(config.payerUrl, { waitUntil: 'commit' });
  await page.waitForURL(/login/, { timeout: 30000 });
  await expect(page.locator('#user-id')).toBeVisible({ timeout: 30000 });
  await loginPage.login(config.cmoB6, config.cmoPassword);
  await loginPage.selectFDRole();
  await loginPage.continueRole();
  await expect(page).toHaveURL(/clinicaldiary/, { timeout: 5000 });

  await page.goto(config.payerVisitBookingUrl, { waitUntil: 'commit' });
  await expect(page.locator('#clinic-btn')).toBeVisible({ timeout: 30000 });

  const visitBooking = new VisitBookingPage(page);
  await visitBooking.selectPayerFacility();
  await visitBooking.selectPayerClinic();
  await visitBooking.selectPayerDoctor();
  await visitBooking.bookNextAvailableTimeSlot();

  const patientId = getRandomPatientId(path.resolve('src/test-data/BMS.csv'));
  PatientBMS.setPatientId(patientId);
  await visitBooking.EligibilityCheck(patientId);
  await visitBooking.selectVisitType2();
  await visitBooking.sendRequestAndWaitForResponse();
  PatientBMS.markEligibilityCompleted();
  await page.waitForTimeout(20_000);
  // Step 2: Continue with Predetermination Orders using the captured eligible patient.
  const patient = PatientBMS.getCapturedPatient();
  console.log(
    `🔎 Full Predetermination patient: ${patient.patientName} | ${patient.patientId} | BMS: ${patient.bms}`
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
