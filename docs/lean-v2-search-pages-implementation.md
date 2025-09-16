# Lean v2 Disposal Site Search Pages – Implementation Guide

This guide explains how to create a new lean variant (v2) of the disposal site search flow for A/B testing, based on the working v1 implementation. It covers what to copy, what to rename, routing, template specifics, JavaScript behavior, and QA checks.

## Create new files

- app/views/versions/multiple-sites-v2/sample-plans-v2/disposal-site-locations/find-existing-disposal-site-lean-v2.html
- app/views/versions/multiple-sites-v2/sample-plans-v2/disposal-site-locations/search-results-lean-v2.html
- app/assets/javascripts/sample-plans-v2-disposal-site-lean-v2.js

## Wire the routes (mirror v1 with -lean-v2 paths)

- Add 3 handlers in `app/routes/versions/multiple-sites-v2/sample-plans-v2-disposal-site-locations.js`:
  - GET `find-existing-disposal-site-lean-v2`: render the form, prefill from `req.session.data`; if query parameters exist and are empty, clear session values for the three fields.
  - POST `search-results-lean-v2`: save `disposal-site-code`, `disposal-site-name`, `include-closed-disused` (clear when absent), set `page='1'`, redirect to GET results.
  - GET `search-results-lean-v2`: read optional `page` query, render results and inject `window.searchCriteria` with code, name, include-closed-disused.

## Find page (v2) requirements

- Form action: POST to `search-results-lean-v2`.
- Inputs: `disposal-site-code`, `disposal-site-name`.
- Checkbox:
  - Name: `include-closed-disused`
  - Value: `include-closed-disused`
  - Default unchecked; template `checked:` only when `data['include-closed-disused'] == 'include-closed-disused'`.
- Scripts in page head (order matters):
  - `/public/javascripts/disposal-sites-data.js`
  - `/public/javascripts/sample-plans-v2-disposal-site-lean-v2.js`

## Results page (v2) requirements

- Use unique element ids so the global `application.js` does not take over:
  - Table id: `disposal-sites-table-lean-v2`
  - Tbody id: `disposal-sites-table-body-lean-v2`
- Include scripts (in this order):
  - `/public/javascripts/disposal-sites-data.js`
  - `/public/javascripts/sample-plans-v2-disposal-site-lean-v2.js`
- Back link should use browser history: `href="javascript:history.back()"`.
- Show criteria playback between the results count and summary:
  - Heading text: “You searched for:”
  - Bullet for Site code only if non-empty
  - Bullet for Site name only if non-empty
  - Bullet for Site availability: “Open” or “Open, Closed, Disused”
- Table headers (match v1): “Site code”, “Site name”, “Site location”, “Marine area”, “Availability”.
- Pagination container id: `pagination-nav` (compact ellipsis style, see JS section).
- “Search for a different disposal site” link should point to the v2 find page with empty parameters to clear the form:
  - `find-existing-disposal-site-lean-v2?disposal-site-code=&disposal-site-name=&include-closed-disused=`

## JavaScript behavior (v2)

- File: `app/assets/javascripts/sample-plans-v2-disposal-site-lean-v2.js` (copy from v1 and rename ids/selectors to `*-v2`).
- Initialization:
  - Wrap in an IIFE; run on `DOMContentLoaded`.
  - Only proceed if `#disposal-sites-table-body-lean-v2` exists.
- Data source:
  - Use `window.__DISPOSAL_SITES_DATA__` from `disposal-sites-data.js` (shared across pages).
- Search criteria resolution (robust, learned pitfalls):
  - Prefer injected `window.searchCriteria.code/name/includeClosedDisused` from the template when present.
  - Otherwise read URL params: `disposal-site-code`, `disposal-site-name`, `include-closed-disused`.
  - Determine the include flag as true only when any value equals one of: `include-closed-disused`, `true`, `on`, `1`.
  - Ignore values like `_unchecked`. Handle arrays and comma-separated strings gracefully.
- Filtering:
  - Code and name are partial, case-insensitive matches.
  - If include flag is false, filter `status` to Open; otherwise include all statuses.
- Sorting (dataset-level, not page-only):
  - Maintain `currentSort = { column: 'code', direction: 'asc' }`.
  - Implement `sortSites(sites, column, direction)` to sort a copy of the full dataset by: `code`, `name`, `country`, `seaArea`, `status`.
  - Clicking a column header toggles direction, re-sorts the entire dataset, resets to page 1, and updates `aria-sort` on headers.
- Pagination:
  - Page size 20.
  - Render compact GOV.UK-style with ellipses: `1 2 3 4 … N Next`.
  - Navigate using the sorted dataset; update URL only if needed (optional).
- Rendering behavior:
  - Update the primary count and a summary line “Showing X to Y of Z results.”
  - Hide the table and clear pagination when there are zero results; keep the count and criteria bullets visible.
  - Keep table cells identical to v1 (status tag colours, code as a link with optional `data-site-code`) to avoid UX drift.

## Accessibility & resilience notes

- Unique element ids (`*-lean-v2`) prevent the global `application.js` dataset/pagination system from overriding the lean page.
- Checkbox parsing explicitly ignores `_unchecked` and only treats known “checked” values as true.
- All string comparisons are case/whitespace-tolerant.
- `history.back()` on results returns to the form with inputs intact. The “Search for a different disposal site” link clears by passing empty query params.

## QA checklist

- Unchecked checkbox → results show only Open; criteria bullet says “Open”.
- Checked checkbox → results include Closed & Disused; criteria bullet says “Open, Closed, Disused”.
- Column header clicks sort the entire dataset, not just the current page; `aria-sort` updates correctly.
- Pagination shows compact style with ellipses and pages over the sorted dataset.
- Zero results → table and pagination hidden; count and “You searched for:” remain.
- Back from results returns to find page with inputs preserved.
- “Search for a different disposal site” clears the form.
- No interference from `app/assets/javascripts/application.js` (verify by unique ids and expected behavior).

## Copy checklist (from v1 to v2)

- Replace all occurrences of:
  - `disposal-sites-table-lean` → `disposal-sites-table-lean-v2`
  - `disposal-sites-table-body-lean` → `disposal-sites-table-body-lean-v2`
- Update script src on both pages to the v2 JS filename.
- Update all route paths from `*-lean-v1` to `*-lean-v2`.
- Keep dataset import path unchanged (`/public/javascripts/disposal-sites-data.js`).

---

Document owner: Prototype team

Purpose: Provide a repeatable recipe to spin up a lean v2 variant safely, avoiding v1 pitfalls (global script interference, checkbox serialization, dataset-level sorting).


