const { log } = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {
    let version = "versions/mvp/";
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

    // If we reach here, both dates have been fully entered
    req.session.data['exempt-information-2-status'] = 'completed';

    // Check if we need to return to the check answers page
    if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        return res.redirect('check-answers#about-your-activity');
    }

    // Otherwise, go to the task list
    return res.redirect('task-list');
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Activity details
// TEXT ENTRY (TEXTAREA)
/////////////////////////////////////////////////////////////////////////////////////////////
router.get('/' + version + section + 'activity-details', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errors'] = [];

    res.render(version + '/' + section + 'activity-details');
});

router.post('/' + version + section + 'about-your-activity-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const activityDetails = req.session.data['exemption-activity-details-text-area'];
    if (!activityDetails || activityDetails.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect('activity-details');
    }

    // Mark as completed for the task list
    req.session.data['exempt-information-5-status'] = 'completed';

    // Redirect to check answers if returning from there
    if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        return res.redirect('check-answers#activity-details');
    }

    // Otherwise go to task list
    res.redirect('task-list');
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
            res.redirect('how-do-you-want-to-enter-the-coordinates');
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

router.post('/' + version + section + 'upload-file-router', function (req, res) {
    req.session.data['siteTitle'] = 'review';
    // Redirect to review location page
    res.redirect('review-location');
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
    // Get the project to delete from the query parameter
    const projectToDelete = req.query.project;
    
    if (projectToDelete === 'user') {
        // Delete the user's project
        req.session.data['isUserProjectDeleted'] = 'true';
    } else if (projectToDelete === 'tower-bridge') {
        // Delete the Tower Bridge project
        req.session.data['isTowerBridgeDeleted'] = 'true';
    } else {
        // Fallback to old behavior for backward compatibility
        req.session.data['deleteProject'] = 'true';
    }
    
    // Redirect to Your projects page
    res.redirect('home');
});

// Home page initialization - ensure project deletion flags are properly set
router.get('/' + version + section + 'home', function (req, res) {
    // Initialize flags if they don't exist already
    if (req.session.data['isUserProjectDeleted'] === undefined) {
        req.session.data['isUserProjectDeleted'] = 'false';
    }
    
    if (req.session.data['isTowerBridgeDeleted'] === undefined) {
        req.session.data['isTowerBridgeDeleted'] = 'false';
    }
    
    if (req.session.data['deleteProject'] === undefined) {
        req.session.data['deleteProject'] = 'false';
    }
    
    // Render the home page
    res.render(version + section + 'home');
});

}