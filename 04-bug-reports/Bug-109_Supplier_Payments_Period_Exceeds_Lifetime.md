# Bug-109: Supplier Payments Report Accounting Paradox — Period Paid Exceeds All-Time Lifetime Paid

> **Defect Identifier:** `BUG-109` &nbsp;|&nbsp; **Severity:** `Critical (Sev 1)` &nbsp;|&nbsp; **Priority:** `P0 (Release Blocker)`  
> **Module:** `Reports -> Supplier Payments` (`/admin/reports/supplier-payments`)  
> **Cross-Module Linkage:** `Purchasing -> Purchases` (`/admin/purchases`), `Finance -> Cash Flow` (`/admin/money/cashflow`)  
> **Discovered By:** QA Lead / Financial Systems Auditor &nbsp;|&nbsp; **Target System:** BizPOS / YesSME ERP v2.4 (Live Production)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/supplier-payments`  
> **Status:** `Open / Not Fixed`

---

## 1. Executive Summary & Defect Narrative

On the **Supplier Payments Report** (`/admin/reports/supplier-payments`), the column **Period Paid** reports **৳ 193,100.00**, whereas **All-Time Paid** reports **৳ 178,100.00**. 

$$\text{Period Paid } (৳\ 193,100.00) > \text{All-Time Paid } (৳\ 178,100.00)$$

In double-entry bookkeeping and standard ERP systems, an accounting period is a subset of all-time cumulative operations ($\text{Period} \subseteq \text{All-Time}$). It is mathematically impossible for payments within a specific period to exceed cumulative lifetime payments made to the same suppliers.

Additionally, **Total Purchases** is reported as **৳ 178,000.00**, while the core Purchase Orders register records **৳ 183,000.00** across 9 bills (a ৳ 5,000.00 drop).

---

## 2. Steps to Reproduce

1. Authenticate to `https://sme.yesbangladesh.net/admin/login` using administrative credentials (`admin@gmail.com` / `1234`).
2. Navigate to **Purchases -> Purchases List** (`/admin/purchases`). Verify that 9 purchase orders exist, totaling **৳ 183,000.00** (all Paid):
   * ABC Vendors: ৳ 161,000.00 across 7 bills.
   * Alvarez and Bullock Inc: ৳ 22,000.00 across 2 bills.
3. Navigate to **Manage Accounts -> Cash Flow** (`/admin/money/cashflow`).
   * Verify line item `Supplier Payment: ৳ 183,000.00`.
   * Verify line item `Supplier Advance: ৳ 10,100.00`.
   * Total Vendor Cash Outflow = **৳ 193,100.00**.
4. Navigate to **Reports -> Supplier Payments** (`/admin/reports/supplier-payments`).
5. Observe the Grand Total row and individual vendor summaries.

### Observed Result:
* **All-Time Paid:** displays **৳ 178,100.00**.
* **Period Paid:** displays **৳ 193,100.00**.
* **Paradox:** Period Paid exceeds All-Time Paid by **৳ 15,000.00**!

### Expected Result:
* $\text{All-Time Paid} \ge \text{Period Paid}$ under all date filter ranges.
* All-Time Paid must reflect all vendor settlements (Purchase Bills ৳ 183,000 + Advance ৳ 10,100 = **৳ 193,100.00**).
* Total Purchases must reflect all completed purchase orders (**৳ 183,000.00**).

---

## 3. Live Forensic Evidence

### A. Supplier Payments Report (`/admin/reports/supplier-payments`)
| Supplier | Contact | Total Purchase | All-Time Paid | Due Balance | Period Paid | Last Payment |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **ABC Vendors** | Rafiq | ৳ 159,000.00 | ৳ 159,100.00 | ৳ 0.00 | **৳ 171,100.00** | 07 Sep 2026 |
| **Alvarez and Bullock Inc** | Sunt elit | ৳ 19,000.00 | ৳ 19,000.00 | ৳ 0.00 | **৳ 22,000.00** | 07 Sep 2026 |
| **Grand Total** | | **৳ 178,000.00** | **৳ 178,100.00** | **৳ 0.00** | **৳ 193,100.00** | |

### B. Reconciliation with Core Ledgers
1. **Purchase Orders Module:** Total Purchases = **৳ 183,000.00** (Report misses ৳ 5,000.00 due to unjoined branch PO).
2. **Cash Flow Outflows:**
   * Supplier Payments: ৳ 183,000.00
   * Supplier Advances: ৳ 10,100.00
   * Consolidated Paid to Vendors: **৳ 193,100.00**.

---

## 4. Root Cause Analysis (Code & SQL Investigation)

In `app/Http/Controllers/Admin/ReportController.php` under `supplierPayments()`:
1. **Flawed Periodic Query:** The `Period Paid` calculation queries the `payments` table directly:
   ```sql
   SELECT SUM(amount) FROM payments 
   WHERE party_type = 'supplier' 
     AND direction = 'Paid' 
     AND payment_date BETWEEN ? AND ?;
   -- Returns ৳ 193,100.00 (Includes both purchase_payment and advance_payment)
   ```
2. **Flawed All-Time Query:** The `All-Time Paid` calculation queries `purchases.paid_amount`:
   ```sql
   SELECT SUM(paid_amount) FROM purchases WHERE supplier_id = ?;
   -- Excludes all advance payments stored in the payments table!
   ```
3. Because the two calculations query entirely different schemas and business objects, `Period Paid` captures advances while `All-Time Paid` drops them, creating the impossible paradox.

---

## 5. Developer Remediation Patch

Harmonize both queries in `ReportController.php` to aggregate from the unified `payments` ledger:

```php
public function supplierPayments(Request $request)
{
    $startDate = $request->input('from_date', Carbon::now()->startOfMonth()->toDateString());
    $endDate = $request->input('to_date', Carbon::now()->endOfMonth()->toDateString());

    $suppliers = Supplier::with(['purchases'])->get()->map(function ($supplier) use ($startDate, $endDate) {
        // 1. Total Purchases across all branches
        $totalPurchase = $supplier->purchases()->sum('total_amount');

        // 2. All-Time Cumulative Payments (Bills + Advances)
        $allTimePaid = DB::table('payments')
            ->where('party_type', 'supplier')
            ->where('party_id', $supplier->id)
            ->where('direction', 'Paid')
            ->sum('amount');

        // 3. Periodic Payments (Subset of All-Time)
        $periodPaid = DB::table('payments')
            ->where('party_type', 'supplier')
            ->where('party_id', $supplier->id)
            ->where('direction', 'Paid')
            ->whereBetween('payment_date', [$startDate, $endDate])
            ->sum('amount');

        $dueBalance = max(0, $totalPurchase - $allTimePaid);

        return [
            'supplier' => $supplier,
            'total_purchase' => $totalPurchase,
            'all_time_paid' => $allTimePaid,
            'period_paid' => $periodPaid,
            'due_balance' => $dueBalance,
        ];
    });

    return view('admin.reports.supplier_payments', compact('suppliers'));
}
```

---

## 6. QA Retest & Certification Protocol

1. Apply the unified payments query to Staging.
2. Verify that:
   $$\text{All-Time Paid } (৳\ 193,100.00) \ge \text{Period Paid } (৳\ 193,100.00)$$
3. Verify that Total Purchases accurately sums all 9 purchase orders to **৳ 183,000.00**.
4. Assert pass status on test case `TC-25`.
