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
    res.render(`versions/${version}/${section}/project-details/dates-of-marine-works`);
  });

  // Cost of marine works page
  router.get(`/versions/${version}/${section}/project-details/cost-of-marine-works`, function (req, res) {
    // Clear error flags when navigating to the page
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    res.render(`versions/${version}/${section}/project-details/cost-of-marine-works`);
  });

  ///////////////////////////////////////////
  // Projects page
  ///////////////////////////////////////////
}