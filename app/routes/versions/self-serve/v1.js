
module.exports = function (router) {

  const version = "self-serve";
  const section = "v1";

  // SIGN IN

  router.post(`/versions/${version}/${section}/sign-in-router`, function (req, res) {

    const gotoPage = req.session.data['goto'];

    if (req.session.data['user_type'] === 'organisation') {

      delete req.session.data['changing-organisation'];

      if (gotoPage) {
        req.session.data['goto-after-org-selector'] = gotoPage;
      }

      res.redirect('organisation-selector');

    } else {

      if (gotoPage === 'homepage') {
        delete req.session.data['goto'];
        res.redirect('homepage');
      } else {
        res.redirect('application-name-start');
      }

    }

  });


  // APPLICATION NAME

  router.get(`/versions/${version}/${section}/application-name-start`, function (req, res) {

    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    res.render(`versions/${version}/${section}/application-name-start`);

  });


  // SAVE APPLICATION NAME AND CREATE DRAFT

  router.post(`/versions/${version}/${section}/application-name-start-router`, function (req, res) {

    req.session.data['errorthispage'] = "false";
    req.session.data['errortypeone'] = "false";

    const projectName = req.session.data['low-complexity-project-name-text-input'];

    if (!projectName || projectName.trim() === '') {

      req.session.data['errorthispage'] = "true";
      req.session.data['errortypeone'] = "true";

      res.redirect('application-name-start');

    } else {

      if (req.session.data['camefromcheckanswers'] === 'true') {

        req.session.data['camefromcheckanswers'] = false;

        res.redirect('check-your-answers');

      } else {

        req.session.data['low-complexity-application-status'] = 'draft';
        req.session.data['low-complexity-application-reference'] = '-';

        res.redirect('marine-licence-start-page');

      }

    }

  });

};
