module.exports = function (router) {
  // Sample plans v1 dredging site locations routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v1";
  const subsection = "dredging-site-locations";

  // Before you start page
  router.get(`/versions/${version}/${section}/${subsection}/before-you-start`, function (req, res) {
    req.session.data['isSamplePlansSection'] = true;
    res.render(`versions/${version}/${section}/${subsection}/before-you-start`);
  });

  // Before you start router (POST)
  router.post(`/versions/${version}/${section}/${subsection}/before-you-start-router`, function (req, res) {
    // For now, redirect back to the page since no destination is specified
    res.redirect('before-you-start');
  });

};
