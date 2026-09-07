# Bug-114: Profit & Loss Statement Omits Operating Expenses (Total Expenses Hardcoded to ৳ 0) Leading to Fabricated Net Profit

> **Defect Identifier:** `BUG-114` &nbsp;|&nbsp; **Severity:** `Critical (Sev 1)` &nbsp;|&nbsp; **Priority:** `P0 (Release Blocker)`  
> **Module:** `Reports -> Profit & Loss` (`/admin/reports/profit-loss`)  
> **Cross-Module Linkage:** `Finance -> Expenses` (`/admin/expenses`), `Cash Flow Statement` (`/admin/money/cashflow`)  
> **Discovered By:** QA Lead / Financial Systems Auditor &nbsp;|&nbsp; **Target System:** BizPOS / YesSME ERP v2.4 (Live Production)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/profit-loss`  
> **Status:** `Open / Not Fixed`

---

## 1. Executive Summary & Defect Narrative

On the **Profit & Loss Report** (`/admin/reports/profit-loss`), the "Operating Expenses" line item and the "Total Expenses" KPI card report **৳ 0.00**. However, the live system has multiple approved and paid operational expenses in `/admin/expenses` and records **৳ 6,300.00 in verified Operating Expenses** (plus Ad Spend ৳ 700 and Asset Maintenance ৳ 1,000) on the central Cash Flow Statement.

Because operating expenses are completely omitted ($E = ৳\ 0$), the statement equates Net Profit directly to Gross Profit:
$$\text{Net Profit} = \text{Gross Profit} - \text{Expenses} = ৳\ 30,600 - ৳\ 0 = ৳\ 30,600$$

This represents a critical accounting breach where company profit is artificially inflated by **৳ 6,300.00+**, misleading executives, shareholders, and tax auditors.

---

## 2. Steps to Reproduce

1. Authenticate to `https://sme.yesbangladesh.net/admin/login` using administrative credentials (`admin@gmail.com` / `1234`).
2. Navigate to **Finance -> Expenses** (`/admin/expenses`). Verify that 3 expense vouchers are in `Paid` status:
   * `EXP-2026-0001` (06 Sep 2026): ৳ 5,000.00 (Electricity Bill)
   * `EXP-2026-0005` (07 Sep 2026): ৳ 300.00 (Office Supplies)
   * `EXP-2026-0007` (06 Aug 2026): ৳ 1,000.00 (Maintenance)
   * Total Verified Paid Expenses = **৳ 6,300.00**.
3. Navigate to **Manage Accounts -> Cash Flow** (`/admin/money/cashflow`). Verify that Cash Outflow records `Expense: ৳ 6,300.00`.
4. Navigate to **Reports -> Profit & Loss** (`/admin/reports/profit-loss`).
5. Observe the "Total Expenses" summary card and the line item `Less: Operating Expenses`.

### Observed Result:
* Total Expenses displays **৳ 0.00**.
* Net Profit is stated as **৳ 30,600.00** with an inflated Net Margin of **20.26%**.

### Expected Result:
* Total Expenses must display **৳ 6,300.00**.
* Net Profit must compute as $৳\ 30,600 - ৳\ 6,300 = \mathbf{৳\ 24,300.00}$ with an actual Net Margin of **16.09%**.

---

## 3. Live Forensic Evidence

### A. Profit & Loss Report View (`/admin/reports/profit-loss`)
```text
+-------------------------------------------------------------+
| PROFIT & LOSS STATEMENT                                     |
+-------------------------------------------------------------+
| Total Sales (Revenue)                 : ৳ 151,000.00        |
| Less: Cost of Goods Sold (COGS)       : (৳ 120,400.00)      |
| Gross Profit                          : ৳ 30,600.00         |
| Less: Operating Expenses              : (৳ 0.00)  <-- BUG!  |
| Net Profit                            : ৳ 30,600.00         |
| Net Margin                            : 20.26% (INFLATED)   |
+-------------------------------------------------------------+
```

### B. Live Expenses Module (`/admin/expenses`)
| ID | Date | Category | Description | Amount | Method | Status |
| :--- | :--- | :--- | :--- | :---: | :--- | :---: |
| `EXP-2026-0001` | 06 Sep 2026 | utilities | Electricity Bill | ৳ 5,000.00 | Bank | **Paid** |
| `EXP-2026-0005` | 07 Sep 2026 | utilities | Office Supplies | ৳ 300.00 | Cash | **Paid** |
| `EXP-2026-0007` | 06 Aug 2026 | utilities | Maintenance | ৳ 1,000.00 | Cash | **Paid** |
| **Sum of Paid Expenses** | | | | **৳ 6,300.00** | | |

### C. Cash Flow Statement (`/admin/money/cashflow`)
```text
Cash Outflow Entry:
  Expense                    : ৳ 6,300.00
  Ad Spend                   : ৳ 700.00
  Asset Maintenance          : ৳ 1,000.00
```

---

## 4. Root Cause Analysis (Code & SQL Investigation)

In `app/Http/Controllers/Admin/ReportController.php` under the `profitLoss()` method:
1. The variable representing operating expenses is either statically initialized to zero (`$operatingExpenses = 0;`) or queries a deprecated/unlinked table.
2. The query fails to filter and sum approved expenses from the `expenses` table:
   ```sql
   -- Current Missing Query:
   SELECT COALESCE(SUM(amount), 0) FROM expenses 
   WHERE status = 'Paid' 
     AND expense_date BETWEEN ? AND ?;
   ```

---

## 5. Developer Remediation Patch

Update `ReportController.php`:
```php
public function profitLoss(Request $request)
{
    $startDate = $request->input('from_date', Carbon::now()->startOfMonth()->toDateString());
    $endDate = $request->input('to_date', Carbon::now()->endOfMonth()->toDateString());

    // 1. Calculate Revenue & COGS
    $totalSales = Sale::whereBetween('sale_date', [$startDate, $endDate])->sum('total');
    $cogs = DB::table('sale_items')
        ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
        ->join('products', 'products.id', '=', 'sale_items.product_id')
        ->whereBetween('sales.sale_date', [$startDate, $endDate])
        ->sum(DB::raw('sale_items.quantity * products.cost_price'));

    $grossProfit = $totalSales - $cogs;

    // 2. FIX: Dynamically aggregate verified Paid Operating Expenses
    $operatingExpenses = Expense::where('status', 'Paid')
        ->whereBetween('expense_date', [$startDate, $endDate])
        ->sum('amount');

    // 3. Compute Net Profit & Margin
    $netProfit = $grossProfit - $operatingExpenses;
    $netMargin = $totalSales > 0 ? ($netProfit / $totalSales) * 100 : 0;

    return view('admin.reports.profit_loss', compact(
        'totalSales', 'cogs', 'grossProfit', 'operatingExpenses', 'netProfit', 'netMargin'
    ));
}
```

---

## 6. QA Retest & Certification Protocol

1. Apply the patch to Staging.
2. Access `/admin/reports/profit-loss?from_date=2026-08-01&to_date=2026-09-08`.
3. Assert that:
   * `Operating Expenses` == `৳ 6,300.00`.
   * `Net Profit` == `৳ 24,300.00`.
   * `Net Margin` == `16.09%`.
4. Run automated test case `TC-24` in `scripts/reconciliation_audit.py` to achieve pass certification.
