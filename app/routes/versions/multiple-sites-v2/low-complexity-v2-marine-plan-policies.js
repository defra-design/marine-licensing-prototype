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
    req.session.data['marine-plan-policy-s-acc-1-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-acc-1-error-list'] = undefined;
    res.render(`versions/${version}/${section}/${subsection}/south-access-1`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-access-1-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-acc-1-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-acc-1-error-list'] = undefined;

    let how = req.session.data['marine-plan-policy-s-acc-1-how'];
    how = Array.isArray(how) ? how : (how ? [how] : []);
    req.session.data['marine-plan-policy-s-acc-1-how'] = how;

    const avoid = req.session.data['marine-plan-policy-s-acc-1-avoid'];
    const minimise = req.session.data['marine-plan-policy-s-acc-1-minimise'];
    const mitigate = req.session.data['marine-plan-policy-s-acc-1-mitigate'];

    if (how.length === 0) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      req.session.data['marine-plan-policy-s-acc-1-error-list'] = [
        { text: "Select how you will manage the impacts of your project in relation to this policy", href: "#marine-plan-policy-s-acc-1-how-avoid" }
      ];
      return res.redirect('south-access-1');
    }

    const emptyTextareas = [];
    if (how.includes('avoid') && (!avoid || avoid.trim() === '')) emptyTextareas.push('avoid');
    if (how.includes('minimise') && (!minimise || minimise.trim() === '')) emptyTextareas.push('minimise');
    if (how.includes('mitigate') && (!mitigate || mitigate.trim() === '')) emptyTextareas.push('mitigate');

    if (emptyTextareas.length > 0) {
      const errorList = [];
      emptyTextareas.forEach(function (type) {
        if (type === 'avoid') errorList.push({ text: "Enter how you will avoid any impacts", href: "#marine-plan-policy-s-acc-1-avoid" });
        else if (type === 'minimise') errorList.push({ text: "Enter how you will minimise any impacts", href: "#marine-plan-policy-s-acc-1-minimise" });
        else if (type === 'mitigate') errorList.push({ text: "Enter how you will mitigate any impacts", href: "#marine-plan-policy-s-acc-1-mitigate" });
      });
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      req.session.data['marine-plan-policy-s-acc-1-empty-textareas'] = emptyTextareas;
      req.session.data['marine-plan-policy-s-acc-1-error-list'] = errorList;
      return res.redirect('south-access-1');
    }

    req.session.data['marine-plan-policy-s-acc-1-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

  /////////////////////////////////////////////////////////
  //////// South Biodiversity 1 (S-BIO-1) policy question page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/south-biodiversity-1`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-bio-1-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-bio-1-error-list'] = undefined;
    res.render(`versions/${version}/${section}/${subsection}/south-biodiversity-1`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-biodiversity-1-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-bio-1-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-bio-1-error-list'] = undefined;

    let how = req.session.data['marine-plan-policy-s-bio-1-how'];
    how = Array.isArray(how) ? how : (how ? [how] : []);
    req.session.data['marine-plan-policy-s-bio-1-how'] = how;

    const avoid = req.session.data['marine-plan-policy-s-bio-1-avoid'];
    const minimise = req.session.data['marine-plan-policy-s-bio-1-minimise'];
    const mitigate = req.session.data['marine-plan-policy-s-bio-1-mitigate'];

    if (how.length === 0) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      req.session.data['marine-plan-policy-s-bio-1-error-list'] = [
        { text: "Select how you will manage the impacts of your project in relation to this policy", href: "#marine-plan-policy-s-bio-1-how-avoid" }
      ];
      return res.redirect('south-biodiversity-1');
    }

    const emptyTextareas = [];
    if (how.includes('avoid') && (!avoid || avoid.trim() === '')) emptyTextareas.push('avoid');
    if (how.includes('minimise') && (!minimise || minimise.trim() === '')) emptyTextareas.push('minimise');
    if (how.includes('mitigate') && (!mitigate || mitigate.trim() === '')) emptyTextareas.push('mitigate');

    if (emptyTextareas.length > 0) {
      const errorList = [];
      emptyTextareas.forEach(function (type) {
        if (type === 'avoid') errorList.push({ text: "Enter how you will avoid any impacts", href: "#marine-plan-policy-s-bio-1-avoid" });
        else if (type === 'minimise') errorList.push({ text: "Enter how you will minimise any impacts", href: "#marine-plan-policy-s-bio-1-minimise" });
        else if (type === 'mitigate') errorList.push({ text: "Enter how you will mitigate any impacts", href: "#marine-plan-policy-s-bio-1-mitigate" });
      });
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      req.session.data['marine-plan-policy-s-bio-1-empty-textareas'] = emptyTextareas;
      req.session.data['marine-plan-policy-s-bio-1-error-list'] = errorList;
      return res.redirect('south-biodiversity-1');
    }

    req.session.data['marine-plan-policy-s-bio-1-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

  /////////////////////////////////////////////////////////
  //////// South Climate change 1 (S-CC-1) policy question page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/south-climate-change-1`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-cc-1-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-cc-1-error-list'] = undefined;
    res.render(`versions/${version}/${section}/${subsection}/south-climate-change-1`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-climate-change-1-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-cc-1-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-cc-1-error-list'] = undefined;

    let how = req.session.data['marine-plan-policy-s-cc-1-how'];
    how = Array.isArray(how) ? how : (how ? [how] : []);
    req.session.data['marine-plan-policy-s-cc-1-how'] = how;

    const avoid = req.session.data['marine-plan-policy-s-cc-1-avoid'];
    const minimise = req.session.data['marine-plan-policy-s-cc-1-minimise'];
    const mitigate = req.session.data['marine-plan-policy-s-cc-1-mitigate'];

    if (how.length === 0) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      req.session.data['marine-plan-policy-s-cc-1-error-list'] = [
        { text: "Select how you will manage the impacts of your project in relation to this policy", href: "#marine-plan-policy-s-cc-1-how-avoid" }
      ];
      return res.redirect('south-climate-change-1');
    }

    const emptyTextareas = [];
    if (how.includes('avoid') && (!avoid || avoid.trim() === '')) emptyTextareas.push('avoid');
    if (how.includes('minimise') && (!minimise || minimise.trim() === '')) emptyTextareas.push('minimise');
    if (how.includes('mitigate') && (!mitigate || mitigate.trim() === '')) emptyTextareas.push('mitigate');

    if (emptyTextareas.length > 0) {
      const errorList = [];
      emptyTextareas.forEach(function (type) {
        if (type === 'avoid') errorList.push({ text: "Enter how you will avoid any impacts", href: "#marine-plan-policy-s-cc-1-avoid" });
        else if (type === 'minimise') errorList.push({ text: "Enter how you will minimise any impacts", href: "#marine-plan-policy-s-cc-1-minimise" });
        else if (type === 'mitigate') errorList.push({ text: "Enter how you will mitigate any impacts", href: "#marine-plan-policy-s-cc-1-mitigate" });
      });
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      req.session.data['marine-plan-policy-s-cc-1-empty-textareas'] = emptyTextareas;
      req.session.data['marine-plan-policy-s-cc-1-error-list'] = errorList;
      return res.redirect('south-climate-change-1');
    }

    req.session.data['marine-plan-policy-s-cc-1-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

  /////////////////////////////////////////////////////////
  //////// South Aggregates 4 (S-AGG-4) policy question page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/south-aggregates-4`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-agg-4-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-agg-4-error-list'] = undefined;
    res.render(`versions/${version}/${section}/${subsection}/south-aggregates-4`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-aggregates-4-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-agg-4-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-agg-4-error-list'] = undefined;

    let how = req.session.data['marine-plan-policy-s-agg-4-how'];
    how = Array.isArray(how) ? how : (how ? [how] : []);
    req.session.data['marine-plan-policy-s-agg-4-how'] = how;

    const avoid = req.session.data['marine-plan-policy-s-agg-4-avoid'];
    const minimise = req.session.data['marine-plan-policy-s-agg-4-minimise'];
    const mitigate = req.session.data['marine-plan-policy-s-agg-4-mitigate'];

    if (how.length === 0) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      req.session.data['marine-plan-policy-s-agg-4-error-list'] = [
        { text: "Select how you will manage the impacts of your project in relation to this policy", href: "#marine-plan-policy-s-agg-4-how-avoid" }
      ];
      return res.redirect('south-aggregates-4');
    }

    const emptyTextareas = [];
    if (how.includes('avoid') && (!avoid || avoid.trim() === '')) emptyTextareas.push('avoid');
    if (how.includes('minimise') && (!minimise || minimise.trim() === '')) emptyTextareas.push('minimise');
    if (how.includes('mitigate') && (!mitigate || mitigate.trim() === '')) emptyTextareas.push('mitigate');

    if (emptyTextareas.length > 0) {
      const errorList = [];
      emptyTextareas.forEach(function (type) {
        if (type === 'avoid') errorList.push({ text: "Enter how you will avoid any impacts", href: "#marine-plan-policy-s-agg-4-avoid" });
        else if (type === 'minimise') errorList.push({ text: "Enter how you will minimise any impacts", href: "#marine-plan-policy-s-agg-4-minimise" });
        else if (type === 'mitigate') errorList.push({ text: "Enter how you will mitigate any impacts", href: "#marine-plan-policy-s-agg-4-mitigate" });
      });
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      req.session.data['marine-plan-policy-s-agg-4-empty-textareas'] = emptyTextareas;
      req.session.data['marine-plan-policy-s-agg-4-error-list'] = errorList;
      return res.redirect('south-aggregates-4');
    }

    req.session.data['marine-plan-policy-s-agg-4-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

  /////////////////////////////////////////////////////////
  //////// South Employment 1 (S-EMP-1) policy question page (textarea)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/south-employment-1`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    res.render(`versions/${version}/${section}/${subsection}/south-employment-1`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-employment-1-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const value = req.session.data['marine-plan-policy-s-emp-1'];

    if (!value || value.trim() === '') {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      return res.redirect('south-employment-1');
    }

    req.session.data['marine-plan-policy-s-emp-1-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

  /////////////////////////////////////////////////////////
  //////// South Underwater noise 2 (S-UWN-2) policy question page (4 radios)
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/south-underwater-noise-2`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-uwn-2-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-uwn-2-error-list'] = undefined;
    res.render(`versions/${version}/${section}/${subsection}/south-underwater-noise-2`);
  });

  router.post(`/versions/${version}/${section}/${subsection}/south-underwater-noise-2-router`, function (req, res) {
    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";
    req.session.data['errortypetwo'] = "false";
    req.session.data['marine-plan-policy-s-uwn-2-empty-textareas'] = undefined;
    req.session.data['marine-plan-policy-s-uwn-2-error-list'] = undefined;

    let how = req.session.data['marine-plan-policy-s-uwn-2-how'];
    how = Array.isArray(how) ? how : (how ? [how] : []);
    req.session.data['marine-plan-policy-s-uwn-2-how'] = how;

    const avoid = req.session.data['marine-plan-policy-s-uwn-2-avoid'];
    const minimise = req.session.data['marine-plan-policy-s-uwn-2-minimise'];
    const mitigate = req.session.data['marine-plan-policy-s-uwn-2-mitigate'];
    const compensate = req.session.data['marine-plan-policy-s-uwn-2-compensate'];

    if (how.length === 0) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      req.session.data['marine-plan-policy-s-uwn-2-error-list'] = [
        { text: "Select how you will manage the impacts of your project in relation to this policy", href: "#marine-plan-policy-s-uwn-2-how-avoid" }
      ];
      return res.redirect('south-underwater-noise-2');
    }

    const emptyTextareas = [];
    if (how.includes('avoid') && (!avoid || avoid.trim() === '')) emptyTextareas.push('avoid');
    if (how.includes('minimise') && (!minimise || minimise.trim() === '')) emptyTextareas.push('minimise');
    if (how.includes('mitigate') && (!mitigate || mitigate.trim() === '')) emptyTextareas.push('mitigate');
    if (how.includes('compensate') && (!compensate || compensate.trim() === '')) emptyTextareas.push('compensate');

    if (emptyTextareas.length > 0) {
      const errorList = [];
      emptyTextareas.forEach(function (type) {
        if (type === 'avoid') errorList.push({ text: "Enter how you will avoid any impacts", href: "#marine-plan-policy-s-uwn-2-avoid" });
        else if (type === 'minimise') errorList.push({ text: "Enter how you will minimise any impacts", href: "#marine-plan-policy-s-uwn-2-minimise" });
        else if (type === 'mitigate') errorList.push({ text: "Enter how you will mitigate any impacts", href: "#marine-plan-policy-s-uwn-2-mitigate" });
        else if (type === 'compensate') errorList.push({ text: "Enter how you will compensate for the impacts (or state the case for proceeding)", href: "#marine-plan-policy-s-uwn-2-compensate" });
      });
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      req.session.data['marine-plan-policy-s-uwn-2-empty-textareas'] = emptyTextareas;
      req.session.data['marine-plan-policy-s-uwn-2-error-list'] = errorList;
      return res.redirect('south-underwater-noise-2');
    }

    req.session.data['marine-plan-policy-s-uwn-2-completed'] = true;
    const completedCount = (req.session.data['marine-plan-policies-completed-count'] || 0) + 1;
    const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
    const redirectUrl = './?marine-plan-policies-completed-count=' + completedCount + '&marine-plan-policies-not-started-count=' + notStartedCount;
    res.redirect(redirectUrl);
  });

};
