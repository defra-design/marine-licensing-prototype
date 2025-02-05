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
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'about-your-project-router', function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Validation: Check if the text input is blank
    if (
        req.session.data['exemption-about-your-project-text-input'] == undefined ||
        req.session.data['exemption-about-your-project-text-input'].trim() == ""
    ) {
        // Trigger error and reload page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('about-your-project');
    } else {
        // No error: continue to next page
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

    if (req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'] == "Enter the centre of a circular area and it's width") {
        res.redirect('stop');
    } else if (req.session.data['exemption-how-do-you-want-to-enter-the-coordinates-radios'] == "Enter the centre of a square and it's width") {
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

//////////////////////////////////////////////////////////////////////////////////////////////
// Start Date
// DATE ENTRY
//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'start-date-router', function (req, res) {
    // Reset all error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false"; // All fields empty
    req.session.data['errortypetwo'] = "false"; // Day missing
    req.session.data['errortypethree'] = "false"; // Month missing
    req.session.data['errortypefour'] = "false"; // Year missing
    req.session.data['errortypefive'] = "false"; // Day + Month missing
    req.session.data['errortypesix'] = "false"; // Day + Year missing
    req.session.data['errortypeseven'] = "false"; // Month + Year missing

    // Retrieve input values
    const day = req.session.data['exemption-start-date-date-input-day'];
    const month = req.session.data['exemption-start-date-date-input-month'];
    const year = req.session.data['exemption-start-date-date-input-year'];

    // Detect missing values
    const dayEmpty = !day || day.trim() === "";
    const monthEmpty = !month || month.trim() === "";
    const yearEmpty = !year || year.trim() === "";

    // Set error flags based on missing values
    if (dayEmpty && monthEmpty && yearEmpty) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true"; // All fields missing
    } else {
        if (dayEmpty && monthEmpty) {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypefive'] = "true"; // Day and Month missing
        }
        if (dayEmpty && yearEmpty) {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypesix'] = "true"; // Day and Year missing
        }
        if (monthEmpty && yearEmpty) {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeseven'] = "true"; // Month and Year missing
        }
        if (dayEmpty) {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true"; // Day missing
        }
        if (monthEmpty) {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true"; // Month missing
        }
        if (yearEmpty) {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypefour'] = "true"; // Year missing
        }
    }

    // Redirect based on errors
    if (req.session.data['errorthispage'] === "true") {
        res.redirect('start-date');
    } else {
        res.redirect('next-page');
    }
});

}