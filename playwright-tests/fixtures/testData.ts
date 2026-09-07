/**
 * Test Data Constants & Financial Fixtures for BizPOS ERP
 * Supports both Local/Staging Sandboxes and Live Production Audit Validation.
 */
export const TEST_CREDENTIALS = {
  adminUser: process.env.ERP_ADMIN_USER || 'admin@gmail.com',
  adminPassword: process.env.ERP_ADMIN_PASSWORD || '1234',
};

/**
 * Baseline 1: Local / Staging Mock Environment Baseline (TC-01..TC-23)
 */
export const AUDITED_FINANCIAL_BASELINE = {
  totalCashIn: 158500.00,
  totalCashOut: 156000.00,
  netOperationalBalance: 2500.00,
  accounts: {
    naimurBank: {
      accountName: 'NAIMUR',
      bankName: 'United Commercial Bank (UCB)',
      expectedBalance: 1500.00,
    },
    cashBox: {
      accountName: 'Cash Box',
      type: 'Cash Drawer Float',
      expectedBalance: 1000.00,
    },
  },
  varianceThreshold: 0.00,
};

/**
 * Baseline 2: Live Production System Audit Baseline (TC-01..TC-26)
 * As verified on https://sme.yesbangladesh.net (Parity: Phi = 0.00)
 */
export const LIVE_PRODUCTION_BASELINE = {
  totalCashIn: 369500.00,
  totalCashOut: 315400.00,
  netOperationalBalance: 54100.00,
  accounts: {
    cashBox: {
      accountName: 'Cash Box',
      type: 'Cash Drawer Float',
      expectedBalance: 49600.00,
    },
    rizviBank: {
      accountName: 'Rizvi Al',
      bankName: 'Eastern Bank Limited (EBL)',
      expectedBalance: 3000.00,
    },
    naimurBank: {
      accountName: 'NAIMUR',
      bankName: 'United Commercial Bank (UCB)',
      expectedBalance: 1500.00,
    },
  },
  consolidatedAccountBalance: 54100.00,
  varianceThreshold: 0.00,
};

/**
 * BUG-96: Payments Journal Disconnect Fixture
 */
export const DEFECT_BUG96_DATA = {
  category: 'Office Refreshments & Pantry Supplies',
  account: 'Cash Box',
  amount: '2500.00',
  reference: 'Monthly tea, coffee, and pantry supplies (BUG-96 Verification)',
  expectedVoucherType: 'Payment Voucher',
};

/**
 * BUG-76: Purchase Return Rollback Atomicity Fixture
 */
export const DEFECT_BUG76_DATA = {
  purchaseOrderRef: 'PO-2026-0819',
  productName: 'Packaging Carton Box (Grade A)',
  returnQuantity: '40',
  unitRefundPrice: '1200.00',
  totalRefundAmount: 48000.00,
  expectedErrorMessage: 'Out of Stock',
};

/**
 * BUG-114: Profit & Loss Statement Omission of Operating Expenses
 */
export const DEFECT_BUG114_DATA = {
  verifiedPaidExpenses: 6300.00,
  grossProfit: 30600.00,
  reportedBugExpenses: 0.00,
  reportedInflatedNetProfit: 30600.00,
  expectedTrueNetProfit: 24300.00,
  expectedNetMargin: 16.09,
};

/**
 * BUG-109: Supplier Payments Invariant Violation Fixture
 */
export const DEFECT_BUG109_DATA = {
  totalPurchaseBills: 183000.00,
  reportedTotalPurchase: 178000.00,
  reportedAllTimePaid: 178100.00,
  reportedPeriodPaid: 193100.00,
  paradoxDifference: 15000.00,
};

/**
 * BUG-118: Sales Report Return Deduction Paradox Fixture
 */
export const DEFECT_BUG118_DATA = {
  grossSales: 151000.00,
  totalCollected: 136000.00,
  totalDue: 15000.00,
  saleReturns: 25500.00,
  reportedTotalSales: 125500.00,
  apparentDeficitVsCash: 10500.00,
};

/**
 * BUG-111 & BUG-107: Cash Movement False Deficit & Unformatted Database Enums
 */
export const DEFECT_BUG111_DATA = {
  reportedDeficit: -18600.00,
  trueSolventBalance: 54100.00,
  rawSnakeCaseEnums: ['sale_return_refund', 'advance_payment', 'purchase_payment'],
};
