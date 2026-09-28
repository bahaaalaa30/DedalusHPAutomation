import { test, expect } from '@playwright/test';
import { apiBaseUrl, apiHeaders } from '../../api/apiConfig';
import { buildLoginPayload } from '../../api/loginPayload';

const MAX_ALLOWED_RESPONSE_TIME_MS = Number(
  process.env.LOGIN_API_SLA_MS ?? 1000
);

const runs = Array.from({ length: 15 }, (_, i) => i + 1);

const cases = runs.flatMap((run) => [
  {
    username: process.env.CMO_USERNAME ?? 'cmob6',
    loginType: 'CMO',
    run
  },
  {
    username: process.env.PRACTITIONER_USERNAME ?? 'Genb6',
    loginType: 'Practitioner',
    run
  }
]);

test.describe('Login API performance', () => {
  for (const item of cases) {
    test(
      `${item.loginType} Login Response Time - Run #${item.run}`,
      async ({ request }) => {
        test.info().annotations.push(
          { type: 'epic', description: 'Hospital Management System - Dedalus HealthPlug' },
          { type: 'feature', description: 'Performance Test' },
          { type: 'story', description: 'API Latency SLA Verification for Medical Staff' }
        );

        const payload = buildLoginPayload(item.username);
        const started = Date.now();

        const response = await request.post(
          `${apiBaseUrl()}/api/security/commonSignIn`,
          {
            headers: apiHeaders(),
            data: payload
          }
        );

        const measuredLatencyMs = Date.now() - started;

        expect(
          response.status(),
          `${item.loginType} login should return HTTP 200`
        ).toBe(200);

        await test.info().attach('Measured Server Latency', {
          body: `${measuredLatencyMs} ms`,
          contentType: 'text/plain'
        });

        expect(
          measuredLatencyMs,
          `${item.loginType} Login Run #${item.run} exceeded SLA. Actual: ${measuredLatencyMs} ms | Expected <= ${MAX_ALLOWED_RESPONSE_TIME_MS} ms`
        ).toBeLessThanOrEqual(MAX_ALLOWED_RESPONSE_TIME_MS);
      }
    );
  }
});
