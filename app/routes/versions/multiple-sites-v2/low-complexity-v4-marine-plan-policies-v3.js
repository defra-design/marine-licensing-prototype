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

  // Made-up filenames given out in turn as documents are added. Deliberately
  // generic so they make sense whatever type the participant then picks.
  // Each document keeps its name once given.
  const FAKE_FILENAMES = [
    'Assessment report v2.pdf',
    'Technical appendix A.pdf',
    'Baseline study final.pdf',
    'Specialist report March 2025.pdf',
    'Technical appendix B.pdf',
    'Survey findings summary.pdf',
    'Consultant report rev C.pdf',
    'Supporting evidence pack.pdf'
  ];

  // First made-up name not already used by a document, so names never repeat
  // while there are spare ones (and changing a document always gives a new name)
  function nextFakeFilename(data) {
    const used = getDocuments(data).map(d => d.filename);
    const unused = FAKE_FILENAMES.find(name => !used.includes(name));
    return unused || FAKE_FILENAMES[used.length % FAKE_FILENAMES.length];
  }

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

  // The MPP section is complete when all five policies are answered and every
  // ticked policy has a document (same rule as the task list)
  function mppSectionComplete(data) {
    return MPP_V3_POLICIES.every(p => data['marine-plan-policy-v3-' + p.key + '-completed']) &&
      mppV3Documents.summarise(data).docsComplete;
  }

  // Leaving the documents flow. If they came from check your answers
  // (?mpp-v3-docs-from-cya=true on its Change link) and the section is still
  // complete, go back there. Otherwise go to the MPP list, whose Continue
  // goes on to the main task list. As with review site details, coming from
  // check your answers is remembered until they leave this way, even if they
  // visit the MPP list in between.
  function leaveDocuments(req, res) {
    const fromCya = req.session.data['mpp-v3-docs-from-cya'] === 'true';
    delete req.session.data['mpp-v3-docs-from-cya'];
    if (fromCya && mppSectionComplete(req.session.data)) {
      return redirectOnceSaved(req, res, `/versions/${version}/${section}/check-your-answers#supporting-documents`);
    }
    redirectOnceSaved(req, res, `/versions/${version}/${section}/${subsection}/`);
  }

  // Sub-task entry point from the MPP list: straight to the summary once there's something to show
  router.get(`${docsPath}/`, function (req, res) {
    req.session.data['mpp-v3-docs-entry'] = 'list';
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

  // Change one part of an existing document – ?page=upload, category or policies.
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
    const page = ['upload', 'category'].includes(req.query.page) ? req.query.page : 'policies';
    req.session.data['mpp-v3-change-single-page'] = page;
    redirectOnceSaved(req, res, `${docsPath}/${page}`);
  });

  // Cancel while adding a document – drop the draft and go back to where they started
  router.get(`${docsPath}/cancel`, function (req, res) {
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    if (getDocuments(req.session.data).length > 0) {
      return redirectOnceSaved(req, res, `${docsPath}/summary`);
    }
    leaveDocuments(req, res);
  });

  // Delete – confirmation page first, as for deleting sites and construction drawings
  router.get(`${docsPath}/delete`, function (req, res) {
    const id = parseInt(req.query.id, 10);
    const doc = getDocuments(req.session.data).find(d => d.id === id);
    if (!doc) {
      return redirectOnceSaved(req, res, `${docsPath}/summary`);
    }
    res.render(`${docsView}/delete`, { document: doc });
  });

  router.post(`${docsPath}/delete-router`, function (req, res) {
    const id = parseInt(req.body['document-id'], 10);
    delete req.session.data['document-id'];
    req.session.data['mpp-v3-documents'] = getDocuments(req.session.data).filter(d => d.id !== id);
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    // Deleting the last document leaves the flow, as deleting all sites does
    if (getDocuments(req.session.data).length === 0) {
      return leaveDocuments(req, res);
    }
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

    // Replacing the file from a card – treat it as a new document in the same place.
    // Type, policies and locations are cleared so nothing from the old file is carried
    // over by accident; the applicant answers both pages again from scratch.
    // Nothing is saved until the policies page, so leaving part way keeps the original.
    if (req.session.data['mpp-v3-change-single-page'] === 'upload') {
      const draft = getDraft(req.session.data);
      draft.filename = nextFakeFilename(req.session.data);
      draft.category = '';
      draft.categoryOther = '';
      draft.policies = [];
      return redirectOnceSaved(req, res, `${docsPath}/category`);
    }

    if (!getDraft(req.session.data)) {
      const nextId = getDocuments(req.session.data).reduce((max, d) => Math.max(max, d.id), 0) + 1;
      req.session.data['editing-document-id'] = nextId;
      req.session.data['mpp-v3-document-draft'] = {
        id: nextId,
        filename: nextFakeFilename(req.session.data),
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
    // How they arrived this time decides where Back goes
    if (req.query['mpp-v3-docs-from-cya'] === 'true') {
      req.session.data['mpp-v3-docs-entry'] = 'cya';
      res.locals.data['mpp-v3-docs-entry'] = 'cya';
    }
    // Leaving the add/change flow part way through drops the unsaved draft
    clearDraft(req.session.data);
    resetErrors(req.session.data);
    // No empty summary page – with nothing to show, leave the flow
    if (getDocuments(req.session.data).length === 0) {
      return leaveDocuments(req, res);
    }
    res.render(`${docsView}/summary`);
  });

  // Continue is never blocked – applicants can add documents over several visits.
  // The sub-task and task list stay 'In progress' until every flagged policy has one.
  router.post(`${docsPath}/summary-router`, function (req, res) {
    resetErrors(req.session.data);
    leaveDocuments(req, res);
  });

};
