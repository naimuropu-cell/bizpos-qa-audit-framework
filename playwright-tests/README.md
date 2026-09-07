# BizPOS Playwright E2E & Financial Ledger Automation Suite

> **Enterprise Test Automation Suite for BizPOS / YesSME ERP**  
> *Target System:* **BizPOS Multi-Module Core** (`https://sme.yesbangladesh.net`)  
> *Framework:* **Playwright (TypeScript) + Page Object Model (POM)**  
> *Audited Domains:* Closed-Loop Liquidity Parity, Cross-Report Consistency, Sub-Ledger Sync, and Defect Assertions  
> *Author:* QA Lead & Financial Systems Architect

---

## 1. Directory Structure

```text
playwright-tests/
├── package.json                         # NPM scripts & Playwright dependencies
├── tsconfig.json                        # TypeScript compiler options & path aliases
├── playwright.config.ts                 # Multi-browser configs, timeouts, reporters
├── fixtures/
│   └── testData.ts                      # Multi-environment baselines (Live vs Staging) & defect fixtures
├── pages/                               # Page Object Model (POM) Layer
│   ├── BasePage.ts                      # Common loaders, navigation & currency parser
│   ├── LoginPage.ts                     # Authentication page objects
│   ├── CashFlowPage.ts                  # Central Cash Flow statement assertions
│   ├── PaymentAccountsPage.ts           # Dynamic multi-account balance extraction
│   ├── ExpensePage.ts                   # Expense submission & Payments Journal verification
│   └── ReportsPage.ts                   # Financial reports suite (P&L, Supplier, Sales, Cash Movement)
└── tests/                               # E2E Test Specifications
    ├── financial_parity.spec.ts         # Zero-variance parity test (TC-RECON-01 / TC-01..TC-23)
    ├── reports_audit.spec.ts            # Financial reports integrity (TC-24, TC-25, TC-26 / BUG-114, BUG-109, BUG-118)
    ├── bug96_journal_sync.spec.ts       # BUG-96 assertion (Missing Payments Journal voucher)
    └── bug76_rollback_safety.spec.ts   # BUG-76 assertion (Purchase return rollback atomicity)
```

---

## 2. Key Test Specifications & Audit Coverage

### 2.1 Closed-Loop Financial Parity (`financial_parity.spec.ts`)
* **Objective:** Validates the fundamental closed-loop accounting invariant across payment accounts:
  $$\sum \text{Cash In} - \sum \text{Cash Out} \equiv \text{Net Balance} \equiv \sum \text{Active Payment Accounts}$$
* **Dual-Environment Support:**
  * **Live Production:** $\sum \text{In } (৳\ 369,500) - \sum \text{Out } (৳\ 315,400) \equiv ৳\ 54,100 \equiv \text{Accounts } (৳\ 49.6\text{k} + ৳\ 3\text{k} + ৳\ 1.5\text{k})$
  * **Staging Sandbox:** $\sum \text{In } (৳\ 158,500) - \sum \text{Out } (৳\ 156,000) \equiv ৳\ 2,500 \equiv \text{Accounts } (৳\ 1.5\text{k} + ৳\ 1.0\text{k})$
* **Pass Criterion:** $\Delta_{\text{Variance}} \equiv ৳\ 0.00$ ($\Phi = 0.00$).

### 2.2 Financial Reports Audit Suite (`reports_audit.spec.ts`)
* **TC-REPORT-01 [BUG-114]:** Verifies that Operating Expenses in the Profit & Loss statement is dynamically queried and NOT hardcoded to ৳ 0 when verified expenses exist in `/admin/expenses`. Asserts that Net Profit satisfies $\text{Gross Profit} - \text{Expenses}$.
* **TC-REPORT-02 [BUG-109]:** Asserts the core mathematical invariant that Supplier Payments $\text{Period Paid} \le \text{All-Time Paid}$ across individual vendors and grand totals.
* **TC-REPORT-03 [BUG-118]:** Validates receivable parity on the Sales Report: verifies whether "Total Sales" deducts returns without netting collections, flagging apparent cash deficits.
* **TC-REPORT-04 [BUG-111 & BUG-107]:** Validates Cash Movement solvency, working capital presentation, and asserts that no raw database snake_case enums (e.g. `sale_return_refund`) leak into the UI.

### 2.3 Payments Journal Sync (`bug96_journal_sync.spec.ts`)
* **Objective:** Submits an operational expense from `Cash Box`, validates that `Cash Box` is debited and Cash Flow is logged, and asserts that a matching double-entry voucher is generated in `Finance -> Payments Journal`.
* **Defect Behavior:** Fails assertion if the Payments Journal lacks the transaction voucher.

### 2.4 Rollback Atomicity Guard (`bug76_rollback_safety.spec.ts`)
* **Objective:** Submits an unstocked purchase return against an empty inventory PO, validates that the UI halts on `"Out of Stock"`, and asserts that the central Cash Flow statement was NOT prematurely mutated.

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

| Audit Target | Command | Purpose |
| :--- | :--- | :--- |
| **All Test Suites** | `npm test` | Run complete E2E audit suite headlessly. |
| **Zero-Variance Parity** | `npm run test:parity` | Run financial parity reconciliation against payment accounts. |
| **Financial Reports** | `npm run test:reports` | Run P&L, Supplier Payments, and Sales netting audit. |
| **Core Audit Gate** | `npm run test:audit` | Run combined Parity + Reports audit for CI/CD gates. |
| **Defect Regressions** | `npm run test:defects` | Run BUG-96 and BUG-76 atomicity and journal sync tests. |
| **Interactive UI** | `npm run test:ui` | Launch Playwright interactive trace viewer and test runner. |
| **HTML Report** | `npm run test:report` | Open generated rich HTML audit report. |

---

## 5. Environment Configuration & CI/CD Integration

The suite supports dynamic targeting of any staging or pre-production deployment:

```bash
# Windows PowerShell:
$env:BASE_URL="https://sme.yesbangladesh.net"
$env:ERP_ADMIN_USER="admin@gmail.com"
$env:ERP_ADMIN_PASSWORD="YourPassword"
npm run test:audit
```

In CI/CD (GitHub Actions), results are published as:
1. Console List output for immediate build feedback.
2. JSON test result artifacts (`test-results/audit-execution-results.json`).
3. Complete HTML Playwright report with traces and failure screenshots.
