# Bug-118: Sales Report Column Header Mismatch — Total Sales Deducts Returns while Collected & Due Remain Gross

> **Defect Identifier:** `BUG-118` (incorporating `BUG-119`)  
> **Severity:** `Medium` (Accounting Terminology Mismatch & User Confusion)  
> **Module:** `Reports -> Sales Report` (`/admin/reports/sales`), `Reports -> Monthly Summary` (`/admin/reports/monthly-summary`)  
> **Live System URL:** `https://sme.yesbangladesh.net/admin/reports/sales`  
> **Status:** `Open / Not Fixed`

---

## 1. Defect Summary

On the **Sales Report** (`/admin/reports/sales`) and **Monthly Summary** (`/admin/reports/monthly-summary`), the KPI card and table report:
- **Total Sales:** ৳ 125,500.00
- **Total Collected:** ৳ 136,000.00
- **Total Due:** ৳ 15,000.00

In standard accounting:
$$\text{Gross Sales} = \text{Collected} + \text{Due} = ৳\ 136,000 + ৳\ 15,000 = ৳\ 151,000.00$$

Having a column labeled **Total Sales** showing **৳ 125,500** creates an apparent contradiction where total sales is **৳ 10,500 less than the cash collected**!

---

## 2. Forensic Math Breakdown

The ৳ 25,500 gap is caused by two completed sale returns:
1. `SR-2026-0001` (06 Sep 2026): ৳ 25,000.00
2. `SR-2026-0002` (07 Sep 2026): ৳ 500.00
$$\text{Total Sale Returns} = ৳\ 25,500.00$$

The query for the `Total Sales` column computes:
$$\text{Reported Total Sales} = \text{Gross Sales } (৳\ 151,000) - \text{Sale Returns } (৳\ 25,500) = ৳\ 125,500.00$$

However:
1. The column is labeled **Total Sales** instead of **Net Sales**.
2. **Total Collected** remains at gross (৳ 136,000) rather than being adjusted for the cash refunds disbursed.
3. No explicit **Returns** or **Refunds** column is displayed in the table.

---

## 3. Remediation Recommendation

Update the report layout to show standard accounting columns:
| Gross Sales | Sale Returns | Net Sales | Collected | Due |
| :---: | :---: | :---: | :---: | :---: |
| ৳ 151,000.00 | ৳ 25,500.00 | **৳ 125,500.00** | ৳ 136,000.00 | ৳ 15,000.00 |
