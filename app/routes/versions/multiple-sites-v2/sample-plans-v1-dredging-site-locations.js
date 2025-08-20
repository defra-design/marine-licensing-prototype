module.exports = function (router) {
  // Sample plans v1 dredging site locations routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v1";
  const subsection = "dredging-site-locations";

  /////////////////////////////////////////////////////////
  //////// Before you start page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/before-you-start`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear any incomplete journey states when starting fresh
    // Only clear if they haven't completed and saved the journey
    if (!req.session.data['has-visited-dredging-site-locations']) {
      // Clear file upload journey states
      delete req.session.data['sample-plan-site-location-method'];
      delete req.session.data['sample-plan-file-type'];
      delete req.session.data['hasUploadedFile'];
    }
    
    res.render(`versions/${version}/${section}/${subsection}/before-you-start`);
  });

  // Before you start router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/before-you-start-router`, function (req, res) {
    res.redirect('how-do-you-want-to-provide-site-location');
  });

  /////////////////////////////////////////////////////////
  //////// How do you want to provide site location page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/how-do-you-want-to-provide-site-location`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/${subsection}/how-do-you-want-to-provide-site-location`);
  });

  // How do you want to provide site location router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/how-do-you-want-to-provide-site-location-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['sample-plan-errorthispage'] = "false";

    // Check if option is selected
    if (!req.session.data['sample-plan-site-location-method']) {
      req.session.data['sample-plan-errorthispage'] = "true";
      res.redirect('how-do-you-want-to-provide-site-location');
      return;
    }

    // Route based on selection
    if (req.session.data['sample-plan-site-location-method'] === 'file-upload') {
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
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/${subsection}/which-type-of-file`);
  });

  // Which type of file router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/which-type-of-file-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['sample-plan-file-type-errorthispage'] = "false";

    // Check if option is selected
    if (!req.session.data['sample-plan-file-type']) {
      req.session.data['sample-plan-file-type-errorthispage'] = "true";
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
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/${subsection}/upload-file`);
  });

  // Upload file router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/upload-file-router`, function (req, res) {
    // For prototype, redirect to review site details after file upload
    // Note: has-visited flag is only set when user SAVES from review page
    res.redirect('review-site-details');
  });

  /////////////////////////////////////////////////////////
  //////// Review site details page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/review-site-details`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/${subsection}/review-site-details`);
  });

  // Review site details router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/review-site-details-router`, function (req, res) {
    // Mark that user has visited dredging site locations journey
    req.session.data['has-visited-dredging-site-locations'] = true;
    // Redirect back to task list (sample plan start page)
    res.redirect('../sample-plan-start-page');
  });

};
