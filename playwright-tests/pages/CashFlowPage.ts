import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CashFlowPage extends BasePage {
  readonly cashInCard: Locator;
  readonly cashOutCard: Locator;
  readonly netBalanceCard: Locator;
  readonly purchaseReturnRow: Locator;

  constructor(page: Page) {
    super(page);
    this.cashInCard = page.locator('[data-testid="total-cash-in"], .cash-in-total, :text("Cash In") + *');
    this.cashOutCard = page.locator('[data-testid="total-cash-out"], .cash-out-total, :text("Cash Out") + *');
    this.netBalanceCard = page.locator('[data-testid="net-balance"], .net-balance-total, :text("Net Balance") + *');
    this.purchaseReturnRow = page.locator('tr:has-text("Purchase Return") td:last-child');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/money/cashflow');
    await this.waitForPageReady();
  }

  async getCashInTotal(): Promise<number> {
    const text = await this.cashInCard.first().innerText();
    return this.parseCurrency(text);
  }

  async getCashOutTotal(): Promise<number> {
    const text = await this.cashOutCard.first().innerText();
    return this.parseCurrency(text);
  }

  async getNetBalance(): Promise<number> {
    const text = await this.netBalanceCard.first().innerText();
    return this.parseCurrency(text);
  }

  async getPurchaseReturnInflow(): Promise<number> {
    if (await this.purchaseReturnRow.count() > 0) {
      const text = await this.purchaseReturnRow.first().innerText();
      return this.parseCurrency(text);
    }
    return 0.0;
  }
}
