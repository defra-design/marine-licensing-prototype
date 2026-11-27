---
name: "developer-ticket"
description: "Draft Jira developer tickets for a page or journey in the marine licensing prototype, with a user story, acceptance criteria and out-of-scope items. Use when a BA asks for a developer ticket, acceptance criteria or how to split prototype work into tickets."
---

# Developer ticket

Helps a BA turn pages in the prototype into developer tickets. The BA reviews and owns every ticket. You draft.

## 1. Ask what the ticket is for

Ask these questions before reading or writing anything. Offer multiple-choice options where you can, and ask them together rather than one at a time.

1. Which page, journey or feature is the ticket for?
2. Which user is it for? For example, primary advisor or applicant.
3. What's in scope and what's out of scope?
4. Are there related or dependent tickets to link to? Ask for their ticket numbers.
5. Where does the data on the page come from? For example, D365 or what the applicant entered.

## 2. Read the prototype

- The design decisions file for the section, if there is one: `docs/decisions/<section>.md`
- The views: `app/views/versions/multiple-sites-v2/<section>/`
- The routes: `app/routes/versions/multiple-sites-v2/<section>.js`
- The pull requests and commits that touch those files, for what changed and why

Use a full application as the example. Where the prototype's demo data is incomplete (a short application, a missing field), that's a gap in the prototype, not a requirement.

Describe what the page does for the user. Leave out prototype URLs, query strings, session data and anything that only exists to make the prototype work. Developers build their own.

## 3. Propose a split

Say whether the work should be one ticket or several. Give each ticket a one-line summary and say why it's split that way, for example because parts can be built or tested on their own.

Ask the BA to confirm or change the split before writing.

## 4. Write the tickets

Write each ticket in Markdown the BA can paste into Jira:

- **Title:** USER ROLE – what the ticket delivers
- **User story:** As a…, I need…, so that…
- **Acceptance criteria:** numbered, with nested lists for detail. One behaviour per criterion.
- **Out of scope:** with the linked ticket for each item where there is one
- **Prototype:** a link to the page on the team prototype, https://marine-licensing-prototype-5b7b33ca29e1.herokuapp.com
- **Screenshots:** a list of the pages and states the BA should capture. The BA takes the screenshots.

Where you can't know something, such as a ticket number or a data source, leave a clear placeholder like [ML-XXXX] rather than guessing.

## 5. Check before handing over

- Every acceptance criterion matches what the prototype does
- Page headings, button labels and link text are quoted exactly as they appear
- UI text uses an en dash (–), not an em dash
- End with a short list of anything you weren't sure about, for the BA to check
