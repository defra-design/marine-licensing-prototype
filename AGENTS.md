# Marine licensing prototype (Codex)

> Same guidance as `CLAUDE.md` (for Claude Code) – keep the two in step. IAT-LCML refactor notes are in `app/iat-lcml/AGENTS.md`.

A GOV.UK Prototype Kit prototype for the MMO marine licensing service (exemptions, marine licences, consultation, public register and sample plans). It is for design exploration, user testing and team discussion, not production. Prioritise clarity and demonstrability over robustness.

More than one designer works in this repo. Keep changes inside the section you are working on.

## Running it

```
npm install
npm run dev
```

Then open http://localhost:3000. The index page links to every journey.

## How it fits together

- **Pages** are Nunjucks files in `app/views`. The kit serves a page straight from its URL, so `/versions/multiple-sites-v2/exemption/project-name-start` renders `app/views/versions/multiple-sites-v2/exemption/project-name-start.html`. Routes are only needed for logic.
- **Data**: everything the user enters goes into `req.session.data` (`data['field-name']` in templates). It is one object shared by every journey.
- **`app/routes.js`** is the switchboard. It restores session snapshots from `?state=…` links, and loads every journey's route file with `require('./routes/versions/…')(router)`. Older versions are at the top; current work is in the `multiple-sites-v2` block.
- **Route pattern**: a form posts to a `…-router` URL, which validates or branches and then redirects to the next page.

## Current work: `multiple-sites-v2`

Each journey is a "section" with two matching halves:

- Routes: `app/routes/versions/multiple-sites-v2/<section>.js` (large sections are split, e.g. `low-complexity-v4-site-locations.js`)
- Views: `app/views/versions/multiple-sites-v2/<section>/`

Each route file sets `const version = "multiple-sites-v2"` and `const section = "<section>"` and builds URLs as `/versions/${version}/${section}/…`. Each section extends its own layout in `app/views/versions/multiple-sites-v2/layouts/`. Shared includes (header, back link, account bar) are in `…/multiple-sites-v2/includes/`.

| Section | What it is |
|---|---|
| `check` | "Do I need a licence" checker before exemptions |
| `exemption`, `exemption-manual-entry` | Exemption notification journey |
| `low-complexity-v1` to `v4` | Low complexity marine licence (LCML) – v4 is current |
| `consultation-v0` to `v2` | Consultation. v1 is a minimal journey on main for dev foundations, not usability testing |
| `public-register-v1` | Public register |
| `sample-plans-v1`, `v2` | Sample plan journeys |
| `app/iat-lcml/` | Data-driven activity checker – see `app/iat-lcml/AGENTS.md` |

Older folders under `app/routes/versions/` and `app/views/versions/` are past rounds. Leave them alone unless asked.

Legacy from the previous designer (2024): `app/views/templates/` (generic `PAGENAME_*` question pages) and their routes in `app/routes/templates.js`. Current journeys don't use them – build new pages by copying existing `multiple-sites-v2` pages instead.

### Starting a new section

Copy the closest section's route file(s) and views folder, rename them, change the `section` constant, give it its own layout, add its `require` line to `app/routes.js`, and link it from `app/views/index.html`. See `docs/version-creation-guide.md`.

## Sites and site numbering

Multiple sites are stored in a batch system: `req.session.data.siteBatches` holds batches (one per file upload or manual entry run), each with shared settings and a `sites` array. `req.session.data.sites` is the flat list of all sites.

- `globalNumber` numbers sites 1, 2, 3… across all batches. Display it with `site.globalNumber or loop.index`.
- Deleting a site renumbers every higher site down by one.
- Use the existing helpers in `exemption.js` / `exemption-manual-entry.js` (`initializeBatch`, `getCurrentBatch`, `addSiteToBatch`, `findSiteByGlobalNumber`, `renumberSitesAfterDeletion`, `clearCurrentBatchOnly`) rather than editing the arrays directly.

Full details: `.cursor/rules/prototype-rules.mdc` (the most complete reference for the batch system, cancel links, organisation journey, sample plans and marine plan policies). Read it before changing site handling.

## Prototype tools

- `/prototype-admin/view-data` shows the current session and a shareable `?state=` link.
- `?state=<base64 JSON>` on any URL loads that session snapshot. The index page uses these to open pre-filled applications.
- `/index/clear-data` clears the session. Entry links must not reset data – designers clear it themselves.
- `/user-testing-links` is the page for usability testing participants.

## Other docs

- `docs/README.md` – index of guides (routing and error handling, content style, cancel links, site deletion renumbering and others). Mostly written mid-2025 around exemptions; check examples against current code. Ignore `docs/archive/`.
- `app/views/about-the-prototype.html` – user journeys, limitations and iteration notes.
- `.claude/skills/flow-description/SKILL.md` – a Claude skill that writes a plain-English "How the [task] works" walkthrough of a journey for a Jira design ticket.

## Branches and deploying

- One repo: `defra-design/marine-licensing-prototype`. **`main` auto-deploys** to the team Heroku URL, so work on a branch and merge by pull request.
- Check which branch you are on before committing or pushing – branches get switched and merged between sessions.
- Do not commit or push unless asked. Leave changes in the working tree for review.
- Do not add a `Co-Authored-By: Claude` trailer to commits.
- After a push, give a brief Markdown PR description and the compare link.

## Working conventions

- **Only change what is asked.** Change only the page named – don't sync the same edit into sibling or variant pages, and don't alter demo data or interactions for consistency. Flag mismatches instead.
- Only modify the routes for the section and flow you are working on.
- Use GOV.UK Design System components and macros. No select dropdowns – use radios or checkboxes.
- Use an en dash (–), not an em dash (—), in UI text you write. Leave applicant-entered example text as it is.
- Content checks are mechanical only (quotes, dashes, punctuation, terminology slips). Don't reword or flag wording for the content designer unless asked to – they do a full review.
- Content missing from a design screenshot stays in the page – flag it rather than removing it.
- Never symlink `node_modules` into a git worktree; run `npm install` there instead.
