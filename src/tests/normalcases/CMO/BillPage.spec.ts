import { test, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';

test.describe('CMO bills', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(config.url, { waitUntil: 'commit' });
    await loginPage.login(config.username, config.password);
    await page.goto(config.visitBookingUrl, { waitUntil: 'commit' });
  });

  test('print bill', async ({ page }) => await new VisitBookingPage(page).BillPage('test'));
  test('pay bill', async ({ page }) => await new VisitBookingPage(page).PayBill('test'));
});
