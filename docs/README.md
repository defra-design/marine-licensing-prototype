# Marine Licensing Prototype Documentation

Documentation for the marine licensing prototype built with the GOV.UK Prototype Kit.

Start with the project guide in [`CLAUDE.md`](../CLAUDE.md). It explains how the prototype fits together, the current sections in `multiple-sites-v2`, the prototype tools, branches and deploying, and working conventions. The same guide is in [`AGENTS.md`](../AGENTS.md) for Codex.

Most guides here were written in 2025 around the exemption journey. Check examples against the current code – some use older version folders such as `2025-05-02`.

## Documentation Index

### Essential Guides

- **[Version Creation Guide](version-creation-guide.md)** – how to create a new version or section
- **[Routing and Error Handling Guide](routing-and-error-handling.md)** – patterns and conventions for routes and form validation
- **[Content Style Guide](content-style-guide.md)** – voice and tone guidelines for writing prototype content

### Sites and Site Management (exemption journey)

- **[Site Deletion Renumbering](site-deletion-renumbering-implementation.md)** – how sites renumber when one is deleted
- **[Cancel Functionality](cancel-functionality-implementation-guide.md)** – cancel link behaviour across the multiple sites v2 exemption flow
- **[Cancel Subsequent Site Creation](cancel-subsequent-site-implementation.md)** – cancel during the "Add another site" flow
- **[Deferred Clearing](deferred-clearing-implementation-guide.md)** – keeping data until a change is confirmed from review pages
- **[Method Switch Data Preservation](method-switch-data-preservation-guide.md)** – backup and restore when switching site entry method
- **[Manual Entry Change Links](manual-entry-change-links-implementation.md)** – change links from the manual entry review page
- **[Remove "Your Sites" Page](remove-your-sites-page-task-plan.md)** – task plan for removing `site-details-added.html`

### Low Complexity Marine Licence and IAT

- **[MPP Calculation Alert Mini Journeys](mpp-calculation-alert-mini-journey.md)** – marine plan policies loading spinner journeys for usability testing
- **[Withholding Information – Original Copy](withhold-notification-original-copy.md)** – copy recorded before the user testing journeys changed
- **[IAT LCML Structure](iat-lcml-structure.md)** – how the `iat-lcml` activity checker is wired

### Sample Plans

- **[Disposal Site Multiple Sites](sample-plan-disposal-site-multiple-sites-implementation-guide.md)** – multiple disposal sites in the sample plans journey
- **[Lean v2 Search Pages](lean-v2-search-pages-implementation.md)** – lean variant of the disposal site search flow
- **[Projects Filter – MOJ Version](projects-filter-moj-version.md)** – side panel filter using MOJ Design System patterns
- **[Projects Filter – Toggle Version](projects-filter-toggle-version.md)** – horizontal expandable filter panel

### AI Tool Guidance

- [`CLAUDE.md`](../CLAUDE.md) – Claude Code
- [`AGENTS.md`](../AGENTS.md) – Codex
- [`.cursor/rules/prototype-rules.mdc`](../.cursor/rules/prototype-rules.mdc) – Cursor, and the most detailed reference for the batch system, captions and error styling, cancel links, the organisation journey, sample plans and marine plan policies
- `app/iat-lcml/CLAUDE.md` and `app/iat-lcml/AGENTS.md` – IAT-LCML multi-activity refactor notes
- [`.claude/skills/flow-description`](../.claude/skills/flow-description/SKILL.md) – Claude skill that writes a plain-English walkthrough of a journey for a Jira ticket

Keep `CLAUDE.md`, `AGENTS.md` and the Cursor rules in step when conventions change.

### Archived Documentation

The `archive/` folder contains outdated documents kept for reference: earlier refactoring attempts, a 2025 radio button caching bug investigation, LCML v2 flow documentation and the old Copilot instructions. Don't use them for current development.

## Marine Licensing System Architecture

### Batch System
The prototype uses a **batch system** to manage multiple sites:
- Sites can be entered via file upload or manual entry
- Each batch contains settings for shared activity data
- Sites have global numbering across all batches
- Automatic renumbering when sites are deleted

### Key Functions
```javascript
// Always use these functions for site management
initializeBatch(session, entryMethod)
getCurrentBatch(session)
addSiteToBatch(session, siteData)
findSiteByGlobalNumber(session, globalNumber)
renumberSitesAfterDeletion(session, deletedGlobalNumber)
```

## Resources

- [GOV.UK Prototype Kit documentation](https://prototype-kit.service.gov.uk/docs/)
- [GOV.UK Design System](https://design-system.service.gov.uk)
- [GOV.UK Style Guide](https://www.gov.uk/guidance/style-guide)
