const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router)
{
    let version = "versions/2025-01-27/";
    let section = "check/";


/////////////////////////////////////////////////////////////////////////////////////////////
// Where will the activity take place? 
// COMPLEX PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////
router.post('/' + version + section + 'where-will-the-activity-take-place-router', function (req, res)
{
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // If In the sea, over the sea, or on or under the seabedd was selected, continue to next page
    if (req.session.data['check-where-will-the-activity-take-place-radios'] == "In the sea, over the sea, or on or under the seabed")
    {
        // This page name needs to match the page the user was just on
        res.redirect('in-which-waters');    
    }
    else if (req.session.data
    ['check-where-will-the-activity-take-place-radios'] == "Somewhere else")
    {
        // This page name needs to match the page the user was just on
        res.redirect('marine-licence-not-required-sea');
    }
    else
    {
        // Trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";

        // This page name needs to match the page the user was just on
        res.redirect('where-will-the-activity-take-place');
    }
})

////////////////////////////////////////////////////////////////////////////////////////////
// The waters in which the activity will take place 
// COMPLEX PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////
router.post('/' + version + section + 'in-which-waters-router', function (req, res)
{
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // If English waters or Northern Ireland offshore waters was selected, continue to next page
    if (req.session.data['check-in-which-waters-radios'] == "English waters or Northern Ireland offshore waters")
    {
        // This page name needs to match the page the user was just on
        res.redirect('what-type-of-activity-will-take-place');    
    }
     // If Other UK waters - Wales, Scotland or Northern Ireland (excluding Northern Ireland offshore waters) was selected, continue to next page
     
     else if (req.session.data['check-in-which-waters-radios'] == "Other UK waters - Wales, Scotland or Northern Ireland (excluding Northern Ireland offshore waters)")
        {
            // This page name needs to match the page the user was just on
            res.redirect('marine-licence-not-required-sea');    
        }
        
    else if (req.session.data
    ['check-in-which-waters-radios'] == "Somewhere else in the world")
    {
        // This page name needs to match the page the user was just on
        res.redirect('stop');
    }
    else
    {
        // Trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";

        // This page name needs to match the page the user was just on
        res.redirect('in-which-waters');
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////
// what-type-of-activity-will-take-place
// COMPLEX PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////
router.post('/' + version + section + 'what-type-of-activity-will-take-place-router', function (req, res)
{
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // If Construction was selected, continue to next page
    if (
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Construction" ||
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Dredging"
    ) {
        // Redirect to What does the deposit activity relate to
        res.redirect('stop');
    }
    else if (
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Deposit of a substance or object" ||
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Removal of a substance or object" ||
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Incineration of a substance or object"
    ) {
        // Redirect to How the substance or object will be deposited 
        res.redirect('how-the-substance-or-object-will-be-deposited');
    }
    else if (
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Use of an explosive substance" ||
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Sinking of a vessel or floating container (also known as scuttling)"
    ) {
        // Redirect to Marine licence is required 
        res.redirect('stop');
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// How the substance or object will be deposited 
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + 'how-the-substance-or-object-will-be-deposited-router', function (req, res) {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
    
        if (req.session.data['check-how-the-substance-or-object-will-be-deposited-radios'] == "Yes") {
            res.redirect('start');
        } else if (req.session.data['check-how-the-substance-or-object-will-be-deposited-radios'] == "No") {
            res.redirect('stop');
        } else {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";
            res.redirect('how-the-substance-or-object-will-be-deposited');
        }
    });

}