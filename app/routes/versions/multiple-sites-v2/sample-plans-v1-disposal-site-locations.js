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
    
    // Clear all search filter data when navigating to search page
    req.session.data['disposal-site-code'] = '';
    req.session.data['disposal-site-name'] = '';
    req.session.data['disposal-site-location'] = '';
    req.session.data['marine-area'] = '';
    req.session.data['disposal-site-status'] = '';
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
      res.redirect('find-existing-disposal-site');
    } else if (disposalSelection === 'New disposal site') {
      // TODO: Create and redirect to new disposal site page
      res.redirect('../sample-plan-start-page');
    } else {
      // Fallback
      res.redirect('../sample-plan-start-page');
    }
  });

};
