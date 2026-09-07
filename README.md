# 🧪 BizPOS Pro — QA Audit & Financial Reconciliation Framework

<p align="center">
  <a href="https://github.com/naimuropu-cell/bizpos-qa-audit-framework/actions/workflows/audit-ci.yml"><img src="https://img.shields.io/badge/QA-Audit%20Framework-0A66C2?style=for-the-badge&logo=checkmarx&logoColor=white" alt="QA Framework" /></a>
  <a href="playwright-tests/"><img src="https://img.shields.io/badge/Playwright-E2E%20Testing-45BA4B?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright E2E" /></a>
  <a href="playwright-tests/"><img src="https://img.shields.io/badge/TypeScript-Test%20Automation-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Laravel-Backend%20Under%20Audit-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" /></a>
  <a href="scripts/"><img src="https://img.shields.io/badge/Finance-Reconciliation%20Engine-6F42C1?style=for-the-badge&logo=calculator&logoColor=white" alt="Reconciliation" /></a>
  <a href="https://www.linkedin.com/in/naimur-rahman-apu/"><img src="https://img.shields.io/badge/LinkedIn-Md.%20Naimur%20Rahman%20Apu-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
</p>

<p align="center">
  <strong>Enterprise QA Audit &bull; Financial Reconciliation &bull; E2E Automation &bull; Defect Governance</strong>
</p>

---

## 📌 Project Overview

**BizPOS Pro** is a comprehensive enterprise business management platform combining:

* 🛒 **POS** (Point of Sale counter operations)
* 📦 **Inventory & Stock Management** (Multi-branch warehouses)
* 🧾 **Sales** (Wholesale & retail customer invoicing)
* 👥 **Customer Management** (Receivables & credit limits)
* 🚚 **Courier Operations** (Order dispatch & delivery tracking)
* 🛍️ **eCommerce Orders** (Web store checkout & payment sync)
* 🏭 **Supplier Management** (Purchase orders & payables)
* 💰 **Accounting** (Double-entry ledgers & vouchers)
* 💳 **Payment Management** (Multi-method disbursements)
* 📊 **Financial Reports** (Aggregated operational statements)
* 🏦 **Cash & Bank Accounts** (Multi-account liquid floats)
* 📈 **Profit & Loss** (COGS, revenue, expenses & margins)
* 🔄 **Returns & Adjustments** (Sales & purchase return flows)

This repository contains a structured **QA Audit & Financial Reconciliation Framework** created to evaluate the functional correctness, data integrity, financial consistency, reporting accuracy, and automation readiness of the BizPOS Pro platform.

The project goes far beyond conventional UI testing.

The primary objective is to answer one critical question:

> **"Does every financial transaction produce the correct and consistent result across the entire system?"**

For example:

```text
Sale
  ↓
Customer Payment
  ↓
Payment Account
  ↓
Cash Flow
  ↓
Ledger
  ↓
Journal Entry
  ↓
Financial Reports
```

---

## 🎯 QA Objectives

The audit focuses on five major areas:

### 1. Functional Correctness
Verify that every module behaves according to its intended business workflow.

### 2. Data Integrity
Ensure that data created in one module is correctly reflected in dependent modules.

### 3. Financial Integrity
Validate the fundamental liquidity invariant:
$$\text{Cash In} - \text{Cash Out} = \text{Net Balance}$$

and that the same financial reality is reflected across:
* Cash Flow
* Payment Accounts
* Ledgers
* Journals
* Reports

### 4. Transaction Atomicity
Ensure failed transactions do not leave partial updates behind.

For example:
```text
Purchase Return
     ↓
Stock Update
     ↓
Payment Update
     ↓
Cash Flow Update
     ↓
Ledger Update
```

> [!IMPORTANT]
> If any critical operation fails, the system should not remain in a partially updated state.

### 5. Automation & Regression Safety
Convert high-risk financial scenarios into repeatable automated tests using Playwright and CI/CD.

---

## 🏗️ QA Framework Architecture

```text
bizpos-qa-audit-framework/
│
├── .github/
│   └── workflows/
│       └── audit-ci.yml
│
├── 01-test-strategy-and-plan/
├── 02-test-cases/
├── 03-traceability-matrix/
├── 04-bug-reports/
├── 05-artifacts-and-evidence/
├── playwright-tests/
├── scripts/
├── audit_report_template.html
├── BizPOS_Master_Cross_Report_Audit_Report.pdf
└── README.md
```

The repository is intentionally divided into logical QA layers:

```text
Strategy
   ↓
Test Cases
   ↓
Requirements Traceability
   ↓
Defect Management
   ↓
Evidence Preservation
   ↓
Automation
   ↓
CI/CD Audit
   ↓
Executive Reporting
```

---

## 📂 Repository Structure

### 01 — Test Strategy & Plan
```text
01-test-strategy-and-plan/
└── Test_Plan_BizPOS.md
```

This document contains the master QA strategy for the project.

It includes:
* QA objectives
* Scope
* Testing approach
* Risk-based testing
* RACI matrix
* Risk-Based Testing heatmap
* Quality release gates
* Testing responsibilities
* Financial audit strategy

#### Risk-Based Testing
The framework uses a 1–25 risk scoring model:

$$\text{Risk Score} = \text{Likelihood} \times \text{Impact}$$

High-risk financial areas receive higher testing priority:
* Cash Flow
* Payment Accounts
* Sales Returns
* Purchase Returns
* Supplier Payments
* Customer Payments
* Profit & Loss
* Financial Reports

---

### 🧪 02 — Test Cases
```text
02-test-cases/
│
├── Financial_Reconciliation_Cases.md
├── Financial_Reconciliation_Cases.csv
└── Financial_Reconciliation_Cases.xlsx
```

The project contains **26 end-to-end financial reconciliation test cases**.

Test cases cover transaction flows such as:
* Sales
* Customer payments
* Supplier payments
* Expenses
* Returns
* Cash movement
* Account balances
* Financial reports
* Ledger synchronization
* Journal synchronization

Each test case contains:
* **Test ID**
* **Objective**
* **Preconditions**
* **Test Steps**
* **Input Data**
* **Expected Result**
* **Financial Formula**
* **Expected System State**

---

### 📊 Financial Reconciliation Philosophy

The core of this audit is cross-module reconciliation.

> [!NOTE]
> A transaction cannot be considered correct merely because the originating page shows a success message.

For example, when a **Customer Payment = ৳ 6,000** occurs, QA validation checks whether:

```text
Payment
   ↓
Payment Account +৳ 6,000
   ↓
Cash Flow +৳ 6,000
   ↓
Accounts Receivable -৳ 6,000
   ↓
Journal Entry
   ↓
Customer Ledger
```

All related records should remain consistent.

---

### 🔗 03 — Requirements Traceability Matrix
```text
03-traceability-matrix/
└── RTM_BizPOS.md
```

The RTM provides bidirectional traceability between:

```text
Requirement
     ↕
Test Case
     ↕
Application Controller
     ↕
Database Table
     ↕
Defect
```

The current RTM maps 26 requirements/test scenarios across the audited financial workflows.

This makes it possible to answer:
1. *Which requirement is being tested?*
2. *Which defects affect this requirement?*

---

### 🐞 04 — Bug Reports
```text
04-bug-reports/
```

The repository contains a centralized defect catalog:
* [`ALL_DEFECTS_LOG.md`](04-bug-reports/ALL_DEFECTS_LOG.md)

#### Audit Defect Summary

| Status | Count |
| :--- | :---: |
| 🔴 **Total Audited Defects** | **118** |
| ✅ **Fixed** | **91** |
| 🟠 **Need Revision** | **6** |
| 🔴 **Not Fixed** | **18** |

*Defect counts represent the current audit snapshot captured in this repository.*

---

### 🚨 High-Impact Financial Defects

Several defects were documented separately because of their financial or architectural impact:

#### BUG-70 — Cash Flow Discrepancy
*File:* [`Bug-70_Severe_Cash_Flow_Discrepancy.md`](04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md)
* **Problem:** A reconciliation gap of approximately **৳ 842,000** was identified between Cash Flow and payment account balances.
* **Risk:** This type of discrepancy can cause incorrect business balances, misleading management reporting, financial decision errors, and severe accounting reconciliation problems.

#### 🔄 BUG-76 — Purchase Return Rollback Failure
*File:* [`Bug-76_Purchase_Return_Rollback_Failure.md`](04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md)
* **Problem:** A purchase return workflow could mutate central financial data before a subsequent stock-related operation failed.
* **Expected behavior:** The transaction should be atomic:

```text
START TRANSACTION

Stock Update
Payment Update
Cash Flow Update
Ledger Update

       ↓

Everything succeeds
       ↓
COMMIT

If an operation fails:
       ↓
ROLLBACK
```
*No partial financial state should remain.*

#### 📒 BUG-96 — Payments Journal Synchronization
*File:* [`Bug-96_Payments_Journal_Voucher_Missing.md`](04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md)
* **Problem:** Certain operational expenses bypassed the master Payments Journal / double-entry flow.
* **Expected accounting relationship:** For an expense payment:
  * `Expense Account` &rarr; **DR**
  * `Cash/Bank Account` &rarr; **CR**
* The operational transaction and accounting journal should remain synchronized.

#### 📅 BUG-109 — Supplier Payment Period Paradox
*File:* [`Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md`](04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md)
* A reporting inconsistency was identified where:
  $$\text{Period Paid } (\approx ৳\ 193.1\text{K}) > \text{All-Time Paid } (\approx ৳\ 178.1\text{K})$$
* This represents a logical reporting paradox: a filtered period should never exceed the corresponding all-time aggregate under the same accounting definition.

#### 💸 BUG-111 — False Cash Movement Deficit
*File:* [`Bug-111_Cash_Movement_False_Deficit.md`](04-bug-reports/Bug-111_Cash_Movement_False_Deficit.md)
* The audit identified **-৳ 18,600** displayed as a deficit where the underlying financial state did not support the displayed warning.
* The defect also included exposure of a raw database-style snake_case enum value in the UI.

#### 📉 BUG-114 — Profit & Loss Expense Omission
*File:* [`Bug-114_Profit_Loss_Zero_Operating_Expense.md`](04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md)
* **Problem:** The Profit & Loss report displayed **Operating Expense = ৳ 0** while approximately **৳ 6.3K** of paid operating expenses existed in the system.
* **Risk:** This directly affects Net Profit, Profit Margin, business performance evaluation, and executive management decisions.

#### 📊 BUG-118 — Sales Report Return Deduction
*File:* [`Bug-118_Sales_Report_Return_Deduction_Paradox.md`](04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md)
* The audit identified an inconsistency where **Total Sales** was being reduced by sales returns while collection-related figures remained based on gross sales.
* This creates a potential mismatch between Gross Sales, Returns, Net Sales, Collections, and Receivables.

---

### 🔬 05 — Evidence & Audit Artifacts
```text
05-artifacts-and-evidence/
└── README.md
```

The project maintains an evidence-preservation strategy for audit findings.

Evidence can include:
* Screenshots
* Test results
* Reports
* Exported files
* API responses
* Financial calculations
* Browser evidence
* Reconciliation outputs

The artifact process follows documented evidence preservation conventions and uses SHA-256 hashing where applicable to maintain evidence integrity.

---

## 🎭 Playwright E2E Automation
```text
playwright-tests/
```

The automation framework is built using:
* Playwright
* TypeScript
* Page Object Model
* Fixtures
* Multi-browser testing
* HTML reporting
* CI/CD execution

### 🧱 Automation Architecture
```text
playwright-tests/
│
├── README.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
│
├── fixtures/
│   └── testData.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── CashFlowPage.ts
│   ├── PaymentAccountsPage.ts
│   ├── ExpensePage.ts
│   └── ReportsPage.ts
│
└── tests/
    ├── financial_parity.spec.ts
    ├── reports_audit.spec.ts
    ├── bug76_rollback_safety.spec.ts
    └── bug96_journal_sync.spec.ts
```

### 🧩 Page Object Model

The automation suite follows a Page Object Model architecture:

* **`BasePage`:** Common functionality including page loading, DOM waits, page readiness, currency parsing, and shared utilities.
* **`LoginPage`:** Handles authentication across live and staging environments.
* **`CashFlowPage`:** Handles Cash In extraction, Cash Out extraction, Net balance extraction, and Cash Flow validation.
* **`PaymentAccountsPage`:** Extracts balances from dynamic payment accounts such as `Cash Box`, `Rizvi Al - EBL`, and `NAIMUR - UCB`.
* **`ExpensePage`:** Handles expense submission, expense verification, and Payments Journal validation.
* **`ReportsPage`:** Provides automation locators for Profit & Loss, Supplier Payments, Sales Reports, and Cash Movement.

### 🧪 Automated Test Suites

#### TC-RECON-01 — Financial Parity (`financial_parity.spec.ts`)
* Core invariant:
  $$\text{Cash In} - \text{Cash Out} = \text{Net}$$
* The test compares the expected financial state against payment account balances:

```text
              ┌──────────────┐
              │   Cash Flow  │
              └──────┬───────┘
                     │
              Cash In / Out
                     │
                     ▼
              ┌──────────────┐
              │ Net Balance  │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │   Accounts   │
              └──────────────┘
```
The objective is to detect cross-module financial variance automatically.

#### 📊 Reports Audit (`reports_audit.spec.ts`)
Automated checks include detection of issues associated with:
* `BUG-114`
* `BUG-109`
* `BUG-118`
* `BUG-111`
* `BUG-107`

The suite validates financial reports against expected business relationships rather than simply checking whether a page loads.

#### 🔄 BUG-76 Rollback Safety (`bug76_rollback_safety.spec.ts`)
This test verifies that failed purchase-return operations do not leave behind inconsistent financial or stock data:
$$\text{Successful transaction} \implies \text{COMMIT} \qquad\mid\qquad \text{Failed transaction} \implies \text{ROLLBACK}$$

#### 📒 BUG-96 Journal Synchronization (`bug96_journal_sync.spec.ts`)
This test validates that operational expenses create the expected accounting journal relationship:
```text
Expense Payment
      ↓
Payment Account
      ↓
Payments Journal
      ↓
Double Entry
```

### 🧪 Test Data & Fixtures
```text
fixtures/
└── testData.ts
```

The fixture layer contains staging baselines, live baselines, financial test values, defect payloads, account references, and reconciliation expectations.

One baseline scenario uses approximately **৳ 54.1K** across three payment accounts for parity validation.

### ⚙️ Configuration
```text
playwright.config.ts
```

The framework supports Chromium, Firefox, configurable viewports, test timeouts, HTML reporting, and environment overrides.

---

## 🧰 Supporting Audit Engines

The repository also contains lightweight reconciliation engines:

```text
scripts/
│
├── reconciliation_audit.js
└── reconciliation_audit.py
```

These provide a standalone way to validate financial parity without relying exclusively on browser automation.

### 🟨 Node.js Audit Engine (`reconciliation_audit.js`)
Designed as a zero-dependency companion audit engine. It can be used for:
* Staging parity
* Live parity
* Financial variance detection
* CLI-based audit tracing

### 🐍 Python Audit Engine (`reconciliation_audit.py`)
Provides:
* Zero-variance validation
* Reconciliation calculations
* CLI step tracing
* Financial invariant checks

---

## 🚀 CI/CD Pipeline

```text
.github/
└── workflows/
    └── audit-ci.yml
```

The project uses a three-stage audit pipeline:

```text
                 ┌─────────────────┐
                 │   Parity Gate   │
                 └────────┬────────┘
                          ↓
                 ┌─────────────────┐
                 │ Playwright E2E  │
                 └────────┬────────┘
                          ↓
                 ┌─────────────────┐
                 │ Audit Artifacts │
                 │ PDF / Excel     │
                 └─────────────────┘
```

---

## 🚦 Quality Release Gates

The QA strategy defines four quality release gates.

> [!WARNING]
> A build should not be considered production-ready simply because of an **HTTP 200** response or a **UI page loading successfully**.

Instead, the release decision considers:

* **Gate 1 — Functional Integrity:** Critical workflows operate correctly.
* **Gate 2 — Financial Integrity:** Financial calculations reconcile without variance.
* **Gate 3 — Regression Safety:** Previously fixed critical defects remain fixed.
* **Gate 4 — Evidence & Reporting:** Required audit evidence and reports are available.

---

## 💰 Financial Invariants

The most important concept in this framework is the use of financial invariants.

An invariant is a relationship that should always remain true:

* **Liquidity:**
  $$\text{Net Cash} = \text{Cash In} - \text{Cash Out}$$
* **Purchases:**
  $$\text{Purchase Amount} = \text{Paid Amount} + \text{Outstanding Amount}$$
* **Supplier Accounts:**
  $$\text{Supplier Balance} = \text{Purchases} - \text{Payments} \pm \text{Adjustments}$$
* **Customer Receivables:**
  $$\text{Customer Due} = \text{Sales} - \text{Payments} - \text{Valid Adjustments}$$

The exact accounting behavior depends on the transaction type and system rules, but the fundamental principle is:

> **The same business event must remain financially consistent across every dependent module.**

---

## 🔄 Cross-Module Testing Model

Traditional UI testing may validate:
```text
Click Save  ──►  Success Message
```

This framework goes further:

```text
User Action
     ↓
Business Transaction
     ↓
Database State
     ↓
Stock State
     ↓
Payment State
     ↓
Cash Flow
     ↓
Ledger
     ↓
Journal
     ↓
Financial Report
```

This is the difference between simple **UI validation** and **End-to-End Business & Financial Validation**.

---

## 🧭 Example Audit Flows

### Example Audit Flow — Customer Payment
Suppose a customer pays **৳ 6,000**. The expected chain is:

```text
Customer Payment
       │
       ├── Payment Record
       │
       ├── Customer Due ↓
       │
       ├── Cash/Bank Account ↑
       │
       ├── Cash Flow Cash In ↑
       │
       ├── Accounts Receivable ↓
       │
       └── Journal Entry
```
The QA framework validates the complete chain.

### Example Audit Flow — Expense
Example: **Operating Expense = ৳ 6,300**. Expected accounting relationship:

```text
Operating Expense
       ↓
Expense Record
       ↓
Payment
       ↓
Cash/Bank ↓
       ↓
Cash Out ↑
       ↓
Journal Entry
       ↓
P&L Operating Expense
```

> [!CAUTION]
> If the expense exists but P&L shows **৳ 0**, the system has a critical cross-module data integrity problem.

### Example Audit Flow — Sales Return
A sales return should be evaluated across multiple layers:

```text
Original Sale
    ↓
Customer Payment
    ↓
Sales Return
    ↓
Returned Stock
    ↓
Refund / Customer Credit
    ↓
Cash / Bank Movement
    ↓
Sales Report
    ↓
Customer Ledger
```

The QA objective is to ensure that the return does not create a mismatch between Sales, Returns, Collections, Receivables, Stock, and Cash Flow.

---

## 📦 Inventory & Stock Integrity

The audit also covers stock-related financial dependencies.

Important scenarios include:
* Opening stock
* Stock in / Stock out
* Stock transfer
* Purchase / Sales
* Purchase return / Sales return
* Branch inventory
* Stock history

Example invariant:
$$\text{Closing Stock} = \text{Opening Stock} + \text{Total In} - \text{Total Out} \pm \text{Adjustments}$$

Any deviation requires investigation.

---

## 🏢 Multi-Branch Integrity

BizPOS Pro includes branch/warehouse-related inventory workflows.

Cross-branch testing verifies that:
```text
Source Branch Stock  ──►  Transfer  ──►  Destination Branch Stock
```
remains consistent.

A transfer should never allow:
$$\text{Transfer Quantity} > \text{Available Stock}$$
unless the business explicitly supports negative inventory.

---

## 🧾 Reporting Integrity

Reports are treated as derived financial views, not isolated pages. The framework compares reports against source transactions:

```text
Sales Report              ↕    Sales Transactions
Supplier Payment Report   ↕    Supplier Payments
Profit & Loss             ↕    Revenue + Expenses
Cash Movement             ↕    Cash Transactions
```

> [!WARNING]
> A report is considered suspicious when its aggregate values contradict the underlying transaction records.

---

## 🔍 Defect Classification

Defects are categorized according to their impact across three dimensions:

| Dimension | Classifications |
| :--- | :--- |
| **Bug Type** | Functional, Validation, UI/UX, Data Integrity, Financial, Calculation, Reporting, Integration, Security, Performance, Usability |
| **Severity** | Critical, High, Medium, Low |
| **Priority** | P0, P1, P2, P3 |

Financial integrity defects receive elevated attention because they directly affect business decisions and accounting reliability.

---

## 📋 Defect Reporting Standard

The project follows a structured defect format. Each defect report includes:

1. **Bug ID**
2. **Title**
3. **Module**
4. **Environment**
5. **Preconditions**
6. **Test Data**
7. **Steps to Reproduce**
8. **Actual Result**
9. **Expected Result**
10. **Business Impact**
11. **Financial Impact**
12. **Severity**
13. **Priority**
14. **Evidence**
15. **Root Cause**
16. **Regression Test**
17. **Status**

This makes defects actionable not only for developers but also for QA, Product Management, Technical Leads, Business Analysts, Executives, and Statutory Auditors.

---

## 📑 Executive Audit Report

The repository contains:
* [`BizPOS_Master_Cross_Report_Audit_Report.pdf`](BizPOS_Master_Cross_Report_Audit_Report.pdf)

This is the executive-level audit output summarizing QA findings, financial reconciliation, defect statuses, high-risk issues, audit conclusions, and evidentiary proofs.

A responsive HTML report template is also included:
* [`audit_report_template.html`](audit_report_template.html)

---

## 📈 Audit Metrics

The repository tracks important QA metrics:
* Total Defects
* Fixed Defects
* Open Defects
* Need Revision
* Critical/High Risk Defects
* Financial Variance
* Test Coverage
* Automation Coverage
* Regression Coverage

Example snapshot:
```text
Total Audited Defects       : 118
Fixed                       : 91
Need Revision               : 6
Not Fixed                   : 18
```

---

## 🧠 QA Methodology

The project follows a combination of:

* **Exploratory Testing:** Discover unexpected behavior through realistic user workflows.
* **Risk-Based Testing:** Prioritize areas where failure can cause significant business impact.
* **End-to-End Testing:** Validate complete business workflows rather than isolated pages.
* **Reconciliation Testing:** Compare financial values across multiple system components.
* **Regression Testing:** Ensure fixed defects do not return.
* **Negative Testing:** Verify invalid inputs, boundary conditions, and failure scenarios.
* **Data Integrity Testing:** Validate that transactions correctly propagate across dependent modules.
* **Automation:** Convert stable, high-risk scenarios into repeatable automated tests.

---

## 🔐 Evidence & Auditability

Testing evidence is treated as an essential part of the QA process. A finding should ideally be reproducible through:

```text
Test Case + Input Data + Steps + Expected Result + Actual Result + Evidence
```

Where applicable, SHA-256 hashes can be used to establish artifact integrity.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Playwright** | Browser E2E automation |
| **TypeScript** | Automation development |
| **Node.js** | Test execution & audit scripts |
| **Python** | Financial reconciliation engine |
| **Laravel** | Application backend under audit |
| **CSV** | Test data / CI datasets |
| **Excel / XLSX** | QA test management & reporting |
| **HTML** | Audit report presentation |
| **PDF** | Executive audit artifact |
| **GitHub Actions** | CI/CD automation |

---

## ▶️ Running the Automation Suite

Navigate to the test suite directory:
```bash
cd playwright-tests
```

Install dependencies:
```bash
npm install
```

Run the parity tests:
```bash
npm run test:parity
```

Run report audits:
```bash
npm run test:reports
```

Run the complete audit suite:
```bash
npm run test:audit
```

Run defect-specific tests:
```bash
npm run test:defects
```

*Exact commands are defined in [`playwright-tests/package.json`](playwright-tests/package.json).*

---

## 🧪 Browser Testing

The Playwright configuration supports multiple browsers:
* **Chromium**
* **Firefox**

This helps detect browser-specific issues in critical workflows.

---

## 📦 CI/CD Execution

The GitHub Actions workflow [`.github/workflows/audit-ci.yml`](.github/workflows/audit-ci.yml) automates the audit pipeline:

```text
Git Push / Pull Request
          ↓
      Parity Gate
          ↓
    Playwright Tests
          ↓
 Financial Audit Tests
          ↓
 PDF / Excel Artifacts
          ↓
      CI Result
```

This transforms the QA framework from a collection of manual test documents into a repeatable engineering process.

---

## 📚 Documentation Map

| Directory | Purpose |
| :--- | :--- |
| [`01-test-strategy-and-plan`](01-test-strategy-and-plan/) | QA strategy & release planning |
| [`02-test-cases`](02-test-cases/) | Financial test cases & datasets |
| [`03-traceability-matrix`](03-traceability-matrix/) | Requirements &rarr; Tests &rarr; Code &rarr; Defects |
| [`04-bug-reports`](04-bug-reports/) | Defect catalog & detailed financial defects |
| [`05-artifacts-and-evidence`](05-artifacts-and-evidence/) | Audit evidence standards |
| [`playwright-tests`](playwright-tests/) | E2E automation |
| [`scripts`](scripts/) | Financial reconciliation engines |
| [`.github/workflows`](.github/workflows/) | CI/CD audit pipeline |

---

## 🎯 What Makes This QA Project Different?

This framework is designed around a simple principle:

> **A successful UI action does not necessarily mean a successful business transaction.**

For example, `"Payment Saved Successfully"` is only the beginning. The real QA question is:

```text
Was the payment saved?
        ↓
Was the customer balance updated?
        ↓
Was the correct cash/bank account updated?
        ↓
Was Cash Flow updated?
        ↓
Was the journal posted?
        ↓
Was the ledger updated?
        ↓
Did the financial report reflect it?
        ↓
Does the final balance reconcile?
```

This approach helps identify defects that traditional page-level testing can miss.

---

## 🏆 QA Engineering Outcomes

The framework demonstrates practical experience in:
* Functional testing
* Exploratory testing
* Regression testing
* Risk-based testing
* Financial reconciliation
* Accounting workflow validation
* Data integrity testing
* Cross-module testing
* API/backend-aware testing
* E2E automation
* Playwright
* TypeScript
* Page Object Model
* CI/CD
* Defect lifecycle management
* Requirements traceability

---

## 🗺️ High-Level QA Flow

```text
                ┌──────────────────┐
                │   Requirements   │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │  Risk Assessment │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │   Test Strategy  │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │   Test Cases     │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Exploratory Test │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Defect Discovery │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Financial Audit  │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Playwright E2E   │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │    CI/CD Gate    │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Executive Report │
                └──────────────────┘
```

---

## 📊 Final Audit Snapshot

```text
╔══════════════════════════════════════╗
║        BizPOS Pro QA Audit           ║
╠══════════════════════════════════════╣
║ Total Defects Audited       118      ║
║ Fixed                         91     ║
║ Need Revision                  6     ║
║ Not Fixed                     18     ║
║                                      ║
║ Financial Test Cases          26     ║
║ Automated E2E Suites          4      ║
║ Browser Coverage        Chromium     ║
║                         Firefox      ║
╚══════════════════════════════════════╝
```

---

## 👨‍💻 QA Engineering Focus

This repository represents a QA approach centered around:

```text
Quality + Business Logic + Financial Accuracy + Data Integrity + Automation + Auditability
```

Rather than testing only whether a feature works from the user's perspective, the framework evaluates whether the feature produces the correct system-wide business state.

---

## 📜 Repository Purpose

This repository is maintained as a professional QA engineering and audit framework for the BizPOS Pro application.

It demonstrates how a QA process can evolve from:

```text
Manual Testing
      ↓
Structured Test Cases
      ↓
Risk-Based Testing
      ↓
Financial Reconciliation
      ↓
Traceability
      ↓
Defect Governance
      ↓
E2E Automation
      ↓
CI/CD Quality Gates
```

---

<p align="center">
  <strong>Prepared by <a href="https://www.linkedin.com/in/naimur-rahman-apu/">Md. Naimur Rahman Apu</a> &mdash; Software QA Engineer</strong><br>
  <a href="https://www.linkedin.com/in/naimur-rahman-apu/">LinkedIn Profile</a> &bull; <a href="https://github.com/naimuropu-cell">GitHub Profile</a> &bull; <a href="https://github.com/naimuropu-cell/bizpos-qa-audit-framework">bizpos-qa-audit-framework</a>
</p>
