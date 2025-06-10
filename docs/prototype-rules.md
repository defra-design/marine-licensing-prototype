## Routing and Error Handling

For detailed routing patterns and error handling conventions, see the [Routing and Error Handling Guide](mdc:docs/routing-and-error-handling.md).

**Key patterns:**
- Use modular route files with version and section variables
- Follow consistent form validation patterns with error flags
- Implement data clearing functions for complex workflows
- Use error arrays for accessible error summaries

**Routing Modification Rules:**
- **Only modify the specific routing section you are working on** - never change unrelated routes
- When working on manual entry flows, only modify routes under the "Manual Entry Flow Routes" section
- When working on main exemption flows, only modify routes in the main exemption section
- Always verify that your changes are isolated to the intended flow/section
- Use clear section comments to identify different routing areas (e.g., `//////////////////////////////////////////////////////////////////////////////////////////////`)
- If unsure which section to modify, ask for clarification before making changes 

### Form Pages with Caption and Page Heading as Label

For pages where you need a single form element with:
- A page heading (h1) that also serves as the input label
- A caption above the heading

Use this approach:

1. Add proper macro imports at the top:
   ```nunjucks
   {% from "govuk/components/input/macro.njk" import govukInput %}
   {% from "govuk/components/button/macro.njk" import govukButton %}
   {% from "govuk/components/error-summary/macro.njk" import govukErrorSummary %}
   ```

2. Define the page heading separately:
   ```nunjucks
   {% set pageHeadingTextHTML %}
   Page heading text
   {% endset %}
   ```

3. Place the caption outside the input component but before it:
   ```nunjucks
   {% if data['caption-data-value'] %}
   <span class="govuk-caption-l">{{ data['caption-data-value'] }}</span>
   {% endif %}
   ```

4. Use the govukInput macro with isPageHeading set to true:
   ```nunjucks
   {{ govukInput({
       label: {
           text: pageHeadingTextHTML,
           classes: "govuk-label--l",
           isPageHeading: true
       },
       hint: {
           text: "Hint text if needed"
       },
       id: "input-id",
       name: "input-name",
       value: data['input-name'],
       classes: "govuk-input--width-20",
       errorMessage: {
           text: "Error message"
       } if data['error-type'] == "true"
   }) }}
   ```

This approach ensures the page remains accessible while allowing the heading to serve as the form label and maintaining the caption functionality.

### Caption Placement Rules

**Project-level captions with site numbers**: Combine project name and site number in a single caption above the h1 element
```nunjucks
<span class="govuk-caption-l">{{ data['exemption-project-name-text-input'] }}<span class="govuk-!-display-block">Site {{ displaySiteNumber }}</span></span>
<h1 class="govuk-heading-l">Page heading</h1>
```

**For form inputs with labels**:
```nunjucks
<span class="govuk-caption-l">{{ data['exemption-project-name-text-input'] }}<span class="govuk-!-display-block">Site {{ displaySiteNumber }}</span></span>
<h1 class="govuk-label-wrapper">
  <label class="govuk-label govuk-label--l" for="input-id">
    {{ pageHeadingTextHTML }}
  </label>
</h1>
```

**For govukRadios with HTML legends**:
```nunjucks
html: '<span class="govuk-caption-l">' + data['exemption-project-name-text-input'] + '<span class="govuk-!-display-block">Site ' + displaySiteNumber + '</span></span>' + pageHeadingTextHTML
```

This approach improves accessibility and scannability by keeping related information together in the caption area while maintaining clear visual hierarchy. 