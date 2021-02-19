// import { maFeatures } from "./ma-features.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFzdWxpdCIsImEiOiJjaXQzYmFjYmkwdWQ5MnBwZzEzZnNub2hhIn0.EDJ-lIfX2FnKhPw3nqHcqg";

/* Assign a unique ID to each store */
maFeatures.features.forEach(function (feature, i) {
  feature.properties.id = i;
});

/**
 * create map
 */
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v11",
  center: [-84.16378, 9.41126],
  zoom: 13,
  scrollZoom: false,
});

map.on("load", () => {
  map.addSource("places", {
    type: "geojson",
    data: maFeatures,
  });
  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  buildLocationList(maFeatures);
  addMarkers();
});

const addMarkers = () => {
  maFeatures.features.forEach(function (marker) {
    /* Create a div element for the marker. */
    const el = document.createElement("div");
    /* Assign a unique `id` to the marker. */
    el.id = "marker-" + marker.properties.id;
    /* Assign the `marker` class to each marker for styling. */
    el.className = "marker";

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(el, {
      // offset: [0, -23]
    })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    el.addEventListener("click", function (e) {
      /* Fly to the point */
      flyToFeature(marker);
      /* Close all other popups and display popup for clicked feature */
      createPopUp(marker);
      /* Highlight listing in sidebar */
      var activeItem = document.getElementsByClassName("active");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      var listing = document.getElementById("listing-" + marker.properties.id);
      listing.classList.add("active");
    });
  });
};

const buildLocationList = (data) => {
  data.features.forEach((feature, i) => {
    const prop = feature.properties;
    /* Add a new listing section to the sidebar. */
    const listings = document.getElementById("listings");
    const listing = listings.appendChild(document.createElement("div"));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + data.features[i].properties.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = "item";

    /* Add the link to the individual listing created above. */
    let link = listing.appendChild(document.createElement("a"));

    link.href = "#";
    link.className = "title";
    link.id = "link-" + prop.id;
    link.innerHTML = prop.name;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement("div"));

    details.innerHTML = prop.long_description;
    details.id = "link-" + prop.id;
    details.className = "description";

    if (prop.url_title) {
      details.innerHTML += ` <a href=${prop.url} target="_new" rel="noreferrer" >${prop.url_title}</a>`;
    }

    /* both the paragraph and title link */
    link.addEventListener("click", linkHandler);
    details.addEventListener("click", linkHandler);

    function linkHandler(e) {
      for (var i = 0; i < data.features.length; i++) {
        if (this.id === "link-" + data.features[i].properties.id) {
          console.log("  ", this.id);
          var clickedListing = data.features[i];
          flyToFeature(clickedListing);
          createPopUp(clickedListing);
        }
      }
      const activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    }
  });
};

const flyToFeature = (currentFeature) => {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15,
  });
};

const createPopUp = (currentFeature) => {
  var popUps = document.getElementsByClassName("mapboxgl-popup");

  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({
    closeOnClick: true,
    focusAfterOpen: false,
    offset: 8,
  })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<img src=/img/popup/${currentFeature.properties.picture} alt=${currentFeature.properties.name}  />
      <h3>${currentFeature.properties.name}</h3>
        <p>${currentFeature.properties.short_description}</p>`
    )
    .addTo(map);
};
