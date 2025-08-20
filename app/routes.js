//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Middleware to automatically restore session state from 'state' query parameter
router.use('*', function(req, res, next) {
    if (req.query.state) {
        try {
            // Decode base64 and parse JSON
            const decodedState = Buffer.from(req.query.state, 'base64').toString();
            const sessionData = JSON.parse(decodedState);
            
            // Restore session data
            Object.assign(req.session.data, sessionData);
            
            // Post-restoration processing: ensure batch system is properly initialized
            if (sessionData.siteBatches && Array.isArray(sessionData.siteBatches)) {
                // Rebuild the global sites array from all batches
                const allSites = sessionData.siteBatches.flatMap(batch => batch.sites || []);
                req.session.data['sites'] = allSites;
                
                // Ensure globalSiteCounter is set correctly
                if (allSites.length > 0) {
                    const maxGlobalNumber = Math.max(...allSites.map(site => site.globalNumber || 0));
                    req.session.data['globalSiteCounter'] = maxGlobalNumber;
                }
                
                console.log('✅ Batch system reinitialized with', allSites.length, 'sites');
            }
            
            // Remove the state parameter to clean up URL (redirect without state param)
            if (Object.keys(req.query).length === 1 && req.query.state) {
                // If state is the only parameter, redirect to clean URL
                const cleanUrl = req.originalUrl.split('?')[0];
                return res.redirect(cleanUrl);
            } else if (req.query.state) {
                // If there are other parameters, redirect without just the state param
                const cleanQuery = Object.keys(req.query)
                    .filter(key => key !== 'state')
                    .map(key => `${key}=${encodeURIComponent(req.query[key])}`)
                    .join('&');
                const cleanUrl = req.originalUrl.split('?')[0] + (cleanQuery ? '?' + cleanQuery : '');
                return res.redirect(cleanUrl);
            }
            
            console.log('✅ Session state restored from URL parameter');
        } catch (error) {
            console.log('❌ Failed to restore session state from URL parameter:', error.message);
        }
    }
    next();
});

// Including other routing javascript
// This single line tells this 'routes.js' file to include the routing from the 'templates.js' and other js files
require('./routes/templates.js')(router);

// 26 february 2024
require('./routes/versions/2024-02-26/account.js')(router);
require('./routes/versions/2024-02-26/sites.js')(router);

// 18 March 2024
require('./routes/versions/2024-03-18/account.js')(router);
require('./routes/versions/2024-03-18/sites.js')(router);

// 27 Jan 2025
require('./routes/versions/2025-01-27/check.js')(router);
require('./routes/versions/2025-01-27/exemption.js')(router);

// 17 Feb 2025
require('./routes/versions/2025-02-17/check.js')(router);
require('./routes/versions/2025-02-17/exemption.js')(router);

// 03 Mar 2025
require('./routes/versions/2025-03-03/check.js')(router);
require('./routes/versions/2025-03-03/exemption.js')(router);

// 14 Mar 2025
require('./routes/versions/2025-03-14/check.js')(router);
require('./routes/versions/2025-03-14/exemption.js')(router);

// 4 Apr 2025 - Iteration 4
require('./routes/versions/2025-04-04/check.js')(router);
require('./routes/versions/2025-04-04/exemption.js')(router);

// 8 Apr 2025 - MVP for Private Beta
require('./routes/versions/mvp/check.js')(router);
require('./routes/versions/mvp/exemption.js')(router);

// Multiple Sites Version
require('./routes/versions/multiple-sites/check.js')(router);
require('./routes/versions/multiple-sites/exemption.js')(router);

// Multiple Sites Version V2
require('./routes/versions/multiple-sites-v2/check.js')(router);
require('./routes/versions/multiple-sites-v2/exemption.js')(router);
require('./routes/versions/multiple-sites-v2/exemption-manual-entry.js')(router);
require('./routes/versions/multiple-sites-v2/iat.js')(router);
require('./routes/versions/multiple-sites-v2/iat-improved.js')(router);
require('./routes/versions/multiple-sites-v2/sample-plans-v1.js')(router);
require('./routes/versions/multiple-sites-v2/sample-plans-v1-dredging-site-locations.js')(router);

// MVP Multi Sites Version
require('./routes/versions/mvp-multi-sites/check.js')(router);
require('./routes/versions/mvp-multi-sites/exemption.js')(router);
require('./routes/versions/mvp-multi-sites/exemption-manual-entry.js')(router);
require('./routes/versions/mvp-multi-sites/iat.js')(router);

// IAT Version
require('./routes/versions/iat/check.js')(router);
require('./routes/versions/iat/exemption.js')(router);
require('./routes/versions/iat/iat.js')(router);

// viewing session data
// When the user goes to 'prototype-admin/view-data' this collects all the session data
// Then it opens 'prototypetools/view-data' and passes the session data into that page to be displayed.
router.get('*/prototype-admin/view-data', function(req, res){

    // Generate base64 encoded state parameter
    const sessionData = JSON.stringify(req.session.data);
    const encodedState = Buffer.from(sessionData).toString('base64');
    querystring = 'state=' + encodedState;

    res.render('prototypetools/view-data', { data: JSON.stringify( req.session, null, 2), querystring: querystring } );
})



// Saving the session data to the clipboard using another page.
// When a user goes to 'prototype-admin/update-session-data' the page collects all the session data.
// Then redirects to a new page 'prototypetools/copy-url-to-clipboard' which copies the data to the clipboard.
//  The user can then share the state by sending someone the copied URL.
router.get('*/prototype-admin/update-session-data', function(req, res){

    // Generate base64 encoded state parameter
    const sessionData = JSON.stringify(req.session.data);
    const encodedState = Buffer.from(sessionData).toString('base64');
    const querystringtemp = 'state=' + encodedState;

    req.session.data['theoutputquerystring'] = "";
    req.session.data['theoutputquerystring'] = "?" + querystringtemp;

    res.redirect('../prototypetools/copy-url-to-clipboard');
})

