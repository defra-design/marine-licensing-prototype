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
})
