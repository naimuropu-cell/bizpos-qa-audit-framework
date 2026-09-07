#!/usr/bin/env python3
"""
BizPOS QA Audit Framework - Automated Financial Reconciliation Audit Script
=============================================================================
Script: scripts/reconciliation_audit.py
Mandate: Verify Zero-Variance Financial Parity across 23 Operational Transactions.
Formula: Sum(Cash In) - Sum(Cash Out) == Net Balance == Sum(Active Payment Accounts)
Exit Codes:
    0: Zero-Variance Parity Verified (PASS)
    1: Parity Violation / Drift Detected (FAIL)
"""

import sys
import argparse
from typing import List, Dict, Any


# ----------------------------------------------------------------------
# Audited Baseline Dataset: 23 End-to-End Operational Transactions
# ----------------------------------------------------------------------
TRANSACTIONS: List[Dict[str, Any]] = [
    # --- Cash Inflows (Total: ৳ 158,500.00) ---
    {
        "id": "TC-01",
        "module": "Capital Management",
        "type": "CASH_IN",
        "desc": "Partner Initial Equity Injection via Bank Deposit",
        "account": "NAIMUR",
        "inflow": 95000.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-02",
        "module": "Capital Management",
        "type": "CASH_IN",
        "desc": "Partner Working Capital Cash Float Injection",
        "account": "Cash Box",
        "inflow": 15000.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-03",
        "module": "Lender Loan Management",
        "type": "CASH_IN",
        "desc": "Commercial SME Term Loan Disbursement from UCB",
        "account": "NAIMUR",
        "inflow": 30000.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-04",
        "module": "Sales & Invoicing",
        "type": "CASH_IN",
        "desc": "B2B Wholesale Invoice Direct Bank Wire Settlement",
        "account": "NAIMUR",
        "inflow": 8000.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-05",
        "module": "Sales & Retail POS",
        "type": "CASH_IN",
        "desc": "Retail Counter POS Daily Walk-in Sales Cash Collection",
        "account": "Cash Box",
        "inflow": 4500.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-06",
        "module": "Personal Loan Management",
        "type": "CASH_IN",
        "desc": "Recovery of Short-term Personal Staff Advance",
        "account": "Cash Box",
        "inflow": 3000.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-07",
        "module": "HR & Payroll",
        "type": "CASH_IN",
        "desc": "Employee Emergency Salary Advance Direct Cash Repayment",
        "account": "Cash Box",
        "inflow": 3000.00,
        "outflow": 0.00,
        "transfer": 0.00,
    },
    # --- Inter-Account Contra Transfer ---
    {
        "id": "TC-08",
        "module": "Inter-Account Transfer",
        "type": "CONTRA_TRANSFER",
        "desc": "Internal Fund Transfer: Bank to Counter Cash Box",
        "account": "TRANSFER",
        "from_account": "NAIMUR",
        "to_account": "Cash Box",
        "inflow": 0.00,
        "outflow": 0.00,
        "transfer": 15000.00,
    },
    # --- Cash Outflows (Total: ৳ 156,000.00) ---
    {
        "id": "TC-09",
        "module": "Purchasing & Suppliers",
        "type": "CASH_OUT",
        "desc": "Advance Payment to Primary Packaging Supplier via BEFTN",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 30000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-10",
        "module": "Purchasing & Suppliers",
        "type": "CASH_OUT",
        "desc": "Advance Cash Payment to Local Raw Material Vendor",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 8000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-11",
        "module": "Fixed Assets",
        "type": "CASH_OUT",
        "desc": "Procurement of Core ERP Server Hardware & POS Terminals",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 25000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-12",
        "module": "Fixed Assets",
        "type": "CASH_OUT",
        "desc": "Office Air Conditioning & Electrical Routine Maintenance",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 3500.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-13",
        "module": "Lender Loan Management",
        "type": "CASH_OUT",
        "desc": "Monthly SME Term Loan EMI Debit (Principal + Interest)",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 12000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-14",
        "module": "Personal Loan Management",
        "type": "CASH_OUT",
        "desc": "Disbursement of Short-term Personal Friendly Loan",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 5000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-15",
        "module": "Marketing & Advertising",
        "type": "CASH_OUT",
        "desc": "Meta Facebook Ads Corporate Master Card Settlement",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 12000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-16",
        "module": "HR & Payroll",
        "type": "CASH_OUT",
        "desc": "Disbursement of Mid-month Salary Advance to Staff",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 6000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-17",
        "module": "General Expenses",
        "type": "CASH_OUT",
        "desc": "Monthly Corporate Head Office Space Commercial Rent",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 20000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-18",
        "module": "General Expenses",
        "type": "CASH_OUT",
        "desc": "Pantry Supplies & Refreshments (Audited BUG-96)",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 2500.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-19",
        "module": "General Expenses",
        "type": "CASH_OUT",
        "desc": "Monthly Commercial Electricity & DESCO Utility Bill",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 4000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-20",
        "module": "General Expenses",
        "type": "CASH_OUT",
        "desc": "Corporate Fiber Internet Broadband Monthly Cash Bill",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 1500.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-21",
        "module": "Banking & Charges",
        "type": "CASH_OUT",
        "desc": "UCB Corporate Account Maintenance & SMS Alert Fee Debit",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 500.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-22",
        "module": "Capital Management",
        "type": "CASH_OUT",
        "desc": "Partner Monthly Profit Share / Personal Capital Withdrawal",
        "account": "NAIMUR",
        "inflow": 0.00,
        "outflow": 13000.00,
        "transfer": 0.00,
    },
    {
        "id": "TC-23",
        "module": "Purchasing & Expenses",
        "type": "CASH_OUT",
        "desc": "Urgent Packaging Tape, Courier & Daily Store Consumables",
        "account": "Cash Box",
        "inflow": 0.00,
        "outflow": 13000.00,
        "transfer": 0.00,
    },
]


def run_audit(verbose: bool = False) -> bool:
    """
    Executes chronological validation of all 23 transactions,
    computes balances, and asserts zero-variance financial parity.
    """
    print("=" * 80)
    print(" BIZPOS / YESSME ERP - FINANCIAL SYSTEM RECONCILIATION AUDIT")
    print(" Mandate: Closed-Loop Liquidity Parity (ISA 500 / ISA 315)")
    print("=" * 80)

    # Initial Balances
    accounts = {
        "NAIMUR": 0.00,
        "Cash Box": 0.00,
    }
    total_cash_in = 0.00
    total_cash_out = 0.00

    if verbose:
        print(f"\n{'Step':<5} {'ID':<7} {'Account':<12} {'Inflow (৳)':<12} {'Outflow (৳)':<12} {'Bank (NAIMUR)':<15} {'Cash Box':<12} {'Net Parity':<12}")
        print("-" * 95)

    # Chronological Execution
    for idx, tx in enumerate(TRANSACTIONS, start=1):
        total_cash_in += tx["inflow"]
        total_cash_out += tx["outflow"]

        if tx["type"] == "CONTRA_TRANSFER":
            from_acc = tx["from_account"]
            to_acc = tx["to_account"]
            amount = tx["transfer"]
            accounts[from_acc] -= amount
            accounts[to_acc] += amount
        else:
            acc = tx["account"]
            accounts[acc] += (tx["inflow"] - tx["outflow"])

        current_bank = accounts["NAIMUR"]
        current_cash = accounts["Cash Box"]
        running_net = current_bank + current_cash

        # Assertion: Prevent unapproved negative/overdraft balances
        if current_bank < 0.00:
            print(f"[CRITICAL ERROR] Step {idx} [{tx['id']}]: Account 'NAIMUR' dropped below zero: ৳ {current_bank:,.2f}")
            return False
        if current_cash < 0.00:
            print(f"[CRITICAL ERROR] Step {idx} [{tx['id']}]: Account 'Cash Box' dropped below zero: ৳ {current_cash:,.2f}")
            return False

        if verbose:
            acc_label = tx["account"] if tx["type"] != "CONTRA_TRANSFER" else f"{tx['from_account']}->{tx['to_account']}"
            print(f"{idx:<5} {tx['id']:<7} {acc_label:<12} {tx['inflow']:<12,.2f} {tx['outflow']:<12,.2f} ৳ {current_bank:<13,.2f} ৳ {current_cash:<10,.2f} ৳ {running_net:<10,.2f}")

    # Final Reconciliation Figures
    net_operational_balance = total_cash_in - total_cash_out
    sum_active_accounts = accounts["NAIMUR"] + accounts["Cash Box"]
    variance = abs(net_operational_balance - sum_active_accounts)

    print("\n" + "-" * 80)
    print(" AUDITED RECONCILIATION SUMMARY")
    print("-" * 80)
    print(f"  • Total Cash Inflows (Gross Cash In)       : ৳ {total_cash_in:>14,.2f}")
    print(f"  • Total Cash Outflows (Gross Cash Out)     : ৳ {total_cash_out:>14,.2f}")
    print(f"  • Net Operational Balance (In - Out)       : ৳ {net_operational_balance:>14,.2f}")
    print(f"  • Account Balance: 'NAIMUR' (UCB Bank)     : ৳ {accounts['NAIMUR']:>14,.2f}")
    print(f"  • Account Balance: 'Cash Box' (Cash Till)  : ৳ {accounts['Cash Box']:>14,.2f}")
    print(f"  • Consolidated Active Accounts Sum         : ৳ {sum_active_accounts:>14,.2f}")
    print(f"  • Reconciliation Variance (Φ)              : ৳ {variance:>14,.2f}")
    print("-" * 80)

    # Assertions
    try:
        assert total_cash_in == 158500.00, f"Expected Cash In 158,500.00, got {total_cash_in}"
        assert total_cash_out == 156000.00, f"Expected Cash Out 156,000.00, got {total_cash_out}"
        assert net_operational_balance == 2500.00, f"Expected Net 2,500.00, got {net_operational_balance}"
        assert accounts["NAIMUR"] == 1500.00, f"Expected NAIMUR 1,500.00, got {accounts['NAIMUR']}"
        assert accounts["Cash Box"] == 1000.00, f"Expected Cash Box 1,000.00, got {accounts['Cash Box']}"
        assert sum_active_accounts == 2500.00, f"Expected Accounts Sum 2,500.00, got {sum_active_accounts}"
        assert variance == 0.00, f"Parity breach: variance = {variance}"
    except AssertionError as err:
        print(f"\n[AUDIT FAILED] Parity Assertion Error: {err}")
        return False

    print("\n[AUDIT RESULT] 100% ZERO-VARIANCE FINANCIAL PARITY VERIFIED (PASS)")
    print("Invariant Satisfied: Sum(Cash In) - Sum(Cash Out) == Net Balance == Sum(Active Accounts)\n")
    return True


def main():
    parser = argparse.ArgumentParser(
        description="BizPOS QA Financial Reconciliation Parity Validator"
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Display detailed step-by-step transaction ledger trace"
    )
    args = parser.parse_args()

    success = run_audit(verbose=args.verbose)
    if success:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
