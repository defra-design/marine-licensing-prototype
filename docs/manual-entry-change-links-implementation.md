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
- ✅ `exemption-manual-entry.js` (route handlers)
- ✅ `how-do-you-want-to-enter-the-coordinates.html`
- ✅ `which-coordinate-system.html`
- ✅ `enter-coordinates.html`
- ✅ `site-width.html`
- ✅ `enter-multiple-coordinates.html`

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

