module.exports = function (router) {
  // Low complexity v2 routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v4";

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
    if (req.path.indexOf('low-complexity-v4') !== -1) {
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

  router.get(`/versions/${version}/${section}/application-name-start`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    res.render(`versions/${version}/${section}/application-name-start`);
  });

  // Project name start router (POST)
  router.post(`/versions/${version}/${section}/application-name-start-router`, function (req, res) {
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
      res.redirect('application-name-start');
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
    if (req.query['mpp-policies-loaded'] === 'true') {
      req.session.data['mpp-load-outcome'] = 'success';
      delete req.session.data['mpp-policies-loaded'];
      // Redirect so the task list reads updated session data (file store snapshot issue)
      return res.redirect(`/versions/${version}/${section}/marine-licence-start-page`);
    }
    res.render(`versions/${version}/${section}/marine-licence-start-page`);
  });

  router.get(`/versions/${version}/${section}/mpp-policies-recovered`, function (req, res) {
    req.session.data['mpp-load-outcome'] = 'timeout-recovered';
    delete req.session.data['mpp-policies-loaded'];
    res.redirect(`/versions/${version}/${section}/marine-licence-start-page`);
  });

  router.get(`/versions/${version}/${section}/loading-marine-plan-policies`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render(`versions/${version}/${section}/loading-marine-plan-policies`);
  });

  router.get(`/versions/${version}/${section}/loading-marine-plan-policies-retry`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    req.session.data['mpp-load-outcome'] = 'success';
    res.render(`versions/${version}/${section}/loading-marine-plan-policies-retry`);
  });

  // Project name page (accessible from task list)
  router.get(`/versions/${version}/${section}/application-name`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/application-name`);
  });

  ///////////////////////////////////////////
  // Project details section
  ///////////////////////////////////////////

  // Project details index page
  router.get(`/versions/${version}/${section}/project-details`, function (req, res) {
    res.render(`versions/${version}/${section}/project-details/index`);
  });

  // Project background page
  router.get(`/versions/${version}/${section}/project-details/proposed-works-summary`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/project-details/proposed-works-summary`);
  });

  // Project background router (POST)
  router.post(`/versions/${version}/${section}/project-details/proposed-works-summary-router`, function (req, res) {
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
      res.redirect('proposed-works-summary');
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

  // ============================================================
  // WFD — helper: clear all WFD session data
  // ============================================================
  function clearWfdData(data) {
    delete data['low-complexity-wfd-within-nautical-mile'];
    delete data['low-complexity-wfd-excluded-activities'];
    delete data['low-complexity-wfd-filename'];
    delete data['low-complexity-wfd-completed'];
    delete data['low-complexity-wfd-from-cya'];
    delete data['low-complexity-wfd-from-main-cya'];
    delete data['low-complexity-wfd-q1-original'];
    delete data['low-complexity-wfd-q2-original'];
    delete data['low-complexity-wfd-q1-error'];
    delete data['low-complexity-wfd-q2-error'];
  }

  // ============================================================
  // WFD entry point — smart-routes on re-entry
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive`, function (req, res) {
    const fromCya = req.query.fromcheckanswers === 'true';

    // Coming via the WFD card Change link on the MAIN check-your-answers page
    // (the "No to 1nm" end-point). Flag it so Continue returns to the main check page.
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['low-complexity-wfd-from-main-cya'] = true;
    }

    if (fromCya) {
      // Coming via a Change link from the WFD CYA page — snapshot the current answer
      // (so an unchanged answer can jump straight back) and set the from-cya flag so
      // Cancel links are hidden. Downstream answers are preserved and only cleared in
      // the router if the answer actually changes.
      req.session.data['low-complexity-wfd-q1-original'] = req.session.data['low-complexity-wfd-within-nautical-mile'];
      req.session.data['low-complexity-wfd-from-cya'] = true;
      delete req.session.data['low-complexity-wfd-q1-error'];
      return res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive`);
    }

    // Fresh entry from task list
    delete req.session.data['low-complexity-wfd-q1-error'];

    if (req.session.data['low-complexity-wfd-completed']) {
      // Already completed — skip before-you-start
      if (req.session.data['low-complexity-wfd-within-nautical-mile'] === 'No') {
        // Re-entry after a No answer: show Q1 with answer pre-selected
        return res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive`);
      }
      // Re-entry after a Yes path: go to CYA
      return res.redirect('water-framework-directive-check-answers');
    }

    // Not yet started — show before-you-start page
    res.redirect('water-framework-directive-before-you-start');
  });

  // ============================================================
  // WFD before you start page
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-before-you-start`, function (req, res) {
    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-before-you-start`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-before-you-start-router`, function (req, res) {
    res.redirect('water-framework-directive-q1');
  });

  // ============================================================
  // WFD Q1 — Is your project within one nautical mile of the coast?
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-q1`, function (req, res) {
    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-router`, function (req, res) {
    delete req.session.data['low-complexity-wfd-q1-error'];

    const answer = req.session.data['low-complexity-wfd-within-nautical-mile'];
    const fromCya = req.session.data['low-complexity-wfd-from-cya'];
    const fromMainCya = req.session.data['low-complexity-wfd-from-main-cya'];
    const original = req.session.data['low-complexity-wfd-q1-original'];

    if (!answer) {
      req.session.data['low-complexity-wfd-q1-error'] = "true";
      return res.redirect('water-framework-directive-q1');
    }

    // Editing from the WFD CYA page and the answer is unchanged — jump straight back
    if (fromCya && original !== undefined && answer === original) {
      delete req.session.data['low-complexity-wfd-q1-original'];
      return res.redirect('water-framework-directive-check-answers');
    }
    delete req.session.data['low-complexity-wfd-q1-original'];

    if (answer === 'No') {
      // Clear all downstream data
      delete req.session.data['low-complexity-wfd-excluded-activities'];
      delete req.session.data['low-complexity-wfd-filename'];
      req.session.data['low-complexity-wfd-completed'] = true;
      req.session.data['low-complexity-wfd-from-cya'] = false;
      // Came from the main check page — return there, anchored on the WFD card
      if (fromMainCya) {
        req.session.data['low-complexity-wfd-from-main-cya'] = false;
        return res.redirect('../check-your-answers#water-framework-directive');
      }
      return res.redirect('../marine-licence-start-page');
    }

    // answer === 'Yes'
    return res.redirect('water-framework-directive-excluded-activities');
  });

  // ============================================================
  // WFD Q2 — Is your project limited to excluded activities?
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-excluded-activities`, function (req, res) {
    const fromCya = req.query.fromcheckanswers === 'true';

    if (fromCya) {
      // Snapshot the current answer; downstream is only cleared in the router if it changes
      req.session.data['low-complexity-wfd-q2-original'] = req.session.data['low-complexity-wfd-excluded-activities'];
      req.session.data['low-complexity-wfd-from-cya'] = true;
    }

    delete req.session.data['low-complexity-wfd-q2-error'];
    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-excluded-activities`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-excluded-activities-router`, function (req, res) {
    delete req.session.data['low-complexity-wfd-q2-error'];

    const answer = req.session.data['low-complexity-wfd-excluded-activities'];
    const fromCya = req.session.data['low-complexity-wfd-from-cya'];
    const original = req.session.data['low-complexity-wfd-q2-original'];

    if (!answer) {
      req.session.data['low-complexity-wfd-q2-error'] = "true";
      return res.redirect('water-framework-directive-excluded-activities');
    }

    // Editing from the WFD CYA page and the answer is unchanged — jump straight back
    if (fromCya && original !== undefined && answer === original) {
      delete req.session.data['low-complexity-wfd-q2-original'];
      return res.redirect('water-framework-directive-check-answers');
    }
    delete req.session.data['low-complexity-wfd-q2-original'];

    if (answer === 'Yes') {
      // Excluded activity — clear downstream data and go to CYA
      delete req.session.data['low-complexity-wfd-filename'];
      return res.redirect('water-framework-directive-check-answers');
    }

    // answer === 'No'
    return res.redirect('water-framework-directive-upload');
  });

  // ============================================================
  // WFD file upload page
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload`, function (req, res) {
    const fromCya = req.query.fromcheckanswers === 'true';

    if (fromCya) {
      req.session.data['low-complexity-wfd-from-cya'] = true;
    }

    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-upload`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload-router`, function (req, res) {
    // Prototype: pretend a file was uploaded
    req.session.data['low-complexity-wfd-filename'] = 'WFD.doc';
    return res.redirect('water-framework-directive-check-answers');
  });

  // ============================================================
  // Redact — session writes go to a file store asynchronously, so a
  // redirect can otherwise be followed before the write lands and the
  // next page renders stale answers. Flush first, then redirect.
  // ============================================================
  function redirectOnceSaved (req, res, target) {
    req.session.save(function () {
      res.redirect(target);
    });
  }

  // ============================================================
  // Redact — case officer uploads a replacement for a document the
  // applicant has resent with their own redactions applied
  // ============================================================
  router.post(`/versions/${version}/${section}/redact/replace-document-router`, function (req, res) {
    return redirectOnceSaved(req, res, 'redact-details');
  });

  // ============================================================
  // Redact — the redaction page posts here on save, preview, or on the
  // way to replacing a document. The kit's autoStoreData has already
  // written every answer to the session by the time this runs; all this
  // does is decide where to send the case officer next.
  //
  // `_next` starts with an underscore so the kit deliberately does not
  // store it — it stays a one-off instruction, not session state.
  // ============================================================
  router.post(`/versions/${version}/${section}/redact/redact-router`, function (req, res) {
    // Previewing shows work in progress, so it must not claim the
    // application has been redacted.
    if (req.body._next === 'preview') {
      return redirectOnceSaved(req, res, 'preview');
    }

    if (req.body._next === 'replace-document') {
      return redirectOnceSaved(req, res, 'replace-document');
    }

    req.session.data['redact-saved'] = 'yes';
    return redirectOnceSaved(req, res, 'redact-details');
  });

  // ============================================================
  // WFD cancel — wipes every WFD session key so next entry is fresh
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/wfd-cancel`, function (req, res) {
    clearWfdData(req.session.data);
    res.redirect('../marine-licence-start-page');
  });

  // ============================================================
  // WFD check your answers page
  // ============================================================
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers`, function (req, res) {
    // Reached via the WFD card Change link on the MAIN check-your-answers page
    // (the "Yes to 1nm" path). Flag it so Continue returns to the main check page.
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['low-complexity-wfd-from-main-cya'] = true;
    }
    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers`);
  });

  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers-router`, function (req, res) {
    req.session.data['low-complexity-wfd-completed'] = true;
    req.session.data['low-complexity-wfd-from-cya'] = false;
    // Came from the main check page — return there, anchored on the WFD card
    if (req.session.data['low-complexity-wfd-from-main-cya']) {
      req.session.data['low-complexity-wfd-from-main-cya'] = false;
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
    delete req.session.data['low-complexity-construction-files'];
    delete req.session.data['construction-delete-next'];
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
    delete req.session.data['low-complexity-wfd-within-nautical-mile'];
    delete req.session.data['low-complexity-wfd-excluded-activities'];
    delete req.session.data['low-complexity-wfd-filename'];
    delete req.session.data['low-complexity-wfd-completed'];
    delete req.session.data['low-complexity-wfd-from-cya'];
    delete req.session.data['low-complexity-wfd-from-main-cya'];
    delete req.session.data['low-complexity-wfd-q1-original'];
    delete req.session.data['low-complexity-wfd-q2-original'];
    delete req.session.data['low-complexity-wfd-q1-error'];
    delete req.session.data['low-complexity-wfd-q2-error'];
    
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

    // Clear reject / resubmit journey data so the resubmit draft does not linger
    delete req.session.data['resubmit-draft-created'];
    delete req.session.data['resubmit-draft-created-date'];
    delete req.session.data['deleted-plymouth-resubmit'];
    
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
        res.redirect('application-name-start');
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
          // Default to application-name-start for new users
          delete req.session.data['goto-after-org-selector'];
          res.redirect('application-name-start');
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
  router.get(`/versions/${version}/${section}/submissions`, function (req, res) {
    res.render(`versions/${version}/${section}/submissions`);
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
    const returnPage = req.session.data['return-page'] || 'submissions';
    
    // Clear the project data
    delete req.session.data['project'];
    delete req.session.data['project-type'];
    delete req.session.data['project-name'];
    delete req.session.data['return-page'];
    
    // Redirect back to the appropriate submissions page
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
    const returnPage = req.session.data['return-page'] || 'submissions';
    
    // Clear the project data
    delete req.session.data['project'];
    delete req.session.data['project-type'];
    delete req.session.data['project-name'];
    delete req.session.data['return-page'];
    
    // Redirect back to the appropriate submissions page
    res.redirect(returnPage);
  });

  // Pontoon landing page – pass showBackToProjects explicitly (query is not
  // available in auto-rendered views; only session data is)
  router.get(`/versions/${version}/${section}/email-landings/pontoon-landing`, function (req, res) {
    const showBackToProjects = req.query.from === 'submissions';

    if (!showBackToProjects) {
      delete req.session.data.from;
    }

    res.render(`versions/${version}/${section}/email-landings/pontoon-landing`, {
      showBackToProjects: showBackToProjects
    });
  });

  // Plymouth Sound landing page – pass showBackToProjects explicitly (query is not
  // available in auto-rendered views; only session data is)
  router.get(`/versions/${version}/${section}/email-landings/plymouth-sound-landing`, function (req, res) {
    const showBackToProjects = req.query.from === 'submissions';

    if (!showBackToProjects) {
      delete req.session.data.from;
    }

    res.render(`versions/${version}/${section}/email-landings/plymouth-sound-landing`, {
      showBackToProjects: showBackToProjects
    });
  });

  ///////////////////////////////////////////
  // Reject / resubmit journey
  ///////////////////////////////////////////

  // Clears every key the resubmit seed sets, returning the session to its
  // pre-Continue state. This is what guarantees no resubmit draft can show on
  // the Submissions page (neither the dedicated row nor the generic
  // application-name row) until Continue is clicked again.
  function clearResubmitDraft(d) {
    const keys = [
      'low-complexity-application-status', 'low-complexity-application-reference',
      'resubmit-draft-created', 'resubmit-draft-created-date', 'deleted-plymouth-resubmit',
      'low-complexity-project-name-text-input',
      'low-complexity-project-background', 'low-complexity-project-background-completed',
      'start-date-month', 'start-date-year', 'end-date-month', 'end-date-year', 'low-complexity-dates-completed',
      'low-complexity-site-location-method', 'has-visited-site-details',
      'low-complexity-site-name', 'low-complexity-site-name-completed',
      'low-complexity-file-upload-activities', 'low-complexity-construction-files',
      'construction-delete-next', 'site-details-confirmed-complete',
      'mpp-previously-unlocked',
      'low-complexity-wfd-within-nautical-mile', 'low-complexity-wfd-completed',
      'low-complexity-special-legal-powers', 'low-complexity-special-legal-powers-completed',
      'low-complexity-harbour-authority', 'low-complexity-harbour-authority-details', 'low-complexity-harbour-authority-completed',
      'low-complexity-other-permissions', 'low-complexity-other-permissions-details', 'low-complexity-other-permissions-completed',
      'low-complexity-consultation', 'low-complexity-consultation-details', 'low-complexity-consultation-completed',
      'low-complexity-fee-estimate-completed', 'low-complexity-fee-terms-checkbox', 'low-complexity-fee-acceptance',
      'invoice-address-type', 'invoice-address-line-1', 'invoice-address-line-2', 'invoice-town-city',
      'invoice-county', 'invoice-postcode', 'invoice-full-name', 'invoice-organisation-name',
      'invoice-phone', 'invoice-email', 'invoice-po-required', 'low-complexity-invoicing-completed',
      'low-complexity-sharing-information', 'low-complexity-sharing-information-completed'
    ];
    keys.forEach(function (k) { delete d[k]; });
    ['s-acc-1', 's-bio-1', 's-agg-4', 's-emp-1', 's-uwn-2'].forEach(function (key) {
      delete d['marine-plan-policy-' + key + '-completed'];
      delete d['marine-plan-policy-v2-' + key + '-completed'];
    });
  }

  // Update and resubmit page — reset any previously-created resubmit draft so it
  // only (re)appears once Continue is clicked. Being on this page means the user
  // is about to create the draft; until they submit, no draft should exist.
  // no-store prevents the browser serving a cached page on back-navigation.
  router.get(`/versions/${version}/${section}/update-and-resubmit`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    clearResubmitDraft(req.session.data);
    res.render(`versions/${version}/${section}/update-and-resubmit`);
  });

  // Seeds a brand new draft that mirrors the original (rejected) Plymouth Sound
  // cable laying application, so the marine licence start page shows a fully
  // completed draft that can be reviewed, corrected and resubmitted.
  router.get(`/versions/${version}/${section}/seed-resubmit-draft`, function (req, res) {
    const d = req.session.data;

    // Treat as a fresh draft application
    d['low-complexity-application-status'] = 'draft';
    d['low-complexity-application-reference'] = '-';

    // Mark that the resubmit draft has been created. This is what makes the new
    // draft show on the Projects page and switches the "unable to progress"
    // landing page and the original application's view-details page to their
    // post-resubmit state. Store the creation date in GOV.UK format.
    d['resubmit-draft-created'] = 'true';
    // Re-running Continue after a delete should bring the draft back
    delete d['deleted-plymouth-resubmit'];
    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    d['resubmit-draft-created-date'] = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    // --- Project details ---
    d['low-complexity-project-name-text-input'] = 'Plymouth Sound cable laying';
    d['low-complexity-project-background'] = "Southwest Marine Works Ltd will install a subsea telecommunications cable across Plymouth Sound to connect a new coastal monitoring station on Mount Batten to the mainland network. The works involve laying approximately 2.4 kilometres of fibre optic cable along a pre-surveyed route on the seabed, with sections buried using a jetting sled to protect the cable from vessel anchors and fishing activity. Landfall points will be established at Mount Batten Pier and Queen Anne's Battery, with cable protection installed at both shore ends.";
    d['low-complexity-project-background-completed'] = true;

    d['start-date-month'] = '6';
    d['start-date-year'] = '2026';
    d['end-date-month'] = '1';
    d['end-date-year'] = '2027';
    d['low-complexity-dates-completed'] = true;

    // --- Site and activity details (file upload path, single site + activity) ---
    d['low-complexity-site-location-method'] = 'file-upload';
    d['has-visited-site-details'] = true;
    d['low-complexity-site-name'] = "Plymouth Sound cable route – Mount Batten to Queen Anne's Battery";
    d['low-complexity-site-name-completed'] = true;
    d['low-complexity-file-upload-activities'] = [
      {
        activityNumber: 1,
        'low-complexity-type-of-activity': 'construction',
        'low-complexity-type-of-activity-completed': true,
        'low-complexity-type-of-works': 'construction-new',
        'low-complexity-construction-structures': ['subsea-cables'],
        'low-complexity-activity-description': "Installation of a single 48-core armoured fibre optic telecommunications cable (nominal outer diameter 32mm) along a pre-surveyed route of approximately 2.4 kilometres across Plymouth Sound. The cable will be surface-laid from a cable lay barge and buried to a target depth of 0.6 to 1.0 metres using a water-jetting sled. Where burial to target depth is not achievable due to rock or hard substrate, the cable will be protected using concrete mattresses and rock bags. At each landfall (Mount Batten Pier and Queen Anne's Battery) the cable will be brought ashore through pre-installed ducts and protected with cast-iron split-pipe and a short section of rock armour.",
        'low-complexity-activity-description-completed': true,
        'low-complexity-site-duration-years': '0',
        'low-complexity-site-duration-months': '1',
        'low-complexity-site-duration-completed': true,
        'low-complexity-date-completed-by': 'No',
        'low-complexity-date-completed-by-completed': true,
        'low-complexity-months-of-activity': 'Yes',
        'low-complexity-months-of-activity-details': 'Installation to be carried out between June and September to make use of the calmer summer weather window and to avoid the peak overwintering period for waterfowl in the Sound.',
        'low-complexity-months-of-activity-completed': true,
        'low-complexity-working-hours': 'Marine operations on a 24-hour basis over a continuous installation window of up to 5 days. Landfall works at each shore end limited to Monday to Saturday, 07:00 to 19:00.',
        'low-complexity-working-hours-completed': true
      }
    ];
    // Construction of new works activity — seed a completed construction drawing upload
    d['low-complexity-construction-files'] = [
      { fileNumber: 1, filename: 'tech-drawing.pdf' }
    ];
    d['site-details-confirmed-complete'] = true;

    // --- Marine plan policy considerations (5 active policies in this prototype) ---
    // The start page reads either the v1 (marine-plan-policy-) or v2
    // (marine-plan-policy-v2-) flags depending on the session's mpp-version, so
    // seed both variants to keep the section Completed whichever is active.
    // Use the latest (v2) Marine plan policies task list (Cross-cutting, etc.).
    d['mpp-version'] = '2';
    d['mpp-previously-unlocked'] = true;
    ['s-acc-1', 's-bio-1', 's-agg-4', 's-emp-1', 's-uwn-2'].forEach(function (key) {
      d['marine-plan-policy-' + key + '-completed'] = true;
      d['marine-plan-policy-v2-' + key + '-completed'] = true;
    });

    // Carry over the original (incorrect) S-BIO-1 answer of "Not applicable" so
    // the applicant can review and correct it before resubmitting.
    d['marine-plan-policy-s-bio-1-text'] = 'Not applicable';
    d['marine-plan-policy-v2-s-bio-1-text'] = 'Not applicable';

    // --- Water Framework Directive ---
    // Carries over the original (incorrect) answer of "No" so the applicant can
    // review and correct it before resubmitting.
    d['low-complexity-wfd-within-nautical-mile'] = 'No';
    d['low-complexity-wfd-completed'] = true;

    // --- Other permissions ---
    d['low-complexity-special-legal-powers'] = 'No';
    d['low-complexity-special-legal-powers-completed'] = true;
    d['low-complexity-harbour-authority'] = 'Yes';
    d['low-complexity-harbour-authority-details'] = "Dockyard Port of Plymouth. The works have been discussed with the Queen's Harbour Master (QHM Plymouth), who controls the Dockyard Port, and with Cattewater Harbour Commissioners. A works licence and dive/vessel operation approvals will be obtained from QHM before marine operations begin. QHM ref: QHM/PLY/2026/117.";
    d['low-complexity-harbour-authority-completed'] = true;
    d['low-complexity-other-permissions'] = 'Yes';
    d['low-complexity-other-permissions-details'] = "Plymouth City Council — pre-application advice sought regarding the landfall works. Devon and Severn IFCA — consulted in relation to fishing activity along the route. Natural England — pre-application advice sought in relation to the Plymouth Sound and Estuaries SAC and MCZ.";
    d['low-complexity-other-permissions-completed'] = true;
    d['low-complexity-consultation'] = 'Yes';
    d['low-complexity-consultation-details'] = "Consulted the Queen's Harbour Master, Cattewater Harbour Commissioners, Devon and Severn IFCA, Natural England and local sailing and diving clubs. No objections raised subject to adequate burial and protection and avoidance of designated features.";
    d['low-complexity-consultation-completed'] = true;

    // --- Fee estimate ---
    d['low-complexity-fee-estimate-completed'] = 'true';
    d['low-complexity-fee-terms-checkbox'] = 'agree';
    d['low-complexity-fee-acceptance'] = 'yes';
    delete d['low-complexity-fee-estimate-rejected'];

    // --- Invoicing details ---
    d['invoice-address-type'] = 'uk';
    d['invoice-address-line-1'] = "Unit 7, Queen Anne's Battery";
    d['invoice-address-line-2'] = 'Coxside';
    d['invoice-town-city'] = 'Plymouth';
    d['invoice-county'] = 'Devon';
    d['invoice-postcode'] = 'PL4 0LP';
    d['invoice-full-name'] = 'Rachel Stow';
    d['invoice-organisation-name'] = 'Southwest Marine Works Ltd';
    d['invoice-phone'] = '01752 900123';
    d['invoice-email'] = 'accounts@southwestmarineworks.co.uk';
    d['invoice-po-required'] = 'no';
    d['low-complexity-invoicing-completed'] = true;

    // --- Sharing project information publicly ---
    d['low-complexity-sharing-information'] = 'Yes';
    d['low-complexity-sharing-information-completed'] = true;

    res.redirect('marine-licence-start-page');
  });

}