# CBE Online Banking Dashboard — Layout Rebuild

A structural rebuild of a CBE (Commercial Bank of Ethiopia) style online banking
dashboard, using placeholder content. The focus is the layout, not real data or
functionality.

## How to Open

Open `index.html` in any browser. `styles.css` is linked directly, no build step needed.

## Layout Techniques Used

### Grid
- The overall page skeleton (`.app`) uses `grid-template-areas` to define
  `header`, `sidebar`, `main`, and `footer` regions.
- The transaction list (`.card-grid`) uses
  `repeat(auto-fit, minmax(200px, 1fr))` so the number of columns adjusts
  automatically to the available width.
- A single media query at `700px` collapses the page skeleton to one column
  for mobile screens.

### Flexbox
- The navbar inside the header uses `justify-content: space-between` to
  push the logo left and the welcome text/logout button right.
- The sidebar links use `flex-direction: column` to stack menu items.
- The stat toolbar (checking balance, savings balance, pending transfers)
  uses `flex-wrap` and `gap` so the cards reflow on narrower screens.

### Positioning
- The header is `position: sticky` so it stays visible while the main
  content scrolls.
- Each transaction card (`.tx-card`) is `position: relative`, and the
  "New" badge on the first card is `position: absolute`, anchored to
  that card's top-right corner.

## Responsive Behavior

Resize the browser below 700px wide to see the sidebar and main content
stack into a single column instead of sitting side by side.
