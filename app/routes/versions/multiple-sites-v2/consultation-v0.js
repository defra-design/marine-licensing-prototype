module.exports = function (router) {
  // Consultation v0 steel thread routes
  //
  // A bare-bones end-to-end journey for a consultee organisation (we are
  // pretending to be Natural England): consultation dashboard, request
  // details, respond, and a read-only view of the application. Pages are
  // deliberately template-level so developers can build the foundations
  // while the detailed designs are worked on separately.
  const version = "multiple-sites-v2";
  const section = "consultation-v0";
  const base = `/versions/${version}/${section}`;

  // Seeded consultation requests. Two types:
  //   response-required - MMO is asking the consultee for advice
  //   notify-only       - MMO is letting the consultee know; responding is optional
  //
  // Dates are day offsets from today, run through the daysFromTodayShort filter.
  // Applicants match the LCML v4 view-details pages. The Dawlish summary is
  // made up for this steel thread, as LCML v4 only has pontoon text for it.
  const REQUESTS = {
    'dawlish': {
      id: 'dawlish',
      applicationName: 'Dawlish sea defence extension',
      reference: 'MLA/2026/10020',
      applicant: 'Southwest Marine Works Ltd',
      type: 'response-required',
      // The case officer's request, as plain-text paragraphs from MAS (no
      // bullets or other formatting). Made up for this steel thread.
      adviceRequested: [
        'We would like your advice on whether the proposal is consistent with the following South marine plan policies.',
        'South Biodiversity 1 (S-BIO-1): whether the works are likely to have a significant adverse effect on Dawlish Warren Special Area of Conservation or the Exe Estuary Special Protection Area, and any measures needed to avoid, minimise or mitigate this.',
        'South Climate change 3 (S-CC-3): whether the works are likely to have a significant adverse impact on coastal change, including sediment supply to Dawlish Warren.',
        'South Seascape and landscape 1 (S-SCP-1): whether the rock armour and new wall would have a significant adverse effect on the seascape of the area.',
        'Tell us about any timing restrictions you would recommend to protect overwintering birds.'
      ],
      receivedOffset: -3,
      respondByOffset: 18,
      summary: 'We are applying for a marine licence to extend the existing sea defence at Dawlish by approximately 150 metres to the east. The extension will reduce wave overtopping onto the railway line and promenade during winter storms. The works involve placing rock armour along the toe of the existing sea wall and building a new concrete wave return wall on top of it. Rock will be delivered by barge and placed by a long-reach excavator working from the beach at low tide. Works are planned outside the main bird overwintering period and will take about 6 months to complete.',
      startAndEndDates: 'April 2026 to September 2027',
      // Site and activity cards for view-application, made up to match the
      // sea defence summary.
      site: {
        name: 'Dawlish sea wall eastern extension',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Hard coastal defence structures such as rock armour or concrete units',
        activityDescription: 'Extension of the existing sea defence by approximately 150 metres to the east. Rock armour will be placed along the toe of the existing sea wall on a geotextile and bedding stone layer, below mean high water springs. A new concrete wave return wall will be cast in situ on top of the existing wall. Rock will be delivered by barge and placed by a long-reach excavator working from the beach at low tide.',
        maximumDuration: '6 months',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'Yes – works to be carried out between April and September only, outside the main bird overwintering period.',
        workingHours: 'Monday to Friday, 07:30 to 18:00, with some working outside these hours to take advantage of low tides.',
        drawing: 'sea-defence-construction-drawing.pdf'
      },
      siteLocation: 'Dawlish, Devon'
    },
    'lyme-regis': {
      id: 'lyme-regis',
      applicationName: 'Installation of floating pontoon, Lyme Regis Harbour, Dorset',
      reference: 'MLA/2026/10003',
      applicant: 'Jurassic Coast SUP Ltd',
      type: 'notify-only',
      receivedOffset: -1,
      respondByOffset: 27,
      summary: 'Jurassic Coast SUP Ltd is a small paddleboarding hire and instruction business operating in Lyme Regis. We are applying for a marine licence to install a small floating pontoon within Lyme Regis Harbour to provide a safe and accessible launching and landing platform for paddleboards and kayaks hired to our customers. At present customers are required to enter the water via the main harbour slipway which is shared with commercial fishing vessels and other harbour traffic. During the summer months this creates significant health and safety concerns particularly for inexperienced users and those with limited mobility. The pontoon would be attached to the existing harbour wall using H-frame wall guides and a short hinged gangway. It will be a floating structure rising and falling with the tide. The works will take place entirely within the outer harbour area.',
      startAndEndDates: 'June 2026 to June 2027',
      // Site and activity cards for view-application, copied from the LCML v4
      // pontoon view-details page.
      site: {
        name: 'Lyme Regis Harbour Outer Pontoon',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Pontoons or floating walkways',
        activityDescription: 'Installation of one floating pontoon unit measuring 8 metres in length by 4 metres in width (total area 32 m²). The pontoon will be manufactured off-site from HDPE modular float units set within a hot-dip galvanised steel frame with non-slip GRP mesh decking panels. The pontoon will be fixed to the existing harbour wall using two H-frame steel wall guide rails drilled and resin-anchored to the masonry. No piling or seabed penetration is required. Access to the pontoon from the quayside will be via a 4m hinged aluminium gangway. All works will be carried out from the quayside or using a small harbour workboat. No heavy plant or craneage is anticipated, individual pontoon components can be handled manually or with light lifting equipment.',
        maximumDuration: '6 weeks',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'Yes — installation works to be carried out between April and September only, avoiding the winter months when harbour conditions make marine works impracticable and harbour traffic is at its lowest.',
        workingHours: 'Monday to Friday, 08:00 to 17:00. Occasional Saturday morning working may be required to take advantage of suitable tidal windows.',
        drawing: 'pontoon-construction-drawing.pdf'
      },
      siteLocation: 'Lyme Regis Harbour, Dorset'
    }
  };

  // Each request's status lives in the session as consultation-v0-<id>-status so
  // it can be seen and changed through View data like any other key.
  function statusFor(req, request) {
    const key = `consultation-v0-${request.id}-status`;
    if (!req.session.data[key]) {
      req.session.data[key] = request.type === 'response-required' ? 'Response needed' : 'No response needed';
    }
    return req.session.data[key];
  }

  function withStatus(req, request) {
    return Object.assign({}, request, {
      status: statusFor(req, request),
      response: req.session.data[`consultation-v0-${request.id}-response`],
      respondedDate: req.session.data[`consultation-v0-${request.id}-responded-date`]
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
    const justResponded = req.session.data['consultation-v0-just-responded'];
    delete req.session.data['consultation-v0-just-responded'];

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

    const response = (req.session.data['consultation-v0-response-text'] || '').trim();
    delete req.session.data['consultation-v0-response-text'];

    if (!response) {
      return res.render(`versions/${version}/${section}/respond`, {
        request: withStatus(req, request),
        error: 'Enter your response'
      });
    }

    req.session.data[`consultation-v0-${request.id}-response`] = response;
    req.session.data[`consultation-v0-${request.id}-status`] = 'Responded';
    req.session.data[`consultation-v0-${request.id}-responded-date`] = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    req.session.data['consultation-v0-just-responded'] = request.id;
    res.redirect(`${base}/consultations`);
  });
};
