module.exports = function (router) {
  // Consultation v1 steel thread routes
  //
  // A bare-bones end-to-end journey for a consultee organisation (we are
  // pretending to be Natural England): consultation dashboard, request
  // details, respond, and a read-only view of the application. Pages are
  // deliberately template-level so developers can build the foundations
  // while the detailed designs are worked on separately.
  const version = "multiple-sites-v2";
  const section = "consultation-v1";
  const base = `/versions/${version}/${section}`;

  // Seeded consultation requests. Two types:
  //   response-required - MMO is asking the consultee for advice
  //   notify-only       - MMO is letting the consultee know; responding is optional
  //
  // Dates are day offsets from today, run through the daysFromToday filter.
  const REQUESTS = {
    'dawlish': {
      id: 'dawlish',
      applicationName: 'Dawlish sea defence extension',
      reference: 'MLA/2026/10020',
      applicant: 'Southwest Marine Works Ltd',
      type: 'response-required',
      receivedOffset: -3,
      respondByOffset: 18,
      caseworker: 'Alex Morgan, Marine Licensing Case Officer',
      requestText: 'Please review the proposed rock placement and advise whether it is likely to have a significant effect on the nearby Dawlish Warren Special Area of Conservation. We would also welcome any advice on timing restrictions to protect overwintering birds.',
      summary: 'Extension of the existing rock armour sea defence at Dawlish to reduce wave overtopping onto the railway and promenade. Works include placement of approximately 4,000 tonnes of rock below mean high water springs.',
      startAndEndDates: 'April 2026 to September 2027',
      siteLocation: 'Dawlish, Devon'
    },
    'lyme-regis': {
      id: 'lyme-regis',
      applicationName: 'Installation of floating pontoon, Lyme Regis Harbour, Dorset',
      reference: 'MLA/2026/10003',
      applicant: 'Lyme Regis Watersports Ltd',
      type: 'notify-only',
      receivedOffset: -1,
      respondByOffset: 27,
      caseworker: 'Alex Morgan, Marine Licensing Case Officer',
      requestText: 'We are letting you know about this application as the site is near the Lyme Bay and Torbay Special Area of Conservation. We do not need a response, but you can send us comments if you have any.',
      summary: 'Installation of a small floating pontoon within Lyme Regis Harbour, attached to the existing harbour wall using H-frame wall guides and a short hinged gangway, to provide a safe launching and landing platform for paddleboards and kayaks.',
      startAndEndDates: 'June 2026 to June 2027',
      siteLocation: 'Lyme Regis Harbour, Dorset'
    }
  };

  // Each request's status lives in the session as consultation-<id>-status so
  // it can be seen and changed through View data like any other key.
  function statusFor(req, request) {
    const key = `consultation-${request.id}-status`;
    if (!req.session.data[key]) {
      req.session.data[key] = request.type === 'response-required' ? 'Response needed' : 'No response needed';
    }
    return req.session.data[key];
  }

  function withStatus(req, request) {
    return Object.assign({}, request, {
      status: statusFor(req, request),
      response: req.session.data[`consultation-${request.id}-response`]
    });
  }

  function findRequest(req, res) {
    const request = REQUESTS[req.params.requestId];
    if (!request) {
      res.redirect(`${base}/consultations`);
      return null;
    }
    return withStatus(req, request);
  }

  // Consultation dashboard
  router.get(`${base}/consultations`, function (req, res) {
    const requests = Object.values(REQUESTS).map(r => withStatus(req, r));

    // Flash the success banner once, after a response is submitted
    const justResponded = req.session.data['consultation-just-responded'];
    delete req.session.data['consultation-just-responded'];

    res.render(`versions/${version}/${section}/consultations`, {
      requests,
      justResponded: justResponded ? REQUESTS[justResponded] : null
    });
  });

  // Request details
  router.get(`${base}/request-details/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    res.render(`versions/${version}/${section}/request-details`, { request });
  });

  // View application (read-only, like view details in LCML v4)
  router.get(`${base}/view-application/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    res.render(`versions/${version}/${section}/view-application`, { request });
  });

  // Respond
  router.get(`${base}/respond/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    res.render(`versions/${version}/${section}/respond`, { request });
  });

  router.post(`${base}/respond/:requestId-router`, function (req, res) {
    const request = REQUESTS[req.params.requestId];
    if (!request) return res.redirect(`${base}/consultations`);

    const response = (req.session.data['consultation-response-text'] || '').trim();
    delete req.session.data['consultation-response-text'];

    if (!response) {
      return res.render(`versions/${version}/${section}/respond`, {
        request: withStatus(req, request),
        error: 'Enter your response'
      });
    }

    req.session.data[`consultation-${request.id}-response`] = response;
    req.session.data[`consultation-${request.id}-status`] = 'Responded';
    req.session.data['consultation-just-responded'] = request.id;
    res.redirect(`${base}/consultations`);
  });
};
