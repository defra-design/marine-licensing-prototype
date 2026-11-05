// Email alerts on the public register v1 (phase 4).
// Not a route file on its own – required by public-register-v1.js, which
// passes in what it shares.
//
// From the design ticket "Sign up for alerts from the Public Register" and
// ADR-8 "Public register alerts use a logged-out journey":
// - No sign-in. People give an email address, which may be a shared inbox.
// - The alert is pending, and gets no alerts, until the link in the
//   confirmation email is opened. One click, no code.
// - Each sign-up is its own alert. One address can have many, and signing
//   up again adds another without touching the rest.
// - Marine plan areas, and optionally top-level types of work. No types
//   means every type. Any chosen area or type is enough to match.
// - Each alert email has that alert's own manage link and a separate
//   unsubscribe link. Manage shows that alert only, with the address masked.
// - "Email me a manage link" always gives the same answer, whether or not
//   we hold the address.
// Alerts are sent only when a new application is first published here.
// Tom agreed no frequency question and new applications only.
//
// The prototype keeps the alerts in the session, under
// public-register-v1-alerts, as a list of
//   { id, email, areas, types, status }
// where types is empty for every type of work, and status is pending,
// active or unsubscribed. The emails are shown as pages.

module.exports = function (router, shared) {
  const { version, section, base, ALL, MARINE_PLAN_AREAS, ACTIVITY_GROUPS, ACTIVITY_GROUP, dynamicBackLink, list } = shared;
  const alertsBase = `${base}/alerts`;
  const view = page => `versions/${version}/${section}/alerts/${page}`;

  // The answers while signing up, as the kit stores them from the forms.
  // Changing a saved alert from its manage page uses the edit ones, so it
  // never mixes with a sign-up in progress.
  const DRAFT = {
    areas: 'public-register-v1-alert-areas',
    scope: 'public-register-v1-alert-scope',
    types: 'public-register-v1-alert-types',
    email: 'public-register-v1-alert-email',
    // The pending alert made from these answers, so going back from check
    // your email and setting it up again updates it rather than adding
    // another
    alertId: 'public-register-v1-alert-draft-id'
  };
  const EDIT = {
    areas: 'public-register-v1-alert-edit-areas',
    scope: 'public-register-v1-alert-edit-scope',
    types: 'public-register-v1-alert-edit-types'
  };
  // The address typed on Email me a manage link
  const MANAGE_EMAIL = 'public-register-v1-alert-manage-email';

  // Inshore and Offshore, for the grouped areas page
  const AREA_GROUPS = ['Inshore', 'Offshore'].map(heading => ({
    heading,
    areas: MARINE_PLAN_AREAS.filter(area => area.endsWith(heading))
  }));
  // Construction, Deposit and Removal
  const TYPE_OPTIONS = ACTIVITY_GROUPS.map(group => ({ value: group.value, text: group.heading }));

  function alertsIn(req) {
    if (!Array.isArray(req.session.data['public-register-v1-alerts'])) {
      req.session.data['public-register-v1-alerts'] = [];
    }
    return req.session.data['public-register-v1-alerts'];
  }

  function findAlert(req) {
    return alertsIn(req).find(alert => alert.id === req.params.alertId);
  }

  function sameAddress(a, b) {
    return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
  }

  // a•••@harbour.uk. Manage pages never show the full address (ADR-8).
  // Participants can type anything, so an address without an @ is just
  // its first letter.
  function maskEmail(email) {
    const value = String(email || '').trim();
    const at = value.indexOf('@');
    return at > 0 ? `${value[0]}•••${value.slice(at)}` : `${value[0] || ''}•••`;
  }

  // What an alert covers, as the pages and emails say it
  function describe(alert) {
    return {
      areas: MARINE_PLAN_AREAS.filter(area => alert.areas.includes(area)),
      types: alert.types.length ? TYPE_OPTIONS.filter(o => alert.types.includes(o.value)).map(o => o.text) : null,
      typesText: alert.types.length
        ? TYPE_OPTIONS.filter(o => alert.types.includes(o.value)).map(o => o.text).join(', ')
        : 'All types of work',
      maskedEmail: maskEmail(alert.email)
    };
  }

  // Any chosen area, and any chosen type (or every type) is a match
  function matches(alert, application) {
    if (!alert.areas.some(area => application.marinePlanAreas.includes(area))) return false;
    if (!alert.types.length) return true;
    return alert.types.some(type => ACTIVITY_GROUP[type].options.some(option => application.activities.includes(option.value)));
  }

  function newId() {
    const characters = 'abcdefghjkmnpqrstuvwxyz23456789';
    return Array.from({ length: 8 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  }

  // For the email avatar: the first letter of the address
  function initialFor(email) {
    return String(email || '').trim().charAt(0).toUpperCase();
  }

  // Areas page version, from the tray: grouped under Inshore and Offshore
  // by default, or one list with ?areas=list. A hidden field carries it
  // through the form.
  function areasList(req) {
    return req.query.areas === 'list' || req.body?.areas === 'list';
  }

  // Validation, shared by signing up and changing a saved alert
  function areasError(areas) {
    return areas.length ? null : 'Select at least one marine plan area';
  }
  function typesErrors(scope, types) {
    if (!scope) return { scope: 'Select all types of work or only some types' };
    if (scope === 'some' && !types.length) return { types: 'Select at least one type of work' };
    return null;
  }
  function cleanAreas(value) {
    return list(value).filter(area => MARINE_PLAN_AREAS.includes(area));
  }
  function cleanTypes(value) {
    return list(value).filter(type => ACTIVITY_GROUP[type]);
  }

  // Pages with a change link from check your answers go back there
  function afterSave(req, next) {
    return req.query.change || req.body.change ? 'check-answers' : next;
  }

  // ---------------------------------------------------------------------
  // Signing up
  // ---------------------------------------------------------------------

  // Get email alerts. Reached from the navigation, the landing page and
  // the comment sent page, so Back goes wherever they came from.
  router.get(alertsBase, function (req, res) {
    res.render(view('start'), {
      backLink: dynamicBackLink(req, 'alerts', [`${alertsBase}/`])
    });
  });

  function renderAreas(req, res, extra) {
    const selected = extra.selected || cleanAreas(req.session.data[DRAFT.areas]);
    res.render(view('areas'), Object.assign({
      areaGroups: AREA_GROUPS,
      allAreas: MARINE_PLAN_AREAS,
      areasList: areasList(req),
      fieldName: DRAFT.areas,
      selected,
      backLink: req.query.change || req.body.change ? 'check-answers' : alertsBase
    }, extra));
  }

  router.get(`${alertsBase}/areas`, function (req, res) {
    renderAreas(req, res, { change: req.query.change });
  });

  router.post(`${alertsBase}/areas`, function (req, res) {
    const areas = cleanAreas(req.body[DRAFT.areas]);
    const error = areasError(areas);
    if (error) return renderAreas(req, res, { change: req.body.change, error, selected: areas });
    res.redirect(afterSave(req, 'types'));
  });

  function renderTypes(req, res, extra) {
    res.render(view('types'), Object.assign({
      typeOptions: TYPE_OPTIONS,
      fields: DRAFT,
      scope: req.session.data[DRAFT.scope],
      selected: cleanTypes(req.session.data[DRAFT.types]),
      backLink: req.query.change || req.body.change ? 'check-answers' : 'areas'
    }, extra));
  }

  router.get(`${alertsBase}/types`, function (req, res) {
    renderTypes(req, res, { change: req.query.change });
  });

  router.post(`${alertsBase}/types`, function (req, res) {
    const scope = req.body[DRAFT.scope];
    const types = cleanTypes(req.body[DRAFT.types]);
    const errors = typesErrors(scope, types);
    if (errors) return renderTypes(req, res, { change: req.body.change, errors, scope, selected: types });
    res.redirect(afterSave(req, 'email-address'));
  });

  function renderEmail(req, res, extra) {
    res.render(view('email-address'), Object.assign({
      fieldName: DRAFT.email,
      value: req.session.data[DRAFT.email],
      backLink: req.query.change || req.body.change ? 'check-answers' : 'types'
    }, extra));
  }

  router.get(`${alertsBase}/email-address`, function (req, res) {
    renderEmail(req, res, { change: req.query.change });
  });

  // Only checked for being empty, as with commenting, so participants can
  // type anything
  router.post(`${alertsBase}/email-address`, function (req, res) {
    if (!String(req.body[DRAFT.email] || '').trim()) {
      return renderEmail(req, res, { change: req.body.change, error: 'Enter an email address' });
    }
    res.redirect('check-answers');
  });

  // The alert the answers so far would make
  function draftAlert(req) {
    const data = req.session.data;
    return {
      email: String(data[DRAFT.email] || '').trim(),
      areas: cleanAreas(data[DRAFT.areas]),
      types: data[DRAFT.scope] === 'some' ? cleanTypes(data[DRAFT.types]) : []
    };
  }

  router.get(`${alertsBase}/check-answers`, function (req, res) {
    const draft = draftAlert(req);
    if (!draft.areas.length) return res.redirect('areas');
    res.render(view('check-answers'), { draft, summary: describe(draft) });
  });

  // Set up alert: makes a pending alert and emails the confirm link. Done
  // again (after going back), it updates the same pending alert.
  router.post(`${alertsBase}/check-answers`, function (req, res) {
    const draft = draftAlert(req);
    if (!draft.areas.length) return res.redirect('areas');
    const alerts = alertsIn(req);
    let alert = alerts.find(a => a.id === req.session.data[DRAFT.alertId] && a.status === 'pending');
    if (!alert) {
      alert = { id: newId(), status: 'pending' };
      alerts.push(alert);
      req.session.data[DRAFT.alertId] = alert.id;
    }
    Object.assign(alert, draft);
    res.redirect('check-your-email');
  });

  router.get(`${alertsBase}/check-your-email`, function (req, res) {
    const alert = alertsIn(req).find(a => a.id === req.session.data[DRAFT.alertId]);
    if (!alert) return res.redirect(alertsBase);
    res.render(view('check-your-email'), { alert });
  });

  // The confirm link in the email. The alert starts, and the answers are
  // cleared so the next sign-up starts empty. Opening it again does no harm.
  router.get(`${alertsBase}/:alertId/confirm`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    if (alert.status === 'pending') alert.status = 'active';
    if (req.session.data[DRAFT.alertId] === alert.id) {
      Object.values(DRAFT).forEach(key => { delete req.session.data[key]; });
    }
    res.redirect('set-up');
  });

  router.get(`${alertsBase}/:alertId/set-up`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    res.render(view('set-up'), { alert, summary: describe(alert) });
  });

  // ---------------------------------------------------------------------
  // Managing one alert, from the link in its emails
  // ---------------------------------------------------------------------

  // Manage your alert. Usually opened from an email, so no back link,
  // unless they came from another register page.
  router.get(`${alertsBase}/:alertId/manage`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    if (alert.status === 'unsubscribed') return res.redirect('unsubscribed');
    res.render(view('manage'), {
      alert,
      summary: describe(alert),
      saved: req.query.saved,
      backLink: dynamicBackLink(req, `manage-${alert.id}`, [`${alertsBase}/${alert.id}/`])
    });
  });

  // Change the areas of a saved alert. The same page as signing up, filled
  // in from the alert, and saving goes straight back to manage.
  router.get(`${alertsBase}/:alertId/areas`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    renderAreas(req, res, { alert, fieldName: EDIT.areas, selected: alert.areas, backLink: 'manage' });
  });

  router.post(`${alertsBase}/:alertId/areas`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    const areas = cleanAreas(req.body[EDIT.areas]);
    const error = areasError(areas);
    if (error) return renderAreas(req, res, { alert, fieldName: EDIT.areas, selected: areas, error, backLink: 'manage' });
    alert.areas = areas;
    res.redirect('manage?saved=1');
  });

  router.get(`${alertsBase}/:alertId/types`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    renderTypes(req, res, {
      alert,
      fields: EDIT,
      scope: alert.types.length ? 'some' : 'all',
      selected: alert.types,
      backLink: 'manage'
    });
  });

  router.post(`${alertsBase}/:alertId/types`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    const scope = req.body[EDIT.scope];
    const types = cleanTypes(req.body[EDIT.types]);
    const errors = typesErrors(scope, types);
    if (errors) return renderTypes(req, res, { alert, fields: EDIT, errors, scope, selected: types, backLink: 'manage' });
    alert.types = scope === 'some' ? types : [];
    res.redirect('manage?saved=1');
  });

  // Unsubscribe, from the separate link in each alert email or the manage
  // page. Stops this alert only. A confirm page by default; with
  // ?unsubscribe=oneclick (from the tray) the link stops it straight away.
  router.get(`${alertsBase}/:alertId/unsubscribe`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    if (req.query.unsubscribe === 'oneclick') {
      alert.status = 'unsubscribed';
      return res.redirect('unsubscribed?unsubscribe=oneclick');
    }
    res.render(view('unsubscribe'), {
      alert,
      summary: describe(alert),
      unsubscribePage: true,
      backLink: dynamicBackLink(req, `unsubscribe-${alert.id}`)
    });
  });

  router.post(`${alertsBase}/:alertId/unsubscribe`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    alert.status = 'unsubscribed';
    res.redirect('unsubscribed');
  });

  router.get(`${alertsBase}/:alertId/unsubscribed`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    res.render(view('unsubscribed'), {
      alert,
      unsubscribePage: true,
      unsubscribeOneClick: req.query.unsubscribe === 'oneclick'
    });
  });

  // ---------------------------------------------------------------------
  // Email me a manage link
  // ---------------------------------------------------------------------

  function renderGetLink(req, res, extra) {
    res.render(view('get-manage-link'), Object.assign({
      fieldName: MANAGE_EMAIL,
      value: req.session.data[MANAGE_EMAIL],
      backLink: dynamicBackLink(req, 'get-manage-link', [`${alertsBase}/manage-link-sent`])
    }, extra));
  }

  router.get(`${alertsBase}/get-manage-link`, function (req, res) {
    renderGetLink(req, res, {});
  });

  router.post(`${alertsBase}/get-manage-link`, function (req, res) {
    if (!String(req.body[MANAGE_EMAIL] || '').trim()) {
      return renderGetLink(req, res, { error: 'Enter an email address' });
    }
    res.redirect('manage-link-sent');
  });

  function activeAlertsFor(req, email) {
    return alertsIn(req).filter(alert => alert.status === 'active' && sameAddress(alert.email, email));
  }

  // The same words whether or not we hold the address. Only the link to
  // the email, which is there for demos, depends on it: if we hold no
  // alerts for it, no email is sent.
  router.get(`${alertsBase}/manage-link-sent`, function (req, res) {
    const email = String(req.session.data[MANAGE_EMAIL] || '').trim();
    if (!email) return res.redirect('get-manage-link');
    res.render(view('manage-link-sent'), { email, emailSent: activeAlertsFor(req, email).length > 0 });
  });

  // ---------------------------------------------------------------------
  // The emails, as the person would see them in their inbox
  // ---------------------------------------------------------------------

  router.get(`${alertsBase}/:alertId/confirmation-email`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    res.render(view('emails/confirmation-email'), {
      alert, summary: describe(alert), mailInitials: initialFor(alert.email)
    });
  });

  // An alert email for a new application. Shows the most recently
  // published application that matches. If none of the 12 do, it shows the
  // most recent one with a prototype note, so the email can still be seen.
  router.get(`${alertsBase}/:alertId/alert-email`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    const newest = ALL.slice().sort((a, b) => b.publishedOffset - a.publishedOffset);
    const match = newest.find(application => matches(alert, application));
    res.render(view('emails/alert-email'), {
      alert,
      summary: describe(alert),
      application: match || newest[0],
      noMatch: !match,
      // The unsubscribe link goes straight through with the one click
      // version, from the tray
      unsubscribeOneClick: req.query.unsubscribe === 'oneclick',
      mailInitials: initialFor(alert.email)
    });
  });

  // One email listing each active alert for the address, with its own
  // manage link
  router.get(`${alertsBase}/manage-links-email`, function (req, res) {
    const email = String(req.session.data[MANAGE_EMAIL] || '').trim();
    const alerts = activeAlertsFor(req, email);
    if (!alerts.length) return res.redirect('manage-link-sent');
    res.render(view('emails/manage-links-email'), {
      email,
      alerts: alerts.map(alert => Object.assign({ alert }, describe(alert))),
      mailInitials: initialFor(email)
    });
  });
};
