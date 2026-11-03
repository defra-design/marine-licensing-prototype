// Seeded applications for the public register v1 prototype.
// Not a route file – required by public-register-v1.js.
//
// MVP only lists applications that are open for public comments, so every
// one here is in consultation. The public register is tested on its own,
// with different people from consultation v2, so it only has to make sense
// in itself. Names and applicants come from consultation v2 and LCML v4
// where they overlap. Dogger Bank, Southwold and Morecambe Bay are made up
// for the public register, to cover offshore, East and North West areas and
// deposit and removal activities.
//
// They are in the order they were published. The four full applications
// (Lyme Regis, Hayling, Teignmouth and Poole) come first, so they close
// soonest and top the list. References go up in the same order, as they
// are given out when an application is submitted, so Hayling, Poole and
// Salcombe have different references from consultation v2.
//
// marinePlanArea is the English marine plan area the site is in (or a list,
// if it is in more than one). We do not have a place for the public, only
// the marine plan area. activities are the LCML second-level activity
// types, by the values on the LCML v4 type of activity page (see
// ACTIVITY_GROUPS in public-register-v1.js for their names).
//
// Dates are day offsets from today, run through the daysFromToday filter.
// publishedOffset is when it went on the register. The consultation closes
// 21 days later (see PUBLIC_CONSULTATION_DAYS in public-register-v1.js), so
// these are spread to give closing dates from tomorrow to 20 days away.
// Submitted dates, shown on the full applications, are in
// public-register-v1-details.js and also go up with the reference.
//
// Teignmouth is redacted (see redact-details in LCML v4). What each
// application says is in public-register-v1-details.js.

module.exports = [
  {
    id: 'lyme-regis',
    applicationName: 'Installation of floating pontoon, Lyme Regis Harbour, Dorset',
    reference: 'MLA/2026/10003',
    applicant: 'Jurassic Coast SUP Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['construction-new'],
    publishedOffset: -20
  },
  {
    id: 'hayling',
    applicationName: 'Hayling Island groyne repairs',
    reference: 'MLA/2026/10008',
    applicant: 'Solent Coastal Services Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['maintenance-existing', 'deposit-new'],
    publishedOffset: -19
  },
  {
    id: 'teignmouth',
    applicationName: 'Installation of floating pontoon, Teignmouth Harbour, Devon',
    reference: 'MLA/2026/10014',
    applicant: 'South Devon Coast SUP Ltd',
    marinePlanArea: 'South West Inshore',
    activities: ['construction-new'],
    redacted: true,
    publishedOffset: -17
  },
  {
    id: 'poole',
    applicationName: 'Poole Harbour swing moorings',
    reference: 'MLA/2026/10016',
    applicant: 'Brownsea Moorings Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['deposit-new'],
    publishedOffset: -15
  },
  {
    id: 'dawlish',
    applicationName: 'Dawlish sea defence extension',
    reference: 'MLA/2026/10020',
    applicant: 'Southwest Marine Works Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['alteration-improvement'],
    publishedOffset: -13
  },
  {
    id: 'salcombe',
    applicationName: 'Salcombe visitor pontoon replacement',
    reference: 'MLA/2026/10022',
    applicant: 'Salcombe Harbour Moorings Ltd',
    marinePlanArea: 'South West Inshore',
    activities: ['removal-replacement', 'construction-new'],
    publishedOffset: -11
  },
  {
    id: 'bude',
    applicationName: 'Bude outfall pipe repair',
    reference: 'MLA/2026/10027',
    applicant: 'Atlantic Coast Utilities Ltd',
    marinePlanArea: 'South West Inshore',
    activities: ['maintenance-existing'],
    publishedOffset: -9
  },
  {
    id: 'whitstable',
    applicationName: 'Whitstable oyster trestles',
    reference: 'MLA/2026/10031',
    applicant: 'Kentish Flats Shellfish Ltd',
    marinePlanArea: 'South East Inshore',
    activities: ['construction-new'],
    publishedOffset: -7
  },
  {
    id: 'scarborough',
    applicationName: 'Scarborough slipway replacement',
    reference: 'MLA/2026/10035',
    applicant: 'North Bay Harbour Services Ltd',
    marinePlanArea: 'North East Inshore',
    activities: ['removal-replacement', 'construction-new'],
    publishedOffset: -5
  },
  {
    id: 'southwold',
    applicationName: 'Southwold redundant groyne removal',
    reference: 'MLA/2026/10044',
    applicant: 'Suffolk Coastal Engineering Ltd',
    marinePlanArea: 'East Inshore',
    activities: ['one-off-first-time'],
    publishedOffset: -4
  },
  {
    id: 'morecambe-bay',
    applicationName: 'Morecambe Bay sediment monitoring frames',
    reference: 'MLA/2026/10046',
    applicant: 'Lancaster Coastal Research Ltd',
    marinePlanArea: 'North West Inshore',
    activities: ['deposit-new'],
    publishedOffset: -2
  },
  {
    id: 'dogger-bank',
    applicationName: 'Dogger Bank wave buoy deployment',
    reference: 'MLA/2026/10049',
    applicant: 'North Sea Metocean Services Ltd',
    marinePlanArea: 'North East Offshore',
    activities: ['replacing-existing'],
    publishedOffset: -1
  }
];
