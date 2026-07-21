package PerformanceTest;

import io.qameta.allure.*;
import io.restassured.RestAssured;
import io.restassured.filter.Filter;
import io.restassured.filter.FilterContext;
import io.restassured.response.Response;
import io.restassured.specification.FilterableRequestSpecification;
import io.restassured.specification.FilterableResponseSpecification;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import pages.APILoginPage;
import utils.ApiSpecConfig;

import java.util.concurrent.atomic.AtomicLong;

import static io.restassured.RestAssured.given;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Performance Test")
public class LoginTest {

    private static final long MAX_ALLOWED_RESPONSE_TIME_MS = 1000L;

    @BeforeClass
    public void setupApiConfig() {
        RestAssured.useRelaxedHTTPSValidation();
        RestAssured.baseURI = "http://10.24.13.10";
    }

    @DataProvider(name = "loginRuns")
    public Object[][] loginRuns() {

        Object[][] data = new Object[30][3];

        int index = 0;

        for (int i = 1; i <= 15; i++) {

            data[index++] = new Object[]{
                    "cmob6",
                    "CMO",
                    i
            };

            data[index++] = new Object[]{
                    "Genb6",
                    "Practitioner",
                    i
            };
        }

        return data;
    }

    @Test(
            dataProvider = "loginRuns",
            description = "Verify Login API response time is within SLA threshold (<1000ms)"
    )
    @Severity(SeverityLevel.BLOCKER)
    @Story("API Latency SLA Verification for Medical Staff")
    @Description("Validates that login APIs authenticate successfully and respond within the SLA threshold.")
    public void verifyLoginResponseTimeSla(String username,
                                           String loginType,
                                           int run) {

        Allure.getLifecycle().updateTestCase(testResult ->
                testResult.setName(loginType + " Login Response Time - Run #" + run));

        Allure.parameter("Run", run);
        Allure.parameter("Login Type", loginType);
        Allure.parameter("Username", username);

        System.out.println("========================================");
        System.out.println("🚀 " + loginType + " Login - Run #" + run);
        System.out.println("========================================");

        APILoginPage loginPayload = new APILoginPage(
                ApiSpecConfig.getBaseRequestSpecPass("egy123"),
                "93eg2d",
                "MOHEGY",
                ApiSpecConfig.getBaseRequestSpecUser(username),
                "MDWEB"
        );

        AtomicLong pureServerLatencyMs = new AtomicLong();

        Filter networkLatencyFilter = (
                FilterableRequestSpecification requestSpec,
                FilterableResponseSpecification responseSpec,
                FilterContext ctx) -> {

            long startTime = System.currentTimeMillis();

            Response response = ctx.next(requestSpec, responseSpec);

            long endTime = System.currentTimeMillis();

            pureServerLatencyMs.set(endTime - startTime);

            return response;
        };

        given()
                .spec(ApiSpecConfig.getBaseRequestSpec())
                .filter(networkLatencyFilter)
                .body(loginPayload)
                .when()
                .post("/api/security/commonSignIn")
                .then()
                .statusCode(200);

        long measuredLatencyMs = pureServerLatencyMs.get();

        System.out.println("⏱ Response Time = " + measuredLatencyMs + " ms");

        Allure.addAttachment(
                "Measured Server Latency",
                measuredLatencyMs + " ms"
        );

        Assert.assertTrue(
                measuredLatencyMs <= MAX_ALLOWED_RESPONSE_TIME_MS,
                String.format(
                        "%s Login Run #%d exceeded SLA. Actual: %d ms | Expected <= %d ms",
                        loginType,
                        run,
                        measuredLatencyMs,
                        MAX_ALLOWED_RESPONSE_TIME_MS
                )
        );

        System.out.println("✅ Passed");
    }
}