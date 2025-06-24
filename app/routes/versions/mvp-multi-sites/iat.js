// app/routes/versions/iat/iat.js
// Generates the full Marine-licence IAT journey.
// All paths include /versions/iat/ prefix.

module.exports = function (router) {
  const path = require("path");
  const iat = require(path.join(__dirname, "../../../data/iat.json"));

  const base = "/versions/mvp-multi-sites/journey"; // prefix reused everywhere

  // Helper function to get caption text from section
  const getCaptionText = (sectionId) => {
    if (!sectionId) return null;
    const section = iat.sections.find(s => s.id === sectionId);
    return section ? section.text : null;
  };

  // Detect card pages - either questions with Option answers or outcomes with multiple outcomeTypes
  const isCard = (q) =>
    (q.answers &&
      q.answers.some((a) => /^option\s*\d+/i.test(a.text.trim()))) ||
    (q.outcomeTypes && q.outcomeTypes.length > 1);

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
    router.get('/versions/mvp-multi-sites/start', (req, res) => {
      res.render('versions/mvp-multi-sites/start');
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
        caption: getCaptionText(q.section)
      };

      // For outcomes that have both heading and text, use heading as h1 and text as hint
      if (q.heading && q.text) {
        view.h1 = q.heading;
        view.hintHtml = q.text;
      }

      // Check if this is a single outcome type (like notification required exemptions)
      if (q.outcomeTypes && q.outcomeTypes.length === 1) {
        const outcomeType = iat.outcomeTypes.find(ot => ot.id === q.outcomeTypes[0]);
        if (outcomeType) {
          // Render as simple outcome page
          view.h1 = q.heading;
          view.bodyHtml = outcomeType.text;
          
          // Set up primary action if outcomeType has heading (like notification forms)
          if (outcomeType.heading) {
            let actionHref = "#"; // Default fallback
            
            // For exemption notifications, link to the sign-in page with article parameter
            if (outcomeType.heading === "Fill out an exemption notification") {
              // Extract article from outcomeType params
              const articleParam = outcomeType.params?.find(p => p.name === "ARTICLE");
              const article = articleParam?.value;
              
              if (article) {
                actionHref = `/versions/mvp-multi-sites/exemption/sign-in?article=${article}`;
              } else {
                actionHref = "/versions/mvp-multi-sites/exemption/sign-in";
              }
            }
            
            view.primaryAction = {
              text: outcomeType.heading,
              href: actionHref
            };
          }
          
          // Add secondary action for downloading answers
          view.secondaryAction = {
            text: "Download a PDF record of my answers",
            href: "#" // This would be set to the actual download URL
          };
          
          return res.render("versions/mvp-multi-sites/layouts/iat/outcome", view);
        }
      }

      if (isCard(q)) {
        // Pass answers from either q.answers or generated from outcomeTypes
        view.rawAnswers = q.answers || createAnswersFromOutcomeTypes(q);
        res.render("versions/mvp-multi-sites/layouts/iat/card-selection", view);
      } else {
        view.inputName = q.route.replace(/^\//, ""); // e.g. 'sea'
        view.radios = q.answers.map((a) => ({
          value: a.id,
          text: a.text,
          hint: a.hint && { html: a.hint },
        }));
        res.render("versions/mvp-multi-sites/layouts/iat/radio-page", view);
      }
    });

    // ----- POST -----------------------------------------------------
    router.post(fullPath, (req, res) => {
      // Reset error flags
      req.session.data['errorthispage'] = "false";
      req.session.data['errortypeone'] = "false";

      // Radio pages submit under inputName; card pages under 'selection'
      const answer = req.body.selection || req.body[q.route.replace(/^\//, "")];

      // Validation for radio pages (not card pages)
      if (!isCard(q) && (!answer || answer.trim() === "")) {
        req.session.data['errorthispage'] = "true";
        req.session.data['errortypeone'] = "true";
        return res.redirect(fullPath);
      }

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
        res.render("versions/mvp-multi-sites/layouts/iat/outcome", {
          h1: o.heading || "",
          bodyHtml: o.text,
          caption: getCaptionText(o.section),
          primaryAction: o.link
            ? { text: o.heading || "Continue", href: o.link }
            : null,
        });
      });
    });
};
