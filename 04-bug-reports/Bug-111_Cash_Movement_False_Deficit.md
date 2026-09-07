# Bug-111: Cash Movement Report False Deficit (-৳ 18,600) Due to Selective Inflow Queries & Raw Snake_Case Database Enums

> **Defect Identifier:** `BUG-111` (incorporating `BUG-107`)  
> **Severity:** `High` (Financial Distortion & Management Misdirection)  
> **Module:** `Reports -> Cash Movement` (`/admin/reports/cash-movement`)  
> **Cross-Module Linkage:** `Finance -> Cash Flow Statement` (`/admin/money/cashflow`), `Manage Accounts -> Payment Accounts` (`/admin/payment-accounts`)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/cash-movement`  
> **Status:** `Open / Not Fixed`

---

## 1. Defect Summary

The **Cash Movement Report** (`/admin/reports/cash-movement`) presents a alarming summary card showing **-৳ 18,600 (Deficit)** to the business owner:

$$\text{Received (৳ 173,000)} - \text{Paid Out (৳ 191,600)} = -৳\ 18,600.00 \text{ (Deficit)}$$

In reality, the business is completely solvent and possesses **৳ 54,100.00 in positive liquid capital** distributed across its verified payment accounts (`NAIMUR`, `Cash Box`, `Rizvi Al`).

Furthermore, the report displays raw internal database enum strings like `sale_return_refund` without UI formatting.

---

## 2. Live Forensic Comparison

### A. Cash Movement Report Breakdown
```text
Payment Method Received:
  cash                      : ৳ 173,000.00
  Total Received            : ৳ 173,000.00

Payment Type Paid Out:
  advance_payment           : ৳ 10,100.00
  advance_return            : ৳ 3,000.00
  purchase_payment          : ৳ 153,000.00
  sale_return_refund        : ৳ 25,500.00
  Total Paid Out            : ৳ 191,600.00

Net Cash Movement Result   : -৳ 18,600.00 (DEFICIT)
```

### B. True Financial Position (Cash Flow & Accounts)
| Source Category | True Cash Inflow | Cash Movement Inflow | Missing Inflow |
| :--- | :---: | :---: | :---: |
| **Investor Capital In** | ৳ 100,000.00 | ৳ 0.00 | **৳ 100,000.00** |
| **Loan Received (Lender)** | ৳ 20,000.00 | ৳ 0.00 | **৳ 20,000.00** |
| **Purchase Return Cash** | ৳ 29,000.00 | ৳ 0.00 | **৳ 29,000.00** |
| **Loan Taken (Personal)** | ৳ 10,000.00 | ৳ 0.00 | **৳ 10,000.00** |
| **Other Receipts** | ৳ 128,000.00 | ৳ 0.00 | **৳ 128,000.00** |
| **TOTAL INFLOW** | **৳ 369,500.00** | **৳ 173,000.00** | **৳ 196,500.00** |

```text
Actual Cash Outflow: ৳ 315,400.00
Actual Cash Inflow : ৳ 369,500.00
True Net Balance   : +৳ 54,100.00 (Surplus matching Payment Accounts)
```

---

## 3. Root Cause Analysis

1. **Selective Inflow Querying:** The report only selects records where `party_type IN ('customer')` and ignores all other cash receipt sources (Equity Capital, Loan Disbursements, Purchase Returns, Miscellaneous Income).
2. **Missing UI Formatting:** The template renders raw enum identifiers (`sale_return_refund`) instead of human-readable labels (`ucwords(str_replace('_', ' ', $type))`).

---

## 4. Remediation Steps

1. Include all cash inflow categories from the `payments` and `cash_flows` tables.
2. Format all payment type strings using standard title casing.
