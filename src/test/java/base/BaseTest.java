package base;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import utils.ConfigReader;
import utils.EmailUtils;

public class BaseTest {
    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    public WebDriver getDriver() {
        return driver.get();
    }

    @BeforeMethod
    public void setup() {
        ConfigReader.loadConfig();
        String browser = ConfigReader.getProperty("browser");
        String url = ConfigReader.getProperty("url");

        if (browser.equalsIgnoreCase("chrome")) {
            WebDriverManager.chromedriver().setup();
            driver.set(new ChromeDriver());
        } else if (browser.equalsIgnoreCase("firefox")) {
            WebDriverManager.firefoxdriver().setup();
            driver.set(new FirefoxDriver());
        }
        getDriver().manage().window().maximize();

        if (url != null) {
            getDriver().get(url);
        } else {
            System.out.println("⚠️ URL is missing in config.properties!");
        }
    }
    @AfterMethod
    public void teardown() {
        if (getDriver() != null) {
            getDriver().quit();
            driver.remove();
            System.out.println("✅ Browser closed and ThreadLocal reference removed.");
        }
    }
    @AfterSuite
    public void tearDownSuite() {
        String summary = "The automation run has finished. Please check the attached link for detailed results.";
        System.out.println("Sending Email Report...");
        EmailUtils.sendEmailReport(summary);
    }
}