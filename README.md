# Resto — Restaurant Landing Page

A single-page restaurant website built with plain HTML, CSS, and JavaScript — no frameworks, no build step. Features a hero section, searchable menu, contact form, dark mode, and subtle scroll/hover animations.

## Live structure

```
Landing-Page/
├── index.html   # Markup — semantic HTML5, SEO meta tags
├── style.css    # Styling — CSS variables, light/dark themes, responsive rules
├── main.js      # Behavior — theme toggle, search, dropdown, form, scroll reveal
└── README.md
```

## Getting started

No installation or build tools required.

1. Download or clone the project folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience (some browsers restrict certain features on `file://`):

   ```bash
   # Python
   python3 -m http.server 8000

   # Node (npx)
   npx serve .
   ```

3. Visit `http://localhost:8000`.

No dependencies, no `npm install`, no environment variables.

## Features

- **Dark mode** — toggle in the nav bar. Preference is saved to `localStorage` and restored on return visits; on a first visit it follows the OS `prefers-color-scheme` setting.
- **Live menu search** — the search bar filters menu items by name as you type.
- **Accessible dropdown** — the "Home" nav item's submenu works with mouse hover, click, and keyboard (Tab + Enter, Escape to close).
- **Contact form** — client-side validation with an inline, accessible confirmation message (no blocking `alert()` popups).
- **Scroll reveal & hover animations** — subtle fade/slide-in as sections enter the viewport, card lift on hover. All motion respects `prefers-reduced-motion`.
- **SEO-ready** — descriptive title, meta description, canonical tag, Open Graph and Twitter Card tags, and a lightweight inline SVG favicon.

## Browser support

Works in all modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver` for scroll animations, with a fallback that simply shows content immediately if unsupported.

## Customizing

- **Colors**: all theme colors live as CSS variables at the top of `style.css` (`:root` for light mode, `[data-theme="dark"]` for dark mode). Change a value once and it updates everywhere it's used.
- **Menu items**: duplicate a `.menu-item` `<article>` block inside `#track` in `index.html` and update the dish name/description.
- **SEO tags**: update the placeholder URLs (`https://example.com/...`) in the `<head>` of `index.html` once the site has a real domain.

## Notes on the codebase

This project was refactored from an earlier version for code quality, accessibility, performance, and SEO — the visual design, colors, typography, and layout were intentionally preserved as-is. Notable fixes made during that pass:

- Removed a duplicate `id="msg"` that existed on both the message textarea and the submit button.
- Removed unrelated scratch/practice JavaScript (console-log exercises) that had no connection to site functionality.
- Added a missing `<h2>` heading to the Menu section to fix the page's heading hierarchy.

## License

No license specified. Add one (e.g. MIT) if this project will be shared or reused publicly.
