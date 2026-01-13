package Normalcases;
import base.BaseTest;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

@Epic("Appointment Management System")
@Feature("Search Patient")
public class SearchPatient extends BaseTest {

    @Test(priority = 6, description = "Search Patient by ID")
    @Severity(SeverityLevel.NORMAL)
    @Story("Search Patient Functionality")
    @Description("CMS user searches for a patient using their ID and verifies the search results.")
    public void SearchPatientID(){
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
        bookingPage.SearchPatientID("B600007148");
        System.out.println("✅ Searching Done Successfully!");
    }


    @Test(priority = 7, description = "Search Patient by Name")
    @Severity(SeverityLevel.NORMAL)
    @Story("Search Patient Functionality")
    @Description("CMS user searches for a patient using their Name and verifies the search results.")
    public void SearchPatientName(){
        String url = ConfigReader.getProperty("url");
        System.out.println("🚀 Starting the Login process...");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("📍 Navigating to the Visit Booking page...");
        getDriver().get("http://10.24.13.10/healthplug/#/user/visitbooking");
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.SearchPatientName("test");
        System.out.println("✅ Searching Done Successfully!");
    }


    @Test(priority = 8, description = "Search Patient by National ID")
    @Severity(SeverityLevel.NORMAL)
    @Story("Search Patient Functionality")
    @Description("CMS user searches for a patient using their National ID and verifies the search results.")
    public void SearchNationalID(){
        String url = ConfigReader.getProperty("url");
        System.out.println("🚀 Starting the Login process...");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("📍 Navigating to the Visit Booking page...");
        getDriver().get("http://10.24.13.10/healthplug/#/user/visitbooking");
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.SearchNationalID("43213431234234");
        System.out.println("✅ Searching Done Successfully!");
    }


    @Test(priority = 9, description = "Search Patient by Gender: Male")
    @Severity(SeverityLevel.NORMAL)
    @Story("Search Patient Functionality")
    @Description("CMS user searches for a patient using their Gender and verifies the search results.")
    public void SearchPatientGenderMale(){
        String url = ConfigReader.getProperty("url");
        System.out.println("🚀 Starting the Login process...");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("📍 Navigating to the Visit Booking page...");
        getDriver().get("http://10.24.13.10/healthplug/#/user/visitbooking");
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.SearchPatientGenderMale("test");
        System.out.println("✅ Searching Done Successfully!");
    }

    @Test(priority = 10, description = "Search Patient by Gender: Female")
    @Severity(SeverityLevel.NORMAL)
    @Story("Search Patient Functionality")
    @Description("CMS user searches for a patient using their Gender and verifies the search results.")
    public void SearchPatientGenderFemale(){
        String url = ConfigReader.getProperty("url");
        System.out.println("🚀 Starting the Login process...");
        getDriver().get(url);
        LoginPage loginPage = new LoginPage(getDriver());
        loginPage.enterUsername(ConfigReader.getProperty("username"));
        loginPage.enterPassword(ConfigReader.getProperty("password"));
        loginPage.clickLogin();
        System.out.println("📍 Navigating to the Visit Booking page...");
        getDriver().get("http://10.24.13.10/healthplug/#/user/visitbooking");
        VisitBookingPage bookingPage = new VisitBookingPage(getDriver());
        bookingPage.SearchPatientGenderFemale("test");
        System.out.println("✅ Searching Done Successfully!");
    }

}
