# Bug-118: Sales Report Column Header Mismatch — "Total Sales" Deducts Returns while Collected & Due Remain Gross

> **Defect Identifier:** `BUG-118` (Co-indexed with `BUG-119`) &nbsp;|&nbsp; **Severity:** `Medium (Sev 3)` &nbsp;|&nbsp; **Priority:** `P1 (Critical UX & Financial Integrity)`  
> **Module:** `Reports -> Sales Report` (`/admin/reports/sales`), `Reports -> Monthly Summary` (`/admin/reports/monthly-summary`)  
> **Cross-Module Linkage:** `Sales -> Sale List` (`/admin/sales`), `Sales Returns` (`/admin/sale-returns`), `Cash Flow` (`/admin/money/cashflow`)  
> **Discovered By:** QA Lead / Financial Systems Auditor &nbsp;|&nbsp; **Target System:** BizPOS / YesSME ERP v2.4 (Live Production)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/sales`  
> **Status:** `Open / Not Fixed`

---

## 1. Executive Summary & Defect Narrative

On the **Sales Report** (`/admin/reports/sales`) and **Monthly Summary** (`/admin/reports/monthly-summary`), the KPI summary and table columns display:
* **Total Sales:** ৳ 125,500.00
* **Total Collected:** ৳ 136,000.00
* **Total Due:** ৳ 15,000.00

In standard commercial accounting (GAAP / IFRS), customer receivable math requires:
$$\text{Gross Sales} = \text{Collected Cash} + \text{Remaining Due} = ৳\ 136,000 + ৳\ 15,000 = ৳\ 151,000.00$$

Having a column labeled **Total Sales** reporting **৳ 125,500.00** creates an immediate accounting contradiction where **Total Sales is ৳ 10,500.00 LESS than the cash collected!** 

To an auditor, business owner, or tax inspector, this report indicates either:
1. Customers somehow paid ৳ 10,500 more than total sales invoiced; or
2. ৳ 25,500 of revenue mysteriously vanished from the top line without a visible deduction entry.

---

## 2. Step-by-Step Reproduction Procedure

1. Authenticate to `https://sme.yesbangladesh.net/admin/login` using administrative credentials (`admin@gmail.com` / `1234`).
2. Navigate to **Sales -> Sale List** (`/admin/sales`).
   * Observe 18 total sales records.
   * Total Invoiced Gross: **৳ 151,000.00**
   * Total Paid: **৳ 136,000.00**
   * Total Due: **৳ 15,000.00**
3. Navigate to **Sales Returns** (`/admin/sale-returns`).
   * Verify 2 completed return vouchers:
     * `SR-2026-0001` (06 Sep 2026): ৳ 25,000.00 (Customer refund via Cash Box)
     * `SR-2026-0002` (07 Sep 2026): ৳ 500.00 (Customer refund via Cash Box)
     * Total Returns: **৳ 25,500.00**
4. Navigate to **Reports -> Sales Report** (`/admin/reports/sales`).
5. Select Date Range: `All Dates` (or leave default).
6. Inspect the KPI cards and the tabular report summary.

### Observed Result:
* Column labeled **Total Sales** shows **৳ 125,500.00**.
* Column labeled **Total Collected** shows **৳ 136,000.00**.
* Column labeled **Total Due** shows **৳ 15,000.00**.
* No column exists for **Sales Returns** or **Net Sales**.
* Net Cash position is impossible to calculate from the visible columns because Collections are Gross while Sales are Net.

### Expected Result:
* If the column is labeled **Total Sales**, it must reflect **৳ 151,000.00** (Gross Revenue matching Invoices, Collections, and Receivables).
* Alternatively, if sales returns are deducted, the columns must be segregated and clearly designated:
  * **Gross Sales:** `৳ 151,000.00`
  * **Less: Returns:** `(৳ 25,500.00)`
  * **Net Sales:** `৳ 125,500.00`
  * **Gross Collected:** `৳ 136,000.00`
  * **Less: Refunded:** `(৳ 25,500.00)`
  * **Net Cash Kept:** `৳ 110,500.00`
  * **Receivables Due:** `৳ 15,000.00`

---

## 3. Live Forensic Evidence

### A. Current Sales Report Display (`/admin/reports/sales`)
```text
+-----------------------------------------------------------------------------------------+
| LIVE SALES REPORT TABLE (CURRENT AS-IS VIEW)                                            |
+-----------------------------------------------------------------------------------------+
| Period / Branch       | Total Sales       | Total Collected   | Total Due   | Status    |
+-----------------------+-------------------+-------------------+-------------+-----------+
| Main Branch (Live)    | ৳ 125,500.00      | ৳ 136,000.00      | ৳ 15,000.00 | CONFUSING |
+-----------------------+-------------------+-------------------+-------------+-----------+
* Note: ৳ 136,000 (Collected) + ৳ 15,000 (Due) = ৳ 151,000 != ৳ 125,500 (Total Sales)
* Deficit: ৳ 125,500 - ৳ 136,000 = -৳ 10,500 (Negative Unearned Revenue Illusion)
```

### B. Transactional Reconciliation Matrix
```text
+-----------------------------------------------------------------------------------------+
| FORENSIC AUDIT MATHEMATICAL PROOF                                                       |
+-----------------------------------------------------------------------------------------+
| Stream Component              | Invoiced / Transacted | Return / Refund | Net Audited   |
+-------------------------------+-----------------------+-----------------+---------------+
| Sales Invoices (18 Orders)    | ৳ 151,000.00          | ৳ 25,500.00     | ৳ 125,500.00  |
| Customer Payments (Received)  | ৳ 136,000.00          | ৳ 25,500.00     | ৳ 110,500.00  |
| Customer Accounts Receivable  | ৳ 15,000.00           | ৳ 0.00          | ৳ 15,000.00   |
+-------------------------------+-----------------------+-----------------+---------------+
| Cross-Check Parity:           | 136,000 + 15,000      | 25,500 + 0      | 110,500+15,000|
|                               | = ৳ 151,000 (PASS)    | = ৳ 25,500(PASS)| = ৳ 125,500   |
+-------------------------------+-----------------------+-----------------+---------------+
```

---

## 4. Root Cause Analysis (Code Investigation)

In `app/Http/Controllers/Admin/ReportController.php` (method `salesReport()`):
1. The backend query calculates:
   ```php
   // Controller incorrectly computes Net Sales into $total_sales
   $grossSales = Sale::whereBetween('created_at', [$from, $to])->sum('grand_total');
   $returns = SaleReturn::whereBetween('created_at', [$from, $to])->sum('return_amount');
   $totalSales = $grossSales - $returns; // Returns deducted silently!

   $totalCollected = Sale::whereBetween('created_at', [$from, $to])->sum('paid_amount');
   $totalDue = Sale::whereBetween('created_at', [$from, $to])->sum('due_amount');
   ```
2. The Blade template `resources/views/admin/reports/sales.blade.php` renders:
   ```html
   <th>Total Sales</th>
   <th>Total Collected</th>
   <th>Total Due</th>
   ...
   <td>{{ number_format($totalSales, 2) }}</td>
   <td>{{ number_format($totalCollected, 2) }}</td>
   <td>{{ number_format($totalDue, 2) }}</td>
   ```
3. **Flaw:** Sales is silently netted against returns, but Collections are NOT netted against customer refund payouts, and the table header does not state "Net Sales". This violates single-source reporting consistency.

---

## 5. Developer Remediation Patch

### Option A: Standard Dual-Line Presentation (Recommended)

Update `ReportController.php`:
```php
public function salesReport(Request $request)
{
    $fromDate = $request->input('from_date', Carbon::now()->startOfMonth()->toDateString());
    $toDate = $request->input('to_date', Carbon::now()->endOfMonth()->toDateString());

    // 1. Gross metrics
    $grossSales = Sale::whereBetween('sale_date', [$fromDate, $toDate])->sum('grand_total');
    $grossCollected = Sale::whereBetween('sale_date', [$fromDate, $toDate])->sum('paid_amount');
    $totalDue = Sale::whereBetween('sale_date', [$fromDate, $toDate])->sum('due_amount');

    // 2. Returns and refunds
    $saleReturns = SaleReturn::whereBetween('return_date', [$fromDate, $toDate])->sum('return_amount');
    $refundsDisbursed = SaleReturn::whereBetween('return_date', [$fromDate, $toDate])->sum('refund_amount');

    // 3. Computed Net Metrics
    $netSales = $grossSales - $saleReturns;
    $netCashRetained = $grossCollected - $refundsDisbursed;

    return view('admin.reports.sales', compact(
        'grossSales', 'saleReturns', 'netSales', 
        'grossCollected', 'refundsDisbursed', 'netCashRetained', 'totalDue'
    ));
}
```

Update `resources/views/admin/reports/sales.blade.php`:
```html
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Gross Sales</th>
            <th>Returns</th>
            <th>Net Sales</th>
            <th>Gross Collected</th>
            <th>Refunds Paid</th>
            <th>Net Cash</th>
            <th>Due Receivables</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>৳ {{ number_format($grossSales, 2) }}</td>
            <td class="text-danger">(৳ {{ number_format($saleReturns, 2) }})</td>
            <td class="fw-bold">৳ {{ number_format($netSales, 2) }}</td>
            <td>৳ {{ number_format($grossCollected, 2) }}</td>
            <td class="text-danger">(৳ {{ number_format($refundsDisbursed, 2) }})</td>
            <td class="fw-bold">৳ {{ number_format($netCashRetained, 2) }}</td>
            <td class="text-warning">৳ {{ number_format($totalDue, 2) }}</td>
        </tr>
    </tbody>
</table>
```

---

## 6. QA Retest & Certification Protocol

1. Deploy the patch to the Staging environment.
2. Navigate to `/admin/reports/sales?from_date=2026-08-01&to_date=2026-09-08`.
3. Verify accounting identity holds true:
   $$\text{Gross Sales } (৳\ 151,000) \equiv \text{Gross Collected } (৳\ 136,000) + \text{Due Receivables } (৳\ 15,000)$$
4. Verify Net Sales identity holds true:
   $$\text{Net Sales } (৳\ 125,500) \equiv \text{Gross Sales } (৳\ 151,000) - \text{Returns } (৳\ 25,500)$$
5. Verify Net Cash identity holds true:
   $$\text{Net Cash } (৳\ 110,500) \equiv \text{Gross Collected } (৳\ 136,000) - \text{Refunds } (৳\ 25,500)$$
6. Execute automated regression test `TC-26` in `scripts/reconciliation_audit.py` to achieve green certification sign-off.
