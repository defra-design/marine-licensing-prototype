const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router)
{
    let version = "versions/2024-02-26/";
    let section = "sites/";


    /////////////////////////////////////////////////////////////////////////////////////////////
    // 'Add site' button has been pressed
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'add-site-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";

        req.session.data['sites-coordinates-file-or-not-radios-yes-no'] = "";

        // This takes the user to the first page of the add journey
        res.redirect('coordinates-file-or-not');
    })



    /////////////////////////////////////////////////////////////////////////////////////////////
    // 'File to upload' yes or no
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'coordinates-file-or-not-router', function (req, res)
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
            res.redirect('shape-type');

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





    /////////////////////////////////////////////////////////////////////////////////////////////
    // Does the area uploaded have holes in it
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'site-shape-holes-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['sites-site-shape-holes-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('upload-holes');
            }
            else
            {
                // This page name needs to match the page the user was just on
                res.redirect('upload-perimeter');
            }
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
                res.redirect('upload-perimeter');
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



    /////////////////////////////////////////////////////////////////////////////////////////////
    // Upload the perimeter polygon file
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'upload-perimeter-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['sites-upload-perimeter-file-upload'] == undefined || req.session.data['sites-upload-perimeter-file-upload'] == "")
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('upload-perimeter');
        }
        else
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else if(req.session.data['sites-site-shape-holes-radios-yes-no'] == "Yes")
            {
                // if the user selected yes to uploading holes then go to holes upload
                res.redirect('upload-holes');
            }
            else
            {
                // go to the success page
                res.redirect('check-answers');
            }
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // Upload the holes in the site in a file
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'upload-holes-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['sites-upload-holes-file-upload'] == undefined || req.session.data['sites-upload-holes-file-upload'] == "")
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('upload-holes');
        }
        else
        {
            // Continue to the next page
            res.redirect('check-answers');
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // Select a shape
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'shape-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['sites-shape-type-radios'] == "Circle")
        {
            req.session.data['sites-circle-centre-coordinates-latitude-text-input'] = "";
            req.session.data['sites-circle-centre-coordinates-longitude-text-input'] = "";
            req.session.data['sites-circle-width-number-input'] = "";

            // Continue to the next page
            res.redirect('circle-centre-coordinates');
        }
        else if (req.session.data['sites-shape-type-radios'] == "Square")
        {
            req.session.data['sites-square-centre-coordinates-latitude-text-input'] = "";
            req.session.data['sites-square-centre-coordinates-longitude-text-input'] = "";
            req.session.data['sites-square-width-number-input'] = "";

            // Continue to the next page
            res.redirect('square-centre-coordinates');
        }
        else if (req.session.data['sites-shape-type-radios'] == "Another shape")
        {
            // Continue to the next page
            res.redirect('draw-a-shape');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('shape-type');
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // Circle - Enter centre coordinates
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'circle-centre-coordinates-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if first field is blank
        if (req.session.data['sites-circle-centre-coordinates-latitude-text-input'] == undefined || req.session.data['sites-circle-centre-coordinates-latitude-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('circle-centre-coordinates');
        }
        // Validation check if second field is blank
        else if (req.session.data['sites-circle-centre-coordinates-longitude-text-input'] == undefined || req.session.data['sites-circle-centre-coordinates-longitude-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('circle-centre-coordinates');
        }
        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to match the page the user was just on
                res.redirect('circle-width');
            }
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // Circle - Enter width
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'circle-width-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";


        // Validation check if field is blank
        if (req.session.data['sites-circle-width-number-input'] == undefined || req.session.data['sites-circle-width-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('circle-width');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['sites-circle-width-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['sites-circle-width-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('circle-width');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );

                if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('circle-width');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('circle-width');
                }

                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['sites-circle-width-number-input'] = numberinputfloat.toLocaleString();

                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('check-answers');
                    }
                    else
                    {
                        // This page name needs to match the page the user was just on
                        res.redirect('check-answers');
                    }
                }
            }

        }
    })



    /////////////////////////////////////////////////////////////////////////////////////////////
    // Square - Enter centre coordinates
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'square-centre-coordinates-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if first field is blank
        if (req.session.data['sites-square-centre-coordinates-latitude-text-input'] == undefined || req.session.data['sites-square-centre-coordinates-latitude-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('square-centre-coordinates');
        }
        // Validation check if second field is blank
        else if (req.session.data['sites-square-centre-coordinates-longitude-text-input'] == undefined || req.session.data['sites-square-centre-coordinates-longitude-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('square-centre-coordinates');
        }
        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to match the page the user was just on
                res.redirect('square-width');
            }
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // Square - Enter width
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'square-width-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";


        // Validation check if field is blank
        if (req.session.data['sites-square-width-number-input'] == undefined || req.session.data['sites-square-width-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('square-width');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['sites-square-width-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['sites-square-width-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('square-width');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );

                if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('square-width');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('square-width');
                }

                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['sites-square-width-number-input'] = numberinputfloat.toLocaleString();

                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('check-answers');
                    }
                    else
                    {
                        // This page name needs to match the page the user was just on
                        res.redirect('check-answers');
                    }
                }
            }

        }
    })


}

