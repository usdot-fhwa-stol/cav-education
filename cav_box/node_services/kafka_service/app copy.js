const express = require('express')
const { Kafka } = require('kafkajs')

const app = express();
const port = 8080;

const kafka = new Kafka({
    clientId: 'my-app',
    //brokers: ['localhost:9092', 'kafka2:9092']
    brokers: ['localhost:9092']
})
app.get('/receive', async(req, res) => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    res.send('Receive message from topic test-topic' )
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
              //  key: message.key.toString(),
                value: message.value.toString(),
               // headers: message.headers,
            })
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
        },
    })
});

app.get('/send', async(req, res) => {
    res.send('producer message to kafka topic test-topic');

   
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: 'Hello KafkaJS user1!'  },
        { value: 'Hello KafkaJS user2!'  },
    ],
    })
    await producer.disconnect()
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});