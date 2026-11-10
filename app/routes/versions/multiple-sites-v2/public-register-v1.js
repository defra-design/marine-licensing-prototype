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
  // is commenting on it, phase 4 is email alerts
  // (public-register-v1-alerts.js).
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

  // The public consultation is 21 days, as on the LCML v4 site notice:
  // comments must "be received within 21 days of the date this notice was
  // first displayed". The prototype takes the notice as going up the day the
  // application is published here, so it closes 21 days after that. (The
  // applicant has up to 7 days to put the notice up, which a real service
  // would need to allow for.)
  const PUBLIC_CONSULTATION_DAYS = 21;

  function closingSuffix(offset) {
    if (offset === 0) return 'today';
    if (offset === 1) return 'tomorrow';
    return `in ${offset} days`;
  }

  // Adds what the pages need to a seeded application
  function withDetails(application) {
    const closingOffset = application.publishedOffset + PUBLIC_CONSULTATION_DAYS;
    return Object.assign({}, application, {
      closingOffset,
      marinePlanAreas: [].concat(application.marinePlanArea),
      activityNames: application.activities.map(value => ACTIVITY_NAMES[value]),
      closingSuffix: closingSuffix(closingOffset),
      closingSoon: closingOffset <= 7
    });
  }

  const ALL = APPLICATIONS.map(withDetails);

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

  // Back links that depend on where people came from, for pages they can
  // reach from more than one place, or from outside the register.
  //
  // The link is shown only when they came from another page of the
  // register, and goes back to that page as it was (so the list keeps its
  // filters). It is hidden when they came from an email (which is their
  // inbox, not the register), an outside link, a QR code or a bookmark, as
  // there is nowhere on the register to go back to.
  //
  // Coming back to the page from later in its own journey (journeyPaths,
  // such as the comment pages for an application) keeps the link it had,
  // so Back still goes to the list rather than round in a loop. The link is
  // remembered in the session under a key for each page.
  const EMAIL_PAGE = /\/(confirmation-email|alert-email|manage-links-email)$/;

  function registerReferrer(req) {
    let url;
    try { url = new URL(req.get('Referer')); } catch (e) { return null; }
    // Hostname, not host: locally the kit runs behind a proxy on another port
    if (url.hostname !== req.hostname || !url.pathname.startsWith(base)) return null;
    return url;
  }

  function dynamicBackLink(req, key, journeyPaths) {
    const sessionKey = `public-register-v1-back-${key}`;
    const from = registerReferrer(req);
    if (!from || EMAIL_PAGE.test(from.pathname)) {
      delete req.session.data[sessionKey];
    } else if (from.pathname !== req.path && !(journeyPaths || []).some(path => from.pathname.startsWith(path))) {
      req.session.data[sessionKey] = from.pathname + from.search;
    }
    return req.session.data[sessionKey] || null;
  }

  // The GOV.UK start page (www.gov.uk/check-marine-licence-register),
  // with Start now going to the list
  router.get(`${base}/start`, function (req, res) {
    res.render(`versions/${version}/${section}/start`, { mcmsUrl: MCMS_URL });
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
      reference: String(query['public-register-v1-reference-filter'] || '').trim(),
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
      // Going back to top level only drops any second-level types ticked
      activityTopLevel: listUrl(query, { activityfilter: null, page: null, 'public-register-v1-activity': null }),
      activityNested: listUrl(query, { activityfilter: 'nested', page: null })
    };

    res.render(`versions/${version}/${section}/applications`, {
      results,
      total: matching.length,
      pagination,
      paginationOn,
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
      clearFiltersUrl: listUrl({ sort: query.sort, pagination: query.pagination, activityfilter: query.activityfilter }, {}, '#app-filter')
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
      details: pageDetails(application.id, DETAILS[application.id]),
      // Back to the list, landing page or wherever on the register they
      // came from. None from an email, a QR code or an outside link.
      backLink: dynamicBackLink(req, `application-${application.id}`, [`${base}/application/${application.id}/`]),
      // Have your say in an MOJ ticket panel, below the summary, by default.
      // ?hys=breaks, from the tray, is the earlier order with section breaks.
      haveYourSayPanel: req.query.hys !== 'breaks'
    });
  });

  // Commenting on an application (phase 3). Kept minimal to start with:
  // the comment, then name and email, then check your answers. Sending it
  // emails a link to confirm the comment, and opening that link is what
  // sends it (ADR-8: comments use the same logged-out approach as alerts,
  // an email address and a confirmation, as a form does not prove someone
  // can read that inbox). The email is shown as a page. No sign-in.
  // Questions still
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
      reference: `${prefix}-comment-reference`,
      // pending until the link in the email is opened, then sent
      status: `${prefix}-comment-status`,
      // set when the email is sent again, so check your email can say so once
      resent: `${prefix}-comment-resent`
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

  // Your comment. The Comment on this application button adds ?new=1,
  // which clears this application's comment, name, email and reference so
  // each go starts empty (Tom asked for this, for demos and testing). Back
  // links within the journey do not add it, so they keep what was typed.
  router.get(`${base}/application/:applicationId/comment`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    if (req.query.new) {
      const keys = commentKeys(application.id);
      Object.keys(keys).forEach(key => { delete req.session.data[keys[key]]; });
      delete req.session.data.new;
      return res.redirect('comment');
    }
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

  // Your details. ?fix=1 is from "check the email address you gave us" on
  // check your email: saving sends the email again to the corrected address
  // and goes straight back to check your email, without check your answers.
  router.get(`${base}/application/:applicationId/your-details`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    delete req.session.data.fix;
    renderComment(req, res, 'your-details', application, { change: req.query.change, fix: req.query.fix });
  });

  router.post(`${base}/application/:applicationId/your-details`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const keys = commentKeys(application.id);
    const name = String(req.session.data[keys.name] || '').trim();
    const email = String(req.session.data[keys.email] || '').trim();
    const errors = {};
    if (!name) errors.name = 'Enter your full name';
    // Empty and format checks, with the GOV.UK Design System error messages
    // (Email addresses pattern). Participants in usability testing need to
    // type something shaped like an address, such as name@example.com.
    if (!email) errors.email = 'Enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter an email address in the correct format, like name@example.com';
    delete req.session.data.fix;
    if (Object.keys(errors).length) {
      return renderComment(req, res, 'your-details', application, { change: req.body.change, fix: req.body.fix, errors });
    }
    if (req.body.fix && req.session.data[keys.status] === 'pending') {
      req.session.data[keys.resent] = true;
      return res.redirect('check-your-email');
    }
    res.redirect('check-answers');
  });

  // Check your answers
  router.get(`${base}/application/:applicationId/check-answers`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'check-answers', application);
  });

  // Send comment: emails a link to confirm the comment. Until it is opened
  // the comment is pending and is not sent.
  router.post(`${base}/application/:applicationId/check-answers`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const keys = commentKeys(application.id);
    req.session.data[keys.status] = 'pending';
    res.redirect('check-your-email');
  });

  // Check your email. After the email is sent again it shows a success
  // banner, once.
  router.get(`${base}/application/:applicationId/check-your-email`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const keys = commentKeys(application.id);
    const resent = req.session.data[keys.resent];
    delete req.session.data[keys.resent];
    renderComment(req, res, 'check-your-email', application, { resent });
  });

  // Send the email again (GOV.UK Design System, Confirm an email address:
  // let people resend it). From check your email and the expired link page.
  // In the real service a new link replaces the old one.
  router.get(`${base}/application/:applicationId/resend-email`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const keys = commentKeys(application.id);
    req.session.data[keys.status] = 'pending';
    req.session.data[keys.resent] = true;
    res.redirect('check-your-email');
  });

  // The link in the email. Opening it sends the comment and gives it a
  // reference, like the ones GOV.UK services show on confirmation pages.
  // Opening it again keeps the same reference.
  //
  // The prototype cannot time out, so the tray opens the link as if it had
  // expired (?commentlink=expired) or as if the consultation had closed
  // first (?commentlink=closed). Neither sends the comment.
  router.get(`${base}/application/:applicationId/confirm`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const keys = commentKeys(application.id);
    const linkState = req.query.commentlink;
    delete req.session.data.commentlink;
    if (linkState === 'expired') return res.redirect('link-expired');
    if (linkState === 'closed') return res.redirect('consultation-closed');
    sendComment(req, keys);
    res.redirect('comment-sent');
  });

  // Sends the comment: gives it a reference (kept if it has one already, so
  // sending again shows the same one) and marks it sent
  function sendComment(req, keys) {
    if (req.session.data[keys.status] !== 'sent' || !req.session.data[keys.reference]) {
      const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      req.session.data[keys.reference] = Array.from({ length: 8 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    }
    req.session.data[keys.status] = 'sent';
  }

  // Comment sent. No comment reference by default; ?reference=on, from
  // the tray, shows it in the panel, as the team may need it later.
  router.get(`${base}/application/:applicationId/comment-sent`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    const referenceShown = req.query.reference === 'on';
    delete req.session.data.reference;
    renderComment(req, res, 'comment-sent', application, { commentSentPage: true, referenceShown });
  });

  // The link has expired (from the tray). The comment has not been sent.
  router.get(`${base}/application/:applicationId/link-expired`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'link-expired', application);
  });

  // The consultation closed before the link was opened (from the tray). The
  // comment has not been sent and cannot be.
  router.get(`${base}/application/:applicationId/consultation-closed`, function (req, res) {
    const application = findApplication(req, res);
    if (!application) return;
    renderComment(req, res, 'consultation-closed', application);
  });

  // The comment emails, as the commenter would see them in their inbox
  function renderCommentEmail(req, res, page, extra) {
    const application = findApplication(req, res);
    if (!application) return;
    // The first and last initials of their name, for the mailbox avatar
    const { keys, answers } = commentAnswers(req, application.id);
    const names = String(answers.name || '').trim().split(/\s+/).filter(Boolean);
    const mailInitials = names.length ? (names[0][0] + (names.length > 1 ? names[names.length - 1][0] : '')).toUpperCase() : '';
    res.render(`versions/${version}/${section}/emails/${page}`, Object.assign({ application, keys, answers, mailInitials }, extra));
  }

  // The email with the link to confirm the comment
  router.get(`${base}/application/:applicationId/confirmation-email`, function (req, res) {
    renderCommentEmail(req, res, 'comment-confirmation');
  });

  // The email once the comment has been sent. In both versions, linked
  // from comment sent. No comment reference by default; it follows the
  // tray choice on comment sent, which passes ?reference=on.
  router.get(`${base}/application/:applicationId/received-email`, function (req, res) {
    const referenceShown = req.query.reference === 'on';
    delete req.session.data.reference;
    renderCommentEmail(req, res, 'comment-received', { referenceShown });
  });

  // Email alerts (phase 4)
  require('./public-register-v1-alerts.js')(router, {
    version, section, base, ALL, MARINE_PLAN_AREAS, ACTIVITY_GROUPS, ACTIVITY_GROUP, dynamicBackLink, list
  });

  // The register's home is the GOV.UK start page
  router.get(base, function (req, res) {
    res.redirect(`${base}/start`);
  });
};
