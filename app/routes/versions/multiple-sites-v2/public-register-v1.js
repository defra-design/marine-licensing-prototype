const APPLICATIONS = require('./public-register-v1-applications.js');
const DETAILS = require('./public-register-v1-details.js');

module.exports = function (router) {
  // Public register v1 routes
  //
  // The Marine licence public register, for members of the public. A
  // separate service from Get permission for marine work, with its own
  // navigation and no sign-in. MVP only lists applications open for
  // consultation, but the list page is named so it can take decided ones
  // later. Phase 1 is the landing page, filtering the list, and finding an
  // application by reference. Phase 2 is viewing an application, phase 3
  // is commenting on it. Email alerts follow.
  const version = "multiple-sites-v2";
  const section = "public-register-v1";
  const base = `/versions/${version}/${section}`;

  // The legacy MCMS public register, for older applications and anything
  // not yet in the new service
  const MCMS_URL = 'https://marinelicensing.marinemanagement.org.uk/mmofox5/fox/live/MMO_PUBLIC_REGISTER';

  // All 11 English marine plan areas, as on the consultation v2 filter
  const MARINE_PLAN_AREAS = [
    'East Inshore', 'East Offshore', 'North East Inshore', 'North East Offshore',
    'North West Inshore', 'North West Offshore', 'South East Inshore', 'South Inshore',
    'South Offshore', 'South West Inshore', 'South West Offshore'
  ];

  // LCML second-level activity types, grouped by their top-level type, with
  // the values and names from the LCML v4 type of activity page. More will
  // come with non-LCML applications.
  const ACTIVITY_GROUPS = [
    {
      value: 'construction',
      heading: 'Construction',
      options: [
        { value: 'construction-new', text: 'Construction of new marine works' },
        { value: 'maintenance-existing', text: 'Maintenance of existing marine works' },
        { value: 'alteration-improvement', text: 'Alteration or improvement, including extending, of existing marine works' }
      ]
    },
    {
      value: 'deposit',
      heading: 'Deposit',
      options: [
        { value: 'continuation-existing', text: 'Continuation of existing deposit activity' },
        { value: 'deposit-new', text: 'Deposit of something new' },
        { value: 'replacing-existing', text: 'Replacing existing object' }
      ]
    },
    {
      value: 'removal',
      heading: 'Removal',
      options: [
        { value: 'one-off-first-time', text: 'One off first time removal' },
        { value: 'ongoing-routine', text: 'Removal as part of an ongoing or routine activity' },
        { value: 'removal-replacement', text: 'Removal for replacement' },
        { value: 'removal-relocation', text: 'Removal for relocation' }
      ]
    }
  ];
  const ACTIVITY_NAMES = {};
  ACTIVITY_GROUPS.forEach(group => group.options.forEach(option => { ACTIVITY_NAMES[option.value] = option.text; }));
  const ACTIVITY_GROUP = {};
  ACTIVITY_GROUPS.forEach(group => { ACTIVITY_GROUP[group.value] = group; });

  // Pagination (?pagination=on, from the tray). Off by default, so nobody
  // assumes the service will always split after 10. Only shown when there
  // are more results than fit on a page.
  const PAGE_SIZE = 10;

  const SORTS = {
    closing: { text: 'Closing date', compare: (a, b) => a.closingOffset - b.closingOffset },
    newest: { text: 'Recently published', compare: (a, b) => b.publishedOffset - a.publishedOffset }
  };

  function closingSuffix(offset) {
    if (offset === 0) return 'today';
    if (offset === 1) return 'tomorrow';
    return `in ${offset} days`;
  }

  // Adds what the pages need to a seeded application
  function withDetails(application) {
    return Object.assign({}, application, {
      marinePlanAreas: [].concat(application.marinePlanArea),
      activityNames: application.activities.map(value => ACTIVITY_NAMES[value]),
      closingSuffix: closingSuffix(application.closingOffset),
      closingSoon: application.closingOffset <= 7
    });
  }

  const ALL = APPLICATIONS.map(withDetails);

  // References are MLA, the year and 5 digits: MLA/2026/10020. We ignore
  // case, spaces and punctuation, as people copy them off site notices and
  // emails, so "mla 2026 10020", "MLA-2026-10020" and "MLA202610020" all
  // work. Gives the reference written the standard way, or null if it is
  // not in that format. Other prefixes will come later.
  function formatReference(value) {
    const match = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').match(/^MLA(\d{4})(\d{5})$/);
    return match ? `MLA/${match[1]}/${match[2]}` : null;
  }

  const REFERENCE_ERRORS = {
    empty: () => 'Enter an application reference',
    format: () => 'Enter the reference in the correct format, like MLA/2026/10020',
    'not-found': reference => `No application found with reference ${reference}`
  };

  // For the reference filter on the list, which matches part of a
  // reference, ignoring case, spaces and punctuation
  function referenceKey(value) {
    return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  // A query value as a list, without the kit's _unchecked marker
  function list(value) {
    return [].concat(value || []).filter(item => item && item !== '_unchecked');
  }

  // Builds a list URL from a query, with some keys changed.
  // A value of null removes the key. Filter links go back to the top of
  // the filter box rather than the top of the page.
  function listUrl(query, changes, hash) {
    const params = new URLSearchParams();
    const merged = Object.assign({}, query, changes);
    Object.keys(merged).forEach(key => {
      list(merged[key] === null ? [] : merged[key]).forEach(value => params.append(key, value));
    });
    const qs = params.toString();
    return `${base}/applications${qs ? '?' + qs : ''}${hash || ''}`;
  }

  // Landing page
  router.get(`${base}/start`, function (req, res) {
    res.render(`versions/${version}/${section}/start`, {
      mcmsUrl: MCMS_URL,
      referenceError: REFERENCE_ERRORS[req.query.error] ? REFERENCE_ERRORS[req.query.error](req.query['public-register-v1-reference']) : null,
      referenceNotFound: req.query.error === 'not-found',
      referenceValue: req.query['public-register-v1-reference'],
      // The main call to action, from the tray: the start button by
      // default, ?cta=button for a standard green button, or ?cta=link
      // for a plain link under the intro
      ctaMode: ['button', 'link'].includes(req.query.cta) ? req.query.cta : 'start'
    });
  });

  // Find an application by reference, from the landing page: straight to
  // it if we have it, otherwise an error on the landing page, keeping what
  // they typed. Not found is an error too, with a sentence under the box
  // pointing to the MCMS register (error messages cannot have links).
  router.get(`${base}/find-reference`, function (req, res) {
    const entered = String(req.query['public-register-v1-reference'] || '').trim();
    const reference = formatReference(entered);
    const match = reference && ALL.find(application => application.reference === reference);
    if (match) {
      return res.redirect(`${base}/application/${match.id}`);
    }
    const error = !entered ? 'empty' : !reference ? 'format' : 'not-found';
    // Not found shows the reference written the standard way
    const value = entered ? `&public-register-v1-reference=${encodeURIComponent(reference || entered)}` : '';
    // Keep the call to action version chosen in the tray
    const cta = ['button', 'link'].includes(req.query.cta) ? `&cta=${req.query.cta}` : '';
    res.redirect(`${base}/start?error=${error}${value}${cta}`);
  });

  // The GOV.UK pagination component's settings for page ?page= of the
  // list, or null when everything fits on one page. Links keep the filters
  // and go back to the top of the filter and results.
  function paginationFor(query, total, page) {
    const pages = Math.ceil(total / PAGE_SIZE);
    if (pages <= 1) return null;
    const href = n => listUrl(query, { page: n === 1 ? null : n }, '#app-filter');
    const items = [];
    for (let n = 1; n <= pages; n++) {
      items.push({ number: n, href: href(n), current: n === page });
    }
    return {
      previous: page > 1 ? { href: href(page - 1) } : null,
      next: page < pages ? { href: href(page + 1) } : null,
      items
    };
  }

  // List and filter applications
  router.get(`${base}/applications`, function (req, res) {
    const query = req.query;
    const paginationOn = query.pagination === 'on';
    // The reference filter is on unless ?reffilter=off, from the tray. On
    // trial: the landing page lookup is the main way in by reference.
    const referenceFilterOn = query.reffilter !== 'off';

    // Activity is Construction, Deposit or Removal. By default that is all
    // there is. With ?activityfilter=nested, from the tray, each reveals its
    // second-level types: a top-level type on its own means all of it, and
    // ticking some of its types narrows it to those. Types under a top-level
    // box that is not ticked are ignored, and so are all types when the
    // filter is top level only.
    const nestedActivities = query.activityfilter === 'nested';
    const groups = list(query['public-register-v1-activity-type']).filter(value => ACTIVITY_GROUP[value]);
    const ticked = nestedActivities ? list(query['public-register-v1-activity']).filter(activity => ACTIVITY_NAMES[activity]) : [];
    const activityGroups = ACTIVITY_GROUPS.filter(group => groups.includes(group.value)).map(group => ({
      group,
      types: group.options.map(option => option.value).filter(value => ticked.includes(value))
    }));
    const filters = {
      reference: referenceFilterOn ? String(query['public-register-v1-reference-filter'] || '').trim() : '',
      areas: list(query['public-register-v1-area']).filter(area => MARINE_PLAN_AREAS.includes(area)),
      groups,
      activities: [].concat(...activityGroups.map(g => g.types))
    };
    // Every second-level type that matches
    const allowed = [].concat(...activityGroups.map(g => g.types.length ? g.types : g.group.options.map(option => option.value)));
    const sort = SORTS[query.sort] ? query.sort : 'closing';

    const matching = ALL.filter(application => {
      if (filters.reference && !referenceKey(application.reference).includes(referenceKey(filters.reference))) return false;
      // An application can be in more than one area: any of them matching counts
      if (filters.areas.length && !filters.areas.some(area => application.marinePlanAreas.includes(area))) return false;
      if (groups.length && !application.activities.some(activity => allowed.includes(activity))) return false;
      return true;
    }).sort(SORTS[sort].compare);

    let results = matching;
    let pagination = null;
    if (paginationOn) {
      const pages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
      const page = Math.min(Math.max(parseInt(query.page, 10) || 1, 1), pages);
      results = matching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      pagination = paginationFor(query, matching.length, page);
    }

    // The MOJ "Selected filters" tags, each linking to the page without it.
    // Changing the filters starts again on page 1.
    const without = changes => listUrl(query, Object.assign({ page: null }, changes), '#app-filter');
    const selected = [];
    if (filters.reference) {
      selected.push({
        heading: 'Application reference',
        items: [{ text: filters.reference, href: without({ 'public-register-v1-reference-filter': null }) }]
      });
    }
    if (filters.areas.length) {
      selected.push({
        heading: 'Marine plan area',
        items: filters.areas.map(area => ({
          text: area,
          href: without({ 'public-register-v1-area': filters.areas.filter(a => a !== area) })
        }))
      });
    }
    if (activityGroups.length) {
      selected.push({
        heading: 'Activity',
        items: [].concat(...activityGroups.map(({ group, types }) => types.length
          // Removing the last type leaves the top-level type, so all of it
          ? types.map(type => ({
              text: ACTIVITY_NAMES[type],
              href: without({ 'public-register-v1-activity': filters.activities.filter(a => a !== type) })
            }))
          : [{
              text: nestedActivities ? `All ${group.heading.toLowerCase()}` : group.heading,
              href: without({ 'public-register-v1-activity-type': groups.filter(g => g !== group.value) })
            }]))
      });
    }

    // Links for the tray: the same list with pagination on or off
    const trayUrls = {
      paginationOff: listUrl(query, { pagination: null, page: null }),
      paginationOn: listUrl(query, { pagination: 'on', page: null }),
      refFilterOn: listUrl(query, { reffilter: null, page: null }),
      refFilterOff: listUrl(query, { reffilter: 'off', page: null, 'public-register-v1-reference-filter': null }),
      // Going back to top level only drops any second-level types ticked
      activityTopLevel: listUrl(query, { activityfilter: null, page: null, 'public-register-v1-activity': null }),
      activityNested: listUrl(query, { activityfilter: 'nested', page: null })
    };

    res.render(`versions/${version}/${section}/applications`, {
      results,
      total: matching.length,
      pagination,
      paginationOn,
      referenceFilterOn,
      nestedActivities,
      trayUrls,
      filters,
      selected,
      areaOptions: MARINE_PLAN_AREAS,
      activityGroups: ACTIVITY_GROUPS,
      sort,
      sortLinks: Object.keys(SORTS).map(key => ({
        text: SORTS[key].text,
        current: key === sort,
        href: listUrl(query, { sort: key === 'closing' ? null : key, page: null })
      })),
      // Clear filters keeps the page versions (sort, pagination, reference
      // filter off, nested activities)
      clearFiltersUrl: listUrl({ sort: query.sort, pagination: query.pagination, reffilter: query.reffilter, activityfilter: query.activityfilter }, {}, '#app-filter')
    });
  });

  // A document as the page shows it. A string is just a filename. Withheld
  // documents are not published at all, and a replaced one is published as
  // the applicant's redacted copy, without saying so (as on the LCML v4
  // public register preview).
  function documentFor(file, title, seed) {
    const doc = typeof file === 'string' ? { filename: file } : file;
    const filename = doc.replacedBy || doc.filename;
    const extension = filename.split('.').pop().toLowerCase();
    // Made-up file sizes, worked out from the filename (or seed, when every
    // application has the same filename) so they stay the same
    const kb = 180 + [...(seed || filename)].reduce((total, c) => (total * 31 + c.charCodeAt(0)) % 4000, 7);
    return {
      title,
      filename,
      withheld: !!doc.withheld,
      format: extension.toUpperCase(),
      size: kb >= 1000 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
    };
  }

  // What the view an application page needs from an application's details:
  // activity names that match the filter, documents in the form the page
  // shows them, and every document for the top of the page, grouped under
  // the task list section it was uploaded in, as on the consultation v2
  // application page. The site coordinates come first, then the drawings,
  // titled by site name rather than "Site 1" as the public do not know the
  // numbering. Groups with nothing in them are left out.
  function pageDetails(id, details) {
    const siteDocuments = [documentFor('sitecoordinates.zip', 'Site coordinates', `${id}-sitecoordinates.zip`)];
    const sites = details.sites.map(site => {
      const drawings = (site.drawings || []).map((drawing, d) => documentFor(drawing, `${site.name} – Construction drawing ${d + 1}`));
      siteDocuments.push(...drawings);
      return Object.assign({}, site, {
        activities: site.activities.map(activity => Object.assign({}, activity, {
          typeOfActivity: ACTIVITY_NAMES[activity.type] || activity.typeOfActivity
        })),
        drawings
      });
    });
    const supportingDocuments = (details.supportingDocuments || []).map(doc => Object.assign({}, doc, {
      file: documentFor(doc.filename, doc.type)
    }));
    const wfd = details.wfd && Object.assign({}, details.wfd, {
      file: documentFor(details.wfd.upload, 'Water Framework Directive assessment')
    });
    const documentGroups = [
      { heading: 'Sites and activities', documents: siteDocuments },
      { heading: 'Marine plan policy supporting documents', documents: supportingDocuments.map(doc => doc.file) },
      { heading: 'Water Framework Directive assessment', documents: wfd ? [wfd.file] : [] }
    ].filter(group => group.documents.length);
    return Object.assign({}, details, { sites, supportingDocuments, wfd, documentGroups });
  }

  // View an application. Every application uses the same page, which shows
  // whichever sections its details have.
  router.get(`${base}/application/:applicationId`, function (req, res) {
    const application = ALL.find(a => a.id === req.params.applicationId);
    if (!application) {
      return res.redirect(`${base}/applications`);
    }
    res.render(`versions/${version}/${section}/application`, {
      application,
      details: pageDetails(application.id, DETAILS[application.id])
    });
  });

  // Commenting on an application (phase 3). Kept minimal to start with:
  // the comment, then name and email, then check your answers, then sent,
  // with the confirmation email shown as a page. No sign-in. Questions still
  // open (support or object, connection to the area, a character limit)
  // are left out until the team has talked them through.
  //
  // The kit stores the answers in the session, under keys of their own for
  // each application (public-register-v1-bude-comment and so on), so someone
  // who comments on more than one in usability testing starts each with
  // empty boxes. They are not cleared after sending, so the demo keeps its
  // state.
  function commentKeys(id) {
    const prefix = `public-register-v1-${id}`;
    return {
      comment: `${prefix}-comment`,
      name: `${prefix}-name`,
      email: `${prefix}-email`,
      reference: `${prefix}-comment-reference`
    };
  }

  // The keys and this application's answers, for the templates
  function commentAnswers(req, id) {
    const keys = commentKeys(id);
    const answers = {};
    Object.keys(keys).forEach(key => { answers[key] = req.session.data[keys[key]]; });
    return { keys, answers };
  }

  function findApplication(req, res) {
    const application = ALL.find(a => a.id === req.params.applicationId);
    if (!application) res.redirect(`${base}/applications`);
    return application;
  }

  // Pages with a change link from check your answers go back there when
  // they are saved (?change=1, carried through the form)
  function nextPage(req, next) {
    return req.query.change || req.body.change ? 'check-answers' : next;
  }

  function renderComment(req, res, page, application, extra) {
    res.render(`versions/${version}/${section}/comment/${page}`,
      Object.assign({ application }, commentAnswers(req, application.id), extra));
  }

  // Your comment
  router.get(`${base}/application/:applicationId/comment`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'comment', application, { change: req.query.change });
  });

  router.post(`${base}/application/:applicationId/comment`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    if (!String(req.session.data[commentKeys(application.id).comment] || '').trim()) {
      return renderComment(req, res, 'comment', application, {
        change: req.body.change,
        errors: { comment: 'Enter your comment' }
      });
    }
    res.redirect(nextPage(req, 'your-details'));
  });

  // Your details
  router.get(`${base}/application/:applicationId/your-details`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'your-details', application, { change: req.query.change });
  });

  router.post(`${base}/application/:applicationId/your-details`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const keys = commentKeys(application.id);
    const name = String(req.session.data[keys.name] || '').trim();
    const email = String(req.session.data[keys.email] || '').trim();
    const errors = {};
    if (!name) errors.name = 'Enter your full name';
    if (!email) errors.email = 'Enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter an email address in the correct format, like name@example.com';
    if (Object.keys(errors).length) {
      return renderComment(req, res, 'your-details', application, { change: req.body.change, errors });
    }
    res.redirect('check-answers');
  });

  // Check your answers
  router.get(`${base}/application/:applicationId/check-answers`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'check-answers', application);
  });

  // Sending gives the comment a reference, like the ones GOV.UK services
  // show on confirmation pages
  router.post(`${base}/application/:applicationId/check-answers`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    req.session.data[commentKeys(application.id).reference] = Array.from({ length: 8 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    res.redirect('comment-sent');
  });

  // Comment sent
  router.get(`${base}/application/:applicationId/comment-sent`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'comment-sent', application);
  });

  // The confirmation email, as the commenter would see it in their inbox
  router.get(`${base}/application/:applicationId/confirmation-email`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    // The first and last initials of their name, for the mailbox avatar
    const { keys, answers } = commentAnswers(req, application.id);
    const names = String(answers.name || '').trim().split(/\s+/).filter(Boolean);
    const mailInitials = names.length ? (names[0][0] + (names.length > 1 ? names[names.length - 1][0] : '')).toUpperCase() : '';
    res.render(`versions/${version}/${section}/emails/comment-confirmation`, { application, keys, answers, mailInitials });
  });

  // The register's home is the landing page
  router.get(base, function (req, res) {
    res.redirect(`${base}/start`);
  });
};
