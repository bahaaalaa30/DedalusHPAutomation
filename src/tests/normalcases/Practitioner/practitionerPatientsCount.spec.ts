import { test, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';

test('practitioner patient count', async ({ page, loginPage }) => {
  const p = new PractitionerPage(page);
  await page.goto(config.generalPractitionerUrl, { waitUntil: 'domcontentloaded' });
  await loginPage.login(config.genUser, config.genPass);
  await p.selectRole();
  await p.continueRole();
  await page.goto(config.generalPractitionerUrl, { waitUntil: 'domcontentloaded' });
  await p.selectClinic();
  await p.verifyLeadsCountIsGreaterThanOne();
});
