# Requirements Traceability Matrix (RTM): BizPOS / YesSME ERP

> **Document Identifier:** `RTM-BIZPOS-FIN-001`  
> **Target Scope:** Functional Requirements $\longleftrightarrow$ Test Cases $\longleftrightarrow$ Defect Tracking  
> **Audit Status:** Baseline Audited (23 Scenarios Verified)

---

## 1. Overview & Traceability Objective

The Requirements Traceability Matrix (RTM) establishes forward and backward traceability across the BizPOS / YesSME ERP system architecture. It validates that every financial business rule, module workflow, and general ledger posting rule is covered by audited test cases, and maps observed software discrepancies directly to functional requirements.

---

## 2. Master Traceability Matrix

| Requirement ID | ERP Module | Functional & Accounting Requirement Specification | Mapped Test Case(s) | Verification Method | Execution Status | Defect ID |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **REQ-CAP-01** | Capital Management | System must support equity capital injection into designated Bank or Cash accounts, crediting Owner's Equity and debiting Asset Accounts. | `TC-01`, `TC-02` | UI Entry + DB Ledger Audit | **VERIFIED** | — |
| **REQ-CAP-02** | Capital Management | Partner drawings/capital withdrawal must deduct from active payment accounts and debit Partner Equity/Drawings sub-ledger. | `TC-22` | UI Entry + Bank Recon | **VERIFIED** | — |
| **REQ-LOAN-01** | Lender Loans | Disbursement of commercial term loan must recognize loan liability and credit designated corporate bank account. | `TC-03` | Bank Wire Recon + DB Audit | **VERIFIED** | — |
| **REQ-LOAN-02** | Lender Loans | Monthly installment (EMI) debit must split between Principal repayment (reducing liability) and Interest expense, debiting Bank. | `TC-13` | Amortization Schedule Check | **VERIFIED** | — |
| **REQ-PLOAN-01** | Personal Loans | Short-term staff/personal loans disbursed from Cash Box must create a receivable sub-ledger under Current Assets. | `TC-14` | Cash Voucher Verification | **VERIFIED** | — |
| **REQ-PLOAN-02** | Personal Loans | Loan recovery must increment payment account (`Cash Box`) and reduce the outstanding balance on the personal borrower profile. | `TC-06` | Till Receipt Verification | **VERIFIED** | — |
| **REQ-SALES-01** | Sales & Invoicing | B2B wholesale invoice settlements via bank transfer must transition invoice state to "PAID" and credit bank ledger. | `TC-04` | Bank Statement Sync | **VERIFIED** | — |
| **REQ-SALES-02** | Sales & Retail POS | Walk-in counter POS cash sales must increment till float (`Cash Box`) and post sales revenue to daily register batch. | `TC-05` | POS Counter Register Count | **VERIFIED** | — |
| **REQ-PURCH-01** | Purchasing & AP | Vendor advance payments (BEFTN bank wire) must debit Supplier Advance account and credit Bank without requiring immediate invoice match. | `TC-09` | AP Sub-ledger Audit | **VERIFIED** | — |
| **REQ-PURCH-02** | Purchasing & AP | Spot raw material cash advances must deduct immediately from `Cash Box` and create unallocated vendor credit. | `TC-10` | Cash Drawer Reconciliation | **VERIFIED** | — |
| **REQ-PURCH-03** | Purchasing & AP | Direct consumables and logistic courier payments must debit operational expense and credit Cash Box. | `TC-23` | Voucher & Physical Invoices | **VERIFIED** | — |
| **REQ-ASSET-01** | Fixed Assets | Hardware and equipment acquisitions exceeding capitalization threshold must capitalize to Fixed Asset Register and debit Bank. | `TC-11` | Asset Register Inspection | **VERIFIED** | — |
| **REQ-ASSET-02** | Fixed Assets | Asset repairs and maintenance below capitalization threshold must be expensed directly through Cash/Bank. | `TC-12` | Expense Sub-ledger Audit | **VERIFIED** | — |
| **REQ-MKT-01** | Marketing & Ads | Digital campaign ad spend (Meta Facebook Ads) debited via bank card must be recognized under Marketing Expense and debit Bank. | `TC-15` | Digital Ad Invoice Recon | **VERIFIED** | — |
| **REQ-HR-01** | HR & Payroll | Emergency mid-month salary advance must register against employee ledger and disburse from Cash Box. | `TC-16` | HR Advance Log Inspection | **VERIFIED** | — |
| **REQ-HR-02** | HR & Payroll | Recovery of salary advance via counter cash must close employee advance record and credit Cash Box. | `TC-07` | Payroll Ledger Clearance | **VERIFIED** | — |
| **REQ-EXP-01** | General Expenses | Commercial office rent and institutional utility invoices paid via bank must generate expense vouchers and debit Bank. | `TC-17`, `TC-19` | Lease Contract & Utility Bill | **VERIFIED** | — |
| **REQ-EXP-02** | General Expenses | Petty cash operational expenses (pantry, office supplies) paid via `Cash Box` must deduct balance, log in Cash Flow, AND post to Payments Journal. | `TC-18`, `TC-20` | Full Double-Entry Audit | **DEFECTIVE** | **BUG-96** |
| **REQ-BANK-01** | Treasury & Banking | Automated bank charges and maintenance fees debited by bank must be logged under Financial/Bank Charges and reduce Bank balance. | `TC-21` | UCB Bank Statement Recon | **VERIFIED** | — |
| **REQ-TRANS-01** | Inter-Account | Internal fund transfers between Bank and Cash must operate as contra entries with zero impact on net system liquidity. | `TC-08` | Contra Voucher & Cash Flow | **VERIFIED** | — |
| **REQ-LEDGER-01**| Financial Parity | System must maintain zero variance across Cash Flow In/Out, General Ledger, and Sum of Active Payment Accounts. | `TC-01` $\dots$ `TC-23` | Mathematical Parity Proof | **CONDITIONAL** | **BUG-96** |
| **REQ-REP-01** | Profit & Loss | Profit & Loss Statement must incorporate all verified operating expenses (matching Cash Flow and Expense Ledger) to compute accurate Net Profit. | `TC-17`, `TC-18` | Cross-Statement Recon | **DEFECTIVE** | **BUG-114** |
| **REQ-REP-02** | Sales Reporting | Sales summary reporting must explicitly break down Gross Sales, Customer Returns, Net Sales, Collections, and Outstanding Dues. | `TC-04`, `TC-05` | Invoicing Sub-ledger | **DEFECTIVE** | **BUG-118** |
| **REQ-REP-03** | Supplier Payments | Supplier payments audit statement must enforce cumulative bounds ($\text{Period Paid} \le \text{All-Time Paid}$) and reconcile with purchases. | `TC-09`, `TC-10` | AP Ledger Recon | **DEFECTIVE** | **BUG-109** |
| **REQ-REP-04** | Cash Movement | Cash Movement report must aggregate all cash inflow streams (Capital, Loans, Returns) and render human-readable type labels. | `TC-01`, `TC-03`, `TC-06` | Treasury Statement Recon | **DEFECTIVE** | **BUG-111** |
| **REQ-REP-05** | Receivables Aging | Receivables aging analysis must accurately track overdue customer invoices with formatted integer day buckets. | `TC-04` | Aging Bucket Verification | **DEFECTIVE** | **BUG-121** |

---

## 3. Requirement Coverage Statistics

```text
+-----------------------------------------------------------------------+
| Metric Description                                      | Value       |
+-----------------------------------------------------------------------+
| Total Core Functional Requirements Mapped               | 26          |
| Total Operational Test Cases Executed                   | 23          |
| Functional Requirements Fully Verified (PASS)           | 19 (73.08%) |
| Functional Requirements Defective / Action Required     | 7 (26.92%)  |
| Closed-Loop Liquidity Parity Coverage                   | 100%        |
+-----------------------------------------------------------------------+
```

---

## 4. Defect Impact Analysis on System Requirements

* **BUG-70 (Severe Cash Flow Discrepancy):** Violates `REQ-LEDGER-01` when transaction hooks fail to update running balances atomically.
* **BUG-76 (Purchase Return Rollback Failure):** Breaches atomicity constraints in inventory and cash ledger transitions.
* **BUG-96 (Payments Journal Missing Vouchers):** Violates `REQ-EXP-02` by leaving sub-ledger cash disbursements unregistered in master payments.
* **BUG-109 (Supplier Payments Paradox):** Violates `REQ-REP-03` by presenting impossible period vs all-time mathematical aggregates.
* **BUG-111 (Cash Movement False Deficit):** Violates `REQ-REP-04` by reporting a ৳ 18,600 deficit when accounts hold ৳ 54,100 surplus.
* **BUG-114 (P&L Zero Expenses):** Violates `REQ-REP-01` by omitting ৳ 6,300 in verified operational expenses, falsifying net income.
* **BUG-118 (Sales Report Return Deduction Paradox):** Violates `REQ-REP-02` through column mislabeling and silent return subtractions.


### Impact of BUG-96 on REQ-EXP-02 & REQ-LEDGER-01
* **Requirement Breach:** `REQ-EXP-02` dictates that every petty cash operational expense must create an auditable voucher in `Finance -> Payments Journal`.
* **Audit Finding:** During execution of `TC-18` (Pantry supplies ৳ 2,500), the UI successfully deducted ৳ 2,500 from `Cash Box`, and the Cash Flow Statement recorded ৳ 2,500 under Operating Activities. However, `Payments Journal` has zero trace of the transaction.
* **Traceability Consequence:** `REQ-LEDGER-01` (Financial Parity) passes numerically ($158,500 - 156,000 = 2,500$), but fails from a statutory audit trail standpoint because the Payments Journal lacks transactional completeness.
