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
domMap.addEventListener("animationend", async () => {
    await flyTo(map, 3.73, 51.05, 9, 0.4);
    await flyTo(map, 3.8097, 51.2024, 12, 0.5);
    await flyTo(map, 3.7745, 51.1372, 9, 0.25);
})

function round(num, precision) {
    return Number.parseFloat(num).toFixed(precision);
}

function flyTo(Map, lng, lat, zoom, speed) {
    return new Promise((resolve, reject) => {
        Map.flyTo({
            center: [lng, lat],
            essential: true,
            zoom: zoom,
            speed: speed,
        });

        Map.on("moveend", () => {
            console.log('move end')
            if(round(Map.getCenter().lng, 2) == round(lng, 2) && round(Map.getCenter().lat, 2) == round(lat, 2)) {
                console.log('resolve')
                resolve();
            }
        })
    })
}