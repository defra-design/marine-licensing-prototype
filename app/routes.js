//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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
require('./routes/versions/2025-01-27/account.js')(router);
require('./routes/versions/2025-01-27/sites.js')(router);
require('./routes/versions/2025-01-27/check.js')(router);
require('./routes/versions/2025-01-27/exemption.js')(router);

// 17 Feb 2025
require('./routes/versions/2025-02-17/account.js')(router);
require('./routes/versions/2025-02-17/sites.js')(router);
require('./routes/versions/2025-02-17/check.js')(router);
require('./routes/versions/2025-02-17/exemption.js')(router);

// 03 Mar 2025
require('./routes/versions/2025-03-03/account.js')(router);
require('./routes/versions/2025-03-03/sites.js')(router);
require('./routes/versions/2025-03-03/check.js')(router);
require('./routes/versions/2025-03-03/exemption.js')(router);

// 14 Mar 2025
require('./routes/versions/2025-03-14/account.js')(router);
require('./routes/versions/2025-03-14/sites.js')(router);
require('./routes/versions/2025-03-14/check.js')(router);
require('./routes/versions/2025-03-14/exemption.js')(router);

// 4 Apr 2025 - Iteration 4
require('./routes/versions/2025-04-04/account.js')(router);
require('./routes/versions/2025-04-04/sites.js')(router);
require('./routes/versions/2025-04-04/check.js')(router);
require('./routes/versions/2025-04-04/exemption.js')(router);

// 8 Apr 2025 - MVP for Private Beta
require('./routes/versions/mvp/account.js')(router);
require('./routes/versions/mvp/sites.js')(router);
require('./routes/versions/mvp/check.js')(router);
require('./routes/versions/mvp/exemption.js')(router);



// viewing session data
// When the user goes to 'prototype-admin/view-data' this collects all the session data
// Then it opens 'prototypetools/view-data' and passes the session data into that page to be displayed.
router.get('*/prototype-admin/view-data', function(req, res){

    querystring = '';
    for ( var key in req.session.data )
    {
        querystring += key +'=' + req.session.data[key] + '&';
    }

    res.render('prototypetools/view-data', { data: JSON.stringify( req.session, null, 2), querystring: querystring } );
})



// Saving the session data to the clipboard using another page.
// When a user goes to 'prototype-admin/update-session-data' the page collects all the session data.
// Then redirects to a new page 'prototypetools/copy-url-to-clipboard' which copies the data to the clipboard.
//  The user can then share the state by sending someone the copied URL.
router.get('*/prototype-admin/update-session-data', function(req, res){

    var querystringtemp = '';
    for ( var key in req.session.data )
    {
        querystringtemp += key +'=' + req.session.data[key] + '&';
    }

    req.session.data['theoutputquerystring'] = "";
    req.session.data['theoutputquerystring'] = "?" + querystringtemp;

    res.redirect('../prototypetools/copy-url-to-clipboard');
})

