# Dedalus HealthPlug Playwright migration

This branch migrates the Selenium/TestNG automation suite to Playwright/TypeScript.

## Mapping
- Selenium WebDriver -> Playwright Page
- TestNG -> Playwright Test
- Java Page Objects -> TypeScript Page Objects
- WebDriverWait -> Playwright locator auto-waiting
- TestNG assertions -> Playwright expect
- RestAssured -> Playwright APIRequestContext
- Maven -> npm
- Allure TestNG -> allure-playwright

## Run
npm install
npx playwright install
npm test

## API performance configuration
Set these environment variables:
- API_BASE_URL
- API_PASSWORD
- API_DEVICE_UUID
- API_ENTITY_ID (default: MOHEGY)
- API_SOURCE (default: MDWEB)
- HP_APP_TOKEN if required
- CMO_USERNAME (default: cmob6)
- PRACTITIONER_USERNAME (default: Genb6)
- LOGIN_API_SLA_MS (default: 1000)

No API token or password is stored in the TypeScript source.
