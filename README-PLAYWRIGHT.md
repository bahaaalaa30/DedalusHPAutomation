# Dedalus HealthPlug Playwright migration

This branch is the TypeScript/Playwright migration of the Selenium/TestNG suite.

Mapping:
- Selenium WebDriver -> Playwright Page
- TestNG -> Playwright Test
- Java Page Objects -> TypeScript Page Objects
- WebDriverWait -> Playwright locator auto-waiting
- Maven -> npm
- Allure TestNG -> allure-playwright

No credentials are stored in the new TypeScript config. Supply URLs and credentials with environment variables.

Run: npm install && npx playwright install && npm test
