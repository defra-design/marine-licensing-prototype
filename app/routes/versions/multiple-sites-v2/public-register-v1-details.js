// What each application on the public register says, for the view an
// application page. Not a route file – required by public-register-v1.js,
// which adds each one to its application as application.details.
//
// Every application uses the same page, which shows whichever sections it
// has. Four are full applications: Hayling and Poole are the fuller
// consultation v2 applications, reused so the stories join up, and Lyme
// Regis and Teignmouth follow the LCML v4 pontoon pages. The rest have the
// summary, one site, its activities and a construction drawing, copied from
// consultation v2 where it has them and made up for Southwold, Morecambe
// Bay and Dogger Bank.
//
// Each activity's type is its LCML second-level value, so the page uses the
// same names as the filter. Hayling and Poole keep the consultation v2 text.
//
// Applicant text is as the applicant wrote it, dashes and all.
//
// Teignmouth is redacted, as the case officer might have saved it on the
// LCML v4 redaction page: ***REDACTED*** marks what was removed from an
// answer, a document with withheld: true is not published at all, and a
// document with replacedBy is published as the applicant's redacted copy.
// Document links are dead in the prototype.

const CONSULTATION = require('./consultation-v2-applications.js');
const POLICIES = require('./public-register-v1-policies.js');

module.exports = {
  'lyme-regis': {
    submittedOffset: -41,
    summary: 'Jurassic Coast SUP Ltd is a small paddleboarding hire and instruction business operating in Lyme Regis. We are applying for a marine licence to install a small floating pontoon within Lyme Regis Harbour to provide a safe and accessible launching and landing platform for paddleboards and kayaks hired to our customers. At present customers are required to enter the water via the main harbour slipway which is shared with commercial fishing vessels and other harbour traffic. During the summer months this creates significant health and safety concerns particularly for inexperienced users and those with limited mobility. The pontoon would be attached to the existing harbour wall using H-frame wall guides and a short hinged gangway. It will be a floating structure rising and falling with the tide. The works will take place entirely within the outer harbour area.',
    startAndEndDates: 'April 2026 to September 2027',
    siteLocationMethod: 'File upload',
    sites: [
      {
        name: 'Lyme Regis Harbour Outer Pontoon',
        map: 'map-5-points.jpg',
        activities: [
          {
            type: 'construction-new',
            whatLabel: 'What is being constructed',
            what: 'Pontoons or floating walkways',
            description: 'Installation of one floating pontoon unit measuring 8 metres in length by 4 metres in width (total area 32 m²). The pontoon will be manufactured off-site from HDPE modular float units set within a hot-dip galvanised steel frame with non-slip GRP mesh decking panels. The pontoon will be fixed to the existing harbour wall using two H-frame steel wall guide rails drilled and resin-anchored to the masonry. No piling or seabed penetration is required. Access to the pontoon from the quayside will be via a 4m hinged aluminium gangway. All works will be carried out from the quayside or using a small harbour workboat. No heavy plant or craneage is anticipated, individual pontoon components can be handled manually or with light lifting equipment.',
            maximumDuration: '6 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes — installation works to be carried out between April and September only, avoiding the winter months when harbour conditions make marine works impracticable and harbour traffic is at its lowest.',
            workingHours: 'Monday to Friday, 08:00 to 17:00. Occasional Saturday morning working may be required to take advantage of suitable tidal windows.'
          }
        ],
        drawings: ['pontoon-construction-drawing.pdf']
      }
    ],
    policyGroups: POLICIES['lyme-regis'],
    wfd: {
      withinOneNauticalMile: 'Yes',
      excludedActivities: 'No',
      upload: 'WFD.doc'
    },
    otherPermissions: {
      specialLegalPowers: 'No',
      harbourAuthority: 'Lyme Regis Harbour Authority (Dorset Council). We have been in contact with the Harbour Master, Mr D. Furner, who has confirmed in principle agreement for the proposed pontoon location. A formal harbour authority consent will be sought once marine licence approval is confirmed. Dorset Council Harbours ref: LRH/2026/MISC/041',
      otherAuthorities: 'Dorset Council Planning Department — a pre-application enquiry was made in February 2026 to confirm whether planning permission is required for the pontoon installation. We were advised that planning permission is not required as the works constitute permitted development within the harbour area, however this is subject to confirmation. Contact: planning.enquiries@dorset.gov.uk, ref PA-PRE-2026-00412.',
      preApplicationConsultation: 'We have consulted with the following: • Lyme Regis Harbour Authority (Harbour Master) — as above, in principle agreement to the proposed location obtained • Lyme Regis Fishermens Association — discussed the proposed pontoon location with the association secretary. No objections raised provided the pontoon does not obstruct access to the fishing quay, which it will not. • Dorset Wildlife Trust — contacted by email in March 2026 to flag the project and ask if there were any ecological concerns. No response received to date. • Natural England — pre-application enquiry submitted via the marine pre-application advice service. Response received confirming no objection in principle subject to confirmation that no protected species are present at the installation location.'
    }
  },

  // Redacted as the applicant asked on the LCML v4 redaction page: the
  // concession fees and revenue in the summary, and the pontoon's
  // dimensions, construction method and working hours. The case officer has
  // also taken out the harbour master's name, withheld the construction
  // drawing and published the applicant's redacted copy of the WFD
  // assessment.
  teignmouth: {
    submittedOffset: -24,
    summary: 'South Devon Coast SUP Ltd is a small paddleboarding hire and instruction business operating in Teignmouth. We are applying for a marine licence to install a small floating pontoon within Teignmouth Harbour to provide a safe and accessible launching and landing platform for paddleboards and kayaks hired to our customers. At present customers are required to enter the water via the main harbour slipway which is shared with commercial fishing vessels and other harbour traffic. During the summer months this creates significant health and safety concerns particularly for inexperienced users and those with limited mobility. The pontoon would be attached to the existing harbour wall using H-frame wall guides and a short hinged gangway. It will be a floating structure rising and falling with the tide. The works will take place entirely within the outer harbour area. The pontoon would operate under a concession agreement with Teignmouth Harbour Authority. ***REDACTED***',
    startAndEndDates: 'April 2026 to September 2027',
    siteLocationMethod: 'File upload',
    sites: [
      {
        name: 'Teignmouth Harbour Outer Pontoon',
        map: 'map-5-points.jpg',
        activities: [
          {
            type: 'construction-new',
            whatLabel: 'What is being constructed',
            what: 'Pontoons or floating walkways',
            description: 'Installation of one floating pontoon unit measuring ***REDACTED***. The pontoon will be fixed to the existing harbour wall. No piling or seabed penetration is required. Access to the pontoon from the quayside will be via a hinged aluminium gangway. ***REDACTED***',
            maximumDuration: '6 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes — installation works to be carried out between April and September only, avoiding the winter months when harbour conditions make marine works impracticable and harbour traffic is at its lowest.',
            workingHours: '***REDACTED***'
          }
        ],
        drawings: [{ filename: 'pontoon-construction-drawing.pdf', withheld: true }]
      }
    ],
    policyGroups: POLICIES.teignmouth,
    wfd: {
      withinOneNauticalMile: 'Yes',
      excludedActivities: 'No',
      upload: { filename: 'WFD.doc', replacedBy: 'WFD-redacted.pdf' }
    },
    otherPermissions: {
      specialLegalPowers: 'No',
      harbourAuthority: 'Teignmouth Harbour Authority (Teignbridge District Council). We have been in contact with the Harbour Master, ***REDACTED***, who has confirmed in principle agreement for the proposed pontoon location. A formal harbour authority consent will be sought once marine licence approval is confirmed. A separate concession agreement covering the commercial operation of the pontoon is also being negotiated with the Authority, on the terms set out in our project background. Teignmouth Harbour Commission ref: THC/2026/041',
      otherAuthorities: 'Teignbridge District Council Planning Department — a pre-application enquiry was made in February 2026 to confirm whether planning permission is required for the pontoon installation. We were advised that planning permission is not required as the works constitute permitted development within the harbour area, however this is subject to confirmation. Contact: planning.enquiries@teignbridge.gov.uk, ref PA-PRE-2026-00412.',
      preApplicationConsultation: 'We have consulted with the following: • Teignmouth Harbour Authority (Harbour Master) — as above, in principle agreement to the proposed location obtained • Teignmouth Fishermens Association — discussed the proposed pontoon location with the association secretary. No objections raised provided the pontoon does not obstruct access to the fishing quay, which it will not. • Devon Wildlife Trust — contacted by email in March 2026 to flag the project and ask if there were any ecological concerns. No response received to date. • Natural England — pre-application enquiry submitted via the marine pre-application advice service. Response received confirming no objection in principle subject to confirmation that no protected species are present at the installation location.'
    }
  },

  hayling: Object.assign({}, CONSULTATION.hayling, {
    summary: 'We are applying for a marine licence to repair 6 timber groynes on the Hayling Island seafront. Rotten planks and posts will be replaced like for like with hardwood, working from the beach at low tide.',
    startAndEndDates: 'April 2027 to June 2027'
  }),

  poole: Object.assign({}, CONSULTATION.poole, {
    summary: 'We are applying for a marine licence to lay 12 new swing moorings in an existing mooring area in Poole Harbour. Each mooring will use a helical screw anchor, a riser chain and a surface buoy. The anchors will be installed by diver from a small workboat.',
    startAndEndDates: 'February 2027 to March 2027'
  }),

  dawlish: {
    summary: 'We are applying for a marine licence to extend the existing sea defence at Dawlish by approximately 150 metres to the east. The extension will reduce wave overtopping onto the railway line and promenade during winter storms. The works involve placing rock armour along the toe of the existing sea wall and building a new concrete wave return wall on top of it. Rock will be delivered by barge and placed by a long-reach excavator working from the beach at low tide. Works are planned outside the main bird overwintering period and will take about 6 months to complete.',
    startAndEndDates: 'April 2026 to September 2027',
    sites: [
      {
        name: 'Dawlish sea wall eastern extension',
        map: 'map-4-points.jpg',
        activities: [
          {
            type: 'alteration-improvement',
            whatLabel: 'What is being altered or improved',
            what: 'Hard coastal defence structures such as rock armour or concrete units',
            description: 'Extension of the existing sea defence by approximately 150 metres to the east. Rock armour will be placed along the toe of the existing sea wall on a geotextile and bedding stone layer, below mean high water springs. A new concrete wave return wall will be cast in situ on top of the existing wall. Rock will be delivered by barge and placed by a long-reach excavator working from the beach at low tide.',
            maximumDuration: '6 months',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes – works to be carried out between April and September only, outside the main bird overwintering period.',
            workingHours: 'Monday to Friday, 07:30 to 18:00, with some working outside these hours to take advantage of low tides.'
          }
        ],
        drawings: ['sea-defence-construction-drawing.pdf']
      }
    ]
  },

  bude: {
    summary: 'We are applying for a marine licence to repair a damaged section of the surface water outfall pipe on Summerleaze Beach. Storms last winter broke the concrete surround on the last 20 metres of the pipe. We will replace the surround and the pipe joints, working from the beach at low tide.',
    startAndEndDates: 'March 2027 to April 2027',
    sites: [
      {
        name: 'Summerleaze Beach outfall',
        map: 'map-3-points.jpg',
        activities: [
          {
            type: 'maintenance-existing',
            whatLabel: 'What is being maintained',
            what: 'Outfalls or intakes',
            description: 'Removal of the damaged concrete surround on the last 20 metres of the outfall pipe, replacement of 4 pipe joints, and casting of a new concrete surround. Work will be carried out by a small excavator from the beach at low tide.',
            maximumDuration: '3 weeks',
            completionDate: 'Yes – before the Easter school holidays',
            specificMonths: 'Yes – March and April only.',
            workingHours: 'Monday to Friday, 08:00 to 17:00, tide dependent.'
          }
        ],
        drawings: ['outfall-repair-drawing.pdf']
      }
    ]
  },

  whitstable: {
    summary: 'We are applying for a marine licence to install 400 oyster trestles on the intertidal foreshore east of Whitstable harbour. The trestles will hold mesh bags of Pacific oysters and will be reached on foot or by tractor at low tide along an existing access route.',
    startAndEndDates: 'January 2027 to December 2036',
    sites: [
      {
        name: 'Whitstable east foreshore trestle site',
        map: 'map-square.jpg',
        activities: [
          {
            type: 'construction-new',
            whatLabel: 'What is being constructed',
            what: 'Aquaculture trestles',
            description: 'Installation of 400 steel oyster trestles in rows on the intertidal foreshore, each 3 metres long and 0.5 metres high, pushed into the sediment by hand. Mesh bags of oysters will be strapped to the trestles and turned regularly.',
            maximumDuration: '4 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'No',
            workingHours: 'Low tide windows only, any day of the week.'
          }
        ],
        drawings: ['trestle-layout-plan.pdf']
      }
    ]
  },

  salcombe: {
    summary: 'We are applying for a marine licence to replace the visitor pontoon at Whitestrand in Salcombe harbour. The existing timber pontoon has reached the end of its life. We will remove it and install a new floating pontoon of the same size on the existing piles.',
    startAndEndDates: 'November 2026 to February 2027',
    sites: [
      {
        name: 'Whitestrand visitor pontoon',
        map: 'map-3-points.jpg',
        activities: [
          {
            type: 'removal-replacement',
            whatLabel: 'What is being removed',
            what: 'Pontoons or floating walkways',
            description: 'Removal of the existing 30 metre timber visitor pontoon. The old pontoon will be towed away for recycling.',
            maximumDuration: '1 week',
            completionDate: 'Yes – before the start of the visitor season',
            specificMonths: 'Yes – November to February only.',
            workingHours: 'Monday to Friday, 08:00 to 16:30.'
          },
          {
            type: 'construction-new',
            whatLabel: 'What is being constructed',
            what: 'Pontoons or floating walkways',
            description: 'Installation of a new modular floating pontoon of the same size, held on the 4 existing steel piles. No new piling is needed.',
            maximumDuration: '2 weeks',
            completionDate: 'Yes – before the start of the visitor season',
            specificMonths: 'Yes – November to February only.',
            workingHours: 'Monday to Friday, 08:00 to 16:30.'
          }
        ],
        drawings: ['visitor-pontoon-layout.pdf']
      }
    ]
  },

  scarborough: {
    summary: 'We are applying for a marine licence to replace the old public slipway in the North Bay. The existing concrete slipway is cracked and undermined. We will break it out and cast a new slipway on the same footprint, working from the beach at low tide.',
    startAndEndDates: 'May 2027 to July 2027',
    sites: [
      {
        name: 'North Bay public slipway',
        map: 'map-5-points.jpg',
        activities: [
          {
            type: 'removal-replacement',
            whatLabel: 'What is being removed',
            what: 'Slipways',
            description: 'Breaking out of the existing 40 metre concrete slipway. Broken concrete will be taken off site by lorry.',
            maximumDuration: '3 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'No',
            workingHours: 'Monday to Friday, 07:30 to 18:00, tide dependent.'
          },
          {
            type: 'construction-new',
            whatLabel: 'What is being constructed',
            what: 'Slipways',
            description: 'Casting a new reinforced concrete slipway on the same footprint as the old one. Work will be carried out by an excavator from the beach at low tide.',
            maximumDuration: '7 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'No',
            workingHours: 'Monday to Friday, 07:30 to 18:00, tide dependent.'
          }
        ],
        drawings: ['slipway-drawing.pdf']
      }
    ]
  },

  // Made up for the public register
  southwold: {
    summary: 'We are applying for a marine licence to remove 3 redundant timber groynes at the north end of Southwold beach. The groynes are broken and no longer hold the beach, and the stumps are a hazard to swimmers and small boats. We will pull out the posts and planks with an excavator working from the beach at low tide.',
    startAndEndDates: 'March 2027 to May 2027',
    sites: [
      {
        name: 'Southwold north beach groynes',
        map: 'map-8-points.jpg',
        activities: [
          {
            type: 'one-off-first-time',
            whatLabel: 'What is being removed',
            what: 'Groynes',
            description: 'Removal of 3 broken timber groynes, about 90 posts and what is left of the planking. Posts will be pulled out with an excavator from the beach at low tide, and the holes will fill naturally with beach material. All timber will be taken off the beach on the same tide for recycling.',
            maximumDuration: '5 weeks',
            completionDate: 'Yes – before the May half term holiday',
            specificMonths: 'Yes – March to May only.',
            workingHours: 'Monday to Friday, 08:00 to 17:00, within 2 hours either side of low water.'
          }
        ],
        drawings: ['southwold-groyne-removal-plan.pdf']
      }
    ]
  },

  'morecambe-bay': {
    summary: 'We are applying for a marine licence to place 6 small steel frames on the sands of Morecambe Bay to measure how sediment moves. Each frame holds sensors that record water depth, currents and suspended sediment. The frames will stay in place for 2 years and will be checked every month at low tide.',
    startAndEndDates: 'February 2027 to February 2029',
    sites: [
      {
        name: 'Morecambe Bay intertidal monitoring stations',
        map: 'map-circle.jpg',
        activities: [
          {
            type: 'deposit-new',
            whatLabel: 'What new deposit is being made',
            what: 'Scientific instruments',
            description: 'Placement of 6 galvanised steel frames, each 1.5 metres square and 1 metre high, held down by 4 ground anchors. Frames will be carried out on foot or by quad bike at low tide with a trained cross-bay guide. They will be removed at the end of the study.',
            maximumDuration: '2 years',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'No',
            workingHours: 'Low tide windows only, in daylight.'
          }
        ],
        drawings: ['monitoring-frame-detail.pdf']
      }
    ]
  },

  'dogger-bank': {
    summary: 'We are applying for a marine licence to replace a wave measuring buoy on the Dogger Bank. The buoy records wave height and direction for weather forecasting and offshore wind farm planning. The old buoy has reached the end of its life and will be swapped for a new one on the same mooring position.',
    startAndEndDates: 'May 2027 to April 2032',
    sites: [
      {
        name: 'Dogger Bank wave buoy station DB2',
        map: 'map-circle.jpg',
        activities: [
          {
            type: 'replacing-existing',
            whatLabel: 'What is being replaced',
            what: 'Moorings or aids to navigation',
            description: 'Recovery of the existing wave buoy and its mooring, and deployment of a new 0.9 metre wave buoy on a single point mooring with a 1 tonne clump weight, in the same position. The work will be done from a survey vessel in a single day, weather permitting.',
            maximumDuration: '1 day',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes – May to September only, when sea conditions allow.',
            workingHours: 'Daylight hours, any day of the week.'
          }
        ],
        drawings: ['wave-buoy-mooring-arrangement.pdf']
      }
    ]
  }
};
