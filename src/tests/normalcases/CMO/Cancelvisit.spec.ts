import { test, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';

test('cancel visit', async ({ page, loginPage }) => {
  await page.goto(config.url);
  await loginPage.login(config.username, config.password);
  await new VisitBookingPage(page).CancelBookedVisit();
});
