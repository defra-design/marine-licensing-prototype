# Deferred Clearing Implementation Guide

## Problem Statement

### Issue Description
When users clicked "Change" links on review pages (e.g., "Method of providing site location", "File type", "File uploaded"), the `clearData=true` parameter immediately cleared their batch data on the server side. This caused problems when users used browser navigation controls:

1. User has 4-site file upload batch → Reviews sites
2. User clicks "Change" for method → Data immediately cleared server-side  
3. User uses browser back button → Returns to empty review page
4. Review page shows "No sites have been added yet" instead of their original 4 sites

### Root Cause
The immediate clearing approach (`clearData=true`) committed to data clearing before the user actually made a change, making browser navigation unreliable.

## Solution: Deferred Clearing

### Core Principle
Only clear data when the user **actually submits a different choice**, not when they click "Change" links.

### New User Experience Flow
1. User clicks "Change" → Navigate to change page (data preserved)
2. **Browser back** → Returns to review page with all data intact ✅
3. **Submit same choice** → Returns to review page with data intact ✅  
4. **Submit different choice** → Clears data and starts new journey ✅

## Implementation Steps

### Files to Modify (Per Version)
Each version has these files that need updating:
- `app/views/versions/[VERSION]/exemption/review-site-details.html` (file upload review)
- `app/views/versions/[VERSION]/exemption/manual-entry/review-site-details.html` (manual entry review)  
- `app/routes/versions/[VERSION]/exemption.js` (main routes file)

### Step 1: Update Template Change Links

#### File Upload Review Page
**File:** `review-site-details.html`

**BEFORE:**
```html
<a href="how-do-you-want-to-provide-the-coordinates?returnTo=review-site-details&clearData=true#site-location">
<a href="which-type-of-file?fromreview=true&clearData=true#site-location">  
<a href="upload-file?fromreview=true&clearData=true#site-location">
```

**AFTER:**
```html
<a href="how-do-you-want-to-provide-the-coordinates?returnTo=review-site-details#site-location">
<a href="which-type-of-file?returnTo=review-site-details#site-location">
<a href="upload-file?returnTo=review-site-details#site-location">
```

#### Manual Entry Review Page  
**File:** `manual-entry/review-site-details.html`

**BEFORE:**
```html
<a href="../how-do-you-want-to-provide-the-coordinates?returnTo=review-site-details&clearData=true#site-location">
```

**AFTER:**
```html
<a href="../how-do-you-want-to-provide-the-coordinates?returnTo=review-site-details#site-location">
```

### Step 2: Update GET Route Handlers

Remove immediate clearing logic from GET handlers since data should only clear on POST submission.

#### Coordinate Method Selection
**Route:** `how-do-you-want-to-provide-the-coordinates`

**REMOVE this logic:**
```javascript
// Check if we need to clear data (coming from review page change links)
if (req.query.clearData === 'true') {
    clearDataForFileUploadChange(req.session);
}
```

**UPDATE the tracking logic:**
```javascript
// BEFORE
} else if (!req.query.returnTo && !req.query.camefromcheckanswers && req.query.clearData !== 'true') {

// AFTER  
} else if (!req.query.returnTo && !req.query.camefromcheckanswers) {
```

#### File Type Selection
**Route:** `which-type-of-file`

**REMOVE this logic:**
```javascript
// Check if we need to clear data (coming from review page change links)
if (req.query.clearData === 'true') {
    clearDataForFileTypeChange(req.session);
}
```

**SIMPLIFY the return handling:**
```javascript
// BEFORE
if (req.session.data['fromReviewSiteDetails'] === 'true') {
    // Keep the flag
} else if (req.session.data['returnTo'] === 'review-site-details') {
    req.session.data['fromReviewSiteDetails'] = 'true';
}

// AFTER
if (req.query.returnTo === 'review-site-details') {
    req.session.data['fromReviewSiteDetails'] = 'true';
    updateReviewState(req.session, 'editing');
}
```

#### File Upload
**Route:** `upload-file`

**REMOVE this logic:**
```javascript
// Check if we need to clear data (coming from review page change links)
if (req.query.clearData === 'true') {
    clearDataForFileUploadOnly(req.session);
}
```

**SIMPLIFY the return handling** (same pattern as file type above)

### Step 3: Update POST Route Handlers

Implement smart clearing logic that only clears when user actually changes their choice.

#### Coordinate Method Selection POST
**Route:** `how-do-you-want-to-provide-the-coordinates-router`

**ADD smart clearing logic:**
```javascript
// Determine if user is actually changing method (only clear data if they are)
const currentBatch = getCurrentBatch(req.session);
const currentMethod = currentBatch ? currentBatch.entryMethod : null;
const newMethod = selection === "Upload a file with the coordinates of the site" ? "file-upload" : "manual-entry";

// Only clear data if user is changing to a different method
if (currentMethod && currentMethod !== newMethod) {
    // User is changing methods - clear current batch and start fresh
    if (newMethod === "manual-entry") {
        // Switching to manual entry - clear file upload data and batch
        clearDataForFileUploadChange(req.session);
    } else {
        // Switching to file upload - clear manual entry data and batch
        clearCurrentBatchSafely(req.session);
        clearAllManualEntryData(req.session);
    }
} else if (!currentMethod) {
    // No current method - this is a fresh start, just clear opposing method data
    switch(selection) {
        case "Enter the coordinates of the site manually":
            // Clear any stale file upload data
            delete req.session.data['exemption-which-type-of-file-radios'];
            delete req.session.data['kml-file-upload'];
            req.session.data['manual-multiple-sites'] = '';
            break;
        case "Upload a file with the coordinates of the site":
            // Clear any stale manual entry data
            clearAllManualEntryData(req.session);
            break;
    }
}
// If currentMethod === newMethod, don't clear anything - user is staying with same method

// Check if we're returning to review page
if (req.session.data['fromReviewSiteDetails'] === 'true' && currentMethod === newMethod) {
    // User didn't actually change method - return to review page
    delete req.session.data['fromReviewSiteDetails'];
    res.redirect('review-site-details');
    return;
}
```

#### File Type Selection POST
**Route:** `which-type-of-file-router`

**ADD smart clearing logic:**
```javascript
// Check if user is actually changing file type (only clear data if they are)
const currentBatch = getCurrentBatch(req.session);
const currentFileType = currentBatch && currentBatch.settings ? currentBatch.settings.fileType : null;

// Only clear data if user is changing to a different file type
if (currentFileType && currentFileType !== selection) {
    // User is changing file type - clear current batch and start fresh
    clearDataForFileTypeChange(req.session);
}

// Check if we're returning to review page with no actual change
if (req.session.data['fromReviewSiteDetails'] === 'true' && currentFileType === selection) {
    // User didn't actually change file type - return to review page
    delete req.session.data['fromReviewSiteDetails'];
    res.redirect('review-site-details');
    return;
}
```

#### File Upload POST
**Route:** `upload-file-router`

**ADD smart clearing logic at the beginning:**
```javascript
// Check if we already have a file upload batch (user might be changing file within same file type)
const existingBatch = getCurrentBatch(req.session);
const hasExistingFileUpload = existingBatch && existingBatch.entryMethod === 'file-upload';

let batchId;
if (hasExistingFileUpload && req.session.data['fromReviewSiteDetails'] === 'true') {
    // User is changing the uploaded file but keeping same method - clear existing batch first
    clearDataForFileUploadOnly(req.session);
    batchId = initializeBatch(req.session, 'file-upload');
} else if (!hasExistingFileUpload) {
    // No existing file upload batch - create new one
    batchId = initializeBatch(req.session, 'file-upload');
} else {
    // Keep existing batch
    batchId = existingBatch.id;
}
```

## Testing Checklist

After implementing these changes, test these scenarios:

### File Upload Review (4-site example)
1. ✅ Click "Change" for method → Browser back → Data preserved
2. ✅ Click "Change" for file type → Browser back → Data preserved  
3. ✅ Click "Change" for file uploaded → Browser back → Data preserved
4. ✅ Actually change method → Data cleared and new journey starts
5. ✅ Actually change file type → Data cleared and new journey starts
6. ✅ Actually upload different file → Data cleared and new journey starts
7. ✅ Select same choice as before → Returns to review with data intact

### Manual Entry Review
1. ✅ Click "Change" for method → Browser back → Data preserved
2. ✅ Actually change method → Data cleared and new journey starts
3. ✅ Select same choice as before → Returns to review with data intact

## Key Functions Used

Ensure these batch system functions are available in the routes file:
- `getCurrentBatch(req.session)` - Gets current active batch
- `clearDataForFileUploadChange(req.session)` - Clears file upload batch data
- `clearCurrentBatchSafely(req.session)` - Safely clears current batch 
- `clearAllManualEntryData(req.session)` - Clears manual entry data
- `clearDataForFileTypeChange(req.session)` - Clears data for file type changes
- `clearDataForFileUploadOnly(req.session)` - Clears only file upload data
- `updateReviewState(req.session, action)` - Tracks review page state

## Notes

- This implementation preserves the existing batch system architecture
- Data clearing functions remain unchanged - only the timing of when they're called changes
- Browser navigation now works reliably with all Change links
- User experience is much more forgiving while still maintaining data integrity
- The approach follows the "progressive enhancement" principle - basic functionality works, enhanced with better UX

## Version History

- **Created:** June 2025
- **Applied to:** multiple-sites-v2
- **Next versions to update:** multiple-sites, mvp, mvp-multi-sites, iat, etc.

---