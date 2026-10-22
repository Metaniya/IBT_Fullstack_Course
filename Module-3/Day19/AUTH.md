# Authentication and authorisation

Session: signed token (HMAC-SHA256) in an `httpOnly`, `sameSite=lax` cookie (`secure` in production), one-week expiry. Verified by `getSession()` in `lib/session.js`, the only place that reads it. Passwords are scrypt-hashed with a per-user salt.

## Who may see what

| Route / action | Layers | What each layer proves |
|---|---|---|
| /menu, /menu/[id], / | none | Public and indexable. |
| /checkout | proxy + page | proxy: a session cookie exists. page: `getSession()` verified signature and expiry, so a real user. |
| /orders | proxy + page + query | proxy: cookie exists. page: verified user. query: `listOrdersFor(user.id)` can only return this user's rows. |
| /orders/[id] | proxy + page + ownership | page: `order.userId === user.id`, else 404 (we don't confirm other people's ids). |
| /kitchen | proxy + page + role | page: `user.role === "staff"`, else 404. |
| GET /api/orders/[id] | handler | 401 not signed in, 404 missing, 403 not the owner. |
| POST /api/orders | handler | 401 not signed in, 422 invalid. Price recomputed server-side. |
| action placeOrder | action | session required via `submitOrder` (401). |
| action cancelOrder | action | session, then record exists, then `order.userId === session user`. |
| action markDelivered | action | session, then `role === "staff"`. |

The proxy (`proxy.js`) only proves a cookie exists. The checks inside actions and handlers are the real security.

## Three attacks on my own app

| # | Attack | Result | What refused it |
|---|---|---|---|
| 1a | Signed out (no cookie): click Cancel on a stale page | (fill in) | proxy: no `session` cookie, redirect to /signin |
| 1b | Forged cookie `session=garbage`: click Cancel | (fill in) | `cancelOrder`: `getSession()` returned null, so the `if (!user)` line threw "Not signed in" |
| 2 | Signed in as Sara, edit hidden `orderId` to Abel's id, submit | (fill in) | `cancelOrder`: `if (order.userId !== user.id)` threw "Not yours" |
| 3 | `/signin?next=https://example.com` then `?next=//example.com`, sign in | (fill in) | `safeNext()` in lib/safeNext.js returns "/" |
| 4 | Sara opens `/orders/<Abel's id>` and `fetch("/api/orders/<Abel's id>")` | (fill in) | page: `notFound()`; handler: 403 |

## Gaps and notes
- Users and orders live in memory (demo). A real app needs a database and Auth.js.
- No rate limiting on sign-in.