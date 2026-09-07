# Requirements Traceability Matrix (RTM): BizPOS ERP

> **Document Identifier:** `RTM-BIZPOS-FIN-001` &nbsp;|&nbsp; **Version:** `3.0-LEAD-AUDIT`  
> **Author & QA Lead:** **Md. Naimur Rahman Apu** ([LinkedIn](https://www.linkedin.com/in/naimur-rahman-apu/) &nbsp;|&nbsp; `@naimuropu-cell`)  
> **Role / Title:** Software QA Engineer & Financial Systems Auditor  
> **Scope:** Bidirectional Traceability: Business Requirements $\longleftrightarrow$ Test Cases (TC-01..26) $\longleftrightarrow$ Defect Specs $\longleftrightarrow$ Backend Controllers  
> **Standard:** IEEE 829 / ISO 29119 Quality Assurance Traceability Standards

---

## 1. Governance & Document Sign-Off

| Stakeholder Role | Name | Department | Approval Status | Sign-Off Date |
| :--- | :--- | :--- | :---: | :---: |
| **QA Lead & Systems Auditor** | **Md. Naimur Rahman Apu** | Quality Engineering & Audit | **APPROVED** | 08 Sep 2026 |
| **Lead Backend Architect** | Architecture Lead | Core Engineering | **REVIEWED** | 08 Sep 2026 |
| **Financial Controller** | Head of Corporate Finance | Treasury & Audit | **CERTIFIED** | 08 Sep 2026 |

---

## 2. Bidirectional Traceability Matrix

This matrix establishes 100% forward and backward traceability across the BizPOS / YesSME ERP suite:

| Req ID | Module Head | Functional & Accounting Requirement Specification | Criticality | Mapped Test Case(s) | Backend Controller & DB Target | Execution Status | Defect Link |
| :--- | :--- | :--- | :---: | :---: | :--- | :---: | :---: |
| **REQ-CAP-01** | Capital | System must credit Owner's Equity and debit active Asset Accounts upon partner equity capital injection. | `Critical` | `TC-01`, `TC-02` | `Accounting/InvestmentController`<br>`investments`, `payment_accounts` | **VERIFIED** | — |
| **REQ-CAP-02** | Capital | Partner equity withdrawals must deduct from active payment accounts and debit Partner Drawings sub-ledger. | `Critical` | `TC-22` | `Accounting/InvestmentController`<br>`investments`, `cash_flows` | **VERIFIED** | — |
| **REQ-LOAN-01** | Loans | Commercial term loan disbursement must recognize liability and credit designated corporate bank account. | `Critical` | `TC-03` | `LoanController@disburse`<br>`loans`, `payment_accounts` | **VERIFIED** | — |
| **REQ-LOAN-02** | Loans | Monthly loan EMI debit must split between Principal (reducing liability) and Interest expense, debiting Bank. | `High` | `TC-13` | `LoanController@repay`<br>`loan_payments`, `cash_flows` | **VERIFIED** | — |
| **REQ-PLOAN-01**| Personal Loans | Short-term staff loans disbursed from Cash Box must create receivable sub-ledger under Current Assets. | `High` | `TC-14` | `PersonalLoanController`<br>`personal_loans`, `cash_flows` | **VERIFIED** | — |
| **REQ-PLOAN-02**| Personal Loans | Loan recovery must increment payment account (`Cash Box`) and reduce borrower receivable balance. | `High` | `TC-06` | `PersonalLoanController`<br>`personal_loans`, `payment_accounts` | **VERIFIED** | — |
| **REQ-SALES-01**| Sales / B2B | Wholesale invoice settlements via bank transfer must mark invoice PAID and credit bank ledger. | `Critical` | `TC-04` | `SaleController@settle`<br>`sales`, `payments` | **VERIFIED** | — |
| **REQ-SALES-02**| Sales / POS | Counter POS retail cash sales must increment till float (`Cash Box`) and log in sales register. | `Critical` | `TC-05` | `PosController@checkout`<br>`sales`, `pos_registers` | **VERIFIED** | — |
| **REQ-PURCH-01**| Purchases | Vendor advance wire payments (BEFTN) must debit Supplier Advance account without requiring instant PO match. | `Critical` | `TC-09` | `PurchaseController@advance`<br>`supplier_advances`, `payments` | **VERIFIED** | — |
| **REQ-PURCH-02**| Purchases | Spot raw material cash advances must deduct from `Cash Box` and generate unallocated vendor credit. | `High` | `TC-10` | `PurchaseController@advance`<br>`supplier_advances`, `cash_flows` | **VERIFIED** | — |
| **REQ-PURCH-03**| Purchases | Consumables & urgent courier logistics payments must debit operational expense and credit Cash Box. | `Medium` | `TC-23` | `PurchaseController`<br>`purchases`, `payment_accounts` | **VERIFIED** | — |
| **REQ-ASSET-01**| Fixed Assets | Equipment acquisitions exceeding capitalization limit must capitalize to Fixed Asset Register. | `High` | `TC-11` | `AssetController@store`<br>`assets`, `payment_accounts` | **VERIFIED** | — |
| **REQ-ASSET-02**| Fixed Assets | Routine asset servicing & repairs below capitalization limit must be expensed directly through Cash/Bank. | `Medium` | `TC-12` | `AssetController@maintenance`<br>`asset_maintenances`, `cash_flows` | **VERIFIED** | — |
| **REQ-MKT-01** | Marketing | Digital campaign ad spend debited via bank card must be recognized under Marketing Expense. | `High` | `TC-15` | `AdSpendController@store`<br>`ad_spends`, `payment_accounts` | **VERIFIED** | — |
| **REQ-HR-01**   | HR / Payroll | Emergency mid-month staff salary advances must log against employee ledger and disburse from Cash Box. | `High` | `TC-16` | `PayrollController@advance`<br>`employee_advances`, `cash_flows` | **VERIFIED** | — |
| **REQ-HR-02**   | HR / Payroll | Recovery of salary advance via counter cash must clear employee advance record and credit Cash Box. | `High` | `TC-07` | `PayrollController@recovery`<br>`employee_advances`, `payments` | **VERIFIED** | — |
| **REQ-EXP-01**  | Expenses | Commercial facility rent and utility bills paid via bank must generate expense vouchers and debit Bank. | `Critical` | `TC-17`, `TC-19` | `ExpenseController@store`<br>`expenses`, `payment_accounts` | **VERIFIED** | — |
| **REQ-EXP-02**  | Expenses | Petty cash operational expenses paid from Cash Box must deduct balance AND post to Payments Journal. | `Critical` | `TC-18`, `TC-20` | `ExpenseController@store`<br>`expenses`, `payments` | **DEFECTIVE** | [**BUG-96**](04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md) |
| **REQ-BANK-01** | Banking | Automated bank charges and maintenance levies must be booked under Bank Charges and reduce Bank balance. | `Medium` | `TC-21` | `PaymentAccountController`<br>`bank_charges`, `payment_accounts` | **VERIFIED** | — |
| **REQ-TRANS-01**| Treasury | Inter-account fund transfers must operate as contra entries with zero impact on consolidated system liquidity. | `Critical` | `TC-08` | `BalanceTransferController`<br>`balance_transfers` | **VERIFIED** | — |
| **REQ-LEDGER-01**| Parity | System must enforce closed-loop zero variance: $\sum \text{Cash In} - \sum \text{Cash Out} \equiv \sum \text{Accounts}$. | `Critical` | `TC-01`..`TC-23` | Core Liquidity Architecture<br>`cash_flows`, `payment_accounts` | **CONDITIONAL** | [**BUG-70**](04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md), [**BUG-76**](04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md) |
| **REQ-REP-01** | Reporting | Profit & Loss statement must dynamically deduct all verified Paid operating expenses from Gross Profit. | `Critical` | `TC-24` | `ReportController@profitLoss`<br>`expenses`, `sale_items` | **DEFECTIVE** | [**BUG-114**](04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md) |
| **REQ-REP-02** | Reporting | Sales summary reporting must explicitly break down Gross Sales, Customer Returns, Net Sales, Collections, & Dues. | `High` | `TC-26` | `ReportController@sales`<br>`sales`, `sale_returns` | **DEFECTIVE** | [**BUG-118**](04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md) |
| **REQ-REP-03** | Reporting | Supplier payments audit statement must enforce cumulative bounds ($\text{Period Paid} \le \text{All-Time Paid}$). | `Critical` | `TC-25` | `ReportController@supplierPayments`<br>`purchases`, `payments` | **DEFECTIVE** | [**BUG-109**](04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md) |
| **REQ-REP-04** | Reporting | Cash Movement report must aggregate all cash inflow streams (Equity, Loans, Returns) and format enums. | `High` | `TC-01`, `03`, `06` | `ReportController@cashMovement`<br>`payments`, `cash_flows` | **DEFECTIVE** | [**BUG-111**](04-bug-reports/Bug-111_Cash_Movement_False_Deficit.md) |
| **REQ-REP-05** | Reporting | Receivables aging analysis must accurately track overdue customer invoices with formatted integer day buckets. | `Medium` | `TC-04` | `ReportController@receivablesAging`<br>`sales` | **DEFECTIVE** | [**BUG-121**](04-bug-reports/ALL_DEFECTS_LOG.md) |

---

## 3. Requirement Coverage Statistics & Quality Health

```text
+----------------------------------------------------------------------------------------------------+
|                                    REQUIREMENTS COVERAGE METRICS                                   |
+----------------------------------------------------------------------------------------------------+
| Total Functional Requirements Defined & Mapped          : 26 Requirements                          |
| Total Operational Test Cases Executed                   : 26 Scenarios (TC-01 through TC-26)       |
| Total Accounting & Reporting Defect Links Mapped        : 7 Critical Forensic Bugs                 |
| Requirements Fully Verified (PASS)                      : 19 (73.08%)                              |
| Requirements Defective / Action Required                : 7 (26.92%)                               |
| Test Coverage Density                                   : 100.00% (Every Req has >= 1 Test Case)   |
| Closed-Loop Liquidity Parity Coverage                   : 100.00%                                  |
+----------------------------------------------------------------------------------------------------+
```

### Criticality Distribution Breakdown:
* **Critical Tier (11 Requirements):** 7 Verified (63.6%), 4 Defective (`BUG-96`, `BUG-70/76`, `BUG-114`, `BUG-109`).
* **High Tier (11 Requirements):** 9 Verified (81.8%), 2 Defective (`BUG-118`, `BUG-111`).
* **Medium Tier (4 Requirements):** 3 Verified (75.0%), 1 Defective (`BUG-121`).

---

## 4. Defect Impact Analysis on System Requirements

### 4.1 Impact of BUG-114 on REQ-REP-01 (Profit & Loss Omission)
* **Requirement:** `REQ-REP-01` mandates that operating expenses incurred during an accounting period must deduct from Gross Profit on the P&L statement.
* **Audit Finding (`TC-24`):** The live P&L statement displays `Less: Operating Expenses (৳ 0)`. Cash Flow and the Expense Ledger verify that **৳ 6,300.00** was disbursed for approved utility and operational expenses.
* **Consequence:** Net Profit is falsely stated at ৳ 30,600.00 instead of ৳ 24,300.00, generating incorrect tax liability calculations.

### 4.2 Impact of BUG-109 on REQ-REP-03 (Supplier Payments Invariant)
* **Requirement:** `REQ-REP-03` dictates that periodic vendor disbursements cannot exceed lifetime disbursements ($\text{Period Paid} \le \text{All-Time Paid}$).
* **Audit Finding (`TC-25`):** The supplier report outputs $\text{Period Paid } (৳\ 193,100) > \text{All-Time Paid } (৳\ 178,100)$.
* **Consequence:** The query join architecture includes advance vouchers in the periodic query but drops them from the all-time calculation, producing an impossible financial statement.

### 4.3 Impact of BUG-96 on REQ-EXP-02 (Payments Journal Audit Trail)
* **Requirement:** `REQ-EXP-02` dictates that every cash expenditure must generate a double-entry payment voucher in `Finance -> Payments Journal`.
* **Audit Finding (`TC-18`):** Disbursing ৳ 2,500 from `Cash Box` for pantry supplies successfully deducted cash and updated Cash Flow, but completely bypassed the master Payments Journal.
* **Consequence:** Breaks double-entry general ledger completeness, failing external statutory audits.

---

## 5. QA Lead Sign-Off & Release Recommendation

Based on the RTM analysis, the system achieves **100% test coverage density**, but **7 requirements remain in a DEFECTIVE state** due to high-severity accounting defects (`BUG-96`, `BUG-109`, `BUG-111`, `BUG-114`, `BUG-118`).

> [!CAUTION]
> **QA Lead Release Recommendation: CONDITIONAL BLOCK**  
> Core transactional liquidity maintains parity ($\Phi = 0.00$), but the build cannot be certified for statutory production release until the development team merges hotfixes for `BUG-114` (P&L expense query) and `BUG-109` (supplier payment invariant).

*Audited and Certified by:*  
**Md. Naimur Rahman Apu**  
Software QA Engineer & Financial Systems Quality Auditor  
*BizPOS QA Governance Board* &nbsp;|&nbsp; [LinkedIn Profile](https://www.linkedin.com/in/naimur-rahman-apu/)
