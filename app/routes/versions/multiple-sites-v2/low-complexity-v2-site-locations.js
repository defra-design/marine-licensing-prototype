module.exports = function (router) {
  // Low complexity v2 site locations routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";
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
    res.redirect('review-site-details#site-1');
  });

  /////////////////////////////////////////////////////////
  //////// Type of activity page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/type-of-activity`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-type-of-activity-errorthispage'] = "false";
    delete req.session.data['low-complexity-type-of-activity-error'];
    delete req.session.data['low-complexity-type-of-works-error'];
    delete req.session.data['low-complexity-deposit-type-error'];
    delete req.session.data['low-complexity-removal-type-error'];
    res.render(`versions/${version}/${section}/${subsection}/type-of-activity`);
  });

  // Type of activity router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/type-of-activity-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-type-of-activity-errorthispage'] = "false";
    delete req.session.data['low-complexity-type-of-activity-error'];
    delete req.session.data['low-complexity-type-of-works-error'];
    delete req.session.data['low-complexity-deposit-type-error'];
    delete req.session.data['low-complexity-removal-type-error'];

    // Store the previous type of works value to detect changes
    const previousTypeOfWorks = req.session.data['low-complexity-type-of-works-previous'];
    const currentTypeOfWorks = req.session.data['low-complexity-type-of-works'];

    // If type of works has changed, clear construction structures
    if (previousTypeOfWorks && currentTypeOfWorks && previousTypeOfWorks !== currentTypeOfWorks) {
      delete req.session.data['low-complexity-construction-structures'];
      delete req.session.data['low-complexity-construction-structures-other-details'];
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
      // Clear deposit and removal types and related data
      delete req.session.data['low-complexity-deposit-type'];
      delete req.session.data['low-complexity-deposit-substances-objects'];
      delete req.session.data['low-complexity-deposit-substances-objects-other-details'];
      delete req.session.data['low-complexity-removal-type'];
      delete req.session.data['low-complexity-removal-substances-objects'];
      delete req.session.data['low-complexity-removal-substances-objects-other-details'];
    } else if (req.session.data['low-complexity-type-of-activity'] === 'deposit') {
      // If deposit is selected, validate that a deposit type is selected
      if (!req.session.data['low-complexity-deposit-type']) {
        req.session.data['low-complexity-deposit-type-error'] = "Select the type of deposit";
        hasErrors = true;
      }
      // Clear construction and removal types and related data
      delete req.session.data['low-complexity-type-of-works'];
      delete req.session.data['low-complexity-construction-structures'];
      delete req.session.data['low-complexity-construction-structures-other-details'];
      delete req.session.data['low-complexity-removal-type'];
      delete req.session.data['low-complexity-removal-substances-objects'];
      delete req.session.data['low-complexity-removal-substances-objects-other-details'];
    } else if (req.session.data['low-complexity-type-of-activity'] === 'removal') {
      // If removal is selected, validate that a removal type is selected
      if (!req.session.data['low-complexity-removal-type']) {
        req.session.data['low-complexity-removal-type-error'] = "Select the type of removal";
        hasErrors = true;
      }
      // Clear construction and deposit types and related data
      delete req.session.data['low-complexity-type-of-works'];
      delete req.session.data['low-complexity-construction-structures'];
      delete req.session.data['low-complexity-construction-structures-other-details'];
      delete req.session.data['low-complexity-deposit-type'];
      delete req.session.data['low-complexity-deposit-substances-objects'];
      delete req.session.data['low-complexity-deposit-substances-objects-other-details'];
    } else {
      // If other type, clear all sub-types and related data
      delete req.session.data['low-complexity-type-of-works'];
      delete req.session.data['low-complexity-construction-structures'];
      delete req.session.data['low-complexity-construction-structures-other-details'];
      delete req.session.data['low-complexity-deposit-type'];
      delete req.session.data['low-complexity-deposit-substances-objects'];
      delete req.session.data['low-complexity-deposit-substances-objects-other-details'];
      delete req.session.data['low-complexity-removal-type'];
      delete req.session.data['low-complexity-removal-substances-objects'];
      delete req.session.data['low-complexity-removal-substances-objects-other-details'];
    }

    if (hasErrors) {
      req.session.data['low-complexity-type-of-activity-errorthispage'] = "true";
      res.redirect('type-of-activity');
      return;
    }

    // Store current type of works as previous for next comparison
    req.session.data['low-complexity-type-of-works-previous'] = req.session.data['low-complexity-type-of-works'];

    // Route based on activity type
    if (req.session.data['low-complexity-type-of-activity'] === 'construction') {
      res.redirect('construction-structures');
    } else if (req.session.data['low-complexity-type-of-activity'] === 'deposit') {
      res.redirect('deposit-substances-objects');
    } else if (req.session.data['low-complexity-type-of-activity'] === 'removal') {
      res.redirect('removal-substances-objects');
    } else {
      // Mark as completed and redirect to review page for other activities
      req.session.data['low-complexity-type-of-activity-completed'] = true;
      res.redirect('review-site-details#site-1-activity-details');
    }
  });

  /////////////////////////////////////////////////////////
  //////// Construction structures page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/construction-structures`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-construction-structures-errorthispage'] = "false";
    req.session.data['low-complexity-construction-structures-errortypeone'] = "false";
    req.session.data['low-complexity-construction-structures-errortypetwo'] = "false";
    delete req.session.data['low-complexity-construction-structures-error'];
    res.render(`versions/${version}/${section}/${subsection}/construction-structures`);
  });

  // Construction structures router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/construction-structures-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-construction-structures-errorthispage'] = "false";
    req.session.data['low-complexity-construction-structures-errortypeone'] = "false";
    req.session.data['low-complexity-construction-structures-errortypetwo'] = "false";
    delete req.session.data['low-complexity-construction-structures-error'];

    // Validate at least one structure is selected
    if (!req.session.data['low-complexity-construction-structures'] || req.session.data['low-complexity-construction-structures'].length === 0) {
      req.session.data['low-complexity-construction-structures-errorthispage'] = "true";
      req.session.data['low-complexity-construction-structures-errortypeone'] = "true";
      req.session.data['low-complexity-construction-structures-error'] = "Select at least one type of structure";
      res.redirect('construction-structures');
      return;
    }

    // Check if "other-structures" is selected and validate textarea
    const structures = req.session.data['low-complexity-construction-structures'];
    const isOtherSelected = Array.isArray(structures) && structures.includes('other-structures');
    
    if (isOtherSelected) {
      const otherDetails = req.session.data['low-complexity-construction-structures-other-details'];
      if (!otherDetails || otherDetails.trim() === '') {
        req.session.data['low-complexity-construction-structures-errorthispage'] = "true";
        req.session.data['low-complexity-construction-structures-errortypetwo'] = "true";
        res.redirect('construction-structures');
        return;
      }
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-type-of-activity-completed'] = true;
    res.redirect('review-site-details#site-1-activity-details');
  });

  /////////////////////////////////////////////////////////
  //////// Deposit substances/objects page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/deposit-substances-objects`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-deposit-substances-objects-errorthispage'] = "false";
    req.session.data['low-complexity-deposit-substances-objects-errortypeone'] = "false";
    req.session.data['low-complexity-deposit-substances-objects-errortypetwo'] = "false";
    delete req.session.data['low-complexity-deposit-substances-objects-error'];
    res.render(`versions/${version}/${section}/${subsection}/deposit-substances-objects`);
  });

  // Deposit substances/objects router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/deposit-substances-objects-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-deposit-substances-objects-errorthispage'] = "false";
    req.session.data['low-complexity-deposit-substances-objects-errortypeone'] = "false";
    req.session.data['low-complexity-deposit-substances-objects-errortypetwo'] = "false";
    delete req.session.data['low-complexity-deposit-substances-objects-error'];

    // Validate at least one item is selected
    if (!req.session.data['low-complexity-deposit-substances-objects'] || req.session.data['low-complexity-deposit-substances-objects'].length === 0) {
      req.session.data['low-complexity-deposit-substances-objects-errorthispage'] = "true";
      req.session.data['low-complexity-deposit-substances-objects-errortypeone'] = "true";
      req.session.data['low-complexity-deposit-substances-objects-error'] = "Select at least one type of substance or object";
      res.redirect('deposit-substances-objects');
      return;
    }

    // Check if "other-deposits" is selected and validate textarea
    const deposits = req.session.data['low-complexity-deposit-substances-objects'];
    const isOtherSelected = Array.isArray(deposits) && deposits.includes('other-deposits');
    
    if (isOtherSelected) {
      const otherDetails = req.session.data['low-complexity-deposit-substances-objects-other-details'];
      if (!otherDetails || otherDetails.trim() === '') {
        req.session.data['low-complexity-deposit-substances-objects-errorthispage'] = "true";
        req.session.data['low-complexity-deposit-substances-objects-errortypetwo'] = "true";
        res.redirect('deposit-substances-objects');
        return;
      }
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-type-of-activity-completed'] = true;
    res.redirect('review-site-details#site-1-activity-details');
  });

  /////////////////////////////////////////////////////////
  //////// Removal substances/objects page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/removal-substances-objects`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-removal-substances-objects-errorthispage'] = "false";
    req.session.data['low-complexity-removal-substances-objects-errortypeone'] = "false";
    req.session.data['low-complexity-removal-substances-objects-errortypetwo'] = "false";
    delete req.session.data['low-complexity-removal-substances-objects-error'];
    res.render(`versions/${version}/${section}/${subsection}/removal-substances-objects`);
  });

  // Removal substances/objects router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/removal-substances-objects-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-removal-substances-objects-errorthispage'] = "false";
    req.session.data['low-complexity-removal-substances-objects-errortypeone'] = "false";
    req.session.data['low-complexity-removal-substances-objects-errortypetwo'] = "false";
    delete req.session.data['low-complexity-removal-substances-objects-error'];

    // Validate at least one item is selected
    if (!req.session.data['low-complexity-removal-substances-objects'] || req.session.data['low-complexity-removal-substances-objects'].length === 0) {
      req.session.data['low-complexity-removal-substances-objects-errorthispage'] = "true";
      req.session.data['low-complexity-removal-substances-objects-errortypeone'] = "true";
      req.session.data['low-complexity-removal-substances-objects-error'] = "Select at least one substance or object";
      res.redirect('removal-substances-objects');
      return;
    }

    // Check if "other-substances-objects" is selected and validate textarea
    const substances = req.session.data['low-complexity-removal-substances-objects'];
    const isOtherSelected = Array.isArray(substances) && substances.includes('other-substances-objects');
    
    if (isOtherSelected) {
      const otherDetails = req.session.data['low-complexity-removal-substances-objects-other-details'];
      if (!otherDetails || otherDetails.trim() === '') {
        req.session.data['low-complexity-removal-substances-objects-errorthispage'] = "true";
        req.session.data['low-complexity-removal-substances-objects-errortypetwo'] = "true";
        res.redirect('removal-substances-objects');
        return;
      }
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-type-of-activity-completed'] = true;
    res.redirect('review-site-details#site-1-activity-details');
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
    res.redirect('review-site-details#site-1-activity-details');
  });

  /////////////////////////////////////////////////////////
  //////// Duration page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/duration`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-duration-errorthispage'] = "false";
    req.session.data['low-complexity-site-duration-years-error'] = "false";
    req.session.data['low-complexity-site-duration-months-error'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/duration`);
  });

  // Duration router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/duration-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-duration-errorthispage'] = "false";
    req.session.data['low-complexity-site-duration-years-error'] = "false";
    req.session.data['low-complexity-site-duration-months-error'] = "false";

    let hasErrors = false;

    // Check if both fields are empty or missing
    const yearsEmpty = !req.session.data['low-complexity-site-duration-years'] || req.session.data['low-complexity-site-duration-years'].trim() === '';
    const monthsEmpty = !req.session.data['low-complexity-site-duration-months'] || req.session.data['low-complexity-site-duration-months'].trim() === '';

    if (yearsEmpty) {
      req.session.data['low-complexity-site-duration-years-error'] = "true";
      hasErrors = true;
    }

    if (monthsEmpty) {
      req.session.data['low-complexity-site-duration-months-error'] = "true";
      hasErrors = true;
    }

    if (hasErrors) {
      req.session.data['low-complexity-site-duration-errorthispage'] = "true";
      res.redirect('duration');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-site-duration-completed'] = true;
    res.redirect('review-site-details#site-1-activity-details');
  });

  /////////////////////////////////////////////////////////
  //////// Date completed by page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/date-completed-by`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-date-completed-by-errorthispage'] = "false";
    req.session.data['low-complexity-date-completed-by-errortypeone'] = "false";
    req.session.data['low-complexity-date-completed-by-errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/date-completed-by`);
  });

  // Date completed by router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/date-completed-by-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-date-completed-by-errorthispage'] = "false";
    req.session.data['low-complexity-date-completed-by-errortypeone'] = "false";
    req.session.data['low-complexity-date-completed-by-errortypetwo'] = "false";

    // Validate radio selection
    if (!req.session.data['low-complexity-date-completed-by']) {
      req.session.data['low-complexity-date-completed-by-errorthispage'] = "true";
      req.session.data['low-complexity-date-completed-by-errortypeone'] = "true";
      res.redirect('date-completed-by');
      return;
    }

    // If Yes is selected, validate textarea
    if (req.session.data['low-complexity-date-completed-by'] === 'Yes') {
      if (!req.session.data['low-complexity-date-completed-by-details'] || req.session.data['low-complexity-date-completed-by-details'].trim() === '') {
        req.session.data['low-complexity-date-completed-by-errorthispage'] = "true";
        req.session.data['low-complexity-date-completed-by-errortypetwo'] = "true";
        res.redirect('date-completed-by');
        return;
      }
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-date-completed-by-completed'] = true;
    res.redirect('review-site-details#site-1-activity-details');
  });

  /////////////////////////////////////////////////////////
  //////// Months of activity page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/months-of-activity`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-months-of-activity-errorthispage'] = "false";
    req.session.data['low-complexity-months-of-activity-errortypeone'] = "false";
    req.session.data['low-complexity-months-of-activity-errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/months-of-activity`);
  });

  // Months of activity router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/months-of-activity-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-months-of-activity-errorthispage'] = "false";
    req.session.data['low-complexity-months-of-activity-errortypeone'] = "false";
    req.session.data['low-complexity-months-of-activity-errortypetwo'] = "false";

    // Validate radio selection
    if (!req.session.data['low-complexity-months-of-activity']) {
      req.session.data['low-complexity-months-of-activity-errorthispage'] = "true";
      req.session.data['low-complexity-months-of-activity-errortypeone'] = "true";
      res.redirect('months-of-activity');
      return;
    }

    // If Yes is selected, validate textarea
    if (req.session.data['low-complexity-months-of-activity'] === 'Yes') {
      if (!req.session.data['low-complexity-months-of-activity-details'] || req.session.data['low-complexity-months-of-activity-details'].trim() === '') {
        req.session.data['low-complexity-months-of-activity-errorthispage'] = "true";
        req.session.data['low-complexity-months-of-activity-errortypetwo'] = "true";
        res.redirect('months-of-activity');
        return;
      }
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-months-of-activity-completed'] = true;
    res.redirect('review-site-details#site-1-activity-details');
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
    res.redirect('review-site-details#site-1-activity-details');
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
    res.redirect('review-site-details#site-1-activity-details');
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
    delete req.session.data['low-complexity-deposit-type'];
    delete req.session.data['low-complexity-deposit-substances-objects'];
    delete req.session.data['low-complexity-deposit-substances-objects-other-details'];
    delete req.session.data['low-complexity-removal-type'];
    delete req.session.data['low-complexity-construction-structures'];
    delete req.session.data['low-complexity-construction-structures-other-details'];
    delete req.session.data['low-complexity-removal-substances-objects'];
    delete req.session.data['low-complexity-removal-substances-objects-other-details'];
    delete req.session.data['low-complexity-type-of-activity-completed'];
    
    // Activity description
    delete req.session.data['low-complexity-activity-name'];
    delete req.session.data['low-complexity-activity-description'];
    delete req.session.data['low-complexity-activity-description-completed'];
    
    // Duration
    delete req.session.data['low-complexity-site-duration-years'];
    delete req.session.data['low-complexity-site-duration-months'];
    delete req.session.data['low-complexity-site-duration-completed'];
    
    // Date completed by
    delete req.session.data['low-complexity-date-completed-by'];
    delete req.session.data['low-complexity-date-completed-by-details'];
    delete req.session.data['low-complexity-date-completed-by-completed'];
    
    // Months of activity
    delete req.session.data['low-complexity-months-of-activity'];
    delete req.session.data['low-complexity-months-of-activity-details'];
    delete req.session.data['low-complexity-months-of-activity-completed'];
    
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

