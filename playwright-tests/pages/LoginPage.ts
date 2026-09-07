import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly userAvatar: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], input[name="email"], #email');
    this.passwordInput = page.locator('input[type="password"], input[name="password"], #password');
    this.submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Login")');
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
