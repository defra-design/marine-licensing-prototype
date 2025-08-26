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
    // Complete dataset from the provided screenshots - English disposal sites only (MMO jurisdiction)
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
      { code: 'TH005', name: 'LOWESTOFT CIRCULAR NORTH', country: 'ENGLAND', seaArea: 'North Sea', status: 'Disused' }
    ]

    const resultsPerPage = 20
    let sortedDisposalSites = [...disposalSites] // Copy for sorting
    let currentSort = { column: 'code', direction: 'asc' } // Default sort by site code ascending
    
    // Get search criteria from template (will be undefined if not set)
    const searchCriteria = window.searchCriteria || {
      code: '',
      name: '',
      location: 'Any',
      marineArea: '',
      status: 'Any',
      hasFilters: false
    }

    // Filtering functions
    function filterByCode(sites, code) {
      if (!code) return sites
      return sites.filter(site => 
        site.code.toLowerCase().includes(code.toLowerCase())
      )
    }

    function filterByName(sites, name) {
      if (!name) return sites
      return sites.filter(site => 
        site.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    function filterByLocation(sites, location) {
      if (!location || location === 'Any' || location === '') return sites
      return sites.filter(site => 
        site.country.toLowerCase() === location.toLowerCase()
      )
    }

    function filterByMarineArea(sites, marineArea) {
      if (!marineArea) return sites
      return sites.filter(site => 
        site.seaArea.toLowerCase().includes(marineArea.toLowerCase())
      )
    }

    function filterByStatus(sites, status) {
      if (!status || status === 'Any' || status === '') return sites
      return sites.filter(site => 
        site.status.toLowerCase() === status.toLowerCase()
      )
    }

    // Apply all filters
    function applyFilters() {
      let filtered = [...disposalSites]
      
      // Apply each filter if criteria exists
      filtered = filterByCode(filtered, searchCriteria.code)
      filtered = filterByName(filtered, searchCriteria.name)
      filtered = filterByLocation(filtered, searchCriteria.location)
      filtered = filterByMarineArea(filtered, searchCriteria.marineArea)
      filtered = filterByStatus(filtered, searchCriteria.status)
      
      // Update the working dataset
      sortedDisposalSites = filtered
      
      // Update results count display
      updateResultsCount()
    }

    function updateResultsCount() {
      const totalResults = sortedDisposalSites.length
      document.getElementById('total-results').textContent = totalResults
      
      // Update the main results text
      const resultsText = totalResults === 1 ? 'disposal site' : 'disposal sites'
      document.getElementById('results-count').innerHTML = 
        `We found <strong id="total-results">${totalResults}</strong> ${resultsText} matching your search criteria.`
    }

    // Get current page from URL parameter or default to 1
    function getCurrentPage() {
      const urlParams = new URLSearchParams(window.location.search)
      const page = parseInt(urlParams.get('page')) || 1
      const totalPages = Math.ceil(sortedDisposalSites.length / resultsPerPage)
      return Math.max(1, Math.min(page, totalPages))
    }

    // Sort the disposal sites array
    function sortDisposalSites(column, direction) {
      sortedDisposalSites.sort((a, b) => {
        let aValue = a[column]
        let bValue = b[column]
        
        // Convert to lowercase for string comparison
        if (typeof aValue === 'string') aValue = aValue.toLowerCase()
        if (typeof bValue === 'string') bValue = bValue.toLowerCase()
        
        if (direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        }
      })
    }

    // Handle table header clicks for sorting
    function handleTableSort(column) {
      // Toggle direction if clicking the same column, otherwise default to ascending
      if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc'
      } else {
        currentSort.column = column
        currentSort.direction = 'asc'
      }
      
      sortDisposalSites(currentSort.column, currentSort.direction)
      updateTableHeaders()
      loadPage(1) // Go back to first page after sorting
    }

    // Update table headers with sort indicators
    function updateTableHeaders() {
      const headers = document.querySelectorAll('#disposal-sites-table thead th')
      const columnMap = {
        0: 'code',
        1: 'name', 
        2: 'country',
        3: 'seaArea',
        4: 'status'
      }

      headers.forEach((header, index) => {
        const column = columnMap[index]
        if (column) {
          // Clear existing sort attributes
          header.removeAttribute('aria-sort')
          
          // Set new sort state
          if (currentSort.column === column) {
            header.setAttribute('aria-sort', currentSort.direction === 'asc' ? 'ascending' : 'descending')
          } else {
            header.setAttribute('aria-sort', 'none')
          }
        }
      })
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
      const tableBody = document.getElementById('disposal-sites-table-body')
      const totalResults = sortedDisposalSites.length
      const tableContainer = document.querySelector('.govuk-table-overflow')
      
      // Handle no results case
      if (totalResults === 0) {
        // Hide the entire table
        if (tableContainer) {
          tableContainer.style.display = 'none'
        }
        
        document.getElementById('results-summary').textContent = ''
        return
      } else {
        // Show table if there are results
        if (tableContainer) {
          tableContainer.style.display = 'block'
        }
      }

      const startIndex = (page - 1) * resultsPerPage
      const endIndex = startIndex + resultsPerPage
      const pageResults = sortedDisposalSites.slice(startIndex, endIndex)

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
            <a class="govuk-link govuk-link--no-visited-state govuk-!-white-space-nowrap" href="#">Select site</a>
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
      const totalResults = sortedDisposalSites.length
      const totalPages = Math.ceil(totalResults / resultsPerPage)
      
      // Hide pagination if no results
      if (totalResults === 0) {
        paginationNav.innerHTML = ''
        return
      }
      
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

      // For 4 or fewer pages, show all page numbers without ellipses
      if (totalPages <= 4) {
        // Show all pages 2 through totalPages-1 (page 1 and last page are handled separately)
        for (let i = 2; i <= totalPages - 1; i++) {
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
      } else {
        // For more than 4 pages, use ellipses logic
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

    // Add click event listeners to table headers for sorting
    function initializeTableSorting() {
      const table = document.getElementById('disposal-sites-table')
      if (table) {
        const headers = table.querySelectorAll('thead th')
        const columnMap = ['code', 'name', 'country', 'seaArea', 'status']
        
        headers.forEach((header, index) => {
          const column = columnMap[index]
          if (column) {
            // Remove any existing event listeners and add our custom one
            header.addEventListener('click', (e) => {
              e.preventDefault()
              e.stopPropagation()
              handleTableSort(column)
            })
          }
        })
      }
    }

    // Add event listener for "Show all disposal sites" link
    function initializeClearFilters() {
      const clearFiltersLink = document.getElementById('clear-filters-link')
      if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', (e) => {
          e.preventDefault()
          // Clear search criteria
          window.searchCriteria = {
            code: '',
            name: '',
            location: 'Any',
            marineArea: '',
            status: 'Any',
            hasFilters: false
          }
          // Reset to full dataset
          sortedDisposalSites = [...disposalSites]
          // Re-apply sort and pagination
          sortDisposalSites(currentSort.column, currentSort.direction)
          updateResultsCount()
          loadPage(1)
          // Hide search summary
          const searchSummary = document.getElementById('search-summary')
          if (searchSummary) {
            searchSummary.style.display = 'none'
          }
        })
      }
    }

    // Initialize page
    applyFilters() // Apply search filters first
    const currentPage = getCurrentPage()
    sortDisposalSites(currentSort.column, currentSort.direction) // Apply initial sort
    populateTable(currentPage)
    generatePagination(currentPage)
    updateTableHeaders()
    initializeTableSorting()
    initializeClearFilters()
  }
})
