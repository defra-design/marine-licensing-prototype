# Public register v1 – phase 4 brief: email alerts

Handover for building email alerts on the Marine licence public register prototype. Phases 1 to 3 are built and committed on the `Public-register` branch. This file is the context a fresh session needs.

## The public register so far

A separate service from Get permission for marine work, for members of the public. No sign-in anywhere. It is tested on its own with different people from consultation v2, so it only has to make sense in itself.

- **Branch:** `Public-register`. It stays a branch: never merge it into main or open a PR (main auto-deploys).
- **Routes:** `app/routes/versions/multiple-sites-v2/public-register-v1.js`, registered in `app/routes.js`.
- **Data:**
  - `public-register-v1-applications.js` – the 12 applications (reference, applicant, marine plan area, second-level activities, `publishedOffset`)
  - `public-register-v1-details.js` – what each application says
  - `public-register-v1-policies.js` – marine plan policies for Lyme Regis and Teignmouth
- **Views:** `app/views/versions/multiple-sites-v2/public-register-v1/` – layout, service navigation and version tray in `includes/`, the comment journey in `comment/`, emails in `emails/`.
- **Base URL:** `/versions/multiple-sites-v2/public-register-v1`. Session and form keys start `public-register-v1-`.

**Phase 1 – landing page and list.** The landing page has a start button to the list, a find-by-reference lookup (MLA, 4-digit year, 5 digits; errors on the landing page), a "Get email alerts" section (dead link, `#`) and MCMS signposting. The list (`/applications`) uses the MOJ filter (reference, marine plan area, activity), sorting, and optional pagination. The activity filter is Construction, Deposit and Removal by default, with a nested version in the tray.

**Phase 2 – view an application** (`/application/:id`):
- key facts, including "Consultation closes"
- Have your say: one line and a "Comment on this application" button (an MOJ ticket panel version is in the tray)
- summary, a grouped documents list and the full application in summary cards
- Teignmouth is redacted, with an inset under the H1.

**Phase 3 – commenting:**
1. comment
2. your details (name and email, only checked for being empty)
3. check your comment
4. check your email
5. an email with a link that sends the comment (ADR-8 approach)
6. comment sent

Each application keeps its own answers. The button clears them (`?new=1`).

**Data rules:**
- Every consultation closes 21 days after it is published (`PUBLIC_CONSULTATION_DAYS`, from the LCML v4 site notice).
- The four full applications (Lyme Regis 10003, Hayling 10008, Teignmouth 10014, Poole 10016) are published first and top the list.
- References and dates go up together.

## Phase 4: what to build

From the design ticket ("DESIGN: Sign up for alerts from the Public Register") and ADR-8 ("Public register alerts use a logged-out journey", PDF in `~/Documents/defra/Consultation/`).

**Rules from ADR-8:**
- **No sign-in.** People enter an email address, which may be a shared inbox, so say "email address" rather than "your email".
- **Confirmation is a link in an email.** The alert is pending, and gets no alerts, until the link is opened. One click, no code.
- **Each sign-up is its own alert (subscription record).** One email address can have many. Signing up again adds a new one and leaves the others alone.
- **Choices:** one or more marine plan areas, and optionally one or more activity types – top level only (Construction, Deposit, Removal). No activity type means every activity. Any chosen area or type is enough to match.
- **Manage link.** Each alert has its own. It opens that alert only, showing its areas and activity types and a masked address (like `a•••@harbour.uk`). It never shows the full address or other alerts. They change and save while logged out.
- **Unsubscribe.** It is a separate link in each alert email and stops that alert only.
- **"Email me a manage link".** On the register, they enter an email address and always see the same confirmation, whether or not we hold it. If we do, one email lists each active alert with its own manage link. The page must say that whoever can read that inbox can use the links.
- **When alerts are sent.** Only when a new application is first published on this register. Never for changes, old Fivium or MCMS cases, or unconfirmed addresses. Each alert email links to the application page.

**Defaults Tom agreed** (not in the ticket or ADR): no frequency question (alerts are sent as applications are published), new applications only, keep it minimal like commenting.

**Proposed pages:**
1. Get email alerts – a start page saying what alerts are, what you get, that you can change or stop them from the emails, and that no account is needed.
2. Which marine plan areas? – checkboxes for all 11, grouped under Inshore and Offshore.
3. Which types of work? – "All types of work" or "Only some types", revealing Construction, Deposit and Removal.
4. Email address.
5. Check your answers.
6. Check your email.
7. The confirmation email, with the confirm link, shown as a page.
8. Your alert is set up.
9. An example alert email for a new application, with a link to the application plus that alert's manage and unsubscribe links.
10. Manage your alert – that alert's areas and types with change links and the masked address.
11. Unsubscribe – confirm, then "You will not get any more alerts from this alert".
12. Email me a manage link – email address, the same confirmation every time, then the email listing each alert.

In the prototype, keep each sign-up as an alert in the session, so one address with two alerts can be shown, and the manage link email lists both.

**Wire up the dead links:**
- "Get email alerts" in the service navigation (`includes/service-navigation.html`, active item `"alerts"`)
- "Sign up for email alerts" on the landing page (`start.html`)
- "Get email alerts" on the comment sent page (`comment/comment-sent.html`)

**Reuse:**
- Emails use the webmail chrome in `emails/_mail-chrome.html` and `_message-header.html`, as `emails/comment-confirmation.html` does.
- Marine plan areas and activity groups are in `public-register-v1.js` (`MARINE_PLAN_AREAS`, `ACTIVITY_GROUPS`).

**Still open (Richard is picking these up – they do not block the prototype):** link length and lifetime, terms and privacy policy, and bounced emails.

## How Tom likes to work

- **Plan first.** Bring a short plan and agree it before building.
- **Commits:**
  - Don't commit unless asked, and never push without being asked.
  - Check the branch before any git command.
  - No co-author trailer.
  - Leave `.claude/launch.json` uncommitted.
- **Design system:**
  - GOV.UK Design System components first, then MOJ. No bespoke styling for things that should be components.
  - No dropdowns – use radios or checkboxes.
- **Copy:**
  - Refer to the MMO as "we" and "us", not "the case officer". If naming it, write "Marine Management Organisation (MMO)" first.
  - Use en dashes (–), not em dashes, in copy you write. Leave applicant text as written.
  - Don't remind Tom about wording for the content designer – they review everything.
- **Session data:** don't add demo resets to entry links unless Tom asks (the comment button is an agreed exception).
- **Tray versions:** design alternatives go in the version tray (`includes/version-switcher.html`), set by a query string, with the default kept.
- **Testing:** check pages with curl and the browser pane before reporting. Say what you checked and what you didn't.
- **Answers:** keep them short and plain. Avoid long tables.

## Open questions to remind Tom about now and then

- Whether the commenter's name is shared. The site notice says comments and names go to the applicant, which conflicts with the BA and the check page.
- A character limit for comments (5,000 suggested).
- These were Claude's own ideas, not from any source: support, object or neutral before commenting, and asking about connection to the area.
- The back link on the application page, which does nothing from emailed or QR links.
- Location search (research theme 2, 5 of 5) versus marine plan area only.
- The accessible format line under the documents list.
- Which date starts the 21 days. The notice says from when it was first displayed, and the applicant has up to 7 days to put it up.
- Whether one-click comment confirm links are safe from email scanners such as Outlook Safe Links.
