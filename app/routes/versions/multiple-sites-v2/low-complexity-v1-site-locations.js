module.exports = function (router) {
  // Low complexity v1 site locations routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v1";
  const subsection = "site-details";

  /////////////////////////////////////////////////////////
  //////// Site details index page (before you start)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
    // If user has already visited and saved site details, go straight to review page
    if (req.session.data['has-visited-site-details']) {
      res.redirect('review-site-details');
      return;
    }
    
    // Clear any incomplete journey states when starting fresh
    // Only clear if they haven't completed and saved the journey
    if (!req.session.data['has-visited-site-details']) {
      // Clear file upload journey states
      delete req.session.data['low-complexity-site-location-method'];
      delete req.session.data['low-complexity-file-type'];
      delete req.session.data['hasUploadedSiteFile'];
    }
    
    res.render(`versions/${version}/${section}/${subsection}/index`);
  });

  // Site details index router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/index-router`, function (req, res) {
    res.redirect('how-do-you-want-to-provide-site-location');
  });

  /////////////////////////////////////////////////////////
  //////// How do you want to provide site location page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/how-do-you-want-to-provide-site-location`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/how-do-you-want-to-provide-site-location`);
  });

  // How do you want to provide site location router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/how-do-you-want-to-provide-site-location-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-errorthispage'] = "false";

    // Check if option is selected
    if (!req.session.data['low-complexity-site-location-method']) {
      req.session.data['low-complexity-errorthispage'] = "true";
      res.redirect('how-do-you-want-to-provide-site-location');
      return;
    }

    // Route based on selection
    if (req.session.data['low-complexity-site-location-method'] === 'file-upload') {
      res.redirect('which-type-of-file');
    } else {
      // For manual entry - redirect back to same page for now since manual entry is not implemented
      res.redirect('how-do-you-want-to-provide-site-location');
    }
  });

  /////////////////////////////////////////////////////////
  //////// Which type of file page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/which-type-of-file`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/which-type-of-file`);
  });

  // Which type of file router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/which-type-of-file-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-file-type-errorthispage'] = "false";

    // Check if option is selected
    if (!req.session.data['low-complexity-file-type']) {
      req.session.data['low-complexity-file-type-errorthispage'] = "true";
      res.redirect('which-type-of-file');
      return;
    }

    // Route to upload file page
    res.redirect('upload-file');
  });

  /////////////////////////////////////////////////////////
  //////// Upload file page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/upload-file`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/upload-file`);
  });

  // Upload file router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/upload-file-router`, function (req, res) {
    // For prototype, redirect to review site details after file upload
    req.session.data['hasUploadedSiteFile'] = true;
    // Mark that user has visited site details journey (reached review page)
    req.session.data['has-visited-site-details'] = true;
    res.redirect('review-site-details');
  });

  /////////////////////////////////////////////////////////
  //////// Review site details page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/review-site-details`, function (req, res) {
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/${subsection}/review-site-details`);
  });

  // Review site details router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/review-site-details-router`, function (req, res) {
    // Mark that user has visited site details journey
    req.session.data['has-visited-site-details'] = true;
    
    // Check if we need to return to check answers
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      res.redirect('../check-your-answers#site-location');
    } else {
      // Normal flow - redirect back to task list
      res.redirect('../marine-licence-start-page');
    }
  });

  /////////////////////////////////////////////////////////
  //////// Site name page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/site-name`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-name-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/site-name`);
  });

  // Site name router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/site-name-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-name-errorthispage'] = "false";

    // Check if site name is entered
    if (!req.session.data['low-complexity-site-name'] || req.session.data['low-complexity-site-name'].trim() === '') {
      req.session.data['low-complexity-site-name-errorthispage'] = "true";
      res.redirect('site-name');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-site-name-completed'] = true;
    res.redirect('review-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Type of activity page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/type-of-activity`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-type-of-activity-errorthispage'] = "false";
    delete req.session.data['low-complexity-type-of-activity-error'];
    delete req.session.data['low-complexity-type-of-works-error'];
    res.render(`versions/${version}/${section}/${subsection}/type-of-activity`);
  });

  // Type of activity router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/type-of-activity-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-type-of-activity-errorthispage'] = "false";
    delete req.session.data['low-complexity-type-of-activity-error'];
    delete req.session.data['low-complexity-type-of-works-error'];

    // Store the previous type of works value to detect changes
    const previousTypeOfWorks = req.session.data['low-complexity-type-of-works-previous'];
    const currentTypeOfWorks = req.session.data['low-complexity-type-of-works'];

    // If type of works has changed, clear construction structures
    if (previousTypeOfWorks && currentTypeOfWorks && previousTypeOfWorks !== currentTypeOfWorks) {
      delete req.session.data['low-complexity-construction-structures'];
    }

    let hasErrors = false;

    // Validate type of activity is selected
    if (!req.session.data['low-complexity-type-of-activity']) {
      req.session.data['low-complexity-type-of-activity-error'] = "Select a type of activity";
      hasErrors = true;
    } else if (req.session.data['low-complexity-type-of-activity'] === 'construction') {
      // If construction is selected, validate that a radio button is selected
      if (!req.session.data['low-complexity-type-of-works']) {
        req.session.data['low-complexity-type-of-works-error'] = "Select the type of works";
        hasErrors = true;
      }
    } else {
      // If not construction, clear the type of works radio and structures
      delete req.session.data['low-complexity-type-of-works'];
      delete req.session.data['low-complexity-construction-structures'];
    }

    if (hasErrors) {
      req.session.data['low-complexity-type-of-activity-errorthispage'] = "true";
      res.redirect('type-of-activity');
      return;
    }

    // Store current type of works as previous for next comparison
    req.session.data['low-complexity-type-of-works-previous'] = req.session.data['low-complexity-type-of-works'];

    // If construction is selected (and validated), go to construction structures page
    if (req.session.data['low-complexity-type-of-activity'] === 'construction') {
      res.redirect('construction-structures');
    } else {
      // Mark as completed and redirect to review page for non-construction activities
      req.session.data['low-complexity-type-of-activity-completed'] = true;
      res.redirect('review-site-details#site-1-details');
    }
  });

  /////////////////////////////////////////////////////////
  //////// Construction structures page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/construction-structures`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-construction-structures-errorthispage'] = "false";
    delete req.session.data['low-complexity-construction-structures-error'];
    res.render(`versions/${version}/${section}/${subsection}/construction-structures`);
  });

  // Construction structures router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/construction-structures-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-construction-structures-errorthispage'] = "false";
    delete req.session.data['low-complexity-construction-structures-error'];

    // Validate at least one structure is selected
    if (!req.session.data['low-complexity-construction-structures'] || req.session.data['low-complexity-construction-structures'].length === 0) {
      req.session.data['low-complexity-construction-structures-errorthispage'] = "true";
      req.session.data['low-complexity-construction-structures-error'] = "Select at least one type of structure";
      res.redirect('construction-structures');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-type-of-activity-completed'] = true;
    res.redirect('review-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Activity description page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/activity-description`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-activity-description-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/activity-description`);
  });

  // Activity description router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/activity-description-router`, function (req, res) {
    // Validate activity description
    if (!req.session.data['low-complexity-activity-description'] || req.session.data['low-complexity-activity-description'].trim() === '') {
      req.session.data['low-complexity-activity-description-errorthispage'] = "true";
      res.redirect('activity-description');
      return;
    }

    // Clear errors and mark as completed
    req.session.data['low-complexity-activity-description-errorthispage'] = "false";
    req.session.data['low-complexity-activity-description-completed'] = true;
    res.redirect('review-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Duration page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/duration`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-duration-errorthispage'] = "false";
    req.session.data['low-complexity-site-duration-years-error'] = "false";
    req.session.data['low-complexity-site-duration-months-error'] = "false";
    req.session.data['low-complexity-site-duration-weeks-error'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/duration`);
  });

  // Duration router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/duration-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-duration-errorthispage'] = "false";
    req.session.data['low-complexity-site-duration-years-error'] = "false";
    req.session.data['low-complexity-site-duration-months-error'] = "false";
    req.session.data['low-complexity-site-duration-weeks-error'] = "false";

    let hasErrors = false;

    // Check if all three fields are empty or missing
    const yearsEmpty = !req.session.data['low-complexity-site-duration-years'] || req.session.data['low-complexity-site-duration-years'].trim() === '';
    const monthsEmpty = !req.session.data['low-complexity-site-duration-months'] || req.session.data['low-complexity-site-duration-months'].trim() === '';
    const weeksEmpty = !req.session.data['low-complexity-site-duration-weeks'] || req.session.data['low-complexity-site-duration-weeks'].trim() === '';

    if (yearsEmpty) {
      req.session.data['low-complexity-site-duration-years-error'] = "true";
      hasErrors = true;
    }

    if (monthsEmpty) {
      req.session.data['low-complexity-site-duration-months-error'] = "true";
      hasErrors = true;
    }

    if (weeksEmpty) {
      req.session.data['low-complexity-site-duration-weeks-error'] = "true";
      hasErrors = true;
    }

    if (hasErrors) {
      req.session.data['low-complexity-site-duration-errorthispage'] = "true";
      res.redirect('duration');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-site-duration-completed'] = true;
    res.redirect('review-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Schedule page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/schedule`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-schedule-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/schedule`);
  });

  // Schedule router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/schedule-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-schedule-errorthispage'] = "false";

    // Check if schedule is entered
    if (!req.session.data['low-complexity-schedule'] || req.session.data['low-complexity-schedule'].trim() === '') {
      req.session.data['low-complexity-schedule-errorthispage'] = "true";
      res.redirect('schedule');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-schedule-completed'] = true;
    res.redirect('review-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Impacts page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/impacts`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-impacts-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/impacts`);
  });

  // Impacts router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/impacts-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-impacts-errorthispage'] = "false";

    // Check if impacts is entered
    if (!req.session.data['low-complexity-impacts'] || req.session.data['low-complexity-impacts'].trim() === '') {
      req.session.data['low-complexity-impacts-errorthispage'] = "true";
      res.redirect('impacts');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-impacts-completed'] = true;
    res.redirect('review-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Delete all sites page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/delete-all-sites`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/delete-all-sites`);
  });

  // Delete all sites router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/delete-all-sites-router`, function (req, res) {
    // Clear all site details data
    
    // File upload journey data
    delete req.session.data['low-complexity-site-location-method'];
    delete req.session.data['low-complexity-file-type'];
    delete req.session.data['hasUploadedSiteFile'];
    
    // Site name
    delete req.session.data['low-complexity-site-name'];
    delete req.session.data['low-complexity-site-name-completed'];
    
    // Type of activity
    delete req.session.data['low-complexity-type-of-activity'];
    delete req.session.data['low-complexity-type-of-works'];
    delete req.session.data['low-complexity-type-of-works-previous'];
    delete req.session.data['low-complexity-construction-structures'];
    delete req.session.data['low-complexity-type-of-activity-completed'];
    
    // Activity description
    delete req.session.data['low-complexity-activity-name'];
    delete req.session.data['low-complexity-activity-description'];
    delete req.session.data['low-complexity-activity-description-completed'];
    
    // Duration
    delete req.session.data['low-complexity-site-duration-years'];
    delete req.session.data['low-complexity-site-duration-months'];
    delete req.session.data['low-complexity-site-duration-weeks'];
    delete req.session.data['low-complexity-site-duration-completed'];
    
    // Schedule
    delete req.session.data['low-complexity-schedule'];
    delete req.session.data['low-complexity-schedule-completed'];
    
    // Impacts
    delete req.session.data['low-complexity-impacts'];
    delete req.session.data['low-complexity-impacts-completed'];
    
    // Overall completion flag
    delete req.session.data['has-visited-site-details'];
    
    // Redirect to task list
    res.redirect('../marine-licence-start-page');
  });

};

