module.exports = function (router) {
  // Low complexity v1 site locations routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v1";
  const subsection = "site-details";

  /////////////////////////////////////////////////////////
  //////// Site details index page (before you start)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
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
    res.redirect('review-site-details');
  });

  /////////////////////////////////////////////////////////
  //////// Review site details page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/review-site-details`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/review-site-details`);
  });

  // Review site details router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/review-site-details-router`, function (req, res) {
    // Mark that user has visited site details journey
    req.session.data['has-visited-site-details'] = true;
    
    // Redirect back to task list
    res.redirect('../marine-licence-start-page');
  });

};

