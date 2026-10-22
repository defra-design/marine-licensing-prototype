---
name: "flow-description"
description: "Write a plain-text Jira description of how a flow in the MPLP GOV.UK or MAS D365 prototype works, for BAs and the team. Use when asked to write up, describe or explain a prototype flow."
---

# Flow description

Writes the description that goes on a Jira design ticket, explaining how a flow in the prototype works. The main reader is the BA, who needs a clear picture of the flow and its functionality. Readers will often have the prototype open next to the ticket.

Applies to both prototypes:
- MPLP: the applicant-facing GOV.UK journey ("Get permission for marine work"), built in the GOV.UK Prototype Kit
- MAS: the D365 caseworker prototype

## Before writing

1. Work out the flow from the prototype itself (templates, routes, index page) and from the session. Describe what the prototype does, not what the code is.
2. If anything about the flow is unclear or can't be confirmed from the prototype, ask before writing. Don't fill gaps with assumptions. This covers entry points, branches, what changes on return visits, and what is placeholder.

## Register

- Plain English, but call things by their proper names. Name design system components exactly as the design system does.
  - GOV.UK: Inset text, Notification banner, Details, Warning text, Button, Back link, Task list, Summary list, Summary card, Tag (give the colour, for example "an orange Rejected Tag"), Error summary, Error message, Panel, Radios, Checkboxes, Character count.
  - D365: command bar, form, tab, section, subgrid, business process flow, timeline, quick view form, view, lookup, notification (MessageBar), dialog. Name the native construct, not the Fluent UI component.
- Name task list statuses, Tag labels and button labels as they appear (Completed, Not yet started, Create new application).
- Not technical. No routes, session variables, file names, field IDs or how the code works.
- Concise. No filler, no restating the same point.
- Don't play page content back word for word, because readers can see the prototype. Quote a page heading, section heading, button or link label when it's needed to say where something is. Summarise body content in a clause.
- Say when content is placeholder.
- Note where the prototype differs from the real service, in brackets. For example: "(in reality there will be the choice between that and One Login)".
- UK English. No em dashes.

## Reasoning

Only explain why a design decision was made if Tom has given the reasoning in the session (an MVP constraint, a Design System guideline, a research finding, an earlier version that was dropped). Never infer or invent a rationale. If a decision looks like it needs explaining and no reason has been given, ask.

## Structure

- Title line: "How the [flow name] works". If the write-up covers one version or variant, add a short second line saying which, starting with "- " (for example "- without the 'Needs fixing' statuses").
- Then sections in the order the user moves through the flow, each with a short sentence-case heading on its own line ("Getting the notification", "Signing in", "The task list").
- Each section is one or two short paragraphs. Use a bulleted list only for a genuine list, such as the sections on a page and what each one covers, or what the user selected.
- Cover:
  - how the user gets into the flow
  - each page or screen and what's on it, naming the components
  - what each action does and where it goes, including when there is no confirmation step
  - what's in and out of scope where it affects the behaviour ("Nothing tracks whether they've fixed the issues")
  - what changes on a return visit, or after an action has been taken
  - edge cases (deleting, going back, coming in from another route)
  - what the user sees afterwards (for example, how it shows in Submissions)
- Always end with a "Demoing it" section: which index page links open the flow (named as they appear on the index page, not URLs), whether session data needs clearing first, what state carries over between runs, and anything that resets it.
- If an alternative version exists and is parked, say so in one line at the very end.

## Output

Plain text in a single copyable block, ready to paste into Jira. Heading lines are plain text, not markdown headings. Use "- " for bullets. No bold, no markdown syntax.

## Example

This is the standard to match for tone, level of detail and component naming.

```
How the reject application task works
- without the 'Needs fixing' statuses

Getting the notification
The case officer has reviewed the application and rejected it. When they did that in Dynamics 365, they selected the sections with problems and wrote a note explaining what's wrong. The applicant gets a short Notify email saying their marine licence application has been rejected, with a link to sign in. The email doesn't say why it was rejected. They have to sign in to see that.

Signing in
The link goes to the Government Gateway sign-in page (in reality there will be the choice between that and One Login). Signing in takes them straight to the rejection page for that application.

The rejection page
The page is headed "Your application has been rejected", with the application name above it. It gives the date the application was reviewed and rejected. It also tells them straight away that they can fix the issues and submit a new application without starting from a blank one.

Under "Why your application was rejected", an Inset text component plays back what the case officer entered (placeholder content). First comes a bulleted list of the sections they selected: "Site location", "Water Framework Directive assessment" and "Marine plan policies". Then come their notes:

- the site location is within 1 nautical mile of the coast, but no Water Framework Directive assessment was uploaded
- the applicant answered "Not applicable" for the South Aggregates 4 (S-AGG-4) marine plan policy, but it does apply to their application

The rest of the page covers what happens next:

- "What you will be charged": they'll be invoiced for the review so far, and a new application is charged separately
- "How to submit a new application": we copy all their answers and documents into a new application. Most sections will show as completed, and the fee estimate will show as not yet started. The issues to fix are listed at the top. They need to fix those sections, accept the new fee estimate and submit. They should check every section, because fixing one may affect another
- "If you decide not to submit a new application": they don't need to do anything, but they'll still get an invoice

The page ends with a Create new application Button and a "View your original application" link.

Creating the new application
Clicking Create new application goes straight to the task list of a new application, with no confirmation page in between. It's a draft with everything copied across, and nothing is sent until the applicant chooses to send it.

The task list
Above the heading is a Notification banner, the standard blue one with the title "Important". Inside it, under "What you need to fix", are the same sections and notes from the case officer, so the applicant has them to hand while they work.

In the Task list, every section shows Completed because the answers were copied across, except Fee estimate, which shows Not yet started because a new application needs a new estimate. There are no statuses marking the sections the case officer flagged. The banner is the only place the issues appear.

That's deliberate for the MVP. The case officer selects which section has a problem, not the exact page it's on. Marking the right sections with the 'Needs fixing' status, and clearing those statuses at the right moment, would need case officers to pinpoint each page, and that isn't MVP. An earlier version also showed the reasons on every page in the affected sections. It clashed with the Error summary and Error message styling and looked like another error, so the reasons now appear only here and on the rejection page. We're testing this with users to see how it lands.

We chose the Notification banner because the Design System says it's for "telling the user about something that affects them in particular". The rejection is specific to this applicant, and it isn't about the task list's own content.

Fixing the sections
In the demo, the copied answers match what the case officer found. The Water Framework Directive question opens with "No" selected for being within one nautical mile, and the South Aggregates 4 (S-AGG-4) policy page has "Not applicable" in the answer box.

The applicant can fix whatever they need in any order. Nothing tracks whether they've fixed the issues. They're trusted to work through the banner.

Sending the new application
Because everything else is already complete, the only task left is the fee estimate. Once it's accepted, the "Check and send your application" Button appears and the applicant can send it.

Coming back to the rejection page
The rejection page stays the same page however the applicant gets back to it: the browser's back button, signing in again from the email, or "View details" on the rejected application in Submissions.

The one thing that changes is the bottom of the page. The Create new application Button is replaced by an Inset text component saying "We created a new draft application for you on [date]" and "View it in Submissions", with a link to the Submissions page. That stops a second application being created by mistake and tells them where the first one is. If they arrived from Submissions, there's also a Back link to return there.

If the applicant deletes the new draft in Submissions, the Button comes back, so they can create another.

Afterwards
In Submissions, the original application shows an orange Rejected Tag. The new application is a separate row: a blue Draft Tag with Continue and Delete links, then a green Submitted Tag once it's sent.

"View your original application" opens a read-only record of what was submitted, laid out in Summary cards. Its overview shows the Rejected status, the dates it was submitted and rejected, and the case officer's reasons. Once a new application exists, it also shows when that was created, with a link to Submissions. Further down, the original answers show what the case officer was looking at, including "Not applicable" for South Aggregates 4.

Demoing it
Under "Reject application" in the Email notifications and journeys section of the prototype index page, "Reject application v2" opens the email and "Reject inbox v2" opens the inbox. Neither link resets anything, so clear the session data first to start with the Create new application Button showing. After that, the page stays in whatever state it was left in, so you can create the application, sign back in from the email, and show the Inset text version.

The "Start as" and "Skip to" links on the index page clear the reject journey, so the banner doesn't carry over into other demos.

The version that marked the flagged sections with Needs fixing statuses is parked separately, in case it's needed later.
```