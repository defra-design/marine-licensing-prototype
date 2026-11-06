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
// - Marine plan areas, and optionally top-level types of activity. No types
//   means every type. Any chosen area or type is enough to match.
// - Each alert email has that alert's own manage link and a separate
//   unsubscribe link. Manage shows that alert only.
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
  // Set by Send the email again, for the success banner, shown once
  const RESENT = 'public-register-v1-alert-resent';
  // The address typed on Email me a manage link
  const MANAGE_EMAIL = 'public-register-v1-alert-manage-email';

  // Inshore and Offshore, for the grouped areas page
  const AREA_GROUPS = ['Inshore', 'Offshore'].map(heading => ({
    heading,
    areas: MARINE_PLAN_AREAS.filter(area => area.endsWith(heading))
  }));
  // Construction, Deposit and Removal, each with a hint in plain words, as
  // people may not know the terms. More will come with non-LCML
  // applications, such as dredging and disposal at sea.
  const TYPE_HINTS = {
    construction: 'Building, maintaining or changing structures, such as jetties, slipways or sea walls',
    deposit: 'Putting objects or materials in the sea, or on or under the seabed, such as moorings or rock',
    removal: 'Taking objects or materials from the seabed'
  };
  const TYPE_OPTIONS = ACTIVITY_GROUPS.map(group => ({ value: group.value, text: group.heading, hint: TYPE_HINTS[group.value] }));

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

  // What an alert covers, as the pages and emails say it
  function describe(alert) {
    return {
      areas: MARINE_PLAN_AREAS.filter(area => alert.areas.includes(area)),
      types: alert.types.length ? TYPE_OPTIONS.filter(o => alert.types.includes(o.value)).map(o => o.text) : null,
      typesText: alert.types.length
        ? TYPE_OPTIONS.filter(o => alert.types.includes(o.value)).map(o => o.text).join(', ')
        : 'All types of activity',
      email: alert.email
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

  // Areas page version, from the tray: one list by default, as in the
  // list filter, or grouped under Inshore and Offshore with
  // ?areas=grouped. A hidden field carries it through the form.
  function areasList(req) {
    return !(req.query.areas === 'grouped' || req.body?.areas === 'grouped');
  }

  // Validation, shared by signing up and changing a saved alert
  function areasError(areas) {
    return areas.length ? null : 'Select at least one marine plan area';
  }
  // The types page is one set of checkboxes: the types, or All types of
  // activity (exclusive). No types saved means all.
  function readTypes(value) {
    const values = list(value);
    if (values.includes('all')) return { scope: 'all', types: [] };
    const types = cleanTypes(values);
    return types.length ? { scope: 'some', types } : { scope: null, types: [] };
  }
  function typesError(scope) {
    return scope ? null : 'Select the types of activity you want alerts for, or select all types of activity';
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

  // Start now: clears the answers from any earlier sign-up, so each
  // sign-up starts empty. Saved alerts, pending or not, are kept. Only the
  // start button does this, so Back and the change links keep the answers.
  router.get(`${alertsBase}/start-new`, function (req, res) {
    Object.values(DRAFT).forEach(key => { delete req.session.data[key]; });
    delete req.session.data[RESENT];
    res.redirect(`${alertsBase}/areas`);
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
    const scope = 'scope' in extra ? extra.scope : req.session.data[DRAFT.scope];
    res.render(view('types'), Object.assign({
      typeOptions: TYPE_OPTIONS,
      fieldName: DRAFT.types,
      selected: cleanTypes(req.session.data[DRAFT.types]),
      backLink: req.query.change || req.body.change ? 'check-answers' : 'areas'
    }, extra, { allTypes: scope === 'all' }));
  }

  router.get(`${alertsBase}/types`, function (req, res) {
    renderTypes(req, res, { change: req.query.change });
  });

  router.post(`${alertsBase}/types`, function (req, res) {
    const { scope, types } = readTypes(req.body[DRAFT.types]);
    const error = typesError(scope);
    req.session.data[DRAFT.scope] = scope;
    req.session.data[DRAFT.types] = types;
    if (error) return renderTypes(req, res, { change: req.body.change, error, scope, selected: types });
    res.redirect(afterSave(req, 'email-address'));
  });

  // ?fix=1 is from "check the email address you gave us" on check your
  // email. The address is filled in so a typo is easy to spot, and saving
  // sends the email again to the corrected address and goes straight back
  // to check your email, without check your answers.
  function renderEmail(req, res, extra) {
    const fix = req.query.fix || req.body.fix;
    res.render(view('email-address'), Object.assign({
      fieldName: DRAFT.email,
      value: req.session.data[DRAFT.email],
      fix,
      backLink: fix ? 'check-your-email' : req.query.change || req.body.change ? 'check-answers' : 'types'
    }, extra));
  }

  router.get(`${alertsBase}/email-address`, function (req, res) {
    delete req.session.data.fix;
    renderEmail(req, res, { change: req.query.change });
  });

  // Only checked for being empty, as with commenting, so participants can
  // type anything
  router.post(`${alertsBase}/email-address`, function (req, res) {
    delete req.session.data.fix;
    if (!String(req.body[DRAFT.email] || '').trim()) {
      return renderEmail(req, res, { change: req.body.change, error: 'Enter an email address' });
    }
    if (req.body.fix) {
      const alert = alertsIn(req).find(a => a.id === req.session.data[DRAFT.alertId] && a.status === 'pending');
      if (alert) {
        alert.email = String(req.body[DRAFT.email]).trim();
        req.session.data[RESENT] = true;
        return res.redirect('check-your-email');
      }
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
    const resent = req.session.data[RESENT];
    delete req.session.data[RESENT];
    res.render(view('check-your-email'), { alert, resent });
  });

  // Send the email again (GOV.UK Design System, Confirm an email address:
  // let people resend it), as on the comment journey. From check your email
  // and the expired link page. In the real service a new link replaces the
  // old one. Only for an alert that has not been confirmed yet.
  router.get(`${alertsBase}/:alertId/resend-email`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    if (alert.status !== 'pending') return res.redirect('set-up');
    req.session.data[DRAFT.alertId] = alert.id;
    req.session.data[RESENT] = true;
    res.redirect(`${alertsBase}/check-your-email`);
  });

  // The confirm link in the email. The alert starts, and the answers are
  // cleared so the next sign-up starts empty.
  //
  // Links can only be used once (Confirm an email address), so opening it
  // again says the alert is already set up. For an alert that has since
  // been unsubscribed, the link no longer works. The prototype cannot time
  // out, so the tray opens it as if it had expired (?alertlink=expired),
  // which does not start the alert.
  router.get(`${alertsBase}/:alertId/confirm`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    const linkState = req.query.alertlink;
    delete req.session.data.alertlink;
    if (alert.status === 'unsubscribed' || (alert.status === 'pending' && linkState === 'expired')) {
      return res.redirect('link-expired');
    }
    if (alert.status === 'active') return res.redirect('set-up?already=1');
    alert.status = 'active';
    if (req.session.data[DRAFT.alertId] === alert.id) {
      Object.values(DRAFT).forEach(key => { delete req.session.data[key]; });
    }
    res.redirect('set-up');
  });

  router.get(`${alertsBase}/:alertId/set-up`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    if (alert.status === 'pending') return res.redirect(`${alertsBase}/check-your-email`);
    res.render(view('set-up'), { alert, summary: describe(alert), already: req.query.already });
  });

  // The confirm link has expired (from the tray), or the alert was
  // unsubscribed before it was opened again. The alert has not started.
  router.get(`${alertsBase}/:alertId/link-expired`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    res.render(view('link-expired'), { alert, summary: describe(alert) });
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
      fieldName: EDIT.types,
      scope: alert.types.length ? 'some' : 'all',
      selected: alert.types,
      backLink: 'manage'
    });
  });

  router.post(`${alertsBase}/:alertId/types`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    const { scope, types } = readTypes(req.body[EDIT.types]);
    const error = typesError(scope);
    if (error) return renderTypes(req, res, { alert, fieldName: EDIT.types, error, scope, selected: types, backLink: 'manage' });
    alert.types = types;
    res.redirect('manage?saved=1');
  });

  // Unsubscribe, from the separate link in each alert email or the manage
  // page. Stops this alert only. A confirm page by default; with
  // ?unsubscribe=oneclick (from the tray) the link stops it straight away.
  router.get(`${alertsBase}/:alertId/unsubscribe`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    // Opened again after unsubscribing, from either version of the link
    if (alert.status === 'unsubscribed') {
      return res.redirect('already-unsubscribed' + (req.query.unsubscribe === 'oneclick' ? '?unsubscribe=oneclick' : ''));
    }
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

  // The unsubscribe link opened again after the alert was stopped
  router.get(`${alertsBase}/:alertId/already-unsubscribed`, function (req, res) {
    const alert = findAlert(req);
    if (!alert) return res.redirect(alertsBase);
    if (alert.status !== 'unsubscribed') return res.redirect('manage');
    res.render(view('already-unsubscribed'), {
      alert,
      summary: describe(alert),
      unsubscribePage: true,
      unsubscribeOneClick: req.query.unsubscribe === 'oneclick'
    });
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

  // The address is only filled in when they come back to check it
  // (?fix=1, from manage link sent). Otherwise the box is empty, as a real
  // service would not remember it between visits.
  function renderGetLink(req, res, extra) {
    res.render(view('get-manage-link'), Object.assign({
      fieldName: MANAGE_EMAIL,
      value: req.query.fix ? req.session.data[MANAGE_EMAIL] : '',
      backLink: dynamicBackLink(req, 'get-manage-link', [`${alertsBase}/manage-link-sent`])
    }, extra));
  }

  router.get(`${alertsBase}/get-manage-link`, function (req, res) {
    delete req.session.data.fix;
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
