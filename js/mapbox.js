/**
 * variables
 */

const faves = [];

/**
 * create map
 */

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFzdWxpdCIsImEiOiJjaXQzYmFjYmkwdWQ5MnBwZzEzZnNub2hhIn0.EDJ-lIfX2FnKhPw3nqHcqg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v11",
  center: [-84.15285, 9.41126],
  zoom: 15,
});

/**
 * load data
 */
const dataCall = (loadData = async () => {
  const response = await fetch("/js/ma-features.json");
  const data = await response.json();
  return data;
});

/**
 *
 * @param {mapbox api} mapboxGl
 * @param {curr map} map
 */
function initializeMap(mapboxGl, map) {
  map.addControl(new mapboxGl.NavigationControl(), "bottom-right");
}

/**
 *
 * @param {curr map} map
 * @param {data from api} data
 */
function addMarkers(map, data) {
  data.features.forEach(function (marker) {
    var el = document.createElement("div");
    el.className = "marker";
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ focusAfterOpen: false, offset: 8 }).setHTML(
          `<h3>${marker.properties.name}</h3>
          <p>${marker.properties.long_description}</p>
          <button>Add</button>
          `
        )
      )
      .addTo(map);
  });
}

function setFave(fave) {
  faves.push(fave);
}

dataCall().then((data) => {
  addMarkers(map, data);
});

initializeMap(mapboxgl, map, setFave);

//  LAYERS

// function addLayer(map, data) {
// map.addLayer({
//   id: "ma-layer",
//   type: "circle",
//   source: "ma-source",
//   paint: {
//     "circle-color": "rgb(230, 30, 30)",
//     "circle-radius": 8,
//     "circle-stroke-width": 2,
//     "circle-stroke-color": "#fff",
//   },
// });
// }

// function initializeMap(
//   mapboxGl,
//   map
// , setFave
// ) {
// map.addControl(new mapboxGl.NavigationControl(), "bottom-right");
// map.on("click", "ma-layer", (event) => {
//   const tooltipEl = new mapboxgl.Popup({ focusAfterOpen: false, offset: 8 });
//   const features = event.features[0];
//   const coordinates = features.geometry.coordinates.slice();

//   const tooltipNode = document.createElement("div");
//   ReactDOM.render(
//     <Tooltip properties={features.properties} setFave={setFave} />,
//     tooltipNode
//   );

//   tooltipEl.setLngLat(coordinates).setDOMContent(tooltipNode).addTo(map);
// });
// }
