const CONSULTATION_APPLICATIONS = require('./consultation-v3-applications.js');

module.exports = function (router) {
  // The applicant's View details page for a submitted application, split
  // into pages with MOJ sub navigation, as on consultation v3 and the public
  // register.
  //
  // The real View details page is check your answers once the application
  // has been sent, and reads the application from the session. Its marine
  // plan policies are a fixed list of South policies, so a long application
  // cannot be shown on it. This demo shows the Dart application from
  // consultation v3 instead (2 sites, South and South West policies), in the
  // same cards, rows and wording as check your answers, without Change links.
  const version = "multiple-sites-v2";
  const section = "low-complexity-v4";
  const base = `/versions/${version}/${section}/view-details/dart-estuary-navigation-buoy-replacement`;

  // The same application the consultee sees on consultation v3: sites,
  // policies, supporting documents, WFD and other permissions from the
  // consultation v3 data, and the name, reference, applicant, summary and
  // dates from its request in consultation-v3.js.
  const consultation = CONSULTATION_APPLICATIONS.dart;
  const APPLICATION = {
    applicationName: 'Dart estuary navigation buoy replacement',
    reference: 'MLA/2026/10029',
    organisation: 'Dart Estuary Moorings Ltd',
    submittedOffset: consultation.submittedOffset,
    summary: 'We are applying for a marine licence to replace 6 navigation buoys that mark the edges of the main channel past our mooring trots at the mouth of the River Dart. Three are on the Kingswear side and three on the Dartmouth side. The existing steel buoys are corroded and their lights are unreliable. We will replace each one in the same position with a new plastic buoy with a solar-powered light, on a new concrete sinker and chain. The work will be done from a workboat with a lifting crane and will take about 2 weeks.',
    startAndEndDates: 'January 2027 to March 2027',
    siteLocationMethod: consultation.siteLocationMethod,
    // Check your answers only shows construction drawings for
    // construction or alteration works
    sites: consultation.sites.map(site => Object.assign({}, site, {
      showDrawings: site.activities.some(activity => ['Construction of new works', 'Alteration or improvement of existing works'].includes(activity.typeOfActivity))
    })),
    policyGroups: consultation.policyGroups,
    supportingDocuments: consultation.supportingDocuments,
    wfd: consultation.wfd,
    otherPermissions: consultation.otherPermissions,
    // Only the applicant sees these, so consultation v3 has none. The fee
    // is the one check your answers always shows. The invoicing details
    // are made up for Dart Estuary Moorings Ltd, in the same form as the
    // ones on the Exmouth Oyster Farm demo.
    fee: '£1,400 (Does not include potential post-consent monitoring of up to £750)',
    invoicing: {
      addressType: 'UK',
      address: ['Unit 4, Coombe Mud', 'Kingswear', 'Dartmouth', 'Devon', 'TQ6 0EE'],
      fullName: 'Sam Pearce',
      organisation: 'Dart Estuary Moorings Ltd',
      phone: '01803 555 0142',
      email: 'accounts@dartestuarymoorings.co.uk',
      purchaseOrder: 'DEM-2026-0417'
    },
    // Asked to withhold information for commercial reasons, so the
    // Notification about withholding information update applies. The
    // details are made up.
    withholdInformation: 'Yes',
    withholdReason: 'Commercial or industrial confidentiality reasons',
    withholdDetails: 'The prices for the buoys, sinkers and chains in our supplier’s quote. These are commercially confidential to our supplier and are agreed for this job only.'
  };

  // Each supporting document a policy relies on, as check your answers
  // shows under the applicant's consideration
  const documentsByPolicy = {};
  APPLICATION.supportingDocuments.forEach(document => {
    document.policies.forEach(link => {
      (documentsByPolicy[link.code] = documentsByPolicy[link.code] || []).push({
        filename: document.filename,
        location: link.location
      });
    });
  });

  // The pages, as on consultation v3 without Documents, as View details
  // has no documents card: each document is shown where it was uploaded.
  // The last two pages hold the cards only the applicant sees, with the
  // task list section names as their headings. text is the sub navigation
  // link, heading the h2 on the page.
  const SUBNAV_PAGES = [
    { slug: 'overview', text: 'Overview', heading: 'Overview' },
    { slug: 'sites', text: 'Sites and activities', heading: 'Sites and activities' },
    { slug: 'marine-plan-policies', text: 'Marine plan policies', heading: 'Marine plan policies' },
    { slug: 'water-framework-directive', text: 'Water quality', heading: 'Water Framework Directive' },
    { slug: 'other-permissions', text: 'Other permissions', heading: 'Other permissions' },
    { slug: 'fee-and-invoicing', text: 'Fees', heading: 'Fee estimate and invoicing details' },
    { slug: 'sharing', text: 'Publishing', heading: 'Sharing your application information publicly' }
  ];

  // Two versions, from the tray: split into pages (the default) or the
  // long page. ?view-details-appview=long (or =split) is kept in the
  // session by the kit, so it lasts with the tray hidden. Clear data puts
  // it back to the split pages.
  const APPVIEW_KEY = 'view-details-appview';

  // Back goes to wherever they came from before the View details pages,
  // so moving between the pages does not make Back go round them
  function backLink(req) {
    const key = 'view-details-dart-back';
    let from;
    try { from = new URL(req.get('Referer')); } catch (e) { from = null; }
    if (from && from.hostname === req.hostname && !from.pathname.startsWith(base)) {
      req.session.data[key] = from.pathname + from.search;
    }
    return req.session.data[key] || 'javascript:history.back()';
  }

  function render(req, res, slug) {
    const long = req.session.data[APPVIEW_KEY] === 'long';
    if (long && slug !== 'overview') return res.redirect(base);
    const pages = SUBNAV_PAGES.map((page, i) => Object.assign({}, page, {
      href: i === 0 ? base : `${base}/${page.slug}`,
      active: page.slug === slug
    }));
    res.render(`versions/${version}/${section}/view-details/dart-estuary-navigation-buoy-replacement`, {
      application: APPLICATION,
      documentsByPolicy,
      long,
      pages,
      current: SUBNAV_PAGES.find(page => page.slug === slug),
      backLink: backLink(req),
      applicationPath: base
    });
  }

  router.get(base, function (req, res) {
    render(req, res, 'overview');
  });

  SUBNAV_PAGES.slice(1).forEach(page => {
    router.get(`${base}/${page.slug}`, function (req, res) {
      render(req, res, page.slug);
    });
  });
};
