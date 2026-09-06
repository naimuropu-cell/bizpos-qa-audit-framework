# Financial Reconciliation Test Cases (TC-01 through TC-23)

> **Execution Suite:** `SUITE-FIN-RECON-01`  
> **Target Environment:** BizPOS / YesSME ERP (Pre-Production Build v2.4)  
> **Audited Payment Accounts:** `NAIMUR` (UCB Bank Account) & `Cash Box` (Counter Cash)  
> **Cumulative Parity Rule:** $\sum \text{Cash In} (158,500) - \sum \text{Cash Out} (156,000) = \text{Net Balance} (+2,500) \equiv \sum \text{Accounts} (1,500 + 1,000)$

---

## 1. Primary Operational Reconciliation Table

The table below records the execution results for the 23 baseline financial transactions tested in chronological sequence:

| Test Case ID | Module | Scenario & Operational Purpose | Input Data & Method | Expected Balance State | Actual Result | Parity Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | **Capital Management** | Initial Equity Injection by Partner into Bank Account | • Account: `NAIMUR`<br>• Inflow: **৳ 95,000**<br>• Method: Bank Deposit | • Bank: ৳ 95,000<br>• Cash: ৳ 0<br>• Net: ৳ 95,000 | Inflow logged; Bank account credited ৳ 95,000; Capital voucher generated. | **PASS** |
| **TC-02** | **Capital Management** | Initial Cash Float Working Capital Injection | • Account: `Cash Box`<br>• Inflow: **৳ 15,000**<br>• Method: Cash Vault Deposit | • Bank: ৳ 95,000<br>• Cash: ৳ 15,000<br>• Net: ৳ 110,000 | Inflow logged; Cash Box credited ৳ 15,000; Till receipt voucher generated. | **PASS** |
| **TC-03** | **Lender Loans** | Commercial SME Term Loan Disbursement from UCB | • Account: `NAIMUR`<br>• Inflow: **৳ 30,000**<br>• Lender: UCB SME Unit | • Bank: ৳ 125,000<br>• Cash: ৳ 15,000<br>• Net: ৳ 140,000 | Inflow logged; Loan Liability account created; Bank balance credited ৳ 30,000. | **PASS** |
| **TC-04** | **Sales & Invoicing** | B2B Wholesale Invoice Settlement via Direct Bank Wire | • Account: `NAIMUR`<br>• Inflow: **৳ 8,000**<br>• Ref: INV-2026-081 | • Bank: ৳ 133,000<br>• Cash: ৳ 15,000<br>• Net: ৳ 148,000 | Invoice marked "Paid"; Bank balance credited ৳ 8,000; Sales Revenue recognized. | **PASS** |
| **TC-05** | **Sales & Retail POS** | Walk-in Retail POS Daily Counter Sales Cash Collection | • Account: `Cash Box`<br>• Inflow: **৳ 4,500**<br>• Ref: POS-TILL-014 | • Bank: ৳ 133,000<br>• Cash: ৳ 19,500<br>• Net: ৳ 152,500 | POS session batch closed; Cash Box credited ৳ 4,500; Sales Journal updated. | **PASS** |
| **TC-06** | **Personal Loans** | Partial Recovery of Short-term Personal Advance | • Account: `Cash Box`<br>• Inflow: **৳ 3,000**<br>• Ref: REC-PL-003 | • Bank: ৳ 133,000<br>• Cash: ৳ 22,500<br>• Net: ৳ 155,500 | Loan sub-ledger updated; Cash Box credited ৳ 3,000; Asset receivable reduced. | **PASS** |
| **TC-07** | **HR & Payroll** | Employee Emergency Salary Advance Cash Repayment | • Account: `Cash Box`<br>• Inflow: **৳ 3,000**<br>• Ref: EMP-ADV-REC-01 | • Bank: ৳ 133,000<br>• Cash: ৳ 25,500<br>• Net: ৳ 158,500 | Staff advance liability cleared; Cash Box credited ৳ 3,000; HR record updated. | **PASS** |
| **TC-08** | **Inter-Account Transfer** | Internal Fund Transfer: Bank to Counter Cash Box | • From: `NAIMUR`<br>• To: `Cash Box`<br>• Amount: **৳ 15,000** (Contra) | • Bank: ৳ 118,000<br>• Cash: ৳ 40,500<br>• Net: ৳ 158,500 | Contra entry posted; Bank debited ৳ 15k, Cash credited ৳ 15k; Net unchanged. | **PASS** |
| **TC-09** | **Purchasing & Suppliers** | Advance Payment to Primary Packaging Supplier (BEFTN) | • Account: `NAIMUR`<br>• Outflow: **৳ 30,000**<br>• Vendor: Apex Packs Ltd | • Bank: ৳ 88,000<br>• Cash: ৳ 40,500<br>• Net: ৳ 128,500 | Supplier advance ledger debited; Bank balance reduced by ৳ 30,000; Voucher sync OK. | **PASS** |
| **TC-10** | **Purchasing & Suppliers** | Spot Cash Advance Payment to Local Raw Material Vendor | • Account: `Cash Box`<br>• Outflow: **৳ 8,000**<br>• Vendor: Standard Bags | • Bank: ৳ 88,000<br>• Cash: ৳ 32,500<br>• Net: ৳ 120,500 | Cash Box debited ৳ 8,000; Vendor pre-payment credit registered. | **PASS** |
| **TC-11** | **Fixed Assets** | Procurement of Core ERP Server Hardware & POS Terminals | • Account: `NAIMUR`<br>• Outflow: **৳ 25,000**<br>• Payee: Tech World BD | • Bank: ৳ 63,000<br>• Cash: ৳ 32,500<br>• Net: ৳ 95,500 | Fixed Asset Register updated; Capital asset capitalized; Bank debited ৳ 25,000. | **PASS** |
| **TC-12** | **Fixed Assets** | Office Air Conditioning Routine Servicing & Maintenance | • Account: `Cash Box`<br>• Outflow: **৳ 3,500**<br>• Payee: CoolAir Services | • Bank: ৳ 63,000<br>• Cash: ৳ 29,000<br>• Net: ৳ 92,000 | Asset Maintenance expense recognized; Cash Box debited ৳ 3,500. | **PASS** |
| **TC-13** | **Lender Loans** | Monthly SME Term Loan EMI Debit (Principal + Interest) | • Account: `NAIMUR`<br>• Outflow: **৳ 12,000**<br>• Lender: UCB SME Unit | • Bank: ৳ 51,000<br>• Cash: ৳ 29,000<br>• Net: ৳ 80,000 | Loan liability reduced; Interest expense booked; Bank balance debited ৳ 12,000. | **PASS** |
| **TC-14** | **Personal Loans** | Disbursement of Short-term Personal Advance to Staff | • Account: `Cash Box`<br>• Outflow: **৳ 5,000**<br>• Beneficiary: Staff member | • Bank: ৳ 51,000<br>• Cash: ৳ 24,000<br>• Net: ৳ 75,000 | Personal advance asset opened; Cash Box debited ৳ 5,000. | **PASS** |
| **TC-15** | **Marketing & Ads** | Meta Facebook Ads Campaign Spend (Digital Settlement) | • Account: `NAIMUR`<br>• Outflow: **৳ 12,000**<br>• Merchant: Meta Ads Inc | • Bank: ৳ 39,000<br>• Cash: ৳ 24,000<br>• Net: ৳ 63,000 | Advertising expense recognized; Bank account debited ৳ 12,000. | **PASS** |
| **TC-16** | **HR & Payroll** | Mid-Month Emergency Salary Advance to Warehouse Staff | • Account: `Cash Box`<br>• Outflow: **৳ 6,000**<br>• Beneficiary: WH-Staff 02 | • Bank: ৳ 39,000<br>• Cash: ৳ 18,000<br>• Net: ৳ 57,000 | Employee ledger updated with advance tag; Cash Box debited ৳ 6,000. | **PASS** |
| **TC-17** | **General Expenses** | Corporate Head Office Monthly Commercial Rent | • Account: `NAIMUR`<br>• Outflow: **৳ 20,000**<br>• Payee: Tower Properties | • Bank: ৳ 19,000<br>• Cash: ৳ 18,000<br>• Net: ৳ 37,000 | Rent expense booked; Bank balance debited ৳ 20,000; Payment voucher logged. | **PASS** |
| **TC-18** | **General Expenses** | Office Pantry Supplies & Operational Refreshments | • Account: `Cash Box`<br>• Outflow: **৳ 2,500**<br>• Payee: Daily Mart | • Bank: ৳ 19,000<br>• Cash: ৳ 15,500<br>• Net: ৳ 34,500 | **Cash deducted & Cash Flow updated, BUT missing in Payments Journal!** | **FAIL (BUG-96)** |
| **TC-19** | **General Expenses** | Monthly Commercial Electricity & DESCO Utility Bill | • Account: `NAIMUR`<br>• Outflow: **৳ 4,000**<br>• Payee: DESCO Utility | • Bank: ৳ 15,000<br>• Cash: ৳ 15,500<br>• Net: ৳ 30,500 | Utility expense recognized; Bank balance debited ৳ 4,000; Voucher synced. | **PASS** |
| **TC-20** | **General Expenses** | High-Speed Fiber Internet Broadband Monthly Bill | • Account: `Cash Box`<br>• Outflow: **৳ 1,500**<br>• Payee: MetroNet ISP | • Bank: ৳ 15,000<br>• Cash: ৳ 14,000<br>• Net: ৳ 29,000 | Communication expense booked; Cash Box debited ৳ 1,500. | **PASS** |
| **TC-21** | **Banking & Charges** | UCB Corporate Account Maintenance & SMS Alert Fee | • Account: `NAIMUR`<br>• Outflow: **৳ 500**<br>• Payee: UCB Fee Debit | • Bank: ৳ 14,500<br>• Cash: ৳ 14,000<br>• Net: ৳ 28,500 | Bank charges recognized; Bank balance debited ৳ 500; Automated bank debit. | **PASS** |
| **TC-22** | **Capital Management** | Partner Monthly Personal Drawings / Capital Withdrawal | • Account: `NAIMUR`<br>• Outflow: **৳ 13,000**<br>• Beneficiary: Partner 01 | • Bank: ৳ 1,500<br>• Cash: ৳ 14,000<br>• Net: ৳ 15,500 | Equity Drawings account debited; Bank balance debited ৳ 13,000. | **PASS** |
| **TC-23** | **Purchasing & Expenses** | Urgent Packaging Tape, Logistics & Counter Consumables | • Account: `Cash Box`<br>• Outflow: **৳ 13,000**<br>• Payee: Counter Vendors | • Bank: ৳ 1,500<br>• Cash: ৳ 1,000<br>• Net: ৳ 2,500 | Operating supplies recognized; Cash Box debited ৳ 13,000; Final balance ৳ 1,000. | **PASS** |

---

## 2. Granular Step-by-Step Ledger Balance Trace

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

## 4. Auditor's Operational Observations

1. **Liquidity Buffer Adequacy:** At no point during the 23-step execution did either account register a negative or overdraft balance. The internal transfer (TC-08) replenished the `Cash Box` float at the optimal operational juncture.
2. **Double-Entry Parity:** The general ledger accounts converged with zero penny variance.
3. **Audit Caveat on TC-18 (`BUG-96`):** While mathematical balance parity is preserved ($15,500$ in cash till), statutory compliance is breached because the ৳ 2,500 outflow lacks an audit trail entry in the `Finance -> Payments Journal`.
