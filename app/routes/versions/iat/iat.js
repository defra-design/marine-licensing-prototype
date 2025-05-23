// app/routes/versions/iat/iat.js
// Generates the full Marine-licence IAT journey.
// All paths include /versions/iat/ prefix.

module.exports = function (router) {

  const path = require('path');
  const iat  = require(path.join(__dirname, '../../../data/iat.json'));

  const base = '/versions/iat/journey';   // prefix reused everywhere

  // Detect “Option 1 …” style answers = card pages
  const isCard = q =>
    q.answers.some(a => /^option\s*\d+/i.test(a.text.trim()));

  // ------------------------------------------------------------------
  // Question pages (radio or card)
  // ------------------------------------------------------------------
  iat.questions.forEach(q => {
    const fullPath = `${base}${q.route}`;   // e.g. /versions/iat/journey/sea

    // ----- GET ------------------------------------------------------
    router.get(fullPath, (req, res) => {
      const view = {
        h1      : q.text,
        hintHtml: q.hint
      };

      if (isCard(q)) {
        // Pass answers exactly as-is (contains full HTML)
        view.rawAnswers = q.answers;
        res.render('versions/iat/layouts/iat/card-selection', view);
      } else {
        view.inputName = q.route.replace(/^\//, '');   // e.g. 'sea'
        view.radios    = q.answers.map(a => ({
          value: a.id,
          text : a.text,
          hint : a.hint && { html: a.hint }
        }));
        res.render('versions/iat/layouts/iat/radio-page', view);
      }
    });

    // ----- POST -----------------------------------------------------
    router.post(fullPath, (req, res) => {
      // Radio pages submit under inputName; card pages under 'selection'
      const answer = req.body.selection || req.body[q.route.replace(/^\//, '')];
      const chosen = q.answers.find(a => a.id === answer) || q.answers[0];
      const next   = chosen.nextQuestionRoute || chosen.outcomeRoute;
      res.redirect(`${base}${next}`);
    });
  });

  // ------------------------------------------------------------------
  // Outcome pages
  // ------------------------------------------------------------------
  iat.outcomes.forEach(o => {
    const fullPath = `${base}${o.route}`;

    router.get(fullPath, (req, res) => {
      res.render('versions/iat/layouts/iat/outcome', {
        h1          : o.heading || '',
        bodyHtml    : o.text,
        primaryAction: o.link
          ? { text: o.heading || 'Continue', href: o.link }
          : null
      });
    });
  });
};