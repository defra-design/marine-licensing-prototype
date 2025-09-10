// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images

window.GOVUKPrototypeKit.documentReady(() => {
  // Only run on the filter-disposal-sites page (table id presence check)
  if (!document.getElementById('filter-disposal-sites-table-body')) {
    return
  }

  // Dataset: copied from application.js (disposalSites array)
  const disposalSites = [
    { code: 'DG025', name: 'Dogger Bank Teeside B', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'DG031', name: 'Dogger Bank A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'DG032', name: 'Dogger Bank B', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'DV010', name: 'DOVER', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'DV011', name: 'DOVER - EMERGENCY SITE', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'DV031', name: 'Lydd Ranges', country: 'England', seaArea: 'English Channel', status: 'Open' },
    { code: 'DV040', name: 'EASTBOURNE', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'DV046', name: 'Eastbourne Frontage', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'HU015', name: 'BRIDLINGTON A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU020', name: 'HUMBER 4B/HOOK', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU021', name: 'Humber 4B/Hook Extension', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
    { code: 'HU030', name: 'HUMBER 4', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU040', name: 'WHITGIFT BIGHT (RIVER OUSE)', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU041', name: 'GOOLE REACH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU056', name: 'Holme Channel Deep', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
    { code: 'HU060', name: 'HUMBER 3A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU075', name: 'Oldfleet Drain', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU080', name: 'HUMBER 1A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU090', name: 'HUMBER 2', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU143', name: 'WEST STONES', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU150', name: 'GREAT YARMOUTH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU152', name: 'Wells outer harbour site A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU154', name: 'Wells outer harbour site C', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU156', name: 'Well Beneficial use site2', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU157', name: 'Wells Outer Harbour B1', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
    { code: 'HU159', name: 'Reedham Marina', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU170', name: 'BOSTON 7', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU205', name: 'Hornsea Disposal Area 1', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU208', name: 'Burgh Castle Yacht Station', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU212', name: 'EAOW3', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'HU213', name: 'Norfolk Vanguard ECC 1', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'LU010', name: 'PADSTOW BAY', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU068', name: 'Clevedon Lake', country: 'ENGLAND', seaArea: 'Lundy', status: 'Disused' },
    { code: 'LU070', name: 'PORTISHEAD', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU080', name: 'AVONMOUTH (INNER)', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU084', name: 'ROYAL PORTBURY PIER', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU085', name: 'ROYAL EDWARD ENTRANCE', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU163', name: 'Erebus OWF Cable Site 5', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU164', name: 'Erebus OWF Cable Site 4', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU165', name: 'Erebus OWF Cable Site 3', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Closed' },
    { code: 'LU166', name: 'Erebus OWF Cable Site 2', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU167', name: 'Erebus OWF Cable Site 1', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'LU193', name: 'Weston Foreshore 3', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
    { code: 'PL031', name: 'RAME HEAD SOUTH', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PL035', name: 'Plymouth Deep', country: 'ENGLAND', seaArea: 'English Channel', status: 'Disused' },
    { code: 'PL060', name: 'LANTIC BAY', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PL069', name: 'Truro', country: 'England', seaArea: 'Eastern Channel', status: 'Open' },
    { code: 'PL075', name: 'FALMOUTH BAY (B)', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PL100', name: 'MOUNTS BAY', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PO015', name: 'West Cliff Beach', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PO016', name: 'West Beach', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PO026', name: 'Seaton', country: 'England', seaArea: 'North Sea', status: 'Closed' },
    { code: 'PO050', name: 'LYME BAY 2', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PO070', name: 'SPREY POINT', country: 'ENGLAND', seaArea: 'English Channel', status: 'Disused' },
    { code: 'PO111', name: 'Deep Water Relocation', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'PO112', name: 'Portland Harbour Deep Water Relocation', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'TH005', name: 'LOWESTOFT CIRCULAR NORTH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
    { code: 'TH011', name: 'Lowestoft Marina Temporary Disposal Site', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH017', name: 'Five Estuaries N Array', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH018', name: 'Five Estuaries S Array', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH019', name: 'Five Estuaries ECC', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH023', name: 'East Anglia One', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH027', name: 'Harwich Haven', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
    { code: 'TH029', name: 'NeuConnect Disposal Site 3', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH032', name: 'Orwell Yacht Club', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH034', name: 'RIVER ORWELL (ABP)', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH052', name: 'INNER GABBARD', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH056', name: 'INNER GABBARD EAST', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH058', name: 'Northey Island', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH059', name: 'NeuConnect Disposal Site 1', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH064', name: 'Maldon Saltings 3', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
    { code: 'TH067', name: 'NeuConnect Disposal Site 2', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH068', name: 'NeuConnect South Site', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH069', name: 'NeuConnect Lower Mid Site', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH070', name: 'SOUTH FALLS', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH073', name: 'WHITSTABLE C', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH074', name: 'NeuConnect Upper Mid Site', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH081', name: 'Mercator Disposal', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH096', name: 'Putney Embankment', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
    { code: 'TH099', name: 'Tilbury Tunnel outfall', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH140', name: 'PEGWELL BAY', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH150', name: 'Nemo Disposal Site A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH151', name: 'Nemo Disposal Site B', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH153', name: 'TEOW Disposal site 1', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH154', name: 'TEOW Disposal site 2', country: 'England', seaArea: 'North Sea', status: 'Closed' },
    { code: 'TH155', name: 'TEOW Disposal site 3', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH156', name: 'Gridlink East Site', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH157', name: 'Gridlink West Site', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH213', name: 'WRABNESS BEACH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH216', name: 'COPPERAS', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH217', name: 'ERWARTON TRACK', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH218', name: 'ORWELL WEST TRACK', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH219', name: 'ORWELL EAST TRACK', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH220', name: 'EA One Route EC-1', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH223', name: 'EA One Route EC-4', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH224', name: 'EA One Route EC-5', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH225', name: 'Levington Site 1', country: 'England', seaArea: 'North Sea', status: 'Disused' },
    { code: 'TH226', name: 'Levington Site 2', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH227', name: 'Levington Site 3', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH228', name: 'Levington Site 4', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH229', name: 'Wrabness Beach East', country: 'England', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH230', name: 'Horsey', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH231', name: 'Shotley Marina', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH232', name: 'Levington Creek', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TH233', name: 'Copperas Bay 3', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'TY025', name: 'COQUET ISLAND', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY042', name: 'BLYTH A + B', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
    { code: 'TY043', name: 'Blyth OWF Demo', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY070', name: 'NORTH TYNE', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY081', name: 'SOUTER POINT (OUTER)', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY090', name: 'SUNDERLAND', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY130', name: 'NOSES POINT', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY150', name: 'TEES BAY C', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY157', name: 'Tees Upriver', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
    { code: 'TY158', name: 'Teesport dock and Tees Container Terminal', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY160', name: 'TEES BAY A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY180', name: 'WHITBY', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY181', name: 'CLEVELAND POTASH OUTFALL', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY190', name: 'SCARBOROUGH ROCK', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
    { code: 'TY194', name: 'BEDE QUAY', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
    { code: 'WI010', name: 'NEWHAVEN', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'WI020', name: 'BRIGHTON/ ROTTINGDEAN', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'WI021', name: 'Brighton B', country: 'ENGLAND', seaArea: 'English Channel', status: 'Disused' },
    { code: 'WI029', name: 'Emerald Quay, R Adur', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'WI031', name: 'SHOREHAM', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
    { code: 'WI042', name: 'Birdham Pool Marina', country: 'ENGLAND', seaArea: 'English Channel', status: 'Closed' },
    { code: 'WI046', name: 'TRELOAR HOLE', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' }
  ]

  const marineAreas = [
    'Any',
    'Atlantic',
    'Bristol Channel',
    'Eastern Channel',
    'English Channel',
    'Hebrides Sea',
    'Humber',
    'Irish Sea',
    'Lundy',
    'Main Sea',
    'North Sea',
    'Thames'
  ]

  const resultsPerPage = 20
  let workingSet = [...disposalSites]
  let currentSort = { column: 'code', direction: 'asc' }

  // Initialize accessible autocomplete for marine area
  if (typeof accessibleAutocomplete !== 'undefined') {
    const container = document.querySelector('#filter-marine-area-autocomplete-container')
    if (container) {
      const hiddenInput = document.createElement('input')
      hiddenInput.type = 'hidden'
      hiddenInput.name = 'filter-marine-area'
      hiddenInput.id = 'filter-marine-area-hidden'
      container.parentNode.appendChild(hiddenInput)

      accessibleAutocomplete({
        element: container,
        id: 'filter-marine-area-autocomplete',
        source: marineAreas,
        minLength: 1,
        showAllValues: true,
        confirmOnBlur: false,
        autoselect: true,
        onConfirm: function (value) {
          hiddenInput.value = value || ''
        }
      })

      setTimeout(() => {
        const input = document.querySelector('#filter-marine-area-autocomplete')
        if (input) {
          input.addEventListener('input', function (e) {
            hiddenInput.value = e.target.value || ''
          })
        }
      }, 100)
    }
  }

  function getCriteria () {
    const code = (document.getElementById('filter-code')?.value || '').trim()
    const name = (document.getElementById('filter-name')?.value || '').trim()
    const location = (document.querySelector('input[name="filter-location"]:checked')?.value || 'Any')
    const marineArea = (document.getElementById('filter-marine-area-hidden')?.value || '').trim()
    return { code, name, location, marineArea }
  }

  function filterSites (criteria) {
    let result = [...disposalSites]
    if (criteria.code) {
      const c = criteria.code.toLowerCase()
      result = result.filter(s => s.code.toLowerCase().includes(c))
    }
    if (criteria.name) {
      const n = criteria.name.toLowerCase()
      result = result.filter(s => s.name.toLowerCase().includes(n))
    }
    if (criteria.location && criteria.location !== 'Any') {
      const l = criteria.location.toLowerCase()
      result = result.filter(s => s.country.toLowerCase() === l)
    }
    if (criteria.marineArea) {
      const m = criteria.marineArea.toLowerCase()
      result = result.filter(s => s.seaArea.toLowerCase().includes(m))
    }
    return result
  }

  function sortWorkingSet (column, direction) {
    workingSet.sort((a, b) => {
      let aVal = a[column]
      let bVal = b[column]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (direction === 'asc') return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    })
  }

  function updateSortHeaders () {
    const headers = document.querySelectorAll('#filter-disposal-sites-table thead th')
    const columnMap = { 0: 'code', 1: 'name', 2: 'country', 3: 'seaArea', 4: 'status' }
    headers.forEach((h, i) => {
      const col = columnMap[i]
      if (!col) return
      h.removeAttribute('aria-sort')
      if (currentSort.column === col) {
        h.setAttribute('aria-sort', currentSort.direction === 'asc' ? 'ascending' : 'descending')
      } else {
        h.setAttribute('aria-sort', 'none')
      }
    })
  }

  function getStatusTag (status) {
    let classes = 'govuk-tag'
    if (status === 'Open') classes += ' govuk-tag--green'
    else if (status === 'Closed') classes += ' govuk-tag--red'
    else if (status === 'Disused') classes += ' govuk-tag--yellow'
    return `<span class="${classes}">${status}</span>`
  }

  function populateTable (page) {
    const tbody = document.getElementById('filter-disposal-sites-table-body')
    const totalResults = workingSet.length
    const tableContainer = document.querySelector('#filter-disposal-sites-table').closest('.govuk-table-overflow')

    if (totalResults === 0) {
      if (tableContainer) tableContainer.style.display = 'none'
      document.getElementById('results-summary').textContent = ''
      document.getElementById('results-count').innerHTML = 'We found <strong id="total-results">0</strong> disposal sites.'
      tbody.innerHTML = ''
      document.getElementById('filter-pagination-nav').innerHTML = ''
      return
    } else {
      if (tableContainer) tableContainer.style.display = 'block'
    }

    const startIndex = (page - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    const slice = workingSet.slice(startIndex, endIndex)

    tbody.innerHTML = ''
    slice.forEach(site => {
      const tr = document.createElement('tr')
      tr.className = 'govuk-table__row'
      tr.innerHTML = `
        <td class="govuk-table__cell">${site.code}</td>
        <td class="govuk-table__cell">${site.name}</td>
        <td class="govuk-table__cell">${site.country}</td>
        <td class="govuk-table__cell">${site.seaArea}</td>
        <td class="govuk-table__cell">${getStatusTag(site.status)}</td>
        <td class="govuk-table__cell">
          <a class="govuk-link govuk-link--no-visited-state govuk-!-white-space-nowrap" href="review-disposal-site-details?code=${encodeURIComponent(site.code)}&name=${encodeURIComponent(site.name)}&country=${encodeURIComponent(site.country)}&seaArea=${encodeURIComponent(site.seaArea)}&status=${encodeURIComponent(site.status)}">Select</a>
        </td>`
      tbody.appendChild(tr)
    })

    const startRes = startIndex + 1
    const endRes = Math.min(endIndex, totalResults)
    document.getElementById('results-summary').textContent = `Showing ${startRes} to ${endRes} of ${totalResults} results.`
    document.getElementById('results-count').innerHTML = `We found <strong id="total-results">${totalResults}</strong> disposal sites.`
  }

  function generatePagination (currentPage) {
    const nav = document.getElementById('filter-pagination-nav')
    const totalResults = workingSet.length
    const totalPages = Math.ceil(totalResults / resultsPerPage)
    if (totalResults === 0 || totalPages <= 1) {
      nav.innerHTML = ''
      return
    }

    let html = ''
    if (currentPage > 1) {
      html += `
      <div class="govuk-pagination__prev">
        <a class="govuk-link govuk-pagination__link" href="?page=${currentPage - 1}" rel="prev" data-page="${currentPage - 1}">
          <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"><path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path></svg>
          <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
        </a>
      </div>`
    }

    html += '<ul class="govuk-pagination__list">'
    const totalPagesToShow = totalPages
    function pageItem (i, current) {
      if (current) {
        return `<li class="govuk-pagination__item govuk-pagination__item--current"><a class="govuk-link govuk-pagination__link" href="?page=${i}" aria-label="Page ${i}" aria-current="page" data-page="${i}">${i}</a></li>`
      }
      return `<li class="govuk-pagination__item"><a class="govuk-link govuk-pagination__link" href="?page=${i}" aria-label="Page ${i}" data-page="${i}">${i}</a></li>`
    }

    // Show first
    html += pageItem(1, currentPage === 1)

    if (totalPagesToShow > 5) {
      let startPage = 2
      let endPage = totalPagesToShow - 1
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPagesToShow - 1)
      } else if (currentPage >= totalPagesToShow - 2) {
        startPage = Math.max(totalPagesToShow - 3, 2)
      } else {
        startPage = currentPage - 1
        endPage = currentPage + 1
      }
      if (startPage > 2) html += '<li class="govuk-pagination__item govuk-pagination__item--ellipses">⋯</li>'
      for (let i = startPage; i <= endPage; i++) html += pageItem(i, i === currentPage)
      if (endPage < totalPagesToShow - 1) html += '<li class="govuk-pagination__item govuk-pagination__item--ellipses">⋯</li>'
    } else {
      for (let i = 2; i <= totalPagesToShow - 1; i++) html += pageItem(i, i === currentPage)
    }

    if (totalPagesToShow > 1) html += pageItem(totalPagesToShow, currentPage === totalPagesToShow)
    html += '</ul>'

    if (currentPage < totalPagesToShow) {
      html += `
      <div class="govuk-pagination__next">
        <a class="govuk-link govuk-pagination__link" href="?page=${currentPage + 1}" rel="next" data-page="${currentPage + 1}">
          <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
          <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13"><path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path></svg>
        </a>
      </div>`
    }

    nav.innerHTML = html
    nav.addEventListener('click', function (e) {
      const link = e.target.closest('a[data-page]')
      if (!link) return
      e.preventDefault()
      const page = parseInt(link.getAttribute('data-page'))
      loadPage(page)
    })
  }

  function updateURL (page) {
    const url = new URL(window.location)
    if (page === 1) url.searchParams.delete('page')
    else url.searchParams.set('page', page)
    window.history.pushState({}, '', url)
  }

  function getCurrentPage () {
    const urlParams = new URLSearchParams(window.location.search)
    const page = parseInt(urlParams.get('page')) || 1
    const totalPages = Math.ceil(workingSet.length / resultsPerPage)
    return Math.max(1, Math.min(page, totalPages || 1))
  }

  function handleHeaderSort (column) {
    if (currentSort.column === column) currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc'
    else currentSort = { column, direction: 'asc' }
    sortWorkingSet(currentSort.column, currentSort.direction)
    updateSortHeaders()
    loadPage(1)
  }

  function initHeaderSorting () {
    const table = document.getElementById('filter-disposal-sites-table')
    if (!table) return
    const headers = table.querySelectorAll('thead th')
    const columnMap = ['code', 'name', 'country', 'seaArea', 'status']
    headers.forEach((header, index) => {
      const col = columnMap[index]
      if (!col) return
      header.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        handleHeaderSort(col)
      })
    })
  }

  function renderSelectedFiltersSummary (criteria) {
    const container = document.getElementById('selected-filters-container')
    if (!container) return
    const items = []
    if (criteria.code) items.push({ key: 'Code', value: criteria.code, clearId: 'filter-code' })
    if (criteria.name) items.push({ key: 'Name', value: criteria.name, clearId: 'filter-name' })
    if (criteria.location && criteria.location !== 'Any') items.push({ key: 'Location', value: criteria.location, clearName: 'filter-location' })
    if (criteria.marineArea) items.push({ key: 'Marine area', value: criteria.marineArea, clearId: 'filter-marine-area-hidden' })

    if (!items.length) {
      container.innerHTML = ''
      return
    }

    let html = '<h2 class="govuk-heading-s">Selected filters</h2><ul class="moj-filter-tags">'
    items.forEach((it, idx) => {
      html += `<li><strong class="govuk-tag govuk-tag--grey govuk-!-margin-right-2">${it.key}: ${it.value}</strong></li>`
    })
    html += '</ul>'
    container.innerHTML = html
  }

  function applyAndRender () {
    const criteria = getCriteria()
    workingSet = filterSites(criteria)
    sortWorkingSet(currentSort.column, currentSort.direction)
    renderSelectedFiltersSummary(criteria)
    const page = 1
    updateURL(page)
    populateTable(page)
    generatePagination(page)
  }

  function clearFilters () {
    const form = document.getElementById('filter-form')
    if (!form) return
    form.reset()
    const marineHidden = document.getElementById('filter-marine-area-hidden')
    if (marineHidden) marineHidden.value = ''
    const autoInput = document.getElementById('filter-marine-area-autocomplete')
    if (autoInput) autoInput.value = ''
    workingSet = [...disposalSites]
    sortWorkingSet(currentSort.column, currentSort.direction)
    renderSelectedFiltersSummary({})
    loadPage(1)
  }

  function loadPage (page) {
    updateURL(page)
    populateTable(page)
    generatePagination(page)
    window.scrollTo(0, 0)
  }

  // Wire buttons
  const applyBtn = document.getElementById('apply-filters-button')
  if (applyBtn) {
    applyBtn.addEventListener('click', function (e) {
      e.preventDefault()
      applyAndRender()
    })
  }
  const clearLink = document.getElementById('clear-filters-link')
  if (clearLink) {
    clearLink.addEventListener('click', function (e) {
      e.preventDefault()
      clearFilters()
    })
  }

  // Initial load (show all sites, sorted by code asc)
  sortWorkingSet(currentSort.column, currentSort.direction)
  const currentPage = getCurrentPage()
  populateTable(currentPage)
  generatePagination(currentPage)
  updateSortHeaders()
  initHeaderSorting()
})


