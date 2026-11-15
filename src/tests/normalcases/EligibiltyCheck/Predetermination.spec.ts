import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';
import { PatientBMS } from '../../../utils/patientBms';

test('predetermination orders', async ({ page, loginPage }) => {
  const patient = PatientBMS.getCapturedPatient();

  console.log('📋 Patient loaded for Predetermination:', {
    patientName: patient.patientName,
    patientId: patient.patientId,
    bms: patient.bms,
    capturedAt: patient.capturedAt
  });

  await page.goto(config.payerVisitBookingUrl);
  await loginPage.login(config.elNasrDoctorUser, config.elNasrDoctorPassword);
  await expect(page).toHaveURL(/user/);

  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient(patient.patientName, patient.patientId);
  await practitioner.startConsultation();
  await practitioner.createOrder();
});
