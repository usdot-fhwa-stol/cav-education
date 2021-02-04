'use strict';

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.KafkaClient;
var client = new Client();
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
  var message = 'a message';
  var keyedMessage = new KeyedMessage('keyed', 'a keyed message');

  producer.send([{ topic: 'topic1', partition: 1, messages: [message, keyedMessage], attributes: 0 }], function (
    err,
    result
  ) {
    console.log(err || result);
    process.exit();
  });
});

producer.on('error', function (err) {
  console.log('error', err);
});