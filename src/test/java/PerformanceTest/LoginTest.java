
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
import org.testng.annotations.Test;
import pages.APILoginPage;
import utils.ApiSpecConfig;

import java.util.concurrent.atomic.AtomicLong;

import static io.restassured.RestAssured.given;

@Epic("Hospital Management System - Dedalus HealthPlug")
@Feature("Performance Test")
public class LoginTest  {
    private static final long MAX_ALLOWED_RESPONSE_TIME_MS = 1000L;
    @BeforeClass
    public void setupApiConfig() {
        RestAssured.useRelaxedHTTPSValidation();
        RestAssured.baseURI =  "http://10.24.13.10";
    }

    @Test(priority = 0, description = "Verify CMO API login response time is within SLA threshold (< 1000ms)")
    @Severity(SeverityLevel.BLOCKER)
    @Story("API Latency SLA Verification for Medical Staff")
    @Description("Validates that the CMO API login endpoint authenticates credentials and responds within 1000ms.")
    public void verifyCMOLoginResponseTimeSla() {
        System.out.println("🚀 Started: CMO API login Performance Test");

        APILoginPage loginPayload = new APILoginPage(
                ApiSpecConfig.getBaseRequestSpecPass("egy123"), // password
                "93eg2d",                             // deviceUuid
                "MOHEGY",                             // entityId
                ApiSpecConfig.getBaseRequestSpecUser("cmob6"), // userid
                "MDWEB"                               // source
        );

        // 2. Thread-safe container to store net network transmission latency
        AtomicLong pureServerLatencyMs = new AtomicLong();

        // 3. Custom Network Latency Filter to capture pure HTTP execution time
        Filter networkLatencyFilter = (FilterableRequestSpecification requestSpec,
                                       FilterableResponseSpecification responseSpec,
                                       FilterContext ctx) -> {
            long startTime = System.currentTimeMillis();
            Response res = ctx.next(requestSpec, responseSpec); // Execute HTTP execution window
            long endTime = System.currentTimeMillis();
            pureServerLatencyMs.set(endTime - startTime);
            return res;
        };

        // 4. Execute Request with Centralized Spec and Latency Filter
        given()
                .spec(ApiSpecConfig.getBaseRequestSpec()) // Centralized Headers, BaseURI & SSL configuration
                .filter(networkLatencyFilter)            // ✅ Attached Network Latency Filter
                .body(loginPayload)
                .when()
                .post("/api/security/commonSignIn")
                .then()
                .statusCode(200);                        // Validates HTTP 200 OK

        // 5. Extract Net Latency Metric
        long measuredLatencyMs = pureServerLatencyMs.get();
        System.out.println("⏱️ Pure Server Response Time: " + measuredLatencyMs + " ms");

        // 6. Allure Reporting & Log Attachment
        Allure.addAttachment("Measured Server Latency", measuredLatencyMs + " ms");

        // 7. Strict SLA Assertion (< 300ms)
        Assert.assertTrue(
                measuredLatencyMs <= MAX_ALLOWED_RESPONSE_TIME_MS,
                String.format("❌ SLA Violation! Login API server time took %d ms, exceeding limit of %d ms.",
                        measuredLatencyMs, MAX_ALLOWED_RESPONSE_TIME_MS)
        );

        System.out.println("✅ Finished:  CMO API login SLA test passed successfully.");
    }
    @Test(priority = 1, description = "Verify Login Practitioner API response time is within SLA threshold (< 1000ms)")
    @Severity(SeverityLevel.BLOCKER)
    @Story("API Latency SLA Verification for Medical Staff")
    @Description("Validates that the Practitioner API endpoint authenticates credentials and responds within 1000ms.")
    public void verifyPractitionerLoginResponseTimeSla() {
        System.out.println("🚀 Started: Practitioner API Performance Test");

        APILoginPage loginPayload = new APILoginPage(
                ApiSpecConfig.getBaseRequestSpecPass("egy123"), // password
                "93eg2d",                             // deviceUuid
                "MOHEGY",                             // entityId
                ApiSpecConfig.getBaseRequestSpecUser("Genb6"), // userid
                "MDWEB"                               // source
        );

        // 2. Thread-safe container to store net network transmission latency
        AtomicLong pureServerLatencyMs = new AtomicLong();

        // 3. Custom Network Latency Filter to capture pure HTTP execution time
        Filter networkLatencyFilter = (FilterableRequestSpecification requestSpec,
                                       FilterableResponseSpecification responseSpec,
                                       FilterContext ctx) -> {
            long startTime = System.currentTimeMillis();
            Response res = ctx.next(requestSpec, responseSpec); // Execute HTTP execution window
            long endTime = System.currentTimeMillis();
            pureServerLatencyMs.set(endTime - startTime);
            return res;
        };

        // 4. Execute Request with Centralized Spec and Latency Filter
        given()
                .spec(ApiSpecConfig.getBaseRequestSpec()) // Centralized Headers, BaseURI & SSL configuration
                .filter(networkLatencyFilter)            // ✅ Attached Network Latency Filter
                .body(loginPayload)
                .when()
                .post("/api/security/commonSignIn")
                .then()
                .statusCode(200);                        // Validates HTTP 200 OK

        // 5. Extract Net Latency Metric
        long measuredLatencyMs = pureServerLatencyMs.get();
        System.out.println("⏱️ Pure Server Response Time: " + measuredLatencyMs + " ms");

        // 6. Allure Reporting & Log Attachment
        Allure.addAttachment("Measured Server Latency", measuredLatencyMs + " ms");

        // 7. Strict SLA Assertion (< 300ms)
        Assert.assertTrue(
                measuredLatencyMs <= MAX_ALLOWED_RESPONSE_TIME_MS,
                String.format("❌ SLA Violation! Login API server time took %d ms, exceeding limit of %d ms.",
                        measuredLatencyMs, MAX_ALLOWED_RESPONSE_TIME_MS)
        );

        System.out.println("✅ Finished: Practitioner Login API SLA test passed successfully.");
    }



}