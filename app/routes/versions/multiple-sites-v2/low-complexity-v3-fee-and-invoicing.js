module.exports = function (router) {
  const version = "multiple-sites-v2";
  const section = "low-complexity-v3";
  const subSection = "fee-and-invoicing";

  ///////////////////////////////////////////
  // Fee estimate page
  ///////////////////////////////////////////

  router.get(`/versions/${version}/${section}/${subSection}/fee-estimate`, function (req, res) {
    // Clear any existing error flags when user navigates to the page
    req.session.data['low-complexity-fee-errorthispage'] = "false";
    req.session.data['low-complexity-fee-errortypeone'] = "false";
    req.session.data['low-complexity-fee-errortypetwo'] = "false";

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

    // Redirect to projects page - the project will remain as a draft
    res.redirect(`/versions/${version}/${section}/projects`);
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
    'invoice-po-number'
  ];

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
      // switched, route through address then contact details before check.
      const addressReturnTo = typeChanged ? 'check-contact' : 'check';
      if (addressType === 'international') {
        if (!typeChanged && intlAddressCaptured) {
          return res.redirect('check-invoicing-details');
        }
        return res.redirect(`international-invoice-address?returnTo=${addressReturnTo}`);
      }
      if (!typeChanged && ukAddressCaptured) {
        return res.redirect('check-invoicing-details');
      }
      return res.redirect(`uk-invoice-address?returnTo=${addressReturnTo}`);
    }

    // Forward flow
    if (addressType === 'international') {
      return res.redirect('international-invoice-address');
    }
    res.redirect('uk-invoice-address');
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

    if (returnTo === 'check-contact') {
      return res.redirect('invoice-contact-details?returnTo=check');
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

    if (returnTo === 'check-contact') {
      return res.redirect('invoice-contact-details?returnTo=check');
    }
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
      errors.phone = req.session.data['invoice-address-type'] === 'international' ? 'Enter phone number' : 'Enter UK phone number';
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
