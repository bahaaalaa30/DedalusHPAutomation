import { test, expect } from '@playwright/test';
import { apiBaseUrl, apiHeaders } from '../../api/apiConfig';
import { buildLoginPayload } from '../../api/loginPayload';

const SLA_MS = Number(process.env.LOGIN_API_SLA_MS ?? 1000);
const runs = Array.from({ length: 15 }, (_, i) => i + 1);

const cases = runs.flatMap((run) => [
  {
    username: process.env.CMO_USERNAME ?? 'cmob6',
    loginType: 'CMO',
    run,
  },
  {
    username: process.env.PRACTITIONER_USERNAME ?? 'Genb6',
    loginType: 'Practitioner',
    run,
  },
]);

test.describe('Login API performance', () => {
  for (const item of cases) {
    test(
      `${item.loginType} Login Response Time - Run #${item.run}`,
      async ({ request }) => {
        const started = Date.now();

        const response = await request.post(
          apiBaseUrl() + '/api/security/commonSignIn',
          {
            headers: apiHeaders(),
            data: buildLoginPayload(item.username),
          }
        );

        const latencyMs = Date.now() - started;

        expect(
          response.status(),
          `${item.loginType} login should return HTTP 200`
        ).toBe(200);

        expect(
          latencyMs,
          `${item.loginType} run #${item.run} exceeded ${SLA_MS} ms SLA`
        ).toBeLessThanOrEqual(SLA_MS);
      }
    );
  }
});
