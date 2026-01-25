package Normalcases;

import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import utils.ConfigReader;
import java.time.Duration;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Authentication Module")
public class LoginTest extends BaseTest {
    public LoginTest(WebDriver currentDriver) {

    }

    @Test(priority = 0, description = "Verify Login with Valid Credentials")
    @Severity(SeverityLevel.BLOCKER)
    @Story("Successful Authentication for Medical Staff")
    @Description("This test validates that a user can log in with valid credentials and is correctly redirected to the Clinical Diary dashboard.")
    public void loginWithValidCredentials() {
        String url = ConfigReader.getProperty("url");
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
    }

    @Test(priority = 1, description = "Verify Error Message with Invalid Credentials")
    @Severity(SeverityLevel.CRITICAL)
    @Story("Unauthorized Access Prevention")
    @Description("This test ensures that the system denies access when incorrect credentials are provided and displays the appropriate security warning.")
    public void loginWithInvalidCredentials() {
        String url = ConfigReader.getProperty("url");
        System.out.println("\n🚀 Started: Invalid Credentials Login Test");
        getDriver().get(url);

        LoginPage loginPage = new LoginPage(getDriver());

        loginPage.enterUsername("wrong_user")
                .enterPassword("wrong_pass")
                .clickLogin();

        String expectedError = "Unauthorized use of this system is strictly prohibited";
        String actualError = loginPage.getErrorMessage();

        Assert.assertEquals(actualError, expectedError, "❌ Error message mismatch!");
        System.out.println("✅ Finished: Error message verification successful.");
    }
}