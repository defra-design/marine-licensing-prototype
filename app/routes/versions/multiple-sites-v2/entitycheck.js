module.exports = function (router) {
  // Entity check routes
  const version = "multiple-sites-v2";
  const section = "entitycheck";

  ///////////////////////////////////////////
  // You need to provide more information page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/you-need-to-provide-more-information`, function (req, res) {
    res.render(`versions/${version}/${section}/you-need-to-provide-more-information`);
  });

  // Continue router (POST)
  router.post(`/versions/${version}/${section}/continue-router`, function (req, res) {
    res.redirect('who-is-this-exemption-notification-for');
  });

  ///////////////////////////////////////////
  // Guidance pages
  ///////////////////////////////////////////

  // Creating a Defra account
  router.get(`/versions/${version}/${section}/creating-a-defra-account`, function (req, res) {
    res.render(`versions/${version}/${section}/creating-a-defra-account`);
  });

  // Adding users to a Defra account as an admin
  router.get(`/versions/${version}/${section}/adding-users-to-a-defra-account-as-an-admin`, function (req, res) {
    res.render(`versions/${version}/${section}/adding-users-to-a-defra-account-as-an-admin`);
  });

  ///////////////////////////////////////////
  // Who is this exemption notification for?
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/who-is-this-exemption-notification-for`, function (req, res) {
    // Clear error flags on page load
    req.session.data['entity-check-who-is-for-errorthispage'] = "false";
    res.render(`versions/${version}/${section}/who-is-this-exemption-notification-for`);
  });

  router.post(`/versions/${version}/${section}/who-is-this-exemption-notification-for-router`, function (req, res) {
    // Clear error flags at start of POST
    req.session.data['entity-check-who-is-for-errorthispage'] = "false";
    
    const whoIsFor = req.session.data['entity-check-who-is-for'];
    
    // Validate selection
    if (!whoIsFor) {
      req.session.data['entity-check-who-is-for-errorthispage'] = "true";
      res.redirect('who-is-this-exemption-notification-for');
      return;
    }
    
    // Branch based on selection
    if (whoIsFor === 'myself') {
      res.redirect('sign-in');
    } else if (whoIsFor === 'business') {
      res.redirect('creating-a-defra-account-as-employee');
    } else if (whoIsFor === 'client') {
      res.redirect('creating-a-defra-account-as-agent');
    }
  });

  ///////////////////////////////////////////
  // Creating a Defra account pages
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/creating-a-defra-account-as-employee`, function (req, res) {
    res.render(`versions/${version}/${section}/creating-a-defra-account-as-employee`);
  });

  router.get(`/versions/${version}/${section}/creating-a-defra-account-as-agent`, function (req, res) {
    res.render(`versions/${version}/${section}/creating-a-defra-account-as-agent`);
  });

  ///////////////////////////////////////////
  // Sign in page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/sign-in`, function (req, res) {
    res.render(`versions/${version}/${section}/sign-in`);
  });

  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {
    // Handle sign-in submission
    // For now, redirect to a placeholder
    res.redirect('signed-in-placeholder');
  });

}
