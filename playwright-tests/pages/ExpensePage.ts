import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExpensePage extends BasePage {
  readonly addExpenseButton: Locator;
  readonly categoryDropdown: Locator;
  readonly accountDropdown: Locator;
  readonly amountInput: Locator;
  readonly noteInput: Locator;
  readonly submitButton: Locator;
  readonly paymentsJournalTable: Locator;

  constructor(page: Page) {
    super(page);
    this.addExpenseButton = page.locator('button:has-text("Add Expense"), a:has-text("Add Expense")');
    this.categoryDropdown = page.locator('select[name="category_id"], #expense_category');
    this.accountDropdown = page.locator('select[name="account_id"], #payment_account');
    this.amountInput = page.locator('input[name="amount"], #expense_amount');
    this.noteInput = page.locator('textarea[name="note"], input[name="note"], #expense_note');
    this.submitButton = page.locator('button[type="submit"]:has-text("Save"), button:has-text("Submit Payment")');
    this.paymentsJournalTable = page.locator('table#payments-journal, .payments-list-table');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/expenses');
    await this.waitForPageReady();
  }

  async createExpense(data: { category: string; account: string; amount: string; reference: string }): Promise<void> {
    await this.addExpenseButton.click();
    await this.categoryDropdown.selectOption({ label: data.category });
    await this.accountDropdown.selectOption({ label: data.account });
    await this.amountInput.fill(data.amount);
    await this.noteInput.fill(data.reference);
    await this.submitButton.click();
    await this.waitForPageReady();
  }

  async navigateToPaymentsJournal(): Promise<void> {
    await this.page.goto('/admin/payments?source=payments');
    await this.waitForPageReady();
  }

  async hasPaymentVoucher(referenceOrNote: string): Promise<boolean> {
    const voucherRow = this.page.locator(`tr:has-text("${referenceOrNote}")`);
    return (await voucherRow.count()) > 0;
  }
}
