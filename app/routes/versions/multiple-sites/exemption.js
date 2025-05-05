const { log } = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {
    let version = "versions/multiple-sites/";
    let section = "exemption/";

// Functions for clearing location data
function clearMapData(session) {
delete session.data['sites-drawn-coordinates'];
}

function clearCoordinateData(session) {
    // Clear circle data
    delete session.data['exemption-enter-the-coordinates-at-the-centre-point-latitude-text-input'];
    delete session.data['exemption-enter-the-coordinates-at-the-centre-point-longitude-text-input'];
    delete session.data['exemption-width-of-site-number-input'];
    
    // Clear square data
    delete session.data['exemption-what-are-the-coordinates-of-the-square-latitude-text-input'];
    delete session.data['exemption-what-are-the-coordinates-of-the-square-longitude-text-input'];
    delete session.data['exemption-width-of-square-number-input'];

    // Clear multiple coordinates data
    for (let i = 1; i <= 5; i++) {
        delete session.data[`coordinates-point-${i}-latitude`];
        delete session.data[`coordinates-point-${i}-longitude`];
    }
}

// Add these new clearing functions
function clearAllLocationData(session) {
    // Clear coordinate data
    clearCoordinateData(session);
    
    // Clear coordinate system
    clearCoordinateSystem(session);
    
    // Clear coordinate type
    clearCoordinateType(session);
    
    // Clear method of providing coordinates
    delete session.data['exemption-how-do-you-want-to-provide-the-coordinates-radios'];
    
    // Clear file upload data
    delete session.data['exemption-which-type-of-file-radios'];
    delete session.data['kml-file-upload'];
    
    // Clear map data
    clearMapData(session);
}

function clearCoordinateSystem(session) {
    delete session.data['exemption-what-coordinate-system-radios'];
    clearCoordinateValues(session);
}

function clearCoordinateType(session) {
    delete session.data['coords-type'];
    delete session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios']; // Clear the selection itself
    delete session.data['previous-coords-entry-method']; // Clear the tracking variable
    clearCoordinateValues(session);
}

function clearCoordinateValues(session) {
    // Clear circle data
    delete session.data['exemption-enter-the-coordinates-at-the-centre-point-latitude-text-input'];
    delete session.data['exemption-enter-the-coordinates-at-the-centre-point-longitude-text-input'];
    delete session.data['exemption-width-of-site-number-input'];
    
    // Clear square data
    delete session.data['exemption-what-are-the-coordinates-of-the-square-latitude-text-input'];
    delete session.data['exemption-what-are-the-coordinates-of-the-square-longitude-text-input'];
    delete session.data['exemption-width-of-square-number-input'];

    // Clear multiple coordinates data
    for (let i = 1; i <= 5; i++) {
        delete session.data[`coordinates-point-${i}-latitude`];
        delete session.data[`coordinates-point-${i}-longitude`];
    }
}

// Function to clear all site details data when cancelling to task list
function clearAllSiteDetails(session) {
    // Clear site location data
    clearAllLocationData(session);
    
    // Clear activity date settings
    delete session.data['exemption-same-activity-dates-for-sites'];
    delete session.data['previous-activity-dates-selection'];
    
    // Clear shared activity dates
    delete session.data['exemption-start-date-date-input-day'];
    delete session.data['exemption-start-date-date-input-month'];
    delete session.data['exemption-start-date-date-input-year'];
    delete session.data['exemption-end-date-date-input-day'];
    delete session.data['exemption-end-date-date-input-month'];
    delete session.data['exemption-end-date-date-input-year'];
    
    // Clear activity description settings
    delete session.data['exemption-same-activity-description-for-sites'];
    delete session.data['previous-activity-description-selection'];
    
    // Clear shared activity description
    delete session.data['exemption-activity-details-text-area'];
    
    // Clear site-specific data
    for (let i = 1; i <= 2; i++) {
        // Clear site name
        delete session.data[`site-${i}-name`];
        
        // Clear site-specific dates
        delete session.data[`site-${i}-start-date-day`];
        delete session.data[`site-${i}-start-date-month`];
        delete session.data[`site-${i}-start-date-year`];
        delete session.data[`site-${i}-end-date-day`];
        delete session.data[`site-${i}-end-date-month`];
        delete session.data[`site-${i}-end-date-year`];
        
        // Clear site-specific description
        delete session.data[`site-${i}-activity-description`];
        
        // Clear site-specific map image
        delete session.data[`site-${i}-map-image`];
    }
    
    // Clear any error states
    delete session.data['startdateerror'];
    delete session.data['enddateerror'];
    delete session.data['errorthispage'];
    delete session.data['errortypeone'];
    delete session.data['errortypetwo'];
    
    // Reset task status
    delete session.data['exempt-information-3-status'];
}

// Function to clear all data after method of providing site location
function clearDataAfterLocationMethod(session) {
    // Clear file type selection
    delete session.data['exemption-which-type-of-file-radios'];
    
    // Clear file upload data
    delete session.data['kml-file-upload'];
    
    // Clear activity date settings
    delete session.data['exemption-same-activity-dates-for-sites'];
    delete session.data['previous-activity-dates-selection'];
    
    // Clear shared activity dates
    delete session.data['exemption-start-date-date-input-day'];
    delete session.data['exemption-start-date-date-input-month'];
    delete session.data['exemption-start-date-date-input-year'];
    delete session.data['exemption-end-date-date-input-day'];
    delete session.data['exemption-end-date-date-input-month'];
    delete session.data['exemption-end-date-date-input-year'];
    
    // Clear activity description settings
    delete session.data['exemption-same-activity-description-for-sites'];
    delete session.data['previous-activity-description-selection'];
    
    // Clear shared activity description
    delete session.data['exemption-activity-details-text-area'];
}

// Function to clear all data after file type selection
function clearDataAfterFileType(session) {
    // Clear file upload data
    delete session.data['kml-file-upload'];
    
    // Clear activity date settings
    delete session.data['exemption-same-activity-dates-for-sites'];
    delete session.data['previous-activity-dates-selection'];
    
    // Clear shared activity dates
    delete session.data['exemption-start-date-date-input-day'];
    delete session.data['exemption-start-date-date-input-month'];
    delete session.data['exemption-start-date-date-input-year'];
    delete session.data['exemption-end-date-date-input-day'];
    delete session.data['exemption-end-date-date-input-month'];
    delete session.data['exemption-end-date-date-input-year'];
    
    // Clear activity description settings
    delete session.data['exemption-same-activity-description-for-sites'];
    delete session.data['previous-activity-description-selection'];
    
    // Clear shared activity description
    delete session.data['exemption-activity-details-text-area'];
}

// Function to clear all data after file upload
function clearDataAfterFileUpload(session) {
    // Clear activity date settings
    delete session.data['exemption-same-activity-dates-for-sites'];
    delete session.data['previous-activity-dates-selection'];
    
    // Clear shared activity dates
    delete session.data['exemption-start-date-date-input-day'];
    delete session.data['exemption-start-date-date-input-month'];
    delete session.data['exemption-start-date-date-input-year'];
    delete session.data['exemption-end-date-date-input-day'];
    delete session.data['exemption-end-date-date-input-month'];
    delete session.data['exemption-end-date-date-input-year'];
    
    // Clear activity description settings
    delete session.data['exemption-same-activity-description-for-sites'];
    delete session.data['previous-activity-description-selection'];
    
    // Clear shared activity description
    delete session.data['exemption-activity-details-text-area'];
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Project name start
// NOT THE ONE IN THE TASK LIST - SEE BELOW FOR THAT ONE
// TEXT ENTRY
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'project-name-start-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Check if the text input (Project name) is blank
    const projectTitle = req.session.data['exemption-project-name-text-input'];
    if (!projectTitle || projectTitle.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    // Redirect based on errors
    if (req.session.data['errorthispage'] === "true") {
        res.redirect('project-name-start');
    } else {
        // Set the status to completed
        req.session.data['exempt-information-1-status'] = 'completed';
        
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#project-name');
        } else {
            res.redirect('task-list');
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Project name
// NOT THE OPENING ONE 
// TEXT ENTRY
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'project-name-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Check if the text input (Project name) is blank
    const projectTitle = req.session.data['exemption-project-name-text-input'];
    if (!projectTitle || String(projectTitle).trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    // Redirect based on errors
    if (req.session.data['errorthispage'] === "true") {
        res.redirect('project-name');
    } else {
        // Set the status to completed
        req.session.data['exempt-information-1-status'] = 'completed';
        
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#project-name');
        } else {
            res.redirect('task-list');
        }
    }
});

router.get('/' + version + section + 'project-name', function (req, res) {
    req.session.data['headerNameExemption'] = 'Apply for a marine licence';
    res.render(version + section + 'project-name');
});

///////////////////////////////////////////////////////////////////////////////////////////////
// Activity dates
// DATE ENTRY -  both start and end
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'activity-dates-router', function (req, res) {
    // Reset separate error flags
    req.session.data['startdateerror'] = "false";
    req.session.data['enddateerror'] = "false";

    // Retrieve the start date values
    const startDay   = req.session.data['exemption-start-date-date-input-day'];
    const startMonth = req.session.data['exemption-start-date-date-input-month'];
    const startYear  = req.session.data['exemption-start-date-date-input-year'];

    // Retrieve the end date values
    const endDay   = req.session.data['exemption-end-date-date-input-day'];
    const endMonth = req.session.data['exemption-end-date-date-input-month'];
    const endYear  = req.session.data['exemption-end-date-date-input-year'];

    // Check if the start date is missing any field
    if (!startDay || !startMonth || !startYear) {
        req.session.data['startdateerror'] = "true";
    }

    // Check if the end date is missing any field
    if (!endDay || !endMonth || !endYear) {
        req.session.data['enddateerror'] = "true";
    }

    // If either date is incomplete, redirect back to show the errors
    if (req.session.data['startdateerror'] === "true" || req.session.data['enddateerror'] === "true") {
        return res.redirect('activity-dates');
    }
    
    // Check if we're coming from review-site-details page
    const returnTo = req.session.data['returnTo'];
    if (returnTo === 'review-site-details') {
        delete req.session.data['returnTo']; // Clear the return flag
        
        // Look for anchor in referrer URL
        const referer = req.headers.referer || '';
        const hashPosition = referer.indexOf('#');
        
        if (hashPosition > -1) {
            // Extract the anchor and redirect with it
            const anchor = referer.substring(hashPosition);
            return res.redirect('review-site-details' + anchor);
        }
        
        return res.redirect('review-site-details');
    }

    // Default behavior - go to the activity description question
    res.redirect('same-activity-description');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Activity details
// TEXT ENTRY (TEXTAREA)
/////////////////////////////////////////////////////////////////////////////////////////////

// Fix the route for activity-details GET request
router.get('/' + version + section + 'activity-details', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errors'] = [];

    res.render(version + section + 'activity-details');
});

// Fix the route handler for activity details POST request
router.post('/' + version + section + 'activity-details-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const activityDetails = req.session.data['exemption-activity-details-text-area'];
    if (!activityDetails || activityDetails.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect('activity-details');
    }

    // Check if we're coming from review-site-details page
    const returnTo = req.session.data['returnTo'];
    if (returnTo === 'review-site-details') {
        delete req.session.data['returnTo']; // Clear the return flag
        
        // Look for anchor in referrer URL
        const referer = req.headers.referer || '';
        const hashPosition = referer.indexOf('#');
        
        if (hashPosition > -1) {
            // Extract the anchor and redirect with it
            const anchor = referer.substring(hashPosition);
            return res.redirect('review-site-details' + anchor);
        }
        
        return res.redirect('review-site-details');
    }

    // Default behavior - go to review-site-details
    res.redirect('review-site-details');
});

// Maintain the existing about-your-activity-router for backward compatibility
router.post('/' + version + section + 'about-your-activity-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const activityDetails = req.session.data['exemption-activity-details-text-area'];
    if (!activityDetails || activityDetails.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect('activity-details');
    }

    // After a valid description is entered, go to review-site-details
    res.redirect('review-site-details');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Location details
// How do you want to provide the location?
// About the location of the activity
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

// About location router - clear everything when changing method
router.post('/' + version + section + 'do-you-want-to-draw-the-site-on-our-map-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-do-you-want-to-draw-the-site-on-our-map-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('do-you-want-to-draw-the-site-on-our-map');
        return;
    }

    // Clear all location data regardless of what was previously selected
    clearAllLocationData(req.session);
    
    // Also clear how-do-you-want-to-provide-the-coordinates-radios
    delete req.session.data['exemption-how-do-you-want-to-provide-the-coordinates-radios'];
    
    // Also clear map data if it exists
    clearMapData(req.session);
    
    // Clear file upload data
    delete req.session.data['exemption-which-type-of-file-radios'];
    delete req.session.data['kml-file-upload'];
    
    // Route based on selection
    switch(selection) {
        // change to which-type-of-file to allow it, or stop to not
        case "Yes":
            res.redirect('map');
            break;
        case "No, I've got the coordinates":
            res.redirect('how-do-you-want-to-provide-the-coordinates');
            break;
        default:
            res.redirect('do-you-want-to-draw-the-site-on-our-map');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// How do you want to provide the coordinates?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

// GET route handler for the "How do you want to provide coordinates" page
router.get('/' + version + section + 'how-do-you-want-to-provide-the-coordinates', function (req, res) {
    // If coming from review page, clear data for subsequent pages
    if (req.query.fromreview) {
        clearDataAfterLocationMethod(req.session);
    }
    res.render(version + section + 'how-do-you-want-to-provide-the-coordinates');
});

router.post('/' + version + section + 'how-do-you-want-to-provide-the-coordinates-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-how-do-you-want-to-provide-the-coordinates-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('how-do-you-want-to-provide-the-coordinates');
        return;
    }

    // Clear data based on selection
    switch(selection) {
        case "Enter the coordinates of the site manually":
            // Clear file upload data if it exists
            delete req.session.data['exemption-which-type-of-file-radios'];
            delete req.session.data['kml-file-upload'];
            break;
        case "Upload a file with the coordinates of the site":
            // Clear manual entry data if it exists
            clearCoordinateType(req.session);
            clearCoordinateSystem(req.session);
            clearCoordinateValues(req.session);
            break;
    }

    // Route based on selection
    switch(selection) {
        case "Enter the coordinates of the site manually":
            res.redirect('stop');
            break;
        case "Upload a file with the coordinates of the site":
            res.redirect('which-type-of-file');
            break;
        default:
            res.redirect('how-do-you-want-to-provide-the-coordinates');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Which type of file do you want to upload?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

// GET route handler for the "Which type of file" page
router.get('/' + version + section + 'which-type-of-file', function (req, res) {
    // If coming from review page, clear data for subsequent pages
    if (req.query.fromreview) {
        clearDataAfterFileType(req.session);
    }
    res.render(version + section + 'which-type-of-file');
});

router.post('/' + version + section + 'which-type-of-file-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-which-type-of-file-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('which-type-of-file');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "KML":
            res.redirect('upload-file');
            break;
        case "Shapefile":
            res.redirect('upload-file');
            break;
        default:
            res.redirect('which-type-of-file');
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Upload KML File
// FILE UPLOAD PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

// GET route handler for the "Upload file" page
router.get('/' + version + section + 'upload-file', function (req, res) {
    // If coming from review page, clear data for subsequent pages
    if (req.query.fromreview) {
        clearDataAfterFileUpload(req.session);
    }
    res.render(version + section + 'upload-file');
});

router.post('/' + version + section + 'upload-file-router', function (req, res) {
    req.session.data['siteTitle'] = 'review';
    // After uploading file, go to same-activity-dates question
    res.redirect('same-activity-dates');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Are the activity dates the same for every site?
// RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'same-activity-dates-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-same-activity-dates-for-sites'];
    const previousSelection = req.session.data['previous-activity-dates-selection'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('same-activity-dates');
        return;
    }

    // Store the current selection for future comparison
    req.session.data['previous-activity-dates-selection'] = selection;

    // Check if we're coming from review-site-details page
    const returnTo = req.session.data['returnTo'];
    
    // Route based on selection
    switch(selection) {
        case "Yes":
            // If dates are the same for all sites, take them to the activity-dates page
            // Pass the returnTo parameter so activity-dates knows where to return
            if (returnTo === 'review-site-details') {
                req.session.data['returnTo'] = 'review-site-details';
                res.redirect('activity-dates');
            } else {
                res.redirect('activity-dates');
            }
            break;
        case "No":
            // If coming from review page and changing from Yes to No
            if (returnTo === 'review-site-details' && previousSelection === "Yes") {
                // Clear shared activity dates
                delete req.session.data['exemption-start-date-date-input-day'];
                delete req.session.data['exemption-start-date-date-input-month'];
                delete req.session.data['exemption-start-date-date-input-year'];
                delete req.session.data['exemption-end-date-date-input-day'];
                delete req.session.data['exemption-end-date-date-input-month'];
                delete req.session.data['exemption-end-date-date-input-year'];
                
                // Return to review page
                delete req.session.data['returnTo'];
                res.redirect('review-site-details');
            } else {
                // If dates are different for each site, skip to activity description question
                // We'll collect site-specific dates later
                res.redirect('same-activity-description');
            }
            break;
        default:
            res.redirect('same-activity-dates');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Is the activity description the same for every site?
// RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'same-activity-description-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-same-activity-description-for-sites'];
    const previousSelection = req.session.data['previous-activity-description-selection'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('same-activity-description');
        return;
    }

    // Store the current selection for future comparison
    req.session.data['previous-activity-description-selection'] = selection;

    // Check if we're coming from review-site-details page
    const returnTo = req.session.data['returnTo'];
    
    // Route based on selection
    switch(selection) {
        case "Yes":
            // If description is the same for all sites, take them to the activity-details page
            if (returnTo === 'review-site-details') {
                req.session.data['returnTo'] = 'review-site-details';
                res.redirect('activity-details');
            } else {
                res.redirect('activity-details');
            }
            break;
        case "No":
            // If coming from review page and changing from Yes to No
            if (returnTo === 'review-site-details' && previousSelection === "Yes") {
                // Clear shared activity description
                delete req.session.data['exemption-activity-details-text-area'];
                
                // Return to review page
                delete req.session.data['returnTo'];
                res.redirect('review-site-details');
            } else {
                // If description is different for each site, skip to review-site-details
                // We'll collect site-specific descriptions later
                res.redirect('review-site-details');
            }
            break;
        default:
            res.redirect('same-activity-description');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Site-specific name
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'site-name-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const siteNumber = req.session.data['site'];
    const siteName = req.session.data['site-' + siteNumber + '-name'];

    if (!siteName || siteName.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect('site-name?site=' + siteNumber);
    }

    // Extract the return parameter which contains the section name
    const returnSection = req.session.data['return'];
    
    if (returnSection) {
        // Redirect back to review-site-details with the anchor
        return res.redirect('review-site-details#' + returnSection);
    }

    // Default: return to review-site-details without anchor
    res.redirect('review-site-details');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Site-specific activity dates
// DATE ENTRY - both start and end
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'site-activity-dates-router', function (req, res) {
    // Reset separate error flags
    req.session.data['startdateerror'] = "false";
    req.session.data['enddateerror'] = "false";

    const siteNumber = req.session.data['site'];

    // Retrieve the start date values
    const startDay = req.session.data['site-' + siteNumber + '-start-date-day'];
    const startMonth = req.session.data['site-' + siteNumber + '-start-date-month'];
    const startYear = req.session.data['site-' + siteNumber + '-start-date-year'];

    // Retrieve the end date values
    const endDay = req.session.data['site-' + siteNumber + '-end-date-day'];
    const endMonth = req.session.data['site-' + siteNumber + '-end-date-month'];
    const endYear = req.session.data['site-' + siteNumber + '-end-date-year'];

    // Check if the start date is missing any field
    if (!startDay || !startMonth || !startYear) {
        req.session.data['startdateerror'] = "true";
    }

    // Check if the end date is missing any field
    if (!endDay || !endMonth || !endYear) {
        req.session.data['enddateerror'] = "true";
    }

    // If either date is incomplete, redirect back to show the errors
    if (req.session.data['startdateerror'] === "true" || req.session.data['enddateerror'] === "true") {
        return res.redirect('site-activity-dates?site=' + siteNumber);
    }

    // Extract the return parameter which contains the section name
    const returnSection = req.session.data['return'];
    
    if (returnSection) {
        // Redirect back to review-site-details with the anchor
        return res.redirect('review-site-details#' + returnSection);
    }

    // Default: return to review-site-details without anchor
    res.redirect('review-site-details');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Site-specific activity description
// TEXT ENTRY (TEXTAREA)
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'site-activity-description-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const siteNumber = req.session.data['site'];
    const siteDescription = req.session.data['site-' + siteNumber + '-activity-description'];

    if (!siteDescription || siteDescription.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect('site-activity-description?site=' + siteNumber);
    }

    // Extract the return parameter which contains the section name
    const returnSection = req.session.data['return'];
    
    if (returnSection) {
        // Redirect back to review-site-details with the anchor
        return res.redirect('review-site-details#' + returnSection);
    }

    // Default: return to review-site-details without anchor
    res.redirect('review-site-details');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Review Site Details
// REVIEW PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'review-site-details-router', function (req, res) {
    // Set the status to completed
    req.session.data['exempt-information-3-status'] = 'completed';
    
    // Redirect to task-list instead of stop.html
    res.redirect('task-list');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// How do you want to enter the coordinates of the area?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

// How to enter coordinates router - clear coordinate system and values
router.post('/' + version + section + 'how-do-you-want-to-enter-the-coordinates-router', function (req, res) {
    
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('how-do-you-want-to-enter-the-coordinates');
        return;
    }

    // Save the current selection for reference
    const previousSelection = req.session.data['previous-coords-entry-method'];
    
    // If the selection has changed, clear all relevant data
    if (previousSelection && previousSelection !== selection) {
        // Clear previous selection's data
        clearCoordinateValues(req.session);
    }
    
    // Store current selection for next time
    req.session.data['previous-coords-entry-method'] = selection;

    // Set coords-type based on selection
    switch(selection) {
        case "Enter one set of coordinates and a width to create a circular site":
            req.session.data['coords-type'] = 'coords-circle';
            break;
        case "Enter multiple sets of coordinates to mark the boundary of the site":
            req.session.data['coords-type'] = 'coords-multiple';
            break;
    }

    clearCoordinateSystem(req.session);
    
    // Always redirect to what-coordinate-system
    res.redirect('what-coordinate-system');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What coordinate system do you want to use?
// PAGE OF RADIO BUTTONS
//////////////////////////////////////////////////////////////////////////////////////////////

// What coordinate system router - clear only coordinate values
router.post('/' + version + section + 'what-coordinate-system-router', function (req, res) {
    
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-what-coordinate-system-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-coordinate-system');
        return;
    }

    // Save the selection
    req.session.data['coordinate-system'] = selection;

    clearCoordinateValues(req.session);

    // Redirect based on coords-type
    const coordsType = req.session.data['coords-type'];
    
    switch(coordsType) {
        case 'coords-circle':
            res.redirect('enter-the-coordinates-at-the-centre-point');
            break;
        case 'coords-multiple':
            res.redirect('enter-multiple-coordinates');
            break;
        default:
            // Fallback if coords-type is not set
            res.redirect('how-do-you-want-to-enter-the-coordinates');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What are the coordinates of the centre of the circle?
// TEXT ENTRY - LATITUDE & LONGITUDE
/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/' + version + section + 'enter-the-coordinates-at-the-centre-point', function (req, res) {
    // Clear error flags so red borders don't persist
    req.session.data['errorthispage'] = 'false';
    req.session.data['errortypeone'] = 'false';
    req.session.data['errortypetwo'] = 'false';
  
    // Render the page and preserve query string (e.g. ?fromreview=true)
    res.render(version + section + 'enter-the-coordinates-at-the-centre-point', {
      query: req.query
    });
  });

  
router.post('/' + version + section + 'enter-the-coordinates-at-the-centre-point-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    const latitude = req.session.data['exemption-enter-the-coordinates-at-the-centre-point-latitude-text-input'];
    const longitude = req.session.data['exemption-enter-the-coordinates-at-the-centre-point-longitude-text-input'];

    if (!latitude || latitude.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    if (!longitude || longitude.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypetwo'] = "true";
    }

    if (req.session.data['errorthispage'] === "true") {
        res.redirect('enter-the-coordinates-at-the-centre-point');
        return;
    }

    // Check if we're coming from review page
    if (req.url.includes('fromreview=true')) {
        res.redirect('review-location');
    } else {
        res.redirect('width-of-site');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What is the width of the circle in metres?
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

function validateWidth(req, shapeType) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const width = req.session.data[`exemption-width-of-${shapeType}-number-input`];
    if (!width || width.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return false;
    }
    return true;
}

router.post('/' + version + section + 'width-of-site-router', function (req, res) {
    if (!validateWidth(req, 'site')) {
        res.redirect('width-of-site');
        return;
    }
    req.session.data['siteTitle'] = 'review';
    // If coming from review page, go back to review
    if (req.query.fromreview) {
        res.redirect('review-location');
    } else {
        res.redirect('review-location');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What are the coordinates of the centre of the square?
// TEXT ENTRY - LATITUDE & LONGITUDE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-are-the-coordinates-of-the-square-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    const latitude = req.session.data['exemption-what-are-the-coordinates-of-the-square-latitude-text-input'];
    const longitude = req.session.data['exemption-what-are-the-coordinates-of-the-square-longitude-text-input'];

    if (!latitude || latitude.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    if (!longitude || longitude.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypetwo'] = "true";
    }

    if (req.session.data['errorthispage'] === "true") {
        res.redirect('what-are-the-coordinates-of-the-square');
        return;
    }

    // Check if we're coming from review page
    if (req.url.includes('fromreview=true')) {
        res.redirect('review-location');
    } else {
        res.redirect('width-of-square');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What is the width of the square in metres?
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'width-of-square-router', function (req, res) {
    if (!validateWidth(req, 'square')) {
        res.redirect('width-of-square');
        return;
    }
    req.session.data['siteTitle'] = 'review';
    // If coming from review page, go back to review
    if (req.query.fromreview) {
        res.redirect('review-location');
    } else {
        res.redirect('review-location');
    }
});



  
//////////////////////////////////////////////////////////////////////////////////////////////
// Enter multiple coordinates - stacked
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/' + version + section + 'enter-multiple-coordinates', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errors'] = [];

    // Clear error flags for each field
    for (let i = 1; i <= 5; i++) {
        req.session.data[`error-coordinates-point-${i}-latitude`] = "false";
        req.session.data[`error-coordinates-point-${i}-longitude`] = "false";
    }

    res.render(version + '/' + section + 'enter-multiple-coordinates');
});


router.post('/' + version + section + 'enter-multiple-coordinates-router', function (req, res) {
    // Reset global error states
    req.session.data['errorthispage'] = "false";
    req.session.data['errors'] = [];

    // Get the selected coordinate system
    const system = req.session.data['exemption-what-coordinate-system-radios'];
    const usingOSGB36 = system === "OSGB36 (National Grid)";
    const latLabel = usingOSGB36 ? "Eastings" : "Latitude";
    const longLabel = usingOSGB36 ? "Northings" : "Longitude";

    // Loop over points 1-5
    for (let i = 1; i <= 5; i++) {
        const latKey = `coordinates-point-${i}-latitude`;
        const longKey = `coordinates-point-${i}-longitude`;
        const latVal = req.session.data[latKey];
        const longVal = req.session.data[longKey];

        const latMissing = !latVal || latVal.trim() === "";
        const longMissing = !longVal || longVal.trim() === "";

        const pointLabel = i === 1 ? "start and end point" : `point ${i}`;

        // Check visibility for Points 4 & 5 based on flags
        const isPointVisible = i <= 3 || req.session.data[`coordinates-visible-point-${i}`] === "true";

        // Skip validation for hidden points with no entered data
        if (!isPointVisible && (latMissing && longMissing)) {
            req.session.data[`error-${latKey}`] = "false";
            req.session.data[`error-${longKey}`] = "false";
            continue;
        }

        // If lat or long is missing, mark as an error
        if (latMissing || longMissing) {
            req.session.data['errorthispage'] = "true";
        }

        // Latitude error handling
        if (latMissing) {
            req.session.data[`error-${latKey}`] = "true";
            req.session.data['errors'].push({
                text: `Enter the ${latLabel.toLowerCase()} of ${pointLabel}`,
                anchor: `${latKey}`
            });
        } else {
            req.session.data[`error-${latKey}`] = "false";
        }

        // Longitude error handling
        if (longMissing) {
            req.session.data[`error-${longKey}`] = "true";
            req.session.data['errors'].push({
                text: `Enter the ${longLabel.toLowerCase()} of ${pointLabel}`,
                anchor: `${longKey}`
            });
        } else {
            req.session.data[`error-${longKey}`] = "false";
        }
    }

    // Redirect to the current page if there are errors, else continue to the next page
    if (req.session.data['errorthispage'] === "true") {
        return res.redirect('enter-multiple-coordinates');
    }

    res.redirect('review-location');
});



//////////////////////////////////////////////////////////////////////////////////////////////
// Enter multiple coordinates of the area - side by side
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

// This clears the red borders on the page when you go back to it if there were previous errors
router.get('/' + version + section + 'enter-multiple-coordinates-router-v1', function (req, res) {
    // Clear all coordinate-related error flags
    for (let i = 1; i <= 5; i++) {
      req.session.data[`error-coordinates-point-${i}-latitude`] = '';
      req.session.data[`error-coordinates-point-${i}-longitude`] = '';
    }
  
    req.session.data['errorthispage'] = 'false';
    req.session.data['errors'] = [];
  
    res.render(version + section + 'enter-multiple-coordinates-v1');
  });

  
router.post('/' + version + section + 'enter-multiple-coordinates-router-v1', function (req, res) {
    // Clear any previous error flags for the 6 fields
    req.session.data['error-coordinates-point-1-latitude'] = '';
    req.session.data['error-coordinates-point-1-longitude'] = '';
    req.session.data['error-coordinates-point-2-latitude'] = '';
    req.session.data['error-coordinates-point-2-longitude'] = '';
    req.session.data['error-coordinates-point-3-latitude'] = '';
    req.session.data['error-coordinates-point-3-longitude'] = '';
  
    // Define the points with anchors for each coordinate field
    const points = [
      {
        lat: req.session.data['coordinates-point-1-latitude'],
        lng: req.session.data['coordinates-point-1-longitude'],
        label: 'the start and end point',
        latAnchor: 'coordinates-point-1-latitude',
        lngAnchor: 'coordinates-point-1-longitude'
      },
      {
        lat: req.session.data['coordinates-point-2-latitude'],
        lng: req.session.data['coordinates-point-2-longitude'],
        label: 'point 2',
        latAnchor: 'coordinates-point-2-latitude',
        lngAnchor: 'coordinates-point-2-longitude'
      },
      {
        lat: req.session.data['coordinates-point-3-latitude'],
        lng: req.session.data['coordinates-point-3-longitude'],
        label: 'point 3',
        latAnchor: 'coordinates-point-3-latitude',
        lngAnchor: 'coordinates-point-3-longitude'
      }
    ];
  
    // Build error messages array
    let errors = [];
  
    points.forEach((point) => {
      const latEmpty = !point.lat || point.lat.trim() === '';
      const lngEmpty = !point.lng || point.lng.trim() === '';
  
      if (latEmpty && lngEmpty) {
        errors.push({ text: `Enter the latitude and longitude coordinates of ${point.label}`, anchor: point.latAnchor });
        req.session.data['error-' + point.latAnchor] = 'true';
        req.session.data['error-' + point.lngAnchor] = 'true';
      } else if (latEmpty) {
        errors.push({ text: `Enter the latitude coordinates of ${point.label}`, anchor: point.latAnchor });
        req.session.data['error-' + point.latAnchor] = 'true';
      } else if (lngEmpty) {
        errors.push({ text: `Enter the longitude coordinates of ${point.label}`, anchor: point.lngAnchor });
        req.session.data['error-' + point.lngAnchor] = 'true';
      }
    });
  
    // If there are any errors, set the error flag and store the errors array
    if (errors.length > 0) {
      req.session.data['errorthispage'] = 'true';
      req.session.data['errors'] = errors;
      return res.redirect('enter-multiple-coordinates-v1');
    }
  
    // Otherwise, clear errors and proceed
    req.session.data['errorthispage'] = 'false';
    req.session.data['errors'] = [];
    return res.redirect('review-location');
  });




//////////////////////////////////////////////////////////////////////////////////////////////
// Review Location
// REVIEW PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'review-location-router', function (req, res) {
    // Set the status to completed
    req.session.data['exempt-information-3-status'] = 'completed';
    
    if (req.session.data['camefromcheckanswers'] === 'true') {
        res.redirect('check-answers');
    } else {
        res.redirect('task-list');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Cancel actions
/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/' + version + section + 'cancel-site-details', function (req, res) {
    // Clear all site details data
    clearAllSiteDetails(req.session);
    
    // Redirect to task list
    res.redirect('task-list');
});

// Cancel handler for returning to review-site-details without clearing data
// Used when editing details from the review page
router.get('/' + version + section + 'cancel-to-review', function (req, res) {
    // Simply return to the review page without clearing data
    res.redirect('review-site-details');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// About your activity
// TEXT ENTRY - TEXTAREA
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'about-your-activity-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Validation: Check if the textarea input is blank
    let activityDescription = req.session.data['exemption-about-your-activity-text-area'];

    if (activityDescription == undefined || activityDescription.trim() == "") {
        // Trigger validation for empty input
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('about-your-activity');
    } else {
        // If the user came from check answers, return there
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#about-your-activity');
        } else {
            res.redirect('start-date');
        }
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Public Register
// RADIO BUTTONS WITH CONDITIONAL TEXTAREA
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'public-register-router', function (req, res) {
    // Reset error states
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Clear text area if user changes from Yes to No
    if (req.session.data['exemption-public-register-radios'] === 'No') {
        delete req.session.data['exemption-public-register-text-area'];
    }

    // Check if the radio option is selected
    if (
        req.session.data['exemption-public-register-radios'] == undefined ||
        req.session.data['exemption-public-register-radios'].trim() == ""
    ) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('public-register');
    } 
    // If "Yes" is selected, ensure the textarea is not empty
    else if (
        req.session.data['exemption-public-register-radios'] == "Yes" &&
        (req.session.data['exemption-public-register-text-area'] == undefined ||
         req.session.data['exemption-public-register-text-area'].trim() == "")
    ) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypetwo'] = "true";
        res.redirect('public-register');
    } else {
       // Set the status to completed
       req.session.data['exempt-information-4-status'] = 'completed';
       
       // Check if we need to return to check answers
       if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#public-register');
        } else {
            res.redirect('task-list');
        }
    }
});

// Map router
router.post('/' + version + section + 'map-router', function (req, res) {
    // Set siteTitle
    req.session.data['siteTitle'] = 'review';
    res.redirect('review-location');
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Check answers
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'check-answers-router', function (req, res) {
    req.session.data['applicationSubmitted'] = 'true';
    // Redirect to review location page
    res.redirect('confirmation');
});



//////////////////////////////////////////////////////////////////////////////////////////////
// Delete project router
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'delete-router', function (req, res) {
    req.session.data['deleteProject'] = 'true';
    // Redirect to Your projects page
    res.redirect('home');
});

}