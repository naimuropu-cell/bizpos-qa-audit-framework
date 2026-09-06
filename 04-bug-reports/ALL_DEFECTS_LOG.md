# Comprehensive Defect Audit Log (99 Audited Defects)

> **Repository Artifact:** `04-bug-reports/ALL_DEFECTS_LOG.md`  
> **Source Document:** BizPOS / YesSME ERP Web Store & Admin Audit Register (`web store issue report.xlsx`)  
> **Target System:** BizPOS / YesSME ERP v2.4 (Enterprise Multi-Module Core)  
> **Auditing Mandate:** End-to-End Accounting, POS, Inventory, and Ledger Audit Trail Reconciliation

---

## 1. Executive Defect Tally & Status Distribution

An exhaustive multi-module quality assurance and financial ledger audit was conducted across the BizPOS / YesSME ERP suite, identifying and auditing **99 operational and structural defects**. 

| Category Status | Count | Percentage | Operational & Audit Impact |
| :--- | :---: | :---: | :--- |
| **Fixed** | **67** | **67.68%** | Remediated and verified in current pre-production baseline. |
| **Need Revisions - QA** | **24** | **24.24%** | Critical financial discrepancies, broken journal links, or partial fixes needing rework. |
| **Not Fixed** | **5** | **5.05%** | Outstanding functional defects pending developer assignment. |
| **Invalid (Not An Issue)** | **3** | **3.03%** | Screened out as by-design or third-party behavioral constraints. |
| **TOTAL AUDITED** | **99** | **100.00%** | **Closed-loop defect reconciliation catalog.** |

---

## 2. Category Breakdown & Audit Significance

```text
+---------------------------------------------------------------------------------------+
| DEFECT DISTRIBUTION BREAKDOWN (TOTAL: 99)                                             |
+---------------------------------------------------------------------------------------+
| [==================================] Fixed: 67 (67.7%)                              |
| [============] Need Revisions - QA: 24 (24.2%)                                        |
| [==] Not Fixed: 5 (5.1%)                                                             |
| [=] Invalid: 3 (3.0%)                                                                |
+---------------------------------------------------------------------------------------+
```

* **Financial Integrity Red Flags:** The audit revealed critical decouplings between active payment accounts and reporting statements:
  * **[BUG-70](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md):** ৳ 842,249.98 reconciliation breakdown between Cash Flow Net and payment account balances.
  * **[BUG-76](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md):** Out-of-Stock validation failure on purchase return mutates central Cash Flow statement due to missing database transaction rollback boundaries.
  * **[BUG-96](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md) to BUG-99:** Sub-ledger transaction modules (Loans, Assets, Marketing) deduct payment accounts and log in Cash Flow, but systematically bypass the master `Finance -> Payments Journal`.

---

## 3. High-Priority: Need Revisions - QA (24 Defects)

These defects represent core financial discrepancies, broken journal hooks, or partially remediated workflows requiring developer revisions:

| Defect ID | Module / Feature Area | Defect Title & Description | Priority | Expected Behavior / QA Note |
| :--- | :--- | :--- | :---: | :--- |
| **Bug-60** | Staff -> Payroll -> Process/Disburse vs Manage Accounts -> Payments | **Bulk/Batch payroll disbursements update Cash Flow but fail to create corresponding payment records in Manage Accounts -> Payments**<br>_When executing a full payroll payout (e.g., October 2026 payroll with Net Pay ৳ 74,226 under batch ref PAY-2026-0003), the payout correctly increments the Ca..._ | `High` | Requires developer rework and re-audit. |
| **Bug-63** | Marketing -> Email Marketing -> Create Campaign | **Email Template selector cards are non-functional and fail to populate preset layouts into the Email Body editor on click**<br>_On the Create Email Campaign page, the 'Email Template' section provides three selectable preset cards: 'Newsletter', 'Promotion', and 'Minimal'. Clicking on..._ | `Medium` | Expected Result: Clicking an Email Template card should visibly highlight the selected card (active state) and load predefined responsive HTML/text layout di... |
| [**Bug-70**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-70_Severe_Cash_Flow_Discrepancy.md) | Manage Accounts -> Payment Accounts & Cash Flow Reconciliation | **Severe financial discrepancy: Sum of all Payment Account balances does not match Cash Flow Net Balance (Difference: ৳ 842,249.98)**<br>_A critical ledger reconciliation breakdown exists between the Payment Accounts balances and the central Cash Flow statement. Under Balance Transfers, the sum..._ | `High` | Expected Result: In any standard accounting platform, Cash Flow Net Balance (All-time Cash In minus Cash Out) MUST mathematically equal the exact consolidate... |
| **Bug-71** | Marketing -> Ad Spend & Cash Flow Integration | **Ad Spend expense is deducted from Cash In ('Other Receipts') instead of being recorded as Cash Out ('Expense')**<br>_A critical accounting violation occurred upon recording an Ad Spend of ৳ 5,150 (Amount ৳ 5,000 + Tax ৳ 150) paid via Cash. Instead of recording this marketin..._ | `High` | Expected Result: Operating expenses (marketing/advertising and associated taxes) must be posted as Cash Outflows under Cash Out -> 'Expense' (or a dedicated ... |
| [**Bug-76**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-76_Purchase_Return_Rollback_Failure.md) | Purchasing -> Purchase Returns & Cash Flow Mutation Transaction Safety | **Failed purchase return validation (Out of Stock error) permanently mutates Cash Flow statement prior to form submission completion**<br>_The Cash Flow reporting table is mutated before server-side stock validation checks are completed. When attempting to return 40 units (refund value ৳ 48,000)..._ | `High` | Expected Result: All financial mutations must reside strictly within a database transaction closure (DB::transaction). Stock validation, account crediting, v... |
| **Bug-78** | Purchasing -> Purchase Returns & Inventory Validation | **System allows cumulative purchase returns to exceed original PO quantity (Over-Return exploit allowed based on total branch stock)**<br>_The system validates purchase returns against aggregate branch inventory rather than enforcing the remaining returnable quantity ceiling of the specific Purc..._ | `High` | Expected Result: Remaining returnable quantity must be strictly calculated per purchase order line item: Max Return Qty = (Purchased Qty - Already Returned Q... |
| **Bug-79** | Purchasing -> Purchase Returns & Manage Accounts -> Payments / Cash Flow | **Completing an edited draft purchase return processes the obsolete initial draft amount instead of the updated total**<br>_When an uncompleted draft purchase return is edited to reduce item quantities, the system persists and executes the financial settlement using the original d..._ | `High` | Expected Result: Payment voucher creation and cash flow mutations during return completion must be recalculated dynamically from the active line items (75 × ... |
| **Bug-80** | Investment -> Record Capital & Manage Accounts -> Payments Integration | **Investor capital injection updates Cash Flow and Payment Accounts but fails to generate a transaction voucher in Payments**<br>_A critical audit trail failure exists in the Investor Capital workflow. When recording an equity capital injection of ৳ 600,000 for an investor (Naimur Rahma..._ | `High` | Expected Result: Recording a capital injection must atomically generate a corresponding receipt voucher in the Payments ledger (Direction: Received, Party Ty... |
| **Bug-81** | Investment -> Record Capital (Withdrawal) & Manage Accounts -> Cash Flow Statement | **Capital withdrawal incorrectly reduces 'Investor Capital In' instead of recording under 'Investor Capital Out' in Cash Flow statement**<br>_A critical accounting violation and improper netting defect exists in the Investor Capital withdrawal workflow. In standard accounting, capital inflows and o..._ | `High` | Requires developer rework and re-audit. |
| **Bug-82** | Investment -> Record Capital (Withdrawal) & Manage Accounts -> Payments Journal | **Capital withdrawal completely bypasses the Payments journal ledger (No 'Paid' voucher generated and total payment metrics not updated)**<br>_Executing an equity capital withdrawal fails to create an audit record in the core Payments journal (/admin/payments). When withdrawing capital (tested with ..._ | `High` | Expected Result: Any capital withdrawal must atomically trigger an outgoing payment voucher in the Payments ledger (Direction: Paid, Party Type: Investor, Am... |
| **Bug-83** | Investment -> Record Capital (Withdrawal) & Validation | **System permits over-withdrawal exceeding total capital balance, turning investor net capital negative (৳ -30,000)**<br>_https://prnt.sc/3kKEjd3pt6-f https://sme.yesbangladesh.net/admin/accounting/investment/investors/4_ | `High` | Expected Result: When an investor attempts to withdraw funds, the system must enforce a validation rule: Withdrawal Amount <= Current Net Capital. For Invest... |
| **Bug-84** | Investment -> Profit Distributions & Manage Accounts -> Payments Journal | **Profit distribution disburses liquid funds and updates Cash Flow but completely bypasses the Payments journal ledger (Zero vouchers created)**<br>_Executing a multi-party profit distribution disburses liquid cash and populates Cash Flow ('Profit Distribution' under Cash Out), but fails to generate corre..._ | `High` | Expected Result: When a profit distribution batch is confirmed, the system must atomically generate separate 'Paid' payment vouchers in the Payments journal ... |
| **Bug-85** | Finance -> Loans -> Personal Loans & Manage Accounts -> Payments Journal | **Personal loan repayment (repaying loan taken from a person) completely bypasses the Payments journal ledger**<br>_Settling or repaying a personal loan taken from an individual completely bypasses the Payments journal ledger (/admin/payments). A repayment of ৳ 4,000 was e..._ | `High` | Requires developer rework and re-audit. |
| **Bug-86** | Sales -> Sales Return & Manage Accounts -> Payments Journal Integration | **Customer sales return updates Cash Flow ('Sale Return') but completely bypasses Payments journal and payment account ledger**<br>_When processing a customer sales return with an immediate cash refund, the transaction updates the Cash Flow statement under 'Sale Return' (Cash Out), but fa..._ | `High` | Requires developer rework and re-audit. |
| **Bug-87** | Finance -> Payment Accounts -> Bank Charges & Manage Accounts -> Payments Journal | **Bank charges debit account ledger and update Cash Flow but completely bypass Payments journal (No debit voucher generated)**<br>_Recording bank service charges creates a direct balance deduction in the individual bank account ledger and reflects under Cash Out in the Cash Flow statemen..._ | `High` | Expected Result: Any fee, commission, or service charge deducted from a liquid payment account must atomically generate an outward payment voucher in the cen... |
| **Bug-89** | Finance -> Payment Accounts -> Create Account & Manage Accounts -> Payments Journal | **Account Opening Balance is categorized as 'Other Receipts' in Cash Flow and debits account balance, but creates no voucher in Payments journal**<br>_When initializing a new Payment Account (e.g., Bank Account 'hegdludg' with Opening Balance: ৳ 5,200), the system increments the account running balance and ..._ | `High` | Requires developer rework and re-audit. |
| **Bug-90** | POS / Sales -> Sales Return & Manage Accounts -> Payment Accounts / Payments Journal | **Sales return with cash refund updates Cash Flow ('Sale Return') but completely fails to deduct from Payment Account balance and creates no voucher in Payments journal**<br>_Processing a customer product sales return involving a cash payout increases Cash Flow under CASH OUT -> 'Sale Return', but the transaction is completely dec..._ | `High` | Requires developer rework and re-audit. |
| **Bug-91** | Finance -> Expenses -> Add Expense & Manage Accounts -> Payments Journal (/admin/payments) | **Expense transactions update Cash Flow ('Expense') and deduct Payment Account balance, but fail to record a voucher in Payments journal**<br>_When an operational expense (৳ 5,000 via NAIMUR Bank Account) is logged through the Expenses module, the money is correctly deducted from the bank balance (d..._ | `High` | Requires developer rework and re-audit. |
| **Bug- 92** | Finance / Cash Flow & HR Payroll | **Salary Undo/Refund Maps to Void Outflow Instead of Cash In Flow**<br>_When a disbursed salary is undone/refunded, the system zeroes out Cash Out -> Salary instead of populating Cash In -> Salary Refund (Payment Undone). Althoug..._ | `High` | Requires developer rework and re-audit. |
| **Bug-93** | Sales & Cash Flow | **Sales revenue from "Create Order" incorrectly routes to "Other Receipts" instead of "Product Sale"**<br>_When completing a full cash sale (e.g., ৳ 25,000) via standard order creation, the CASH IN row Product Sale remains ৳ 0, while Other Receipts increases by ৳ ..._ | `High` | Requires developer rework and re-audit. |
| **Bug-94** | POS & Cash Flow | **POS terminal cash sales incorrectly map to "Other Receipts" instead of "Product Sale"**<br>_Completing a direct POS checkout does not populate the Product Sale row under CASH IN on the Cash Flow Statement; instead, it dumps the received funds into O..._ | `High` | Requires developer rework and re-audit. |
| **Bug -95** | Marketing / Ad Spend | **Hardcoded dollar sign ($) displayed instead of default currency symbol (৳) in Ad Spend KPI cards**<br>_https://sme.yesbangladesh.net/admin/ad-spend All overall KPI summary cards on the Ad Spend page (Total Spent, Daily Average, Avg CPC) display the hardcoded D..._ | `High` | Requires developer rework and re-audit. |
| [**Bug-96**](file:///d:/Ecommerce+admin%20management/04-bug-reports/Bug-96_Payments_Journal_Voucher_Missing.md) | Loan Management / Payments | **Loan disbursement/receipt transaction does not record in Payments list**<br>_When a loan is taken or disbursed, the balance updates in Payment Accounts and Cash Flow, but no corresponding ledger entry is created in Manage Accounts -> ..._ | `High` | Requires developer rework and re-audit. |
| **Bug-97** | Loan Management / Payments | **Loan repayment transaction missing from Payments list**<br>_Loan repayment (installment/full repayment) deducts/adds amount from account and hits Cash Flow, but fails to generate a row in Manage Accounts -> Payments_ | `High` | Requires developer rework and re-audit. |

---

## 4. Unresolved: Not Fixed (5 Defects)

These issues are open and have not yet been remediated in the staging environment:

| Defect ID | Module / Feature Area | Defect Title & Description | Priority | Expected Behavior / QA Note |
| :--- | :--- | :--- | :---: | :--- |
| **Bug-39** | need to polish the templete https://prnt.sc/7I4ZohV86JrD | **Supplier Ledger does not have a dedicated business-format print layout**<br>_https://prnt.sc/H6lCKdBEh2b7 https://sme.yesbangladesh.net/admin/suppliers/6/ledger_ | `High` | Implement a dedicated print-friendly Supplier Ledger layout. The print output should include company information/header, report title (Supplier Ledger), supp... |
| **Bug- 98** | Asset Management / Payments | **Asset purchase payment does not sync to Payments list**<br>_Recording an asset purchase correctly reflects under Asset Purchase in Cash Flow and deducts account balance, but no payment log appears in Manage Accounts -..._ | `High` | Open defect awaiting developer assignment. |
| **Bug-99** | Marketing / Payments | **Ad spend expense fails to create entry in Payments transaction table**<br>_Recording ad spend deducts balance from Payment Accounts and displays in Cash Flow under Ad Spend, but no payment record is listed in Manage Accounts -> Paym..._ | `High` | Open defect awaiting developer assignment. |
| **Bug-100** | HR Payroll / Payments | **Staff salary advance disbursement does not show in Payments list**<br>_Giving an advance to an employee impacts account balance and Cash Flow (Salary Advance (Employee)), but the transaction is completely absent from Manage Acco..._ | `High` | Open defect awaiting developer assignment. |
| **Bug-101** | HR Payroll / Payments | **Salary return / payment undone does not record in Payments list**<br>_Reverting/refunding a salary payment updates cash flow/account balances, but creates no reversal or refund entry in Manage Accounts -> Payments_ | `High` | Open defect awaiting developer assignment. |

---

## 5. Dismissed: Invalid / Not An Issue (3 Defects)

These reports were audited and classified as by-design, expected business logic, or third-party limitations:

| Defect ID | Module / Feature Area | Defect Title & Description | Priority | Resolution Justification |
| :--- | :--- | :--- | :---: | :--- |
| **Bug-15** | Stock → Stock Transfer | **Stock Transfer allows transfer quantity greater than available stock**<br>_The system allows transferring 1,000 pcs of a product from the Main Branch even though only 48 pcs are available in the source branch. This allows users to t..._ | `High` | https://prnt.sc/icNInFmXvITz |
| **Bug-22** | eCommerce → Customer Website → Authentication | **Google Login is unavailable for existing customer accounts**<br>_https://prnt.sc/TUKuSnKYStve An existing customer account was previously registered using a Gmail address. When attempting to log in through Continue/Login w..._ | `High` | Need credentials |
| **Bug-51** | Staff -> Departments | **Department name field accepts and saves invalid/special characters only without validation**<br>_Similar to the Designation module, the Department Name field lacks string validation or character sanitization. The system permits users to save department n..._ | `Medium` | Classified as Not An Issue after system analysis. |

---

## 6. Remediated: Fixed Defects (67 Defects)

The following 67 defects were resolved and verified in the current baseline build:

| Defect ID | Module / Feature Area | Defect Title & Resolution Summary | Type | Priority | Status |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Bug -1** | Customer website / Registration | **Customer registration shows “Too Many Attempts” during normal registration** | Functional | `High` | **PASSED (Fixed)** |
| **Bug-2** | Customers → Bulk Import | **Bulk Customer Import Template is missing** | Development | `High` | **PASSED (Fixed)** |
| **Bug-3** | Dashboard | **Full screen mode won't work here but in others module it works properly** | Design | `Medium` | **PASSED (Fixed)** |
| **Bug-4** | Products → Categories | **Category Name accepts only special characters** | Development | `High` | **PASSED (Fixed)** |
| **Bug-5** | Products → Brands | **Brand Name accepts only special characters** | Development | `High` | **PASSED (Fixed)** |
| **Bug-6** | Products → Variants | **Variant Name accepts only special characters** | Development | `High` | **PASSED (Fixed)** |
| **Bug-7** | Products → Import Product | **Product Import Excel Template is missing** | Development | `High` | **PASSED (Fixed)** |
| **Bug-8** | Products → Stock History | **Product opening stock is not reflected in Stock History** | Development | `High` | **PASSED (Fixed)** |
| **Bug-9** | Sales → Sales List | **Sales List table content breaks vertically in the Details column** | Design | `High` | **PASSED (Fixed)** |
| **Bug-10** | Customer Website / Order list | **Customer website shows order as Unpaid after payment is recorded in Admin** | Development | `High` | **PASSED (Fixed)** |
| **Bug-11** | Customer Website / My Orders | **Admin-created order for a registered customer does not appear in the customer's My Orders list** | Development | `High` | **PASSED (Fixed)** |
| **Bug-12** | POS | **POS shows insufficient stock although sufficient stock is available** | Development | `High` | **PASSED (Fixed)** |
| **Bug-13** | Sales → Create Order / Inventory | **Order can be delivered with quantity exceeding available stock and stock is not deducted** | Development | `High` | **PASSED (Fixed)** |
| **Bug-14** | Add product | **Product Name accepts only special characters** | Development | `High` | **PASSED (Fixed)** |
| **Bug-16** | Suppliers → Add Supplier | **Supplier Name and Phone Number accept special-character-only values** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-17** | Suppliers → Supplier Groups | **Supplier Group Name accepts only special characters** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-18** | Mnaage Accounts/Accounts list / Add account | **Payment account type mobile banking - mobile number , account name accepts invalid special characters** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug- 19** | Add payment account / Cards | **Acc Name , Card holder name , Card last 4 digit accepts invalid special character only** | Development | `High` | **PASSED (Fixed)** |
| **Bug-20** | Products → Bulk Import | **Product bulk import fails without displaying any error message** | Development | `High` | **PASSED (Fixed)** |
| **Bug-21** | Products | **Action buttons are arranged in a less intuitive order** | Design | `High` | **PASSED (Fixed)** |
| **Bug-23** | Investment → Investors | **Investor form accepts invalid/special-character-only data** | Development | `High` | **PASSED (Fixed)** |
| **Bug-24** | Manage Accounts → Expense Group | **Expense Category accepts only special characters** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-25** | Expenses/ view expense | **Delete Expense button is displayed for Paid/Approved expenses** | Design | `Medium` | **PASSED (Fixed)** |
| **Bug-26** | Assets → Categories | **Asset Category Name accepts only special characters** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-27** | Assets → Categories | **Depreciation Rate is automatically set to 20% when left blank** | Development | `High` | **PASSED (Fixed)** |
| **Bug-28** | Assets / Cash Flow | **Asset maintenance costs are not reflected in Cash Flow** | Development | `High` | **PASSED (Fixed)** |
| **Bug-29** | Asset Management – Depreciation | **Incorrect Declining Balance Depreciation Calculation** | Development | `High` | **PASSED (Fixed)** |
| **Bug-30** | Asset Management – Depreciation | **Incorrect Straight Line Depreciation Calculation** | Development | `High` | **PASSED (Fixed)** |
| **Bug-31** | Sales → Sales Returns | **Sales Return calculates refund based on regular price instead of discounted invoice price** | Development | `High` | **PASSED (Fixed)** |
| **Bug-32** | Sales Return / Manage Accounts/ Cash Flow | **Completed cash sale return is not reflected in Cash Flow** | Development | `High` | **PASSED (Fixed)** |
| **Bug-33** | Customers / Payments -> Customer Due Receive | **Overpayment during Due Receive incorrectly posts entire amount to Customer Due Receive instead of splitting to Advance** | Development | `High` | **PASSED (Fixed)** |
| **Bug-34** | eCommerce / Sales -> Sales List | **eCommerce coupon discount is completely ignored and dropped when order syncs to Admin Sales List** | Development | `High` | **PASSED (Fixed)** |
| **Bug-35** | eCommerce -> Coupons | **Usage limit per customer restriction fails allowing same customer to reuse single-use coupon multiple times** | Development | `High` | **PASSED (Fixed)** |
| **Bug-36** | Suppliers → Import Suppliers | **System-generated Sample CSV file is rejected during Supplier Import** | Development | `High` | **PASSED (Fixed)** |
| **Bug-37** | Suppliers → Create Supplier | **No custom bank name field when “Other” bank is selected** | Development | `High` | **PASSED (Fixed)** |
| **Bug-38** | Suppliers → Create/Edit Supplier | **Invalid special characters are accepted in supplier information fields** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-40** | Suppliers → Supplier Ledger | **Supplier Ledger Export (PDF/Excel) is not working** | Development | `High` | **PASSED (Fixed)** |
| **Bug-41** | https://prnt.sc/OaikFpgJm138 https://sme.yesbangladesh.net/admin/customers/ledger?customer_id=8 | **Customer Ledger does not have a dedicated print layout** | Design | `High` | **PASSED (Fixed)** |
| **Bug-42** | Customers → Customer Ledger | **Customer Ledger PDF/Excel Export is not working** | Development | `High` | **PASSED (Fixed)** |
| **Bug-43** | Customer Website -> My Orders / Sales Synchronization | **Order payment status remains Unpaid on Customer Website even after receiving full due payment and marking Delivered in Admin Panel** | Development | `High` | **PASSED (Fixed)** |
| **Bug-44** | Assets -> Asset Management | **Editing useful life of an asset does not recalculate current book value and accumulated depreciation** | Development | `High` | **PASSED (Fixed)** |
| **Bug-45** | Loans -> Lenders (Add/Edit Lender) | **Missing frontend and backend input validation for Phone, Email, Account Number, and Bank Details in Lender form** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-46** | Loans -> Personal Loans (Add/Edit Borrower) | **Missing frontend and backend input validation for Name, Phone, and Email in Add/Edit Borrower form** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-47** | Loans -> Repayment Schedule (Loan Details) | **Misleading payment notification and silent transaction capping when overpayment amount is submitted on installment** | Development | `High` | **PASSED (Fixed)** |
| **Bug-48** | Loans -> Lenders (Lender List View) | **Lender table row fails to calculate 'Outstanding' balance (always displays ৳ 0), causing mismatch with Top Card summary** | Development | `High` | **PASSED (Fixed)** |
| **Bug- 49** | Customers / Payments -> Customer Advance Return / Refund | **System allows Customer Advance Refund exceeding available advance balance without validation, distorting Cash Flow** | Development | `High` | **PASSED (Fixed)** |
| **Bug-50** | Staff -> Designations | **Designation name field accepts and saves invalid/special characters only without proper validation** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-52** | Staff -> Leave Types | **Leave Type Name and Code fields accept and save invalid/special characters only without validation** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-53** | Staff -> Employees (Add Employee) | **Add Employee form lacks basic data validation (accepts invalid email format, non-digit phone/NID, and special characters only for name)** | Development | `Expected Result: The system must enforce strict validation rules before submission: 1. Full Name must contain valid alphabetic characters. 2. Phone Number must enforce valid phone digits (e.g., standard BD phone format: 11 digits). 3. Email must conform to standard RFC email regex (including valid domain and TLD). 4. NID must be numeric and enforce standard length constraints (10, 13, or 17 digits).` | **PASSED (Fixed)** |
| **Bug-54** | Staff -> Departments | **System allows deletion of a Department that is currently assigned to active employees, violating foreign key integrity** | Development | `High` | **PASSED (Fixed)** |
| **Bug-55** | Staff -> Employees (Add Employee) | **Add Employee form lacks uniqueness constraints, allowing 100% identical duplicate employee profiles (same Name, Email, and Phone Number)** | Development | `High` | **PASSED (Fixed)** |
| **Bug-56** | Staff -> Employees -> Pay Salary & Cash Flow Sync | **Critical financial flow failure: Paying salary bypasses cash-out 'Salary' head, deducts directly from 'Other Receipts' cash-in head, allows overpayment, and fails to settle Advance Balance** | Development | `High` | **PASSED (Fixed)** |
| **Bug-57** | Staff -> Employees -> Pay Salary / Payroll History | **Pay Salary lacks salary month/period mapping, allows unlimited duplicate payments for the same date/period, and fails to show salary payment status on employee profile** | Development | `High` | **PASSED (Fixed)** |
| **Bug-58** | Staff -> Employees (Profile Pay Salary) vs Staff -> Payroll (Disbursement Sync) | **Severe accounting routing inconsistency: Paying salary from Employee Profile improperly reduces Cash-In 'Other Receipts', whereas paying from Payroll correctly posts to Cash-Out 'Salary'** | Development | `High` | **PASSED (Fixed)** |
| **Bug-59** | Manage Accounts -> Payments -> Delete Payment & Cash Flow Sync | **Deleting an employee salary payment fails to log under 'Salary Refund (Payment Undone)' and improperly reverses back into 'Other Receipts'** | Development | `High` | **PASSED (Fixed)** |
| **Bug-61** | Marketing -> Ad Spend -> Record Ad Spend | **Mandatory 'Platform' dropdown is completely empty with no default options or creation mechanism, rendering Ad Spend recording unusable** | Development | `High` | **PASSED (Fixed)** |
| **Bug-62** | Marketing -> SMS Campaigns & Cash Flow Integration | **SMS Campaign billing calculates incorrect total cost (shows ৳ 2 instead of ৳ 4.50) and completely fails to log or sync campaign expenditure into Cash Flow. send sms = 0 but cut cost = 2tk not hit in cash flow yet** | Development | `High` | **PASSED (Fixed)** |
| **Bug-65** | Branches -> Add Branch | **Lack of input sanitization and character validation allows creating branches with pure special characters in Branch Name and Branch Code** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-66** | Security -> User Management -> Edit / Create User | **Missing input validation allows saving invalid Name, Phone Number, and incomplete Email address** | Development | `Medium` | **PASSED (Fixed)** |
| **Bug-67** | Purchasing -> Purchase Returns & Cash Flow Integration | **Completed Purchase Return fails to synchronize with Cash Flow (Cash In 'Purchase Return' remains ৳ 0 and Cash Out is not reversed)** | Development | `High` | **PASSED (Fixed)** |
| **Bug-68** | Purchasing -> Suppliers -> Pay / Settlement & Advance Adjustment | **Supplier existing advance/credit balance cannot be adjusted against new purchase invoices, and there is no mechanism to record Supplier Advance Refunds** | Development | `High` | **PASSED (Fixed)** |
| **Bug-69** | Purchasing -> Suppliers -> Pay / Advance Return & Cash Flow Integration | **Advance Return' from supplier is inverted into an outgoing payment (Direction: 'Paid') and credited to 'Supplier Payment' instead of Cash In -> 'Supplier Advance Refund'** | Development | `High` | **PASSED (Fixed)** |
| **Bug-72** | Marketing -> Ad Spend -> View Ad Spend Details | **Currency symbol mismatch: Ad spend created in BDT (৳) switches to USD ($) on the details view** | Development | `High` | **PASSED (Fixed)** |
| **Bug-73** | Purchasing -> Purchase Returns & Manage Accounts -> Payments Integration | **Purchase Return cash refund of ৳ 96,000 updates Cash Flow directly but creates no transaction record in Payments ledger** | Development | `High` | **PASSED (Fixed)** |
| **Bug-74** | Purchasing -> Purchase Returns & Manage Accounts -> Payments Integration | **Purchase Return cash refund creates no transaction voucher or ledger record under Payments** | Development | `High` | **PASSED (Fixed)** |
| **Bug-75** | Purchasing -> Purchase Returns & Finance -> Payment Accounts Balance Synchronization | **Purchase Return cash refund fails to credit the liquid Cash account balance** | Development | `High` | **PASSED (Fixed)** |
| **Bug-77** | Settings -> Business Settings & Global Layout (Admin Sidebar & Public Frontend Header) | **Logo display issues: Admin sidebar renders an undersized/unreadable logo on dark background, and Frontend header logo overflows and overlaps navigation buttons** | Design | `High` | **PASSED (Fixed)** |

---

## 7. Strategic Remediation Roadmap for Engineering

1. **Immediate P0 Action:** Apply `DB::transaction` wrappers across all financial endpoints to prevent partial persistence and rollback failures (resolves **BUG-76**).
2. **Immediate P1 Action:** Refactor sub-ledger event dispatching so that every monetary deduction (Loans, Assets, Marketing, Advances, Petty Cash) dispatches a synchronized event to `JournalService::createPaymentVoucher()` (resolves **BUG-60, BUG-82, BUG-84, BUG-85, BUG-86, BUG-87, BUG-91, BUG-96, BUG-97, BUG-98, BUG-99**).
3. **Database Audit & Balance Repair:** Run a reconciliation script on staging to adjust the ৳ 842k ledger gap and balance transfer account anomalies (resolves **BUG-70**).
