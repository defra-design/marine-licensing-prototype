# Manual Entry Batch System Alignment - Implementation Guide

## Overview

This document provides step-by-step instructions for aligning manual entry with the proven file upload architecture by making manual entry use the batch system instead of the failed unified model approach.

## Goal

**Make manual entry work exactly like file upload** - simple, proven, effective.

## Progress Tracking

- [ ] Task 1: Analyze File Upload Pattern
- [ ] Task 2: Convert Manual Entry to Batch System
- [ ] Task 3: Remove Unified Model Complexity
- [ ] Task 4: Testing and Validation

## Context: What Works vs What's Broken

### ✅ File Upload (WORKING - Our Target Pattern)
```javascript
// Simple, proven approach:
1. initializeBatch(session, 'file-upload')
2. addSiteToBatch(session, siteData) 
3. Review page reads from batch.sites
// Result: Works perfectly ✅
```

### ❌ Manual Entry (BROKEN - Needs Fixing)
```javascript
// Complex, failed approach:
1. createNewSite(session) // Unified model
2. updateSiteField(session, siteId, field, value) // Unified model
3. Review page can't find sites
// Result: Completely broken ❌
```

### ✅ Field Name Fixes (WORKING - Keep These)
From previous refactoring attempt:
- `activity-details-text-area` field names fixed
- `start-date-date-input-day` etc. field names fixed
- Form debugging infrastructure added

## Manual Entry Journey Types

Both single and multiple site manual entry journeys use the batch system, but with different navigation flows.

### Decision Point: Does Your Project Involve More Than One Site?

**Route:** `/manual-entry/does-your-project-involve-more-than-one-site`
**Router:** `does-your-project-involve-more-than-one-site-router`

**Key Behavior:**
```javascript
// Both answers create a batch:
const batchId = initializeBatch(req.session, 'manual-entry');

// Decision stored in session:
req.session.data['manual-multiple-sites'] = selection; // "Yes" or "No"

// Both go to site-name first:
res.redirect('site-name?site=' + nextGlobalSiteNumber);
```

### Single Site Journey (`manual-multiple-sites` = "No")

**Exact Flow:**
```
1. Do you need to enter coordinates for more than one site? → No
2. Site name
3. Activity dates
4. Activity description  
5. How do you want to enter the site coordinates?
6. Which coordinate system do you want to use?
7. Then depending on coordinate entry method choice:
   - Enter the coordinates at the centre point → Enter width → Review site details
   - Enter multiple sets of coordinates to mark boundary → Review
```

**Navigation Logic:**
```javascript
if (multiSiteChoice === 'No') {
    // Single site: skip shared questions, go straight to individual dates
    res.redirect('individual-site-activity-dates?site=' + site.globalNumber);
}
```

**Batch Characteristics:**
- Uses batch system but no `batch.settings` for shared questions
- Single site in `batch.sites` array
- Simpler review page logic (always show dates/description)

### Multiple Site Journey (`manual-multiple-sites` = "Yes") 

**Exact Flow:**
```
1. Do you need to enter coordinates for more than one site? → Yes
2. Site name
3. Are the activity dates the same for every site?
   → Yes → Activity dates (for all sites)
   → No → Activity dates (single site)
4. Is the activity description the same for every site?
   → Yes → Activity description (for all sites)  
   → No → Activity description (single site)
5. How do you want to enter the site coordinates?
6. Which coordinate system do you want to use?
7. Then depending on coordinate entry method choice:
   - Enter the coordinates at the centre point → Enter width → Review site details
   - Enter multiple sets of coordinates to mark boundary → Review
```

**Critical "Add Another Site" Behavior:**
- "Add another site" from Review → Site name for Site 2
- **Remembers shared settings**: `batch.settings.sameActivityDates` and `batch.settings.sameActivityDescription`
- **If shared dates/description**: Skip those questions for Site 2, Site 3, etc.
- **If individual**: Ask for dates/description for each new site

**Navigation Logic:**
```javascript
else {
    // Multiple site: check if shared activity dates question was answered
    if (!hasSharedActivityDatesAnswer) {
        res.redirect('same-activity-dates'); // Shared questions flow
    } else if (currentBatch.settings.sameActivityDates === 'Yes') {
        res.redirect('activity-dates'); // Shared dates
    } else {
        res.redirect('individual-site-activity-dates?site=' + site.globalNumber); // Individual dates
    }
}
```

**Batch Characteristics:**
- Uses batch system with `batch.settings` for shared questions
- Multiple sites in `batch.sites` array  
- Complex review page logic (conditional display based on shared settings)
- Loop-back behavior when changing shared/individual preferences
- **Preserves shared settings when adding new sites**

### Critical Insight for Batch Alignment

**The batch system already supports both journeys** - we just need to ensure:

1. **Single site routes work with batch system** (simpler case)
2. **Multiple site shared questions are preserved** (complex case) 
3. **Navigation logic based on `manual-multiple-sites` remains intact**
4. **Review page conditional logic continues working**

**Both journeys already use `initializeBatch()` and store sites in `batch.sites`** - the unified model complexity is the problem, not the batch system itself.

## Correct Templates Reference

**CRITICAL:** Use the correct templates for each step. The current templates in `multiple-sites-v2` are:

### Shared Questions Templates (Multiple Sites Only)
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/same-activity-dates.html`
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/same-activity-description.html`

### Shared Data Collection Templates (Multiple Sites Only)
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/activity-dates.html` - **Shared dates for all sites**
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/activity-description.html` - **Shared description for all sites**

### Individual Data Collection Templates (Both Journeys)
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/individual-site-activity-dates.html` - **Individual site dates**
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/individual-site-activity-description.html` - **Individual site description**

### Template Verification
If in doubt about correct flows, **reference `multiple-sites-v1.2`** - this version contains the working flows from before refactoring started.

**Key Template Distinctions:**
- `activity-dates.html` = Shared dates (multiple sites "Yes" to same dates)
- `individual-site-activity-dates.html` = Individual dates (single site OR multiple sites "No" to same dates)
- `activity-description.html` = Shared description (multiple sites "Yes" to same description)  
- `individual-site-activity-description.html` = Individual description (single site OR multiple sites "No" to same description)

## Implementation Strategy

**Follow the KISS principle**: Keep It Simple, Stupid
1. **Study how file upload works** (it's proven)
2. **Make manual entry do the same thing** (copy the pattern)
3. **Remove unified model complexity** (delete the failed code)
4. **Test that it works like file upload** (same behavior)

---

## Task 1: Analyze File Upload Pattern

### Purpose
Understand exactly how file upload works so we can replicate it for manual entry.

### Location
`app/routes/versions/multiple-sites-v2/exemption.js` (file upload routes)

### Instructions

#### 1. Document File Upload Data Flow
Map out the complete file upload journey:

```javascript
// 1. File Upload Route (around line 1750)
router.post('/' + version + section + 'upload-file-router', function (req, res) {
    // Creates batch
    const batchId = initializeBatch(req.session, 'file-upload');
    
    // Creates site data objects
    const sites = [
        { name: 'Site 1', startDate: {}, endDate: {}, description: '', ... }
    ];
    
    // Adds to batch
    sites.forEach(site => addSiteToBatch(req.session, site));
    
    // Routes to next step
    res.redirect('same-activity-dates');
});

// 2. Same Activity Routes
// Populate batch.settings with shared preferences

// 3. Review Route  
router.get('/' + version + section + 'review-site-details', function (req, res) {
    const sites = getCurrentBatch(req.session).sites; // ← Reads from batch
    res.render('review-site-details', { sites }); // ← Works perfectly
});
```

#### 2. Document Site Data Structure
Record the exact structure file upload uses:

```javascript
const siteData = {
    name: 'Site name',
    startDate: { day: '', month: '', year: '' },
    endDate: { day: '', month: '', year: '' }, 
    description: '',
    coordinates: {},
    globalNumber: X,
    batchId: 'batch_id',
    // Any other fields...
};
```

#### 3. Document Batch System Functions
List all functions file upload uses successfully:
- `initializeBatch(session, entryMethod)`
- `addSiteToBatch(session, siteData)`
- `getCurrentBatch(session)`
- Any others...

### Success Criteria
- [ ] Complete file upload data flow documented
- [ ] Site data structure defined
- [ ] Batch system functions identified
- [ ] Clear pattern to replicate for manual entry

### Completion Notes
**Agent:** [Name]

**File upload pattern analysis:**
- [ ] Data flow documented
- [ ] Site structure recorded
- [ ] Functions identified

**Key insights:**
- [List main findings about why file upload works]

---

## Task 1.5: Analyze Multiple Site Manual Entry Journey

### Purpose
Document the specific multiple site journey with shared/individual questions that must be preserved when converting to batch system.

### Current Multiple Site Journey
Based on your mapping, the multiple site manual entry has this flow:

```
Multiple sites question → Site name → Activity dates → Activity description → 
Coordinate method → Coordinate system → Coordinates → Width/Multiple coordinates → Review
```

**But with shared questions that apply to all sites:**
1. **"Are activity dates the same for every site?"** (Yes/No)
   - If Yes → Collect shared dates once, apply to all sites
   - If No → Collect individual dates for each site
   
2. **"Is the activity description the same for every site?"** (Yes/No)
   - If Yes → Collect shared description once, apply to all sites  
   - If No → Collect individual descriptions for each site

### Current Implementation (Already Working)
The system already stores these settings in `batch.settings`:

```javascript
// In same-activity-dates-router:
currentBatch.settings.sameActivityDates = selection; // "Yes" or "No"

// In same-activity-description-router:  
currentBatch.settings.sameActivityDescription = selection; // "Yes" or "No"

// Shared data stored in batch.settings:
currentBatch.settings.sharedStartDate = { day: '', month: '', year: '' };
currentBatch.settings.sharedEndDate = { day: '', month: '', year: '' };
currentBatch.settings.sharedDescription = 'Description text';
```

### Loop-Back Behavior (Must Preserve)
When user returns from review page and changes settings:

**Scenario 1:** Change "Yes" to "No" (shared to individual)
- Copy shared data to all individual sites
- Clear shared data from batch.settings
- Allow individual editing

**Scenario 2:** Change "No" to "Yes" (individual to shared)  
- Use first site's data as shared data
- Clear individual site data
- Apply shared data to all sites

### Key Insight for Batch Alignment
**File upload doesn't need this complexity** because it processes all sites at once from a file.

**Manual entry MUST keep this complexity** because it collects data iteratively for multiple sites.

**The batch system already supports this** via `batch.settings` - we just need to ensure it's preserved during conversion.

### Success Criteria
- [ ] Multiple site journey documented
- [ ] Shared/individual questions pattern understood
- [ ] Loop-back behavior requirements identified
- [ ] Current batch.settings usage documented

### Completion Notes
**Agent:** [Name]

**Multiple site journey analysis:**
- [ ] Journey flow documented
- [ ] Shared questions identified  
- [ ] Loop-back scenarios mapped
- [ ] batch.settings usage confirmed

**Critical requirement:** The batch alignment must preserve the shared/individual questions flow that file upload doesn't need.

---

## Task 2: Convert Manual Entry to Batch System

### Purpose
Replace the unified model approach with the proven batch system pattern from file upload, **while preserving the shared/individual questions flow that manual entry needs**.

### Location
`app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

### Instructions

#### 1. Replace Site Creation Pattern

**Current (Broken):**
```javascript
// Manual entry creates unified model sites
const site = createNewSite(req.session);
updateSiteField(req.session, siteId, 'name', siteName);
```

**Target (Working like file upload):**
```javascript
// Manual entry creates batch sites (like file upload)
if (!getCurrentBatch(req.session)) {
    initializeBatch(req.session, 'manual-entry');
}

const siteData = {
    name: siteName,
    startDate: {},
    endDate: {},
    description: '',
    coordinates: {},
    // ... match file upload structure exactly
};

addSiteToBatch(req.session, siteData);
```

#### 2. Update Each Manual Entry Route

**Routes to convert:**
- `site-name-router` 
- `individual-site-activity-dates-router`
- `individual-site-activity-description-router`
- `coordinate-entry-method-router`
- `coordinate-system-router`
- `enter-coordinates-router` 
- `site-width-router`

**Pattern for each route:**
1. **Get current batch**: `const batch = getCurrentBatch(req.session)`
2. **Find site in batch**: `const site = batch.sites.find(s => s.globalNumber === siteNumber)`
3. **Update site directly**: `site.fieldName = newValue`
4. **No unified model calls**: Remove `updateSiteField`, `findSiteById`, etc.

#### 3. **PRESERVE** Shared/Individual Questions Routes

**CRITICAL:** These routes must be kept and updated to work with batch system:

**Routes to PRESERVE and update (not remove):**
- `same-activity-dates-router` - "Are dates the same for every site?"
- `same-activity-description-router` - "Are descriptions the same for every site?"  
- `activity-dates-router` - Shared dates entry
- `activity-description-router` - Shared description entry

**Update pattern for shared routes:**
```javascript
// Store shared settings in batch.settings (already working)
const currentBatch = getCurrentBatch(req.session);
if (!currentBatch.settings) currentBatch.settings = {};

// For shared dates:
currentBatch.settings.sameActivityDates = selection; // "Yes" or "No"
currentBatch.settings.sharedStartDate = { day: '', month: '', year: '' };
currentBatch.settings.sharedEndDate = { day: '', month: '', year: '' };

// For shared description:
currentBatch.settings.sameActivityDescription = selection; // "Yes" or "No"  
currentBatch.settings.sharedDescription = 'Description text';
```

#### 4. Fix Review Page Integration

The review page should work automatically once manual entry uses batches because it already reads from `getCurrentBatch(req.session).sites` **and** `batch.settings` for shared data.

**Remove:**
```javascript
// Remove complex conversion function
convertManualSitesToUnifiedFormat(req);
```

**Keep working logic:**
```javascript
// Simple, like file upload (already works)
const batch = getCurrentBatch(req.session);
const sites = batch ? batch.sites : [];

// Review page already checks batch.settings for shared questions:
// - batch.settings.sameActivityDates
// - batch.settings.sameActivityDescription  
// - batch.settings.sharedStartDate, etc.

res.render('review-site-details', { sites });
```

### Success Criteria
- [ ] All manual entry routes use batch system
- [ ] Sites appear on review page
- [ ] Data structure matches file upload
- [ ] No unified model function calls
- [ ] **Shared/individual questions still work**
- [ ] **Loop-back behavior preserved**
- [ ] **batch.settings functionality maintained**

### Completion Notes
**Agent:** [Name]

**Routes converted:**
- [ ] site-name-router
- [ ] activity-dates-router  
- [ ] activity-description-router
- [ ] coordinates-router
- [ ] site-width-router

**Shared routes preserved:**
- [ ] same-activity-dates-router
- [ ] same-activity-description-router
- [ ] Loop-back behavior working

**Issues encountered:** [List any problems and solutions]

---

## Task 3: Remove Unified Model Complexity

### Purpose
Clean up the failed unified model code to reduce complexity and prevent confusion.

### Location
`app/routes/versions/multiple-sites-v2/exemption.js`

### Instructions

#### 1. Remove Unified Model Functions
Delete these functions that are no longer needed:

```javascript
// Functions to DELETE:
function initializeUnifiedSiteModel(session) { ... }
function createNewSite(session, batchId = null) { ... }
function generateSiteId() { ... }
function findSiteById(session, siteId) { ... }
function findSiteByGlobalNumberUnified(session, globalNumber) { ... }
function updateSiteField(session, siteId, fieldPath, value) { ... }
function updateSiteCompletionStatus(site) { ... }
function migrateToUnifiedModel(session) { ... }
function renumberUnifiedSitesAfterDeletion(session, deletedGlobalNumber) { ... }
function deleteSiteFromUnifiedModel(session, siteId) { ... }
function clearUnifiedSiteData(session) { ... }
```

#### 2. Remove Global Exports
Delete unified model exports from the bottom of exemption.js:

```javascript
// DELETE these exports:
global.initializeUnifiedSiteModel = initializeUnifiedSiteModel;
global.createNewSite = createNewSite;
global.generateSiteId = generateSiteId;
global.findSiteById = findSiteById;
global.findSiteByGlobalNumberUnified = findSiteByGlobalNumberUnified;
global.updateSiteField = updateSiteField;
global.updateSiteCompletionStatus = updateSiteCompletionStatus;
global.migrateToUnifiedModel = migrateToUnifiedModel;
global.renumberUnifiedSitesAfterDeletion = renumberUnifiedSitesAfterDeletion;
global.deleteSiteFromUnifiedModel = deleteSiteFromUnifiedModel;
global.clearUnifiedSiteData = clearUnifiedSiteData;
```

#### 3. Remove Unified Model Session Data
Clean up any unified model session data:

```javascript
// Remove session data like:
delete session.data['unifiedSites'];
delete session.data['currentManualEntrySiteId'];
// Any other unified model session keys
```

#### 4. Keep Batch System Functions
**KEEP these functions** (they work and file upload uses them):

```javascript
// KEEP these - they work:
function initializeBatch(session, entryMethod) { ... }
function getCurrentBatch(session) { ... }
function addSiteToBatch(session, siteData) { ... }
function getSitesByBatch(session, batchId) { ... }
function getAllSites(session) { ... }
function findSiteByGlobalNumber(session, globalNumber) { ... }
// Any other batch-related functions
```

### Success Criteria
- [ ] All unified model functions removed
- [ ] Global exports cleaned up
- [ ] Batch system functions preserved
- [ ] No compilation errors

### Completion Notes
**Agent:** [Name]

**Functions removed:**
- [ ] Unified model functions deleted
- [ ] Global exports cleaned
- [ ] Session data cleared

**Functions preserved:**
- [ ] Batch system functions kept

---

## Task 4: Testing and Validation

### Purpose
Verify that manual entry now works exactly like file upload.

### Test Scenarios

#### Test 1: Manual Entry Basic Journey
1. **Start manual entry** from coordinate method selection
2. **Enter site name** → Should create batch and add site
3. **Enter activity dates** → Should update site in batch
4. **Enter description** → Should update site in batch  
5. **Enter coordinates** → Should update site in batch
6. **Enter site width** → Should update site in batch
7. **Review page** → Should show site with all data

**Expected Result:** Site appears on review page with all entered data

#### Test 2: Compare with File Upload
1. **Complete file upload journey** → Note final data structure
2. **Complete manual entry journey** → Compare data structure
3. **Both should look identical** in session data

**Expected Result:** Manual entry sites have same structure as file upload sites

#### Test 3: Field Name Fixes Still Work
1. **Use debug form names** like `activity-details-text-area`
2. **Verify data appears** correctly in review
3. **No field name mismatches**

**Expected Result:** All field name fixes from previous refactoring still work

#### Test 4: Multi-Site Scenarios
1. **Add multiple sites** via manual entry
2. **Verify numbering** (Site 1, Site 2, etc.)
3. **Test editing** from review page
4. **Test deletion** with renumbering

**Expected Result:** Multi-site manual entry works like file upload

### Success Criteria
- [ ] Manual entry journey completes successfully
- [ ] Data structure matches file upload exactly
- [ ] Review page shows all entered data
- [ ] Field name fixes preserved
- [ ] Multi-site functionality works
- [ ] No console errors or broken functionality

### Completion Notes
**Agent:** [Name]

**Test results:**
- [ ] Basic journey: [Pass/Fail]
- [ ] Data structure match: [Pass/Fail]  
- [ ] Field name fixes: [Pass/Fail]
- [ ] Multi-site: [Pass/Fail]

**Issues found:** [List any remaining problems]

**Performance comparison:**
- Before: Manual entry broken
- After: Manual entry works like file upload

---

## Implementation Complete

### Final Status
- [ ] Task 1: File upload pattern analyzed and documented
- [ ] Task 2: Manual entry converted to batch system 
- [ ] Task 3: Unified model complexity removed
- [ ] Task 4: Testing completed successfully

### Benefits Achieved
- ✅ **Manual entry works**: Sites appear on review page
- ✅ **Follows proven pattern**: Uses same architecture as file upload
- ✅ **Reduced complexity**: Removed failed unified model approach
- ✅ **Preserved fixes**: Field name corrections still work
- ✅ **Maintainable**: Simple, understandable code

### Architecture After Implementation

**Both file upload AND manual entry now use the same simple pattern:**

```javascript
// 1. Initialize batch
const batchId = initializeBatch(session, entryMethod);

// 2. Create site data  
const siteData = { name: '...', startDate: {...}, ... };

// 3. Add to batch
addSiteToBatch(session, siteData);

// 4. Review page reads from batch
const sites = getCurrentBatch(session).sites; ✅
```

**Result:** Consistent, working, maintainable system.

---

**Implementation guide created by:** Claude Sonnet 4  
**Date:** 2024-12-19  
**Status:** Ready for implementation

<!-- Generated by Copilot --> 