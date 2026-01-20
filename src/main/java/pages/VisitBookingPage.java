package pages;

import io.qameta.allure.Step;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Duration;

public class VisitBookingPage {

    private static final Logger log = LoggerFactory.getLogger(VisitBookingPage.class);
    private final WebDriver driver;
    private final WebDriverWait wait;
    private final JavascriptExecutor js;
    private final By ClinicNameSearchButton = By.cssSelector("#clinic-btn");
    //private final By ClinicNameSelectioncancel = By.cssSelector("#clinic-list > div.clinic-list > div:nth-child(26)");
    private final By ClinicNameSelection = By.cssSelector("#clinic-list > div.clinic-list > div:nth-child(25)");
    private final By PractitionerSelection = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > div > div.diary-container > div.quick-filters > app-crm-quick-filters > div > div > div.quick-filter-list.ng-star-inserted > div:nth-child(2) > div.filter-name.has-count.no-icon");
    private final By PIDsearch = By.cssSelector("input[placeholder*='Search Patient'], .appt-component input");
    private final By SearchBTN = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-ex-book-appointment > div.ex-book-appointment-container > div.ex-book-appointment > div > div.book-appt-container > div.appt-container.border-left > div.appt-component > div > app-ex-identify-patient > div > div.content > div > div > span > img");
    private final By VisitType2 = By.cssSelector("#visit_HO");
    private final By SearchResult = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-ex-book-appointment > div.ex-book-appointment-container > div.ex-book-appointment > div > div.book-appt-container > div.appt-container.border-left > div.appt-component > div > app-ex-identify-patient > div.find-patient.ng-star-inserted > app-find-patient-detail > div > div > app-flash-card > div > div > div.front > div > div > div.find-patient-content > div.patients-list.border-left > div.list-content > div:nth-child(1) > div > div.col-3.primary-text > p");
    private final By ConfirmApptAndCreateVisitBtn = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-ex-book-appointment > div.ex-book-appointment-container > div.ex-book-appointment > div > div.book-appt-footer.border-top > div:nth-child(2) > button:nth-child(2)");
    //private final By ConfirmationTxt = By.cssSelector(".flow-content p.title-text");
    private final By ContinueToVisitBtn = By.xpath("//button[contains(text(),'Continue')]");
    private final By PaymentBtn = By.xpath("//button[contains(text(),'Payment')]");
    private final By CashTxtField = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-ex-create-visit > div > div.ex-book-appointment > div > div.book-appt-container > div.appt-container.border-left > div.appt-component > div > app-ex-visit-payment-details > div > div.payment-container > div.flex_container > div > div > input");
    private final By CreateVisitBtn = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-ex-create-visit > div > div.ex-book-appointment > div > div.book-appt-footer.border-top > div:nth-child(2) > button");
    private final By DoneBtn = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-ex-create-visit > div > div.ex-book-appointment > div > div.book-appt-footer.border-top > div:nth-child(2) > button.primary-button.ng-star-inserted");
    private final By OHCVisitRadio = By.cssSelector("#visit_OH");
    private final By PreviewAppointment = By.xpath("//span[@class='patient-name' and contains(text(),'Visit Cancellation For automation')]");
    private final By CancelVisitPatient = By.xpath("//div[normalize-space()='Visit Cancellation']");
    private final By AppointmentCancelReason = By.xpath("//label[contains(text(), 'Mistake in entry')]");
    private final By CancelAppointment = By.xpath("//div[normalize-space()='Cancel Appointment']");
    private final By WrongEntryRadioBtn = By.xpath("//label[normalize-space()='Wrong Entry']");
    private final By ContinueAppointmentCancellationBtn = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-cancel-appointment > div > div.ex-cancel-appointment > div > div.cancel-appt-footer.border-top > button");
    private final By ContinueVisitCancellationBtn = By.xpath("//button[contains(@class, 'primary-button') and normalize-space()='Continue']");
    //private final By DatePicker = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > div > div.diary-header.border-bottom > div.diary-header-content > div > div.date-picker.cursor-pointer");
    //private final By DatePickerUpdateBtn = By.cssSelector("#owl-dt-picker-0 > div.owl-dt-container-inner.ng-trigger.ng-trigger-fadeInPicker > div > button:nth-child(2) > span");
    //private final By PreviewFutureAppointment = By.xpath("//span[@class='patient-id ng-star-inserted' and text()='B600007150']");
    private final By languageMenu = By.id("language-menu");
    private final By arabicLanguageOption = By.xpath("//div[normalize-space()='عربى']");
    private final By noResultsFound = By.xpath("//div[contains(@class, 'title') and normalize-space()='لم يتم العثور على نتائج']");
    private final By SearchPatient = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > app-crm-header > div > div > div.col-5.custom-head-col > input");
    private final By SearchPatientID = By.cssSelector("input[placeholder='Enter Patient ID']");
    private final By FindBTN = By.xpath("//button[text()='Find']");
    private final By searchPatientName = By.cssSelector("#first_name");
    private final By SearchNationlaID = By.cssSelector("input[placeholder*='National ID']");
    private final By GenderMale = By.xpath("//label[contains(., 'Male')]");
    private final By GenderFemale = By.xpath("//label[contains(.,'Female')]");
    private final By PatientList = By.cssSelector("body > app-root > app-crm > div > div > app-clinical-diary > div.find-patient.ng-tns-c29-4.ng-star-inserted > app-find-patient-detail > div > div > app-flash-card > div > div > div.front > div > div > div.find-patient-content > div.patients-list.border-left > div.list-content > div");
    public VisitBookingPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        this.js = (JavascriptExecutor) driver;
    }


    @Step("🏥 Selecting Clinic")
    public VisitBookingPage selectClinic() {
        System.out.println("🏥 Selecting Clinic...");
        wait.until(ExpectedConditions.elementToBeClickable(ClinicNameSearchButton)).click();
        wait.until(ExpectedConditions.elementToBeClickable(ClinicNameSelection)).click();
        return this;
    }

    @Step("👨‍⚕️ Selecting Practitioner (GENB6)")
    public VisitBookingPage selectPractitioner() {
        System.out.println("👨‍⚕️ Selecting Practitioner...");
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(PractitionerSelection));
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
        js.executeScript("arguments[0].click();", element);
        return this;
    }
    @Step("🔍 التحقق من ظهور رسالة: لم يتم العثور على نتائج")
    public boolean isNoResultsMessageDisplayed() {
        try {
            // بننتظر ظهور الرسالة لمدة 10 ثواني مثلاً
            return wait.until(ExpectedConditions.visibilityOfElementLocated(noResultsFound)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    @Step("⏰ Booking Time Slot: {0}")
    public VisitBookingPage bookTimeSlot(String timeText) {
        System.out.println("⏰ Selecting time slot: " + timeText);
        By slotLocator = By.xpath("//p[contains(text(),'" + timeText + "')]/parent::div");
        WebElement slot = wait.until(ExpectedConditions.presenceOfElementLocated(slotLocator));
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", slot);
        js.executeScript("arguments[0].click();", slot);
        return this;
    }

    @Step("📋 Selecting Visit Type (OHC)")
    public VisitBookingPage selectVisitType() {
        System.out.println("📋 Selecting Visit Type: OHC...");
        wait.until(ExpectedConditions.elementToBeClickable(OHCVisitRadio)).click();
        return this;
    }

    @Step("🚀 Executing Full Visit Creation Workflow for: {0}")
    public VisitBookingPage createVisitWorkflow(String PatientName, String fees) {
        System.out.println("🔄 Starting Visit Creation Workflow...");

        System.out.println("📋 Step 1: Selecting Visit Type (OHC)...");
        wait.until(ExpectedConditions.elementToBeClickable(OHCVisitRadio)).click();

        System.out.println("🔍 Step 2: Searching for Patient: " + PatientName);
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(PIDsearch));
        input.clear();
        input.sendKeys(PatientName);
        wait.until(ExpectedConditions.elementToBeClickable(SearchBTN)).click();

        System.out.println("🖱️ Step 3: Selecting patient from results...");
        wait.until(ExpectedConditions.elementToBeClickable(SearchResult)).click();

        System.out.println("📦 Step 4: Confirming Appointment and Initiating Visit...");
        wait.until(ExpectedConditions.elementToBeClickable(ConfirmApptAndCreateVisitBtn)).click();
        wait.until(ExpectedConditions.elementToBeClickable(VisitType2)).click();

        System.out.println("➡️ Step 5: Continuing to visit details...");
        wait.until(ExpectedConditions.elementToBeClickable(ContinueToVisitBtn)).click();

        System.out.println("💰 Step 6: Navigating to Payment screen...");
        wait.until(ExpectedConditions.elementToBeClickable(PaymentBtn)).click();

        System.out.println("💵 Step 7: Entering Cash amount: " + fees);
        WebElement cashField = wait.until(ExpectedConditions.visibilityOfElementLocated(CashTxtField));
        cashField.clear();
        cashField.sendKeys(fees);

        System.out.println("🚀 Step 8: Creating Visit...");
        wait.until(ExpectedConditions.elementToBeClickable(CreateVisitBtn)).click();

        System.out.println("✅ Step 9: Clicking Done to finalize process.");
        wait.until(ExpectedConditions.elementToBeClickable(DoneBtn)).click();

        return this;
    }

    @Step("🧹 Cleanup: Canceling the Appointment")
    public void CancelAppointment(){
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        System.out.println("🏥 Step 1: Opening Clinic list...");
        wait.until(ExpectedConditions.elementToBeClickable(ClinicNameSearchButton)).click();

        System.out.println("🏥 Step 2: Selecting the specific Clinic...");
        wait.until(ExpectedConditions.elementToBeClickable(ClinicNameSelection)).click();

        System.out.println("👨‍⚕️ Step 3: Selecting Practitioner (GENB6)...");
        retryClickOnStaleElement(PractitionerSelection);

        System.out.println("🔍 Step 4: Clicking on the appointment slot to preview...");
        WebElement slot = wait.until(ExpectedConditions.presenceOfElementLocated(PreviewAppointment));
        jsClick(slot);
        System.out.println("🚫 Step 5: Clicking on 'Cancel' option...");
        wait.until(ExpectedConditions.elementToBeClickable(CancelAppointment)).click();
        System.out.println("📝 Step 6: Selecting reason: 'Wrong Entry'...");
        wait.until(ExpectedConditions.elementToBeClickable(AppointmentCancelReason)).click();
        System.out.println("📤 Step 7: Clicking 'Continue' to finalize cancellation...");
        wait.until(ExpectedConditions.elementToBeClickable(ContinueAppointmentCancellationBtn)).click();
        System.out.println("✅ Success: Appointment has been canceled and cleaned up.");

    }





    @Step("🧹 Cleanup: Canceling the Booked Visit")
    public void CancelBookedVisit() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        System.out.println("🏥 Step 1: Opening Clinic list...");
        wait.until(ExpectedConditions.elementToBeClickable(ClinicNameSearchButton)).click();

        System.out.println("🏥 Step 2: Selecting the specific Clinic...");
        wait.until(ExpectedConditions.elementToBeClickable(ClinicNameSelection)).click();

        System.out.println("👨‍⚕️ Step 3: Selecting Practitioner (GENB6)...");
        retryClickOnStaleElement(PractitionerSelection);

        System.out.println("🔍 Step 4: Clicking on the appointment slot to preview...");
        WebElement slot = wait.until(ExpectedConditions.presenceOfElementLocated(PreviewAppointment));
        jsClick(slot);
        System.out.println("🚫 Step 5: Clicking on 'Cancel Visit' option...");
        WebElement cancelOpt = wait.until(ExpectedConditions.presenceOfElementLocated(CancelVisitPatient));
        jsClick(cancelOpt);
     /*   System.out.println("⚠️ Step 6: Clicking 'Visit Cancellation' confirmation...");
        WebElement confirmBtn = wait.until(ExpectedConditions.presenceOfElementLocated(VisitCancellationBtn));
        jsClick(confirmBtn);*/

        System.out.println("📝 Step 7: Selecting reason: 'Wrong Entry'...");
        WebElement reason = wait.until(ExpectedConditions.presenceOfElementLocated(WrongEntryRadioBtn));
        jsClick(reason);
        System.out.println("📤 Step 8: Clicking 'Continue' to finalize cancellation...");
        wait.until(ExpectedConditions.elementToBeClickable(ContinueVisitCancellationBtn)).click();
        System.out.println("✅ Success: Visit has been canceled and cleaned up.");
    }

    /**
     * Helper method to handle StaleElementReferenceException during retry
     */
    private void retryClickOnStaleElement(By locator) {
        for (int i = 0; i < 3; i++) {
            try {
                WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
                element.click();
                break;
            } catch (StaleElementReferenceException e) {
                System.out.println("⚠️ Stale element detected, retrying click... attempt " + (i + 1));
            }
        }
    }
    // --- Helper Methods ---
    private void jsClick(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
        js.executeScript("arguments[0].click();", element);
    }

    public void switchToArabicLanguage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        System.out.println("🌐 Switching application language to Arabic...");
        retryClickOnStaleElement(languageMenu);
        System.out.println("🇸🇦 Selecting Arabic option...");
        WebElement arabicOption = wait.until(ExpectedConditions.visibilityOfElementLocated(arabicLanguageOption));
        jsClick(arabicOption);
    }


    public void SearchPatientID(String PatientID) {
        // 1. تعريف الـ WebDriverWait في بداية الميثود لضمان استخدامه صح
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        System.out.println("🔍 Searching for Patient ID: " + PatientID);

        try {
            // 2. أهم خطوة لجينكينز: انتظر اختفاء أي رسائل Toast (نجاح اللوجن مثلاً) قبل أي ضغطة
            // بنستخدم invisibilityOfElementLocated عشان نضمن إن مفيش حاجة مغطية الزراير
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("toast")));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.tagName("app-toast")));

            // 3. الضغط على أيقونة البحث
            wait.until(ExpectedConditions.elementToBeClickable(SearchPatient)).click();

            // 4. التعامل مع حقل الـ ID
            WebElement patientidField = wait.until(ExpectedConditions.visibilityOfElementLocated(SearchPatientID));
            patientidField.clear();
            patientidField.sendKeys(PatientID);

            // 5. الضغط على زرار Find (مع محاولة تانية بـ JavaScript لو الـ Click العادي اتحجب)
            try {
                wait.until(ExpectedConditions.elementToBeClickable(FindBTN)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Click intercepted by an overlay, retrying with JavaScript...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(FindBTN));
            }

            // 6. التأكد من ظهور النتائج
            wait.until(ExpectedConditions.presenceOfElementLocated(PatientList));
            System.out.println("✅ Search completed for Patient ID: " + PatientID);

        } catch (Exception e) {
            System.err.println("❌ Failed to search for Patient ID: " + PatientID + " due to: " + e.getMessage());
            throw e; // بنعمل throw عشان التست يفشل ويبان السبب في Allure
        }
    }


    public void SearchPatientName(String patientName) {
        // 1. استخدام WebDriverWait بمدّة كافية للـ Headless mode
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        System.out.println("🔍 Searching for Patient Name: " + patientName);

        try {
            // 2. أهم خطوة: التأكد إن الـ Toast اختفت عشان منواجهش ElementClickIntercepted
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("toast")));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.tagName("app-toast")));

            // 3. الضغط على أيقونة فتح قائمة البحث
            wait.until(ExpectedConditions.elementToBeClickable(SearchPatient)).click();

            // 4. إدخال اسم المريض في الحقل المخصص
            WebElement patientField = wait.until(ExpectedConditions.visibilityOfElementLocated(searchPatientName));
            patientField.clear();
            patientField.sendKeys(patientName);

            // 5. الضغط على زر Find مع Fallback للـ JavaScript لضمان التنفيذ في جينكينز
            try {
                wait.until(ExpectedConditions.elementToBeClickable(FindBTN)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Standard click blocked by toast, using JavaScript click as fallback...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(FindBTN));
            }

            // 6. الانتظار حتى تظهر قائمة النتائج (Patient List)
            wait.until(ExpectedConditions.presenceOfElementLocated(PatientList));
            System.out.println("✅ Search completed for Patient Name: " + patientName);

        } catch (Exception e) {
            System.err.println("❌ Failed to search for Patient Name: " + patientName + " | Error: " + e.getMessage());
            throw e;
        }
    }

    public void SearchNationalID(String NationalID) {
        // 1. استخدام WebDriverWait بمدة 15 ثانية لضمان الاستقرار في بيئة السيرفر
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        System.out.println("🔍 Searching for National ID: " + NationalID);

        try {
            // 2. الوقاية من الـ ElementClickIntercepted: انتظر اختفاء أي رسائل Toast
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("toast")));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.tagName("app-toast")));

            // 3. الضغط على أيقونة البحث (SearchPatient)
            wait.until(ExpectedConditions.elementToBeClickable(SearchPatient)).click();

            // 4. إدخال الـ National ID
            WebElement nationalIdField = wait.until(ExpectedConditions.visibilityOfElementLocated(SearchNationlaID));
            nationalIdField.clear();
            nationalIdField.sendKeys(NationalID);

            // 5. الضغط على زر Find مع استخدام الـ JavaScript Fallback
            try {
                wait.until(ExpectedConditions.elementToBeClickable(FindBTN)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Overlay detected, forcing click using JavaScript for National ID search...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(FindBTN));
            }

            // 6. التحقق من ظهور قائمة المرضى
            wait.until(ExpectedConditions.presenceOfElementLocated(PatientList));
            System.out.println("✅ Search completed for National ID: " + NationalID);

        } catch (Exception e) {
            System.err.println("❌ Error during National ID search: " + e.getMessage());
            throw e;
        }
    }

    public void SearchPatientGenderMale(String patientName) {
        // 1. استخدام WebDriverWait بمدة كافية لبيئة السيرفر
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        System.out.println("🔍 Searching for Patient Name: " + patientName + " with Gender: Male");

        try {
            // 2. الوقاية: انتظر اختفاء أي رسائل Toast تظهر بعد اللوجن أو التنقل
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("toast")));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.tagName("app-toast")));

            // 3. الضغط على أيقونة البحث
            wait.until(ExpectedConditions.elementToBeClickable(SearchPatient)).click();

            // 4. إدخال الاسم
            WebElement patientField = wait.until(ExpectedConditions.visibilityOfElementLocated(searchPatientName));
            patientField.clear();
            patientField.sendKeys(patientName);

            // 5. اختيار Gender: Male (مع معالجة الـ Intercepted Click)
            try {
                wait.until(ExpectedConditions.elementToBeClickable(GenderMale)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Gender selection blocked, forcing click via JavaScript...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(GenderMale));
            }

            // 6. الضغط على زر Find (بإضافة Fallback للـ JavaScript)
            try {
                wait.until(ExpectedConditions.elementToBeClickable(FindBTN)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Find button blocked, forcing click via JavaScript...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(FindBTN));
            }

            // 7. التأكد من ظهور النتائج
            wait.until(ExpectedConditions.presenceOfElementLocated(PatientList));
            System.out.println("✅ Search completed for Gender: Male");

        } catch (Exception e) {
            System.err.println("❌ Error in Male Gender search: " + e.getMessage());
            throw e;
        }
    }


    public void SearchPatientGenderFemale(String patientName) {
        // 1. استخدام WebDriverWait بمدة 15 ثانية لمواجهة بطء السيرفرات أحياناً
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        System.out.println("🔍 Searching for Patient Name: " + patientName + " with Gender: Female");

        try {
            // 2. الحل الجذري: انتظر اختفاء أي رسالة نجاح (Toast) مغطية على العناصر
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("toast")));
            wait.until(ExpectedConditions.invisibilityOfElementLocated(By.tagName("app-toast")));

            // 3. الضغط على أيقونة البحث
            wait.until(ExpectedConditions.elementToBeClickable(SearchPatient)).click();

            // 4. إدخال اسم المريض
            WebElement patientField = wait.until(ExpectedConditions.visibilityOfElementLocated(searchPatientName));
            patientField.clear();
            patientField.sendKeys(patientName);

            // 5. اختيار النوع: Female مع حماية الـ JavaScript في حال وجود تداخل (Overlay)
            try {
                wait.until(ExpectedConditions.elementToBeClickable(GenderFemale)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Female selection intercepted, forcing click via JS...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(GenderFemale));
            }

            // 6. الضغط على زر Find
            try {
                wait.until(ExpectedConditions.elementToBeClickable(FindBTN)).click();
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                System.out.println("⚠️ Find button intercepted, forcing click via JS...");
                ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", driver.findElement(FindBTN));
            }

            // 7. التأكد من ظهور قائمة النتائج
            wait.until(ExpectedConditions.presenceOfElementLocated(PatientList));
            System.out.println("✅ Search completed for Gender: Female");

        } catch (Exception e) {
            System.err.println("❌ Failed in Female Gender search: " + e.getMessage());
            throw e;
        }
    }
}
