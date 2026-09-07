# Comprehensive Defect Audit Log (118 Audited Defects)

> **Repository Artifact:** `04-bug-reports/ALL_DEFECTS_LOG.md`  
> **Source Document:** BizPOS / YesSME ERP Web Store & Admin Audit Register (`web store issue report (1).xlsx`)  
> **Target System:** BizPOS / YesSME ERP v2.4 (Enterprise Multi-Module Core)  
> **Auditing Mandate:** End-to-End Accounting, POS, Inventory, and Ledger Audit Trail Reconciliation

---

## 1. Executive Defect Tally & Status Distribution

An exhaustive multi-module quality assurance and financial ledger audit was conducted across the BizPOS / YesSME ERP suite, identifying and auditing **118 operational, structural, and reporting defects**.

| Category Status | Count | Percentage | Operational & Audit Impact |
| :--- | :---: | :---: | :--- |
| **Fixed** | **91** | **77.12%** | Remediated and verified in current pre-production baseline. |
| **Need Revisions - QA** | **6** | **5.08%** | Critical financial discrepancies, broken journal links, or partial fixes needing rework. |
| **Not Fixed** | **18** | **15.25%** | Outstanding functional & reporting defects pending developer resolution. |
| **Invalid / Not An Issue** | **3** | **2.54%** | Screened out as by-design or third-party behavioral constraints. |
| **TOTAL AUDITED** | **118** | **100.00%** | **Closed-loop defect reconciliation catalog.** |

---

## 2. Category Breakdown & Audit Significance

```text
+---------------------------------------------------------------------------------------+
| DEFECT DISTRIBUTION BREAKDOWN (TOTAL: 118)                                            |
+---------------------------------------------------------------------------------------+
| [==================================] Fixed: 91 (77.1%)                             |
| [===] Need Revisions - QA: 6 (5.1%)                                           |
| [======] Not Fixed: 18 (15.3%)                                               |
| [=] Invalid: 3 (2.5%)                                                    |
+---------------------------------------------------------------------------------------+
```

* **Core Financial & Reporting Discrepancies:**
  * **[BUG-70](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md):** ৳ 842k reconciliation gap between Cash Flow Net and payment account balances.
  * **[BUG-76](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md):** Atomicity rollback failure on purchase return stock check mutates central Cash Flow.
  * **[BUG-96](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md):** Sub-ledger transaction modules bypass master Payments Journal.
  * **[BUG-109](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md):** Supplier Payments Period Paid (৳ 193.1k) mathematically exceeds All-Time Paid (৳ 178.1k).
  * **[BUG-111](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-111_Cash_Movement_False_Deficit.md):** Cash Movement reports false -৳ 18,600 deficit while business holds +৳ 54,100 cash.
  * **[BUG-114](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md):** P&L reports Operating Expenses as ৳ 0 (omits ৳ 6,300 verified paid expenses).
  * **[BUG-118](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md):** Sales Report column header "Total Sales" (৳ 125,500) contradicts Collected (৳ 136k) + Due (৳ 15k).

---

## 3. High-Priority: Need Revisions - QA (6 Defects)

| Defect ID | Module / Feature Area | Defect Title & Description | Priority | Expected Behavior / QA Note |
| :--- | :--- | :--- | :---: | :--- |
| **Bug-39** | need to polish the templete 
https://prnt.sc/7I4ZohV86JrD | **Supplier Ledger does not have a dedicated business-format print layout** | `High` | Requires developer rework and re-audit. |
| **Bug-60** | Staff -> Payroll -> Process/Disburse vs Manage Accounts -> Payments | **Bulk/Batch payroll disbursements update Cash Flow but fail to create corresponding payment records in Manage Accounts -> Payments** | `High` | Requires developer rework and re-audit. |
| **Bug-63** | Marketing -> Email Marketing -> Create Campaign | **Email Template selector cards are non-functional and fail to populate preset layouts into the Email Body editor on click** | `Medium` | Requires developer rework and re-audit. |
| [**Bug-70**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md) | Manage Accounts -> Payment Accounts & Cash Flow Reconciliation | **Severe financial discrepancy: Sum of all Payment Account balances does not match Cash Flow Net Balance (Difference: ৳ 842,249.98)** | `High` | Requires developer rework and re-audit. |
| **Bug-71** | Marketing -> Ad Spend & Cash Flow Integration | **Ad Spend expense is deducted from Cash In ('Other Receipts') instead of being recorded as Cash Out ('Expense')** | `High` | Requires developer rework and re-audit. |
| [**Bug-76**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md) | Purchasing -> Purchase Returns & Cash Flow Mutation Transaction Safety | **Failed purchase return validation (Out of Stock error) permanently mutates Cash Flow statement prior to form submission completion** | `High` | Requires developer rework and re-audit. |

---

## 4. Outstanding: Not Fixed (18 Defects)

| Defect ID | Module / Feature Area | Defect Title & Description | Priority | Expected Behavior / Remediation Target |
| :--- | :--- | :--- | :---: | :--- |
| **Bug-78** | Purchasing -> Purchase Returns & Inventory Validation | **System allows cumulative purchase returns to exceed original PO quantity (Over-Return exploit allowed based on total branch stock)** | `High` | Pending developer assignment. |
| **Bug-102** | Global System / Multi-Module (Sales, Customer, Stock, Purchase, Manage Accounts, Expense, Loans, Reports) | **Date filter inputs auto-populate with today's date instead of remaining empty with all-time records loaded by default** | `High` | Pending developer assignment. |
| **Bug-105** | Manage Accounts -> Payments (/admin/payments) | **Payments Ledger is fragmented across multiple isolated tabs instead of a unified audit journal** | `High` | Pending developer assignment. |
| **Bug-106** | Finance -> Expenses & Cash Flow Statement | **Back-dated expense filters into current month's Cash Flow instead of transaction month** | `High` | Pending developer assignment. |
| **Bug-107** | Reports -> Cash Movement (/admin/reports/cash-movement) | **UI / Presentation Defect: Unformatted raw snake_case database strings and structural mismatch in Received vs Paid Out cards** | `High` | Pending developer assignment. |
| **Bug-108** | Purchase -> Purchase Orders (/admin/purchases) | **Backend ignores date_from and date_to GET query parameters in Purchases List** | `High` | Pending developer assignment. |
| [**Bug-109**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-109_Supplier_Payments_Period_Exceeds_Lifetime.md) | Reports -> Supplier Payments (/admin/reports/supplier-payments) | **Severe Accounting Logic Paradox: Period Paid mathematically exceeds All-Time Paid across suppliers** | `High` | Pending developer assignment. |
| **Bug-110** | Reports -> Supplier Payments (/admin/reports/supplier-payments) | **UI / Presentation Defects: Inconsistent financial column alignment, missing header currency labels, and static non-interactive rows** | `Low` | Pending developer assignment. |
| [**Bug-111**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-111_Cash_Movement_False_Deficit.md) | Reports -> Cash Movement (/admin/reports/cash-movement) | **Misleading Net Cash Deficit due to omitted cash receipts and raw database snake_case string exposure** | `High` | Pending developer assignment. |
| **Bug-112** | Reports -> Purchase Reports / Daily Purchases | **Data Inconsistency: Daily Purchases ignores purchase returns, creating a ৳ 5,000 conflict with Supplier Payment Report** | `High` | Pending developer assignment. |
| **Bug-113** | Reports -> Purchase Reports / Daily Purchases | **UI / Layout Defects: Missing Grand Total summary footer row and static non-clickable drill-down navigation** | `High` | Pending developer assignment. |
| [**Bug-114**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-114_Profit_Loss_Zero_Operating_Expense.md) | Reports -> Profit & Loss (/admin/reports/profit-loss) | **Operating Expenses omitted entirely (Total Expenses: ৳ 0), leading to fabricated Net Profit duplicate** | `High` | Pending developer assignment. |
| **Bug-115** | Reports -> Profit & Loss (/admin/reports/profit-loss) | **Exposure of raw database query strings (SUM(sale_items.quantity * products.cost_price)) in customer-facing UI** | `Medium` | Pending developer assignment. |
| **Bug-116** | Reports -> Detail Sales / Profit & Loss / Cash Box Ledger | **Critical Cross-Module Integrity: Confirmed cash refund of ৳ 25,000 (sale_return_refund) omitted from Sales and P&L reports** | `High` | Pending developer assignment. |
| **Bug-117** | Reports -> Detail Sales (/admin/reports/detail-sales) | **Disorganized Record Sequence: Invoices under the same date lack deterministic primary/secondary sorting** | `High` | Pending developer assignment. |
| [**Bug-118**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-118_Sales_Report_Return_Deduction_Paradox.md) | Reports -> Sales Reports (/admin/reports/sales) | **Mathematical & Cross-Report Failure: Total Sales (৳ 125,500) contradicts Collected + Due (৳ 151,000) and Detail Sales** | `High` | Pending developer assignment. |
| **Bug-119** | Reports -> Monthly Summary (/admin/reports/monthly-summary) | **Core Accounting Logic Flaw: September Total Sales (৳ 125,500) understates Total Paid + Total Due (৳ 151,000)** | `High` | Pending developer assignment. |
| **Bug-120** | Reports -> Monthly Summary (/admin/reports/monthly-summary) | **UI / Scope Inconsistency: Navigation and breadcrumbs labeled Monthly Summary while page body renders Monthly Sales Summary** | `High` | Pending developer assignment. |

---

## 5. Verified & Closed: Fixed (91 Defects)

| Defect ID | Module / Feature Area | Defect Summary | Severity | Verification Status |
| :--- | :--- | :--- | :---: | :---: |
| **Bug -1** | Customer website / Registration | Customer registration shows “Too Many Attempts” during normal registration | `High` | `VERIFIED CLOSED` |
| **Bug-2** | Customers → Bulk Import | Bulk Customer Import Template is missing | `High` | `VERIFIED CLOSED` |
| **Bug-3** | Dashboard | Full screen mode won't work here but in others module it works properly | `Medium` | `VERIFIED CLOSED` |
| **Bug-4** | Products → Categories | Category Name accepts only special characters | `High` | `VERIFIED CLOSED` |
| **Bug-5** | Products → Brands | Brand Name accepts only special characters | `High` | `VERIFIED CLOSED` |
| **Bug-6** | Products → Variants | Variant Name accepts only special characters | `High` | `VERIFIED CLOSED` |
| **Bug-7** | Products → Import Product | Product Import Excel Template is missing | `High` | `VERIFIED CLOSED` |
| **Bug-8** | Products → Stock History | Product opening stock is not reflected in Stock History | `High` | `VERIFIED CLOSED` |
| **Bug-9** | Sales → Sales List | Sales List table content breaks vertically in the Details column | `High` | `VERIFIED CLOSED` |
| **Bug-10** | Customer Website / Order list | Customer website shows order as Unpaid after payment is recorded in Admin | `High` | `VERIFIED CLOSED` |
| **Bug-11** | Customer Website / My Orders | Admin-created order for a registered customer does not appear in the customer's My Orders list | `High` | `VERIFIED CLOSED` |
| **Bug-12** | POS | POS shows insufficient stock although sufficient stock is available | `High` | `VERIFIED CLOSED` |
| **Bug-13** | Sales → Create Order / Inventory | Order can be delivered with quantity exceeding available stock and stock is not deducted | `High` | `VERIFIED CLOSED` |
| **Bug-14** | Add product | Product Name accepts only special characters | `High` | `VERIFIED CLOSED` |
| **Bug-16** | Suppliers → Add Supplier | Supplier Name and Phone Number accept special-character-only values | `Medium` | `VERIFIED CLOSED` |
| **Bug-17** | Suppliers → Supplier Groups | Supplier Group Name accepts only special characters | `Medium` | `VERIFIED CLOSED` |
| **Bug-18** | Mnaage Accounts/Accounts list / Add account | Payment account type mobile banking - mobile number , account name accepts invalid special characters | `Medium` | `VERIFIED CLOSED` |
| **Bug- 19** | Add payment account / Cards | Acc Name , Card holder name , Card last 4 digit accepts invalid special character only | `High` | `VERIFIED CLOSED` |
| **Bug-20** | Products → Bulk Import | Product bulk import fails without displaying any error message | `High` | `VERIFIED CLOSED` |
| **Bug-21** | Products | Action buttons are arranged in a less intuitive order | `High` | `VERIFIED CLOSED` |
| **Bug-23** | Investment → Investors | Investor form accepts invalid/special-character-only data | `High` | `VERIFIED CLOSED` |
| **Bug-24** | Manage Accounts → Expense Group | Expense Category accepts only special characters | `Medium` | `VERIFIED CLOSED` |
| **Bug-25** | Expenses/ view expense | Delete Expense button is displayed for Paid/Approved expenses | `Medium` | `VERIFIED CLOSED` |
| **Bug-26** | Assets → Categories | Asset Category Name accepts only special characters | `Medium` | `VERIFIED CLOSED` |
| **Bug-27** | Assets → Categories | Depreciation Rate is automatically set to 20% when left blank | `High` | `VERIFIED CLOSED` |
| **Bug-28** | Assets / Cash Flow | Asset maintenance costs are not reflected in Cash Flow | `High` | `VERIFIED CLOSED` |
| **Bug-29** | Asset Management – Depreciation | Incorrect Declining Balance Depreciation Calculation | `High` | `VERIFIED CLOSED` |
| **Bug-30** | Asset Management – Depreciation | Incorrect Straight Line Depreciation Calculation | `High` | `VERIFIED CLOSED` |
| **Bug-31** | Sales → Sales Returns | Sales Return calculates refund based on regular price instead of discounted invoice price | `High` | `VERIFIED CLOSED` |
| **Bug-32** | Sales Return / Manage Accounts/ Cash Flow | Completed cash sale return is not reflected in Cash Flow | `High` | `VERIFIED CLOSED` |
| **Bug-33** | Customers / Payments -> Customer Due Receive | Overpayment during Due Receive incorrectly posts entire amount to Customer Due Receive instead of splitting to Advance | `High` | `VERIFIED CLOSED` |
| **Bug-34** | eCommerce / Sales -> Sales List | eCommerce coupon discount is completely ignored and dropped when order syncs to Admin Sales List | `High` | `VERIFIED CLOSED` |
| **Bug-35** | eCommerce -> Coupons | Usage limit per customer restriction fails allowing same customer to reuse single-use coupon multiple times | `High` | `VERIFIED CLOSED` |
| **Bug-36** | Suppliers → Import Suppliers | System-generated Sample CSV file is rejected during Supplier Import | `High` | `VERIFIED CLOSED` |
| **Bug-37** | Suppliers → Create Supplier | No custom bank name field when “Other” bank is selected | `High` | `VERIFIED CLOSED` |
| **Bug-38** | Suppliers → Create/Edit Supplier | Invalid special characters are accepted in supplier information fields | `Medium` | `VERIFIED CLOSED` |
| **Bug-40** | Suppliers → Supplier Ledger | Supplier Ledger Export (PDF/Excel) is not working | `High` | `VERIFIED CLOSED` |
| **Bug-41** | https://prnt.sc/OaikFpgJm138
https://sme.yesbangladesh.net/admin/customers/ledger?customer_id=8 | Customer Ledger does not have a dedicated print layout | `High` | `VERIFIED CLOSED` |
| **Bug-42** | Customers → Customer Ledger | Customer Ledger PDF/Excel Export is not working | `High` | `VERIFIED CLOSED` |
| **Bug-43** | Customer Website -> My Orders / Sales Synchronization | Order payment status remains Unpaid on Customer Website even after receiving full due payment and marking Delivered in Admin Panel | `High` | `VERIFIED CLOSED` |
| **Bug-44** | Assets -> Asset Management | Editing useful life of an asset does not recalculate current book value and accumulated depreciation | `High` | `VERIFIED CLOSED` |
| **Bug-45** | Loans -> Lenders (Add/Edit Lender) | Missing frontend and backend input validation for Phone, Email, Account Number, and Bank Details in Lender form | `Medium` | `VERIFIED CLOSED` |
| **Bug-46** | Loans -> Personal Loans (Add/Edit Borrower) | Missing frontend and backend input validation for Name, Phone, and Email in Add/Edit Borrower form | `Medium` | `VERIFIED CLOSED` |
| **Bug-47** | Loans -> Repayment Schedule (Loan Details) | Misleading payment notification and silent transaction capping when overpayment amount is submitted on installment | `High` | `VERIFIED CLOSED` |
| **Bug-48** | Loans -> Lenders (Lender List View) | Lender table row fails to calculate 'Outstanding' balance (always displays ৳ 0), causing mismatch with Top Card summary | `High` | `VERIFIED CLOSED` |
| **Bug- 49** | Customers / Payments -> Customer Advance Return / Refund | System allows Customer Advance Refund exceeding available advance balance without validation, distorting Cash Flow | `High` | `VERIFIED CLOSED` |
| **Bug-50** | Staff -> Designations | Designation name field accepts and saves invalid/special characters only without proper validation | `Low` | `VERIFIED CLOSED` |
| **Bug-52** | Staff -> Leave Types | Leave Type Name and Code fields accept and save invalid/special characters only without validation | `Low` | `VERIFIED CLOSED` |
| **Bug-53** | Staff -> Employees (Add Employee) | Add Employee form lacks basic data validation (accepts invalid email format, non-digit phone/NID, and special characters only for name) | `Expected Result: The system must enforce strict validation rules before submission: 1. Full Name must contain valid alphabetic characters. 2. Phone Number must enforce valid phone digits (e.g., standard BD phone format: 11 digits). 3. Email must conform to standard RFC email regex (including valid domain and TLD). 4. NID must be numeric and enforce standard length constraints (10, 13, or 17 digits).` | `VERIFIED CLOSED` |
| **Bug-54** | Staff -> Departments | System allows deletion of a Department that is currently assigned to active employees, violating foreign key integrity | `High` | `VERIFIED CLOSED` |
| **Bug-55** | Staff -> Employees (Add Employee) | Add Employee form lacks uniqueness constraints, allowing 100% identical duplicate employee profiles (same Name, Email, and Phone Number) | `High` | `VERIFIED CLOSED` |
| **Bug-56** | Staff -> Employees -> Pay Salary & Cash Flow Sync | Critical financial flow failure: Paying salary bypasses cash-out 'Salary' head, deducts directly from 'Other Receipts' cash-in head, allows overpayment, and fails to settle Advance Balance | `High` | `VERIFIED CLOSED` |
| **Bug-57** | Staff -> Employees -> Pay Salary / Payroll History | Pay Salary lacks salary month/period mapping, allows unlimited duplicate payments for the same date/period, and fails to show salary payment status on employee profile | `High` | `VERIFIED CLOSED` |
| **Bug-58** | Staff -> Employees (Profile Pay Salary) vs Staff -> Payroll (Disbursement Sync) | Severe accounting routing inconsistency: Paying salary from Employee Profile improperly reduces Cash-In 'Other Receipts', whereas paying from Payroll correctly posts to Cash-Out 'Salary' | `High` | `VERIFIED CLOSED` |
| **Bug-59** | Manage Accounts -> Payments -> Delete Payment & Cash Flow Sync | Deleting an employee salary payment fails to log under 'Salary Refund (Payment Undone)' and improperly reverses back into 'Other Receipts' | `High` | `VERIFIED CLOSED` |
| **Bug-61** | Marketing -> Ad Spend -> Record Ad Spend | Mandatory 'Platform' dropdown is completely empty with no default options or creation mechanism, rendering Ad Spend recording unusable | `High` | `VERIFIED CLOSED` |
| **Bug-62** | Marketing -> SMS Campaigns & Cash Flow Integration | SMS Campaign billing calculates incorrect total cost (shows ৳ 2 instead of ৳ 4.50) and completely fails to log or sync campaign expenditure into Cash Flow. 

send sms = 0 
but cut cost = 2tk
not hit in cash flow yet | `High` | `VERIFIED CLOSED` |
| **Bug-65** | Branches -> Add Branch | Lack of input sanitization and character validation allows creating branches with pure special characters in Branch Name and Branch Code | `Medium` | `VERIFIED CLOSED` |
| **Bug-66** | Security -> User Management -> Edit / Create User | Missing input validation allows saving invalid Name, Phone Number, and incomplete Email address | `Medium` | `VERIFIED CLOSED` |
| **Bug-67** | Purchasing -> Purchase Returns & Cash Flow Integration | Completed Purchase Return fails to synchronize with Cash Flow (Cash In 'Purchase Return' remains ৳ 0 and Cash Out is not reversed) | `High` | `VERIFIED CLOSED` |
| **Bug-68** | Purchasing -> Suppliers -> Pay / Settlement & Advance Adjustment | Supplier existing advance/credit balance cannot be adjusted against new purchase invoices, and there is no mechanism to record Supplier Advance Refunds | `High` | `VERIFIED CLOSED` |
| **Bug-69** | Purchasing -> Suppliers -> Pay / Advance Return & Cash Flow Integration | Advance Return' from supplier is inverted into an outgoing payment (Direction: 'Paid') and credited to 'Supplier Payment' instead of Cash In -> 'Supplier Advance Refund' | `High` | `VERIFIED CLOSED` |
| **Bug-72** | Marketing -> Ad Spend -> View Ad Spend Details | Currency symbol mismatch: Ad spend created in BDT (৳) switches to USD ($) on the details view | `High` | `VERIFIED CLOSED` |
| **Bug-73** | Purchasing -> Purchase Returns & Manage Accounts -> Payments Integration | Purchase Return cash refund of ৳ 96,000 updates Cash Flow directly but creates no transaction record in Payments ledger | `High` | `VERIFIED CLOSED` |
| **Bug-74** | Purchasing -> Purchase Returns & Manage Accounts -> Payments Integration | Purchase Return cash refund creates no transaction voucher or ledger record under Payments | `High` | `VERIFIED CLOSED` |
| **Bug-75** | Purchasing -> Purchase Returns & Finance -> Payment Accounts Balance Synchronization | Purchase Return cash refund fails to credit the liquid Cash account balance | `High` | `VERIFIED CLOSED` |
| **Bug-77** | Settings -> Business Settings & Global Layout (Admin Sidebar & Public Frontend Header) | Logo display issues: Admin sidebar renders an undersized/unreadable logo on dark background, and Frontend header logo overflows and overlaps navigation buttons | `High` | `VERIFIED CLOSED` |
| **Bug-79** | Purchasing -> Purchase Returns & Manage Accounts -> Payments / Cash Flow | Completing an edited draft purchase return processes the obsolete initial draft amount instead of the updated total | `High` | `VERIFIED CLOSED` |
| **Bug-80** | Investment -> Record Capital & Manage Accounts -> Payments Integration | Investor capital injection updates Cash Flow and Payment Accounts but fails to generate a transaction voucher in Payments | `High` | `VERIFIED CLOSED` |
| **Bug-81** | Investment -> Record Capital (Withdrawal) & Manage Accounts -> Cash Flow Statement | Capital withdrawal incorrectly reduces 'Investor Capital In' instead of recording under 'Investor Capital Out' in Cash Flow statement | `High` | `VERIFIED CLOSED` |
| **Bug-82** | Investment -> Record Capital (Withdrawal) & Manage Accounts -> Payments Journal | Capital withdrawal completely bypasses the Payments journal ledger (No 'Paid' voucher generated and total payment metrics not updated) | `High` | `VERIFIED CLOSED` |
| **Bug-83** | Investment -> Record Capital (Withdrawal) & Validation | System permits over-withdrawal exceeding total capital balance, turning investor net capital negative (৳ -30,000) | `High` | `VERIFIED CLOSED` |
| **Bug-84** | Investment -> Profit Distributions & Manage Accounts -> Payments Journal | Profit distribution disburses liquid funds and updates Cash Flow but completely bypasses the Payments journal ledger (Zero vouchers created) | `High` | `VERIFIED CLOSED` |
| **Bug-85** | Finance -> Loans -> Personal Loans & Manage Accounts -> Payments Journal | Personal loan repayment (repaying loan taken from a person) completely bypasses the Payments journal ledger | `High` | `VERIFIED CLOSED` |
| **Bug-86** | Sales -> Sales Return & Manage Accounts -> Payments Journal Integration | Customer sales return updates Cash Flow ('Sale Return') but completely bypasses Payments journal and payment account ledger | `High` | `VERIFIED CLOSED` |
| **Bug-87** | Finance -> Payment Accounts -> Bank Charges & Manage Accounts -> Payments Journal | Bank charges debit account ledger and update Cash Flow but completely bypass Payments journal (No debit voucher generated) | `High` | `VERIFIED CLOSED` |
| **Bug-89** | Finance -> Payment Accounts -> Create Account & Manage Accounts -> Payments Journal | Account Opening Balance is categorized as 'Other Receipts' in Cash Flow and debits account balance, but creates no voucher in Payments journal | `High` | `VERIFIED CLOSED` |
| **Bug-90** | POS / Sales -> Sales Return & Manage Accounts -> Payment Accounts / Payments Journal | Sales return with cash refund updates Cash Flow ('Sale Return') but completely fails to deduct from Payment Account balance and creates no voucher in Payments journal | `High` | `VERIFIED CLOSED` |
| **Bug-91** | Finance -> Expenses -> Add Expense & Manage Accounts -> Payments Journal (/admin/payments) | Expense transactions update Cash Flow ('Expense') and deduct Payment Account balance, but fail to record a voucher in Payments journal | `High` | `VERIFIED CLOSED` |
| **Bug- 92** | Finance / Cash Flow & HR Payroll | Salary Undo/Refund Maps to Void Outflow Instead of Cash In Flow | `High` | `VERIFIED CLOSED` |
| **Bug-93** | Sales & Cash Flow | Sales revenue from "Create Order" incorrectly routes to "Other Receipts" instead of "Product Sale" | `High` | `VERIFIED CLOSED` |
| **Bug-94** | POS & Cash Flow | POS terminal cash sales incorrectly map to "Other Receipts" instead of "Product Sale" | `High` | `VERIFIED CLOSED` |
| **Bug -95** | Marketing / Ad Spend | Hardcoded dollar sign ($) displayed instead of default currency symbol (৳) in Ad Spend KPI cards | `High` | `VERIFIED CLOSED` |
| **Bug-96** | Loan Management / Payments | Loan disbursement/receipt transaction does not record in Payments list | `High` | `VERIFIED CLOSED` |
| **Bug-97** | Loan Management / Payments | Loan repayment transaction missing from Payments list | `High` | `VERIFIED CLOSED` |
| **Bug- 98** | Asset Management / Payments | Asset purchase payment does not sync to Payments list | `High` | `VERIFIED CLOSED` |
| **Bug-99** | Marketing / Payments | Ad spend expense fails to create entry in Payments transaction table | `High` | `VERIFIED CLOSED` |
| **Bug-100** | HR Payroll / Payments | Staff salary advance disbursement does not show in Payments list | `High` | `VERIFIED CLOSED` |
| **Bug-101** | HR Payroll / Payments | Salary return / payment undone does not record in Payments list | `High` | `VERIFIED CLOSED` |
| **Bug-103** | Finance -> Expenses -> Add Expense (/admin/expenses/create) | Expense creation form blocks back-dated transactions with hard validation (Back-dated transactions are not allowed) | `High` | `VERIFIED CLOSED` |
| **Bug-104** | Products -> Add New (/admin/products/create) | Pricing row input fields misaligned due to multi-line label on Cost/Purchase Price | `Medium` | `VERIFIED CLOSED` |
