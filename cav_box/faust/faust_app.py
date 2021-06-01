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
import logging
import os

LOGLEVEL = os.environ.get('LOGLEVEL', 'WARNING').upper()
logging.basicConfig(level=LOGLEVEL)

value_schema = avro.schema.parse(open(f"{Path(__file__).parents[0]}/models/dsrc_message_value.json", "rb").read())
key_schema = avro.schema.parse(open(f"{Path(__file__).parents[0]}/models/dsrc_message_key.json", "rb").read())
reader = DatumReader(value_schema)

app = faust.App(
    'incomming_dsrc_message',
    broker='kafka:29092',
    value_serializer='raw',
)

# greetings_topic = app.topic('incomming_dsrc_message')

def decode(msg_value):
    try:
        message_bytes = io.BytesIO(msg_value[5::])
        decoder = BinaryDecoder(message_bytes)
        event_dict = reader.read(decoder)
        return event_dict
    except Exception as e:
        print(e) 
        return ""

topic_value = app.topic("incomming_dsrc_message")
last_message_from_topic = ['No messages yet']
message_count = 0 #reset every 2 seconds

@app.agent(topic_value)
async def greet(greetings):
    global message_count
    async for greeting in greetings:        
        last_message_from_topic[0] = greeting
        data = f'{decode(last_message_from_topic[0])}'
        parsed_data = decode(last_message_from_topic[0])
        if( parsed_data["message_type"] == "BasicSafetyMessage"):
            message_count += 1            

@app.page('/data')
async def data(self, request):
    loop = request.app.loop
    async with sse_response(request) as resp:
        while True:
            logging.debug(last_message_from_topic[0])
            parsed_data = decode(last_message_from_topic[0])
            if(parsed_data["message_type"] == "BasicSafetyMessage"):
                await resp.send(json.dumps(json.loads(parsed_data["payload"])["coreData"]))
                await asyncio.sleep(0.001, loop=loop)
    return resp


@app.timer(interval=2.0)
async def bsm_count_reset():
    global message_count
    message_count = -1 #ignore the first message in queue

@app.page('/bsm_count')
async def bsm_count(self, request):
    global message_count
    loop = request.app.loop
    async with sse_response(request) as resp:
        while True:
            await resp.send(json.dumps(message_count))  
            await asyncio.sleep(0.01, loop=loop)
    return resp

@app.page('/')
async def index(self, request):

    d = open('index.html', 'r').read()

    return Response(text=d, content_type='text/html')
