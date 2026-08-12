# Loyalty Points Module

A loyalty-points module for a TeleBirr shop. Tracks a customer's points
balance privately, using a closure, and supports earning, redeeming,
and checking the balance.

## How to Run

```bash
node demo.js
```

## Why the Balance Stays Private

`createLoyalty()` declares `let points = 0` as a local variable inside
its own function body. When it returns the object with `earn`,
`redeem`, and `balance`, those three functions "remember" the scope
they were created in — this is a closure. That scope contains `points`.

Nothing outside `createLoyalty()` has a reference to `points` itself —
only to the three functions that were allowed to touch it. There is no
`this.points` or public property holding the balance, so code outside
the module cannot read or overwrite it directly.

`demo.js` proves this: `card.points` prints `undefined`, even though
`card.balance()` correctly returns the real value. The only way to
affect the balance is through `earn()` and `redeem()`.

## Files

- **loyalty.js** — the module itself, exporting `createLoyalty()`.
- **demo.js** — a script showing earning, redeeming, refusing to go
  below zero, and swapping in a "holiday" earn rule that doubles
  points, without touching `loyalty.js`.

## How the Earn Rule Works (Higher-Order Function)

`createLoyalty` accepts an `earnRule` function as a parameter, with a
default of 1 point per 10 ETB. Passing in a different function (like a
holiday rule that doubles points) changes the earning behavior without
modifying any code inside `loyalty.js` — this is what makes it a
higher-order function: it takes another function as an argument and
uses it internally.
