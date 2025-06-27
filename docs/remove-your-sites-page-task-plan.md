# Remove "Your Sites" Page - Implementation Task Plan

## Overview

This document provides a comprehensive task breakdown for removing the "Your sites" page (`site-details-added.html`) from the `multiple-sites-v2` version and implementing a simplified single-batch workflow.

## Background & Rationale

We are simplifying the prototype by:
- **Removing multi-batch support**: Users can no longer have multiple batches of sites
- **Removing the "Your sites" page**: No longer needed without multi-batch functionality  
- **Streamlining navigation**: Direct flow between task list and review pages
- **Simplifying user journey**: Cleaner, more focused workflow

## Current vs. Intended Workflow

### Current Workflow
1. User completes site creation → Review page
2. Review page saves → **Your Sites page** (showing all batches)
3. Task list links to → **Your Sites page** (when sites exist)
4. Cancel from saved state → **Your Sites page**

### Intended Workflow
1. User completes site creation → Review page
2. Review page saves → **Task List page**
3. Task list links to → **Appropriate Review page** (when sites exist)
4. Cancel from saved state → **Task List page** or **Review page**

## Implementation Tasks

---

## Task 1: Remove "Your Sites" Page and Routes

**Status**: ⏳ Not Started  
**Estimated**: 2 hours  
**Dependencies**: None

### Files to Delete
- [ ] `app/views/versions/multiple-sites-v2/exemption/site-details-added.html`

### Routes to Remove from `exemption.js`
- [ ] `GET /' + version + section + 'site-details-added'` (around line 2565)
- [ ] `POST /' + version + section + 'site-details-added-router'` (around line 2576)

### Verification
- [ ] No remaining references to `site-details-added` in codebase
- [ ] Deleted routes return 404 errors

---

## Task 2: Update Task List Navigation Logic

**Status**: ⏳ Not Started  
**Estimated**: 4 hours  
**Dependencies**: Task 1 Complete

### Objective
Modify task list to link directly to appropriate review page when sites exist.

### File: `task-list.html`

**Current Logic** (lines 59-75):
```html
{% if data['exempt-information-3-status'] == "completed" or data['exempt-information-3-status'] == "in-progress" %}
    {% if data['single-site-completed'] %}
        <a href="manual-entry-single-site/review-site-details">
    {% else %}
        <a href="site-details-added.html">  <!-- REMOVE THIS -->
    {% endif %}
{% else %}
    <a href="site-details.html">
{% endif %}
```

**New Logic**:
```html
{% if data['exempt-information-3-status'] == "completed" or data['exempt-information-3-status'] == "in-progress" %}
    {% if data['single-site-completed'] %}
        <a href="manual-entry-single-site/review-site-details">
    {% else %}
        {% if data['lastBatchType'] == 'manual-entry' %}
            <a href="manual-entry/review-site-details?batchId={{ data['lastBatchId'] }}">
        {% else %}
            <a href="review-site-details?batchId={{ data['lastBatchId'] }}">
        {% endif %}
    {% endif %}
{% else %}
    <a href="site-details.html">
{% endif %}
```

### Required Session Data
Both review POST handlers need to store:
```javascript
// Store batch info for task list navigation
const currentBatch = getCurrentBatch(req.session);
if (currentBatch) {
    req.session.data['lastBatchType'] = currentBatch.entryMethod;
    req.session.data['lastBatchId'] = currentBatch.id;
}
```

---

## Task 3: Update Review Page POST Handlers

**Status**: ⏳ Not Started  
**Estimated**: 3 hours  
**Dependencies**: Task 1 Complete

### File Upload Review (`exemption.js` line 2552)

**Current**:
```javascript
if (req.session.data['camefromcheckanswers'] === 'true') {
    res.redirect('check-answers-multiple-sites');
} else {
    res.redirect('site-details-added');  // CHANGE THIS
}
```

**New**:
```javascript
// Store batch info for task list navigation
const currentBatch = getCurrentBatch(req.session);
if (currentBatch) {
    req.session.data['lastBatchType'] = currentBatch.entryMethod;
    req.session.data['lastBatchId'] = currentBatch.id;
}

if (req.session.data['camefromcheckanswers'] === 'true') {
    res.redirect('check-answers-multiple-sites');
} else {
    res.redirect('task-list');
}
```

### Manual Entry Review (`exemption-manual-entry.js` line 2028)

**Current**:
```javascript
if (req.session.data['camefromcheckanswers'] === 'true') {
    res.redirect('../check-answers-multiple-sites');
} else {
    res.redirect('../site-details-added');  // CHANGE THIS
}
```

**New**:
```javascript
// Store batch info for task list navigation
const currentBatch = getCurrentBatch(req.session);
if (currentBatch) {
    req.session.data['lastBatchType'] = currentBatch.entryMethod;
    req.session.data['lastBatchId'] = currentBatch.id;
}

if (req.session.data['camefromcheckanswers'] === 'true') {
    res.redirect('../check-answers-multiple-sites');
} else {
    res.redirect('../task-list');
}
```

---

## Task 4: Update Cancel Functionality

**Status**: ⏳ Not Started  
**Estimated**: 4 hours  
**Dependencies**: Tasks 1-3 Complete

### Main Cancel Handler (`exemption.js` line 2730)

**Current**:
```javascript
case 'review-saved':
    if (origin === 'your-sites') {
        res.redirect('site-details-added');  // REMOVE THIS
    } else if (origin === 'check-answers') {
        res.redirect('check-answers-multiple-sites');
    } else {
        res.redirect('cancel');
    }
    break;
```

**New**:
```javascript
case 'review-saved':
    if (origin === 'check-answers') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('check-answers-multiple-sites');
    } else {
        // For task-list origin or direct access, show warning page
        res.redirect('cancel');
    }
    break;
```

### Cancel Warning Page (`cancel.html`)

**Current**:
```html
{% if data['cancelOrigin'] == 'your-sites' %}
  <a href="site-details-added">Go back to 'Your sites'</a>  <!-- REMOVE -->
{% elif data['cancelOrigin'] == 'check-answers' %}
  <a href="check-answers-multiple-sites">Go back to 'Check answers'</a>
{% else %}
  <a href="review-site-details">Go back to 'Review site details'</a>
{% endif %}
```

**New**:
```html
{% if data['cancelOrigin'] == 'check-answers' %}
  <a href="check-answers-multiple-sites">Go back to 'Check answers'</a>
{% else %}
  <a href="review-site-details">Go back to 'Review site details'</a>
{% endif %}
```

### Origin Tracking Updates

**Remove "your-sites" origin setting**:
- `exemption.js` line 1077: `setOriginContext(req.session, 'your-sites');`
- `exemption-manual-entry.js` line 1825: `setOriginContext(req.session, 'your-sites');`

**Replace with**:
```javascript
setOriginContext(req.session, 'task-list');
```

---

## Task 5: Clean Up Dead File Upload Deletion Code

**Status**: ⏳ Not Started  
**Estimated**: 1 hour  
**Dependencies**: Task 1 Complete

### Context
- **Manual entry deletion works correctly** ✅ (already goes to task list when batch empty)
- **File upload deletion was removed from UI** ✅ (no delete links in file upload review)
- **Backend still has dead code** ❌ (handles file upload deletion scenarios that can't happen)

### Delete Site Router (`exemption.js` lines 1032-1042)

**Current Dead Code**:
```javascript
} else if (returnTo === 'review-site-details' && batchWillBeEmpty) {
    // File upload review with last site deleted - go to Your sites page
    res.redirect('site-details-added');  // DEAD CODE - file upload has no delete links
} else if (returnTo === 'site-details-added') {
    res.redirect('site-details-added');  // DEAD CODE - no longer accessible
}
```

**Clean Up**:
```javascript
// Remove both conditions above - they're unreachable
// Keep existing manual entry logic (already working):
// - returnTo === 'manual-entry-review' && batchWillBeEmpty → task-list ✅
// - returnTo === 'manual-entry-review' → manual-entry/review-site-details ✅
```

### Verification
- [ ] Manual entry deletion still works (delete site → stays on review or goes to task list if empty)
- [ ] No broken deletion links in file upload review (there shouldn't be any)
- [ ] No references to `site-details-added` in deletion logic

---

## Task 6: Remove Legacy Single-Site Conversion

**Status**: ⏳ Not Started  
**Estimated**: 1 hour  
**Dependencies**: Task 1 Complete

### Remove/Update Single-Site Conversion (`exemption.js` line 2912)

**Current**:
```javascript
return res.redirect('site-details-added');
```

**Options**:
1. Remove entirely (recommended - legacy functionality)
2. Change to `res.redirect('task-list');`

---

## Task 7: Update Review Page Content

**Status**: ⏳ Not Started  
**Estimated**: 1 hour  
**Dependencies**: Task 2 Complete

### File Upload Review (`review-site-details.html` line 381)

**Current**:
```html
<p>Select 'Save and continue' to go to 'Your sites', where you can finish or add more sites.</p>
```

**New**:
```html
<p>Select 'Save and continue' to return to the task list.</p>
```

### Manual Entry Review (`manual-entry/review-site-details.html` line 514)

**Remove "Add another site" button**:
```html
<!-- REMOVE THIS ENTIRE SECTION -->
<div class="govuk-!-margin-bottom-4">
    <a href="add-next-site-router" class="govuk-button govuk-button--secondary">
        Add another site
    </a>
</div>
```

---

## Task 8: Comprehensive Testing

**Status**: ⏳ Not Started  
**Estimated**: 4 hours  
**Dependencies**: All Implementation Tasks Complete

### Core User Journeys
- [ ] **File Upload**: Start → Upload → Review → Save → Task List → Re-enter → Review
- [ ] **Manual Entry**: Start → Manual Entry → Review → Save → Task List → Re-enter → Review
- [ ] **Check Answers Flow**: Complete sites → Check answers → Edit sites → Return to check answers

### Cancel Functionality Testing  
- [ ] **Creation State**: Cancel from site creation → Task list, data cleared
- [ ] **Creation-Review State**: Change site details → Cancel → Back to review
- [ ] **Review-Not-Saved**: First time review → Cancel → Warning page
- [ ] **Review-Saved**: Saved review → Cancel → Warning page
- [ ] **Check Answers Origin**: From check answers → Edit → Cancel → Back to check answers

### Edge Cases
- [ ] **Empty Batch**: Delete last site → Task list
- [ ] **Direct URL Access**: Accessing removed URLs returns 404
- [ ] **Browser Back**: Back button after saving works correctly
- [ ] **Session Integrity**: Invalid batch IDs handled gracefully

### All References Removed
- [ ] Search codebase for "site-details-added" - should return no results
- [ ] Search codebase for "your-sites" - should return no results  
- [ ] Search codebase for "Your sites" - should return no results

---

## Implementation Order

### Phase 1: Core Removal (Tasks 1-3)
- Remove the page and core routing
- Update task list navigation
- Update review page redirects

### Phase 2: Cancel & Cleanup (Tasks 4-6)
- Fix cancel functionality
- Clean up dead deletion code
- Remove legacy code

### Phase 3: Polish & Test (Tasks 7-8)
- Update content and UI
- Comprehensive testing

---

## Key Files Modified

### Templates
- `task-list.html` - Navigation logic
- `cancel.html` - Remove your-sites condition
- `review-site-details.html` - Content updates
- `manual-entry/review-site-details.html` - Remove add button

### Routes  
- `exemption.js` - Multiple changes for redirects and cancel
- `exemption-manual-entry.js` - POST handler and origin tracking

### Deleted
- `site-details-added.html` - The entire page

---

## Success Criteria

- [ ] No references to "Your sites" page remain in codebase
- [ ] Users can complete workflows without "Your sites" page
- [ ] Task list correctly links to appropriate review pages
- [ ] Cancel functionality works in all scenarios
- [ ] No broken links or navigation dead ends
- [ ] Session data integrity maintained
- [ ] All tests pass

---

*Document Version: 1.0*  
*Created: 2024-12-19* 