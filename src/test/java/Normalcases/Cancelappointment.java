package Normalcases;
import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

@Epic("Appointment Management System")
@Feature("Appointment Cancellation")


public class Cancelappointment  extends BaseTest {
    @Test(priority = 4, description = "Cancel Patient Appointment")
    @Severity(SeverityLevel.NORMAL)
    @Story("Outpatient Department (OPD) Appointment Cancel")

    public void cancelAppoientment() throws InterruptedException {
        WebDriver currentDriver = getDriver();
        String url = ConfigReader.getProperty("url");
        currentDriver.get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        VisitBookingPage bookingPage = new VisitBookingPage(currentDriver);
        bookingPage.CancelAppointment();
        Thread.sleep(5000);
        System.out.println("✅ Cleanup Process Finished: Appointment Canceled.");
    }
}