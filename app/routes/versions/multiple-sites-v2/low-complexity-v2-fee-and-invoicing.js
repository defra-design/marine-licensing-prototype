module.exports = function (router) {
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";
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
};
