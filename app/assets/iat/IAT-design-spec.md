# Marine Licence IAT – Design Specification

## Where will the activity take place? (/sea)
- **Page type:** Question page
- **H1:** "Where will the activity take place?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#mean-high-water-springs"> mean high water springs (MHWS)</a>, the <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#normal-tidal-limit"> normal tidal limit (NTL) </a>, or the MMO’s <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#jurisdiction">jurisdiction</a>.
- **Component:** Radio buttons
- **Options:**
  - "In the 'Sea'" – hint: 'Sea' includes any area which is <u>submerged</u> at MHWS and the waters of every <u>estuary, river or channel</u> where the tide flows at MHWS tide up to the NTL. Even waters in areas which are closed permanently or intermittently by a lock or other artificial means against the regular action of the tide are included, where seawater flows into or out from the area, either continuously or from time to time. → `/jurisdiction`
  - "Over the 'Sea'" – hint: 'Over' the 'Sea' includes a location directly above or overhanging the 'Sea' such as a bridge, open piled structure or cantilever. → `/jurisdiction`
  - "On or under the 'Seabed'" – hint: 'Seabed' means the ground under the 'Sea' and anything resting on it such as a wreck. It includes the intertidal area of the sea or any river at such time as it is exposed temporarily at low tide. → `/jurisdiction`
  - "Other" – hint: In an area <u>other</u> than those defined above. For example the part of beach <u>above MHWS</u>, the upper extent of a river <u>beyond the NTL</u> and or a land locked body of water such as a lake. → `/exemption/licence-not-required/sea`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## In which waters will the activity take place? (/jurisdiction)
- **Page type:** Question page
- **H1:** "In which waters will the activity take place?"
- **Hint paragraph:** See an illustration of these 'waters' or find out more about the MMO’s <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#jurisdiction">jurisdiction</a>.
- **Component:** Radio buttons
- **Options:**
  - "In English waters" – hint: 'English waters' is the area of 'Sea' within the limits of territorial waters (12 nautical miles) adjacent to the English coastline (the 'inshore' area). This also includes any area of sea beyond the territorial limit (the 'offshore' area), that is within the exclusive economic zone (EEZ) and the UK sector of the continental shelf (up to 200 nautical miles). This excludes the waters of any devolved administration. → `/activity-type`
  - "In Northern Ireland offshore waters" – hint: 'Northern Ireland offshore waters' is the area of 'Sea', adjacent to Northern Ireland beyond the territorial limit, providing it includes the EEZ and the UK sector of the continental shelf (excluding the waters of any other administration). → `/activity-type`
  - "In other UK waters" – hint: 'Other UK waters'means the waters of the devolved administrations of Wales, Scotland or Northern Ireland (excluding Northern Ireland offshore waters). → `/licence-not-required-devolved`
  - "Somewhere else in the world" → `/elsewhere-in-the-world/activity-type`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What type of activity will be carried out? (/elsewhere-in-the-world/activity-type)
- **Page type:** Question page
- **H1:** "What type of activity will be carried out?"
- **Component:** Radio buttons
- **Options:**
  - "Deposit a substance or object" → `/elsewhere-in-the-world/deposit`
  - "Sinking of a vessel or floating container" → `/elsewhere-in-the-world/scuttling`
  - "Incinerate a substance or object" → `/elsewhere-in-the-world/incineration`
  - "Other" → `/exemption/licence-not-required/Activity-elsewhere`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## How will the deposit be made? (/elsewhere-in-the-world/deposit)
- **Page type:** Question page
- **H1:** "How will the deposit be made?"
- **Component:** Radio buttons
- **Options:**
  - "From a British vessel" – hint: 'British vessel' means a vessel which is registered in the United Kingdom, which falls within section 1(1)(d) of the Merchant Shipping Act 1995 (small ships), or which is exempt from registration under section 294 of that Act → `/exemption/licence-required-no-exemption-no-self-service`
  - "From a British marine structure" – hint: 'Marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. 'British marine structure' means a marine structure owned by or leased to an individual residing in, or a body corporate incorporated under the law of, any part of the United Kingdom. → `/exemption/licence-required-no-exemption-no-self-service`
  - "From a British aircraft" – hint: British aircraft” means an aircraft registered in the United Kingdom → `/exemption/licence-required-no-exemption-no-self-service`
  - "From a Floating container and the deposit is controlled by a British vessel, British aircraft or British marine structure" → `/exemption/licence-required-no-exemption-no-self-service`
  - "Other" → `/elsewhere-in-the-world/deposit/where-loaded`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the substance or object to be deposited be loaded? (/elsewhere-in-the-world/deposit/where-loaded)
- **Page type:** Question page
- **H1:** "Where will the substance or object to be deposited be loaded?"
- **Component:** Radio buttons
- **Options:**
  - "United Kingdom (except Scotland)" → `/exemption/licence-required-no-exemption-no-self-service`
  - "UK marine licensing area" – hint: Find out more about the <a target="_blank" href="https://www.legislation.gov.uk/ukpga/2009/23/section/42">UK marine licensing area</a> → `/exemption/licence-required-no-exemption-no-self-service`
  - "Somewhere else" → `/exemption/licence-not-required/deposit-method-elsewhere`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the incineration take place? (/elsewhere-in-the-world/incineration)
- **Page type:** Question page
- **H1:** "Where will the incineration take place?"
- **Component:** Radio buttons
- **Options:**
  - "On a British vessel" – hint: 'British vessel' means a vessel which is registered in the United Kingdom, which falls within section 1(1)(d) of the Merchant Shipping Act 1995 (small ships), or which is exempt from registration under section 294 of that Act → `/exemption/licence-required-no-exemption-no-self-service`
  - "On a British marine structure" – hint: 'Marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. 'British marine structure' means a marine structure owned by or leased to an individual residing in, or a body corporate incorporated under the law of, any part of the United Kingdom. → `/exemption/licence-required-no-exemption-no-self-service`
  - "On a floating container controlled from a British vessel, British aircraft, or British marine structure." – hint: 'British aircraft' means an aircraft registered in the United Kingdom. → `/exemption/licence-required-no-exemption-no-self-service`
  - "Other" → `/elsewhere-in-the-world/incineration/where-loaded`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the substance or object to be incinerated be loaded?  (/elsewhere-in-the-world/incineration/where-loaded)
- **Page type:** Question page
- **H1:** "Where will the substance or object to be incinerated be loaded? "
- **Component:** Radio buttons
- **Options:**
  - "United Kingdom (except Scotland)" → `/exemption/licence-required-no-exemption-no-self-service`
  - "UK marine licensing area" – hint: Find out more about the <a target="_blank" href="https://www.legislation.gov.uk/ukpga/2009/23/section/42">UK marine licensing area</a> → `/exemption/licence-required-no-exemption-no-self-service`
  - "Somewhere else" → `/exemption/licence-not-required/incineration-method-elsewhere`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## How will the sinking be controlled? (/elsewhere-in-the-world/scuttling)
- **Page type:** Question page
- **H1:** "How will the sinking be controlled?"
- **Component:** Radio buttons
- **Options:**
  - "From a British vessel" – hint: 'British vessel' means a vessel which is registered in the United Kingdom, which falls within section 1(1)(d) of the Merchant Shipping Act 1995 (small ships), or which is exempt from registration under section 294 of that Act → `/exemption/licence-required-no-exemption-no-self-service`
  - "From a British aircraft" – hint: British aircraft” means an aircraft registered in the United Kingdom → `/exemption/licence-required-no-exemption-no-self-service`
  - "From a British marine structure" – hint: 'Marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. 'British marine structure' means a marine structure owned by or leased to an individual residing in, or a body corporate incorporated under the law of, any part of the United Kingdom. → `/exemption/licence-required-no-exemption-no-self-service`
  - "Other" → `/elsewhere-in-the-world/scuttling/towed-or-propelled-from-uk`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the vessel or container be towed or propelled from, for the purpose of its sinking? (/elsewhere-in-the-world/scuttling/towed-or-propelled-from-uk)
- **Page type:** Question page
- **H1:** "Where will the vessel or container be towed or propelled from, for the purpose of its sinking?"
- **Component:** Radio buttons
- **Options:**
  - "United Kingdom (except Scotland)" → `/exemption/licence-required-no-exemption-no-self-service`
  - "UK marine licensing area (unless towing or propelling began outside of that area)" – hint: Find out more about the <a target="_blank" href="https://www.legislation.gov.uk/ukpga/2009/23/section/42">UK marine licensing area</a> → `/exemption/licence-required-no-exemption-no-self-service`
  - "Somewhere else" → `/exemption/licence-not-required/scuttling-method-elsewhere`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What type of activity will be carried out? (/activity-type)
- **Page type:** Question page
- **H1:** "What type of activity will be carried out?"
- **Hint paragraph:** HINT: Try to think about what you intend to do at a basic level. For example if you plan to take sediment samples for testing or analysis, the type of activity that will take place is a removal activity. If the activity involves the building of something new, or the maintenance, alteration or improvement of something that already exists, then the activity that will take place is a construction activity.<p> </br> Doing more than one thing? If your project involves multiple activities make sure you check each separately starting with the main or most significant activity.
- **Component:** Radio buttons
- **Options:**
  - "Construction" – hint: Including maintenance, alteration and improvement of works and the laying of cables or pipelines.<br/>Find out more about <a target="_blank" href="https://www.gov.uk/guidance/construction-alteration-or-improvement-of-works">construction, maintenance, alteration and improvement</a> → `/construction/journey-select`
  - "Deposit of a substance or object" – hint: Find out more about <a target="_blank" href="https://www.gov.uk/guidance/deposits#deposit-of-any-substance-or-object">deposits</a> → `/deposit/method`
  - "Removal of a substance or object" – hint: Find out more about <a target="_blank" href="https://www.gov.uk/guidance/removal-of-any-substance-or-object">removals</a> → `/removal/method`
  - "Dredging" – hint: Please note: The <u>disposal</u> of dredged material is a different activity to <u>dredging</u>. Disposal activities can be checked by choosing 'Deposit of a substance or object' but in most cases deposit or disposal of dredged material to sea will require a marine licence.<br/>Find out more about <a target="_blank" href="https://www.gov.uk/guidance/dredging">dredging</a> → `/dredging/journey-select`
  - "Incineration of a substance or object" – hint: Find out more about <a target="_blank" href="https://www.gov.uk/guidance/incineration-of-any-substance-or-object">incineration</a> → `/incineration/method`
  - "Use of an explosive substance" – hint: Find out more about <a target="_blank" href="https://www.gov.uk/guidance/deposits#deposit-or-use-of-explosives">explosives</a> → `/exemption/licence-required-no-exemption`
  - "Sinking of a vessel or floating container" – hint: Find out more about <a target="_blank" href="https://www.gov.uk/guidance/scuttling-of-any-floating-vessel-or-container">scuttling</a> → `/exemption/licence-required-no-exemption`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## How will the substance or object be deposited? (/deposit/method)
- **Page type:** Question page
- **H1:** "How will the substance or object be deposited?"
- **Component:** Radio buttons
- **Options:**
  - "From a vehicle or vessel" – hint: 'vessel' includes hovercraft and any other craft capable of travelling on, in or under water, whether or not self-propelled. → `/deposit/journey-select`
  - "From an aircraft" → `/deposit/journey-select`
  - "From a marine structure" – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/deposit/journey-select`
  - "From a floating container in the 'Sea'" → `/deposit/journey-select`
  - "From a structure on land constructed or adapted wholly or mainly for the purposes of depositing solids in the 'Sea'" → `/deposit/journey-select`
  - "Other" → `/exemption/licence-not-required/deposit-method`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## How will the removal be carried out? (/removal/method)
- **Page type:** Question page
- **H1:** "How will the removal be carried out?"
- **Component:** Radio buttons
- **Options:**
  - "Using a vehicle or vessel" – hint: Includes using a winch or other device on the vehicle or vessel. </br>'Vessel' includes hovercraft and any other craft capable of travelling on, in or under water, whether or not self-propelled. → `/removal`
  - "Using an aircraft" → `/removal`
  - "Using a marine structure" – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/removal`
  - "Using a floating container in the 'Sea'" – hint: 'Floating container' includes an 'airbag' or 'lifting bag' → `/removal`
  - "Using a structure on land constructed or adapted wholly or mainly for the purposes of depositing solids in the 'Sea'" → `/removal`
  - "Other" → `/exemption/licence-not-required/removal-method`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the substance or object to be removed, be removed from the 'Seabed'? (/removal)
- **Page type:** Question page
- **H1:** "Will the substance or object to be removed, be removed from the 'Seabed'?"
- **Hint paragraph:** 'Seabed' means the ground under the 'Sea' and anything resting on it such as a wreck. It includes the intertidal area of the sea or any river at such time as it is exposed temporarily at low tide.<p><p>'Sea' includes any area which is submerged at MHWS and the waters of every estuary, river or channel where the tide flows at MHWS tide up to the NTL. Even waters in areas which are closed permanently or intermittently by a lock or other artificial means against the regular action of the tide are included, where seawater flows into or out from the area, either continuously or from time to time.<p><p>Find out more about the MMO’s <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#what-do-we-mean-by-the-sea">jurisdiction</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/removal/journey-select`
  - "No" → `/exemption/licence-not-required/removal-seabed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the substance or object be incinerated? (/incineration/method)
- **Page type:** Question page
- **H1:** "Where will the substance or object be incinerated?"
- **Component:** Radio buttons
- **Options:**
  - "On a vehicle" → `/exemption/licence-required-no-exemption`
  - "On a vessel" – hint: 'vessel' includes hovercraft and any other craft capable of travelling on, in or under water, whether or not self-propelled. → `/exemption/licence-required-no-exemption`
  - "On a marine structure" – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/exemption/licence-required-no-exemption`
  - "On a floating container" → `/exemption/licence-required-no-exemption`
  - "Other" → `/exemption/licence-not-required/Incineration-on`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select an activity type that matches with the activity to be carried out. (/construction/activity)
- **Page type:** Question page
- **H1:** "Please select an activity type that matches with the activity to be carried out."
- **Hint paragraph:** <p>Only one activity type may be included in a self-service licence. The process may be repeated where additional self-service activities are required and criteria permits.</p><p>If you prefer to combine multiple self-service activity types listed in a single licence you will be subject to the standard marine licence process.</p><p>To apply for more than one of the activities listed below in a single application or to apply for a marine licence for an activity type not listed please select 'Other'.</p>
- **Component:** Radio buttons
- **Options:**
  - "Maintenance of existing structures or assets" – hint: 'Maintenance' means the upkeep or repair of an existing structure or asset wholly within its existing 3 dimensional boundaries → `/construction/maintenance-existing-works`
  - "Other" – hint: An activity type not listed above → `/standard-marine-licence-application/other-activity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select an activity type that matches with the activity to be carried out. (/deposit/activity)
- **Page type:** Question page
- **H1:** "Please select an activity type that matches with the activity to be carried out."
- **Hint paragraph:** <p>Only one activity type may be included in a self-service licence. The process may be repeated where additional self-service activities are required, where criteria permits.</p><p>If you prefer to combine multiple self-service activity types listed in a single licence you will be subject to the standard marine licence process.</p><p>To apply for more than one of the activities listed below in a single application or to apply for a marine licence for an activity type not listed please select 'Other'.</p>
- **Component:** Radio buttons
- **Options:**
  - "Deposit of markers" → `/deposit/markers/harbour-authority`
  - "Burial at Sea" – hint: The Burial at Sea of the human remains of the deceased identified in the associated application, subject to the criteria and conditions contained in the licence document. → `/burial-at-sea/completion`
  - "Other" – hint: An activity type not listed above → `/standard-marine-licence-application/other-activity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select an activity type that matches with the activity to be carried out. (/removal/activity)
- **Page type:** Question page
- **H1:** "Please select an activity type that matches with the activity to be carried out."
- **Hint paragraph:** <p>Only one activity type may be included in a self-service licence. The process may be repeated where additional self-service activities are required, where criteria permits.</p><p>If you prefer to combine multiple self-service activity types listed in a single licence you will be subject to the standard marine licence process.</p><p>To apply for more than one of the activities listed below in a single application or to apply for a marine licence for an activity type not listed please select 'Other'.</p>
- **Component:** Radio buttons
- **Options:**
  - "Minor removals" → `/removal/activities`
  - "Other" – hint: An activity type not listed above → `/standard-marine-licence-application/other-activity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select an activity type that matches with the activity to be carried out. (/dredging/activity)
- **Page type:** Question page
- **H1:** "Please select an activity type that matches with the activity to be carried out."
- **Hint paragraph:** <p>Only one activity type may be included in a self-service licence. The process may be repeated where additional self-service activities are required, where criteria permits.</p><p>If you prefer to combine multiple self-service activity types listed in a single licence you will be subject to the standard marine licence process.</p><p>To apply for more than one of the activities listed below in a single application or to apply for a marine licence for an activity type not listed please select 'Other'.</p>
- **Component:** Radio buttons
- **Options:**
  - "Non-navigational clearance dredging" → `/dredging/activities`
  - "Beach maintenance activities" → `/dredging/beach-maintenance/activities`
  - "Other" – hint: An activity type not listed above → `/standard-marine-licence-application/other-activity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select sub-activites that match with activities proposed to be carried out. (/construction/maintenance-existing-works)
- **Page type:** Question page
- **H1:** "Please select sub-activites that match with activities proposed to be carried out."
- **Hint paragraph:** When selecting sub-activities please read each activity description carefully. You must be satisfied that your activity does not extend beyond the scope of that set out. <br/> NOTE: Multiple sub-activities can be selected.
- **Component:** Radio buttons
- **Options:**
  - "Scaffolding or access towers" – hint: The erection and subsequent removal of scaffolding and or access towers for the purpose of maintaining existing structures or assets described in the associated application, subject to the criteria and conditions contained in this licence document. → `None`
  - "Re-painting of existing structures or assets" – hint: The re-painting of existing structures or assets, including preparation work, described in the associated application, subject to the criteria and conditions contained in the licence document. 'Preparation' is defined as the basic cleaning or priming of the existing surface to enable re-painting to occur. → `None`
  - "Sand or grit blasting" – hint: The use of sand or grit blasting undertaken for the purpose of maintaining an existing structure or asset described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Removal of marine growth" – hint: The removal of marine growth and guano from existing structures or assets (excluding vessels) described in the associated application, subject to the criteria and conditions contained in the licence document. The removal may only be undertaken using unheated water. No chemicals, biocides are permitted. The marine growth must be removed from the structure or asset in-situ. → `None`
  - "Re-rendering, resurfacing or repointing of existing structures or slipways" – hint: The re-rendering, resurfacing or repointing of existing structures or slipways within existing boundaries, described in the associated application and subject to the criteria and conditions contained in the licence document. → `None`
  - "Removal of a single pile" – hint: The removal of a single pile not exceeding 1m in diameter and not displaying any aids to navigation, described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Replacing a single pile" – hint: The replacement of a single pile not exceeding 1m in diameter described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Installation of ladders" – hint: The installation of ladders at a location on an existing structure or asset described in the associated application, where they were not previously found, subject to the criteria and conditions contained in the licence document. → `None`
  - "Minor maintenance" – hint: Minor maintenance comprising the upkeep or small scale repair of an existing structure or asset within its existing 3 dimensional boundaries described in the associated application, subject to the criteria and conditions contained in the licence document. Minor maintenance includes the replacement or reasonable improvement of removable items or ancillary equipment which form part of the structure/asset. → `None`
  - "Other maintenance" → `None`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the proposed activity impede safe or normal navigation through the reduction of head clearance or navigational channel width? (/construction/maintenance-existing-works/scaffolding)
- **Page type:** Question page
- **H1:** "Will the proposed activity impede safe or normal navigation through the reduction of head clearance or navigational channel width?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/construction/maintenance-existing-works/scaffolding/harbour-authority`
  - "No" → `/activity/completion`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the proposed activity be carried out within the jurisdiction of a harbour authority? (/construction/maintenance-existing-works/scaffolding/harbour-authority)
- **Page type:** Question page
- **H1:** "Will the proposed activity be carried out within the jurisdiction of a harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/construction/maintenance-existing-works/scaffolding/harbour-authority-agreed`
  - "No" → `/construction/maintenance-existing-works/scaffolding/mca-th-agreed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has a method been agreed with the harbour authority? (/construction/maintenance-existing-works/scaffolding/harbour-authority-agreed)
- **Page type:** Question page
- **H1:** "Has a method been agreed with the harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/activity/completion`
  - "No" → `/scaffolding-impede-navigation`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has a method been agreed with the Maritime and Coastguard Agency and/or Trinity House? (/construction/maintenance-existing-works/scaffolding/mca-th-agreed)
- **Page type:** Question page
- **H1:** "Has a method been agreed with the Maritime and Coastguard Agency and/or Trinity House?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/activity/completion`
  - "No" → `/scaffolding-mca-th-agreed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the proposed activity be carried out within the jurisdiction of a harbour authority? (/deposit/markers/harbour-authority)
- **Page type:** Question page
- **H1:** "Will the proposed activity be carried out within the jurisdiction of a harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/deposit/markers/lighting-ha`
  - "No" → `/deposit/markers/lighting-th`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Have lighting and configuration requirements been agreed with the harbour authority? (/deposit/markers/lighting-ha)
- **Page type:** Question page
- **H1:** "Have lighting and configuration requirements been agreed with the harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/deposit/markers/activities`
  - "No" → `/markers/ha-not-agreed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Have lighting and configuration requirements been agreed with Trinity House? (/deposit/markers/lighting-th)
- **Page type:** Question page
- **H1:** "Have lighting and configuration requirements been agreed with Trinity House?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/deposit/markers/activities`
  - "No" → `/markers/th-not-agreed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the proposed activity be completed within 3 months from the date of submission? (/burial-at-sea/completion)
- **Page type:** Question page
- **H1:** "Will the proposed activity be completed within 3 months from the date of submission?"
- **Hint paragraph:** Activities which cannot be completed within the 3 month period following the issue of the licence are not suitable for self-service marine licensing.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/burial-at-sea/site`
  - "No" → `/standard-marine-licence-application/bas-duration`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select a burial site: (/burial-at-sea/site)
- **Page type:** Question page
- **H1:** "Please select a burial site:"
- **Component:** Radio buttons
- **Options:**
  - "Needles, Isle of Wight" → `/burial-at-sea/site/needles`
  - "Tynemouth, Northumberland" → `/burial-at-sea/site/tynemouth`
  - "Between Hastings and Newhaven, South Coast" → `/burial-at-sea/site/between-hastings-and-newhaven`
  - "Other location" → `/standard-marine-licence-application/bas-other-location`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has all relevant documentation relating to the deceased been obtained? (/burial-at-sea/site/needles)
- **Page type:** Question page
- **H1:** "Has all relevant documentation relating to the deceased been obtained?"
- **Hint paragraph:** 'Relevant documentation' means: <p><br/></li><li>a death certificate<br/></li><li>a Certificate of Freedom from Fever and Infection (available from the deceased person’s GP or hospital doctor)<br/> </li><li>a Notice to a Coroner of Intention to Remove a Body out of England (available from the coroner in exchange for a Certificate of Disposal provided by the registrar)<br/> </li><li>a signed DNA sample consent form (required for The Needles site only).<p><p>Additional information about relevant documentation can be found at <a target="_blank" href="https://www.gov.uk/guidance/how-to-get-a-licence-for-a-burial-at-sea-in-england"> GOV.UK</a>.<p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/fast-track-mla`
  - "No" → `/fast-track-mla/bas-block`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has all relevant documentation relating to the deceased been obtained? (/burial-at-sea/site/tynemouth)
- **Page type:** Question page
- **H1:** "Has all relevant documentation relating to the deceased been obtained?"
- **Hint paragraph:** 'Relevant documentation' means: <p><br/></li><li>a death certificate<br/></li><li>a Certificate of Freedom from Fever and Infection (available from the deceased person’s GP or hospital doctor)<br/> </li><li>a Notice to a Coroner of Intention to Remove a Body out of England (available from the coroner in exchange for a Certificate of Disposal provided by the registrar)<p><p>Additional information about relevant documentation can be found at <a target="_blank" href="https://www.gov.uk/guidance/how-to-get-a-licence-for-a-burial-at-sea-in-england"> GOV.UK</a>.<p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/fast-track-mla`
  - "No" → `/fast-track-mla/bas-block`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has all relevant documentation relating to the deceased been obtained? (/burial-at-sea/site/between-hastings-and-newhaven)
- **Page type:** Question page
- **H1:** "Has all relevant documentation relating to the deceased been obtained?"
- **Hint paragraph:** 'Relevant documentation' means: <p><br/></li><li>a death certificate<br/></li><li>a Certificate of Freedom from Fever and Infection (available from the deceased person’s GP or hospital doctor)<br/> </li><li>a Notice to a Coroner of Intention to Remove a Body out of England (available from the coroner in exchange for a Certificate of Disposal provided by the registrar)<p><p>Additional information about relevant documentation can be found at <a target="_blank" href="https://www.gov.uk/guidance/how-to-get-a-licence-for-a-burial-at-sea-in-england"> GOV.UK</a>.<p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/fast-track-mla`
  - "No" → `/fast-track-mla/bas-block`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select sub-activites that match with activities proposed to be carried out. (/removal/activities)
- **Page type:** Question page
- **H1:** "Please select sub-activites that match with activities proposed to be carried out."
- **Component:** Radio buttons
- **Options:**
  - "Litter" – hint: The removal of litter, using vehicles or vessels, described in the associated application and subject to the criteria and conditions contained in the licence document. In this case the term 'litter' is defined as an accumulation of items and materials below mean high water springs (MHWS). This includes marine litter which has been collected by hand (specifically a mass of items rather than discrete object) but is subsequently stored below MHWS to be removed using a vehicle or vessel. → `None`
  - "Discreet minor objects" – hint: The removal of discrete minor objects of recent origin from the seabed, described in the associated application, subject to the criteria and conditions contained in the licence document. 'Minor objects' is defined as discrete debris. 'Recent origin' is defined as an object appearing to be no more than 10 years old. → `None`
  - "Discreet minor objects from heritage designations" – hint: The removal of discrete minor objects from a heritage designation described in the associated application, subject to the criteria and conditions contained in the licence document. The activity must be carried out in accordance with a valid consent or agreed method statement from Historic England (or relevant local authority in respect of listed buildings). "Heritage designation" is defined as:- Protected wrecks designated under the Protection of Wrecks Act 1973; Scheduled monuments designated under the Ancient Monuments and Archaeological Areas Act 1979; and Listed buildings designated under The Planning (Listed Buildings and Conservation Area) Act 1990. → `None`
  - "Discreet minor objects of archaeological or historic interest" – hint: The removal of discrete minor objects of archaeological or historic interest from the seabed, described in the associated application, subject to the criteria and conditions contained in the licence document. "Minor objects" is defined as discrete debris. "Archaeological or historic interest" includes all traces of human existence having a cultural, historical or archaeological character such as: (i) sites, structures, buildings, artefacts and human remains, together with their archaeological and natural context; (ii) vessels, aircraft, other vehicles or any part thereof, their cargo or other contents, together with their archaeological and natural context; and (iii) objects of prehistoric character. → `None`
  - "Boreholes" – hint: The taking of boreholes up to 4 cubic metres in volume described in the associated application, subject to the criteria and conditions contained in the licence document. Within 1 nm of the shore: 1) Each borehole must be located at least 25 metres from any other borehole included in the same application. 2) The maximum number of boreholes must not exceed 5 including any under other licences which form as part of the project as a whole. Beyond 1nm of the shore: 1) Each borehole must be located at least 500 metres from any other borehole included in the same application. 2) The maximum number of boreholes must not exceed 20 including any under other licences which form as part of the project as a whole. → `None`
  - "Trial pits" – hint: The excavation and reinstatement of trial pits described in the associated application, subject to the criteria and conditions contained in the licence document. Within 1 nm of the shore: 1) The pit is no larger than 1 metre x 4 metres in plan area and 2 metres depth; 2) The pit is at least 25 metres from any other trial pit included in the same application; and 3) The total number of trial pits does not exceed 5 including any under other licences which form as part of the project as a whole. Beyond 1nm of the shore: 1) The pit is no larger than 2 metres x 4 metres in plan area and up to 2 metres depth. 2) Each trial pit must be located at least 100 metres from any other trial pit included in the same application. 3) The total number of trial pits does not exceed 20 including any under other licences which form as part of the project as a whole. → `None`
  - "Grab samples" – hint: The taking of grab samples (sediment samples) up to 4 cubic metres in volume, described in the associated application, subject to the criteria and conditions contained in the licence document. Within 1 nm of the shore: 1) Each grab must be located at least 25 metres from any other grab included in the same application. 2) The maximum number of grabs must not exceed 5 including any under other licences which form as part of the project as a whole. Beyond 1nm of the shore: 1) Each grab is located at least 500 metres from any other grabs including those in the same application. 2) The maximum number of grabs does not exceed 20 including any under other licences which form as part of the project as a whole. → `None`
  - "Removal of a single pile" – hint: The removal of a single pile not exceeding 1m in diameter and not displaying any aids to navigation, described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Other removals" → `None`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select sub-activites that match with activities proposed to be carried out. (/dredging/activities)
- **Page type:** Question page
- **H1:** "Please select sub-activites that match with activities proposed to be carried out."
- **Component:** Radio buttons
- **Options:**
  - "Non-navigational clearance dredging (within a heritage designation or a wreck site elsewhere in the sea)" – hint: The removal of material within a heritage designation or a wreck site elsewhere in the sea, described in the associated application, subject to the criteria and conditions contained in the licence document. The activity must be for the purpose of preserving a historic asset or exposing such an asset for the same purpose, or for the purpose of archaeological survey or investigation. The activity must be carried out in accordance with a valid consent or agreed method statement from Historic England. The maximum amount of material removed cannot exceed 500 cubic metres in a single dredge campaign and cannot exceed 1500 cubic metres in any 12 month period. The maximum footprint of material to be removed cannot exceed 350 square metres in a single dredge campaign. "Heritage designation" is defined as:- Protected wrecks designated under the Protection of Wrecks Act 1973; Scheduled monuments designated under the Ancient Monuments and Archaeological Areas Act 1979; and Listed buildings designated under The Planning (Listed Buildings and Conservation Area) Act 1990. "Wreck site" the location of any aircraft or vessel lying wrecked on or in the seabed or of any objects contained or formerly contained in it lying on or in the seabed near the wreck. → `None`
  - "Non-navigational clearance dredging (for operational purposes)" – hint: The removal of material which has accumulated around/within a structure described in the associated application, that is clearly impacting the structures ability to operate, subject to the criteria and conditions contained in the licence document. This may include but is not limited to removing silt from: intake pipes, outfalls, valves or beneath pontoons. The maximum amount of material removed cannot exceed 500 cubic metres in a single dredge campaign and cannot exceed 1500 cubic metres in any 12 month period. Individual dredge campaigns must be separated by at least one month. The maximum footprint of material to be removed cannot exceed 350 square metres in a single dredge campaign. → `None`
  - "Other clearance dredging" → `None`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select sub-activites that match with activities proposed to be carried out. (/dredging/beach-maintenance/activities)
- **Page type:** Question page
- **H1:** "Please select sub-activites that match with activities proposed to be carried out."
- **Component:** Radio buttons
- **Options:**
  - "Beach re-profiling" – hint: The re-profiling of a beach described in the associated application, subject to the criteria and conditions contained in the licence document. 'Re-profiling' is defined as the movement of beach material up or down the beach. The profile must be consistent with one that existed at the location in the previous 10 years. → `None`
  - "Beach recycling" – hint: The recycling of material on a beach described in the associated application, subject to the criteria and conditions contained in the licence document. 'Recycling' is defined as the movement of material along the beach from areas of accretion to areas of erosion within the beach. → `None`
  - "Replacing wind blown sand" – hint: The direct return of recently deposited wind-blown sand to its area of origin on a beach, described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Other beach maintenance" → `None`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Please select sub-activites that match with activities proposed to be carried out. (/deposit/markers/activities)
- **Page type:** Question page
- **H1:** "Please select sub-activites that match with activities proposed to be carried out."
- **Component:** Radio buttons
- **Options:**
  - "Marker posts" – hint: The deposit of marker posts for the purpose of marking channels, shallow water areas, points of interest, the end of outfalls, groynes and similar, described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Marker buoys" – hint: The deposit and subsequent removal of marker buoys for the purpose of marking channels, shallow water areas, points of interest, the end of outfalls, groynes and similar, including racing markers, described in the associated application, subject to the criteria and conditions contained in the licence document. → `None`
  - "Other deposits" → `None`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the proposed activities be completed within 12 months from the date of submission? (/activity/completion)
- **Page type:** Question page
- **H1:** "Will the proposed activities be completed within 12 months from the date of submission?"
- **Hint paragraph:** Activities which cannot be completed within the 12 month period following the issue of the licence are not suitable for self-service marine licensing.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/public-register`
  - "No" → `/standard-marine-licence-application/duration`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is there any information in your application (including supporting documents) that you believe should be withheld from the MMO Public Register? (/public-register)
- **Page type:** Question page
- **H1:** "Is there any information in your application (including supporting documents) that you believe should be withheld from the MMO Public Register?"
- **Hint paragraph:** <p>The MMO is required to maintain a register of activities. Information contained within or provided in support of applications will therefore be placed on the MMO's Public Register. Information may be withheld if the MMO determines that:<ul><li>its disclosure would be contrary to the interests of national security; or</li><li>its disclosure would adversely affect confidentiality of commercial or industrial information where such confidentiality is provided by law to protect legitimate commercial interest.</li></ul></p><p>Self-service applications and supporting information will be published on the MMO public register in full. If you indicate any of the information provided should be withheld for one of the reasons set out you will be redirected to standard licensing so that the request can be considered against the appropriate framework.</p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/standard-marine-licence-application/public-register`
  - "No" → `/part-of-larger-project`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the activities part of a larger project? (/part-of-larger-project)
- **Page type:** Question page
- **H1:** "Are the activities part of a larger project?"
- **Hint paragraph:** Self-service marine licensing is intended to enable small scale low risk activities to be regulated in a proportionate manner. Activities forming part of active larger projects which require environmental impact assessment will not be suitable for self-service.<p><p>Find out more about <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-impact-assessments#EIA"> EIA </a>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/eia-directive`
  - "No" → `/single-location`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the project include any of the following: </li><li> construction of something new; </li><li>dismantling or decommissioning; </li><li>the reclamation of land from the sea. (/eia-directive)
- **Page type:** Question page
- **H1:** "Does the project include any of the following: </li><li> construction of something new; </li><li>dismantling or decommissioning; </li><li>the reclamation of land from the sea."
- **Hint paragraph:** The question seeks to establish whether the project that the activity forms part of is one that is likely to fall within <a target="_blank" href="http://www.legislation.gov.uk/uksi/2007/1518/schedule/A1"> schedule A1</a> or <a target="_blank" href="http://www.legislation.gov.uk/uksi/2007/1518/schedule/A2"> schedule A2 </a> of the Marine Works (Environmental Impact Assessment) Regulations 2007 (As amended). If you believe your project is one capable of falling within schedule A1 or A2 you should answer 'yes'.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/activities/ground`
  - "No" → `/single-location`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the activities related to ground investigations or similar, the purpose of which is to inform assessment of the likely impacts of the project? (/activities/ground)
- **Page type:** Question page
- **H1:** "Are the activities related to ground investigations or similar, the purpose of which is to inform assessment of the likely impacts of the project?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/single-location`
  - "No" → `/screening-screened-out`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has a screening opinion been requested and project "screened out" by the MMO? (/screening-screened-out)
- **Page type:** Question page
- **H1:** "Has a screening opinion been requested and project "screened out" by the MMO?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-impact-assessments#EIA">screening</a>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/single-location`
  - "No" → `/not-screened-out`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the proposed activity be carried out at a single location not exceeding an area covering 10 square miles? (/single-location)
- **Page type:** Question page
- **H1:** "Will the proposed activity be carried out at a single location not exceeding an area covering 10 square miles?"
- **Hint paragraph:** Self-service marine licensing is intended to enable small scale low risk activities to be regulated in a proportionate manner and as such activities carried out at locations that exceed an area covering 10 square miles will not be suitable for self-service.<p><p> Despite the maximum coverage extent of 10 square miles you should always be as specific as possible when defining the area(s) that your activity will be carried out. This means that in circumstances where you intend to carry out multiple activities over a larger area the MMO advises that these areas are broken down into individual sites rather than being treated as a single overarching site. In order to do this you must answer 'No' to the above question. <p> The <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO GIS site search tool</a> contains a measuring tool to assist. <p>Further, to find out how to use the drawing tool in <a target="_blank" href="https://magic.defra.gov.uk/MagicMap.aspx"> Magic Maps</a> to produce a shapefile that can be used to easily upload site locations to any future application watch the <a target="_blank" href="https://www.youtube.com/watch?v=q9OT4wSD2JE "> MMO coordinate video </a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/military-defence-area`
  - "No" → `/multiple-locations`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## If multiple activity locations are proposed will each activity location be within 10 miles of the other and not exceed a total area of 10 square miles? (/multiple-locations)
- **Page type:** Question page
- **H1:** "If multiple activity locations are proposed will each activity location be within 10 miles of the other and not exceed a total area of 10 square miles?"
- **Hint paragraph:** Self-service marine licensing is intended to enable small scale low risk activities to be regulated in a proportionate manner and as such activities carried out at locations that exceed an area covering 10 square miles will not be suitable for self-service.<p><p> Despite the maximum coverage extent of 10 square miles you should always be as specific as possible when defining the area(s) that your activity will be carried out. This means that in circumstances where you intend to carry out multiple activities over a larger area the MMO advises that these areas are broken down into individual sites rather than being treated as a single overarching site. <p> The <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO GIS site search tool</a> contains a measuring tool to assist. <p>Further, to find out how to use the drawing tool in <a target="_blank" href="https://magic.defra.gov.uk/MagicMap.aspx"> Magic Maps</a> to produce a shapefile that can be used to easily upload site locations to any future application watch the <a target="_blank" href="https://www.youtube.com/watch?v=q9OT4wSD2JE "> MMO coordinate video </a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/military-defence-area`
  - "No" → `/standard-marine-licence-application/ten-square-miles`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activities be carried out in an area used for military or defence purposes? (/military-defence-area)
- **Page type:** Question page
- **H1:** "Will the activities be carried out in an area used for military or defence purposes?"
- **Hint paragraph:** <p>UK waters are a crucial environment in which MOD (Ministry of Defence - including HM Armed Forces and the Royal Fleet Auxiliary) must maintain and deploy the operational capability required to achieve security for the people of the UK and Overseas Territories.</p><p>The MOD has the power to regulate sea areas and restrict their use either temporarily or permanently. Marine activities should not prejudice the interest of defence and national security.</p><p>Activities proposed to be carried out in areas used for military or defence purposes will not be suitable for self-service unless the activity is carried out by or on behalf of the MOD or the MOD has been consulted and permission to carry out the activity has been granted.</p><p>If you are unsure of whether the activity falls within such an area you should select the appropriate layer(s) in the <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a>.</p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/ministry-of-defence`
  - "No" → `/admiralty-chart`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the MOD? (/ministry-of-defence)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the MOD?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/admiralty-chart`
  - "No" → `/ministry-of-defence/permission`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has permission from the MOD been sought and granted? (/ministry-of-defence/permission)
- **Page type:** Question page
- **H1:** "Has permission from the MOD been sought and granted?"
- **Hint paragraph:** <p>For queries regarding permissions to carry out activities within military/defence areas, please contact the MOD at:<br/><ul><li>Jon Wilson (DIO estates safeguarding)</li><li>DIOSEE-EPSSG3@mod.uk</li></ul></p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/admiralty-chart`
  - "No" → `/mod-permission`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out on a site that is shown on an admiralty chart as hosting cables, pipelines or other structures? (/admiralty-chart)
- **Page type:** Question page
- **H1:** "Will the activity be carried out on a site that is shown on an admiralty chart as hosting cables, pipelines or other structures?"
- **Hint paragraph:** <p>The UK marine area has many existing uses. Self-service marine licensing is intended to enable small scale low risk activities to be regulated in a proportionate manner. New activities have the potential to impact or conflict with existing uses where they are not related and therefore more detailed consideration ensuring compliance with the Marine Policy Statement and relevant Marine plans where they exist is necessary.</p><p>Activities proposed to be carried out on a site that is shown on an admiralty chart as hosting cables, pipelines or other existing assets or structures will not be suitable for self-service unless the proposed activity is for the purpose of marking, maintaining or otherwise enabling the continued use of the asset or structure.</p><p>If you are unsure of whether the activity falls within such an area you should select the appropriate layer(s) in the <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a>.</p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/admiralty-chart/continued-use`
  - "No" → `/routing-measure`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the proposed activity for the purpose of marking, maintenance or otherwise to enable the continued use of the asset or structure? (/admiralty-chart/continued-use)
- **Page type:** Question page
- **H1:** "Is the proposed activity for the purpose of marking, maintenance or otherwise to enable the continued use of the asset or structure?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/routing-measure`
  - "No" → `/intrusive-nature`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the proposed activity intrusive in nature (dredging, boreholes, trial pits, grab samples etc)? (/intrusive-nature)
- **Page type:** Question page
- **H1:** "Is the proposed activity intrusive in nature (dredging, boreholes, trial pits, grab samples etc)?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/standard-marine-licence-application/intrusive-in-nature`
  - "No" → `/routing-measure`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place within an International Maritime Organisation (IMO) routing measure? (/routing-measure)
- **Page type:** Question page
- **H1:** "Will the activity take place within an International Maritime Organisation (IMO) routing measure?"
- **Hint paragraph:** <p>IMO routing measures are part of a system which helps ships to follow predetermined routes to avoid hazards to navigation at sea. Navigational hazards include but are not limited to risk of collision with traffic in areas of high transit volume, shallow water areas, and areas where certain ships have potential to damage the marine environment and ecology.</p><p>Activities proposed to be carried out within an IMO routing measure are not suitable for self-service unless the proposed activity is related to the maintenance or management of the measure.</p><p>If you are unsure of whether the activity falls within such an area you should select the appropriate layer(s) in the <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a>.</p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/routing-measure/management`
  - "No" → `/protected-place`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the proposed activity related to the management of the routing measure? (/routing-measure/management)
- **Page type:** Question page
- **H1:** "Is the proposed activity related to the management of the routing measure?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/protected-place`
  - "No" → `/standard-marine-licence-application/routing-measure`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place within a 'protected place' or 'controlled site' under the Protection of Military Remains Act (1986)? (/protected-place)
- **Page type:** Question page
- **H1:** "Will the activity take place within a 'protected place' or 'controlled site' under the Protection of Military Remains Act (1986)?"
- **Hint paragraph:** <p>Activities within sites protected under the Protection of Military Remains Act 1986 are not suitable for self-service marine licensing in any circumstances. All crashed military aircraft are automatically 'protected remains' and sunken military vessels are designated as 'protected places' even where their location is not presently known. <p>The <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a> only records known sites and is therefore not exhaustive. <p>Applicants will need to satisfy themselves that they meet the criteria based on their specific circumstances and through their own enquiries where appropriate.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/standard-marine-licence-application/protected-place`
  - "No" → `/heritage-designation`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or require vehicle access through a heritage designation? (/heritage-designation)
- **Page type:** Question page
- **H1:** "Will the activity take place in or require vehicle access through a heritage designation?"
- **Hint paragraph:** <p>Activities taking place in or requiring vehicle access through a 'heritage designation' will require valid consent or an agreed method statement from Historic England (or relevant local authority in respect of listed buildings) in order to be considered suitable for self-service marine licensing.</p><p>'Heritage designation' is defined as:<ul><li>Protected wrecks designated under the Protection of Wrecks Act 1973;</li><li>Scheduled monuments designated under the Ancient Monuments and Archaeological areas Act 1979;</li><li>Listed Buildings designated under The Planning (Listed Building and Conservation Area) Act 1990.</li></ul></p><p>If you are unsure of whether the activity falls within such an area you should select the appropriate layer in the <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a>.</p><p>Note: the MMO self-service GIS tool does not capture listed buildings as designated under the Planning (Listed Building and Conservation Area) Act 1990 and applicants must make their own enquiries in this regard.</p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/historic-england`
  - "No" → `/archaeological-heritage-historic-assets`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve the removal of items of archaeological or historic interest or any other activity, the purpose of which is to establish the presence or nature of such items? (/archaeological-heritage-historic-assets)
- **Page type:** Question page
- **H1:** "Does the activity involve the removal of items of archaeological or historic interest or any other activity, the purpose of which is to establish the presence or nature of such items?"
- **Hint paragraph:** <p>Activities carried out for the purposes set out will require a valid consent or an agreed method statement from Historic England (or relevant local authority in respect of listed buildings) in order to be considered suitable for self-service marine licensing.<p><p>'Archaeological or historic interest' includes all traces of human existence having a cultural, historical or archaeological character such as:<ol type="i"><li>sites, structures, buildings, artefacts and human remains, together with their archaeological and natural context;</li><li>vessels, aircraft, other vehicles or any part thereof, their cargo or other contents, together with their archaeological and natural context; and</li><li>objects of prehistoric character.</li></ol></p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/historic-england`
  - "No" → `/marine-protected-area`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Do you have a valid consent from Historic England for the proposed activity or an agreed method statement? (/historic-england)
- **Page type:** Question page
- **H1:** "Do you have a valid consent from Historic England for the proposed activity or an agreed method statement?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/marine-protected-area`
  - "No" → `/historic-england/not-agreed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in, or within 200m of, a Marine Protected Area (MPA)? (/marine-protected-area)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in, or within 200m of, a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPAs are an important part of the marine environment. It is essential that measures are in place to protect them.</p><p> Activities taking place in or near MPAs will be unsuitable for self-service licensing if they have the potential to cause adverse effects and/or affect protected features of the site. In these situations, before a self-service licence can be issued, additional assurance must be provided to demonstrate that the activity will not cause adverse effects or will not affect, other than insignificantly, protected features. You can discuss the implications of your activity with Natural England or the Joint Nature Conservation Committee (JNCC). To continue to apply for a self-service licence you may have to agree a method statement with Natural England.</p><p>"Marine protected areas" mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p>If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/HPMA-Check`
  - "No" → `/vehicular-access`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the area in which you intend to carry out your activity a Highly Protected Marine Area (HPMA)? (/HPMA-Check)
- **Page type:** Question page
- **H1:** "Is the area in which you intend to carry out your activity a Highly Protected Marine Area (HPMA)?"
- **Hint paragraph:** <p>A HPMA is an area of the sea that has been given the highest level of protection in which almost all licensable activities will be unsuitable for self-service licensing. In limited circumstances it may be possible to agree a methodology with Natural England to undertake the activity.</p><p>You can find out more about HPMAs on <a target="_blank" href="https://www.gov.uk/government/collections/highly-protected-marine-areas">GOV.UK</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/natural-england`
  - "No" → `/fast-track-activity-limits`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the proposed activities limited to any or all of the following? (/fast-track-activity-limits)
- **Page type:** Question page
- **H1:** "Are the proposed activities limited to any or all of the following?"
- **Hint paragraph:** <p><ul><li>Deposit of marker buoys</li><li>Removal of marine growth from structures or assets</li><li>Repainting of structures or assets</li><li>Deposit of scaffolding or access towers</li></ul></p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/vehicular-access`
  - "No" → `/natural-england`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity require vehicular access across intertidal coastal habitats which form part of an MPA? (/vehicular-access)
- **Page type:** Question page
- **H1:** "Will the activity require vehicular access across intertidal coastal habitats which form part of an MPA?"
- **Hint paragraph:** <p>Activities involving vehicular access across such areas will not be suitable for self-service marine licensing unless they are accompanied by an agreed method statement from Natural England. </p><p>'Marine protected areas' mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p>If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c">MMO self-service GIS tool</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/natural-england`
  - "No" → `/fast-track-mla/activity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has a method been agreed with Natural England? (/natural-england)
- **Page type:** Question page
- **H1:** "Has a method been agreed with Natural England?"
- **Hint paragraph:** <p>You must have agreed a method statement with Natural England before proceeding to apply for a self-service licence. </p><p>You <u><b>will</b></u> be required to upload the agreed method statement when you apply for a self-service licence.</p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/fast-track-mla/activity`
  - "No" → `/natural-england/not-agreed`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of your construction activity? (/exemption/construction)
- **Page type:** Question page
- **H1:** "What is the purpose of your construction activity?"
- **Component:** Radio buttons
- **Options:**
  - "Maintenance of existing structures and assets" – hint: 'Maintenance' means the upkeep or repair of an existing structure or asset wholly <u>within</U> its existing 3 dimensional boundaries → `/exemption/construction/maintenance`
  - "Construction of something new" – hint: Includes activities undertaken primarily for maintenance purposes where an element of the works extend beyond the existing boundaries of the structure of asset being maintained. → `/exemption/construction/new`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the maintenance activity relate to? (/exemption/construction/maintenance)
- **Page type:** Question page
- **H1:** "What does the maintenance activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Moorings or aids to navigation" → `/exemption/construction/maintenance/moorings`
  - "Pontoons" → `/exemption/construction/maintenance/pontoons`
  - "Coastal protection, drainage or flood defence" → `/exemption/construction/maintenance/coastal-drainage-flood`
  - "Harbour works" – hint: Maintenance carried out by or on behalf of harbour authorities only. → `/exemption/construction/maintenance/harbour-works`
  - "Cables" → `/exemption/construction/maintenance/cables`
  - "Pipelines" → `/exemption/construction/maintenance/pipelines`
  - "Carbon Dioxide Storage" → `/exemption/construction/maintenance/carbon-storage`
  - "Bored tunnels" → `/exemption/construction/maintenance/bored-tunnel`
  - "Other" – hint: Maintenance for purposes not set out above → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/construction/maintenance/moorings)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "To provide a pile mooring" → `/exemption/construction/maintenance/moorings/undertaker`
  - "To provide a swinging mooring" → `/exemption/construction/maintenance/moorings/undertaker`
  - "To provide a trot mooring" → `/exemption/construction/maintenance/moorings/undertaker`
  - "To provide a aid to navigation" → `/exemption/construction/maintenance/moorings/undertaker`
  - "Something else" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/construction/maintenance/moorings/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "A lighthouse authority or someone on behalf of a lighthouse authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "Someone else" → `/exemption/construction/maintenance/moorings/undertaker/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## does the activity require consent (e.g. a licence) from either a harbour authority or a lighthouse authority under their local legislation? (/exemption/construction/maintenance/moorings/undertaker/consent)
- **Page type:** Question page
- **H1:** "does the activity require consent (e.g. a licence) from either a harbour authority or a lighthouse authority under their local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/moorings/undertaker/approval`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/construction/maintenance/moorings/undertaker/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25-notification`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to provide a pontoon? (/exemption/construction/maintenance/pontoons)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to provide a pontoon?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/pontoons/undertaker`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/construction/maintenance/pontoons/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/construction/maintenance/pontoons/deck`
  - "Someone else" → `/exemption/construction/maintenance/pontoons/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity require consent (e.g. a licence) from a harbour authority under local legislation? (/exemption/construction/maintenance/pontoons/consent)
- **Page type:** Question page
- **H1:** "Does the activity require consent (e.g. a licence) from a harbour authority under local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/pontoons/approval`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/construction/maintenance/pontoons/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/pontoons/deck`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## When complete will the deck of the pontoon be an area greater than 30m2? (/exemption/construction/maintenance/pontoons/deck)
- **Page type:** Question page
- **H1:** "When complete will the deck of the pontoon be an area greater than 30m2?"
- **Hint paragraph:** NOTE: If the pontoon will be attached to one or more pontoons already in place the question refers to the total deck area of all pontoons combined.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/construction/maintenance/pontoons/quantity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## In the 6 months prior to the commencement of this activity will 10 or more pontoons have been constructed or deposited at the location? (/exemption/construction/maintenance/pontoons/quantity)
- **Page type:** Question page
- **H1:** "In the 6 months prior to the commencement of this activity will 10 or more pontoons have been constructed or deposited at the location?"
- **Hint paragraph:** either by or on behalf of the harbour authority or with the consent required from and granted by the harbour authority
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25A-mmo-approval`
  - "No" → `/exemption/licence-not-required-exemption-available-article-25A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained? (/exemption/construction/maintenance/harbour-works)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/harbour-works/undertaker`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/construction/maintenance/harbour-works/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/licence-not-required-exemption-available-article-23`
  - "Someone else" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the cable to be maintained used for? (/exemption/construction/maintenance/cables)
- **Page type:** Question page
- **H1:** "What is the cable to be maintained used for?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities--2#cables-pipelines-oil-and-gas-and-carbon-capture-storage"> cables </a>
- **Component:** Radio buttons
- **Options:**
  - "The transfer of data" – hint: This type of cable transfers data from one place to another. → `/exemption/construction/maintenance/cables/location`
  - "The transfer of electricity" – hint: This type of cable allows the transfers of electricity from one place to another. This includes interconnector cables, which exchange electricity to and from continental Europe and beyond. → `/exemption/construction/maintenance/cables/location`
  - "Renewable energy export " – hint: This type of cable exports electricity generated by an offshore wind farm or wave/tidal array to a substation on land. → `/exemption/construction/maintenance/cables/inspection-repair`
  - "Other" – hint: Cables supplying offshore structures, cables utilised in exploration or exploitation of natural resources and or pollution control etc. → `/exemption/construction/maintenance/cables/inspection-repair`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the activity take place? (/exemption/construction/maintenance/cables/location)
- **Page type:** Question page
- **H1:** "Where will the activity take place?"
- **Component:** Radio buttons
- **Options:**
  - "Wholly inside 12NM" → `/exemption/construction/maintenance/cables/inspection-repair`
  - "Wholly outside 12NM" → `/exemption/licence-not-required-cables/maintenance`
  - "Part inside 12NM part outside 12NM" → `/exemption/licence-not-required-cables/maintenance/both`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity relate to the inspection or repair of an existing cable? (/exemption/construction/maintenance/cables/inspection-repair)
- **Page type:** Question page
- **H1:** "Does the activity relate to the inspection or repair of an existing cable?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/cables/emergency`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action? (/exemption/construction/maintenance/cables/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/cables/protection`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> cable protection? (/exemption/construction/maintenance/cables/protection)
- **Page type:** Question page
- **H1:** "Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> cable protection?"
- **Hint paragraph:** Deposits for these purposes, i.e. those beyond the replenishment or replacement of materials wholly within the three dimensional boundaries of those previously consented and deposited, will require a marine licence. If the maintenance, inspection or repair can be carried out without the need for new protection you are advised to adapt your proposed approach.<p><p>NOTE: If you intend to apply for a marine licence in respect of the addition of new or extended protection, where relevant, please select ‘No’ to continue.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/construction/maintenance/cables/explosives`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve the deposit or use of explosives? (/exemption/construction/maintenance/cables/explosives)
- **Page type:** Question page
- **H1:** "Does the activity involve the deposit or use of explosives?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-34`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/construction/maintenance/coastal-drainage-flood)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The Environment Agency or someone on behalf of the Environment Agency" → `/exemption/construction/maintenance/coastal-drainage-flood/EA`
  - "The Coast Protection Authority or someone on behalf of the Coast Protection Authority" → `/exemption/construction/maintenance/coastal-drainage-flood/CPA`
  - "The Local Authority or someone on behalf of the Local Authority" → `/exemption/construction/maintenance/coastal-drainage-flood/CPA`
  - "The Secretary of State for Defence or someone on behalf of the Secretary of State for Defence" → `/exemption/construction/maintenance/coastal-drainage-flood/CPA`
  - "Other" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained? (/exemption/construction/maintenance/coastal-drainage-flood/EA)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/coastal-drainage-flood/EA/beach-replenishment`
  - "No" → `/exemption/construction/maintenance/coastal-drainage-flood/EA/emergency`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve beach replenishment? (/exemption/construction/maintenance/coastal-drainage-flood/EA/beach-replenishment)
- **Page type:** Question page
- **H1:** "Does the activity involve beach replenishment?"
- **Hint paragraph:** 'Beach replenishment' means the addition of material from land-based, off-shore or other coastal sources not connected to the beach or its associated sediment system to replace material permanently lost from the system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-19`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood? (/exemption/construction/maintenance/coastal-drainage-flood/EA/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity for the purpose of maintaining coast protection works? (/exemption/construction/maintenance/coastal-drainage-flood/CPA)
- **Page type:** Question page
- **H1:** "Is the activity for the purpose of maintaining coast protection works?"
- **Hint paragraph:** 'Coast protection works' include: </li><li><u>beach re-profiling</U>, which involves the movement of beach material in a cross-shore direction up or down the beach; and </li><li><u>beach recycling</u>, which involves the movement of beach material along the beach from areas of accretion to areas of erosion within the beach or associated sediment system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/coastal-drainage-flood/CPA/boundaries`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained? (/exemption/construction/maintenance/coastal-drainage-flood/CPA/boundaries)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/coastal-drainage-flood/CPA/beach-replenishment`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve beach replenishment? (/exemption/construction/maintenance/coastal-drainage-flood/CPA/beach-replenishment)
- **Page type:** Question page
- **H1:** "Does the activity involve beach replenishment?"
- **Hint paragraph:** 'Beach replenishment' means the addition of material from land-based, off-shore or other coastal sources not connected to the beach or its associated sediment system to replace material permanently lost from the system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-19`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What kind of pipeline will be maintained? (/exemption/construction/maintenance/pipelines)
- **Page type:** Question page
- **H1:** "What kind of pipeline will be maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Oil and gas pipeline" → `/exemption/construction/maintenance/pipeline/oil-and-gas/purpose`
  - "Other pipelines" → `/exemption/construction/maintenance/pipeline/inspection-repair`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/construction/maintenance/pipeline/oil-and-gas/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "something done in the course of carrying on an activity for which a licence under section 3 of the Petroleum Act 1998 or section 2 of the Petroleum (Production) Act 1934 is required" – hint: Activities are to be regarded as activities for which a licence is required if, by virtue of such a licence, they are activities which may be carried out only with the consent of the Secretary of State or another person. → `/exemption/licence-not-required-exemption-available-Section-77`
  - "something done for the purpose of constructing or maintaining a pipeline as respects any part of which an authorisation (within the meaning of Part 3 of the Petroleum Act 1998) is in force;" → `/exemption/licence-not-required-exemption-available-Section-77`
  - "something done for the purpose of establishing or maintaining an offshore installation (within the meaning of Part 4 of the Petroleum Act 1998;" – hint: Activities are to be regarded as activities for which a licence is required if, by virtue of such a licence, they are activities which may be carried out only with the consent of the Secretary of State or another person. → `/exemption/licence-not-required-exemption-available-Section-77`
  - "Other" → `/exemption/construction/maintenance/pipeline/inspection-repair`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity relate to the inspection or repair of an existing pipeline? (/exemption/construction/maintenance/pipeline/inspection-repair)
- **Page type:** Question page
- **H1:** "Does the activity relate to the inspection or repair of an existing pipeline?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/pipeline/emergency`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action? (/exemption/construction/maintenance/pipeline/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/pipeline/protection`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> pipeline protection? (/exemption/construction/maintenance/pipeline/protection)
- **Page type:** Question page
- **H1:** "Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> pipeline protection?"
- **Hint paragraph:** Deposits for these purposes, i.e. those beyond the replenishment or replacement of materials within the three dimensional boundaries of those previously consented and deposited, will require a marine licence. If the maintenance, inspection or repair can be carried out without the need for new protection you are advised to adapt your proposed approach. <P><P>NOTE: If you intend to apply for a marine licence in respect of the addition of new or extended protection, where relevant, please select ‘No’ to continue.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/construction/maintenance/pipeline/explosives`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve the deposit or use of explosives? (/exemption/construction/maintenance/pipeline/explosives)
- **Page type:** Question page
- **H1:** "Does the activity involve the deposit or use of explosives?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-34`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the proposed activity something that will be done in the course of carrying on an activity for which a licence under section 4 or 18 of the Energy Act 2008 is required (gas unloading, storage and recovery, and carbon dioxide storage)? (/exemption/construction/maintenance/carbon-storage)
- **Page type:** Question page
- **H1:** "Is the proposed activity something that will be done in the course of carrying on an activity for which a licence under section 4 or 18 of the Energy Act 2008 is required (gas unloading, storage and recovery, and carbon dioxide storage)?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-Section-77`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly under the 'Seabed' and relate directly to the construction or operation of a bored tunnel? (/exemption/construction/maintenance/bored-tunnel)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly under the 'Seabed' and relate directly to the construction or operation of a bored tunnel?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/maintenance/bored-tunnel/affect`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity significantly adversely affect any part of the environment of the UK marine area or the living resources that it supports? (/exemption/construction/maintenance/bored-tunnel/affect)
- **Page type:** Question page
- **H1:** "Will the activity significantly adversely affect any part of the environment of the UK marine area or the living resources that it supports?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-35`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the contruction activity relate to? (/exemption/construction/new)
- **Page type:** Question page
- **H1:** "What does the contruction activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Moorings or aids to navigation" → `/exemption/construction/new/moorings`
  - "Pontoons" → `/exemption/construction/new/pontoons`
  - "Flood or flood risk" → `/exemption/construction/new/flood-emergency`
  - "Cables" → `/exemption/construction/new/cables`
  - "Pipelines" → `/exemption/construction/new/pipelines`
  - "Other" – hint: Construction activities for purposes not set out above → `/exemption/construction/new/miscellaneous`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/construction/new/moorings)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "To provide a pile mooring" → `/exemption/construction/new/moorings/undertaker`
  - "To provide a swinging mooring" → `/exemption/construction/new/moorings/undertaker`
  - "To provide a trot Mooring" → `/exemption/construction/new/moorings/undertaker`
  - "To provide a aid to Navigation" → `/exemption/construction/new/moorings/undertaker`
  - "Something else" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/construction/new/moorings/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "A lighthouse authority or someone on behalf of a lighthouse authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "Someone else" → `/exemption/construction/new/moorings/undertaker/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## does the activity require consent (e.g. a licence) from a harbour authority under their local legislation? (/exemption/construction/new/moorings/undertaker/consent)
- **Page type:** Question page
- **H1:** "does the activity require consent (e.g. a licence) from a harbour authority under their local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/new/moorings/undertaker/approval`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/construction/new/moorings/undertaker/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25-notification`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to provide a pontoon? (/exemption/construction/new/pontoons)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to provide a pontoon?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/new/pontoons/undertaker`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/construction/new/pontoons/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/construction/new/pontoons/deck`
  - "Someone else" → `/exemption/construction/new/pontoons/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity require consent (e.g. a licence) from a harbour authority under local legislation? (/exemption/construction/new/pontoons/consent)
- **Page type:** Question page
- **H1:** "Does the activity require consent (e.g. a licence) from a harbour authority under local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/new/pontoons/approval`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/construction/new/pontoons/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/new/pontoons/deck`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## When complete will the deck of the pontoon be an area greater than 30m2? (/exemption/construction/new/pontoons/deck)
- **Page type:** Question page
- **H1:** "When complete will the deck of the pontoon be an area greater than 30m2?"
- **Hint paragraph:** NOTE: If the pontoon will be attached to one or more pontoons already in place the question refers to the total deck area of all pontoons combined.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/construction/new/pontoons/quantity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## In the 6 months prior to the commencement of this activity will 10 or more pontoons have been constructed or deposited at the location? (/exemption/construction/new/pontoons/quantity)
- **Page type:** Question page
- **H1:** "In the 6 months prior to the commencement of this activity will 10 or more pontoons have been constructed or deposited at the location?"
- **Hint paragraph:** either by or on behalf of the harbour authority or with the consent required from and granted by the harbour authority
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25A-mmo-approval`
  - "No" → `/exemption/licence-not-required-exemption-available-article-25A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf on the Environment Agency? (/exemption/construction/new/flood-emergency)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf on the Environment Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/new/flood-emergency/validation`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding? (/exemption/construction/new/flood-emergency/validation)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What will the cable to be laid be used for? (/exemption/construction/new/cables)
- **Page type:** Question page
- **H1:** "What will the cable to be laid be used for?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities--2#cables-pipelines-oil-and-gas-and-carbon-capture-storage"> cables </a>.
- **Component:** Radio buttons
- **Options:**
  - "The transfer of data" – hint: This type of cable transfers data from one place to another. → `/exemption/construction/new/cables/location`
  - "The transfer of electricity" – hint: This type of cable allows the transfers of electricity from one place to another. This includes interconnector cables, which exchange electricity to and from continental Europe and beyond. → `/exemption/construction/new/cables/location`
  - "Renewable energy export " – hint: This type of cable exports electricity generated by an offshore wind farm or wave/tidal array to a substation on land. → `/exemption/construction-exe-not-available-continue`
  - "Other" – hint: Cables supplying offshore structures, cables utilised in exploration or exploitation of natural resources and or pollution control etc. → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Where will the cable be laid? (/exemption/construction/new/cables/location)
- **Page type:** Question page
- **H1:** "Where will the cable be laid?"
- **Component:** Radio buttons
- **Options:**
  - "Wholly inside 12NM" → `/exemption/construction-exe-not-available-continue`
  - "Wholly outside 12NM" → `/exemption/licence-not-required-cables`
  - "Part inside 12NW part outside 12NM" → `/exemption/licence-required-no-exemption-part-cables`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What kind of pipeline does the construction activity relate to? (/exemption/construction/new/pipelines)
- **Page type:** Question page
- **H1:** "What kind of pipeline does the construction activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Oil and gas pipeline" → `/exemption/construction/new/pipelines/oil-and-gas/purpose`
  - "Other pipelines" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/construction/new/pipelines/oil-and-gas/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "something done in the course of carrying on an activity for which a licence under section 3 of the Petroleum Act 1998 or section 2 of the Petroleum (Production) Act 1934 is required" – hint: Activities are to be regarded as activities for which a licence is required if, by virtue of such a licence, they are activities which may be carried out only with the consent of the Secretary of State or another person. → `/exemption/licence-not-required-exemption-available-Section-77`
  - "something done for the purpose of constructing or maintaining a pipeline as respects any part of which an authorisation (within the meaning of Part 3 of the Petroleum Act 1998) is in force;" → `/exemption/licence-not-required-exemption-available-Section-77`
  - "something done for the purpose of establishing or maintaining an offshore installation (within the meaning of Part 4 of the Petroleum Act 1998;" – hint: Activities are to be regarded as activities for which a licence is required if, by virtue of such a licence, they are activities which may be carried out only with the consent of the Secretary of State or another person. → `/exemption/licence-not-required-exemption-available-Section-77`
  - "Other" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the proposed activity something that will be done in the course of carrying on an activity for which a licence under section 4 or 18 of the Energy Act 2008 is required (gas unloading, storage and recovery, and carbon dioxide storage)? (/exemption/construction/new/carbon-storage)
- **Page type:** Question page
- **H1:** "Is the proposed activity something that will be done in the course of carrying on an activity for which a licence under section 4 or 18 of the Energy Act 2008 is required (gas unloading, storage and recovery, and carbon dioxide storage)?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-Section-77`
  - "No" → `/exemption/licence-required-no-exemption`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the construction activity relate to? (/exemption/construction/new/miscellaneous)
- **Page type:** Question page
- **H1:** "What does the construction activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Bored tunnels" → `/exemption/construction/new/miscellaneous/bored-tunnel`
  - "Licensed deepsea mining" → `/exemption/construction/new/miscellaneous/deepsea-mining`
  - "Scheduled works authorised under the Crossrail Act 2008" → `/exemption/construction/new/miscellaneous/crossrail-act`
  - "Carbon Dioxide Storage" → `/exemption/construction/new/carbon-storage`
  - "Other" – hint: Other construction or alteration activities for purposes not set out above → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity carried out? (/exemption/construction/new/miscellaneous/deepsea-mining)
- **Page type:** Question page
- **H1:** "Is the activity carried out?"
- **Component:** Radio buttons
- **Options:**
  - "In pursuance of an exploration or exploitation licence issued under the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "In pursuance of a reciprocal authorisation within the meaning given by section 3(3) of the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "for another reason" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them? (/exemption/construction/new/miscellaneous/crossrail-act)
- **Page type:** Question page
- **H1:** "Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them?"
- **Hint paragraph:** 'limits of deviation' means the limits of deviation which are shown on the deposited plans. 'Scheduled works are defined in section 1(1) of the 2008 Act.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-29`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly under the 'Seabed' and relate directly to the construction or operation of a bored tunnel? (/exemption/construction/new/miscellaneous/bored-tunnel)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly under the 'Seabed' and relate directly to the construction or operation of a bored tunnel?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction/new/miscellaneous/bored-tunnel/affect`
  - "No" → `/exemption/construction-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity significantly adversely affect any part of the environment of the UK marine area or the living resources that it supports? (/exemption/construction/new/miscellaneous/bored-tunnel/affect)
- **Page type:** Question page
- **H1:** "Will the activity significantly adversely affect any part of the environment of the UK marine area or the living resources that it supports?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-35`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/activity-type)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Fishing and shellfish propogation and cultivation" → `/exemption/deposit/fishing`
  - "Markers, moorings and aids to navigation" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation`
  - "Pontoons" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoons`
  - "Scientific investigation or research" – hint: Scientific instruments, associated equipment and tracers → `/exemption/deposit/scientific-research`
  - "Hull cleaning" → `/exemption/deposit/vessels/hull-cleaning`
  - "Maintenance of existing structures or assets" – hint: 'Maintenance' means the upkeep or repair of an existing structure or asset wholly within its existing 3 dimensional boundaries → `/exemption/deposit/maintenance`
  - "Deposit or disposal of dredged material" → `/exemption/deposit/dredged-material`
  - "Emergency, safety and training" → `/exemption/deposit/emergency-safety-accident-investigation`
  - "Pollution prevention and discharge of chemicals" → `/exemption/deposit/pollution`
  - "Miscellaneous" – hint: Other deposit activities for purposes not set out above → `/exemption/deposit/miscellaneous`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the maintenance activity relate to? (/exemption/deposit/maintenance)
- **Page type:** Question page
- **H1:** "What does the maintenance activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Coast protection, drainage or flood defence works" → `/exemption/deposit/maintenance/coastal-drainage-flood`
  - "Harbour works" – hint: Maintenance carried out by or on behalf of harbour authorities only. → `/exemption/deposit/maintenance/harbour-works`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/deposit/maintenance/coastal-drainage-flood)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The Environment Agency or someone on behalf of the Environment Agency" → `/exemption/deposit/maintenance/coastal-drainage-flood/EA`
  - "The Coast Protection Authority or someone on behalf of the Coast Protection Authority" → `/exemption/deposit/maintenance/coastal-drainage-flood/CPA`
  - "The Local Authority or someone on behalf of the Local Authority" → `/exemption/deposit/maintenance/coastal-drainage-flood/CPA`
  - "The Secretary of State for Defence or someone on behalf of the Secretary of State for Defence" → `/exemption/deposit/maintenance/coastal-drainage-flood/CPA`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained? (/exemption/deposit/maintenance/coastal-drainage-flood/EA)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/maintenance/coastal-drainage-flood/EA/beach-replenishment`
  - "No" → `/exemption/deposit/maintenance/coastal-drainage-flood/EA/emergency-flood`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve beach replenishment? (/exemption/deposit/maintenance/coastal-drainage-flood/EA/beach-replenishment)
- **Page type:** Question page
- **H1:** "Does the activity involve beach replenishment?"
- **Hint paragraph:** 'Beach replenishment' means the addition of material from land-based, off-shore or other coastal sources not connected to the beach or its associated sediment system to replace material permanently lost from the system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-19`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity for the purpose of maintaining coast protection works? (/exemption/deposit/maintenance/coastal-drainage-flood/CPA)
- **Page type:** Question page
- **H1:** "Is the activity for the purpose of maintaining coast protection works?"
- **Hint paragraph:** 'Coast protection works' include: </li><li><u>beach re-profiling</U>, which involves the movement of beach material in a cross-shore direction up or down the beach; and </li><li><u>beach recycling</u>, which involves the movement of beach material along the beach from areas of accretion to areas of erosion within the beach or associated sediment system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/maintenance/coastal-drainage-flood/CPA/beach-replenishment`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve beach replenishment? (/exemption/deposit/maintenance/coastal-drainage-flood/CPA/beach-replenishment)
- **Page type:** Question page
- **H1:** "Does the activity involve beach replenishment?"
- **Hint paragraph:** 'Beach replenishment' means the addition of material from land-based, off-shore or other coastal sources not connected to the beach or its associated sediment system to replace material permanently lost from the system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/construction-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-19`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding? (/exemption/deposit/maintenance/coastal-drainage-flood/EA/emergency-flood)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity for the purpose of maintaining harbour works? (/exemption/deposit/maintenance/harbour-works)
- **Page type:** Question page
- **H1:** "Is the activity for the purpose of maintaining harbour works?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/maintenance/harbour-works/boundaries`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out within the 3 dimensional boundaries of the existing works? (/exemption/deposit/maintenance/harbour-works/boundaries)
- **Page type:** Question page
- **H1:** "Will the activity be carried out within the 3 dimensional boundaries of the existing works?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/maintenance/harbour-works/undertaker`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the harbour authority? (/exemption/deposit/maintenance/harbour-works/undertaker)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-23`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/fishing)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Shellfish propogation and cultivation" → `/exemption/deposit/fishing/shellfish-propagation-cultivation`
  - "Fishing operations" → `/exemption/deposit/fishing/fishing-operations`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the deposit of a shellfish, trestle, raft, cage, pole, rope, marker or line in the course of propagation or cultivation of shellfish? (/exemption/deposit/fishing/shellfish-propagation-cultivation)
- **Page type:** Question page
- **H1:** "Will the activity involve the deposit of a shellfish, trestle, raft, cage, pole, rope, marker or line in the course of propagation or cultivation of shellfish?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/fishing/shellfish-propagation-cultivation/obstruction`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the deposit cause or be likely to cause an obstruction or danger to navigation? (/exemption/deposit/fishing/shellfish-propagation-cultivation/obstruction)
- **Page type:** Question page
- **H1:** "Will the deposit cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/fishing/shellfish-propagation-cultivation/disposal-artificial-reef`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the deposit for the purpose of (/exemption/deposit/fishing/shellfish-propagation-cultivation/disposal-artificial-reef)
- **Page type:** Question page
- **H1:** "Is the deposit for the purpose of"
- **Component:** Radio buttons
- **Options:**
  - "Disposal" → `/exemption/deposit-exe-not-available-continue`
  - "Creating, altering or maintaining an artificial reef" → `/exemption/deposit-exe-not-available-continue`
  - "Other" → `/exemption/licence-not-required-exemption-available-article-13`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What will be deposited (/exemption/deposit/fishing/fishing-operations)
- **Page type:** Question page
- **H1:** "What will be deposited"
- **Component:** Radio buttons
- **Options:**
  - "Fishing Gear" – hint: 'Fishing gear' includes gear used to fish for or take shellfish, but does not include anything used in connection with propagation or cultivation of shellfish. → `/exemption/deposit/fishing/fishing-operations/fishing-gear`
  - "Fish or other objects caught and returned in the course of a fishing operation" – hint: 'Fish' includes any part of a fish and also shellfish. → `/exemption/licence-not-required-exemption-available-article-12`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the deposit to dispose of the gear? (/exemption/deposit/fishing/fishing-operations/fishing-gear)
- **Page type:** Question page
- **H1:** "Is the purpose of the deposit to dispose of the gear?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-12`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the harbour authority? (/exemption/deposit/dredged-material)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/dredged-material/authorisation`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity authorised by (/exemption/deposit/dredged-material/authorisation)
- **Page type:** Question page
- **H1:** "Is the activity authorised by"
- **Component:** Radio buttons
- **Options:**
  - "A local Act" → `/exemption/deposit/dredged-material/method`
  - "An order under Section 14 or 16 of the Harbours Act 1964" → `/exemption/deposit/dredged-material/method`
  - "An order under Section 1 of the Harbours Act (Northern ireland) 1970" → `/exemption/deposit/dredged-material/method`
  - "An order under Section 10(3) of the Harbours Act (Northern ireland) 1970" → `/exemption/deposit/dredged-material/method`
  - "None of the above" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in accordance with the relevant authorisation? (/exemption/deposit/dredged-material/method)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in accordance with the relevant authorisation?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/dredged-material/location`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the material be disposed of inside surface waters? (/exemption/deposit/dredged-material/location)
- **Page type:** Question page
- **H1:** "Will the material be disposed of inside surface waters?"
- **Hint paragraph:** 'Surface waters' is defined in Article 2 of the <a target="_blank" href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32000L0060">EU Waste Framework Directive (2000/60/EC)</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/dredged-material/purpose`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the project the disposal relates to? (/exemption/deposit/dredged-material/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the project the disposal relates to?"
- **Component:** Radio buttons
- **Options:**
  - "Managing waters or waterways" → `/exemption/deposit/dredged-material/non-hazardous`
  - "Preventing floods" → `/exemption/deposit/dredged-material/non-hazardous`
  - "Mitigating the effects of floods or droughts" → `/exemption/deposit/dredged-material/non-hazardous`
  - "Land reclamation" → `/exemption/deposit/dredged-material/non-hazardous`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Can you demonstrate that the material to be deposited or disposed is non-hazardous? (/exemption/deposit/dredged-material/non-hazardous)
- **Page type:** Question page
- **H1:** "Can you demonstrate that the material to be deposited or disposed is non-hazardous?"
- **Hint paragraph:** The properties that determine if waste is 'hazardous' are set out in annex III <a target="_blank" href="https://ec.europa.eu/environment/waste/framework/list.htm">EU Waste Framework Directive (2008/98/EC)</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-Section-75-disposal`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/emergency-safety-accident-investigation)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Flood or flood risk" → `/exemption/deposit/emergency-safety-accident-investigation/flood`
  - "Cables and pipelines" → `/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines`
  - "Coastguard activities - safety purposes and training" → `/exemption/deposit/emergency-safety-accident-investigation/coastguard`
  - "Flares - Safety purposes and training" → `/exemption/deposit/emergency-safety-accident-investigation/flares`
  - "Salvage Operation" → `/exemption/deposit/emergency-safety-accident-investigation/salvage`
  - "Safety directions under the Merchant Shipping Act 1995" → `/exemption/deposit/emergency-safety-accident-investigation/safety-directions`
  - "Fire Fighting" → `/exemption/deposit/emergency-safety-accident-investigation/fire-fighting`
  - "Other" – hint: Other deposit activities for purposes not set out above → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the Environment Agency? (/exemption/deposit/emergency-safety-accident-investigation/flood)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the Environment Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/emergency-safety-accident-investigation/flood/emergency`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood? (/exemption/deposit/emergency-safety-accident-investigation/flood/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the deposit activity relate to the inspection or repair of an existing cable or pipeline (/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines)
- **Page type:** Question page
- **H1:** "Does the deposit activity relate to the inspection or repair of an existing cable or pipeline"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities--2#cables-pipelines-oil-and-gas-and-carbon-capture-storage"> cables and pipelines </a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines/emergency`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action? (/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines/protection`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> pipeline protection? (/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines/protection)
- **Page type:** Question page
- **H1:** "Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> pipeline protection?"
- **Hint paragraph:** Deposits for these purposes, i.e. those beyond the replenishment or replacement of materials within the three dimensional boundaries of those previously consented and deposited, will require a marine licence. If the maintenance, inspection or repair can be carried out without the need for new protection you are advised to adapt your proposed approach. <P><P>NOTE: If you intend to apply for a marine licence in respect of the addition of new or extended protection, where relevant, please select ‘No’ to continue.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines/explosives`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve the deposit or use of explosives? (/exemption/deposit/emergency-safety-accident-investigation/cables-pipelines/explosives)
- **Page type:** Question page
- **H1:** "Does the activity involve the deposit or use of explosives?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-34`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf the Secretary of State for Transport, acting through the Maritime and Coastguard Agency? (/exemption/deposit/emergency-safety-accident-investigation/coastguard)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf the Secretary of State for Transport, acting through the Maritime and Coastguard Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/emergency-safety-accident-investigation/coastguard/purpose`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/emergency-safety-accident-investigation/coastguard/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Securing the safety of a vessel, aircraft or marine structure " – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/exemption/licence-not-required-exemption-available-article-32`
  - "Saving life" → `/exemption/licence-not-required-exemption-available-article-32`
  - "Training for either of the above two purposes" → `/exemption/licence-not-required-exemption-available-article-32`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the deposit or use of a distress flare, smoke float or similar pyrotechnic substance or object (/exemption/deposit/emergency-safety-accident-investigation/flares)
- **Page type:** Question page
- **H1:** "Will the activity involve the deposit or use of a distress flare, smoke float or similar pyrotechnic substance or object"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/emergency-safety-accident-investigation/flares/purpose`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/emergency-safety-accident-investigation/flares/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Securing the safety of a vessel, aircraft or marine structure " – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/exemption/licence-not-required-exemption-available-article-33`
  - "Saving life" → `/exemption/licence-not-required-exemption-available-article-33`
  - "Training for either of the above two purposes" → `/exemption/licence-not-required-exemption-available-article-33`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the deposit be made in the course of an official salvage operation for the purpose of ensuring the safety of a vessel or preventing pollution? (/exemption/deposit/emergency-safety-accident-investigation/salvage)
- **Page type:** Question page
- **H1:** "Will the deposit be made in the course of an official salvage operation for the purpose of ensuring the safety of a vessel or preventing pollution?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-9`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the deposit (/exemption/deposit/emergency-safety-accident-investigation/safety-directions)
- **Page type:** Question page
- **H1:** "What is the purpose of the deposit"
- **Component:** Radio buttons
- **Options:**
  - "In exercise of a power under Schedule 3A to the Merchant Shipping Act 1995 (safety directions) by or on behalf of the Secretary of State" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Compliance with a direction under Schedule 3A to the Merchant Shipping Act 1995 (safety directions)" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Avoiding interference with action taken under Schedule 3A to the Merchant Shipping Act 1995 (safety directions)" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out for the purpose of fighting or preventing the spread of fire? (/exemption/deposit/emergency-safety-accident-investigation/fire-fighting)
- **Page type:** Question page
- **H1:** "Will the activity be carried out for the purpose of fighting or preventing the spread of fire?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-10`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out for the purpose of recovering a substance or object as part of an official investigation into an accident involving aircraft? (/exemption/deposit/emergency-safety-accident-investigation/air-accident-investigation)
- **Page type:** Question page
- **H1:** "Will the activity be carried out for the purpose of recovering a substance or object as part of an official investigation into an accident involving aircraft?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-11`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/pollution)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Pollution prevention and treatment" → `/exemption/deposit/pollution/pollution-prevention-treatment`
  - "Discharge of offshore chemicals and oil" – hint: Activities authorised under the Offshore Chemical Regulations 2002 or the Offshore Petroleum Activities (Oil and Pollution Prevention and Control) Regulations 2005. → `/exemption/deposit/pollution/offshore-chemical-oil`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/pollution/pollution-prevention-treatment)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Equipment to contain, control or recover oils etc" → `/exemption/deposit/pollution/pollution-response-equipment`
  - "Marine chemical and marine oil treatment substances" → `/exemption/deposit/pollution/chemical-oil-treatment`
  - "Activities within Part 6 of the Merchant Shipping Act 1995" → `/exemption/deposit/pollution/pollution-prevention`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the equipment to be deposited for the purpose of controlling, containing or recovering oil, a mixture containing oil, chemicals, flotsam or algae blooms? (/exemption/deposit/pollution/pollution-response-equipment)
- **Page type:** Question page
- **H1:** "Is the equipment to be deposited for the purpose of controlling, containing or recovering oil, a mixture containing oil, chemicals, flotsam or algae blooms?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/pollution/pollution-response-equipment/explosives`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the deposit or use of an explosive substance or object? (/exemption/deposit/pollution/pollution-response-equipment/explosives)
- **Page type:** Question page
- **H1:** "Will the activity involve the deposit or use of an explosive substance or object?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-16`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the deposit (/exemption/deposit/pollution/chemical-oil-treatment)
- **Page type:** Question page
- **H1:** "What is the purpose of the deposit"
- **Component:** Radio buttons
- **Options:**
  - "Dispersing or treating oil spills" → `/exemption/deposit/pollution/chemical-oil-treatment/approved`
  - "Treat chemical pollution" → `/exemption/deposit/pollution/chemical-oil-treatment/approved`
  - "Remove fouling matter from the surface of the 'Sea' or 'Seabed'" → `/exemption/deposit/pollution/chemical-oil-treatment/approved`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the substance to be deposited one which is approved for the purposes by the MMO? (/exemption/deposit/pollution/chemical-oil-treatment/approved)
- **Page type:** Question page
- **H1:** "Is the substance to be deposited one which is approved for the purposes by the MMO?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/pollution/chemical-oil-treatment/conditions`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the substance be used in accordance with conditions to which the approval is subject? (/exemption/deposit/pollution/chemical-oil-treatment/conditions)
- **Page type:** Question page
- **H1:** "Will the substance be used in accordance with conditions to which the approval is subject?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-15`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is a permit required to carry out the activity under the Offshore Chemical Regulations 2002? (/exemption/deposit/pollution/offshore-chemical-oil)
- **Page type:** Question page
- **H1:** "Is a permit required to carry out the activity under the Offshore Chemical Regulations 2002?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-14`
  - "No" → `/exemption/deposit/pollution/offshore-chemical-oil/Permit2`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is a permit required to carry out the activity under the Offshore Petroleum Activities (Oil and Pollution Prevention and Control) Regulations 2005? (/exemption/deposit/pollution/offshore-chemical-oil/Permit2)
- **Page type:** Question page
- **H1:** "Is a permit required to carry out the activity under the Offshore Petroleum Activities (Oil and Pollution Prevention and Control) Regulations 2005?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-14`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity proposed to be carried out fall within the subject matter of Part 6 of the Merchant Shipping Act 1995 (prevention of pollution)? (/exemption/deposit/pollution/pollution-prevention)
- **Page type:** Question page
- **H1:** "Does the activity proposed to be carried out fall within the subject matter of Part 6 of the Merchant Shipping Act 1995 (prevention of pollution)?"
- **Hint paragraph:** Find out more about <a target="_blank" href=" http://www.legislation.gov.uk/ukpga/1995/21/part/VI"> Part 6 of the Merchant Shipping Act 1995</a>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-7`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Temporary markers" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers`
  - "Moorings or aids to navigation" – hint: Activities carried out by or on behalf of Lighthouse and Harbour authorities only → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings`
  - "Markers for European marine sites and marine conservation zones" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/marine-site-markers`
  - "Diver trails" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/dive-trails`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Placing a marker that will be in place for less than 24 hours" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/obstruction`
  - "Placing a marker that will be in place for longer than 24 hours but less than 28 days" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/obstruction`
  - "Placing a marker that will be in place for longer than than 28 days" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity cause or be likely to cause an obstruction or danger to navigation? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/obstruction)
- **Page type:** Question page
- **H1:** "Will the activity cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-26a-no-notification`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-26a-no-notification`
  - "No" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers24/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/deposit-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above?" → `/exemption/licence-not-required-exemption-available-article-26a-no-notification`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity cause or be likely to cause an obstruction or danger to navigation? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/obstruction)
- **Page type:** Question page
- **H1:** "Will the activity cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-26a`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-26a`
  - "No" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/temporary-markers/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/deposit-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above?" → `/exemption/licence-not-required-exemption-available-article-26a`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/marine-site-markers)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Natural England" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/ne-purpose`
  - "A public authority" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/pa-purpose`
  - "Someone else" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/ne-purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Installing a marker to indicate the existence and extent of a European Marine Site" → `/exemption/licence-not-required-exemption-available-article-26`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/pa-purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Installing a marker to indicate the existence and extent of a Marine Conservation Zone" → `/exemption/licence-not-required-exemption-available-article-26`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What will be deposited? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings)
- **Page type:** Question page
- **H1:** "What will be deposited?"
- **Component:** Radio buttons
- **Options:**
  - "Pile mooring" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Swinging mooring" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Trot Mooring" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Aid to Navigation" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Something else" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "A lighthouse authority or someone on behalf of a lighthouse authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "Someone else" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity require consent (e.g. a licence) from a harbour authority under local legislation? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/consent)
- **Page type:** Question page
- **H1:** "Does the activity require consent (e.g. a licence) from a harbour authority under local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/approval`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/moorings/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25-notification`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to provide a pontoon? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoons)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to provide a pontoon?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoons/undertaker`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoons/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/deck`
  - "Someone else" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity require consent (e.g. a licence) from a harbour authority under local legislation? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/consent)
- **Page type:** Question page
- **H1:** "Does the activity require consent (e.g. a licence) from a harbour authority under local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/approval`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/deck`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## When complete will the deck of the pontoon be an area greater than 30m2? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/deck)
- **Page type:** Question page
- **H1:** "When complete will the deck of the pontoon be an area greater than 30m2?"
- **Hint paragraph:** NOTE: If the pontoon will be attached to one or more pontoons already in place the question refers to the total deck area of all pontoons combined.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/quantity`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## In the 6 months prior to the commencement of this activity will 10 or more pontoons have been constructed or deposited at the location? (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/pontoon/quantity)
- **Page type:** Question page
- **H1:** "In the 6 months prior to the commencement of this activity will 10 or more pontoons have been constructed or deposited at the location?"
- **Hint paragraph:** either by or on behalf of the harbour authority or with the consent required from and granted by the harbour authority
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25A-mmo-approval`
  - "No" → `/exemption/licence-not-required-exemption-available-article-25A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to place or secure signage or other identifying markers relating to: (/exemption/deposit/markers-moorings-pontoons-aids-to-navigation/dive-trails)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to place or secure signage or other identifying markers relating to:"
- **Component:** Radio buttons
- **Options:**
  - "a wreck within an area designated as a restricted area within the meaning of section 1 of the Protection of Wrecks Act 1973" → `/exemption/licence-not-required-exemption-available-article-31`
  - "a monument designated as a scheduled monument under section 1 of the Ancient Monuments and Archaeological Areas Act 1979" → `/exemption/licence-not-required-exemption-available-article-31`
  - "an area designated as a controlled site under section 1(2)(b) of the Protection of Military Remains Act 1986" → `/exemption/licence-not-required-exemption-available-article-31`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the depsoit activity relate to? (/exemption/deposit/scientific-research)
- **Page type:** Question page
- **H1:** "What does the depsoit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Scientific instruments and associated equipment" → `/exemption/deposit/scientific-research/scientific-equipment`
  - "Tracers and reagents" → `/exemption/deposit/scientific-research/tracers-reagents`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the object to be deposited a scientific instrument or equipment associated with such an instrument? (/exemption/deposit/scientific-research/scientific-equipment)
- **Page type:** Question page
- **H1:** "Is the object to be deposited a scientific instrument or equipment associated with such an instrument?"
- **Hint paragraph:** 'Scientific instrument' means a specialist device or tool, designed to measure, record or analyse data for scientific purposes. ‘Associated equipment’ means equipment fundamental to the functioning or operation of the instrument itself.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/scientific-research/scientific-equipment/survey`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the instrument or equipment to be deposited as part of a scientific experiment or survey? (/exemption/deposit/scientific-research/scientific-equipment/survey)
- **Page type:** Question page
- **H1:** "Is the instrument or equipment to be deposited as part of a scientific experiment or survey?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/scientific-research/scientific-equipment/tethered`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the scientific instrument or associated equipment to be deposited be tethered to the 'Seabed'? (/exemption/deposit/scientific-research/scientific-equipment/tethered)
- **Page type:** Question page
- **H1:** "Will the scientific instrument or associated equipment to be deposited be tethered to the 'Seabed'?"
- **Hint paragraph:** 'Tethered' means to fasten, fix or attach by any means to limit the instruments range of movement.<p><p>'Seabed' means the ground under the 'Sea' and anything resting on it such as a wreck. It includes the intertidal area of the sea or any river at such time as it is exposed temporarily at low tide.<p><p>'Sea' includes any area which is submerged at MHWS and the waters of every estuary, river or channel where the tide flows at MHWS tide up to the NTL. Even waters in areas which are closed permanently or intermittently by a lock or other artificial means against the regular action of the tide are included, where seawater flows into or out from the area, either continuously or from time to time.<p><p>Find out more about the MMO’s <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#what-do-we-mean-by-the-sea">jurisdiction</a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/scientific-research/scientific-equipment/navigational-clearance`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the scientific instrument or associated equipment to be deposited reduce navigational clearance by more than 5% by reference to 'chart datum'? (/exemption/deposit/scientific-research/scientific-equipment/navigational-clearance)
- **Page type:** Question page
- **H1:** "Will the scientific instrument or associated equipment to be deposited reduce navigational clearance by more than 5% by reference to 'chart datum'?"
- **Hint paragraph:** 'Chart Datum' is the plane below which all depths are published on a navigational chart. It is also the plane to which all tidal heights are referred, so by adding the tidal height to the charted depth, the true depth of water is determined. By international agreement Chart Datum is defined as a level so low that the tide will not frequently fall below it. In the United Kingdom, this level is normally approximately the level of Lowest Astronomical Tide.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/scientific-research/scientific-equipment/obstruction`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity cause or be likely to cause an obstruction or danger to navigation? (/exemption/deposit/scientific-research/scientific-equipment/obstruction)
- **Page type:** Question page
- **H1:** "Will the activity cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/scientific-research/scientific-equipment/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/deposit/scientific-research/scientific-equipment/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/scientific-research/scientific-equipment/mpa-management`
  - "No" → `/exemption/deposit/scientific-research/scientific-equipment/disposal`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/deposit/scientific-research/scientific-equipment/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/scientific-research/scientific-equipment/disposal`
  - "No" → `/exemption/deposit/scientific-research/scientific-equipment/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/deposit/scientific-research/scientific-equipment/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/deposit-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/deposit/scientific-research/scientific-equipment/disposal`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the deposit made for the purpose of disposal? (/exemption/deposit/scientific-research/scientific-equipment/disposal)
- **Page type:** Question page
- **H1:** "Is the deposit made for the purpose of disposal?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-17`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the reagent or tracer approved for use by the MMO? (/exemption/deposit/scientific-research/tracers-reagents)
- **Page type:** Question page
- **H1:** "Is the reagent or tracer approved for use by the MMO?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/scientific-research/tracers-reagents/obstruction`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity cause or be likely to cause an obstruction or danger to navigation? (/exemption/deposit/scientific-research/tracers-reagents/obstruction)
- **Page type:** Question page
- **H1:** "Will the activity cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/scientific-research/tracers-reagents/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/deposit/scientific-research/tracers-reagents/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/scientific-research/tracers-reagents/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-17`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/deposit/scientific-research/tracers-reagents/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-17`
  - "No" → `/exemption/deposit/scientific-research/tracers-reagents/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/deposit/scientific-research/tracers-reagents/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/deposit-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/deposit-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-17`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/vessels)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Launching of vessels etc" → `/exemption/deposit/vessels/launch`
  - "Deposits in the normal course of navigation or maintenance" → `/exemption/deposit/vessels/navigation`
  - "Deposits in the course of aggregate dredging" → `/exemption/deposit/vessels/aggregate-dredging`
  - "Dismantling of ships" → `/exemption/deposit/vessels/dismantling-ships`
  - "Exercising rights of foreign vessels" → `/exemption/deposit/vessels/foreign-vessels`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the deposit to facilitate the launching of a vehicle, vessel, aircraft, marine structure or floating container? (/exemption/deposit/vessels/launch)
- **Page type:** Question page
- **H1:** "Is the purpose of the deposit to facilitate the launching of a vehicle, vessel, aircraft, marine structure or floating container?"
- **Hint paragraph:** 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/launch/construction`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve construction of any kind? (/exemption/deposit/vessels/launch/construction)
- **Page type:** Question page
- **H1:** "Will the activity involve construction of any kind?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-27`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the deposit consist of a substance resulting from the cleaning of the hull of a vessel? (/exemption/deposit/vessels/hull-cleaning)
- **Page type:** Question page
- **H1:** "Does the deposit consist of a substance resulting from the cleaning of the hull of a vessel?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/hull-cleaning/method`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What method will be used to clean the hull? (/exemption/deposit/vessels/hull-cleaning/method)
- **Page type:** Question page
- **H1:** "What method will be used to clean the hull?"
- **Component:** Radio buttons
- **Options:**
  - "By hand using a soft cloth" → `/exemption/licence-not-required-exemption-available-article-27A`
  - "By hand using a sponge" → `/exemption/licence-not-required-exemption-available-article-27A`
  - "By hand using the bristles of a soft brush" → `/exemption/licence-not-required-exemption-available-article-27A`
  - "By hand using sandpaper with a grit size of at least P2000" → `/exemption/licence-not-required-exemption-available-article-27A`
  - "Other" – hint: ISO 6344-3:2013 sets standards for the determination of grain size distribution in relation to coated abrasives. → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the deposit be made from a vehicle, vessel, aircraft or marine structure in the normal course of its maintenance or navigation? (/exemption/deposit/vessels/navigation)
- **Page type:** Question page
- **H1:** "Will the deposit be made from a vehicle, vessel, aircraft or marine structure in the normal course of its maintenance or navigation?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/navigation/disposal`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the substance or object deposited be recovered at any point? (/exemption/deposit/vessels/navigation/disposal)
- **Page type:** Question page
- **H1:** "Will the substance or object deposited be recovered at any point?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/navigation/explosives`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the deposit or use of any explosive substance or article? (/exemption/deposit/vessels/navigation/explosives)
- **Page type:** Question page
- **H1:** "Will the activity involve the deposit or use of any explosive substance or article?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-22`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Was the substance or object to be deposited taken from the 'Sea' in the course of dredging for aggregates? (/exemption/deposit/vessels/aggregate-dredging)
- **Page type:** Question page
- **H1:** "Was the substance or object to be deposited taken from the 'Sea' in the course of dredging for aggregates?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/aggregate-dredging/object-type`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What will be deposited? (/exemption/deposit/vessels/aggregate-dredging/object-type)
- **Page type:** Question page
- **H1:** "What will be deposited?"
- **Component:** Radio buttons
- **Options:**
  - "Aggregate or minerals" → `/exemption/deposit-exe-not-available-continue`
  - "Water" → `/exemption/deposit/vessels/aggregate-dredging/water-location`
  - "Something else" → `/exemption/deposit/vessels/aggregate-dredging/something-else-location`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the water be deposited by overflow or pumped discharge from the hold of the vessel at the site of dredging, either during or following its completion, and or on the return journey of the vessel? (/exemption/deposit/vessels/aggregate-dredging/water-location)
- **Page type:** Question page
- **H1:** "Will the water be deposited by overflow or pumped discharge from the hold of the vessel at the site of dredging, either during or following its completion, and or on the return journey of the vessel?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-18`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the substance or object be deposited at the site where the dredging took place? (/exemption/deposit/vessels/aggregate-dredging/something-else-location)
- **Page type:** Question page
- **H1:** "Will the substance or object be deposited at the site where the dredging took place?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-18`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the deposit be made as part of the dismantling of a ship that is waste? (/exemption/deposit/vessels/dismantling-ships)
- **Page type:** Question page
- **H1:** "Will the deposit be made as part of the dismantling of a ship that is waste?"
- **Hint paragraph:** 'Ship' is intended to refer to large commercial or flag bearing vessels, the dismantling of which is regulated under alternative relevant legislation. It does <u>not</u> include ‘houseboats’. <p><p>'Waste' is defined in Article 3 of the EU Waste Framework Directive (2008/98/EC) as 'any substance or object which the holder discards or intends or is required to discard'.<p><p> Please refer to the <a target="_blank" href="https://www.gov.uk/government/publications/waste-classification-technical-guidance">Technical guidance WM3</a> on Waste classification. <p><p>If there is any doubt about whether the vessel you intend to dismantle is a ship you should seek advice from the marine licensing team.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/dismantling-ships/disposal`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the deposit made for the purpose of disposal? (/exemption/deposit/vessels/dismantling-ships/disposal)
- **Page type:** Question page
- **H1:** "Is the deposit made for the purpose of disposal?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/vessels/dismantling-ships/explosives`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the deposit or use of any explosive substance or article? (/exemption/deposit/vessels/dismantling-ships/explosives)
- **Page type:** Question page
- **H1:** "Will the activity involve the deposit or use of any explosive substance or article?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-28`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in exercise of a right under rules of international law? (/exemption/deposit/vessels/foreign-vessels)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in exercise of a right under rules of international law?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit/vessels/foreign-vessels/undertaker`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or in relation to (/exemption/deposit/vessels/foreign-vessels/undertaker)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or in relation to"
- **Component:** Radio buttons
- **Options:**
  - "A third country vessel" – hint: Third country vessel” means a vessel which is flying the flag of, or is registered in, any State or territory (other than Gibraltar) which is not a member State and is not registered in a member State. → `/exemption/licence-not-required-exemption-available-article-37`
  - "A warship, naval auxiliary, other vessel or aircraft owned or operated by a state and used, for the time being, only on government non-commercial service (whether or not the warship, naval auxiliary, other vessel is a third country vessel)" → `/exemption/licence-not-required-exemption-available-article-37`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the deposit activity relate to? (/exemption/deposit/miscellaneous)
- **Page type:** Question page
- **H1:** "What does the deposit activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Vessels" – hint: Launching of a vessel, exercising rights of foreign vessels, normal navigation, aggregate or mineral dredging and dismantling of ships → `/exemption/deposit/vessels`
  - "Defence activities" → `/exemption/deposit/miscellaneous/defence-activities`
  - "Licensed deepsea mining" → `/exemption/deposit/miscellaneous/deepsea-mining`
  - "Scheduled works authorised under the Crossrail Act 2008" → `/exemption/deposit/miscellaneous/crossrail-act`
  - "Air accident investigation" → `/exemption/deposit/emergency-safety-accident-investigation/air-accident-investigation`
  - "Other" – hint: Other deposit activities for purposes not set out above → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/deposit/miscellaneous/defence-activities)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The naval, military or air forces of the crown (including reserve forces and the Royal Fleet Auxiliary)" → `/exemption/deposit/miscellaneous/defence-activities/restriction`
  - "A visiting force within the meaning given by Section 12 of the Visiting Forces Act 1952" → `/exemption/deposit/miscellaneous/defence-activities/restriction`
  - "Someone else" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve construction or dredging of any kind? (/exemption/deposit/miscellaneous/defence-activities/restriction)
- **Page type:** Question page
- **H1:** "Will the activity involve construction or dredging of any kind?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/deposit-exe-not-available-continue`
  - "No" → `/exemption/deposit/miscellaneous/defence-activities/purpose`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/deposit/miscellaneous/defence-activities/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Defence of the Realm" → `/exemption/licence-not-required-exemption-available-article-36`
  - "Other" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity carried out? (/exemption/deposit/miscellaneous/deepsea-mining)
- **Page type:** Question page
- **H1:** "Is the activity carried out?"
- **Component:** Radio buttons
- **Options:**
  - "In pursuance of an exploration or exploitation licence issued under the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "In pursuance of a reciprocal authorisation within the meaning given by section 3(3) of the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "for another reason" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them? (/exemption/deposit/miscellaneous/crossrail-act)
- **Page type:** Question page
- **H1:** "Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-29`
  - "No" → `/exemption/deposit-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/activity-type)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Fishing and shellfish propogation and cultivation" → `/exemption/removal/fishing`
  - "Markers, moorings and aids to navigation" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation`
  - "Pontoons" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoons`
  - "Scientific investigation or research" – hint: Scientific instruments and associated equipment, samples for testing and analysis → `/exemption/removal/scientific-research`
  - "Maintenance of existing strucutres or assets" – hint: 'Maintenance' means the upkeep or repair of an existing structure or asset wholly within its existing 3 dimensional boundaries → `/exemption/removal/maintenance`
  - "Litter and Dead animals" → `/exemption/removal/waste`
  - "Obstructions, danger to navigation and accidental deposits" → `/exemption/removal/obstruction`
  - "Emergency, safety and training" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation`
  - "Other" – hint: Removal activities for purposes not set out above → `/exemption/removal/miscellaneous`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Temporary markers" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/temporary-markers`
  - "Moorings and aids to navigation" – hint: Activities carried out by or on behalf of Lighthouse and Harbour authorities only → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings`
  - "Markers for European marine sites and marine conservation zones" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/marine-site-markers`
  - "Diver trails" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/dive-trails`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/temporary-markers)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The removal of a marker and its appurtenances that has been in place for less than 24 hours" → `/exemption/licence-not-required-exemption-available-article-26a-no-notification`
  - "The removal of a marker and its appurtenances that has been in place for longer than 24 hours but less than 28 days and for which notification of the intention to carry out the activity under article 26A has previously been given to the MMO" → `/exemption/licence-not-required-exemption-available-article-26a`
  - "The removal of a marker and its appurtenances that has been in place for longer than than 28 days" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/marine-site-markers)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Natural England" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/ne-purpose`
  - "A public authority" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/pa-purpose`
  - "Someone else" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/ne-purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Removal of a marker installed to indicate the existence and extent of a European Marine Site" → `/exemption/licence-not-required-exemption-available-article-26`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/marine-site-markers/pa-purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Removal of a marker installed to indicate the existence and extent of a Marine Conservation Zone" → `/exemption/licence-not-required-exemption-available-article-26`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What will be removed? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings)
- **Page type:** Question page
- **H1:** "What will be removed?"
- **Component:** Radio buttons
- **Options:**
  - "Pile mooring" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Swinging mooring" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Trot Mooring" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Aid to Navigation" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker`
  - "Something else" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "A lighthouse authority or someone on behalf of a lighthouse authority" → `/exemption/licence-not-required-exemption-available-article-25`
  - "Someone else" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity require consent (e.g. a licence) from a harbour authority under local legislation? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/consent)
- **Page type:** Question page
- **H1:** "Does the activity require consent (e.g. a licence) from a harbour authority under local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/approval`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/moorings/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-25-notification`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to remove a pontoon? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoons)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to remove a pontoon?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoons/undertaker`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoons/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/deck`
  - "Someone else" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/consent`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity require consent (e.g. a licence) from a harbour authority under local legislation? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/consent)
- **Page type:** Question page
- **H1:** "Does the activity require consent (e.g. a licence) from a harbour authority under local legislation?"
- **Hint paragraph:** The permission or agreement of the authority does not constitute consent for these purposes.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/approval`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has consent been granted? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/approval)
- **Page type:** Question page
- **H1:** "Has consent been granted?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/deck`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## When complete will the deck of the pontoon be an area greater than 30m2? (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/pontoon/deck)
- **Page type:** Question page
- **H1:** "When complete will the deck of the pontoon be an area greater than 30m2?"
- **Hint paragraph:** NOTE: If the pontoon will be attached to one or more pontoons already in place the question refers to the total deck area of all pontoons combined.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-25A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to remove signage or other identifying markers relating: (/exemption/removal/markers-moorings-pontoons-aids-to-navigation/dive-trails)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to remove signage or other identifying markers relating:"
- **Component:** Radio buttons
- **Options:**
  - "a wreck within an area designated as a restricted area within the meaning of section 1 of the Protection of Wrecks Act 1973" → `/exemption/licence-not-required-exemption-available-article-31`
  - "a monument designated as a scheduled monument under section 1 of the Ancient Monuments and Archaeological Areas Act 1979" → `/exemption/licence-not-required-exemption-available-article-31`
  - "an area designated as a controlled site under section 1(2)(b) of the Protection of Military Remains Act 1986" → `/exemption/licence-not-required-exemption-available-article-31`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/scientific-research)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Scientific instruments and associated equipment" → `/exemption/removal/scientific-research/scientific-equipment`
  - "Samples for testing and analysis" → `/exemption/removal/scientific-research/samples`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the object to be removed a scientific instrument or equipment associated with such an instrument? (/exemption/removal/scientific-research/scientific-equipment)
- **Page type:** Question page
- **H1:** "Is the object to be removed a scientific instrument or equipment associated with such an instrument?"
- **Hint paragraph:** 'Scientific instrument' means a specialist device or tool, designed to measure, record or analyse data for scientific purposes. ‘Associated equipment’ means equipment fundamental to the functioning or operation of the instrument itself.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/scientific-research/scientific-equipment/survey`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Was the instrument or associated equipment originally deposited as part of a scientific experiment or survey? (/exemption/removal/scientific-research/scientific-equipment/survey)
- **Page type:** Question page
- **H1:** "Was the instrument or associated equipment originally deposited as part of a scientific experiment or survey?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/scientific-research/scientific-equipment/mpa`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/scientific-research/scientific-equipment/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/scientific-research/scientific-equipment/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-17`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/scientific-research/scientific-equipment/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-17`
  - "No" → `/exemption/removal/scientific-research/scientific-equipment/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/scientific-research/scientific-equipment/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-17`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to take a sample of material for testing or analysis? (/exemption/removal/scientific-research/samples)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to take a sample of material for testing or analysis?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/scientific-research/samples/volume`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the sample to be collected be of a volume of 1m3 or less? (/exemption/removal/scientific-research/samples/volume)
- **Page type:** Question page
- **H1:** "Will the sample to be collected be of a volume of 1m3 or less?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/scientific-research/samples/obstruction`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity cause or be likely to cause an obstruction or danger to navigation? (/exemption/removal/scientific-research/samples/obstruction)
- **Page type:** Question page
- **H1:** "Will the activity cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/removal/scientific-research/samples/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/scientific-research/samples/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/scientific-research/samples/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-17A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/scientific-research/samples/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-17A`
  - "No" → `/exemption/removal/scientific-research/scientific-equipment/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/scientific-research/samples/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-17A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/maintenance)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Maintenance of coast protection, drainage or flood defence works" → `/exemption/removal/maintenance/coastal-drainage-flood`
  - "Maintenance of harbour works" – hint: Maintenance carried out by or on behalf of harbour authorities only. → `/exemption/removal/maintenance/harbour-works`
  - "Cables and pipelines" → `/exemption/removal/maintenance/cables-pipelines`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/maintenance/coastal-drainage-flood)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The Environment Agency or someone on behalf of the Environment Agency" → `/exemption/removal/maintenance/coastal-drainage-flood/EA`
  - "The Coast Protection Authority or someone on behalf of the Coast Protection Authority" → `/exemption/removal/maintenance/coastal-drainage-flood/CPA`
  - "The Local Authority or someone on behalf of the Local Authority" → `/exemption/removal/maintenance/coastal-drainage-flood/CPA`
  - "The Secretary of State for Defence or someone on behalf of the Secretary of State for Defence" → `/exemption/removal/maintenance/coastal-drainage-flood/CPA`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained? (/exemption/removal/maintenance/coastal-drainage-flood/EA)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-19`
  - "No" → `/exemption/removal/maintenance/coastal-drainage-flood/EA/emergency-flood`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding? (/exemption/removal/maintenance/coastal-drainage-flood/EA/emergency-flood)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity for the purpose of maintaining coast protection works? (/exemption/removal/maintenance/coastal-drainage-flood/CPA)
- **Page type:** Question page
- **H1:** "Is the activity for the purpose of maintaining coast protection works?"
- **Hint paragraph:** 'Coast protection works' include: </li><li><u>beach re-profiling</U>, which involves the movement of beach material in a cross-shore direction up or down the beach; and </li><li><u>beach recycling</u>, which involves the movement of beach material along the beach from areas of accretion to areas of erosion within the beach or associated sediment system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-19`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity for the purpose of maintaining harbour works? (/exemption/removal/maintenance/harbour-works)
- **Page type:** Question page
- **H1:** "Is the activity for the purpose of maintaining harbour works?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/maintenance/harbour-works/boundaries`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out within the 3 dimensional boundaries of the existing works? (/exemption/removal/maintenance/harbour-works/boundaries)
- **Page type:** Question page
- **H1:** "Will the activity be carried out within the 3 dimensional boundaries of the existing works?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/maintenance/harbour-works/undertaker`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the harbour authority? (/exemption/removal/maintenance/harbour-works/undertaker)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-23`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the removal activity relate to the inspection or repair of an existing cable or pipeline? (/exemption/removal/maintenance/cables-pipelines)
- **Page type:** Question page
- **H1:** "Does the removal activity relate to the inspection or repair of an existing cable or pipeline?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities--2#cables-pipelines-oil-and-gas-and-carbon-capture-storage"> cables and pipelines </a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/maintenance/cables-pipelines/emergency`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action? (/exemption/removal/maintenance/cables-pipelines/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-34`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/waste)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Dead animals" → `/exemption/removal/waste/dead-animals`
  - "Marine litter (by divers)" – hint: 'marine litter' means any persistent, manufactured or processed solid material discarded, disposed of or abandoned in the marine and coastal environment → `/exemption/removal/waste/marine-litter`
  - "Litter and seaweed" – hint: by or on behalf of local authorities only → `/exemption/removal/waste/litter-seaweed`
  - "Marine litter and debris" – hint: by or on behalf of a harbour authority only → `/exemption/removal/waste/litter-debris`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/obstruction)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Accidental deposits" → `/exemption/removal/waste/accidental-deposits`
  - "Obstruction or danger to navigation" → `/exemption/removal/waste/obstruction-danger-navigation`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the removal of a dead animal from a beach or intertidal area? (/exemption/removal/waste/dead-animals)
- **Page type:** Question page
- **H1:** "Will the activity involve the removal of a dead animal from a beach or intertidal area?"
- **Hint paragraph:** ’Beach’ means an area of sand or small stones near the sea.</br>'Intertidal area' means the area between the level of mean high water springs and the level of mean low water springs.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/dead-animals/undertaker`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of a local authority? (/exemption/removal/waste/dead-animals/undertaker)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of a local authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/dead-animals/undertaker/mpa`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/waste/dead-animals/undertaker/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/dead-animals/undertaker/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-21`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/waste/dead-animals/undertaker/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-21`
  - "No" → `/exemption/removal/waste/dead-animals/undertaker/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/waste/dead-animals/undertaker/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-21`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the removal of marine litter or abandoned, discarded or lost fishing gear in the course of a diving activity? (/exemption/removal/waste/marine-litter)
- **Page type:** Question page
- **H1:** "Will the activity involve the removal of marine litter or abandoned, discarded or lost fishing gear in the course of a diving activity?"
- **Hint paragraph:** 'marine litter' means any persistent, manufactured or processed solid material discarded, disposed of or abandoned in the marine and coastal environment
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/marine-litter/historic-interest`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity likely to cause damage to features of archaeological or historic interest in an area where the diving activities in question occur? (/exemption/removal/waste/marine-litter/historic-interest)
- **Page type:** Question page
- **H1:** "Is the activity likely to cause damage to features of archaeological or historic interest in an area where the diving activities in question occur?"
- **Hint paragraph:** 'Archaeological or historic interest' includes all traces of human existence having a cultural, historical or archaeological character such as:<ol type="i"><li>sites, structures, buildings, artefacts and human remains, together with their archaeological and natural context;</li><li>vessels, aircraft, other vehicles or any part thereof, their cargo or other contents, together with their archaeological and natural context; and</li><li>objects of prehistoric character.</li></ol></p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/removal/waste/marine-litter/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/waste/marine-litter/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/marine-litter/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-21A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/waste/marine-litter/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-21A`
  - "No" → `/exemption/removal/waste/marine-litter/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/waste/marine-litter/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-21A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve the removal of litter or seaweed from a beach or intertidal area? (/exemption/removal/waste/litter-seaweed)
- **Page type:** Question page
- **H1:** "Will the activity involve the removal of litter or seaweed from a beach or intertidal area?"
- **Hint paragraph:** ’Beach’ means an area of sand or small stones near the sea.</br>'Intertidal area' means the area between the level of mean high water springs and the level of mean low water springs.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/litter-seaweed/undertaker`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of a local authority? (/exemption/removal/waste/litter-seaweed/undertaker)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of a local authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/litter-seaweed/mpa`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/waste/litter-seaweed/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/litter-seaweed/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-21-no-notification`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/waste/litter-seaweed/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-21-no-notification`
  - "No" → `/exemption/removal/waste/dead-animals/undertaker/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/waste/litter-seaweed/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-21-no-notification`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

##  Will the activity involve the removal of marine litter or debris from within the jurisdiction of a harbour authority? (/exemption/removal/waste/litter-debris)
- **Page type:** Question page
- **H1:** " Will the activity involve the removal of marine litter or debris from within the jurisdiction of a harbour authority?"
- **Hint paragraph:** 'marine litter' means any persistent, manufactured or processed solid material discarded, disposed of or abandoned in the marine and coastal environment.</br>'Debris' includes remnants from something that has been destroyed or pieces of unwanted or discarded material that are spread around.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/litter-debris/undertaker`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/waste/litter-debris/undertaker)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority or someone on behalf of a harbour authority" → `/exemption/removal/waste/litter-debris/historic-interest`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity likely to cause damage to features of archaeological or historic interest in an area where the diving activities in question occur? (/exemption/removal/waste/litter-debris/historic-interest)
- **Page type:** Question page
- **H1:** "Is the activity likely to cause damage to features of archaeological or historic interest in an area where the diving activities in question occur?"
- **Hint paragraph:** 'Archaeological or historic interest' includes all traces of human existence having a cultural, historical or archaeological character such as:<ol type="i"><li>sites, structures, buildings, artefacts and human remains, together with their archaeological and natural context;</li><li>vessels, aircraft, other vehicles or any part thereof, their cargo or other contents, together with their archaeological and natural context; and</li><li>objects of prehistoric character.</li></ol></p>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/removal/waste/litter-debris/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/waste/litter-debris/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/litter-debris/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-24A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/waste/litter-debris/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-24A`
  - "No" → `/exemption/removal/waste/litter-debris/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/waste/litter-debris/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-24A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Was the object to be removed deposited accidentally? (/exemption/removal/waste/accidental-deposits)
- **Page type:** Question page
- **H1:** "Was the object to be removed deposited accidentally?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/accidental-deposits/within-12-months`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the removal take place within 12 months of the date the object was accidentally deposited? (/exemption/removal/waste/accidental-deposits/within-12-months)
- **Page type:** Question page
- **H1:** "Will the removal take place within 12 months of the date the object was accidentally deposited?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/accidental-deposits/obstruction`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity cause or be likely to cause an obstruction or danger to navigation? (/exemption/removal/waste/accidental-deposits/obstruction)
- **Page type:** Question page
- **H1:** "Will the activity cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/removal/waste/accidental-deposits/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/removal/waste/accidental-deposits/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/waste/accidental-deposits/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-17B`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/removal/waste/accidental-deposits/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-17B`
  - "No" → `/exemption/removal/waste/accidental-deposits/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/removal/waste/accidental-deposits/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/removal-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/removal-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-17B`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/waste/obstruction-danger-navigation)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "A harbour authority" → `/exemption/removal/waste/obstruction-danger-navigation/purpose`
  - "A conservancy authority" – hint: within the meaning given by section 313(1) of the Merchant Shipping Act 1995. → `/exemption/removal/waste/obstruction-danger-navigation/purpose`
  - "A lighthouse authority" → `/exemption/removal/waste/obstruction-danger-navigation/purpose`
  - "A person with powers under any enactment or statutory order to work on or maintain a canal or other inland navigation including navigation in tidal water." → `/exemption/removal/waste/obstruction-danger-navigation/purpose`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to remove an object causing or likely to cause an obstruction or danger to navigation? (/exemption/removal/waste/obstruction-danger-navigation/purpose)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to remove an object causing or likely to cause an obstruction or danger to navigation?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-24`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/emergency-safety-pollution-response-accident-investigation)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Flood or flood risk" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/flood`
  - "Cables and pipelines" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/cables-pipelines`
  - "Coastguard activities - safety purposes and training" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/coastguard`
  - "Salvage Operation" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/salvage`
  - "Safety directions under the Merchant Shipping Act 1995" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/safety-directions`
  - "Pollution prevention - activities within Part 6 of the Merchant Shipping Act 1995" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/pollution-prevention`
  - "Fire Fighting" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/fire-fighting`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the Environment Agency? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/flood)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the Environment Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/flood/emergency`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/flood/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the removal activity relate to the inspection or repair of an existing cable or pipeline (/exemption/removal/emergency-safety-pollution-response-accident-investigation/cables-pipelines)
- **Page type:** Question page
- **H1:** "Does the removal activity relate to the inspection or repair of an existing cable or pipeline"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities--2#cables-pipelines-oil-and-gas-and-carbon-capture-storage"> cables and pipelines </a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/cables-pipelines/emergency`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/cables-pipelines/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-34`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf the Secretary of State for Transport, acting through the Maritime and Coastguard Agency? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/coastguard)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf the Secretary of State for Transport, acting through the Maritime and Coastguard Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/coastguard/purpose`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/coastguard/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Securing the safety of a vessel, aircraft or marine structure " – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/exemption/licence-not-required-exemption-available-article-32`
  - "Saving life" → `/exemption/licence-not-required-exemption-available-article-32`
  - "Training for either of the above two purposes" → `/exemption/licence-not-required-exemption-available-article-32`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in the course of an official salvage operation for the purpose of ensuring the safety of a vessel or preventing pollution? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/salvage)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in the course of an official salvage operation for the purpose of ensuring the safety of a vessel or preventing pollution?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-9`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/safety-directions)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "In exercise of a power under Schedule 3A to the Merchant Shipping Act 1995 (safety directions) by or on behalf of the Secretary of State" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Compliance with a direction under Schedule 3A to the Merchant Shipping Act 1995 (safety directions)" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Avoiding interference with action taken under Schedule 3A to the Merchant Shipping Act 1995 (safety directions)" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity proposed to be carried out fall within the subject matter of Part 6 of the Merchant Shipping Act 1995 (prevention of pollution)? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/pollution-prevention)
- **Page type:** Question page
- **H1:** "Does the activity proposed to be carried out fall within the subject matter of Part 6 of the Merchant Shipping Act 1995 (prevention of pollution)?"
- **Hint paragraph:** Find out more about <a target="_blank" href=" http://www.legislation.gov.uk/ukpga/1995/21/part/VI"> Part 6 of the Merchant Shipping Act 1995</a>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-7`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out for the purpose of fighting or preventing the spread of fire? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/fire-fighting)
- **Page type:** Question page
- **H1:** "Will the activity be carried out for the purpose of fighting or preventing the spread of fire?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-10`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out for the purpose of recovering a substance or object as part of an official investigation into an accident involving aircraft? (/exemption/removal/emergency-safety-pollution-response-accident-investigation/air-accident-investigation)
- **Page type:** Question page
- **H1:** "Will the activity be carried out for the purpose of recovering a substance or object as part of an official investigation into an accident involving aircraft?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-11`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/fishing)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Shellfish propogation and cultivation" → `/exemption/removal/fishing/shellfish-propagation-cultivation`
  - "Fishing operations" → `/exemption/removal/fishing/fishing-operations`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out for the purpose of moving shellfish within the 'Sea' in the course of its propagation or cultivation? (/exemption/removal/fishing/shellfish-propagation-cultivation)
- **Page type:** Question page
- **H1:** "Will the activity be carried out for the purpose of moving shellfish within the 'Sea' in the course of its propagation or cultivation?"
- **Hint paragraph:** 'shellfish' includes crustaceans and molluscs of any kind and any part of a shellfish.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/fishing/shellfish-propagation-cultivation/obstruction`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the deposit cause or be likely to cause an obstruction or danger to navigation? (/exemption/removal/fishing/shellfish-propagation-cultivation/obstruction)
- **Page type:** Question page
- **H1:** "Will the deposit cause or be likely to cause an obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-13`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/fishing/fishing-operations)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Fishing or taking fish" → `/exemption/licence-not-required-exemption-available-article-12`
  - "Removing fishing gear" → `/exemption/licence-not-required-exemption-available-article-12`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the removal activity relate to? (/exemption/removal/miscellaneous)
- **Page type:** Question page
- **H1:** "What does the removal activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Defence activities" → `/exemption/removal/miscellaneous/defence-activities`
  - "Licensed deepsea mining" → `/exemption/removal/miscellaneous/deepsea-mining`
  - "Scheduled works authorised under the Crossrail Act 2008" → `/exemption/removal/miscellaneous/crossrail-act`
  - "Dismantling Ships" → `/exemption/removal/miscellaneous/dismantling-ships`
  - "Exercising rights of foreign vessels" → `/exemption/removal/miscellaneous/foreign-vessels`
  - "Air accident investigation" → `/exemption/removal/emergency-safety-pollution-response-accident-investigation/air-accident-investigation`
  - "Other" – hint: Other removal activities for purposes not set out above → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/removal/miscellaneous/defence-activities)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The naval, military or air forces of the crown (including reserve forces and the Royal Fleet Auxiliary)" → `/exemption/removal/miscellaneous/defence-activities/restriction`
  - "A visiting force within the meaning given by Section 12 of the Visiting Forces Act 1952" → `/exemption/removal/miscellaneous/defence-activities/restriction`
  - "Someone else" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity involve construction or dredging of any kind? (/exemption/removal/miscellaneous/defence-activities/restriction)
- **Page type:** Question page
- **H1:** "Will the activity involve construction or dredging of any kind?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal-exe-not-available-continue`
  - "No" → `/exemption/removal/miscellaneous/defence-activities/purpose`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/removal/miscellaneous/defence-activities/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Defence of the Realm" → `/exemption/licence-not-required-exemption-available-article-36`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity carried out? (/exemption/removal/miscellaneous/deepsea-mining)
- **Page type:** Question page
- **H1:** "Is the activity carried out?"
- **Component:** Radio buttons
- **Options:**
  - "In pursuance of an exploration or exploitation licence issued under the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "In pursuance of a reciprocal authorisation within the meaning given by section 3(3) of the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "for another reason" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them? (/exemption/removal/miscellaneous/crossrail-act)
- **Page type:** Question page
- **H1:** "Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-29`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out as part of the dismantling of a ship that is waste? (/exemption/removal/miscellaneous/dismantling-ships)
- **Page type:** Question page
- **H1:** "Will the activity be carried out as part of the dismantling of a ship that is waste?"
- **Hint paragraph:** 'Ship' is intended to refer to large commercial or flag bearing vessels, the dismantling of which is regulated under alternative relevant legislation. It does <u>not</u> include ‘houseboats’. <p><p>'Waste' is defined in Article 3 of the EU Waste Framework Directive (2008/98/EC) as 'any substance or object which the holder discards or intends or is required to discard'.<p><p> Please refer to the <a target="_blank" href="https://www.gov.uk/government/publications/waste-classification-technical-guidance">Technical guidance WM3</a> on Waste classification. <p><p>If there is any doubt about whether the vessel you intend to dismantle is a ship you should seek advice from the marine licensing team.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-28`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in exercise of a right under rules of international law? (/exemption/removal/miscellaneous/foreign-vessels)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in exercise of a right under rules of international law?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/removal/miscellaneous/foreign-vessels/undertaker`
  - "No" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or in relation to (/exemption/removal/miscellaneous/foreign-vessels/undertaker)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or in relation to"
- **Component:** Radio buttons
- **Options:**
  - "A third country vessel" – hint: Third country vessel” means a vessel which is flying the flag of, or is registered in, any State or territory (other than Gibraltar) which is not a member State and is not registered in a member State. → `/exemption/licence-not-required-exemption-available-article-37`
  - "A warship, naval auxiliary, other vessel or aircraft owned or operated by a state and used, for the time being, only on government non-commercial service (whether or not the warship, naval auxiliary, other vessel is a third country vessel)" → `/exemption/licence-not-required-exemption-available-article-37`
  - "Other" → `/exemption/removal-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the dredging activity relate to? (/exemption/dredging)
- **Page type:** Question page
- **H1:** "What does the dredging activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Navigational dredging" – hint: Dredging to deepen berths or channels etc for the purpose of providing access to vessels and or otherwise facilite navigation. → `/exemption/dredging/navigational-dredging`
  - "Shellfish propagation and cultivation" → `/exemption/dredging/shellfish-propagation-cultivation`
  - "Coastal Protection, drainage or flood defence" → `/exemption/dredging/coastal-drainage-flood`
  - "Emergency, safety and training" → `/exemption/dredging/emergency`
  - "Licensed deepsea mining" → `/exemption/dredging/miscellaneous/deepsea-mining`
  - "Scheduled works authorised under the Crossrail Act 2008" → `/exemption/dredging/miscellaneous/crossrail-act`
  - "Other" – hint: Dredging activities for purposes not set out above → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the harbour authority? (/exemption/dredging/navigational-dredging)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the harbour authority?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/navigational-dredging/authorisation`
  - "No" → `/exemption/dredging/navigational-dredging/purpose`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity authorised by (/exemption/dredging/navigational-dredging/authorisation)
- **Page type:** Question page
- **H1:** "Is the activity authorised by"
- **Component:** Radio buttons
- **Options:**
  - "A local Act" → `/exemption/dredging/navigational-dredging/method`
  - "An order under Section 14 or 16 of the Harbours Act 1964" → `/exemption/dredging/navigational-dredging/method`
  - "An order under Section 1 of the Harbours Act (Northern ireland) 1970" → `/exemption/dredging/navigational-dredging/method`
  - "An order under Section 10(3) of the Harbours Act (Northern ireland) 1970" → `/exemption/dredging/navigational-dredging/method`
  - "None of the above" → `/exemption/dredging/navigational-dredging/purpose`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in accordance with the relevant authorisation? (/exemption/dredging/navigational-dredging/method)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in accordance with the relevant authorisation?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-Section-75`
  - "No" → `/exemption/dredging/navigational-dredging/purpose`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the purpose of the activity to enable the continued use of a navigational channel or area of 'Sea' by vessels? (/exemption/dredging/navigational-dredging/purpose)
- **Page type:** Question page
- **H1:** "Is the purpose of the activity to enable the continued use of a navigational channel or area of 'Sea' by vessels?"
- **Hint paragraph:** Find out more about what we mean by <a target="_blank" href="https://www.gov.uk/guidance/marine-licensing-definitions#what-do-we-mean-by-the-sea">sea</a>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/navigational-dredging/maintenance`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the dredging be carried out at a site, where at least one previous dredging campaign has taken place, to the same depth or deeper, in the last 10 years? (/exemption/dredging/navigational-dredging/maintenance)
- **Page type:** Question page
- **H1:** "Will the dredging be carried out at a site, where at least one previous dredging campaign has taken place, to the same depth or deeper, in the last 10 years?"
- **Hint paragraph:** Find out more about <a target="_blank" href=" https://www.gov.uk/guidance/dredging#dredging-by-type"> maintenance dredging</a>
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/navigational-dredging/previous-purpose`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Was the purpose of the previous dredge to enable the continued use of the area of 'Sea' by vessels? (/exemption/dredging/navigational-dredging/previous-purpose)
- **Page type:** Question page
- **H1:** "Was the purpose of the previous dredge to enable the continued use of the area of 'Sea' by vessels?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/navigational-dredging/quantity`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## How many cubic meters will be dredged? (/exemption/dredging/navigational-dredging/quantity)
- **Page type:** Question page
- **H1:** "How many cubic meters will be dredged?"
- **Component:** Radio buttons
- **Options:**
  - "500m3 or less" → `/exemption/dredging/navigational-dredging/last-12months`
  - "More than 500m3" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Has any other dredging taken place at the site of the proposed dredge in the previous 12 months? (/exemption/dredging/navigational-dredging/last-12months)
- **Page type:** Question page
- **H1:** "Has any other dredging taken place at the site of the proposed dredge in the previous 12 months?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/navigational-dredging/last-12-quantity`
  - "No" → `/exemption/dredging/navigational-dredging/obstruction`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the quantity of material dredged at the site in the previous 12 months, combined with the amount proposed to be dredged, exceed 1500m3? (/exemption/dredging/navigational-dredging/last-12-quantity)
- **Page type:** Question page
- **H1:** "Does the quantity of material dredged at the site in the previous 12 months, combined with the amount proposed to be dredged, exceed 1500m3?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging-exe-not-available-continue`
  - "No" → `/exemption/dredging/navigational-dredging/obstruction`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity one that will cause or be likely to cause obstruction or danger to navigation? (/exemption/dredging/navigational-dredging/obstruction)
- **Page type:** Question page
- **H1:** "Is the activity one that will cause or be likely to cause obstruction or danger to navigation?"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#navigational-risk"> navigational risk </a> and the steps you can take to ensure your proposal is not one that will cause or be likely to cause and obstruction or danger.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging-exe-not-available-continue`
  - "No" → `/exemption/dredging/navigational-dredging/mpa`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity take place in or within 200m of a Marine Protected Area (MPA)? (/exemption/dredging/navigational-dredging/mpa)
- **Page type:** Question page
- **H1:** "Will the activity take place in or within 200m of a Marine Protected Area (MPA)?"
- **Hint paragraph:** <p>MPA's are an important part of the marine environment. </p><p>You are responsible for making sure you understand the status of the location where the activity is proposed. </p><p> ‘Marine protected areas’ mean:<ul><li>Highly Protected Marine Area (HPMA) (designated and candidate)</li><li>Marine Conservation Zones (MCZs) (designated and proposed)</li><li>Special Areas of Conservation (SACs) (designated and candidate)</li><li>Special Protection Areas (SPAs) (designated and potential)</li><li>Ramsar's</li><li>SSSIs</li></ul></p><p> If you are unsure of whether the activity falls within an MPA you should select the appropriate layer in the MMO’s <a target="_blank" href="https://defra.maps.arcgis.com/apps/webappviewer/index.html?id=28f91021979447d3b43dc83e6e93094c"> GIS tool </a> to check.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/navigational-dredging/mpa-management`
  - "No" → `/exemption/licence-not-required-exemption-available-article-18A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity directly connected with or necessary to the management of the Marine Protected Area? (/exemption/dredging/navigational-dredging/mpa-management)
- **Page type:** Question page
- **H1:** "Is the activity directly connected with or necessary to the management of the Marine Protected Area?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-18A`
  - "No" → `/exemption/dredging/navigational-dredging/lse`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity.... (/exemption/dredging/navigational-dredging/lse)
- **Page type:** Question page
- **H1:** "Is the activity...."
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities#marine-protected-areas"> marine protected areas </a>.
- **Component:** Radio buttons
- **Options:**
  - "Likely to have a significant effect on a European site?" – hint: either alone or in combination with other plans and projects → `/exemption/dredging-exe-not-available-continue`
  - "Likely to have a significant effect on a Ramsar site?" – hint: either alone or in combination with other plans and projects → `/exemption/dredging-exe-not-available-continue`
  - "Capable of affecting (other than insignificantly), the protected features of a Marine Conservation Zone or Highly Protected Marine Area?" – hint: including any ecological or geomorphological process on which the conservation of any protected feature of an MCZ or HPMA is (wholly or in Part) dependant → `/exemption/dredging-exe-not-available-continue`
  - "Unlikely to have any relevant effect on any sites specified above" → `/exemption/licence-not-required-exemption-available-article-18A`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out for the purpose of moving shellfish within the 'Sea' in the course of its propagation or cultivation? (/exemption/dredging/shellfish-propagation-cultivation)
- **Page type:** Question page
- **H1:** "Will the activity be carried out for the purpose of moving shellfish within the 'Sea' in the course of its propagation or cultivation?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-13`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the dredging activity relate to? (/exemption/dredging/coastal-drainage-flood)
- **Page type:** Question page
- **H1:** "What does the dredging activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Maintenance of coast protection, drainage or flood defence works" → `/exemption/dredging/coastal-drainage-flood/maintenance`
  - "Emergency works in relation to flood or flood risk" → `/exemption/dredging/coastal-drainage-flood/emergency`
  - "Other" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Who will carry out the activity? (/exemption/dredging/coastal-drainage-flood/maintenance)
- **Page type:** Question page
- **H1:** "Who will carry out the activity?"
- **Component:** Radio buttons
- **Options:**
  - "The Environment Agency or someone on behalf of the Environment Agency" → `/exemption/dredging/coastal-drainage-flood/maintenance/EA`
  - "The Coast Protection Authority or someone on behalf of the Coast Protection Authority" → `/exemption/dredging/coastal-drainage-flood/maintenance/CPA`
  - "The Local Authority or someone on behalf of the Local Authority" → `/exemption/dredging/coastal-drainage-flood/maintenance/CPA`
  - "The Secretary of State for Defence or someone on behalf of the Secretary of State for Defence" → `/exemption/dredging/coastal-drainage-flood/maintenance/CPA`
  - "Someone else" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained? (/exemption/dredging/coastal-drainage-flood/maintenance/EA)
- **Page type:** Question page
- **H1:** "Will the activity be carried out wholly within the existing 3 dimensional boundary of the works being maintained?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/coastal-drainage-flood/maintenance/EA/beach-replenishment`
  - "No" → `/exemption/dredging/coastal-drainage-flood/emergency/validation`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve beach replenishment? (/exemption/dredging/coastal-drainage-flood/maintenance/EA/beach-replenishment)
- **Page type:** Question page
- **H1:** "Does the activity involve beach replenishment?"
- **Hint paragraph:** 'Beach replenishment' means the addition of material from land-based, off-shore or other coastal sources not connected to the beach or its associated sediment system to replace material permanently lost from the system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-19`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity for the purpose of maintaining coast protection works? (/exemption/dredging/coastal-drainage-flood/maintenance/CPA)
- **Page type:** Question page
- **H1:** "Is the activity for the purpose of maintaining coast protection works?"
- **Hint paragraph:** 'Coast protection works' include: </li><li><u>beach re-profiling</U>, which involves the movement of beach material in a cross-shore direction up or down the beach; and </li><li><u>beach recycling</u>, which involves the movement of beach material along the beach from areas of accretion to areas of erosion within the beach or associated sediment system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/coastal-drainage-flood/maintenance/EA/beach-replenishment`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve beach replenishment? (/exemption/dredging/coastal-drainage-flood/maintenance/CPA/beach-replenishment)
- **Page type:** Question page
- **H1:** "Does the activity involve beach replenishment?"
- **Hint paragraph:** 'Beach replenishment' means the addition of material from land-based, off-shore or other coastal sources not connected to the beach or its associated sediment system to replace material permanently lost from the system.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-19`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf on the Environment Agency? (/exemption/dredging/coastal-drainage-flood/emergency)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf on the Environment Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/coastal-drainage-flood/emergency/validation`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding? (/exemption/dredging/coastal-drainage-flood/emergency/validation)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected, and potentially dangerous requiring immediate action in response to either flooding or imminent risk of flooding?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What does the dredging activity relate to? (/exemption/dredging/emergency)
- **Page type:** Question page
- **H1:** "What does the dredging activity relate to?"
- **Component:** Radio buttons
- **Options:**
  - "Flood or flood risk" → `/exemption/dredging/emergency/flood-flood-risk`
  - "Cables and pipelines" → `/exemption/dredging/emergency/cables-pipelines`
  - "Coastguard activities" – hint: safety purposes and training → `/exemption/dredging/emergency/coastguard`
  - "Salvage Operation" → `/exemption/dredging/emergency/salvage-operation`
  - "Safety directions under the Merchant Shipping Act 1995" → `/exemption/dredging/safety-training/safety-directions`
  - "Other" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf of the Environment Agency? (/exemption/dredging/emergency/flood-flood-risk)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf of the Environment Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/emergency/flood-flood-risk/emergency`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood? (/exemption/dredging/emergency/flood-flood-risk/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action in response to flood or imminent risk of flood?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-20`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the dredging activity relate to the inspection or repair of an existing cable or pipeline (/exemption/dredging/emergency/cables-pipelines)
- **Page type:** Question page
- **H1:** "Does the dredging activity relate to the inspection or repair of an existing cable or pipeline"
- **Hint paragraph:** Find out more about <a target="_blank" href="https://www.gov.uk/government/publications/marine-licensing-exempted-activities/marine-licensing-exempted-activities--2#cables-pipelines-oil-and-gas-and-carbon-capture-storage"> cables and pipelines </a>.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/emergency/cables-pipelines/emergency`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Are the circumstances serious, unexpected and potentially dangerous requiring immediate action? (/exemption/dredging/emergency/cables-pipelines/emergency)
- **Page type:** Question page
- **H1:** "Are the circumstances serious, unexpected and potentially dangerous requiring immediate action?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/emergency/cables-pipelines/protection`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> cable or pipeline protection? (/exemption/dredging/emergency/cables-pipelines/protection)
- **Page type:** Question page
- **H1:** "Will the activity proposed include the deposit of rock or other materials for the purpose of providing <u>new</U> cable or pipeline protection?"
- **Hint paragraph:** Deposits for these purposes, i.e. those beyond the replenishment or replacement of materials wholly within the three dimensional boundaries of those previously consented and deposited, will require a marine licence. If the maintenance, inspection or repair can be carried out without the need for new protection you are advised to adapt your proposed approach. <P><P>NOTE: If you intend to apply for a marine licence in respect of the addition of new or extended protection, where relevant, please select ‘No’ to continue.
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging-exe-not-available-continue`
  - "No" → `/exemption/dredging/emergency/cables-pipelines/protection/explosives`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Does the activity involve the deposit or use of explosives? (/exemption/dredging/emergency/cables-pipelines/protection/explosives)
- **Page type:** Question page
- **H1:** "Does the activity involve the deposit or use of explosives?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging-exe-not-available-continue`
  - "No" → `/exemption/licence-not-required-exemption-available-article-34`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out by or on behalf the Secretary of State for Transport, acting through the Maritime and Coastguard Agency? (/exemption/dredging/emergency/coastguard)
- **Page type:** Question page
- **H1:** "Will the activity be carried out by or on behalf the Secretary of State for Transport, acting through the Maritime and Coastguard Agency?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/dredging/emergency/coastguard/purpose`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/dredging/emergency/coastguard/purpose)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "Securing the safety of a vessel, aircraft or marine structure " – hint: 'marine structure' means a platform or other artificial structure at 'Sea', other than a pipeline. → `/exemption/licence-not-required-exemption-available-article-32`
  - "Saving life" → `/exemption/licence-not-required-exemption-available-article-32`
  - "Training for either of the above two purposes" → `/exemption/licence-not-required-exemption-available-article-32`
  - "Other" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out in the course of an official salvage operation for the purpose of ensuring the safety of a vessel or preventing pollution? (/exemption/dredging/emergency/salvage-operation)
- **Page type:** Question page
- **H1:** "Will the activity be carried out in the course of an official salvage operation for the purpose of ensuring the safety of a vessel or preventing pollution?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-9`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## What is the purpose of the activity? (/exemption/dredging/safety-training/safety-directions)
- **Page type:** Question page
- **H1:** "What is the purpose of the activity?"
- **Component:** Radio buttons
- **Options:**
  - "In exercise of a power under Schedule 3A to the Merchant Shipping Act 1995 (safety directions) by or on behalf of the Secretary of State" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Compliance with a direction under Schedule 3A to the Merchant Shipping Act 1995 (safety directions)" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Avoiding interference with action taken under Schedule 3A to the Merchant Shipping Act 1995 (safety directions)" → `/exemption/licence-not-required-exemption-available-article-8`
  - "Other" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Is the activity carried out? (/exemption/dredging/miscellaneous/deepsea-mining)
- **Page type:** Question page
- **H1:** "Is the activity carried out?"
- **Component:** Radio buttons
- **Options:**
  - "In pursuance of an exploration or exploitation licence issued under the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "In pursuance of a reciprocal authorisation within the meaning given by section 3(3) of the Deep Sea Mining (Temporary Provision) Act 1981" → `/exemption/licence-not-required-exemption-available-article-30`
  - "for another reason" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them? (/exemption/dredging/miscellaneous/crossrail-act)
- **Page type:** Question page
- **H1:** "Will the activity be carried out within the limits of deviation for scheduled works in exercise of powers conferred by the Crossrail Act 2008 in relation to those works or any work connected with them?"
- **Component:** Radio buttons
- **Options:**
  - "Yes" → `/exemption/licence-not-required-exemption-available-article-29`
  - "No" → `/exemption/dredging-exe-not-available-continue`
- **Validation:** Must select an option – error summary & inline ‘Select an option’

## Outcome (/mod-permission)
- **Page type:** Outcome page
- **H1:** "MOD permission not sought or granted"
- **Body excerpt:** …

## Outcome (/not-licensable)
- **Page type:** Outcome page
- **H1:** ""
- **Body excerpt:** …

## Outcome (/scaffolding-impede-navigation)
- **Page type:** Outcome page
- **H1:** "Scaffolding or access towers - impede safe or normal navigation"
- **Body excerpt:** …

## Outcome (/scaffolding-mca-th-agreed)
- **Page type:** Outcome page
- **H1:** "Scaffolding or access towers - impede safe or normal navigation"
- **Body excerpt:** …

## Outcome (/markers/ha-not-agreed)
- **Page type:** Outcome page
- **H1:** "Deposit of markers - requirements not agreed with the harbour authority"
- **Body excerpt:** …

## Outcome (/markers/th-not-agreed)
- **Page type:** Outcome page
- **H1:** "Deposit of markers - requirements not agreed with Trinity House"
- **Body excerpt:** …

## Outcome (/fast-track-mla)
- **Page type:** Outcome page
- **H1:** "Self-service marine licensing"
- **Body excerpt:** …

## Outcome (/fast-track-mla/bas-block)
- **Page type:** Outcome page
- **H1:** "Licence required"
- **Body excerpt:** …

## Outcome (/not-screened-out)
- **Page type:** Outcome page
- **H1:** "Project not "screened out" by the MMO"
- **Body excerpt:** …

## Outcome (/historic-england/not-agreed)
- **Page type:** Outcome page
- **H1:** "Historic England - no consent or method agreed"
- **Body excerpt:** …

## Outcome (/fast-track-mla/activity)
- **Page type:** Outcome page
- **H1:** "Licence required - Self-service activity"
- **Body excerpt:** …

## Outcome (/natural-england/not-agreed)
- **Page type:** Outcome page
- **H1:** "Natural England - no method agreed"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/construction)
- **Page type:** Outcome page
- **H1:** "Construction"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/deposit)
- **Page type:** Outcome page
- **H1:** "Deposit"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/removal)
- **Page type:** Outcome page
- **H1:** "Removal"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/dredging)
- **Page type:** Outcome page
- **H1:** "Dredging"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/incineration)
- **Page type:** Outcome page
- **H1:** "Incineration"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/scuttling)
- **Page type:** Outcome page
- **H1:** "Scuttling"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/explosives)
- **Page type:** Outcome page
- **H1:** "Explosives"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/other-activity)
- **Page type:** Outcome page
- **H1:** "Activity - other"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/other-maintenance)
- **Page type:** Outcome page
- **H1:** "Maintenance of existing structures or assets - Other maintenance"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/bas-duration)
- **Page type:** Outcome page
- **H1:** "Activity - duration over 3 months (Burial at Sea)"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/bas-other-location)
- **Page type:** Outcome page
- **H1:** "Deposit - Burial at Sea - Other location"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/other-removals)
- **Page type:** Outcome page
- **H1:** "Minor removals - Other removals"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/other-clearance-dredging)
- **Page type:** Outcome page
- **H1:** "Non-navigational clearance dredging - Other clearance dredging"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/other-beach-maintenance)
- **Page type:** Outcome page
- **H1:** "Beach maintenance activities - Other beach maintenance"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/other-deposits)
- **Page type:** Outcome page
- **H1:** "Deposit of markers - Other deposits"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/duration)
- **Page type:** Outcome page
- **H1:** "Activity - duration over 12 months"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/public-register)
- **Page type:** Outcome page
- **H1:** "Information needs be withheld from the MMO public register"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/ten-square-miles)
- **Page type:** Outcome page
- **H1:** "Activity locations not within 10 square miles"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/intrusive-in-nature)
- **Page type:** Outcome page
- **H1:** "Activity intrusive in nature"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/routing-measure)
- **Page type:** Outcome page
- **H1:** "New activity within an International Maritime Organisation routing measure"
- **Body excerpt:** …

## Outcome (/standard-marine-licence-application/protected-place)
- **Page type:** Outcome page
- **H1:** "Activity within a protected place or controlled site under the Protection of Military Remains Act (1986)"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/deposit-method)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/sea)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/deposit-method)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/removal-seabed)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/removal-method)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/Incineration-on)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/Activity-elsewhere)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/deposit-method-elsewhere)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/scuttling-method-elsewhere)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/incineration-method-elsewhere)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required/scuttling-method-elsewhere)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-cables)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-cables/maintenance)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-required-no-exemption-part-cables)
- **Page type:** Outcome page
- **H1:** "Marine licence is required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-cables/maintenance/both)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-7)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-8)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-9)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-10)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-11)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-12)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-13)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-14)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-15)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-16)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Approval required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-17)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-17A)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-17B)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-18)
- **Page type:** Outcome page
- **H1:** "Licence is not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-18A)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-19)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-20)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-21)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-21-no-notification)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-21A)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-22)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-23)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-24)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-24A)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-25)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-25-notification)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-25A)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-25A-mmo-approval)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Approval required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-26)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Approval required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-26a)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-26a-no-notification)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-27)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-27A)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-28)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-29)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-30)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-31)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-32)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-33)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-34)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Notification required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-35)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-36)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-article-37)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-Section-75)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-Section-75-disposal)
- **Page type:** Outcome page
- **H1:** "Exempt activity - Approval required"
- **Body excerpt:** …

## Outcome (/exemption/licence-not-required-exemption-available-Section-77)
- **Page type:** Outcome page
- **H1:** "Exempt activity"
- **Body excerpt:** …

## Outcome (/licence-not-required-devolved)
- **Page type:** Outcome page
- **H1:** "Marine licence not required"
- **Body excerpt:** …

## Outcome (/exemption/licence-required-no-exemption-no-self-service)
- **Page type:** Outcome page
- **H1:** "Marine licence is required"
- **Body excerpt:** …

## Outcome (/exemption/licence-required-no-exemption)
- **Page type:** Outcome page
- **H1:** "Marine licence is required"
- **Body excerpt:** …

## Outcome (/exemption/construction-exe-not-available-continue)
- **Page type:** Outcome page
- **H1:** "Exemption not available"
- **Body excerpt:** <b><b>Please select the service you require.</b></b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#self-service">self-service</a>, or <a tar…

## Outcome (/exemption/deposit-exe-not-available-continue)
- **Page type:** Outcome page
- **H1:** "Exemption not available"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#self-service">self-service</a>, or <a target="_b…

## Outcome (/exemption/removal-exe-not-available-continue)
- **Page type:** Outcome page
- **H1:** "Exemption not available"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#self-service">self-service</a>, or <a target="_b…

## Outcome (/exemption/dredging-exe-not-available-continue)
- **Page type:** Outcome page
- **H1:** "Exemption not available"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#self-service">self-service</a>, or <a target="_b…

## Outcome (/construction/journey-select)
- **Page type:** Outcome page
- **H1:** "Marine licence may be required"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#exemptions">exemptions</a>, <a target="_blank" h…

## Outcome (/deposit/journey-select)
- **Page type:** Outcome page
- **H1:** "Marine licence may be required"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#exemptions">exemptions</a>, <a target="_blank" h…

## Outcome (/removal/journey-select)
- **Page type:** Outcome page
- **H1:** "Marine licence may be required"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#exemptions">exemptions</a>, <a target="_blank" h…

## Outcome (/dredging/journey-select)
- **Page type:** Outcome page
- **H1:** "Marine licence may be required"
- **Body excerpt:** <b>Please select the service you require.</b><p><p> Find out more about <a target="_blank" href="https://www.gov.uk/guidance/do-i-need-a-marine-licence#exemptions">exemptions</a>, <a target="_blank" h…
