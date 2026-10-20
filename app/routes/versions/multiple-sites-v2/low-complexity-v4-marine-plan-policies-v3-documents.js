// Shared helpers for Marine plan policies v3 supporting documents.
// Not a route file – required by low-complexity-v4.js (to expose the summary
// to every v4 page), the v3 MPP routes and the allTasksComplete helpers.

// The five policies with real pages, in the order they appear on the MPP index
const MPP_V3_POLICIES = [
  { key: 's-agg-4', page: 'south-aggregates-4', code: 'S-AGG-4', name: 'South Aggregates 4' },
  { key: 's-bio-1', page: 'south-biodiversity-1', code: 'S-BIO-1', name: 'South Biodiversity 1' },
  { key: 's-uwn-2', page: 'south-underwater-noise-2', code: 'S-UWN-2', name: 'South Underwater noise 2' },
  { key: 's-acc-1', page: 'south-access-1', code: 'S-ACC-1', name: 'South Access 1' },
  { key: 's-emp-1', page: 'south-employment-1', code: 'S-EMP-1', name: 'South Employment 1' }
];

const MPP_V3_DOCUMENT_CATEGORIES = [
  'Ecological Assessment',
  'Habitats Regulations Assessment',
  'Water Quality Assessment',
  'Navigational Risk Assessment',
  'Coastal Processes Assessment',
  'Fisheries Assessment',
  'Heritage Assessment',
  'Technical or Engineering Report',
  'Environmental Assessment',
  'Other supporting evidence'
];

// Checkbox values arrive as 'yes' or ['yes'] depending on how they were stored
function isFlagged(data, key) {
  const value = data['marine-plan-policy-v3-' + key + '-evidence'];
  return value === 'yes' || (Array.isArray(value) && value.includes('yes'));
}

function getDocuments(data) {
  return data['mpp-v3-documents'] || [];
}

// "S-BIO-1", "S-BIO-1 and S-UWN-2", "S-AGG-4, S-BIO-1 and S-UWN-2"
function joinCodes(policies) {
  const codes = policies.map(p => p.code);
  if (codes.length <= 1) return codes.join('');
  return codes.slice(0, -1).join(', ') + ' and ' + codes[codes.length - 1];
}

// Everything the templates need to show supporting document status
function summarise(data) {
  const documents = getDocuments(data);
  const flagged = MPP_V3_POLICIES.filter(p => isFlagged(data, p.key));

  // Linked documents per policy key: [{ id, filename, location }]
  const byPolicy = {};
  MPP_V3_POLICIES.forEach(p => { byPolicy[p.key] = []; });
  documents.forEach(doc => {
    (doc.policies || []).forEach(link => {
      if (byPolicy[link.key]) {
        byPolicy[link.key].push({ id: doc.id, filename: doc.filename, location: link.location });
      }
    });
  });

  const missing = flagged.filter(p => byPolicy[p.key].length === 0);

  let status = 'not-started';
  if (flagged.length > 0 && missing.length === 0) {
    status = 'completed';
  } else if (documents.length > 0) {
    status = 'in-progress';
  }

  return {
    documents: documents,
    flagged: flagged,
    flaggedCodes: joinCodes(flagged),
    byPolicy: byPolicy,
    missing: missing,
    missingCodes: joinCodes(missing),
    status: status,
    // True when no flagged policy is waiting for a document
    docsComplete: missing.length === 0
  };
}

module.exports = {
  MPP_V3_POLICIES,
  MPP_V3_DOCUMENT_CATEGORIES,
  isFlagged,
  getDocuments,
  summarise
};
