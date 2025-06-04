# Manual Entry Editing Problem & Solution Documentation

## The Core Problem

The manual entry system has a fundamental mismatch between its internal data structure and user-facing presentation:

### Internal Structure (Batch-Relative Numbering)
- Session data keys use batch-relative positions: `manual-site-name-text-input`, `manual-site-2-name-text-input`, etc.
- Each batch starts counting from 1
- Designed for linear site creation within a single batch

### User-Facing Structure (Global Numbering)  
- Users see continuous site numbers: Site 1, Site 2, Site 3, Site 4...
- Site numbers persist across multiple batches
- URLs and anchors use global site numbers: `?site=3`, `#site-3-details`

## Specific Technical Issues

### 1. Session Data Key Mismatch
```javascript
// What users see: Site 5
// Session key needed: manual-site-2-name-text-input (if it's the 2nd site in current batch)
// URL parameter: ?site=5 (global number)
```

### 2. Edit vs Create Detection
Routes need to determine:
- Are we editing an existing site? (has returnTo=review-site-details AND site exists)
- Are we creating a new site? (normal flow)

### 3. Complex Mapping Logic
Every route handler needs to:
```javascript
const isEditingExistingSite = returnTo === 'review-site-details' && findSiteByGlobalNumber(req.session, siteNumber) !== undefined;

let batchRelativePosition;
if (isEditingExistingSite) {
    batchRelativePosition = getBatchRelativePosition(req.session, siteNumber);
    sitePrefix = siteNumber === 1 ? 'manual-' : `manual-site-${siteNumber}-`;
} else {
    batchRelativePosition = siteNumber;
    sitePrefix = batchRelativePosition === 1 ? 'manual-' : `manual-site-${batchRelativePosition}-`;
}
```

## Current Solution Implementation

### 1. Helper Functions
```javascript
function getBatchRelativePosition(session, globalNumber)
function findSiteByGlobalNumber(session, globalNumber)  
function populateSessionDataFromSite(session, globalSiteNumber, batchRelativePosition)
```

### 2. Aggressive Session Data Management
The `populateSessionDataFromSite` function:
- Clears ALL coordinate-related session data for ALL sites
- Repopulates only the data for the site being edited
- Uses extensive console logging for debugging

### 3. Dual Route Logic
Every route handler has branching logic:
```javascript
if (isEditingExistingSite) {
    // Use global site number for session keys
    // Return directly to review page
} else {
    // Use batch-relative number for session keys  
    // Continue normal flow
}
```

### 4. Template Complexity
Templates need to handle both scenarios:
```nunjucks
{% set batchRelativePosition = loop.index %}
<a href="enter-coordinates?site={{ batchRelativePosition }}&returnTo=review-site-details">
```

## Why This Solution Is Complex

### 1. Data Model Impedance Mismatch
- Session structure designed for linear creation
- User interface requires random access editing
- No clean separation between batch data and session data

### 2. State Synchronization Issues
- Data exists in multiple places: session data, batch objects, global sites array
- Need to keep them synchronized during edits
- Risk of stale data contamination

### 3. URL/Parameter Complexity
- Users interact with global site numbers
- Backend needs to translate to batch-relative positions
- Multiple parameters needed: `?site=5&returnTo=review-site-details`

### 4. Testing/Debugging Difficulty
- Complex branching logic in every route
- Need to test both edit and create paths
- Console logging required to trace data flow

## Impact on Codebase

### Route Files
- ~50% more code due to dual logic paths
- Every route needs edit/create detection
- Complex parameter handling

### Template Files  
- Need to calculate batch-relative positions
- Different URL patterns for edit vs create
- Complex conditional logic for data display

### Maintenance Burden
- Changes require updating multiple code paths
- Easy to introduce bugs with session data contamination
- Difficult to understand data flow

## Recommended Future Architecture

### 1. Unified Data Model
```javascript
// Single source of truth
sites: [
  {
    id: 'uuid',
    globalNumber: 1,
    batchId: 'batch1', 
    name: 'Site Name',
    coordinates: {...},
    // ... other fields
  }
]
```

### 2. Stateless Editing
- No session data for individual sites
- All data stored in unified sites array
- Edit forms populated from sites array, not session

### 3. Consistent Numbering
- Use UUIDs or consistent IDs throughout
- No translation between global/batch-relative positions
- URLs use consistent identifiers

### 4. Simplified Routes
```javascript
// Single route logic:
router.get('/site-name/:siteId?', (req, res) => {
  const site = findSiteById(req.params.siteId);
  // Populate form from site data or create new
});
```

### 5. Clear Data Flow
```
User Action → Update Sites Array → Re-render Templates
(No complex session data synchronization)
```

## Migration Strategy for Future Version

1. **Phase 1**: Implement unified data model alongside existing system
2. **Phase 2**: Migrate routes one by one to new pattern  
3. **Phase 3**: Update templates to use new data structure
4. **Phase 4**: Remove old session-based approach
5. **Phase 5**: Simplify and clean up codebase

This would eliminate ~40% of the current complexity while making the system more maintainable and less error-prone. 