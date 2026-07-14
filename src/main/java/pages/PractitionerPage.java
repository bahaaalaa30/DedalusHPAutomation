package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.time.Duration;

public class PractitionerPage {
    private final WebDriver driver;
    private final WebDriverWait wait; // تغييرها لـ final لضمان تعريفها مرة واحدة
    private final JavascriptExecutor js;
    private final By PatientsCount = By.cssSelector("body > app-root > app-crm > div > div > app-crm-leads > div.crm-content-list.content-height > div > div.col-2 > app-crm-quick-filters > div > div > div:nth-child(2) > div:nth-child(3) > div.filter-count.ng-star-inserted > div");

    public PractitionerPage(WebDriver driver) {
        this.driver = driver;
        // 1. حل مشكلة الـ Null: يجب إنشاء كائن الـ WebDriverWait هنا
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        // 2. حل مشكلة الـ JS: تحويل الـ driver لـ JavascriptExecutor
        this.js = (JavascriptExecutor) driver;
    }

    public void verifyLeadsCountIsGreaterThanOne() {
        // 1. الانتظار حتى يظهر العنصر وتكون القيمة مقروءة
        WebElement countElement = wait.until(ExpectedConditions.visibilityOfElementLocated(PatientsCount));

        // 2. الحصول على النص وتنظيفه من أي مسافات
        String countText = countElement.getText().trim();

        // 3. تحويل النص إلى رقم (Integer)
        int actualCount = Integer.parseInt(countText);

        // 4. Assertion: التأكد أن الرقم أكبر من 1
        // الاستخدام الصحيح لـ TestNG Assertions
        Assert.assertTrue(actualCount > 1,
                "ERROR: Expected count to be greater than 1, but found: " + actualCount);

        System.out.println("Validation Passed: Leads count is " + actualCount);
    }
public void  SelectClinic(){
        WebElement clinicElement = wait.until(ExpectedConditions.elementToBeClickable(By.id("facility-menu")));
        clinicElement.click();
        WebElement FacilityName = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#facility-menu-actions > div > div > div > div > div:nth-child(3)")));
        FacilityName.click();
}


}
