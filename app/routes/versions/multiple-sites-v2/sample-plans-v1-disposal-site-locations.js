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
    
    // Store selected site data from URL parameters
    if (req.query.code) {
      req.session.data['selected-disposal-site-code'] = req.query.code;
    }
    if (req.query.name) {
      req.session.data['selected-disposal-site-name'] = req.query.name;
    }
    if (req.query.country) {
      req.session.data['selected-disposal-site-country'] = req.query.country;
    }
    if (req.query.seaArea) {
      req.session.data['selected-disposal-site-sea-area'] = req.query.seaArea;
    }
    if (req.query.status) {
      req.session.data['selected-disposal-site-status'] = req.query.status;
    }
    
    res.render(`versions/${version}/${section}/${subSection}/review-disposal-site-details`);
  });

};
