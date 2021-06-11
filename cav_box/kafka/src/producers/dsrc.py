"""Methods pertaining to loading and configuring CTA "L" station data."""
import logging
from pathlib import Path
from confluent_kafka import avro
from .producer import Producer
import time    
from datetime import datetime
from pytz import timezone
import os

logger = logging.getLogger(__name__)

class Dsrc(Producer):

    key_schema = avro.load(f"{Path(__file__).parents[0]}/models/dsrc_message_key.json")
    value_schema = avro.load(f"{Path(__file__).parents[0]}/models/dsrc_message_value.json")

    def __init__(self, message_id, original_message, payload, message_type):

        super().__init__(
            topic_name="incomming_dsrc_message",
            key_schema=Dsrc.key_schema,
            value_schema=Dsrc.value_schema,
            num_partitions=10,
            num_replicas=1,
        )

        # self.message_id = int(message_id)
        self.message_type = message_type
        self.original_message = original_message
        self.payload = payload

    def run(self):
        TIME_ZONE = os.getenv('TIME_ZONE', "EST")
        tz = timezone(TIME_ZONE)
        try:
            self.producer.produce(
                topic=self.topic_name,
                key={"timestamp": self.time_millis()},
                value={
                    # "id": self.message_id,
                    "message_type": self.message_type,
                    "original_message": self.original_message,
                    "payload": self.payload,
                    "timestamp": datetime.now(tz).strftime('%Y-%m-%d %H:%M:%S.%f')
                }
            )
        except Exception as e:
            logger.fatal(e)
            raise e

    def set_original_message(self, original_message):
        self.original_message = original_message

    def set_message_id(self, message_id):
        self.message_id = message_id

    def set_message_type(self, message_type):
        self.message_type = message_type

    def set_payload(self, payload):
        self.payload = payload

    def __str__(self):
        return "message_id | {:^5} | {:<30} | original_message : | {:^5} ".format(
            self.message_id,
            self.timestamp,
            self.original_message
        )

    def __repr__(self):
        return str(self)
