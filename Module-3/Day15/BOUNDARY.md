# Server / client boundary

| Component | Runs on | Why |
|---|---|---|
| app/layout.js | Server | Passes children into Providers; imports nothing client-only. |
| components/Header.jsx, Footer.jsx | Server | Static markup and links. |
| app/page.js | Server | Awaits dishes for the specials. |
| app/menu/layout.js | Server | Static shell. |
| app/menu/page.js, DishResults.jsx | Server | Awaits dishes. |
| DishCard.jsx, DishSkeleton.jsx | Server | Markup only. Passed into CategoryFilter as JSX, so it stays on the server. |
| **CategoryFilter.jsx** | **Client** | Holds the selected category. |
| app/menu/[id]/page.js | Server | Awaits one dish; prebuilt via generateStaticParams. |
| **AddToCartButton.jsx** | **Client** | onClick, writes to the cart store. |
| **providers.jsx** | **Client** | Context requires state. |
| app/cart/page.js | Server | Static shell. |
| **CartView.jsx** | **Client** | Reads and edits the cart. |
| app/checkout/page.js | Server | Reads the session cookie. |
| **CheckoutForm.jsx** | **Client** | useActionState and the cart. |
| **menu/error.js** | **Client** | Needs a retry handler. |