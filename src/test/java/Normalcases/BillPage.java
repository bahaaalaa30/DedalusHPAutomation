package Normalcases;

import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

import java.time.Duration;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Billing Module")
public class BillPage extends BaseTest {
    @Test(priority = 12, description = "Verify Printing the Bill")
    @Severity(SeverityLevel.NORMAL)
    @Story("Successful Printing for Patient Billing")
    @Description("This test validates that a CMO can Print the Bill for a patient and the system generates the correct bill details.")
    public void PrintingPatientBill() throws InterruptedException {
        String url = ConfigReader.getProperty("url");
        String VisitbookingURL = ConfigReader.getProperty("visitbookingurl");
        System.out.println("🚀 Started: Valid Credentials Login Test");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("⏳ Verifying redirection to Clinical Diary...");
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(5));
        boolean success = wait.until(ExpectedConditions.urlContains("clinicaldiary"));
        Assert.assertTrue(success, "❌ Login Failed! System did not redirect to Clinical Diary.");
        System.out.println("✅ Finished: Login successful.");
        getDriver().get(VisitbookingURL);
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.selectClinic();
        bookingPage.BillPage("test");

    }

    @Test(priority = 12, description = "Verify Printing the Bill")
    @Severity(SeverityLevel.NORMAL)
    @Story("Successful Printing for Patient Billing")
    @Description("This test validates that a CMO can Print the Bill for a patient and the system generates the correct bill details.")
    public void PayPatientBill() throws InterruptedException {
        String url = ConfigReader.getProperty("url");
        String VisitbookingURL = ConfigReader.getProperty("visitbookingurl");
        System.out.println("🚀 Started: Valid Credentials Login Test");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("⏳ Verifying redirection to Clinical Diary...");
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(5));
        boolean success = wait.until(ExpectedConditions.urlContains("clinicaldiary"));
        Assert.assertTrue(success, "❌ Login Failed! System did not redirect to Clinical Diary.");
        System.out.println("✅ Finished: Login successful.");
        getDriver().get(VisitbookingURL);
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.selectClinic();
        bookingPage.PayBill("test");
    }


}
