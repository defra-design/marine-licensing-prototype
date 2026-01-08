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
    // Add routing logic here as needed
    // For now, redirect to a placeholder
    res.redirect('next-page');
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
  // Add additional routes below
  ///////////////////////////////////////////

}
