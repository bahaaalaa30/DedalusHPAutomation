import { test, expect, config } from '../../../fixtures/baseTest';
import { PractitionerPage } from '../../../pages/PractitionerPage';

test('general practitioner login', async ({ page, loginPage }) => {
  await page.goto(config.url, { waitUntil: 'domcontentloaded' });
  await loginPage.login(config.genUser, config.genPass);
  const p = new PractitionerPage(page);
  await p.selectRole();
  await p.continueRole();
  await expect(page).toHaveURL(/user/);
});
