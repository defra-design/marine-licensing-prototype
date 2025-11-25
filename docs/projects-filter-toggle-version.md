# Projects Filter - Horizontal Toggle Version

**Implementation File:** `app/views/versions/multiple-sites-v2/sample-plans-v2/projects-filter-button-v2.html`  
**Component:** Toggle-based Filter Panel (horizontal layout)  
**Pattern:** Based on [MOJ Design System Filter Component](https://design-patterns.service.justice.gov.uk/components/filter/)

**View Prototype:** [/versions/multiple-sites-v2/sample-plans-v2/projects-filter-button-v2?user_type=organisation&organisation-name=Ramsgate%20Marina](/versions/multiple-sites-v2/sample-plans-v2/projects-filter-button-v2?user_type=organisation&organisation-name=Ramsgate%20Marina)

---

## Overview

A toggle-based filter for the Projects page that displays filters in a horizontal, expandable panel with responsive grid layout. The filter is visible by default and can be toggled with a "Hide filters" / "Show filters" button. When hidden, active filters display as tags below the toggle button.

### Key Differences from Side Panel Version

- **Layout:** Horizontal panel instead of side panel
- **Toggle Button:** Secondary button above content (not integrated with content area)
- **Filter Panel:** Grey background panel with responsive grid layout
- **Grid System:** Automatically adjusts from 1-4 columns based on screen width
- **Filter Tags:** Display below button when panel is hidden (space-saving design)
- **Visual Design:** Grey background for filters, white input backgrounds

---

## Visual Layout

### Expanded State (Default)

```
┌─────────────────────────────────────────────────────┐
│ [Hide filters] ◄── Secondary button                 │
├─────────────────────────────────────────────────────┤
│                  GREY PANEL                         │
│ ┌──────────┬──────────┬──────────┬──────────┐      │
│ │ Show     │ Project  │ Type     │ Status   │      │
│ │ (radios) │ name     │ (checks) │ (checks) │      │
│ └──────────┴──────────┴──────────┴──────────┘      │
│ ┌──────────┬──────────────────────────────────┐    │
│ │ Reference│ [Apply filters] [Clear filters]  │    │
│ └──────────┴──────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
10 results found in 'All Ramsgate Marina projects'
┌─────────────────────────────────────────────────────┐
│                    TABLE                            │
└─────────────────────────────────────────────────────┘
```

### Collapsed State

```
┌─────────────────────────────────────────────────────┐
│ [Show filters] ◄── Secondary button                 │
├─────────────────────────────────────────────────────┤
│ [Project name: harbour ×] [Type: Draft ×]          │ ◄── Filter tags
└─────────────────────────────────────────────────────┘
10 results found in 'All Ramsgate Marina projects'
┌─────────────────────────────────────────────────────┐
│                    TABLE                            │
└─────────────────────────────────────────────────────┘
```

---

## Responsive Grid Layout

The filter panel uses CSS Grid to automatically adjust columns based on screen width:

### Mobile (≤600px)
- **1 column** - All filters stacked vertically
- Minimum filter width: Full width
- Filter actions appear below all filters

### Tablet (601px - 1150px)
- **2 columns** - Side-by-side layout
- Minimum filter width: 260px per column
- Better use of horizontal space

### Desktop (≥1151px)
- **4 columns** - Maximum horizontal layout
- Minimum filter width: 260px per column
- Optimal for wide screens
- Filter actions span full width at bottom

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
- Occupies first grid column in desktop view

### 2. Person Checkboxes *(Conditional Reveal)*

Only visible when "Projects by a specific person" is selected:

- Alex Williams
- James Thompson
- Jon Doe
- Sarah Chen

**Key Features:**
- Multiple people can be selected
- Error validation: Must select at least one person when this option is active
- Checkboxes automatically clear when switching to "All projects" or "My projects"
- Error message displayed above checkboxes in conditional panel

### 3. Project Name *(Text Input)*

Free text search field:
- Hint: "Can be partial name"
- Case-insensitive partial matching
- Example: Searching "harbour" finds "Plymouth harbour core samples"
- Occupies second grid column in desktop view

### 4. Reference *(Text Input)*

Free text search field:
- Hint: "Can be partial reference"
- Case-insensitive partial matching
- Example: Searching "EXE" finds all exempt activity notifications
- Appears in second row on desktop, first column

### 5. Type *(Dynamically Generated Checkboxes)*

Automatically populated from projects in the table:
- Exempt activity notification (7)
- Sediment sample plan (3)

**Key Features:**
- Options are generated on page load by scanning the table
- Multiple types can be selected (OR logic within this filter)
- Occupies third grid column in desktop view

### 6. Status *(Dynamically Generated Checkboxes)*

Automatically populated from projects in the table:
- Draft (3)
- Sent (2)
- Closed (5)

**Key Features:**
- Options are generated on page load by scanning the table
- Multiple statuses can be selected (OR logic within this filter)
- Occupies fourth grid column in desktop view

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

## Filter Tags Display

### Location
- **When Panel is Hidden:** Tags appear below the "Show filters" button
- **When Panel is Visible:** Tags are hidden (filters are visible in panel)

### Format

```
[Project name: harbour ×] [Reference: EXE ×] 
[Type: Draft ×] [Status: Closed ×] 
[Projects by: Alex Williams ×]
```

**Features:**
- Inline display with label prefixes (e.g., "Project name:", "Type:")
- Each tag is individually removable (click the × or the tag itself)
- Uses button elements for accessibility
- Custom styling with grey background and border
- Hover state: Black background with white text
- Focus state: Yellow outline (GOV.UK standard)
- SVG × icon for removal
- Tags automatically hide when panel is expanded
- Tags automatically show when panel is collapsed

---

## Results Display

### Results Count

**Location:** Above the table, below the filter panel/tags

**Format:** `X results found in '[context]'`

**Examples:**
- "10 results found in 'All Ramsgate Marina projects'"
- "5 results found in 'My projects'"
- "2 results found in 'Projects by Alex Williams, Sarah Chen'"

**Dynamic Updates:**
- Count updates based on currently visible projects after filtering
- Context changes based on selected Show radio
- Shows multiple names when multiple people are selected
- Always visible regardless of filter panel state

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

### Toggle Filter Panel

**Button States:**
- **Expanded (default):** Shows "Hide filters"
- **Collapsed:** Shows "Show filters"

**When Hiding Panel:**
1. Panel collapses (hidden attribute added)
2. Button text changes to "Show filters"
3. Button wrapper class updated
4. Filter tags appear below button (if any active filters)
5. `aria-expanded="false"` for accessibility

**When Showing Panel:**
1. Panel expands (hidden attribute removed)
2. Button text changes to "Hide filters"
3. Button wrapper class updated
4. Filter tags hide
5. `aria-expanded="true"` for accessibility

### Apply Filters Button

- Green primary button in filter actions area
- Spans full width in grid layout (grid-column: 1 / -1)
- Validates and applies all selected filters
- Checks for error conditions (e.g., no person selected)
- Updates the table and results count
- Only triggers error validation when clicked

### Clear Filters

**Link-styled control next to Apply filters button**

**Resets all filters to default state:**
- Show: "All [Organisation] projects"
- All text inputs cleared
- All checkboxes unchecked
- Re-displays all projects
- Does not trigger error validation
- Removes all filter tags

### Individual Tag Removal

- Click any tag to remove just that specific filter
- Automatically re-filters the table (without error validation)
- Tag disappears immediately
- If last person is removed, automatically switches to "All projects"
- Provides immediate visual feedback

---

## Accessibility Features

### 1. ARIA Labels

- Toggle button uses `aria-expanded` and `aria-controls`
- Panel state properly announced to screen readers
- Conditional reveal uses GOV.UK pattern
- Tags are buttons (keyboard accessible)
- SVG icons marked as `aria-hidden="true"` (decorative)

### 2. Error Messages

- Error text includes visually hidden "Error:" prefix
- Error states use semantic HTML and ARIA
- Error styling follows GOV.UK Design System patterns
- Conditional panel error announced to screen readers

### 3. Keyboard Navigation

- Toggle button: Space/Enter to activate
- All form controls: Standard keyboard navigation
- Tags: Enter to remove (button elements)
- Tab order is logical within grid layout
- Focus management when panel expands/collapses

### 4. Screen Reader Support

- Table caption is visually hidden but available
- Panel state changes are announced
- Error messages are properly associated
- Filter count changes are announced via results text

### 5. Focus Management

- Focus state visible on all interactive elements
- Yellow outline on focus (GOV.UK standard)
- Focus doesn't move when panel toggles
- Tags maintain focus on removal if possible

---

## Technical Implementation

### Dynamic Data

**Type and Status Checkboxes:**
- Generated from `data-type` and `data-status` attributes on table rows
- Uses JavaScript `Set` to extract unique values
- Dynamically created on page load with proper GOV.UK styling

**Person Counts:**
- Based on `data-creator` attribute on table rows
- Matches creator slugs to display names
- "My projects" count shows projects by current user (jon-doe)

### State Management

- All filtering happens client-side with JavaScript
- No page reload required
- Table rows show/hide based on `display` style property
- Panel visibility controlled by `hidden` attribute
- Tag container visibility controlled by CSS class

### Required Data Attributes

Each table row must include:
- `data-creator`: Creator slug (e.g., "jon-doe", "alex-williams")
- `data-project-name`: Full project name for text matching
- `data-type`: Full type name (e.g., "Exempt activity notification")
- `data-reference`: Full reference code (e.g., "EXE/2025/10002")
- `data-status`: Status value (e.g., "Draft", "Closed", "Sent")

### JavaScript Functions

**Key Functions:**
- `buildTypeCheckboxes()` - Generates Type checkboxes from table data
- `buildStatusCheckboxes()` - Generates Status checkboxes from table data
- `buildFilterTags()` - Creates filter tags with label prefixes
- `filterProjects(checkForErrors)` - Main filtering logic with optional validation
- `removeFilter(type, value)` - Removes individual filter and re-filters
- `updateResultsCount(visibleCount, isError)` - Updates results text above table
- `clearErrorState()` / `showErrorState()` - Manages error UI

**Toggle Button Handler:**
- Manages panel visibility
- Updates button text and ARIA
- Shows/hides filter tags appropriately
- Updates wrapper class for spacing

---

## CSS Grid Implementation

### Grid Container

```css
.filter-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  column-gap: 30px;
  align-items: start;
}
```

### Filter Actions

```css
.filter-actions {
  grid-column: 1 / -1; /* Spans all columns */
  margin-top: 10px;
}
```

### Responsive Breakpoints

- **Mobile (≤600px):** 1 column
- **Tablet (601px - 1150px):** 2 columns
- **Desktop (≥1151px):** 4 columns

### White Input Backgrounds

All form inputs have white backgrounds to stand out against the grey panel:

```css
.filter-panel .govuk-radios__label::before,
.filter-panel .govuk-checkboxes__label::before {
  background-color: #ffffff !important;
}
```

---

## Design Pattern Compliance

✅ Based on MOJ Design System Filter component  
✅ Follows GOV.UK Design System form patterns  
✅ WCAG 2.1 AA compliant  
✅ Fully responsive with mobile-first approach  
✅ Progressive enhancement ready  
✅ Keyboard accessible throughout  

---

## Performance Considerations

### Grid Layout Benefits

1. **Automatic Reflow:** Grid automatically adjusts to screen width
2. **No JavaScript Required:** Layout handled by CSS
3. **Touch-Friendly:** Adequate spacing on mobile devices
4. **Print-Friendly:** Collapses to single column for printing

### Client-Side Filtering

- Fast response time (no server round-trip)
- Immediate visual feedback
- Works offline once page is loaded
- Suitable for datasets up to ~1000 rows

---

## Browser Compatibility

**Tested with:**
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

**CSS Grid Support:**
- All modern browsers
- IE11 not supported (falls back to single column)

**JavaScript Requirements:**
- ES6 features used (arrow functions, template literals, Sets)
- No polyfills required for modern browsers

---

## Related Documentation

- [MOJ Design System - Filter Component](https://design-patterns.service.justice.gov.uk/components/filter/)
- [MOJ Design System - Filter a List Pattern](https://design-patterns.service.justice.gov.uk/patterns/filter-a-list/)
- [GOV.UK Design System - Checkboxes](https://design-system.service.gov.uk/components/checkboxes/)
- [GOV.UK Design System - Radios](https://design-system.service.gov.uk/components/radios/)
- [GOV.UK Design System - Text Input](https://design-system.service.gov.uk/components/text-input/)
- [GOV.UK Design System - Button](https://design-system.service.gov.uk/components/button/)
- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## Comparison with Side Panel Version

| Feature | Toggle Version (v2) | Side Panel Version (v3) |
|---------|-------------------|------------------------|
| **Layout** | Horizontal expandable panel | Vertical side panel |
| **Toggle** | Secondary button above content | Show/Hide filter button |
| **Grid** | Responsive 1-4 columns | Single column, fixed width |
| **Filter Tags** | Below button when hidden | Inside panel with headings |
| **Background** | Grey panel (#f3f2f1) | White background |
| **Space Usage** | Collapses to save space | Always visible, takes sidebar |
| **Tag Style** | Inline with labels | Categorized with headings |
| **Mobile** | Excellent (stacks vertically) | Good (side panel collapses) |
| **Desktop** | Wide layouts use horizontal space | Narrow sidebar preserves content width |

### When to Use Each Version

**Use Toggle Version (v2) When:**
- Screen space is at a premium
- Users frequently toggle filters on/off
- Content width is important
- You want filters hidden by default
- Horizontal layout suits your design

**Use Side Panel Version (v3) When:**
- Persistent filter visibility is desired
- You have narrow content areas
- Following strict MOJ patterns
- Users constantly adjust filters
- You want categorized filter display

---

## Future Enhancements

Potential improvements for consideration:

1. **Persistence:** Save panel state (expanded/collapsed) to session storage
2. **URL Parameters:** Encode filters in URL for bookmarking/sharing
3. **Animation:** Smooth transition when expanding/collapsing panel
4. **Advanced Filters:** Add date range, location, or custom fields
5. **Filter Presets:** Quick select for common filter combinations
6. **Export Functionality:** Download filtered results as CSV/Excel
7. **Column Count Control:** User preference for grid columns
8. **Sticky Toggle:** Keep toggle button visible when scrolling

---

## Support

For questions or issues with this component:
- Check the [MOJ Design System documentation](https://design-patterns.service.justice.gov.uk/)
- Review the side panel version documentation: `docs/projects-filter-moj-version.md`
- Review related implementation guides in the `/docs` folder
- Contact the development team

---

**Last Updated:** November 2025  
**Version:** 2.0 (projects-filter-button-v2.html)

