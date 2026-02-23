// app/iat-lcml/routes.js
// Generates the full Marine-licence IAT journey (iat-lcml version).
// Supports multi-activity projects — users select multiple activities via
// checkboxes, answer shared questions once, loop through activity-specific
// questions, then get a single consolidated routing outcome.

module.exports = function (router) {
  const path = require("path");
  const iat = require(path.join(__dirname, "./content.json"));

  const base = "/versions/multiple-sites-v2/iat-lcml"; // prefix reused everywhere

  // =====================================================================
  // Helpers
  // =====================================================================

  const getCaptionText = (sectionId) => {
    if (!sectionId) return null;
    const section = iat.sections.find((s) => s.id === sectionId);
    return section ? section.text : null;
  };

  const isCard = (q) =>
    (q.answers &&
      q.answers.some((a) => /^option\s*\d+/i.test(a.text.trim()))) ||
    (q.outcomeTypes && q.outcomeTypes.length > 1);

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

  // =====================================================================
  // Activity metadata
  // =====================================================================

  const ACTIVITY_LABELS = {
    CON: "Construction",
    DEPOSIT: "Deposit of a substance or object",
    REMOVAL: "Removal of a substance or object",
    DREDGE: "Dredging",
    INCINERATION: "Incineration of a substance or object",
    EXPLOSIVES: "Use of an explosive substance",
    SCUTTLING: "Sinking of a vessel or floating container",
  };

  // Activities that always require a standard licence (auto-MCMS)
  const AUTO_MCMS_ACTIVITIES = ["INCINERATION", "EXPLOSIVES", "SCUTTLING"];

  // First question route for each activity branch
  const ACTIVITY_FIRST_QUESTION = {
    CON: "/exemption/construction",
    DEPOSIT: "/deposit/method",
    REMOVAL: "/removal/method",
    DREDGE: "/exemption/dredging",
    INCINERATION: null,
    EXPLOSIVES: null,
    SCUTTLING: null,
  };

  // =====================================================================
  // Outcome classification helpers
  // =====================================================================

  // Determines the per-activity outcome from an outcomeRoute
  function classifyOutcomeRoute(outcomeRoute) {
    if (!outcomeRoute) return "MCMS";
    if (outcomeRoute.includes("licence-not-required")) return "EXEMPT";
    if (outcomeRoute.includes("fast-track-mla")) return "MAS";
    // Everything else (licence-required, standard-marine-licence, etc.) = MCMS
    return "MCMS";
  }

  // Check if a nextQuestionRoute leads to the screening chain entry
  function isScreeningChainEntry(route) {
    return route === "/activity/completion";
  }

  // Outcome label for display
  function getOutcomeLabel(outcome) {
    switch (outcome) {
      case "MCMS":
        return "Standard licence";
      case "MAS":
        return "Self-service";
      case "EXEMPT":
        return "Exempt";
      default:
        return outcome;
    }
  }

  // =====================================================================
  // Project outcome resolver
  // =====================================================================

  function resolveProjectOutcome(sessionData) {
    const triggers = [];
    const selectedActivities = sessionData.selected_activities || [];
    const activityAnswers = sessionData.activity_answers || {};

    // Global triggers
    if (selectedActivities.includes("SCUTTLING")) {
      triggers.push("Project involves scuttling of a vessel or structure");
    }
    if (selectedActivities.includes("EXPLOSIVES")) {
      triggers.push("Project involves the use of explosives");
    }
    if (selectedActivities.includes("INCINERATION")) {
      triggers.push("Project involves incineration of a substance or object");
    }
    if (sessionData.project_cost_over_1m === "yes") {
      triggers.push("Total estimated project cost exceeds £1 million");
    }
    if (
      sessionData.jurisdiction === "outsideUk" ||
      sessionData.jurisdiction === "elsewhere"
    ) {
      triggers.push("Activity takes place outside the UK marine area");
    }
    if (
      sessionData["mpa-2km"] === "yes" &&
      sessionData["mpa-2km-assessment"] !== "screened-out"
    ) {
      triggers.push(
        "Activity within 2km of a Marine Protected Area without adequate assessment",
      );
    }

    // Determine the worst outcome across all activities
    // Priority: MCMS > MAS > EXEMPT
    const PRIORITY = { MCMS: 3, MAS: 2, EXEMPT: 1 };
    let worst = "EXEMPT";

    for (const actId of selectedActivities) {
      const answers = activityAnswers[actId];
      if (answers && answers.outcome) {
        if ((PRIORITY[answers.outcome] || 0) > (PRIORITY[worst] || 0)) {
          worst = answers.outcome;
        }
      }
    }

    // Global triggers force MCMS
    if (triggers.length > 0) {
      worst = "MCMS";
    }

    return { outcome: worst, triggers };
  }

  // =====================================================================
  // Combine questions and outcomes that have routes
  // =====================================================================

  const allRouteItems = [
    ...iat.questions,
    ...iat.outcomes.filter((o) => o.route),
  ];

  // Routes that should NOT have auto-generated GET/POST (we handle them manually)
  const manualRoutes = [
    "/activity-type",
    "/project-cost",
    "/mpa-2km",
    "/mpa-2km-assessment",
  ];

  // Routes where we override only the POST handler (GET is auto-generated)
  const manualPostOnlyRoutes = [
    "/natural-england",
    "/vehicular-access",
  ];

  // =====================================================================
  // Start page
  // =====================================================================

  router.get(`${base}`, (req, res) => {
    res.render("iat-lcml/start");
  });

  // =====================================================================
  // Phase 1: /activity-type — checkboxes
  // =====================================================================

  const activityTypeQ = iat.questions.find(
    (q) => q.route === "/activity-type",
  );

  router.get(`${base}/activity-type`, (req, res) => {
    res.render("iat-lcml/layouts/iat/checkbox-page", {
      h1: activityTypeQ.text,
      hintHtml: activityTypeQ.hint,
      caption: getCaptionText(activityTypeQ.section),
      inputName: "selected_activities",
      checkboxes: activityTypeQ.answers.map((a) => ({
        value: a.id,
        text: a.text,
        hint: a.hint && { html: a.hint },
      })),
    });
  });

  router.post(`${base}/activity-type`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    let selected = req.body.selected_activities;
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/activity-type`);
    }

    // Normalise to array (single checkbox selection comes as string)
    if (!Array.isArray(selected)) selected = [selected];

    req.session.data.selected_activities = selected;
    req.session.data.activity_answers = {};

    // Initialise per-activity answer buckets
    selected.forEach((id) => {
      req.session.data.activity_answers[id] = {};
    });

    res.redirect(`${base}/project-cost`);
  });

  // =====================================================================
  // Phase 1: /project-cost
  // =====================================================================

  const projectCostQ = iat.questions.find(
    (q) => q.route === "/project-cost",
  );

  router.get(`${base}/project-cost`, (req, res) => {
    res.render("iat-lcml/layouts/iat/radio-page", {
      h1: projectCostQ.text,
      hintHtml: projectCostQ.hint,
      caption: getCaptionText(projectCostQ.section),
      inputName: "project_cost_over_1m",
      radios: projectCostQ.answers.map((a) => ({
        value: a.id,
        text: a.text,
      })),
    });
  });

  router.post(`${base}/project-cost`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body.project_cost_over_1m;
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/project-cost`);
    }

    req.session.data.project_cost_over_1m = answer;
    res.redirect(`${base}/mpa-2km`);
  });

  // =====================================================================
  // Phase 1: /mpa-2km
  // =====================================================================

  const mpa2kmQ = iat.questions.find((q) => q.route === "/mpa-2km");

  router.get(`${base}/mpa-2km`, (req, res) => {
    res.render("iat-lcml/layouts/iat/radio-page", {
      h1: mpa2kmQ.text,
      hintHtml: mpa2kmQ.hint,
      caption: getCaptionText(mpa2kmQ.section),
      inputName: "mpa-2km",
      radios: mpa2kmQ.answers.map((a) => ({
        value: a.id,
        text: a.text,
      })),
    });
  });

  router.post(`${base}/mpa-2km`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body["mpa-2km"];
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/mpa-2km`);
    }

    req.session.data["mpa-2km"] = answer;

    if (answer === "yes") {
      return res.redirect(`${base}/mpa-2km-assessment`);
    }

    // Skip assessment, go straight to activity loop
    res.redirect(`${base}/activity-loop/start`);
  });

  // =====================================================================
  // Phase 1: /mpa-2km-assessment
  // =====================================================================

  const mpa2kmAssessmentQ = iat.questions.find(
    (q) => q.route === "/mpa-2km-assessment",
  );

  router.get(`${base}/mpa-2km-assessment`, (req, res) => {
    res.render("iat-lcml/layouts/iat/radio-page", {
      h1: mpa2kmAssessmentQ.text,
      hintHtml: mpa2kmAssessmentQ.hint,
      caption: getCaptionText(mpa2kmAssessmentQ.section),
      inputName: "mpa-2km-assessment",
      radios: mpa2kmAssessmentQ.answers.map((a) => ({
        value: a.id,
        text: a.text,
      })),
    });
  });

  router.post(`${base}/mpa-2km-assessment`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body["mpa-2km-assessment"];
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/mpa-2km-assessment`);
    }

    req.session.data["mpa-2km-assessment"] = answer;
    res.redirect(`${base}/activity-loop/start`);
  });

  // =====================================================================
  // Phase 2: Activity loop
  // =====================================================================

  router.get(`${base}/activity-loop/start`, (req, res) => {
    req.session.data.current_activity_index = 0;
    req.session.data.in_activity_loop = true;
    res.redirect(`${base}/activity-loop/interstitial`);
  });

  // --- Interstitial: "Activity N of M" ---

  router.get(`${base}/activity-loop/interstitial`, (req, res) => {
    const selected = req.session.data.selected_activities || [];
    const idx = req.session.data.current_activity_index || 0;
    const actId = selected[idx];

    if (!actId) {
      return res.redirect(`${base}/activity-loop/done`);
    }

    const isAutoMcms = AUTO_MCMS_ACTIVITIES.includes(actId);

    res.render("iat-lcml/layouts/iat/interstitial", {
      activityName: ACTIVITY_LABELS[actId] || actId,
      currentIndex: idx + 1,
      totalActivities: selected.length,
      autoMcms: isAutoMcms,
    });
  });

  router.post(`${base}/activity-loop/interstitial`, (req, res) => {
    const selected = req.session.data.selected_activities || [];
    const idx = req.session.data.current_activity_index || 0;
    const actId = selected[idx];

    if (!actId) {
      return res.redirect(`${base}/activity-loop/done`);
    }

    // Auto-MCMS activities skip straight to next
    if (AUTO_MCMS_ACTIVITIES.includes(actId)) {
      if (!req.session.data.activity_answers) {
        req.session.data.activity_answers = {};
      }
      req.session.data.activity_answers[actId] = { outcome: "MCMS" };
      return res.redirect(`${base}/activity-loop/next`);
    }

    // Otherwise redirect to the first question for this activity
    const firstQ = ACTIVITY_FIRST_QUESTION[actId];
    if (firstQ) {
      res.redirect(`${base}${firstQ}`);
    } else {
      // Fallback — treat as MCMS
      req.session.data.activity_answers[actId] = { outcome: "MCMS" };
      res.redirect(`${base}/activity-loop/next`);
    }
  });

  // --- /activity-loop/next — advance to next activity or end loop ---

  router.get(`${base}/activity-loop/next`, (req, res) => {
    const selected = req.session.data.selected_activities || [];
    let idx = (req.session.data.current_activity_index || 0) + 1;
    req.session.data.current_activity_index = idx;

    if (idx < selected.length) {
      res.redirect(`${base}/activity-loop/interstitial`);
    } else {
      req.session.data.in_activity_loop = false;
      res.redirect(`${base}/activity/completion`);
    }
  });

  // =====================================================================
  // Phase 3: /project-outcome — consolidated result
  // =====================================================================

  router.get(`${base}/project-outcome`, (req, res) => {
    const data = req.session.data;
    const { outcome, triggers } = resolveProjectOutcome(data);
    const selected = data.selected_activities || [];

    data.project_outcome = outcome;
    data.mcms_triggers = triggers;

    const activities = selected.map((actId) => {
      const answers = (data.activity_answers || {})[actId] || {};
      return {
        id: actId,
        name: ACTIVITY_LABELS[actId] || actId,
        outcome: answers.outcome || "MAS",
        outcomeLabel: getOutcomeLabel(answers.outcome || "MAS"),
      };
    });

    res.render("iat-lcml/layouts/iat/project-outcome", {
      outcome,
      triggers,
      activities,
    });
  });

  // =====================================================================
  // Auto-generated GET/POST for all content.json questions and outcomes
  // (with loop-aware POST intercept)
  // =====================================================================

  allRouteItems.forEach((q) => {
    // Skip manually handled routes
    if (manualRoutes.includes(q.route)) return;

    const fullPath = `${base}${q.route}`;

    // ----- GET --------------------------------------------------------
    router.get(fullPath, (req, res) => {
      const view = {
        h1: q.text || q.heading,
        hintHtml: q.hint,
        caption: getCaptionText(q.section),
      };

      if (q.heading && q.text) {
        view.h1 = q.heading;
        view.hintHtml = q.text;
      }

      // Single outcome type — render as outcome page
      if (q.outcomeTypes && q.outcomeTypes.length === 1) {
        const outcomeType = iat.outcomeTypes.find(
          (ot) => ot.id === q.outcomeTypes[0],
        );
        if (outcomeType) {
          view.h1 = q.heading;
          view.bodyHtml = outcomeType.text;

          if (outcomeType.heading) {
            let actionHref = "#";
            if (
              outcomeType.heading === "Fill out an exemption notification"
            ) {
              const articleParam = outcomeType.params?.find(
                (p) => p.name === "ARTICLE",
              );
              const article = articleParam?.value;
              actionHref = article
                ? `/versions/multiple-sites-v2/exemption/sign-in?article=${article}`
                : "/versions/multiple-sites-v2/exemption/sign-in";
            }
            view.primaryAction = { text: outcomeType.heading, href: actionHref };
          }

          view.secondaryAction = {
            text: "Download a PDF record of my answers",
            href: "#",
          };

          return res.render("iat-lcml/layouts/iat/outcome", view);
        }
      }

      if (isCard(q)) {
        view.rawAnswers = q.answers || createAnswersFromOutcomeTypes(q);
        res.render("iat-lcml/layouts/iat/card-selection", view);
      } else {
        view.inputName = q.route.replace(/^\//, "");
        view.radios = q.answers.map((a) => ({
          value: a.id,
          text: a.text,
          hint: a.hint && { html: a.hint },
        }));
        res.render("iat-lcml/layouts/iat/radio-page", view);
      }
    });

    // ----- POST -------------------------------------------------------
    // Skip auto-generated POST for routes with manual POST overrides
    if (manualPostOnlyRoutes.includes(q.route)) return;

    router.post(fullPath, (req, res) => {
      req.session.data["errorthispage"] = "false";
      req.session.data["errortypeone"] = "false";

      const answer =
        req.body.selection || req.body[q.route.replace(/^\//, "")];

      // Validation for radio pages
      if (!isCard(q) && (!answer || answer.trim() === "")) {
        req.session.data["errorthispage"] = "true";
        req.session.data["errortypeone"] = "true";
        return res.redirect(fullPath);
      }

      // ---------------------------------------------------------------
      // Activity-loop POST intercept
      // ---------------------------------------------------------------
      const inLoop = req.session.data.in_activity_loop === true;

      // For cards with outcomeTypes (the "exe-not-available-continue" pages)
      if (q.outcomeTypes) {
        const selectedOutcomeType = iat.outcomeTypes.find(
          (ot) => ot.id === answer,
        );
        if (selectedOutcomeType) {
          if (selectedOutcomeType.nextQuestionRoute) {
            // User chose self-service path on the card — continue into screening questions
            if (inLoop) {
              // In loop mode, this means "continue activity-specific questions"
              return res.redirect(
                `${base}${selectedOutcomeType.nextQuestionRoute}`,
              );
            }
            return res.redirect(
              `${base}${selectedOutcomeType.nextQuestionRoute}`,
            );
          }
          // User chose standard MLA on the card — this is an MCMS outcome
          if (inLoop) {
            const selected = req.session.data.selected_activities || [];
            const idx = req.session.data.current_activity_index || 0;
            const actId = selected[idx];
            if (actId) {
              if (!req.session.data.activity_answers)
                req.session.data.activity_answers = {};
              req.session.data.activity_answers[actId] = { outcome: "MCMS" };
            }
            return res.redirect(`${base}/activity-loop/next`);
          }
          // Not in loop — find and redirect to the outcome page
          const outcome = iat.outcomes.find(
            (o) => o.outcomeTypes && o.outcomeTypes.includes(answer),
          );
          if (outcome) {
            return res.redirect(`${base}${outcome.route}`);
          }
        }
      }

      // Regular question logic
      const chosen = q.answers
        ? q.answers.find((a) => a.id === answer) || q.answers[0]
        : null;

      if (!chosen) {
        return res.redirect(`${base}/sea`);
      }

      // --- Loop intercept for regular questions ---
      if (inLoop) {
        const selected = req.session.data.selected_activities || [];
        const idx = req.session.data.current_activity_index || 0;
        const actId = selected[idx];

        // Store the answer under the activity
        if (actId) {
          if (!req.session.data.activity_answers)
            req.session.data.activity_answers = {};
          if (!req.session.data.activity_answers[actId])
            req.session.data.activity_answers[actId] = {};

          const answerKey = q.route.replace(/^\//, "");
          req.session.data.activity_answers[actId][answerKey] = answer;
        }

        // Check if the chosen answer exits the activity branch
        if (chosen.nextQuestionRoute && isScreeningChainEntry(chosen.nextQuestionRoute)) {
          // Activity reached the screening chain entry → self-service eligible
          if (actId) {
            req.session.data.activity_answers[actId].outcome = "MAS";
          }
          return res.redirect(`${base}/activity-loop/next`);
        }

        if (chosen.outcomeRoute) {
          // Activity hit a terminal outcome
          const classification = classifyOutcomeRoute(chosen.outcomeRoute);
          if (actId) {
            req.session.data.activity_answers[actId].outcome = classification;
          }
          return res.redirect(`${base}/activity-loop/next`);
        }

        // Normal: continue to the next question in this activity branch
        if (chosen.nextQuestionRoute) {
          return res.redirect(`${base}${chosen.nextQuestionRoute}`);
        }
      }

      // --- Default (not in loop) ---
      const next = chosen.nextQuestionRoute || chosen.outcomeRoute;
      if (next) {
        res.redirect(`${base}${next}`);
      } else {
        res.redirect(`${base}/sea`);
      }
    });
  });

  // =====================================================================
  // Outcome pages (final outcomes without outcomeTypes)
  // =====================================================================

  iat.outcomes
    .filter((o) => o.route && !o.outcomeTypes)
    .forEach((o) => {
      const fullPath = `${base}${o.route}`;

      router.get(fullPath, (req, res) => {
        res.render("iat-lcml/layouts/iat/outcome", {
          h1: o.heading || "",
          bodyHtml: o.text,
          caption: getCaptionText(o.section),
          primaryAction: o.link
            ? { text: o.heading || "Continue", href: o.link }
            : null,
        });
      });
    });

  // =====================================================================
  // Screening chain exit → /project-outcome
  // =====================================================================
  // The screening chain ends at routes like /fast-track-mla/activity,
  // /natural-england/not-agreed, /vehicular-access (NO→/fast-track-mla/activity).
  // We intercept the final outcome pages in Phase 3 to redirect to
  // /project-outcome instead.
  //
  // We override the last screening-chain question's logic:
  // When the user finishes the screening chain (Phase 3), the existing
  // outcome routes still work for display. The user can navigate there
  // and see the old single-activity outcome, OR we add a middleware
  // that after Phase 3 screening redirects to /project-outcome.
  //
  // For the prototype, we add a simple redirect: after the screening
  // chain's last question resolves, the POST handler for the last
  // screening question redirects to /project-outcome.
  // This is handled by overriding specific POST handlers below.

  // Override: /natural-england POST — last question in screening chain
  // Instead of going to an outcome page, redirect to /project-outcome
  router.post(`${base}/natural-england`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body["natural-england"];
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/natural-england`);
    }

    req.session.data["natural-england"] = answer;
    res.redirect(`${base}/project-outcome`);
  });

  // Override: /vehicular-access POST
  router.post(`${base}/vehicular-access`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body["vehicular-access"];
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/vehicular-access`);
    }

    req.session.data["vehicular-access"] = answer;

    if (answer === "YES") {
      // Needs Natural England method — continue to that question
      return res.redirect(`${base}/natural-england`);
    }

    // No vehicular access issue — go to project outcome
    res.redirect(`${base}/project-outcome`);
  });
};
