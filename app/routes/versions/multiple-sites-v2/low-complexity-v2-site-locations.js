module.exports = function (router) {
  // Low complexity v2 site locations routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";
  const subsection = "site-details";

  // Activity data keys for file upload path
  const ACTIVITY_DATA_KEYS = [
    'low-complexity-type-of-activity',
    'low-complexity-type-of-activity-completed',
    'low-complexity-type-of-activity-previous',
    'low-complexity-type-of-works',
    'low-complexity-type-of-works-previous',
    'low-complexity-deposit-type',
    'low-complexity-deposit-type-previous',
    'low-complexity-removal-type',
    'low-complexity-removal-type-previous',
    'low-complexity-construction-structures',
    'low-complexity-construction-structures-other-details',
    'low-complexity-deposit-substances-objects',
    'low-complexity-deposit-substances-objects-other-details',
    'low-complexity-removal-substances-objects',
    'low-complexity-removal-substances-objects-other-details',
    'low-complexity-activity-description',
    'low-complexity-activity-description-completed',
    'low-complexity-site-duration-years',
    'low-complexity-site-duration-months',
    'low-complexity-site-duration-completed',
    'low-complexity-date-completed-by',
    'low-complexity-date-completed-by-details',
    'low-complexity-date-completed-by-completed',
    'low-complexity-months-of-activity',
    'low-complexity-months-of-activity-details',
    'low-complexity-months-of-activity-completed',
    'low-complexity-working-hours',
    'low-complexity-working-hours-completed',
    'low-complexity-impacts',
    'low-complexity-impacts-completed'
  ];

  // ==============================================================================================
  // File upload multi-activity helpers
  // ==============================================================================================

  function getFileUploadActivities(session) {
    if (!session.data['low-complexity-file-upload-activities']) {
      // Migrate existing flat session data into activity 1
      const activity = { activityNumber: 1 };
      ACTIVITY_DATA_KEYS.forEach(key => {
        if (session.data[key] !== undefined) {
          activity[key] = session.data[key];
        }
      });
      session.data['low-complexity-file-upload-activities'] = [activity];
    }
    return session.data['low-complexity-file-upload-activities'];
  }

  function getFileUploadActivity(session, activityNumber) {
    const activities = getFileUploadActivities(session);
    return activities.find(a => a.activityNumber === parseInt(activityNumber));
  }

  function loadFileUploadActivityToSession(session, activityNumber) {
    const activity = getFileUploadActivity(session, activityNumber);
    if (!activity) return;
    // Clear all activity keys from session
    ACTIVITY_DATA_KEYS.forEach(key => {
      delete session.data[key];
    });
    // Load from activity
    ACTIVITY_DATA_KEYS.forEach(key => {
      if (activity[key] !== undefined) {
        session.data[key] = activity[key];
      }
    });
    session.data['low-complexity-current-edit-activity'] = parseInt(activityNumber);
  }

  function saveFileUploadActivityFromSession(session, activityNumber) {
    const activity = getFileUploadActivity(session, activityNumber);
    if (!activity) return;
    ACTIVITY_DATA_KEYS.forEach(key => {
      if (session.data[key] !== undefined) {
        activity[key] = session.data[key];
      } else {
        delete activity[key];
      }
    });
  }

  // Helper to redirect to the correct review page based on entry method
  function getReviewUrl(session, anchor) {
    const isManual = session.data['low-complexity-site-location-method'] === 'manual-entry';
    const base = isManual ? 'manual-entry/review-site-details' : 'review-site-details';
    if (isManual && session.data['low-complexity-manual-current-edit-site']) {
      const siteNum = session.data['low-complexity-manual-current-edit-site'];
      const actNum = session.data['low-complexity-manual-current-edit-activity'] || 1;
      return base + '#site-' + siteNum + '-activity-' + actNum;
    }
    if (!isManual && session.data['low-complexity-current-edit-activity']) {
      const actNum = session.data['low-complexity-current-edit-activity'];
      return base + '#site-1-activity-' + actNum;
    }
    return anchor ? base + '#' + anchor : base;
  }

  /////////////////////////////////////////////////////////
  //////// Site details index page (before you start)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
    // If user has already visited and saved site details, go straight to review page
    if (req.session.data['has-visited-site-details']) {
      // Route to the correct review page based on entry method
      if (req.session.data['low-complexity-site-location-method'] === 'manual-entry') {
        res.redirect('manual-entry/review-site-details');
      } else {
        res.redirect('review-site-details');
      }
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
    } else if (req.session.data['low-complexity-site-location-method'] === 'manual-entry') {
      // Manual entry - redirect to manual entry flow
      res.redirect('manual-entry/site-name?site=1');
    } else {
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
  //////// Change site location page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/change-site-location`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/change-site-location`);
  });

  // Change site location router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/change-site-location-router`, function (req, res) {
    // Set flag so we know user is changing an existing site location
    req.session.data['low-complexity-site-location-changing'] = true;
    // Clear file type selection so radios are blank
    delete req.session.data['low-complexity-file-type'];
    res.redirect('which-type-of-file');
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

    // If changing site location, toggle the change count and clear the changing flag
    if (req.session.data['low-complexity-site-location-changing']) {
      const count = (req.session.data['low-complexity-site-location-change-count'] || 0) + 1;
      req.session.data['low-complexity-site-location-change-count'] = count;
      delete req.session.data['low-complexity-site-location-changing'];
    }

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

    // Clear validation error and radio selection on fresh load
    delete req.session.data['low-complexity-site-details-finished-error'];
    delete req.session.data['low-complexity-site-details-finished'];

    // Save any pending activity data back to the current activity being edited
    const currentEditActivity = req.session.data['low-complexity-current-edit-activity'];
    if (currentEditActivity) {
      const activities = getFileUploadActivities(req.session);
      saveFileUploadActivityFromSession(req.session, currentEditActivity);
      delete req.session.data['low-complexity-current-edit-activity'];
    }

    // Ensure activities array exists
    const activities = getFileUploadActivities(req.session);

    res.render(`versions/${version}/${section}/${subsection}/review-site-details`, {
      activities: activities
    });
  });

  // Review site details router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/review-site-details-router`, function (req, res) {
    // Mark that user has visited site details journey
    req.session.data['has-visited-site-details'] = true;

    // Clear previous error
    delete req.session.data['low-complexity-site-details-finished-error'];

    // Check if the "finished" radios were shown (all details complete)
    // Compute allComplete server-side to match the template logic
    const siteNameComplete = req.session.data['low-complexity-site-name-completed'];
    const activities = getFileUploadActivities(req.session);
    let allComplete = !!siteNameComplete;
    activities.forEach(act => {
      if (!act['low-complexity-type-of-activity-completed']) allComplete = false;
      if (!act['low-complexity-activity-description-completed']) allComplete = false;
      if (!act['low-complexity-site-duration-completed']) allComplete = false;
      if (!act['low-complexity-date-completed-by-completed']) allComplete = false;
      if (!act['low-complexity-months-of-activity-completed']) allComplete = false;
      if (!act['low-complexity-working-hours-completed']) allComplete = false;
    });

    if (allComplete) {
      // Validate the radio selection
      const finished = req.session.data['low-complexity-site-details-finished'];
      if (!finished) {
        req.session.data['low-complexity-site-details-finished-error'] = true;
        return res.redirect('review-site-details');
      }

      if (finished === 'Yes') {
        const wasAlreadyComplete = req.session.data['site-details-confirmed-complete'];
        const mppAlertRequested = req.session.data['mpp-alert'] === 'true';
        req.session.data['site-details-confirmed-complete'] = true;
        // Once MPPs have been unlocked, keep them accessible even if the user
        // later re-opens site details to add a site/activity.
        req.session.data['mpp-previously-unlocked'] = true;
        delete req.session.data['mpp-alert'];

        // Show MPP calculating alert if first time completing or if mpp-alert param was used
        if (!wasAlreadyComplete || mppAlertRequested) {
          return res.redirect('../marine-licence-start-page?mpp-calculating=true');
        }
      } else {
        delete req.session.data['site-details-confirmed-complete'];
      }
    }

    // Check if we need to return to check answers
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      // Only return to check-your-answers if site details are still confirmed complete
      // If the user made changes that broke completeness, send them to the task list instead
      if (req.session.data['site-details-confirmed-complete']) {
        res.redirect('../check-your-answers#site-location');
      } else {
        res.redirect('../marine-licence-start-page');
      }
    } else {
      // Normal flow - redirect back to task list
      res.redirect('../marine-licence-start-page');
    }
  });

  /////////////////////////////////////////////////////////
  //////// Load activity data (file upload) - intermediary
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/load-activity`, function (req, res) {
    const activityParam = req.query.activity || '1';
    const page = req.query.page;

    loadFileUploadActivityToSession(req.session, activityParam);

    res.redirect(`/versions/${version}/${section}/${subsection}/${page}`);
  });

  /////////////////////////////////////////////////////////
  //////// Add another activity (file upload)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/add-activity`, function (req, res) {
    const activities = getFileUploadActivities(req.session);
    const activityNumber = activities.length + 1;
    activities.push({ activityNumber: activityNumber });
    // New incomplete activity means site details are no longer confirmed complete
    delete req.session.data['site-details-confirmed-complete'];
    res.redirect(`/versions/${version}/${section}/${subsection}/review-site-details#site-1-activity-${activityNumber}`);
  });

  /////////////////////////////////////////////////////////
  //////// Delete activity (file upload)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/delete-activity`, function (req, res) {
    const activityParam = req.query.activity;
    const activities = getFileUploadActivities(req.session);
    const activity = activities.find(a => a.activityNumber === parseInt(activityParam));
    if (!activity) {
      return res.redirect(`/versions/${version}/${section}/${subsection}/review-site-details`);
    }
    res.render(`versions/${version}/${section}/${subsection}/delete-activity`, {
      activity: activity,
      siteNumber: 1
    });
  });

  router.post(`/versions/${version}/${section}/${subsection}/delete-activity-router`, function (req, res) {
    const activityParam = req.body['activity-number'];
    if (activityParam) {
      const activities = getFileUploadActivities(req.session);
      const index = activities.findIndex(a => a.activityNumber === parseInt(activityParam));
      if (index > -1) {
        activities.splice(index, 1);
        // Renumber remaining activities
        activities.forEach((act, i) => {
          act.activityNumber = i + 1;
        });
      }
    }
    res.redirect(`/versions/${version}/${section}/${subsection}/review-site-details`);
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
    res.redirect(getReviewUrl(req.session, 'site-1'));
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

    // Detect changes in sub-types to clear page 2 data when sub-type changes
    const previousTypeOfActivity = req.session.data['low-complexity-type-of-activity-previous'];
    const currentTypeOfActivity = req.session.data['low-complexity-type-of-activity'];
    const previousTypeOfWorks = req.session.data['low-complexity-type-of-works-previous'];
    const currentTypeOfWorks = req.session.data['low-complexity-type-of-works'];
    const previousDepositType = req.session.data['low-complexity-deposit-type-previous'];
    const currentDepositType = req.session.data['low-complexity-deposit-type'];
    const previousRemovalType = req.session.data['low-complexity-removal-type-previous'];
    const currentRemovalType = req.session.data['low-complexity-removal-type'];

    // If top-level activity type changed, clear completed flag (page 2 data gets cleared below per category)
    if (previousTypeOfActivity && currentTypeOfActivity && previousTypeOfActivity !== currentTypeOfActivity) {
      delete req.session.data['low-complexity-type-of-activity-completed'];
    }

    // If construction sub-type changed, clear construction structures and completed flag
    if (previousTypeOfWorks && currentTypeOfWorks && previousTypeOfWorks !== currentTypeOfWorks) {
      delete req.session.data['low-complexity-construction-structures'];
      delete req.session.data['low-complexity-construction-structures-other-details'];
      delete req.session.data['low-complexity-type-of-activity-completed'];
    }

    // If deposit sub-type changed, clear deposit substances/objects and completed flag
    if (previousDepositType && currentDepositType && previousDepositType !== currentDepositType) {
      delete req.session.data['low-complexity-deposit-substances-objects'];
      delete req.session.data['low-complexity-deposit-substances-objects-other-details'];
      delete req.session.data['low-complexity-type-of-activity-completed'];
    }

    // If removal sub-type changed, clear removal substances/objects and completed flag
    if (previousRemovalType && currentRemovalType && previousRemovalType !== currentRemovalType) {
      delete req.session.data['low-complexity-removal-substances-objects'];
      delete req.session.data['low-complexity-removal-substances-objects-other-details'];
      delete req.session.data['low-complexity-type-of-activity-completed'];
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

    // Store current values as previous for next comparison
    req.session.data['low-complexity-type-of-activity-previous'] = req.session.data['low-complexity-type-of-activity'];
    req.session.data['low-complexity-type-of-works-previous'] = req.session.data['low-complexity-type-of-works'];
    req.session.data['low-complexity-deposit-type-previous'] = req.session.data['low-complexity-deposit-type'];
    req.session.data['low-complexity-removal-type-previous'] = req.session.data['low-complexity-removal-type'];

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
      res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
  });

  /////////////////////////////////////////////////////////
  //////// Duration page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/duration`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-duration-errorthispage'] = "false";
    req.session.data['low-complexity-site-duration-years-error'] = "false";
    req.session.data['low-complexity-site-duration-months-error'] = "false";
    req.session.data['low-complexity-site-duration-zero-error'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/duration`);
  });

  // Duration router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/duration-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-site-duration-errorthispage'] = "false";
    req.session.data['low-complexity-site-duration-years-error'] = "false";
    req.session.data['low-complexity-site-duration-months-error'] = "false";
    req.session.data['low-complexity-site-duration-zero-error'] = "false";

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

    // Check if both fields are 0
    if (req.session.data['low-complexity-site-duration-years'].trim() === '0' && req.session.data['low-complexity-site-duration-months'].trim() === '0') {
      req.session.data['low-complexity-site-duration-errorthispage'] = "true";
      req.session.data['low-complexity-site-duration-years-error'] = "true";
      req.session.data['low-complexity-site-duration-months-error'] = "true";
      req.session.data['low-complexity-site-duration-zero-error'] = "true";
      res.redirect('duration');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-site-duration-completed'] = true;
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
  });

  /////////////////////////////////////////////////////////
  //////// Working hours page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/working-hours`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-working-hours-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/working-hours`);
  });

  // Working hours router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/working-hours-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['low-complexity-working-hours-errorthispage'] = "false";

    // Check if working hours is entered
    if (!req.session.data['low-complexity-working-hours'] || req.session.data['low-complexity-working-hours'].trim() === '') {
      req.session.data['low-complexity-working-hours-errorthispage'] = "true";
      res.redirect('working-hours');
      return;
    }

    // Mark as completed and redirect to review page
    req.session.data['low-complexity-working-hours-completed'] = true;
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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
    res.redirect(getReviewUrl(req.session, 'site-1-activity-1'));
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

    // File upload activities array
    delete req.session.data['low-complexity-file-upload-activities'];
    delete req.session.data['low-complexity-current-edit-activity'];

    // Flat activity session keys
    ACTIVITY_DATA_KEYS.forEach(key => {
      delete req.session.data[key];
    });

    // Overall completion flags
    delete req.session.data['has-visited-site-details'];
    delete req.session.data['site-details-confirmed-complete'];
    delete req.session.data['low-complexity-site-details-finished'];

    // Clear MPP v1 data since site details are being deleted
    delete req.session.data['marine-plan-policy-s-acc-1-completed'];
    delete req.session.data['marine-plan-policy-s-bio-1-completed'];
    delete req.session.data['marine-plan-policy-s-agg-4-completed'];
    delete req.session.data['marine-plan-policy-s-emp-1-completed'];
    delete req.session.data['marine-plan-policy-s-uwn-2-completed'];

    // Clear MPP v2 data
    ['s-acc-1', 's-bio-1', 's-agg-4', 's-emp-1', 's-uwn-2'].forEach(function (key) {
      delete req.session.data['marine-plan-policy-v2-' + key + '-completed'];
      delete req.session.data['marine-plan-policy-v2-' + key + '-text'];
    });
    delete req.session.data['marine-plan-policies-v2-completed-count'];
    delete req.session.data['marine-plan-policies-v2-not-started-count'];

    // Reset the "MPPs previously unlocked" flag now that MPP data is wiped
    delete req.session.data['mpp-previously-unlocked'];

    // Redirect to task list
    res.redirect('../marine-licence-start-page');
  });

};

