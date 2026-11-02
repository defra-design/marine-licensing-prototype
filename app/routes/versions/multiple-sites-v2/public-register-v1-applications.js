// Seeded applications for the public register v1 prototype.
// Not a route file – required by public-register-v1.js.
//
// MVP only lists applications that are open for public comments, so every
// one here is in consultation. Names, references and applicants match
// consultation v2 and the LCML v4 redaction page where they overlap, so the
// stories join up. Dogger Bank, Southwold and Morecambe Bay are made up for
// the public register, to cover offshore, East and North West areas and
// deposit and removal activities.
//
// marinePlanArea is the English marine plan area the site is in (or a list,
// if it is in more than one). We do not have a place for the public, only
// the marine plan area. activities are the LCML second-level activity
// types, by the values on the LCML v4 type of activity page (see
// ACTIVITY_GROUPS in public-register-v1.js for their names).
//
// Dates are day offsets from today, run through the daysFromToday filter.
// publishedOffset is when it went on the register, closingOffset is when
// public comments close.
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
    publishedOffset: -27,
    closingOffset: 1
  },
  {
    id: 'bude',
    applicationName: 'Bude outfall pipe repair',
    reference: 'MLA/2026/10027',
    applicant: 'Atlantic Coast Utilities Ltd',
    marinePlanArea: 'South West Inshore',
    activities: ['maintenance-existing'],
    publishedOffset: -25,
    closingOffset: 3
  },
  {
    id: 'southwold',
    applicationName: 'Southwold redundant groyne removal',
    reference: 'MLA/2026/10044',
    applicant: 'Suffolk Coastal Engineering Ltd',
    marinePlanArea: 'East Inshore',
    activities: ['one-off-first-time'],
    publishedOffset: -22,
    closingOffset: 6
  },
  {
    id: 'hayling',
    applicationName: 'Hayling Island groyne repairs',
    reference: 'MLA/2026/10024',
    applicant: 'Solent Coastal Services Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['maintenance-existing', 'deposit-new'],
    publishedOffset: -19,
    closingOffset: 9
  },
  {
    id: 'whitstable',
    applicationName: 'Whitstable oyster trestles',
    reference: 'MLA/2026/10031',
    applicant: 'Kentish Flats Shellfish Ltd',
    marinePlanArea: 'South East Inshore',
    activities: ['construction-new'],
    publishedOffset: -16,
    closingOffset: 12
  },
  {
    id: 'salcombe',
    applicationName: 'Salcombe visitor pontoon replacement',
    reference: 'MLA/2026/10012',
    applicant: 'Salcombe Harbour Moorings Ltd',
    marinePlanArea: 'South West Inshore',
    activities: ['removal-replacement', 'construction-new'],
    publishedOffset: -12,
    closingOffset: 16
  },
  {
    id: 'teignmouth',
    applicationName: 'Installation of floating pontoon, Teignmouth Harbour, Devon',
    reference: 'MLA/2026/10014',
    applicant: 'South Devon Coast SUP Ltd',
    marinePlanArea: 'South West Inshore',
    activities: ['construction-new'],
    redacted: true,
    publishedOffset: -10,
    closingOffset: 18
  },
  {
    id: 'morecambe-bay',
    applicationName: 'Morecambe Bay sediment monitoring frames',
    reference: 'MLA/2026/10046',
    applicant: 'Lancaster Coastal Research Ltd',
    marinePlanArea: 'North West Inshore',
    activities: ['deposit-new'],
    publishedOffset: -8,
    closingOffset: 20
  },
  {
    id: 'dawlish',
    applicationName: 'Dawlish sea defence extension',
    reference: 'MLA/2026/10020',
    applicant: 'Southwest Marine Works Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['alteration-improvement'],
    publishedOffset: -7,
    closingOffset: 21
  },
  {
    id: 'poole',
    applicationName: 'Poole Harbour swing moorings',
    reference: 'MLA/2026/10038',
    applicant: 'Brownsea Moorings Ltd',
    marinePlanArea: 'South Inshore',
    activities: ['deposit-new'],
    publishedOffset: -3,
    closingOffset: 25
  },
  {
    id: 'scarborough',
    applicationName: 'Scarborough slipway replacement',
    reference: 'MLA/2026/10035',
    applicant: 'North Bay Harbour Services Ltd',
    marinePlanArea: 'North East Inshore',
    activities: ['removal-replacement', 'construction-new'],
    publishedOffset: -2,
    closingOffset: 26
  },
  {
    id: 'dogger-bank',
    applicationName: 'Dogger Bank wave buoy deployment',
    reference: 'MLA/2026/10049',
    applicant: 'North Sea Metocean Services Ltd',
    marinePlanArea: 'North East Offshore',
    activities: ['replacing-existing'],
    publishedOffset: -1,
    closingOffset: 29
  }
];
