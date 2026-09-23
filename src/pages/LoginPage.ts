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
    await this.username.fill('');
    await this.username.pressSequentially(user, { delay: 20 });
    await this.username.dispatchEvent('input');
    await this.username.dispatchEvent('change');
    return this;
  }

  async enterPassword(pass: string) {
    await this.password.waitFor({ state: 'visible', timeout: 5000 });
    await this.password.fill('');
    await this.password.pressSequentially(pass, { delay: 20 });
    await this.password.dispatchEvent('input');
    await this.password.dispatchEvent('change');
    return this;
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible', timeout: 15000 });

    const usernameValue = await this.username.inputValue();
    const passwordLength = (await this.password.inputValue()).length;
    const disabled = await this.loginButton.isDisabled();

    console.log('[LOGIN] username:', usernameValue);
    console.log('[LOGIN] password length:', passwordLength);
    console.log('[LOGIN] button disabled:', disabled);
    console.log('[LOGIN] username outerHTML:', await this.username.evaluate(el => el.outerHTML));
    console.log('[LOGIN] password outerHTML:', await this.password.evaluate(el => el.outerHTML));
    console.log('[LOGIN] button outerHTML:', await this.loginButton.evaluate(el => el.outerHTML));

    if (disabled) {
      await this.password.press('Tab');
      await this.page.waitForTimeout(1000);

      console.log('[LOGIN] button disabled after blur:', await this.loginButton.isDisabled());
    }

    await expect(this.loginButton).toBeEnabled({ timeout: 15000 });
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
