const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router)
{
    let version = "versions/2025-01-27/";
    let section = "account/";


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Sign in or create an account
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'sign-in-or-create-account-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['account-sign-in-or-create-account-radios-yes-no'] == "Yes, sign in")
        {
            // This page name needs to match the page the user was just on
            res.redirect('sign-in-email-address');
        }
        else if (req.session.data['account-sign-in-or-create-account-radios-yes-no'] == "No, I need to create an account")
        {
            // This page name needs to match the page the user was just on
            res.redirect('sign-in-or-create-account');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('sign-in-or-create-account');
        }
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // Enter your account email address - SIGN IN
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + 'sign-in-email-address-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        /*
        // Validation check if field is blank
        if (req.session.data['account-sign-in-email-address-text-input'] == undefined || req.session.data['account-sign-in-email-address-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('sign-in-email-address');
        }

        else if (req.session.data['account-sign-in-email-address-text-input'].length > 320)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('sign-in-email-address');
        }

        else if (req.session.data['account-sign-in-email-address-text-input'].length < 5)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('sign-in-email-address');
        }

        else
        {
            // everything with the input is fine so move on to next page
            res.redirect('sign-in-password');
        }
        */

        res.redirect('sign-in-password');

    })





    router.post('/' + version + section + 'sign-in-password-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        /*
        // Validation check if field is blank
        if (req.session.data['account-sign-in-password-text-input'] == undefined || req.session.data['account-sign-in-password-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('sign-in-password');
        }

        else
        {
            // everything with the input is fine so move on to next page
            res.redirect('THE_NEXT_PAGE_NAME');
        }

         */

        res.redirect('list-of-licence-applications');
    })


}