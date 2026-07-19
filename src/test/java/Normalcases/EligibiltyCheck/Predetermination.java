package Normalcases.EligibiltyCheck;


import Normalcases.Practitioner.ElnasrDoctorLogin;
import Normalcases.Practitioner.PractitionerLogin;
import base.BaseTest;
import io.qameta.allure.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.PractitionerPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

import java.time.Duration;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Eligibility Module")

public class Predetermination extends BaseTest {

    @Test(priority = 20, description = "Verify Check Eligibility with Eligible Patient")
    @Severity(SeverityLevel.BLOCKER)
    @Story("Successful Eligibility Check for Eligible Patient")
    @Description("This test validates that a user can check the eligibility of a patient with valid credentials.")
    public void checkPredeterminationLabOrder() {
        ElnasrDoctorLogin  practitionerLogin = new ElnasrDoctorLogin();
        practitionerLogin.login();
        PractitionerPage practitionerPage = new PractitionerPage(getDriver());
        practitionerPage.SelectPatient();
        System.out.println("📍 Navigating to the Patient Start Consultation page...");
        practitionerPage.StartConsultation();
        System.out.println("📍 Navigating to the Patient Visit page...");



    }


}

