# Archived Files

## exemption-updated.js

**Archived Date:** January 2025

**Reason for Archiving:**
This file contained duplicate route handlers that were already present in the main `exemption.js` file. The handlers in the main file were more complete (included additional redirect cases), making this file redundant.

**Handlers that were duplicated:**
- `GET /{version}/exemption/delete-site` - Site deletion confirmation page
- `POST /{version}/exemption/delete-site-router` - Site deletion handler

**What was different:**
The main `exemption.js` file included an additional redirect case for `check-answers-multiple-sites` that this file was missing.

**Restoration:**
If this file needs to be restored, copy it back to the parent directory and add the require statement back to `app/routes.js`:
```javascript
require('./routes/versions/multiple-sites-v2/exemption-updated.js')(router);
```

**Note:** Before restoring, check if the handlers in the main `exemption.js` file still meet the requirements, as they may be more up-to-date.

## multiple-coords-side-by-side.js

**Archived Date:** January 2025

**Reason for Archiving:**
This file contained outdated routes related to an old version of a page design. It was identified as obsolete legacy code that was no longer needed.

**Status:** 
⚠️ **Was Active** - This file was being loaded by the routing system before archival.

**Restoration:**
If this file needs to be restored, copy it back to the parent directory and add the require statement back to `app/routes.js`:
```javascript
require('./routes/versions/multiple-sites-v2/multiple-coords-side-by-side.js')(router);
``` 