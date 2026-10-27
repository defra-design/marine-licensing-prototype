module.exports = function (router) {
  // Consultation v2 MVP routes, copied from the v0 steel thread
  //
  // A bare-bones end-to-end journey for a consultee organisation (we are
  // pretending to be Natural England): consultation dashboard, request
  // details, respond, and a read-only view of the application. Pages are
  // deliberately template-level so developers can build the foundations
  // while the detailed designs are worked on separately.
  const version = "multiple-sites-v2";
  const section = "consultation-v2";
  const base = `/versions/${version}/${section}`;

  // Seeded consultation requests. Two types:
  //   response-required - MMO is asking the consultee for advice
  //   notify-only       - MMO is letting the consultee know; responding is optional
  //
  // marinePlanArea is the English marine plan area the site is in, shown on
  // the request page as the application's location.
  //
  // Dates are day offsets from today, run through the daysFromTodayShort filter.
  // Respond by is always the received date plus the 14 day response period,
  // so it is worked out in withStatus rather than set here.
  // Applicants match the LCML v4 view-details pages. The Dawlish summary is
  // made up for this steel thread, as LCML v4 only has pontoon text for it.
  const REQUESTS = {
    'dawlish': {
      id: 'dawlish',
      applicationName: 'Dawlish sea defence extension',
      reference: 'MLA/2026/10020',
      applicant: 'Southwest Marine Works Ltd',
      type: 'response-required',
      assignedTo: 'Jordan Lee',
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
      siteLocation: 'Dawlish, Devon',
      marinePlanArea: 'South Inshore'
    },
    'lyme-regis': {
      id: 'lyme-regis',
      applicationName: 'Lyme Regis pontoon',
      reference: 'MLA/2026/10003',
      applicant: 'Jurassic Coast SUP Ltd',
      type: 'notify-only',
      assignedTo: '',
      receivedOffset: -1,
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
      siteLocation: 'Lyme Regis Harbour, Dorset',
      marinePlanArea: 'South Inshore'
    },
    // The requests below are made up for v2, so the case list has enough
    // rows to show assigning, filtering and sorting.
    'falmouth': {
      id: 'falmouth',
      applicationName: 'Falmouth marina maintenance dredge',
      reference: 'MLA/2026/10029',
      applicant: 'Falmouth Haven Marina Ltd',
      type: 'response-required',
      assignedTo: 'Jordan Lee',
      adviceRequested: [
        'We would like your advice on the effects of the proposed dredge on the Fal and Helford Special Area of Conservation.',
        'Tell us whether the dredged material is likely to affect the maerl beds near the disposal site, and any measures you would recommend.',
        'Tell us about any timing restrictions you would recommend to protect migratory fish.'
      ],
      receivedOffset: -6,
      summary: 'We are applying for a marine licence to carry out maintenance dredging of the marina basin and access channel to restore the depths needed for berth holders. Silt has built up since the last dredge 5 years ago. We expect to remove about 12,000 cubic metres of material using a backhoe dredger, with the material taken by split hopper barge to the existing licensed disposal site off St Anthony Head.',
      startAndEndDates: 'October 2026 to March 2027',
      site: {
        name: 'Falmouth marina basin and access channel',
        typeOfActivity: 'Dredging',
        whatIsBeingConstructed: 'Not applicable',
        activityDescription: 'Maintenance dredging of the marina basin and access channel to a depth of 2.5 metres below chart datum, using a backhoe dredger. Dredged material will be loaded into a split hopper barge and disposed of at the licensed offshore disposal site.',
        maximumDuration: '8 weeks',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'Yes – October to March only, outside the main boating season.',
        workingHours: 'Monday to Saturday, 07:00 to 19:00, tide dependent.',
        drawing: 'dredge-area-plan.pdf'
      },
      siteLocation: 'Falmouth, Cornwall',
      marinePlanArea: 'South West Inshore'
    },
    'whitstable': {
      id: 'whitstable',
      applicationName: 'Whitstable oyster trestles',
      reference: 'MLA/2026/10031',
      applicant: 'Kentish Flats Shellfish Ltd',
      type: 'response-required',
      assignedTo: 'Kevin Morris',
      adviceRequested: [
        'We would like your advice on whether the trestles are likely to have a significant effect on the Swale Special Protection Area.',
        'Tell us whether the access route across the foreshore is likely to disturb feeding waders, and any measures you would recommend.'
      ],
      receivedOffset: -9,
      summary: 'We are applying for a marine licence to install 400 oyster trestles on the intertidal foreshore east of Whitstable harbour. The trestles will hold mesh bags of Pacific oysters and will be reached on foot or by tractor at low tide along an existing access route.',
      startAndEndDates: 'January 2027 to December 2036',
      site: {
        name: 'Whitstable east foreshore trestle site',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Aquaculture trestles',
        activityDescription: 'Installation of 400 steel oyster trestles in rows on the intertidal foreshore, each 3 metres long and 0.5 metres high, pushed into the sediment by hand. Mesh bags of oysters will be strapped to the trestles and turned regularly.',
        maximumDuration: '4 weeks',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'No',
        workingHours: 'Low tide windows only, any day of the week.',
        drawing: 'trestle-layout-plan.pdf'
      },
      siteLocation: 'Whitstable, Kent',
      marinePlanArea: 'South East Inshore'
    },
    'bude': {
      id: 'bude',
      applicationName: 'Bude outfall pipe repair',
      reference: 'MLA/2026/10027',
      applicant: 'Atlantic Coast Utilities Ltd',
      type: 'notify-only',
      assignedTo: 'Jenny Adkinson',
      receivedOffset: -4,
      summary: 'We are applying for a marine licence to repair a damaged section of the surface water outfall pipe on Summerleaze Beach. Storms last winter broke the concrete surround on the last 20 metres of the pipe. We will replace the surround and the pipe joints, working from the beach at low tide.',
      startAndEndDates: 'March 2027 to April 2027',
      site: {
        name: 'Summerleaze Beach outfall',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Outfalls or intakes',
        activityDescription: 'Removal of the damaged concrete surround on the last 20 metres of the outfall pipe, replacement of 4 pipe joints, and casting of a new concrete surround. Work will be carried out by a small excavator from the beach at low tide.',
        maximumDuration: '3 weeks',
        completionDate: 'Yes – before the Easter school holidays',
        specificMonths: 'Yes – March and April only.',
        workingHours: 'Monday to Friday, 08:00 to 17:00, tide dependent.',
        drawing: 'outfall-repair-drawing.pdf'
      },
      siteLocation: 'Bude, Cornwall',
      marinePlanArea: 'South West Inshore'
    },
    'scarborough': {
      id: 'scarborough',
      applicationName: 'Scarborough slipway replacement',
      reference: 'MLA/2026/10035',
      applicant: 'North Bay Harbour Services Ltd',
      type: 'response-required',
      assignedTo: '',
      adviceRequested: [
        'We would like your advice on whether the works are likely to affect the rocky shore habitats either side of the slipway.',
        'Tell us whether any surveys are needed before the works start.'
      ],
      receivedOffset: -2,
      summary: 'We are applying for a marine licence to replace the old public slipway in the North Bay. The existing concrete slipway is cracked and undermined. We will break it out and cast a new slipway on the same footprint, working from the beach at low tide.',
      startAndEndDates: 'May 2027 to July 2027',
      site: {
        name: 'North Bay public slipway',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Slipways',
        activityDescription: 'Breaking out of the existing 40 metre concrete slipway and casting a new reinforced concrete slipway on the same footprint. Broken concrete will be taken off site by lorry. Work will be carried out by an excavator from the beach at low tide.',
        maximumDuration: '10 weeks',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'No',
        workingHours: 'Monday to Friday, 07:30 to 18:00, tide dependent.',
        drawing: 'slipway-drawing.pdf'
      },
      siteLocation: 'Scarborough, North Yorkshire',
      marinePlanArea: 'North East Inshore'
    },
    'poole': {
      id: 'poole',
      applicationName: 'Poole Harbour swing moorings',
      reference: 'MLA/2026/10038',
      applicant: 'Brownsea Moorings Ltd',
      type: 'notify-only',
      assignedTo: '',
      receivedOffset: -1,
      summary: 'We are applying for a marine licence to lay 12 new swing moorings in an existing mooring area in Poole Harbour. Each mooring will use a helical screw anchor, a riser chain and a surface buoy. The anchors will be installed by diver from a small workboat.',
      startAndEndDates: 'February 2027 to March 2027',
      site: {
        name: 'Poole Harbour south mooring area',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Moorings or aids to navigation',
        activityDescription: 'Installation of 12 swing moorings, each with a helical screw anchor installed by diver, a riser chain and a surface buoy. No seabed dredging is needed.',
        maximumDuration: '2 weeks',
        completionDate: 'Yes – before the start of the boating season',
        specificMonths: 'Yes – February and March only.',
        workingHours: 'Monday to Friday, 08:00 to 16:00.',
        drawing: 'mooring-layout-plan.pdf'
      },
      siteLocation: 'Poole Harbour, Dorset',
      marinePlanArea: 'South Inshore'
    },
    'hayling': {
      id: 'hayling',
      applicationName: 'Hayling Island groyne repairs',
      reference: 'MLA/2026/10024',
      applicant: 'Solent Coastal Services Ltd',
      type: 'response-required',
      assignedTo: 'Morgan Hughes',
      adviceRequested: [
        'We would like your advice on whether the repairs are likely to have a significant effect on the Chichester and Langstone Harbours Special Protection Area.',
        'Tell us about any timing restrictions you would recommend to protect overwintering brent geese.'
      ],
      receivedOffset: -11,
      summary: 'We are applying for a marine licence to repair 6 timber groynes on the Hayling Island seafront. Rotten planks and posts will be replaced like for like with hardwood, working from the beach at low tide.',
      startAndEndDates: 'April 2027 to June 2027',
      site: {
        name: 'Hayling Island seafront groynes 14 to 19',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Hard coastal defence structures such as rock armour or concrete units',
        activityDescription: 'Like for like replacement of rotten timber planks and posts on 6 groynes, using sustainably sourced hardwood. Posts will be driven by a small excavator working from the beach at low tide.',
        maximumDuration: '8 weeks',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'Yes – April to June only, after the brent geese have left.',
        workingHours: 'Monday to Friday, 07:30 to 17:30, tide dependent.',
        drawing: 'groyne-repair-drawing.pdf'
      },
      siteLocation: 'Hayling Island, Hampshire',
      marinePlanArea: 'South Inshore'
    },
    // Past requests that have already been responded to, so the case list
    // and request pages show what a finished consultation looks like.
    'sidmouth': {
      id: 'sidmouth',
      applicationName: 'Sidmouth beach recharge',
      reference: 'MLA/2026/09987',
      applicant: 'East Devon Coastal Partnership Ltd',
      type: 'response-required',
      assignedTo: 'Jordan Lee',
      adviceRequested: [
        'We would like your advice on whether placing shingle on the beach is likely to affect the Sidmouth to West Bay Special Area of Conservation.',
        'Tell us whether the source of the shingle raises any concerns about introducing non-native species.'
      ],
      receivedOffset: -30,
      seededResponse: {
        text: 'Natural England has no objection to the proposal, provided the shingle is sourced from the licensed aggregate area named in the application and the works avoid the seabird nesting season. Based on the information provided, the proposal is unlikely to have a significant effect on the Special Area of Conservation.',
        respondedOffset: -19,
        respondedBy: 'Jordan Lee'
      },
      summary: 'We are applying for a marine licence to place about 20,000 cubic metres of shingle on Sidmouth beach to restore levels lost in recent storms. The shingle will be brought in by barge from a licensed aggregate area and pumped ashore, then spread by bulldozers.',
      startAndEndDates: 'September 2026 to November 2026',
      site: {
        name: 'Sidmouth town beach',
        typeOfActivity: 'Deposit of substances or objects',
        whatIsBeingConstructed: 'Not applicable',
        activityDescription: 'Placement of about 20,000 cubic metres of shingle on the upper beach, pumped ashore from a barge moored offshore and spread by bulldozers to the design profile.',
        maximumDuration: '6 weeks',
        completionDate: 'Yes – before the winter storm season',
        specificMonths: 'Yes – September to November only.',
        workingHours: 'Monday to Saturday, 07:00 to 19:00, tide dependent.',
        drawing: 'beach-recharge-profile.pdf'
      },
      siteLocation: 'Sidmouth, Devon',
      marinePlanArea: 'South Inshore'
    },
    'brixham': {
      id: 'brixham',
      applicationName: 'Brixham breakwater navigation lights',
      reference: 'MLA/2026/09964',
      applicant: 'Torbay Harbour Works Ltd',
      type: 'response-required',
      assignedTo: 'Kevin Morris',
      adviceRequested: [
        'We would like your advice on whether the works are likely to disturb seals hauling out on the breakwater, and any measures you would recommend.'
      ],
      receivedOffset: -42,
      seededResponse: {
        text: 'Natural England recommends that works on the outer end of the breakwater are carried out between April and August, when seals are least likely to be hauled out. With this timing in place we have no further comments.',
        respondedOffset: -33,
        respondedBy: 'Kevin Morris'
      },
      summary: 'We are applying for a marine licence to replace the 2 navigation lights on the end of Brixham breakwater, including new steel posts bolted to the existing concrete. Work will be done from a small workboat and from the breakwater itself.',
      startAndEndDates: 'April 2027 to May 2027',
      site: {
        name: 'Brixham breakwater head',
        typeOfActivity: 'Construction of new works',
        whatIsBeingConstructed: 'Moorings or aids to navigation',
        activityDescription: 'Removal of 2 old navigation lights and their posts, and installation of 2 new LED lights on galvanised steel posts resin-anchored into the existing concrete breakwater head.',
        maximumDuration: '2 weeks',
        completionDate: 'Not needed to be completed by a certain date',
        specificMonths: 'Yes – April to August only.',
        workingHours: 'Monday to Friday, 08:00 to 17:00.',
        drawing: 'navigation-light-drawing.pdf'
      },
      siteLocation: 'Brixham, Devon',
      marinePlanArea: 'South Inshore'
    }
  };

  // Each request's status lives in the session as consultation-v2-<id>-status so
  // it can be seen and changed through View data like any other key.
  function statusFor(req, request) {
    const key = `consultation-v2-${request.id}-status`;
    if (!req.session.data[key]) {
      req.session.data[key] = request.seededResponse ? 'Responded'
        : request.type === 'response-required' ? 'Response needed' : 'No response needed';
    }
    return req.session.data[key];
  }

  // Consultees have 14 days from receiving a request to respond.
  const RESPONSE_PERIOD_DAYS = 14;

  // Matches the date format used when a response is sent, e.g. 3 October 2026
  function dateFromToday(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // The signed-in consultee. Other team members only appear as assignees.
  const ME = 'Jordan Lee';

  // Who each request is assigned to lives in the session as
  // consultation-v2-<id>-assigned-to, seeded from REQUESTS. An empty string
  // means nobody is assigned.
  function assignedToFor(req, request) {
    const key = `consultation-v2-${request.id}-assigned-to`;
    if (req.session.data[key] === undefined) {
      req.session.data[key] = request.assignedTo;
    }
    return req.session.data[key];
  }

  function withStatus(req, request) {
    const assignedTo = assignedToFor(req, request);
    return Object.assign({}, request, {
      assignedTo,
      assignedToMe: assignedTo === ME,
      status: statusFor(req, request),
      respondByOffset: request.receivedOffset + RESPONSE_PERIOD_DAYS,
      response: req.session.data[`consultation-v2-${request.id}-response`] || (request.seededResponse && request.seededResponse.text),
      respondedDate: req.session.data[`consultation-v2-${request.id}-responded-date`] || (request.seededResponse && dateFromToday(request.seededResponse.respondedOffset)),
      // Who sent the response, as it might not be you
      respondedBy: req.session.data[`consultation-v2-${request.id}-responded-by`] || (request.seededResponse && request.seededResponse.respondedBy)
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

  // Team members who can be assigned, other than you. Used by the Show filter.
  const TEAM = ['Jenny Adkinson', 'Kevin Morris', 'Morgan Hughes'];

  // A whole organisation's worth of people, for the "Long list with a filter
  // box" version of the separate Assign page (?assignlist=filter). Includes
  // the team, so cases already assigned to them still make sense. The
  // type-ahead version (?assignlist=autocomplete) uses the same people.
  const EVERYONE = TEAM.concat([
    'Aisha Rahman', 'Alex Turner', 'Amira Haddad', 'Ben Whitfield', 'Callum Reid',
    'Chloe Bennett', 'Daniel Okafor', 'Eleanor Price', 'Ethan Clarke', 'Fatima Begum',
    'Fiona MacLeod', 'George Lewis', 'Grace Owusu', 'Hannah Moore', 'Harry Patel',
    'Isla Robertson', 'Jack Thompson', 'James Wilson', 'Joanna Kowalska', 'Kate Davies',
    'Liam O’Connor', 'Lucy Evans', 'Mark Jenkins', 'Megan Hughes', 'Mohammed Ali',
    'Nadia Petrova', 'Oliver Grant', 'Owen Morgan', 'Priya Shah', 'Rachel Green',
    'Ryan Murphy', 'Samuel Adeyemi', 'Sarah Collins', 'Sophie Walker', 'Thomas Wright',
    'Victoria Hall', 'William Foster', 'Zara Ahmed'
  ]).sort();

  const TYPE_OPTIONS = [
    { value: 'response-required', text: 'Request for advice' },
    { value: 'notify-only', text: 'Application notification' }
  ];
  const STATUS_OPTIONS = ['Response needed', 'No response needed', 'Responded'];
  const SHOW_OPTIONS = [
    { value: 'all', text: 'All consultations' },
    { value: 'me', text: 'Assigned to me' },
    { value: 'unassigned', text: 'Unassigned' },
    { value: 'person', text: 'Assigned to someone else' }
  ];

  // Filters live in the URL so they survive assigning and can be shared.
  // Names are prefixed because the kit also copies query strings into the
  // session, and plain names like "type" or "status" are used elsewhere.
  const FILTER_KEYS = ['consultation-v2-show', 'consultation-v2-person', 'consultation-v2-type', 'consultation-v2-status'];

  function asArray(value) {
    return [].concat(value || []).filter(v => v && v !== '_unchecked');
  }

  function readFilters(query) {
    const show = SHOW_OPTIONS.some(o => o.value === query['consultation-v2-show']) ? query['consultation-v2-show'] : 'all';
    return {
      show,
      people: show === 'person' ? asArray(query['consultation-v2-person']).filter(p => TEAM.includes(p)) : [],
      types: asArray(query['consultation-v2-type']).filter(t => TYPE_OPTIONS.some(o => o.value === t)),
      statuses: asArray(query['consultation-v2-status']).filter(st => STATUS_OPTIONS.includes(st))
    };
  }

  function matchesFilters(request, filters) {
    if (filters.show === 'me' && request.assignedTo !== ME) return false;
    if (filters.show === 'unassigned' && request.assignedTo) return false;
    if (filters.show === 'person' && filters.people.length && !filters.people.includes(request.assignedTo)) return false;
    if (filters.show === 'person' && !filters.people.length && (!request.assignedTo || request.assignedTo === ME)) return false;
    if (filters.types.length && !filters.types.includes(request.type)) return false;
    if (filters.statuses.length && !filters.statuses.includes(request.status)) return false;
    return true;
  }

  // Builds a consultations URL from the current query, with some keys changed.
  // A value of null removes the key.
  function consultationsUrl(query, changes) {
    return urlWith(`${base}/consultations`, query, changes);
  }

  // The MOJ "Selected filters" tags, each linking to the page without it
  function selectedFilterGroups(query, filters) {
    const groups = [];
    if (filters.show !== 'all') {
      const items = filters.show === 'person' && filters.people.length
        ? filters.people.map(person => ({
            text: person,
            href: consultationsUrl(query, { 'consultation-v2-person': filters.people.filter(p => p !== person) })
          }))
        : [{
            text: SHOW_OPTIONS.find(o => o.value === filters.show).text,
            href: consultationsUrl(query, { 'consultation-v2-show': null, 'consultation-v2-person': null })
          }];
      groups.push({ heading: 'Show', items });
    }
    if (filters.types.length) {
      groups.push({
        heading: 'Type',
        items: filters.types.map(type => ({
          text: TYPE_OPTIONS.find(o => o.value === type).text,
          href: consultationsUrl(query, { 'consultation-v2-type': filters.types.filter(t => t !== type) })
        }))
      });
    }
    if (filters.statuses.length) {
      groups.push({
        heading: 'Status',
        items: filters.statuses.map(status => ({
          text: status,
          href: consultationsUrl(query, { 'consultation-v2-status': filters.statuses.filter(st => st !== status) })
        }))
      });
    }
    return groups;
  }

  // Names what is being shown, for the results count, as on the LCML v4
  // submissions page ("10 results found in 'All Ramsgate Marina submissions'")
  function scopeName(filters) {
    if (filters.show === 'me') return 'Consultations assigned to me';
    if (filters.show === 'unassigned') return 'Unassigned consultations';
    if (filters.show === 'person') {
      return filters.people.length ? `Consultations assigned to ${filters.people.join(', ')}` : 'Consultations assigned to someone else';
    }
    return 'All Natural England consultations';
  }

  // The page versions in the URL (not the filters). Kept when filtering,
  // assigning, moving between v2 pages or switching another version in the tray.
  function versionParams(query) {
    const keep = {};
    if (query.assign === 'buttons') keep.assign = 'buttons';
    if (['bar', 'bar-actions'].includes(query.filter)) keep.filter = query.filter;
    if (query.layout === 'full') keep.layout = 'full';
    // Defaults (left out of the URL): one Assign button and Assign at the
    // bottom of request pages. Anything else, including off, is kept.
    if (['off', 'panel', 'page'].includes(query.reassign)) keep.reassign = query.reassign;
    if (['off', 'under'].includes(query.reqassign)) keep.reqassign = query.reqassign;
    if (query.banners === 'off') keep.banners = 'off';
    if (query.scroll === 'off') keep.scroll = 'off';
    if (['filter', 'autocomplete'].includes(query.assignlist)) keep.assignlist = query.assignlist;
    return keep;
  }

  // Builds a URL for any v2 page from a query, with some keys changed.
  // A value of null removes the key.
  function urlWith(path, query, changes) {
    const params = new URLSearchParams();
    const merged = Object.assign({}, query, changes);
    Object.keys(merged).forEach(key => {
      [].concat(merged[key] === null || merged[key] === undefined ? [] : merged[key])
        // The kit adds _unchecked for empty checkbox groups; leave it out of links
        .filter(value => value !== '_unchecked')
        .forEach(value => params.append(key, value));
    });
    const qs = params.toString();
    return `${path}${qs ? '?' + qs : ''}`;
  }

  // Tray links. Each reloads the current page with one version changed,
  // keeping the other versions but dropping any filters.
  function versionUrls(query, path) {
    const keep = versionParams(query);
    const to = changes => urlWith(path, keep, changes);
    return {
      layoutStandard: to({ layout: null }),
      layoutFull: to({ layout: 'full' }),
      assignCheckboxes: to({ assign: null }),
      assignButtons: to({ assign: 'buttons' }),
      filterSide: to({ filter: null }),
      filterBar: to({ filter: 'bar' }),
      filterBarActions: to({ filter: 'bar-actions' }),
      reassignOff: to({ reassign: 'off' }),
      reassignPanel: to({ reassign: 'panel' }),
      reassignPage: to({ reassign: 'page' }),
      reassignSingle: to({ reassign: null }),
      reqassignOff: to({ reqassign: 'off' }),
      reqassignUnder: to({ reqassign: 'under' }),
      reqassignBottom: to({ reqassign: null }),
      bannersOn: to({ banners: null }),
      bannersOff: to({ banners: 'off' }),
      // The scroll pane links keep the filters too, so only the pane changes
      scrollOn: urlWith(path, query, { scroll: null }),
      scrollOff: urlWith(path, query, { scroll: 'off' }),
      assignlistShort: to({ assignlist: null }),
      assignlistFilter: to({ assignlist: 'filter' }),
      assignlistAutocomplete: to({ assignlist: 'autocomplete' }),
      rolesConsultee: to({ 'consultation-v2-roles': 'consultee' }),
      rolesBoth: to({ 'consultation-v2-roles': 'both' })
    };
  }

  // Every v2 page knows which page versions are on, so the tray shows the
  // right ones and links between pages can carry them (versionQuery).
  router.use(base, function (req, res, next) {
    const data = req.session.data;
    const path = req.originalUrl.split('?')[0];
    const keep = versionParams(req.query);

    // Applicant and consultee: Home and Submissions tabs from LCML v4 sit
    // before Consultations. Unlike the other page versions this one is kept
    // in the session, as LCML v4 pages do not carry the v2 query string.
    // LCML v4 only shows the tabs when reached from these pages (see its
    // routes), so its usual journeys are unchanged.
    if (['consultee', 'both'].includes(req.query['consultation-v2-roles'])) {
      data['consultation-v2-roles'] = req.query['consultation-v2-roles'];
    }
    res.locals.bothRoles = data['consultation-v2-roles'] === 'both';
    // So the Consultations tab on LCML v4 pages comes back to the same versions
    data['consultation-v2-version-query'] = urlWith('', keep, {});

    res.locals.versionParams = keep;
    res.locals.versionQuery = urlWith('', keep, {});
    // The whole query string, filters included, for links between the list,
    // request and respond pages, so Back returns to the same view of the list
    res.locals.pageQuery = queryOf(req);
    res.locals.versionUrls = versionUrls(req.query, path);
    res.locals.assignMode = req.query.assign === 'buttons' ? 'buttons' : 'checkboxes';
    res.locals.filterMode = ['bar', 'bar-actions'].includes(req.query.filter) ? req.query.filter : 'side';
    res.locals.layoutMode = req.query.layout === 'full' ? 'full' : 'standard';
    res.locals.reassignMode = keep.reassign || 'single';
    // Assign button on the request pages: at the bottom by default,
    // ?reqassign=under puts it under About this request, ?reqassign=off removes it.
    res.locals.reqassignMode = keep.reqassign || 'bottom';
    // ?banners=off turns off the banners after assigning from the separate page
    res.locals.bannersOn = keep.banners !== 'off';
    // ?scroll=off shows the table without the MOJ scrollable pane round it
    res.locals.scrollOn = keep.scroll !== 'off';
    // ?assignlist=filter gives the separate Assign page a long list of people
    // with a filter box above it, instead of the few in the team.
    // ?assignlist=autocomplete gives the same people in a type-ahead.
    res.locals.assignlistMode = keep.assignlist || 'short';
    // Always render afresh, so the browser's Back button never shows an old
    // copy of a page from before assigning or responding
    res.set('Cache-Control', 'no-store');
    next();
  });

  // "Bude outfall pipe repair has been assigned to Kevin Morris",
  // "4 consultations have been unassigned" and so on
  function assignedText(ids, to) {
    const what = ids.length === 1 ? REQUESTS[ids[0]].applicationName : `${ids.length} consultations`;
    if (to === 'no-one') return `${what} ${ids.length === 1 ? 'has' : 'have'} been unassigned`;
    return `${what} ${ids.length === 1 ? 'has' : 'have'} been assigned to ${to === ME ? 'you' : to}`;
  }

  // A one-off success banner after assigning, for the page we land on
  function setAssignBanner(req, page, text) {
    if (req.query.banners === 'off') return;
    req.session.data['consultation-v2-assign-banner'] = { page, text };
  }

  function takeAssignBanner(req, page) {
    const banner = req.session.data['consultation-v2-assign-banner'];
    if (!banner || banner.page !== page) return null;
    delete req.session.data['consultation-v2-assign-banner'];
    return banner.text;
  }

  // Consultation dashboard
  router.get(`${base}/consultations`, function (req, res) {
    const allRequests = Object.values(REQUESTS).map(r => withStatus(req, r));
    const filters = readFilters(req.query);
    const requests = allRequests.filter(r => matchesFilters(r, filters));

    // Flash the success banner once, after a response is submitted
    const justResponded = req.session.data['consultation-v2-just-responded'];
    delete req.session.data['consultation-v2-just-responded'];

    // Error and ticked boxes from the last assign action, shown once
    const assignError = req.session.data['consultation-v2-assign-error'];
    const selected = req.session.data['consultation-v2-assign-selected'] || [];
    delete req.session.data['consultation-v2-assign-error'];
    delete req.session.data['consultation-v2-assign-selected'];

    // Everything but the filters, so Clear filters keeps ?assign=buttons
    const withoutFilters = {};
    FILTER_KEYS.forEach(key => { withoutFilters[key] = null; });

    res.render(`versions/${version}/${section}/consultations`, {
      requests,
      scopeName: scopeName(filters),
      justResponded: justResponded ? REQUESTS[justResponded] : null,
      assignError,
      selected,
      // Page versions (assignMode, filterMode, layoutMode, reassignMode and so
      // on) come from the router.use above. In brief:
      //   ?assign=buttons    a button on each row instead of checkboxes
      //   ?filter=bar        horizontal filter bar, toggle by the heading
      //   ?filter=bar-actions horizontal filter bar, toggle by the buttons
      //   ?layout=full       up to 1920px wide, with a Marine plan area column
      //   (default)          one Assign button, separate page
      //   ?reassign=off      Assign to me and Unassign from me only
      //   ?reassign=page     those plus Assign to someone else, separate page
      //   ?reassign=panel    those plus Assign to someone else, in a panel
      //   (default)          Assign at the bottom of request pages
      //   ?reqassign=under   Assign under About this request instead
      //   ?reqassign=off     no Assign on request pages
      // Not you: you would use Assign to me
      everyone: TEAM,
      assignBanner: takeAssignBanner(req, 'list'),
      filters,
      showOptions: SHOW_OPTIONS,
      typeOptions: TYPE_OPTIONS,
      statusOptions: STATUS_OPTIONS,
      team: TEAM,
      selectedFilterGroups: selectedFilterGroups(req.query, filters),
      clearFiltersUrl: consultationsUrl(req.query, withoutFilters),
      // Links to the request pages carry the filters too, so Back returns to
      // the same view of the list
      listQuery: queryOf(req)
    });
  });

  // Gives the cases to a team member, or to nobody for "no-one". Returns
  // false if nobody valid was chosen.
  function reassign(data, ids, to, people) {
    if (to === 'no-one') {
      ids.forEach(id => { data[`consultation-v2-${id}-assigned-to`] = ''; });
      return true;
    }
    if ((people || TEAM).includes(to)) {
      ids.forEach(id => { data[`consultation-v2-${id}-assigned-to`] = to; });
      return true;
    }
    return false;
  }

  // The query string of the current URL, to carry filters and page versions
  // between the dashboard and the Assign to someone else page
  function queryOf(req) {
    const i = req.originalUrl.indexOf('?');
    return i === -1 ? '' : req.originalUrl.slice(i);
  }

  // Assign to me and Unassign from me, from the dashboard.
  //
  // Tick boxes version: the button pressed is the action and the ticked rows
  // are the cases. Buttons version: each row's button carries action:id.
  router.post(`${base}/consultations`, function (req, res) {
    const data = req.session.data;
    // Save before redirecting, or the file session store can still be
    // writing when the dashboard reads it back and show the old assignees.
    // The form posts to the current URL, so going back to it keeps any
    // filters and ?assign=buttons.
    const backToConsultations = () => req.session.save(() => res.redirect(req.originalUrl));
    const [action, rowId] = (data['consultation-v2-assign-action'] || '').split(':');
    let ids = rowId ? [rowId] : [].concat(data['consultation-v2-assign-ids'] || []);
    // Responded cases have nothing left to assign
    ids = ids.filter(id => id && id !== '_unchecked' && REQUESTS[id] && statusFor(req, REQUESTS[id]) !== 'Responded');
    delete data['consultation-v2-assign-action'];
    delete data['consultation-v2-assign-ids'];
    const reassignTo = data['consultation-v2-reassign-to'];
    delete data['consultation-v2-reassign-to'];

    // Errors go back to the dashboard with the ticked boxes kept. Only the
    // checkbox version can produce them; per-row buttons always have a case.
    const showError = (text, field) => {
      data['consultation-v2-assign-error'] = { text, field: field || 'table' };
      data['consultation-v2-assign-selected'] = ids;
      return backToConsultations();
    };
    const assignActions = ['assign', 'unassign', 'reassign', 'choose'];
    if (assignActions.includes(action) && !ids.length) {
      return showError('Select the consultations you want to assign');
    }

    if (action === 'assign') {
      ids.forEach(id => { data[`consultation-v2-${id}-assigned-to`] = ME; });
      // Banners are consistent: every assign gets one, unless ?banners=off
      setAssignBanner(req, 'list', assignedText(ids, ME));
    } else if (action === 'reassign') {
      // In-page panel: the ticked cases go to whoever was chosen, or to
      // nobody for "No one"
      if (!reassign(data, ids, reassignTo)) {
        return showError('Select who to assign the consultations to', 'reassign');
      }
      // The panel gets the same banner as the separate page, unless ?banners=off
      setAssignBanner(req, 'list', assignedText(ids, reassignTo));
    } else if (action === 'choose') {
      // Assign to someone else as a separate page, or the in-page panel
      // without JavaScript: remember the ticked cases and go to the page
      data['consultation-v2-reassign-ids'] = ids;
      delete data['consultation-v2-reassign-from'];
      return req.session.save(() => res.redirect(`${base}/assign-to-someone-else${queryOf(req)}`));
    } else if (action === 'unassign') {
      // Only your own cases are unassigned. Anyone else's ticked cases are left alone.
      const mine = ids.filter(id => assignedToFor(req, REQUESTS[id]) === ME);
      if (!mine.length) return showError('Select a consultation assigned to you');
      mine.forEach(id => { data[`consultation-v2-${id}-assigned-to`] = ''; });
      setAssignBanner(req, 'list', assignedText(mine, 'no-one'));
    }

    backToConsultations();
  });

  // The Notify email the consultee organisation gets, for either type of request
  router.get(`${base}/emails/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    res.render(`versions/${version}/${section}/emails/email`, { request });
  });

  // Government Gateway sign-in from the email, which then opens that request
  router.get(`${base}/sign-in/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    res.render(`versions/${version}/${section}/emails/sign-in`, { request });
  });

  // Assign from a request page: the one case, then the same separate page
  router.get(`${base}/assign/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    if (request.status === 'Responded') return res.redirect(`${base}/request-details/${request.id}${queryOf(req)}`);
    req.session.data['consultation-v2-reassign-ids'] = [request.id];
    req.session.data['consultation-v2-reassign-from'] = request.id;
    req.session.save(() => res.redirect(`${base}/assign-to-someone-else${queryOf(req)}`));
  });

  // Who the separate page offers. The single Assign button, and the Assign
  // button on a request page, replace Assign to me, so they list you as well.
  function assignPageContext(req) {
    const data = req.session.data;
    const ids = [].concat(data['consultation-v2-reassign-ids'] || []).filter(id => REQUESTS[id]);
    const from = data['consultation-v2-reassign-from'];
    const fromRequest = from && ids.length === 1 && ids[0] === from ? from : null;
    // One Assign button is the default, so no ?reassign means single
    const includeMe = !['off', 'panel', 'page'].includes(req.query.reassign) || !!fromRequest;
    const others = ['filter', 'autocomplete'].includes(req.query.assignlist) ? EVERYONE : TEAM;
    return { ids, fromRequest, people: includeMe ? [ME].concat(others) : others, includeMe };
  }

  // Assign to someone else, separate page. Lists the cases ticked on the
  // dashboard (or the one case from a request page), then asks who to give
  // them to.
  router.get(`${base}/assign-to-someone-else`, function (req, res) {
    const { ids, fromRequest, people, includeMe } = assignPageContext(req);
    if (!ids.length) return res.redirect(`${base}/consultations${queryOf(req)}`);
    const error = req.session.data['consultation-v2-reassign-error'];
    delete req.session.data['consultation-v2-reassign-error'];
    res.render(`versions/${version}/${section}/assign-to-someone-else`, {
      selected: ids.map(id => withStatus(req, REQUESTS[id])),
      everyone: people,
      single: includeMe,
      // Back and Cancel go to where you came from
      backUrl: fromRequest
        ? `${base}/request-details/${fromRequest}${queryOf(req)}`
        : `${base}/consultations${queryOf(req)}`,
      error
    });
  });

  router.post(`${base}/assign-to-someone-else`, function (req, res) {
    const data = req.session.data;
    const { ids, fromRequest, people } = assignPageContext(req);
    const to = data['consultation-v2-reassign-to'];
    delete data['consultation-v2-reassign-to'];

    // A normal form page, so it gets a normal GOV.UK error if nobody is chosen
    if (!reassign(data, ids, to, people)) {
      data['consultation-v2-reassign-error'] = 'Select who to assign the consultations to';
      return req.session.save(() => res.redirect(req.originalUrl));
    }
    delete data['consultation-v2-reassign-ids'];
    delete data['consultation-v2-reassign-from'];

    // Assigned yourself from a request page: back to it, to work on it.
    // Anything else: back to the list, as it is someone else's now.
    if (fromRequest && to === ME) {
      setAssignBanner(req, 'request', 'This consultation has been assigned to you');
      return req.session.save(() => res.redirect(`${base}/request-details/${fromRequest}${queryOf(req)}`));
    }

    setAssignBanner(req, 'list', assignedText(ids, to));

    // From a request page the list opens with just the page versions;
    // from the list it keeps its filters too
    req.session.save(() => res.redirect(`${base}/consultations${queryOf(req)}`));
  });

  // Request details
  router.get(`${base}/request-details/:requestId`, function (req, res) {
    const request = findRequest(req, res);
    if (!request) return;
    res.render(`versions/${version}/${section}/request-details`, {
      request,
      assignBanner: takeAssignBanner(req, 'request')
    });
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
    // Only the person assigned to a request can respond to it, and only once
    if (!request.assignedToMe || request.status === 'Responded') {
      return res.redirect(`${base}/request-details/${request.id}${queryOf(req)}`);
    }
    res.render(`versions/${version}/${section}/respond`, { request });
  });

  router.post(`${base}/respond/:requestId-router`, function (req, res) {
    const request = REQUESTS[req.params.requestId];
    if (!request) return res.redirect(`${base}/consultations`);
    if (assignedToFor(req, request) !== ME || statusFor(req, request) === 'Responded') {
      return res.redirect(`${base}/request-details/${request.id}${queryOf(req)}`);
    }

    const response = (req.session.data['consultation-v2-response-text'] || '').trim();
    delete req.session.data['consultation-v2-response-text'];

    if (!response) {
      return res.render(`versions/${version}/${section}/respond`, {
        request: withStatus(req, request),
        error: 'Enter your response'
      });
    }

    req.session.data[`consultation-v2-${request.id}-response`] = response;
    req.session.data[`consultation-v2-${request.id}-status`] = 'Responded';
    req.session.data[`consultation-v2-${request.id}-responded-by`] = ME;
    req.session.data[`consultation-v2-${request.id}-responded-date`] = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    req.session.data['consultation-v2-just-responded'] = request.id;
    // Save first, as when assigning, or the list can show it as not responded
    req.session.save(() => res.redirect(`${base}/consultations${queryOf(req)}`));
  });
};
