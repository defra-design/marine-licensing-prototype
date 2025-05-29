# Archived Files

## exemption-updated.js

**Archived Date:** January 2025

**Reason for Archiving:**
This file contained duplicate route handlers that were already present in the main `exemption.js` file. Additionally, this file was **never actually used** - it was not referenced in the main `app/routes.js` file, so it was effectively dead code.

**Handlers that were duplicated:**
- `GET /{version}/exemption/delete-site` - Site deletion confirmation page
- `POST /{version}/exemption/delete-site-router` - Site deletion handler

**Status:** 
❌ **Unused** - This file was never included in the routing system.

**Restoration:**
If this file needs to be restored, copy it back to the parent directory and add the require statement to `app/routes.js`:
```javascript
require('./routes/versions/multiple-sites/exemption-updated.js')(router);
```

**Note:** Before restoring, check if the handlers in the main `exemption.js` file still meet the requirements, as they may be more up-to-date and are already active.

## multiple-coords-side-by-side.js

**Archived Date:** January 2025

**Reason for Archiving:**
This file contained outdated routes related to an old version of a page design. It was identified as obsolete legacy code that was no longer needed.

**Status:** 
❌ **Unused** - This file was never included in the routing system for this version.

**Restoration:**
If this file needs to be restored, copy it back to the parent directory and add the require statement to `app/routes.js`:
```javascript
require('./routes/versions/multiple-sites/multiple-coords-side-by-side.js')(router);
``` 