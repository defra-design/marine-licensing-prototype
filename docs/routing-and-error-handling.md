# Routing and Error Handling Guide - GOV.UK Prototype Kit

This guide covers the routing patterns and error handling conventions used in the marine licensing prototype.

## Route File Organization

The prototype uses a modular routing structure where each section of the application has its own route file:

```
app/
  routes/
    versions/
      2025-05-02/
        exemption.js    # Routes for exemption journey
        sites.js        # Routes for site management
        account.js      # Routes for account management
        check.js        # Routes for checking processes
```

Each route file follows these conventions:

1. Define version and section variables for path construction:
   ```javascript
   let version = "versions/2025-05-02/";
   let section = "exemption/";
   ```

2. Export a function that accepts the router as a parameter:
   ```javascript
   module.exports = function(router) {
     // Route definitions
   }
   ```

3. Define routes using the version and section variables:
   ```javascript
   router.post('/' + version + section + 'page-name-router', function(req, res) {
     // Route handling logic
   });
   ```

## Form Validation Pattern

Form validation consistently follows this pattern:

1. Reset error flags at the beginning of the POST route:
   ```javascript
   req.session.data['errorthispage'] = "false";
   req.session.data['errortypeone'] = "false";
   ```

2. Perform validation checks:
   ```javascript
   const inputValue = req.session.data['input-name'];
   if (!inputValue || inputValue.trim() === "") {
     req.session.data['errorthispage'] = "true";
     req.session.data['errortypeone'] = "true";
   }
   ```

3. Redirect based on validation results:
   ```javascript
   if (req.session.data['errorthispage'] === "true") {
     res.redirect('page-name');
   } else {
     // Set completion status for task list
     req.session.data['section-status'] = 'completed';
     
     // Check if returning to check answers page
     if (req.session.data['camefromcheckanswers'] === 'true') {
       req.session.data['camefromcheckanswers'] = false;
       res.redirect('check-answers#section-anchor');
     } else {
       res.redirect('next-page');
     }
   }
   ```

## Data Clearing Functions

For complex workflows where user inputs are dependent on previous selections:

1. Define functions that clear related data:
   ```javascript
   function clearRelatedData(session) {
     delete session.data['field-one'];
     delete session.data['field-two'];
     // Clear other related fields
   }
   ```

2. Call these functions when selections change:
   ```javascript
   if (previousSelection !== currentSelection) {
     clearRelatedData(req.session);
   }
   ```

## Task List Management

To track completion status for the task list:

1. Update status after successful form submission:
   ```javascript
   req.session.data['section-name-status'] = 'completed';
   ```

2. Use this status in the task list template to show completion indicators

## Complex Form Validation

For multi-part forms (e.g., coordinate entry forms):

1. Create specific error flags for each field:
   ```javascript
   req.session.data[`error-field-name`] = "false";
   ```

2. Build an errors array for the error summary:
   ```javascript
   req.session.data['errors'] = [];
   
   if (fieldIsInvalid) {
     req.session.data[`error-field-name`] = "true";
     req.session.data['errors'].push({
       text: "Error message for this field",
       anchor: "field-id"
     });
   }
   ```

3. Use these in templates to highlight specific fields and create accessible error messages

## Conditional Routing

For handling complex user journeys with multiple possible paths:

```javascript
router.post('/' + version + section + 'decision-page-router', function(req, res) {
  const selection = req.session.data['decision-radio-buttons'];
  
  switch(selection) {
    case "Option A":
      res.redirect('option-a-page');
      break;
    case "Option B":
      res.redirect('option-b-page');
      break;
    default:
      // Handle no selection
      req.session.data['errorthispage'] = "true";
      res.redirect('decision-page');
  }
});
```

## Error Handling in Templates

In your Nunjucks templates, use the error flags and error arrays consistently:

```nunjucks
{% if data['errorthispage'] == "true" %}
  {{ govukErrorSummary({
    titleText: "There is a problem",
    errorList: data['errors'] if data['errors'] else [
      {
        text: errorTextHTML,
        href: "#field-id"
      }
    ]
  }) }}
{% endif %}

{{ govukInput({
  label: {
    text: "Field label"
  },
  id: "field-id",
  name: "field-name",
  value: data['field-name'],
  errorMessage: {
    text: "Error message"
  } if data['error-field-name'] == "true"
}) }}
```

## Important Template Considerations

When defining variables that will be rendered in the UI, such as error messages, do NOT include HTML comments inside the variable block as they will be rendered. For example:

```nunjucks
/* INCORRECT - Comments will appear in rendered output */
{% set errorTextHTML %}
    <!-- This comment will show in the error message -->
    {% if data['errortypeone'] == "true" %}
    Select how you want to provide the coordinates
    {% endif %}
{% endset %}

/* CORRECT - Place comments outside the variable block */
<!-- Error message for when nothing is selected -->
{% set errorTextHTML %}
    {% if data['errortypeone'] == "true" %}
    Select how you want to provide the coordinates
    {% endif %}
{% endset %}
```

Generated by Copilot 