package Normalcases;
import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

@Epic("Appointment Management System")
@Feature("Visit Cancellation")
public class Cancelvisit extends BaseTest {
    @Test(priority = 3, description = "Cancel Patient Visit")
    @Severity(SeverityLevel.CRITICAL)
    @Story("Outpatient Department (OPD) Visit Cancel")

    public void cancelVisitWorkflow() throws InterruptedException {
        String url = ConfigReader.getProperty("url");
        WebDriver currentDriver = getDriver();
        currentDriver.get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        VisitBookingPage bookingPage = new VisitBookingPage(currentDriver);
        bookingPage.CancelBookedVisit();
        System.out.println("✅ Cleanup Process Finished: Visit Canceled.");
        Thread.sleep(5000);
    }
    }
