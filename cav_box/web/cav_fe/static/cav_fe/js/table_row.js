'use strict';

class TableRowList extends React.Component {
   
  render() {  
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.value}</td>
                <td></td>
                <td className="message view pointer" id={this.props.id} data-toggle="modal" data-target="#exampleModalCenter">View</td>
            </tr>            
        );
  }
}

// Create WebSocket connection.
// let socket = new WebSocket('ws://localhost:1337');

// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Connected to Websocket Server!');
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
//     console.log(event.data.length);
//     console.log(event.data.indexOf('{'));
//     console.log(event.data.substr(event.data.indexOf('{'), event.data.length-event.data.indexOf('{')));
//     let jsonStr=event.data.substr(event.data.indexOf('{'), event.data.length-event.data.indexOf('{'));
//     let jsonObj = JSON.parse(jsonStr);
//     console.log(jsonObj.messageId);
//     console.log(jsonObj.value);
//     jsonObj.messageId;
    
//     ReactDOM.render(
//         <TableRowList id={jsonObj.messageId} value = {jsonObj.value[0]}/>,
//         document.getElementById('message-body')
//     );

//     ReactDOM.render(
//         <MessageDetailModal details={JSON.stringify(jsonObj.value[1])} />,
//         document.getElementById("modal-area")
//     );
// });

   
