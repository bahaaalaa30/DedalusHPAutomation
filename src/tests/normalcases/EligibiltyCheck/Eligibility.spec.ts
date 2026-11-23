import path from 'node:path';
import { test, expect, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';
import { PatientBMS } from '../../../utils/patientBms';
import { getRandomPatientId } from '../../../utils/csvDataReader';

test('eligible patient', async ({ page, loginPage }) => {
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
  const p = new VisitBookingPage(page);
  await p.selectPayerFacility();
  await p.selectPayerClinic();
  await p.selectPayerDoctor();
  await p.bookNextAvailableTimeSlot();
  const id = getRandomPatientId(path.resolve('src/test-data/BMS.csv'));
  PatientBMS.setPatientId(id);
  await p.EligibilityCheck(id);
  await p.selectVisitType2();
  await p.sendRequestAndWaitForResponse();
  PatientBMS.markEligibilityCompleted();

  const capturedPatient = PatientBMS.getCapturedPatient();
  console.log(
    `✅ Eligibility patient saved for Predetermination: ${capturedPatient.patientName} | ${capturedPatient.patientId}`
  );
});

test('NonEligiblePatient', async ({ page, loginPage }) => {
  await page.goto(config.payerUrl);
  await loginPage.login(config.cmoB6, config.cmoPassword);
  await page.goto(config.payerVisitBookingUrl, { waitUntil: 'commit' });
  await loginPage.selectFDRole();
  await loginPage.continueRole();
  await expect(page.locator('#clinic-btn')).toBeVisible({ timeout: 30000 });
  const p = new VisitBookingPage(page);
  await p.selectPayerFacility();
  await p.selectPayerClinic();
  await p.selectPayerDoctor();
  await p.bookNextAvailableTimeSlot();
  const id = getRandomPatientId(path.resolve('src/test-data/NonValidBMS.csv'));
  PatientBMS.setPatientId(id);
  await p.NonEligibilityCheck(id);
  await p.selectVisitType2();
  await p.sendRequestAndWaitForResponseNoneligible('115');
});
