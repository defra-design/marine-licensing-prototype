module.exports = function (router) {
  // Sample plans v1 routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v2";

  ///////////////////////////////////////////
  // Projects page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/projects`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/projects`);
  });

  ///////////////////////////////////////////
  // Delete project confirmation page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/delete`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Store the project parameter to be passed to the template
    const projectToDelete = req.query.project;
    req.session.data['project'] = projectToDelete;
    
    res.render(`versions/${version}/${section}/delete`);
  });

  // Delete project router (POST)
  router.post(`/versions/${version}/${section}/delete-router`, function (req, res) {
    const projectToDelete = req.query.project;
    
    if (projectToDelete === 'sample-plan-user') {
      req.session.data['userSamplePlanProjectDeleted'] = "true";
      // Clear the user's sample plan project data
      req.session.data['sample-plan-project-name-text-input'] = '';
      req.session.data['sample-plan-which-activity'] = '';
      req.session.data['sample-plan-new-or-existing-licence'] = '';
      req.session.data['sample-plan-dredging-volumes-completed'] = "false";
      req.session.data['sample-plan-fee-estimate-completed'] = "false";
    } else if (projectToDelete === 'branscombe-bore-holes') {
      // Handle deletion of the Branscombe bore holes project
      req.session.data['branscombeProjectDeleted'] = "true";
    }
    
    // Clear the project parameter from session
    delete req.session.data['project'];
    
    res.redirect('projects');
  });

  ///////////////////////////////////////////
  // Sample plan information page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // if a user is an org user then store it in the session
    if (req.query.user_type === 'organisation') {
      req.session.data['user_type'] = 'organisation';
    }
    
    res.render(`versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`);
  });

  ///////////////////////////////////////////
  // Sign-in page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // if a user is an org user then store it in the session
    if (req.query.user_type === 'organisation') {
      req.session.data['user_type'] = 'organisation';
    }
    
    // Clear organisation data when user signs in (including when they sign out and come back)
    delete req.session.data['organisation-name'];
    delete req.session.data['changing-organisation'];
    
    res.render(`versions/${version}/${section}/sign-in`);
  });

  // Sign-in router (POST)
  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {
    // if a user is an org user then redirect to select an org
    if (req.session.data['user_type'] === 'organisation') {
      // Clear the flag to ensure this is treated as a new selection
      delete req.session.data['changing-organisation'];
      res.redirect('organisation-selector');
    } else {
      // For prototype purposes, always redirect to project name start
      res.redirect('project-name-start');
    }
  });

  ///////////////////////////////////////////
  // Organisation selector page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/organisation-selector`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    req.session.data['isSamplePlansSection'] = true;
    
    // If the user is changing their organisation, set a flag in the session
    const isChangingOrg = req.query.change === 'true';
    if (isChangingOrg) {
      req.session.data['changing-organisation'] = 'true';
    }

    const allOrganisations = [
      {value: "Brighton Marina Operations", text: "Brighton Marina Operations"},
      {value: "Grimsby Fish Dock Enterprise", text: "Grimsby Fish Dock Enterprise"},
      {value: "North East Wind Farms", text: "North East Wind Farms"},
      {value: "Ramsgate Marina", text: "Ramsgate Marina"}
    ];

    const currentOrganisation = req.session.data['organisation-name'];
    const organisations = allOrganisations.filter(org => org.value !== currentOrganisation);

    res.render(`versions/${version}/${section}/organisation-selector`, {
      organisations: organisations,
      changingOrganisation: isChangingOrg
    });
  });

  // organisation selector router
  router.post(`/versions/${version}/${section}/organisation-selector-router`, function (req, res) {
    // Turn off errors by default
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Check if the radio button is selected
    if (req.session.data['organisation-name'] === undefined) {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      res.redirect('organisation-selector');
    } else {
      // If the user is changing their organisation, redirect to the projects page
      if (req.session.data['changing-organisation'] === 'true') {
        // Toggle the alternative project view
        req.session.data['alternativeProjectView'] = req.session.data['alternativeProjectView'] === 'true' ? 'false' : 'true';
        // Reset the flag
        delete req.session.data['changing-organisation'];
        res.redirect('projects');
      } else {
        // Redirect to the project name start page for new users
        res.redirect('project-name-start');
      }
    }
  });

  ///////////////////////////////////////////
  // Project name start page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-name-start`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    
    res.render(`versions/${version}/${section}/project-name-start`);
  });

  // Project name start router (POST)
  router.post(`/versions/${version}/${section}/project-name-start-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Validate project name input
    const projectName = req.body['sample-plan-project-name-text-input'];
    
    if (!projectName || projectName.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('project-name-start');
    }

    // Save the project name and redirect to sample plan start page
    req.session.data['sample-plan-project-name-text-input'] = projectName;
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Sample plan start page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/sample-plan-start-page`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/sample-plan-start-page`);
  });

  ///////////////////////////////////////////
  // Project background page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-background`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    req.session.data['isSamplePlansSection'] = true;
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['sample-plan-errortypethree'] = "false";
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/project-background`);
  });

  router.post(`/versions/${version}/${section}/project-background`, function (req, res) {
    const projectBackground = req.body['sample-plan-project-background'];
    const otherContact = req.body['sample-plan-other-contact'];
    const otherContactDetails = req.body['sample-plan-other-contact-details'];
    let hasError = false;
    
    if (!projectBackground || projectBackground.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      hasError = true;
    }

    if (!otherContact) {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypetwo'] = "true";
      hasError = true;
    }

    if (otherContact === 'Yes' && (!otherContactDetails || otherContactDetails.trim() === '')) {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypethree'] = "true";
      hasError = true;
    }

    if (hasError) {
      return res.redirect('project-background');
    }

    req.session.data['sample-plan-project-background-completed'] = "true";
    
    // Check if we need to return to check answers
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      res.redirect('check-answers');
    } else {
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Which activity page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/which-activity`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    res.render(`versions/${version}/${section}/which-activity`);
  });

  // Which activity router (POST)
  router.post(`/versions/${version}/${section}/which-activity-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Validate activity selection
    const activitySelection = req.body['sample-plan-which-activity'];
    
    if (!activitySelection || activitySelection.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('which-activity');
    }

    // Save the activity selection and redirect to task list
    req.session.data['sample-plan-which-activity'] = activitySelection;
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Project name page (for editing from task list)
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-name`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/project-name`);
  });

  // Project name router (POST)
  router.post(`/versions/${version}/${section}/project-name-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Validate project name input
    const projectName = req.body['sample-plan-project-name-text-input'];
    
    if (!projectName || projectName.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('project-name');
    }

    // Save the project name
    req.session.data['sample-plan-project-name-text-input'] = projectName;
    
    // Check if we need to return to check answers
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      res.redirect('check-answers');
    } else {
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // New or existing licence page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/new-or-existing-licence`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    // Capture query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
      // Store the current selection to detect changes later
      req.session.data['previous-licence-type'] = req.session.data['sample-plan-new-or-existing-licence'];
    }
    
    res.render(`versions/${version}/${section}/new-or-existing-licence`);
  });

  // New or existing licence router (POST)
  router.post(`/versions/${version}/${section}/new-or-existing-licence-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Validate licence type selection
    const licenceType = req.body['sample-plan-new-or-existing-licence'];
    
    if (!licenceType || licenceType.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('new-or-existing-licence');
    }

    // Save the licence type selection
    req.session.data['sample-plan-new-or-existing-licence'] = licenceType;
    
    // Handle check answers flow
    const previousType = req.session.data['previous-licence-type'];
    const cameFromCYA = req.session.data['camefromcheckanswers'] === 'true';

    // If coming from CYA and selection hasn't changed, bounce back
    if (cameFromCYA && previousType && previousType === licenceType) {
      req.session.data['camefromcheckanswers'] = false;
      delete req.session.data['previous-licence-type'];
      return res.redirect('check-answers');
    }

    // If selection changed, clear old data
    if (cameFromCYA && previousType && previousType !== licenceType) {
      if (previousType === 'New marine licence') {
        // Clear new licence data
        delete req.session.data['sample-plan-licence-length-years'];
        delete req.session.data['sample-plan-licence-length-months'];
      } else if (previousType === 'Existing marine licence') {
        // Clear existing licence data
        delete req.session.data['sample-plan-licence-number'];
        delete req.session.data['sample-plan-licence-expiry-day'];
        delete req.session.data['sample-plan-licence-expiry-month'];
        delete req.session.data['sample-plan-licence-expiry-year'];
      }
      delete req.session.data['previous-licence-type'];
    }
    
    // Conditional routing based on selection
    // NOTE: Don't clear camefromcheckanswers flag here - it passes through to next page
    if (licenceType === 'New marine licence') {
      res.redirect('new-licence-length');
    } else if (licenceType === 'Existing marine licence') {
      res.redirect('existing-licence-expiry');
    } else {
      // Fallback
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // New licence length page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/new-licence-length`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/new-licence-length`);
  });

  // New licence length router (POST)
  router.post(`/versions/${version}/${section}/new-licence-length-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Validate that at least one field is filled
    const years = req.body['sample-plan-licence-length-years'];
    const months = req.body['sample-plan-licence-length-months'];
    
    if ((!years || years.trim() === '') && (!months || months.trim() === '')) {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('new-licence-length');
    }

    // Save the licence length data
    req.session.data['sample-plan-licence-length-years'] = years;
    req.session.data['sample-plan-licence-length-months'] = months;
    
    // Check if we need to return to check answers
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      res.redirect('check-answers');
    } else {
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Existing licence expiry page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/existing-licence-expiry`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    // Capture the query parameter if coming from check answers
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }
    
    res.render(`versions/${version}/${section}/existing-licence-expiry`);
  });

  // Existing licence expiry router (POST)
  router.post(`/versions/${version}/${section}/existing-licence-expiry-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";

    // Validate that all date fields are filled
    const day = req.body['sample-plan-licence-expiry-day'];
    const month = req.body['sample-plan-licence-expiry-month'];
    const year = req.body['sample-plan-licence-expiry-year'];
    const licenceNumber = req.body['sample-plan-licence-number'];
    let hasError = false;

    if (!licenceNumber || licenceNumber.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypetwo'] = "true";
      hasError = true;
    }
    
    if ((!day || day.trim() === '') || (!month || month.trim() === '') || (!year || year.trim() === '')) {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      hasError = true;
    }

    if (hasError) {
      return res.redirect('existing-licence-expiry');
    }

    // Save the licence expiry data
    req.session.data['sample-plan-licence-expiry-day'] = day;
    req.session.data['sample-plan-licence-expiry-month'] = month;
    req.session.data['sample-plan-licence-expiry-year'] = year;
    req.session.data['sample-plan-licence-number'] = licenceNumber;
    
    // Check if we need to return to check answers
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      res.redirect('check-answers');
    } else {
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Before you start dredging volume page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/before-you-start-dredging-volume`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    req.session.data['isSamplePlansSection'] = true;
    
    // If dredging volumes are already completed, redirect to the maximum dredging volume page
    if (req.session.data['sample-plan-dredging-volumes-completed'] === "true") {
      return res.redirect('maximum-dredging-volume');
    }
    
    res.render(`versions/${version}/${section}/before-you-start-dredging-volume`);
  });

  // Before you start dredging volume router (POST)
  router.post(`/versions/${version}/${section}/before-you-start-dredging-volume-router`, function (req, res) {
    res.redirect('maximum-dredging-volume');
  });

  ///////////////////////////////////////////
  // Maximum dredging volume page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/maximum-dredging-volume`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['sample-plan-errortypethree'] = "false";
    req.session.data['sample-plan-errortypefour'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    res.render(`versions/${version}/${section}/maximum-dredging-volume`);
  });

  // Maximum dredging volume router (POST)
  router.post(`/versions/${version}/${section}/maximum-dredging-volume-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['sample-plan-errortypethree'] = "false";
    req.session.data['sample-plan-errortypefour'] = "false";

    // Validate volume selection
    const volumeSelection = req.body['sample-plan-maximum-dredging-volume'];
    
    if (!volumeSelection || volumeSelection.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('maximum-dredging-volume');
    }

    // Validate corresponding input field based on selection
    let hasVolumeError = false;
    
    if (volumeSelection === 'Total volume of material you plan to dredge over the full licence period') {
      const totalVolume = req.body['sample-plan-total-volume-input'];
      if (!totalVolume || totalVolume.trim() === '') {
        req.session.data['sample-plan-errorthispage'] = "true";
        req.session.data['sample-plan-errortypetwo'] = "true";
        hasVolumeError = true;
      } else {
        req.session.data['sample-plan-total-volume-input'] = totalVolume;
      }
    } else if (volumeSelection === 'Annual volume of material you plan to dredge') {
      const annualVolume = req.body['sample-plan-annual-volume-input'];
      if (!annualVolume || annualVolume.trim() === '') {
        req.session.data['sample-plan-errorthispage'] = "true";
        req.session.data['sample-plan-errortypethree'] = "true";
        hasVolumeError = true;
      } else {
        req.session.data['sample-plan-annual-volume-input'] = annualVolume;
      }
    } else if (volumeSelection === 'The maximum volume of material per dredge campaign') {
      const campaignVolume = req.body['sample-plan-campaign-volume-input'];
      if (!campaignVolume || campaignVolume.trim() === '') {
        req.session.data['sample-plan-errorthispage'] = "true";
        req.session.data['sample-plan-errortypefour'] = "true";
        hasVolumeError = true;
      } else {
        req.session.data['sample-plan-campaign-volume-input'] = campaignVolume;
      }
    }

    // If there are validation errors, redirect back to the form
    if (hasVolumeError) {
      return res.redirect('maximum-dredging-volume');
    }

    // Save the volume selection and redirect to beneficial use page
    req.session.data['sample-plan-maximum-dredging-volume'] = volumeSelection;
    res.redirect('beneficial-use');
  });

  ///////////////////////////////////////////
  // Beneficial use page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/beneficial-use`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    res.render(`versions/${version}/${section}/beneficial-use`);
  });

  // Beneficial use router (POST)
  router.post(`/versions/${version}/${section}/beneficial-use-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";

    // Validate beneficial use selection
    const beneficialUse = req.body['sample-plan-beneficial-use'];
    
    if (!beneficialUse || beneficialUse.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('beneficial-use');
    }

    // If "Yes" is selected, validate the description
    if (beneficialUse === 'Yes') {
      const description = req.body['sample-plan-beneficial-use-description'];
      if (!description || description.trim() === '') {
        req.session.data['sample-plan-errorthispage'] = "true";
        req.session.data['sample-plan-errortypetwo'] = "true";
        return res.redirect('beneficial-use');
      }
      req.session.data['sample-plan-beneficial-use-description'] = description;
    } else {
      // Clear description if "No" is selected
      req.session.data['sample-plan-beneficial-use-description'] = '';
    }

    // Save the beneficial use selection and mark dredging volumes as completed
    req.session.data['sample-plan-beneficial-use'] = beneficialUse;
    req.session.data['sample-plan-dredging-volumes-completed'] = "true";
    
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Fee estimate page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/fee-estimate`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    res.render(`versions/${version}/${section}/fee-estimate`);
  });

  // Fee estimate router (POST)
  router.post(`/versions/${version}/${section}/fee-estimate-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";

    let hasError = false;

    // Validate terms and conditions checkbox (using session data like other working pages)
    if (!req.session.data['fee-terms-checkbox']) {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      hasError = true;
    }

    // Validate fee acceptance radio button (using session data like other working pages)
    if (!req.session.data['fee-acceptance'] || req.session.data['fee-acceptance'].trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypetwo'] = "true";
      hasError = true;
    }

    // If there are validation errors, redirect back to the form
    if (hasError) {
      return res.redirect('fee-estimate');
    }

    // Success case - mark as completed if checkbox agreed and Yes selected
    if (req.session.data['fee-terms-checkbox'] && req.session.data['fee-acceptance'] === 'yes') {
      req.session.data['sample-plan-fee-estimate-completed'] = "true";
      // Clear any previous rejection flag
      req.session.data['sample-plan-fee-estimate-rejected'] = "false";
    }

    // Conditional routing based on fee acceptance
    if (req.session.data['fee-acceptance'] === 'yes') {
      res.redirect('sample-plan-start-page');
    } else if (req.session.data['fee-acceptance'] === 'no') {
      // Redirect to the "are you sure" confirmation page
      res.redirect('fee-are-you-sure');
    } else {
      // Fallback
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Fee are you sure page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/fee-are-you-sure`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/fee-are-you-sure`);
  });

  // Fee are you sure router (POST)
  router.post(`/versions/${version}/${section}/fee-are-you-sure-router`, function (req, res) {
    // Mark fee estimate as rejected/not accepted
    req.session.data['sample-plan-fee-estimate-completed'] = "false";
    req.session.data['sample-plan-fee-estimate-rejected'] = "true";
    
    // Redirect to projects page - the project will remain as a draft
    res.redirect('projects');
  });

  ///////////////////////////////////////////
  // Check answers page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/check-answers`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any interrupted journey flags when manually navigating to check answers
    delete req.session.data['dredging-cya-journey-interrupted'];
    
    res.render(`versions/${version}/${section}/check-answers`);
  });

  // Check answers router (POST) - redirects to declaration page
  router.post(`/versions/${version}/${section}/check-answers-router`, function (req, res) {
    // Redirect to declaration page
    res.redirect('declaration');
  });

  ///////////////////////////////////////////
  // Declaration page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/declaration`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/declaration`);
  });

  // Declaration router (POST) - submits application and redirects to confirmation
  router.post(`/versions/${version}/${section}/declaration-router`, function (req, res) {
    // Mark the sample plan application as submitted
    req.session.data['samplePlanApplicationSubmitted'] = "true";
    
    // Redirect to confirmation page
    res.redirect('confirmation');
  });

  ///////////////////////////////////////////
  // Confirmation page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/confirmation`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/confirmation`);
  });

}
