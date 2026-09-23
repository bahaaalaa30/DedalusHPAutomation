import { test as base, expect } from '@playwright/test';
import { config } from '../config/config';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
});

export { expect, config };
