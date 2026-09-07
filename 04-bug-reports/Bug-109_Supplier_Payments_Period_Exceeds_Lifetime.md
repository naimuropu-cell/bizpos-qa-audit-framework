# Bug-109: Supplier Payments Report Accounting Paradox — Period Paid Exceeds All-Time Lifetime Paid

> **Defect Identifier:** `BUG-109`  
> **Severity:** `High` (Accounting Logic Failure & Vendor Ledger Inconsistency)  
> **Module:** `Reports -> Supplier Payments` (`/admin/reports/supplier-payments`)  
> **Cross-Module Linkage:** `Purchasing -> Purchases` (`/admin/purchases`), `Finance -> Cash Flow` (`/admin/money/cashflow`)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/supplier-payments`  
> **Status:** `Open / Not Fixed`

---

## 1. Defect Summary

On the **Supplier Payments Report** (`/admin/reports/supplier-payments`), the column **Period Paid** reports **৳ 193,100.00**, whereas **All-Time Paid** reports **৳ 178,100.00**. 

$$\text{Period Paid } (৳\ 193,100.00) > \text{All-Time Paid } (৳\ 178,100.00)$$

In double-entry bookkeeping and ERP systems, an accounting period is a subset of all-time cumulative operations ($\text{Period} \subseteq \text{All-Time}$). It is mathematically impossible for payments within a specific period to exceed cumulative lifetime payments made to the same suppliers.

---

## 2. Live Forensic Data

### A. Report Table Summary (`/admin/reports/supplier-payments`)
| Supplier | Contact | Total Purchase | All-Time Paid | Due Balance | Period Paid | Last Payment |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **ABC Vendors** | Rafiq | ৳ 159,000.00 | ৳ 159,100.00 | ৳ 0.00 | **৳ 171,100.00** | 07 Sep 2026 |
| **Alvarez and Bullock Inc** | Sunt elit | ৳ 19,000.00 | ৳ 19,000.00 | ৳ 0.00 | **৳ 22,000.00** | 07 Sep 2026 |
| **Grand Total** | | **৳ 178,000.00** | **৳ 178,100.00** | **৳ 0.00** | **৳ 193,100.00** | |

### B. Reconciliation with Core Modules
1. **Total Purchases Discrepancy:**
   - On `/admin/reports/purchase`: Total Purchases = **৳ 183,000.00**.
   - On `/admin/reports/supplier-payments`: Total Purchases = **৳ 178,000.00**.
   - **Variance = ৳ 5,000.00** missing from the supplier report!
2. **Cash Flow Reconciliation:**
   - In `/admin/money/cashflow`:
     * Supplier Payment = **৳ 183,000.00**
     * Supplier Advance = **৳ 10,100.00**
     * Total Paid Out to Suppliers = **৳ 193,100.00**!

---

## 3. Root Cause Analysis

1. **Inclusion of Advances in Period Query:**
   The `Period Paid` calculation executes a query on the `payments` table that includes both `purchase_payment` (৳ 183,000) and `supplier_advance` (৳ 10,100), totaling **৳ 193,100.00**.
2. **Missing Advances in All-Time Query:**
   The `All-Time Paid` calculation executes a separate query or joins `purchases` directly, summing only settled purchase bill amounts and omitting advance payments. Additionally, a ৳ 5,000 purchase bill was excluded due to an unhandled supplier ID join.

---

## 4. Remediation Steps

1. Harmonize the aggregation query in `ReportController@supplierPayments`:
   Ensure `All-Time Paid` aggregates all payment types (`purchase_payment` + `advance_payment` - `advance_refund`) across all time.
2. Enforce validation constraint:
   $$\text{Period Paid} \le \text{All-Time Paid}$$
