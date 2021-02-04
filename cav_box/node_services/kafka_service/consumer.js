'use strict'

var kafka = require('kafka-node');
var consumer = kafka.Consumer;
var offset = kafka.Offset;

var client = new Client({ kafkaHost: 'localhost:9092' });
var topics = [{ topic: 'topic1', partition: 1 }, { topic: 'topic2', partition: 0 }];
var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

consumer.on('message', function (message) {
  console.log(message);
});

consumer.on('error', function (err) {
  console.log('error', err);
});