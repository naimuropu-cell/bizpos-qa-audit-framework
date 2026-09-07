# BizPOS Playwright E2E & Financial Ledger Automation Suite

> **Enterprise Test Automation Suite for BizPOS / YesSME ERP**  
> *Target System:* **BizPOS Multi-Module Core** (`https://sme.yesbangladesh.net`)  
> *Framework:* **Playwright (TypeScript) + Page Object Model (POM)**  
> *Audited Domains:* Closed-Loop Liquidity Parity, General Ledger Sync, and Defect Assertions

---

## 1. Directory Structure

```text
playwright-tests/
├── package.json                         # NPM scripts & Playwright dependencies
├── tsconfig.json                        # TypeScript compiler options & path aliases
├── playwright.config.ts                 # Multi-browser configs, timeouts, reporters
├── fixtures/
│   └── testData.ts                      # Credentials, audited financial baseline & payloads
├── pages/                               # Page Object Model (POM) Layer
│   ├── BasePage.ts                      # Common loaders, navigation & currency parser
│   ├── LoginPage.ts                     # Authentication page objects
│   ├── CashFlowPage.ts                  # Central Cash Flow statement assertions
│   ├── PaymentAccountsPage.ts           # Bank (NAIMUR) & Cash Box balance extraction
│   └── ExpensePage.ts                   # Expense submission & Payments Journal verification
└── tests/                               # E2E Test Specifications
    ├── financial_parity.spec.ts         # Zero-variance parity test (TC-RECON-01)
    ├── bug96_journal_sync.spec.ts       # BUG-96 assertion (Missing Payments Journal voucher)
    └── bug76_rollback_safety.spec.ts   # BUG-76 assertion (Purchase return rollback atomicity)
```

---

## 2. Key Test Specifications

### 2.1 Closed-Loop Financial Parity (`financial_parity.spec.ts`)
* **Objective:** Asserts the closed-loop financial parity invariant:
  $$\sum \text{Cash In } (৳\ 158,500) - \sum \text{Cash Out } (৳\ 156,000) \equiv \text{Net Balance } (+৳\ 2,500) \equiv \text{Account Balances } (৳\ 1,500 + ৳\ 1,000)$$
* **Pass Criterion:** $\Delta_{\text{Variance}} = ৳\ 0.00$.

### 2.2 Payments Journal Sync (`bug96_journal_sync.spec.ts`)
* **Objective:** Submits a ৳ 2,500 operational pantry expense from `Cash Box`, validates that `Cash Box` is debited and Cash Flow is logged, and asserts that a matching double-entry voucher is generated in `Finance -> Payments Journal`.
* **Defect Behavior:** Fails assertion if the Payments Journal lacks the transaction voucher.

### 2.3 Rollback Atomicity Guard (`bug76_rollback_safety.spec.ts`)
* **Objective:** Submits an unstocked purchase return (40 units @ ৳ 1,200 = ৳ 48,000) against an empty inventory PO, validates that the UI halts on `"Out of Stock"`, and asserts that the central Cash Flow statement was NOT prematurely mutated.

---

## 3. Installation & Setup

```bash
# 1. Navigate to the test suite directory:
cd playwright-tests

# 2. Install Playwright and dependencies:
npm install

# 3. Install browser binaries:
npx playwright install chromium firefox
```

---

## 4. Execution Commands

```bash
# Run all E2E test suites headlessly:
npm test

# Run only the Zero-Variance Financial Parity audit:
npm run test:parity

# Run the defect regression suite (BUG-96 & BUG-76):
npm run test:defects

# Run with interactive Playwright UI Mode:
npm run test:ui

# Run in headed browser mode:
npm run test:headed

# View generated HTML report:
npm run test:report
```

---

## 5. Environment Overrides

You can point the automation suite to custom local or staging URLs by setting environment variables:

```bash
# Windows PowerShell:
$env:BASE_URL="https://sme.yesbangladesh.net"
$env:ERP_ADMIN_USER="auditor.qa@bizpos.local"
$env:ERP_ADMIN_PASSWORD="YourSecurePassword"
npm test
```
