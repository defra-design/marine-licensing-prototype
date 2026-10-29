// Fuller applications for the consultation v2 view-application page.
// Not a route file – required by consultation-v2.js, which adds each one to
// its request as request.application.
//
// Only Hayling and Poole have one, for the show and tell. Hayling has one
// marine plan policy supporting document and Poole has none, to show both. The other requests
// keep the shorter view built from request.site.
//
// The rows follow the LCML v4 view details and check answers pages, with the
// labels reworded for someone outside the applicant's organisation (for
// example "What is being maintained" not "What you're maintaining"). Fees,
// invoicing and publishing consent are left out, as consultees don't see them.
// Document links are dead in the prototype.

// South marine plan policy text, copied from the LCML v4 view details pages
const SOUTH_POLICIES = {
  'S-CC-3': {
    name: 'South Climate change 3',
    info: 'Proposals in the south marine plan area and adjacent marine plan areas that are likely to have a significant adverse impact on coastal change should not be supported.'
  },
  'S-CO-1': {
    name: 'South Co-existence 1',
    info: 'Proposals will minimise their use of space and consider opportunities for co-existence with other activities'
  },
  'S-AGG-4': {
    name: 'South Aggregates 4',
    info: 'Where proposals require marine aggregates as part of their construction, preference should be given to using marine aggregates sourced from the south marine plan areas. If this is not appropriate, proposals should state why.'
  },
  'S-INF-1': {
    name: 'South Infrastructure 1',
    info: 'Appropriate land-based infrastructure which facilitates marine activity (and vice versa) should be supported.'
  },
  'S-PS-1': {
    name: 'South Ports, harbours and shipping 1',
    info: 'Proposals that may have a significant adverse impact upon current activity and future opportunity for expansion of port and harbour activities should demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate significant adverse impacts d. if it is not possible to mitigate significant adverse impacts, proposals should state the case for proceeding.'
  },
  'S-BIO-1': {
    name: 'South Biodiversity 1',
    info: 'Proposals that may have significant adverse impacts on natural habitat and species adaptation, migration and connectivity must demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate significant adverse impacts'
  },
  'S-BIO-2': {
    name: 'South Biodiversity 2',
    info: 'Proposals that incorporate features that enhance or facilitate natural habitat and species adaptation, migration and connectivity will be supported.'
  },
  'S-BIO-3': {
    name: 'South Biodiversity 3',
    info: 'Proposals that enhance coastal habitats where important in their own right and/or for ecosystem functioning and provision of goods and services will be supported. Proposals must take account of the space required for coastal habitats where important in their own right and/or for ecosystem functioning and provision of goods and services and demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate for net loss of coastal habitat.'
  },
  'S-DIST-1': {
    name: 'South Disturbance 1',
    info: 'Proposals, including in relation to tourism and recreational activities, within and adjacent to the south marine plan areas must demonstrate that they will, in order of preference a. avoid b. minimise c. mitigate significant cumulative adverse physical disturbance or displacement impacts on highly mobile species.'
  },
  'S-ML-2': {
    name: 'South Marine litter 2',
    info: 'The introduction of litter as a result of proposals should be avoided or minimised where practicable and activities that help reduce marine litter will be supported.'
  },
  'S-MPA-1': {
    name: 'South Marine protected areas 1',
    info: 'Proposals that support the objectives of marine protected areas and the ecological coherence of the marine protected area network will be supported. Proposals that may have adverse impacts on the objectives of marine protected areas and the ecological coherence of the marine protected area network must demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate adverse impacts, with due regard given to statutory advice on ecologically coherent network.'
  },
  'S-UWN-1': {
    name: 'South Underwater noise 1',
    info: 'Proposals generating impulsive sound, must contribute data to the UK Marine Noise Registry as per any currently agreed requirements. Public authorities must take account of any currently agreed targets under the UK Marine Strategy part one descriptor 11.'
  },
  'S-UWN-2': {
    name: 'South Underwater noise 2',
    info: 'Proposals that generate impulsive sound and/or ambient noise must demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate significant adverse impacts on highly mobile species d. if it is not possible to mitigate significant adverse impacts, proposals must state the case for proceeding.'
  },
  'S-WQ-1': {
    name: 'South Water quality 1',
    info: 'Proposals that may have significant adverse impacts upon water environment, including upon habitats and species that can be of benefit to water quality must demonstrate that they will, in order or preference: a. avoid b. minimise c. mitigate significant adverse impacts.'
  },
  'S-ACC-1': {
    name: 'South Access 1',
    info: 'Proposals, including in relation to tourism and recreation, should demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate significant adverse impacts on public access.'
  },
  'S-FISH-2': {
    name: 'South Fisheries 2',
    info: 'Proposals that may have significant adverse impacts on access to, or within, sustainable fishing or aquaculture sites must demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate significant adverse impacts d. if it is not possible to mitigate the significant adverse impacts, proposals should state the case for proceeding.'
  },
  'S-HER-1': {
    name: 'South Heritage assets 1',
    info: 'Proposals that may compromise or harm elements contributing to the significance of heritage assets should demonstrate that they will, in order of preference: a. avoid b. minimise c. mitigate compromise or harm If it is not possible to mitigate, the public benefits for proceeding with the proposal must outweigh the compromise or harm to the heritage asset'
  },
  'S-SCP-1': {
    name: 'South Seascape and landscape 1',
    info: 'Proposals that may have a significant adverse impact upon the seascape of an area should only be supported if they demonstrate that they will, in order of preference: avoid minimise mitigate significant adverse impacts if it is not possible to mitigate significant adverse impacts, proposals should state the case for proceeding'
  },
  'S-TR-1': {
    name: 'South Tourism and recreation 1',
    info: 'Proposals supporting, promoting or facilitating tourism and recreation activities, particularly where this creates additional utilisation of related facilities beyond typical usage patterns, should be supported'
  },
  'S-TR-2': {
    name: 'South Tourism and recreation 2',
    info: 'Proposals that enhance or promote tourism and recreation activities will be supported. Proposals for development must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate significant adverse impacts on tourism and recreation activities.'
  }
};

const POLICY_CATEGORIES = ['Cross-cutting', 'Economic', 'Environmental', 'Social'];

// Turns { category: [{ code, consideration }] } into what the template loops
// over: each policy with its text, and each supporting document with the
// names of the policies it is linked to.
function build(application) {
  application.policyGroups = POLICY_CATEGORIES
    .filter(category => application.policies[category])
    .map(category => ({
      category,
      policies: application.policies[category].map(p => Object.assign({ code: p.code }, SOUTH_POLICIES[p.code], {
        consideration: p.consideration
      }))
    }));
  (application.supportingDocuments || []).forEach(doc => {
    doc.policies.forEach(link => { link.name = SOUTH_POLICIES[link.code].name; });
  });
  return application;
}

const APPLICATIONS = {
  hayling: build({
    submittedOffset: -17,
    siteLocationMethod: 'File upload',
    sites: [
      {
        name: 'Hayling Island seafront groynes 14 to 16',
        map: 'map-4-points.jpg',
        activities: [
          {
            typeOfActivity: 'Maintenance of existing works',
            whatLabel: 'What is being maintained',
            what: 'Groyne',
            description: 'Like for like replacement of rotten timber planks and posts on groynes 14, 15 and 16. About 60 planks and 9 king posts will be replaced using FSC certified greenheart hardwood, matching the existing sizes. New posts will be driven by a small excavator with a vibrating head, working from the beach at low tide. Old timber will be taken off the beach on the same tide and removed from site for recycling. No beach material will be moved other than to dig out around the posts being replaced, and it will be put back on the same tide.',
            maximumDuration: '4 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes – April to June only, after the brent geese have left the harbours for the summer.',
            workingHours: 'Monday to Friday, 07:30 to 17:30, within 2 hours either side of low water.'
          }
        ],
        drawings: ['groynes-14-to-16-general-arrangement.pdf', 'groynes-14-to-16-plank-replacement-schedule.pdf']
      },
      {
        name: 'Hayling Island seafront groynes 17 to 19',
        map: 'map-8-points.jpg',
        activities: [
          {
            typeOfActivity: 'Maintenance of existing works',
            whatLabel: 'What is being maintained',
            what: 'Groyne',
            description: 'Like for like replacement of rotten timber planks and posts on groynes 17, 18 and 19, using the same method, timber and working area as groynes 14 to 16. About 75 planks and 12 king posts will be replaced.',
            maximumDuration: '4 weeks',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes – April to June only, after the brent geese have left the harbours for the summer.',
            workingHours: 'Monday to Friday, 07:30 to 17:30, within 2 hours either side of low water.'
          },
          {
            typeOfActivity: 'Deposit of something new',
            whatLabel: 'What new deposit is being made',
            what: 'Other deposits: rock armour at the seaward end of groyne 19',
            description: 'Placement of about 120 tonnes of 1 to 3 tonne Cornish granite rock armour around the seaward end of groyne 19, which has been undermined by scour. Rock will be delivered by lorry along the seafront access road and placed by a long-reach excavator from the beach at low tide. The rock will sit on a geotextile layer and will not extend more than 6 metres beyond the existing end of the groyne.',
            maximumDuration: '1 week',
            completionDate: 'Not needed to be completed by a certain date',
            specificMonths: 'Yes – April to June only, after the brent geese have left the harbours for the summer.',
            workingHours: 'Monday to Friday, 07:30 to 17:30, within 2 hours either side of low water.'
          }
        ],
        drawings: ['groynes-17-to-19-general-arrangement.pdf', 'groyne-19-rock-armour-section.pdf']
      }
    ],
    policies: {
      'Cross-cutting': [
        { code: 'S-CC-3', consideration: 'The groynes have been in place since the 1950s and hold the beach that protects the seafront road and properties behind it. The works keep them at their current length and height, so the way shingle moves along the frontage will not change. The rock at the end of groyne 19 replaces beach that has been lost to scour and is not expected to affect the beaches further east.' },
        { code: 'S-CO-1', consideration: 'The works use the same footprint as the existing groynes. Only one groyne will be worked on at a time, and the rest of the beach will stay open to the public. We have spoken to the seafront watersports clubs and the beach huts association about the dates.' }
      ],
      'Economic': [
        { code: 'S-AGG-4', consideration: 'The rock armour is quarried granite from Cornwall, as marine aggregates are not suitable for armour stone of this size. No marine aggregates are needed for the works.' },
        { code: 'S-INF-1', consideration: 'The groynes protect the seafront road, the promenade and about 200 properties from erosion and flooding. Keeping them in good condition supports the seafront businesses and the coastal path.' }
      ],
      'Environmental': [
        { code: 'S-BIO-1', consideration: 'The groynes sit on a shingle and sand beach next to the Chichester and Langstone Harbours Special Protection Area. Works will be carried out from April to June, when the overwintering brent geese and waders have left. Plant will stay on the beach between the groynes being worked on and will not go onto the lower shore beyond the end of the groynes, apart from groyne 19. Our Habitats Regulations Assessment screening concludes there is no likely significant effect.' },
        { code: 'S-BIO-3', consideration: 'There will be no loss of coastal habitat. The rock at groyne 19 covers about 40 square metres of beach that is already scoured and has no vegetation. The vegetated shingle at the top of the beach will be fenced off during the works.' },
        { code: 'S-DIST-1', consideration: 'Timing the works for April to June avoids the period when overwintering brent geese, curlew and dunlin use the frontage. Our winter bird survey found the main high tide roosts are more than 500 metres from the works. Ringed plover may nest on the upper beach, so an ecologist will check the working area each week and set up a 50 metre exclusion zone around any nest found.' },
        { code: 'S-MPA-1', consideration: 'The site is next to the Chichester and Langstone Harbours SPA and Ramsar site and the Solent Maritime Special Area of Conservation. The works are small scale, like for like and timed to avoid the sensitive period for the protected bird species. See the Habitats Regulations Assessment screening.' },
        { code: 'S-UWN-2', consideration: 'Posts will be driven with a vibrating head rather than impact piling, at low tide when the work area is dry. No underwater noise is expected.' },
        { code: 'S-WQ-1', consideration: 'All plant will use biodegradable hydraulic oil and be refuelled off the beach. Spill kits will be kept on site. The greenheart timber is untreated, so nothing will leach into the water.' }
      ],
      'Social': [
        { code: 'S-ACC-1', consideration: 'The beach and promenade will stay open. Fencing will close off a working area of about 30 metres around each groyne while it is worked on, with signs and a banksman when plant is moving. The works are planned outside the school summer holidays.' },
        { code: 'S-HER-1', consideration: 'There are no recorded heritage assets on this part of the beach. If any finds are made while digging around the posts, work will stop and we will report them under the Crown Estate protocol for archaeological discoveries.' },
        { code: 'S-TR-2', consideration: 'Keeping the groynes in good condition holds the beach in place, which the seafront tourism businesses depend on. Working outside the summer holidays keeps disruption to visitors to a minimum.' }
      ]
    },
    supportingDocuments: [
      {
        filename: 'hayling-groynes-hra-screening.pdf',
        type: 'Habitats Regulations Assessment',
        policies: [
          { code: 'S-BIO-1', location: 'Section 4, pages 9 to 14' },
          { code: 'S-MPA-1', location: 'Section 5, pages 15 to 18' }
        ]
      }
    ],
    wfd: {
      withinOneNauticalMile: 'Yes',
      excludedActivities: 'No',
      upload: 'hayling-groynes-wfd-assessment.pdf'
    },
    otherPermissions: {
      specialLegalPowers: 'No',
      harbourAuthority: 'No',
      otherAuthorities: 'Havant Borough Council – the works are permitted development for coast protection works, confirmed by email from the planning team on 4 August 2026. Natural England – we have applied for assent to carry out the works next to the Chichester Harbour Site of Special Scientific Interest.',
      preApplicationConsultation: 'We have spoken to Coastal Partners, who manage the groynes for Havant Borough Council, the Hayling Island seafront beach huts association and the two seafront watersports clubs. Natural England gave advice through its discretionary advice service in July 2026, which is why the works are timed for April to June.'
    }
  }),

  poole: build({
    submittedOffset: -13,
    siteLocationMethod: 'File upload',
    sites: [
      {
        name: 'Poole Harbour south mooring area',
        map: 'map-circle.jpg',
        activities: [
          {
            typeOfActivity: 'Deposit of something new',
            whatLabel: 'What new deposit is being made',
            what: 'Moorings',
            description: 'Installation of 12 swing moorings for boats up to 10 metres long, spaced at least 25 metres apart. Each mooring has a galvanised steel helical screw anchor wound 4 to 6 metres into the seabed by a diver using a hydraulic drive head, a riser chain with a mid-line float so the chain does not drag on the seabed, and a yellow surface buoy marked with the mooring number. No seabed dredging or levelling is needed. The anchors will be installed from a small workboat.',
            maximumDuration: '2 weeks',
            completionDate: 'Yes – before the start of the boating season on 1 April 2027',
            specificMonths: 'Yes – February and March only.',
            workingHours: 'Monday to Friday, 08:00 to 16:00, around slack water for diving.'
          }
        ],
        drawings: ['poole-south-mooring-layout-plan.pdf', 'helical-anchor-and-riser-detail.pdf']
      }
    ],
    policies: {
      'Cross-cutting': [
        { code: 'S-CO-1', consideration: 'The moorings are inside an existing mooring area set by Poole Harbour Commissioners, away from the main channels. The layout leaves the gaps between mooring trots that small boats and paddlers use. Our navigational risk assessment shows the swinging circles do not reach the channel edge.' }
      ],
      'Economic': [
        { code: 'S-INF-1', consideration: 'There is a waiting list of more than 300 people for moorings in Poole Harbour. The new moorings will be let to local boat owners and support the boatyards, chandlers and launch service in the harbour.' },
        { code: 'S-PS-1', consideration: 'Poole Harbour Commissioners have agreed the layout in principle. The moorings are outside the main shipping channel and the ferry routes, and will not affect port operations or the commissioners’ plans for the harbour.' }
      ],
      'Environmental': [
        { code: 'S-BIO-1', consideration: 'Our seagrass survey found no seagrass within the mooring area. The nearest seagrass bed is about 400 metres to the south west. The mid-line floats stop the riser chains dragging on the seabed, so the moorings will not scour the seabed in the way traditional chain moorings do.' },
        { code: 'S-BIO-2', consideration: 'Helical anchors disturb a much smaller area of seabed than block or chain sinker moorings. Each anchor has a footprint of less than 0.1 square metres, and the shaft is wound in without excavation.' },
        { code: 'S-DIST-1', consideration: 'The works are in February and March, which overlaps with the end of the overwintering bird season. The workboat will stay within the mooring area and the works will take no more than 2 weeks. Our HRA screening concludes there is no likely significant effect on the birds the Poole Harbour Special Protection Area is designated for.' },
        { code: 'S-MPA-1', consideration: 'The site is inside Poole Harbour Special Protection Area and Ramsar site. It is not in an area of seagrass or saltmarsh.' },
        { code: 'S-UWN-1', consideration: 'The anchors are wound in, not driven, so there is no impulsive sound. We do not need to submit data to the UK Marine Noise Registry.' },
        { code: 'S-WQ-1', consideration: 'Installing helical anchors causes very little sediment to be suspended. The workboat will carry a spill kit and the hydraulic drive head uses biodegradable oil.' },
        { code: 'S-ML-2', consideration: 'All packaging will be taken ashore. Moorings will be checked every year and any worn parts replaced, so no gear is lost in the harbour.' }
      ],
      'Social': [
        { code: 'S-ACC-1', consideration: 'The new moorings add to public access to the water for local boat owners. They do not block any slipways, beaches or routes used by paddlers and small craft.' },
        { code: 'S-FISH-2', consideration: 'The mooring area is not used for commercial fishing or bait digging. We have checked with Southern Inshore Fisheries and Conservation Authority, who had no concerns.' },
        { code: 'S-HER-1', consideration: 'There are no known wrecks or heritage assets in the mooring area. The diver will look at each anchor position before installing it and we will report any finds to the Receiver of Wreck.' },
        { code: 'S-TR-1', consideration: 'The moorings support leisure boating, which is one of the main reasons people visit Poole Harbour.' }
      ]
    },
    wfd: {
      withinOneNauticalMile: 'Yes',
      excludedActivities: 'No',
      upload: 'poole-moorings-wfd-assessment.pdf'
    },
    otherPermissions: {
      specialLegalPowers: 'No',
      harbourAuthority: 'Poole Harbour Commissioners. The harbour master has agreed the mooring layout in principle and we have applied for a works licence (ref PHC/WL/2026/118). The moorings will be let under the commissioners’ mooring licence scheme.',
      otherAuthorities: 'None. BCP Council confirmed that planning permission is not needed for moorings below mean low water.',
      preApplicationConsultation: 'We have spoken to Poole Harbour Commissioners, Southern Inshore Fisheries and Conservation Authority, the Poole Harbour Study Group and the two sailing clubs next to the mooring area. Natural England gave advice through its discretionary advice service in May 2026, which is why we carried out the seagrass survey.'
    }
  })
};

module.exports = APPLICATIONS;
