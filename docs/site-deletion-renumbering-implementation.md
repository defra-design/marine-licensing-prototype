# Site Deletion Renumbering - Implementation Guide

## Overview

This document provides step-by-step instructions for implementing site renumbering when a site is deleted. When site 3 is deleted from a list of 4 sites, site 4 should automatically become site 3.

## Progress Tracking

- [ ] Task 1: Create Core Renumbering Function
- [ ] Task 2: Create Session Data Renumbering Function  
- [ ] Task 3: Update Delete Handler
- [ ] Task 4: Template Verification
- [ ] Task 5: Testing and Validation

---

## Task 1: Create Core Renumbering Function

### Location
`app/routes/versions/multiple-sites-v2/exemption.js`

### Instructions
1. Add the following function after the existing helper functions (around line 100-200, near other utility functions):

```javascript
// Function to renumber all sites after deletion
function renumberSitesAfterDeletion(session, deletedGlobalNumber) {
    console.log('=== RENUMBERING SITES AFTER DELETION ===');
    console.log('Deleted site number:', deletedGlobalNumber);
    
    // 1. Renumber sites in all batches
    if (session.data['siteBatches']) {
        session.data['siteBatches'].forEach(batch => {
            console.log('Processing batch:', batch.id);
            batch.sites.forEach(site => {
                if (site.globalNumber > deletedGlobalNumber) {
                    const oldNumber = site.globalNumber;
                    site.globalNumber--;
                    console.log(`Renumbered site from ${oldNumber} to ${site.globalNumber}`);
                }
            });
        });
    }
    
    // 2. Rebuild global sites array
    session.data['sites'] = session.data['siteBatches'].flatMap(batch => batch.sites);
    
    // 3. Update global site counter
    if (session.data['globalSiteCounter']) {
        session.data['globalSiteCounter']--;
        console.log('Updated globalSiteCounter to:', session.data['globalSiteCounter']);
    }
    
    // 4. Renumber manual entry session data
    renumberManualEntrySessionData(session, deletedGlobalNumber);
    
    console.log('=== RENUMBERING COMPLETE ===');
}
```

### Success Criteria
- [ ] Function added to exemption.js
- [ ] Function includes console logging for debugging
- [ ] Function handles all three data stores (batches, global sites, session data)

### Completion Notes
**Agent:** [Fill in completion date and any issues encountered]

**What was completed:**
- [ ] Function added successfully
- [ ] Location: Line ___ in exemption.js
- [ ] Any modifications made to the provided code:

**Next agent notes:**

---

## Task 2: Create Session Data Renumbering Function

### Location
`app/routes/versions/multiple-sites-v2/exemption-manual-entry.js`

### Instructions
1. Add the following function after the existing helper functions (around line 50-100, near other utility functions):

```javascript
// Function to renumber manual entry session data keys after site deletion
function renumberManualEntrySessionData(session, deletedGlobalNumber) {
    console.log('=== RENUMBERING MANUAL ENTRY SESSION DATA ===');
    console.log('Deleted site number:', deletedGlobalNumber);
    
    const keysToRename = [];
    
    // Find all session keys that need renumbering
    Object.keys(session.data).forEach(key => {
        // Match patterns like 'manual-site-3-name-text-input'
        const match = key.match(/^manual-site-(\d+)-(.+)$/);
        if (match) {
            const siteNum = parseInt(match[1]);
            if (siteNum > deletedGlobalNumber) {
                keysToRename.push({
                    oldKey: key,
                    newKey: `manual-site-${siteNum - 1}-${match[2]}`,
                    value: session.data[key]
                });
                console.log(`Will rename: ${key} -> manual-site-${siteNum - 1}-${match[2]}`);
            }
        }
    });
    
    // Rename the keys
    keysToRename.forEach(({ oldKey, newKey, value }) => {
        session.data[newKey] = value;
        delete session.data[oldKey];
        console.log(`Renamed: ${oldKey} -> ${newKey}`);
    });
    
    console.log(`Renamed ${keysToRename.length} session keys`);
    console.log('=== SESSION DATA RENUMBERING COMPLETE ===');
}
```

2. **Important:** Export this function so it can be used by exemption.js:
   - Add this line at the top of the exemption-manual-entry.js file (after existing exports if any):

```javascript
// Make renumberManualEntrySessionData available to other files
global.renumberManualEntrySessionData = renumberManualEntrySessionData;
```

3. **Important:** Import this function in exemption.js:
   - Add this line near the top of exemption.js (after any existing requires):

```javascript
// Import manual entry renumbering function
require('./exemption-manual-entry.js');
```

### Success Criteria
- [ ] Function added to exemption-manual-entry.js
- [ ] Function properly exported and imported
- [ ] Regex pattern correctly matches manual entry session keys
- [ ] Console logging included for debugging

### Completion Notes
**Agent:** [Fill in completion date and any issues encountered]

**What was completed:**
- [ ] Function added successfully
- [ ] Function exported and imported correctly
- [ ] Location: Line ___ in exemption-manual-entry.js
- [ ] Import added at line ___ in exemption.js
- [ ] Any modifications made to the provided code:

**Issues encountered:**

**Next agent notes:**

---

## Task 3: Update Delete Handler

### Location
`app/routes/versions/multiple-sites-v2/exemption.js`

### Instructions
1. Find the existing delete handler function (around line 2200):
   ```javascript
   router.post('/' + version + section + 'delete-site-router', function (req, res) {
   ```

2. Locate this section in the function:
   ```javascript
   if (siteToDelete) {
       // Remove from the batch
       if (req.session.data['siteBatches'] && siteToDelete.batchId) {
           const batch = req.session.data['siteBatches'].find(b => b.id === siteToDelete.batchId);
           if (batch) {
               const batchSiteIndex = batch.sites.findIndex(s => s.globalNumber === globalSiteNumber);
               if (batchSiteIndex !== -1) {
                   batchWillBeEmpty = (batch.sites.length === 1);
                   batch.sites.splice(batchSiteIndex, 1);
               }
           }
       }
       
       // Rebuild global sites array from all batches
       req.session.data['sites'] = req.session.data['siteBatches'].flatMap(batch => batch.sites);
   }
   ```

3. Replace the "Rebuild global sites array" comment and line with:
   ```javascript
   // NEW: Renumber all remaining sites
   renumberSitesAfterDeletion(req.session, globalSiteNumber);
   ```

4. **Important:** The final code block should look like:
   ```javascript
   if (siteToDelete) {
       // Remove from the batch
       if (req.session.data['siteBatches'] && siteToDelete.batchId) {
           const batch = req.session.data['siteBatches'].find(b => b.id === siteToDelete.batchId);
           if (batch) {
               const batchSiteIndex = batch.sites.findIndex(s => s.globalNumber === globalSiteNumber);
               if (batchSiteIndex !== -1) {
                   batchWillBeEmpty = (batch.sites.length === 1);
                   batch.sites.splice(batchSiteIndex, 1);
               }
           }
       }
       
       // NEW: Renumber all remaining sites
       renumberSitesAfterDeletion(req.session, globalSiteNumber);
   }
   ```

### Success Criteria
- [ ] Delete handler function updated
- [ ] Function call added in correct location
- [ ] Old "rebuild global sites array" line removed
- [ ] Code integrates with existing logic

### Completion Notes
**Agent:** [Fill in completion date and any issues encountered]

**What was completed:**
- [ ] Delete handler updated successfully
- [ ] Location: Line ___ in exemption.js
- [ ] Function call added correctly
- [ ] Any modifications made:

**Issues encountered:**

**Next agent notes:**

---

## Task 4: Template Verification

### Instructions
The templates should already work correctly with renumbering, but verify these key files display site numbers properly:

### Files to Check

1. **File:** `app/views/versions/multiple-sites-v2/exemption/review-site-details.html`
   - **Check around line 250:** Look for `Site {{ siteIndex }} details`
   - **Verify:** Uses `site.globalNumber or loop.index` for siteIndex
   - **Check:** Delete links use `{{ siteIndex }}` in URLs

2. **File:** `app/views/versions/multiple-sites-v2/exemption/manual-entry/review-site-details.html`
   - **Check around line 280:** Look for `Site {{ siteIndex }} details`
   - **Verify:** Uses `site.globalNumber or loop.index` for siteIndex
   - **Check:** Edit links use correct site numbers

3. **File:** `app/views/versions/multiple-sites-v2/exemption/site-details-added.html`
   - **Check around line 120:** Look for `Site {{ siteIndex }}`
   - **Verify:** Uses `site.globalNumber or loop.index` for siteIndex
   - **Check:** Review and Delete links use `{{ siteIndex }}`

4. **File:** `app/views/versions/multiple-sites-v2/exemption/check-answers-multiple-sites.html`
   - **Check around line 200:** Look for `Site {{ site.globalNumber or loop.index }} details`
   - **Verify:** Uses dynamic site numbering

### Success Criteria
- [ ] All templates use dynamic site numbering (not hardcoded)
- [ ] Delete links use `{{ siteIndex }}` or similar variables
- [ ] Site headings use `site.globalNumber or loop.index`
- [ ] No hardcoded site numbers found

### Completion Notes
**Agent:** [Fill in completion date and any issues encountered]

**What was completed:**
- [ ] All templates verified
- [ ] Templates already use dynamic numbering correctly
- [ ] Any issues found and fixed:

**Template modifications made:**

**Next agent notes:**

---

## Task 5: Testing and Validation

### Test Scenarios

#### Test 1: Basic Renumbering
1. **Setup:** Create 4 sites using file upload or manual entry
2. **Action:** Delete site 2
3. **Expected:** Sites 3 and 4 become sites 2 and 3
4. **Verify:** 
   - Site numbers in "Your sites" page are 1, 2, 3
   - Review page shows correct site numbers
   - Delete links work for renumbered sites

#### Test 2: Manual Entry Session Data
1. **Setup:** Create 3 sites using manual entry
2. **Action:** Delete site 1
3. **Expected:** Sites 2 and 3 become sites 1 and 2
4. **Verify:**
   - Session data keys are correctly renamed
   - Edit forms still work for renumbered sites
   - Site data is preserved

#### Test 3: Multiple Batches
1. **Setup:** Create 2 sites via file upload, then 2 sites via manual entry
2. **Action:** Delete site 2 (from file upload batch)
3. **Expected:** All subsequent sites renumbered correctly
4. **Verify:**
   - Sites from both batches show correct numbers
   - Batch integrity maintained

#### Test 4: Edge Cases
1. **Test:** Delete the last site (should not trigger renumbering)
2. **Test:** Delete the only site in a batch
3. **Test:** Delete first site in a multi-site project

### Browser Console Testing
- Open browser developer tools
- Look for console logs during deletion
- Verify renumbering logs appear
- Check for any JavaScript errors

### Success Criteria
- [ ] Test 1 passed - basic renumbering works
- [ ] Test 2 passed - session data correctly renamed
- [ ] Test 3 passed - multiple batches handled correctly
- [ ] Test 4 passed - edge cases work properly
- [ ] No console errors during testing
- [ ] All site links and forms work after renumbering

### Completion Notes
**Agent:** [Fill in completion date and any issues encountered]

**Test Results:**

**Test 1 - Basic Renumbering:**
- [ ] Passed
- [ ] Failed - Issues:

**Test 2 - Manual Entry Session Data:**
- [ ] Passed  
- [ ] Failed - Issues:

**Test 3 - Multiple Batches:**
- [ ] Passed
- [ ] Failed - Issues:

**Test 4 - Edge Cases:**
- [ ] Passed
- [ ] Failed - Issues:

**Console Logs:**
- [ ] Renumbering logs appear correctly
- [ ] No JavaScript errors
- [ ] Issues found:

**Overall Status:**
- [ ] All tests passed - feature ready
- [ ] Some issues found - see notes below
- [ ] Major issues - needs more work

**Issues to fix:**

**Next agent notes:**

---

## Implementation Complete

### Final Checklist
- [ ] Core renumbering function implemented
- [ ] Session data renumbering function implemented
- [ ] Delete handler updated
- [ ] Templates verified
- [ ] Testing completed successfully
- [ ] Documentation updated

### Known Issues
[Document any remaining issues or limitations]

### Future Improvements
[Note any potential enhancements for future versions]

---

**Implementation completed by:** [Agent name/date]  
**Final review by:** [Reviewer name/date]  
**Status:** [Ready for production/Needs fixes/In progress] 