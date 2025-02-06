const { log } = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {
	let version = "versions/2025-01-27/";
	let section = "exemption/";


//// logging	
	router.use((req, res, next) => {
		const log = {
		  method: req.method,
		  url: req.originalUrl,
		  data: req.session.data
		}
		console.log(JSON.stringify(log, null, 2))
	  next()
	 })

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
        // Trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";

        // Redirect back to the current page
        res.redirect('what-is-your-name');
    } else {
        // No errors: Continue to the next page
        res.redirect('what-is-your-email-address');
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
        // No errors: Continue to the next page
        res.redirect('about-your-project');
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
        res.redirect('about-the-location-of-the-activity');
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
        res.redirect('how-do-you-want-to-enter-the-coordinates');
    } else if (req.session.data['exemption-about-the-location-of-the-activity-radios'] == "Draw the area on a map") {
        res.redirect('stop');
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
    } else {
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
    } else {
        // No errors: Continue to the next page
        res.redirect('review-location');
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
        // No errors: Continue to the next page
        res.redirect('start-date');
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
        // No errors: Proceed to the next page
        res.redirect('end-date');
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
        // No errors: Proceed to the next page
        res.redirect('public-register');
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
        // No errors, redirect to the next page
        res.redirect('check-answers');
    }
});

}