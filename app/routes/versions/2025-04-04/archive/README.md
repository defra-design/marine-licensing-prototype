# Archived Files

## multiple-coords-side-by-side.js

**Archived Date:** January 2025

**Reason for Archiving:**
This file contained outdated routes related to an old version of a page design. It was identified as obsolete legacy code that was no longer needed.

**Status:** 
❌ **Unused** - This file was never included in the routing system for this version.

**Restoration:**
If this file needs to be restored, copy it back to the parent directory and add the require statement to `app/routes.js`:
```javascript
require('./routes/versions/2025-04-04/multiple-coords-side-by-side.js')(router);
``` 