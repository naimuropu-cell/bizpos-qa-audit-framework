# Bug-114: Profit & Loss Statement Omits Operating Expenses (Total Expenses Hardcoded to ৳ 0) Leading to Fabricated Net Profit

> **Defect Identifier:** `BUG-114`  
> **Severity:** `Critical` (Financial Ledger Distortion & Inaccurate Tax/Executive Reporting)  
> **Module:** `Reports -> Profit & Loss` (`/admin/reports/profit-loss`)  
> **Cross-Module Linkage:** `Finance -> Expenses` (`/admin/expenses`), `Cash Flow Statement` (`/admin/money/cashflow`)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/profit-loss`  
> **Status:** `Open / Not Fixed`

---

## 1. Defect Summary

On the **Profit & Loss Report** (`/admin/reports/profit-loss`), the "Operating Expenses" line item and the "Total Expenses" KPI card report **৳ 0.00**. However, the live system has multiple approved and paid operational expenses in `/admin/expenses` and records **৳ 6,300.00 in verified Operating Expenses** (plus Ad Spend ৳ 700 and Asset Maintenance ৳ 1,000) on the central Cash Flow Statement.

Because operating expenses are completely omitted ($E = ৳\ 0$), the statement equates Net Profit directly to Gross Profit:
$$\text{Net Profit} = \text{Gross Profit} - \text{Expenses} = ৳\ 30,600 - ৳\ 0 = ৳\ 30,600$$

This represents a critical accounting breach where company profit is artificially inflated by **৳ 6,300.00+**, misleading executives, shareholders, and tax auditors.

---

## 2. Live Forensic Evidence

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
| Net Margin                            : 20.26%              |
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

## 3. Root Cause Analysis

In the backend controller generating the Profit & Loss statement (`ReportController@profitLoss`):
1. The query calculating `total_expenses` either has a hardcoded default `$operatingExpenses = 0;`, filters by an incorrect status/date column (e.g. comparing timestamp with date string), or queries an unpopulated ledger table.
2. The controller fails to execute `Expense::where('status', 'Paid')->whereBetween('expense_date', [$startDate, $endDate])->sum('amount')`.

---

## 4. Business Rule & Accounting Law Violation

* **GAAP / IFRS Matching Principle:** Operating expenses incurred to generate revenue during an accounting period must be recognized on the income statement in the same period.
* **Accuracy Requirement:**
  $$\text{Correct Operating Expenses} = ৳\ 6,300.00$$
  $$\text{Correct Net Profit} = ৳\ 30,600 - ৳\ 6,300 = ৳\ 24,300.00$$
  $$\text{Correct Net Margin} = \frac{24,300}{151,000} \times 100 = 16.09\% \quad (\text{vs Reported } 20.26\%)$$

---

## 5. Recommended Remediation

Update `ReportController.php`:
```php
$operatingExpenses = Expense::where('status', 'Paid')
    ->when($startDate && $endDate, function($query) use ($startDate, $endDate) {
        return $query->whereBetween('expense_date', [$startDate, $endDate]);
    })
    ->sum('amount');

$grossProfit = $totalSales - $cogs;
$netProfit = $grossProfit - $operatingExpenses;
$netMargin = $totalSales > 0 ? ($netProfit / $totalSales) * 100 : 0;
```
