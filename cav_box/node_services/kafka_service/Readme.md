# create kafka service
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
npm install express
mkdir kafka_service
cd kafka_service
npm init
node app.js

# Install kafka rest -- need discussion
npm install kafka-rest

# install kafka rest proxy -- need discussion
https://docs.confluent.io/3.0.0/installation.html#installation
https://docs.confluent.io/3.0.0/kafka-rest/docs/intro.html#deployment

kafka-rest-start  /etc/kafka-rest/kafka-rest.properties

# kafka js
npm install kafkajs

# kafka node
npm install kafka-node
https://stackoverflow.com/questions/56772811/consume-multiple-topics-in-a-single-consumer-on-kafka
https://hmh.engineering/experimenting-with-apache-kafka-and-nodejs-5c0604211196

# web socket
npm install websocket
https://hmh.engineering/experimenting-with-apache-kafka-and-nodejs-5c0604211196
https://www.npmjs.com/package/websocket
https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

# kafka comands

./bin/zookeeper-server-start.sh config/zookeeper.properties
./bin/kafka-server-start.sh config/server.properties
./bin/kafka-console-consumer.sh --bootstrap-server=localhost:9092 --topic topic1 --from-beginning
./bin/kafka-console-producer.sh --bootstrap-server=localhost:9092 --topic topic1

# start websocket
node app.js

