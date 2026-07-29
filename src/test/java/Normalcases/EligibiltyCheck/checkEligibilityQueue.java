package Normalcases.EligibiltyCheck;
import base.BaseTest;
import io.qameta.allure.*;
import base.PatientBMS;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.VisitBookingPage;


@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Eligibility Module")
public class checkEligibilityQueue extends BaseTest {
    @Test(priority = 22, description = "Verify Check Eligibility with Eligible Patient")
    @Severity(SeverityLevel.BLOCKER)
    @Story("Successful Eligibility Check for Eligible Patient")
    @Description("This test validates that a user can check the Approved eligibility patient")
    public void CheckEligiblePatient() throws InterruptedException {
        Eligibility createVisit = new Eligibility();
        createVisit.checkEligibilityWithValidPID();
        String patientId = PatientBMS.getPatientId();
        System.out.println("🆔 Extracted Patient ID: " + patientId);
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.SearchBMS(patientId);
        bookingPage.selectPatientIDByBMS();
        String patientIdFromBMS = bookingPage.selectPatientIDByBMS();
        System.out.println("📌 Stored BMS ID captured from UI = " + patientIdFromBMS);
        bookingPage.exitPage();
        bookingPage.ValidateEligiblePatient(patientIdFromBMS);
        bookingPage.verifyStatusIsApproved();
    }



}
