module.exports = function (router) {
  // Manual entry for new disposal site locations routes
  const version = "multiple-sites-v2";
  const section = "sample-plans-v2";
  const subSection = "disposal-site-locations";
  const newSubSection = "new-disposal-sites";
  const manualSubSection = "manual-entry";

  /////////////////////////////////////////////////////////
  //////// Site name page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/site-name`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Get site number from query parameter (defaults to 1)
    const siteNumber = parseInt(req.query.site) || 1;
    
    // Update the site count if adding site 2
    if (siteNumber === 2) {
      req.session.data['disposal-site-manual-entry-count'] = 2;
    }
    
    // Clear any existing error flags when user navigates to the page
    req.session.data[`new-disposal-site-${siteNumber}-name-errorthispage`] = "false";
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/site-name`, {
      siteNumber: siteNumber
    });
  });

  // Site name router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/site-name-router`, function (req, res) {
    // Get site number from query parameter
    const siteNumber = parseInt(req.query.site) || 1;
    
    // Reset error flags
    req.session.data[`new-disposal-site-${siteNumber}-name-errorthispage`] = "false";

    let hasErrors = false;

    // Validate site name
    if (!req.body[`new-disposal-site-${siteNumber}-name`] || req.body[`new-disposal-site-${siteNumber}-name`].trim() === '') {
      req.session.data[`new-disposal-site-${siteNumber}-name-errorthispage`] = "true";
      hasErrors = true;
    } else {
      req.session.data[`new-disposal-site-${siteNumber}-name`] = req.body[`new-disposal-site-${siteNumber}-name`];
    }

    if (hasErrors) {
      res.redirect(`site-name?site=${siteNumber}`);
      return;
    }

    // If no errors, redirect to how to enter coordinates
    res.redirect(`how-do-you-want-to-enter-coordinates?site=${siteNumber}`);
  });

  /////////////////////////////////////////////////////////
  //////// How do you want to enter coordinates page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/how-do-you-want-to-enter-coordinates`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data[`new-disposal-site-${siteNumber}-coordinate-entry-errorthispage`] = "false";
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/how-do-you-want-to-enter-coordinates`, {
      siteNumber: siteNumber,
      returnTo: returnTo
    });
  });

  // How do you want to enter coordinates router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/how-do-you-want-to-enter-coordinates-router`, function (req, res) {
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Reset error flags
    req.session.data[`new-disposal-site-${siteNumber}-coordinate-entry-errorthispage`] = "false";

    // Check if option is selected
    if (!req.body[`new-disposal-site-${siteNumber}-coordinate-entry-method`]) {
      req.session.data[`new-disposal-site-${siteNumber}-coordinate-entry-errorthispage`] = "true";
      res.redirect(`how-do-you-want-to-enter-coordinates?site=${siteNumber}${returnTo ? '&returnTo=' + returnTo : ''}`);
      return;
    }

    // Save the selection
    req.session.data[`new-disposal-site-${siteNumber}-coordinate-entry-method`] = req.body[`new-disposal-site-${siteNumber}-coordinate-entry-method`];

    // Route based on selection
    if (returnTo === 'review') {
      // If coming from review page, go back to review
      res.redirect(`review-manual-disposal-site-details#site-${siteNumber}-details`);
    } else {
      // Normal flow - go to coordinate system page
      res.redirect(`which-coordinate-system?site=${siteNumber}`);
    }
  });

  /////////////////////////////////////////////////////////
  //////// Which coordinate system page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/which-coordinate-system`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data[`new-disposal-site-${siteNumber}-coordinate-system-errorthispage`] = "false";
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/which-coordinate-system`, {
      siteNumber: siteNumber,
      returnTo: returnTo
    });
  });

  // Which coordinate system router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/which-coordinate-system-router`, function (req, res) {
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Reset error flags
    req.session.data[`new-disposal-site-${siteNumber}-coordinate-system-errorthispage`] = "false";

    // Check if option is selected
    if (!req.body[`new-disposal-site-${siteNumber}-coordinate-system`]) {
      req.session.data[`new-disposal-site-${siteNumber}-coordinate-system-errorthispage`] = "true";
      res.redirect(`which-coordinate-system?site=${siteNumber}${returnTo ? '&returnTo=' + returnTo : ''}`);
      return;
    }

    // Save the selection
    req.session.data[`new-disposal-site-${siteNumber}-coordinate-system`] = req.body[`new-disposal-site-${siteNumber}-coordinate-system`];

    // Route based on coordinate entry method
    const entryMethod = req.session.data[`new-disposal-site-${siteNumber}-coordinate-entry-method`];
    
    if (returnTo === 'review') {
      // If coming from review page, go back to review
      res.redirect(`review-manual-disposal-site-details#site-${siteNumber}-details`);
    } else if (entryMethod === 'Enter one set of coordinates and a width to create a circular site') {
      res.redirect(`enter-coordinates?site=${siteNumber}`);
    } else {
      res.redirect(`enter-multiple-coordinates?site=${siteNumber}`);
    }
  });

  /////////////////////////////////////////////////////////
  //////// Enter coordinates (centre point) page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/enter-coordinates`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data[`new-disposal-site-${siteNumber}-centre-latitude-error`] = "";
    req.session.data[`new-disposal-site-${siteNumber}-centre-longitude-error`] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/enter-coordinates`, {
      siteNumber: siteNumber,
      returnTo: returnTo
    });
  });

  // Enter coordinates router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/enter-coordinates-router`, function (req, res) {
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Reset error flags
    req.session.data[`new-disposal-site-${siteNumber}-centre-latitude-error`] = "";
    req.session.data[`new-disposal-site-${siteNumber}-centre-longitude-error`] = "";

    let hasErrors = false;
    const coordinateSystem = req.session.data[`new-disposal-site-${siteNumber}-coordinate-system`];
    const isOSGB = coordinateSystem === "British National Grid (OSGB36)";

    // Validate latitude/easting
    if (!req.body[`new-disposal-site-${siteNumber}-centre-latitude`] || req.body[`new-disposal-site-${siteNumber}-centre-latitude`].trim() === '') {
      req.session.data[`new-disposal-site-${siteNumber}-centre-latitude-error`] = isOSGB ? "Enter the easting" : "Enter the latitude";
      hasErrors = true;
    } else {
      req.session.data[`new-disposal-site-${siteNumber}-centre-latitude`] = req.body[`new-disposal-site-${siteNumber}-centre-latitude`];
    }

    // Validate longitude/northing
    if (!req.body[`new-disposal-site-${siteNumber}-centre-longitude`] || req.body[`new-disposal-site-${siteNumber}-centre-longitude`].trim() === '') {
      req.session.data[`new-disposal-site-${siteNumber}-centre-longitude-error`] = isOSGB ? "Enter the northing" : "Enter the longitude";
      hasErrors = true;
    } else {
      req.session.data[`new-disposal-site-${siteNumber}-centre-longitude`] = req.body[`new-disposal-site-${siteNumber}-centre-longitude`];
    }

    if (hasErrors) {
      res.redirect(`enter-coordinates?site=${siteNumber}${returnTo ? '&returnTo=' + returnTo : ''}`);
      return;
    }

    // Check if this is an independent edit from review (when width already exists)
    const hasWidth = req.session.data[`new-disposal-site-${siteNumber}-width`];
    
    if (returnTo === 'review' && hasWidth) {
      // Go back to review page with anchor for change links
      res.redirect(`review-manual-disposal-site-details#site-${siteNumber}-details`);
    } else {
      // Continue to width page
      res.redirect(`site-width?site=${siteNumber}${returnTo ? '&returnTo=' + returnTo : ''}`);
    }
  });

  /////////////////////////////////////////////////////////
  //////// Site width page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/site-width`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Clear any existing error flags when user navigates to the page
    req.session.data[`new-disposal-site-${siteNumber}-width-error`] = "";
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/site-width`, {
      siteNumber: siteNumber,
      returnTo: returnTo
    });
  });

  // Site width router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/site-width-router`, function (req, res) {
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Reset error flags
    req.session.data[`new-disposal-site-${siteNumber}-width-error`] = "";

    let hasErrors = false;

    // Validate width
    if (!req.body[`new-disposal-site-${siteNumber}-width`] || req.body[`new-disposal-site-${siteNumber}-width`].trim() === '') {
      req.session.data[`new-disposal-site-${siteNumber}-width-error`] = "Enter the width in metres";
      hasErrors = true;
    } else {
      req.session.data[`new-disposal-site-${siteNumber}-width`] = req.body[`new-disposal-site-${siteNumber}-width`];
    }

    if (hasErrors) {
      res.redirect(`site-width?site=${siteNumber}${returnTo ? '&returnTo=' + returnTo : ''}`);
      return;
    }

    // Mark that user has visited manual entry journey
    req.session.data['has-visited-manual-disposal-site-locations'] = true;
    
    // Redirect to review page (with anchor only if from Change link)
    if (returnTo === 'review') {
      res.redirect(`review-manual-disposal-site-details#site-${siteNumber}-details`);
    } else {
      res.redirect(`review-manual-disposal-site-details`);
    }
  });

  /////////////////////////////////////////////////////////
  //////// Enter multiple coordinates page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/enter-multiple-coordinates`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Clear any existing error flags when user navigates to the page
    for (let i = 1; i <= 5; i++) {
      delete req.session.data[`new-disposal-site-${siteNumber}-point-${i}-latitude-error`];
      delete req.session.data[`new-disposal-site-${siteNumber}-point-${i}-longitude-error`];
    }
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/enter-multiple-coordinates`, {
      siteNumber: siteNumber,
      returnTo: returnTo
    });
  });

  // Enter multiple coordinates router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/enter-multiple-coordinates-router`, function (req, res) {
    const siteNumber = parseInt(req.query.site) || 1;
    const returnTo = req.query.returnTo;
    
    // Clear error flags
    for (let i = 1; i <= 5; i++) {
      delete req.session.data[`new-disposal-site-${siteNumber}-point-${i}-latitude-error`];
      delete req.session.data[`new-disposal-site-${siteNumber}-point-${i}-longitude-error`];
    }

    let hasErrors = false;
    const coordinateSystem = req.session.data[`new-disposal-site-${siteNumber}-coordinate-system`];
    const isOSGB = coordinateSystem === "British National Grid (OSGB36)";
    const errors = [];

    // Validate first 3 points (required)
    for (let i = 1; i <= 3; i++) {
      const latKey = `new-disposal-site-${siteNumber}-point-${i}-latitude`;
      const longKey = `new-disposal-site-${siteNumber}-point-${i}-longitude`;
      
      if (!req.body[latKey] || req.body[latKey].trim() === '') {
        const errorMsg = isOSGB ? `Enter the eastings of ${i === 1 ? 'the start and end point' : 'point ' + i}` : `Enter the latitude of ${i === 1 ? 'the start and end point' : 'point ' + i}`;
        req.session.data[`${latKey}-error`] = errorMsg;
        errors.push({ field: latKey, message: errorMsg });
        hasErrors = true;
      } else {
        req.session.data[latKey] = req.body[latKey];
      }
      
      if (!req.body[longKey] || req.body[longKey].trim() === '') {
        const errorMsg = isOSGB ? `Enter the northings of ${i === 1 ? 'the start and end point' : 'point ' + i}` : `Enter the longitude of ${i === 1 ? 'the start and end point' : 'point ' + i}`;
        req.session.data[`${longKey}-error`] = errorMsg;
        errors.push({ field: longKey, message: errorMsg });
        hasErrors = true;
      } else {
        req.session.data[longKey] = req.body[longKey];
      }
    }

    // Validate optional points 4 and 5 (if either field is filled, both must be filled)
    for (let i = 4; i <= 5; i++) {
      const latKey = `new-disposal-site-${siteNumber}-point-${i}-latitude`;
      const longKey = `new-disposal-site-${siteNumber}-point-${i}-longitude`;
      const latValue = req.body[latKey];
      const longValue = req.body[longKey];
      
      if (latValue && latValue.trim() !== '') {
        req.session.data[latKey] = latValue;
        
        if (!longValue || longValue.trim() === '') {
          const errorMsg = isOSGB ? `Enter the northings of point ${i}` : `Enter the longitude of point ${i}`;
          req.session.data[`${longKey}-error`] = errorMsg;
          errors.push({ field: longKey, message: errorMsg });
          hasErrors = true;
        } else {
          req.session.data[longKey] = longValue;
        }
      } else if (longValue && longValue.trim() !== '') {
        req.session.data[longKey] = longValue;
        
        const errorMsg = isOSGB ? `Enter the eastings of point ${i}` : `Enter the latitude of point ${i}`;
        req.session.data[`${latKey}-error`] = errorMsg;
        errors.push({ field: latKey, message: errorMsg });
        hasErrors = true;
      } else {
        // Both are empty - clear any previously saved data
        delete req.session.data[latKey];
        delete req.session.data[longKey];
      }
    }

    if (hasErrors) {
      res.redirect(`enter-multiple-coordinates?site=${siteNumber}${returnTo ? '&returnTo=' + returnTo : ''}`);
      return;
    }

    // Mark that user has visited manual entry journey
    req.session.data['has-visited-manual-disposal-site-locations'] = true;
    
    // Redirect to review page (with anchor only if from Change link)
    if (returnTo === 'review') {
      res.redirect(`review-manual-disposal-site-details#site-${siteNumber}-details`);
    } else {
      res.redirect(`review-manual-disposal-site-details`);
    }
  });

  /////////////////////////////////////////////////////////
  //////// Cancel and clear data
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/cancel`, function (req, res) {
    // Clear all manual entry data
    
    // Manual entry journey data - Site 1
    delete req.session.data['new-disposal-site-1-name'];
    delete req.session.data['new-disposal-site-1-coordinate-entry-method'];
    delete req.session.data['new-disposal-site-1-coordinate-system'];
    delete req.session.data['new-disposal-site-1-centre-latitude'];
    delete req.session.data['new-disposal-site-1-centre-longitude'];
    delete req.session.data['new-disposal-site-1-width'];
    // Clear polygon points for site 1
    for (let i = 1; i <= 5; i++) {
      delete req.session.data[`new-disposal-site-1-point-${i}-latitude`];
      delete req.session.data[`new-disposal-site-1-point-${i}-longitude`];
    }
    
    // Manual entry journey data - Site 2
    delete req.session.data['new-disposal-site-2-name'];
    delete req.session.data['new-disposal-site-2-coordinate-entry-method'];
    delete req.session.data['new-disposal-site-2-coordinate-system'];
    delete req.session.data['new-disposal-site-2-centre-latitude'];
    delete req.session.data['new-disposal-site-2-centre-longitude'];
    delete req.session.data['new-disposal-site-2-width'];
    // Clear polygon points for site 2
    for (let i = 1; i <= 5; i++) {
      delete req.session.data[`new-disposal-site-2-point-${i}-latitude`];
      delete req.session.data[`new-disposal-site-2-point-${i}-longitude`];
    }
    
    // Manual entry count
    delete req.session.data['disposal-site-manual-entry-count'];
    delete req.session.data['has-visited-manual-disposal-site-locations'];
    
    // Site 1 disposal details
    delete req.session.data['new-disposal-details-site-1-material-type'];
    delete req.session.data['new-disposal-details-site-1-material-type-other'];
    delete req.session.data['new-disposal-details-site-1-method'];
    delete req.session.data['new-disposal-details-site-1-method-other'];
    delete req.session.data['new-disposal-site-1-total-volume'];
    delete req.session.data['new-disposal-site-1-beneficial-use'];
    delete req.session.data['new-disposal-site-1-beneficial-use-description'];
    
    // Site 2 disposal details
    delete req.session.data['new-disposal-details-site-2-material-type'];
    delete req.session.data['new-disposal-details-site-2-material-type-other'];
    delete req.session.data['new-disposal-details-site-2-method'];
    delete req.session.data['new-disposal-details-site-2-method-other'];
    delete req.session.data['new-disposal-site-2-total-volume'];
    delete req.session.data['new-disposal-site-2-beneficial-use'];
    delete req.session.data['new-disposal-site-2-beneficial-use-description'];
    
    // Clear journey type
    delete req.session.data['disposal-site-journey-type'];
    
    // Clear overall completion flags
    delete req.session.data['new-disposal-sites-all-complete'];
    req.session.data['sample-disposal-sites-completed'] = false;
    req.session.data['sample-disposal-sites-in-progress'] = false;
    
    // Redirect to task list
    res.redirect('../../../sample-plan-start-page');
  });

  /////////////////////////////////////////////////////////
  //////// Review manual disposal site details page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/review-manual-disposal-site-details`, function (req, res) {
    req.session.data['samplePlansSection'] = section;
    
    // Mark that user has visited the review page
    req.session.data['has-visited-manual-disposal-site-locations'] = true;
    
    res.render(`versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/review-manual-disposal-site-details`);
  });

  // Review manual disposal site details router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/${newSubSection}/${manualSubSection}/review-manual-disposal-site-details-router`, function (req, res) {
    // Check if all required fields are completed for all sites
    const siteCount = parseInt(req.session.data['disposal-site-manual-entry-count']) || 1;
    let allComplete = true;

    for (let siteNum = 1; siteNum <= siteCount; siteNum++) {
      // Check site name
      if (!req.session.data[`new-disposal-site-${siteNum}-name`]) {
        allComplete = false;
      }
      
      // Check coordinate entry method and system
      if (!req.session.data[`new-disposal-site-${siteNum}-coordinate-entry-method`] || 
          !req.session.data[`new-disposal-site-${siteNum}-coordinate-system`]) {
        allComplete = false;
      }
      
      // Check coordinates based on entry method
      const entryMethod = req.session.data[`new-disposal-site-${siteNum}-coordinate-entry-method`];
      if (entryMethod === 'Enter one set of coordinates and a width to create a circular site') {
        if (!req.session.data[`new-disposal-site-${siteNum}-centre-latitude`] || 
            !req.session.data[`new-disposal-site-${siteNum}-centre-longitude`] ||
            !req.session.data[`new-disposal-site-${siteNum}-width`]) {
          allComplete = false;
        }
      } else {
        // Check at least 3 points
        for (let i = 1; i <= 3; i++) {
          if (!req.session.data[`new-disposal-site-${siteNum}-point-${i}-latitude`] || 
              !req.session.data[`new-disposal-site-${siteNum}-point-${i}-longitude`]) {
            allComplete = false;
          }
        }
      }
      
      // Check disposal details
      if (!req.session.data[`new-disposal-details-site-${siteNum}-material-type`] || 
          !req.session.data[`new-disposal-details-site-${siteNum}-method`]) {
        allComplete = false;
      }
      
      // Check maximum volume
      if (!req.session.data[`new-disposal-site-${siteNum}-total-volume`]) {
        allComplete = false;
      }
      
      // Check beneficial use
      if (!req.session.data[`new-disposal-site-${siteNum}-beneficial-use`]) {
        allComplete = false;
      }
    }
    
    // Set the overall completion status
    if (allComplete) {
      req.session.data['new-disposal-sites-all-complete'] = true;
      req.session.data['sample-disposal-sites-completed'] = true;
      req.session.data['sample-disposal-sites-in-progress'] = false;
    } else {
      req.session.data['new-disposal-sites-all-complete'] = false;
      req.session.data['sample-disposal-sites-in-progress'] = true;
      req.session.data['sample-disposal-sites-completed'] = false;
    }
    
    // Redirect back to task list (sample plan start page)
    res.redirect('../../../sample-plan-start-page');
  });

};

