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
@Feature("Visit Booking & Creation")
public class VisitBooking extends BaseTest {
    @Test(priority = 2, description = "Book a New Appointment and Create Patient Visit")
    @Severity(SeverityLevel.CRITICAL)
    @Story("Outpatient Department (OPD) Visit Booking")
    @Description("This test verifies the end-to-end workflow: selecting a clinic and practitioner, booking an available time slot, searching for a patient, and successfully completing the visit creation process.")
    public void bookVisitAppointment() {
        String url = ConfigReader.getProperty("url");
        String VisitbookingURL = ConfigReader.getProperty("visitbookingurl");
        System.out.println("🚀 Starting the Login process...");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("📍 Navigating to the Visit Booking page...");
        getDriver().get(VisitbookingURL);
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.selectClinic()
                .selectPractitioner()
                .bookTimeSlot("09:06 pm")
                .createVisitWorkflow("B600007148", "100");
        System.out.println("✅ Appointment booked and visit created successfully!");
    }


}