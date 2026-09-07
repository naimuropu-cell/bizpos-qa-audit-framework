import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly userAvatar: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#loginEmail, input[name="email"]');
    this.passwordInput = page.locator('#loginPassword, input[name="password"]');
    this.submitButton = page.locator('#loginBtn, button[type="submit"]');
    this.userAvatar = page.locator('.user-profile, [data-testid="user-menu"], .avatar');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/login');
    await this.waitForPageReady();
  }

  async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
    await this.waitForPageReady();
  }
}
