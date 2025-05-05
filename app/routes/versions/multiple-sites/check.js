const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router)
{
    let version = "versions/multiple-sites/";
    let section = "check/";


//////////////////////////////////////////////////////////////////////////////////////////////
// Where will the activity take place?
// COMPLEX PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'where-will-the-activity-take-place-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-where-will-the-activity-take-place-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('where-will-the-activity-take-place');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "In or over the sea":
        case "On or under the seabed":
        case "In a river, estuary, or channel, up to the normal tidal limit at mean high water spring tide":
        case "Waters in a closed area, such as a dock, where seawater can flow in or out":
            res.redirect('in-which-waters');
            break;
        case "Somewhere else":
            res.redirect('marine-licence-not-required-sea');
            break;
        default:
            res.redirect('where-will-the-activity-take-place');
    }
});

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
        res.redirect('purpose-of-construction');
    }
    else if (req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Dredging") {
        res.redirect('what-does-the-dredging-activity-involve');
    }
    else if (req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Incineration of a substance or object") {
        res.redirect('stop');
    }
    else if (req.session.data['check-what-type-of-activity-will-take-place-radios'] == "Removal of a substance or object") {
        res.redirect('how-you-will-carry-out-the-removal');
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
// Not used - page has been changed to the one below
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
// How you will carry out the removal?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'how-you-will-carry-out-the-removal-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-how-you-will-carry-out-the-removal-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('how-you-will-carry-out-the-removal');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "Yes":
            res.redirect('will-substance-object-be-removed-from-seabed');
            break;
        case "No":
            res.redirect('stop');
            break;
        default:
            res.redirect('how-you-will-carry-out-the-removal');
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
        req.session.data['exemption'] = "sample-notification";
        res.redirect('exemption');
    } else {
        // If no selection is made, show validation error and reload the page
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('marine-protected-areas');
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////
// PONTOON CONSTRUCTION JOURNEY
/////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// What is the purpose of your construction activity? 
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'purpose-of-construction-router', function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-purpose-of-construction-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('purpose-of-construction');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "To build or make something new":
            res.redirect('what-does-construction-activity-involve');
            break;
        case "Maintenance of existing structures and assets":
            res.redirect('stop');
            break;
        default:
            res.redirect('purpose-of-construction');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// What does the construction activity involve?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'what-does-construction-activity-involve-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-what-does-construction-activity-involve-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('what-does-construction-activity-involve');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "Moorings or aids to navigation":
            res.redirect('stop');
            break;
        case "Pontoons":
            res.redirect('who-will-carry-out-activity');
            break;
        case "Flood or flood risk":
            res.redirect('stop');
            break;
        case "Cables":
            res.redirect('stop');
            break;
        case "Pipelines":
            res.redirect('stop');
            break;
        case "Something else":
            res.redirect('stop');
            break;
        default:
            res.redirect('what-does-construction-activity-involve');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Who will carry out the activity?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'who-will-carry-out-activity-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-who-will-carry-out-activity-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('who-will-carry-out-activity');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "Yes":
            res.redirect('stop');
            break;
        case "No":
            res.redirect('will-activity-take-place-harbour-authority-area');
            break;
        default:
            res.redirect('who-will-carry-out-activity');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Will the activity take place in a harbour authority area?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'will-activity-take-place-harbour-authority-area-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-will-activity-take-place-harbour-authority-area'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('will-activity-take-place-harbour-authority-area');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "Yes":
            res.redirect('do-you-have-harbour-authority-consent');
            break;
        case "No":
            res.redirect('stop');
            break;
        default:
            res.redirect('will-activity-take-place-harbour-authority-area');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Do you have harbour authority consent to build a pontoon?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'do-you-have-harbour-authority-consent-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-do-you-have-harbour-authority-consent'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('do-you-have-harbour-authority-consent');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "Yes":
            res.redirect('pontoon-deck-larger-than-30');
            break;
        case "Not yet, but I will have it before starting":
            res.redirect('pontoon-deck-larger-than-30');
            break;
            case "No, I've checked, and it's not required":
                res.redirect('stop');
                break;
        default:
            res.redirect('do-you-have-harbour-authority-consent');
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////
// Will the pontoon deck be larger than 30 square metres when finished?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + 'pontoon-deck-larger-than-30-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-pontoon-deck-larger-than-30-radios'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('pontoon-deck-larger-than-30');
        return;
    }

    // Route based on selection
    switch(selection) {
        case "Yes":
            res.redirect('stop');
            break;
        case "No":
            res.redirect('10-pontoons-or-more');
            break;
        default:
            res.redirect('pontoon-deck-larger-than-30');
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Will 10 or more pontoons be built or deposited at the location in the 6 months before the activity begins?
// PAGE OF RADIO BUTTONS
/////////////////////////////////////////////////////////////////////////////////////////////

router.post('/' + version + section + '10-pontoons-or-more-router', function (req, res) {
    // Turn errors off by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const selection = req.session.data['check-10-pontoons-or-more'];

    if (!selection) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        res.redirect('10-pontoons-or-more');
        return;
    }

    // Set exemption value and redirect based on selection
    if (selection === "Yes") {
        req.session.data['exemption'] = "pontoon-approval";
        res.redirect('stop');
    } else if (selection === "No") {
        req.session.data['exemption'] = "pontoon-notification";
        res.redirect('exemption');
    }
});
}