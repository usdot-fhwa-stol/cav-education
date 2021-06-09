from flask import Flask, render_template, Response
from pykafka import KafkaClient

import avro.schema
from avro.datafile import DataFileReader, DataFileWriter
from avro.io import DatumReader, DatumWriter
from pathlib import Path

from avro.io import DatumReader, BinaryDecoder
import avro.schema

import io
import json

value_schema = avro.schema.parse(open(f"{Path(__file__).parents[0]}/models/dsrc_message_value.json", "rb").read())
key_schema = avro.schema.parse(open(f"{Path(__file__).parents[0]}/models/dsrc_message_key.json", "rb").read())
reader = DatumReader(value_schema)

def get_kafka_client():
    return KafkaClient(hosts='kafka:29092')

app = Flask(__name__)

def decode(msg_value):
    try:
        message_bytes = io.BytesIO(msg_value[5::])
        decoder = BinaryDecoder(message_bytes)
        event_dict = reader.read(decoder)
        return event_dict
    except Exception as e:
        print(e) 
        return ""

@app.route('/')
def index():
    return(render_template('index.html'))

#Consumer API
@app.route('/topic/<topicname>')
def get_messages(topicname):
    client = get_kafka_client()
    def events():
        for i in client.topics[topicname].get_simple_consumer():
            data = decode(i.value)
            try:
                data["payload"] = json.loads(data["payload"])
            except Exception as e:
                print(e)
            yield 'data:{0}\n\n'.format(json.dumps(data))
    return Response(events(), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True, port=5001)
