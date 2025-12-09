module.exports = function (router) {
  // Low complexity v1 routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v1";

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
      // Validation passed - redirect to next page (doesn't exist yet)
      res.redirect('marine-licence-start-page');
    }
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
      // Validation passed - set completion flag and redirect to project details index
      req.session.data['low-complexity-project-background-completed'] = true;
      res.redirect('./');
    }
  });

  // Duration page
  router.get(`/versions/${version}/${section}/project-details/duration`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/project-details/duration`);
  });

  // Duration router (POST)
  router.post(`/versions/${version}/${section}/project-details/duration-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the duration values
    const durationYears = req.session.data['low-complexity-duration-years'];
    const durationMonths = req.session.data['low-complexity-duration-months'];

    // Validate: check if BOTH fields have values and track which fields are missing
    const yearsEmpty = !durationYears || durationYears.trim() === '';
    const monthsEmpty = !durationMonths || durationMonths.trim() === '';

    if (yearsEmpty || monthsEmpty) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      
      // Set specific error flags for each field
      if (yearsEmpty) {
        req.session.data['errortypeone'] = "true"; // Years error
      }
      if (monthsEmpty) {
        req.session.data['errortypetwo'] = "true"; // Months error
      }
      
      // Redirect back to the same page with errors
      res.redirect('duration');
    } else {
      // Validation passed - set completion flag and redirect to project details index
      req.session.data['low-complexity-duration-completed'] = true;
      res.redirect('./');
    }
  });

  // Dates of marine works page
  router.get(`/versions/${version}/${section}/project-details/dates-of-marine-works`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/project-details/dates-of-marine-works`);
  });

  // Dates of marine works router (POST)
  router.post(`/versions/${version}/${section}/project-details/dates-of-marine-works-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the date values
    const startDay = req.session.data['start-date-day'];
    const startMonth = req.session.data['start-date-month'];
    const startYear = req.session.data['start-date-year'];
    const endDay = req.session.data['end-date-day'];
    const endMonth = req.session.data['end-date-month'];
    const endYear = req.session.data['end-date-year'];

    let hasError = false;

    // Check if start date has any empty fields
    if (!startDay || startDay.trim() === '' || !startMonth || startMonth.trim() === '' || !startYear || startYear.trim() === '') {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      hasError = true;
    }

    // Check if end date has any empty fields
    if (!endDay || endDay.trim() === '' || !endMonth || endMonth.trim() === '' || !endYear || endYear.trim() === '') {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      hasError = true;
    }

    if (hasError) {
      // Redirect back to the same page with errors
      res.redirect('dates-of-marine-works');
    } else {
      // Validation passed - set completion flag and redirect to project details index
      req.session.data['low-complexity-dates-completed'] = true;
      res.redirect('./');
    }
  });

  // Cost of marine works page
  router.get(`/versions/${version}/${section}/project-details/cost-of-marine-works`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    res.render(`versions/${version}/${section}/project-details/cost-of-marine-works`);
  });

  // Cost of marine works router (POST)
  router.post(`/versions/${version}/${section}/project-details/cost-of-marine-works-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the cost value
    const cost = req.session.data['low-complexity-cost'];

    // Validate: check if cost is empty or undefined
    if (!cost || cost.trim() === '') {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('cost-of-marine-works');
    } else {
      // Validation passed - set completion flag and redirect to project details index
      req.session.data['low-complexity-cost-completed'] = true;
      res.redirect('./');
    }
  });

  ///////////////////////////////////////////
  // Related permissions section
  ///////////////////////////////////////////

  // Related permissions index page
  router.get(`/versions/${version}/${section}/related-permissions`, function (req, res) {
    res.render(`versions/${version}/${section}/related-permissions/index`);
  });

  // Special legal powers page
  router.get(`/versions/${version}/${section}/related-permissions/special-legal-powers`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/related-permissions/special-legal-powers`);
  });

  // Special legal powers router (POST)
  router.post(`/versions/${version}/${section}/related-permissions/special-legal-powers-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const specialLegalPowers = req.session.data['low-complexity-special-legal-powers'];
    const specialLegalPowersDetails = req.session.data['low-complexity-special-legal-powers-details'];

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
      // Validation passed - set completion flag and redirect to related permissions index
      req.session.data['low-complexity-special-legal-powers-completed'] = true;
      res.redirect('./');
    }
  });

  // Other permissions page
  router.get(`/versions/${version}/${section}/related-permissions/other-permissions`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/related-permissions/other-permissions`);
  });

  // Other permissions router (POST)
  router.post(`/versions/${version}/${section}/related-permissions/other-permissions-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const otherPermissions = req.session.data['low-complexity-other-permissions'];
    const otherPermissionsDetails = req.session.data['low-complexity-other-permissions-details'];

    // Validate: check if radio is selected
    if (!otherPermissions) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('other-permissions');
    } else if (otherPermissions === 'Yes' && (!otherPermissionsDetails || otherPermissionsDetails.trim() === '')) {
      // If Yes is selected, check if textarea has content
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('other-permissions');
    } else {
      // Validation passed - set completion flag and redirect to related permissions index
      req.session.data['low-complexity-other-permissions-completed'] = true;
      res.redirect('./');
    }
  });

  // Consultation and advertising page
  router.get(`/versions/${version}/${section}/related-permissions/consultation-and-advertising`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/related-permissions/consultation-and-advertising`);
  });

  // Consultation and advertising router (POST)
  router.post(`/versions/${version}/${section}/related-permissions/consultation-and-advertising-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    // Get the radio value
    const consultation = req.session.data['low-complexity-consultation'];
    const consultationDetails = req.session.data['low-complexity-consultation-details'];

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
      // Validation passed - set completion flag and redirect to related permissions index
      req.session.data['low-complexity-consultation-completed'] = true;
      res.redirect('./');
    }
  });

  ///////////////////////////////////////////
  // Projects page
  ///////////////////////////////////////////
}