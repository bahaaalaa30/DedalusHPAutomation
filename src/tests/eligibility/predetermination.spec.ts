import { test, expect } from '../../fixtures/baseTest';
import { PractitionerPage } from '../../pages/PractitionerPage';

test('predetermination lab order', async ({ page, loginPage }) => {
  await page.goto(process.env.PAYER_VISIT_BOOKING_URL ?? '');
  await loginPage.login(process.env.ELNASR_USER ?? '', process.env.ELNASR_PASSWORD ?? '');
  await expect(page).toHaveURL(/user/);
  const practitioner = new PractitionerPage(page);
  await practitioner.selectPatient();
  await practitioner.startConsultation();
  await practitioner.createOrder();
});
