# Cancel Subsequent Site Creation - Implementation Guide

## Overview

This document describes the implementation for handling Cancel during the "Add another site" flow in multi-site journeys. The solution ensures that incomplete sites are removed when a user cancels their creation, while previously completed sites remain intact.

## Problem Statement

### Original Issue
When a user creates multiple sites:
1. Complete site 1 → lands on review page
2. Click "Add another site" → start creating site 2
3. Click Cancel on any page during site 2 creation
4. **Problem**: Cancel showed warning page (legacy behavior) or kept incomplete site 2 on review page

### Expected Behavior
- Cancel during site 2 creation should:
  - Remove incomplete site 2 from the batch
  - Return to review page showing only completed site 1
  - Allow user to add a fresh site 2 if desired

## Solution Design

### Core Mechanism: Tracking Flag

Use a session flag `creatingNewSiteNumber` to track when a new subsequent site is being created:

```javascript
// Set when "Add another site" is clicked
session.data['creatingNewSiteNumber'] = nextGlobalSiteNumber;

// Clear when:
// 1. Site creation completes naturally (reaches review page)
// 2. Review page is saved to task list
// 3. User cancels (after removing incomplete site)
```

### State Detection

The cancel handler uses existing state detection:
- **State: `creation`** - First site being created → clear all and return to task list
- **State: `creation-review`** - Subsequent site OR editing from review → check flag:
  - If `creatingNewSiteNumber` exists → remove incomplete site, return to review
  - If flag doesn't exist → just return to review (regular edit scenario - though not currently used as cancel links hidden on edit pages)
- **State: `review-not-saved`** - User on review page (back button scenario) → clear all and return to task list
- **State: `review-saved`** - Review previously saved → return to task list/check answers

## Implementation Details

### 1. Setting the Flag (Manual Entry)

**File**: `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

**Location**: `add-next-site-router` GET route

```javascript
router.get('/' + version + section + 'manual-entry/add-next-site-router', function (req, res) {
    const nextGlobalSiteNumber = (req.session.data['globalSiteCounter'] || 0) + 1;
    
    // TRACK: Flag that we're creating this new subsequent site
    req.session.data['creatingNewSiteNumber'] = nextGlobalSiteNumber;
    console.log(`🆕 TRACKING: Starting creation of new site ${nextGlobalSiteNumber}`);
    
    // ... rest of route logic
});
```

### 2. Clearing Flag on Natural Completion

**File**: `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

**Locations**: Final pages that redirect to review (site-width POST, enter-multiple-coordinates POST)

```javascript
// Before redirecting to review page normally (not via change link)
if (req.session.data['creatingNewSiteNumber'] === site.globalNumber) {
    console.log(`✅ COMPLETED: Site ${site.globalNumber} creation finished, clearing flag`);
    delete req.session.data['creatingNewSiteNumber'];
}
res.redirect('/' + version + section + 'manual-entry/review-site-details');
```

### 3. Clearing Flag When Review Saved

**File**: `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

**Location**: `review-site-details` POST route

```javascript
router.post('/' + version + section + 'manual-entry/review-site-details-router', function (req, res) {
    // ... existing save logic ...
    
    // Clear the creating new site flag since batch is being saved to task list
    if (req.session.data['creatingNewSiteNumber']) {
        console.log(`✅ SAVED: Clearing creatingNewSiteNumber flag`);
        delete req.session.data['creatingNewSiteNumber'];
    }
    
    // ... rest of route logic
});
```

### 4. Cancel Handler Logic

**File**: `app/routes/versions/multiple-sites-v2/exemption.js`

**Location**: `cancel-site-details` GET route, `creation-review` case

```javascript
case 'creation-review':
    logCancelState(req.session, 'CREATION-REVIEW STATE: Checking if canceling new site creation');
    
    // Check if we're canceling creation of a new subsequent site
    const creatingNewSiteNumber = req.session.data['creatingNewSiteNumber'];
    
    if (creatingNewSiteNumber) {
        // User is canceling creation of a new subsequent site
        console.log(`🗑️ CANCEL: Removing incomplete site ${creatingNewSiteNumber}`);
        
        const currentBatch = getCurrentBatch(req.session);
        if (currentBatch) {
            // Find and remove the incomplete site
            const siteIndex = currentBatch.sites.findIndex(
                s => s.globalNumber === parseInt(creatingNewSiteNumber)
            );
            
            if (siteIndex !== -1) {
                console.log(`🗑️ Found incomplete site at index ${siteIndex}, removing...`);
                currentBatch.sites.splice(siteIndex, 1);
                
                // Decrement global site counter
                if (req.session.data['globalSiteCounter']) {
                    req.session.data['globalSiteCounter']--;
                }
                
                // Rebuild global sites array
                if (req.session.data['siteBatches']) {
                    req.session.data['sites'] = req.session.data['siteBatches']
                        .flatMap(batch => batch.sites);
                }
                
                console.log(`✅ Removed site ${creatingNewSiteNumber}, counter now: ${req.session.data['globalSiteCounter']}`);
            } else {
                console.log(`⚠️ Site ${creatingNewSiteNumber} not found in batch (may not have been added yet)`);
            }
        }
        
        // Clear the flag
        delete req.session.data['creatingNewSiteNumber'];
    }
    
    // Clear editing flag and return to review
    req.session.data['isEditingFromReview'] = false;
    
    // Determine which review page to return to
    const currentBatch = getCurrentBatch(req.session);
    if (currentBatch && currentBatch.entryMethod === 'manual-entry') {
        res.redirect('manual-entry/review-site-details');
    } else {
        res.redirect('review-site-details');
    }
    break;
```

### 5. Review-Not-Saved State Update

**File**: `app/routes/versions/multiple-sites-v2/exemption.js`

**Location**: `cancel-site-details` GET route, `review-not-saved` case

```javascript
case 'review-not-saved':
    // REMOVED: Warning page no longer needed
    // This case occurred when user used back button after reaching review page
    // Now we treat this the same as 'creation' - clear and return to task list
    logCancelState(req.session, 'REVIEW-NOT-SAVED STATE: Treating as creation, clearing batch and returning to task list');
    clearCurrentBatchSafely(req.session);
    req.session.data['reviewPageVisited'] = false;
    req.session.data['reviewPageSaved'] = false;
    req.session.data['isEditingFromReview'] = false;
    res.redirect('task-list');
    break;
```

## Testing Scenarios

### Manual Entry Journey

| Scenario | Expected Behavior | Flag State |
|----------|-------------------|------------|
| Create site 1 → Cancel | Clear all data, return to task list with "Not yet started" | N/A (flag not set for first site) |
| Create site 1 → Review → Add site 2 → Cancel on site name (before submit) | Return to review with only site 1 (site 2 never added) | Flag set but site not in batch |
| Create site 1 → Review → Add site 2 → Submit name → Cancel | Return to review with only site 1 (site 2 removed) | Flag set, site removed |
| Create site 1 → Review → Add site 2 → Complete → Review | Site 2 shown on review page | Flag cleared on completion |
| Create sites 1-3 → Review → Add site 4 → Cancel | Return to review with sites 1-3 (site 4 removed) | Flag set for site 4, removed on cancel |
| Create site 1 → Review → Save to task list | Task shows as completed | Flag cleared on save |
| Create site 1 → Review → Back button → Cancel from previous page | Clear all data, return to task list | reviewPageVisited=true triggers review-not-saved state |

### Edge Cases

| Edge Case | Handling | Notes |
|-----------|----------|-------|
| Cancel before site added to batch | No error - site not found, just clear flag | Logged as warning |
| Multiple cancel/create cycles | Each cycle sets new flag | Previous flags overwritten |
| Browser back after cancel | Normal page flow resumes | No stale flags remain |
| Cancel after completing site but before reaching review | Site kept in batch, flag cleared | Natural completion path |

## File Upload Journey (Future Implementation)

The same pattern should be applied to the file upload journey:

### Files to Update
- `app/routes/versions/multiple-sites-v2/exemption.js` (cancel handler already updated)
- Set flag when adding sites via file upload flow
- Clear flag when file upload batch completes or saves

### Key Differences
- File upload may create multiple sites at once
- May need to track an array of site numbers being created
- Or use batch-level flag instead of site-specific

## Sample Plans Journey (Future Implementation)

Similar pattern for Sample Plans disposal sites:

### Files to Update
- `app/routes/versions/multiple-sites-v2/sample-plans-v2-disposal-site-locations.js`
- Set flag in "Add another disposal site" route
- Clear flag on completion/save
- Use same cancel handler logic (may need route updates)

## Benefits

✅ **Clean user experience** - Incomplete sites don't clutter the review page  
✅ **No data loss** - Previously completed sites remain intact  
✅ **Simple implementation** - Single flag tracks the state  
✅ **No renumbering issues** - Only removes the last site being created  
✅ **Extensible** - Same pattern works for file upload and sample plans  
✅ **Legacy warning page removed** - Simplified cancel flow  

## Maintenance Notes

### When Adding New Site Creation Routes
1. Set `creatingNewSiteNumber` flag when starting site creation
2. Clear flag when site naturally completes to review
3. Clear flag when review is saved
4. Cancel handler automatically handles removal

### When Debugging Cancel Issues
Check console logs for these markers:
- `🆕 TRACKING:` - Flag being set
- `✅ COMPLETED:` - Flag being cleared (natural completion)
- `✅ SAVED:` - Flag being cleared (review saved)
- `🗑️ CANCEL:` - Site being removed on cancel
- `⚠️` - Edge case warnings

### Session Data to Monitor
```javascript
session.data['creatingNewSiteNumber']  // Site being created (if any)
session.data['globalSiteCounter']      // Total sites created
session.data['reviewPageVisited']      // Has user reached review page
session.data['isEditingFromReview']    // Is user editing from review (change link or subsequent site)
```

## Related Documentation

- [Cancel Functionality Implementation Guide](cancel-functionality-implementation-guide.md)
- [Deferred Clearing Implementation Guide](deferred-clearing-implementation-guide.md)
- [Manual Entry Change Links Implementation](manual-entry-change-links-implementation.md)

---

**Implementation Date**: October 2, 2025  
**Journey**: Exemption Multiple Sites V2  
**Status**: ✅ Implemented for Manual Entry Journey


