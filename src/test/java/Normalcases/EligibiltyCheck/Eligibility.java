package Normalcases.EligibiltyCheck;

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
@Feature("Eligibility Module")
public class Eligibility extends BaseTest {
    @Test(priority = 20, description = "Verify Check Eligibility with Eligible Patient")
    @Severity(SeverityLevel.BLOCKER)
    @Story("Successful Eligibility Check for Eligible Patient")
    @Description("This test validates that a user can check the eligibility of a patient with valid credentials.")
    public void checkEligibilityWithValidPID() {
        String url = ConfigReader.getProperty("PayerURL");
        System.out.println("🚀 Started: Valid Credentials Login Test");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("CMOB6"));
        loginPage.enterPassword(ConfigReader.getProperty("cmoPassword"));
        loginPage.clickLogin();
        System.out.println("⏳ Verifying redirection to Clinical Diary...");
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(5));
        boolean success = wait.until(ExpectedConditions.urlContains("clinicaldiary"));
        Assert.assertTrue(success, "❌ Login Failed! System did not redirect to Clinical Diary.");
        System.out.println("✅ Finished: Login successful.");
        System.out.println("📍 Navigating to the Visit Booking page...");
        String PayerURLVisitPage = ConfigReader.getProperty("payervisitbookingurl");
        getDriver().get(PayerURLVisitPage);
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.selectPayerFacility();
        bookingPage.selectPayerClinic();
        bookingPage.selectPayerDoctor();
        bookingPage.bookTimeSlot("09:15 pm");
        bookingPage.EligibilityCheck("1731776073");
        bookingPage.sendRequestAndWaitForResponse();
        System.out.println("✅ Appointment booked and visit created successfully!");
    }
    @Test(priority = 21, description = "Verify Check Eligibility with Eligible Patient")
    @Severity(SeverityLevel.BLOCKER)
    @Story("Successful Eligibility Check for non Eligible Patient")
    @Description("This test validates that a user can check the eligibility of a patient with Invalid credentials.")
    public void checkEligibilityWithinValidPID() {
        String url = ConfigReader.getProperty("PayerURL");
        System.out.println("🚀 Started: Valid Credentials Login Test");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("CMOB6"));
        loginPage.enterPassword(ConfigReader.getProperty("cmoPassword"));
        loginPage.clickLogin();
        System.out.println("⏳ Verifying redirection to Clinical Diary...");
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(5));
        boolean success = wait.until(ExpectedConditions.urlContains("clinicaldiary"));
        Assert.assertTrue(success, "❌ Login Failed! System did not redirect to Clinical Diary.");
        System.out.println("✅ Finished: Login successful.");
        System.out.println("📍 Navigating to the Visit Booking page...");
        String PayerURLVisitPage = ConfigReader.getProperty("payervisitbookingurl");
        getDriver().get(PayerURLVisitPage);
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.selectPayerFacility();
        bookingPage.selectPayerClinic();
        bookingPage.selectPayerDoctor();
        bookingPage.bookTimeSlot("10:00 pm");
        bookingPage.nonEligibilityCheck("A200000277");
        bookingPage.sendRequestAndWaitForResponseNoneligible();
        System.out.println("✅ Appointment booked and visit created successfully!");
    }
}

