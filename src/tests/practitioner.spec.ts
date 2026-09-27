import { test, expect, config } from '../fixtures/baseTest';
import { PractitionerPage } from '../pages/PractitionerPage';

test('general practitioner login', async ({ page, loginPage, PractitionerPage }) => {
  await page.goto(config.url);
  await loginPage.login(config.genUser, config.genPass);

  const p = new PractitionerPage(page);
  await p.SelectClinicianRole.waitFor({ state: 'visible', timeout: 15000 });
  await p.SelectClinicianRole.click();
  await p.continueRole();
  await expect(page).toHaveURL(/user/);
});

test('practitioner patient count', async ({ page, loginPage, PractitionerPage }
) => {
  const p = new PractitionerPage(page);
  await page.goto(config.generalPractitionerUrl);
  await loginPage.login(config.genUser, config.genPass);
await p.SelectClinicianRole.waitFor({ state: 'visible', timeout: 15000 });
await p.SelectClinicianRole.click();
await p.continueRole();
  await page.goto(config.generalPractitionerUrl);
  await p.selectClinic();
  await p.verifyLeadsCountIsGreaterThanOne();
});

test('El Nasr doctor login', async ({ page, loginPage }) => {
  await page.goto(config.payerVisitBookingUrl);
  await loginPage.login(
    config.elNasrDoctorUser,
    config.elNasrDoctorPassword
  );
  await expect(page).toHaveURL(/user/);
});

test('create lab order', async ({ page, loginPage }) => {
  await page.goto(config.payerVisitBookingUrl);
  await loginPage.login(
    config.elNasrDoctorUser,
    config.elNasrDoctorPassword
  );

  const p = new PractitionerPage(page);

  await p.selectPatient();
  await p.startConsultation();
  await p.createOrder();
});
