module.exports = function (router) {
  // Sample plans v1 disposal site locations routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v2";
  const subSection = "disposal-site-locations";

  // Helper function to clear Site 1 completion flags and data
  function clearSite1CompletionFlags(session) {
    // Clear completion flags
    session.data['sample-disposal-site-material-type-completed'] = false;
    session.data['sample-disposal-site-disposal-method-completed'] = false;
    session.data['sample-disposal-site-1-maximum-volume-completed'] = false;
    session.data['sample-disposal-site-1-beneficial-use-completed'] = false;
    
    // Clear form data
    delete session.data['sample-disposal-details-site-1-material-type'];
    delete session.data['sample-disposal-details-site-1-material-type-other'];
    delete session.data['sample-disposal-details-site-1-method'];
    delete session.data['sample-disposal-details-site-1-method-other'];
    delete session.data['sample-disposal-site-1-total-volume'];
    delete session.data['sample-disposal-site-1-beneficial-use'];
    delete session.data['sample-disposal-site-1-beneficial-use-description'];
    
    // Clear any error states
    delete session.data['sample-disposal-details-site-1-errorthispage'];
    delete session.data['sample-disposal-details-site-1-material-type-error'];
    delete session.data['sample-disposal-details-site-1-method-error'];
    delete session.data['sample-disposal-details-site-1-method-other-error'];
    delete session.data['sample-disposal-details-site-1-material-type-other-error'];
    delete session.data['sample-disposal-site-1-maximum-volume-errorthispage'];
    delete session.data['sample-disposal-site-1-total-volume-error'];
    delete session.data['sample-disposal-site-1-beneficial-use-errorthispage'];
    delete session.data['sample-disposal-site-1-beneficial-use-error'];
    delete session.data['sample-disposal-site-1-beneficial-use-description-error'];
  }

  // Helper function to clear Site 2 completion flags and data
  function clearSite2CompletionFlags(session) {
    // Clear completion flags
    session.data['sample-disposal-site-2-material-type-completed'] = false;
    session.data['sample-disposal-site-2-disposal-method-completed'] = false;
    session.data['sample-disposal-site-2-maximum-volume-completed'] = false;
    session.data['sample-disposal-site-2-beneficial-use-completed'] = false;
    
    // Clear form data
    delete session.data['sample-disposal-details-site-2-material-type'];
    delete session.data['sample-disposal-details-site-2-material-type-other'];
    delete session.data['sample-disposal-details-site-2-method'];
    delete session.data['sample-disposal-details-site-2-method-other'];
    delete session.data['sample-disposal-site-2-total-volume'];
    delete session.data['sample-disposal-site-2-beneficial-use'];
    delete session.data['sample-disposal-site-2-beneficial-use-description'];
    
    // Clear any error states
    delete session.data['sample-disposal-details-site-2-errorthispage'];
    delete session.data['sample-disposal-details-site-2-material-type-error'];
    delete session.data['sample-disposal-details-site-2-method-error'];
    delete session.data['sample-disposal-details-site-2-method-other-error'];
    delete session.data['sample-disposal-details-site-2-material-type-other-error'];
    delete session.data['sample-disposal-site-2-maximum-volume-errorthispage'];
    delete session.data['sample-disposal-site-2-total-volume-error'];
    delete session.data['sample-disposal-site-2-beneficial-use-errorthispage'];
    delete session.data['sample-disposal-site-2-beneficial-use-error'];
    delete session.data['sample-disposal-site-2-beneficial-use-description-error'];
  }

  ///////////////////////////////////////////
  // Before you start page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/before-you-start`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any incomplete journey states when starting fresh
    // Only clear if they haven't completed and saved the journey
    if (!req.session.data['has-visited-disposal-site-locations']) {
      clearSite1CompletionFlags(req.session);
    }
    
    res.render(`versions/${version}/${section}/${subSection}/before-you-start`);
  });

  // Before you start router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/before-you-start-router`, function (req, res) {
    // Redirect to the where dispose of material page
    res.redirect('where-dispose-of-material');
  });

  ///////////////////////////////////////////
  // Find existing disposal site page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/find-existing-disposal-site`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Set form data from URL parameters (this will clear if empty parameters are passed)
    if (req.query.hasOwnProperty('disposal-site-code')) {
      req.session.data['disposal-site-code'] = req.query['disposal-site-code'] || '';
    }
    if (req.query.hasOwnProperty('disposal-site-name')) {
      req.session.data['disposal-site-name'] = req.query['disposal-site-name'] || '';
    }
    if (req.query.hasOwnProperty('disposal-site-location')) {
      req.session.data['disposal-site-location'] = req.query['disposal-site-location'] || '';
    }
    if (req.query.hasOwnProperty('marine-area')) {
      req.session.data['marine-area'] = req.query['marine-area'] || '';
    }
    if (req.query.hasOwnProperty('disposal-site-status')) {
      req.session.data['disposal-site-status'] = req.query['disposal-site-status'] || '';
    }
    req.session.data['has-search-filters'] = false;
    req.session.data['page'] = '1';
    
    res.render(`versions/${version}/${section}/${subSection}/find-existing-disposal-site`);
  });

  ///////////////////////////////////////////
  // Find existing disposal site - LEAN V1
  ///////////////////////////////////////////

  // GET: lean find page
  router.get(`/versions/${version}/${section}/${subSection}/find-existing-disposal-site-lean-v1`, function (req, res) {
    req.session.data['samplePlansSection'] = section;

    // Allow query params to explicitly set/clear values when linking back
    if (req.query.hasOwnProperty('disposal-site-code')) {
      req.session.data['disposal-site-code'] = req.query['disposal-site-code'] || '';
    }
    if (req.query.hasOwnProperty('disposal-site-name')) {
      req.session.data['disposal-site-name'] = req.query['disposal-site-name'] || '';
    }
    if (req.query.hasOwnProperty('include-closed-disused')) {
      // Checkbox: ensure explicit clearing when param present but empty
      req.session.data['include-closed-disused'] = req.query['include-closed-disused'] || '';
    }

    // Default page number
    req.session.data['page'] = '1';

    res.render(`versions/${version}/${section}/${subSection}/find-existing-disposal-site-lean-v1`);
  });

  // POST: lean results (capture form and redirect)
  router.post(`/versions/${version}/${section}/${subSection}/search-results-lean-v1`, function (req, res) {
    // Save criteria; clear checkbox when not present
    req.session.data['disposal-site-code'] = req.body['disposal-site-code'] || '';
    req.session.data['disposal-site-name'] = req.body['disposal-site-name'] || '';
    req.session.data['include-closed-disused'] = req.body['include-closed-disused'] || '';

    // Reset to first page on new search
    req.session.data['page'] = '1';

    // PRG: Redirect to GET of results
    res.redirect('search-results-lean-v1');
  });

  // GET: lean results page
  router.get(`/versions/${version}/${section}/${subSection}/search-results-lean-v1`, function (req, res) {
    req.session.data['samplePlansSection'] = section;

    // Allow page query to paginate (JS handles rendering)
    if (req.query.page) {
      req.session.data['page'] = req.query.page;
    }

    res.render(`versions/${version}/${section}/${subSection}/search-results-lean-v1`);
  });

  ///////////////////////////////////////////
  // Find existing disposal site - LEAN V2
  ///////////////////////////////////////////

  // GET: lean v2 find page
  router.get(`/versions/${version}/${section}/${subSection}/find-existing-disposal-site-lean-v2`, function (req, res) {
    req.session.data['samplePlansSection'] = section;

    // Allow query params to explicitly set/clear values when linking back
    if (req.query.hasOwnProperty('disposal-site-code-or-name')) {
      req.session.data['disposal-site-code-or-name'] = req.query['disposal-site-code-or-name'] || '';
    }
    if (req.query.hasOwnProperty('include-closed-disused')) {
      // Checkbox: ensure explicit clearing when param present but empty
      req.session.data['include-closed-disused'] = req.query['include-closed-disused'] || '';
    }

    // Default page number
    req.session.data['page'] = '1';

    res.render(`versions/${version}/${section}/${subSection}/find-existing-disposal-site-lean-v2`);
  });

  // POST: lean v2 results (capture form and redirect)
  router.post(`/versions/${version}/${section}/${subSection}/search-results-lean-v2`, function (req, res) {
    // Save criteria; normalize checkbox to only 'include-closed-disused' or '' (ignore '_unchecked')
    req.session.data['disposal-site-code-or-name'] = req.body['disposal-site-code-or-name'] || '';
    const rawInclude = req.body['include-closed-disused'];
    let normalizedInclude = '';
    if (Array.isArray(rawInclude)) {
      normalizedInclude = rawInclude.includes('include-closed-disused') ? 'include-closed-disused' : '';
    } else if (typeof rawInclude === 'string') {
      normalizedInclude = (rawInclude === 'include-closed-disused') ? 'include-closed-disused' : '';
    }
    req.session.data['include-closed-disused'] = normalizedInclude;

    // Reset to first page on new search
    req.session.data['page'] = '1';

    // PRG: Redirect to GET of results
    res.redirect('search-results-lean-v2');
  });

  // GET: lean v2 results page
  router.get(`/versions/${version}/${section}/${subSection}/search-results-lean-v2`, function (req, res) {
    req.session.data['samplePlansSection'] = section;

    // Allow page query to paginate (JS handles rendering)
    if (req.query.page) {
      req.session.data['page'] = req.query.page;
    }

    res.render(`versions/${version}/${section}/${subSection}/search-results-lean-v2`);
  });

  // Find existing disposal site router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/find-existing-disposal-site-router`, function (req, res) {
    // Save all the form data for filtering
    req.session.data['disposal-site-code'] = req.body['disposal-site-code'] || '';
    req.session.data['disposal-site-name'] = req.body['disposal-site-name'] || '';
    req.session.data['disposal-site-location'] = req.body['disposal-site-location'] || '';
    req.session.data['marine-area'] = req.body['marine-area'] || '';
    req.session.data['disposal-site-status'] = req.body['disposal-site-status'] || '';
    
    // Set flag to indicate this is a filtered search
    req.session.data['has-search-filters'] = true;
    
    // Redirect to search results page
    res.redirect('search-results');
  });

  ///////////////////////////////////////////
  // Search results page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/search-results`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Store page parameter in session data for template access
    req.session.data['page'] = req.query.page || '1';
    
    // Check if this is a request to clear filters
    if (req.query.clear === 'true') {
      // Clear all search filter data
      req.session.data['disposal-site-code'] = '';
      req.session.data['disposal-site-name'] = '';
      req.session.data['disposal-site-location'] = '';
      req.session.data['marine-area'] = '';
      req.session.data['disposal-site-status'] = '';
      req.session.data['has-search-filters'] = false;
    }
    
    res.render(`versions/${version}/${section}/${subSection}/search-results`);
  });

  ///////////////////////////////////////////
  // Filter disposal sites page (alternative search)
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/filter-disposal-sites`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/filter-disposal-sites`);
  });

  ///////////////////////////////////////////
  // Where dispose of material page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/where-dispose-of-material`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    
    // If URL parameter is provided to clear the radio selection
    if (req.query.hasOwnProperty('sample-plan-where-dispose-material')) {
      req.session.data['sample-plan-where-dispose-material'] = req.query['sample-plan-where-dispose-material'] || '';
    }
    
    res.render(`versions/${version}/${section}/${subSection}/where-dispose-of-material`);
  });

  // Where dispose of material router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/where-dispose-of-material-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";

    // Validate disposal selection
    const disposalSelection = req.body['sample-plan-where-dispose-material'];
    
    if (!disposalSelection || disposalSelection.trim() === '') {
      req.session.data['sample-plan-errorthispage'] = "true";
      req.session.data['sample-plan-errortypeone'] = "true";
      return res.redirect('where-dispose-of-material');
    }

    // Save the disposal selection
    req.session.data['sample-plan-where-dispose-material'] = disposalSelection;
    
    // Conditional routing based on selection
    if (disposalSelection === 'Use an existing designated disposal site') {
      // Set journey type to existing only
      req.session.data['disposal-site-journey-type'] = 'existing';
      // Route to Lean v2 find page (default for A/B), clearing any previous criteria
      res.redirect('find-existing-disposal-site-lean-v2?disposal-site-code-or-name=&include-closed-disused=');
    } else if (disposalSelection === 'Request a new disposal site to be designated') {
      // Clear journey type - it will be set to 'new' or 'manual-entry' when they choose method
      delete req.session.data['disposal-site-journey-type'];
      // Route to new disposal site journey
      res.redirect('new-disposal-sites/how-do-you-want-to-provide-site-location');
    } else if (disposalSelection === 'Use an existing designated disposal site and request a new disposal site to be designated') {
      // Set journey type to both
      req.session.data['disposal-site-journey-type'] = 'both';
      // Route to sub-task list page
      res.redirect('disposal-sites-and-details');
    } else {
      // Fallback
      res.redirect('where-dispose-of-material');
    }
  });

  ///////////////////////////////////////////
  // Disposal sites and details sub-task list page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/disposal-sites-and-details`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Calculate completion status for existing disposal sites
    const existingSite1Complete = req.session.data['sample-disposal-site-material-type-completed'] && 
                                   req.session.data['sample-disposal-site-disposal-method-completed'] && 
                                   req.session.data['sample-disposal-site-1-maximum-volume-completed'] && 
                                   req.session.data['sample-disposal-site-1-beneficial-use-completed'];
    const existingSite2Complete = req.session.data['sample-disposal-site-2-material-type-completed'] && 
                                   req.session.data['sample-disposal-site-2-disposal-method-completed'] && 
                                   req.session.data['sample-disposal-site-2-maximum-volume-completed'] && 
                                   req.session.data['sample-disposal-site-2-beneficial-use-completed'];
    const hasSite2 = req.session.data['sample-disposal-site-2-selected'];
    const existingSitesComplete = req.session.data['sample-disposal-site-selected'] && 
                                  existingSite1Complete && 
                                  (!hasSite2 || existingSite2Complete);
    
    // Calculate completion status for new disposal sites
    const newSitesComplete = req.session.data['new-disposal-sites-all-complete'];
    
    // Set overall completion status
    if (existingSitesComplete && newSitesComplete) {
      req.session.data['sample-disposal-sites-completed'] = true;
      req.session.data['sample-disposal-sites-in-progress'] = false;
    } else if ((req.session.data['has-visited-disposal-site-review'] || req.session.data['sample-disposal-site-selected']) || 
               (req.session.data['has-visited-new-disposal-site-locations'] || req.session.data['has-visited-manual-disposal-site-locations'])) {
      req.session.data['sample-disposal-sites-in-progress'] = true;
      req.session.data['sample-disposal-sites-completed'] = false;
    } else {
      req.session.data['sample-disposal-sites-in-progress'] = false;
      req.session.data['sample-disposal-sites-completed'] = false;
    }
    
    res.render(`versions/${version}/${section}/${subSection}/disposal-sites-and-details`);
  });

  ///////////////////////////////////////////
  // Review disposal site details page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/review-disposal-site-details`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // If URL parameters are provided (coming from site selection), store them and redirect
    if (req.query.code || req.query.name || req.query.country || req.query.seaArea || req.query.status) {
      // Check if this is a second site being added
      const isSite2 = req.session.data['sample-disposal-site-selected'] && 
                      !req.session.data['sample-disposal-site-2-selected'];
      
      if (isSite2) {
        // Store as Site 2
        req.session.data['selected-disposal-site-2-code'] = req.query.code;
        req.session.data['selected-disposal-site-2-name'] = req.query.name;
        req.session.data['selected-disposal-site-2-country'] = req.query.country;
        req.session.data['selected-disposal-site-2-sea-area'] = req.query.seaArea;
        req.session.data['selected-disposal-site-2-status'] = req.query.status;
        req.session.data['sample-disposal-site-2-selected'] = true;
      } else {
        // Store as Site 1 (new or replacement)
        const isReplacingSite = req.session.data['sample-disposal-site-selected'];
        if (isReplacingSite) {
          clearSite1CompletionFlags(req.session);
        }
        
        req.session.data['selected-disposal-site-code'] = req.query.code;
        req.session.data['selected-disposal-site-name'] = req.query.name;
        req.session.data['selected-disposal-site-country'] = req.query.country;
        req.session.data['selected-disposal-site-sea-area'] = req.query.seaArea;
        req.session.data['selected-disposal-site-status'] = req.query.status;
        
        // Mark Site 1 as selected
        req.session.data['sample-disposal-site-selected'] = true;
        
        // Set journey type to existing when they select a site (only if not already set to 'both')
        if (req.session.data['disposal-site-journey-type'] !== 'both') {
          req.session.data['disposal-site-journey-type'] = 'existing';
        }
      }
      
      // Redirect to clean URL without parameters - this ensures session is saved
      return res.redirect(`/versions/${version}/${section}/${subSection}/review-disposal-site-details`);
    }
    
    // Normal page load - render with session data
    res.render(`versions/${version}/${section}/${subSection}/review-disposal-site-details`);
  });

  // Review disposal site details router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/review-disposal-site-details-router`, function (req, res) {
    // Mark that user has visited the disposal site review page
    req.session.data['has-visited-disposal-site-review'] = true;
    
    // Ensure the disposal site selection is preserved
    req.session.data['disposal-site-selected'] = true;
    
    // Check if disposal site details are complete
    const materialTypeComplete = req.session.data['sample-disposal-site-material-type-completed'];
    const disposalMethodComplete = req.session.data['sample-disposal-site-disposal-method-completed'];
    const maximumVolumeComplete = req.session.data['sample-disposal-site-1-maximum-volume-completed'];
    const beneficialUseComplete = req.session.data['sample-disposal-site-1-beneficial-use-completed'];
    const site2MaterialTypeComplete = req.session.data['sample-disposal-site-2-material-type-completed'];
    const site2DisposalMethodComplete = req.session.data['sample-disposal-site-2-disposal-method-completed'];
    const hasSite2 = req.session.data['sample-disposal-site-2-selected'];
    
    // Update completion status based on all sites
    const site1Complete = materialTypeComplete && disposalMethodComplete && maximumVolumeComplete && beneficialUseComplete;
    const site2Complete = site2MaterialTypeComplete && site2DisposalMethodComplete;
    const allSitesComplete = site1Complete && (!hasSite2 || site2Complete);
    
    // Only set overall completion status if journey type is NOT 'both'
    // (sub-task list page handles combined status for 'both')
    if (req.session.data['disposal-site-journey-type'] !== 'both') {
      if (allSitesComplete) {
        req.session.data['sample-disposal-sites-completed'] = true;
        req.session.data['sample-disposal-sites-in-progress'] = false;
      } else {
        req.session.data['sample-disposal-sites-in-progress'] = true;
        req.session.data['sample-disposal-sites-completed'] = false;
      }
    }
    
    // Redirect based on journey type
    if (req.session.data['disposal-site-journey-type'] === 'both') {
      res.redirect('disposal-sites-and-details');
    } else {
      res.redirect('../sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Disposal details site 1 page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/disposal-details-site-1`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-details-site-1-errorthispage'] = "false";
    req.session.data['sample-disposal-details-site-1-material-type-error'] = "";
    req.session.data['sample-disposal-details-site-1-method-error'] = "";
    req.session.data['sample-disposal-details-site-1-method-other-error'] = "";
    req.session.data['sample-disposal-details-site-1-material-type-other-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/disposal-details-site-1`);
  });

  // Disposal details site 1 router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/sample-disposal-details-site-1-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-details-site-1-errorthispage'] = "false";
    req.session.data['sample-disposal-details-site-1-material-type-error'] = "";
    req.session.data['sample-disposal-details-site-1-method-error'] = "";
    req.session.data['sample-disposal-details-site-1-method-other-error'] = "";
    req.session.data['sample-disposal-details-site-1-material-type-other-error'] = "";

    let hasErrors = false;

    // Validate material type selection
    if (!req.session.data['sample-disposal-details-site-1-material-type'] || req.session.data['sample-disposal-details-site-1-material-type'].length === 0) {
      req.session.data['sample-disposal-details-site-1-material-type-error'] = "Select what type of material will be disposed at this site";
      hasErrors = true;
    } else if (req.session.data['sample-disposal-details-site-1-material-type'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['sample-disposal-details-site-1-material-type-other'] || req.session.data['sample-disposal-details-site-1-material-type-other'].trim() === '') {
        req.session.data['sample-disposal-details-site-1-material-type-other-error'] = "Describe the other material type";
        hasErrors = true;
      }
    }

    // Validate disposal method selection
    if (!req.session.data['sample-disposal-details-site-1-method'] || req.session.data['sample-disposal-details-site-1-method'].length === 0) {
      req.session.data['sample-disposal-details-site-1-method-error'] = "Select what the proposed method of disposal is";
      hasErrors = true;
    } else if (req.session.data['sample-disposal-details-site-1-method'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['sample-disposal-details-site-1-method-other'] || req.session.data['sample-disposal-details-site-1-method-other'].trim() === '') {
        req.session.data['sample-disposal-details-site-1-method-other-error'] = "Describe the other method";
        hasErrors = true;
      }
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-details-site-1-errorthispage'] = "true";
      return res.redirect('disposal-details-site-1');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-material-type-completed'] = true;
    req.session.data['sample-disposal-site-disposal-method-completed'] = true;
    res.redirect('review-disposal-site-details#disposal-site-1-details');
  });

  ///////////////////////////////////////////
  // Maximum disposal volume page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/maximum-disposal-volume`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-site-1-maximum-volume-errorthispage'] = "false";
    req.session.data['sample-disposal-site-1-total-volume-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/maximum-disposal-volume`);
  });

  // Maximum disposal volume router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/maximum-disposal-volume-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-site-1-maximum-volume-errorthispage'] = "false";
    req.session.data['sample-disposal-site-1-total-volume-error'] = "";

    let hasErrors = false;

    // Validate total volume (mandatory)
    if (!req.body['sample-disposal-site-1-total-volume'] || req.body['sample-disposal-site-1-total-volume'].trim() === '') {
      req.session.data['sample-disposal-site-1-total-volume-error'] = "Enter the total volume, in cubic metres, over the full licence period";
      hasErrors = true;
    } else {
      req.session.data['sample-disposal-site-1-total-volume'] = req.body['sample-disposal-site-1-total-volume'];
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-site-1-maximum-volume-errorthispage'] = "true";
      return res.redirect('maximum-disposal-volume');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-1-maximum-volume-completed'] = true;
    res.redirect('review-disposal-site-details#disposal-site-1-details');
  });

  ///////////////////////////////////////////
  // Beneficial use page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/beneficial-use`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-site-1-beneficial-use-errorthispage'] = "false";
    req.session.data['sample-disposal-site-1-beneficial-use-error'] = "";
    req.session.data['sample-disposal-site-1-beneficial-use-description-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/beneficial-use`);
  });

  // Beneficial use router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/beneficial-use-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-site-1-beneficial-use-errorthispage'] = "false";
    req.session.data['sample-disposal-site-1-beneficial-use-error'] = "";
    req.session.data['sample-disposal-site-1-beneficial-use-description-error'] = "";

    let hasErrors = false;

    // Validate beneficial use selection (mandatory)
    if (!req.body['sample-disposal-site-1-beneficial-use']) {
      req.session.data['sample-disposal-site-1-beneficial-use-error'] = "Select if the material being disposed of is for beneficial use";
      hasErrors = true;
    } else {
      req.session.data['sample-disposal-site-1-beneficial-use'] = req.body['sample-disposal-site-1-beneficial-use'];
      
      // If "yes" is selected, validate the description
      if (req.body['sample-disposal-site-1-beneficial-use'] === 'yes') {
        if (!req.body['sample-disposal-site-1-beneficial-use-description'] || req.body['sample-disposal-site-1-beneficial-use-description'].trim() === '') {
          req.session.data['sample-disposal-site-1-beneficial-use-description-error'] = "Enter a description of the proposed beneficial use";
          hasErrors = true;
        } else {
          req.session.data['sample-disposal-site-1-beneficial-use-description'] = req.body['sample-disposal-site-1-beneficial-use-description'];
        }
      }
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-site-1-beneficial-use-errorthispage'] = "true";
      return res.redirect('beneficial-use');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-1-beneficial-use-completed'] = true;
    res.redirect('review-disposal-site-details#disposal-site-1-details');
  });

  ///////////////////////////////////////////
  // Disposal details site 2 page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/disposal-details-site-2`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-details-site-2-errorthispage'] = "false";
    req.session.data['sample-disposal-details-site-2-material-type-error'] = "";
    req.session.data['sample-disposal-details-site-2-method-error'] = "";
    req.session.data['sample-disposal-details-site-2-method-other-error'] = "";
    req.session.data['sample-disposal-details-site-2-material-type-other-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/disposal-details-site-2`);
  });

  // Disposal details site 2 router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/sample-disposal-details-site-2-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-details-site-2-errorthispage'] = "false";
    req.session.data['sample-disposal-details-site-2-material-type-error'] = "";
    req.session.data['sample-disposal-details-site-2-method-error'] = "";
    req.session.data['sample-disposal-details-site-2-method-other-error'] = "";
    req.session.data['sample-disposal-details-site-2-material-type-other-error'] = "";

    let hasErrors = false;

    // Validate material type selection
    if (!req.session.data['sample-disposal-details-site-2-material-type'] || req.session.data['sample-disposal-details-site-2-material-type'].length === 0) {
      req.session.data['sample-disposal-details-site-2-material-type-error'] = "Select the type of material that will be disposed at this site";
      hasErrors = true;
    } else if (req.session.data['sample-disposal-details-site-2-material-type'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['sample-disposal-details-site-2-material-type-other'] || req.session.data['sample-disposal-details-site-2-material-type-other'].trim() === '') {
        req.session.data['sample-disposal-details-site-2-material-type-other-error'] = "Describe the other material type";
        hasErrors = true;
      }
    }

    // Validate disposal method selection
    if (!req.session.data['sample-disposal-details-site-2-method'] || req.session.data['sample-disposal-details-site-2-method'].length === 0) {
      req.session.data['sample-disposal-details-site-2-method-error'] = "Select the proposed method of disposal";
      hasErrors = true;
    } else if (req.session.data['sample-disposal-details-site-2-method'].includes('other')) {
      // Check if "Other" is selected but no description provided
      if (!req.session.data['sample-disposal-details-site-2-method-other'] || req.session.data['sample-disposal-details-site-2-method-other'].trim() === '') {
        req.session.data['sample-disposal-details-site-2-method-other-error'] = "Describe the other method";
        hasErrors = true;
      }
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-details-site-2-errorthispage'] = "true";
      return res.redirect('disposal-details-site-2');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-2-material-type-completed'] = true;
    req.session.data['sample-disposal-site-2-disposal-method-completed'] = true;
    res.redirect('review-disposal-site-details#disposal-site-2-details');
  });

  ///////////////////////////////////////////
  // Maximum disposal volume site 2 page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/maximum-disposal-volume-site-2`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-site-2-maximum-volume-errorthispage'] = "false";
    req.session.data['sample-disposal-site-2-total-volume-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/maximum-disposal-volume-site-2`);
  });

  // Maximum disposal volume site 2 router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/maximum-disposal-volume-site-2-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-site-2-maximum-volume-errorthispage'] = "false";
    req.session.data['sample-disposal-site-2-total-volume-error'] = "";

    let hasErrors = false;

    // Validate total volume (mandatory)
    if (!req.body['sample-disposal-site-2-total-volume'] || req.body['sample-disposal-site-2-total-volume'].trim() === '') {
      req.session.data['sample-disposal-site-2-total-volume-error'] = "Enter the total volume, in cubic metres, over the full licence period";
      hasErrors = true;
    } else {
      req.session.data['sample-disposal-site-2-total-volume'] = req.body['sample-disposal-site-2-total-volume'];
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-site-2-maximum-volume-errorthispage'] = "true";
      return res.redirect('maximum-disposal-volume-site-2');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-2-maximum-volume-completed'] = true;
    res.redirect('review-disposal-site-details#disposal-site-2-details');
  });

  ///////////////////////////////////////////
  // Beneficial use site 2 page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/beneficial-use-site-2`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-site-2-beneficial-use-errorthispage'] = "false";
    req.session.data['sample-disposal-site-2-beneficial-use-error'] = "";
    req.session.data['sample-disposal-site-2-beneficial-use-description-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/beneficial-use-site-2`);
  });

  // Beneficial use site 2 router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/beneficial-use-site-2-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-site-2-beneficial-use-errorthispage'] = "false";
    req.session.data['sample-disposal-site-2-beneficial-use-error'] = "";
    req.session.data['sample-disposal-site-2-beneficial-use-description-error'] = "";

    let hasErrors = false;

    // Validate beneficial use selection (mandatory)
    if (!req.body['sample-disposal-site-2-beneficial-use']) {
      req.session.data['sample-disposal-site-2-beneficial-use-error'] = "Select if the material being disposed of is for beneficial use";
      hasErrors = true;
    } else {
      req.session.data['sample-disposal-site-2-beneficial-use'] = req.body['sample-disposal-site-2-beneficial-use'];
      
      // If "yes" is selected, validate the description
      if (req.body['sample-disposal-site-2-beneficial-use'] === 'yes') {
        if (!req.body['sample-disposal-site-2-beneficial-use-description'] || req.body['sample-disposal-site-2-beneficial-use-description'].trim() === '') {
          req.session.data['sample-disposal-site-2-beneficial-use-description-error'] = "Enter a description of the proposed beneficial use";
          hasErrors = true;
        } else {
          req.session.data['sample-disposal-site-2-beneficial-use-description'] = req.body['sample-disposal-site-2-beneficial-use-description'];
        }
      }
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-site-2-beneficial-use-errorthispage'] = "true";
      return res.redirect('beneficial-use-site-2');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-2-beneficial-use-completed'] = true;
    res.redirect('review-disposal-site-details#disposal-site-2-details');
  });

  ///////////////////////////////////////////
  // Delete all disposal sites page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/delete-all-disposal-sites`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/delete-all-disposal-sites`);
  });

  // Delete all disposal sites router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/delete-all-disposal-sites-router`, function (req, res) {
    // Clear ALL existing disposal site data
    clearSite1CompletionFlags(req.session);
    clearSite2CompletionFlags(req.session);
    
    // Clear site selection flags
    req.session.data['sample-disposal-site-selected'] = false;
    req.session.data['sample-disposal-site-2-selected'] = false;
    
    // Clear site location data
    delete req.session.data['selected-disposal-site-code'];
    delete req.session.data['selected-disposal-site-name'];
    delete req.session.data['selected-disposal-site-country'];
    delete req.session.data['selected-disposal-site-sea-area'];
    delete req.session.data['selected-disposal-site-status'];
    delete req.session.data['selected-disposal-site-2-code'];
    delete req.session.data['selected-disposal-site-2-name'];
    delete req.session.data['selected-disposal-site-2-country'];
    delete req.session.data['selected-disposal-site-2-sea-area'];
    delete req.session.data['selected-disposal-site-2-status'];
    
    // Clear ALL new disposal site data
    // File upload journey data
    delete req.session.data['new-disposal-site-location-method'];
    delete req.session.data['new-disposal-file-type'];
    
    // Manual entry journey data - Site 1
    delete req.session.data['new-disposal-site-1-name'];
    delete req.session.data['new-disposal-site-1-coordinate-entry-method'];
    delete req.session.data['new-disposal-site-1-coordinate-system'];
    delete req.session.data['new-disposal-site-1-centre-latitude'];
    delete req.session.data['new-disposal-site-1-centre-longitude'];
    delete req.session.data['new-disposal-site-1-width'];
    for (let i = 1; i <= 5; i++) {
      delete req.session.data[`new-disposal-site-1-point-${i}-latitude`];
      delete req.session.data[`new-disposal-site-1-point-${i}-longitude`];
    }
    
    // Manual entry journey data - Site 2
    delete req.session.data['new-disposal-site-2-name'];
    delete req.session.data['new-disposal-site-2-coordinate-entry-method'];
    delete req.session.data['new-disposal-site-2-coordinate-system'];
    delete req.session.data['new-disposal-site-2-centre-latitude'];
    delete req.session.data['new-disposal-site-2-centre-longitude'];
    delete req.session.data['new-disposal-site-2-width'];
    for (let i = 1; i <= 5; i++) {
      delete req.session.data[`new-disposal-site-2-point-${i}-latitude`];
      delete req.session.data[`new-disposal-site-2-point-${i}-longitude`];
    }
    
    // Manual entry count
    delete req.session.data['disposal-site-manual-entry-count'];
    delete req.session.data['has-visited-manual-disposal-site-locations'];
    
    // Site 1 disposal details
    delete req.session.data['new-disposal-details-site-1-completed'];
    delete req.session.data['new-disposal-details-site-1-material-type'];
    delete req.session.data['new-disposal-details-site-1-material-type-other'];
    delete req.session.data['new-disposal-details-site-1-method'];
    delete req.session.data['new-disposal-details-site-1-method-other'];
    delete req.session.data['new-disposal-maximum-volume-completed'];
    delete req.session.data['new-disposal-site-1-total-volume'];
    delete req.session.data['new-disposal-beneficial-use-completed'];
    delete req.session.data['new-disposal-site-1-beneficial-use'];
    delete req.session.data['new-disposal-site-1-beneficial-use-description'];
    
    // Site 2 disposal details
    delete req.session.data['new-disposal-details-site-2-material-type'];
    delete req.session.data['new-disposal-details-site-2-material-type-other'];
    delete req.session.data['new-disposal-details-site-2-method'];
    delete req.session.data['new-disposal-details-site-2-method-other'];
    delete req.session.data['new-disposal-site-2-total-volume'];
    delete req.session.data['new-disposal-site-2-beneficial-use'];
    delete req.session.data['new-disposal-site-2-beneficial-use-description'];
    
    // Overall completion flags
    delete req.session.data['has-visited-new-disposal-site-locations'];
    delete req.session.data['has-visited-disposal-site-review'];
    delete req.session.data['new-disposal-sites-all-complete'];
    
    // Clear journey type and where dispose material selection
    delete req.session.data['disposal-site-journey-type'];
    delete req.session.data['sample-plan-where-dispose-material'];
    
    // Reset the sample disposal sites status
    req.session.data['sample-disposal-sites-completed'] = false;
    req.session.data['sample-disposal-sites-in-progress'] = false;
    
    // Redirect to sample plan start page (task list)
    res.redirect('../sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Delete site page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/delete-site`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    res.render(`versions/${version}/${section}/${subSection}/delete-site`);
  });

  // Delete site router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/delete-site-router`, function (req, res) {
    // Get the site number from the form (1 or 2)
    const siteNumber = parseInt(req.body.site) || 1;
    const hasSite2 = req.session.data['sample-disposal-site-2-selected'];
    
    if (siteNumber === 2) {
      // Deleting Site 2 - simply clear Site 2 data
      clearSite2CompletionFlags(req.session);
      req.session.data['sample-disposal-site-2-selected'] = false;
      
      // Clear Site 2 location data
      delete req.session.data['selected-disposal-site-2-code'];
      delete req.session.data['selected-disposal-site-2-name'];
      delete req.session.data['selected-disposal-site-2-country'];
      delete req.session.data['selected-disposal-site-2-sea-area'];
      delete req.session.data['selected-disposal-site-2-status'];
      
      // Redirect back to review page
      res.redirect('review-disposal-site-details');
    } else if (siteNumber === 1 && hasSite2) {
      // Deleting Site 1 when Site 2 exists - move Site 2 data to Site 1
      
      // Move Site 2 location data to Site 1
      req.session.data['selected-disposal-site-code'] = req.session.data['selected-disposal-site-2-code'];
      req.session.data['selected-disposal-site-name'] = req.session.data['selected-disposal-site-2-name'];
      req.session.data['selected-disposal-site-country'] = req.session.data['selected-disposal-site-2-country'];
      req.session.data['selected-disposal-site-sea-area'] = req.session.data['selected-disposal-site-2-sea-area'];
      req.session.data['selected-disposal-site-status'] = req.session.data['selected-disposal-site-2-status'];
      
      // Move Site 2 disposal details to Site 1
      req.session.data['sample-disposal-details-site-1-material-type'] = req.session.data['sample-disposal-details-site-2-material-type'];
      req.session.data['sample-disposal-details-site-1-material-type-other'] = req.session.data['sample-disposal-details-site-2-material-type-other'];
      req.session.data['sample-disposal-details-site-1-method'] = req.session.data['sample-disposal-details-site-2-method'];
      req.session.data['sample-disposal-details-site-1-method-other'] = req.session.data['sample-disposal-details-site-2-method-other'];
      
      // Move Site 2 volume data to Site 1
      req.session.data['sample-disposal-site-1-total-volume'] = req.session.data['sample-disposal-site-2-total-volume'];
      
      // Move Site 2 beneficial use data to Site 1
      req.session.data['sample-disposal-site-1-beneficial-use'] = req.session.data['sample-disposal-site-2-beneficial-use'];
      req.session.data['sample-disposal-site-1-beneficial-use-description'] = req.session.data['sample-disposal-site-2-beneficial-use-description'];
      
      // Move Site 2 completion flags to Site 1
      req.session.data['sample-disposal-site-material-type-completed'] = req.session.data['sample-disposal-site-2-material-type-completed'];
      req.session.data['sample-disposal-site-disposal-method-completed'] = req.session.data['sample-disposal-site-2-disposal-method-completed'];
      req.session.data['sample-disposal-site-1-maximum-volume-completed'] = req.session.data['sample-disposal-site-2-maximum-volume-completed'];
      req.session.data['sample-disposal-site-1-beneficial-use-completed'] = req.session.data['sample-disposal-site-2-beneficial-use-completed'];
      
      // Clear Site 2 data
      clearSite2CompletionFlags(req.session);
      req.session.data['sample-disposal-site-2-selected'] = false;
      delete req.session.data['selected-disposal-site-2-code'];
      delete req.session.data['selected-disposal-site-2-name'];
      delete req.session.data['selected-disposal-site-2-country'];
      delete req.session.data['selected-disposal-site-2-sea-area'];
      delete req.session.data['selected-disposal-site-2-status'];
      
      // Redirect back to review page
      res.redirect('review-disposal-site-details');
    } else {
      // Deleting the only site (Site 1) - clear all data and return to appropriate page
      clearSite1CompletionFlags(req.session);
      clearSite2CompletionFlags(req.session);
      
      // Clear all site selection flags
      req.session.data['sample-disposal-site-selected'] = false;
      req.session.data['sample-disposal-site-2-selected'] = false;
      
      // Clear Site 1 location data
      delete req.session.data['selected-disposal-site-code'];
      delete req.session.data['selected-disposal-site-name'];
      delete req.session.data['selected-disposal-site-country'];
      delete req.session.data['selected-disposal-site-sea-area'];
      delete req.session.data['selected-disposal-site-status'];
      
      // Clear Site 2 location data
      delete req.session.data['selected-disposal-site-2-code'];
      delete req.session.data['selected-disposal-site-2-name'];
      delete req.session.data['selected-disposal-site-2-country'];
      delete req.session.data['selected-disposal-site-2-sea-area'];
      delete req.session.data['selected-disposal-site-2-status'];
      
      // Reset task status
      req.session.data['sample-disposal-sites-completed'] = false;
      req.session.data['sample-disposal-sites-in-progress'] = false;
      req.session.data['has-visited-disposal-site-review'] = false;
      
      // Redirect based on journey type
      if (req.session.data['disposal-site-journey-type'] === 'both') {
        // User selected both - redirect to sub-task list
        // Clear journey type since we're deleting existing sites only
        delete req.session.data['disposal-site-journey-type'];
        res.redirect('disposal-sites-and-details');
      } else {
        // Clear journey type to allow switching
        delete req.session.data['disposal-site-journey-type'];
        // Clear where dispose material selection
        delete req.session.data['sample-plan-where-dispose-material'];
        // Redirect to task list
        res.redirect('../sample-plan-start-page');
      }
    }
  });

};
