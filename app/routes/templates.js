const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {

    /*
        Setting a version in each routes.js file
        This allows you to make new version of the prototype and have the old versions still work
        This is done by making a copy of the routes files and updating just this version variable for the new version
     */
    let version = "";


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "templates";


    /*
        Each of the template html pages has corresponding routing javascript.
        This checks for errors and reloads the page showing the error.
        If there are no errors it goes to the next page or back to the 'check your answers' page
        ***  How to use this ***
        1. Copy the correct 'router.post ...' which matches the template you're using
        2. Paste those lines into the routes file for the section of your service you're working on.
        3. On that pasted javascript then use 'Find and replace' to replace the page name with whatever you named the html page/file.
            e.g replace 'PAGENAME_RADIOS' with 'select-country'
        4. On that pasted javascript use 'Find and replace' to replace the next page with whatever you named the next html page/file in the user journey.
            e.g replace 'THE_NEXT_PAGE_NAME' with 'enter-name'
        5. Not all errors will be required in your service.  Delete the lines of javascript which you don't need.
            e.g. If you don't have an upper limit on the number entry then remove the lines around 'else if ( numberinputfloat < 3 )'
        6. If you have a 'Check your answers' page/file in your journey make sure it is in the same folder and is named 'check-answers' to matcth this routing
                If you don't have a 'Check your answers' page/file then remove that javascript from the near the bottom of the javascript you copied.
                This should leave just 'res.redirect('THE_NEXT_PAGE_NAME');'
        7. Your html page should not have working routing.  Check each error and routing scenario works by entering data and clicking continue on that page.
     */





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_RADIOS-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['SECTION-PAGENAME_RADIOS-radios'] == "PLACEHOLDERANSWER1")
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
        else if (req.session.data['SECTION-PAGENAME_RADIOS-radios'] == "PLACEHOLDERANSWER2")
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
        else if (req.session.data['SECTION-PAGENAME_RADIOS-radios'] == "PLACEHOLDERANSWER3")
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
        else if (req.session.data['SECTION-PAGENAME_RADIOS-radios'] == "PLACEHOLDERANSWER4")
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
            res.redirect('PAGENAME_RADIOS');
        }
    })





    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE OF RADIO BUTTONS
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_RADIOS_COMPLEX-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['SECTION-PAGENAME_RADIOS_COMPLEX-radios'] == "PLACEHOLDERANSWER1")
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
        else if (req.session.data['SECTION-PAGENAME_RADIOS_COMPLEX-radios'] == "PLACEHOLDERANSWER2")
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
        else if (req.session.data['SECTION-PAGENAME_RADIOS_COMPLEX-radios'] == "PLACEHOLDERANSWER3")
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
        else if (req.session.data['SECTION-PAGENAME_RADIOS_COMPLEX-radios'] == "PLACEHOLDERANSWER4")
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
            res.redirect('PAGENAME_RADIOS_COMPLEX');
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////



















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_YES_NO-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['SECTION-PAGENAME_YES_NO-radios-yes-no'] == "Yes")
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
        else if (req.session.data['SECTION-PAGENAME_YES_NO-radios-yes-no'] == "No")
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
            res.redirect('PAGENAME_YES_NO');
        }
    })





    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF YES AND NO
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_YES_NO_COMPLEX-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['SECTION-PAGENAME_YES_NO_COMPLEX-radios-yes-no'] == "Yes")
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
        else if (req.session.data['SECTION-PAGENAME_YES_NO_COMPLEX-radios-yes-no'] == "No")
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
            res.redirect('PAGENAME_YES_NO_COMPLEX');
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////










    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                CHECKBOXES - OPTIONAL              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES_OPTIONAL-router', function (req, res)
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
    })


    ////////////////////////////////////////////////////////////////////////////////////
    //  COMPLEX PAGE  FOR CHECKBOXES - OPTIONAL
    ////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES_OPTIONAL_COMPLEX-router', function (req, res)
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
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////               CHECKBOXES - OPTIONAL                ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////










    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                CHECKBOXES - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['SECTION-PAGENAME_CHECKBOXES-checkboxes'] == undefined  ||
           req.session.data['SECTION-PAGENAME_CHECKBOXES-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_CHECKBOXES');
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
            else
            {
                // This page name needs to match the page the user was just on
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }
    })



    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF  CHECKBOXES
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES_COMPLEX-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['SECTION-PAGENAME_CHECKBOXES_COMPLEX-checkboxes'] == undefined  ||
            req.session.data['SECTION-PAGENAME_CHECKBOXES_COMPLEX-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_CHECKBOXES_COMPLEX');
        }

        else
        {
            // Turn off validation
            req.session.data['errorthispage'] = "false";
            req.session.data['errortypeone'] = "false";

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
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             CHECKBOXES - MANDATORY                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////

















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               TEXT ENTRY - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_TEXT-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_TEXT-text-input'] == undefined || req.session.data['SECTION-PAGENAME_TEXT-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXT');
        }

        else if (req.session.data['SECTION-PAGENAME_TEXT-text-input'].length > 15)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXT');
        }

        else if (req.session.data['SECTION-PAGENAME_TEXT-text-input'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXT');
        }

        else
        {
            // check no illegal charcters have been used
            const acceptableCharacters =  " abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&:’\,.()-";
            let inputtext = req.session.data['SECTION-PAGENAME_TEXT-text-input'];

            let dissallowedCharacters = "";

            // go through every character in the input and save  illegals ones
            for (var i = 0; i < inputtext.length; i++)
            {
                let  singlecharacter = inputtext.charAt(i);

                if( acceptableCharacters.includes( singlecharacter ) )
                {
                    // character is fine skip it
                }
                else
                {
                    // save this invalid character
                    // if character is alread in tsring then don't add it
                    if( dissallowedCharacters.includes( singlecharacter ) == false )
                    {
                        dissallowedCharacters = dissallowedCharacters.concat(singlecharacter);
                    }
                }
            }

            if(0 < dissallowedCharacters.length)
            {
                req.session.data['dissallowedcharacters'] = dissallowedCharacters;

                // Trigger validation and relaunch the page for invalid characters
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_TEXT');
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
                    res.redirect('THE_NEXT_PAGE_NAME');
                }
            }
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF TEXT ENTRY
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_TEXT_COMPLEX-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_TEXT_COMPLEX-text-input'] == undefined || req.session.data['SECTION-PAGENAME_TEXT_COMPLEX-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXT_COMPLEX');
        }

        else if (req.session.data['SECTION-PAGENAME_TEXT_COMPLEX-text-input'].length > 15)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXT_COMPLEX');
        }

        else if (req.session.data['SECTION-PAGENAME_TEXT_COMPLEX-text-input'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXT_COMPLEX');
        }

        else
        {
            // check no illegal charcters have been used
            const acceptableCharacters =  " abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&:’\,.()-";
            let inputtext = req.session.data['SECTION-PAGENAME_TEXT_COMPLEX-text-input'];

            let dissallowedCharacters = "";

            // go through every character in the input and save  illegals ones
            for (var i = 0; i < inputtext.length; i++)
            {
                let  singlecharacter = inputtext.charAt(i);

                if( acceptableCharacters.includes( singlecharacter ) )
                {
                    // character is fine skip it
                }
                else
                {
                    // save this invalid character
                    // if character is alread in tsring then don't add it
                    if( dissallowedCharacters.includes( singlecharacter ) == false )
                    {
                        dissallowedCharacters = dissallowedCharacters.concat(singlecharacter);
                    }
                }
            }

            if(0 < dissallowedCharacters.length)
            {
                req.session.data['dissallowedcharacters'] = dissallowedCharacters;

                // Trigger validation and relaunch the page for invalid characters
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_TEXT_COMPLEX');
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
                    res.redirect('THE_NEXT_PAGE_NAME');
                }
            }
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             TEXT ENTRY - MANDATORY                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////












    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    NUMBER ENTRY                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post('/' + version + section + '/PAGENAME_NUMBER-router', function (req, res)
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
        if (req.session.data['SECTION-PAGENAME_NUMBER-number-input'] == undefined || req.session.data['SECTION-PAGENAME_NUMBER-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_NUMBER');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['SECTION-PAGENAME_NUMBER-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['SECTION-PAGENAME_NUMBER-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_NUMBER');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );


                // Check input is a whole number
                if( numberinputfloat % 1 != 0 )
                {
                    // Trigger validation and relaunch the page
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypetwo'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat < 3 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( 13 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat < 5  ||  8 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeseven'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER-number-input'] = numberinputfloat.toLocaleString();


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
            }

        }

    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF NUMBER ENTRY
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_NUMBER_COMPLEX-router', function (req, res)
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
        if (req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] == undefined || req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_NUMBER_COMPLEX');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_NUMBER_COMPLEX');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );


                // Check input is a whole number
                if( numberinputfloat % 1 != 0 )
                {
                    // Trigger validation and relaunch the page
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypetwo'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 3 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( 13 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 5  ||  8 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeseven'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] = numberinputfloat.toLocaleString();


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
            }

        }

    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             NUMBER ENTRY - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////










    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    MONEY ENTRY                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // MONEY ENTRY  - NOT complex page
    router.post('/' + version + section + '/PAGENAME_MONEY-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";


        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_MONEY-money-input'] == undefined || req.session.data['SECTION-PAGENAME_MONEY-money-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_MONEY');
        }
        else
        {
            // Make any entered or existing amount have no commas
            let nocommasinput = req.session.data['SECTION-PAGENAME_MONEY-money-input'].replace(/,/g, '');
            let nocommasinputfloat = parseFloat(req.session.data['SECTION-PAGENAME_MONEY-money-input'].replace(/,/g, ''));

            // if not a number throw first error
            if( isNaN( nocommasinput ) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_MONEY');
            }
            else
            {
                // make numbers to 2 decimal places and add in commas, also adds £ symbol
                let tempnumber = new Intl.NumberFormat('en-GB', { style: "currency", currency: "GBP"}).format( nocommasinputfloat );

                // Remove pound symbol
                let moneyformatted = tempnumber.replace(/\u00A3/g, '');
                req.session.data['SECTION-PAGENAME_MONEY-money-input'] = moneyformatted;


                // if the number is too large
                // Set this number for your context
                req.session.data['madeupamountmoneymaximum'] = "50.00";
                let maximumamountmoney = parseFloat(req.session.data['madeupamountmoneymaximum'].replace(/,/g, ''));
                if ( maximumamountmoney < nocommasinputfloat )
                {
                    // Trigger validation and relaunch the page for amount lower than 50
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY');
                }

                // if the number is 0 or less
                else if ( nocommasinputfloat <= 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY');
                }
                else
                {
                    // This number would be in the session from where a suer has entered it on a proceeding page
                    req.session.data['madeupamount'] = "10.00";
                    let anotheramount = parseFloat(req.session.data['madeupamount'].replace(/,/g, ''));

                    // if the number is larger than the user entered on a previous section when it can't be.
                    // e.g. Income tax must be less than income amount
                    if ( anotheramount < nocommasinputfloat )
                    {
                        // Trigger validation and relaunch the page for number larger than the user entered on a previous section
                        req.session.data['errorthispage'] = "true";
                        req.session.data['errortypefive'] = "true";

                        // This page name needs to match the page the user was just on
                        res.redirect('PAGENAME_MONEY');
                    }


                    // everything with the input is fine so move on to next page
                    else
                    {
                        // Save a separate bit of session data which shows the amount with the pound sign
                        req.session.data['SECTION-PAGENAME_MONEY-money-input-with-pound-sign'] = "£" + moneyformatted;

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
                }

            }

        }

    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE FOR MONEY INPUT
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_MONEY_COMPLEX-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";


        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'] == undefined || req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_MONEY_COMPLEX');
        }
        else
        {
            // Make any entered or existing amount have no commas
            let nocommasinput = req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'].replace(/,/g, '');
            let nocommasinputfloat = parseFloat(req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'].replace(/,/g, ''));

            // if not a number throw first error
            if( isNaN( nocommasinput ) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_MONEY_COMPLEX');
            }
            else
            {
                // make numbers to 2 decimal places and add in commas, also adds £ symbol
                let tempnumber = new Intl.NumberFormat('en-GB', { style: "currency", currency: "GBP"}).format( nocommasinputfloat );

                // Remove pound symbol
                let moneyformatted = tempnumber.replace(/\u00A3/g, '');
                req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'] = moneyformatted;


                // if the number is too large
                // Set this number for your context
                req.session.data['madeupamountmoneymaximum'] = "50.00";
                let maximumamountmoney = parseFloat(req.session.data['madeupamountmoneymaximum'].replace(/,/g, ''));
                if ( maximumamountmoney < nocommasinputfloat )
                {
                    // Trigger validation and relaunch the page for amount lower than 50
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY_COMPLEX');
                }

                // if the number is 0 or less
                else if ( nocommasinputfloat <= 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY_COMPLEX');
                }
                else
                {
                    // This number would be in the session from where a suer has entered it on a proceeding page
                    req.session.data['madeupamount'] = "10.00";
                    let anotheramount = parseFloat(req.session.data['madeupamount'].replace(/,/g, ''));

                    // if the number is larger than the user entered on a previous section when it can't be.
                    // e.g. Income tax must be less than income amount
                    if ( anotheramount < nocommasinputfloat )
                    {
                        // Trigger validation and relaunch the page for number larger than the user entered on a previous section
                        req.session.data['errorthispage'] = "true";
                        req.session.data['errortypefive'] = "true";

                        // This page name needs to match the page the user was just on
                        res.redirect('PAGENAME_MONEY_COMPLEX');
                    }


                    // everything with the input is fine so move on to next page
                    else
                    {
                        // Save a separate bit of session data which shows the amount with the pound sign
                        req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input-with-pound-sign'] = "£" + moneyformatted;

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
                }

            }

        }

    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////                    MONEY ENTRY                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////

















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     DATE ENTRY                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // DATE ENTRY  - NOT COMPLEX PAGE TYPE
    router.post('/' + version + section + '/PAGENAME_DATE-router', function (req, res)
    {
        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////           Resetting all errors to off              ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // set in page errors to off
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";
        req.session.data['errortypeeight'] = "false";
        req.session.data['errortypenine'] = "false";
        req.session.data['errortypeten'] = "false";
        req.session.data['errortypeeleven'] = "false";
        req.session.data['errortypetwelve'] = "false";
        req.session.data['errortypethirteen'] = "false";
        req.session.data['errortypefourteen'] = "false";
        req.session.data['errortypefifteen'] = "false";
        req.session.data['errortypesixteen'] = "false";
        req.session.data['errortypeseventeen'] = "false";

        // set javascript field check error to off
        let dayEmpty = false;
        let monthEmpty = false;
        let yearEmpty = false;




        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////      Generate previous/closed tax year dates       ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // work out what the most recent closed tax year was
        let today = new Date();
        let closedTaxYearsEndCalendarYear;

        if ( today.getMonth() <= 2 )
        {
            //  It's January, feb or march
            // select previous calendar year as tax year calendar end date
            closedTaxYearsEndCalendarYear = today.getFullYear() - 1;
        }
        else if ( today.getMonth() == 3  &&   today.getDate() < 6  )
        {
            // today is earl april so we're in the very end of the following tax year
            // select previous calendar year as tax year calendar end date
            closedTaxYearsEndCalendarYear = today.getFullYear() - 1;
        }
        else
        {
            // current date is between April 6 and December 31
            closedTaxYearsEndCalendarYear = today.getFullYear();
        }

        let taxyearstartdate = new Date( closedTaxYearsEndCalendarYear-1, 3, 6 );
        let taxyearenddate = new Date( closedTaxYearsEndCalendarYear, 3, 5 );
        // note that April is written as month 3.  Tediously, months start from 0, year and date start from 1.




        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////    Saving tax year, month, day to session data     ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Start date of the previous/closed tax year
        req.session.data['previous-tax-year-start-date-day'] = taxyearstartdate.getDate();
        req.session.data['previous-tax-year-start-date-month-number'] = taxyearstartdate.getMonth() + 1;
        req.session.data['previous-tax-year-start-date-month-text'] = taxyearstartdate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-start-date-year'] = taxyearstartdate.getFullYear();

        // End date of the previous/closed tax year
        req.session.data['previous-tax-year-end-date-day'] = taxyearenddate.getDate();
        req.session.data['previous-tax-year-end-date-month-number'] = taxyearenddate.getMonth() + 1;
        req.session.data['previous-tax-year-end-date-month-text'] = taxyearenddate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-end-date-year'] = taxyearenddate.getFullYear();

        // Note: the +1 after getMonth().  This is because months are by index so start from 0.




        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE-date-input-day'] == undefined
          || req.session.data['SECTION-PAGENAME_DATE-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE-date-input-month'] == undefined
          || req.session.data['SECTION-PAGENAME_DATE-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE-date-input-year'] == undefined
          || req.session.data['SECTION-PAGENAME_DATE-date-input-year'] == "" )
        {
            yearEmpty = true;
        }


        // Redirect to same page if errors
        if (dayEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (monthEmpty && yearEmpty )
            {
                // all fields are empty
                req.session.data['errortypeone'] = "true";
            }
            else if(monthEmpty)
            {
                // day and month are empty only
                req.session.data['errortypefive'] = "true";
            }
            else if (yearEmpty)
            {
                // day and year are empty only
                req.session.data['errortypesix'] = "true";
            }
            else
            {
                // just day is empty
                req.session.data['errortypetwo'] = "true";
            }
        }
        else if (monthEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (yearEmpty)
            {
                // month and year are empty only
                req.session.data['errortypeseven'] = "true";
            }
            else
            {
                // just month is empty
                req.session.data['errortypethree'] = "true";
            }
        }
        else if (yearEmpty)
        {
            req.session.data['errorthispage'] = "true";
            // Only year is empty
            req.session.data['errortypefour'] = "true";
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 8 - Incorrect/invalid characters entered for Year        ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if (  isNaN(req.session.data['SECTION-PAGENAME_DATE-date-input-year']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeight'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 9 - Year must be a 4 digit number         /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            if (  req.session.data['SECTION-PAGENAME_DATE-date-input-year'] < 1000  ||  9999 < req.session.data['SECTION-PAGENAME_DATE-date-input-year']  )
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypenine'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ////////     Error 10 - Incorrect/invalid characters entered for MONTH       ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['SECTION-PAGENAME_DATE-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['SECTION-PAGENAME_DATE-date-input-month'] < 1  ||  12 < req.session.data['SECTION-PAGENAME_DATE-date-input-month'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 11 - Incorrect/invalid characters entered for DAY       /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            var quanityofdaysinmonth =  new Date(req.session.data['SECTION-PAGENAME_DATE-date-input-year'], req.session.data['SECTION-PAGENAME_DATE-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['SECTION-PAGENAME_DATE-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['SECTION-PAGENAME_DATE-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['SECTION-PAGENAME_DATE-date-input-day'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////      Generate date object and update user's inputted date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        let inputdate = new Date();

        if (req.session.data['errorthispage'] != "true")
        {
            inputdate = new Date(
                req.session.data['SECTION-PAGENAME_DATE-date-input-year'],
                req.session.data['SECTION-PAGENAME_DATE-date-input-month'] - 1,
                req.session.data['SECTION-PAGENAME_DATE-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['SECTION-PAGENAME_DATE-date-input-day'] = inputdate.getDate();
            req.session.data['SECTION-PAGENAME_DATE-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['SECTION-PAGENAME_DATE-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['SECTION-PAGENAME_DATE-date-input-year'] = inputdate.getFullYear();
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 12 - Date can't be in the future          /////////////
        //////////////         Very unlikely that this will be needed          /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered if after the previous tax year
            if (today < inputdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwelve'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 13 - date is BEFORE previous/closed tax year        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (inputdate < taxyearstartdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypethirteen'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 14 - date is AFTER previous/closed tax year         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (taxyearenddate < inputdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefourteen'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 15 -  date is BEFORE other user entered date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes") {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );
                if (inputPLACEHOLDERdateOTHER <= inputdate) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefifteen'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 16 -  date is AFTER other user entered date         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes") {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );

                if (inputdate <= inputPLACEHOLDERdateOTHER) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesixteen'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////            Error 17 -  date is AFTER 1 January 1900              /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after 1 January
            let startoflastcentury = new Date(1900, 0, 1);
            if (inputdate <= startoflastcentury) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeseventeen'] = "true";
            }
        }




        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('PAGENAME_DATE')
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( 'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            // For PLACEHOLDER template only. This should go to the next page.
            res.redirect('THE_NEXT_PAGE_NAME')
        }


    })








    ////////////////////////////////////////////////////////////////////////////////////
    //////////////        DATE ENTRY    COMPLEX PAGE TYPE                ///////////////
    ////////////////////////////////////////////////////////////////////////////////////

    router.post('/' + version + section + '/PAGENAME_DATE_COMPLEX-router', function (req, res)
    {
        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////           Resetting all errors to off              ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // set in page errors to off
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";
        req.session.data['errortypeeight'] = "false";
        req.session.data['errortypenine'] = "false";
        req.session.data['errortypeten'] = "false";
        req.session.data['errortypeeleven'] = "false";
        req.session.data['errortypetwelve'] = "false";
        req.session.data['errortypethirteen'] = "false";
        req.session.data['errortypefourteen'] = "false";
        req.session.data['errortypefifteen'] = "false";
        req.session.data['errortypesixteen'] = "false";
        req.session.data['errortypeseventeen'] = "false";

        // set javascript field check error to off
        let dayEmpty = false;
        let monthEmpty = false;
        let yearEmpty = false;




        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////      Generate previous/closed tax year dates       ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // work out what the most recent closed tax year was
        let today = new Date();
        let closedTaxYearsEndCalendarYear;

        if ( today.getMonth() <= 2 )
        {
            //  It's January, feb or march
            // select previous calendar year as tax year calendar end date
            closedTaxYearsEndCalendarYear = today.getFullYear() - 1;
        }
        else if ( today.getMonth() == 3  &&   today.getDate() < 6  )
        {
            // today is earl april so we're in the very end of the following tax year
            // select previous calendar year as tax year calendar end date
            closedTaxYearsEndCalendarYear = today.getFullYear() - 1;
        }
        else
        {
            // current date is between April 6 and December 31
            closedTaxYearsEndCalendarYear = today.getFullYear();
        }

        let taxyearstartdate = new Date( closedTaxYearsEndCalendarYear-1, 3, 6 );
        let taxyearenddate = new Date( closedTaxYearsEndCalendarYear, 3, 5 );
        // note that April is written as month 3.  Tediously, months start from 0, year and date start from 1.




        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////    Saving tax year, month, day to session data     ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Start date of the previous/closed tax year
        req.session.data['previous-tax-year-start-date-day'] = taxyearstartdate.getDate();
        req.session.data['previous-tax-year-start-date-month-number'] = taxyearstartdate.getMonth() + 1;
        req.session.data['previous-tax-year-start-date-month-text'] = taxyearstartdate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-start-date-year'] = taxyearstartdate.getFullYear();

        // End date of the previous/closed tax year
        req.session.data['previous-tax-year-end-date-day'] = taxyearenddate.getDate();
        req.session.data['previous-tax-year-end-date-month-number'] = taxyearenddate.getMonth() + 1;
        req.session.data['previous-tax-year-end-date-month-text'] = taxyearenddate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-end-date-year'] = taxyearenddate.getFullYear();

        // Note: the +1 after getMonth().  This is because months are by index so start from 0.




        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] == undefined
          || req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] == undefined
          || req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] == undefined
          || req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] == "" )
        {
            yearEmpty = true;
        }


        // Redirect to same page if errors
        if (dayEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (monthEmpty && yearEmpty )
            {
                // all fields are empty
                req.session.data['errortypeone'] = "true";
            }
            else if(monthEmpty)
            {
                // day and month are empty only
                req.session.data['errortypefive'] = "true";
            }
            else if (yearEmpty)
            {
                // day and year are empty only
                req.session.data['errortypesix'] = "true";
            }
            else
            {
                // just day is empty
                req.session.data['errortypetwo'] = "true";
            }
        }
        else if (monthEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (yearEmpty)
            {
                // month and year are empty only
                req.session.data['errortypeseven'] = "true";
            }
            else
            {
                // just month is empty
                req.session.data['errortypethree'] = "true";
            }
        }
        else if (yearEmpty)
        {
            req.session.data['errorthispage'] = "true";
            // Only year is empty
            req.session.data['errortypefour'] = "true";
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 8 - Incorrect/invalid characters entered for Year        ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if (  isNaN(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeight'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 9 - Year must be a 4 digit number         /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            if (  req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] < 1000  ||  9999 < req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year']  )
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypenine'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ////////     Error 10 - Incorrect/invalid characters entered for MONTH       ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] < 1  ||  12 < req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 11 - Incorrect/invalid characters entered for DAY       /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            var quanityofdaysinmonth =  new Date(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'], req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////      Generate date object and update user's inputted date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        let inputdate = new Date();

        if (req.session.data['errorthispage'] != "true")
        {
            inputdate = new Date(
                req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'],
                req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] - 1,
                req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] = inputdate.getDate();
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] = inputdate.getFullYear();
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 12 - Date can't be in the future          /////////////
        //////////////         Very unlikely that this will be needed          /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered if after the previous tax year
            if (today < inputdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwelve'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 13 - date is BEFORE previous/closed tax year        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (inputdate < taxyearstartdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypethirteen'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 14 - date is AFTER previous/closed tax year         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (taxyearenddate < inputdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefourteen'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 15 -  date is BEFORE other user entered date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes") {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );
                if (inputPLACEHOLDERdateOTHER <= inputdate) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefifteen'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 16 -  date is AFTER other user entered date         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes") {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );

                if (inputdate <= inputPLACEHOLDERdateOTHER) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesixteen'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////            Error 17 -  date is AFTER 1 January 1900              /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after 1 January
            let startoflastcentury = new Date(1900, 0, 1);
            if (inputdate <= startoflastcentury) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeseventeen'] = "true";
            }
        }




        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('PAGENAME_DATE_COMPLEX')
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( 'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            // For PLACEHOLDER template only. This should go to the next page.
            res.redirect('THE_NEXT_PAGE_NAME')
        }

    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             DATE ENTRY - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////












    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             COUNTRY ENTRY - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // COUNTRY ENTRY - NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_COUNTRY-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_COUNTRY-country-type-ahead'] == undefined || req.session.data['SECTION-PAGENAME_COUNTRY-country-type-ahead'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY');
        }

        else if (req.session.data['SECTION-PAGENAME_COUNTRY-country-type-ahead'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY');
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
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF TEXT ENTRY
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_COUNTRY_COMPLEX-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";

        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_COUNTRY_COMPLEX-country-type-ahead'] == undefined || req.session.data['SECTION-PAGENAME_COUNTRY_COMPLEX-country-type-ahead'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY_COMPLEX');
        }

        else if (req.session.data['SECTION-PAGENAME_COUNTRY_COMPLEX-country-type-ahead'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY_COMPLEX');
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
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }

    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             COUNTRY ENTRY - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
}
