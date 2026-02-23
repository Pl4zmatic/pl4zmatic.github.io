var map = new maplibregl.Map({
    container: 'map',
    style: './js/map_style.json', // stylesheet location
    center: [3.73, 51.05], // starting position [lng, lat]
    zoom: 7, // starting zoom
    interactive: false
});

new maplibregl.Marker()
  .setLngLat([3.8097, 51.2024])
  .addTo(map);

const attributionMap = document.getElementsByClassName("maplibregl-ctrl maplibregl-ctrl-attrib maplibregl-compact");
attributionMap[0].removeAttribute("open")
attributionMap[0].classList.toggle("maplibregl-compact-show")

const domMap = document.getElementById("map");
domMap.addEventListener("animationend", () => {
    map.flyTo({
        center: [3.73, 51.05],
        essential: true,
        zoom: 9,
        speed: 0.5,
    });
})

map.once("moveend", () => {
    map.flyTo({
        center: [3.8097, 51.2024],
        essential: true,
        zoom: 12,
        speed: 0.5,
    });
})