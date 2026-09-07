# Financial Reconciliation Test Cases (TC-01 through TC-26)

> **Execution Suite:** `SUITE-FIN-RECON-01` &nbsp;|&nbsp; **Classification:** QA Lead Audit Baseline  
> **Author & QA Lead:** **Md. Naimur Rahman Apu** ([LinkedIn](https://www.linkedin.com/in/naimur-rahman-apu/) &nbsp;|&nbsp; `@naimuropu-cell`)  
> **Role / Title:** Software QA Engineer & Financial Systems Auditor  
> **Target Environment:** BizPOS / YesSME ERP v2.4 (Live Production & Staging Core)  
> **Audited Modules:** Capital, Loans, POS, Invoicing, Procurement, Fixed Assets, Payroll, Expenses, Banking, and Reports  
> **Zero-Variance Parity Invariant:** $\sum \text{Cash In} - \sum \text{Cash Out} \equiv \text{Net Liquidity} \equiv \sum \text{Active Accounts}$

---

## 1. Master Financial Reconciliation Test Matrix (TC-01 to TC-26)

The matrix below documents the complete suite of 26 financial audit test scenarios executed across the BizPOS / YesSME ERP ecosystem:

| Test Case ID | ERP Module | Scenario & Operational Purpose | Input Data & Method | Expected Accounting State | Actual Result Observed | Parity / Audit Status | Defect Link |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **TC-01** | **Capital Management** | Partner Initial Equity Injection via Bank Deposit | • Account: `NAIMUR`<br>• Inflow: **৳ 95,000**<br>• Method: Bank Deposit | • Bank: ৳ 95,000<br>• Cash: ৳ 0<br>• Net: ৳ 95,000 | Inflow logged; Bank account credited ৳ 95,000; Capital voucher generated. | **PASS** | — |
| **TC-02** | **Capital Management** | Partner Working Capital Cash Float Injection | • Account: `Cash Box`<br>• Inflow: **৳ 15,000**<br>• Method: Cash Vault Deposit | • Bank: ৳ 95,000<br>• Cash: ৳ 15,000<br>• Net: ৳ 110,000 | Inflow logged; Cash Box credited ৳ 15,000; Till receipt voucher generated. | **PASS** | — |
| **TC-03** | **Lender Loans** | Commercial SME Term Loan Disbursement from UCB | • Account: `NAIMUR`<br>• Inflow: **৳ 30,000**<br>• Lender: UCB SME Unit | • Bank: ৳ 125,000<br>• Cash: ৳ 15,000<br>• Net: ৳ 140,000 | Inflow logged; Loan Liability account created; Bank balance credited ৳ 30,000. | **PASS** | — |
| **TC-04** | **Sales & Invoicing** | B2B Wholesale Invoice Settlement via Direct Bank Wire | • Account: `NAIMUR`<br>• Inflow: **৳ 8,000**<br>• Ref: INV-2026-081 | • Bank: ৳ 133,000<br>• Cash: ৳ 15,000<br>• Net: ৳ 148,000 | Invoice marked "Paid"; Bank balance credited ৳ 8,000; Sales Revenue recognized. | **PASS** | — |
| **TC-05** | **Sales & Retail POS** | Retail Counter POS Daily Walk-in Sales Cash Collection | • Account: `Cash Box`<br>• Inflow: **৳ 4,500**<br>• Ref: POS-TILL-014 | • Bank: ৳ 133,000<br>• Cash: ৳ 19,500<br>• Net: ৳ 152,500 | POS session batch closed; Cash Box credited ৳ 4,500; Sales Journal updated. | **PASS** | — |
| **TC-06** | **Personal Loans** | Partial Recovery of Short-term Personal Advance | • Account: `Cash Box`<br>• Inflow: **৳ 3,000**<br>• Ref: REC-PL-003 | • Bank: ৳ 133,000<br>• Cash: ৳ 22,500<br>• Net: ৳ 155,500 | Loan sub-ledger updated; Cash Box credited ৳ 3,000; Asset receivable reduced. | **PASS** | — |
| **TC-07** | **HR & Payroll** | Employee Emergency Salary Advance Cash Repayment | • Account: `Cash Box`<br>• Inflow: **৳ 3,000**<br>• Ref: EMP-ADV-REC-01 | • Bank: ৳ 133,000<br>• Cash: ৳ 25,500<br>• Net: ৳ 158,500 | Staff advance liability cleared; Cash Box credited ৳ 3,000; HR record updated. | **PASS** | — |
| **TC-08** | **Inter-Account Transfer** | Internal Fund Transfer: Bank to Counter Cash Box | • From: `NAIMUR`<br>• To: `Cash Box`<br>• Amount: **৳ 15,000** (Contra) | • Bank: ৳ 118,000<br>• Cash: ৳ 40,500<br>• Net: ৳ 158,500 | Contra entry posted; Bank debited ৳ 15k, Cash credited ৳ 15k; Net unchanged. | **PASS** | — |
| **TC-09** | **Purchasing & Suppliers** | Advance Payment to Primary Packaging Supplier (BEFTN) | • Account: `NAIMUR`<br>• Outflow: **৳ 30,000**<br>• Vendor: Apex Packs Ltd | • Bank: ৳ 88,000<br>• Cash: ৳ 40,500<br>• Net: ৳ 128,500 | Supplier advance ledger debited; Bank balance reduced by ৳ 30,000; Voucher sync OK. | **PASS** | — |
| **TC-10** | **Purchasing & Suppliers** | Spot Cash Advance Payment to Local Raw Material Vendor | • Account: `Cash Box`<br>• Outflow: **৳ 8,000**<br>• Vendor: Standard Bags | • Bank: ৳ 88,000<br>• Cash: ৳ 32,500<br>• Net: ৳ 120,500 | Cash Box debited ৳ 8,000; Vendor pre-payment credit registered. | **PASS** | — |
| **TC-11** | **Fixed Assets** | Procurement of Core ERP Server Hardware & POS Terminals | • Account: `NAIMUR`<br>• Outflow: **৳ 25,000**<br>• Payee: Tech World BD | • Bank: ৳ 63,000<br>• Cash: ৳ 32,500<br>• Net: ৳ 95,500 | Fixed Asset Register updated; Capital asset capitalized; Bank debited ৳ 25,000. | **PASS** | — |
| **TC-12** | **Fixed Assets** | Office Air Conditioning Routine Servicing & Maintenance | • Account: `Cash Box`<br>• Outflow: **৳ 3,500**<br>• Payee: CoolAir Services | • Bank: ৳ 63,000<br>• Cash: ৳ 29,000<br>• Net: ৳ 92,000 | Asset Maintenance expense recognized; Cash Box debited ৳ 3,500. | **PASS** | — |
| **TC-13** | **Lender Loans** | Monthly SME Term Loan EMI Debit (Principal + Interest) | • Account: `NAIMUR`<br>• Outflow: **৳ 12,000**<br>• Lender: UCB SME Unit | • Bank: ৳ 51,000<br>• Cash: ৳ 29,000<br>• Net: ৳ 80,000 | Loan liability reduced; Interest expense booked; Bank balance debited ৳ 12,000. | **PASS** | — |
| **TC-14** | **Personal Loans** | Disbursement of Short-term Personal Advance to Staff | • Account: `Cash Box`<br>• Outflow: **৳ 5,000**<br>• Beneficiary: Staff member | • Bank: ৳ 51,000<br>• Cash: ৳ 24,000<br>• Net: ৳ 75,000 | Personal advance asset opened; Cash Box debited ৳ 5,000. | **PASS** | — |
| **TC-15** | **Marketing & Ads** | Meta Facebook Ads Campaign Spend (Digital Settlement) | • Account: `NAIMUR`<br>• Outflow: **৳ 12,000**<br>• Merchant: Meta Ads Inc | • Bank: ৳ 39,000<br>• Cash: ৳ 24,000<br>• Net: ৳ 63,000 | Advertising expense recognized; Bank account debited ৳ 12,000. | **PASS** | — |
| **TC-16** | **HR & Payroll** | Mid-Month Emergency Salary Advance to Warehouse Staff | • Account: `Cash Box`<br>• Outflow: **৳ 6,000**<br>• Beneficiary: WH-Staff 02 | • Bank: ৳ 39,000<br>• Cash: ৳ 18,000<br>• Net: ৳ 57,000 | Employee ledger updated with advance tag; Cash Box debited ৳ 6,000. | **PASS** | — |
| **TC-17** | **General Expenses** | Corporate Head Office Monthly Commercial Rent | • Account: `NAIMUR`<br>• Outflow: **৳ 20,000**<br>• Payee: Tower Properties | • Bank: ৳ 19,000<br>• Cash: ৳ 18,000<br>• Net: ৳ 37,000 | Rent expense booked; Bank balance debited ৳ 20,000; Payment voucher logged. | **PASS** | — |
| **TC-18** | **General Expenses** | Office Pantry Supplies & Operational Refreshments | • Account: `Cash Box`<br>• Outflow: **৳ 2,500**<br>• Payee: Daily Mart | • Bank: ৳ 19,000<br>• Cash: ৳ 15,500<br>• Net: ৳ 34,500 | **Cash deducted & Cash Flow updated, BUT missing in Payments Journal!** | **FAIL** | [**BUG-96**](04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md) |
| **TC-19** | **General Expenses** | Monthly Commercial Electricity & DESCO Utility Bill | • Account: `NAIMUR`<br>• Outflow: **৳ 4,000**<br>• Payee: DESCO Utility | • Bank: ৳ 15,000<br>• Cash: ৳ 15,500<br>• Net: ৳ 30,500 | Utility expense recognized; Bank balance debited ৳ 4,000; Voucher synced. | **PASS** | — |
| **TC-20** | **General Expenses** | High-Speed Fiber Internet Broadband Monthly Bill | • Account: `Cash Box`<br>• Outflow: **৳ 1,500**<br>• Payee: MetroNet ISP | • Bank: ৳ 15,000<br>• Cash: ৳ 14,000<br>• Net: ৳ 29,000 | Communication expense booked; Cash Box debited ৳ 1,500. | **PASS** | — |
| **TC-21** | **Banking & Charges** | UCB Corporate Account Maintenance & SMS Alert Fee | • Account: `NAIMUR`<br>• Outflow: **৳ 500**<br>• Payee: UCB Fee Debit | • Bank: ৳ 14,500<br>• Cash: ৳ 14,000<br>• Net: ৳ 28,500 | Bank charges recognized; Bank balance debited ৳ 500; Automated bank debit. | **PASS** | — |
| **TC-22** | **Capital Management** | Partner Monthly Personal Drawings / Capital Withdrawal | • Account: `NAIMUR`<br>• Outflow: **৳ 13,000**<br>• Beneficiary: Partner 01 | • Bank: ৳ 1,500<br>• Cash: ৳ 14,000<br>• Net: ৳ 15,500 | Equity Drawings account debited; Bank balance debited ৳ 13,000. | **PASS** | — |
| **TC-23** | **Purchasing & Expenses** | Urgent Packaging Tape, Logistics & Counter Consumables | • Account: `Cash Box`<br>• Outflow: **৳ 13,000**<br>• Payee: Counter Vendors | • Bank: ৳ 1,500<br>• Cash: ৳ 1,000<br>• Net: ৳ 2,500 | Operating supplies recognized; Cash Box debited ৳ 13,000; Final balance ৳ 1,000. | **PASS** | — |
| **TC-24** | **Financial Reports (P&L)** | Operating Expenses Dynamic Reconciliation vs Paid Vouchers | • Route: `/admin/reports/profit-loss`<br>• Compare vs: `/admin/expenses` | • Operating Expenses = **৳ 6,300.00**<br>• Net Profit = **৳ 24,300.00**<br>• Net Margin = 16.09% | **P&L hardcodes Operating Expenses to (৳ 0)**.<br>Net Profit is falsely stated as ৳ 30,600 (inflated by ৳ 6,300). | **FAIL** | [**BUG-114**](04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md) |
| **TC-25** | **Financial Reports (AP)** | Supplier Payments Cumulative Invariant ($\text{Period} \le \text{All-Time}$) | • Route: `/admin/reports/supplier-payments`<br>• Compare vs: `/admin/purchases` | • All-Time Paid $\ge$ Period Paid<br>• All-Time Paid = **৳ 193,100.00**<br>• Purchases = **৳ 183,000.00** | **Period Paid (৳ 193,100) > All-Time Paid (৳ 178,100)**.<br>Query omits advances in All-Time query; ৳ 5k in purchases dropped. | **FAIL** | [**BUG-109**](04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md) |
| **TC-26** | **Financial Reports (Sales)** | Sales Report Return Deduction & Reconciliation Invariance | • Route: `/admin/reports/sales`<br>• Compare vs: `/admin/sale-returns` | • Gross Sales = **৳ 151,000.00**<br>• Returns = **৳ 25,500.00**<br>• Net Sales = **৳ 125,500.00** | **Column header labeled "Total Sales" shows ৳ 125,500**.<br>Contradicts Collected (৳ 136k) + Due (৳ 15k) without Returns column. | **FAIL** | [**BUG-118**](04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md) |

---

## 2. Granular Step-by-Step Ledger Balance Trace (TC-01 to TC-23)

```text
Step 00 [BASE-INIT] : NAIMUR = ৳      0.00 | Cash Box = ৳      0.00 | System Net = ৳      0.00
Step 01 [TC-01    ] : NAIMUR = ৳ 95,000.00 | Cash Box = ৳      0.00 | System Net = ৳ 95,000.00
Step 02 [TC-02    ] : NAIMUR = ৳ 95,000.00 | Cash Box = ৳ 15,000.00 | System Net = ৳ 110,000.00
Step 03 [TC-03    ] : NAIMUR = ৳ 125,000.00 | Cash Box = ৳ 15,000.00 | System Net = ৳ 140,000.00
Step 04 [TC-04    ] : NAIMUR = ৳ 133,000.00 | Cash Box = ৳ 15,000.00 | System Net = ৳ 148,000.00
Step 05 [TC-05    ] : NAIMUR = ৳ 133,000.00 | Cash Box = ৳ 19,500.00 | System Net = ৳ 152,500.00
Step 06 [TC-06    ] : NAIMUR = ৳ 133,000.00 | Cash Box = ৳ 22,500.00 | System Net = ৳ 155,500.00
Step 07 [TC-07    ] : NAIMUR = ৳ 133,000.00 | Cash Box = ৳ 25,500.00 | System Net = ৳ 158,500.00
----------------------------------------- [TRANSFER] -----------------------------------------
Step 08 [TC-08    ] : NAIMUR = ৳ 118,000.00 | Cash Box = ৳ 40,500.00 | System Net = ৳ 158,500.00
----------------------------------------- [OUTFLOWS] -----------------------------------------
Step 09 [TC-09    ] : NAIMUR = ৳ 88,000.00 | Cash Box = ৳ 40,500.00 | System Net = ৳ 128,500.00
Step 10 [TC-10    ] : NAIMUR = ৳ 88,000.00 | Cash Box = ৳ 32,500.00 | System Net = ৳ 120,500.00
Step 11 [TC-11    ] : NAIMUR = ৳ 63,000.00 | Cash Box = ৳ 32,500.00 | System Net = ৳ 95,500.00
Step 12 [TC-12    ] : NAIMUR = ৳ 63,000.00 | Cash Box = ৳ 29,000.00 | System Net = ৳ 92,000.00
Step 13 [TC-13    ] : NAIMUR = ৳ 51,000.00 | Cash Box = ৳ 29,000.00 | System Net = ৳ 80,000.00
Step 14 [TC-14    ] : NAIMUR = ৳ 51,000.00 | Cash Box = ৳ 24,000.00 | System Net = ৳ 75,000.00
Step 15 [TC-15    ] : NAIMUR = ৳ 39,000.00 | Cash Box = ৳ 24,000.00 | System Net = ৳ 63,000.00
Step 16 [TC-16    ] : NAIMUR = ৳ 39,000.00 | Cash Box = ৳ 18,000.00 | System Net = ৳ 57,000.00
Step 17 [TC-17    ] : NAIMUR = ৳ 19,000.00 | Cash Box = ৳ 18,000.00 | System Net = ৳ 37,000.00
Step 18 [TC-18    ] : NAIMUR = ৳ 19,000.00 | Cash Box = ৳ 15,500.00 | System Net = ৳ 34,500.00 (BUG-96)
Step 19 [TC-19    ] : NAIMUR = ৳ 15,000.00 | Cash Box = ৳ 15,500.00 | System Net = ৳ 30,500.00
Step 20 [TC-20    ] : NAIMUR = ৳ 15,000.00 | Cash Box = ৳ 14,000.00 | System Net = ৳ 29,000.00
Step 21 [TC-21    ] : NAIMUR = ৳ 14,500.00 | Cash Box = ৳ 14,000.00 | System Net = ৳ 28,500.00
Step 22 [TC-22    ] : NAIMUR = ৳  1,500.00 | Cash Box = ৳ 14,000.00 | System Net = ৳ 15,500.00
Step 23 [TC-23    ] : NAIMUR = ৳  1,500.00 | Cash Box = ৳  1,000.00 | System Net = ৳  2,500.00
```

---

## 3. Financial Reconciliation Final Proof

* **Total External Cash Inflows:**  
  $$95,000 + 15,000 + 30,000 + 8,000 + 4,500 + 3,000 + 3,000 = \mathbf{৳\ 158,500.00}$$
* **Total External Cash Outflows:**  
  $$30,000 + 8,000 + 25,000 + 3,500 + 12,000 + 5,000 + 12,000 + 6,000 + 20,000 + 2,500 + 4,000 + 1,500 + 500 + 13,000 + 13,000 = \mathbf{৳\ 156,000.00}$$
* **Net Audited System Balance:**  
  $$\text{Cash In } (158,500) - \text{Cash Out } (156,000) = \mathbf{+৳\ 2,500.00}$$
* **Sum of Active Payment Accounts:**  
  $$\text{Account } \mathtt{NAIMUR}\ (1,500) + \text{Account } \mathtt{Cash\ Box}\ (1,000) = \mathbf{+৳\ 2,500.00}$$
* **Reconciliation Variance:**  
  $$\Delta = 2,500.00 - 2,500.00 = \mathbf{৳\ 0.00\ (Zero\ Variance)}$$

---

## 4. QA Lead Audit Findings on Reporting Scenarios (TC-24 to TC-26)

1. **TC-24 (P&L Operating Expense Leak):**  
   The Profit & Loss statement omits operating expenses entirely ($E = ৳\ 0$), directly violating the matching principle and inflating Net Profit by ৳ 6,300.00.
2. **TC-25 (Supplier Payments Inversion Paradox):**  
   The query for periodic vendor payments includes advances while the all-time query excludes them, producing the logically impossible condition $\text{Period Paid } (৳\ 193,100) > \text{All-Time Paid } (৳\ 178,100)$.
3. **TC-26 (Sales Netting Ambiguity):**  
   Silently subtracting customer returns from the "Total Sales" header without a Returns column causes the column to understate cash collected ($৳\ 125,500 < ৳\ 136,000$), confusing finance stakeholders.

---

> **Companion Spreadsheets:**  
> • [Financial_Reconciliation_Cases.xlsx](Financial_Reconciliation_Cases.xlsx) (OpenXML workbook with formulas & conditional formatting)  
> • [Financial_Reconciliation_Cases.csv](Financial_Reconciliation_Cases.csv) (Jira / TestRail / TMS import format)
