import { test, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';

test('cancel appointment', async ({ page, loginPage }) => {
  await page.goto(config.url, { waitUntil: 'commit' });
  await loginPage.login(config.username, config.password);
  await new VisitBookingPage(page).CancelAppointment();
});
