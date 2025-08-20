module.exports = function (router) {
  // Sample plans v1 routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v1";

  // Sample plan information page
  router.get(`/versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`);
  });

  // Sign-in page
  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/sign-in`);
  });

  // Sign-in router (POST)
  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {
    // For prototype purposes, always redirect to project name start
    res.redirect('project-name-start');
  });

  // Project name start page
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

  // Sample plan start page
  router.get(`/versions/${version}/${section}/sample-plan-start-page`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/sample-plan-start-page`);
  });

  // Which activity page
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

  // Project name page (for editing from task list)
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

  // New or existing licence page
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
    
    // For now, redirect back to task list - conditional routing will be added later
    res.redirect('sample-plan-start-page');
  });

}
