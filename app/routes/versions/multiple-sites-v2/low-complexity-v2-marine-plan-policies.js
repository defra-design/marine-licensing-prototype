module.exports = function (router) {
  // Low complexity v2 marine plan policies routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";
  const subsection = "marine-plan-policies";

  // Must match low-complexity-v2.js MARINE_PLAN_POLICIES_TOTAL for redirect counts
  const MARINE_PLAN_POLICIES_TOTAL = 37;

  /////////////////////////////////////////////////////////
  //////// Marine plan policies index page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    // After saving a policy we redirect with counts in query so index shows correct numbers
    // before session file has been written (avoids race with file store)
    const completedFromQuery = req.query['marine-plan-policies-completed-count'];
    if (completedFromQuery !== undefined) {
      const completed = parseInt(completedFromQuery, 10);
      const notStarted = parseInt(req.query['marine-plan-policies-not-started-count'], 10) || (MARINE_PLAN_POLICIES_TOTAL - completed);
      req.session.data['marine-plan-policies-completed-count'] = completed;
      req.session.data['marine-plan-policies-not-started-count'] = notStarted;
      res.locals.data['marine-plan-policies-completed-count'] = completed;
      res.locals.data['marine-plan-policies-not-started-count'] = notStarted;
    }
    res.render(`versions/${version}/${section}/${subsection}/index`);
  });

  /////////////////////////////////////////////////////////
  //////// Marine plan policy guidance page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/guidance`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/guidance`);
  });

  /////////////////////////////////////////////////////////
  //////// South Access 1 (S-ACC-1) policy question page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/south-access-1`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/south-access-1`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-access-1-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";

    const how = req.session.data['marine-plan-policy-s-acc-1-how'];
    const avoid = req.session.data['marine-plan-policy-s-acc-1-avoid'];
    const minimise = req.session.data['marine-plan-policy-s-acc-1-minimise'];
    const mitigate = req.session.data['marine-plan-policy-s-acc-1-mitigate'];

    if (!how) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      return res.redirect('south-access-1');
    }

    const textareaEmpty = (how === 'avoid' && (!avoid || avoid.trim() === '')) ||
      (how === 'minimise' && (!minimise || minimise.trim() === '')) ||
      (how === 'mitigate' && (!mitigate || mitigate.trim() === ''));

    if (textareaEmpty) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      return res.redirect('south-access-1');
    }

    req.session.data['marine-plan-policy-s-acc-1-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

};
