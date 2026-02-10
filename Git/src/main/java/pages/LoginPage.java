package pages;

import io.qameta.allure.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;
    private final By usernameField = By.id("user-id");
    private final By passwordField = By.id("his-password");
    private final By loginButton = By.xpath("//div[@id='common-login']//button");
    private final By inlineErrorMessage = By.xpath("//*[contains(text(), 'Unauthorized use of this system')]");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    }

    @Step("Entering username: {0}")
    public LoginPage enterUsername(String user) {
        System.out.println("✍️ Entering username: [" + user + "]");
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField)).sendKeys(user);
        return this;
    }

    @Step("Entering password")
    public LoginPage enterPassword(String pass) {
        System.out.println("✍️ Entering password...");
        wait.until(ExpectedConditions.visibilityOfElementLocated(passwordField)).sendKeys(pass);
        return this;
    }

    @Step("Clicking Login button")
    public void clickLogin() {
        System.out.println("🖱️ Clicking Login button...");
        WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        try    {
            btn.click();
        } catch (Exception e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", btn);
        }
    }

    public String getErrorMessage() {
        System.out.println("⏳ Waiting for the security warning message to appear...");
        WebElement errorElem = wait.until(ExpectedConditions.visibilityOfElementLocated(inlineErrorMessage));
        String msg = errorElem.getText().trim();
        System.out.println("🔍 Error message found: [" + msg + "]");
        return msg;
    }

    public void login(String cmob6, String egy123) {
    }
}