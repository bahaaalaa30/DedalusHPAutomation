import { Page } from '@playwright/test';

export class LoginPage {
  private readonly username;
  private readonly password;
  private readonly loginButton;
  private readonly inlineError;

  constructor(private readonly page: Page) {
    this.username = page.locator('#user-id');
    this.password = page.locator('#his-password');
    this.loginButton = page.locator('#common-login button');
    this.inlineError = page.getByText('Unauthorized use of this system');
  }

  async enterUsername(user: string) {
    await this.username.fill(user);
    return this;
  }

  async enterPassword(pass: string) {
    await this.password.fill(pass);
    return this;
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(user: string, pass: string) {
    await this.enterUsername(user);
    await this.enterPassword(pass);
    await this.clickLogin();
  }

  async getErrorMessage() {
    await this.inlineError.waitFor({ state: 'visible' });
    return (await this.inlineError.innerText()).trim();
  }
}
