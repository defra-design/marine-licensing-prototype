module.exports = function (router) {
  // Entity check routes
  const version = "multiple-sites-v2";
  const section = "entitycheck";

  ///////////////////////////////////////////
  // You need to provide more information page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/you-need-to-provide-more-information`, function (req, res) {
    // Clear ALL entity check session data for a fresh start
    // We delete individual properties rather than replacing the entire session object
    // to ensure session persistence works correctly
    
    // Clear who is this for page data
    delete req.session.data['entity-check-who-is-for'];
    delete req.session.data['entity-check-who-is-for-errorthispage'];
    
    // Clear client setup check data
    delete req.session.data['client-setup-check'];
    delete req.session.data['client-setup-check-errorthispage'];
    
    // Clear organisation setup check data
    delete req.session.data['organisation-setup-check'];
    delete req.session.data['organisation-setup-check-errorthispage'];
    
    // Clear confirmation page data and error flags
    delete req.session.data['confirm-individual-notification'];
    delete req.session.data['confirm-individual-notification-errorthispage'];
    delete req.session.data['confirm-organisation-notification'];
    delete req.session.data['confirm-organisation-notification-errorthispage'];
    delete req.session.data['confirm-agent-notification'];
    delete req.session.data['confirm-agent-notification-errorthispage'];
    
    // Clear organisation data
    delete req.session.data['organisation-name'];
    delete req.session.data['changing-organisation'];
    delete req.session.data['organisation-selector-return-to'];
    delete req.session.data['goto-after-org-selector'];
    
    // Clear project name data (if they got to the end)
    delete req.session.data['exemption-project-name-text-input'];
    
    // Clear error flags
    delete req.session.data['errorthispage'];
    delete req.session.data['errortypeone'];
    delete req.session.data['errortypetwo'];
    delete req.session.data['errortypethree'];
    delete req.session.data['errortypefour'];
    delete req.session.data['errortypefive'];
    delete req.session.data['errortypesix'];
    
    // Store user_type if provided (for organisation vs individual vs agent)
    if (req.query.user_type === 'organisation') {
      req.session.data['user_type'] = 'organisation';
    } else if (req.query.user_type === 'agent') {
      req.session.data['user_type'] = 'agent';
    } else if (req.query.user_type === '') {
      // Explicitly clear user_type for individual users
      delete req.session.data['user_type'];
    }
    
    res.render(`versions/${version}/${section}/you-need-to-provide-more-information`);
  });

  // Continue router (POST)
  router.post(`/versions/${version}/${section}/continue-router`, function (req, res) {
    res.redirect('who-is-this-exemption-notification-for');
  });

  ///////////////////////////////////////////
  // Guidance pages
  ///////////////////////////////////////////

  // Creating a Defra account
  router.get(`/versions/${version}/${section}/creating-a-defra-account`, function (req, res) {
    res.render(`versions/${version}/${section}/creating-a-defra-account`);
  });

  // Adding users to a Defra account as an admin
  router.get(`/versions/${version}/${section}/adding-users-to-a-defra-account-as-an-admin`, function (req, res) {
    res.render(`versions/${version}/${section}/adding-users-to-a-defra-account-as-an-admin`);
  });

  ///////////////////////////////////////////
  // Who is this exemption notification for?
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/who-is-this-exemption-notification-for`, function (req, res) {
    // Clear error flags on page load
    req.session.data['entity-check-who-is-for-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/who-is-this-exemption-notification-for`);
  });

  router.post(`/versions/${version}/${section}/who-is-this-exemption-notification-for-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['entity-check-who-is-for-errorthispage'] = "false";
    
    const whoIsFor = req.session.data['entity-check-who-is-for'];
    
    // Validate selection
    if (!whoIsFor) {
      req.session.data['entity-check-who-is-for-errorthispage'] = "true";
      res.redirect('who-is-this-exemption-notification-for');
      return;
    }
    
    // Branch based on selection
    if (whoIsFor === 'myself') {
      res.redirect('sign-in');
    } else if (whoIsFor === 'business') {
      res.redirect('check-you-are-set-up-to-apply-for-your-organisation');
    } else if (whoIsFor === 'client') {
      res.redirect('check-you-are-set-up-to-apply-for-your-client');
    }
  });

  ///////////////////////////////////////////
  // Check you are set up to apply for your client
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/check-you-are-set-up-to-apply-for-your-client`, function (req, res) {
    // Clear error flags on page load
    req.session.data['client-setup-check-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/check-you-are-set-up-to-apply-for-your-client`);
  });

  router.post(`/versions/${version}/${section}/check-you-are-set-up-to-apply-for-your-client-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['client-setup-check-errorthispage'] = "false";
    
    const clientSetupCheck = req.session.data['client-setup-check'];
    
    // Validate selection
    if (!clientSetupCheck) {
      req.session.data['client-setup-check-errorthispage'] = "true";
      res.redirect('check-you-are-set-up-to-apply-for-your-client');
      return;
    }
    
    // Branch based on selection
    if (clientSetupCheck === 'yes') {
      res.redirect('sign-in');
    } else if (clientSetupCheck === 'no') {
      res.redirect('you-need-to-be-added-to-clients-account');
    }
  });

  ///////////////////////////////////////////
  // You need to be added to your client's account
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/you-need-to-be-added-to-clients-account`, function (req, res) {
    res.render(`versions/${version}/${section}/you-need-to-be-added-to-clients-account`);
  });

  ///////////////////////////////////////////
  // Check you are set up to apply for your organisation
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/check-you-are-set-up-to-apply-for-your-organisation`, function (req, res) {
    // Clear error flags on page load
    req.session.data['organisation-setup-check-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/check-you-are-set-up-to-apply-for-your-organisation`);
  });

  router.post(`/versions/${version}/${section}/check-you-are-set-up-to-apply-for-your-organisation-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['organisation-setup-check-errorthispage'] = "false";
    
    const organisationSetupCheck = req.session.data['organisation-setup-check'];
    
    // Validate selection
    if (!organisationSetupCheck) {
      req.session.data['organisation-setup-check-errorthispage'] = "true";
      res.redirect('check-you-are-set-up-to-apply-for-your-organisation');
      return;
    }
    
    // Branch based on selection
    if (organisationSetupCheck === 'yes') {
      res.redirect('sign-in');
    } else if (organisationSetupCheck === 'register-new') {
      res.redirect('register-a-new-defra-account-for-your-organisation');
    } else if (organisationSetupCheck === 'need-to-be-added') {
      res.redirect('you-need-to-be-added-to-your-organisations-account');
    }
  });

  ///////////////////////////////////////////
  // Register a new Defra account for your organisation
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/register-a-new-defra-account-for-your-organisation`, function (req, res) {
    res.render(`versions/${version}/${section}/register-a-new-defra-account-for-your-organisation`);
  });

  ///////////////////////////////////////////
  // You need to be added to your organisation's account
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/you-need-to-be-added-to-your-organisations-account`, function (req, res) {
    res.render(`versions/${version}/${section}/you-need-to-be-added-to-your-organisations-account`);
  });

  ///////////////////////////////////////////
  // Creating a Defra account pages
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/creating-a-defra-account-as-employee`, function (req, res) {
    res.render(`versions/${version}/${section}/creating-a-defra-account-as-employee`);
  });

  ///////////////////////////////////////////
  // Sign in page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
    res.render(`versions/${version}/${section}/sign-in`);
  });

  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {
    // Handle sign-in submission
    // Branch based on user_type
    if (req.session.data['user_type'] === 'organisation') {
      res.redirect('organisation-selector');
    } else if (req.session.data['user_type'] === 'agent') {
      res.redirect('organisation-selector');
    } else {
      res.redirect('confirm-individual-notification');
    }
  });

  ///////////////////////////////////////////
  // Organisation selector
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/organisation-selector`, function (req, res) {
    // Clear error flags on page load
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Define organisations based on user_type
    let organisations = [];
    
    if (req.session.data['user_type'] === 'organisation') {
      organisations = [
        { text: "Sam Evans", value: "Sam Evans" },
        { text: "Ocean Dredging", value: "Ocean Dredging" }
      ];
    } else if (req.session.data['user_type'] === 'agent') {
      organisations = [
        { text: "Sam Evans", value: "Sam Evans" },
        { text: "Brighton Marina", value: "Brighton Marina" }
      ];
    }
    
    res.render(`versions/${version}/${section}/organisation-selector`, {
      organisations: organisations
    });
  });

  router.post(`/versions/${version}/${section}/organisation-selector-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    const organisationName = req.session.data['organisation-name'];
    
    // Validate selection
    if (!organisationName) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      res.redirect('organisation-selector');
      return;
    }
    
    // Branch based on user_type and selection
    if (req.session.data['user_type'] === 'organisation') {
      if (organisationName === 'Ocean Dredging') {
        res.redirect('confirm-organisation-notification');
      } else if (organisationName === 'Sam Evans') {
        res.redirect('confirm-individual-notification');
      }
    } else if (req.session.data['user_type'] === 'agent') {
      if (organisationName === 'Brighton Marina') {
        res.redirect('confirm-agent-notification');
      } else if (organisationName === 'Sam Evans') {
        res.redirect('confirm-individual-notification');
      }
    }
  });

  ///////////////////////////////////////////
  // No other organisations available
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/no-other-organisations-available`, function (req, res) {
    res.render(`versions/${version}/${section}/no-other-organisations-available`);
  });

  ///////////////////////////////////////////
  // Confirm individual notification page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/confirm-individual-notification`, function (req, res) {
    // Clear error flags on page load
    req.session.data['confirm-individual-notification-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/confirm-individual-notification`);
  });

  router.post(`/versions/${version}/${section}/confirm-individual-notification-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['confirm-individual-notification-errorthispage'] = "false";
    
    const confirmNotification = req.session.data['confirm-individual-notification'];
    
    // Validate selection
    if (!confirmNotification) {
      req.session.data['confirm-individual-notification-errorthispage'] = "true";
      res.redirect('confirm-individual-notification');
      return;
    }
    
    // Clear organisation name for individual users
    delete req.session.data['organisation-name'];
    
    // Branch based on selection
    if (confirmNotification === 'myself') {
      res.redirect('project-name-start');
    } else if (confirmNotification === 'organisation') {
      res.redirect('need-to-create-defra-account-as-employee');
    } else if (confirmNotification === 'client') {
      res.redirect('need-client-to-invite-you');
    }
  });

  ///////////////////////////////////////////
  // Guidance pages for signed-in users
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/need-to-create-defra-account-as-employee`, function (req, res) {
    res.render(`versions/${version}/${section}/need-to-create-defra-account-as-employee`);
  });

  router.get(`/versions/${version}/${section}/need-client-to-invite-you`, function (req, res) {
    res.render(`versions/${version}/${section}/need-client-to-invite-you`);
  });

  router.get(`/versions/${version}/${section}/need-to-create-defra-account-as-individual`, function (req, res) {
    res.render(`versions/${version}/${section}/need-to-create-defra-account-as-individual`);
  });

  router.get(`/versions/${version}/${section}/need-to-select-correct-organisation`, function (req, res) {
    res.render(`versions/${version}/${section}/need-to-select-correct-organisation`);
  });

  ///////////////////////////////////////////
  // Confirm organisation notification page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/confirm-organisation-notification`, function (req, res) {
    // Clear error flags on page load
    req.session.data['confirm-organisation-notification-errorthispage'] = "false";
    // Set organisation name for display
    req.session.data['organisation-name'] = 'Ocean Dredging';
    res.render(`versions/${version}/${section}/confirm-organisation-notification`);
  });

  router.post(`/versions/${version}/${section}/confirm-organisation-notification-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['confirm-organisation-notification-errorthispage'] = "false";
    
    const confirmNotification = req.session.data['confirm-organisation-notification'];
    
    // Validate selection
    if (!confirmNotification) {
      req.session.data['confirm-organisation-notification-errorthispage'] = "true";
      res.redirect('confirm-organisation-notification');
      return;
    }
    
    // Set organisation name for guidance pages
    req.session.data['organisation-name'] = 'Ocean Dredging';
    
    // Branch based on selection
    if (confirmNotification === 'yes') {
      res.redirect('project-name-start');
    } else if (confirmNotification === 'different-organisation') {
      res.redirect('need-to-create-defra-account-as-employee');
    } else if (confirmNotification === 'agent') {
      res.redirect('need-client-to-invite-you');
    } else if (confirmNotification === 'myself') {
      res.redirect('need-to-create-defra-account-as-individual');
    }
  });

  ///////////////////////////////////////////
  // Confirm agent notification page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/confirm-agent-notification`, function (req, res) {
    // Clear error flags on page load
    req.session.data['confirm-agent-notification-errorthispage'] = "false";
    // Set organisation name for display
    req.session.data['organisation-name'] = 'Brighton Marina';
    res.render(`versions/${version}/${section}/confirm-agent-notification`);
  });

  router.post(`/versions/${version}/${section}/confirm-agent-notification-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['confirm-agent-notification-errorthispage'] = "false";
    
    const confirmNotification = req.session.data['confirm-agent-notification'];
    
    // Validate selection
    if (!confirmNotification) {
      req.session.data['confirm-agent-notification-errorthispage'] = "true";
      res.redirect('confirm-agent-notification');
      return;
    }
    
    // Set organisation name for guidance pages
    req.session.data['organisation-name'] = 'Brighton Marina';
    
    // Branch based on selection
    if (confirmNotification === 'yes') {
      res.redirect('project-name-start');
    } else if (confirmNotification === 'different-client') {
      res.redirect('need-to-select-correct-organisation');
    } else if (confirmNotification === 'myself') {
      res.redirect('need-to-create-defra-account-as-individual');
    }
  });

  ///////////////////////////////////////////
  // Project name page (end of test journey)
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-name-start`, function (req, res) {
    res.render(`versions/${version}/${section}/project-name-start`);
  });

}
