import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object containing common navigation, loader wait, and financial parsing utilities.
 */
export class BasePage {
  readonly page: Page;
  readonly globalLoader: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globalLoader = page.locator('.preloader, .spinner-border, [data-testid="loading-spinner"]');
    this.toastMessage = page.locator('.toast, .alert, .swal2-popup, [role="alert"]');
  }

  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    if (await this.globalLoader.isVisible()) {
      await this.globalLoader.waitFor({ state: 'hidden', timeout: 10000 });
    }
  }

  /**
   * Utility to parse Bangladeshi Taka currency strings (e.g. '৳ 158,500.00' or '158500') into numbers
   */
  parseCurrency(rawText: string): number {
    const cleaned = rawText
      .replace(/[৳,$,\s]/g, '')
      .replace(/BDT/gi, '')
      .trim();
    const value = parseFloat(cleaned);
    return isNaN(value) ? 0.0 : value;
  }
}
