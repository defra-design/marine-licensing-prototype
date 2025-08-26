module.exports = function (router) {
  // Sample plans v1 disposal site locations routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v1";
  const subSection = "disposal-site-locations";

  ///////////////////////////////////////////
  // Find existing disposal site page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/find-existing-disposal-site`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
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
    req.session.data['isSamplePlansSection'] = true;
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
  // Where dispose of material page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/where-dispose-of-material`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['sample-plan-errorthispage'] = "false";
    req.session.data['sample-plan-errortypeone'] = "false";
    req.session.data['isSamplePlansSection'] = true;
    
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
      res.redirect('../sample-plan-start-page');
    } else {
      // Fallback
      res.redirect('../sample-plan-start-page');
    }
  });

  ///////////////////////////////////////////
  // Review disposal site details page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/review-disposal-site-details`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // If URL parameters are provided (coming from site selection), store them and redirect
    if (req.query.code || req.query.name || req.query.country || req.query.seaArea || req.query.status) {
      // Store selected site data from URL parameters
      req.session.data['selected-disposal-site-code'] = req.query.code;
      req.session.data['selected-disposal-site-name'] = req.query.name;
      req.session.data['selected-disposal-site-country'] = req.query.country;
      req.session.data['selected-disposal-site-sea-area'] = req.query.seaArea;
      req.session.data['selected-disposal-site-status'] = req.query.status;
      
      // Mark this as the selected disposal site for this session
      req.session.data['disposal-site-selected'] = true;
      
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
    // For now, we'll assume incomplete since material type and disposal method sections aren't implemented yet
    const materialTypeComplete = req.session.data['disposal-site-material-type-completed'];
    const disposalMethodComplete = req.session.data['disposal-site-disposal-method-completed'];
    
    if (materialTypeComplete && disposalMethodComplete) {
      req.session.data['disposal-sites-completed'] = true;
    } else {
      req.session.data['disposal-sites-in-progress'] = true;
    }
    
    // Redirect back to task list
    res.redirect('../sample-plan-start-page');
  });

  ///////////////////////////////////////////
  // Disposal details site 1 page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/disposal-details-site-1`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data['disposal-details-site-1-errorthispage'] = "false";
    req.session.data['disposal-details-site-1-material-type-error'] = "";
    req.session.data['disposal-details-site-1-method-error'] = "";
    req.session.data['disposal-details-site-1-method-other-error'] = "";
    req.session.data['disposal-details-site-1-material-type-other-error'] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/disposal-details-site-1`);
  });

  // Disposal details site 1 router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/disposal-details-site-1-router`, function (req, res) {
    // Reset error flags
    req.session.data['disposal-details-site-1-errorthispage'] = "false";
    req.session.data['disposal-details-site-1-material-type-error'] = "";
    req.session.data['disposal-details-site-1-method-error'] = "";
    req.session.data['disposal-details-site-1-method-other-error'] = "";
    req.session.data['disposal-details-site-1-material-type-other-error'] = "";

    let hasErrors = false;

    // Validate material type selection
    if (!req.body['disposal-details-site-1-material-type'] || req.body['disposal-details-site-1-material-type'].length === 0) {
      req.session.data['disposal-details-site-1-material-type-error'] = "Select the type of material that will be disposed at this site";
      hasErrors = true;
    } else {
      // Save the material type selection
      req.session.data['disposal-details-site-1-material-type'] = req.body['disposal-details-site-1-material-type'];
      
      // If "other" is selected, validate the other field
      if (req.body['disposal-details-site-1-material-type'].includes('other')) {
        if (!req.body['disposal-details-site-1-material-type-other'] || req.body['disposal-details-site-1-material-type-other'].trim() === '') {
          req.session.data['disposal-details-site-1-material-type-other-error'] = "Describe the other material type";
          hasErrors = true;
        } else {
          req.session.data['disposal-details-site-1-material-type-other'] = req.body['disposal-details-site-1-material-type-other'];
        }
      }
    }

    // Validate disposal method selection
    if (!req.body['disposal-details-site-1-method'] || req.body['disposal-details-site-1-method'].length === 0) {
      req.session.data['disposal-details-site-1-method-error'] = "Select the proposed method of disposal";
      hasErrors = true;
    } else {
      // Save the method selection
      req.session.data['disposal-details-site-1-method'] = req.body['disposal-details-site-1-method'];
      
      // If "other" is selected, validate the other field
      if (req.body['disposal-details-site-1-method'].includes('other')) {
        if (!req.body['disposal-details-site-1-method-other'] || req.body['disposal-details-site-1-method-other'].trim() === '') {
          req.session.data['disposal-details-site-1-method-other-error'] = "Describe the other method";
          hasErrors = true;
        } else {
          req.session.data['disposal-details-site-1-method-other'] = req.body['disposal-details-site-1-method-other'];
        }
      }
    }

    // If there are errors, redirect back to the form
    if (hasErrors) {
      req.session.data['disposal-details-site-1-errorthispage'] = "true";
      return res.redirect('disposal-details-site-1');
    }

    // Mark as completed and redirect back to review page
    req.session.data['disposal-site-material-type-completed'] = true;
    req.session.data['disposal-site-disposal-method-completed'] = true;
    res.redirect('review-disposal-site-details');
  });

};
