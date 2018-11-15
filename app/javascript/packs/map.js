import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

const mapElement = document.getElementById('map');

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = process.env.MAPBOX_API_KEY; // API key from `.env`
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
  });

  const markers = JSON.parse(mapElement.dataset.markers);

  markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([marker.lng, marker.lat])
      .addTo(map);
  })

  if (markers.length === 0) {
    map.setZoom(1);
  } else if (markers.length === 1) {
    map.setZoom(14);
    map.setCenter([markers[0].lng, markers[0].lat]);
  } else {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach((marker) => {
      bounds.extend([marker.lng, marker.lat]);
    });
    map.fitBounds(bounds, { duration: 0, padding: 75 })
  }

  markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([marker.lng, marker.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(marker.infoWindow.content))
      .addTo(map);
  })

  // markers.forEach((marker) => {
  //   new mapboxgl.Popup({ closeOnClick: false, offset: 10 })
  //     .setLngLat([marker.lng, marker.lat])
  //     .setHTML(marker.priceWindow.content)
  //     .addTo(map);
  // })


}

const addressInput = document.getElementById('flat_address');

if (addressInput) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInput,
    type: 'city',
    templates: {
      value: function(suggestion) {
        return suggestion.name;
      }
    }
  });
}

const addressInput2 = document.getElementById('flat_address_2');

if (addressInput2) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInput2,
  });
}
