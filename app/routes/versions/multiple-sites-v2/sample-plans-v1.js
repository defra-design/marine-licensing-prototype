module.exports = function (router) {
  // Sample plans v1 routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v1";

  ///////////////////////////////////////////
  // Projects page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/projects`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/projects`);
  });

  // Delete project route
  router.get(`/versions/${version}/${section}/delete`, function (req, res) {
    const projectToDelete = req.query.project;
    
    if (projectToDelete === 'sample-plan-user') {
      req.session.data['userSamplePlanProjectDeleted'] = "true";
      // Clear the user's sample plan project data
      req.session.data['sample-plan-project-name-text-input'] = '';
      req.session.data['sample-plan-which-activity'] = '';
      req.session.data['sample-plan-new-or-existing-licence'] = '';
      req.session.data['sample-plan-dredging-volumes-completed'] = "false";
      req.session.data['sample-plan-fee-estimate-completed'] = "false";
    } else if (projectToDelete === 'south-coast') {
      // Handle deletion of the South coast sample project
      // Could set a flag to hide this project in the view
    } else if (projectToDelete === 'my-sample-plan') {
      // Handle deletion of the My sample plan project
      // Could set a flag to hide this project in the view
    }
    
    res.redirect('projects');
  });

  ///////////////////////////////////////////
  // Sample plan information page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`);
  });

  ///////////////////////////////////////////
  // Sign-in page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/sign-in`);
  });

  // Sign-in router (POST)
  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {
    // For prototype purposes, always redirect to project name start
    res.redirect('project-name-start');
  });

  ///////////////////////////////////////////
  // Project name start page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-name-start`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
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
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/sample-plan-start-page`);
  });

  ///////////////////////////////////////////
  // Project background page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/project-background`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['sample-plan-errortypethree'] = "false";
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
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Which activity page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/which-activity`, function (req, res) {
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
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
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

    // Save the project name and redirect back to task list
    req.session.data['sample-plan-project-name-text-input'] = projectName;
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // New or existing licence page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/new-or-existing-licence`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
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
    
    // Conditional routing based on selection
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
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
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

    // Save the licence length data and redirect back to task list
    req.session.data['sample-plan-licence-length-years'] = years;
    req.session.data['sample-plan-licence-length-months'] = months;
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Existing licence expiry page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/existing-licence-expiry`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
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

    // Save the licence expiry data and redirect back to task list
    req.session.data['sample-plan-licence-expiry-day'] = day;
    req.session.data['sample-plan-licence-expiry-month'] = month;
    req.session.data['sample-plan-licence-expiry-year'] = year;
    req.session.data['sample-plan-licence-number'] = licenceNumber;
    res.redirect('sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Maximum dredging volume page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/maximum-dredging-volume`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['sample-plan-errortypetwo'] = "false";
    req.session.data['sample-plan-errortypethree'] = "false";
    req.session.data['sample-plan-errortypefour'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear dredging volumes completion flag when user starts the journey again
    req.session.data['sample-plan-dredging-volumes-completed'] = "false";
    
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
    }

    // Conditional routing based on fee acceptance
    if (req.session.data['fee-acceptance'] === 'yes') {
      res.redirect('sample-plan-start-page');
    } else if (req.session.data['fee-acceptance'] === 'no') {
      // Redirect to a "rejection" page (not yet built)
      // For now, redirect back to the same page
      res.redirect('fee-estimate');
    } else {
      // Fallback
      res.redirect('sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Check answers page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/check-answers`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/check-answers`);
  });

  // Check answers router (POST) - submits application and redirects to confirmation
  router.post(`/versions/${version}/${section}/check-answers-router`, function (req, res) {
    // Mark the sample plan application as submitted
    req.session.data['samplePlanApplicationSubmitted'] = "true";
    
    // Redirect to confirmation page
    res.redirect('confirmation');
  });

  ///////////////////////////////////////////
  // Confirmation page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/confirmation`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/confirmation`);
  });

}
