// JavaScript for disposal site lean search functionality
// Enhances the lean disposal site search page with live filtering

window.GOVUKPrototypeKit.documentReady(() => {
  // Check if we're on the search results page
  const disposalSitesTable = document.getElementById('disposal-sites-table-body')
  if (!disposalSitesTable) {
    return
  }

  // Dataset: Use shared global disposal sites data
  const disposalSites = window.__DISPOSAL_SITES_DATA__ || []
  
  // Get search criteria from the page
  const searchCriteria = window.searchCriteria || {}
  
  let currentPage = 1
  const resultsPerPage = 20
  let filteredSites = []

  // Filter sites based on search criteria
  function filterSites() {
    const searchCode = (searchCriteria.code || '').toLowerCase().trim()
    const searchName = (searchCriteria.name || '').toLowerCase().trim()
    const includeClosedDisused = document.querySelector('input[name="include-closed-disused"]:checked') || 
                                 (searchCriteria.hasFilters && searchCriteria.includeClosedDisused === 'include-closed-disused')

    // Start with all sites
    let filtered = disposalSites.slice()

    // Apply code filter (partial match)
    if (searchCode) {
      filtered = filtered.filter(site => 
        site.code.toLowerCase().includes(searchCode)
      )
    }

    // Apply name filter (partial match)
    if (searchName) {
      filtered = filtered.filter(site => 
        site.name.toLowerCase().includes(searchName)
      )
    }

    // Apply status filter
    if (!includeClosedDisused) {
      // Only show Open sites if checkbox not checked
      filtered = filtered.filter(site => 
        site.status === 'Open'
      )
    }
    // If checkbox is checked, show all statuses (Open, Closed, Disused)

    return filtered
  }

  // Render the table with filtered sites
  function renderTable(sites, page = 1) {
    const startIndex = (page - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    const pageSites = sites.slice(startIndex, endIndex)

    const tbody = document.getElementById('disposal-sites-table-body')
    if (!tbody) return

    tbody.innerHTML = ''

    pageSites.forEach(site => {
      const row = document.createElement('tr')
      row.className = 'govuk-table__row'
      
      // Status tag color mapping
      const statusClass = site.status === 'Open' ? 'govuk-tag--green' :
                         site.status === 'Closed' ? 'govuk-tag--red' :
                         'govuk-tag--grey'

      row.innerHTML = `
        <td class="govuk-table__cell">
          <a href="#" class="govuk-link govuk-link--no-visited-state" data-site-code="${site.code}">${site.code}</a>
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
    updateResultsCount(sites.length, page)
    renderPagination(sites.length, page)
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
      resultsSummaryElement.textContent = `Showing ${startResult} to ${endResult}.`
    } else if (resultsSummaryElement) {
      resultsSummaryElement.textContent = ''
    }
  }

  // Render pagination
  function renderPagination(totalResults, page) {
    const paginationNav = document.getElementById('pagination-nav')
    if (!paginationNav) return

    const totalPages = Math.ceil(totalResults / resultsPerPage)
    
    if (totalPages <= 1) {
      paginationNav.innerHTML = ''
      return
    }

    let paginationHTML = '<ul class="govuk-pagination__list">'

    // Previous page
    if (page > 1) {
      paginationHTML += `
        <li class="govuk-pagination__item govuk-pagination__item--prev">
          <a class="govuk-link govuk-pagination__link" href="#" data-page="${page - 1}" rel="prev">
            <span class="govuk-pagination__link-title">Previous<span class="govuk-visually-hidden"> page</span></span>
          </a>
        </li>
      `
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === page) {
        paginationHTML += `
          <li class="govuk-pagination__item govuk-pagination__item--current">
            <a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" aria-current="page">${i}</a>
          </li>
        `
      } else {
        paginationHTML += `
          <li class="govuk-pagination__item">
            <a class="govuk-link govuk-pagination__link" href="#" aria-label="Page ${i}" data-page="${i}">${i}</a>
          </li>
        `
      }
    }

    // Next page
    if (page < totalPages) {
      paginationHTML += `
        <li class="govuk-pagination__item govuk-pagination__item--next">
          <a class="govuk-link govuk-pagination__link" href="#" data-page="${page + 1}" rel="next">
            <span class="govuk-pagination__link-title">Next<span class="govuk-visually-hidden"> page</span></span>
          </a>
        </li>
      `
    }

    paginationHTML += '</ul>'
    paginationNav.innerHTML = paginationHTML

    // Add click events to pagination links
    paginationNav.addEventListener('click', (e) => {
      e.preventDefault()
      const pageLink = e.target.closest('[data-page]')
      if (pageLink) {
        const newPage = parseInt(pageLink.dataset.page)
        currentPage = newPage
        renderTable(filteredSites, currentPage)
      }
    })
  }

  // Initialize the page
  function init() {
    filteredSites = filterSites()
    renderTable(filteredSites, currentPage)
  }

  // Run initialization
  init()

  // Add click handlers for disposal site selection
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-site-code]')) {
      e.preventDefault()
      const siteCode = e.target.dataset.siteCode
      
      // Store the selected site code in session data
      // This would typically update the prototype's session data
      console.log('Selected disposal site:', siteCode)
      
      // Navigate to the next step in the journey
      // You can modify this URL based on your routing requirements
      window.location.href = '../sample-plan-start-page'
    }
  })

})
