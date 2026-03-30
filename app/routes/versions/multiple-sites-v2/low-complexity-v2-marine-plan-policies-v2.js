module.exports = function (router) {
  // Low complexity v2 marine plan policies v2 routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";
  const subsection = "marine-plan-policies-v2";

  // Must match low-complexity-v2.js MARINE_PLAN_POLICIES_TOTAL for redirect counts
  const MARINE_PLAN_POLICIES_TOTAL = 37;

  /////////////////////////////////////////////////////////
  //////// Marine plan policies v2 index page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const completedFromQuery = req.query['marine-plan-policies-v2-completed-count'];
    if (completedFromQuery !== undefined) {
      const completed = parseInt(completedFromQuery, 10);
      const notStarted = parseInt(req.query['marine-plan-policies-v2-not-started-count'], 10) || (MARINE_PLAN_POLICIES_TOTAL - completed);
      req.session.data['marine-plan-policies-v2-completed-count'] = completed;
      req.session.data['marine-plan-policies-v2-not-started-count'] = notStarted;
      res.locals.data['marine-plan-policies-v2-completed-count'] = completed;
      res.locals.data['marine-plan-policies-v2-not-started-count'] = notStarted;
    }
    res.render(`versions/${version}/${section}/${subsection}/index`);
  });

  /////////////////////////////////////////////////////////
  //////// Marine plan policy v2 guidance page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/guidance`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/guidance`);
  });

  /////////////////////////////////////////////////////////
  // Helper: create GET + POST routes for a textarea-only policy page
  /////////////////////////////////////////////////////////
  function addPolicyRoute(pageName, sessionKey) {
    router.get(`/versions/${version}/${section}/${subsection}/${pageName}`, function (req, res) {
      req.session.data['errorthispage'] = "false";
      req.session.data['errortypeone'] = "false";
      res.render(`versions/${version}/${section}/${subsection}/${pageName}`);
    });

    router.post(`/versions/${version}/${section}/${subsection}/${pageName}-router`, function (req, res) {
      req.session.data['errorthispage'] = "false";
      req.session.data['errortypeone'] = "false";

      const value = req.session.data[`marine-plan-policy-v2-${sessionKey}-text`];

      if (!value || value.trim() === '') {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect(pageName);
      }

      req.session.data[`marine-plan-policy-v2-${sessionKey}-completed`] = true;
      const completedCount = (req.session.data['marine-plan-policies-v2-completed-count'] || 0) + 1;
      const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
      const redirectUrl = './?marine-plan-policies-v2-completed-count=' + completedCount + '&marine-plan-policies-v2-not-started-count=' + notStartedCount;
      res.redirect(redirectUrl);
    });
  }

  /////////////////////////////////////////////////////////
  //////// Policy question pages
  /////////////////////////////////////////////////////////
  addPolicyRoute('south-access-1', 's-acc-1');
  addPolicyRoute('south-biodiversity-1', 's-bio-1');
  addPolicyRoute('south-aggregates-4', 's-agg-4');
  addPolicyRoute('south-employment-1', 's-emp-1');
  addPolicyRoute('south-underwater-noise-2', 's-uwn-2');

};
