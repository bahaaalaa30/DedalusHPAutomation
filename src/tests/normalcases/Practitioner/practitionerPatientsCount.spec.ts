import { test, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';

test('practitioner patient count', async ({ page, loginPage }) => {
  const p = new PractitionerPage(page);
  await page.goto(config.generalPractitionerUrl);
  await loginPage.login(config.genUser, config.genPass);
  await p.selectRole();
  await p.continueRole();
  await page.goto(config.generalPractitionerUrl);
  await p.selectClinic();
  await p.verifyLeadsCountIsGreaterThanOne();
});
