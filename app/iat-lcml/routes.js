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

  // Repeatable activity types (can have multiple instances)
  const REPEATABLE_ACTIVITIES = ["CON", "DEPOSIT", "REMOVAL", "DREDGE"];

  // Strip instance suffix: "CON_2" → "CON", "DREDGE" → "DREDGE"
  const getActivityType = (instanceId) => instanceId.replace(/_\d+$/, "");

  const ACTIVITY_LABELS = {
    CON: "Construction",
    DEPOSIT: "Deposit of a substance or object",
    REMOVAL: "Removal of a substance or object",
    DREDGE: "Dredging",
    INCINERATION: "Incineration of a substance or object",
    EXPLOSIVES: "Use of an explosive substance",
    SCUTTLING: "Sinking of a vessel or floating container",
  };

  // Per-activity content for the "add another" screens
  const ADD_ANOTHER_CONTENT = {
    CON: {
      heading: "Do you have more construction work to add?",
      hint: "For example, if you're doing construction in multiple locations.",
    },
    DEPOSIT: {
      heading: "Do you have another deposit activity to add?",
      hint: "For example, if you're depositing in different locations.",
    },
    REMOVAL: {
      heading: "Do you have another removal activity to add?",
      hint: "For example, if you're removing substances or objects from different locations.",
    },
    DREDGE: {
      heading: "Do you have another dredging activity to add?",
      hint: "For example, if you're dredging in different locations.",
    },
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

  // Override for sub-detail second-level lookup per activity type.
  // - string → use that explicit route instead of nextQuestionRoute
  // - false  → no second level, show first answer only
  // - undefined → default behaviour (follow nextQuestionRoute)
  const ACTIVITY_DETAIL_ROUTE = {
    REMOVAL: "/exemption/removal/activity-type",
    DREDGE: false,
  };

  // =====================================================================
  // Outcome classification helpers
  // =====================================================================

  // =====================================================================
  // Per-activity outcome classification
  // =====================================================================
  //
  // Per-activity outcomes from the question branches:
  //   EXEMPT        — licence not required (exemption available)
  //   SELF_SERVICE  — eligible for self-service licensing (goes to MCMS self-service)
  //   STANDARD      — needs a standard marine licence
  //
  // Project-level outcomes (resolved at /project-outcome):
  //   BAND_3        — high complexity standard licence → MCMS
  //   BAND_2        — low complexity standard licence  → MAS (new LCML service)
  //   SELF_SERVICE  — self-service licence              → MCMS self-service
  //   EXEMPT        — no licence required

  // Look up display text for a stored answer by question route and answer id
  function getAnswerText(route, answerId) {
    const q = iat.questions.find((q) => q.route === route);
    if (!q || !q.answers) return null;
    const answer = q.answers.find((a) => a.id === answerId);
    return answer ? answer.text : null;
  }

  // Get the answer object (with nextQuestionRoute etc.) by route and answer id
  function getAnswerObject(route, answerId) {
    const q = iat.questions.find((q) => q.route === route);
    if (!q || !q.answers) return null;
    return q.answers.find((a) => a.id === answerId) || null;
  }

  function classifyOutcomeRoute(outcomeRoute) {
    if (!outcomeRoute) return "STANDARD";
    if (outcomeRoute.includes("licence-not-required")) return "EXEMPT";
    if (outcomeRoute.includes("fast-track-mla")) return "SELF_SERVICE";
    // Everything else (licence-required, standard-marine-licence, etc.)
    return "STANDARD";
  }

  function isScreeningChainEntry(route) {
    return route === "/activity/completion";
  }

  // Activity-level label (shown in the per-activity summary)
  function getActivityOutcomeLabel(outcome) {
    switch (outcome) {
      case "STANDARD":
        return "Marine licence";
      case "SELF_SERVICE":
        return "Self-service";
      case "EXEMPT":
        return "Exempt activity notification";
      default:
        return outcome;
    }
  }

  // =====================================================================
  // Project outcome resolver
  // =====================================================================
  //
  // Band 3 triggers (high complexity → MCMS):
  //   - Activity type: dredging, scuttling, explosives, incineration
  //   - Deposits outside UK marine area (jurisdiction)
  //   - Project cost > £1M
  //   - Within 2km MPA without adequate HRA/MCZ assessment
  //
  // If no Band 3 triggers and any activity needs a standard licence → Band 2 → MAS
  // If all activities are self-service eligible → self-service → MCMS
  // If all activities are exempt → exempt

  function resolveProjectOutcome(sessionData) {
    const band3Triggers = [];
    const selectedActivities = sessionData.selected_activities || [];
    const activityAnswers = sessionData.activity_answers || {};

    // --- Activity-type triggers (Band 3 if selected AND not exempt) ---
    const BAND_3_ACTIVITY_TYPES = ["DREDGE", "SCUTTLING", "EXPLOSIVES", "INCINERATION"];
    for (const actId of selectedActivities) {
      const baseType = getActivityType(actId);
      if (BAND_3_ACTIVITY_TYPES.includes(baseType)) {
        const actOutcome = (activityAnswers[actId] || {}).outcome;
        if (actOutcome !== "EXEMPT") {
          const label = ACTIVITY_LABELS[baseType] || actId;
          band3Triggers.push(`Project involves ${label.toLowerCase()}`);
        }
      }
    }

    // --- Project cost trigger ---
    if (sessionData.project_cost_over_1m === "yes") {
      band3Triggers.push("Total estimated project cost exceeds £1 million");
    }

    // --- EIA trigger ---
    if (sessionData.eia_trigger === "yes") {
      band3Triggers.push("EIA trigger: Project may require an Environmental Impact Assessment");
    }

    // --- Jurisdiction trigger (deposits outside UK) ---
    if (
      sessionData.jurisdiction === "outsideUk" ||
      sessionData.jurisdiction === "elsewhere"
    ) {
      band3Triggers.push("Activity takes place outside the UK marine area");
    }

    // --- MPA / HRA trigger ---
    if (
      sessionData["mpa-2km"] === "yes" &&
      sessionData["mpa-2km-assessment"] !== "screened-out"
    ) {
      band3Triggers.push(
        "Activity within 2km of a Marine Protected Area without adequate assessment",
      );
    }

    // --- Determine worst per-activity outcome ---
    // STANDARD > SELF_SERVICE > EXEMPT
    const PRIORITY = { STANDARD: 3, SELF_SERVICE: 2, EXEMPT: 1 };
    let worst = "EXEMPT";

    for (const actId of selectedActivities) {
      const answers = activityAnswers[actId];
      if (answers && answers.outcome) {
        if ((PRIORITY[answers.outcome] || 0) > (PRIORITY[worst] || 0)) {
          worst = answers.outcome;
        }
      }
    }

    // --- Resolve project-level outcome ---
    let outcome;

    if (worst === "STANDARD") {
      // At least one activity needs a standard licence —
      // Band 3 triggers determine MCMS vs MAS routing
      if (band3Triggers.length > 0) {
        outcome = "BAND_3";
      } else {
        outcome = "BAND_2";
      }
    } else if (worst === "SELF_SERVICE") {
      outcome = "SELF_SERVICE";
    } else {
      outcome = "EXEMPT";
    }

    return { outcome, band3Triggers };
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
    "/eia-check",
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
    const baseHint = activityTypeQ.hint || "";
    const repeatHint = "You can add any activity more than once later. For example, if you need to add 2 different types of construction activity.";
    const selectAllHint = "Select all that apply";
    const combinedHint = baseHint
      ? `${baseHint}<p class="govuk-body govuk-!-margin-top-2">${repeatHint}</p><p class="govuk-body">${selectAllHint}</p>`
      : `<p class="govuk-body">${repeatHint}</p><p class="govuk-body">${selectAllHint}</p>`;

    res.render("iat-lcml/layouts/iat/checkbox-page", {
      h1: activityTypeQ.text,
      hintHtml: combinedHint,
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

    // Normalise to array and filter out Prototype Kit's "_unchecked" value
    if (!Array.isArray(selected)) selected = [selected];
    selected = selected.filter((v) => v !== "_unchecked");

    if (selected.length === 0) {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/activity-type`);
    }

    req.session.data.selected_activities = selected;
    req.session.data.activity_answers = {};

    // Initialise per-activity answer buckets
    selected.forEach((id) => {
      req.session.data.activity_answers[id] = {};
    });

    res.redirect(`${base}/activity-loop/start`);
  });

  // =====================================================================
  // Filtering questions (asked AFTER activity loop, only if needed)
  // /project-cost → /eia-check → /mpa-2km → /mpa-2km-assessment → /project-outcome
  // Each gate is a hard stop — "yes" redirects immediately to /project-outcome
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

    // Hard stop: cost >£1M triggers BAND_3 immediately
    if (answer === "yes") {
      return res.redirect(`${base}/project-outcome`);
    }

    res.redirect(`${base}/eia-check`);
  });

  // --- /eia-check ---

  router.get(`${base}/eia-check`, (req, res) => {
    res.render("iat-lcml/layouts/iat/radio-page", {
      h1: "Does your project involve major infrastructure or works that could significantly affect the environment?",
      hintHtml: "This includes:<ul class=\"govuk-list govuk-list--bullet\"><li>construction or decommissioning of offshore energy infrastructure</li><li>pipelines over 800mm diameter</li><li>any works likely to have a significant environmental effect</li></ul>",
      caption: "Project assessment",
      inputName: "eia_trigger",
      radios: [
        { value: "yes", text: "Yes" },
        { value: "no", text: "No" },
      ],
    });
  });

  router.post(`${base}/eia-check`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body.eia_trigger;
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/eia-check`);
    }

    req.session.data.eia_trigger = answer;

    // Hard stop: EIA trigger sends straight to outcome
    if (answer === "yes") {
      return res.redirect(`${base}/project-outcome`);
    }

    res.redirect(`${base}/mpa-2km`);
  });

  // --- /mpa-2km ---

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

    // Skip assessment, go to project outcome
    res.redirect(`${base}/project-outcome`);
  });

  // --- /mpa-2km-assessment ---

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
    res.redirect(`${base}/project-outcome`);
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

    const baseType = getActivityType(actId);
    const isAutoMcms = AUTO_MCMS_ACTIVITIES.includes(baseType);

    res.render("iat-lcml/layouts/iat/interstitial", {
      activityName: ACTIVITY_LABELS[baseType] || actId,
      currentIndex: idx + 1,
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

    const baseType = getActivityType(actId);

    // Auto-MCMS activities skip straight to next
    if (AUTO_MCMS_ACTIVITIES.includes(baseType)) {
      if (!req.session.data.activity_answers) {
        req.session.data.activity_answers = {};
      }
      req.session.data.activity_answers[actId] = { outcome: "STANDARD" };
      return res.redirect(`${base}/activity-loop/next`);
    }

    // Otherwise redirect to the first question for this activity
    const firstQ = ACTIVITY_FIRST_QUESTION[baseType];
    if (firstQ) {
      res.redirect(`${base}${firstQ}`);
    } else {
      // Fallback — treat as MCMS
      req.session.data.activity_answers[actId] = { outcome: "STANDARD" };
      res.redirect(`${base}/activity-loop/next`);
    }
  });

  // --- /activity-loop/add-another — ask if user wants another instance ---

  router.get(`${base}/activity-loop/add-another`, (req, res) => {
    const selected = req.session.data.selected_activities || [];
    const idx = req.session.data.current_activity_index || 0;
    const actId = selected[idx];
    const baseType = getActivityType(actId || "");
    const content = ADD_ANOTHER_CONTENT[baseType] || {};

    res.render("iat-lcml/layouts/iat/add-another", {
      activityName: ACTIVITY_LABELS[baseType] || actId,
      addAnotherHeading: content.heading,
      addAnotherHint: content.hint,
    });
  });

  router.post(`${base}/activity-loop/add-another`, (req, res) => {
    req.session.data["errorthispage"] = "false";
    req.session.data["errortypeone"] = "false";

    const answer = req.body.add_another;
    if (!answer || answer.trim() === "") {
      req.session.data["errorthispage"] = "true";
      req.session.data["errortypeone"] = "true";
      return res.redirect(`${base}/activity-loop/add-another`);
    }

    if (answer === "yes") {
      const selected = req.session.data.selected_activities || [];
      const idx = req.session.data.current_activity_index || 0;
      const actId = selected[idx];
      const baseType = getActivityType(actId || "");

      // Work out the next instance number for this base type
      const existingCount = selected.filter(
        (id) => getActivityType(id) === baseType,
      ).length;
      const newInstanceId = `${baseType}_${existingCount + 1}`;

      // Insert the new instance right after the current one so remaining
      // activities stay in sequence (push would skip them)
      selected.splice(idx + 1, 0, newInstanceId);
      req.session.data.selected_activities = selected;
      if (!req.session.data.activity_answers) {
        req.session.data.activity_answers = {};
      }
      req.session.data.activity_answers[newInstanceId] = {};

      // Advance index to the new instance and show its interstitial
      req.session.data.current_activity_index = idx + 1;
      return res.redirect(`${base}/activity-loop/interstitial`);
    }

    // "No" — continue to next activity
    res.redirect(`${base}/activity-loop/next`);
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
      res.redirect(`${base}/activity-loop/done`);
    }
  });

  // --- /activity-loop/done — smart routing based on activity outcomes ---

  router.get(`${base}/activity-loop/done`, (req, res) => {
    const data = req.session.data;
    const selected = data.selected_activities || [];
    const activityAnswers = data.activity_answers || {};

    const outcomes = selected.map(
      (id) => (activityAnswers[id] || {}).outcome,
    );
    const allExempt = outcomes.every((o) => o === "EXEMPT");
    const anyStandard = outcomes.some((o) => o === "STANDARD");

    // Check for auto-Band3 activity types with non-exempt outcomes
    const BAND_3_TYPES = ["DREDGE", "SCUTTLING", "EXPLOSIVES", "INCINERATION"];
    const hasNonExemptBand3 = selected.some(
      (id) =>
        BAND_3_TYPES.includes(getActivityType(id)) &&
        (activityAnswers[id] || {}).outcome !== "EXEMPT",
    );

    if (allExempt) {
      // All activities are exempt — skip everything
      return res.redirect(`${base}/project-outcome`);
    }

    if (hasNonExemptBand3) {
      // Auto-Band3 activities present — outcome is already BAND_3, skip filtering
      return res.redirect(`${base}/project-outcome`);
    }

    if (anyStandard) {
      // Standard licence needed — ask filtering questions (cost, MPA)
      return res.redirect(`${base}/project-cost`);
    }

    // All self-service eligible — enter screening chain
    data.in_screening_phase = true;
    return res.redirect(`${base}/activity/completion`);
  });

  // =====================================================================
  // Phase 3: /project-outcome — consolidated result
  // =====================================================================

  router.get(`${base}/project-outcome`, (req, res) => {
    const data = req.session.data;
    data.in_screening_phase = false;
    const { outcome, band3Triggers } = resolveProjectOutcome(data);
    const selected = data.selected_activities || [];

    data.project_outcome = outcome;

    const activities = selected.map((actId) => {
      const baseType = getActivityType(actId);
      const answers = (data.activity_answers || {})[actId] || {};
      const label = ACTIVITY_LABELS[baseType] || actId;

      // Build sub-activity detail from stored question answers
      let subDetail = "";
      const firstRoute = ACTIVITY_FIRST_QUESTION[baseType];
      if (firstRoute) {
        const firstKey = firstRoute.replace(/^\//, "");
        const firstAnswerId = answers[firstKey];
        if (firstAnswerId) {
          const firstText = getAnswerText(firstRoute, firstAnswerId);
          if (firstText) {
            subDetail = firstText;
            const detailOverride = ACTIVITY_DETAIL_ROUTE[baseType];
            // Determine the second-level route
            let secondRoute = null;
            if (detailOverride === false) {
              // No second level for this activity type
              secondRoute = null;
            } else if (typeof detailOverride === "string") {
              // Explicit second-level route
              secondRoute = detailOverride;
            } else {
              // Default: follow nextQuestionRoute from the first answer
              const firstAnswer = getAnswerObject(firstRoute, firstAnswerId);
              if (firstAnswer && firstAnswer.nextQuestionRoute) {
                secondRoute = firstAnswer.nextQuestionRoute;
              }
            }
            if (secondRoute) {
              const secondKey = secondRoute.replace(/^\//, "");
              const secondAnswerId = answers[secondKey];
              if (secondAnswerId) {
                const secondText = getAnswerText(secondRoute, secondAnswerId);
                if (secondText) {
                  subDetail = `${firstText} — ${secondText}`;
                }
              }
            }
          }
        }
      }

      return {
        id: actId,
        name: label,
        outcome: answers.outcome || "SELF_SERVICE",
        outcomeLabel: getActivityOutcomeLabel(answers.outcome || "SELF_SERVICE"),
        subDetail,
      };
    });

    res.render("iat-lcml/layouts/iat/project-outcome", {
      outcome,
      band3Triggers,
      activities,
    });
  });

  // Helper: where to go after an activity completes its questions
  function activityDoneRedirect(actId) {
    const baseType = getActivityType(actId || "");
    if (REPEATABLE_ACTIVITIES.includes(baseType)) {
      return `${base}/activity-loop/add-another`;
    }
    return `${base}/activity-loop/next`;
  }

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
              req.session.data.activity_answers[actId] = { outcome: "STANDARD" };
            }
            return res.redirect(activityDoneRedirect(actId));
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
            req.session.data.activity_answers[actId].outcome = "SELF_SERVICE";
          }
          return res.redirect(activityDoneRedirect(actId));
        }

        if (chosen.outcomeRoute) {
          // Activity hit a terminal outcome
          const classification = classifyOutcomeRoute(chosen.outcomeRoute);
          if (actId) {
            req.session.data.activity_answers[actId].outcome = classification;
          }
          return res.redirect(activityDoneRedirect(actId));
        }

        // Normal: continue to the next question in this activity branch
        if (chosen.nextQuestionRoute) {
          return res.redirect(`${base}${chosen.nextQuestionRoute}`);
        }
      }

      // --- Phase 3 screening intercept ---
      // If we're in the screening phase and an answer would exit to an
      // outcome page, redirect to /project-outcome instead.
      const inScreening = req.session.data.in_screening_phase === true;

      if (inScreening && chosen.outcomeRoute) {
        req.session.data.in_screening_phase = false;
        return res.redirect(`${base}/project-outcome`);
      }

      // --- Default ---
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
