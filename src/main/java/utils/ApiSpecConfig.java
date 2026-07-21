package utils;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;


/**
 * Centralized RestAssured Configuration Builder for Dedalus Automation HP Framework.
 * Manages request headers, base URIs, SSL bypass, and reusable specifications.
 */
public class ApiSpecConfig {

    private static final String BASE_URL = "http://10.24.13.10";

    /**
     * Generates a base RequestSpecification pre-configured with default headers,
     * base URI, and relaxed HTTPS validation (equivalent to curl --insecure).
     *
     * @return RequestSpecification
     */
    public static RequestSpecification getBaseRequestSpec() {
        return new RequestSpecBuilder()
                .setBaseUri(BASE_URL)
                .setContentType(ContentType.JSON)
                .addHeader("Accept", "application/json, text/plain, */*")
                .addHeader("Accept-Language", "en-US,en;q=0.9,ar-AE;q=0.8,ar;q=0.7")
                .addHeader("Authorization", "Bearer null")
                .addHeader("Origin", BASE_URL)
                .addHeader("Referer", BASE_URL + "/healthplug/")
                .addHeader("hpApp-Token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRpdHlJZCI6Ik1PSEVHWSIsImlhdCI6MTU2MjM5NzA0NSwiYXVkIjoiSGVhbHRocGx1ZyBBcHBzIiwiaXNzIjoiSGVhbHRocGx1ZyBzZXJ2ZXIiLCJzdWIiOiJIZWFsdGhwbHVnIEFwcHMgdG9rZW4iLCJqdGkiOiJvZXI0NDVqZGxkc2tqZmgzOG9oZCJ9.I3KqgIdSvn0UTa7ZSm0rDdzNakLS8l5tWjjw4IJKsZY")
                .setRelaxedHTTPSValidation() // Replaces --insecure
                .build();
    }

    public static ResponseSpecification getSuccessResponseSpec() {
        return new ResponseSpecBuilder()
                .expectStatusCode(200)
                .expectContentType(ContentType.JSON)
                .build();
    }

    public static String getBaseRequestSpecPass(String password) {

        return password;
    }
    public static String getBaseRequestSpecUser(String username) {

        return username;
    }
    public static String getBaseRequestSpecURL(String url) {
        return url;
    }
}
