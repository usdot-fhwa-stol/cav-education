import asyncio
from datetime import datetime

import faust
from aiohttp.web import Response
from aiohttp_sse import sse_response
import io
import json

import avro.schema
from avro.datafile import DataFileReader, DataFileWriter
from avro.io import DatumReader, DatumWriter
from pathlib import Path

from avro.io import DatumReader, BinaryDecoder
import avro.schema

value_schema = avro.schema.parse(open(f"{Path(__file__).parents[0]}/models/dsrc_message_value.json", "rb").read())
key_schema = avro.schema.parse(open(f"{Path(__file__).parents[0]}/models/dsrc_message_key.json", "rb").read())
reader = DatumReader(value_schema)


app = faust.App(
    'incomming_dsrc_message',
    broker='kafka://localhost:9092',
    value_serializer='raw',
)

greetings_topic = app.topic('incomming_dsrc_message')


def decode(msg_value):
    message_bytes = io.BytesIO(msg_value[5::])
    decoder = BinaryDecoder(message_bytes)
    event_dict = reader.read(decoder)
    return event_dict


test_topic = app.topic("incomming_dsrc_message")

last_message_from_topic = ['No messages yet']

@app.agent(test_topic)
async def greet(greetings):
    async for greeting in greetings:
        last_message_from_topic[0] = greeting

@app.page('/hello')
async def hello(self, request):
    loop = request.app.loop
    async with sse_response(request) as resp:
        while True:
            data = f'{decode(last_message_from_topic[0])}'
            parsed_data = decode(last_message_from_topic[0])
            # print(json.loads(parsed_data["payload"])["coreData"]["lat"])
            # print(json.loads(parsed_data["payload"])["coreData"]["long"])
            # data += f'Server Time : {datetime.now()}'

            data = {"lat":json.loads(parsed_data["payload"])["coreData"]["lat"], "lon": json.loads(parsed_data["payload"])["coreData"]["long"]}

            await resp.send(json.dumps(data))
            await asyncio.sleep(0.001, loop=loop)
    return resp


@app.page('/')
async def index(self, request):

    d = open('index.html', 'r').read()

    return Response(text=d, content_type='text/html')
