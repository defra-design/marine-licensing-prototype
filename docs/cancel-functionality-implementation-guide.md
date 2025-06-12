# Cancel Functionality Implementation Guide

## Overview

This document provides a comprehensive task breakdown for implementing consistent cancel link behavior across all pages in the Multiple Sites v2 exemption flow. The implementation must account for the complex batch system, dual entry methods, and various navigation contexts.

## Background Context

### System Complexity Factors
- **Dual Architecture**: Manual entry vs file upload use different data patterns
- **Batch System**: Multiple batches can exist simultaneously 
- **Session State Management**: Multiple session flags can conflict
- **Template Scale**: 15+ manual entry templates, 10+ file upload templates
- **Navigation Context**: Users can arrive from Task List, Your Sites, Check Answers
- **Site Count Variations**: Single vs multiple sites have different behaviors
- **GET/POST Considerations**: Cancel links appear on both form pages and review pages

### Current Problems
1. **Inconsistent behavior**: Same cancel link behaves differently depending on context
2. **Data integrity issues**: Risk of clearing wrong batches or corrupting data
3. **Navigation confusion**: Users don't return to expected pages
4. **Session flag conflicts**: Multiple flags can be set simultaneously causing unexpected routing

## Desired Cancel Behavior Definitions

### State 1: Creation Pages  
**Definition**: Journey pages before review page has been visited
**Behavior**: Return to task list, clear all batch data
**Examples**: site-name, activity-dates, coordinates pages on first visit

### State 2: Creation Review Pages
**Definition**: Review page reached but not saved, user went back via change links
**Behavior**: Return to review page  
**Examples**: Editing site name after reaching review but before saving

### State 3: Review Page Not Saved
**Definition**: Review page displayed but not yet saved
**Behavior**: Show cancel warning page (`cancel.html`) with options to continue or return to review
**Examples**: First time on review-site-details page

### State 4: Review Page Saved  
**Definition**: Review page previously saved, user returned for editing
**Behavior**: Based on origin - Your Sites → Your Sites, Check Answers → Check Answers, other → Cancel warning (`cancel.html`)
**Examples**: Editing saved batch from Your Sites page

## Implementation Tasks

---

## Task 1: System Analysis & State Detection Design

**Status**: ⏳ Not Started  
**Assigned**: [Agent Name]  
**Estimated**: 4 hours  
**Dependencies**: None

### Objectives
1. Document current cancel route usage across all templates
2. Design reliable state detection mechanism
3. Create comprehensive test scenarios
4. Define required session variables

### Detailed Steps

#### Step 1.1: Template Audit
Create a spreadsheet documenting:

**Manual Entry Templates** (app/views/versions/multiple-sites-v2/exemption/manual-entry/):
- [ ] does-your-project-involve-more-than-one-site.html
- [ ] site-name.html  
- [ ] same-activity-dates.html
- [ ] activity-dates.html
- [ ] individual-site-activity-dates.html
- [ ] same-activity-description.html
- [ ] activity-description.html
- [ ] individual-site-activity-description.html
- [ ] how-do-you-want-to-enter-the-coordinates.html
- [ ] which-coordinate-system.html
- [ ] enter-coordinates.html
- [ ] enter-multiple-coordinates.html
- [ ] site-width.html
- [ ] review-site-details.html

**File Upload Templates** (app/views/versions/multiple-sites-v2/exemption/):
- [ ] how-do-you-want-to-provide-the-coordinates.html
- [ ] which-type-of-file.html
- [ ] upload-file.html
- [ ] same-activity-dates.html
- [ ] same-activity-description.html
- [ ] activity-dates.html
- [ ] activity-details.html
- [ ] site-name.html
- [ ] site-activity-dates.html
- [ ] site-activity-description.html
- [ ] review-site-details.html

**For each template document**:
- Current cancel link href
- Template context (creation/review/edit)
- Entry method (manual/file)
- GET vs POST considerations

#### Step 1.2: Current Route Analysis
Document existing cancel routes in exemption.js:

```javascript
// Current routes to analyze:
router.get('/' + version + section + 'cancel-site-details')
router.get('/' + version + section + 'cancel-to-review') 
router.get('/' + version + section + 'cancel-from-review-site-details')
router.get('/' + version + section + 'cancel')
router.post('/' + version + section + 'cancel-confirmed')
```

**Analysis required**:
- [ ] Current logic flow for each route
- [ ] Session flags checked
- [ ] Data clearing behavior  
- [ ] Redirect destinations
- [ ] Edge cases and failure modes

#### Step 1.3: State Detection Design

**Required Session Variables**:
```javascript
// Origin tracking
req.session.data['cancelOrigin'] = 'task-list' | 'your-sites' | 'check-answers' | 'direct'

// Review state tracking  
req.session.data['reviewPageVisited'] = true/false
req.session.data['reviewPageSaved'] = true/false

// Context tracking
req.session.data['isEditingFromReview'] = true/false
req.session.data['currentEditContext'] = 'creation' | 'review-edit' | 'saved-edit'
```

**State Detection Logic**:
```javascript
function determineUserState(session) {
    // Return: 'creation' | 'creation-review' | 'review-not-saved' | 'review-saved'
}

function determineOrigin(session) {
    // Return: 'task-list' | 'your-sites' | 'check-answers' | 'direct'  
}
```

#### Step 1.4: Test Scenario Matrix

Create test matrix covering:
- 4 states × 2 entry methods × 3 origins = 24 scenarios
- Single vs multiple site considerations
- Batch system edge cases
- Session flag conflict scenarios

### Acceptance Criteria
- [ ] Complete template audit spreadsheet created
- [ ] Current route behavior fully documented
- [ ] State detection mechanism designed
- [ ] Test scenario matrix completed
- [ ] Design review completed by senior developer

### Agent Notes Section
```
[Agent Name] - [Date]:
[Comments, issues found, recommendations for next agent]

[Next Agent Name] - [Date]:  
[Response to previous comments, additional findings]
```

---

## Task 2: Context Detection System Implementation

**Status**: ⏳ Not Started  
**Assigned**: [Agent Name]  
**Estimated**: 6 hours  
**Dependencies**: Task 1 Complete

### Objectives
1. Implement state detection helper functions
2. Add origin tracking to entry points
3. Create session state management utilities
4. Add comprehensive logging for debugging

### Detailed Steps

#### Step 2.1: Helper Function Implementation

**File**: `app/routes/versions/multiple-sites-v2/exemption.js`

```javascript
// Add these functions after existing batch functions (around line 1400)

/**
 * Determines the current user state for cancel behavior
 * @param {Object} session - Express session object
 * @returns {String} - 'creation' | 'creation-review' | 'review-not-saved' | 'review-saved'
 */
function determineUserState(session) {
    // Implementation needed
}

/**
 * Determines where the user originally came from
 * @param {Object} session - Express session object  
 * @returns {String} - 'task-list' | 'your-sites' | 'check-answers' | 'direct'
 */
function determineOrigin(session) {
    // Implementation needed
}

/**
 * Sets the origin context when user enters the flow
 * @param {Object} session - Express session object
 * @param {String} origin - Origin identifier
 */
function setOriginContext(session, origin) {
    // Implementation needed
}

/**
 * Tracks review page state changes
 * @param {Object} session - Express session object
 * @param {String} action - 'visited' | 'saved' | 'editing'
 */
function updateReviewState(session, action) {
    // Implementation needed
}

/**
 * Comprehensive state logging for debugging
 * @param {Object} session - Express session object
 * @param {String} context - Current page/action context
 */
function logCancelState(session, context) {
    // Implementation needed
}
```

#### Step 2.2: Entry Point Origin Tracking

**Routes to modify**:
```javascript
// Task list entry
router.get('/' + version + section + 'site-details', function (req, res) {
    setOriginContext(req.session, 'task-list');
    // ... existing code
});

// Your sites entry  
router.get('/' + version + section + 'review-site-details', function (req, res) {
    if (req.query.batchId) {
        setOriginContext(req.session, 'your-sites');
    }
    // ... existing code
});

// Check answers entry
router.get('/' + version + section + 'review-site-details', function (req, res) {
    if (req.query.camefromcheckanswers === 'true') {
        setOriginContext(req.session, 'check-answers');
    }
    // ... existing code  
});
```

#### Step 2.3: Review State Tracking

**Routes to modify**:
```javascript
// Review page GET
router.get('/' + version + section + 'review-site-details', function (req, res) {
    updateReviewState(req.session, 'visited');
    // ... existing code
});

// Review page POST  
router.post('/' + version + section + 'review-site-details-router', function (req, res) {
    updateReviewState(req.session, 'saved');
    // ... existing code
});

// Change links from review
router.get('/' + version + section + 'site-name', function (req, res) {
    if (req.query.returnTo === 'review-site-details') {
        updateReviewState(req.session, 'editing');
    }
    // ... existing code
});
```

#### Step 2.4: Manual Entry Specific Implementation

**File**: `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

```javascript
// Add parallel functions for manual entry routes
// Ensure consistency with main exemption.js implementation
```

### Critical Batch System Considerations

#### Batch Data Integrity
- [ ] Ensure state detection doesn't interfere with batch operations
- [ ] Verify currentBatchId handling during state changes  
- [ ] Test multi-batch scenarios with different states per batch
- [ ] Validate site renumbering doesn't break state tracking

#### Session Data Conflicts
- [ ] Check for conflicts with existing session flags
- [ ] Ensure backward compatibility with current flow
- [ ] Test edge case where multiple flags are set simultaneously
- [ ] Verify cleanup of obsolete session variables

### Testing Requirements

#### Unit Tests
- [ ] Test each helper function in isolation
- [ ] Test state transitions between all combinations
- [ ] Test origin tracking accuracy
- [ ] Test session cleanup behavior

#### Integration Tests  
- [ ] Test full user journeys for each state
- [ ] Test batch system integration
- [ ] Test manual entry vs file upload consistency
- [ ] Test edge cases and error conditions

### Acceptance Criteria
- [ ] All helper functions implemented and tested
- [ ] Origin tracking working on all entry points  
- [ ] Review state tracking accurate across all scenarios
- [ ] No batch system regressions introduced
- [ ] Manual entry implementation consistent with file upload
- [ ] Comprehensive logging in place
- [ ] All tests passing

### Agent Notes Section
```
[Agent Name] - [Date]:
[Implementation notes, challenges encountered, testing results]

[Next Agent Name] - [Date]:
[Code review feedback, integration test results]
```

---

## Task 3: Cancel Route Logic Implementation

**Status**: ⏳ Not Started  
**Assigned**: [Agent Name]  
**Estimated**: 8 hours  
**Dependencies**: Task 2 Complete

### Objectives
1. Rewrite cancel route handlers using new state detection
2. Implement proper data clearing for each scenario
3. Add batch-aware data management
4. Create comprehensive error handling

### Detailed Steps

#### Step 3.1: Main Cancel Route Rewrite

**File**: `app/routes/versions/multiple-sites-v2/exemption.js`

Replace existing `cancel-site-details` handler:

```javascript
router.get('/' + version + section + 'cancel-site-details', function (req, res) {
    const userState = determineUserState(req.session);
    const origin = determineOrigin(req.session);
    
    logCancelState(req.session, 'cancel-site-details entry');
    
    switch(userState) {
        case 'creation':
            // Clear current batch and return to task list
            break;
            
        case 'creation-review':
            // Return to review page without clearing data
            break;
            
        case 'review-not-saved':
            // Show cancel warning page
            break;
            
        case 'review-saved':
            // Route based on origin
            break;
            
        default:
            // Error handling
            break;
    }
});
```

#### Step 3.2: Specialized Cancel Handlers

**New route structure**:
```javascript
// Creation pages cancel
router.get('/' + version + section + 'cancel-creation', function (req, res) {
    // Clear current batch only, preserve other batches
    // Return to task list
});

// Creation review cancel  
router.get('/' + version + section + 'cancel-creation-review', function (req, res) {
    // Return to review page without data changes
});

// Review page cancel
router.get('/' + version + section + 'cancel-review', function (req, res) {
    // Show cancel warning page (cancel.html) 
});

// Saved review cancel
router.get('/' + version + section + 'cancel-saved', function (req, res) {
    // Route based on origin OR show cancel warning page (cancel.html)
});
```

#### Step 3.3: Cancel Warning Page Integration

**Current cancel.html template** (`app/views/versions/multiple-sites-v2/exemption/cancel.html`):
- Shows "Are you sure you want to cancel without saving?" message
- Provides "Yes, cancel without saving" button → routes to `cancel-confirmed`
- Provides "Go back to 'Review site details'" link → currently uses `javascript:window.history.back()`

**Required updates to cancel.html**:
```html
<!-- Current back link (needs update): -->
<a class="govuk-link govuk-link--no-visited-state" href="javascript:window.history.back()">

<!-- New context-aware back link: -->
{% if data['cancelOrigin'] == 'your-sites' %}
  <a class="govuk-link govuk-link--no-visited-state" href="site-details-added">Go back to 'Your sites'</a>
{% elif data['cancelOrigin'] == 'check-answers' %}
  <a class="govuk-link govuk-link--no-visited-state" href="check-answers-multiple-sites">Go back to 'Check answers'</a>
{% else %}
  <a class="govuk-link govuk-link--no-visited-state" href="review-site-details">Go back to 'Review site details'</a>
{% endif %}
```

**Integration requirements**:
- [ ] Update cancel.html to use context-aware back links
- [ ] Ensure cancel-confirmed route properly handles different origins  
- [ ] Test cancel warning page displays correctly for all trigger scenarios
- [ ] Validate "Go back" links return to correct pages

#### Step 3.4: Data Clearing Logic

**Critical Requirements**:
- [ ] Only clear current batch, not other batches
- [ ] Preserve global site counter correctly
- [ ] Handle edge case where current batch is empty
- [ ] Maintain data integrity for remaining batches

```javascript
function clearCurrentBatchSafely(session) {
    const currentBatchId = session.data['currentBatchId'];
    
    if (!currentBatchId) {
        console.log('No current batch to clear');
        return;
    }
    
    // Implementation must handle:
    // - Site renumbering after batch removal
    // - Global site counter recalculation  
    // - Session variable cleanup
    // - Batch array maintenance
}
```

#### Step 3.5: Manual Entry Integration

**File**: `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

Update manual entry cancel redirects:
```javascript
// Replace existing simple redirects with context-aware routing
router.get('/' + version + section + 'manual-entry/cancel-site-details', function (req, res) {
    // Use parent exemption.js logic but with manual entry context
    // Ensure manual entry specific session data is handled
});
```

### GET vs POST Considerations

#### Form State Handling
- [ ] Handle cancel from POST routes (form submission failures)
- [ ] Preserve form data when returning to review
- [ ] Clear form validation errors appropriately
- [ ] Handle concurrent form submissions

#### Navigation Context  
- [ ] Distinguish between GET page loads and POST redirects
- [ ] Handle browser back button interaction
- [ ] Manage URL parameters and anchors correctly
- [ ] Preserve change link context

### Batch System Integration

#### Multi-Batch Scenarios
- [ ] User has multiple saved batches, cancels from current batch
- [ ] User switches between batches during editing
- [ ] User deletes sites while editing, causing batch removal
- [ ] User adds sites to existing batch from Your Sites

#### Site Counter Management
- [ ] Verify global site counter remains accurate after cancellation
- [ ] Test site renumbering when cancelling mid-creation
- [ ] Handle edge case of cancelling the only remaining batch
- [ ] Validate site counter after multiple cancel operations

### Error Handling & Edge Cases

#### Session State Corruption
```javascript
function validateSessionState(session) {
    // Check for inconsistent session flags
    // Recover from corrupted state where possible
    // Log critical errors for debugging
    // Provide fallback behavior
}
```

#### Batch System Errors
- [ ] Handle missing currentBatchId
- [ ] Recover from corrupted batch data
- [ ] Handle batch ID conflicts
- [ ] Manage orphaned sites

### Testing Strategy

#### Core Functionality Tests
- [ ] Test each cancel route with all 4 user states
- [ ] Test data clearing accuracy and completeness
- [ ] Test navigation routing for all origins
- [ ] Test manual entry vs file upload consistency

#### Batch System Tests  
- [ ] Test multi-batch cancel scenarios
- [ ] Test site counter integrity
- [ ] Test data isolation between batches
- [ ] Test error recovery from corrupted state

#### Edge Case Tests
- [ ] Test cancel with empty batches
- [ ] Test cancel with invalid session state
- [ ] Test cancel during site creation/editing
- [ ] Test cancel with missing origin context

### Acceptance Criteria
- [ ] All cancel routes implement new state-based logic
- [ ] Data clearing works correctly for all scenarios
- [ ] Batch system integrity maintained
- [ ] Manual entry integration complete
- [ ] Error handling comprehensive
- [ ] All edge cases tested and handled
- [ ] Performance impact minimal
- [ ] Backward compatibility maintained where possible

### Agent Notes Section
```
[Agent Name] - [Date]:
[Implementation challenges, testing results, performance notes]

[Next Agent Name] - [Date]:
[Code review, integration testing, edge case findings]
```

---

## Task 4: Template Updates & Routing

**Status**: ⏳ Not Started  
**Assigned**: [Agent Name]  
**Estimated**: 6 hours  
**Dependencies**: Task 3 Complete

### Objectives
1. Update all template cancel links to use appropriate routes
2. Add context parameters where needed
3. Ensure consistent behavior across entry methods
4. Update templates to support new state tracking

### Detailed Steps

#### Step 4.1: Template Classification

Classify each template by context:

**Creation Templates** (use `cancel-creation`):
- Manual: does-your-project-involve-more-than-one-site, site-name (first time), activity dates, coordinates
- File: how-do-you-want-to-provide-coordinates, file type, upload, activity settings

**Creation Review Templates** (use `cancel-creation-review`):  
- Manual: site-name (returnTo=review), activity pages (returnTo=review), coordinates (returnTo=review)
- File: site-name (returnTo=review), activity pages (returnTo=review)

**Review Templates** (use `cancel-review`):
- Both: review-site-details (not saved)

**Saved Edit Templates** (use `cancel-saved`):
- Both: review-site-details (saved), any page accessed from Your Sites

#### Step 4.2: Template Updates by Category

**Manual Entry Templates** - Update these files:

```html
<!-- Creation pages -->
<a class="govuk-link govuk-link--no-visited-state" href="../cancel-creation">Cancel</a>

<!-- Creation review pages -->  
<a class="govuk-link govuk-link--no-visited-state" href="../cancel-creation-review">Cancel</a>

<!-- Context-sensitive pages -->
{% if returnTo === 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-creation-review">Cancel</a>
{% else %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-creation">Cancel</a>
{% endif %}
```

**Files to update**:
- [ ] `manual-entry/does-your-project-involve-more-than-one-site.html`
- [ ] `manual-entry/site-name.html` (context-sensitive)
- [ ] `manual-entry/same-activity-dates.html` (context-sensitive)
- [ ] `manual-entry/activity-dates.html` (context-sensitive)
- [ ] `manual-entry/individual-site-activity-dates.html` (context-sensitive)
- [ ] `manual-entry/same-activity-description.html` (context-sensitive)
- [ ] `manual-entry/activity-description.html` (context-sensitive)
- [ ] `manual-entry/individual-site-activity-description.html` (context-sensitive)
- [ ] `manual-entry/how-do-you-want-to-enter-the-coordinates.html` (context-sensitive)
- [ ] `manual-entry/which-coordinate-system.html` (context-sensitive)
- [ ] `manual-entry/enter-coordinates.html` (context-sensitive)
- [ ] `manual-entry/enter-multiple-coordinates.html` (context-sensitive)
- [ ] `manual-entry/site-width.html` (context-sensitive)
- [ ] `manual-entry/review-site-details.html` (state-sensitive)

#### Step 4.3: File Upload Template Updates

**Files to update**:
- [ ] `how-do-you-want-to-provide-the-coordinates.html`
- [ ] `which-type-of-file.html`
- [ ] `upload-file.html`
- [ ] `same-activity-dates.html` (context-sensitive)
- [ ] `same-activity-description.html` (context-sensitive)
- [ ] `activity-dates.html` (context-sensitive)
- [ ] `activity-details.html` (context-sensitive)
- [ ] `site-name.html` (context-sensitive)
- [ ] `site-activity-dates.html` (context-sensitive)
- [ ] `site-activity-description.html` (context-sensitive)
- [ ] `review-site-details.html` (state-sensitive)

**Special Template**:
- [ ] `cancel.html` (cancel warning page - needs context-aware back links)

#### Step 4.4: Context-Sensitive Logic

**For templates that can be reached both during creation and from review**:

```html
<!-- Example: site-name.html -->
{% if returnTo === 'review-site-details' %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-creation-review">Cancel</a>
{% else %}
  <a class="govuk-link govuk-link--no-visited-state" href="../cancel-creation">Cancel</a>
{% endif %}
```

**For review templates**:

```html  
<!-- Example: review-site-details.html -->
{% if data['reviewPageSaved'] %}
  <a class="govuk-link govuk-link--no-visited-state" href="cancel-saved">Cancel</a>
{% else %}
  <a class="govuk-link govuk-link--no-visited-state" href="cancel-review">Cancel</a>
{% endif %}
```

#### Step 4.5: Cancel Warning Page Updates

**Update cancel.html template** (`app/views/versions/multiple-sites-v2/exemption/cancel.html`):

**Current problematic code**:
```html
<a class="govuk-link govuk-link--no-visited-state" href="javascript:window.history.back()">Go back to 'Review site details'</a>
```

**New context-aware code**:
```html
{% if data['cancelOrigin'] == 'your-sites' %}
  <a class="govuk-link govuk-link--no-visited-state" href="site-details-added">Go back to 'Your sites'</a>
{% elif data['cancelOrigin'] == 'check-answers' %}
  <a class="govuk-link govuk-link--no-visited-state" href="check-answers-multiple-sites">Go back to 'Check answers'</a>
{% else %}
  <a class="govuk-link govuk-link--no-visited-state" href="review-site-details">Go back to 'Review site details'</a>
{% endif %}
```

**Additional considerations**:
- [ ] Test cancel warning displays for all scenarios that trigger it
- [ ] Verify "Yes, cancel without saving" button works correctly
- [ ] Ensure cancel-confirmed POST route handles all origins
- [ ] Test accessibility of warning page content

#### Step 4.6: State Tracking Template Integration

**Add origin context tracking to entry templates**:

```html
<!-- Task list entry -->
<form action="site-details-router?origin=task-list" method="post">

<!-- Your sites entry -->  
<a href="review-site-details?batchId={{ batch.id }}&origin=your-sites">

<!-- Check answers entry -->
<a href="review-site-details?camefromcheckanswers=true&origin=check-answers">
```

### Template Validation Requirements

#### Consistency Checks
- [ ] All manual entry templates use consistent cancel route patterns
- [ ] All file upload templates use consistent cancel route patterns  
- [ ] Context-sensitive templates correctly detect returnTo parameter
- [ ] State-sensitive templates correctly access session variables

#### Accessibility & Standards
- [ ] All cancel links maintain proper ARIA labels
- [ ] Cancel links maintain consistent styling
- [ ] Cancel links work without JavaScript
- [ ] Links maintain govuk-link classes

#### Route Parameter Validation
- [ ] Verify all cancel routes exist and are correctly mapped
- [ ] Test context parameters are correctly passed
- [ ] Validate returnTo parameters work as expected
- [ ] Check origin tracking parameters function correctly

### Testing Requirements

#### Template Rendering Tests
- [ ] Test each template renders with new cancel links
- [ ] Test context-sensitive logic works correctly
- [ ] Test state-sensitive templates access session data
- [ ] Verify no broken links or missing routes

#### User Journey Tests
- [ ] Test creation flow cancel behavior
- [ ] Test creation review flow cancel behavior  
- [ ] Test review page cancel behavior
- [ ] Test saved edit flow cancel behavior

#### Cross-Browser Testing
- [ ] Test cancel links in Chrome, Firefox, Safari, Edge
- [ ] Test keyboard navigation to cancel links
- [ ] Test screen reader compatibility
- [ ] Test mobile responsive behavior

### Acceptance Criteria
- [ ] All 25+ templates updated with correct cancel routes
- [ ] Context-sensitive logic implemented where needed
- [ ] State tracking integration complete
- [ ] All templates render without errors
- [ ] Cancel behavior consistent across entry methods
- [ ] Accessibility standards maintained
- [ ] All tests passing
- [ ] Documentation updated

### Agent Notes Section
```
[Agent Name] - [Date]:
[Template update progress, issues encountered, testing notes]

[Next Agent Name] - [Date]:
[Validation results, cross-browser testing, accessibility review]
```

---

## Task 5: Comprehensive Testing & Validation

**Status**: ⏳ Not Started  
**Assigned**: [Agent Name]  
**Estimated**: 10 hours  
**Dependencies**: Task 4 Complete

### Objectives
1. Execute comprehensive test scenarios for all cancel behaviors
2. Validate batch system integrity across all scenarios
3. Test edge cases and error conditions
4. Performance and regression testing

### Test Scenario Matrix

#### Core User Journey Tests

**Manual Entry - Creation Flow**:
- [ ] Start from task list → site name → cancel → should return to task list, clear batch
- [ ] Start from task list → multiple questions → cancel → should return to task list, clear batch
- [ ] Start from task list → reach coordinates → cancel → should return to task list, clear batch

**Manual Entry - Creation Review Flow**:
- [ ] Complete creation → review → change site name → cancel → should return to review
- [ ] Complete creation → review → change dates → cancel → should return to review  
- [ ] Complete creation → review → change coordinates → cancel → should return to review

**Manual Entry - Review Not Saved**:
- [ ] Complete creation → review (first time) → cancel → should show warning page (`cancel.html`)
- [ ] Warning page → "Yes, cancel without saving" → should clear batch, return to task list
- [ ] Warning page → "Go back to 'Review site details'" → should return to review with data intact

**Manual Entry - Review Saved**:
- [ ] From Your Sites → edit batch → cancel → should return to Your Sites
- [ ] From Check Answers → edit batch → cancel → should return to Check Answers
- [ ] From direct link → edit batch → cancel → should show warning page

**File Upload - All Scenarios**:
- [ ] Repeat all above tests for file upload flow
- [ ] Test single site vs multiple site variations
- [ ] Test different file types (KML vs Shapefile)

**Cancel Warning Page (cancel.html) Specific Tests**:
- [ ] From task list origin → warning page → "Go back" → should return to review-site-details
- [ ] From Your Sites origin → warning page → "Go back" → should return to site-details-added
- [ ] From Check Answers origin → warning page → "Go back" → should return to check-answers-multiple-sites
- [ ] Warning page → "Yes, cancel without saving" → should clear appropriate data and redirect correctly
- [ ] Test warning page displays correct content and styling
- [ ] Test warning page accessibility (screen reader, keyboard navigation)

#### Batch System Integrity Tests

**Multi-Batch Scenarios**:
- [ ] User has 3 batches → cancel from batch 2 → verify only batch 2 cleared
- [ ] User has 2 batches → cancel from batch 1 → verify batch 2 intact, site numbers correct
- [ ] User has 1 batch → cancel → verify all data cleared, counters reset

**Site Counter Tests**:
- [ ] Create batch with sites 1-3 → cancel → create new batch → verify starts at site 1
- [ ] Have sites 1-5 across 2 batches → cancel batch 1 (sites 1-3) → verify batch 2 sites renumbered to 1-2
- [ ] Complex scenario: multiple cancels and creations → verify counter accuracy

**Data Isolation Tests**:
- [ ] Batch A (manual entry) + Batch B (file upload) → cancel A → verify B unaffected
- [ ] Edit Batch A → cancel → verify other batches preserve their settings
- [ ] Multiple users (different sessions) → verify no cross-contamination

#### Edge Case & Error Handling Tests

**Session State Corruption**:
- [ ] Missing currentBatchId → verify graceful handling
- [ ] Invalid batchId reference → verify error recovery
- [ ] Conflicting session flags → verify consistent behavior
- [ ] Corrupted batch data → verify fallback behavior

**Navigation Edge Cases**:
- [ ] Browser back button after cancel → verify no broken state
- [ ] Direct URL access to cancel routes → verify proper handling
- [ ] Cancel during form submission → verify no data loss
- [ ] Multiple rapid cancel clicks → verify no race conditions

**Template Rendering Edge Cases**:
- [ ] Missing returnTo parameter → verify default behavior
- [ ] Invalid returnTo parameter → verify error handling
- [ ] Missing session data for state detection → verify fallback
- [ ] Template rendering with no batch data → verify graceful degradation

#### Performance & Scalability Tests

**Large Data Set Tests**:
- [ ] 10 batches with 5 sites each → test cancel performance
- [ ] 20 sites in single batch → test cancel data clearing speed  
- [ ] Rapid creation/cancellation cycles → test memory usage
- [ ] Long session with multiple cancels → test session size

**Concurrent User Tests**:
- [ ] Multiple users cancelling simultaneously → verify no interference
- [ ] High load during cancel operations → verify system stability
- [ ] Session cleanup under load → verify no memory leaks

### Browser & Device Testing

#### Cross-Browser Compatibility
- [ ] Chrome (latest) - All scenarios
- [ ] Firefox (latest) - All scenarios  
- [ ] Safari (latest) - All scenarios
- [ ] Edge (latest) - All scenarios
- [ ] IE11 (if supported) - Core scenarios

#### Mobile Device Testing
- [ ] iOS Safari - Core user journeys
- [ ] Android Chrome - Core user journeys
- [ ] Touch interaction with cancel links
- [ ] Responsive layout of cancel warnings

#### Accessibility Testing
- [ ] Screen reader navigation (NVDA/JAWS)
- [ ] Keyboard-only navigation
- [ ] High contrast mode compatibility
- [ ] Focus management during cancellation

### Regression Testing

#### Existing Functionality Verification
- [ ] Normal user journeys still work (no cancel)
- [ ] Site creation and editing unaffected
- [ ] Batch system operations unchanged
- [ ] Task list and navigation preserved
- [ ] Check answers flow intact

#### Performance Regression
- [ ] Page load times not impacted
- [ ] Form submission speeds maintained
- [ ] Memory usage patterns stable
- [ ] Session size growth controlled

### Test Data & Environment Setup

#### Test Data Requirements
```javascript
// Create standardized test scenarios
const testScenarios = {
    singleSiteManual: { /* test data */ },
    multipleSiteManual: { /* test data */ },
    singleSiteFile: { /* test data */ },
    multipleSiteFile: { /* test data */ },
    mixedBatches: { /* test data */ },
    largeDataSet: { /* test data */ }
};
```

#### Environment Configuration
- [ ] Local development environment setup
- [ ] Staging environment validation
- [ ] Production-like data volumes
- [ ] Session storage configuration
- [ ] Logging and monitoring setup

### Test Documentation & Reporting

#### Test Execution Tracking
Create detailed test execution log:
- Test scenario ID
- Expected result
- Actual result  
- Pass/Fail status
- Screenshots/evidence
- Issues identified
- Retest results

#### Issue Classification
**Critical Issues**:
- Data loss or corruption
- Security vulnerabilities
- Complete functionality failure
- Cross-user data contamination

**Major Issues**:
- Incorrect navigation behavior
- Partial data loss
- Performance degradation >50%
- Accessibility failures

**Minor Issues**:
- UI inconsistencies
- Non-critical edge cases
- Performance degradation <20%
- Documentation gaps

### Acceptance Criteria
- [ ] All 100+ test scenarios executed and documented
- [ ] Zero critical or major issues remaining
- [ ] Minor issues documented with workarounds
- [ ] Batch system integrity verified across all tests
- [ ] Performance within acceptable parameters
- [ ] Cross-browser compatibility confirmed
- [ ] Accessibility standards met
- [ ] Regression testing completed with no issues
- [ ] Test documentation complete and reviewed
- [ ] Production deployment approval obtained

### Agent Notes Section
```
[Agent Name] - [Date]:
[Test execution progress, critical issues found, recommendations]

[Next Agent Name] - [Date]:
[Issue resolution verification, final testing results, deployment readiness]
```

---

## Post-Implementation Monitoring

### Production Monitoring Plan
- [ ] Set up error tracking for cancel route failures
- [ ] Monitor session data growth and cleanup
- [ ] Track user behavior analytics for cancel usage
- [ ] Monitor performance metrics for cancel operations

### User Feedback Collection
- [ ] Implement user feedback mechanism for cancel behavior
- [ ] Monitor support tickets related to navigation issues
- [ ] Track user journey completion rates
- [ ] Collect usability testing feedback

### Maintenance Schedule  
- [ ] Weekly monitoring of cancel route error logs
- [ ] Monthly review of user behavior analytics
- [ ] Quarterly assessment of session cleanup effectiveness
- [ ] Annual review of cancel behavior consistency

---

## Implementation Progress Tracking

| Task | Status | Assigned | Start Date | Completion Date | Notes |
|------|--------|----------|------------|-----------------|-------|
| Task 1: Analysis & Design | ⏳ Not Started | [Agent] | | | |
| Task 2: Context Detection | ⏳ Not Started | [Agent] | | | |
| Task 3: Route Logic | ⏳ Not Started | [Agent] | | | |
| Task 4: Template Updates | ⏳ Not Started | [Agent] | | | |
| Task 5: Testing | ⏳ Not Started | [Agent] | | | |

### Status Legend
- ⏳ Not Started
- 🔄 In Progress  
- ✅ Complete
- ❌ Blocked
- ⚠️ Issues Found

---

*Generated by: Claude Sonnet 4*  
*Document Version: 1.0*  
*Last Updated: 2024-12-19*

<!-- Generated by Copilot --> 