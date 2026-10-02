# Rendering strategy

| Route | Strategy | Why |
|---|---|---|
| / | Static | Today's specials are the same for every visitor and need no per-request work. |
| /menu | ISR, revalidate 3600 | Dishes change a few times a day; an hour of staleness misleads nobody. |
| /menu/[id] | Static via generateStaticParams | Every dish id is known at build time. |
| /cart | Client | The cart is private to this browser tab; the page is a static shell around a client component. |
| /checkout | Dynamic | Reads the session cookie, so it depends on who is asking. |
| /orders | Static + revalidatePath | Demo list; placeOrder and cancelOrder refresh it. A real app with per-user orders would make this dynamic. |

## Data movement

| What | How | Why |
|---|---|---|
| Menu and dish data | Server component | Read to render; no endpoint needed. |
| Placing an order | Server action | A write from our own UI. |
| Cancelling an order | Server action | Same, with session and ownership checks. |
| Cart contents | Client store only | Never leaves the browser until checkout. |
| /api/dishes, /api/orders | Route handlers | For callers outside our pages (a polling client, a mobile app, a payment provider). |