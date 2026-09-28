import { test, config } from '../../../fixtures/baseTest';
import { VisitBookingPage } from '../../../pages/VisitBookingPage';

test('visit booking and visit creation', async ({ page, loginPage }) => {
  await page.goto(config.url);
  await loginPage.login(config.username, config.password);
  await page.goto(config.visitBookingUrl);
  const booking = new VisitBookingPage(page);
  await booking.selectClinic();
  await booking.selectPractitioner();
  await booking.bookTimeSlot('09:00 pm');
  await booking.createVisitWorkflow('B600007148', '100');
});
