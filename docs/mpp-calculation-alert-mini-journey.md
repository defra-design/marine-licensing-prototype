# MPP loading spinner – mini journeys for usability testing

## Overview

These mini journeys simulate the delay between a user completing their site details and Marine Plan Policies (MPP) being calculated. Instead of an MoJ alert on the task list, a full-page spinner is shown, followed by either a successful load or a delayed-load error state.

## User flows

### Demo journeys (index page only)

Both links are under **Marine plan policies loading journeys** on the index page (LCML iteration 3).

1. Click **Quicker time** or **Slower time**
2. Land on **review site details** with one field incomplete
3. Complete the remaining item (e.g. working hours on activity 2)
4. Select **Yes** on “Have you finished entering your site details?” and click **Continue**
5. Spinner page loads (2 seconds for Quicker time, 10 seconds for Slower time)
6. Task list loads with MPP unlocked

**Quicker time:** MPP link shows `(37 to complete)` → full policy index with 37 policies.

**Slower time:** MPP link shows no count → unavailable error page. Click **Back to your project task list** → link still shows no count. Click MPP task → 3-second spinner → index is normal (all 37 policies).

### Organic flow

Completing site details without an index demo link goes straight to the task list (no spinner).

## How to trigger demo journeys

Append `&mpp-load=success` or `&mpp-load=timeout` to a review-site-details state URL:

```
/versions/multiple-sites-v2/low-complexity-v3/site-details/review-site-details?state=<base64>&mpp-load=success
/versions/multiple-sites-v2/low-complexity-v3/site-details/review-site-details?state=<base64>&mpp-load=timeout
```

The prototype kit stores the query param in session. When the user selects **Yes** on review, the router redirects to the spinner page.

## Session variables

| Variable | Values | Purpose |
|----------|--------|---------|
| `mpp-load` | `success` / `timeout` | Set from index URL; consumed on review POST |
| `mpp-load-outcome` | `success` / `timeout` / `timeout-recovered` | Persisted after spinner; drives task list link text, href, and MPP index |
| `mpp-policies-loaded=true` | query on task list (legacy) | Redirects to task list with outcome set to `success` |
| `/mpp-policies-recovered` | back link from unavailable page | Sets outcome to `timeout-recovered`, redirects to task list |
| `/loading-marine-plan-policies-retry` | MPP task link when `timeout-recovered` | Sets outcome to `success`, shows 3s spinner, redirects to MPP index |

## Files

| File | Role |
|------|------|
| `app/views/index.html` | Details component with Quicker time / Slower time links |
| `app/views/.../loading-marine-plan-policies.html` | Spinner page (10s → task list) |
| `app/views/.../loading-marine-plan-policies-retry.html` | Retry spinner page (3s → MPP index) |
| `app/views/.../marine-plan-policies/policies-unavailable.html` | Delayed load error (v1 + v2) |
| `app/views/.../marine-licence-start-page.html` | Task list; conditional MPP link text and href |
| `app/routes/.../low-complexity-v3.js` | Spinner routes; recovery + retry routes |
| `app/routes/.../low-complexity-v3-site-locations.js` | Review POST → spinner or task list |
| `app/routes/.../low-complexity-v3-manual-entry.js` | Same redirect logic for manual entry |
| `app/routes/.../low-complexity-v3-marine-plan-policies*.js` | Render unavailable page when outcome is `timeout` |

## Creating a new state URL

1. Navigate through the prototype and fill in the data you want
2. On review-site-details, copy the URL (`?state=` param)
3. Append `&mpp-load=success` or `&mpp-load=timeout`
4. Add to `index.html` or use directly

The state JSON must include `low-complexity-file-upload-activities` with one activity missing a `-completed` flag (e.g. omit `low-complexity-working-hours-completed` from activity 2).
