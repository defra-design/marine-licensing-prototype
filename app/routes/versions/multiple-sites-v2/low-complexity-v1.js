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

  // Project name page (accessible from task list)
  router.get(`/versions/${version}/${section}/project-name`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
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
      // Validation passed - set completion flag and redirect to other permissions index
      req.session.data['low-complexity-harbour-authority-completed'] = true;
      res.redirect('./');
    }
  });

  // Special legal powers page
  router.get(`/versions/${version}/${section}/other-permissions/special-legal-powers`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/other-permissions/special-legal-powers`);
  });

  // Special legal powers router (POST)
  router.post(`/versions/${version}/${section}/other-permissions/special-legal-powers-router`, function (req, res) {
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
      // Validation passed - set completion flag and redirect to other permissions index
      req.session.data['low-complexity-special-legal-powers-completed'] = true;
      res.redirect('./');
    }
  });

  // Other authorities page
  router.get(`/versions/${version}/${section}/other-permissions/other-authorities`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
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
      // Validation passed - set completion flag and redirect to other permissions index
      req.session.data['low-complexity-other-permissions-completed'] = true;
      res.redirect('./');
    }
  });

  // Consultation and advertising page
  router.get(`/versions/${version}/${section}/other-permissions/consultation-and-advertising`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
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
      // Validation passed - set completion flag and redirect to other permissions index
      req.session.data['low-complexity-consultation-completed'] = true;
      res.redirect('./');
    }
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
      // Validation passed - set completion flag and redirect to environmental assessments index
      req.session.data['low-complexity-european-sites-completed'] = true;
      res.redirect('./');
    }
  });

  // Marine Conservation Zones page
  router.get(`/versions/${version}/${section}/environmental-assessments/marine-conservation-zones`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
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
      // Validation passed - set completion flag and redirect to environmental assessments index
      req.session.data['low-complexity-mcz-completed'] = true;
      res.redirect('./');
    }
  });

  // Sites of special scientific interest page
  router.get(`/versions/${version}/${section}/environmental-assessments/sites-of-special-scientific-interest`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
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
      // Validation passed - set completion flag and redirect to environmental assessments index
      req.session.data['low-complexity-sssi-completed'] = true;
      res.redirect('./');
    }
  });

  // Water Framework Directive - Smart routing from task list
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    
    // Check if coming from check answers page (change link)
    const fromCheckAnswers = req.query.fromcheckanswers === 'true';
    
    // Smart routing: If file uploaded AND not coming from check answers, go to check answers
    if (req.session.data['low-complexity-wfd-file-uploaded'] && !fromCheckAnswers) {
      res.redirect('water-framework-directive-check-answers');
    } else {
      res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive`);
    }
  });

  // Water Framework Directive Yes/No question router (POST)
  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-router`, function (req, res) {
    // Clear error flags
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    // Get the nautical mile answer
    const nauticalMile = req.session.data['low-complexity-wfd-nautical-mile'];
    const fromCheckAnswers = req.query.fromcheckanswers === 'true';

    // Validate: check if radio is selected
    if (!nauticalMile) {
      // Set error flags
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      
      // Redirect back to the same page with errors
      res.redirect('water-framework-directive' + (fromCheckAnswers ? '?fromcheckanswers=true' : ''));
    } else if (nauticalMile === 'No') {
      // If No, mark as complete and return to task list
      req.session.data['low-complexity-wfd-completed'] = true;
      // Clear file upload data if it exists
      delete req.session.data['low-complexity-wfd-file-uploaded'];
      delete req.session.data['low-complexity-wfd-filename'];
      res.redirect('./');
    } else if (nauticalMile === 'Yes') {
      // If Yes, go to upload page (pass along fromcheckanswers if present)
      if (fromCheckAnswers) {
        res.redirect('water-framework-directive-upload?fromcheckanswers=true');
      } else {
        res.redirect('water-framework-directive-upload');
      }
    }
  });

  // Water Framework Directive Upload page
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload`, function (req, res) {
    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-upload`);
  });

  // Water Framework Directive Upload router (POST)
  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-upload-router`, function (req, res) {
    // Store filename (in real app, this would come from actual file upload)
    // For prototype, we'll use a default filename
    req.session.data['low-complexity-wfd-filename'] = 'WFD.pdf';
    req.session.data['low-complexity-wfd-file-uploaded'] = true;
    
    // Always go to check answers after upload
    res.redirect('water-framework-directive-check-answers');
  });

  // Water Framework Directive Check Answers page
  router.get(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers`, function (req, res) {
    res.render(`versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers`);
  });

  // Water Framework Directive Check Answers router (POST)
  router.post(`/versions/${version}/${section}/environmental-assessments/water-framework-directive-check-answers-router`, function (req, res) {
    // Mark task as complete
    req.session.data['low-complexity-wfd-completed'] = true;
    
    // Return to environmental assessments task list
    res.redirect('./');
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
    delete req.session.data['low-complexity-duration-years'];
    delete req.session.data['low-complexity-duration-months'];
    delete req.session.data['low-complexity-duration-completed'];
    delete req.session.data['start-date-day'];
    delete req.session.data['start-date-month'];
    delete req.session.data['start-date-year'];
    delete req.session.data['end-date-day'];
    delete req.session.data['end-date-month'];
    delete req.session.data['end-date-year'];
    delete req.session.data['low-complexity-dates-completed'];
    delete req.session.data['low-complexity-cost'];
    delete req.session.data['low-complexity-cost-completed'];
    
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
    delete req.session.data['low-complexity-wfd-file-uploaded'];
    delete req.session.data['low-complexity-wfd-filename'];
    
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
    } else if (req.query.user_type === '') {
      // Explicitly clear user_type for individual users
      delete req.session.data['user_type'];
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
      { value: "Brighton Marina Operations", text: "Brighton Marina Operations" },
      { value: "Grimsby Fish Dock Enterprise", text: "Grimsby Fish Dock Enterprise" },
      { value: "North East Wind Farms", text: "North East Wind Farms" },
      { value: "Ramsgate Marina", text: "Ramsgate Marina" }
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

}