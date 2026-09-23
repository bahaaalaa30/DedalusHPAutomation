import { test, expect, config } from '../fixtures/baseTest';
import { PractitionerPage } from '../pages/PractitionerPage';

test('general practitioner login', async ({ page, loginPage }) => {
  await page.goto(config.url);
  await loginPage.login(config.genUser, config.genPass);
  await expect(page).toHaveURL(/user/);
});

test('practitioner patient count', async ({ page, loginPage }) => {
  await page.goto(config.generalPractitionerUrl);
  await loginPage.login(config.genUser, config.genPass);
  await page.goto(config.generalPractitionerUrl);

  const p = new PractitionerPage(page);

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
