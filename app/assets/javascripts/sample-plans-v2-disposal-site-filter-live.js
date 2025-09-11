// Live filtering version. Debounces input changes and reuses core logic structure

window.GOVUKPrototypeKit.documentReady(() => {
  if (!document.getElementById('filter-disposal-sites-table-body')) {
    return
  }

  // Reuse the same dataset as the non-live script to avoid divergence
  // (copy kept inline to avoid import complexity in the prototype environment)
  const disposalSites = (window.__DISPOSAL_SITES_DATA__ && Array.isArray(window.__DISPOSAL_SITES_DATA__)) ? window.__DISPOSAL_SITES_DATA__ : []

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

  // Initialise accessible autocomplete for marine area
  function initMarineAreaAutocomplete () {
    if (typeof accessibleAutocomplete === 'undefined') return
    const container = document.querySelector('#filter-marine-area-autocomplete-container')
    if (!container) return

    // Ensure hidden input exists
    let hiddenInput = document.getElementById('filter-marine-area-hidden')
    if (!hiddenInput) {
      hiddenInput = document.createElement('input')
      hiddenInput.type = 'hidden'
      hiddenInput.name = 'filter-marine-area'
      hiddenInput.id = 'filter-marine-area-hidden'
      container.parentNode.appendChild(hiddenInput)
    }

    accessibleAutocomplete({
      element: container,
      id: 'filter-marine-area-autocomplete',
      source: marineAreas,
      minLength: 1,
      showAllValues: true,
      confirmOnBlur: false,
      autoselect: false,
      onConfirm: function (value) {
        hiddenInput.value = value || ''
        scheduleApply()
      }
    })

    setTimeout(() => {
      const input = document.querySelector('#filter-marine-area-autocomplete')
      if (input) {
        input.addEventListener('input', function (e) {
          hiddenInput.value = e.target.value || ''
          scheduleApply()
        })
      }
    }, 100)
  }

  // Mount on load
  initMarineAreaAutocomplete()

  function getCriteria () {
    const code = (document.getElementById('filter-code')?.value || '').trim()
    const name = (document.getElementById('filter-name')?.value || '').trim()
    const location = (document.querySelector('input[name="filter-location"]:checked')?.value || 'Any')
    const marineArea = (document.getElementById('filter-marine-area-hidden')?.value || '').trim()
    const status = (document.querySelector('input[name="filter-status"]:checked')?.value || 'Any')
    return { code, name, location, marineArea, status }
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
    if (criteria.status && criteria.status !== 'Any') {
      const st = criteria.status.toLowerCase()
      result = result.filter(s => s.status.toLowerCase() === st)
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
        <td class="govuk-table__cell"><a class="govuk-link govuk-link--no-visited-state" href="/versions/multiple-sites-v2/sample-plans-v2/disposal-site-locations/review-disposal-site-details?code=${encodeURIComponent(site.code)}&name=${encodeURIComponent(site.name)}&country=${encodeURIComponent(site.country)}&seaArea=${encodeURIComponent(site.seaArea)}&status=${encodeURIComponent(site.status)}">${site.code}</a></td>
        <td class="govuk-table__cell">${site.name}</td>
        <td class="govuk-table__cell">${site.country}</td>
        <td class="govuk-table__cell">${site.seaArea}</td>
        <td class="govuk-table__cell">${getStatusTag(site.status)}</td>`
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
        return `<li class=\"govuk-pagination__item govuk-pagination__item--current\"><a class=\"govuk-link govuk-pagination__link\" href=\"?page=${i}\" aria-label=\"Page ${i}\" aria-current=\"page\" data-page=\"${i}\">${i}</a></li>`
      }
      return `<li class=\"govuk-pagination__item\"><a class=\"govuk-link govuk-pagination__link\" href=\"?page=${i}\" aria-label=\"Page ${i}\" data-page=\"${i}\">${i}</a></li>`
    }

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
    if (criteria.status && criteria.status !== 'Any') items.push({ key: 'Status', value: criteria.status, clearName: 'filter-status' })

    if (!items.length) {
      container.innerHTML = ''
      return
    }

    let html = '<ul class="moj-filter-tags">'
    items.forEach((it) => {
      if (it.clearId) {
        html += `<li><a href="#" class="moj-filter__tag" data-clear-id="${it.clearId}"><span class="govuk-visually-hidden">Remove this filter</span> ${it.value}</a></li>`
      } else if (it.clearName) {
        html += `<li><a href="#" class="moj-filter__tag" data-clear-name="${it.clearName}"><span class="govuk-visually-hidden">Remove this filter</span> ${it.value}</a></li>`
      }
    })
    html += '</ul>'
    container.innerHTML = html

    container.querySelectorAll('.moj-filter__tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault()
        const clearId = tag.getAttribute('data-clear-id')
        const clearName = tag.getAttribute('data-clear-name')
        if (clearId) {
          const el = document.getElementById(clearId)
          if (el) el.value = ''
          if (clearId === 'filter-marine-area-hidden') {
            resetMarineAreaAutocomplete()
          }
        }
        if (clearName) {
          const selected = document.querySelector(`input[name="${clearName}"]:checked`)
          if (selected) selected.checked = false
        }
        applyAndRender()
      })
    })
  }

  // Debounce for live filtering
  let debounceTimer = null
  function scheduleApply () {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(applyAndRender, 400)
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
    resetMarineAreaAutocomplete()
    workingSet = [...disposalSites]
    sortWorkingSet(currentSort.column, currentSort.direction)
    renderSelectedFiltersSummary({})
    loadPage(1)
  }

  function resetMarineAreaAutocomplete () {
    // Hard reset by unmounting and remounting the component to guarantee closed state
    const container = document.querySelector('#filter-marine-area-autocomplete-container')
    if (!container) return
    const hiddenInput = document.getElementById('filter-marine-area-hidden')
    if (hiddenInput) hiddenInput.value = ''

    // Remove existing widget markup
    try {
      container.innerHTML = ''
      // Rebuild fresh, which starts closed and empty
      initMarineAreaAutocomplete()
    } catch (e) {}
  }

  function loadPage (page) {
    updateURL(page)
    populateTable(page)
    generatePagination(page)
    window.scrollTo(0, 0)
  }

  // Live event wiring
  const codeInput = document.getElementById('filter-code')
  if (codeInput) codeInput.addEventListener('input', scheduleApply)
  const nameInput = document.getElementById('filter-name')
  if (nameInput) nameInput.addEventListener('input', scheduleApply)
  const locationRadios = document.querySelectorAll('input[name="filter-location"]')
  locationRadios.forEach(r => r.addEventListener('change', scheduleApply))
  const statusRadios = document.querySelectorAll('input[name="filter-status"]')
  statusRadios.forEach(r => r.addEventListener('change', scheduleApply))

  const topClearLink = document.getElementById('top-clear-filters-link')
  if (topClearLink) {
    topClearLink.addEventListener('click', function (e) {
      e.preventDefault()
      clearFilters()
    })
  }

  // Initial load (show all sites, sorted by code asc)
  // Expose dataset globally so this file can be light if reused elsewhere
  window.__DISPOSAL_SITES_DATA__ = window.__DISPOSAL_SITES_DATA__ || disposalSites
  sortWorkingSet(currentSort.column, currentSort.direction)
  const currentPage = getCurrentPage()
  populateTable(currentPage)
  generatePagination(currentPage)
  updateSortHeaders()
  initHeaderSorting()

  // MOJ filter toggle
  try {
    const $filter = document.querySelector('[data-module="moj-filter"]')
    if (window.MOJFrontend && window.MOJFrontend.FilterToggleButton && $filter) {
      new window.MOJFrontend.FilterToggleButton($filter, {
        bigModeMediaQuery: '(min-width: 48.0625em)',
        startHidden: false,
        toggleButton: {
          showText: 'Show filter',
          hideText: 'Hide filter',
          classes: 'govuk-button'
        },
        closeButton: {
          text: 'Close'
        }
      })
    }
  } catch (e) {}
})


