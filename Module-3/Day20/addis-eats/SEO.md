# Metadata and SEO

| Route | Title | Indexed? | Canonical | Notes |
|---|---|---|---|---|
| / | default title | yes | / | description for people, ~150 chars |
| /menu | Menu · Addis Eats | yes | /menu | search runs in the client |
| /menu/browse | All dishes · Addis Eats | yes | /menu/browse | ?page=N is not a separate page |
| /menu/[id] | {dish name} · Addis Eats | yes | /menu/{id} | generateMetadata, OG image per dish, MenuItem JSON-LD |
| /cart, /checkout, /orders, /kitchen, /signin | page name | no | n/a | noindex + disallowed in robots.js |

- metadataBase comes from lib/site.js (production URL, no localhost).
- JSON-LD is generated from the same dish object the page renders.
- sitemap.js is built from getDishes(), so new dishes appear without editing a file.

## What I checked in the page source
(note the og:image absolute URL, two different descriptions, price match)

## What matters more than tags
Static prerendering (Day 37), LCP work (Day 43) and semantic HTML.