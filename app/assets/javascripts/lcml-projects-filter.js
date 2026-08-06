/*
  Shared filter engine for the three LCML v3 projects-filter explorations.

  The three pages differ only in layout and in how they render selected filters.
  The matching rules, counts and results messaging all live here so that a
  side-by-side comparison is about the design, not about three drifting copies
  of the same logic.

  Usage:

    LcmlProjectsFilter.init({
      tagRenderer: function (categories, remove) { ... },

      selfLabel: 'You',        // prefix on the current user's own entry
      pinSelf: false,          // true keeps them top of the list, not sorted in
      allowEmptyOwner: false   // true treats "by owner, nobody picked" as
                               // everyone rather than as an error
    })

  Counts shown against each option are TOTALS from the rendered table. They do
  not respond to other active filters — worth a conversation with the team, as
  facet-style counts would prevent more dead ends but move as you filter.
*/
(function (global) {
  'use strict'

  var CURRENT_USER = 'jon-doe'

  function text (el) {
    return el ? el.textContent.trim() : ''
  }

  function init (options) {
    var selfPrefix = options.selfLabel || 'You'
    var pinSelf = options.pinSelf === true
    var allowEmptyOwner = options.allowEmptyOwner === true

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
              ? selfPrefix + ' (' + item.ownerName + ')'
              : item.ownerName
          })
        }
      })

      owners.sort(function (a, b) {
        if (pinSelf) {
          if (a.value === CURRENT_USER) return -1
          if (b.value === CURRENT_USER) return 1
        }
        return a.label.localeCompare(b.label)
      })
    }

    // Plain names read better in prose ("Projects by Sam Evans"); labels carry
    // the You/Me prefix and are what the controls and tags show.
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

    function alphabetical (values) {
      return values.sort(function (a, b) { return a.localeCompare(b) })
    }

    buildCheckboxes(
      document.getElementById('type-checkboxes'),
      alphabetical(uniqueBy('type')),
      'filter-type',
      'type',
      function (v) { return v + ' (' + countBy('type', v) + ')' }
    )

    buildCheckboxes(
      document.getElementById('status-checkboxes'),
      alphabetical(uniqueBy('status')),
      'filter-status',
      'status',
      function (v) { return v + ' (' + countBy('status', v) + ')' }
    )

    var countAll = document.getElementById('count-all-projects')
    var countMine = document.getElementById('count-my-projects')
    if (countAll) countAll.textContent = '(' + model.length + ')'
    if (countMine) countMine.textContent = '(' + countBy('creator', CURRENT_USER) + ')'

    buildCheckboxes(
      document.getElementById('person-checkboxes'),
      owners.map(function (o) { return o.value }),
      'filter-person',
      'person',
      function (v) { return ownerLabels[v] + ' (' + countBy('creator', v) + ')' }
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
        name: projectNameInput ? projectNameInput.value.trim().toLowerCase() : '',
        reference: referenceInput ? referenceInput.value.trim().toLowerCase() : '',
        people: checkedValues('filter-person'),
        types: checkedValues('filter-type'),
        statuses: checkedValues('filter-status')
      }
    }

    function matches (item, state) {
      if (state.scope === 'my-projects' && item.creator !== CURRENT_USER) return false

      if (state.scope === 'specific-person') {
        if (state.people.length === 0) {
          // Nobody picked yet. Either that is an error the caller wants to
          // raise, or the scope simply has not started narrowing anything.
          if (!allowEmptyOwner) return false
        } else if (state.people.indexOf(item.creator) === -1) {
          return false
        }
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

      // Individual users have no organisation and so no scope radios. Naming
      // an organisation they are not part of would be wrong.
      if (!hasScope) return visible + ' ' + word + ' found'

      var allProjects = visible + ' ' + word + " found in 'All " + orgName + " projects'"

      if (state.scope === 'my-projects') {
        return visible + ' ' + word + " found in 'My projects'"
      }

      if (state.scope === 'specific-person') {
        var names = state.people.map(function (v) { return ownerNames[v] }).join(', ')
        if (!names) {
          // Nothing narrowed yet, so say what is actually on screen rather
          // than naming a scope the user has not filled in.
          return allowEmptyOwner ? allProjects : visible + ' ' + word + " found in 'Projects by owner'"
        }
        return visible + ' ' + word + " found in 'Projects by " + names + "'"
      }

      return allProjects
    }

    function apply (checkForErrors) {
      var state = readState()

      var isError = !allowEmptyOwner &&
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

    return { apply: apply, removeFilter: removeFilter }
  }

  global.LcmlProjectsFilter = { init: init }
})(window)
