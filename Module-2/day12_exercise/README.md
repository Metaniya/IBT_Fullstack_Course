# Habesha Eatery Mini-Site

A two-page accessible website for a fictional Ethiopian restaurant in Addis Ababa.

## How to Open the Site

1. Download or clone this folder.
2. Open `index.html` in any web browser to view the reservation page.
3. Use the navigation links at the top to move to `contact.html`.

No build tools or server are required — both pages are plain, static HTML.

## Pages

- **index.html** — Reservation form, menu table, and a photo gallery.
- **contact.html** — Contact form and opening hours table.

## Accessibility Features Implemented

- Every form input has a real `<label>` connected with `for`/`id`, not just a placeholder.
- Forms use `method="post"` since they submit personal information (name, email, message), which should not appear in the URL.
- Both tables have a `<caption>` describing their contents and use `<th scope="col">` for column headers, with a clear `<thead>`/`<tbody>` split.
- The gallery image uses a `<figure>` with descriptive `alt` text and a `<figcaption>`.
- Each page has exactly one `<h1>`, with all other headings nested below it in order.
- Semantic landmarks are used throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Each page has a unique `<title>` and `<meta name="description">`.
- The shared `<nav>` uses plain anchor links, which are fully reachable and operable using Tab and Enter — no mouse required.
- Both pages pass the W3C validator with zero errors.
