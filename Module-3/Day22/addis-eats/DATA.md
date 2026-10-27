# Where data is fetched

## Server (default)

| Data | Where | Why |
|---|---|---|
| Menu, dish pages, home specials | Server components | Public, indexable, cacheable (revalidate 3600, generateStaticParams). |
| Order history `/orders` | Server component | Private, scoped by `getOrdersFor`-style query on the session id. |
| Order status first paint | Server component `/orders/[id]` | Seeds the client query, so there is no spinner on arrival. |
| Placing and cancelling orders | Server actions | Writes from our own UI. |

## Client (SWR, shared `lib/fetcher.js`)

| Query | Key | Refresh rule | Why |
|---|---|---|---|
| Order status | `/api/orders/${id}` | `fallbackData` from server; poll 5000 ms; stops at delivered/cancelled; focus revalidate ON | Status changes in seconds; a finished order needs no polling. |
| Menu search | `/api/dishes?q=${term}` or `null` when empty | 300 ms debounce; `keepPreviousData`; focus revalidate OFF | One request per pause, nothing for an empty box, no flashing list, menu is not time-critical. |
| Paged dishes | `/api/dishes?page=${n}` | Page 1 seeded via `SWRConfig fallback`; `keepPreviousData` | Fast, indexable first page; later pages on demand; page in the URL so it can be shared. |

## Not on the server
- Cart: client store only (React context). It never leaves the browser until checkout, and prices are recomputed on the server.

## Search seeding
The search box has nothing to show for an empty term, so there is nothing to seed. The first view of the menu (the dish list) is rendered on the server. The paged list and the order status are both seeded.

## Not used
- TanStack Query: the client work is one poll and one search, so SWR's smaller size suits it.
