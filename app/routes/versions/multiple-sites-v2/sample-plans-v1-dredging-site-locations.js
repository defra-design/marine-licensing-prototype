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
    
    // Check if all required fields are completed
    const site1DredgingComplete = req.session.data['dredging-details-site-1-completed'];
    const site1HistoryComplete = req.session.data['site-history-site-1-completed'];
    const site2DredgingComplete = req.session.data['dredging-details-site-2-completed'];
    const site2HistoryComplete = req.session.data['site-history-site-2-completed'];
    
    // Set the overall completion status
    if (site1DredgingComplete && site1HistoryComplete && site2DredgingComplete && site2HistoryComplete) {
      req.session.data['dredging-sites-all-complete'] = true;
    } else {
      req.session.data['dredging-sites-all-complete'] = false;
    }
    
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
        req.session.data['dredging-details-site-1-material-type-other-error'] = "Enter the other material";
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
        req.session.data['dredging-details-site-1-method-other-error'] = "Enter the other method";
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
        req.session.data['dredging-details-site-2-material-type-other-error'] = "Enter the other material";
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
        req.session.data['dredging-details-site-2-method-other-error'] = "Enter the other method";
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

  /////////////////////////////////////////////////////////
  //////// Site history Site 1 page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/site-history-site-1`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['site-history-site-1-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['site-history-site-1'];
      delete req.session.data['site-history-site-1-chemicals-manufacturing-details'];
      delete req.session.data['site-history-site-1-electronics-manufacturing-details'];
      delete req.session.data['site-history-site-1-major-port-infrastructure-details'];
      delete req.session.data['site-history-site-1-mining-details'];
      delete req.session.data['site-history-site-1-oil-processing-details'];
      delete req.session.data['site-history-site-1-pollution-incidents-details'];
      delete req.session.data['site-history-site-1-ship-building-details'];
      delete req.session.data['site-history-site-1-steelworks-details'];
      delete req.session.data['site-history-site-1-other-details'];
      // Clear errors
      delete req.session.data['site-history-site-1-errorthispage'];
      delete req.session.data['site-history-site-1-error'];
      delete req.session.data['site-history-site-1-chemicals-manufacturing-details-error'];
      delete req.session.data['site-history-site-1-electronics-manufacturing-details-error'];
      delete req.session.data['site-history-site-1-major-port-infrastructure-details-error'];
      delete req.session.data['site-history-site-1-mining-details-error'];
      delete req.session.data['site-history-site-1-oil-processing-details-error'];
      delete req.session.data['site-history-site-1-pollution-incidents-details-error'];
      delete req.session.data['site-history-site-1-ship-building-details-error'];
      delete req.session.data['site-history-site-1-steelworks-details-error'];
      delete req.session.data['site-history-site-1-other-details-error'];
    }
    
    res.render(`versions/${version}/${section}/${subsection}/site-history-site-1`);
  });

  // Site history Site 1 router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/site-history-site-1-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['site-history-site-1-errorthispage'] = "false";
    delete req.session.data['site-history-site-1-error'];
    delete req.session.data['site-history-site-1-chemicals-manufacturing-details-error'];
    delete req.session.data['site-history-site-1-electronics-manufacturing-details-error'];
    delete req.session.data['site-history-site-1-major-port-infrastructure-details-error'];
    delete req.session.data['site-history-site-1-mining-details-error'];
    delete req.session.data['site-history-site-1-oil-processing-details-error'];
    delete req.session.data['site-history-site-1-pollution-incidents-details-error'];
    delete req.session.data['site-history-site-1-ship-building-details-error'];
    delete req.session.data['site-history-site-1-steelworks-details-error'];
    delete req.session.data['site-history-site-1-other-details-error'];

    let hasErrors = false;

    // Validate that at least one option is selected
    if (!req.session.data['site-history-site-1'] || req.session.data['site-history-site-1'].length === 0) {
      req.session.data['site-history-site-1-error'] = "Select all that apply for the site history";
      hasErrors = true;
    } else {
      // Check each selected option has details provided (except "not-previously-used")
      const selectedOptions = req.session.data['site-history-site-1'];
      
      if (selectedOptions.includes('chemicals-manufacturing')) {
        if (!req.session.data['site-history-site-1-chemicals-manufacturing-details'] || req.session.data['site-history-site-1-chemicals-manufacturing-details'].trim() === '') {
          req.session.data['site-history-site-1-chemicals-manufacturing-details-error'] = "Provide details about chemicals manufacturing";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('electronics-manufacturing')) {
        if (!req.session.data['site-history-site-1-electronics-manufacturing-details'] || req.session.data['site-history-site-1-electronics-manufacturing-details'].trim() === '') {
          req.session.data['site-history-site-1-electronics-manufacturing-details-error'] = "Provide details about electronics manufacturing";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('major-port-infrastructure')) {
        if (!req.session.data['site-history-site-1-major-port-infrastructure-details'] || req.session.data['site-history-site-1-major-port-infrastructure-details'].trim() === '') {
          req.session.data['site-history-site-1-major-port-infrastructure-details-error'] = "Provide details about major port infrastructure or activity";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('mining')) {
        if (!req.session.data['site-history-site-1-mining-details'] || req.session.data['site-history-site-1-mining-details'].trim() === '') {
          req.session.data['site-history-site-1-mining-details-error'] = "Provide details about mining";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('oil-processing')) {
        if (!req.session.data['site-history-site-1-oil-processing-details'] || req.session.data['site-history-site-1-oil-processing-details'].trim() === '') {
          req.session.data['site-history-site-1-oil-processing-details-error'] = "Provide details about oil processing";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('pollution-incidents')) {
        if (!req.session.data['site-history-site-1-pollution-incidents-details'] || req.session.data['site-history-site-1-pollution-incidents-details'].trim() === '') {
          req.session.data['site-history-site-1-pollution-incidents-details-error'] = "Provide details about pollution incidents";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('ship-building')) {
        if (!req.session.data['site-history-site-1-ship-building-details'] || req.session.data['site-history-site-1-ship-building-details'].trim() === '') {
          req.session.data['site-history-site-1-ship-building-details-error'] = "Provide details about ship building";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('steelworks')) {
        if (!req.session.data['site-history-site-1-steelworks-details'] || req.session.data['site-history-site-1-steelworks-details'].trim() === '') {
          req.session.data['site-history-site-1-steelworks-details-error'] = "Provide details about steelworks";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('other')) {
        if (!req.session.data['site-history-site-1-other-details'] || req.session.data['site-history-site-1-other-details'].trim() === '') {
          req.session.data['site-history-site-1-other-details-error'] = "Provide details about other activities";
          hasErrors = true;
        }
      }
    }

    if (hasErrors) {
      req.session.data['site-history-site-1-errorthispage'] = "true";
      res.redirect('site-history-site-1');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['site-history-site-1-completed'] = true;
    res.redirect('review-site-details');
  });

  /////////////////////////////////////////////////////////
  //////// Site history Site 2 page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/site-history-site-2`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['site-history-site-2-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['site-history-site-2'];
      delete req.session.data['site-history-site-2-chemicals-manufacturing-details'];
      delete req.session.data['site-history-site-2-electronics-manufacturing-details'];
      delete req.session.data['site-history-site-2-major-port-infrastructure-details'];
      delete req.session.data['site-history-site-2-mining-details'];
      delete req.session.data['site-history-site-2-oil-processing-details'];
      delete req.session.data['site-history-site-2-pollution-incidents-details'];
      delete req.session.data['site-history-site-2-ship-building-details'];
      delete req.session.data['site-history-site-2-steelworks-details'];
      delete req.session.data['site-history-site-2-other-details'];
      // Clear errors
      delete req.session.data['site-history-site-2-errorthispage'];
      delete req.session.data['site-history-site-2-error'];
      delete req.session.data['site-history-site-2-chemicals-manufacturing-details-error'];
      delete req.session.data['site-history-site-2-electronics-manufacturing-details-error'];
      delete req.session.data['site-history-site-2-major-port-infrastructure-details-error'];
      delete req.session.data['site-history-site-2-mining-details-error'];
      delete req.session.data['site-history-site-2-oil-processing-details-error'];
      delete req.session.data['site-history-site-2-pollution-incidents-details-error'];
      delete req.session.data['site-history-site-2-ship-building-details-error'];
      delete req.session.data['site-history-site-2-steelworks-details-error'];
      delete req.session.data['site-history-site-2-other-details-error'];
    }
    
    res.render(`versions/${version}/${section}/${subsection}/site-history-site-2`);
  });

  // Site history Site 2 router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/site-history-site-2-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['site-history-site-2-errorthispage'] = "false";
    delete req.session.data['site-history-site-2-error'];
    delete req.session.data['site-history-site-2-chemicals-manufacturing-details-error'];
    delete req.session.data['site-history-site-2-electronics-manufacturing-details-error'];
    delete req.session.data['site-history-site-2-major-port-infrastructure-details-error'];
    delete req.session.data['site-history-site-2-mining-details-error'];
    delete req.session.data['site-history-site-2-oil-processing-details-error'];
    delete req.session.data['site-history-site-2-pollution-incidents-details-error'];
    delete req.session.data['site-history-site-2-ship-building-details-error'];
    delete req.session.data['site-history-site-2-steelworks-details-error'];
    delete req.session.data['site-history-site-2-other-details-error'];

    let hasErrors = false;

    // Validate that at least one option is selected
    if (!req.session.data['site-history-site-2'] || req.session.data['site-history-site-2'].length === 0) {
      req.session.data['site-history-site-2-error'] = "Select all that apply for the site history";
      hasErrors = true;
    } else {
      // Check each selected option has details provided (except "not-previously-used")
      const selectedOptions = req.session.data['site-history-site-2'];
      
      if (selectedOptions.includes('chemicals-manufacturing')) {
        if (!req.session.data['site-history-site-2-chemicals-manufacturing-details'] || req.session.data['site-history-site-2-chemicals-manufacturing-details'].trim() === '') {
          req.session.data['site-history-site-2-chemicals-manufacturing-details-error'] = "Provide details about chemicals manufacturing";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('electronics-manufacturing')) {
        if (!req.session.data['site-history-site-2-electronics-manufacturing-details'] || req.session.data['site-history-site-2-electronics-manufacturing-details'].trim() === '') {
          req.session.data['site-history-site-2-electronics-manufacturing-details-error'] = "Provide details about electronics manufacturing";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('major-port-infrastructure')) {
        if (!req.session.data['site-history-site-2-major-port-infrastructure-details'] || req.session.data['site-history-site-2-major-port-infrastructure-details'].trim() === '') {
          req.session.data['site-history-site-2-major-port-infrastructure-details-error'] = "Provide details about major port infrastructure or activity";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('mining')) {
        if (!req.session.data['site-history-site-2-mining-details'] || req.session.data['site-history-site-2-mining-details'].trim() === '') {
          req.session.data['site-history-site-2-mining-details-error'] = "Provide details about mining";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('oil-processing')) {
        if (!req.session.data['site-history-site-2-oil-processing-details'] || req.session.data['site-history-site-2-oil-processing-details'].trim() === '') {
          req.session.data['site-history-site-2-oil-processing-details-error'] = "Provide details about oil processing";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('pollution-incidents')) {
        if (!req.session.data['site-history-site-2-pollution-incidents-details'] || req.session.data['site-history-site-2-pollution-incidents-details'].trim() === '') {
          req.session.data['site-history-site-2-pollution-incidents-details-error'] = "Provide details about pollution incidents";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('ship-building')) {
        if (!req.session.data['site-history-site-2-ship-building-details'] || req.session.data['site-history-site-2-ship-building-details'].trim() === '') {
          req.session.data['site-history-site-2-ship-building-details-error'] = "Provide details about ship building";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('steelworks')) {
        if (!req.session.data['site-history-site-2-steelworks-details'] || req.session.data['site-history-site-2-steelworks-details'].trim() === '') {
          req.session.data['site-history-site-2-steelworks-details-error'] = "Provide details about steelworks";
          hasErrors = true;
        }
      }
      
      if (selectedOptions.includes('other')) {
        if (!req.session.data['site-history-site-2-other-details'] || req.session.data['site-history-site-2-other-details'].trim() === '') {
          req.session.data['site-history-site-2-other-details-error'] = "Provide details about other activities";
          hasErrors = true;
        }
      }
    }

    if (hasErrors) {
      req.session.data['site-history-site-2-errorthispage'] = "true";
      res.redirect('site-history-site-2');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['site-history-site-2-completed'] = true;
    res.redirect('review-site-details');
  });

};
