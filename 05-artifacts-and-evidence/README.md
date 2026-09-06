# Audit Artifacts & Evidentiary Standards

> **Directory Identifier:** `05-artifacts-and-evidence/`  
> **Mandate:** Repository for Primary Audit Proofs, Digital Vouchers, Bank Statements, and Defect Captures  
> **Standard:** ISO/IEC 27037 & ISA 500 Compliant Digital Audit Trail Preservation

---

## 1. Overview & Evidentiary Policy

In financial systems quality assurance and statutory audit frameworks, assertion without cryptographic or visual evidence is unacceptable. This directory serves as the centralized repository for:
1. Physical and digital transaction payment/receipt vouchers.
2. Official third-party bank statements (UCB) and counter cash register closing tallies.
3. System UI screenshots demonstrating pre/post transaction account balances.
4. Screen recordings and network request payloads demonstrating defect conditions (specifically for `BUG-96`).

---

## 2. Standardized Artifact Naming Conventions

All contributors and automation agents must adhere to the following strict naming conventions:

### 2.1 Transaction Vouchers
```text
VOUCHER-TC[TestCaseID]-[Account]-[Module]_[VoucherNo].[ext]
```
* **Examples:**
  * `VOUCHER-TC01-NAIMUR-CAPITAL_DEP-95000.png`
  * `VOUCHER-TC08-TRANSFER-UCB-TO-CASH_TRF-15000.png`
  * `VOUCHER-TC09-NAIMUR-PURCH_BEFTN-30000.pdf`

### 2.2 Payment Account Ledger & Balance Overviews
```text
BALANCE-[Account]_[YYYYMMDD]_[Seq].[ext]
```
* **Examples:**
  * `BALANCE-NAIMUR-UCB_20260906_FINAL.png`
  * `BALANCE-CASHBOX_20260906_FINAL.png`
  * `BALANCE-CASHFLOW-STATEMENT_20260906.png`

### 2.3 Bank & Physical Till Reconciliation Documents
```text
STATEMENT-[BankName]_[AccountNo]_[YYYYMMDD].[ext]
TILL-CLOSING_[CounterID]_[YYYYMMDD].[ext]
```
* **Examples:**
  * `STATEMENT-UCB_NAIMUR-CORP_20260906.pdf`
  * `TILL-CLOSING_POS-COUNTER-01_20260906.pdf`

### 2.4 Defect Proofs & Trace Captures
```text
DEFECT-[BugID]_[Module]_[StepDescription].[ext]
```
* **Examples:**
  * `DEFECT-BUG96_EXPENSES_CashBoxDeduction_15500.png`
  * `DEFECT-BUG96_REPORTS_CashFlowOutflow_2500.png`
  * `DEFECT-BUG96_JOURNAL_EmptyPaymentVouchersTable.png`
  * `DEFECT-BUG96_HAR-NETWORK_PayloadTrace.json`

---

## 3. Evidence Catalog for Audited Test Cases (TC-01 through TC-23)

| Case ID | Transaction Description | Expected Evidence File | Format | Verification Check |
| :---: | :--- | :--- | :---: | :--- |
| **TC-01** | Partner Equity (৳ 95,000) | `VOUCHER-TC01-NAIMUR-CAPITAL.png` | Image | Bank deposit slip + Ledger |
| **TC-02** | Cash Float (৳ 15,000) | `VOUCHER-TC02-CASHBOX-CAPITAL.png` | Image | Vault receipt counter slip |
| **TC-03** | UCB Loan Disbursement (৳ 30,000) | `VOUCHER-TC03-NAIMUR-LOANDISB.png` | Image | Bank sanction credit advice |
| **TC-04** | Wholesale Invoice B2B (৳ 8,000) | `VOUCHER-TC04-NAIMUR-SALESINV.png` | Image | Bank remittance confirmation |
| **TC-05** | Retail POS Collection (৳ 4,500) | `VOUCHER-TC05-CASHBOX-POSSALES.png` | Image | POS cash drawer batch slip |
| **TC-06** | Personal Loan Recovery (৳ 3,000) | `VOUCHER-TC06-CASHBOX-LOANREC.png` | Image | Money receipt copy |
| **TC-07** | Salary Advance Recovery (৳ 3,000) | `VOUCHER-TC07-CASHBOX-HRREC.png` | Image | HR adjustment receipt |
| **TC-08** | Transfer Bank $\to$ Cash (৳ 15,000) | `VOUCHER-TC08-NAIMUR-TO-CASHBOX.png` | Image | Inter-account contra voucher |
| **TC-09** | Supplier Packaging Adv (৳ 30,000) | `VOUCHER-TC09-NAIMUR-PURCHADV.png` | Image | BEFTN transfer acknowledgment |
| **TC-10** | Supplier Raw Material Adv (৳ 8,000) | `VOUCHER-TC10-CASHBOX-PURCHADV.png` | Image | Supplier signed cash voucher |
| **TC-11** | ERP Server Procurement (৳ 25,000) | `VOUCHER-TC11-NAIMUR-ASSETBUY.png` | Image | Vendor commercial invoice |
| **TC-12** | AC Servicing & Repair (৳ 3,500) | `VOUCHER-TC12-CASHBOX-ASSETREP.png` | Image | Service invoice & bill copy |
| **TC-13** | Loan EMI Repayment (৳ 12,000) | `VOUCHER-TC13-NAIMUR-LOANEMI.png` | Image | UCB loan schedule debit slip |
| **TC-14** | Personal Advance Given (৳ 5,000) | `VOUCHER-TC14-CASHBOX-LOANGIV.png` | Image | Signed loan agreement/slip |
| **TC-15** | Meta Ads Card Spend (৳ 12,000) | `VOUCHER-TC15-NAIMUR-METAADS.png` | Image | Meta billing receipt statement |
| **TC-16** | Salary Advance Given (৳ 6,000) | `VOUCHER-TC16-CASHBOX-HRADV.png` | Image | Staff emergency loan requisition |
| **TC-17** | Office Rent Payment (৳ 20,000) | `VOUCHER-TC17-NAIMUR-RENT.png` | Image | Landlord rent receipt / BEFTN |
| **TC-18** | Pantry Supplies (**BUG-96**) | `DEFECT-BUG96_COMPOSITE.png` | Image | Evidence collage showing discrepancy |
| **TC-19** | Commercial Electricity (৳ 4,000) | `VOUCHER-TC19-NAIMUR-DESCO.png` | Image | DESCO electricity paid bill copy |
| **TC-20** | Corporate Broadband (৳ 1,500) | `VOUCHER-TC20-CASHBOX-INTERNET.png` | Image | ISP cash money receipt |
| **TC-21** | UCB Bank Charges (৳ 500) | `VOUCHER-TC21-NAIMUR-BANKCHG.png` | Image | Bank statement charge entry |
| **TC-22** | Partner Drawings (৳ 13,000) | `VOUCHER-TC22-NAIMUR-DRAWING.png` | Image | Bank transfer to partner account |
| **TC-23** | Urgent Store Consumables (৳ 13,000) | `VOUCHER-TC23-CASHBOX-CONSUME.png` | Image | Packaging tape/courier invoice bundle |

---

## 4. Cryptographic Non-Repudiation (SHA-256 Hashing)

To guarantee audit non-repudiation, whenever artifacts are committed into this directory, a companion manifest file `checksums.sha256` should be maintained:

```bash
# Generate SHA-256 checksums in PowerShell:
Get-FileHash -Algorithm SHA256 05-artifacts-and-evidence/*.* | Select-Object Hash, Path | Export-Csv -Path 05-artifacts-and-evidence/checksums.csv -NoTypeInformation
```

---

## 5. Retention & Confidentiality Notice

* All documents containing personally identifiable information (PII) such as bank account routing numbers or employee national IDs must be sanitized or masked (e.g. `142-***-**90`) prior to repository commit.
* Production audit artifacts must be retained for a minimum statutory period of 7 years in accordance with institutional corporate compliance regulations.
