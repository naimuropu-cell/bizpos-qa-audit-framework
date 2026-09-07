import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentAccountsPage extends BasePage {
  readonly accountsTable: Locator;
  readonly naimurRow: Locator;
  readonly cashBoxRow: Locator;
  readonly rizviRow: Locator;

  constructor(page: Page) {
    super(page);
    this.accountsTable = page.locator('table#accounts-table, .payment-accounts-list, table:has-text("Account Name")');
    this.naimurRow = page.locator('tr:has-text("NAIMUR")');
    this.cashBoxRow = page.locator('tr:has-text("Cash Box")');
    this.rizviRow = page.locator('tr:has-text("Rizvi Al")');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/payment-accounts');
    await this.waitForPageReady();
  }

  async getAccountBalance(accountName: string): Promise<number> {
    const row = this.page.locator(`tr:has-text("${accountName}")`);
    if (await row.count() > 0) {
      const balanceCell = row.locator('td.balance-column, td:has-text("৳"), td:nth-child(4), td:last-child').first();
      const text = await balanceCell.innerText();
      return this.parseCurrency(text);
    }
    return 0.0;
  }

  async getNaimurBalance(): Promise<number> {
    return this.getAccountBalance('NAIMUR');
  }

  async getCashBoxBalance(): Promise<number> {
    return this.getAccountBalance('Cash Box');
  }

  async getRizviBalance(): Promise<number> {
    return this.getAccountBalance('Rizvi Al');
  }

  /**
   * Sums all active account balances dynamically from the table rows.
   * Supports both 2-account staging sandboxes and 3-account live production.
   */
  async getConsolidatedBalance(): Promise<number> {
    const rows = this.page.locator('tbody tr');
    const count = await rows.count();
    let total = 0;

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const rowText = await row.innerText();
      // Match Taka amounts in the row
      const matches = rowText.match(/৳\s*([\d,]+\.?\d*)/g);
      if (matches && matches.length > 0) {
        const lastAmount = this.parseCurrency(matches[matches.length - 1]);
        total += lastAmount;
      }
    }

    if (total > 0) return total;

    // Fallback direct summation
    const cash = await this.getCashBoxBalance();
    const naimur = await this.getNaimurBalance();
    const rizvi = await this.getRizviBalance();
    return cash + naimur + rizvi;
  }
}
