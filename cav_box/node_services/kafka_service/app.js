const express = require('express')
var WebSocketServer = require('websocket').server;
var http = require('http');
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.KafkaClient;

const app = express();
const port = 8080;

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
  });
  server.listen(1337, function() { });
  
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
        // var topics = [{ topic: 'topic1',},{ topic: 'topic2'}];
        var topics = [{ topic: 'incomming_dsrc_message',partition: 0, time: Date.now(), maxNum: 1}];
        var options = {
                        autoCommit: true, 
                        fetchMaxWaitMs: 1000, 
                        groupId: 'ExampleTestGroup', 
                        fetchMaxBytes: 1024 * 1024 ,
                        // commitOffsetsOnFirstJoin: true, 
                        // fromBeginning: false, 
                         fromOffset: 'latest'
                    }; 

        var consumer = new Consumer(client, topics, options);

        consumer.on('message', function (message) {
            console.log(message);
            clients[0].sendUTF(message.value);
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


app.get('/send', async(req, res) => {
    res.send('producer message to kafka topic test-topic');    
    produce();   
});

function produce()
{
    var client = new Client();
    var producer = new Producer(client, { requireAcks: 1 });

    producer.on('ready', function () {
        producer.send([
            { topic: 'topic1', partitions: 0, messages: ["This is the zero message I am sending from Kafka to Spark1"], attributes: 0},
            { topic: 'topic2', partitions: 1, messages: ["This is the first message I am sending from Kafka to Spark2"], attributes: 0}
        ], function (
            err,
            result
        ) {
                console.log(err || result);
                //process.exit();
        });
    });

    producer.on('error', function (err) {
        console.log('error', err);
    });
}

function subcribe(){
    var client = new Client({ kafkaHost: 'localhost:9092' });
    var topics = [{ topic: 'incomming_dsrc_message',},{ topic: 'topic2'}];
    var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

    var consumer = new Consumer(client, topics, options);

    consumer.on('message', function (message) {
        console.log(message);
    });

    consumer.on('error', function (err) {
        console.log('error', err);
    });

    // consumer.addTopics([
    //     { topic: 'topic1', partition: 0, offset: 0}
    //   ], () => console.log("topic added"));
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});