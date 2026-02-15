package Normalcases;


import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import utils.ConfigReader;

import java.time.Duration;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Authentication Module")
public class PractitionerLogin extends BaseTest {
    @Test(priority = 14, description = "Verify General Practitioner can Login with Valid Credentials")
    @Severity(SeverityLevel.BLOCKER)
    @Story("Successful Authentication for Medical Staff")
    @Description("This test validates that a Gen. Practitioner can log in with valid credentials.")
    public void loginWithValidCredentials() {
        String url = ConfigReader.getProperty("url");
        System.out.println("🚀 Started: Valid Credentials Login Test");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("GenUser"));
        loginPage.enterPassword(ConfigReader.getProperty("GenPass"));
        loginPage.clickLogin();
        System.out.println("⏳ Verifying redirection to Clinical Diary...");
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(5));
        boolean success = wait.until(ExpectedConditions.urlContains("user"));
        Assert.assertTrue(success, "❌ Login Failed! System did not redirect to Clinical Diary.");
        System.out.println("✅ Finished: Login successful.");
    }
}