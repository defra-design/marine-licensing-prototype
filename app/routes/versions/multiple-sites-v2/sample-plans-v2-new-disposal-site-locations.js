module.exports = function (router) {
  // New disposal site locations routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v2";
  const subSection = "disposal-site-locations";
  const newSubSection = "new-disposal-sites";

  /////////////////////////////////////////////////////////
  //////// How do you want to provide site location page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/how-do-you-want-to-provide-site-location`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/how-do-you-want-to-provide-site-location`);
  });

  // How do you want to provide site location router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/how-do-you-want-to-provide-site-location-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['new-disposal-errorthispage'] = "false";

    // Check if option is selected
    if (!req.session.data['new-disposal-site-location-method']) {
      req.session.data['new-disposal-errorthispage'] = "true";
      res.redirect('how-do-you-want-to-provide-site-location');
      return;
    }

    // Route based on selection (only file upload is implemented)
    if (req.session.data['new-disposal-site-location-method'] === 'file-upload') {
      res.redirect('which-type-of-file');
    } else {
      // For manual entry - redirect back to same page for now since manual entry is not implemented
      res.redirect('how-do-you-want-to-provide-site-location');
    }
  });

  /////////////////////////////////////////////////////////
  //////// Which type of file page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/which-type-of-file`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/which-type-of-file`);
  });

  // Which type of file router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/which-type-of-file-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['new-disposal-file-type-errorthispage'] = "false";

    // Check if option is selected
    if (!req.session.data['new-disposal-file-type']) {
      req.session.data['new-disposal-file-type-errorthispage'] = "true";
      res.redirect('which-type-of-file');
      return;
    }

    // Route to upload file page
    res.redirect('upload-file');
  });

  /////////////////////////////////////////////////////////
  //////// Upload file page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/upload-file`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/upload-file`);
  });

  // Upload file router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/upload-file-router`, function (req, res) {
    // For prototype, redirect to review site details after file upload
    res.redirect('review-new-disposal-site-details');
  });

  /////////////////////////////////////////////////////////
  //////// Review new disposal site details page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/review-new-disposal-site-details`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/review-new-disposal-site-details`);
  });

  // Review new disposal site details router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/review-new-disposal-site-details-router`, function (req, res) {
    // Mark that user has visited new disposal site locations journey
    req.session.data['has-visited-new-disposal-site-locations'] = true;
    
    // Check if all required fields are completed
    const detailsComplete = req.session.data['new-disposal-details-site-1-completed'];
    const maximumVolumeComplete = req.session.data['new-disposal-maximum-volume-completed'];
    const beneficialUseComplete = req.session.data['new-disposal-beneficial-use-completed'];
    
    // Set the overall completion status
    if (detailsComplete && maximumVolumeComplete && beneficialUseComplete) {
      req.session.data['new-disposal-sites-all-complete'] = true;
      req.session.data['sample-disposal-sites-completed'] = true;
      req.session.data['sample-disposal-sites-in-progress'] = false;
    } else {
      req.session.data['new-disposal-sites-all-complete'] = false;
      req.session.data['sample-disposal-sites-in-progress'] = true;
      req.session.data['sample-disposal-sites-completed'] = false;
    }
    
    // Redirect back to task list (sample plan start page)
    res.redirect('../../sample-plan-start-page');
  });

  /////////////////////////////////////////////////////////
  //////// Disposal site name page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/disposal-site-name`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/disposal-site-name`);
  });

  // Disposal site name router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/disposal-site-name-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['new-disposal-site-1-name-errorthispage'] = "false";

    let hasErrors = false;

    // Validate site name
    if (!req.session.data['new-disposal-site-1-name'] || req.session.data['new-disposal-site-1-name'].trim() === '') {
      req.session.data['new-disposal-site-1-name-errorthispage'] = "true";
      hasErrors = true;
    }

    if (hasErrors) {
      res.redirect('disposal-site-name');
      return;
    }

    // If no errors, redirect to review page
    res.redirect('review-new-disposal-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// New disposal details site 1 page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/new-disposal-details-site-1`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['new-disposal-details-site-1-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['new-disposal-details-site-1-material-type'];
      delete req.session.data['new-disposal-details-site-1-material-type-other'];
      delete req.session.data['new-disposal-details-site-1-method'];
      delete req.session.data['new-disposal-details-site-1-method-other'];
      delete req.session.data['new-disposal-details-site-1-errorthispage'];
      delete req.session.data['new-disposal-details-site-1-material-type-error'];
      delete req.session.data['new-disposal-details-site-1-material-type-other-error'];
      delete req.session.data['new-disposal-details-site-1-method-error'];
      delete req.session.data['new-disposal-details-site-1-method-other-error'];
    }
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/new-disposal-details-site-1`);
  });

  // New disposal details site 1 router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/new-disposal-details-site-1-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['new-disposal-details-site-1-errorthispage'] = "false";
    delete req.session.data['new-disposal-details-site-1-material-type-error'];
    delete req.session.data['new-disposal-details-site-1-material-type-other-error'];
    delete req.session.data['new-disposal-details-site-1-method-error'];
    delete req.session.data['new-disposal-details-site-1-method-other-error'];

    let hasErrors = false;

    // Validate Question 1: Material type
    if (!req.session.data['new-disposal-details-site-1-material-type'] || req.session.data['new-disposal-details-site-1-material-type'].length === 0) {
      req.session.data['new-disposal-details-site-1-material-type-error'] = "Select what type of material will be disposed at this site";
      hasErrors = true;
    } else if (req.session.data['new-disposal-details-site-1-material-type'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['new-disposal-details-site-1-material-type-other'] || req.session.data['new-disposal-details-site-1-material-type-other'].trim() === '') {
        req.session.data['new-disposal-details-site-1-material-type-other-error'] = "Describe the other material type";
        hasErrors = true;
      }
    }

    // Validate Question 2: Method
    if (!req.session.data['new-disposal-details-site-1-method'] || req.session.data['new-disposal-details-site-1-method'].length === 0) {
      req.session.data['new-disposal-details-site-1-method-error'] = "Select what the proposed method of disposal is";
      hasErrors = true;
    } else if (req.session.data['new-disposal-details-site-1-method'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['new-disposal-details-site-1-method-other'] || req.session.data['new-disposal-details-site-1-method-other'].trim() === '') {
        req.session.data['new-disposal-details-site-1-method-other-error'] = "Describe the other method";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      req.session.data['new-disposal-details-site-1-errorthispage'] = "true";
      res.redirect('new-disposal-details-site-1');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['new-disposal-details-site-1-completed'] = true;
    res.redirect('review-new-disposal-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// New maximum disposal volume page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/new-maximum-disposal-volume`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['new-disposal-maximum-volume-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['new-disposal-site-1-total-volume'];
      delete req.session.data['new-disposal-site-1-maximum-volume-errorthispage'];
      delete req.session.data['new-disposal-site-1-total-volume-error'];
    }
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/new-maximum-disposal-volume`);
  });

  // New maximum disposal volume router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/new-maximum-disposal-volume-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['new-disposal-site-1-maximum-volume-errorthispage'] = "false";
    delete req.session.data['new-disposal-site-1-total-volume-error'];

    let hasErrors = false;

    // Validate total volume is mandatory
    if (!req.session.data['new-disposal-site-1-total-volume'] || req.session.data['new-disposal-site-1-total-volume'].trim() === '') {
      req.session.data['new-disposal-site-1-total-volume-error'] = "Enter the total volume, in cubic metres, over the full licence period";
      hasErrors = true;
    }

    if (hasErrors) {
      req.session.data['new-disposal-site-1-maximum-volume-errorthispage'] = "true";
      res.redirect('new-maximum-disposal-volume');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['new-disposal-maximum-volume-completed'] = true;
    res.redirect('review-new-disposal-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// New beneficial use page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/new-beneficial-use`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear incomplete data if user navigates away and comes back without completing
    if (!req.session.data['new-disposal-beneficial-use-completed']) {
      // Clear any partial form data to ensure fresh start
      delete req.session.data['new-disposal-site-1-beneficial-use'];
      delete req.session.data['new-disposal-site-1-beneficial-use-description'];
      delete req.session.data['new-disposal-site-1-beneficial-use-errorthispage'];
      delete req.session.data['new-disposal-site-1-beneficial-use-error'];
      delete req.session.data['new-disposal-site-1-beneficial-use-description-error'];
    }
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/new-beneficial-use`);
  });

  // New beneficial use router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/new-beneficial-use-router`, function (req, res) {
    // Clear any previous errors
    req.session.data['new-disposal-site-1-beneficial-use-errorthispage'] = "false";
    delete req.session.data['new-disposal-site-1-beneficial-use-error'];
    delete req.session.data['new-disposal-site-1-beneficial-use-description-error'];

    let hasErrors = false;

    // Validate beneficial use selection (mandatory)
    if (!req.session.data['new-disposal-site-1-beneficial-use']) {
      req.session.data['new-disposal-site-1-beneficial-use-error'] = "Select if the material being disposed of is for beneficial use";
      hasErrors = true;
    } else {
      // If "yes" is selected, validate the description
      if (req.session.data['new-disposal-site-1-beneficial-use'] === 'yes') {
        if (!req.session.data['new-disposal-site-1-beneficial-use-description'] || req.session.data['new-disposal-site-1-beneficial-use-description'].trim() === '') {
          req.session.data['new-disposal-site-1-beneficial-use-description-error'] = "Enter a description of the proposed beneficial use";
          hasErrors = true;
        }
      }
    }

    if (hasErrors) {
      req.session.data['new-disposal-site-1-beneficial-use-errorthispage'] = "true";
      res.redirect('new-beneficial-use');
      return;
    }

    // If no errors, mark as completed and redirect to review page
    req.session.data['new-disposal-beneficial-use-completed'] = true;
    res.redirect('review-new-disposal-site-details#site-1-details');
  });

  /////////////////////////////////////////////////////////
  //////// Delete all sites page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/delete-all-sites`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/delete-all-sites`);
  });

  // Delete all sites router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/delete-all-sites-router`, function (req, res) {
    // Clear all new disposal site location data
    
    // File upload journey data
    delete req.session.data['new-disposal-site-location-method'];
    delete req.session.data['new-disposal-file-type'];
    
    // Site 1 name
    delete req.session.data['new-disposal-site-1-name'];
    
    // Site 1 disposal details
    delete req.session.data['new-disposal-details-site-1-completed'];
    delete req.session.data['new-disposal-details-site-1-material-type'];
    delete req.session.data['new-disposal-details-site-1-material-type-other'];
    delete req.session.data['new-disposal-details-site-1-method'];
    delete req.session.data['new-disposal-details-site-1-method-other'];
    
    // Site 1 maximum volume
    delete req.session.data['new-disposal-maximum-volume-completed'];
    delete req.session.data['new-disposal-site-1-total-volume'];
    
    // Site 1 beneficial use
    delete req.session.data['new-disposal-beneficial-use-completed'];
    delete req.session.data['new-disposal-site-1-beneficial-use'];
    delete req.session.data['new-disposal-site-1-beneficial-use-description'];
    
    // Overall completion flags
    delete req.session.data['has-visited-new-disposal-site-locations'];
    delete req.session.data['new-disposal-sites-all-complete'];
    
    // Reset the sample disposal sites status
    req.session.data['sample-disposal-sites-completed'] = false;
    req.session.data['sample-disposal-sites-in-progress'] = false;
    
    // Redirect to sample plan start page (task list)
    res.redirect('../../sample-plan-start-page');
  });

};

