import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for BizPOS Financial Reports Suite:
 * - Profit & Loss Statement (/admin/reports/profit-loss)
 * - Supplier Payments Report (/admin/reports/supplier-payments)
 * - Sales Report (/admin/reports/sales)
 * - Cash Movement Report (/admin/reports/cash-movement)
 * - Monthly Summary (/admin/reports/monthly-summary)
 */
export class ReportsPage extends BasePage {
  // Profit & Loss Locators
  readonly plRevenueCard: Locator;
  readonly plCogsCard: Locator;
  readonly plGrossProfitCard: Locator;
  readonly plOperatingExpensesCard: Locator;
  readonly plNetProfitCard: Locator;
  readonly plNetMarginCard: Locator;

  // Supplier Payments Locators
  readonly spTable: Locator;
  readonly spGrandTotalRow: Locator;

  // Sales Report Locators
  readonly salesTable: Locator;
  readonly salesTotalSalesCard: Locator;
  readonly salesTotalCollectedCard: Locator;
  readonly salesTotalDueCard: Locator;

  // Cash Movement Locators
  readonly cmNetBadge: Locator;
  readonly cmTables: Locator;

  constructor(page: Page) {
    super(page);

    // P&L
    this.plRevenueCard = page.locator(':text("Total Sales") + *, [data-testid="pl-sales"], .profit-loss-sales');
    this.plCogsCard = page.locator(':text("Cost of Goods Sold") + *, [data-testid="pl-cogs"], .profit-loss-cogs');
    this.plGrossProfitCard = page.locator(':text("Gross Profit") + *, [data-testid="pl-gross-profit"]');
    this.plOperatingExpensesCard = page.locator(':text("Operating Expenses") + *, :text("Total Expenses") + *, [data-testid="pl-expenses"]');
    this.plNetProfitCard = page.locator(':text("Net Profit") + *, [data-testid="pl-net-profit"]');
    this.plNetMarginCard = page.locator(':text("Net Margin") + *, [data-testid="pl-margin"]');

    // Supplier Payments
    this.spTable = page.locator('table:has-text("Supplier"), table#supplier-payments');
    this.spGrandTotalRow = page.locator('tr:has-text("Grand Total"), tr:has-text("Total"), tfoot tr');

    // Sales Report
    this.salesTable = page.locator('table:has-text("Total Sales"), table#sales-report');
    this.salesTotalSalesCard = page.locator(':text("Total Sales") + *, th:has-text("Total Sales")');
    this.salesTotalCollectedCard = page.locator(':text("Total Collected") + *, th:has-text("Total Collected")');
    this.salesTotalDueCard = page.locator(':text("Total Due") + *, th:has-text("Total Due")');

    // Cash Movement
    this.cmNetBadge = page.locator('.badge:has-text("Deficit"), .badge:has-text("Surplus"), :text("Net Cash Movement") + *');
    this.cmTables = page.locator('table');
  }

  // --- Navigation Methods ---
  async gotoProfitLoss(from?: string, to?: string): Promise<void> {
    const url = from && to 
      ? `/admin/reports/profit-loss?from_date=${from}&to_date=${to}` 
      : '/admin/reports/profit-loss';
    await this.page.goto(url);
    await this.waitForPageReady();
  }

  async gotoSupplierPayments(from?: string, to?: string): Promise<void> {
    const url = from && to 
      ? `/admin/reports/supplier-payments?from_date=${from}&to_date=${to}` 
      : '/admin/reports/supplier-payments';
    await this.page.goto(url);
    await this.waitForPageReady();
  }

  async gotoSalesReport(from?: string, to?: string): Promise<void> {
    const url = from && to 
      ? `/admin/reports/sales?from_date=${from}&to_date=${to}` 
      : '/admin/reports/sales';
    await this.page.goto(url);
    await this.waitForPageReady();
  }

  async gotoCashMovement(): Promise<void> {
    await this.page.goto('/admin/reports/cash-movement');
    await this.waitForPageReady();
  }

  // --- Profit & Loss Helpers ---
  async getPLOperatingExpenses(): Promise<number> {
    if (await this.plOperatingExpensesCard.count() > 0) {
      const text = await this.plOperatingExpensesCard.first().innerText();
      return this.parseCurrency(text);
    }
    // Fallback search inside table body for Operating Expenses row
    const row = this.page.locator('tr:has-text("Operating Expenses"), tr:has-text("Expenses")');
    if (await row.count() > 0) {
      const text = await row.first().locator('td:last-child, td:nth-child(2)').innerText();
      return this.parseCurrency(text);
    }
    return 0.0;
  }

  async getPLNetProfit(): Promise<number> {
    if (await this.plNetProfitCard.count() > 0) {
      const text = await this.plNetProfitCard.first().innerText();
      return this.parseCurrency(text);
    }
    const row = this.page.locator('tr:has-text("Net Profit")');
    if (await row.count() > 0) {
      const text = await row.first().locator('td:last-child, td:nth-child(2)').innerText();
      return this.parseCurrency(text);
    }
    return 0.0;
  }

  async getPLGrossProfit(): Promise<number> {
    if (await this.plGrossProfitCard.count() > 0) {
      const text = await this.plGrossProfitCard.first().innerText();
      return this.parseCurrency(text);
    }
    const row = this.page.locator('tr:has-text("Gross Profit")');
    if (await row.count() > 0) {
      const text = await row.first().locator('td:last-child, td:nth-child(2)').innerText();
      return this.parseCurrency(text);
    }
    return 0.0;
  }

  // --- Supplier Payments Helpers ---
  async getSupplierPaymentsTotals(): Promise<{ totalPurchases: number; allTimePaid: number; periodPaid: number }> {
    const totalRow = this.spGrandTotalRow.first();
    if (await totalRow.count() > 0) {
      const cells = totalRow.locator('td, th');
      const count = await cells.count();
      const texts: string[] = [];
      for (let i = 0; i < count; i++) {
        texts.push(await cells.nth(i).innerText());
      }

      // Locate parsed numbers from cells
      const numbers = texts.map(t => this.parseCurrency(t)).filter(n => n > 0);
      return {
        totalPurchases: numbers[0] || 0,
        allTimePaid: numbers[1] || 0,
        periodPaid: numbers[2] || numbers[numbers.length - 1] || 0,
      };
    }
    return { totalPurchases: 0, allTimePaid: 0, periodPaid: 0 };
  }

  // --- Sales Report Helpers ---
  async getSalesReportFigures(): Promise<{ totalSales: number; totalCollected: number; totalDue: number }> {
    const bodyText = await this.page.locator('body').innerText();
    
    // Extract figures via table cells or summary text
    let totalSales = 0;
    let totalCollected = 0;
    let totalDue = 0;

    const salesMatch = bodyText.match(/Total Sales[\s\S]*?৳?\s*([\d,]+\.?\d*)/i);
    const collMatch = bodyText.match(/Total Collected[\s\S]*?৳?\s*([\d,]+\.?\d*)/i);
    const dueMatch = bodyText.match(/Total Due[\s\S]*?৳?\s*([\d,]+\.?\d*)/i);

    if (salesMatch) totalSales = this.parseCurrency(salesMatch[1]);
    if (collMatch) totalCollected = this.parseCurrency(collMatch[1]);
    if (dueMatch) totalDue = this.parseCurrency(dueMatch[1]);

    return { totalSales, totalCollected, totalDue };
  }

  // --- Cash Movement Helpers ---
  async getVisibleRawEnums(): Promise<string[]> {
    const text = await this.page.locator('body').innerText();
    const rawEnums = ['sale_return_refund', 'advance_payment', 'advance_return', 'purchase_payment'];
    const found: string[] = [];
    for (const enumVal of rawEnums) {
      if (text.includes(enumVal)) {
        found.push(enumVal);
      }
    }
    return found;
  }
}
