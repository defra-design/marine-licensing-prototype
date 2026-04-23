module.exports = function (router) {
  // Low complexity v2 routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";

  // Marine plan policy counts - keep session up to date on every v2 request so start page
  // shows correct (N) and status even when served by kit auto-routing
  const MARINE_PLAN_POLICY_KEYS = [
    's-bio-1', 's-bio-2', 's-bio-3', 's-bio-4', 's-dist-1', 's-nis-1', 's-ml-1', 's-ml-2',
    's-uwn-1', 's-uwn-2', 's-wq-1', 's-wq-2', 's-cc-1', 's-cc-2', 's-cc-3', 's-cc-4', 's-co-1',
    's-agg-4', 's-aq-2', 's-cab-1', 's-cab-2', 's-dd-2', 's-inf-1', 's-ps-1', 's-ren-1',
    's-acc-1', 's-acc-2', 's-fish-1', 's-fish-2', 's-fish-4', 's-emp-1', 's-emp-2',
    's-her-1', 's-soc-1', 's-scp-1', 's-tr-1', 's-tr-2'
  ];
  const MARINE_PLAN_POLICIES_TOTAL = MARINE_PLAN_POLICY_KEYS.length;

  router.use(function (req, res, next) {
    if (req.path.indexOf('low-complexity-v2') !== -1) {
      // v1 MPP counts
      let completedCount = 0;
      for (const key of MARINE_PLAN_POLICY_KEYS) {
        if (req.session.data['marine-plan-policy-' + key + '-completed']) {
          completedCount++;
        }
      }
      req.session.data['marine-plan-policies-completed-count'] = completedCount;
      req.session.data['marine-plan-policies-not-started-count'] = MARINE_PLAN_POLICIES_TOTAL - completedCount;

      // v2 MPP counts
      let completedCountV2 = 0;
      for (const key of MARINE_PLAN_POLICY_KEYS) {
        if (req.session.data['marine-plan-policy-v2-' + key + '-completed']) {
          completedCountV2++;
        }
      }
      req.session.data['marine-plan-policies-v2-completed-count'] = completedCountV2;
      req.session.data['marine-plan-policies-v2-not-started-count'] = MARINE_PLAN_POLICIES_TOTAL - completedCountV2;
    }
    next();
  });

  ///////////////////////////////////////////
  // Project name start page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-name-start`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    res.render(`versions/${version}/${section}/project-name-start`);
  });

  // Project name start router (POST)
  router.post(`/versions/${version}/${section}/project-name-start-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the project name value
    const projectName = req.session.data['low-complexity-project-name-text-input'];

    // Validate: check if project name is empty or undefined
    if (!projectName || projectName.trim() === '') {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('project-name-start');
    } else {
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('check-your-answers');
      } else {
        // Validation passed - initialize draft application tracking
        req.session.data['low-complexity-application-status'] = 'draft';
        req.session.data['low-complexity-application-reference'] = '-';
        
        // Redirect to next page
        res.redirect('marine-licence-start-page');
      }
    }
  });

  ///////////////////////////////////////////
  // Marine licence start page (task list)
  ///////////////////////////////////////////
  router.get(`/versions/${version}/${section}/marine-licence-start-page`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    // Clear mpp-calculating from session if not in the current query string
    // (prototype kit auto-stores query params, so we need to clear it on refresh)
    if (!req.query['mpp-calculating']) {
      delete req.session.data['mpp-calculating'];
    }
    res.render(`versions/${version}/${section}/marine-licence-start-page`);
  });

  // Project name page (accessible from task list)
  router.get(`/versions/${version}/${section}/project-name`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/project-name`);
  });

  ///////////////////////////////////////////
  // Project details section
  ///////////////////////////////////////////

  // Project details index page
  router.get(`/versions/${version}/${section}/project-details`, function (req, res) {
    res.render(`versions/${version}/${section}/project-details/index`);
  });

  // Project background page
  router.get(`/versions/${version}/${section}/project-details/project-background`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/project-details/project-background`);
  });

  // Project background router (POST)
  router.post(`/versions/${version}/${section}/project-details/project-background-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the project background value
    const projectBackground = req.session.data['low-complexity-project-background'];

    // Validate: check if project background is empty or undefined
    if (!projectBackground || projectBackground.trim() === '') {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('project-background');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-project-background-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Start and end dates page (licence preferred dates – month and year only)
  router.get(`/versions/${version}/${section}/project-details/start-and-end-dates`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/project-details/start-and-end-dates`);
  });

  // Start and end dates router (POST) – validates month and year only
  router.post(`/versions/${version}/${section}/project-details/start-and-end-dates-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    const startMonth = req.session.data['start-date-month'];
    const startYear = req.session.data['start-date-year'];
    const endMonth = req.session.data['end-date-month'];
    const endYear = req.session.data['end-date-year'];

    let hasError = false;

    if (!startMonth || startMonth.trim() === '' || !startYear || startYear.trim() === '') {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      hasError = true;
    }

    if (!endMonth || endMonth.trim() === '' || !endYear || endYear.trim() === '') {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      hasError = true;
    }

    if (hasError) {
      res.redirect('start-and-end-dates');
    } else {
      req.session.data['low-complexity-dates-completed'] = true;
      
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  ///////////////////////////////////////////
  // Other permissions section
  ///////////////////////////////////////////

  // Other permissions index page
  router.get(`/versions/${version}/${section}/other-permissions`, function (req, res) {
    res.render(`versions/${version}/${section}/other-permissions/index`);
  });

  // Harbour authority page
  router.get(`/versions/${version}/${section}/other-permissions/harbour-authority`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/other-permissions/harbour-authority`);
  });

  // Harbour authority router (POST)
  router.post(`/versions/${version}/${section}/other-permissions/harbour-authority-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const harbourAuthority = req.session.data['low-complexity-harbour-authority'];
    const harbourAuthorityDetails = req.session.data['low-complexity-harbour-authority-details'];

    // If "No" is selected, clear the textarea data
    if (harbourAuthority === 'No') {
      delete req.session.data['low-complexity-harbour-authority-details'];
    }

    // Validate: check if radio is selected
    if (!harbourAuthority) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('harbour-authority');
    } else if (harbourAuthority === 'Yes' && (!harbourAuthorityDetails || harbourAuthorityDetails.trim() === '')) {
      // If Yes is selected, check if textarea has content
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('harbour-authority');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-harbour-authority-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#other-permissions');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Special legal powers page (organisation users only)
  router.get(`/versions/${version}/${section}/other-permissions/special-legal-powers`, function (req, res) {
    if (req.session.data['user_type'] !== 'organisation') {
      return res.redirect('../marine-licence-start-page');
    }
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/other-permissions/special-legal-powers`);
  });

  // Special legal powers router (POST) (organisation users only)
  router.post(`/versions/${version}/${section}/other-permissions/special-legal-powers-router`, function (req, res) {
    if (req.session.data['user_type'] !== 'organisation') {
      return res.redirect('../marine-licence-start-page');
    }
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const specialLegalPowers = req.session.data['low-complexity-special-legal-powers'];
    const specialLegalPowersDetails = req.session.data['low-complexity-special-legal-powers-details'];

    // If "No" is selected, clear the textarea data
    if (specialLegalPowers === 'No') {
      delete req.session.data['low-complexity-special-legal-powers-details'];
    }

    // Validate: check if radio is selected
    if (!specialLegalPowers) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('special-legal-powers');
    } else if (specialLegalPowers === 'Yes' && (!specialLegalPowersDetails || specialLegalPowersDetails.trim() === '')) {
      // If Yes is selected, check if textarea has content
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('special-legal-powers');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-special-legal-powers-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#other-permissions');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Other authorities page
  router.get(`/versions/${version}/${section}/other-permissions/other-authorities`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/other-permissions/other-authorities`);
  });

  // Other authorities router (POST)
  router.post(`/versions/${version}/${section}/other-permissions/other-authorities-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const otherPermissions = req.session.data['low-complexity-other-permissions'];
    const otherPermissionsDetails = req.session.data['low-complexity-other-permissions-details'];

    // If "No" is selected, clear the textarea data
    if (otherPermissions === 'No') {
      delete req.session.data['low-complexity-other-permissions-details'];
    }

    // Validate: check if radio is selected
    if (!otherPermissions) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('other-authorities');
    } else if (otherPermissions === 'Yes' && (!otherPermissionsDetails || otherPermissionsDetails.trim() === '')) {
      // If Yes is selected, check if textarea has content
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('other-authorities');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-other-permissions-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#other-permissions');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Consultation and advertising page
  router.get(`/versions/${version}/${section}/other-permissions/consultation-and-advertising`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/other-permissions/consultation-and-advertising`);
  });

  // Consultation and advertising router (POST)
  router.post(`/versions/${version}/${section}/other-permissions/consultation-and-advertising-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const consultation = req.session.data['low-complexity-consultation'];
    const consultationDetails = req.session.data['low-complexity-consultation-details'];

    // If "No" is selected, clear the textarea data
    if (consultation === 'No') {
      delete req.session.data['low-complexity-consultation-details'];
    }

    // Validate: check if radio is selected
    if (!consultation) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('consultation-and-advertising');
    } else if (consultation === 'Yes' && (!consultationDetails || consultationDetails.trim() === '')) {
      // If Yes is selected, check if textarea has content
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('consultation-and-advertising');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-consultation-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#other-permissions');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  ///////////////////////////////////////////
  // Sharing your project information publicly
  ///////////////////////////////////////////

  // Sharing your project information publicly GET route
  router.get(`/versions/${version}/${section}/sharing-your-project-information-publicly`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/sharing-your-project-information-publicly`);
  });

  // Sharing your project information publicly router (POST)
  router.post(`/versions/${version}/${section}/sharing-your-project-information-publicly-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const sharingConsent = req.session.data['low-complexity-sharing-information'];
    const sharingDetails = req.session.data['low-complexity-sharing-information-details'];

    // If "Yes" is selected, clear the textarea data (consent given, no details needed)
    if (sharingConsent === 'Yes') {
      delete req.session.data['low-complexity-sharing-information-details'];
    }

    // Validate: check if radio is selected
    if (!sharingConsent) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";

      // Redirect back to the same page with errors
      res.redirect('sharing-your-project-information-publicly');
    } else if (sharingConsent === 'No' && (!sharingDetails || sharingDetails.trim() === '')) {
      // If No is selected, check if textarea has content
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";

      // Redirect back to the same page with errors
      res.redirect('sharing-your-project-information-publicly');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-sharing-information-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('check-your-answers#sharing-your-project-information-publicly');
      } else {
        res.redirect('marine-licence-start-page');
      }
    }
  });

  // Check your answers GET route (shell)
  router.get(`/versions/${version}/${section}/check-your-answers`, function (req, res) {
    res.render(`versions/${version}/${section}/check-your-answers`);
  });

  ///////////////////////////////////////////
  // Declaration
  ///////////////////////////////////////////

  // Declaration POST router
  router.post(`/versions/${version}/${section}/declaration-router`, function (req, res) {
    // Mark application as sent
    req.session.data['low-complexity-application-status'] = 'sent';
    req.session.data['low-complexity-application-reference'] = 'MLA/2025/10025';
    
    // Set submission date to current date
    const today = new Date();
    const day = today.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    req.session.data['low-complexity-submission-date'] = `${day} ${month} ${year}`;
    
    // Also store sort value for submitted date (YYMMDD format)
    const sortYear = year.toString().slice(-2);
    const sortMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const sortDay = day.toString().padStart(2, '0');
    req.session.data['low-complexity-submission-date-sort'] = `${sortYear}${sortMonth}${sortDay}`;
    
    res.redirect('confirmation');
  });

  ///////////////////////////////////////////
  // Environmental assessments section
  ///////////////////////////////////////////

  // Environmental assessments index page
  router.get(`/versions/${version}/${section}/environmental-assessments`, function (req, res) {
    res.render(`versions/${version}/${section}/environmental-assessments/index`);
  });

  // European sites page
  router.get(`/versions/${version}/${section}/environmental-assessments/european-sites`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/environmental-assessments/european-sites`);
  });

  // European sites router (POST)
  router.post(`/versions/${version}/${section}/environmental-assessments/european-sites-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the european sites value
    const europeanSites = req.session.data['low-complexity-european-sites'];

    // Validate: check if european sites is empty or undefined
    if (!europeanSites || europeanSites.trim() === '') {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('european-sites');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-european-sites-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#water-framework-directive');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Marine Conservation Zones page
  router.get(`/versions/${version}/${section}/environmental-assessments/marine-conservation-zones`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/environmental-assessments/marine-conservation-zones`);
  });

  // Marine Conservation Zones router (POST)
  router.post(`/versions/${version}/${section}/environmental-assessments/marine-conservation-zones-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the MCZ value
    const mcz = req.session.data['low-complexity-mcz'];

    // Validate: check if MCZ is empty or undefined
    if (!mcz || mcz.trim() === '') {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('marine-conservation-zones');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-mcz-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#water-framework-directive');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Sites of special scientific interest page
  router.get(`/versions/${version}/${section}/environmental-assessments/sites-of-special-scientific-interest`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/environmental-assessments/sites-of-special-scientific-interest`);
  });

  // Sites of special scientific interest router (POST)
  router.post(`/versions/${version}/${section}/environmental-assessments/sites-of-special-scientific-interest-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the SSSI value
    const sssi = req.session.data['low-complexity-sssi'];

    // Validate: check if SSSI is empty or undefined
    if (!sssi || sssi.trim() === '') {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('sites-of-special-scientific-interest');
    } else {
      // Validation passed - set completion flag
      req.session.data['low-complexity-sssi-completed'] = true;
      
      // Check if we need to return to check answers
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        res.redirect('../check-your-answers#water-framework-directive');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    }
  });

  // Helper: build a redirect path keeping the current context flags
  function wfdPathWithContext(base, fromMainCheck, fromWfdCheck) {
    if (fromMainCheck) return base + '?camefromcheckanswers=true';
    if (fromWfdCheck) return base + '?fromcheckanswers=true';
    return base;
  }

  // ============================================================
  // WFD page 1 — "Have you assessed your project against the WFD?"
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive`, function (req, res) {
    // Clear error flags
    delete req.session.data['low-complexity-wfd-errorthispage'];
    delete req.session.data['low-complexity-wfd-error-radio'];
    delete req.session.data['low-complexity-wfd-error-summary'];

    const fromCheckAnswers = req.query.fromcheckanswers === 'true';
    const fromMainCheckAnswers = req.query.camefromcheckanswers === 'true';

    // Mirror the source of this visit into session so the POST (which has no
    // query string via the form action) can decide where to send the user.
    // The two flags are independent — a user who drilled main check → WFD
    // check → WFD question has both flags set, and each is cleared when its
    // respective check page is finally returned to.
    if (fromMainCheckAnswers) {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    if (fromCheckAnswers) {
      req.session.data['low-complexity-wfd-came-from-wfd-check'] = 'true';
    }
    if (!fromMainCheckAnswers && !fromCheckAnswers) {
      // Clean entry from task list — wipe both flags so stale values from
      // other tasks can't leak into this flow.
      req.session.data['camefromcheckanswers'] = false;
      req.session.data['low-complexity-wfd-came-from-wfd-check'] = false;
    }

    // Smart routing: only send the user to the WFD check page when the flow has
    // been fully completed with "Yes" answered on page 1. For "No" answers there
    // is no check page — re-entering the task should show the question again.
    if (req.session.data['low-complexity-wfd-assessed'] === 'Yes'
        && req.session.data['low-complexity-wfd-completed']
        && !fromCheckAnswers && !fromMainCheckAnswers) {
      return res.redirect('water-framework-directive-check-answers');
    }

    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-router`, function (req, res) {
    delete req.session.data['low-complexity-wfd-errorthispage'];
    delete req.session.data['low-complexity-wfd-error-radio'];
    delete req.session.data['low-complexity-wfd-error-summary'];

    const assessed = req.session.data['low-complexity-wfd-assessed'];
    const summary = req.session.data['low-complexity-wfd-summary'];
    // Flags persisted via session (the form action has no query string).
    const fromMainCheckAnswers = req.session.data['camefromcheckanswers'] === 'true';
    const fromWfdCheck = req.session.data['low-complexity-wfd-came-from-wfd-check'] === 'true';

    let hasErrors = false;
    if (!assessed) {
      req.session.data['low-complexity-wfd-error-radio'] = "true";
      hasErrors = true;
    } else if (assessed === 'Yes' && (!summary || summary.trim() === '')) {
      req.session.data['low-complexity-wfd-error-summary'] = "true";
      hasErrors = true;
    }

    if (hasErrors) {
      req.session.data['low-complexity-wfd-errorthispage'] = "true";
      return res.redirect(wfdPathWithContext('water-framework-directive', fromMainCheckAnswers, fromWfdCheck));
    }

    if (assessed === 'No') {
      // Clear cascaded sub-answers
      delete req.session.data['low-complexity-wfd-summary'];
      delete req.session.data['low-complexity-wfd-upload-answer'];
      delete req.session.data['low-complexity-wfd-file-uploaded'];
      delete req.session.data['low-complexity-wfd-filename'];
      req.session.data['low-complexity-wfd-completed'] = true;
      req.session.data['low-complexity-wfd-came-from-wfd-check'] = false;

      if (fromMainCheckAnswers) {
        req.session.data['camefromcheckanswers'] = false;
        return res.redirect('../check-your-answers#water-framework-directive');
      }
      return res.redirect('../marine-licence-start-page');
    }

    // assessed === 'Yes'
    const subJourneyAlreadyComplete = !!req.session.data['low-complexity-wfd-upload-answer'];

    if (subJourneyAlreadyComplete) {
      // User is just editing the summary; skip the upload question and go to the
      // WFD check page. Its Continue button then returns to the main check page
      // when appropriate (based on session.camefromcheckanswers).
      req.session.data['low-complexity-wfd-came-from-wfd-check'] = false;
      return res.redirect('water-framework-directive-check-answers');
    }

    // Fresh / restarted sub-journey — continue through the upload question.
    return res.redirect(wfdPathWithContext('water-framework-directive-upload-question', fromMainCheckAnswers, fromWfdCheck));
  });

  // ============================================================
  // WFD page 2 — "Do you have a Water Framework Directive assessment to upload?"
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload-question`, function (req, res) {
    delete req.session.data['low-complexity-wfd-upload-q-errorthispage'];

    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }

    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-upload-question`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload-question-router`, function (req, res) {
    delete req.session.data['low-complexity-wfd-upload-q-errorthispage'];

    const uploadAnswer = req.session.data['low-complexity-wfd-upload-answer'];
    const fromCheckAnswers = req.query.fromcheckanswers === 'true';
    const fromMainCheckAnswers = req.session.data['camefromcheckanswers'] === 'true';

    if (!uploadAnswer) {
      req.session.data['low-complexity-wfd-upload-q-errorthispage'] = "true";
      return res.redirect(wfdPathWithContext('water-framework-directive-upload-question', fromMainCheckAnswers, fromCheckAnswers));
    }

    if (uploadAnswer === 'No') {
      // Clear any previously uploaded file
      delete req.session.data['low-complexity-wfd-file-uploaded'];
      delete req.session.data['low-complexity-wfd-filename'];
      req.session.data['low-complexity-wfd-completed'] = true;

      // Whenever assessed is Yes we always land on the WFD check page first;
      // its Continue button returns to the main check page if appropriate.
      return res.redirect('water-framework-directive-check-answers');
    }

    // uploadAnswer === 'Yes' → go to the file upload page, preserving context
    return res.redirect(wfdPathWithContext('water-framework-directive-upload', fromMainCheckAnswers, fromCheckAnswers));
  });

  // ============================================================
  // WFD file upload page
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload`, function (req, res) {
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }

    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-upload`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload-router`, function (req, res) {
    // Prototype: pretend a file was uploaded
    req.session.data['low-complexity-wfd-filename'] = 'WFD-assessment.pdf';
    req.session.data['low-complexity-wfd-file-uploaded'] = true;
    req.session.data['low-complexity-wfd-completed'] = true;

    // After upload, always land on the WFD check page (which Continue takes back to main check if needed)
    res.redirect('water-framework-directive-check-answers');
  });

  // ============================================================
  // WFD cancel — wipes every WFD session key so the next entry is blank
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/wfd-cancel`, function (req, res) {
    delete req.session.data['low-complexity-wfd-assessed'];
    delete req.session.data['low-complexity-wfd-summary'];
    delete req.session.data['low-complexity-wfd-upload-answer'];
    delete req.session.data['low-complexity-wfd-file-uploaded'];
    delete req.session.data['low-complexity-wfd-filename'];
    delete req.session.data['low-complexity-wfd-completed'];
    delete req.session.data['low-complexity-wfd-came-from-wfd-check'];
    delete req.session.data['low-complexity-wfd-errorthispage'];
    delete req.session.data['low-complexity-wfd-error-radio'];
    delete req.session.data['low-complexity-wfd-error-summary'];
    delete req.session.data['low-complexity-wfd-upload-q-errorthispage'];
    req.session.data['camefromcheckanswers'] = false;
    res.redirect('../marine-licence-start-page');
  });

  // ============================================================
  // WFD check answers page
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers`, function (req, res) {
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }

    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers-router`, function (req, res) {
    req.session.data['low-complexity-wfd-completed'] = true;
    // Entering the WFD check page is the natural end of any edit; clear the
    // "came from WFD check" flag so the next fresh journey isn't contaminated.
    req.session.data['low-complexity-wfd-came-from-wfd-check'] = false;

    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      return res.redirect('../check-your-answers#water-framework-directive');
    }
    res.redirect('../marine-licence-start-page');
  });

  ///////////////////////////////////////////
  // Sign-in and Organisation Selector
  ///////////////////////////////////////////

  // Sign-in GET route
  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
    // Clear all low-complexity session data for a fresh start
    // We delete individual properties rather than replacing the entire session object
    // to ensure session persistence works correctly
    
    // Clear project and journey data
    delete req.session.data['low-complexity-project-name-text-input'];
    delete req.session.data['low-complexity-project-background'];
    delete req.session.data['low-complexity-project-background-completed'];
    delete req.session.data['start-date-month'];
    delete req.session.data['start-date-year'];
    delete req.session.data['end-date-month'];
    delete req.session.data['end-date-year'];
    delete req.session.data['low-complexity-dates-completed'];
    
    // Clear site details data
    delete req.session.data['has-visited-site-details'];
    delete req.session.data['low-complexity-site-name-completed'];
    delete req.session.data['low-complexity-type-of-activity'];
    delete req.session.data['low-complexity-type-of-works'];
    delete req.session.data['low-complexity-type-of-works-previous'];
    delete req.session.data['low-complexity-construction-structures'];
    delete req.session.data['low-complexity-type-of-activity-completed'];
    delete req.session.data['low-complexity-activity-description-completed'];
    delete req.session.data['low-complexity-site-duration-completed'];
    delete req.session.data['low-complexity-schedule-completed'];
    delete req.session.data['low-complexity-impacts-completed'];
    
    // Clear environmental assessments data
    delete req.session.data['low-complexity-european-sites'];
    delete req.session.data['low-complexity-european-sites-completed'];
    delete req.session.data['low-complexity-mcz'];
    delete req.session.data['low-complexity-mcz-completed'];
    delete req.session.data['low-complexity-sssi'];
    delete req.session.data['low-complexity-sssi-completed'];
    delete req.session.data['low-complexity-wfd'];
    delete req.session.data['low-complexity-wfd-completed'];
    delete req.session.data['low-complexity-wfd-nautical-mile'];
    delete req.session.data['low-complexity-wfd-assessed'];
    delete req.session.data['low-complexity-wfd-summary'];
    delete req.session.data['low-complexity-wfd-upload-answer'];
    delete req.session.data['low-complexity-wfd-file-uploaded'];
    delete req.session.data['low-complexity-wfd-filename'];
    delete req.session.data['low-complexity-wfd-came-from-wfd-check'];
    
    // Clear other permissions data
    delete req.session.data['low-complexity-special-legal-powers'];
    delete req.session.data['low-complexity-special-legal-powers-details'];
    delete req.session.data['low-complexity-special-legal-powers-completed'];
    delete req.session.data['low-complexity-harbour-authority'];
    delete req.session.data['low-complexity-harbour-authority-details'];
    delete req.session.data['low-complexity-harbour-authority-completed'];
    delete req.session.data['low-complexity-other-permissions'];
    delete req.session.data['low-complexity-other-permissions-details'];
    delete req.session.data['low-complexity-other-permissions-completed'];
    delete req.session.data['low-complexity-consultation'];
    delete req.session.data['low-complexity-consultation-details'];
    delete req.session.data['low-complexity-consultation-completed'];
    
    // Clear sharing information data
    delete req.session.data['low-complexity-sharing-information'];
    delete req.session.data['low-complexity-sharing-information-details'];
    delete req.session.data['low-complexity-sharing-information-completed'];
    
    // Clear error flags
    delete req.session.data['errorthispage'];
    delete req.session.data['errortypeone'];
    delete req.session.data['errortypetwo'];
    
    // Clear organisation data when user signs in
    delete req.session.data['organisation-name'];
    delete req.session.data['changing-organisation'];
    delete req.session.data['organisation-selector-return-to'];
    delete req.session.data['goto-after-org-selector'];
    
    // Store user_type if provided (for organisation vs individual)
    if (req.query.user_type === 'organisation') {
      req.session.data['user_type'] = 'organisation';
    } else {
      // Individual user: clear user_type and set display name for the name bar
      delete req.session.data['user_type'];
      req.session.data['organisation-name'] = 'Sam Evans';
    }
    
    // Store goto parameter if provided (for returning to homepage after sign-out)
    if (req.query.goto) {
      req.session.data['goto'] = req.query.goto;
    }
    
    res.render(`versions/${version}/${section}/sign-in`);
  });

  // Sign-in POST router
  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {
    // Check if there's a goto parameter
    const gotoPage = req.session.data['goto'];
    
    // if a user is an org user then redirect to select an org
    if (req.session.data['user_type'] === 'organisation') {
      // Clear the flag to ensure this is treated as a new selection
      delete req.session.data['changing-organisation'];
      // Store goto for later use
      if (gotoPage) {
        req.session.data['goto-after-org-selector'] = gotoPage;
      }
      res.redirect('organisation-selector');
    } else {
      // For individual users, redirect based on goto parameter or default to project name start
      if (gotoPage === 'homepage') {
        delete req.session.data['goto'];
        res.redirect('homepage');
      } else {
        res.redirect('project-name-start');
      }
    }
  });

  // Organisation selector GET route
  router.get(`/versions/${version}/${section}/organisation-selector`, function (req, res) {
    // Check if user is changing organisation (from homepage switcher)
    const isChangingOrg = req.query.change === 'true';
    if (isChangingOrg) {
      req.session.data['changing-organisation'] = 'true';
    }
    
    // Store returnTo parameter if provided
    if (req.query.returnTo) {
      req.session.data['organisation-selector-return-to'] = req.query.returnTo;
    }

    // Get list of organisations (using the same data structure as exemptions)
    const allOrganisations = [
      { value: "Sam Evans", text: "Sam Evans" },
      { value: "Brighton Marina Operations Ltd", text: "Brighton Marina Operations Ltd" },
      { value: "Exmouth Oysters Ltd", text: "Exmouth Oysters Ltd" },
      { value: "Grimsby Fish Dock Enterprise Ltd", text: "Grimsby Fish Dock Enterprise Ltd" },
      { value: "North East Wind Farms Ltd", text: "North East Wind Farms Ltd" },
      { value: "Ramsgate Marina Ltd", text: "Ramsgate Marina Ltd" }
    ];

    // Filter out current organisation if user is changing
    const currentOrganisation = req.session.data['organisation-name'];
    const organisations = allOrganisations.filter(org => org.value !== currentOrganisation);

    res.render(`versions/${version}/${section}/organisation-selector`, {
      organisations: organisations,
      changingOrganisation: isChangingOrg
    });
  });

  // Organisation selector POST router
  router.post(`/versions/${version}/${section}/organisation-selector-router`, function (req, res) {
    // Turn off errors by default
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Check if the radio button is selected
    if (req.session.data['organisation-name'] === undefined) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      res.redirect('organisation-selector');
    } else {
      // If the user is changing their organisation, redirect to the return destination
      if (req.session.data['changing-organisation'] === 'true') {
        // Reset the flag
        delete req.session.data['changing-organisation'];
        
        // Check if there's a stored return destination
        const returnTo = req.session.data['organisation-selector-return-to'];
        if (returnTo) {
          delete req.session.data['organisation-selector-return-to'];
          res.redirect(returnTo);
        } else {
          // Default to homepage
          res.redirect('homepage');
        }
      } else {
        // Check if there's a stored goto destination
        const gotoPage = req.session.data['goto-after-org-selector'];
        if (gotoPage === 'homepage') {
          delete req.session.data['goto-after-org-selector'];
          delete req.session.data['goto'];
          res.redirect('homepage');
        } else {
          // Default to project-name-start for new users
          delete req.session.data['goto-after-org-selector'];
          res.redirect('project-name-start');
        }
      }
    }
  });

  ///////////////////////////////////////////
  // Homepage
  ///////////////////////////////////////////

  // Homepage GET route
  router.get(`/versions/${version}/${section}/homepage`, function (req, res) {
    res.render(`versions/${version}/${section}/homepage`);
  });

  ///////////////////////////////////////////
  // Projects page
  ///////////////////////////////////////////

  // Projects GET route
  router.get(`/versions/${version}/${section}/projects`, function (req, res) {
    res.render(`versions/${version}/${section}/projects`);
  });

  // Projects withdraw GET route (for demo)
  router.get(`/versions/${version}/${section}/projects-withdraw`, function (req, res) {
    res.render(`versions/${version}/${section}/projects-withdraw`);
  });

  ///////////////////////////////////////////
  // Delete functionality
  ///////////////////////////////////////////

  // Delete GET route
  router.get(`/versions/${version}/${section}/delete`, function (req, res) {
    // Store the project identifier from query parameter
    if (req.query.project) {
      req.session.data['project'] = req.query.project;
    }
    // Store the project type from query parameter
    if (req.query.type) {
      req.session.data['project-type'] = req.query.type;
    }
    // Store the project name from query parameter
    if (req.query.name) {
      req.session.data['project-name'] = req.query.name;
    }
    // Store the return page from query parameter
    if (req.query.return) {
      req.session.data['return-page'] = req.query.return;
    }
    
    // Render with local variables to ensure data is available immediately
    res.render(`versions/${version}/${section}/delete`, {
      projectFromQuery: req.query.project,
      projectTypeFromQuery: req.query.type,
      projectNameFromQuery: req.query.name,
      returnPageFromQuery: req.query.return
    });
  });

  // Delete POST router
  router.post(`/versions/${version}/${section}/delete-router`, function (req, res) {
    // Get the project identifier
    const projectToDelete = req.query.project || req.session.data['project'];
    
    // Set a flag to hide the deleted project (dynamic based on project identifier)
    if (projectToDelete) {
      req.session.data[`deleted-${projectToDelete}`] = 'true';
    }
    
    // Get the return page
    const returnPage = req.session.data['return-page'] || 'projects';
    
    // Clear the project data
    delete req.session.data['project'];
    delete req.session.data['project-type'];
    delete req.session.data['project-name'];
    delete req.session.data['return-page'];
    
    // Redirect back to the appropriate projects page
    res.redirect(returnPage);
  });

  ///////////////////////////////////////////
  // Withdraw functionality
  ///////////////////////////////////////////

  // Withdraw GET route
  router.get(`/versions/${version}/${section}/withdraw`, function (req, res) {
    // Store the project identifier from query parameter
    if (req.query.project) {
      req.session.data['project'] = req.query.project;
    }
    // Store the project type from query parameter
    if (req.query.type) {
      req.session.data['project-type'] = req.query.type;
    }
    // Store the project name from query parameter
    if (req.query.name) {
      req.session.data['project-name'] = req.query.name;
    }
    // Store the return page from query parameter
    if (req.query.return) {
      req.session.data['return-page'] = req.query.return;
    }
    
    // Render with local variables to ensure data is available immediately
    res.render(`versions/${version}/${section}/withdraw`, {
      projectFromQuery: req.query.project,
      projectTypeFromQuery: req.query.type,
      projectNameFromQuery: req.query.name,
      returnPageFromQuery: req.query.return
    });
  });

  // Withdraw POST router
  router.post(`/versions/${version}/${section}/withdraw-router`, function (req, res) {
    // Get the project identifier
    const projectToWithdraw = req.query.project || req.session.data['project'];
    
    // Set a flag to mark the project as withdrawn (dynamic based on project identifier)
    if (projectToWithdraw) {
      req.session.data[`withdrawn-${projectToWithdraw}`] = 'true';
    }
    
    // Get the return page
    const returnPage = req.session.data['return-page'] || 'projects';
    
    // Clear the project data
    delete req.session.data['project'];
    delete req.session.data['project-type'];
    delete req.session.data['project-name'];
    delete req.session.data['return-page'];
    
    // Redirect back to the appropriate projects page
    res.redirect(returnPage);
  });

}