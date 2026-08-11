# TeleBirr Tip & Split Calculator

## How to Run

```bash
node tip.js
```

Compare the output against `expected.txt` — they should match exactly.

## What It Does

- Takes a bill amount and party size (converted with `Number()`).
- Adds a 10% tip if the bill is over 300 ETB, otherwise 5%.
- Adds a service fee based on payment method using a `switch` statement
  (TeleBirr: 5 ETB, CBE Birr: 3 ETB, cash: 0 ETB).
- Computes the total and the amount each person owes.
- Prints everything using template literals for clear, readable output.

## Self-Check

- [x] Bill and party size converted with `Number()`
- [x] Tiered tip logic (10% over 300 ETB, else 5%)
- [x] `switch` statement for service fee by payment method
- [x] Total and per-person amount calculated correctly
- [x] Output uses template literals
- [x] Output matches `expected.txt` when run with `node tip.js`

## Try It Yourself

Change the `bill`, `partySize`, or `paymentMethod` values at the top of
`tip.js` and re-run to see the tiered tip and service fee logic respond
differently.
