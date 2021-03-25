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
var curRequestStartingOffset = 0;
var kafkaHost = process.env.BOOTSTRAP_SERVERS

const registryUrl = 'http://schema-registry:8081'

const avro = require('avsc')
const registry = require('avro-schema-registry')(registryUrl)
const KafkaAvro = require('kafka-avro');

const dsrc_schema = require('./models/dsrc_message_value.json');
const type = avro.Type.forSchema(dsrc_schema);


const kafkaAvro = new KafkaAvro({
  kafkaBroker: kafkaHost,
  schemaRegistry: registryUrl,
});

// Query the Schema Registry for all topic-schema's
// fetch them and evaluate them.
kafkaAvro.init()
  .then(function () {
    console.log('Ready to use');
  });


const app = express();
const port = 8080;

var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(WEBSOCKET_PORT, function () {});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);

  var socketClients = [];
  var index = socketClients.push(connection) - 1;
  console.log("socketClients index " + index);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      // process WebSocket message    
      console.log("request utf8 " + message.utf8Data);
    }

    kafkaAvro.getConsumer({
        'group.id': 'prototype_msg',
        'socket.keepalive.enable': true,
        'enable.auto.commit': true,
        'enable.auto.offset.store': true
      })
      // the "getConsumer()" method will return a bluebird promise.
      .then(function (consumer) {
        // Perform a consumer.connect()
        return new Promise(function (resolve, reject) {
          consumer.on('ready', function () {
            resolve(consumer);
          });

          consumer.connect({}, function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(consumer); // depend on Promises' single resolve contract.
          });
        });
      })
      .then(function (consumer) {
        // Subscribe and consume.
        const topicName = DSRC_TOPIC_NAME;
        consumer.subscribe([topicName]);
        consumer.consume();

        consumer.on('data', function (rawData) {
          console.log(rawData)
          const data = type.fromBuffer(rawData.value.slice(5)) 
          console.log(data)
           socketClients[index].sendUTF(data);
        });

      });



    // var clients = [];
    // var index = clients.push(connection) - 1;

    // var client = new Client({ kafkaHost: kafkaHost });
    // if(client !=null && client != 'undefined')
    // {
    //     var topics = [{ topic: DSRC_TOPIC_NAME,partition: 0, time: Date.now(), maxNum: 1}];
    //     var options = {
    //                     autoCommit: true, 
    //                     fetchMaxWaitMs: 1000, 
    //                     groupId: 'prototype_msg',
    //                     fetchMaxBytes: 1024 * 1024 ,
    //                     // commitOffsetsOnFirstJoin: true, 
    //                     // fromBeginning: false, 
    //                     fromOffset: 'latest'
    //                 };

    //     //get latest offset
    //     var offset = new kafka.Offset(client);

    //     offset.fetch([{topic: DSRC_TOPIC_NAME, partition: 0, time: -1}],function(err,data){
    //         curRequestStartingOffset = data[DSRC_TOPIC_NAME]['0'][0];
    //     });

    //     var consumer = new Consumer(client, topics, options);

    //     consumer.on('message', function (message) {
    //         console.log(message);
    //         console.log("last request max digested offset: " + (curRequestStartingOffset - 1));

    //         //only send the latest offset message to web socket
    //         if(message.offset >= curRequestStartingOffset){
    //             // console.log( message.offset);
    //             // console.log( message.value);

    //             v = registry.decode(message.value);
    //             console.log("correct", v);                    

    //             clients[0].sendUTF(message.value);
    //         }

    //     });

    //     consumer.on('error', function (err) {
    //         console.log('error', err);
    //     });

    // }else{
    //   console.log('Kafka client is not found.');
    // }


    connection.on('close', function (connection) {
      // close user connection
      console.log("Connection is closed");
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});