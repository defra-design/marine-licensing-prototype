# Projects Filter - MOJ Version

**Implementation File:** `app/views/versions/multiple-sites-v2/sample-plans-v2/projects-filter-side-v3.html`  
**Component:** MOJ Filter (side panel layout)  
**Pattern:** Based on [MOJ Design System Filter Component](https://design-patterns.service.justice.gov.uk/components/filter/)

**View Prototype:** [/versions/multiple-sites-v2/sample-plans-v2/projects-filter-side-v3?user_type=organisation&organisation-name=Ramsgate%20Marina](/versions/multiple-sites-v2/sample-plans-v2/projects-filter-side-v3?user_type=organisation&organisation-name=Ramsgate%20Marina)

---

## Overview

A side-panel filter for the Projects page that allows users to filter and find projects using multiple criteria. The filter is visible by default and can be toggled with a "Hide filter" / "Show filter" button.

---

## Filter Criteria

### 1. Show (Scope Filter - Radio Buttons)

Primary filter that determines which projects are displayed:

- **All [Organisation name] projects** *(default)* - Shows all projects in the organisation
- **My projects** - Shows only projects created by the current user (Jon Doe)
- **Projects by a specific person** - Conditionally reveals person checkboxes when selected

**Key Features:**
- Displays dynamic count in brackets, e.g., "All Ramsgate Marina projects (10)"
- Organisation name is pulled from page data
- No filter tags created for these options (they're always active)

### 2. Person Checkboxes *(Conditional Reveal)*

Only visible when "Projects by a specific person" is selected:

- Alex Williams
- James Thompson
- Jon Doe
- Sarah Chen

**Key Features:**
- Multiple people can be selected
- Each person shows their project count in brackets
- Error validation: Must select at least one person when this option is active
- Checkboxes automatically clear when switching to "All projects" or "My projects"
- Conditional panel automatically hides when other options are selected

### 3. Project Name *(Text Input)*

Free text search field:
- Hint: "Can be partial name"
- Case-insensitive partial matching
- Example: Searching "harbour" finds "Plymouth harbour core samples"

### 4. Reference *(Text Input)*

Free text search field:
- Hint: "Can be partial reference"
- Case-insensitive partial matching
- Example: Searching "EXE" finds all exempt activity notifications

### 5. Type *(Dynamically Generated Checkboxes)*

Automatically populated from projects in the table:
- Exempt activity notification (7)
- Sediment sample plan (3)

**Key Features:**
- Options are generated on page load by scanning the table
- Counts update dynamically based on all projects in the dataset
- Multiple types can be selected (OR logic within this filter)

### 6. Status *(Dynamically Generated Checkboxes)*

Automatically populated from projects in the table:
- Draft (3)
- Sent (2)
- Closed (5)

**Key Features:**
- Options are generated on page load by scanning the table
- Counts update dynamically based on all projects in the dataset
- Multiple statuses can be selected (OR logic within this filter)

---

## Filtering Logic

### AND Logic Across Filter Groups

A project must match **ALL** active filter criteria to be displayed:
- Matches the selected scope (Show filter)
- **AND** matches project name (if entered)
- **AND** matches reference (if entered)
- **AND** matches one of the selected types (if any)
- **AND** matches one of the selected statuses (if any)
- **AND** matches one of the selected people (if any)

### OR Logic Within Filter Groups

- **Type:** Project matches ANY selected type
- **Status:** Project matches ANY selected status
- **Person:** Project matches ANY selected person

---

## Selected Filters Display

**Location:** Top of filter panel under "Selected filters" heading

**Format:** Follows MOJ pattern with category headers:

```
Selected filters          Clear filters

Project name
  [harbour ×]

Type
  [Exempt activity notification ×] [Sediment sample plan ×]

Status
  [Draft ×]

Person
  [Alex Williams ×] [Sarah Chen ×]
```

**Features:**
- Category headings (e.g., "Project name", "Type", "Status", "Person")
- Each tag is individually removable (click the × or the tag itself)
- "Clear filters" link resets everything to default state
- Categories only appear when that filter type is active
- Person category only shows when "Projects by a specific person" is selected

---

## Results Display

### Results Count

**Location:** Above the table, below the "Hide filter" button

**Format:** `X results found in '[context]'`

**Examples:**
- "10 results found in 'All Ramsgate Marina projects'"
- "5 results found in 'My projects'"
- "2 results found in 'Projects by Alex Williams, Sarah Chen'"

**Dynamic Updates:**
- Count updates based on currently visible projects after filtering
- Context changes based on selected Show radio
- Shows multiple names when multiple people are selected
- Always visible (unlike the "no results" message which only shows when count is zero)

---

## Error Handling

### Person Selection Error

**Trigger:** When "Projects by a specific person" is selected but no person is checked, and user clicks "Apply filters"

**Visual Indicators:**
1. Error message appears in the conditional panel: "Select a person to view their projects"
2. Conditional panel gets red left border (`error-state` class)
3. Results count shows error in bold red: **"Select a person to view their projects"**
4. Table is hidden

**Error Clears When:**
- User selects a person checkbox
- User switches to different Show option
- User clicks Clear filters

---

## User Interactions

### Apply Filters Button

- Full-width green button at top of filter panel
- Validates and applies all selected filters
- Checks for error conditions (e.g., no person selected)
- Updates the table and results count
- Only triggers error validation when clicked (not on page load)

### Clear Filters

**Resets all filters to default state:**
- Show: "All [Organisation] projects"
- All text inputs cleared
- All checkboxes unchecked
- Person conditional panel hidden
- Re-displays all projects
- Does not trigger error validation

### Hide/Show Filter Toggle

- Button above the table
- Shows "Hide filter" when filter is visible
- Shows "Show filter" when filter is hidden
- Filter is visible by default on page load
- Attribute: `aria-expanded` tracks state for accessibility

### Individual Tag Removal

- Click any tag in "Selected filters" to remove just that filter
- Automatically re-filters the table (without error validation)
- If last person is removed, automatically switches to "All projects"
- Provides immediate feedback without clicking "Apply filters"

---

## Accessibility Features

### 1. ARIA Labels

- Filter toggle uses `aria-expanded` and `aria-controls`
- Conditional reveal uses `data-aria-controls`
- Tags include visually hidden "Remove this filter" text for screen readers

### 2. Error Messages

- Error text includes visually hidden "Error:" prefix
- Error states use semantic HTML and ARIA
- Error styling follows GOV.UK Design System patterns

### 3. Keyboard Navigation

- All controls are keyboard accessible
- Tags are links (keyboard navigable with Enter key)
- Buttons and form controls follow standard patterns
- Tab order is logical and predictable

### 4. Screen Reader Support

- Table caption is visually hidden but available to screen readers
- Count badges are read as part of label text
- Filter state changes are announced
- Error messages are properly associated with form controls

---

## Technical Implementation

### Dynamic Data

**Type and Status Checkboxes:**
- Generated from `data-type` and `data-status` attributes on table rows
- Uses JavaScript `Set` to extract unique values
- Counts calculated by scanning all projects on page load

**Person Counts:**
- Based on `data-creator` attribute on table rows
- Matches creator slugs to display names
- "My projects" count shows projects by current user (jon-doe)

### State Management

- All filtering happens client-side with JavaScript
- No page reload required
- Table rows show/hide based on `display` style property
- Filter state is not persisted (resets on page refresh)

### Required Data Attributes

Each table row must include:
- `data-creator`: Creator slug (e.g., "jon-doe", "alex-williams")
- `data-type`: Full type name (e.g., "Exempt activity notification")
- `data-status`: Status value (e.g., "Draft", "Closed", "Sent")

### JavaScript Functions

**Key Functions:**
- `updateCounts()` - Scans table and updates all count badges
- `generateDynamicCheckboxes()` - Creates Type and Status checkboxes
- `filterProjects(checkForErrors)` - Main filtering logic with optional validation
- `updateSelectedFilterTags()` - Builds the selected filters display with categories
- `updateResultsCount(visibleCount, isError)` - Updates results text above table
- `clearErrorState()` / `showErrorState()` - Manages error UI

---

## Design Pattern Compliance

✅ Based on MOJ Design System Filter component  
✅ Follows GOV.UK Design System form patterns  
✅ WCAG 2.1 AA compliant  
✅ Mobile responsive (MOJ filter layout)  
✅ Progressive enhancement ready  

---

## Browser Compatibility

**Tested with:**
- Chrome/Edge (Chromium)
- Firefox
- Safari

**JavaScript Requirements:**
- ES6 features used (arrow functions, template literals, Sets)
- No polyfills required for modern browsers
- Graceful degradation: Without JavaScript, all projects are visible

---

## Related Documentation

- [MOJ Design System - Filter Component](https://design-patterns.service.justice.gov.uk/components/filter/)
- [MOJ Design System - Filter a List Pattern](https://design-patterns.service.justice.gov.uk/patterns/filter-a-list/)
- [GOV.UK Design System - Checkboxes](https://design-system.service.gov.uk/components/checkboxes/)
- [GOV.UK Design System - Radios](https://design-system.service.gov.uk/components/radios/)
- [GOV.UK Design System - Text Input](https://design-system.service.gov.uk/components/text-input/)

---

## Version History

**Current Version:** v3 (projects-filter-side-v3.html)

**Key Features Added in v3:**
- Dynamic Type and Status checkbox generation
- Project counts in brackets for all filter options
- Categorized selected filters display (MOJ pattern)
- Results count above table with context
- Full-width Apply filters button
- Improved error handling with validation
- Auto-clearing of person checkboxes when switching Show options
- Auto-hiding of conditional panel when not needed

---

## Future Enhancements

Potential improvements for consideration:

1. **Persistence:** Save filter state to session storage
2. **URL Parameters:** Encode filters in URL for bookmarking/sharing
3. **Advanced Search:** Add date range filters
4. **Sorting Integration:** Coordinate with sortable table headers
5. **Export Filtered Results:** Download filtered project list
6. **Filter Presets:** Save commonly used filter combinations

---

## Support

For questions or issues with this component:
- Check the [MOJ Design System documentation](https://design-patterns.service.justice.gov.uk/)
- Review related implementation guides in the `/docs` folder
- Contact the development team

---

**Last Updated:** November 2025

