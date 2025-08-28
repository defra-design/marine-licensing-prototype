# Sample Plan Disposal Site Multiple Sites Implementation Guide

## Overview

This document describes how to implement multiple disposal sites support in the Sample Plans journey. Currently, the prototype is configured for single site mode to simplify testing, but the architecture allows for multiple sites to be added.

## Current Implementation (Single Site Mode)

### What Was Changed (January 2025)

The disposal site selection logic was modified to always update Site 1 instead of creating Site 2 when a user changes their site selection. This provides a cleaner user experience for single-site testing.

**Key Changes Made:**

1. **Site Selection Logic** (`app/routes/versions/multiple-sites-v2/sample-plans-v1-disposal-site-locations.js`)
   - Modified the review disposal site details GET route (lines 130-151)
   - Removed the `isSite2` logic that created Site 2 when Site 1 existed
   - Always assigns new selections to Site 1, replacing existing data

2. **Completion Data Clearing** 
   - Added `clearSite1CompletionFlags()` helper function (lines 8-41)
   - Clears all Site 1 completion flags when site is replaced
   - Removes all Site 1 form data and error states
   - Ensures "Incomplete" status appears for all details sections

3. **Review Page Behavior**
   - Site 1 card always shows the currently selected site
   - Site 2 card never appears (single site mode)
   - All detail sections reset to "Incomplete" when site is changed

## How to Re-enable Multiple Sites Support

When ready to support multiple disposal sites, follow these steps:

### 1. Restore Site Selection Logic

In `app/routes/versions/multiple-sites-v2/sample-plans-v1-disposal-site-locations.js`, modify the review disposal site details GET route:

```javascript
// Current single-site logic (lines 132-151):
const isReplacingSite = req.session.data['sample-disposal-site-selected'];

if (isReplacingSite) {
  clearSite1CompletionFlags(req.session);
}

// REPLACE WITH multi-site logic:
const isSite2 = req.session.data['sample-disposal-site-selected'] && 
                !req.session.data['sample-disposal-site-2-selected'];

if (isSite2) {
  // Store as Site 2
  req.session.data['selected-disposal-site-2-code'] = req.query.code;
  req.session.data['selected-disposal-site-2-name'] = req.query.name;
  req.session.data['selected-disposal-site-2-country'] = req.query.country;
  req.session.data['selected-disposal-site-2-sea-area'] = req.query.seaArea;
  req.session.data['selected-disposal-site-2-status'] = req.query.status;
  req.session.data['sample-disposal-site-2-selected'] = true;
} else {
  // Store as Site 1 (new or replacement)
  const isReplacingSite = req.session.data['sample-disposal-site-selected'];
  if (isReplacingSite) {
    clearSite1CompletionFlags(req.session);
  }
  // ... existing Site 1 assignment logic
}
```

### 2. Re-enable "Add Another Site" Button

In `app/views/versions/multiple-sites-v2/sample-plans-v1/disposal-site-locations/review-disposal-site-details.html`:

```html
<!-- Current disabled button (lines 407-411): -->
<div class="govuk-button-group govuk-!-margin-bottom-6">
    <a href="" role="button" draggable="false" class="govuk-button govuk-button--secondary" data-module="govuk-button">
        Save and add another disposal site
    </a>
</div>

<!-- REPLACE WITH active button: -->
<div class="govuk-button-group govuk-!-margin-bottom-6">
    <a href="where-dispose-of-material?disposal-site-code=&disposal-site-name=&disposal-site-location=&marine-area=&disposal-site-status=&sample-plan-where-dispose-material=" role="button" draggable="false" class="govuk-button govuk-button--secondary" data-module="govuk-button">
        Save and add another disposal site
    </a>
</div>
```

### 3. Add Site 2 Details Support

Create additional pages and routing for Site 2:

**New Pages Needed:**
- `disposal-details-site-2.html` 
- `maximum-disposal-volume-site-2.html`
- `beneficial-use-site-2.html`

**Routing Updates:**
- Add GET/POST routes for each Site 2 page
- Copy Site 1 validation logic and adapt for Site 2 field names
- Update completion flag checking in review router

**Field Naming Convention:**
- Site 2 fields should follow pattern: `sample-disposal-site-2-[field-name]`
- Completion flags: `sample-disposal-site-2-[section]-completed`

### 4. Update Review Page Completion Logic

In the review disposal site details router, update completion checking:

```javascript
// Current logic checks only Site 1
const site1Complete = materialTypeComplete && disposalMethodComplete && 
                     maximumVolumeComplete && beneficialUseComplete;

// ADD Site 2 completion checking
const site2MaterialTypeComplete = req.session.data['sample-disposal-site-2-material-type-completed'];
const site2DisposalMethodComplete = req.session.data['sample-disposal-site-2-disposal-method-completed'];
const site2MaximumVolumeComplete = req.session.data['sample-disposal-site-2-maximum-volume-completed'];
const site2BeneficialUseComplete = req.session.data['sample-disposal-site-2-beneficial-use-completed'];

const site2Complete = site2MaterialTypeComplete && site2DisposalMethodComplete && 
                     site2MaximumVolumeComplete && site2BeneficialUseComplete;

const allSitesComplete = site1Complete && (!hasSite2 || site2Complete);
```

### 5. Extend Clear Function for Site 2

Add a `clearSite2CompletionFlags()` function similar to the existing Site 1 function, or extend the existing function to handle both sites.

## Architecture Notes

### Session Data Structure

**Site 1 Data:**
- `selected-disposal-site-code`
- `selected-disposal-site-name`
- `selected-disposal-site-country`
- `selected-disposal-site-sea-area`
- `selected-disposal-site-status`
- `sample-disposal-site-selected` (boolean flag)

**Site 2 Data:**
- `selected-disposal-site-2-code`
- `selected-disposal-site-2-name`
- `selected-disposal-site-2-country`
- `selected-disposal-site-2-sea-area`
- `selected-disposal-site-2-status`
- `sample-disposal-site-2-selected` (boolean flag)

### Completion Flags Pattern

Each site section has completion flags:
- `sample-disposal-site-[1|2]-[section]-completed`
- Example: `sample-disposal-site-1-maximum-volume-completed`

### Navigation Flow

1. **Site Selection** → Review page with Site 1
2. **Add Another Site** → Site selection → Review page with Site 1 + Site 2
3. **Change Site** → Site selection → Updates appropriate site, clears its data

## Testing Considerations

When re-enabling multiple sites:

1. **Test site replacement** - ensure changing Site 1 doesn't create Site 2
2. **Test site addition** - ensure "Add another" creates Site 2
3. **Test completion states** - both sites must be complete to proceed
4. **Test data persistence** - site details persist when switching between sites
5. **Test error states** - errors clear appropriately when switching sites

## Migration Path

The current single-site implementation can be easily extended to multi-site by:

1. Uncommenting the multi-site logic
2. Re-enabling the "Add another site" button
3. Creating Site 2 pages (copy Site 1 pages and update field names)
4. Testing the full multi-site flow

The `clearSite1CompletionFlags()` function and site replacement logic can remain as-is for the "Change site" functionality, while adding separate logic for the "Add another site" flow.
