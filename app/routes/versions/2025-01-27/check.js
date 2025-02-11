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

    // If Yes was selected, continue to next page
    if (req.session.data['check-where-will-the-activity-take-place-radios'] == "Yes")
    {
        // This page name needs to match the page the user was just on
        res.redirect('in-which-waters');    
    }
    else if (req.session.data
    ['check-where-will-the-activity-take-place-radios'] == "No")
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
            res.redirect('stop');    
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
router.post('/' + version + section + 'what-type-of-activity-will-take-place-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Construction") {
        res.redirect('stop');
    }
    else if (req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Dredging") {
        res.redirect('what-does-the-dredging-activity-involve');
    }
    else if (req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Incineration of a substance or object") {
        res.redirect('stop');
    }
    else if (req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Removal of a substance or object") {
        res.redirect('will-the-removal-be-from-a-vehicle');
    }
    else if (
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Deposit of a substance or object"
    ) {
        res.redirect('how-the-substance-or-object-will-be-deposited');
    }
    else if (
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Use of an explosive substance" ||
        req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Sinking of a vessel or floating container (also known as scuttling)"
    ) {
        res.redirect('stop');
    }
    else {
        // If no valid selection is made, show validation error
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-type-of-activity-will-take-place');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What does the dredging activity involve?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-does-the-dredging-activity-involve-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    let userSelection = req.session.data['check-what-does-the-dredging-activity-involve-radios'];

    if (!userSelection) {
        // Trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-does-the-dredging-activity-involve');
    } else if (userSelection == "Navigational dredging") {
        res.redirect('stop');
    } else if (userSelection == "Shellfish propagation and cultivation") {
        res.redirect('stop');
    } else if (userSelection == "Coastal protection, drainage, or flood defence") {
        res.redirect('stop');
    } else if (userSelection == "Emergency work or safety and training") {
        res.redirect('stop');
    } else if (userSelection == "Licensed deep-sea mining") {
        res.redirect('stop');
    } else if (userSelection == "Scheduled works authorised under the Crossrail Act 2008") {
        res.redirect('stop');
    } else if (userSelection == "Something else") {
        res.redirect('stop');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// How the substance or object will be deposited 
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + 'how-the-substance-or-object-will-be-deposited-router', function (req, res) {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
    
        if (req.session.data['check-how-the-substance-or-object-will-be-deposited-radios'] == "Yes") {
            res.redirect('what-does-the-deposit-activity-relate-to');
        } else if (req.session.data['check-how-the-substance-or-object-will-be-deposited-radios'] == "No") {
            res.redirect('stop');
        } else {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";
            res.redirect('how-the-substance-or-object-will-be-deposited');
        }
    });

//////////////////////////////////////////////////////////////////////////////////////////////
// What does the deposit activity relate to?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

    router.post('/' + version + section + 'what-does-the-deposit-activity-relate-to-router', function (req, res) {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
    
        if (req.session.data['check-what-does-the-deposit-activity-relate-to-radios'] == "Scientific investigation or research") {
            res.redirect('stop');
        } else if (req.session.data['check-what-does-the-deposit-activity-relate-to-radios']) {
            res.redirect('stop');
        } else {
            // Trigger validation if no option is selected
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";
            res.redirect('what-does-the-deposit-activity-relate-to');
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////
// Will the removal be from a vehicle, vessel, aircraft, marine structure, or floating container?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'will-the-removal-be-from-a-vehicle-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['check-will-the-removal-be-from-a-vehicle-radios'] == "Yes") {
        res.redirect('will-substance-object-be-removed-from-seabed');
    } else if (req.session.data['check-will-the-removal-be-from-a-vehicle-radios'] == "No") {
        res.redirect('stop');
    } else {
        // If no selection is made, trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('will-the-removal-be-from-a-vehicle');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Will the substance or object to be removed, be removed from the 'Seabed'?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'will-substance-object-be-removed-from-seabed-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['check-will-substance-object-be-removed-from-seabed-radios'] == "Yes") {
        res.redirect('what-does-the-removal-activity-relate-to'); 
    } else if (req.session.data['check-will-substance-object-be-removed-from-seabed-radios'] == "No") {
        res.redirect('stop'); 
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('will-substance-object-be-removed-from-seabed');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What does the removal activity relate to?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-does-the-removal-activity-relate-to-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Fishing or shellfish propagation and cultivation") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Markers, moorings or aids to navigation") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Pontoons") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Scientific research") {
        res.redirect('what-does-the-scientific-activity-relate-to');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Maintenance of existing structures or assets") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Litter or dead animals") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Obstructions, danger to navigation, or accidental deposits") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Emergency or safety and training") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-removal-activity-relate-to-radios'] == "Something else") {
        res.redirect('what-does-the-something-else-removal-activity-relate-to');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-does-the-removal-activity-relate-to');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What does the something else removal activity relate to?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-does-the-something-else-removal-activity-relate-to-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    let userSelection = req.session.data['check-what-does-the-something-else-removal-activity-relate-to-radios'];

    if (!userSelection) {
        // Trigger validation and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-does-the-something-else-removal-activity-relate-to');
    } else if (userSelection == "Defence activities") {
        res.redirect('stop');
    } else if (userSelection == "Licensed deep-sea diving") {
        res.redirect('stop');
    } else if (userSelection == "Scheduled works authorised under the Crossrail Act 2008") {
        res.redirect('stop');
    } else if (userSelection == "Dismantling ships") {
        res.redirect('stop');
    } else if (userSelection == "Exercising rights of foreign vessels") {
        res.redirect('stop');
    } else if (userSelection == "Air accident investigation") {
        res.redirect('stop');
    } else if (userSelection == "Something else") {
        res.redirect('stop');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What does the scientific research activity relate to?
// Now page heading is: What will be removed?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-does-the-scientific-activity-relate-to-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['check-what-does-the-scientific-activity-relate-to-radios'] == "Scientific instruments and associated equipment") {
        res.redirect('stop');
    } else if (req.session.data['check-what-does-the-scientific-activity-relate-to-radios'] == "Samples for testing and analysis") {
        res.redirect('will-the-volume');
    } else if (req.session.data['check-what-does-the-scientific-activity-relate-to-radios'] == "Something else") {
        res.redirect('stop'); // Future-proofed
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-does-the-scientific-activity-relate-to');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Is the purpose of the activity to take a sample of material for testing or analysis?
// This page has been DELETED
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'purpose-of-the-activity-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['check-purpose-of-the-activity-radios'] == "Yes") {
        res.redirect('will-the-volume');
    } else if (req.session.data['check-purpose-of-the-activity-radios'] == "No") {
        res.redirect('stop');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('purpose-of-the-activity');
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////
// Will the sample to be removed have a volume of 1 cubic metre or less?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'will-the-volume-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['will-the-volume-radios'] == "Yes") {
        res.redirect('is-the-activity-likely-to-cause-obstruction');
    } else if (req.session.data['will-the-volume-radios'] == "No") {
        res.redirect('stop');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('will-the-volume');
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
// Is the activity likely to cause an obstruction or danger to navigation?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'is-the-activity-likely-to-cause-obstruction-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['is-the-activity-likely-to-cause-obstruction-radios'] == "Yes") {
        res.redirect('stop');
    } else if (req.session.data['is-the-activity-likely-to-cause-obstruction-radios'] == "No") {
        res.redirect('marine-protected-areas');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('is-the-activity-likely-to-cause-obstruction');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Marine Protected Areas (MPAs)
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'marine-protected-areas-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    if (req.session.data['check-marine-protected-areas-radios'] == "Yes") {
        res.redirect('stop');
    } else if (req.session.data['check-marine-protected-areas-radios'] == "No") {
        res.redirect('exemption');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('marine-protected-areas');
    }
});

}