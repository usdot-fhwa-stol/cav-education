const express = require('express')
var WebSocketServer = require('websocket').server;
var http = require('http');
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.KafkaClient;
var DSRC_TOPIC_NAME = "incomming_dsrc_message";
var WEBSOCKET_PORT = 1337;
var curRequestStartingOffset=0;

const app = express();
const port = 8080;

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });
  server.listen(WEBSOCKET_PORT, function() { });

  // create the server
    wsServer = new WebSocketServer({
        httpServer: server
    });
  
  // WebSocket server
  wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
  
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
      if (message.type === 'utf8') {
            // process WebSocket message    
            console.log("request utf8 " + message.utf8Data);  
        }  
        var clients = [];
        var index = clients.push(connection) - 1;

        var client = new Client({ kafkaHost: 'localhost:9092' });
        var topics = [{ topic: DSRC_TOPIC_NAME,partition: 0, time: Date.now(), maxNum: 1}];
        var options = {
                        autoCommit: true, 
                        fetchMaxWaitMs: 1000, 
                        groupId: 'prototype_msg',
                        fetchMaxBytes: 1024 * 1024 ,
                        // commitOffsetsOnFirstJoin: true, 
                        // fromBeginning: false, 
                         fromOffset: 'latest'
                    };

        //get latest offset
        var offset = new kafka.Offset(client);

        offset.fetch([{topic: DSRC_TOPIC_NAME, partition: 0, time: -1}],function(err,data){
            curRequestStartingOffset = data[DSRC_TOPIC_NAME]['0'][0];
        });

        var consumer = new Consumer(client, topics, options);

        consumer.on('message', function (message) {
            console.log(message);
            console.log("last request max digested offset: " + (curRequestStartingOffset - 1));

            //only send the latest offset message to web socket
            if(message.offset >= curRequestStartingOffset){
                console.log( message.offset);
                console.log( message.value);
                clients[0].sendUTF(message.value);
            }

        });

        consumer.on('error', function (err) {
            console.log('error', err);
        });

        connection.on('close', function(connection) {
            // close user connection
            console.log("Connection is closed");
        });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});