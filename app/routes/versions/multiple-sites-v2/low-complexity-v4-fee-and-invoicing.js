module.exports = function (router) {
  const version = "multiple-sites-v2";
  const section = "low-complexity-v4";
  const subSection = "fee-and-invoicing";

  ///////////////////////////////////////////
  // Fee estimate page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/fee-estimate`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['low-complexity-fee-errorthispage'] = "false";
    req.session.data['low-complexity-fee-errortypeone'] = "false";
    req.session.data['low-complexity-fee-errortypetwo'] = "false";

    // Arriving via the "Change" link on the main check-your-answers page:
    // remember so an accepted fee returns there rather than to the task list.
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }

    res.render(`versions/${version}/${section}/${subSection}/fee-estimate`);
  });

  // Fee estimate router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/fee-estimate-router`, function (req, res) {
    // Reset error flags
    req.session.data['low-complexity-fee-errorthispage'] = "false";
    req.session.data['low-complexity-fee-errortypeone'] = "false";
    req.session.data['low-complexity-fee-errortypetwo'] = "false";

    let hasError = false;

    // Validate terms and conditions checkbox
    if (!req.session.data['low-complexity-fee-terms-checkbox']) {
      req.session.data['low-complexity-fee-errorthispage'] = "true";
      req.session.data['low-complexity-fee-errortypeone'] = "true";
      hasError = true;
    }

    // Validate fee acceptance radio button
    if (!req.session.data['low-complexity-fee-acceptance'] || req.session.data['low-complexity-fee-acceptance'].trim() === '') {
      req.session.data['low-complexity-fee-errorthispage'] = "true";
      req.session.data['low-complexity-fee-errortypetwo'] = "true";
      hasError = true;
    }

    // If there are validation errors, redirect back to the form
    if (hasError) {
      return res.redirect('fee-estimate');
    }

    // Success case - mark as completed if checkbox agreed and Yes selected
    if (req.session.data['low-complexity-fee-terms-checkbox'] && req.session.data['low-complexity-fee-acceptance'] === 'yes') {
      req.session.data['low-complexity-fee-estimate-completed'] = "true";
      // Clear any previous rejection flag
      req.session.data['low-complexity-fee-estimate-rejected'] = "false";
    }

    // Conditional routing based on fee acceptance
    if (req.session.data['low-complexity-fee-acceptance'] === 'yes') {
      // Returning from the main check-your-answers page — go back there
      if (req.session.data['camefromcheckanswers'] === 'true') {
        req.session.data['camefromcheckanswers'] = false;
        return res.redirect(`/versions/${version}/${section}/check-your-answers#fee-estimate`);
      }
      // Go back to the task list
      res.redirect(`/versions/${version}/${section}/marine-licence-start-page`);
    } else if (req.session.data['low-complexity-fee-acceptance'] === 'no') {
      // Redirect to the "are you sure" confirmation page
      res.redirect('fee-are-you-sure');
    } else {
      // Fallback
      res.redirect(`/versions/${version}/${section}/marine-licence-start-page`);
    }
  });

  ///////////////////////////////////////////
  // Fee are you sure page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/fee-are-you-sure`, function (req, res) {
    res.render(`versions/${version}/${section}/${subSection}/fee-are-you-sure`);
  });

  // Fee are you sure router (POST)
  router.post(`/versions/${version}/${section}/${subSection}/fee-are-you-sure-router`, function (req, res) {
    // Mark fee estimate as rejected/not accepted
    req.session.data['low-complexity-fee-estimate-completed'] = "false";
    req.session.data['low-complexity-fee-estimate-rejected'] = "true";
    // Abandoning to a draft — clear the check-your-answers return flag
    req.session.data['camefromcheckanswers'] = false;

    // Redirect to submissions page - the application will remain as a draft
    res.redirect(`/versions/${version}/${section}/submissions`);
  });

  ///////////////////////////////////////////
  // Invoicing section (UK branch)
  //
  // Nothing is treated as "saved" until the user reaches the Check page.
  // Re-entering the task from the task list (when not yet complete) hits
  // `invoicing-start`, which wipes all invoicing keys so the user starts
  // afresh. The completed flag is only set when the Check page is loaded.
  ///////////////////////////////////////////

  const invoicingKeys = [
    'invoice-address-type',
    'invoice-address-type-previous',
    'invoice-address-line-1',
    'invoice-address-line-2',
    'invoice-town-city',
    'invoice-county',
    'invoice-postcode',
    'invoice-country',
    'invoice-international-address',
    'invoice-full-name',
    'invoice-organisation-name',
    'invoice-phone',
    'invoice-email',
    'invoice-po-required',
    'invoice-po-number',
    // Postcode lookup
    'invoice-postcode-search',
    'invoice-property-name-number',
    'invoice-lookup-results',
    'invoice-selected-address',
    'invoice-address-source'
  ];

  ///////////////////////////////////////////
  // Mock address lookup
  //
  // There is no address service in the prototype, so the lookup is faked
  // against a single made-up Exmouth postcode:
  //
  //   EX8 1AN                 -> 5 results, so the address picker is shown
  //   EX8 1AN + a property    -> 1 result, so Review and confirm is shown
  //   anything else           -> 0 results, so the "not found" error is shown
  //
  // Fields mirror the shape the real lookup returns (ML-1501 AC2).
  ///////////////////////////////////////////

  const MOCK_POSTCODE = 'EX81AN';

  const mockAddresses = [
    { buildingNumber: '1', street: 'Marine Parade', locality: '', town: 'Exmouth', ceremonialCounty: 'Devon', postcode: 'EX8 1AN' },
    { buildingNumber: '2', street: 'Marine Parade', locality: '', town: 'Exmouth', ceremonialCounty: 'Devon', postcode: 'EX8 1AN' },
    { buildingNumber: '3', street: 'Marine Parade', locality: '', town: 'Exmouth', ceremonialCounty: 'Devon', postcode: 'EX8 1AN' },
    { subBuildingName: 'Flat 2', buildingNumber: '4', street: 'Marine Parade', locality: '', town: 'Exmouth', ceremonialCounty: 'Devon', postcode: 'EX8 1AN' },
    { buildingName: 'The Boathouse', buildingNumber: '5', street: 'Marine Parade', locality: 'Point in View', town: 'Exmouth', ceremonialCounty: 'Devon', postcode: 'EX8 1AN' }
  ];

  // Postcodes are compared with spaces and case removed so "ex8 1an" matches.
  function normalisePostcode(value) {
    return (value || '').replace(/\s+/g, '').toUpperCase();
  }

  // The single line shown on the address picker and confirm pages, built from
  // whichever of the building fields the address actually has.
  function buildAddressLine(address) {
    const parts = [address.subBuildingName, address.buildingName, address.buildingNumber, address.street]
      .filter(function (part) { return part; })
      .join(' ');
    return `${parts}, ${address.town} ${address.postcode}`;
  }

  // Runs the fake search. Returns every address for the postcode, narrowed to
  // a single match when a property name or number is given.
  function lookupAddresses(postcode, property) {
    if (normalisePostcode(postcode) !== MOCK_POSTCODE) {
      return [];
    }

    const results = mockAddresses.map(function (address) {
      return Object.assign({}, address, { addressLine: buildAddressLine(address) });
    });

    const search = (property || '').trim().toLowerCase();
    if (search === '') {
      return results;
    }

    return results.filter(function (address) {
      return [address.buildingNumber, address.buildingName, address.subBuildingName]
        .filter(function (part) { return part; })
        .some(function (part) { return part.toLowerCase().indexOf(search) !== -1; });
    });
  }

  // Copies a looked-up address into the same session keys a manually entered
  // address uses, so everything downstream is unaware of where it came from
  // (ML-1501 AC4b).
  function storeAddress(req, address) {
    req.session.data['invoice-address-line-1'] = [address.subBuildingName, address.buildingName, address.buildingNumber, address.street]
      .filter(function (part) { return part; })
      .join(' ');
    req.session.data['invoice-address-line-2'] = address.locality || '';
    req.session.data['invoice-town-city'] = address.town || '';
    req.session.data['invoice-county'] = address.ceremonialCounty || '';
    req.session.data['invoice-postcode'] = address.postcode || '';
    req.session.data['invoice-address-source'] = 'lookup';
  }

  // Query string used to carry the "returning to the check page" state through
  // each step of the lookup.
  function returnToQuery(returnTo) {
    return returnTo ? `?returnTo=${returnTo}` : '';
  }

  // Helper: render an invoicing page with locals
  function renderInvoicing(res, req, page, locals) {
    res.render(`versions/${version}/${section}/${subSection}/${page}`, Object.assign({
      data: req.session.data,
      errors: {},
      returnTo: req.query.returnTo
    }, locals || {}));
  }

  // ---- Fresh-start reset (entry point from the task list) ----
  router.get(`/versions/${version}/${section}/${subSection}/invoicing-start`, function (req, res) {
    invoicingKeys.forEach(function (key) {
      delete req.session.data[key];
    });
    req.session.data['low-complexity-invoicing-completed'] = false;
    res.redirect('is-invoice-address-uk-or-international');
  });

  // Address fields that belong to a specific address type. Cleared whenever
  // the user switches between UK and international so stale data isn't kept.
  const ukAddressKeys = [
    'invoice-address-line-1',
    'invoice-address-line-2',
    'invoice-town-city',
    'invoice-county',
    'invoice-postcode'
  ];
  const intlAddressKeys = [
    'invoice-country',
    'invoice-international-address'
  ];

  // ---- 1. Is the invoice contact's address in the UK or international? ----
  router.get(`/versions/${version}/${section}/${subSection}/is-invoice-address-uk-or-international`, function (req, res) {
    // Snapshot the currently-stored type so the router can tell whether the
    // user actually switched (the kit overwrites the live value on POST).
    req.session.data['invoice-address-type-previous'] = req.session.data['invoice-address-type'] || '';
    renderInvoicing(res, req, 'is-invoice-address-uk-or-international');
  });

  router.post(`/versions/${version}/${section}/${subSection}/is-invoice-address-uk-or-international-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const addressType = req.body['invoice-address-type'];

    if (!addressType) {
      return renderInvoicing(res, req, 'is-invoice-address-uk-or-international', {
        errors: { addressType: "Select whether the invoice contact's address in the UK or international" }
      });
    }

    const previousType = req.session.data['invoice-address-type-previous'];
    const typeChanged = previousType && previousType !== addressType;

    // Switching UK <-> international: clear whatever address data was stored
    // so the user re-enters it fresh on the relevant address page.
    if (typeChanged) {
      ukAddressKeys.concat(intlAddressKeys).forEach(function (key) {
        delete req.session.data[key];
      });
    }

    const data = req.session.data;
    const ukAddressCaptured = data['invoice-address-line-1'] && data['invoice-address-line-1'].trim() !== '';
    const intlAddressCaptured = data['invoice-country'] && data['invoice-country'].trim() !== '';

    if (returnTo === 'check') {
      // Changing answers from the check page. If the type is unchanged and the
      // address already exists, bounce straight back to check. If the type
      // switched, route through address before returning to check.
      const addressReturnTo = 'check';
      if (addressType === 'international') {
        if (!typeChanged && intlAddressCaptured) {
          return res.redirect('check-invoicing-details');
        }
        return res.redirect(`international-invoice-address?returnTo=${addressReturnTo}`);
      }
      if (!typeChanged && ukAddressCaptured) {
        return res.redirect('check-invoicing-details');
      }
      return res.redirect(`postcode-search?returnTo=${addressReturnTo}`);
    }

    // Forward flow
    if (addressType === 'international') {
      return res.redirect('international-invoice-address');
    }
    // UK addresses now start with the postcode lookup rather than manual entry
    res.redirect('postcode-search');
  });

  ///////////////////////////////////////////
  // Postcode lookup (UK addresses only)
  ///////////////////////////////////////////

  // ---- 2a-i. Postcode search ----
  router.get(`/versions/${version}/${section}/${subSection}/postcode-search`, function (req, res) {
    renderInvoicing(res, req, 'postcode-search');
  });

  router.post(`/versions/${version}/${section}/${subSection}/postcode-search-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const postcode = req.body['invoice-postcode-search'] || '';
    const property = req.body['invoice-property-name-number'] || '';
    const errors = {};

    if (postcode.trim() === '') {
      errors.postcode = 'Enter the postcode';
    } else if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(postcode.trim())) {
      errors.postcode = 'Enter a valid postcode';
    }

    if (property.trim().length > 50) {
      errors.property = 'The property name or number must be 50 characters or fewer';
    }

    if (Object.keys(errors).length > 0) {
      return renderInvoicing(res, req, 'postcode-search', { errors: errors });
    }

    const results = lookupAddresses(postcode, property);

    // No matches — stay on the page with the "not found" error
    if (results.length === 0) {
      return renderInvoicing(res, req, 'postcode-search', {
        errors: { postcode: 'We could not find any addresses for that postcode. Enter a known postcode, or enter the address manually.' }
      });
    }

    // Exactly one match — skip the picker and go straight to confirmation
    if (results.length === 1) {
      req.session.data['invoice-selected-address'] = results[0];
      return res.redirect(`confirm-address${returnToQuery(returnTo)}`);
    }

    req.session.data['invoice-lookup-results'] = results;
    res.redirect(`address-picker${returnToQuery(returnTo)}`);
  });

  // ---- 2a-ii. Address picker ----
  router.get(`/versions/${version}/${section}/${subSection}/address-picker`, function (req, res) {
    renderInvoicing(res, req, 'address-picker');
  });

  router.post(`/versions/${version}/${section}/${subSection}/address-picker-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const selected = req.body['invoice-selected-address-index'];

    if (selected === undefined || selected === '') {
      return renderInvoicing(res, req, 'address-picker', {
        errors: { selectedAddress: 'Select an address, or select "None of these"' }
      });
    }

    // "None of these" — fall back to manual entry with the searched postcode
    // already filled in (ML-1492 AC4c).
    if (selected === 'none') {
      req.session.data['invoice-postcode'] = req.session.data['invoice-postcode-search'];
      req.session.data['invoice-address-source'] = 'manual';
      return res.redirect(`uk-invoice-address${returnToQuery(returnTo)}`);
    }

    const results = req.session.data['invoice-lookup-results'] || [];
    req.session.data['invoice-selected-address'] = results[Number(selected)];
    res.redirect(`confirm-address${returnToQuery(returnTo)}`);
  });

  // ---- 2a-iii. Review and confirm ----
  router.get(`/versions/${version}/${section}/${subSection}/confirm-address`, function (req, res) {
    renderInvoicing(res, req, 'confirm-address');
  });

  router.post(`/versions/${version}/${section}/${subSection}/confirm-address-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const address = req.session.data['invoice-selected-address'];

    if (!address) {
      return res.redirect(`postcode-search${returnToQuery(returnTo)}`);
    }

    storeAddress(req, address);

    // Changing the address from the check page returns there rather than
    // continuing through contact details (ML-1508 AC2c).
    if (returnTo === 'check') {
      return res.redirect('check-invoicing-details');
    }
    res.redirect('invoice-contact-details');
  });

  // ---- 2b. International invoice address ----
  router.get(`/versions/${version}/${section}/${subSection}/international-invoice-address`, function (req, res) {
    renderInvoicing(res, req, 'international-invoice-address');
  });

  router.post(`/versions/${version}/${section}/${subSection}/international-invoice-address-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const errors = {};

    if (!req.body['invoice-country'] || req.body['invoice-country'].trim() === '') {
      errors.country = 'Select a country';
    }
    if (!req.body['invoice-international-address'] || req.body['invoice-international-address'].trim() === '') {
      errors.address = 'Enter the address';
    }

    if (Object.keys(errors).length > 0) {
      return renderInvoicing(res, req, 'international-invoice-address', { errors: errors });
    }

    if (returnTo === 'check') {
      return res.redirect('check-invoicing-details');
    }
    res.redirect('invoice-contact-details');
  });

  // ---- 2. UK invoice address ----
  router.get(`/versions/${version}/${section}/${subSection}/uk-invoice-address`, function (req, res) {
    renderInvoicing(res, req, 'uk-invoice-address');
  });

  router.post(`/versions/${version}/${section}/${subSection}/uk-invoice-address-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const errors = {};

    if (!req.body['invoice-address-line-1'] || req.body['invoice-address-line-1'].trim() === '') {
      errors.addressLine1 = 'Enter address line 1';
    }
    if (!req.body['invoice-town-city'] || req.body['invoice-town-city'].trim() === '') {
      errors.townCity = 'Enter town or city';
    }
    if (!req.body['invoice-postcode'] || req.body['invoice-postcode'].trim() === '') {
      errors.postcode = 'Enter postcode';
    }

    if (Object.keys(errors).length > 0) {
      return renderInvoicing(res, req, 'uk-invoice-address', { errors: errors });
    }

    // Remember that this address was typed rather than looked up, so the
    // check page sends the "Change" link back to the right place (ML-1508 AC3).
    req.session.data['invoice-address-source'] = 'manual';

    if (returnTo === 'check') {
      return res.redirect('check-invoicing-details');
    }
    res.redirect('invoice-contact-details');
  });

  // ---- 3. Invoice contact details ----
  router.get(`/versions/${version}/${section}/${subSection}/invoice-contact-details`, function (req, res) {
    renderInvoicing(res, req, 'invoice-contact-details');
  });

  router.post(`/versions/${version}/${section}/${subSection}/invoice-contact-details-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const isOrganisation = req.session.data['user_type'] === 'organisation';
    const errors = {};

    if (!req.body['invoice-full-name'] || req.body['invoice-full-name'].trim() === '') {
      errors.fullName = 'Enter full name';
    }
    if (isOrganisation && (!req.body['invoice-organisation-name'] || req.body['invoice-organisation-name'].trim() === '')) {
      errors.organisationName = 'Enter organisation name';
    }
    if (!req.body['invoice-phone'] || req.body['invoice-phone'].trim() === '') {
      errors.phone = 'Enter phone number';
    }
    if (!req.body['invoice-email'] || req.body['invoice-email'].trim() === '') {
      errors.email = 'Enter email address';
    }

    if (Object.keys(errors).length > 0) {
      return renderInvoicing(res, req, 'invoice-contact-details', { errors: errors });
    }

    if (returnTo === 'check') {
      return res.redirect('check-invoicing-details');
    }

    // Individual users skip the purchase order page
    if (isOrganisation) {
      return res.redirect('purchase-order-details');
    }
    res.redirect('check-invoicing-details');
  });

  // ---- 4. Purchase order details (organisation users only) ----
  router.get(`/versions/${version}/${section}/${subSection}/purchase-order-details`, function (req, res) {
    renderInvoicing(res, req, 'purchase-order-details');
  });

  router.post(`/versions/${version}/${section}/${subSection}/purchase-order-details-router`, function (req, res) {
    const returnTo = req.query.returnTo;
    const poRequired = req.body['invoice-po-required'];
    const errors = {};

    if (!poRequired) {
      errors.poRequired = 'Select whether you require a purchase order number on the invoice';
    } else if (poRequired === 'yes' && (!req.body['invoice-po-number'] || req.body['invoice-po-number'].trim() === '')) {
      errors.poNumber = 'Enter a purchase order number';
    }

    if (Object.keys(errors).length > 0) {
      return renderInvoicing(res, req, 'purchase-order-details', { errors: errors });
    }

    // Clear the PO number if "No" was selected
    if (poRequired === 'no') {
      req.session.data['invoice-po-number'] = '';
    }

    res.redirect('check-invoicing-details');
  });

  // ---- 5. Check your invoicing details ----
  router.get(`/versions/${version}/${section}/${subSection}/check-invoicing-details`, function (req, res) {
    // Reaching this page means the section is complete and the data is saved
    req.session.data['low-complexity-invoicing-completed'] = true;

    // Arriving here via the "Change" link on the main check-your-answers page:
    // remember so the Continue button returns there rather than to the task list.
    if (req.query.camefromcheckanswers === 'true') {
      req.session.data['camefromcheckanswers'] = 'true';
    }

    renderInvoicing(res, req, 'check-invoicing-details');
  });

  router.post(`/versions/${version}/${section}/${subSection}/check-invoicing-details-router`, function (req, res) {
    // Return to the main check-your-answers page if we came from there,
    // otherwise back to the task list (mirrors the Review site details flow).
    if (req.session.data['camefromcheckanswers'] === 'true') {
      req.session.data['camefromcheckanswers'] = false;
      return res.redirect(`/versions/${version}/${section}/check-your-answers#invoicing`);
    }
    res.redirect(`/versions/${version}/${section}/marine-licence-start-page`);
  });
};
