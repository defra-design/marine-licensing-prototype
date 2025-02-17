const { log } = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {
	let version = "versions/2025-01-27/";
	let section = "exemption/";


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
// About the location of the activity
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'about-the-location-of-the-activity-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['exemption-about-the-location-of-the-activity-radios'] == "Upload a file with coordinates of the area") {
        res.redirect('stop');
    } else if (req.session.data['exemption-about-the-location-of-the-activity-radios'] == "Enter the coordinates of the area") {
        // Always need to go through all steps when changing location method
        req.session.data['isMultiStepChange'] = true;
        res.redirect('how-do-you-want-to-enter-the-coordinates');
    } else if (req.session.data['exemption-about-the-location-of-the-activity-radios'] == "Draw the area on a map") {
        if (req.session.data['camefromcheckanswers'] === 'true') {
            req.session.data['startedFromCheckAnswers'] = true;
        }
        res.redirect('map');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('about-the-location-of-the-activity');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// How do you want to enter the coordinates of the area?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'how-do-you-want-to-enter-the-coordinates-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'] == "Enter the centre point of a circle and its width") {
        res.redirect('stop');
    } else if (req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'] == "Enter the centre point of a square and its width") {
        // Always need to go through all steps when changing coordinate entry method
        req.session.data['isMultiStepChange'] = true;
        res.redirect('what-are-the-coordinates-of-the-square');
    } else if (req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'] == "Enter multiple coordinates of the area") {
        res.redirect('stop');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('how-do-you-want-to-enter-the-coordinates');
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

    let latitude = req.session.data['exemption-what-are-the-coordinates-of-the-square-latitude-text-input'];
    let longitude = req.session.data['exemption-what-are-the-coordinates-of-the-square-longitiude-text-input'];

    if (latitude == undefined || latitude.trim() == "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
    }

    if (longitude == undefined || longitude.trim() == "") {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypetwo'] = "true";
    }

    if (req.session.data['errorthispage'] == "true") {
        res.redirect('what-are-the-coordinates-of-the-square');
        return;
    }

    if (req.session.data['isMultiStepChange']) {
        // Part of multi-step change, continue to width
        res.redirect('width-of-square');
    } else if (req.session.data['camefromcheckanswers'] === 'review') {
        // Direct change from review
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('review-location');
    } else if (req.session.data['camefromcheckanswers'] === 'true') {
        // Direct change from check answers
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('check-answers#location-details');
    } else {
        // Normal flow
        res.redirect('width-of-square');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What is the width of the square in metres?
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'width-of-square-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Validation: Check if the text input is blank or not a number
    let squareWidth = req.session.data['exemption-width-of-square-number-input'];

    if (squareWidth == undefined || squareWidth.trim() == "") {
        // Trigger validation for empty input
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('width-of-square');
        return;
    }

    // Validation passed, handle the routing
    if (req.session.data['isMultiStepChange']) {
        // Part of multi-step change, go to review
        res.redirect('review-location');
    } else if (req.session.data['camefromcheckanswers'] === 'true' && !req.session.data['startedFromCheckAnswers']) {
        // Direct change from check answers
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('check-answers#location-details');
    } else if (req.session.data['camefromcheckanswers'] === 'review' && !req.session.data['startedFromReview']) {
        // Direct change from review
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('review-location');
    } else {
        // Part of longer journey or normal flow
        res.redirect('review-location');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Review Location
// REVIEW PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'review-location-router', function (req, res) {
    if (req.session.data['startedFromCheckAnswers'] || (req.session.data['isMultiStepChange'] && req.session.data['camefromcheckanswers'] === 'true')) {
        // Clear all journey flags
        req.session.data['startedFromCheckAnswers'] = false;
        req.session.data['isMultiStepChange'] = false;
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('check-answers');
    } else {
        res.redirect('about-your-activity');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Review Map
// REVIEW PAGE
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'review-map-router', function (req, res) {
    if (req.session.data['startedFromCheckAnswers'] || (req.session.data['isMultiStepChange'] && req.session.data['camefromcheckanswers'] === 'true')) {
        // Clear all journey flags
        req.session.data['startedFromCheckAnswers'] = false;
        req.session.data['isMultiStepChange'] = false;
        req.session.data['camefromcheckanswers'] = false;
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