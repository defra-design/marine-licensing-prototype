const path = require('path');

module.exports = function (router) {
  const version = "versions/multiple-sites-v2";
  const section = "low-complexity-v2";
  const subsection = "site-details";
  const manualEntry = "manual-entry";
  const basePath = `/versions/multiple-sites-v2/low-complexity-v2/site-details/manual-entry`;
  const viewBase = `${version}/${section}/${subsection}/${manualEntry}`;

  // ==============================================================================================
  // Activity data keys - these are the flat session keys used by the shared activity pages
  // We copy these to/from site objects so each site has its own activity data
  // ==============================================================================================

  const ACTIVITY_DATA_KEYS = [
    'low-complexity-type-of-activity',
    'low-complexity-type-of-activity-completed',
    'low-complexity-type-of-activity-previous',
    'low-complexity-type-of-works',
    'low-complexity-type-of-works-previous',
    'low-complexity-deposit-type',
    'low-complexity-deposit-type-previous',
    'low-complexity-removal-type',
    'low-complexity-removal-type-previous',
    'low-complexity-construction-structures',
    'low-complexity-construction-structures-other-details',
    'low-complexity-deposit-substances-objects',
    'low-complexity-deposit-substances-objects-other-details',
    'low-complexity-removal-substances-objects',
    'low-complexity-removal-substances-objects-other-details',
    'low-complexity-activity-description',
    'low-complexity-activity-description-completed',
    'low-complexity-site-duration-years',
    'low-complexity-site-duration-months',
    'low-complexity-site-duration-completed',
    'low-complexity-date-completed-by',
    'low-complexity-date-completed-by-details',
    'low-complexity-date-completed-by-completed',
    'low-complexity-months-of-activity',
    'low-complexity-months-of-activity-details',
    'low-complexity-months-of-activity-completed',
    'low-complexity-working-hours',
    'low-complexity-working-hours-completed',
    'low-complexity-impacts',
    'low-complexity-impacts-completed'
  ];

  // ==============================================================================================
  // Helper functions
  // ==============================================================================================

  function getManualSites(session) {
    if (!session.data['low-complexity-manual-sites']) {
      session.data['low-complexity-manual-sites'] = [];
    }
    return session.data['low-complexity-manual-sites'];
  }

  function getSiteByNumber(session, siteNumber) {
    const sites = getManualSites(session);
    return sites.find(s => s.siteNumber === parseInt(siteNumber));
  }

  function createNewSite(session) {
    const sites = getManualSites(session);
    const siteNumber = sites.length + 1;
    const site = {
      siteNumber: siteNumber,
      name: '',
      coordinateEntryMethod: '',
      coordinateSystem: '',
      coordinates: {},
      mapImage: '',
      activityData: {}
    };
    sites.push(site);
    session.data['low-complexity-manual-current-site'] = siteNumber;
    return site;
  }

  function deleteSite(session, siteNumber) {
    const sites = getManualSites(session);
    const index = sites.findIndex(s => s.siteNumber === parseInt(siteNumber));
    if (index > -1) {
      sites.splice(index, 1);
      // Renumber remaining sites
      sites.forEach((site, i) => {
        site.siteNumber = i + 1;
      });
    }
  }

  // Load a site's activity data into flat session keys so shared activity pages can use them
  function loadActivityDataToSession(session, site) {
    if (!site.activityData) site.activityData = {};
    // First clear all activity keys from session
    ACTIVITY_DATA_KEYS.forEach(key => {
      delete session.data[key];
    });
    // Then load from the site's activity data
    ACTIVITY_DATA_KEYS.forEach(key => {
      if (site.activityData[key] !== undefined) {
        session.data[key] = site.activityData[key];
      }
    });
    // Store which site we're currently editing
    session.data['low-complexity-manual-current-edit-site'] = site.siteNumber;
  }

  // Save flat session keys back to the site's activity data object
  function saveActivityDataFromSession(session, site) {
    if (!site.activityData) site.activityData = {};
    ACTIVITY_DATA_KEYS.forEach(key => {
      if (session.data[key] !== undefined) {
        site.activityData[key] = session.data[key];
      } else {
        delete site.activityData[key];
      }
    });
  }

  // ==============================================================================================
  // Load activity data route - intermediary that loads site-specific data before activity pages
  // ==============================================================================================

  router.get(`${basePath}/load-activity`, function (req, res) {
    const siteParam = req.query.site;
    const page = req.query.page;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/review-site-details`);
    }

    // Load this site's activity data into flat session keys
    loadActivityDataToSession(req.session, site);

    // Redirect to the actual activity page (one directory up from manual-entry)
    res.redirect(`/versions/multiple-sites-v2/low-complexity-v2/site-details/${page}`);
  });

  // ==============================================================================================
  // Site name
  // ==============================================================================================

  router.get(`${basePath}/site-name`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    let site = null;
    let isEditing = false;

    if (siteParam && returnTo === 'review') {
      // Editing existing site
      site = getSiteByNumber(req.session, siteParam);
      isEditing = true;
      if (!site) {
        return res.redirect(`${basePath}/review-site-details`);
      }
    } else if (siteParam) {
      // Creating a specific site number (e.g. from add another site)
      site = getSiteByNumber(req.session, siteParam);
      if (!site) {
        site = createNewSite(req.session);
      }
    } else {
      // First site creation
      const sites = getManualSites(req.session);
      if (sites.length === 0) {
        site = createNewSite(req.session);
      } else {
        site = sites[0];
      }
    }

    res.render(`${viewBase}/site-name`, {
      data: req.session.data,
      site: site,
      isEditing: isEditing,
      returnTo: returnTo,
      errors: {}
    });
  });

  router.post(`${basePath}/site-name-router`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;
    const siteName = req.body['site-name'];

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    // Validation
    if (!siteName || siteName.trim() === '') {
      return res.render(`${viewBase}/site-name`, {
        data: req.session.data,
        site: site,
        isEditing: returnTo === 'review',
        returnTo: returnTo,
        errors: { name: 'Enter a site name' }
      });
    }

    site.name = siteName.trim();

    if (returnTo === 'review') {
      return res.redirect(`${basePath}/review-site-details#site-${site.siteNumber}-details`);
    }

    // Continue to coordinate entry method
    res.redirect(`${basePath}/how-do-you-want-to-enter-the-coordinates?site=${site.siteNumber}`);
  });

  // ==============================================================================================
  // How do you want to enter the coordinates (circle vs polygon)
  // ==============================================================================================

  router.get(`${basePath}/how-do-you-want-to-enter-the-coordinates`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    res.render(`${viewBase}/how-do-you-want-to-enter-the-coordinates`, {
      data: req.session.data,
      site: site,
      isEditing: returnTo === 'review',
      returnTo: returnTo,
      errors: {}
    });
  });

  router.post(`${basePath}/how-do-you-want-to-enter-the-coordinates-router`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;
    const selection = req.body['coordinate-entry-method'];

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    if (!selection) {
      return res.render(`${viewBase}/how-do-you-want-to-enter-the-coordinates`, {
        data: req.session.data,
        site: site,
        isEditing: returnTo === 'review',
        returnTo: returnTo,
        errors: { coordinateEntryMethod: 'Select how you want to enter the site coordinates' }
      });
    }

    // When changing from review, clear ALL downstream coordinate data (mini journey restart)
    if (returnTo === 'review') {
      site.coordinates = {};
      site.coordinateSystem = '';
      site.mapImage = '';
    }

    site.coordinateEntryMethod = selection;
    if (selection === 'circle') {
      site.coordinates.type = 'circle';
    } else {
      site.coordinates.type = 'polygon';
    }

    // Always continue to coordinate system (mini journey from review, or normal flow)
    const returnParam = returnTo === 'review' ? '&returnTo=review' : '';
    res.redirect(`${basePath}/which-coordinate-system?site=${site.siteNumber}${returnParam}`);
  });

  // ==============================================================================================
  // Which coordinate system
  // ==============================================================================================

  router.get(`${basePath}/which-coordinate-system`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    res.render(`${viewBase}/which-coordinate-system`, {
      data: req.session.data,
      site: site,
      isEditing: returnTo === 'review',
      returnTo: returnTo,
      errors: {}
    });
  });

  router.post(`${basePath}/which-coordinate-system-router`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;
    const selection = req.body['coordinate-system'];

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    if (!selection) {
      return res.render(`${viewBase}/which-coordinate-system`, {
        data: req.session.data,
        site: site,
        isEditing: returnTo === 'review',
        returnTo: returnTo,
        errors: { coordinateSystem: 'Select which coordinate system you want to use' }
      });
    }

    // When changing from review, clear coordinate values (mini journey restart)
    if (returnTo === 'review') {
      const preservedType = site.coordinates.type;
      site.coordinates = { type: preservedType };
      site.mapImage = '';
    }

    site.coordinateSystem = selection;
    site.coordinates.system = selection;

    // Continue to enter coordinates
    const returnParam = returnTo === 'review' ? '&returnTo=review' : '';
    if (site.coordinates.type === 'polygon') {
      res.redirect(`${basePath}/enter-multiple-coordinates?site=${site.siteNumber}${returnParam}`);
    } else {
      res.redirect(`${basePath}/enter-coordinates?site=${site.siteNumber}${returnParam}`);
    }
  });

  // ==============================================================================================
  // Enter coordinates (single point for circle)
  // ==============================================================================================

  router.get(`${basePath}/enter-coordinates`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    res.render(`${viewBase}/enter-coordinates`, {
      data: req.session.data,
      site: site,
      isEditing: returnTo === 'review',
      returnTo: returnTo,
      errors: {}
    });
  });

  router.post(`${basePath}/enter-coordinates-router`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;
    const latitude = req.body['coordinates-latitude'];
    const longitude = req.body['coordinates-longitude'];

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    // Update coordinates
    if (!site.coordinates) site.coordinates = {};
    site.coordinates.latitude = latitude || '';
    site.coordinates.longitude = longitude || '';
    if (!site.coordinates.center) site.coordinates.center = {};
    site.coordinates.center.latitude = latitude || '';
    site.coordinates.center.longitude = longitude || '';

    // Validation
    let errors = {};
    if (!latitude || latitude.trim() === '') {
      errors.latitude = site.coordinateSystem === 'British National Grid (OSGB36)'
        ? 'Enter the easting' : 'Enter the latitude';
    }
    if (!longitude || longitude.trim() === '') {
      errors.longitude = site.coordinateSystem === 'British National Grid (OSGB36)'
        ? 'Enter the northing' : 'Enter the longitude';
    }

    if (Object.keys(errors).length > 0) {
      return res.render(`${viewBase}/enter-coordinates`, {
        data: req.session.data,
        site: site,
        isEditing: returnTo === 'review',
        returnTo: returnTo,
        errors: errors
      });
    }

    // Determine next step
    if (returnTo === 'review') {
      // If width already exists, this is an independent edit - jump back to review
      if (site.coordinates.type === 'circle' && site.coordinates.width) {
        site.mapImage = '/public/images/map-circle.jpg';
        return res.redirect(`${basePath}/review-site-details#site-${site.siteNumber}-details`);
      }
      // Otherwise continue to width page (part of mini journey restart)
      return res.redirect(`${basePath}/site-width?site=${site.siteNumber}&returnTo=review`);
    }

    // Normal flow - continue to site width
    res.redirect(`${basePath}/site-width?site=${site.siteNumber}`);
  });

  // ==============================================================================================
  // Site width (for circular sites)
  // ==============================================================================================

  router.get(`${basePath}/site-width`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    res.render(`${viewBase}/site-width`, {
      data: req.session.data,
      site: site,
      isEditing: returnTo === 'review',
      returnTo: returnTo,
      errors: {}
    });
  });

  router.post(`${basePath}/site-width-router`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;
    const width = req.body['site-width'];

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    if (!site.coordinates) site.coordinates = {};
    site.coordinates.width = width || '';

    if (!width || width.trim() === '') {
      return res.render(`${viewBase}/site-width`, {
        data: req.session.data,
        site: site,
        isEditing: returnTo === 'review',
        returnTo: returnTo,
        errors: { siteWidth: 'Enter the width of the circular site in metres' }
      });
    }

    // Set map image for circular sites
    site.mapImage = '/public/images/map-circle.jpg';

    if (returnTo === 'review') {
      return res.redirect(`${basePath}/review-site-details#site-${site.siteNumber}-details`);
    }

    // First time through - go to review
    req.session.data['has-visited-site-details'] = true;
    res.redirect(`${basePath}/review-site-details`);
  });

  // ==============================================================================================
  // Enter multiple coordinates (for polygon)
  // ==============================================================================================

  router.get(`${basePath}/enter-multiple-coordinates`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    res.render(`${viewBase}/enter-multiple-coordinates`, {
      data: req.session.data,
      site: site,
      isEditing: returnTo === 'review',
      returnTo: returnTo,
      errors: []
    });
  });

  router.post(`${basePath}/enter-multiple-coordinates-router`, function (req, res) {
    const siteParam = req.query.site;
    const returnTo = req.query.returnTo;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/site-name`);
    }

    const system = site.coordinateSystem;
    const usingOSGB36 = system === "British National Grid (OSGB36)";
    const latLabel = usingOSGB36 ? "eastings" : "latitude";
    const longLabel = usingOSGB36 ? "northings" : "longitude";

    let coordinatePoints = [];
    let errors = [];
    let hasError = false;

    for (let i = 1; i <= 5; i++) {
      const latValue = req.body[`coordinates-point-${i}-latitude`];
      const longValue = req.body[`coordinates-point-${i}-longitude`];
      const pointLabel = i === 1 ? "start and end point" : `point ${i}`;
      const isRequired = i <= 3;
      const hasLatitude = latValue && latValue.trim() !== '';
      const hasLongitude = longValue && longValue.trim() !== '';

      if (isRequired) {
        if (!hasLatitude) {
          hasError = true;
          errors.push({ text: `Enter the ${latLabel} of ${pointLabel}`, href: `#coordinates-point-${i}-latitude` });
        }
        if (!hasLongitude) {
          hasError = true;
          errors.push({ text: `Enter the ${longLabel} of ${pointLabel}`, href: `#coordinates-point-${i}-longitude` });
        }
      } else {
        if ((hasLatitude && !hasLongitude) || (!hasLatitude && hasLongitude)) {
          hasError = true;
          errors.push({ text: `Enter both ${latLabel} and ${longLabel} for ${pointLabel}, or leave both empty`, href: `#coordinates-point-${i}-latitude` });
        }
      }

      if (hasLatitude && hasLongitude) {
        coordinatePoints.push({ latitude: latValue.trim(), longitude: longValue.trim() });
      }
    }

    if (hasError) {
      // Store form data back for re-display
      if (!site.coordinates) site.coordinates = {};
      site.coordinates.points = [];
      for (let i = 1; i <= 5; i++) {
        site.coordinates.points[i - 1] = {
          latitude: req.body[`coordinates-point-${i}-latitude`] || '',
          longitude: req.body[`coordinates-point-${i}-longitude`] || ''
        };
      }

      return res.render(`${viewBase}/enter-multiple-coordinates`, {
        data: req.session.data,
        site: site,
        isEditing: returnTo === 'review',
        returnTo: returnTo,
        errors: errors
      });
    }

    // Update site
    if (!site.coordinates) site.coordinates = {};
    site.coordinates.type = 'polygon';
    site.coordinates.points = coordinatePoints;

    // Set map image based on number of points
    const numPoints = coordinatePoints.length;
    if (numPoints === 3) {
      site.mapImage = '/public/images/map-3-points.jpg';
    } else if (numPoints === 4) {
      site.mapImage = '/public/images/map-4-points.jpg';
    } else {
      site.mapImage = '/public/images/map-5-points.jpg';
    }

    if (returnTo === 'review') {
      return res.redirect(`${basePath}/review-site-details#site-${site.siteNumber}-details`);
    }

    // First time through - go to review
    req.session.data['has-visited-site-details'] = true;
    res.redirect(`${basePath}/review-site-details`);
  });

  // ==============================================================================================
  // Review site details
  // ==============================================================================================

  router.get(`${basePath}/review-site-details`, function (req, res) {
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }

    const sites = getManualSites(req.session);

    // Save any pending activity data back to the current site being edited
    // This captures data when returning from shared activity pages
    const currentEditSite = req.session.data['low-complexity-manual-current-edit-site'];
    if (currentEditSite) {
      const site = getSiteByNumber(req.session, currentEditSite);
      if (site) {
        saveActivityDataFromSession(req.session, site);
      }
      // Clear the current edit site marker
      delete req.session.data['low-complexity-manual-current-edit-site'];
    }

    res.render(`${viewBase}/review-site-details`, {
      data: req.session.data,
      sites: sites
    });
  });

  router.post(`${basePath}/review-site-details-router`, function (req, res) {
    req.session.data['has-visited-site-details'] = true;
    req.session.data['low-complexity-site-location-method'] = 'manual-entry';

    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      res.redirect('../../check-your-answers#site-location');
    } else {
      res.redirect('../../marine-licence-start-page');
    }
  });

  // ==============================================================================================
  // Add another site
  // ==============================================================================================

  router.get(`${basePath}/add-another-site`, function (req, res) {
    const site = createNewSite(req.session);
    res.redirect(`${basePath}/site-name?site=${site.siteNumber}`);
  });

  // ==============================================================================================
  // Delete site - confirmation page (GET) and actual deletion (POST)
  // ==============================================================================================

  router.get(`${basePath}/delete-site`, function (req, res) {
    const siteParam = req.query.site;

    const site = getSiteByNumber(req.session, siteParam);
    if (!site) {
      return res.redirect(`${basePath}/review-site-details`);
    }

    res.render(`${viewBase}/delete-site`, {
      data: req.session.data,
      site: site
    });
  });

  router.post(`${basePath}/delete-site-router`, function (req, res) {
    const siteParam = req.body['site-number'];
    if (siteParam) {
      deleteSite(req.session, siteParam);
    }

    const sites = getManualSites(req.session);
    if (sites.length === 0) {
      // All sites deleted - clear state and go back to start
      delete req.session.data['has-visited-site-details'];
      delete req.session.data['low-complexity-manual-sites'];
      return res.redirect(`/versions/multiple-sites-v2/low-complexity-v2/site-details/`);
    }

    res.redirect(`${basePath}/review-site-details`);
  });

  // ==============================================================================================
  // Delete all site details
  // ==============================================================================================

  router.get(`${basePath}/delete-all-sites`, function (req, res) {
    res.render(`${viewBase}/delete-all-sites`, {
      data: req.session.data
    });
  });

  router.post(`${basePath}/delete-all-sites-router`, function (req, res) {
    // Clear manual entry sites
    delete req.session.data['low-complexity-manual-sites'];
    delete req.session.data['low-complexity-manual-current-site'];
    delete req.session.data['low-complexity-manual-current-edit-site'];
    delete req.session.data['has-visited-site-details'];
    delete req.session.data['low-complexity-site-location-method'];

    // Clear flat activity session keys
    ACTIVITY_DATA_KEYS.forEach(key => {
      delete req.session.data[key];
    });

    // Redirect to task list so site details resets to Not yet started
    res.redirect(`/versions/multiple-sites-v2/low-complexity-v2/marine-licence-start-page`);
  });

};
