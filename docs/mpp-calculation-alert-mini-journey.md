# MPP Calculation Alert – Mini Journey for Usability Testing

## Overview

This mini journey simulates the delay between a user completing their site details and the Marine Plan Policies (MPP) being calculated. It shows an MoJ Information alert on the task list page and greys out the MPP task with a "Calculating policies…" status.

## User flow

1. User clicks a link on the index page (e.g. "Marine Plan Policy calculation alert")
2. Lands on the **review site details** page with pre-populated data (all but one item saved)
3. User completes the remaining item (e.g. Proposed working hours)
4. Review page shows the "Have you finished entering your site details?" radios (existing behaviour)
5. User selects **Yes** and clicks **Continue**
6. Task list page loads with:
   - An **MoJ Information alert** at the top: *"Your marine plan policies are being calculated"* with a "Refresh the page" link
   - The **MPP task greyed out** (plain text, no link) with status text "Calculating policies…"
7. User clicks **"Refresh the page"** → alert disappears, MPP task becomes active with "(37 to complete)"

## How to trigger the alert flow

Append `&mpp-alert=true` to any review-site-details state URL. For example:

```
/versions/multiple-sites-v2/low-complexity-v2/site-details/review-site-details?state=<your-base64-state>&mpp-alert=true
```

This parameter gets stored in the session by the prototype kit. When the user confirms site details are complete (selects "Yes"), the router redirects to the task list with `?mpp-calculating=true`, which triggers the alert and greyed-out MPP task.

The `mpp-alert` flag is cleared after use, so it only fires once per link click. You can re-trigger it by visiting the link again.

### Without `&mpp-alert=true`

The alert also fires automatically the **first time** a user confirms site details complete (i.e. when `site-details-confirmed-complete` was not already set). The `&mpp-alert=true` param is only needed if you want to force the alert on subsequent runs with the same session.

## Files changed

| File | What changed |
|------|-------------|
| `app/views/index.html` | Added "Marine Plan Policy calculation alert" link under the LCML iteration 2 section |
| `app/views/versions/multiple-sites-v2/low-complexity-v2/marine-licence-start-page.html` | Added MoJ alert component and "Calculating policies…" state for the MPP task row, controlled by `mpp-calculating` query param |
| `app/routes/versions/multiple-sites-v2/low-complexity-v2-site-locations.js` | Modified the review-site-details-router to redirect with `?mpp-calculating=true` on first completion or when `mpp-alert=true` is in session |
| `app/routes/versions/multiple-sites-v2/low-complexity-v2.js` | Added cleanup logic to clear `mpp-calculating` from session when the task list page is loaded without the query param (prevents the prototype kit auto-store from keeping it sticky) |

## Creating a new state URL

To create a link with different pre-populated data:

1. Navigate through the prototype and fill in the data you want
2. On the review-site-details page, copy the URL from the browser (it will contain a `?state=` param with base64-encoded session data)
3. Append `&mpp-alert=true` to the URL
4. Add the link to `app/views/index.html` or use it directly

Alternatively, you can build a state URL programmatically:

1. Create a JSON object with the session data keys/values you want
2. Base64-encode it
3. Use it as: `/versions/multiple-sites-v2/low-complexity-v2/site-details/review-site-details?state=<base64>&mpp-alert=true`

**Important:** The state JSON must include `low-complexity-file-upload-activities` as a valid array with activity objects. Ensure the activity you want the user to complete is missing its `-completed` flag (e.g. omit `low-complexity-working-hours-completed` from activity 2).
