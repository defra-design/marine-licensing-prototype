module.exports = function (router) {
  // Sample plans v1 routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v1";

  // Sample plan information page
  router.get(`/versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`, function (req, res) {
    res.render(`versions/${version}/${section}/get-a-plan-for-sediment-sample-analysis`);
  });

  // Sign-in page
  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
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

    // Save the project name and redirect to next page (to be implemented)
    req.session.data['sample-plan-project-name-text-input'] = projectName;
    // For now, redirect back to project name start - this will be updated when next page is created
    res.redirect('project-name-start');
  });

}
