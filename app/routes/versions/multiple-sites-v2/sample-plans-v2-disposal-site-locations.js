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
    delete session.data['sample-disposal-site-1-annual-volume'];
    delete session.data['sample-disposal-site-1-volume-per-campaign'];
    delete session.data['sample-disposal-site-1-campaigns-per-year'];
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
    delete session.data['sample-disposal-site-1-annual-volume-error'];
    delete session.data['sample-disposal-site-1-volume-per-campaign-error'];
    delete session.data['sample-disposal-site-1-campaigns-per-year-error'];
    delete session.data['sample-disposal-site-1-beneficial-use-errorthispage'];
    delete session.data['sample-disposal-site-1-beneficial-use-error'];
    delete session.data['sample-disposal-site-1-beneficial-use-description-error'];
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
    if (disposalSelection === 'Existing disposal site') {
      res.redirect('find-existing-disposal-site?disposal-site-code=&disposal-site-name=&disposal-site-location=&marine-area=&disposal-site-status=');
    } else if (disposalSelection === 'New disposal site') {
      // TODO: Create and redirect to new disposal site page
      res.redirect('where-dispose-of-material');
    } else {
      // Fallback
      res.redirect('where-dispose-of-material');
    }
  });

  ///////////////////////////////////////////
  // Review disposal site details page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/review-disposal-site-details`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // If URL parameters are provided (coming from site selection), store them and redirect
    if (req.query.code || req.query.name || req.query.country || req.query.seaArea || req.query.status) {
      // Check if this is a site replacement (when site 1 already exists)
      const isReplacingSite = req.session.data['sample-disposal-site-selected'];
      
      // Clear Site 1 completion flags and data when replacing an existing site
      if (isReplacingSite) {
        clearSite1CompletionFlags(req.session);
      }
      
      // Always store as Site 1 (either new selection or replacement)
      req.session.data['selected-disposal-site-code'] = req.query.code;
      req.session.data['selected-disposal-site-name'] = req.query.name;
      req.session.data['selected-disposal-site-country'] = req.query.country;
      req.session.data['selected-disposal-site-sea-area'] = req.query.seaArea;
      req.session.data['selected-disposal-site-status'] = req.query.status;
      
      // Mark this as the selected disposal site for this session
      req.session.data['sample-disposal-site-selected'] = true;
      
      // Ensure Site 2 is not marked as selected (single site mode)
      req.session.data['sample-disposal-site-2-selected'] = false;
      
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
    
    if (allSitesComplete) {
      req.session.data['sample-disposal-sites-completed'] = true;
      req.session.data['sample-disposal-sites-in-progress'] = false;
    } else {
      req.session.data['sample-disposal-sites-in-progress'] = true;
      req.session.data['sample-disposal-sites-completed'] = false;
    }
    
    // Redirect back to task list
    res.redirect('../sample-plan-start-page');
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
    res.redirect('review-disposal-site-details');
  });

  ///////////////////////////////////////////
  // Maximum disposal volume page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/maximum-disposal-volume`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-disposal-site-1-maximum-volume-errorthispage'] = "false";
    req.session.data['sample-disposal-site-1-total-volume-error'] = "";
    req.session.data['sample-disposal-site-1-annual-volume-error'] = "";
    req.session.data['sample-disposal-site-1-volume-per-campaign-error'] = "";
    req.session.data['sample-disposal-site-1-campaigns-per-year-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/maximum-disposal-volume`);
  });

  // Maximum disposal volume router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/maximum-disposal-volume-router`, function (req, res) {
    // Reset error flags
    req.session.data['sample-disposal-site-1-maximum-volume-errorthispage'] = "false";
    req.session.data['sample-disposal-site-1-total-volume-error'] = "";
    req.session.data['sample-disposal-site-1-annual-volume-error'] = "";
    req.session.data['sample-disposal-site-1-volume-per-campaign-error'] = "";
    req.session.data['sample-disposal-site-1-campaigns-per-year-error'] = "";

    let hasErrors = false;

    // Validate total volume (mandatory)
    if (!req.body['sample-disposal-site-1-total-volume'] || req.body['sample-disposal-site-1-total-volume'].trim() === '') {
      req.session.data['sample-disposal-site-1-total-volume-error'] = "Enter the total volume over the full licence period";
      hasErrors = true;
    } else {
      req.session.data['sample-disposal-site-1-total-volume'] = req.body['sample-disposal-site-1-total-volume'];
    }

    // Save annual volume (optional)
    if (req.body['sample-disposal-site-1-annual-volume']) {
      req.session.data['sample-disposal-site-1-annual-volume'] = req.body['sample-disposal-site-1-annual-volume'];
    }

    // Handle disposal campaign fields - if either has a value, both are required
    const volumePerCampaign = req.body['sample-disposal-site-1-volume-per-campaign'];
    const campaignsPerYear = req.body['sample-disposal-site-1-campaigns-per-year'];
    
    if (volumePerCampaign || campaignsPerYear) {
      // If either field has a value, both are required
      if (!volumePerCampaign || volumePerCampaign.trim() === '') {
        req.session.data['sample-disposal-site-1-volume-per-campaign-error'] = "Enter the volume per campaign";
        hasErrors = true;
      } else {
        req.session.data['sample-disposal-site-1-volume-per-campaign'] = volumePerCampaign;
      }
      
      if (!campaignsPerYear || campaignsPerYear.trim() === '') {
        req.session.data['sample-disposal-site-1-campaigns-per-year-error'] = "Enter the number of campaigns per year";
        hasErrors = true;
      } else {
        req.session.data['sample-disposal-site-1-campaigns-per-year'] = campaignsPerYear;
      }
    } else {
      // Save values even if empty to clear previous entries
      req.session.data['sample-disposal-site-1-volume-per-campaign'] = volumePerCampaign || '';
      req.session.data['sample-disposal-site-1-campaigns-per-year'] = campaignsPerYear || '';
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['sample-disposal-site-1-maximum-volume-errorthispage'] = "true";
      return res.redirect('maximum-disposal-volume');
    }

    // Mark as completed and redirect back to review page
    req.session.data['sample-disposal-site-1-maximum-volume-completed'] = true;
    res.redirect('review-disposal-site-details');
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
    res.redirect('review-disposal-site-details');
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
    if (!req.body['sample-disposal-details-site-2-material-type'] || req.body['sample-disposal-details-site-2-material-type'].length === 0) {
      req.session.data['sample-disposal-details-site-2-material-type-error'] = "Select the type of material that will be disposed at this site";
      hasErrors = true;
    } else {
      // Save the material type selection
      req.session.data['sample-disposal-details-site-2-material-type'] = req.body['sample-disposal-details-site-2-material-type'];
      
      // If "other" is selected, validate the other field
      if (req.body['sample-disposal-details-site-2-material-type'].includes('other')) {
        if (!req.body['sample-disposal-details-site-2-material-type-other'] || req.body['sample-disposal-details-site-2-material-type-other'].trim() === '') {
          req.session.data['sample-disposal-details-site-2-material-type-other-error'] = "Describe the other material type";
          hasErrors = true;
        } else {
          req.session.data['sample-disposal-details-site-2-material-type-other'] = req.body['sample-disposal-details-site-2-material-type-other'];
        }
      }
    }

    // Validate disposal method selection
    if (!req.body['sample-disposal-details-site-2-method'] || req.body['sample-disposal-details-site-2-method'].length === 0) {
      req.session.data['sample-disposal-details-site-2-method-error'] = "Select the proposed method of disposal";
      hasErrors = true;
    } else {
      // Save the method selection
      req.session.data['sample-disposal-details-site-2-method'] = req.body['sample-disposal-details-site-2-method'];
      
      // If "other" is selected, validate the other field
      if (req.body['sample-disposal-details-site-2-method'].includes('other')) {
        if (!req.body['sample-disposal-details-site-2-method-other'] || req.body['sample-disposal-details-site-2-method-other'].trim() === '') {
          req.session.data['sample-disposal-details-site-2-method-other-error'] = "Describe the other method";
          hasErrors = true;
        } else {
          req.session.data['sample-disposal-details-site-2-method-other'] = req.body['sample-disposal-details-site-2-method-other'];
        }
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
    res.redirect('review-disposal-site-details');
  });

};
