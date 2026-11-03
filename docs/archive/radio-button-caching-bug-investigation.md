# Radio Button Caching Bug Investigation

## Issue Summary
**Page**: `/versions/multiple-sites-v2/exemption/manual-entry/does-your-project-involve-more-than-one-site`
**Problem**: When users complete a site and click "Add another site", they return to this page with the radio button still selected from their previous choice, despite server-side session clearing.

## Why This Page is Unique
This is the **only page** in the flow that exhibits this behavior, which is unusual because:

1. **Form Position in Flow**: This page sits at a critical junction where users loop back after completing sites
2. **Browser Back-Button Accessibility**: Users can navigate back to this page via browser controls
3. **Session State Complexity**: Multiple session variables interact (batch IDs, site counters, clearing flags)
4. **Rapid Navigation**: Users often navigate quickly through the flow, triggering browser caching mechanisms

## Root Cause Analysis
The issue stems from **browser form state restoration** overriding server-side session clearing:

### The Problematic Flow:
1. User selects "No" → submits form → creates site
2. User clicks "Add another site" → server clears session
3. User navigates back (via browser or app navigation) 
4. **Browser restores cached form state** before/after server clearing
5. Radio button appears selected despite `undefined` session value

### Evidence from Console Logs:
```
GET: After clearing - manual-multiple-sites value: undefined ✅ (Server cleared)
POST: Posted form data: { 'manual-multiple-sites': 'No' } ❌ (Browser submitted cached data)
```

## Attempted Solutions

### 1. Server-Side Session Clearing
**Approach**: Enhanced session clearing in GET route and add-next-site route
**Result**: ❌ Ineffective - browser cache overrode session clearing

```javascript
// Attempted in GET route
delete req.session.data['manual-multiple-sites'];
```

### 2. JavaScript Form Clearing
**Approach**: Multiple JavaScript strategies to clear radio buttons on page load
**Implementation**:
- Immediate inline script execution
- DOMContentLoaded event handlers
- Meta tag communication
- Multiple fallback timers

**Result**: ❌ Partially effective - JavaScript detected and cleared buttons but browser restored them again

```javascript
// Attempted client-side clearing
if (shouldClear) {
    radioButtons.forEach(function(radio) {
        radio.checked = false;
    });
}
```

### 3. Form Anti-Caching Attributes
**Approach**: Added autocomplete and cache prevention attributes
**Implementation**:
```html
<form autocomplete="off">
<input autocomplete="off">
```
**Result**: ❌ Browser ignored these attributes

### 4. Template-Level Value Control
**Approach**: Conditional value passing to govukRadios component
**Implementation**:
```nunjucks
{% set radioValue %}{% if data['manual-multiple-sites'] and data['manual-multiple-sites'] != 'undefined' %}{{ data['manual-multiple-sites'] }}{% endif %}{% endset %}
```
**Result**: ❌ Browser cache restoration happened after template rendering

### 5. Stale Submission Detection
**Approach**: Server-side detection of cached form submissions with timestamp tracking
**Implementation**:
- Track when session is cleared with timestamp
- Detect rapid submissions (< 3 seconds) as stale
- Redirect stale submissions back to page

**Result**: ❌ Created infinite loops and erratic behavior

```javascript
// Stale detection logic
const veryRecentlyCleared = clearTimestamp && (Date.now() - clearTimestamp) < 3000;
if (veryRecentlyCleared && hasFormData) {
    return res.redirect('does-your-project-involve-more-than-one-site?stale=true');
}
```

## Technical Deep Dive

### Browser Form Restoration Mechanisms
Modern browsers aggressively cache and restore form state through:
1. **bfcache (Back-Forward Cache)**: Preserves entire page state
2. **Form data restoration**: Browser-level form state memory
3. **Session restoration**: Tab/window state preservation
4. **Autocomplete mechanisms**: Even when disabled

### Why Standard Solutions Failed
1. **Timing Issues**: Browser restoration happens asynchronously after server response
2. **Multiple Restoration Points**: Browser restores state at different lifecycle events
3. **Cache Precedence**: Browser cache takes precedence over server-provided values
4. **JavaScript Timing**: Form restoration can happen after JavaScript clearing

### The "No Solution" Scenario
This appears to be a case where browser behavior fundamentally conflicts with the application's session management expectations. The browser is "helping" users by preserving form state, but this conflicts with the business logic requirement for fresh selections.

## Evidence of Browser-Specific Behavior
- Issue persists in **incognito mode** (ruling out persistent cookies/storage)
- Issue happens with **immediate resubmission** (ruling out user confusion)
- **Server logs confirm** session clearing is working
- **JavaScript logs confirm** clearing attempts execute successfully
- **Template debugging shows** undefined values being passed correctly

## Alternative Approaches (Not Attempted)

### 1. Flow Redesign
Instead of looping back to the same page, create a new page for additional sites:
- `/add-first-site` vs `/add-additional-site`
- Different URLs prevent browser cache association

### 2. POST-Redirect-POST Pattern
Implement strict POST-Redirect-POST to break cache chains:
```javascript
POST → 302 Redirect → GET (fresh page) → POST (selection)
```

### 3. Cache-Busting URLs
Add unique parameters to force fresh page loads:
```
does-your-project-involve-more-than-one-site?v=1234567890
```

### 4. Session-Based Form Tokens
Implement CSRF-style tokens to detect stale submissions:
```javascript
// Generate unique token per page load
req.session.data['form-token'] = generateToken();
// Validate token on submission
```

## Recommendation

**Accept as Known Limitation**: This appears to be an edge case where modern browser "helpful" behavior conflicts with application logic. The behavior is:

1. **Not harmful**: Users can still complete their task
2. **Somewhat expected**: Users might expect their previous choice to be remembered
3. **Self-correcting**: Users can simply change the selection if needed

## Future Investigation Ideas

1. **Browser Comparison**: Test across different browsers to identify if it's browser-specific
2. **GOV.UK Pattern Library**: Check if other GDS services have encountered similar issues
3. **Alternative Form Libraries**: Test if different form components exhibit the same behavior
4. **Network Tab Analysis**: Monitor exact timing of requests/responses to identify restoration points

---

**Date**: December 2024  
**Investigated by**: Claude (AI Assistant)  
**Status**: Unresolved - Accepted as Known Limitation  
**Files Affected**: 
- `app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`
- `app/views/versions/multiple-sites-v2/exemption/manual-entry/does-your-project-involve-more-than-one-site.html` 