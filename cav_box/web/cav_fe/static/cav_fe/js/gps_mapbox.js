
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
    let message_type_obj = null;
    if(jsonObj != null && jsonObj.message_type != null)
         message_type_obj = jsonObj.message_type;

    console.log(JSON.stringify(message_type_obj));
    if(message_type_obj != null && message_type_obj.string != null)
    {
        message_type = message_type_obj.string;
        console.log(JSON.stringify(message_type_obj));
    }else{
		console.error("Message type is null");
    }
    //get incoming message latitude and longitude
    let longLatSt = getLatLogFromMessage(jsonObj);
    console.log("return lat and long "+ longLatSt);
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

        case "BasicSafetyMessage":
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
    console.log(jsonObj.payload.string);
    if(jsonObj!= null && jsonObj.payload != null && jsonObj.payload.string != null)
    {

        let coreDataStr = JSON.parse(jsonObj.payload.string);

        if(coreDataStr.coreData !=null && coreDataStr.coreData.lat !=null && coreDataStr.coreData.long != null)
        {
            //convert lat and long
            let lat = coreDataStr.coreData.lat;
            let long = coreDataStr.coreData.long;
            let latStr = longStr = "";
            if(lat > 0)
            {
                latStr = lat.toString().slice(0,2) + "." + lat.toString().slice(2);
            }else{
                latStr = lat.toString().slice(0,3) + "." + lat.toString().slice(3);
            }
            if(long > 0)
            {
              longStr = long.toString().slice(0,2) + "." + long.toString().slice(2);
            }else{
              longStr = long.toString().slice(0,3) + "." + long.toString().slice(3);
            }
            //Add longitude first
            longLatSt.push(parseFloat(longStr));

            //Add latitude second
            longLatSt.push(parseFloat(latStr));
        }
    }else{
        console.error("CoreData does not container Lat/Long");
    }
    return longLatSt;
}