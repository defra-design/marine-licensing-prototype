// Fuller applications for the consultation v2 view-application page.
// Not a route file – required by consultation-v3.js, which adds each one to
// its request as request.application.
//
// Only Hayling, Poole, Dart and Teignmouth have one, for the show and tell. Hayling has one
// marine plan policy supporting document and Poole has none, to show both. Dart
// is in two marine plan areas and answers every policy from both plans (79),
// to show how long the policies can get. Teignmouth
// is redacted. The other
// requests keep the shorter view built from request.site.
//
// The rows follow the LCML v4 view details and check answers pages, with the
// labels reworded for someone outside the applicant's organisation (for
// example "What is being maintained" not "What you're maintaining"). Fees,
// invoicing and publishing consent are left out, as consultees don't see them.
// Document links are dead in the prototype.
//
// Teignmouth is the redacted one, copied from the public register, with its
// policies in consultation-v3-teignmouth-policies.js.

const TEIGNMOUTH_POLICIES = require('./consultation-v3-teignmouth-policies.js');

// South marine plan policy text, copied from the LCML v4 view details pages
// (the ones Hayling and Poole use) and the Plymouth Sound rejected page (the
// rest of the 37 South policies, for Dart)
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
  },
  'S-CC-1': {
    name: 'South Climate change 1',
    info: 'Proposals must consider their contribution to greenhouse gas emissions arising from unintended consequences on other activities. Where such consequences are likely to result in increased greenhouse gas emissions, proposals should demonstrate that they will, in order of preference: a) avoid, b) minimise, c) mitigate unintended consequences on other activities.'
  },
  'S-CC-2': {
    name: 'South Climate change 2',
    info: 'Proposals should demonstrate for the lifetime of the proposal that: 1) they are resilient to the effects of climate change 2) they will not have a significant adverse impact upon climate change adaptation measures elsewhere. In respect of 2) proposals should demonstrate that they will, in order of preference: a) avoid, b) minimise, c) mitigate the significant adverse impacts upon these climate change adaptation measures.'
  },
  'S-CC-4': {
    name: 'South Climate change 4',
    info: 'Proposals that may have a significant adverse impact on habitats that provide a flood defence or carbon sequestration ecosystem service must demonstrate that they will, in order of preference: a) avoid, b) minimise, c) mitigate significant adverse impacts.'
  },
  'S-AQ-2': {
    name: 'South Aquaculture 2',
    info: 'Proposals that enable the provision of infrastructure for sustainable fisheries and aquaculture and related industries will be supported.'
  },
  'S-CAB-1': {
    name: 'South Cables 1',
    info: 'Preference should be given to proposals for cable installation where the method of installation is burial. Where burial is not achievable, decisions should take account of protection measures for the cable that may be proposed by the applicant. Where burial or protection measures are not appropriate, proposals should state the case for proceeding without those measures.'
  },
  'S-CAB-2': {
    name: 'South Cables 2',
    info: 'Proposals that have a significant adverse impact on new and existing landfall sites for subsea cables (telecoms, power and interconnectors) should demonstrate that they will, in order of preference: a) avoid, b) minimise, c) mitigate significant adverse impacts, d) if it is not possible to mitigate significant adverse impacts, proposals should state the case for proceeding.'
  },
  'S-DD-2': {
    name: 'South Dredging and disposal 2',
    info: 'Proposals must identify, where possible, alternative opportunities to minimise the use of dredged waste disposal sites by pursuing re-use opportunities through matching of spoil to suitable sites.'
  },
  'S-REN-1': {
    name: 'South Renewables 1',
    info: 'Proposals that support the development of supply chains associated with the deployment of renewable energy will be supported.'
  },
  'S-BIO-4': {
    name: 'South Biodiversity 4',
    info: 'Proposals that enhance the distribution and net extent of priority habitats should be supported. Proposals must demonstrate that they will avoid reducing the distribution and net extent of priority habitats.'
  },
  'S-NIS-1': {
    name: 'South Invasive non-native species 1',
    info: 'Proposals must put in place appropriate measures to avoid or minimise significant adverse impacts on the marine area that would arise through the introduction and transport of non-indigenous species, particularly when: 1) moving equipment, boats or livestock (for example fish and shellfish) from one water body to another 2) introducing structures suitable for settlement of non-indigenous species, or the spread of invasive non-indigenous species known to exist in the area.'
  },
  'S-ML-1': {
    name: 'South Marine litter 1',
    info: 'Public authorities should ensure adequate provision for and removal of beach and marine litter on amenity beaches.'
  },
  'S-WQ-2': {
    name: 'South Water quality 2',
    info: 'Activities that can deliver an improvement to water environment, or enhance habitats and species which can be of benefit to water quality should be supported.'
  },
  'S-ACC-2': {
    name: 'South Access 2',
    info: 'Proposals demonstrating enhanced public access to and within the marine area will be supported.'
  },
  'S-EMP-1': {
    name: 'South Employment 1',
    info: 'Proposals that develop skills related to marine activities, particularly in line with local skills strategies, will be supported.'
  },
  'S-EMP-2': {
    name: 'South Employment 2',
    info: 'Proposals resulting in a net increase to marine related employment will be supported, particularly where they are in line with the skills available in and adjacent to the south marine plan areas.'
  },
  'S-FISH-1': {
    name: 'South Fisheries 1',
    info: 'Proposals that support the diversification of a sustainable fishing industry and or enhance fishing industry resilience to the effects of climate change should be supported.'
  },
  'S-FISH-4': {
    name: 'South Fisheries 4',
    info: 'Proposals that enhance essential fish habitat, including spawning, nursery and feeding grounds, and migratory routes should be supported. Proposals must demonstrate that they will, in order of preference: a) avoid, b) minimise, c) mitigate significant adverse impact on essential fish habitat, including, spawning, nursery, feeding grounds and migration routes.'
  },
  'S-SOC-1': {
    name: 'South Knowledge, understanding, appreciation and enjoyment 1',
    info: 'Proposals that enhance or promote social benefits will be supported. Proposals must demonstrate that they will, in order of preference: a) avoid, b) minimise, c) mitigate significant adverse impacts which result in the displacement of other existing or authorised (but yet to be implemented) activities that generate social benefits.'
  }
};

// South West marine plan policy text, copied from the LCML v4 Plymouth Sound
// view details page. All 41 on that page, for the Dart application.
const SOUTH_WEST_POLICIES = {
  'SW-CO-1': {
    name: 'South West Co-existence 1',
    info: 'Proposals that optimise the use of space and incorporate opportunities for co-existence and co-operation with existing activities will be supported. Proposals that may have significant adverse impacts on, or displace, existing activities must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant. If it is not possible to mitigate significant adverse impacts, proposals must state the case for proceeding.'
  },
  'SW-PS-1': {
    name: 'South West Ports, harbours and shipping 1',
    info: 'In line with the National Policy Statement for Ports, sustainable port and harbour development should be supported. Only proposals demonstrating compatibility with current port and harbour activities will be supported. Proposals within statutory harbour authority areas or their approaches that detrimentally and materially affect safety of navigation, or the compliance by statutory harbour authorities with the Open Port Duty or the Port Marine Safety Code, will not be authorised unless there are exceptional circumstances. Proposals that may have a significant adverse impact upon future opportunity for sustainable expansion of port and harbour activities, must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant. If it is not possible to mitigate significant adverse impacts, proposals should state the case for proceeding.'
  },
  'SW-BIO-1': {
    name: 'South West Biodiversity 1',
    info: 'Proposals that enhance the distribution of priority habitats and priority species will be supported. Proposals that may have significant adverse impacts on the distribution of priority habitats and priority species must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant d) compensate for significant adverse impacts that cannot be mitigated.'
  },
  'SW-INNS-1': {
    name: 'South West Invasive non-native species 1',
    info: 'Proposals that reduce the risk of introduction and/or spread of invasive non-native species should be supported. Proposals must put in place appropriate measures to avoid or minimise significant adverse impacts that would arise through the introduction and transport of invasive non-native species, particularly when: 1) moving equipment, boats or livestock (for example fish or shellfish) from one water body to another 2) introducing structures suitable for settlement of invasive non-native species, or the spread of invasive non-native species known to exist in the area.'
  },
  'SW-MPA-1': {
    name: 'South West Marine protected areas 1',
    info: 'Proposals that support the objectives of marine protected areas and the ecological coherence of the marine protected area network will be supported. Proposals that may have adverse impacts on the objectives of marine protected areas must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts, with due regard given to statutory advice on an ecologically coherent network.'
  },
  'SW-UWN-1': {
    name: 'South West Underwater noise 1',
    info: 'Proposals that result in the generation of impulsive sound must contribute data to the UK Marine Noise Registry as per any currently agreed requirements. Public authorities must take account of any currently agreed targets under the Marine Strategy Part One Descriptor 11.'
  },
  'SW-WQ-1': {
    name: 'South West Water quality 1',
    info: 'Proposals that protect, enhance and restore water quality will be supported. Proposals that cause deterioration of water quality must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - deterioration of water quality in the marine environment.'
  },
  'SW-ACC-1': {
    name: 'South West Access 1',
    info: 'Proposals demonstrating appropriate enhanced and inclusive public access to and within the marine area, including the provision of services for tourism and recreation activities, will be supported. Proposals that may have significant adverse impacts on public access should demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant.'
  },
  'SW-FISH-3': {
    name: 'South West Fisheries 3',
    info: 'Proposals that enhance essential fish habitat, including spawning, nursery and feeding grounds, and migratory routes, should be supported. Proposals that may have significant adverse impacts on essential fish habitat, including spawning, nursery and feeding grounds, and migratory routes, must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant.'
  },
  'SW-HER-1': {
    name: 'South West Heritage assets 1',
    info: 'Proposals that demonstrate they will conserve and enhance the significance of heritage assets will be supported. Where proposals may cause harm to the significance of heritage assets, proponents must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - any harm to the significance of heritage assets. If it is not possible to mitigate, then public benefits for proceeding with the proposal must outweigh the harm to the significance of heritage assets.'
  },
  'SW-TR-1': {
    name: 'South West Tourism and recreation 1',
    info: 'Proposals that promote or facilitate sustainable tourism and recreation activities, or that create appropriate opportunities to expand or diversify the current use of facilities, should be supported. Proposals that may have significant adverse impacts on tourism and recreation activities must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant.'
  },
  'SW-CC-1': {
    name: 'South West Climate change 1',
    info: 'Proposals that conserve, restore or enhance habitats that provide flood defence or carbon sequestration will be supported. Proposals that may have significant adverse impacts on habitats that provide a flood defence or carbon sequestration ecosystem service must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant d) compensate for significant adverse impacts that cannot be mitigated.'
  },
  'SW-CC-3': {
    name: 'South West Climate change 3',
    info: 'Proposals in the south west marine plan areas, and adjacent marine plan areas, that are likely to have significant adverse impacts on coastal change, or on climate change adaptation measures inside and outside of the proposed project areas, should only be supported if they can demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant.'
  },
  'SW-CBC-1': {
    name: 'South West Cross-border co-operation 1',
    info: 'Proposals must consider cross-border impacts throughout the lifetime of the proposed activity. Proposals that impact upon one or more marine plan areas or terrestrial environments must show evidence of the relevant public authorities (including other countries) being consulted and responses considered.'
  },
  'SW-CE-1': {
    name: 'South West Cumulative effects 1',
    info: 'Proposals which may have adverse cumulative effects with other existing, authorised, or reasonably foreseeable proposals must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse cumulative and/or in-combination effects so they are no longer significant.'
  },
  'SW-AQ-2': {
    name: 'South West Aquaculture 2',
    info: 'Proposals enabling the provision of infrastructure for sustainable aquaculture and related industries will be supported.'
  },
  'SW-CAB-1': {
    name: 'South West Cables 1',
    info: 'Preference should be given to proposals for cable installation where the method of protection is burial. Where burial is not achievable, decisions should take account of protection measures for the cable that may be proposed by the applicant. Where burial or protection measures are not appropriate, proposals should state the case for proceeding without those measures.'
  },
  'SW-CAB-3': {
    name: 'South West Cables 3',
    info: 'Where seeking to locate close to existing subsea cables, proposals should demonstrate compatibility with ongoing function, maintenance and decommissioning activities relating to the cable.'
  },
  'SW-DD-1': {
    name: 'South West Dredging and disposal 1',
    info: 'In areas of authorised dredging activity, including those subject to navigational dredging, proposals for other activities will not be supported unless they are compatible with the dredging activity.'
  },
  'SW-DD-2': {
    name: 'South West Dredging and disposal 2',
    info: 'Proposals that cause significant adverse impacts on licensed disposal sites should not be supported. Proposals that may have significant adverse impacts on licensed disposal sites must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant. If it is not possible to mitigate the significant adverse impacts, proposals must state the case for proceeding.'
  },
  'SW-DD-3': {
    name: 'South West Dredging and disposal 3',
    info: 'Proposals for the disposal of dredged material must demonstrate that they have been assessed against the waste hierarchy. Where there is the need to identify new dredge disposal sites, including alternative use sites, proposals should be supported if they conform to best practice and guidance.'
  },
  'SW-INF-1': {
    name: 'South West Infrastructure 1',
    info: 'Proposals for appropriate marine infrastructure which facilitates land-based activities, or land-based infrastructure which facilitates marine activities (including the diversification or regeneration of sustainable marine industries), should be supported.'
  },
  'SW-INF-2': {
    name: 'South West Infrastructure 2',
    info: '(1) Proposals for alternative development at existing safeguarded landing facilities will not be supported. (2) Proposals adjacent and opposite existing safeguarded landing facilities must demonstrate that they avoid significant adverse impacts on existing safeguarded landing facilities. (3) Proposals for alternative development at existing landing facilities (excluding safeguarded sites) should not be supported unless that facility is no longer viable or capable of being made viable for waterborne transport. (4) Proposals adjacent and opposite existing landing facilities (excluding safeguarded sites) that may have significant adverse impacts on the landing facilities should demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant.'
  },
  'SW-PS-4': {
    name: 'South West Ports, harbours and shipping 4',
    info: 'Proposals promoting or facilitating sustainable coastal and/or short sea shipping as an alternative to road, rail or air transport will be supported where appropriate.'
  },
  'SW-REN-1': {
    name: 'South West Renewables 1',
    info: 'Proposals that enable the provision of renewable energy technologies and associated supply chains, will be supported.'
  },
  'SW-AIR-1': {
    name: 'South West Air quality 1',
    info: 'Proposals must assess their direct and indirect impacts upon local air quality and emissions of greenhouse gases. Proposals that are likely to result in increased air pollution or increased emissions of greenhouse gases must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - air pollution and/or greenhouse gas emissions, in line with current national and local air quality objectives and legal requirements.'
  },
  'SW-BIO-2': {
    name: 'South West Biodiversity 2',
    info: 'Proposals that enhance or facilitate native species or habitat adaptation or connectivity, or native species migration, will be supported. Proposals that may cause significant adverse impacts on native species or habitat adaptation or connectivity, or native species migration, must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant d) compensate for significant adverse impacts that cannot be mitigated.'
  },
  'SW-BIO-3': {
    name: 'South West Biodiversity 3',
    info: 'Proposals that conserve, restore or enhance coastal habitats, where important in their own right and/or for ecosystem functioning and provision of ecosystem services, will be supported. Proposals must take account of the space required for coastal habitats, where important in their own right and/or for ecosystem functioning and provision of ecosystem services, and demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate d) compensate for - net habitat loss.'
  },
  'SW-DIST-1': {
    name: 'South West Disturbance 1',
    info: 'Proposals that may have significant adverse impacts on highly mobile species through disturbance or displacement must demonstrate that they will, in order of preference: avoid minimise mitigate - adverse impacts so they are no longer significant.'
  },
  'SW-HAB-1': {
    name: 'South West Habitats 1',
    info: 'Proposals that incorporate measures to conserve deep sea habitats will be supported. Proposals that may have direct adverse impacts on deep sea habitats must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - direct adverse impacts on deep sea habitats.'
  },
  'SW-INNS-2': {
    name: 'South West Invasive non-native species 2',
    info: 'Public authorities with functions to manage activities that could potentially introduce, transport or spread invasive non-native species should implement adequate biosecurity measures to avoid or minimise the risk of introducing, transporting or spreading invasive non-native species.'
  },
  'SW-ML-1': {
    name: 'South West Marine litter 1',
    info: 'Public authorities must make adequate provision for the prevention, re-use, recycling and disposal of waste to reduce and prevent marine litter. Public authorities should aspire to undertake measures to remove marine litter within their jurisdiction.'
  },
  'SW-ML-2': {
    name: 'South West Marine litter 2',
    info: 'Proposals that facilitate waste re-use or recycling to reduce or remove marine litter will be supported. Proposals that could potentially increase the amount of marine litter in the marine plan areas must include measures to, in order of preference: a) avoid b) minimise c) mitigate - waste entering the marine environment.'
  },
  'SW-MPA-2': {
    name: 'South West Marine protected areas 2',
    info: 'Proposals that enhance a marine protected area’s ability to adapt to climate change, enhancing the resilience of the marine protected area network, will be supported. Proposals that may have adverse impacts on an individual marine protected area’s ability to adapt to the effects of climate change, and so reduce the resilience of the marine protected area network, must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts.'
  },
  'SW-MPA-3': {
    name: 'South West Marine protected areas 3',
    info: 'Where statutory advice states that a marine protected area site condition is deteriorating or that features are moving or changing due to climate change, a suitable boundary change to ensure continued protection of the site and coherence of the overall network should be considered.'
  },
  'SW-UWN-2': {
    name: 'South West Underwater noise 2',
    info: 'Proposals that result in the generation of impulsive or non-impulsive noise must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts on highly mobile species so they are no longer significant. If it is not possible to mitigate significant adverse impacts, proposals must state the case for proceeding.'
  },
  'SW-EMP-1': {
    name: 'South West Employment 1',
    info: 'Proposals that result in a net increase in marine-related employment will be supported, particularly where they meet one or more of the following: 1) are aligned with local skills strategies and support the skills available 2) create a diversity of opportunities 3) create employment in locations identified as the most deprived 4) implement new technologies - in, and adjacent to, the south west marine plan areas.'
  },
  'SW-FISH-1': {
    name: 'South West Fisheries 1',
    info: 'Proposals that support a sustainable fishing industry, including the industry’s diversification, should be supported.'
  },
  'SW-FISH-2': {
    name: 'South West Fisheries 2',
    info: 'Proposals that enhance access for fishing activities should be supported. Proposals that may have significant adverse impacts on access for fishing activities must demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant. If it is not possible to mitigate significant adverse impacts, proposals should state the case for proceeding.'
  },
  'SW-SOC-1': {
    name: 'South West Knowledge, understanding, appreciation and enjoyment 1',
    info: 'Those bringing forward proposals should consider and demonstrate how their development shall enhance public knowledge, understanding, appreciation and enjoyment of the marine environment as part of (the design of) the proposal.'
  },
  'SW-SCP-1': {
    name: 'South West Seascape and landscape 1',
    info: 'Proposals should ensure they are compatible with their surroundings and should not have a significant adverse impact on the character and visual resource of the seascape and landscape of the area. The location, scale and design of proposals should take account of the character, quality and distinctiveness of the seascape and landscape. Proposals that may have a significant adverse impact on the seascape and landscape of the area should demonstrate that they will, in order of preference: a) avoid b) minimise c) mitigate - adverse impacts so they are no longer significant. If it is not possible to mitigate, the public benefits for proceeding with the proposal must outweigh significant adverse impacts to the seascape and landscape of the area. Proposals within or relatively close to nationally designated areas should have regard to the specific statutory purposes of the designated area. Great weight should be given to conserving and enhancing landscape and scenic beauty in National Parks and Areas of Outstanding Natural Beauty.'
  }
};

// Every policy an application can answer, from either plan
const POLICIES = Object.assign({}, SOUTH_POLICIES, SOUTH_WEST_POLICIES);

const POLICY_CATEGORIES = ['Cross-cutting', 'Economic', 'Environmental', 'Social'];

// Turns { category: [{ code, consideration }] } into what the template loops
// over: each policy with its text, and each supporting document with the
// names of the policies it is linked to.
function build(application) {
  application.policyGroups = POLICY_CATEGORIES
    .filter(category => application.policies[category])
    .map(category => ({
      category,
      policies: application.policies[category].map(p => Object.assign({ code: p.code }, POLICIES[p.code], {
        consideration: p.consideration
      }))
    }));
  (application.supportingDocuments || []).forEach(doc => {
    doc.policies.forEach(link => { link.name = POLICIES[link.code].name; });
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
  }),

  // Two sites either side of the river mouth, one in each marine plan area,
  // so the policies come from both the South and South West plans. It answers
  // every policy from both, ordered so the matching South and South West
  // policies sit next to each other in each category.
  dart: build({
    submittedOffset: -16,
    siteLocationMethod: 'File upload',
    sites: [
      {
        name: 'Kingswear side, Dart estuary entrance',
        map: 'map-3-points.jpg',
        activities: [
          {
            typeOfActivity: 'Maintenance of existing works',
            whatLabel: 'What is being maintained',
            what: 'Navigation buoys',
            description: 'Like for like replacement of 3 green starboard-hand navigation buoys on the east side of the main channel, in the South marine plan area. Each corroded steel buoy, its concrete sinker and its chain will be lifted out and replaced in the same position with a polyethylene buoy fitted with a solar-powered green light, a new 2 tonne concrete sinker and a new ground chain and riser. The sinkers are lowered straight onto the seabed by the workboat crane. No dredging or levelling of the seabed is needed. The old buoys, sinkers and chains will be taken ashore for recycling.',
            maximumDuration: '1 week',
            completionDate: 'Yes – before the start of the sailing season on 1 April 2027',
            specificMonths: 'Yes – January to March only, before salmon and sea trout smolts migrate down the river in April and May.',
            workingHours: 'Monday to Friday, 08:00 to 16:00, around slack water.'
          }
        ],
        drawings: ['kingswear-side-buoy-positions.pdf', 'navigation-buoy-and-sinker-detail.pdf']
      },
      {
        name: 'Dartmouth side, Dart estuary entrance',
        map: 'map-5-points.jpg',
        activities: [
          {
            typeOfActivity: 'Maintenance of existing works',
            whatLabel: 'What is being maintained',
            what: 'Navigation buoys',
            description: 'Like for like replacement of 3 red port-hand navigation buoys on the west side of the main channel, in the South West marine plan area, using the same method, buoys and sinkers as the Kingswear side. The new buoys will have solar-powered red lights.',
            maximumDuration: '1 week',
            completionDate: 'Yes – before the start of the sailing season on 1 April 2027',
            specificMonths: 'Yes – January to March only, before salmon and sea trout smolts migrate down the river in April and May.',
            workingHours: 'Monday to Friday, 08:00 to 16:00, around slack water.'
          }
        ],
        drawings: ['dartmouth-side-buoy-positions.pdf']
      }
    ],
    policies: {
      'Cross-cutting': [
        { code: 'S-CC-1', consideration: 'The works do not change how any other activity in the river mouth operates, so they will not lead to more emissions elsewhere. Better lit buoys mean boats are less likely to go off course or need help.' },
        { code: 'SW-CC-1', consideration: 'There are no saltmarsh, seagrass beds or other habitats that provide flood defence or carbon storage at the Dartmouth side buoy positions. The seagrass patch near the northern buoy is covered under SW-BIO-1.' },
        { code: 'S-CC-2', consideration: 'The polyethylene buoys and heavier sinkers are designed for a 15 year life and to cope with stronger storms and higher sea levels. The lights are solar-powered, so there are no batteries to replace in that time.' },
        { code: 'S-CC-3', consideration: 'Buoys in the channel do not affect the shoreline or how sediment moves along it, so there will be no effect on coastal change.' },
        { code: 'SW-CC-3', consideration: 'As on the Kingswear side, the buoys sit in open water at the channel edge and will have no effect on coastal change on either bank.' },
        { code: 'S-CC-4', consideration: 'There are no habitats that provide flood defence or carbon storage at the Kingswear side buoy positions. Our seagrass survey confirmed this.' },
        { code: 'S-CO-1', consideration: 'The 3 new buoys on the Kingswear side go in exactly the same positions as the ones they replace, so they take up no more space. They mark the channel edge past our mooring trots, which helps the ferries, fishing boats and yachts that share the river mouth.' },
        { code: 'SW-CO-1', consideration: 'On the Dartmouth side the 3 buoys also stay in the same positions. The work will be done one buoy at a time, with the workboat out of the main channel whenever the ferries are crossing.' },
        { code: 'SW-CBC-1', consideration: 'The two sites are either side of the boundary between the South and South West marine plan areas. We have used the same method, dates and mitigation on both sides, and answered the policies from both plans.' },
        { code: 'SW-CE-1', consideration: 'We checked the public register and Dart Harbour’s notices. No other works are planned at the river mouth between January and March 2027. The harbour’s maintenance dredging is not due until 2028.' }
      ],
      'Economic': [
        { code: 'S-AGG-4', consideration: 'No marine aggregates are needed. The concrete sinkers are precast by the supplier using land-won aggregate.' },
        { code: 'S-AQ-2', consideration: 'There is no aquaculture at the river mouth. The mussel lease further up the estuary is not affected.' },
        { code: 'SW-AQ-2', consideration: 'The works do not provide or affect any aquaculture infrastructure.' },
        { code: 'S-CAB-1', consideration: 'No cables are being installed.' },
        { code: 'SW-CAB-1', consideration: 'No cables are being installed. The solar panels and lights are fitted to the buoys themselves.' },
        { code: 'S-CAB-2', consideration: 'There are no subsea cable landfall sites near the Kingswear side buoys.' },
        { code: 'SW-CAB-3', consideration: 'The nearest subsea cable crosses the river about 800 metres upstream, at the Higher Ferry. The works are well clear of it.' },
        { code: 'SW-DD-1', consideration: 'There is no authorised dredging at the buoy positions. Dart Harbour has confirmed the works will not affect its maintenance dredging of the channel.' },
        { code: 'S-DD-2', consideration: 'No dredging is involved, so no material will need to be disposed of.' },
        { code: 'SW-DD-2', consideration: 'The works are not near any licensed disposal site.' },
        { code: 'SW-DD-3', consideration: 'No dredged material will be disposed of.' },
        { code: 'S-INF-1', consideration: 'The buoys mark the way into the harbour, which supports the waterfront businesses, boatyards and ferries in Kingswear.' },
        { code: 'SW-INF-1', consideration: 'The buoys support the harbour, the passenger ferries and the boatyards in Dartmouth, which depend on a safe, well marked channel.' },
        { code: 'SW-INF-2', consideration: 'There are no safeguarded landing facilities at or near the river mouth.' },
        { code: 'S-PS-1', consideration: 'Dart Harbour has approved the replacement. The buoys mark the edge of the channel used by harbour traffic, so keeping them working supports the harbour. There will be no change to the channel or its approaches.' },
        { code: 'SW-PS-1', consideration: 'Reliable lights on the Dartmouth side buoys improve safety of navigation in the harbour approach. The harbour master has agreed the dates, and a notice to mariners will be issued before the work starts.' },
        { code: 'SW-PS-4', consideration: 'The buoys help the passenger and cargo boats that use the river, but the works do not change shipping routes or how goods are moved.' },
        { code: 'S-REN-1', consideration: 'The works are not related to renewable energy supply chains. The new lights are solar-powered.' },
        { code: 'SW-REN-1', consideration: 'Not relevant to these works, apart from the new lights being solar-powered.' }
      ],
      'Environmental': [
        { code: 'SW-AIR-1', consideration: 'The workboat will be on site for about 5 days in total. Its engine is maintained and turned off whenever it is not needed. There will be no lasting effect on air quality.' },
        { code: 'S-BIO-1', consideration: 'Our seagrass survey found no seagrass within 30 metres of any of the Kingswear side buoys. The new sinkers go on the same spots as the old ones, and the ground chains will be no longer than the existing ones, so they will not sweep a larger area of seabed.' },
        { code: 'SW-BIO-1', consideration: 'The survey found a small patch of seagrass about 20 metres from the most northerly buoy on the Dartmouth side. That buoy will be fitted with a mid-line float so its riser chain does not drag on the seabed, and the workboat will not anchor within 50 metres of the patch.' },
        { code: 'S-BIO-2', consideration: 'The works keep the existing buoy positions and do not create any barrier to species moving in and out of the estuary.' },
        { code: 'SW-BIO-2', consideration: 'The buoys do not block the channel, so fish, seals and other species can move through the river mouth as they do now.' },
        { code: 'S-BIO-3', consideration: 'No coastal habitats will be affected. All the works are in the subtidal channel.' },
        { code: 'SW-BIO-3', consideration: 'The works are in the channel, away from the rocky shore and the beaches on the Dartmouth side, so no coastal habitats will be affected.' },
        { code: 'S-BIO-4', consideration: 'No priority habitats were found at the Kingswear side buoy positions, so their distribution and extent will not be reduced.' },
        { code: 'S-DIST-1', consideration: 'Seals and dolphins are sometimes seen at the river mouth. The workboat will slow down and stop work if any come within 100 metres, and only restart once they have moved away.' },
        { code: 'SW-DIST-1', consideration: 'The same measures apply on the Dartmouth side. Work is short and quiet, and only one buoy is worked on at a time.' },
        { code: 'SW-HAB-1', consideration: 'There are no deep sea habitats in the Dart estuary.' },
        { code: 'S-NIS-1', consideration: 'The workboat and lifting gear stay on the Dart, and the new buoys and chains arrive new from the supplier, so there is no risk of bringing in non-native species.' },
        { code: 'SW-INNS-1', consideration: 'The workboat and lifting gear are kept on the Dart and will not be moved from another water body. The new buoys and chains arrive new and clean from the supplier.' },
        { code: 'SW-INNS-2', consideration: 'This policy is for public authorities. We follow the Check, Clean, Dry biosecurity guidance for all our equipment.' },
        { code: 'S-ML-1', consideration: 'This policy is for public authorities. No litter will be left on the shore.' },
        { code: 'SW-ML-1', consideration: 'This policy is for public authorities.' },
        { code: 'S-ML-2', consideration: 'All the old buoys, sinkers and chains will be taken ashore and recycled. Nothing will be left on the seabed.' },
        { code: 'SW-ML-2', consideration: 'The old steel buoys and chains will go to a scrap metal recycler and the old sinkers to a local aggregate recycler. All packaging from the new buoys will be removed on shore.' },
        { code: 'S-MPA-1', consideration: 'The works are not inside a marine protected area. They are small, like for like, and use the existing buoy positions, so we do not expect any effect on the protected areas outside the river mouth.' },
        { code: 'SW-MPA-1', consideration: 'The Dartmouth side works are not inside a marine protected area either. The nearest is in Start Bay, to the south, and the works will have no effect on it.' },
        { code: 'SW-MPA-2', consideration: 'The works will not affect the ability of any marine protected area to adapt to climate change.' },
        { code: 'SW-MPA-3', consideration: 'We are not aware of any statutory advice about deteriorating condition at nearby marine protected areas. The works are well outside them.' },
        { code: 'S-UWN-1', consideration: 'No impulsive sound will be generated, so no data needs to go to the UK Marine Noise Registry.' },
        { code: 'SW-UWN-1', consideration: 'No piling or other impulsive sound is involved. Lowering the sinkers makes only short, low-level noise, so we do not need to submit data to the UK Marine Noise Registry.' },
        { code: 'S-UWN-2', consideration: 'The only noise is the workboat engine and the crane, for a few hours at each buoy. This is no louder than the ferries and fishing boats that use the river every day.' },
        { code: 'SW-UWN-2', consideration: 'As on the Kingswear side, noise will be short, low level and no louder than normal harbour traffic.' },
        { code: 'S-WQ-1', consideration: 'Lifting the old sinkers will stir up a small amount of sediment for a short time. The workboat carries a spill kit and its crane uses biodegradable hydraulic oil.' },
        { code: 'SW-WQ-1', consideration: 'The same measures apply on the Dartmouth side. Work will be done around slack water, so any sediment settles close to where it was disturbed.' },
        { code: 'S-WQ-2', consideration: 'Removing the corroded steel buoys and chains stops rust and old antifouling paint getting into the water.' }
      ],
      'Social': [
        { code: 'S-ACC-1', consideration: 'Kingswear slipway and the paths along the waterfront will stay open. The workboat will load at our own pontoon, not at public landings.' },
        { code: 'SW-ACC-1', consideration: 'Public access on the Dartmouth side is not affected. The ferry slipways and the embankment will stay open throughout.' },
        { code: 'S-ACC-2', consideration: 'The works do not change public access. Safe, well lit buoys make it easier for people in small boats and kayaks to use the river mouth.' },
        { code: 'S-EMP-1', consideration: 'The work will be done by our own moorings team, with an apprentice working alongside them.' },
        { code: 'S-EMP-2', consideration: 'The works do not create new jobs, but they help keep the jobs at the harbour and the boatyards that rely on the channel.' },
        { code: 'SW-EMP-1', consideration: 'As on the Kingswear side, the works support existing marine jobs rather than creating new ones.' },
        { code: 'S-FISH-1', consideration: 'The buoys help the local fishing boats get in and out of the river safely, especially at night and in poor visibility.' },
        { code: 'SW-FISH-1', consideration: 'The 6 fishing boats based in Dartmouth use the channel every day. Reliable lights help them land their catch safely.' },
        { code: 'S-FISH-2', consideration: 'Fishing boats will be able to use the channel throughout. The workboat will only be at each buoy for a few hours, and will move aside for any boat that needs to pass.' },
        { code: 'SW-FISH-2', consideration: 'There is no fishing at the buoy positions. The work does not stop fishing boats getting to or from their moorings.' },
        { code: 'SW-FISH-3', consideration: 'The Dart is a salmon and sea trout river. Working from January to March avoids the spring migration of smolts down the river and the main summer run of adult fish. The buoys sit at the edges of the channel, so the middle of the channel stays clear for migrating fish.' },
        { code: 'S-FISH-4', consideration: 'See SW-FISH-3. The same timing and buoy positions apply on the Kingswear side, so the works will not affect migrating salmon and sea trout.' },
        { code: 'S-HER-1', consideration: 'The new sinkers go on the spots used by the old ones, which have been in place for more than 20 years, so no undisturbed seabed is affected. If anything is found when the old sinkers are lifted, we will report it to the Receiver of Wreck.' },
        { code: 'SW-HER-1', consideration: 'The river mouth is overlooked by Dartmouth Castle. The new buoys are the same size and colours as the old ones, so its setting will not change.' },
        { code: 'S-SOC-1', consideration: 'The works will have no adverse social impact. A notice will go up at the Kingswear ferry slipway to explain what the workboat is doing.' },
        { code: 'SW-SOC-1', consideration: 'A notice will go up on the Dartmouth embankment to explain the works and why the buoys are being replaced.' },
        { code: 'S-SCP-1', consideration: 'The new buoys are the same size, shape and colours as the old ones, so the view from Kingswear and the coast path will not change.' },
        { code: 'SW-SCP-1', consideration: 'The buoys will look the same as the existing ones. The new lights are no brighter, and have the same flashing pattern.' },
        { code: 'S-TR-1', consideration: 'A safe, well marked river mouth supports the sailing, boat trips and other tourism that Kingswear relies on.' },
        { code: 'SW-TR-1', consideration: 'Reliable channel markers help the many visiting yachts and passenger boats that use the river. Working in winter avoids the busy summer season.' },
        { code: 'S-TR-2', consideration: 'The works will be finished before the sailing season starts on 1 April 2027, so there will be no disruption to visitors.' }
      ]
    },
    supportingDocuments: [
      {
        filename: 'dart-buoys-seagrass-survey.pdf',
        type: 'Seagrass survey',
        policies: [
          { code: 'S-BIO-1', location: 'Section 3, pages 4 to 7' },
          { code: 'SW-BIO-1', location: 'Section 4, pages 8 to 11' }
        ]
      }
    ],
    wfd: {
      withinOneNauticalMile: 'Yes',
      excludedActivities: 'No',
      upload: 'dart-buoys-wfd-assessment.pdf'
    },
    otherPermissions: {
      specialLegalPowers: 'No',
      harbourAuthority: 'Dart Harbour. The harbour master has approved the replacement buoys, which match the positions, colours and light characteristics of the existing ones. A notice to mariners will be issued before the work starts.',
      otherAuthorities: 'Trinity House – the buoys are private aids to navigation, and Trinity House has agreed the new lights.',
      preApplicationConsultation: 'We have spoken to the Dart Harbour harbour master, the ferry operators that cross between Dartmouth and Kingswear, Devon and Severn Inshore Fisheries and Conservation Authority and the local sailing clubs. Natural England gave advice through its discretionary advice service in September 2026, which is why we carried out the seagrass survey.'
    }
  }),

  // Redacted, as consultees see the same redacted version as the public
  // register. Copied from the public register's Teignmouth application,
  // which follows the LCML v4 redaction page: ***REDACTED*** marks what was
  // removed from an answer, a document with withheld: true is not shared at
  // all, and a document with replacedBy is shared as the applicant's
  // redacted copy. Its policies are already in policyGroups form, so it
  // does not go through build().
  teignmouth: {
    redacted: true,
    submittedOffset: -8,
    siteLocationMethod: 'File upload',
    sites: [
      {
        name: 'Teignmouth Harbour Outer Pontoon',
        map: 'map-5-points.jpg',
        activities: [
          {
            typeOfActivity: 'Construction of new works',
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
    policyGroups: TEIGNMOUTH_POLICIES,
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
  }
};

module.exports = APPLICATIONS;
