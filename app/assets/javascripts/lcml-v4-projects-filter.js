/*
  Filter for the LCML v4 projects page (low-complexity-v4/projects).

  Standalone on purpose. The three filter explorations under
  low-complexity-v4/filters/ share lcml-projects-filter.js, and the sample plans
  journey has its own sample-plans-v2-disposal-site-*.js. Keeping this one
  separate means the live projects page cannot be broken by edits to either.

  What it does:
    - builds the Submission type, Status and Owner checkboxes from the
      rendered table, so options always match what is on the page
    - filters rows on Apply, and on removing a selected-filter tag
    - renders the MOJ selected-filter tags
    - wires up MOJ's FilterToggleButton so the panel starts hidden

  Deliberately no Project name or Reference search for this iteration - we want
  to usability test the panel without them.

  Markup it expects (all optional except the table):
    #projects-table, #projects-caption, #no-results-message, #results-count
    #apply-filters, #clear-filters, #selected-filter-tags
    #type-checkboxes, #status-checkboxes, #person-checkboxes
    #conditional-specific-person, #person-error-message
    input[name="projectFilter"]
*/
(function (global) {
  'use strict'

  var CURRENT_USER = 'jon-doe'

  function text (el) {
    return el ? el.textContent.trim() : ''
  }

  function init () {
    var table = document.getElementById('projects-table')
    if (!table) return

    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'))
    var noResultsMessage = document.getElementById('no-results-message')
    var resultsCount = document.getElementById('results-count')
    var caption = document.getElementById('projects-caption')
    var applyButton = document.getElementById('apply-filters')
    var clearLink = document.getElementById('clear-filters')
    var tagContainer = document.getElementById('selected-filter-tags')

    var orgName = text(document.querySelector('.govuk-caption-l')) || 'Ramsgate Marina'
    var hasScope = document.querySelectorAll('input[name="projectFilter"]').length > 0

    // The Owner column is only rendered for organisation users, so find it by
    // header text rather than assuming a fixed index.
    var headers = Array.prototype.slice.call(table.querySelectorAll('thead th'))
    var ownerIndex = -1
    headers.forEach(function (th, i) {
      if (text(th) === 'Owner') ownerIndex = i
    })
    var hasOwners = ownerIndex > -1

    // ---------------------------------------------------------------- model

    var model = rows.map(function (row) {
      return {
        el: row,
        creator: row.getAttribute('data-creator') || '',
        type: row.getAttribute('data-type') || '',
        status: row.getAttribute('data-status') || '',
        ownerName: hasOwners ? text(row.cells[ownerIndex]) : ''
      }
    })

    function uniqueBy (key) {
      var seen = []
      model.forEach(function (item) {
        if (item[key] && seen.indexOf(item[key]) === -1) seen.push(item[key])
      })
      return seen.sort(function (a, b) { return a.localeCompare(b) })
    }

    // Owners present in the table. Nobody with zero projects appears, so no
    // phantom options when session data hides rows.
    var owners = []
    if (hasOwners) {
      model.forEach(function (item) {
        var known = owners.some(function (o) { return o.value === item.creator })
        if (!known && item.creator) {
          owners.push({
            value: item.creator,
            name: item.ownerName,
            label: item.creator === CURRENT_USER
              ? 'Mine (' + item.ownerName + ')'
              : item.ownerName
          })
        }
      })

      owners.sort(function (a, b) {
        if (a.value === CURRENT_USER) return -1
        if (b.value === CURRENT_USER) return 1
        return a.label.localeCompare(b.label)
      })
    }

    // Plain names read better in prose ("Projects by Sam Evans"); labels carry
    // the Mine prefix and are what the controls and tags show.
    var ownerNames = {}
    var ownerLabels = {}
    owners.forEach(function (o) {
      ownerNames[o.value] = o.name
      ownerLabels[o.value] = o.label
    })

    // ------------------------------------------------------- build controls

    function buildCheckboxes (container, values, name, idPrefix, labelFor) {
      if (!container) return
      container.innerHTML = ''
      values.forEach(function (value, index) {
        var id = idPrefix + '-' + index

        var item = document.createElement('div')
        item.className = 'govuk-checkboxes__item'

        var input = document.createElement('input')
        input.className = 'govuk-checkboxes__input'
        input.id = id
        input.name = name
        input.type = 'checkbox'
        input.value = value

        var label = document.createElement('label')
        label.className = 'govuk-label govuk-checkboxes__label'
        label.setAttribute('for', id)
        label.textContent = labelFor(value)

        item.appendChild(input)
        item.appendChild(label)
        container.appendChild(item)
      })
    }

    buildCheckboxes(
      document.getElementById('type-checkboxes'),
      uniqueBy('type'),
      'filter-type',
      'type',
      function (v) { return v }
    )

    buildCheckboxes(
      document.getElementById('status-checkboxes'),
      uniqueBy('status'),
      'filter-status',
      'status',
      function (v) { return v }
    )

    buildCheckboxes(
      document.getElementById('person-checkboxes'),
      owners.map(function (o) { return o.value }),
      'filter-person',
      'person',
      function (v) { return ownerLabels[v] }
    )

    // --------------------------------------------------------------- state

    function checkedValues (name) {
      return Array.prototype.slice
        .call(document.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (cb) { return cb.value })
    }

    function readState () {
      var scopeRadio = document.querySelector('input[name="projectFilter"]:checked')
      return {
        scope: scopeRadio ? scopeRadio.value : 'all-projects',
        people: checkedValues('filter-person'),
        types: checkedValues('filter-type'),
        statuses: checkedValues('filter-status')
      }
    }

    function matches (item, state) {
      if (state.scope === 'my-projects' && item.creator !== CURRENT_USER) return false

      if (state.scope === 'specific-person') {
        // Nobody picked yet is an error state, handled in apply(), so nothing
        // matches until an owner is ticked.
        if (state.people.length === 0) return false
        if (state.people.indexOf(item.creator) === -1) return false
      }

      if (state.types.length > 0 && state.types.indexOf(item.type) === -1) return false
      if (state.statuses.length > 0 && state.statuses.indexOf(item.status) === -1) return false

      return true
    }

    // ---------------------------------------------------------- error state

    function setErrorState (on) {
      var panel = document.getElementById('conditional-specific-person')
      var message = document.getElementById('person-error-message')
      if (panel) panel.classList.toggle('error-state', on)
      if (message) message.style.display = on ? 'block' : 'none'
      if (resultsCount) resultsCount.classList.toggle('error-message', on)
    }

    // ---------------------------------------------------------------- tags

    function buildCategories (state) {
      var categories = []

      if (state.scope === 'specific-person' && state.people.length > 0) {
        categories.push({
          heading: 'Owner',
          items: state.people.map(function (v) {
            return { text: ownerLabels[v], type: 'person', value: v }
          })
        })
      }

      if (state.types.length > 0) {
        categories.push({
          heading: 'Submission type',
          items: state.types.map(function (v) { return { text: v, type: 'type', value: v } })
        })
      }

      if (state.statuses.length > 0) {
        categories.push({
          heading: 'Status',
          items: state.statuses.map(function (v) { return { text: v, type: 'status', value: v } })
        })
      }

      return categories
    }

    function renderTags (categories) {
      if (!tagContainer) return
      tagContainer.innerHTML = ''

      categories.forEach(function (category) {
        var heading = document.createElement('h3')
        heading.className = 'govuk-heading-s govuk-!-margin-bottom-0'
        heading.textContent = category.heading
        tagContainer.appendChild(heading)

        var list = document.createElement('ul')
        list.className = 'moj-filter-tags'

        category.items.forEach(function (item) {
          var li = document.createElement('li')
          var link = document.createElement('a')
          link.className = 'moj-filter__tag'
          link.href = '#'
          link.innerHTML = '<span class="govuk-visually-hidden">Remove this filter</span> ' + item.text
          link.addEventListener('click', function (e) {
            e.preventDefault()
            removeFilter(item.type, item.value)
          })
          li.appendChild(link)
          list.appendChild(li)
        })

        tagContainer.appendChild(list)
      })
    }

    function uncheck (name, value) {
      var cb = document.querySelector('input[name="' + name + '"][value="' + value + '"]')
      if (cb) cb.checked = false
    }

    function removeFilter (type, value) {
      if (type === 'type') uncheck('filter-type', value)
      else if (type === 'status') uncheck('filter-status', value)
      else if (type === 'person') {
        uncheck('filter-person', value)
        // Dropping the last person leaves the scope radio pointing at nothing
        // meaningful, so fall back to showing everything.
        if (checkedValues('filter-person').length === 0) {
          selectAllProjects()
          hideConditional()
        }
      }
      apply(false)
    }

    // ------------------------------------------------------------- results

    function scopeName (state) {
      if (state.scope === 'my-projects') return 'My submissions'

      if (state.scope === 'specific-person') {
        var names = state.people.map(function (v) { return ownerNames[v] }).join(', ')
        return names ? 'Submissions by ' + names : 'Submissions by owner'
      }

      return 'All ' + orgName + ' submissions'
    }

    function resultsMessage (state, visible, isError) {
      if (isError) return 'Select an owner to view their submissions'

      var word = visible === 1 ? 'result' : 'results'

      // Individual users have no organisation and so no scope radios. Naming
      // an organisation they are not part of would be wrong.
      if (!hasScope) return visible + ' ' + word + ' found'

      return visible + ' ' + word + " found in '" + scopeName(state) + "'"
    }

    function apply (checkForErrors) {
      var state = readState()

      var isError = checkForErrors &&
        state.scope === 'specific-person' &&
        state.people.length === 0

      setErrorState(isError)
      renderTags(buildCategories(state))
      if (caption && hasScope) caption.textContent = scopeName(state)

      if (isError) {
        if (resultsCount) {
          resultsCount.innerHTML = '<strong>' + resultsMessage(state, 0, true) + '</strong>'
        }
        table.style.display = 'none'
        if (noResultsMessage) noResultsMessage.style.display = 'none'
        return
      }

      var visible = 0
      model.forEach(function (item) {
        var show = matches(item, state)
        item.el.style.display = show ? '' : 'none'
        if (show) visible++
      })

      if (resultsCount) {
        resultsCount.innerHTML = '<strong>' + resultsMessage(state, visible, false) + '</strong>'
      }

      table.style.display = visible === 0 ? 'none' : 'table'
      if (noResultsMessage) noResultsMessage.style.display = visible === 0 ? 'block' : 'none'
    }

    // --------------------------------------------------------- conditional

    function conditionalPanel () {
      return document.getElementById('conditional-specific-person')
    }

    function hideConditional () {
      var panel = conditionalPanel()
      if (panel) panel.classList.add('govuk-radios__conditional--hidden')
    }

    function showConditional () {
      var panel = conditionalPanel()
      if (panel) panel.classList.remove('govuk-radios__conditional--hidden')
    }

    function selectAllProjects () {
      var all = document.querySelector('input[name="projectFilter"][value="all-projects"]')
      if (all) all.checked = true
    }

    // -------------------------------------------------------------- events

    if (applyButton) {
      applyButton.addEventListener('click', function (e) {
        e.preventDefault()
        apply(true)
      })
    }

    if (clearLink) {
      clearLink.addEventListener('click', function (e) {
        e.preventDefault()

        selectAllProjects()
        hideConditional()

        ;['filter-type', 'filter-status', 'filter-person'].forEach(function (name) {
          document.querySelectorAll('input[name="' + name + '"]').forEach(function (cb) {
            cb.checked = false
          })
        })

        apply(false)
      })
    }

    document.querySelectorAll('input[name="projectFilter"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (this.value === 'specific-person') {
          showConditional()
        } else {
          hideConditional()
          document.querySelectorAll('input[name="filter-person"]').forEach(function (cb) {
            cb.checked = false
          })
          setErrorState(false)
        }
      })
    })

    // Initial paint, then make the count a live region so later updates are
    // announced but the page does not announce itself on load.
    apply(false)
    if (resultsCount) resultsCount.setAttribute('aria-live', 'polite')
  }

  /*
    Hand the show/hide behaviour to MOJ's own FilterToggleButton rather than
    reimplementing it. It creates the Show filter button, moves focus into the
    panel when opened, and swaps in a Close button below 48.0625em. Its default
    startHidden: true is what we want - the panel is collapsed on load.

    MOJ ships pure ES modules and sets no window.MOJFrontend global, and its
    initAll does not cover this component (it needs a root element passed in).
    So import it directly from the plugin asset the kit already serves. It is
    dynamic and wrapped, so if that path ever moves we lose the toggle button
    and the panel stays open - the filtering itself keeps working.
  */
  var MOJ_FRONTEND = '/plugin-assets/%40ministryofjustice%2Ffrontend/moj/moj-frontend.min.js'

  function initToggleButton () {
    var filter = document.querySelector('.moj-filter')
    if (!filter) return

    import(MOJ_FRONTEND)
      .then(function (moj) { new moj.FilterToggleButton(filter) })
      .catch(function () { /* panel stays visible */ })
  }

  function start () {
    init()
    initToggleButton()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }
})(window)
