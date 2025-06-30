# Method Switch Data Preservation Implementation Guide

## Overview

This implementation adds a backup/restore system specifically for method switching scenarios, working alongside the existing cancel functionality system without interfering with it.

## Problem Statement

**Current Flow (Problematic)**:
1. User completes manual entry → review page
2. User clicks "Change method" → coordinate method page  
3. User selects "Upload file" → **IMMEDIATE CLEARING** of manual entry batch
4. User goes through file upload flow → cancels
5. Cancel system works correctly but returns to empty manual entry review

**Target Flow (Fixed)**:
1. User completes manual entry → review page
2. User clicks "Change method" → coordinate method page
3. User selects "Upload file" → **BACKUP** manual entry batch, then clear
4. User goes through file upload flow → cancels  
5. Cancel system **RESTORES** backup and returns to populated manual entry review

## Implementation Tasks

---

## Task 1: Method Switch Backup System

**Status**: ⏳ Not Started  
**Estimated**: 3 hours  
**Dependencies**: Existing cancel system (Tasks 1-4 complete)

### Objective
Create backup/restore functions that work alongside existing cancel system without interference.

### Implementation Steps

#### Step 1.1: Add Backup Functions

Add these functions to `exemption.js` after the existing batch functions (around line 1450):

```javascript
/**
 * Creates a backup of current batch and session data before method switching
 * @param {Object} session - Express session object
 * @param {String} reason - Reason for backup (for debugging)
 */
function createMethodSwitchBackup(session, reason) {
    const currentBatch = getCurrentBatch(session);
    if (!currentBatch) {
        console.log(`🔄 METHOD SWITCH: No current batch to backup for ${reason}`);
        return;
    }
    
    console.log(`🔄 METHOD SWITCH: Creating backup for ${reason}, batch ${currentBatch.id}`);
    
    // Create deep copy backup
    session.data['methodSwitchBackup'] = {
        reason: reason,
        timestamp: Date.now(),
        originalMethod: currentBatch.entryMethod,
        batch: JSON.parse(JSON.stringify(currentBatch)), // Deep copy
        sessionData: captureMethodSessionData(session, currentBatch.entryMethod),
        originalReviewState: {
            reviewPageVisited: session.data['reviewPageVisited'],
            reviewPageSaved: session.data['reviewPageSaved'],
            isEditingFromReview: session.data['isEditingFromReview'],
            cancelOrigin: session.data['cancelOrigin']
        }
    };
    
    console.log(`✅ METHOD SWITCH: Backup created for ${currentBatch.entryMethod} method`);
}

/**
 * Captures session data specific to a method for backup
 * @param {Object} session - Express session object  
 * @param {String} method - 'manual-entry' or 'file-upload'
 * @returns {Object} - Captured session data
 */
function captureMethodSessionData(session, method) {
    const captured = {};
    
    if (method === 'manual-entry') {
        // Capture manual entry session data
        const manualKeys = [
            'manual-multiple-sites',
            'manual-same-activity-dates', 
            'manual-same-activity-description',
            'manual-start-date-date-input-day',
            'manual-start-date-date-input-month', 
            'manual-start-date-date-input-year',
            'manual-end-date-date-input-day',
            'manual-end-date-date-input-month',
            'manual-end-date-date-input-year',
            'manual-activity-details-text-area'
        ];
        
        manualKeys.forEach(key => {
            if (session.data[key] !== undefined) {
                captured[key] = session.data[key];
            }
        });
    } else if (method === 'file-upload') {
        // Capture file upload session data
        const fileKeys = [
            'exemption-which-type-of-file-radios',
            'hasUploadedFile',
            'exemption-same-activity-dates-for-sites',
            'exemption-same-activity-description-for-sites', 
            'exemption-start-date-date-input-day',
            'exemption-start-date-date-input-month',
            'exemption-start-date-date-input-year',
            'exemption-end-date-date-input-day',
            'exemption-end-date-date-input-month', 
            'exemption-end-date-date-input-year',
            'exemption-activity-details-text-area'
        ];
        
        fileKeys.forEach(key => {
            if (session.data[key] !== undefined) {
                captured[key] = session.data[key];
            }
        });
    }
    
    return captured;
}

/**
 * Restores backed up method data and returns user to original review page
 * @param {Object} session - Express session object
 * @returns {String|null} - Redirect URL or null if no backup
 */
function restoreMethodSwitchBackup(session) {
    const backup = session.data['methodSwitchBackup'];
    if (!backup) {
        console.log('🔄 METHOD SWITCH: No backup found to restore');
        return null;
    }
    
    console.log(`🔄 METHOD SWITCH: Restoring backup for ${backup.originalMethod} method`);
    
    // Restore the batch to siteBatches array
    if (!Array.isArray(session.data['siteBatches'])) {
        session.data['siteBatches'] = [];
    }
    
    // Add restored batch back
    session.data['siteBatches'].push(backup.batch);
    session.data['currentBatchId'] = backup.batch.id;
    
    // Restore method-specific session data
    Object.keys(backup.sessionData).forEach(key => {
        session.data[key] = backup.sessionData[key];
    });
    
    // Restore review state
    session.data['reviewPageVisited'] = backup.originalReviewState.reviewPageVisited;
    session.data['reviewPageSaved'] = backup.originalReviewState.reviewPageSaved;
    session.data['isEditingFromReview'] = backup.originalReviewState.isEditingFromReview;
    session.data['cancelOrigin'] = backup.originalReviewState.cancelOrigin;
    
    // Rebuild global sites array
    session.data['sites'] = session.data['siteBatches'].flatMap(batch => batch.sites);
    
    // Determine redirect URL based on original method
    let redirectUrl;
    if (backup.originalMethod === 'manual-entry') {
        redirectUrl = 'manual-entry/review-site-details';
    } else {
        redirectUrl = 'review-site-details';
    }
    
    console.log(`✅ METHOD SWITCH: Restored ${backup.originalMethod} method, redirecting to ${redirectUrl}`);
    
    // Clear backup after successful restore
    delete session.data['methodSwitchBackup'];
    
    return redirectUrl;
}

/**
 * Clears method switch backup when user commits to new method
 * @param {Object} session - Express session object
 */
function clearMethodSwitchBackup(session) {
    if (session.data['methodSwitchBackup']) {
        const backup = session.data['methodSwitchBackup'];
        console.log(`🗑️ METHOD SWITCH: Clearing backup for ${backup.originalMethod} (user committed to new method)`);
        delete session.data['methodSwitchBackup'];
    }
}

/**
 * Checks if there's a method switch backup available
 * @param {Object} session - Express session object
 * @returns {Boolean}
 */
function hasMethodSwitchBackup(session) {
    return !!session.data['methodSwitchBackup'];
}
```

#### Step 1.2: Update Method Switch Logic

Modify the coordinate method router (around line 1245) to create backup instead of immediate clearing:

```javascript
// Only clear data if user is changing to a different method
if (currentMethod && currentMethod !== newMethod) {
    // Create backup before clearing
    createMethodSwitchBackup(req.session, `switching from ${currentMethod} to ${newMethod}`);
    
    // User is changing methods - clear current batch and start fresh
    if (newMethod === "manual-entry") {
        // Switching to manual entry - clear file upload data and batch
        clearDataForFileUploadChange(req.session);
    } else {
        // Switching to file upload - clear manual entry data and batch
        clearCurrentBatchSafely(req.session);
        clearAllManualEntryData(req.session);
    }
} 
// ... rest of existing logic unchanged
```

### Acceptance Criteria
- [ ] Backup functions added without breaking existing functionality
- [ ] Method switch creates backup before clearing
- [ ] Backup includes batch data and session data
- [ ] Deep copy prevents reference issues
- [ ] Logging helps with debugging

### Agent Notes
```
[Agent] - [Date]:
[Implementation progress, issues encountered, testing results]
```

---

## Task 2: Cancel System Integration

**Status**: ⏳ Not Started  
**Estimated**: 2 hours  
**Dependencies**: Task 1 Complete

### Objective
Integrate backup restoration with existing cancel system without interfering with current logic.

### Implementation Steps

#### Step 2.1: Enhance Cancel Route Handler

Modify the existing `cancel-site-details` route (around line 2634) to check for method switch backup:

```javascript
router.get('/' + version + section + 'cancel-site-details', function (req, res) {
    const userState = determineUserState(req.session);
    const origin = determineOrigin(req.session);
    
    logCancelState(req.session, 'cancel-site-details entry - userState: ' + userState + ', origin: ' + origin);
    
    // NEW: Check for method switch backup first
    if (hasMethodSwitchBackup(req.session)) {
        console.log('🔄 METHOD SWITCH: Backup detected during cancel, attempting restore');
        const redirectUrl = restoreMethodSwitchBackup(req.session);
        if (redirectUrl) {
            console.log(`🔄 METHOD SWITCH: Redirecting to restored method at ${redirectUrl}`);
            return res.redirect(redirectUrl);
        }
    }
    
    // EXISTING: Original cancel logic unchanged
    switch(userState) {
        case 'creation':
            // State 1: Creation pages - clear current batch and return to task list
            logCancelState(req.session, 'CREATION STATE: Clearing current batch and returning to task list');
            clearCurrentBatchSafely(req.session);
            // Clear state tracking variables for fresh start
            req.session.data['reviewPageVisited'] = false;
            req.session.data['reviewPageSaved'] = false;
            req.session.data['isEditingFromReview'] = false;
            res.redirect('task-list');
            break;
            
        case 'creation-review':
            // State 2: Creation review pages - return to review page without clearing data
            logCancelState(req.session, 'CREATION-REVIEW STATE: Returning to review page without clearing data');
            // Clear editing flag to indicate user is back on review page
            req.session.data['isEditingFromReview'] = false;
            
            // Determine which review page to return to based on current batch type
            const currentBatch = getCurrentBatch(req.session);
            if (currentBatch && currentBatch.entryMethod === 'manual-entry') {
                res.redirect('manual-entry/review-site-details');
            } else {
                res.redirect('review-site-details');
            }
            break;
            
        case 'review-not-saved':
            // State 3: Review page not saved - show cancel warning page
            logCancelState(req.session, 'REVIEW-NOT-SAVED STATE: Showing cancel warning page');
            res.redirect('cancel');
            break;
            
        case 'review-saved':
            // State 4: Review page saved - route based on origin (no warning needed since data is already saved)
            logCancelState(req.session, 'REVIEW-SAVED STATE: Routing based on origin: ' + origin);
            
            if (origin === 'check-answers') {
                // Return to Check Answers page
                // Clear the navigation flag
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers-multiple-sites');
            } else {
                // For task-list origin, return to task list (no warning needed - data already saved)
                res.redirect('task-list');
            }
            break;
            
        default:
            // Error handling - fallback to warning page
            logCancelState(req.session, 'ERROR: Unknown user state, falling back to warning page');
            console.error('Unknown user state in cancel-site-details:', userState);
            res.redirect('cancel');
            break;
    }
});
```

#### Step 2.2: Update Cancel Confirmation

Modify the cancel confirmation route to also clear backups:

```javascript
router.post('/' + version + section + 'cancel-confirmed', function (req, res) {
    logCancelState(req.session, 'cancel-confirmed - user confirmed cancellation');
    
    // Clear any method switch backup (user explicitly confirmed cancellation)
    clearMethodSwitchBackup(req.session);
    
    // Clear the current batch safely with enhanced error handling
    clearCurrentBatchSafely(req.session);
    
    // Clear cancel-related state tracking for fresh start
    delete req.session.data['cancelOrigin'];
    req.session.data['reviewPageVisited'] = false;
    req.session.data['reviewPageSaved'] = false;
    req.session.data['isEditingFromReview'] = false;
    
    // Clear any legacy navigation flags
    delete req.session.data['fromReviewSiteDetails'];
    delete req.session.data['camefromcheckanswers'];
    
    logCancelState(req.session, 'cancel-confirmed - redirecting to task-list');
    res.redirect('task-list');
});
```

### Acceptance Criteria
- [ ] Cancel system checks for backup before standard logic
- [ ] Backup restoration works seamlessly with existing states
- [ ] Cancel confirmation clears backups appropriately  
- [ ] No interference with existing cancel behavior
- [ ] Proper logging for debugging

### Agent Notes
```
[Agent] - [Date]:
[Implementation progress, issues encountered, testing results]
```

---

## Task 3: Backup Cleanup and Edge Cases

**Status**: ⏳ Not Started  
**Estimated**: 2 hours  
**Dependencies**: Task 2 Complete

### Objective
Handle edge cases and ensure proper backup cleanup in all scenarios.

### Implementation Steps

#### Step 3.1: Review Page Backup Cleanup

Add backup cleanup when user successfully saves new method:

**File Upload Review POST** (around line 2198):
```javascript
router.post('/' + version + section + 'review-site-details-router', function (req, res) {
    // Clear any method switch backup - user is committing to file upload method
    clearMethodSwitchBackup(req.session);
    
    // ... existing logic unchanged
});
```

**Manual Entry Review POST** (exemption-manual-entry.js around line 1520):
```javascript
router.post('/' + version + section + 'manual-entry/review-site-details-router', function (req, res) {
    // Clear any method switch backup - user is committing to manual entry method
    clearMethodSwitchBackup(req.session);
    
    // ... existing logic unchanged
});
```

#### Step 3.2: Edge Case Handling

Add edge case handling to backup functions:

```javascript
/**
 * Validates and cleans up stale method switch backups
 * @param {Object} session - Express session object
 */
function validateMethodSwitchBackup(session) {
    const backup = session.data['methodSwitchBackup'];
    if (!backup) return;
    
    // Check if backup is stale (older than 1 hour)
    const oneHour = 60 * 60 * 1000;
    if (Date.now() - backup.timestamp > oneHour) {
        console.log('🗑️ METHOD SWITCH: Clearing stale backup (older than 1 hour)');
        delete session.data['methodSwitchBackup'];
        return;
    }
    
    // Check if backup batch ID conflicts with current batches
    if (session.data['siteBatches']) {
        const conflictingBatch = session.data['siteBatches'].find(batch => batch.id === backup.batch.id);
        if (conflictingBatch) {
            console.log('🗑️ METHOD SWITCH: Clearing backup due to ID conflict');
            delete session.data['methodSwitchBackup'];
        }
    }
}

/**
 * Safe restore function with error recovery
 * @param {Object} session - Express session object
 * @returns {String|null} - Redirect URL or null if restore failed
 */
function safeRestoreMethodSwitchBackup(session) {
    try {
        return restoreMethodSwitchBackup(session);
    } catch (error) {
        console.error('🚨 METHOD SWITCH: Error restoring backup:', error);
        // Clear corrupted backup
        delete session.data['methodSwitchBackup'];
        // Fall back to standard cancel behavior
        return null;
    }
}
```

Call validation function at strategic points:
- Beginning of coordinate method router
- Beginning of cancel route handler
- Beginning of review page handlers

Use `safeRestoreMethodSwitchBackup` in the cancel route instead of direct restore.

#### Step 3.3: Session Variable Cleanup

Add comprehensive session cleanup to prevent conflicts:

```javascript
/**
 * Cleans up method-specific session variables when switching methods
 * @param {Object} session - Express session object
 * @param {String} methodToKeep - 'manual-entry' or 'file-upload' or 'both' or 'none'
 */
function cleanupMethodSessionData(session, methodToKeep) {
    const manualKeys = [
        'manual-multiple-sites',
        'manual-same-activity-dates', 
        'manual-same-activity-description',
        'manual-start-date-date-input-day',
        'manual-start-date-date-input-month', 
        'manual-start-date-date-input-year',
        'manual-end-date-date-input-day',
        'manual-end-date-date-input-month',
        'manual-end-date-date-input-year',
        'manual-activity-details-text-area'
    ];
    
    const fileKeys = [
        'exemption-which-type-of-file-radios',
        'hasUploadedFile',
        'exemption-same-activity-dates-for-sites',
        'exemption-same-activity-description-for-sites', 
        'exemption-start-date-date-input-day',
        'exemption-start-date-date-input-month',
        'exemption-start-date-date-input-year',
        'exemption-end-date-date-input-day',
        'exemption-end-date-date-input-month', 
        'exemption-end-date-date-input-year',
        'exemption-activity-details-text-area'
    ];
    
    if (methodToKeep !== 'manual-entry' && methodToKeep !== 'both') {
        manualKeys.forEach(key => delete session.data[key]);
    }
    
    if (methodToKeep !== 'file-upload' && methodToKeep !== 'both') {
        fileKeys.forEach(key => delete session.data[key]);
    }
}
```

### Acceptance Criteria
- [ ] Backup cleanup on successful save
- [ ] Stale backup detection and cleanup
- [ ] Error recovery for corrupted backups
- [ ] ID conflict resolution
- [ ] Proper error logging
- [ ] Session variable conflict resolution

### Agent Notes
```
[Agent] - [Date]:
[Implementation progress, issues encountered, testing results]
```

---

## Integration with Existing System

### Preserves All Existing Cancel Functionality
- **Uses existing state detection**: Works with `determineUserState()` and `determineOrigin()`
- **Maintains existing logic**: Backup check happens BEFORE standard cancel logic
- **No template changes**: Works with existing cancel links and routes
- **Preserves batch system**: Uses existing `getCurrentBatch()`, `clearCurrentBatchSafely()`, etc.

### Key Design Principles
1. **Non-Invasive**: Backup only triggers on actual method switching
2. **Fail-Safe**: Corrupted backups fall back to standard cancel behavior  
3. **Temporary**: Backups are short-lived and cleaned up automatically
4. **Isolated**: Backup system doesn't interfere with normal flows

### Session Data Management
```javascript
// New backup structure (temporary)
session.data['methodSwitchBackup'] = {
    reason: string,           // For debugging
    timestamp: number,        // For stale cleanup
    originalMethod: string,   // 'manual-entry' or 'file-upload'
    batch: object,           // Deep copy of original batch
    sessionData: object,     // Method-specific session variables
    originalReviewState: {   // Cancel system state preservation
        reviewPageVisited: boolean,
        reviewPageSaved: boolean,
        isEditingFromReview: boolean,
        cancelOrigin: string
    }
};
```

### Debugging Support
- Comprehensive logging with `🔄 METHOD SWITCH:` prefix
- Backup reason tracking for debugging
- Timestamp tracking for stale backup detection
- Error logging for troubleshooting
- Integration with existing `logCancelState()` function

### File Locations
- **Main Implementation**: `app/routes/versions/multiple-sites-v2/exemption.js`
- **Manual Entry Integration**: `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`
- **No Template Changes**: All templates continue to work as-is

---

## Progress Tracking

| Task | Status | Agent | Start Date | End Date | Notes |
|------|--------|-------|------------|----------|-------|
| Task 1: Backup System | ⏳ Not Started | | | | |
| Task 2: Cancel Integration | ⏳ Not Started | | | | |  
| Task 3: Cleanup & Edge Cases | ⏳ Not Started | | | | |
| Task 4: Testing | ⏳ Not Started | | | | |

### Agent Handover Notes
```
[Current Agent] - [Date]:
[Progress summary, current state, issues to watch for, recommendations for next agent]

[Next Agent] - [Date]:
[Continuing from where previous agent left off, new findings, implementation decisions]
```

---

*Generated by: Claude Sonnet 4*  
*Document Version: 1.0*  
*Created: 2024-12-19*  
*Purpose: Solve method switching data loss while preserving existing cancel functionality* 