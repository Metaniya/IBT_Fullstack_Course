# Ethio Bunna Cafe — Business Profile Card

A single-page styled profile card for a fictional coffee shop in Bole, Addis Ababa.

## How to Open

Open `index.html` in any browser. No build step needed — `styles.css` is linked directly.

## CSS Techniques Used

- **CSS custom properties (`:root`)** — a color palette (`--brand`, `--brand-hover`, `--text-dark`, `--text-muted`, `--bg-light`, `--border-color`) and a spacing scale (`--space-sm`, `--space-md`, `--space-lg`), all used via `var()` throughout the stylesheet.
- **Global `box-sizing: border-box`** applied with a `*` reset, so padding and border don't affect declared widths.
- **Google Fonts** — "Inter" loaded via a `<link>` in the head and applied as the base body font.
- **Box model** — the `.card` uses padding, a border, `border-radius`, and margin to center itself on the page.
- **Typographic hierarchy** — a bold `.business-name` heading, a colored `.tagline`, and `.body-text` with a generous `line-height` for readability.
- **`:hover` pseudo-class** — the `.btn` changes background on hover using an HSL color with only the lightness value changed, keeping hue and saturation identical.
- **`::before` pseudo-element** — a decorative accent bar added above the card content, generated purely with CSS (no extra HTML element).
