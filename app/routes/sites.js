const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router)
{
    let version = "";
    let section = "sites";


    /////////////////////////////////////////////////////////////////////////////////////////////
    // 'Add site' button has been pressed
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/add-site-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";

        // This takes the user to the first page of the add journey
        res.redirect('coordinates-file-or-not');
    })



    /////////////////////////////////////////////////////////////////////////////////////////////
    // 'File to upload' yes or no
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/coordinates-file-or-not-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['sites-coordinates-file-or-not-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // This page name needs to match the page the user was just on
            res.redirect('site-shape-holes');

        }
        else if (req.session.data['sites-coordinates-file-or-not-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // This page name needs to match the page the user was just on
            res.redirect('THE_NEXT_PAGE_NAME');

        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('coordinates-file-or-not');
        }
    })





    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/site-shape-holes-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['sites-site-shape-holes-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // This page name needs to match the page the user was just on
            res.redirect('THE_NEXT_PAGE_NAME');

        }
        else if (req.session.data['sites-site-shape-holes-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to match the page the user was just on
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('site-shape-holes');
        }
    })






}