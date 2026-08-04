/*
  Shared filter engine for the three LCML v3 projects-filter explorations.

  The three pages differ only in layout and in how they render selected filters.
  The matching rules, counts and results messaging all live here so that a
  side-by-side comparison is about the design, not about three drifting copies
  of the same logic.

  Usage:

    LcmlProjectsFilter.init({
      mode: 'radios' | 'owners',
      tagRenderer: function (categories, remove) { ... }
    })

  Counts shown against each option are TOTALS from the rendered table. They do
  not respond to other active filters — worth a conversation with the team, as
  facet-style counts would prevent more dead ends but move as you filter.
*/
(function (global) {
  'use strict'

  var CURRENT_USER = 'jon-doe'
  var CURRENT_USER_NAME = 'Sam Evans'

  function text (el) {
    return el ? el.textContent.trim() : ''
  }

  function init (options) {
    var mode = options.mode || 'radios'
    var table = document.getElementById('projects-table')
    if (!table) return

    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'))
    var noResultsMessage = document.getElementById('no-results-message')
    var resultsCount = document.getElementById('results-count')
    var projectNameInput = document.getElementById('filter-project-name')
    var referenceInput = document.getElementById('filter-reference')
    var applyButton = document.getElementById('apply-filters')
    var clearLink = document.getElementById('clear-filters')

    var orgCaption = document.querySelector('.govuk-caption-l')
    var orgName = text(orgCaption) || 'Ramsgate Marina'

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
        name: (row.getAttribute('data-project-name') || '').toLowerCase(),
        type: row.getAttribute('data-type') || '',
        reference: (row.getAttribute('data-reference') || '').toLowerCase(),
        status: row.getAttribute('data-status') || '',
        ownerName: hasOwners ? text(row.cells[ownerIndex]) : ''
      }
    })

    function uniqueBy (key) {
      var seen = []
      model.forEach(function (item) {
        if (item[key] && seen.indexOf(item[key]) === -1) seen.push(item[key])
      })
      return seen
    }

    function countBy (key, value) {
      return model.filter(function (item) { return item[key] === value }).length
    }

    // Owners present in the table, current user first. Nobody with zero
    // projects appears, so no phantom options when session data hides rows.
    var owners = []
    if (hasOwners) {
      model.forEach(function (item) {
        var known = owners.some(function (o) { return o.value === item.creator })
        if (!known && item.creator) {
          owners.push({ value: item.creator, name: item.ownerName })
        }
      })
      owners.sort(function (a, b) {
        if (a.value === CURRENT_USER) return -1
        if (b.value === CURRENT_USER) return 1
        return a.name.localeCompare(b.name)
      })
    }

    var ownerNames = {}
    owners.forEach(function (o) { ownerNames[o.value] = o.name })

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
      function (v) { return v + ' (' + countBy('type', v) + ')' }
    )

    buildCheckboxes(
      document.getElementById('status-checkboxes'),
      uniqueBy('status'),
      'filter-status',
      'status',
      function (v) { return v + ' (' + countBy('status', v) + ')' }
    )

    if (mode === 'owners' && hasOwners) {
      buildCheckboxes(
        document.getElementById('owner-checkboxes'),
        owners.map(function (o) { return o.value }),
        'filter-owner',
        'owner',
        function (v) {
          var label = v === CURRENT_USER ? 'Me (' + CURRENT_USER_NAME + ')' : ownerNames[v]
          return label + ' (' + countBy('creator', v) + ')'
        }
      )
    }

    // Counts against the Show radios (options A and B).
    if (mode === 'radios') {
      var countAll = document.getElementById('count-all-projects')
      var countMine = document.getElementById('count-my-projects')
      if (countAll) countAll.textContent = '(' + model.length + ')'
      if (countMine) countMine.textContent = '(' + countBy('creator', CURRENT_USER) + ')'

      buildCheckboxes(
        document.getElementById('person-checkboxes'),
        owners.map(function (o) { return o.value }),
        'filter-person',
        'person',
        function (v) { return ownerNames[v] + ' (' + countBy('creator', v) + ')' }
      )
    }

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
        name: projectNameInput ? projectNameInput.value.trim().toLowerCase() : '',
        reference: referenceInput ? referenceInput.value.trim().toLowerCase() : '',
        people: checkedValues('filter-person'),
        ownersSelected: checkedValues('filter-owner'),
        types: checkedValues('filter-type'),
        statuses: checkedValues('filter-status')
      }
    }

    function matches (item, state) {
      if (mode === 'radios') {
        if (state.scope === 'my-projects' && item.creator !== CURRENT_USER) return false
        if (state.scope === 'specific-person') {
          if (state.people.length === 0) return false
          if (state.people.indexOf(item.creator) === -1) return false
        }
      } else if (state.ownersSelected.length > 0) {
        if (state.ownersSelected.indexOf(item.creator) === -1) return false
      }

      if (state.name && item.name.indexOf(state.name) === -1) return false
      if (state.reference && item.reference.indexOf(state.reference) === -1) return false
      if (state.types.length > 0 && state.types.indexOf(item.type) === -1) return false
      if (state.statuses.length > 0 && state.statuses.indexOf(item.status) === -1) return false

      return true
    }

    // ---------------------------------------------------------- error state

    function setErrorState (on) {
      var panel = document.querySelector('.govuk-radios__conditional')
      var message = document.getElementById('person-error-message')
      if (panel) panel.classList.toggle('error-state', on)
      if (message) message.style.display = on ? 'block' : 'none'
      if (resultsCount) resultsCount.classList.toggle('error-message', on)
    }

    // ---------------------------------------------------------------- tags

    function buildCategories (state) {
      var categories = []

      if (state.name) {
        categories.push({
          heading: 'Project name',
          items: [{ text: projectNameInput.value.trim(), type: 'name' }]
        })
      }

      if (state.reference) {
        categories.push({
          heading: 'Reference',
          items: [{ text: referenceInput.value.trim(), type: 'reference' }]
        })
      }

      if (mode === 'radios' && state.scope === 'specific-person' && state.people.length > 0) {
        categories.push({
          heading: 'Owner',
          items: state.people.map(function (v) {
            return { text: ownerNames[v], type: 'person', value: v }
          })
        })
      }

      if (mode === 'owners' && state.ownersSelected.length > 0) {
        categories.push({
          heading: 'Owner',
          items: state.ownersSelected.map(function (v) {
            var label = v === CURRENT_USER ? 'Me (' + CURRENT_USER_NAME + ')' : ownerNames[v]
            return { text: label, type: 'owner', value: v }
          })
        })
      }

      if (state.types.length > 0) {
        categories.push({
          heading: 'Type',
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

    function uncheck (name, value) {
      var cb = document.querySelector('input[name="' + name + '"][value="' + value + '"]')
      if (cb) cb.checked = false
    }

    function removeFilter (type, value) {
      if (type === 'name') projectNameInput.value = ''
      else if (type === 'reference') referenceInput.value = ''
      else if (type === 'type') uncheck('filter-type', value)
      else if (type === 'status') uncheck('filter-status', value)
      else if (type === 'owner') uncheck('filter-owner', value)
      else if (type === 'person') {
        uncheck('filter-person', value)
        // Dropping the last person leaves the scope radio pointing at nothing
        // meaningful, so fall back to showing everything.
        if (checkedValues('filter-person').length === 0) {
          var all = document.querySelector('input[name="projectFilter"][value="all-projects"]')
          if (all) all.checked = true
          hideConditional()
        }
      }
      apply(false)
    }

    // ------------------------------------------------------------- results

    function resultsMessage (state, visible, isError) {
      if (isError) return 'Select an owner to view their projects'

      var word = visible === 1 ? 'result' : 'results'

      if (mode === 'owners') {
        return visible + ' ' + word + ' found'
      }

      if (state.scope === 'my-projects') {
        return visible + ' ' + word + " found in 'My projects'"
      }
      if (state.scope === 'specific-person') {
        var names = state.people.map(function (v) { return ownerNames[v] }).join(', ')
        return visible + ' ' + word + " found in 'Projects by " + (names || 'owner') + "'"
      }
      return visible + ' ' + word + " found in 'All " + orgName + " projects'"
    }

    function apply (checkForErrors) {
      var state = readState()

      var isError = mode === 'radios' &&
        checkForErrors &&
        state.scope === 'specific-person' &&
        state.people.length === 0

      setErrorState(isError)

      if (options.tagRenderer) {
        options.tagRenderer(buildCategories(state), removeFilter)
      }

      if (isError) {
        if (resultsCount) {
          resultsCount.innerHTML = '<strong>' + resultsMessage(state, 0, true) + '</strong>'
          resultsCount.style.display = 'block'
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
        resultsCount.style.display = 'block'
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

        var all = document.querySelector('input[name="projectFilter"][value="all-projects"]')
        if (all) all.checked = true
        hideConditional()

        if (projectNameInput) projectNameInput.value = ''
        if (referenceInput) referenceInput.value = ''

        ;['filter-type', 'filter-status', 'filter-person', 'filter-owner'].forEach(function (name) {
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

    return { apply: apply, removeFilter: removeFilter }
  }

  global.LcmlProjectsFilter = { init: init }
})(window)
