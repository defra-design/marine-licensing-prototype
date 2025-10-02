# Manual Entry Review Page - Change Links Implementation

## Overview

This document describes the implementation of all change link journeys from the manual entry review page (`review-site-details.html`). The implementation ensures that all change links work correctly without affecting the initial site creation journeys.

## ✅ Issues Fixed

### Template-Level Fixes
1. **Cancel links removed** from all change journey pages (now only show during initial site creation)
2. **Button text corrected**:
   - Journey 3 (`enter-coordinates` independent edit): Now shows "Save and continue"
   - All last pages in multi-page journeys: Show "Save and continue"
   - All intermediate pages: Show "Continue"
3. **Coordinate system selection**: Now displays from site data (not stale session data) when changing from review page

### Route Handler Fixes
1. **Journey 1a/1b**: Clear ALL coordinate data INCLUDING coordinate system (user starts fresh)
2. **Journey 2a/2b**: Preserve coordinate SYSTEM selection on GET (show previous), clear VALUES on POST
3. **Journey 3 detection**: Properly distinguish independent edit from journey restart based on width presence
4. **Comprehensive session clearing**: Clear all coordinate-related session keys including multiple points and system selection for 1a/1b

### Files Modified
**Route Handlers:**
- ✅ `exemption-manual-entry.js`

**Templates:**
- ✅ `how-do-you-want-to-enter-the-coordinates.html`
- ✅ `which-coordinate-system.html`
- ✅ `enter-coordinates.html`
- ✅ `site-width.html`
- ✅ `enter-multiple-coordinates.html`
- ✅ `activity-dates.html`
- ✅ `activity-description.html`

## Journey Types - Quick Reference

| Journey | Change Link | Coordinate System Page | Button Text | Cancel Link |
|---------|-------------|------------------------|-------------|-------------|
| **1a** | "Single or multiple" → Circular | **Blank** (no selection) | Continue → Continue → Continue → Save and continue | Hidden |
| **1b** | "Single or multiple" → Polygon | **Blank** (no selection) | Continue → Continue → Save and continue | Hidden |
| **2a** | "Coordinate system" → Circular | **Previous selection shown** | Continue → Continue → Save and continue | Hidden |
| **2b** | "Coordinate system" → Polygon | **Previous selection shown** | Continue → Save and continue | Hidden |
| **3** | "Coordinates at centre" | N/A | Save and continue | Hidden |
| **4** | "Width of circular site" | N/A | Save and continue | Hidden |
| **5** | "Start and end points" | N/A | Save and continue | Hidden |
| **6** | "Activity dates" (shared) | N/A | Save and continue | Hidden |
| **7** | "Activity description" (shared) | N/A | Save and continue | Hidden |

### Full Journey Details

There are **5 distinct journey types** that can be initiated from change links on the review page:

### Journey Restart Types (Clear Subsequent Data)

These journeys require the user to go through multiple pages and clear subsequent data:

- **Journey 1a/1b**: Changing "Single or multiple sets of coordinates"
- **Journey 2a/2b**: Changing "Coordinate system"

### Independent Edit Types (Preserve Data)

These journeys edit a single value and return directly to review:

- **Journey 3**: Changing "Coordinates at centre of site" (circular sites)
- **Journey 4**: Changing "Width of circular site"
- **Journey 5**: Changing "Start and end points" (polygon sites)

---

## Journey 1a: Change Coordinate Entry Method (Circular Site)

**User clicks**: "Change" on "Single or multiple sets of coordinates"

**Flow**:
1. `how-do-you-want-to-enter-the-coordinates?site=X&returnTo=review-site-details`
   - Shows previous selection pre-selected (entry method)
   - Button: "Continue"
   - No Cancel link
   
2. `which-coordinate-system?site=X&returnTo=review-site-details`
   - **NO SELECTION** (coordinate system cleared - radios blank)
   - Button: "Continue"
   - No Cancel link
   
3. `enter-coordinates?site=X&returnTo=review-site-details`
   - **Coordinate values CLEARED** (latitude, longitude)
   - Button: "Continue"
   - No Cancel link
   
4. `site-width?site=X&returnTo=review-site-details`
   - **Width value CLEARED**
   - Button: "Save and continue" (last page)
   - No Cancel link
   
5. Returns to `review-site-details` with anchor to site

**Implementation**:
- `POST how-do-you-want-to-enter-the-coordinates-router`: Clears ALL coordinate data including coordinate system
- Deletes `site.coordinateSystem` so next page shows blank radios
- Redirects through full journey with `returnTo=review-site-details` parameter

---

## Journey 1b: Change Coordinate Entry Method (Polygon Site)

**User clicks**: "Change" on "Single or multiple sets of coordinates"

**Flow**:
1. `how-do-you-want-to-enter-the-coordinates?site=X&returnTo=review-site-details`
   - Shows previous selection pre-selected (entry method)
   - Button: "Continue"
   - No Cancel link
   
2. `which-coordinate-system?site=X&returnTo=review-site-details`
   - **NO SELECTION** (coordinate system cleared - radios blank)
   - Button: "Continue"
   - No Cancel link
   
3. `enter-multiple-coordinates?site=X&returnTo=review-site-details`
   - **Coordinate points CLEARED** (all 5 points)
   - Button: "Save and continue" (last page)
   - No Cancel link
   
4. Returns to `review-site-details` with anchor to site

**Implementation**:
- Same as Journey 1a but for polygon sites
- `POST how-do-you-want-to-enter-the-coordinates-router`: Clears ALL coordinate data including coordinate system
- Deletes `site.coordinateSystem` so next page shows blank radios
- POST handler detects `coordinates.type === 'polygon'` and routes to `enter-multiple-coordinates`

---

## Journey 2a: Change Coordinate System (Circular Site)

**User clicks**: "Change" on "Coordinate system"

**Flow**:
1. `which-coordinate-system?site=X&returnTo=review-site-details`
   - Shows previous coordinate system selection pre-selected
   - Button: "Continue"
   - No Cancel link
   
2. `enter-coordinates?site=X&returnTo=review-site-details`
   - **Coordinate values CLEARED** (latitude, longitude)
   - Button: "Continue"
   - No Cancel link
   
3. `site-width?site=X&returnTo=review-site-details`
   - **Width value CLEARED**
   - Button: "Save and continue" (last page)
   - No Cancel link
   
4. Returns to `review-site-details` with anchor to site

**Implementation**:
- `POST which-coordinate-system-router`: Clears coordinate VALUES but preserves entry method and type
- Redirects through remaining journey with `returnTo=review-site-details` parameter

---

## Journey 2b: Change Coordinate System (Polygon Site)

**User clicks**: "Change" on "Coordinate system"

**Flow**:
1. `which-coordinate-system?site=X&returnTo=review-site-details`
   - Shows previous coordinate system selection pre-selected
   - Button: "Continue"
   - No Cancel link
   
2. `enter-multiple-coordinates?site=X&returnTo=review-site-details`
   - **Coordinate points CLEARED** (all 5 points)
   - Button: "Save and continue" (last page)
   - No Cancel link
   
3. Returns to `review-site-details` with anchor to site

**Implementation**:
- Same as Journey 2a but for polygon sites
- POST handler detects `coordinates.type === 'polygon'` and routes to `enter-multiple-coordinates`

---

## Journey 3: Independent Edit - Coordinates (Circular Sites)

**User clicks**: "Change" on "Coordinates at centre of site"

**Flow**:
1. `enter-coordinates?site=X&returnTo=review-site-details`
   - **Previous coordinate values PRESERVED** (latitude, longitude shown)
   - Button: "Save and continue" (single page edit)
   - No Cancel link
   
2. Returns to `review-site-details` with anchor to site

**Implementation**:
- `POST enter-coordinates-router`: Detects that site already has width (`site.coordinates.width` exists)
- Recognizes this as independent edit, not journey restart
- Returns directly to review page

---

## Journey 4: Independent Edit - Width (Circular Sites)

**User clicks**: "Change" on "Width of circular site"

**Flow**:
1. `site-width?site=X&returnTo=review-site-details`
   - **Previous width value PRESERVED**
   - Button: "Save and continue" (single page edit)
   - No Cancel link
   
2. Returns to `review-site-details` with anchor to site

**Implementation**:
- `POST site-width-router`: Always returns to review page with anchor
- This works for both journey restarts (1a, 2a) and independent edits

---

## Journey 5: Independent Edit - Multiple Coordinates (Polygon Sites)

**User clicks**: "Change" on "Start and end points"

**Flow**:
1. `enter-multiple-coordinates?site=X&returnTo=review-site-details`
   - **Previous coordinate points PRESERVED** (all points shown)
   - Button: "Save and continue" (single page edit)
   - No Cancel link
   
2. Returns to `review-site-details` with anchor to site

**Implementation**:
- `POST enter-multiple-coordinates-router`: Always returns to review page with anchor
- This works for both journey restarts (1b, 2b) and independent edits

---

## Journey 6: Activity Details - Shared Activity Dates

**User clicks**: "Change" on "Activity dates" (in Activity details card, multiple sites only)

**Flow**:
1. `activity-dates?site=X&returnTo=review-site-details`
   - **Previous shared dates PRESERVED** (dates shown)
   - Button: "Save and continue" (single page edit)
   - No Cancel link
   
2. Returns to `review-site-details#activity-details`

**Template**: `activity-dates.html`

**Changes Made**:
```nunjucks
<div class="govuk-button-group">
  {{ govukButton({
    text: "Save and continue" if returnTo == 'review-site-details' else "Continue"
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**How It Works**:
- **Change journey** (`returnTo=review-site-details`): Shows "Save and continue", hides cancel link
- **Creation journey** (no `returnTo`): Shows "Continue", shows cancel link

**Route Handler**:
- `POST activity-dates-router`: Updates shared dates in batch settings
- Applies shared dates to all sites in batch
- Returns to review page

---

## Journey 7: Activity Details - Shared Activity Description

**User clicks**: "Change" on "Activity description" (in Activity details card, multiple sites only)

**Flow**:
1. `activity-description?site=X&returnTo=review-site-details`
   - **Previous shared description PRESERVED** (description shown)
   - Button: "Save and continue" (single page edit)
   - No Cancel link
   
2. Returns to `review-site-details#activity-details`

**Template**: `activity-description.html`

**Changes Made**:
```nunjucks
<div class="govuk-button-group">
  {{ govukButton({
    text: "Save and continue" if returnTo == 'review-site-details' else "Continue"
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**How It Works**:
- **Change journey** (`returnTo=review-site-details`): Shows "Save and continue", hides cancel link
- **Creation journey** (no `returnTo`): Shows "Continue", shows cancel link

**Route Handler**:
- `POST activity-description-router`: Updates shared description in batch settings
- Applies shared description to all sites in batch
- Returns to review page

---

## Key Implementation Details

### Data Clearing Strategy

**Journey 1a/1b (Coordinate Entry Method Change)**:
```javascript
// CLEAR: ALL coordinate data including system - user starts fresh
site.coordinates = { entryMethod: selection };

// Set coordinate type based on selection
if (selection === "Enter one set of coordinates and a width to create a circular site") {
    site.coordinates.type = 'circle';
} else if (selection === "Enter multiple sets of coordinates to mark the boundary of the site") {
    site.coordinates.type = 'polygon';
}

// CLEAR: Coordinate system from site object
delete site.coordinateSystem;

// CLEAR: ALL session data including coordinate system selection
delete req.session.data['manual-coordinate-system-radios'];
delete req.session.data['coordinates-latitude'];
delete req.session.data['coordinates-longitude'];
delete req.session.data['site-width'];
// ... clear all coordinate points
```

**Journey 2a/2b (Coordinate System Change)**:
```javascript
// PRESERVE: Entry method and type (but update system to new selection)
const preservedData = {
    entryMethod: site.coordinates.entryMethod,
    type: site.coordinates.type,
    system: selection  // New selection from form
};

// CLEAR: All coordinate values (but keep method and type)
site.coordinates = preservedData;

// Update coordinate system
site.coordinateSystem = selection;

// CLEAR: Session data for coordinate values only
delete req.session.data['coordinates-latitude'];
delete req.session.data['coordinates-longitude'];
delete req.session.data['site-width'];
// ... clear all coordinate points
```

**Key Difference**:
- **Journey 1a/1b**: Clears `site.coordinateSystem` → template shows NO selection (blank radios)
- **Journey 2a/2b**: Keeps `site.coordinateSystem` → template shows PREVIOUS selection (pre-checked radio)

### Journey Detection Logic

**How routes determine journey type**:

1. **Journey Restart (1a/1b, 2a/2b)**: 
   - Has `returnTo=review-site-details` parameter
   - Triggered from coordinate method or system change links
   - Clears data and continues through remaining pages

2. **Independent Edit (3, 4, 5)**:
   - Has `returnTo=review-site-details` parameter
   - Triggered from value-specific change links
   - For coordinates: Detects existing width → independent edit
   - Returns directly to review

### Button Text Logic (Template Level) ✅ IMPLEMENTED

**Templates display**:
- "Continue" for intermediate pages in journey restarts
- "Save and continue" for:
  - Last page in journey restarts (`site-width`, `enter-multiple-coordinates`)
  - All independent edits (single page edits)

**Implementation**:

1. **`enter-coordinates.html`** - Conditional button text:
```nunjucks
{% set isIndependentEdit = (returnTo == 'review-site-details' and site.coordinates.type == 'circle' and site.coordinates.width) %}
{{ govukButton({
  text: "Save and continue" if isIndependentEdit else "Continue"
}) }}
```

2. **`site-width.html`** - Always last page:
```nunjucks
{{ govukButton({
  text: "Save and continue"
}) }}
```

3. **`enter-multiple-coordinates.html`** - Always last page:
```nunjucks
{{ govukButton({
  text: "Save and continue"
}) }}
```

4. **`which-coordinate-system.html`** and **`how-do-you-want-to-enter-the-coordinates.html`** - Middle pages:
```nunjucks
{{ govukButton({
  text: "Continue"
}) }}
```

### Cancel Link Logic (Template Level) ✅ IMPLEMENTED

**All change journeys**: No cancel links shown

**Implementation in ALL templates**:
```nunjucks
{% if returnTo !== 'review-site-details' %}
    <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
{% endif %}
```

Applied to:
- `how-do-you-want-to-enter-the-coordinates.html`
- `which-coordinate-system.html`
- `enter-coordinates.html`
- `site-width.html`
- `enter-multiple-coordinates.html`

### Coordinate System Selection Display ✅ IMPLEMENTED

**Requirement**: 
- **Journey 1a/1b** (changing entry method): Coordinate system should be **BLANK** (no selection)
- **Journey 2a/2b** (changing coordinate system): Coordinate system should show **PREVIOUS selection**
- **Creation journeys**: Use session data

**Fix in `which-coordinate-system.html`**:
```nunjucks
{# For change journeys, use site.coordinateSystem #}
{# Journey 2a/2b will have it (shows previous selection) #}
{# Journey 1a/1b won't have it - will be cleared (shows blank) #}
{# For creation journeys, use session data #}
{{ govukRadios({
    value: site.coordinateSystem if returnTo == 'review-site-details' else data[siteDataKey],
    items: [
        {
            value: "WGS84 (World Geodetic System 1984)",
            checked: (site.coordinateSystem == "WGS84 (World Geodetic System 1984)") if returnTo == 'review-site-details' else (data[siteDataKey] == "WGS84 (World Geodetic System 1984)")
        },
        {
            value: "OSGB36 (National Grid)",
            checked: (site.coordinateSystem == "OSGB36 (National Grid)") if returnTo == 'review-site-details' else (data[siteDataKey] == "OSGB36 (National Grid)")
        }
    ]
}) }}
```

**How it works**:
- **Journey 1a/1b**: Route handler deletes `site.coordinateSystem` → template reads `undefined` → no radio selected ✓
- **Journey 2a/2b**: Route handler preserves `site.coordinateSystem` → template reads previous value → radio pre-selected ✓
- **Creation journeys**: Template reads from session data as normal ✓

---

## Route Handler Summary

### Modified Route Handlers

1. **`POST how-do-you-want-to-enter-the-coordinates-router`** (lines 1493-1556)
   - Detects Journey 1a/1b
   - Clears coordinate VALUES, preserves coordinate SYSTEM
   - Redirects to `which-coordinate-system` with `returnTo`

2. **`POST which-coordinate-system-router`** (lines 1634-1723)
   - Detects Journey 2a/2b
   - Clears coordinate VALUES, preserves entry METHOD and TYPE
   - Redirects to `enter-coordinates` or `enter-multiple-coordinates` with `returnTo`

3. **`POST enter-coordinates-router`** (lines 1813-1921)
   - Distinguishes between Journey 3 (independent edit) and part of 1a/2a
   - If no width exists → journey restart, continue to site-width
   - If width exists → independent edit, return to review

4. **`POST site-width-router`** (lines 1962-2021)
   - Always returns to review with anchor
   - Works for both journey restarts and independent edits

5. **`POST enter-multiple-coordinates-router`** (lines 2367-2485)
   - Always returns to review with anchor
   - Works for both journey restarts and independent edits

### Unchanged Route Handlers

All GET route handlers remain unchanged and simply load site data from the batch. The data clearing happens in POST handlers, so GET routes naturally show:
- Cleared data for journey restarts (POST already cleared it)
- Preserved data for independent edits (POST didn't clear it)

---

## Testing Checklist

### Journey 1a Testing
- [ ] Click "Change" on coordinate entry method for circular site
- [ ] Verify previous method is selected
- [ ] Change or keep selection, click Continue
- [ ] Verify previous coordinate system is selected
- [ ] Select system, click Continue
- [ ] Verify coordinates form is EMPTY (cleared)
- [ ] Enter coordinates, click Continue
- [ ] Verify width form is EMPTY (cleared)
- [ ] Enter width, click "Save and continue"
- [ ] Verify return to review page with updated data

### Journey 1b Testing
- [ ] Click "Change" on coordinate entry method for polygon site
- [ ] Verify previous method is selected
- [ ] Select "multiple coordinates", click Continue
- [ ] Verify previous coordinate system is selected
- [ ] Select system, click Continue
- [ ] Verify all coordinate points are EMPTY (cleared)
- [ ] Enter coordinates, click "Save and continue"
- [ ] Verify return to review page with updated data

### Journey 2a Testing
- [ ] Click "Change" on coordinate system for circular site
- [ ] Verify previous system is selected
- [ ] Change system, click Continue
- [ ] Verify coordinates form is EMPTY (cleared)
- [ ] Enter coordinates, click Continue
- [ ] Verify width form is EMPTY (cleared)
- [ ] Enter width, click "Save and continue"
- [ ] Verify return to review page

### Journey 2b Testing
- [ ] Click "Change" on coordinate system for polygon site
- [ ] Verify previous system is selected
- [ ] Change system, click Continue
- [ ] Verify all coordinate points are EMPTY (cleared)
- [ ] Enter coordinates, click "Save and continue"
- [ ] Verify return to review page

### Journey 3 Testing
- [ ] Click "Change" on "Coordinates at centre of site"
- [ ] Verify previous coordinates ARE SHOWN (preserved)
- [ ] Modify coordinates, click "Save and continue"
- [ ] Verify return to review page with updated coordinates
- [ ] Verify width is unchanged

### Journey 4 Testing
- [ ] Click "Change" on "Width of circular site"
- [ ] Verify previous width IS SHOWN (preserved)
- [ ] Modify width, click "Save and continue"
- [ ] Verify return to review page with updated width
- [ ] Verify coordinates are unchanged

### Journey 5 Testing
- [ ] Click "Change" on "Start and end points"
- [ ] Verify previous coordinate points ARE SHOWN (preserved)
- [ ] Modify coordinates, click "Save and continue"
- [ ] Verify return to review page with updated coordinates

### General Testing
- [ ] Verify NO cancel links show on any change journey page
- [ ] Verify button text is correct for each page
- [ ] Verify initial site creation journeys still work correctly
- [ ] Verify browser back button doesn't cause issues
- [ ] Verify multiple sites scenario works for all journeys

---

## Edge Cases Handled

1. **Browser Back Button**: Session data clearing ensures forms don't show stale data
2. **Same Selection**: Journey restarts even if user selects same option (ensures consistency)
3. **Missing Data**: Graceful handling when coordinate system or other data is missing
4. **Multiple Sites**: All journeys work correctly with multiple sites in batch
5. **Batch Persistence**: Site data persists in batch structure across journey restarts

---

## Summary

The implementation successfully handles all 5 journey types from the review page change links:

- **Journey restarts (1a, 1b, 2a, 2b)**: Clear subsequent data, force user through remaining steps, preserve selection context
- **Independent edits (3, 4, 5)**: Preserve all data, single page edit, direct return to review

All journeys:
- Show no cancel links
- Use appropriate button text ("Continue" vs "Save and continue")
- Return to review page with anchor to updated site
- Do not affect initial site creation journeys
- Handle edge cases gracefully

The solution is clean, maintainable, and follows the existing codebase patterns.

---

## Implementation Pattern Guide for Other Journeys (e.g., Sample Plans)

This section provides a comprehensive pattern guide that can be followed for implementing change link journeys in other parts of the application (such as the sample plans journey).

### Pattern 1: Single-Page Independent Edit

**Use for**: Simple one-field changes that don't affect other fields (e.g., Journey 3, 4, 5, 6, 7)

**Template Pattern**:
```nunjucks
<div class="govuk-button-group">
  {{ govukButton({
    text: "Save and continue" if returnTo == 'review-site-details' else "Continue"
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**Route Handler Pattern**:
```javascript
router.post('/' + version + section + 'your-page-router', function (req, res) {
    const returnTo = req.query.returnTo;
    const value = req.body['your-field'];
    
    // Get site/batch and update
    const site = getCurrentSite(req.session);
    site.yourField = value;
    
    // Validation...
    
    if (returnTo === 'review-site-details') {
        // Independent edit - return directly to review
        return res.redirect('review-page?site=' + site.id + '#anchor');
    } else {
        // Creation journey - continue to next page
        return res.redirect('next-page');
    }
});
```

**When to Use**:
- Editing a single value
- No dependencies on other fields
- Data is preserved (shown in form)

---

### Pattern 2: Multi-Page Journey Restart (Clear Subsequent Data)

**Use for**: Changes that invalidate subsequent choices (e.g., Journey 1a/1b, 2a/2b)

**Template Pattern for First Page**:
```nunjucks
{# Show previous selection for the CHANGED field #}
{{ govukRadios({
    value: site.yourField,
    items: [...]
}) }}

<div class="govuk-button-group">
  {{ govukButton({
    text: "Continue"  {# Always Continue, not Save and continue #}
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**Template Pattern for Intermediate Pages**:
```nunjucks
{# Clear or preserve based on journey type #}
{# Journey 1a/1b: Clear everything (blank forms) #}
{# Journey 2a/2b: Preserve selections, clear values #}

<div class="govuk-button-group">
  {{ govukButton({
    text: "Continue"
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**Template Pattern for Last Page**:
```nunjucks
{# Values cleared #}

<div class="govuk-button-group">
  {{ govukButton({
    text: "Save and continue"  {# Last page uses Save and continue #}
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**Route Handler Pattern (First POST)**:
```javascript
router.post('/' + version + section + 'trigger-page-router', function (req, res) {
    const returnTo = req.query.returnTo;
    const newSelection = req.body['your-field'];
    
    if (returnTo === 'review-site-details') {
        console.log(`🔄 JOURNEY RESTART: Clearing subsequent data`);
        
        // Clear ALL data that depends on this change
        site.dependentField = null;
        site.anotherDependentField = null;
        
        // Clear session data
        delete req.session.data['dependent-field'];
        delete req.session.data['another-dependent-field'];
        
        // Continue through journey with returnTo parameter
        return res.redirect('next-page?site=' + site.id + '&returnTo=review-site-details');
    } else {
        // Normal creation flow
        return res.redirect('next-page?site=' + site.id);
    }
});
```

**Route Handler Pattern (Intermediate/Last POST)**:
```javascript
router.post('/' + version + section + 'intermediate-page-router', function (req, res) {
    const returnTo = req.query.returnTo;
    
    // Update site data...
    
    if (returnTo === 'review-site-details') {
        // Check if this is the last page in the journey
        if (isLastPage) {
            // Last page - return to review
            return res.redirect('review-page?site=' + site.id + '#anchor');
        } else {
            // Not last page - continue journey
            return res.redirect('next-page?site=' + site.id + '&returnTo=review-site-details');
        }
    } else {
        // Normal creation flow
        return res.redirect('next-page?site=' + site.id);
    }
});
```

**When to Use**:
- Changing a field invalidates subsequent fields
- Need to guide user through multiple pages
- Clear dependent data but preserve context

---

### Pattern 3: Conditional Button Text Based on Journey Position

**Use for**: Pages that can be reached from different contexts

**Template Pattern**:
```nunjucks
{# Detect if this is an independent edit or part of a journey restart #}
{% set isIndependentEdit = (returnTo == 'review-site-details' and site.hasAllDependentData) %}

<div class="govuk-button-group">
  {{ govukButton({
    text: "Save and continue" if isIndependentEdit else "Continue"
  }) }}
  {% if returnTo !== 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-site-details">Cancel</a>
  {% endif %}
</div>
```

**Route Handler Pattern**:
```javascript
router.post('/' + version + section + 'your-page-router', function (req, res) {
    const returnTo = req.query.returnTo;
    
    if (returnTo === 'review-site-details') {
        // Determine if independent edit or journey restart
        if (site.hasDependentData) {
            // Independent edit - return to review
            return res.redirect('review-page#anchor');
        } else {
            // Journey restart - continue to next page
            return res.redirect('next-page?returnTo=review-site-details');
        }
    } else {
        // Creation flow
        return res.redirect('next-page');
    }
});
```

**Example**: Journey 3 (`enter-coordinates`) - checks if `site.coordinates.width` exists to determine journey type

---

### Checklist for Implementing Change Links

**For Each Page in Your Journey**:

- [ ] **Template Updates**:
  - [ ] Add conditional button text: `"Save and continue" if returnTo == 'review-site-details' else "Continue"`
  - [ ] Hide cancel link: `{% if returnTo !== 'review-site-details' %}`
  - [ ] Ensure form action includes: `{% if returnTo %}&returnTo={{ returnTo }}{% endif %}`
  - [ ] For selection fields: Determine if showing previous selection or cleared based on journey type

- [ ] **Route Handler Updates (GET)**:
  - [ ] Accept `returnTo` query parameter
  - [ ] Pass `returnTo` to template
  - [ ] Load appropriate data (from site object for changes, from session for creation)
  - [ ] Track review state if needed: `updateReviewState(req.session, 'editing')`

- [ ] **Route Handler Updates (POST)**:
  - [ ] Accept `returnTo` query parameter
  - [ ] Determine journey type (independent edit vs journey restart)
  - [ ] Clear dependent data for journey restarts
  - [ ] Clear session data to prevent stale values
  - [ ] Redirect appropriately:
    - Journey restart: `next-page?returnTo=review-site-details`
    - Independent edit: `review-page#anchor`
    - Creation: `next-page`

- [ ] **Testing**:
  - [ ] Test change link from review page
  - [ ] Verify button text is correct
  - [ ] Verify cancel link is hidden
  - [ ] Verify data clearing/preservation
  - [ ] Verify return to review page works
  - [ ] Test browser back button
  - [ ] Test validation errors
  - [ ] Test initial creation journey still works

---

### Common Pitfalls to Avoid

1. **Reading stale session data**: Always read from site/batch object when `returnTo=review-site-details`
2. **Not clearing session data**: Clear session keys when clearing site data, otherwise forms show old values
3. **Wrong button text**: Last page uses "Save and continue", intermediate pages use "Continue"
4. **Forgetting cancel link logic**: Must hide for ALL change journeys
5. **Not passing returnTo through journey**: Every redirect in a multi-page journey must preserve `returnTo` parameter
6. **Clearing too much data**: Journey 2a/2b preserves system selection, only clears values
7. **Not using anchors**: When returning to review, use anchor links to jump to updated section

---

### Example Application: Sample Plans Journey

If implementing change links for sample plans (similar structure to manual entry):

1. **Identify all change links** on the sample plans review page
2. **Categorize each journey**:
   - Single-page independent edits (like Journey 3, 4, 5, 6, 7)
   - Multi-page journey restarts (like Journey 1a/1b, 2a/2b)
3. **Apply appropriate pattern** from above
4. **Update templates** with button text and cancel link logic
5. **Update route handlers** with journey detection and data clearing
6. **Test thoroughly** using the testing checklist

The patterns are consistent across different parts of the application - just adapt the field names, page names, and data structures to match your specific journey.

---

## Summary

This implementation provides a complete solution for all change link journeys in the manual entry flow, with comprehensive documentation that can be used as a reference for implementing similar functionality in other parts of the application (such as sample plans).

**Key Principles**:
1. **Single-page edits**: "Save and continue" button, no cancel link, preserve data
2. **Multi-page journey restarts**: "Continue" buttons (except last page), no cancel links, clear dependent data
3. **Always pass `returnTo` parameter** through multi-page journeys
4. **Read from site/batch object** when changing from review (not session data)
5. **Clear session data** when clearing site data to prevent stale form values

The solution is clean, maintainable, follows existing codebase patterns, and is fully documented for future reference.

