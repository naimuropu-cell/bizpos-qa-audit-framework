/**
 * Test Data Constants & Financial Fixtures for BizPOS ERP
 */
export const TEST_CREDENTIALS = {
  adminUser: process.env.ERP_ADMIN_USER || 'auditor.qa@bizpos.local',
  adminPassword: process.env.ERP_ADMIN_PASSWORD || 'AuditParity@2026',
};

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

export const DEFECT_BUG96_DATA = {
  category: 'Office Refreshments & Pantry Supplies',
  account: 'Cash Box',
  amount: '2500.00',
  reference: 'Monthly tea, coffee, and pantry supplies (BUG-96 Verification)',
  expectedVoucherType: 'Payment Voucher',
};

export const DEFECT_BUG76_DATA = {
  purchaseOrderRef: 'PO-2026-0819',
  productName: 'Packaging Carton Box (Grade A)',
  returnQuantity: '40',
  unitRefundPrice: '1200.00',
  totalRefundAmount: 48000.00,
  expectedErrorMessage: 'Out of Stock',
};
