package Normalcases;
import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

@Epic("Appointment Management System")
@Feature("Appointment Rescheduling")
public class RescheduleAppointment extends BaseTest {
    @Test(priority = 12, description = "Reschedule Patient Appointment")
    @Severity(SeverityLevel.NORMAL)
    @Story("Outpatient Department (OPD) Appointment Reschedule")
    public void rescheduleAppointment() throws InterruptedException {
        WebDriver currentDriver = getDriver();
        String url = ConfigReader.getProperty("url");
        currentDriver.get(url);
        LoginPage loginPage = new LoginPage(currentDriver);
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();

        VisitBookingPage bookingPage = new VisitBookingPage(currentDriver);
        bookingPage.selectClinic()
                .selectPractitioner()
                .bookTimeSlot("09:00 pm")
                .createAppointmentWorkflow("B600007148");
        WebDriver currDriver = getDriver();
        currDriver.get(ConfigReader.getProperty("visitbookingurl"));
        bookingPage.rescheduleAppointment("06:00 pm");
        System.out.println("✅ Cleanup Process Finished: Appointment Rescheduled.");
        Cancelappointment cancelappointment = new Cancelappointment();
        cancelappointment.cancelAppoientment();
    }
}