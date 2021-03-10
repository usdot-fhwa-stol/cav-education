// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:1337');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Connected to Websocket Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    console.log(event.data.length);
    console.log(event.data.indexOf('{'));
    console.log(event.data.substr(event.data.indexOf('{'), event.data.length-event.data.indexOf('{')));
    let jsonStr=event.data.substr(event.data.indexOf('{'), event.data.length-event.data.indexOf('{'));
    let jsonObj = JSON.parse(jsonStr);
    console.log(jsonObj.messageId);
    console.log(jsonObj.message_type);
});