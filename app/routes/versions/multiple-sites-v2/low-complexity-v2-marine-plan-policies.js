module.exports = function (router) {
  // Low complexity v2 marine plan policies routes
  const version = "multiple-sites-v2";
  const section = "low-complexity-v2";
  const subsection = "marine-plan-policies";

  /////////////////////////////////////////////////////////
  //////// Marine plan policies index page
  /////////////////////////////////////////////////////////
  router.get(`/versions/${version}/${section}/${subsection}/`, function (req, res) {
    res.render(`versions/${version}/${section}/${subsection}/index`);
  });

};
