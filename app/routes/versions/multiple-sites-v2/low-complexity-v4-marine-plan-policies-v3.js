const mppV3Documents = require('./low-complexity-v4-marine-plan-policies-v3-documents.js');

module.exports = function (router) {
  // Low complexity v2 marine plan policies v3 routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v4";
  const subsection = "marine-plan-policies-v3";

  // Must match low-complexity-v4.js MARINE_PLAN_POLICIES_TOTAL for redirect counts
  const MARINE_PLAN_POLICIES_TOTAL = 37;

  const { MPP_V3_POLICIES, MPP_V3_DOCUMENT_CATEGORIES, isFlagged, getDocuments } = mppV3Documents;

  /////////////////////////////////////////////////////////
  //////// Marine plan policies v3 index page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const completedFromQuery = req.query['marine-plan-policies-v3-completed-count'];
    if (completedFromQuery !== undefined) {
      const completed = parseInt(completedFromQuery, 10);
      const notStarted = parseInt(req.query['marine-plan-policies-v3-not-started-count'], 10) || (MARINE_PLAN_POLICIES_TOTAL - completed);
      req.session.data['marine-plan-policies-v3-completed-count'] = completed;
      req.session.data['marine-plan-policies-v3-not-started-count'] = notStarted;
      res.locals.data['marine-plan-policies-v3-completed-count'] = completed;
      res.locals.data['marine-plan-policies-v3-not-started-count'] = notStarted;
    }
    if (req.session.data['mpp-load-outcome'] === 'timeout') {
      return res.render(`versions/${version}/${section}/${subsection}/policies-unavailable`);
    }
    res.render(`versions/${version}/${section}/${subsection}/index`);
  });

  /////////////////////////////////////////////////////////
  //////// Marine plan policy v3 guidance page
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

      // An unticked checkbox sends nothing, so clear the flag ourselves
      const evidenceKey = `marine-plan-policy-v3-${sessionKey}-evidence`;
      if (req.body[evidenceKey] === undefined) {
        delete req.session.data[evidenceKey];
      }

      const value = req.session.data[`marine-plan-policy-v3-${sessionKey}-text`];

      if (!value || value.trim() === '') {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect(pageName);
      }

      req.session.data[`marine-plan-policy-v3-${sessionKey}-completed`] = true;
      const completedCount = (req.session.data['marine-plan-policies-v3-completed-count'] || 0) + 1;
      const notStartedCount = MARINE_PLAN_POLICIES_TOTAL - completedCount;
      const redirectUrl = './?marine-plan-policies-v3-completed-count=' + completedCount + '&marine-plan-policies-v3-not-started-count=' + notStartedCount;
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

  /////////////////////////////////////////////////////////
  //////// Supporting documents
  //
  // data['mpp-v3-documents'] holds the saved documents. While one is being
  // added or changed, its working copy lives in data['mpp-v3-document-draft']
  // and its id in data['editing-document-id']. A new document is only written
  // to the list when the policies page is saved; a change is saved from
  // whichever single page was changed.
  /////////////////////////////////////////////////////////
  // Session writes go to a file store asynchronously, so a fast redirect can
  // arrive before the draft is saved. Save first, then redirect (as in low-complexity-v4.js).
  function redirectOnceSaved(req, res, target) {
    req.session.save(function () {
      res.redirect(target);
    });
  }

  const docsPath = `/versions/${version}/${section}/${subsection}/documents`;
  const docsView = `versions/${version}/${section}/${subsection}/documents`;

  // Made-up filenames given out in turn as documents are added
  const FAKE_FILENAMES = [
    'Exmouth intertidal ecology survey.pdf',
    'Underwater noise assessment.pdf',
    'Habitats Regulations Assessment screening.pdf',
    'Navigational risk assessment.pdf',
    'Coastal processes study.pdf',
    'Fish and shellfish survey 2025.pdf',
    'Heritage desk-based assessment.pdf',
    'Pontoon design and construction report.pdf'
  ];

  function getDraft(data) {
    return data['mpp-v3-document-draft'];
  }

  function clearDraft(data) {
    delete data['mpp-v3-document-draft'];
    delete data['editing-document-id'];
    delete data['mpp-v3-policies-submitted'];
    delete data['mpp-v3-change-single-page'];
  }

  // Write the draft into the saved list (replacing it if it already exists)
  function saveDraft(data) {
    const draft = getDraft(data);
    const documents = getDocuments(data);
    const index = documents.findIndex(d => d.id === draft.id);
    if (index > -1) {
      documents[index] = draft;
    } else {
      documents.push(draft);
    }
    data['mpp-v3-documents'] = documents;
    clearDraft(data);
  }

  function resetErrors(data) {
    data['errorthispage'] = "false";
    data['errortypeone'] = "false";
    data['errortypetwo'] = "false";
  }

  // Sub-task entry point: straight to the summary once there's something to show
  router.get(`${docsPath}/`, function (req, res) {
    if (getDocuments(req.session.data).length > 0) {
      return redirectOnceSaved(req, res, `${docsPath}/summary`);
    }
    redirectOnceSaved(req, res, `${docsPath}/add`);
  });

  // Start a new document
  router.get(`${docsPath}/add`, function (req, res) {
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    redirectOnceSaved(req, res, `${docsPath}/upload`);
  });

  // Change one part of an existing document – ?page=category or ?page=policies.
  // Copies it into the draft, opens just that page, and saving returns to the summary.
  router.get(`${docsPath}/change`, function (req, res) {
    const id = parseInt(req.query.id, 10);
    const doc = getDocuments(req.session.data).find(d => d.id === id);
    if (!doc) {
      return redirectOnceSaved(req, res, `${docsPath}/summary`);
    }
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    req.session.data['editing-document-id'] = id;
    req.session.data['mpp-v3-document-draft'] = JSON.parse(JSON.stringify(doc));
    const page = req.query.page === 'category' ? 'category' : 'policies';
    req.session.data['mpp-v3-change-single-page'] = page;
    redirectOnceSaved(req, res, `${docsPath}/${page}`);
  });

  // Remove deletes straight away, no confirmation page
  router.get(`${docsPath}/remove`, function (req, res) {
    const id = parseInt(req.query.id, 10);
    req.session.data['mpp-v3-documents'] = getDocuments(req.session.data).filter(d => d.id !== id);
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    redirectOnceSaved(req, res, `${docsPath}/summary`);
  });

  /////////////////////////////////////////////////////////
  //////// 1. Upload
  /////////////////////////////////////////////////////////
  router.get(`${docsPath}/upload`, function (req, res) {
    resetErrors(req.session.data);
    res.render(`${docsView}/upload`, { draft: getDraft(req.session.data) });
  });

  router.post(`${docsPath}/upload-router`, function (req, res) {
    resetErrors(req.session.data);

    // Prototype: no real upload and no file needed. For usability testing a
    // made-up filename is given, so participants don't have to find real files.
    delete req.session.data['mpp-v3-document-file'];

    // When changing a document it keeps its current name
    if (!getDraft(req.session.data)) {
      const nextId = getDocuments(req.session.data).reduce((max, d) => Math.max(max, d.id), 0) + 1;
      req.session.data['editing-document-id'] = nextId;
      req.session.data['mpp-v3-document-draft'] = {
        id: nextId,
        filename: FAKE_FILENAMES[(nextId - 1) % FAKE_FILENAMES.length],
        category: '',
        categoryOther: '',
        policies: []
      };
    }

    redirectOnceSaved(req, res, `${docsPath}/category`);
  });

  /////////////////////////////////////////////////////////
  //////// 2. Category
  /////////////////////////////////////////////////////////
  router.get(`${docsPath}/category`, function (req, res) {
    const draft = getDraft(req.session.data);
    if (!draft) {
      return redirectOnceSaved(req, res, `${docsPath}/add`);
    }
    resetErrors(req.session.data);
    res.render(`${docsView}/category`, { draft: draft, categories: MPP_V3_DOCUMENT_CATEGORIES });
  });

  router.post(`${docsPath}/category-router`, function (req, res) {
    resetErrors(req.session.data);
    const draft = getDraft(req.session.data);
    if (!draft) {
      return redirectOnceSaved(req, res, `${docsPath}/add`);
    }

    const category = req.body['mpp-v3-document-category'];
    const categoryOther = (req.body['mpp-v3-document-category-other'] || '').trim();
    delete req.session.data['mpp-v3-document-category'];
    delete req.session.data['mpp-v3-document-category-other'];

    if (!category) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";
      return redirectOnceSaved(req, res, `${docsPath}/category`);
    }

    draft.category = category;
    draft.categoryOther = category === 'Other supporting evidence' ? categoryOther : '';

    // 'Other' needs a description – keep the radio selected so the input shows with its error
    if (category === 'Other supporting evidence' && !categoryOther) {
      req.session.data['errorthispage'] = "true";
      req.session.data['errortypetwo'] = "true";
      return redirectOnceSaved(req, res, `${docsPath}/category`);
    }

    // Only changing the type – save and go back to the summary
    if (req.session.data['mpp-v3-change-single-page'] === 'category') {
      saveDraft(req.session.data);
      return redirectOnceSaved(req, res, `${docsPath}/summary`);
    }
    redirectOnceSaved(req, res, `${docsPath}/policies`);
  });

  /////////////////////////////////////////////////////////
  //////// 3. Policies
  /////////////////////////////////////////////////////////

  // Flagged policies, plus any this document is already linked to so they can be unlinked
  function policyOptions(data, draft) {
    const linkedKeys = (draft.policies || []).map(p => p.key);
    return MPP_V3_POLICIES.filter(p => isFlagged(data, p.key) || linkedKeys.includes(p.key));
  }

  router.get(`${docsPath}/policies`, function (req, res) {
    const draft = getDraft(req.session.data);
    if (!draft) {
      return redirectOnceSaved(req, res, `${docsPath}/add`);
    }

    // After an error, show what was submitted; otherwise show what the draft holds
    let selected;
    let locations = {};
    let missing = [];
    const submitted = req.session.data['mpp-v3-policies-submitted'];
    if (req.session.data['errorthispage'] === "true" && submitted) {
      selected = submitted.selected;
      locations = submitted.locations;
      missing = submitted.missing;
    } else {
      selected = draft.policies.map(p => p.key);
      draft.policies.forEach(p => { locations[p.key] = p.location; });
    }
    delete req.session.data['mpp-v3-policies-submitted'];
    resetErrors(req.session.data);

    res.render(`${docsView}/policies`, {
      draft: draft,
      options: policyOptions(req.session.data, draft),
      selected: selected,
      locations: locations,
      missing: missing
    });
  });

  router.post(`${docsPath}/policies-router`, function (req, res) {
    resetErrors(req.session.data);
    const draft = getDraft(req.session.data);
    if (!draft) {
      return redirectOnceSaved(req, res, `${docsPath}/add`);
    }

    let selected = req.body['mpp-v3-document-policies'] || [];
    if (!Array.isArray(selected)) selected = [selected];
    selected = selected.filter(key => key !== '_unchecked');

    const locations = {};
    MPP_V3_POLICIES.forEach(p => {
      const field = 'mpp-v3-document-location-' + p.key;
      locations[p.key] = (req.body[field] || '').trim();
      delete req.session.data[field];
    });
    delete req.session.data['mpp-v3-document-policies'];

    const missing = selected.filter(key => !locations[key]);

    if (selected.length === 0 || missing.length > 0) {
      req.session.data['errorthispage'] = "true";
      if (selected.length === 0) req.session.data['errortypeone'] = "true";
      if (missing.length > 0) req.session.data['errortypetwo'] = "true";
      req.session.data['mpp-v3-policies-submitted'] = { selected: selected, locations: locations, missing: missing };
      return redirectOnceSaved(req, res, `${docsPath}/policies`);
    }

    // Keep links in index order so the summary reads consistently
    draft.policies = MPP_V3_POLICIES
      .filter(p => selected.includes(p.key))
      .map(p => ({ key: p.key, code: p.code, name: p.name, location: locations[p.key] }));

    saveDraft(req.session.data);
    redirectOnceSaved(req, res, `${docsPath}/summary`);
  });

  /////////////////////////////////////////////////////////
  //////// 4. Summary
  /////////////////////////////////////////////////////////
  router.get(`${docsPath}/summary`, function (req, res) {
    // Leaving the add/change flow part way through drops the unsaved draft
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    res.render(`${docsView}/summary`);
  });

  // Continue is never blocked – applicants can add documents over several visits.
  // The sub-task and task list stay 'In progress' until every flagged policy has one.
  router.post(`${docsPath}/summary-router`, function (req, res) {
    resetErrors(req.session.data);
    redirectOnceSaved(req, res, `/versions/${version}/${section}/${subsection}/`);
  });

};
