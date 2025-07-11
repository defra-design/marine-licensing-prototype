// Generated by Copilot
const { log } = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {
    let version = "versions/mvp-multi-sites/";
    let section = "exemption/";

//////////////////////////////////////////////////////////////////////////////////////////////
// Enter multiple coordinates of the area
// TEXT ENTRY
/////////////////////////////////////////////////////////////////////////////////////////////

// This clears the red borders on the page when you go back to it if there were previous errors
router.get('/' + version + section + 'enter-multiple-coordinates-v1', function (req, res) {
    // Clear all coordinate-related error flags
    for (let i = 1; i <= 5; i++) {
      req.session.data[`error-coordinates-point-${i}-latitude`] = '';
      req.session.data[`error-coordinates-point-${i}-longitude`] = '';
    }
  
    req.session.data['errorthispage'] = 'false';
    req.session.data['errors'] = [];
  
    res.render(version + section + 'enter-multiple-coordinates-v1');
  });

  
router.post('/' + version + section + 'enter-multiple-coordinates-v1-router', function (req, res) {
    // Clear any previous error flags for the 6 fields
    req.session.data['error-coordinates-point-1-latitude'] = '';
    req.session.data['error-coordinates-point-1-longitude'] = '';
    req.session.data['error-coordinates-point-2-latitude'] = '';
    req.session.data['error-coordinates-point-2-longitude'] = '';
    req.session.data['error-coordinates-point-3-latitude'] = '';
    req.session.data['error-coordinates-point-3-longitude'] = '';
  
    // Define the points with anchors for each coordinate field
    const points = [
      {
        lat: req.session.data['coordinates-point-1-latitude'],
        lng: req.session.data['coordinates-point-1-longitude'],
        label: 'the start and end point',
        latAnchor: 'coordinates-point-1-latitude',
        lngAnchor: 'coordinates-point-1-longitude'
      },
      {
        lat: req.session.data['coordinates-point-2-latitude'],
        lng: req.session.data['coordinates-point-2-longitude'],
        label: 'point 2',
        latAnchor: 'coordinates-point-2-latitude',
        lngAnchor: 'coordinates-point-2-longitude'
      },
      {
        lat: req.session.data['coordinates-point-3-latitude'],
        lng: req.session.data['coordinates-point-3-longitude'],
        label: 'point 3',
        latAnchor: 'coordinates-point-3-latitude',
        lngAnchor: 'coordinates-point-3-longitude'
      }
    ];
  
    // Build error messages array
    let errors = [];
  
    points.forEach((point) => {
      const latEmpty = !point.lat || point.lat.trim() === '';
      const lngEmpty = !point.lng || point.lng.trim() === '';
  
      if (latEmpty && lngEmpty) {
        errors.push({ text: `Enter the latitude and longitude coordinates of ${point.label}`, anchor: point.latAnchor });
        req.session.data['error-' + point.latAnchor] = 'true';
        req.session.data['error-' + point.lngAnchor] = 'true';
      } else if (latEmpty) {
        errors.push({ text: `Enter the latitude coordinates of ${point.label}`, anchor: point.latAnchor });
        req.session.data['error-' + point.latAnchor] = 'true';
      } else if (lngEmpty) {
        errors.push({ text: `Enter the longitude coordinates of ${point.label}`, anchor: point.lngAnchor });
        req.session.data['error-' + point.lngAnchor] = 'true';
      }
    });
  
    // If there are any errors, set the error flag and store the errors array
    if (errors.length > 0) {
      req.session.data['errorthispage'] = 'true';
      req.session.data['errors'] = errors;
      return res.redirect('enter-multiple-coordinates-v1');
    }
  
    // Otherwise, clear errors and proceed
    req.session.data['errorthispage'] = 'false';
    req.session.data['errors'] = [];
    return res.redirect('review-location');
  });
}