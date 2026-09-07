# Bug-111: Cash Movement Report False Deficit (-৳ 18,600) Due to Selective Inflow Queries & Raw Snake_Case Database Enums

> **Defect Identifier:** `BUG-111` (incorporating `BUG-107`) &nbsp;|&nbsp; **Severity:** `High (Sev 2)` &nbsp;|&nbsp; **Priority:** `P1`  
> **Module:** `Reports -> Cash Movement` (`/admin/reports/cash-movement`)  
> **Cross-Module Linkage:** `Finance -> Cash Flow Statement` (`/admin/money/cashflow`), `Manage Accounts -> Payment Accounts` (`/admin/payment-accounts`)  
> **Discovered By:** QA Lead / Financial Systems Auditor &nbsp;|&nbsp; **Target System:** BizPOS / YesSME ERP v2.4 (Live Production)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/cash-movement`  
> **Status:** `Open / Not Fixed`

---

## 1. Executive Summary & Defect Narrative

On the **Cash Movement Report** (`/admin/reports/cash-movement`), the system presents an alarming executive summary card displaying **-৳ 18,600 (Deficit)**:

$$\text{Received (৳ 173,000)} - \text{Paid Out (৳ 191,600)} = \mathbf{-৳\ 18,600.00 \text{ (Deficit)}}$$

In reality, the company is completely solvent and possesses **+৳ 54,100.00 in positive liquid capital** distributed across its verified payment accounts (`Cash Box` ৳ 49,600.00, `Rizvi Al - EBL` ৳ 3,000.00, `NAIMUR - UCB` ৳ 1,500.00).

The false deficit occurs because the report only queries customer sales receipts (৳ 173,000) and **omits ৳ 196,500.00 in verified cash inflows** (Investor Equity ৳ 100k, Commercial Loans ৳ 20k, Purchase Return Refunds ৳ 29k, Personal Loans ৳ 10k, Other Income ৳ 128k).

Additionally, the interface exposes raw unformatted database enums like `sale_return_refund` (`BUG-107`).

---

## 2. Steps to Reproduce

1. Authenticate to `https://sme.yesbangladesh.net/admin/login` using administrative credentials (`admin@gmail.com` / `1234`).
2. Navigate to **Manage Accounts -> Payment Accounts** (`/admin/payment-accounts`).
   * Observe total consolidated balance: **৳ 54,100.00**.
3. Navigate to **Manage Accounts -> Cash Flow** (`/admin/money/cashflow`).
   * Verify Total Cash In: **৳ 369,500.00**.
   * Verify Total Cash Out: **৳ 315,400.00**.
   * Verify Net Balance: **+৳ 54,100.00**.
4. Navigate to **Reports -> Cash Movement** (`/admin/reports/cash-movement`).
5. Observe the Net Cash Movement summary badge at the top right.

### Observed Result:
* Displays: **-৳ 18,600 (Deficit)**.
* Table shows unformatted snake_case string: `sale_return_refund`.

### Expected Result:
* Net Cash Movement must reflect all cash transactions matching the Cash Flow statement (+৳ 54,100.00).
* All payment type labels must be formatted in human-readable Title Case (e.g. "Sale Return Refund").

---

## 3. Live Forensic Evidence

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

Reported Result             : -৳ 18,600.00 (DEFICIT)  <-- FALSE ALARM!
```

### B. True Financial Position Comparison
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
True Net Liquidity : +৳ 54,100.00 (Surplus matching physical accounts)
```

---

## 4. Root Cause Analysis (Code & SQL Investigation)

In `ReportController@cashMovement`:
1. The received amounts query restricts inflows to payments with party type `customer`:
   ```sql
   -- Flawed Query:
   SELECT SUM(amount) FROM payments WHERE direction = 'Received' AND party_type = 'customer';
   ```
2. Equity capital injections, commercial loan draws, and purchase return cash refunds are stored under `party_type IN ('investor', 'lender', 'supplier')` or within `cash_flows`, and are completely ignored.
3. The Blade view directly echoes `$type->payment_type` without executing `ucwords(str_replace('_', ' ', $type))`.

---

## 5. Developer Remediation Patch

Update `ReportController.php`:
```php
public function cashMovement(Request $request)
{
    $startDate = $request->input('from_date', Carbon::now()->startOfMonth()->toDateString());
    $endDate = $request->input('to_date', Carbon::now()->endOfMonth()->toDateString());

    // 1. Comprehensive Cash Inflows (All Sources)
    $totalReceived = DB::table('payments')
        ->where('direction', 'Received')
        ->whereBetween('payment_date', [$startDate, $endDate])
        ->sum('amount');

    // 2. Comprehensive Cash Outflows (All Types)
    $totalPaidOut = DB::table('payments')
        ->where('direction', 'Paid')
        ->whereBetween('payment_date', [$startDate, $endDate])
        ->sum('amount');

    $netCashMovement = $totalReceived - $totalPaidOut;

    $outflowsByType = DB::table('payments')
        ->select('payment_type', DB::raw('SUM(amount) as total'))
        ->where('direction', 'Paid')
        ->whereBetween('payment_date', [$startDate, $endDate])
        ->groupBy('payment_type')
        ->get()
        ->map(function ($row) {
            $row->formatted_type = ucwords(str_replace('_', ' ', $row->payment_type));
            return $row;
        });

    return view('admin.reports.cash_movement', compact(
        'totalReceived', 'totalPaidOut', 'netCashMovement', 'outflowsByType'
    ));
}
```

---

## 6. QA Retest & Certification Protocol

1. Apply the patch to Staging.
2. Verify that Cash Movement total inflows reflect **৳ 369,500.00**.
3. Verify that Net Cash Movement displays **+৳ 54,100.00 (Surplus)**, matching active accounts.
4. Verify that `sale_return_refund` renders cleanly as **"Sale Return Refund"**.
