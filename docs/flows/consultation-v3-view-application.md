# How viewing an application works

- after usability testing with consultees ([see findings here](https://defra.sharepoint.com/:p:/r/teams/Team4307/Change%20Delivery%20%20Implementation/MMO%20CHANGE%20PROGRAMME/MPLP%20(Marine%20Planning%20%26%20Licensing%20Programme)/7%20Low%20Complexity%20Marine%20Licences/User%20research/Consultation/Consultation%20usability%20test/Consultee_research_findings.pptx?d=w65428de3d9b24449a96a4c60676ec955&csf=1&web=1&e=dOzL2i)), now with the MOJ Sub navigation and site location downloads as KMLs and Shapefiles.

### Getting to the application

Consultees start from the request page, headed "Request for advice" or "Application notification". In the "About the application" Summary list, the "Full details" row has a "View the application" link. It now opens in the same tab. In usability testing it opened in a new tab, and I observed people struggled to get back to the consultation. The rule is to only have a new tab opening in mid-flow of a form and in this instance that isn't the case.

At the top of the application there is a Back link that returns to the request page. It says "Back to the request for advice" or "Back to the application notification", depending on the type of consultation.

The respond page, though, retains the "View the application (opens in new tab)" link. That still opens a new tab, so the response form stays where it is. The new tab shows the GOV.UK header and the service name in the [Service navigation](https://design-system.service.gov.uk/components/service-navigation/), with no navigation links and no Back link, as in other places where the service opens a new tab. The person closes the tab to get back to their response.

### The application pages

Research found the full application was too long to read on one page. It's now split into separate pages with an [MOJ Sub navigation](https://design-patterns.service.justice.gov.uk/components/sub-navigation/). The reference number and application name are at the top, then the Sub navigation, then the page heading. The pages are:

- "Overview": an "Application overview" [Summary card](https://design-system.service.gov.uk/components/summary-list/#summary-cards) with the type, status, reference number, applicant and date submitted, and an "Application details" Summary card with the name, summary of the proposed works and preferred dates
- "Documents": every document in the application in one Summary card, with a row for each part of the application it was uploaded in
- "Sites and activities": each site's name and map, its activities and construction drawings, in Summary cards
- "Marine plan policies": a Summary card for each policy category (Cross-cutting, Economic, Environmental and Social), then any supporting documents
- "WFD": the Water Framework Directive assessment answers and upload. The page heading spells out "Water Framework Directive"
- "Other permissions": the applicant's answers about other permissions

Marine plan policies are grouped by category only, never by marine plan area. The regional plans have essentially the same policies with slightly different wording, so a consultee's responses would usually be the same across areas.

On "Sites and activities", when there's more than one site, "On this page" has links down to each site, and there's a "Back to top" link after each site. "Marine plan policies" always has "On this page" links to each category and to supporting documents, with a "Back to top" link after each. These links work like the contents links on GOV.UK pages.

Every application has the same 6 pages.

If parts of the application are redacted, an [Inset text](https://design-system.service.gov.uk/components/inset-text/) component under the application name explains how withheld information is shown. Consultees see the same redacted version as the public register. The [Teignmouth application](https://marine-licensing-prototype-5b7b33ca29e1.herokuapp.com/versions/multiple-sites-v2/consultation-v3/view-application/teignmouth) on the prototype shows this.

### Why the Sub navigation

We built 4 other versions alongside it: the original long page, an accordion, MOJ side navigation and tabs. The Sub navigation came out on top because:

- the application is split into separate pages on desktop and on mobile, whereas tabs turn back into one long page on small screens
- the content is full width, whereas side navigation would make it narrower
- the navigation stays visible and usable on mobile. On a phone the Sub navigation links stack above the content, while MOJ side navigation becomes a strip that scrolls sideways and is easy to miss

This is the layout we plan to use for every page that shows a submitted application, for applicants and on the public register as well as for consultees. It won't be used for check your answers pages.

### Downloading the site location

Consultees can download the site location as GIS data, as a KML file and as a Shapefile. This helps with their internal constraints checks, and with triage so the consultation goes to the right regional team. There is one of each, covering every site in the application, and the service makes them from the site location however the applicant provided it.

The links are in 2 places:

- on the request page, in a "Site location data" row straight after the marine plan area, so the location details sit together
- on the application's "Documents" page, first in the "Sites and activities" row

The links show the file format but no file size. The files will be created when the link is clicked, so the size isn't known in advance (development are doing a spike on this). Every other document link now shows its file format and size, which it didn't before. The download links don't work in the prototype.

The "Providing the site location" Summary card is being taken out everywhere the submitted application is shown. How the applicant provided the coordinates doesn't seem necessary at this point.

### Demoing it

Under "Consultation" on the [prototype index page](https://marine-licensing-prototype-5b7b33ca29e1.herokuapp.com/), open the "Consultation v3" Details component and select "Consultation v3". No session data needs clearing first.

Choose a consultation from the list, then "View the application". Only 4 consultations have a full example application:

- Dart estuary navigation buoy replacement (2 sites)
- Hayling Island groyne repairs
- Poole Harbour swing moorings
- Installation of floating pontoon, Teignmouth Harbour, Devon (redacted)

The others show their overview, documents and single site, and "To follow" on the policies, WFD and other permissions pages (placeholder content). Dart is assigned to you, so it's the one to use to show the new tab version from the respond page.

The "Page versions" panel, opened from the grey triangle button in the bottom right corner of the screen, lets you switch the application to the other versions under "View application page": one long page, accordion, side navigation and tabs. In those versions, consultations without a full example application show the long page.
