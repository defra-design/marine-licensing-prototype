//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  
  // Check if accessibleAutocomplete is available (loaded via CDN)
  if (typeof accessibleAutocomplete !== 'undefined') {
    // Marine organizations for England and Northern Ireland
    const marineOrganizations = [
      'Belfast Harbour Authority',
      'Blackpool Marina Services',
      'Brighton Marina Operations',
      'Bristol Port Company',
      'Cowes Yacht Services',
      'Dover Port Authority',
      'Falmouth Marina Group',
      'Great Yarmouth Port Company',
      'Grimsby Fish Dock Enterprise',
      'Harwich Haven Authority',
      'Hull Marina Management',
      'Ipswich Marina Services',
      'Liverpool Marine Operations',
      'London Gateway Port',
      'Lowestoft Port Services',
      'Newcastle Port Authority',
      'Norfolk Marine Services',
      'North East Wind Farms',
      'Plymouth Port Services',
      'Poole Harbour Commissioners',
      'Portsmouth Wind Farm',
      'Ramsgate Marina',
      'Scarborough Marina',
      'Southampton Marina',
      'Tees Port Authority',
      'Whitby Marine Services'
    ]

    // Initialize autocomplete if the container exists on the page
    const autocompleteContainer = document.querySelector('#my-autocomplete-container')
    if (autocompleteContainer) {
      // Create a hidden input to store the selected value
      const hiddenInput = document.createElement('input')
      hiddenInput.type = 'hidden'
      hiddenInput.name = 'organisation-name'
      hiddenInput.id = 'organisation-name-hidden'
      autocompleteContainer.parentNode.appendChild(hiddenInput)
      
      accessibleAutocomplete({
        element: autocompleteContainer,
        id: 'my-autocomplete',
        source: marineOrganizations,
        minLength: 1,
        showAllValues: true,
        confirmOnBlur: false,
        autoselect: true,
        onConfirm: function(value) {
          // Update the hidden input with the selected value
          hiddenInput.value = value || ''
        }
      })
      
      // Also handle manual typing by updating the hidden input on input change
      setTimeout(() => {
        const autocompleteInput = document.querySelector('#my-autocomplete')
        if (autocompleteInput) {
          autocompleteInput.addEventListener('input', function(e) {
            hiddenInput.value = e.target.value || ''
          })
        }
      }, 100)
    }

    // Marine areas autocomplete for disposal site search
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

    // Initialize marine area autocomplete if the container exists on the page
    const marineAreaContainer = document.querySelector('#marine-area-autocomplete-container')
    if (marineAreaContainer) {
      // Create a hidden input to store the selected value
      const marineHiddenInput = document.createElement('input')
      marineHiddenInput.type = 'hidden'
      marineHiddenInput.name = 'marine-area'
      marineHiddenInput.id = 'marine-area-hidden'
      marineAreaContainer.parentNode.appendChild(marineHiddenInput)
      
      accessibleAutocomplete({
        element: marineAreaContainer,
        id: 'marine-area-autocomplete',
        source: marineAreas,
        minLength: 1,
        showAllValues: true,
        confirmOnBlur: false,
        autoselect: true,
        onConfirm: function(value) {
          // Update the hidden input with the selected value
          marineHiddenInput.value = value || ''
        }
      })
      
      // Also handle manual typing by updating the hidden input on input change
      setTimeout(() => {
        const marineAutocompleteInput = document.querySelector('#marine-area-autocomplete')
        if (marineAutocompleteInput) {
          marineAutocompleteInput.addEventListener('input', function(e) {
            marineHiddenInput.value = e.target.value || ''
          })
        }
      }, 100)
    }
  } else {
    console.error('accessibleAutocomplete is not available')
  }

  // Disposal sites pagination functionality
  if (document.getElementById('disposal-sites-table-body')) {
    // Complete dataset of all 75 disposal sites (sorted alphabetically by site code)
    const disposalSites = [
      { code: 'CR019', name: 'SUTORS', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR030', name: 'BURGHEAD', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR034', name: 'Lossiemouth Harbour', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR040', name: 'BUCKIE', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR050', name: 'MACDUFF', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR071', name: 'Peterhead Harbour', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR080', name: 'NORTH BUCHAN NESS', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR110', name: 'ABERDEEN', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR121', name: 'Nairn', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'CR170', name: 'Balnapaling', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'DG025', name: 'Dogger Bank Teeside B', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'DG031', name: 'Dogger Bank A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
      { code: 'DG032', name: 'Dogger Bank B', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'DV010', name: 'DOVER', country: 'ENGLAND', seaArea: 'English Channel', status: 'Disused' },
      { code: 'DV011', name: 'DOVER - EMERGENCY SITE', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'DV031', name: 'Lydd Ranges', country: 'England', seaArea: 'English Channel', status: 'Closed' },
      { code: 'DV040', name: 'EASTBOURNE', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'DV046', name: 'Eastbourne Frontage', country: 'ENGLAND', seaArea: 'English Channel', status: 'Disused' },
      { code: 'FI100', name: 'FOULA', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'FO010', name: 'MONTROSE', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'FO020', name: 'ARBROATH', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'FO028', name: 'MIDDLE BANK (TAY)', country: 'SCOTLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU015', name: 'BRIDLINGTON A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU020', name: 'HUMBER 4B/HOOK', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
      { code: 'HU021', name: 'Humber 4B/Hook Extension', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU030', name: 'HUMBER 4', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
      { code: 'HU040', name: 'WHITGIFT BIGHT (RIVER OUSE)', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU041', name: 'GOOLE REACH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
      { code: 'HU056', name: 'Holme Channel Deep', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU060', name: 'HUMBER 3A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
      { code: 'HU075', name: 'Oldfleet Drain', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU080', name: 'HUMBER 1A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Closed' },
      { code: 'HU090', name: 'HUMBER 2', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' },
      { code: 'HU143', name: 'WEST STONES', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU150', name: 'GREAT YARMOUTH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU152', name: 'Wells outer harbour site A', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU154', name: 'Wells outer harbour site C', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU156', name: 'Well Beneficial use site2', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU157', name: 'Wells Outer Harbour B1', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU159', name: 'Reedham Marina', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU170', name: 'BOSTON 7', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU205', name: 'Hornsea Disposal Area 1', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU208', name: 'Burgh Castle Yacht Station', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU212', name: 'EAOW3', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' },
      { code: 'HU213', name: 'Norfolk Vanguard ECC 1', country: 'England', seaArea: 'North Sea', status: 'Open' },
      { code: 'LU010', name: 'PADSTOW BAY', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU068', name: 'Clevedon Lake', country: 'ENGLAND', seaArea: 'Lundy', status: 'Open' },
      { code: 'LU070', name: 'PORTISHEAD', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU080', name: 'AVONMOUTH (INNER)', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU084', name: 'ROYAL PORTBURY PIER', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU085', name: 'ROYAL EDWARD ENTRANCE', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU163', name: 'Erebus OWF Cable Site 5', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU164', name: 'Erebus OWF Cable Site 4', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU165', name: 'Erebus OWF Cable Site 3', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU166', name: 'Erebus OWF Cable Site 2', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU167', name: 'Erebus OWF Cable Site 1', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'LU193', name: 'Weston Foreshore 3', country: 'ENGLAND', seaArea: 'Bristol Channel', status: 'Open' },
      { code: 'PL031', name: 'RAME HEAD SOUTH', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PL035', name: 'Plymouth Deep', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PL060', name: 'LANTIC BAY', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PL069', name: 'Truro', country: 'England', seaArea: 'Eastern Channel', status: 'Open' },
      { code: 'PL075', name: 'FALMOUTH BAY (B)', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PL100', name: 'MOUNTS BAY', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PO015', name: 'West Cliff Beach', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PO016', name: 'West Beach', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PO026', name: 'Seaton', country: 'England', seaArea: 'North Sea', status: 'Open' },
      { code: 'PO050', name: 'LYME BAY 2', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PO070', name: 'SPREY POINT', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PO111', name: 'Deep Water Relocation', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'PO112', name: 'Portland Harbour Deep Water Relocation', country: 'ENGLAND', seaArea: 'English Channel', status: 'Open' },
      { code: 'TH005', name: 'LOWESTOFT CIRCULAR NORTH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Open' }
    ]

    const resultsPerPage = 20
    const totalResults = disposalSites.length
    const totalPages = Math.ceil(totalResults / resultsPerPage)

    // Get current page from URL parameter or default to 1
    function getCurrentPage() {
      const urlParams = new URLSearchParams(window.location.search)
      const page = parseInt(urlParams.get('page')) || 1
      return Math.max(1, Math.min(page, totalPages))
    }

    // Update URL with new page parameter
    function updateURL(page) {
      const url = new URL(window.location)
      if (page === 1) {
        url.searchParams.delete('page')
      } else {
        url.searchParams.set('page', page)
      }
      window.history.pushState({}, '', url)
    }

    // Generate status tag HTML
    function getStatusTag(status) {
      let classes = 'govuk-tag'
      if (status === 'Open') {
        classes += ' govuk-tag--green'
      } else if (status === 'Closed') {
        classes += ' govuk-tag--red'
      } else if (status === 'Disused') {
        classes += ' govuk-tag--yellow'
      }
      return `<span class="${classes}">${status}</span>`
    }

    // Populate table with current page results
    function populateTable(page) {
      const startIndex = (page - 1) * resultsPerPage
      const endIndex = startIndex + resultsPerPage
      const pageResults = disposalSites.slice(startIndex, endIndex)

      const tableBody = document.getElementById('disposal-sites-table-body')
      tableBody.innerHTML = ''

      pageResults.forEach(site => {
        const row = document.createElement('tr')
        row.className = 'govuk-table__row'
        row.innerHTML = `
          <td class="govuk-table__cell">${site.code}</td>
          <td class="govuk-table__cell">${site.name}</td>
          <td class="govuk-table__cell">${site.country}</td>
          <td class="govuk-table__cell">${site.seaArea}</td>
          <td class="govuk-table__cell">${getStatusTag(site.status)}</td>
          <td class="govuk-table__cell">
            <a class="govuk-link govuk-!-white-space-nowrap" href="#">Select site</a>
          </td>
        `
        tableBody.appendChild(row)
      })

      // Update results summary
      const startResult = startIndex + 1
      const endResult = Math.min(endIndex, totalResults)
      document.getElementById('results-summary').textContent = 
        `Showing ${startResult} to ${endResult} of ${totalResults} results.`
    }

    // Generate pagination HTML
    function generatePagination(currentPage) {
      const paginationNav = document.getElementById('pagination-nav')
      let paginationHTML = ''

      // Previous link (only show if not on first page)
      if (currentPage > 1) {
        paginationHTML += `
          <div class="govuk-pagination__prev">
            <a class="govuk-link govuk-pagination__link" href="?page=${currentPage - 1}" rel="prev" data-page="${currentPage - 1}">
              <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
              </svg>
              <span class="govuk-pagination__link-title">
                Previous<span class="govuk-visually-hidden"> page</span>
              </span>
            </a>
          </div>
        `
      }

      // Page numbers
      paginationHTML += '<ul class="govuk-pagination__list">'
      
      // Always show first page
      if (currentPage === 1) {
        paginationHTML += `
          <li class="govuk-pagination__item govuk-pagination__item--current">
            <a class="govuk-link govuk-pagination__link" href="?page=1" aria-label="Page 1" aria-current="page" data-page="1">1</a>
          </li>
        `
      } else {
        paginationHTML += `
          <li class="govuk-pagination__item">
            <a class="govuk-link govuk-pagination__link" href="?page=1" aria-label="Page 1" data-page="1">1</a>
          </li>
        `
      }

      // Show ellipsis if there's a gap
      if (currentPage > 3) {
        paginationHTML += '<li class="govuk-pagination__item govuk-pagination__item--ellipses">⋯</li>'
      }

      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i === currentPage) {
          paginationHTML += `
            <li class="govuk-pagination__item govuk-pagination__item--current">
              <a class="govuk-link govuk-pagination__link" href="?page=${i}" aria-label="Page ${i}" aria-current="page" data-page="${i}">${i}</a>
            </li>
          `
        } else {
          paginationHTML += `
            <li class="govuk-pagination__item">
              <a class="govuk-link govuk-pagination__link" href="?page=${i}" aria-label="Page ${i}" data-page="${i}">${i}</a>
            </li>
          `
        }
      }

      // Show ellipsis if there's a gap before last page
      if (currentPage < totalPages - 2) {
        paginationHTML += '<li class="govuk-pagination__item govuk-pagination__item--ellipses">⋯</li>'
      }

      // Always show last page (if more than 1 page)
      if (totalPages > 1) {
        if (currentPage === totalPages) {
          paginationHTML += `
            <li class="govuk-pagination__item govuk-pagination__item--current">
              <a class="govuk-link govuk-pagination__link" href="?page=${totalPages}" aria-label="Page ${totalPages}" aria-current="page" data-page="${totalPages}">${totalPages}</a>
            </li>
          `
        } else {
          paginationHTML += `
            <li class="govuk-pagination__item">
              <a class="govuk-link govuk-pagination__link" href="?page=${totalPages}" aria-label="Page ${totalPages}" data-page="${totalPages}">${totalPages}</a>
            </li>
          `
        }
      }

      paginationHTML += '</ul>'

      // Next link (only show if not on last page)
      if (currentPage < totalPages) {
        paginationHTML += `
          <div class="govuk-pagination__next">
            <a class="govuk-link govuk-pagination__link" href="?page=${currentPage + 1}" rel="next" data-page="${currentPage + 1}">
              <span class="govuk-pagination__link-title">
                Next<span class="govuk-visually-hidden"> page</span>
              </span>
              <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
              </svg>
            </a>
          </div>
        `
      }

      paginationNav.innerHTML = paginationHTML

      // Add click event listeners to pagination links
      paginationNav.addEventListener('click', function(e) {
        if (e.target.closest('a[data-page]')) {
          e.preventDefault()
          const page = parseInt(e.target.closest('a[data-page]').getAttribute('data-page'))
          loadPage(page)
        }
      })
    }

    // Load specific page
    function loadPage(page) {
      updateURL(page)
      populateTable(page)
      generatePagination(page)
      window.scrollTo(0, 0)
    }

    // Initialize page
    const currentPage = getCurrentPage()
    populateTable(currentPage)
    generatePagination(currentPage)
  }
})
