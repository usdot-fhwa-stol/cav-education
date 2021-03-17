
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZGR1MjAyMCIsImEiOiJja2IxYWNsbHAwNTlpMnNvZHA1N3cycXRnIn0.kJTQSAbkdQ3z02Aid1RMWg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-77.150481, 38.956273], // starting position [lng, lat]
zoom: 16 // starting zoom
})


// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:1337');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Connected to Websocket Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('gps_mapbox.js - Message from server ', event.data);
    let jsonObj = JSON.parse(event.data);
    let message_type = '';
    if(jsonObj != null && jsonObj.message_type != null)
         message_type = jsonObj.message_type.trim();
    console.log(jsonObj);
    console.log(message_type);
    //get incoming message latitude and longitude
    let longLatSt = getLatLogFromMessage(jsonObj);
    if(longLatSt.length == 0)
        return;

    //create a new marker for different message_types and add the marker to map
    createMarkerToMapByMessageType(longLatSt, message_type,map);

});


function createMarkerToMapByMessageType(longLatSt, message_type,map)
{
    let markerColor = '';
    switch(message_type)
    {
        case "TIM":
            markerColor=ColorStr.Blue; break;

        case "BSM":
            markerColor=ColorStr.Red; break;

        case "SPAT":
            markerColor=ColorStr.Green; break;

        case "MAP":
            markerColor=ColorStr.Orange; break;

        default:
            console.error('unknown message type');
            break;
    }
    let marker = new mapboxgl.Marker({
        color: markerColor,
        draggable: false
    }).setLngLat([longLatSt[0], longLatSt[1]]).addTo(map);

    map.setCenter([longLatSt[0], longLatSt[1]]);
}

function getLatLogFromMessage(jsonObj)
{
    let longLatSt = [];//[long, lat]
    if(jsonObj != null && jsonObj.coreData !=null && jsonObj.coreData.lat !=null && jsonObj.coreData.long != null)
    {
        longLatSt.push(jsonObj.coreData.long);
        longLatSt.push(jsonObj.coreData.lat);
    }
    return longLatSt;
}