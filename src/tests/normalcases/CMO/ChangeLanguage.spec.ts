import { test, expect, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';

test('change language to Arabic', async ({ page, loginPage }) => {
  await page.goto(config.url, { waitUntil: 'commit' });
  await loginPage.login(config.username, config.password);
  await page.goto(config.visitBookingUrl, { waitUntil: 'commit' });
  const booking = new VisitBookingPage(page);
  await booking.switchToArabicLanguage();
  expect(await booking.isNoResultsMessageDisplayed()).toBe(true);
});
