# Attacks on my own application

## 1. Open redirect
- Attack: open `/signin?next=https://evil.com`, then `/signin?next=//evil.com`, and sign in.
- Expected: I land on `/`, not on another site.
- Result: (what happened)
- Defence: `safeNext()` in lib/safeNext.js rejects absolute URLs and `//`, and is applied on the sign-in page and again inside the signIn action.

## 2. Reading someone else's order by id
- Attack: signed in as Sara, in the browser console run
  `fetch("/api/orders/<abel's order id>").then(r => r.status)` and also open `/orders/<abel's id>`.
- Expected: 403 from the API, 404 from the page.
- Result: (what happened)
- Defence: ownership check against the session id inside the handler and the page.

## 3. Cancelling someone else's order / forged cookie
- Attack A: as Sara, edit the hidden `orderId` input on a form to Abel's order id and submit.
- Attack B: send a made-up cookie: `curl.exe -i -b "session=usr_abel" http://localhost:3000/api/orders/<id>`.
- Expected: A throws "Not yours". B returns 401, because the cookie has no valid signature.
- Result: (what happened)
- Defence: cancelOrder compares the order owner to the session user; getSession verifies the HMAC signature and expiry.