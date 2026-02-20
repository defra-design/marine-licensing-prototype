# Claude Code: MMO IAT-LCML Refactor

## Context
Refactoring the `iat-lcml` module to support multi-activity projects. Users select multiple activities via checkboxes at the start.

## Technical Standards
- **Framework:** GOV.UK Prototype Kit.
- **Data:** `app/iat-lcml/content.json` & `app/iat-lcml/lcml-rules.json`.
- **State:** Use `req.session.data.selected_activities` (array).

## Strategy
1. **Upfront Selection:** Convert initial radios to checkboxes.
2. **Intelligent Sequencing:** Analyze `content.json` to find repetitive questions (Jurisdiction, Cost, Harbour Authority, etc.). Ask these once at the project level, then loop through activity-specific questions.
3. **Logic Injection:** Apply the £1M cost and 2km MPA rules from the rules JSON.
4. **Outcome:** Calculate a single project-level routing result.