import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly inlineError: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('#user-id');
    this.password = page.locator('#his-password');
    this.loginButton = page.locator("//div[@id='common-login']//button");
    this.inlineError = page.locator("//*[contains(text(), 'Unauthorized use of this system')]");
  }

  async enterUsername(user: string) {
    await this.username.waitFor({ state: 'visible', timeout: 5000 });
    await this.username.fill(user);
    return this;
  }

  async enterPassword(pass: string) {
    await this.password.waitFor({ state: 'visible', timeout: 5000 });
    await this.password.fill(pass);
    return this;
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.loginButton.click();
  }

  async login(user: string, pass: string) {
    await this.enterUsername(user);
    await this.enterPassword(pass);
    await this.clickLogin();
  }

  async getErrorMessage() {
    await this.inlineError.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.inlineError.innerText()).trim();
  }

  async expectClinicalDiary() {
    await expect(this.page).toHaveURL(/clinicaldiary/, { timeout: 5000 });
  }
}
