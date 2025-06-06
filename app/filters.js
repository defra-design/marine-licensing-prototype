//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

/**
 * Convert month number to month name (1 → January, 2 → February, etc.)
 * Used for formatting dates in GOV.UK style (e.g., "5 May 2025")
 */
addFilter('toMonth', function(month) {
  if (!month) return '';
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Adjust for zero-indexed array (month 1 = January = index 0)
  const monthIndex = parseInt(month, 10) - 1;
  
  // Return month name if valid, otherwise return the original value
  return (monthIndex >= 0 && monthIndex < 12) ? monthNames[monthIndex] : month;
});

// Generated by Copilot

