
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZGR1MjAyMCIsImEiOiJja2IxYWNsbHAwNTlpMnNvZHA1N3cycXRnIn0.kJTQSAbkdQ3z02Aid1RMWg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [12.550343, 55.665957], // starting position [lng, lat]
zoom: 16 // starting zoom
})

var marker1 = new mapboxgl.Marker({
    color: "#3FB1CE",
    draggable: false
}).setLngLat([12.550343, 55.665957]).addTo(map);

var marker2 = new mapboxgl.Marker().setLngLat([12.551349, 55.665957]).addTo(map);
