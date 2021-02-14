import { maFeatures } from './ma-features.js';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGFzdWxpdCIsImEiOiJjaXQzYmFjYmkwdWQ5MnBwZzEzZnNub2hhIn0.EDJ-lIfX2FnKhPw3nqHcqg';
/**
 * load data
 */
// const dataCall = (loadData = async () => {
//   const response = await fetch('/js/ma-features.json');
//   const data = await response.json();
//   return data;
// });

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  center: [-84.15285, 9.41126],
  zoom: 15,
  bearing: 12,
  pitch: 48,
});

map.on('load', function () {
  map.addSource('dem', {
    type: 'raster-dem',
    url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
  });
  map.setTerrain({ source: 'dem', exaggeration: 1.0 });
  map.addMarkers(maFeatures);
});

/**
 *
 * @param {mapbox api} mapboxGl
 * @param {curr map} map
 */
// function initializeMap(mapboxGl, map) {
//   map.addControl(new mapboxGl.NavigationControl(), 'bottom-right');
// }

/**
 *
 * @param {curr map} map
 * @param {data from api} data
 */
function addMarkers(map, maFeatures) {
  maFeatures.features.forEach(function (marker) {
    var el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ focusAfterOpen: false, offset: 8 }).setHTML(
          `<h3>${marker.properties.name}</h3>
          <p>${marker.properties.long_description}</p>
          <button>Add</button>
          `,
        ),
      )
      .addTo(map);
  });
}

dataCall().then((maFeatures) => {
  createMap(maFeatures);
  addMarkers(map, maFeatures);
  /* Assign a unique ID to each store */
  maFeatures.features.forEach(function (store, i) {
    store.properties.id = i;
  });
});

// initializeMap(mapboxgl, map);
