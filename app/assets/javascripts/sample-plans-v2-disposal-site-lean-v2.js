(function() {
  function onReady() {
  // Check if we're on the lean v2 search results page (use lean-v2 specific ids)
  const disposalSitesTable = document.getElementById('disposal-sites-table-body-lean-v2')
  if (!disposalSitesTable) {
    return
  }

  // Dataset: Use shared global disposal sites data
  const disposalSites = window.__DISPOSAL_SITES_DATA__ || []
  
  // Build search criteria preferring injected session state from POST, fallback to URL
  function getSearchCriteria() {
    const params = new URLSearchParams(window.location.search)
    const injectedCombined = (window.searchCriteria && window.searchCriteria.combined) || ''
    const injectedInclude = (window.searchCriteria && window.searchCriteria.includeClosedDisused) || ''
    const combined = (injectedCombined || params.get('disposal-site-code-or-name') || '').toString()

    // Checkbox: prefer explicit injected value from session when provided
    let includeClosedDisused = false
    if (Array.isArray(injectedInclude)) {
      includeClosedDisused = injectedInclude
        .map(v => (v || '').toString().toLowerCase())
        .some(v => v === 'include-closed-disused' || v === 'true' || v === 'on' || v === '1')
    } else if (injectedInclude) {
      const v = injectedInclude.toString().toLowerCase()
      // Handle comma-separated strings like "include-closed-disused,_unchecked"
      includeClosedDisused = v.includes('include-closed-disused') || v === 'true' || v === 'on' || v === '1'
    } else {
      const includeValues = params.getAll('include-closed-disused').map(v => (v || '').toString().toLowerCase())
      includeClosedDisused = includeValues.some(v => v === 'include-closed-disused' || v === 'true' || v === 'on' || v === '1')
    }
    return { combined, includeClosedDisused }
  }
  
  let currentPage = 1
  const resultsPerPage = 20
  let filteredSites = []
  let sortedSites = []
  let currentSort = { column: 'code', direction: 'asc' }

  // Filter sites based on search criteria
  function filterSites() {
    const { combined, includeClosedDisused } = getSearchCriteria()
    const searchText = combined.toLowerCase().trim()

    // Start with all sites
    let filtered = disposalSites.slice()

    // Apply combined filter: match either code or name (partial)
    if (searchText) {
      filtered = filtered.filter(site => {
        const code = (site.code || '').toString().toLowerCase()
        const name = (site.name || '').toString().toLowerCase()
        return code.includes(searchText) || name.includes(searchText)
      })
    }

    // Apply status filter
    if (!includeClosedDisused) {
      filtered = filtered.filter(site => {
        const status = (site.status || '').toString().trim().toLowerCase()
        return status === 'open'
      })
    }

    // Default sort by currentSort settings
    filtered = sortSites(filtered, currentSort.column, currentSort.direction)

    return filtered
  }

  // Render the table with filtered sites
  function renderTable(sites, page = 1) {
    const startIndex = (page - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    const pageSites = sites.slice(startIndex, endIndex)

    const tbody = document.getElementById('disposal-sites-table-body-lean-v2')
    if (!tbody) return

    // Show/hide table container when there are no results
    const tableContainer = document.querySelector('.govuk-table-overflow')
    const paginationNav = document.getElementById('pagination-nav')
    if (sites.length === 0) {
      if (tableContainer) tableContainer.style.display = 'none'
      if (paginationNav) paginationNav.innerHTML = ''
      updateResultsCount(0, 1)
      return
    } else {
      if (tableContainer) tableContainer.style.display = 'block'
    }

    tbody.innerHTML = ''

    pageSites.forEach(site => {
      const row = document.createElement('tr')
      row.className = 'govuk-table__row'
      
      const statusClass = site.status === 'Open' ? 'govuk-tag--green' :
                         site.status === 'Closed' ? 'govuk-tag--red' :
                         'govuk-tag--grey'

      row.innerHTML = `
        <td class="govuk-table__cell">
          <a class="govuk-link govuk-link--no-visited-state" href="review-disposal-site-details?code=${encodeURIComponent(site.code)}&name=${encodeURIComponent(site.name)}&country=${encodeURIComponent(site.country)}&seaArea=${encodeURIComponent(site.seaArea)}&status=${encodeURIComponent(site.status)}">${site.code}</a>
        </td>
        <td class="govuk-table__cell">${site.name}</td>
        <td class="govuk-table__cell">${site.country}</td>
        <td class="govuk-table__cell">${site.seaArea}</td>
        <td class="govuk-table__cell">
          <strong class="govuk-tag ${statusClass}">${site.status}</strong>
        </td>
      `
      tbody.appendChild(row)
    })

    // Update results count
    updateResultsCount(sortedSites.length, page)
    renderPagination(sortedSites.length, page)
  }

  // Update the results count display
  function updateResultsCount(totalResults, page) {
    const resultsCountElement = document.getElementById('results-count')
    const resultsSummaryElement = document.getElementById('results-summary')
    const totalResultsElement = document.getElementById('total-results')

    if (resultsCountElement && totalResultsElement) {
      totalResultsElement.textContent = totalResults
      resultsCountElement.innerHTML = `We found <strong id="total-results">${totalResults}</strong> disposal sites matching your search criteria.`
    }

    if (resultsSummaryElement && totalResults > 0) {
      const startResult = ((page - 1) * resultsPerPage) + 1
      const endResult = Math.min(page * resultsPerPage, totalResults)
      resultsSummaryElement.textContent = `Showing ${startResult} to ${endResult} of ${totalResults} results.`
    } else if (resultsSummaryElement) {
      resultsSummaryElement.textContent = ''
    }
  }

  // Render pagination (compact with ellipses)
  function renderPagination(totalResults, page) {
    const paginationNav = document.getElementById('pagination-nav')
    if (!paginationNav) return

    const totalPages = Math.ceil(totalResults / resultsPerPage)
    if (totalPages <= 1) {
      paginationNav.innerHTML = ''
      return
    }

    let html = ''

    // Previous
    if (page > 1) {
      html += `
        <div class="govuk-pagination__prev">
          <a class="govuk-link govuk-pagination__link" href="#" data-page="${page - 1}" rel="prev">
            <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
          </a>
        </div>
      `
    }

    html += '<ul class="govuk-pagination__list">'

    // Always show 1
    html += `
      <li class="govuk-pagination__item ${page === 1 ? 'govuk-pagination__item--current' : ''}">
        <a class="govuk-link govuk-pagination__link" href="#" ${page === 1 ? 'aria-current="page"' : ''} data-page="1">1</a>
      </li>
    `

    // Determine visible range around current page
    let startPage = 2
    let endPage = totalPages - 1
    if (totalPages > 5) {
      if (page <= 3) {
        endPage = 4
      } else if (page >= totalPages - 2) {
        startPage = totalPages - 3
      } else {
        startPage = page - 1
        endPage = page + 1
      }
    }

    if (startPage > 2) {
      html += '<li class="govuk-pagination__item govuk-pagination__item--ellipses">⋯</li>'
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i >= 2 && i <= totalPages - 1) {
        html += `
          <li class="govuk-pagination__item ${page === i ? 'govuk-pagination__item--current' : ''}">
            <a class="govuk-link govuk-pagination__link" href="#" ${page === i ? 'aria-current="page"' : ''} data-page="${i}">${i}</a>
          </li>
        `
      }
    }

    if (endPage < totalPages - 1) {
      html += '<li class="govuk-pagination__item govuk-pagination__item--ellipses">⋯</li>'
    }

    // Always show last if more than 1 page
    if (totalPages > 1) {
      html += `
        <li class="govuk-pagination__item ${page === totalPages ? 'govuk-pagination__item--current' : ''}">
          <a class="govuk-link govuk-pagination__link" href="#" ${page === totalPages ? 'aria-current="page"' : ''} data-page="${totalPages}">${totalPages}</a>
        </li>
      `
    }

    html += '</ul>'

    // Next
    if (page < totalPages) {
      html += `
        <div class="govuk-pagination__next">
          <a class="govuk-link govuk-pagination__link" href="#" data-page="${page + 1}" rel="next">
            <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
          </a>
        </div>
      `
    }

    paginationNav.innerHTML = html

    // Add click events to pagination links
    paginationNav.addEventListener('click', (e) => {
      e.preventDefault()
      const pageLink = e.target.closest('[data-page]')
      if (pageLink) {
        const newPage = parseInt(pageLink.dataset.page)
        currentPage = newPage
        renderTable(sortedSites, currentPage)
      }
    })
  }

  // Sorting helpers
  function sortSites(sites, column, direction) {
    const copy = sites.slice()
    copy.sort((a, b) => {
      let aVal = ''
      let bVal = ''
      switch (column) {
        case 'code':
          aVal = (a.code || '').toString().toLowerCase(); bVal = (b.code || '').toString().toLowerCase(); break
        case 'name':
          aVal = (a.name || '').toString().toLowerCase(); bVal = (b.name || '').toString().toLowerCase(); break
        case 'country':
          aVal = (a.country || '').toString().toLowerCase(); bVal = (b.country || '').toString().toLowerCase(); break
        case 'seaArea':
          aVal = (a.seaArea || '').toString().toLowerCase(); bVal = (b.seaArea || '').toString().toLowerCase(); break
        case 'status':
          aVal = (a.status || '').toString().toLowerCase(); bVal = (b.status || '').toString().toLowerCase(); break
        default:
          aVal = (a.code || '').toString().toLowerCase(); bVal = (b.code || '').toString().toLowerCase(); break
      }
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }

  function updateTableHeaders() {
    const headers = document.querySelectorAll('#disposal-sites-table-lean-v2 thead th')
    const columnMap = ['code', 'name', 'country', 'seaArea', 'status']
    headers.forEach((h, idx) => {
      const col = columnMap[idx]
      if (!col) return
      if (currentSort.column === col) {
        h.setAttribute('aria-sort', currentSort.direction === 'asc' ? 'ascending' : 'descending')
      } else {
        h.setAttribute('aria-sort', 'none')
      }
    })
  }

  function initializeHeaderSorting() {
    const table = document.getElementById('disposal-sites-table-lean-v2')
    if (!table) return
    const headers = table.querySelectorAll('thead th')
    const columnMap = ['code', 'name', 'country', 'seaArea', 'status']
    headers.forEach((header, idx) => {
      const col = columnMap[idx]
      if (!col) return
      header.addEventListener('click', (e) => {
        e.preventDefault()
        if (currentSort.column === col) {
          currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc'
        } else {
          currentSort.column = col
          currentSort.direction = 'asc'
        }
        sortedSites = sortSites(filteredSites, currentSort.column, currentSort.direction)
        currentPage = 1
        updateTableHeaders()
        renderTable(sortedSites, currentPage)
      })
    })
  }

  // Initialize the page
  function init() {
    filteredSites = filterSites()
    sortedSites = filteredSites
    renderTable(sortedSites, currentPage)
    updateTableHeaders()
    initializeHeaderSorting()
  }

  // Run initialization
  init()


  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady)
  } else {
    onReady()
  }
})()


