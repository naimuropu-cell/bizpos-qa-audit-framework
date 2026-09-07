# BizPOS QA Audit Framework

> **Enterprise Quality Assurance & Financial Systems Audit Framework**  
> *Role Profile:* **QA Lead / Staff QA Architect / Financial Systems Audit Specialist**  
> *Target System:* **BizPOS / YesSME ERP v2.4** (Multi-Tenant Enterprise Resource Planning Platform)  
> *Core Mandate:* **Zero-Variance Financial Parity, Live Production Reporting Audit & E2E Regression Automation**  
> *Live System:* `https://sme.yesbangladesh.net` (Non-Mutating Inspection)

[![Financial Parity CI](https://github.com/naimuropu-cell/bizpos-qa-audit-framework/actions/workflows/audit-ci.yml/badge.svg)](https://github.com/naimuropu-cell/bizpos-qa-audit-framework/actions/workflows/audit-ci.yml)
[![Zero-Variance Parity](https://img.shields.io/badge/Financial_Parity-0.00_Variance-success.svg)](#2-closed-loop-financial-parity--live-reconciliation)
[![Audited Defects](https://img.shields.io/badge/Audited_Defects-118_Cataloged-blue.svg)](04-bug-reports/ALL_DEFECTS_LOG.md)
[![Reports Audit](https://img.shields.io/badge/Reports_Suite-13_Modules_Audited-purple.svg)](#3-master-cross-report-audit-matrix--live-findings)
[![Playwright E2E](https://img.shields.io/badge/Playwright-TypeScript_POM-orange.svg)](playwright-tests/)
[![Executive PDF Deliverable](https://img.shields.io/badge/Executive_Deliverable-PDF_Report-red.svg)](BizPOS_Master_Cross_Report_Audit_Report.pdf)
[![Author](https://img.shields.io/badge/Author-Md._Naimur_Rahman_Apu-brightgreen.svg)](https://www.linkedin.com/in/naimur-rahman-apu/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-naimur--rahman--apu-0077b5?logo=linkedin)](https://www.linkedin.com/in/naimur-rahman-apu/)

---

## 1. QA Lead Executive Overview & Framework Architecture

The **BizPOS QA Audit Framework** is an enterprise-grade quality assurance system designed to audit, validate, and automate testing for the **BizPOS / YesSME ERP** platform. BizPOS coordinates operations across 20+ interconnected modules: Point of Sale (POS), Sales Invoicing, Supply Chain & Purchasing, Fixed Asset Management, HR & Payroll, Lender Loan facilities, Investor Capital/Equity, Marketing disbursements, and General Ledger Reporting.

### The QA Lead Problem Statement
In enterprise ERP and financial software, traditional UI-only testing is fundamentally inadequate. A software system can render every UI button and form correctly while simultaneously corrupting company financial statements, silently leaking operating expenses, or producing inverted period-over-lifetime calculations.

As **QA Lead**, this framework establishes a **5-Tier Quality Engineering Architecture**:

```text
+---------------------------------------------------------------------------------------------------------+
|                                5-TIER QA LEAD AUDIT & TESTING ARCHITECTURE                              |
+---------------------------------------------------------------------------------------------------------+
|  Tier 1: Non-Mutating Live Parity Gate   | Real-time mathematical invariant (Cash Flow ≡ Accounts)     |
|  Tier 2: E2E Playwright Automation Suite | Page Object Model (POM) in TypeScript with live DOM hooks    |
|  Tier 3: Master Cross-Report Audit Matrix| 13 report modules cross-reconciled against source ledgers   |
|  Tier 4: Requirements & Defect RTM       | 26 functional requirements mapped to 118 cataloged defects   |
|  Tier 5: CI/CD Quality Gate & Governance | GitHub Actions CI with automated exit-code-0 parity blocking |
+---------------------------------------------------------------------------------------------------------+
```

---

## 2. Closed-Loop Financial Parity & Live Reconciliation

Every financial transaction across the ERP must satisfy the **Zero-Variance Financial Parity Invariant**:

$$\Phi = \sum \text{Cash In} - \sum \text{Cash Out} - \sum_{i=1}^{n} \text{Active Payment Account Balance}_i \equiv 0.00$$

### Live Production Audit Reconciliation Baseline:
Following complete non-mutating inspection of active accounts and the central Cash Flow statement (`/admin/money/cashflow`):

| Financial Component | Audited Amount (BDT / ৳) | Source of Truth / Verification Mechanism | Status |
| :--- | :---: | :--- | :---: |
| **Gross Inflows ($\sum \text{Cash In}$)** | **৳ 369,500.00** | Capital In (৳ 100k) + Loans (৳ 30k) + Sales (৳ 11k) + Returns (৳ 29k) + Other (৳ 199.5k) | **Reconciled** |
| **Gross Outflows ($\sum \text{Cash Out}$)** | **৳ 315,400.00** | Supplier Paid (৳ 193.1k) + Salaries (৳ 60k) + Returns (৳ 25.5k) + Expenses (৳ 6.3k) + Capital/Loans/Assets (৳ 30.5k) | **Reconciled** |
| **Net Cash Flow Balance** | **+৳ 54,100.00** | $\sum \text{Cash In} - \sum \text{Cash Out} = ৳\ 369,500.00 - ৳\ 315,400.00$ | **Reconciled** |
| **Account: `Cash Box` (Till Float)** | **৳ 49,600.00** | Physical cash drawer & counter till ledger (`/admin/payment-accounts`) | **Reconciled** |
| **Account: `Rizvi Al` (Bank - EBL)** | **৳ 3,000.00** | Eastern Bank Ltd (EBL) corporate settlement statement | **Reconciled** |
| **Account: `NAIMUR` (Bank - UCB)** | **৳ 1,500.00** | United Commercial Bank (UCB) business account ledger | **Reconciled** |
| **Consolidated Active Accounts** | **৳ 54,100.00** | $\sum(\text{Cash Box} + \text{Rizvi Al} + \text{NAIMUR})$ | **Reconciled** |
| **Audit Parity Variance ($\Phi$)** | **৳ 0.00** | **Mathematical Convergence Achieved: Exact Zero Variance** | **VERIFIED PASS** |

---

## 3. Master Cross-Report Audit Matrix & Live Findings

> **Executive PDF Companion:** Complete 4-page executive report ready for engineering leadership:  
> [**`BizPOS_Master_Cross_Report_Audit_Report.pdf`**](BizPOS_Master_Cross_Report_Audit_Report.pdf)

A forensic audit of all **13 live reporting modules** (`/admin/reports/*`) was conducted against core transactional ledgers. **Compliance Rate: 38.46% (5 PASS, 8 DEFECTIVE)**.

| # | Report Module & URL | Reported Value(s) | Transactional Reality (Ledgers) | Variance / Root Defect Cause | QA Lead Verdict | Defect Link |
| :-: | :--- | :--- | :--- | :--- | :---: | :---: |
| **01** | **Profit & Loss**<br>`/admin/reports/profit-loss` | Rev: ৳ 151k<br>COGS: ৳ 120.4k<br>**Expenses: ৳ 0**<br>Net: ৳ 30,600 | Cash Flow Paid Expenses = **৳ 6,300**<br>Ad Spend = ৳ 700<br>Asset Maint = ৳ 1,000 | **Expenses understated by ৳ 6,300.00**.<br>P&L hardcodes Operating Expenses to ৳ 0, inflating Net Profit from ৳ 24,300 to ৳ 30,600 (margin 20.26% vs true 16.09%). | **CRITICAL FAIL** | [**BUG-114**](04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md) |
| **02** | **Supplier Payments**<br>`/admin/reports/supplier-payments` | Purchases: ৳ 178k<br>All-Time: **৳ 178,100**<br>Period: **৳ 193,100** | Purchases Total = **৳ 183,000**<br>Supplier Paid = **৳ 183,000**<br>Supplier Advance = **৳ 10,100** | **Accounting Paradox: Period Paid > All-Time Paid**.<br>Period query joins advances (৳ 183k + ৳ 10.1k = ৳ 193.1k), but All-Time query omits advances. ৳ 5k in purchases missing. | **CRITICAL FAIL** | [**BUG-109**](04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md) |
| **03** | **Cash Movement**<br>`/admin/reports/cash-movement` | Inflow: ৳ 173k<br>Outflow: ৳ 191.6k<br>**Balance: -৳ 18,600** | Cash Flow In = **৳ 369,500**<br>Cash Flow Out = **৳ 315,400**<br>Net Cash = **+৳ 54,100** | **False deficit of -৳ 18,600 reported**.<br>Query omits equity (৳ 100k), loans (৳ 20k), PR refunds (৳ 29k). Exposes raw database enum `sale_return_refund`. | **CRITICAL FAIL** | [**BUG-111**](04-bug-reports/Bug-111_Cash_Movement_False_Deficit.md) |
| **04** | **Sales Summary**<br>`/admin/reports/sales` | Total Sales: **৳ 125,500**<br>Collected: **৳ 136,000**<br>Due: **৳ 15,000** | Detail Sales = **৳ 151,000**<br>Sale Returns = **৳ 25,500**<br>Gross: ৳ 136k + ৳ 15k = ৳ 151k | **Total Sales (৳ 125.5k) < Collected (৳ 136k)**.<br>Column header labeled "Total Sales" silently subtracts returns while collections remain at gross without a "Returns" column. | **FAIL** | [**BUG-118**](04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md) |
| **05** | **Monthly Summary**<br>`/admin/reports/monthly-summary` | Sept Sales: ৳ 125,500<br>Paid: ৳ 136,000<br>Due: ৳ 15,000 | Detail Sales = ৳ 151,000<br>Sale Returns = ৳ 25,500 | Inherits identical sales deduction naming paradox where Total Sales is less than Total Paid. | **FAIL** | [**BUG-119**](04-bug-reports/ALL_DEFECTS_LOG.md) |
| **06** | **Receivables Aging**<br>`/admin/reports/receivables-aging` | Customer: Chaim Bowen<br>Due: ৳ 15,000<br>Days: **2.003322033** | Sales Due = ৳ 15,000<br>Current Date: 08 Sep 2026<br>Sale Date: 06 Sep 2026 | Overdue amount is accurate, but Days Overdue displays unrounded floating point timestamp subtraction instead of integer formatting. | **PARTIAL** | [**BUG-121**](04-bug-reports/ALL_DEFECTS_LOG.md) |
| **07** | **Daily Summary (DTS)**<br>`/admin/reports/dts` | Current day: ৳ 0<br>06 Sep: Sales ৳ 125k, Purch ৳ 140k<br>07 Sep: Sales ৳ 500, Purch ৳ 13k | Purchases match Purchase Report exactly (৳ 140k & ৳ 13k). Sales reflect net after returns (৳ 125k & ৳ 500). | Defaults to ৳ 0 with no fallback when today has no sales. Replicates return deduction mismatch without separate refund card. | **PARTIAL** | [**BUG-102**](04-bug-reports/ALL_DEFECTS_LOG.md) |
| **08** | **Category-wise Sales**<br>`/admin/reports/category-wise` | Category: "Shirt"<br>Sold: 8 items<br>Rev: ৳ 151,000<br>Profit: ৳ 30,600 | 6 x Mobile (৳ 150,000)<br>2 x Full Shirt (৳ 1,000)<br>Total: ৳ 151,000 | Math is internally consistent with Detail Sales, but mobile devices are erroneously grouped under the "Shirt" category. | **PARTIAL** | Catalog Mapping |
| **09** | **Detail Sales**<br>`/admin/reports/detail-sales` | 6 Invoices (8 line items)<br>Grand Total: **৳ 151,000** | Sales Invoices S001-S004 (06 Sep), S001-S002 (07 Sep) | **100% Reconciliation**. Correct item prices, quantities, and line totals across all invoices. | **PASS** | Baseline OK |
| **10** | **Purchase Report**<br>`/admin/reports/purchase` | 9 Bills (4 on 07 Sep, 3 on 06 Sep, 2 in Aug)<br>Total: **৳ 183,000**<br>Paid: **৳ 183,000** | Cash Flow "Supplier Payment" = **৳ 183,000**<br>Purchases List Total = **৳ 183,000** | **100% Reconciliation**. Exactly matches Cash Flow supplier disbursements and Purchase Order register. | **PASS** | Baseline OK |
| **11** | **Inventory Report**<br>`/admin/reports/inventory` | Full Shirt: 259 in stock<br>Stock Value: **৳ 51,800**<br>Mobile: 0 (Out of stock) | Initial + Purchases − Returns − Sales = 259 shirts.<br>Unit Cost = ৳ 200.00 | **100% Reconciliation**. 259 × ৳ 200 = ৳ 51,800.00. Valuation and inventory balances match perfectly. | **PASS** | Baseline OK |
| **12** | **Customer Report**<br>`/admin/reports/customer` | Chaim Bowen: Spent ৳ 25k, Due ৳ 15k<br>Rhiannon: Spent ৳ 500, Due ৳ 0 | Sales Invoices S20260906002 and S20260907002 | **100% Reconciliation**. Outstanding receivables match Sales Report Due (৳ 15,000.00). | **PASS** | Baseline OK |
| **13** | **Staff Report**<br>`/admin/reports/staff` | EMP-0001: Present 2, Absent 2, Late 1, 27.0h worked | Attendance & Time Clock Register | **100% Reconciliation**. Accurately logs operational hours and attendance statistics. | **PASS** | Baseline OK |

---

## 4. Defect Governance & High-Severity Defect Showcase

The repository contains a centralized defect tracking register of **118 audited defects** in [`04-bug-reports/ALL_DEFECTS_LOG.md`](04-bug-reports/ALL_DEFECTS_LOG.md):

```text
+---------------------------------------------------------------------------------------+
| DEFECT DISTRIBUTION BREAKDOWN (TOTAL: 118)                                            |
+---------------------------------------------------------------------------------------+
| [==================================] Fixed: 91 (77.1%)                                |
| [===] Need Revisions - QA: 6 (5.1%)                                                   |
| [======] Not Fixed: 18 (15.3%)                                                        |
| [=] Invalid / Not An Issue: 3 (2.5%)                                                  |
+---------------------------------------------------------------------------------------+
```

### Standalone Forensic Defect Specifications:
1. **[BUG-70: Severe ৳ 842k Cash Flow Discrepancy](04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md)**  
   *Root Cause:* Payment accounts drifted to **৳ -142,339.09** while Cash Flow reported **৳ +699,910.89** due to missing transaction hooks on balance transfers.
2. **[BUG-76: Missing DB Rollback on Purchase Return](04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md)**  
   *Root Cause:* ACID atomicity failure where an "Out of Stock" validation exception failed to rollback a premature **৳ 48,000.00** Cash Flow mutation.
3. **[BUG-96: Payments Journal Voucher Missing](04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md)**  
   *Root Cause:* Sub-ledger transaction modules (Loans, Assets, Marketing) deducted payment accounts without generating matching vouchers in the master Payments Journal.
4. **[BUG-109: Supplier Payments Period Paid Exceeds All-Time Paid](04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md)**  
   *Root Cause:* The period query aggregated purchase payments + advances (**৳ 193,100.00**), while the all-time query excluded advances (**৳ 178,100.00**), creating an impossible mathematical condition.
5. **[BUG-111: Cash Movement False Deficit (-৳ 18,600)](04-bug-reports/Bug-111_Cash_Movement_False_Deficit.md)**  
   *Root Cause:* Cash Movement query filtered exclusively for customer payments, ignoring ৳ 196,500 in capital, loan, and return inflows, misleading executives into believing the business was insolvent.
6. **[BUG-114: Profit & Loss Statement Hardcoded ৳ 0 Operating Expenses](04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md)**  
   *Root Cause:* P&L controller hardcoded `total_expenses = 0`, ignoring ৳ 6,300 in verified paid operational expenses and artificially inflating Net Profit to ৳ 30,600.
7. **[BUG-118: Sales Report Return Deduction Mismatch](04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md)**  
   *Root Cause:* Mislabeled "Total Sales" (৳ 125,500) which subtracted returns (৳ 25,500) while Collected (৳ 136,000) and Due (৳ 15,000) remained gross.

---

## 5. Automated Testing & Engineering Tooling

### 5.1 Playwright TypeScript E2E Framework (Page Object Model)
The automation suite in [`playwright-tests/`](playwright-tests/) implements the **Page Object Model (POM)** with isolated test fixtures, live production selectors, and strict assertion gates:

```bash
cd playwright-tests
npm install
npx playwright install chromium

# Execute all E2E test suites:
npm test

# Run the Zero-Variance Financial Parity audit:
npm run test:parity

# Run defect regression tests (BUG-96, BUG-76, BUG-114):
npm run test:defects

# Interactive UI Mode & HTML Test Report:
npm run test:ui
npm run test:report
```

### 5.2 Python Parity Assertion Engine
A lightweight, zero-dependency Python script in [`scripts/reconciliation_audit.py`](scripts/reconciliation_audit.py) validates transactional running balances and enforces zero variance:

```bash
# Run standard verification (exits with code 0 on parity):
python scripts/reconciliation_audit.py

# Run with verbose step-by-step transaction ledger trace:
python scripts/reconciliation_audit.py --verbose
```

### 5.3 Continuous Integration (GitHub Actions)
The automated CI pipeline in [`.github/workflows/audit-ci.yml`](.github/workflows/audit-ci.yml) triggers on every push and pull request to execute both the Python parity assertion gate and the Playwright E2E suite.

---

## 6. Requirements Traceability Matrix (RTM)

The matrix in [`03-traceability-matrix/RTM_BizPOS.md`](03-traceability-matrix/RTM_BizPOS.md) links **26 functional requirements** directly to test cases and defect IDs:

```text
+-----------------------------------------------------------------------+
| Metric Description                                      | Value       |
+-----------------------------------------------------------------------+
| Total Core Functional Requirements Mapped               | 26          |
| Total Operational Test Cases Executed                   | 23          |
| Functional Requirements Fully Verified (PASS)           | 19 (73.08%) |
| Functional Requirements Defective / Blocked             | 7 (26.92%)  |
| Closed-Loop Liquidity Parity Coverage                   | 100%        |
+-----------------------------------------------------------------------+
```

---

## 7. Repository Directory Structure

```text
bizpos-qa-audit-framework/
├── .github/
│   └── workflows/
│       └── audit-ci.yml                               # GitHub Actions CI/CD automated pipeline
├── README.md                                          # Master repository documentation & QA Lead overview
├── BizPOS_Master_Cross_Report_Audit_Report.pdf        # 4-page executive audit report deliverable
├── 01-test-strategy-and-plan/
│   └── Test_Plan_BizPOS.md                            # Scope, risk matrix, BVA methodology & reconciliation math
├── 02-test-cases/
│   ├── Financial_Reconciliation_Cases.md              # 23 granular operational audit test cases (TC-01 to TC-23)
│   ├── Financial_Reconciliation_Cases.xlsx            # Formatted Excel workbook with running balance formulas
│   └── Financial_Reconciliation_Cases.csv             # TMS / Jira / TestRail import format
├── 03-traceability-matrix/
│   └── RTM_BizPOS.md                                  # 26-requirement bidirectional matrix (Req -> Tests -> Bugs)
├── 04-bug-reports/
│   ├── ALL_DEFECTS_LOG.md                             # 118-defect catalog with statuses, severity, and modules
│   ├── Bug-70_Severe_Cash_Flow_Discrepancy.md         # Forensic spec: ৳ 842k Cash Flow reconciliation breakdown
│   ├── Bug-76_Purchase_Return_Rollback_Failure.md     # Forensic spec: ACID atomicity failure on purchase returns
│   ├── Bug-96_Payments_Journal_Voucher_Missing.md     # Forensic spec: Missing Payments Journal double-entry vouchers
│   ├── Bug-109_Supplier_Payments_Period_Exceeds...md  # Forensic spec: Period Paid exceeds All-Time Paid paradox
│   ├── Bug-111_Cash_Movement_False_Deficit.md         # Forensic spec: False -৳ 18,600 deficit & enum exposure
│   ├── Bug-114_Profit_Loss_Zero_Operating_Expense.md  # Forensic spec: P&L hardcoded ৳ 0 operating expense leak
│   └── Bug-118_Sales_Report_Return_Deduction...md     # Forensic spec: Net Sales vs Gross Collections mismatch
├── 05-artifacts-and-evidence/
│   └── README.md                                      # Evidence preservation standards & voucher naming rules
├── playwright-tests/                                  # Playwright TypeScript E2E & Ledger Audit Suite
│   ├── package.json                                   # NPM dependencies & test runner scripts
│   ├── tsconfig.json                                  # Path mappings & TypeScript compiler options
│   ├── playwright.config.ts                           # Multi-browser viewport configs & HTML reporters
│   ├── fixtures/testData.ts                           # Reconciled baseline constants & defect payloads
│   ├── pages/                                         # POM: Base, Login, CashFlow, PaymentAccounts, Expense, Reports
│   └── tests/                                         # E2E test specs (financial_parity, reports_audit, bug96, bug76)
└── scripts/
    ├── reconciliation_audit.py                        # Standalone Python zero-variance parity validator
    └── reconciliation_audit.js                        # Node.js dual-engine parity & cross-report validator
```

---

## 8. QA Leadership & Author Profile

* **Author & QA Lead:** **Md. Naimur Rahman Apu**
* **Role / Title:** Software QA Engineer | Financial Systems Quality Architect
* **LinkedIn:** [linkedin.com/in/naimur-rahman-apu](https://www.linkedin.com/in/naimur-rahman-apu/)
* **GitHub:** [@naimuropu-cell](https://github.com/naimuropu-cell)
* **Framework Repository:** [https://github.com/naimuropu-cell/bizpos-qa-audit-framework.git](https://github.com/naimuropu-cell/bizpos-qa-audit-framework.git)
* **Audit Methodology:** ISA 315 / ISA 500 financial audit standards, ISTQB advanced test management principles, and automated non-mutating double-entry ledger reconciliation.
* **Target System:** BizPOS / YesSME ERP v2.4 (Live Production & Staging Verification).
