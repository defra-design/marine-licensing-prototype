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

  /////////////////////////////////////////////////////////
  //////// Dredging details Site 1 page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/dredging-details-site-1`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['dredging-details-site-1-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['dredging-details-site-1-material-type'];
      delete req.session.data['dredging-details-site-1-material-type-other'];
      delete req.session.data['dredging-details-site-1-method'];
      delete req.session.data['dredging-details-site-1-method-other'];
      delete req.session.data['dredging-details-site-1-depth'];
      delete req.session.data['dredging-details-site-1-errorthispage'];
      delete req.session.data['dredging-details-site-1-material-type-error'];
      delete req.session.data['dredging-details-site-1-material-type-other-error'];
      delete req.session.data['dredging-details-site-1-method-error'];
      delete req.session.data['dredging-details-site-1-method-other-error'];
      delete req.session.data['dredging-details-site-1-depth-error'];
    }
    
    res.render(`versions/${version}/${section}/${subsection}/dredging-details-site-1`);
  });

  // Dredging details Site 1 router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/dredging-details-site-1-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['dredging-details-site-1-errorthispage'] = "false";
    delete req.session.data['dredging-details-site-1-material-type-error'];
    delete req.session.data['dredging-details-site-1-material-type-other-error'];
    delete req.session.data['dredging-details-site-1-method-error'];
    delete req.session.data['dredging-details-site-1-method-other-error'];
    delete req.session.data['dredging-details-site-1-depth-error'];

    let hasErrors = false;

    // Validate Question 1: Material type
    if (!req.session.data['dredging-details-site-1-material-type'] || req.session.data['dredging-details-site-1-material-type'].length === 0) {
      req.session.data['dredging-details-site-1-material-type-error'] = "Select the type of material that will be dredged at this site";
      hasErrors = true;
    } else if (req.session.data['dredging-details-site-1-material-type'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['dredging-details-site-1-material-type-other'] || req.session.data['dredging-details-site-1-material-type-other'].trim() === '') {
        req.session.data['dredging-details-site-1-material-type-other-error'] = "Enter a description of the material";
        hasErrors = true;
      }
    }

    // Validate Question 2: Method
    if (!req.session.data['dredging-details-site-1-method'] || req.session.data['dredging-details-site-1-method'].length === 0) {
      req.session.data['dredging-details-site-1-method-error'] = "Select the proposed method of dredging";
      hasErrors = true;
    } else if (req.session.data['dredging-details-site-1-method'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['dredging-details-site-1-method-other'] || req.session.data['dredging-details-site-1-method-other'].trim() === '') {
        req.session.data['dredging-details-site-1-method-other-error'] = "Enter a description of the method";
        hasErrors = true;
      }
    }

    // Validate Question 3: Depth
    if (!req.session.data['dredging-details-site-1-depth'] || req.session.data['dredging-details-site-1-depth'].trim() === '') {
      req.session.data['dredging-details-site-1-depth-error'] = "Enter the depth of the dredge in metres";
      hasErrors = true;
    }

    if (hasErrors) {
      req.session.data['dredging-details-site-1-errorthispage'] = "true";
      res.redirect('dredging-details-site-1');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['dredging-details-site-1-completed'] = true;
    res.redirect('review-site-details');
  });

  /////////////////////////////////////////////////////////
  //////// Dredging details Site 2 page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/dredging-details-site-2`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['dredging-details-site-2-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['dredging-details-site-2-material-type'];
      delete req.session.data['dredging-details-site-2-material-type-other'];
      delete req.session.data['dredging-details-site-2-method'];
      delete req.session.data['dredging-details-site-2-method-other'];
      delete req.session.data['dredging-details-site-2-depth'];
      delete req.session.data['dredging-details-site-2-errorthispage'];
      delete req.session.data['dredging-details-site-2-material-type-error'];
      delete req.session.data['dredging-details-site-2-material-type-other-error'];
      delete req.session.data['dredging-details-site-2-method-error'];
      delete req.session.data['dredging-details-site-2-method-other-error'];
      delete req.session.data['dredging-details-site-2-depth-error'];
    }
    
    res.render(`versions/${version}/${section}/${subsection}/dredging-details-site-2`);
  });

  // Dredging details Site 2 router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/dredging-details-site-2-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['dredging-details-site-2-errorthispage'] = "false";
    delete req.session.data['dredging-details-site-2-material-type-error'];
    delete req.session.data['dredging-details-site-2-material-type-other-error'];
    delete req.session.data['dredging-details-site-2-method-error'];
    delete req.session.data['dredging-details-site-2-method-other-error'];
    delete req.session.data['dredging-details-site-2-depth-error'];

    let hasErrors = false;

    // Validate Question 1: Material type
    if (!req.session.data['dredging-details-site-2-material-type'] || req.session.data['dredging-details-site-2-material-type'].length === 0) {
      req.session.data['dredging-details-site-2-material-type-error'] = "Select the type of material that will be dredged at this site";
      hasErrors = true;
    } else if (req.session.data['dredging-details-site-2-material-type'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['dredging-details-site-2-material-type-other'] || req.session.data['dredging-details-site-2-material-type-other'].trim() === '') {
        req.session.data['dredging-details-site-2-material-type-other-error'] = "Enter a description of the material";
        hasErrors = true;
      }
    }

    // Validate Question 2: Method
    if (!req.session.data['dredging-details-site-2-method'] || req.session.data['dredging-details-site-2-method'].length === 0) {
      req.session.data['dredging-details-site-2-method-error'] = "Select the proposed method of dredging";
      hasErrors = true;
    } else if (req.session.data['dredging-details-site-2-method'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['dredging-details-site-2-method-other'] || req.session.data['dredging-details-site-2-method-other'].trim() === '') {
        req.session.data['dredging-details-site-2-method-other-error'] = "Enter a description of the method";
        hasErrors = true;
      }
    }

    // Validate Question 3: Depth
    if (!req.session.data['dredging-details-site-2-depth'] || req.session.data['dredging-details-site-2-depth'].trim() === '') {
      req.session.data['dredging-details-site-2-depth-error'] = "Enter the depth of the dredge in metres";
      hasErrors = true;
    }

    if (hasErrors) {
      req.session.data['dredging-details-site-2-errorthispage'] = "true";
      res.redirect('dredging-details-site-2');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['dredging-details-site-2-completed'] = true;
    res.redirect('review-site-details');
  });

};
