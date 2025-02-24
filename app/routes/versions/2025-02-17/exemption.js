const { log } = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {
    let version = "versions/2025-02-17/";
    let section = "exemption/";

// Functions for clearing location data
function clearMapData(session) {
delete session.data['sites-drawn-coordinates'];
}

function clearCoordinateData(session) {
    // Clear circle data
    delete session.data['exemption-what-are-the-coordinates-of-the-circle-latitude-text-input'];
    delete session.data['exemption-what-are-the-coordinates-of-the-circle-longitude-text-input'];
    delete session.data['exemption-width-of-circle-number-input'];
    
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
// What is your full name
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-is-your-name-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Validation: Check if the text input is blank
    if (req.session.data['exemption-what-is-your-name-text-input'] == undefined || req.session.data['exemption-what-is-your-name-text-input'].trim() == "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-is-your-name');
    } else {
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#personal-details');
        } else {
            res.redirect('what-is-your-email-address');
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What is your email address
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-is-your-email-address-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Validation: Check if the text input is blank
    if (req.session.data['exemption-what-is-your-email-address-text-input'] == undefined || req.session.data['exemption-what-is-your-email-address-text-input'].trim() == "") {
        // Trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";

        // Redirect back to the current page
        res.redirect('what-is-your-email-address');
    } else {
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#personal-details');
        } else {
            res.redirect('about-your-project');
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// About your project
// TEXT ENTRY
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'about-your-project-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Check if the text input (Project Title) is blank
    const projectTitle = req.session.data['exemption-about-your-project-text-input'];
    if (!projectTitle || projectTitle.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    // Check if the text area (Project Background) is blank
    const projectBackground = req.session.data['exemption-about-your-project-text-area'];
    if (!projectBackground || projectBackground.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypetwo'] = "true";
    }

    // Redirect based on errors
    if (req.session.data['errorthispage'] === "true") {
        res.redirect('about-your-project');
    } else {
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#about-your-project');
        } else {
            res.redirect('about-the-location-of-the-activity');
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Location details
// How do you want to provide the location?
// About the location of the activity
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'about-the-location-of-the-activity-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['exemption-about-the-location-of-the-activity-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('about-the-location-of-the-activity');
        return;
    }

    // Clear appropriate data when changing methods
    if (selection === "Draw the area on a map") {
        clearCoordinateData(req.session);
        delete req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'];
    } else if (selection === "Enter the coordinates of the area") {
        clearMapData(req.session);
    }

    // Route based on selection
    switch(selection) {
        // change to which-type-of-file to allow it, or stop to not
        case "Upload a file with coordinates of the area":
            res.redirect('which-type-of-file');
            break;
        case "Enter the coordinates of the area":
            res.redirect('how-do-you-want-to-enter-the-coordinates');
            break;
        case "Draw the area on a map":
            res.redirect('map');
            break;
        default:
            res.redirect('about-the-location-of-the-activity');
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
            res.redirect('upload-kml-file');
            break;
        case "Shapefile":
            res.redirect('stop');
            break;
        case "MapInfo TAB":
            res.redirect('stop');
            break;
        default:
            res.redirect('which-type-of-file');
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Upload KML File
// FILE UPLOAD PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'upload-kml-file-router', function (req, res) {
    // Redirect to review location page
    res.redirect('review-location');
});



//////////////////////////////////////////////////////////////////////////////////////////////
// How do you want to enter the coordinates of the area?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

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

    // Clear previous coordinate data when changing methods
    if (selection.includes('circle')) {
        // Clear square data
        delete req.session.data['exemption-what-are-the-coordinates-of-the-square-latitude-text-input'];
        delete req.session.data['exemption-what-are-the-coordinates-of-the-square-longitude-text-input'];
        delete req.session.data['exemption-width-of-square-number-input'];
        
        // Clear multiple coordinates data
        for (let i = 1; i <= 5; i++) {
            delete req.session.data[`coordinates-point-${i}-latitude`];
            delete req.session.data[`coordinates-point-${i}-longitude`];
        }
    } else if (selection.includes('square')) {
        // Clear circle data
        delete req.session.data['exemption-what-are-the-coordinates-of-the-circle-latitude-text-input'];
        delete req.session.data['exemption-what-are-the-coordinates-of-the-circle-longitude-text-input'];
        delete req.session.data['exemption-width-of-circle-number-input'];
        
        // Clear multiple coordinates data
        for (let i = 1; i <= 5; i++) {
            delete req.session.data[`coordinates-point-${i}-latitude`];
            delete req.session.data[`coordinates-point-${i}-longitude`];
        }
    } else if (selection.includes('multiple')) {
        // Clear circle data
        delete req.session.data['exemption-what-are-the-coordinates-of-the-circle-latitude-text-input'];
        delete req.session.data['exemption-what-are-the-coordinates-of-the-circle-longitude-text-input'];
        delete req.session.data['exemption-width-of-circle-number-input'];
        
        // Clear square data
        delete req.session.data['exemption-what-are-the-coordinates-of-the-square-latitude-text-input'];
        delete req.session.data['exemption-what-are-the-coordinates-of-the-square-longitude-text-input'];
        delete req.session.data['exemption-width-of-square-number-input'];
    }

    switch(selection) {
        case "Enter the centre point of a circle and its width":
            res.redirect('what-are-the-coordinates-of-the-circle');
            break;
        case "Enter the centre point of a square and its width":
            res.redirect('what-are-the-coordinates-of-the-square');
            break;
        case "Enter multiple coordinates of the area":
            res.redirect('enter-multiple-coordinates');
            break;
        default:
            res.redirect('how-do-you-want-to-enter-the-coordinates');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What are the coordinates of the centre of the circle?
// TEXT ENTRY - LATITUDE & LONGITUDE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-are-the-coordinates-of-the-circle-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    const latitude = req.session.data['exemption-what-are-the-coordinates-of-the-circle-latitude-text-input'];
    const longitude = req.session.data['exemption-what-are-the-coordinates-of-the-circle-longitude-text-input'];

    if (!latitude || latitude.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    if (!longitude || longitude.trim() === "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypetwo'] = "true";
    }

    if (req.session.data['errorthispage'] === "true") {
        res.redirect('what-are-the-coordinates-of-the-circle');
        return;
    }

    // Check if we're coming from review page
    if (req.url.includes('fromreview=true')) {
        res.redirect('review-location');
    } else {
        res.redirect('width-of-circle');
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

router.post('/' + version + section + 'width-of-circle-router', function (req, res) {
    if (!validateWidth(req, 'circle')) {
        res.redirect('width-of-circle');
        return;
    }
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
    // If coming from review page, go back to review
    if (req.query.fromreview) {
        res.redirect('review-location');
    } else {
        res.redirect('review-location');
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Enter multiple coordinates of the area
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'enter-multiple-coordinates-router', function (req, res) {
    // If coming from review page, go back to review
    if (req.query.fromreview) {
        res.redirect('review-location');
    } else {
        res.redirect('review-location');
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Review Location
// REVIEW PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'review-location-router', function (req, res) {
    if (req.session.data['camefromcheckanswers'] === 'true') {
        res.redirect('check-answers');
    } else {
        res.redirect('about-your-activity');
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

///////////////////////////////////////////////////////////////////////////////////////////////
// Start Date
// DATE ENTRY
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'start-date-router', function (req, res) {
    // Reset error flags
    req.session.data['errorthispage'] = "false";

    // Retrieve the values for day, month, and year
    const day = req.session.data['exemption-start-date-date-input-day'];
    const month = req.session.data['exemption-start-date-date-input-month'];
    const year = req.session.data['exemption-start-date-date-input-year'];

    // Validation: Check if any field is missing
    if (!day || !month || !year) {
        // Trigger error and redirect back
        req.session.data['errorthispage'] = "true";
        res.redirect('start-date');
    } else {
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#about-your-activity');
        } else {
            res.redirect('end-date');
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////
// End Date
// DATE ENTRY
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'end-date-router', function (req, res) {
    // Reset error flags
    req.session.data['errorthispage'] = "false";

    // Retrieve the values for day, month, and year
    const day = req.session.data['exemption-end-date-date-input-day'];
    const month = req.session.data['exemption-end-date-date-input-month'];
    const year = req.session.data['exemption-end-date-date-input-year'];

    // Validation: Check if any field is missing
    if (!day || !month || !year) {
        // Trigger error and redirect back
        req.session.data['errorthispage'] = "true";
        res.redirect('end-date');
    } else {
        // Check if we need to return to check answers
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#about-your-activity');
        } else {
            res.redirect('public-register');
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
       // Check if we need to return to check answers
       if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect('check-answers#public-register');
        } else {
            res.redirect('check-answers');
        }
    }
});

}