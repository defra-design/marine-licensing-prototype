// app/routes/versions/iat/iat.js
// Generates the full Marine-licence IAT journey.
// All paths include /versions/iat/ prefix.

module.exports = function (router) {
  const path = require("path");
  const iat = require(path.join(__dirname, "../../../data/iat.json"));

  const base = "/versions/iat/journey"; // prefix reused everywhere

  // Detect card pages - either questions with Option answers or outcomes with outcomeTypes
  const isCard = (q) =>
    (q.answers &&
      q.answers.some((a) => /^option\s*\d+/i.test(a.text.trim()))) ||
    (q.outcomeTypes && q.outcomeTypes.length > 0);

  // Helper function to create answers from outcomeTypes
  const createAnswersFromOutcomeTypes = (q) => {
    if (!q.outcomeTypes) return [];

    return q.outcomeTypes
      .map((outcomeTypeId, index) => {
        const outcomeType = iat.outcomeTypes.find(
          (ot) => ot.id === outcomeTypeId,
        );
        if (!outcomeType) return null;

        return {
          id: outcomeTypeId,
          text: `<h3 class="govuk-heading-m">Option ${index + 1} - ${outcomeType.heading}</h3><p>${outcomeType.text}</p>`,
        };
      })
      .filter(Boolean);
  };

  // Combine questions and outcomes that have routes
  const allRouteItems = [
    ...iat.questions,
    ...iat.outcomes.filter((o) => o.route),
  ];

  // ------- Start page -------------------------------------------
    router.get('/versions/iat/start', (req, res) => {
      res.render('versions/iat/start');
    });

  // ------------------------------------------------------------------
  // Question and outcome pages (radio or card)
  // ------------------------------------------------------------------
  allRouteItems.forEach((q) => {
    const fullPath = `${base}${q.route}`; // e.g. /versions/iat/journey/sea

    // ----- GET ------------------------------------------------------
    router.get(fullPath, (req, res) => {
      const view = {
        h1: q.text || q.heading, // questions use 'text', outcomes use 'heading'
        hintHtml: q.hint,
      };

      // For outcomes that have both heading and text, use heading as h1 and text as hint
      if (q.heading && q.text) {
        view.h1 = q.heading;
        view.hintHtml = q.text;
      }

      if (isCard(q)) {
        // Pass answers from either q.answers or generated from outcomeTypes
        view.rawAnswers = q.answers || createAnswersFromOutcomeTypes(q);
        res.render("versions/iat/layouts/iat/card-selection", view);
      } else {
        view.inputName = q.route.replace(/^\//, ""); // e.g. 'sea'
        view.radios = q.answers.map((a) => ({
          value: a.id,
          text: a.text,
          hint: a.hint && { html: a.hint },
        }));
        res.render("versions/iat/layouts/iat/radio-page", view);
      }
    });

    // ----- POST -----------------------------------------------------
    router.post(fullPath, (req, res) => {
      // Radio pages submit under inputName; card pages under 'selection'
      const answer = req.body.selection || req.body[q.route.replace(/^\//, "")];

      // For cards with outcomeTypes, find the selected outcome
      if (q.outcomeTypes) {
        const selectedOutcomeType = iat.outcomeTypes.find(
          (ot) => ot.id === answer,
        );
        if (selectedOutcomeType) {
          if (selectedOutcomeType.nextQuestionRoute) {
            return res.redirect(
              `${base}${selectedOutcomeType.nextQuestionRoute}`,
            );
          }
          // If no nextQuestionRoute, treat as outcome - find corresponding outcome
          const outcome = iat.outcomes.find(
            (o) => o.outcomeTypes && o.outcomeTypes.includes(answer),
          );
          if (outcome) {
            return res.redirect(`${base}${outcome.route}`);
          }
        }
      }

      // Original logic for regular questions
      const chosen = q.answers
        ? q.answers.find((a) => a.id === answer) || q.answers[0]
        : null;
      if (chosen) {
        const next = chosen.nextQuestionRoute || chosen.outcomeRoute;
        res.redirect(`${base}${next}`);
      } else {
        // Fallback - redirect to first question
        res.redirect(`${base}/sea`);
      }
    });
  });

  // ------------------------------------------------------------------
  // Outcome pages (for outcomes without outcomeTypes - final outcomes)
  // ------------------------------------------------------------------
  iat.outcomes
    .filter((o) => o.route && !o.outcomeTypes)
    .forEach((o) => {
      const fullPath = `${base}${o.route}`;

      router.get(fullPath, (req, res) => {
        res.render("versions/iat/layouts/iat/outcome", {
          h1: o.heading || "",
          bodyHtml: o.text,
          primaryAction: o.link
            ? { text: o.heading || "Continue", href: o.link }
            : null,
        });
      });
    });
};
