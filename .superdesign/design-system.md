# AI Agent Security Report Portal Design System

## Product

A Chinese-language research portal for the 2026 AI Agent Security Survey. It turns a 254-page report into a readable narrative and a set of precise data browsers. The main jobs are: understand the seven-stage lifecycle framework, compare global research/products/policy, inspect incidents and vulnerabilities, and jump from any inline citation to its bibliography and external URL.

## Information Architecture

Home, Survey, Research, Products, Incidents, Policy, Tables, References.

## Visual Direction

Keep the current serious academic portal identity. Use a dark navy global header, white reading surfaces, pale slate utility bands, blue for navigation/links, and semantic green/amber/red only for data meaning. The interface should feel like an institutional report reader, not a marketing page.

Use dense, scan-friendly layouts. Prefer full-width sections and data tables to repeated decorative cards. Individual records may be cards only when they are naturally separate items, such as incidents. Keep radii at 8px or less. Do not use gradient backgrounds, blurred decorative shapes, purple palettes, nested cards or oversized hero typography.

## Typography

Use the existing sans-serif stack: General Sans, Satoshi, Inter, sans-serif. Chinese body text is 15-16px with 1.75 line height. Page titles are 32-40px. Compact panel headings are 16-22px. Letter spacing is 0 except small uppercase English metadata labels.

## Layout

Global header: 72-80px sticky.
Main content: full-width bands with a 1280px maximum inner width.
Survey: 240-280px sticky lifecycle rail plus a flexible reading pane.
Data pages: compact page header, filter toolbar, results count, and table/list body.
References: search/filter column plus numbered entries; each entry has a stable `ref-N` anchor.

## Components

- Navigation: icon plus text only where useful; active route uses a blue underline.
- Filters: segmented controls for small mutually exclusive sets; checkboxes or menus for larger sets.
- Tables: sticky header, alternating rows, horizontal scroll, visible caption and source marker.
- Citations: compact blue bracket links in body copy. Clicking scrolls to `/references#ref-N`; an external-link icon on the bibliography row opens the source URL.
- Search: visible search field on data-heavy pages.
- Status: semantic labels, not color alone.
- Mobile: navigation becomes horizontally scrollable; Survey rail becomes a stage selector; tables preserve horizontal scrolling.

## Tokens

- Navy: `#0f172a`
- Blue: `#2563eb`
- Blue hover: `#1d4ed8`
- White: `#ffffff`
- Slate background: `#f8fafc`
- Slate border: `#e2e8f0`
- Primary text: `#1e293b`
- Muted text: `#64748b`
- Danger: `#dc2626`
- Warning: `#d97706`
- Success: `#16a34a`
- Radius: 4px controls, 8px cards/panels
- Shadow: `0 8px 24px rgba(15, 23, 42, 0.08)` for sticky overlays only

