# Dedalus HealthPlug Playwright / TypeScript

This branch is the completed migration of the active Selenium Java + TestNG automation suite to Playwright + TypeScript.

## Migrated coverage
- CMO login: valid and invalid credentials
- CMO visit booking and visit creation
- Visit cancellation
- Appointment cancellation
- Arabic language switch
- Patient search by ID, name, national ID, male/female gender
- Billing and payment flows
- Practitioner login
- Practitioner patient-count validation
- El Nasr doctor login
- Predetermination lab order creation
- Eligible and non-eligible eligibility checks
- Eligibility queue approval validation
- Login API performance: 15 CMO + 15 Practitioner runs with 1000 ms default SLA

## Run
npm install
npx playwright install
npm run typecheck
npm test

## Credentials
Passwords and API secrets are intentionally not stored in TypeScript source.

UI variables:
HP_USERNAME
HP_PASSWORD
GEN_PASS
CMO_PASSWORD
ELNASR_PASSWORD

Optional URL overrides:
BASE_URL
VISIT_BOOKING_URL
GP_URL
PAYER_URL
PAYER_VISIT_BOOKING_URL

API/performance variables:
API_BASE_URL
API_PASSWORD
API_DEVICE_UUID
API_ENTITY_ID
API_SOURCE
HP_APP_TOKEN
CMO_USERNAME
PRACTITIONER_USERNAME
LOGIN_API_SLA_MS

## Test data
The BMS and NonValidBMS CSV datasets used by the Java suite were moved to src/test-data/.

The old Maven/TestNG Java implementation was removed from this migration branch. The original develop branch remains unchanged.
