package Normalcases.Practitioner;

import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.PractitionerPage;
import utils.ConfigReader;

import java.time.Duration;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Validation Module")
public class practitionerPatientsCount extends BaseTest {
    @Test(priority = 15, description = "Verify General Practitioner can Login with Valid Credentials")
    @Severity(SeverityLevel.NORMAL)
    @Story("Get Data From The Page")
    @Description("This test validates that a Gen. Practitioner can see the patients count in the practitioner page.")
    public void patientcount() {
        String GenUsr = ConfigReader.getProperty("GenUsr");
        System.out.println("🚀 Started: Valid Credentials Login Test");
        getDriver().get(GenUsr);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("GenUser"));
        loginPage.enterPassword(ConfigReader.getProperty("GenPass"));
        loginPage.clickLogin();
        System.out.println("⏳ Verifying redirection to Clinical Diary...");
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(5));
        boolean success = wait.until(ExpectedConditions.urlContains("user"));
        System.out.println("✅ Finished: Login successful.");
        getDriver().get(GenUsr);
        PractitionerPage PractitionerPage = new PractitionerPage(getDriver());
        PractitionerPage.SelectClinic();
        PractitionerPage.verifyLeadsCountIsGreaterThanOne();

    }

}
