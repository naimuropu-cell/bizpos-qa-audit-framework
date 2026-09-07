import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentAccountsPage extends BasePage {
  readonly accountsTable: Locator;
  readonly naimurRow: Locator;
  readonly cashBoxRow: Locator;

  constructor(page: Page) {
    super(page);
    this.accountsTable = page.locator('table#accounts-table, .payment-accounts-list, table:has-text("Account Name")');
    this.naimurRow = page.locator('tr:has-text("NAIMUR")');
    this.cashBoxRow = page.locator('tr:has-text("Cash Box")');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/payment-accounts');
    await this.waitForPageReady();
  }

  async getAccountBalance(accountName: string): Promise<number> {
    const row = this.page.locator(`tr:has-text("${accountName}")`);
    const balanceCell = row.locator('td.balance-column, td:has-text("৳"), td:nth-child(4), td:last-child').first();
    const text = await balanceCell.innerText();
    return this.parseCurrency(text);
  }

  async getNaimurBalance(): Promise<number> {
    return this.getAccountBalance('NAIMUR');
  }

  async getCashBoxBalance(): Promise<number> {
    return this.getAccountBalance('Cash Box');
  }

  async getConsolidatedBalance(): Promise<number> {
    const naimur = await this.getNaimurBalance();
    const cash = await this.getCashBoxBalance();
    return naimur + cash;
  }
}
