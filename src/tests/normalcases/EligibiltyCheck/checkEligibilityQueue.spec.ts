import path from 'node:path';
import { test, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';
import { getRandomPatientId } from '../../../utils/csvDataReader';

test('eligibility queue approval', async ({ page, loginPage }) => {
  await page.goto(config.payerUrl);
  await loginPage.login(config.cmoB6, config.cmoPassword);
  await page.goto(config.payerVisitBookingUrl);
  const p = new VisitBookingPage(page);
  const id = getRandomPatientId(path.resolve('src/test-data/BMS.csv'));
  await p.SearchBMS(id);
  const captured = await p.selectPatientIDByBMS();
  await p.ValidateEligiblePatient(captured);
  await p.verifyStatusIsApproved();
});
