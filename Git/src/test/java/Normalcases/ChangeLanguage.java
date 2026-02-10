package Normalcases;

import base.BaseTest;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.VisitBookingPage;
import utils.ConfigReader;

@Epic("Appointment Management System")
@Feature("Language Change")
public class ChangeLanguage extends BaseTest {
    @Test(priority = 5, description = "Change Language Setting")
    @Severity(SeverityLevel.NORMAL)
    @Story("Change Application Language")
    @Description("CMS user changes the application language and verifies the change.")
    public void changeLanguageSetting() {
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
        bookingPage.switchToArabicLanguage();
        System.out.println("✅ Language changed to Arabic successfully!");
        boolean result = bookingPage.isNoResultsMessageDisplayed();
        Assert.assertTrue(result, "لم يتم العثور على نتائج");
        System.out.println("✅ نجح التيست: الرسالة العربية ظهرت بنجاح.");


    }

}
