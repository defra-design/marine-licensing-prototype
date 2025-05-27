# Version Creation Guide - GOV.UK Prototype Kit

This guide covers how to create new versions in the marine licensing prototype, including both date-based and feature-based versions.

## Overview

The prototype uses a versioned approach where each iteration or feature set is contained in its own folder structure. This allows for:
- Parallel development of different features
- Easy comparison between versions
- Preservation of previous iterations for reference
- Clean separation of concerns

## Types of Versions

### Date-Based Versions
Use format `YYYY-MM-DD` (e.g., `2025-05-02`) for time-based iterations.

### Feature-Based Versions
Use descriptive names (e.g., `multiple-sites`, `mvp`, `multiple-sites-v2`) for feature-specific development.

## Step-by-Step Process

### 1. Copy the Base Version

Choose the most appropriate existing version to copy from:

```bash
# Copy views folder
cp -r app/views/versions/[source-version] app/views/versions/[new-version]

# Copy routes folder
cp -r app/routes/versions/[source-version] app/routes/versions/[new-version]
```

### 2. Update Route File References

In each route file in `app/routes/versions/[new-version]/`, update the version variable:

```javascript
// Change from:
let version = "versions/[source-version]/";

// To:
let version = "versions/[new-version]/";
```

**Files to check:**
- `check.js`
- `exemption.js` 
- `exemption-updated.js`
- `multiple-coords-side-by-side.js`
- `iat.js` (if present)
- Any other `.js` files in the routes folder

### 3. Update Hardcoded Paths

Some files may contain hardcoded paths that need updating:

**In `iat.js` (if present):**
```javascript
// Update the base path
const base = "/versions/[new-version]/journey";

// Update any hardcoded route paths
router.get('/versions/[new-version]/start', (req, res) => {
  res.render('versions/[new-version]/start');
});

// Update render paths
res.render("versions/[new-version]/layouts/iat/outcome", view);
```

### 4. Update Template References

Check template files for any hardcoded version references:

**In `start.html` (if present):**
```nunjucks
{{ govukButton({ 
  text: "Start now", 
  href: "/versions/[new-version]/journey/sea",
  classes: "govuk-button--start",
  isStartButton: true
}) }}
```

### 5. Add Route Includes to Main Routes File

In `app/routes.js`, add the new version's route includes:

```javascript
// [New Version Name]
require('./routes/versions/[new-version]/check.js')(router);
require('./routes/versions/[new-version]/exemption.js')(router);
require('./routes/versions/[new-version]/exemption-updated.js')(router);
require('./routes/versions/[new-version]/multiple-coords-side-by-side.js')(router);
require('./routes/versions/[new-version]/iat.js')(router); // if present
```

### 6. Add Version Section to Index Page

In `app/views/index.html`, add a new section for your version:

```nunjucks
<!-- Start of [Version Name] -->
<h2 class="govuk-heading-m">[Version Name] <strong class="govuk-tag govuk-tag--yellow" style="float:right">In progress</strong></h2>

<p>[Description of what this version includes/explores]</p>

<h3 class="govuk-heading-s">Start from:</h3>

<ul class="govuk-list govuk-list--spaced">
  <li><a href="versions/[new-version]/check/exemption?[query-params]" class="govuk-link--no-visited-state">[Link description]</a></li>
  <li><a href="versions/[new-version]/exemption/task-list?[query-params]" class="govuk-link--no-visited-state">[Link description]</a></li>
  <!-- Add additional start points as needed -->
</ul>

<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
<!-- End of [Version Name] -->
```

**Position the section appropriately:**
- New "In progress" versions typically go at the top
- Completed versions can be moved down
- Follow the existing pattern for consistency

### 7. Verification Steps

1. **Syntax Check:**
   ```bash
   node -c app/routes.js
   ```

2. **Check File Structure:**
   ```bash
   ls app/views/versions/[new-version]
   ls app/routes/versions/[new-version]
   ```

3. **Test Key Routes:**
   - Visit the start links from the index page
   - Ensure forms submit correctly
   - Check that routing works as expected

4. **Search for Old References:**
   ```bash
   grep -r "[source-version]" app/views/versions/[new-version]
   grep -r "[source-version]" app/routes/versions/[new-version]
   ```

## Common Patterns

### Start Links with Pre-filled Data

Many versions include start links with query parameters to pre-fill forms:

```html
versions/[new-version]/check/exemption?headerName=Check%20if%20you%20need%20a%20marine%20licence&headerNameExemption=Apply%20for%20a%20marine%20licence&exemption=sample-notification&errorthispage=false&errortypeone=false&exempt-information-1-status=completed
```

### Version Status Tags

- `govuk-tag--yellow` for "In progress"
- `govuk-tag--green` for "Finished"
- Position: `style="float:right"`

### Section Separators

Always include section breaks between versions:
```nunjucks
<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">
```

## Troubleshooting

### Routes Not Working
- Check that all route files have updated version variables
- Verify routes are included in main `routes.js`
- Check for syntax errors with `node -c app/routes.js`

### Templates Not Found
- Ensure view files were copied correctly
- Check for hardcoded paths in templates
- Verify folder structure matches route expectations

### Data Not Persisting
- Check session data variable names
- Ensure form field names match between versions
- Verify route handlers are processing data correctly

## Best Practices

1. **Always copy from the most recent stable version**
2. **Update all version references systematically**
3. **Test thoroughly before marking as complete**
4. **Document what's new in the index page description**
5. **Use descriptive version names that indicate purpose**
6. **Keep the index page organized with newest versions at top**

## File Checklist

When creating a new version, ensure you've updated:

- [ ] All `.js` files in `app/routes/versions/[new-version]/`
- [ ] Version variable in each route file
- [ ] Hardcoded paths in `iat.js` (if present)
- [ ] Template references in view files
- [ ] Route includes in main `app/routes.js`
- [ ] Index page section in `app/views/index.html`
- [ ] Start button href in `start.html` (if present)
- [ ] Syntax check passes
- [ ] Key functionality tested

Generated by Copilot 