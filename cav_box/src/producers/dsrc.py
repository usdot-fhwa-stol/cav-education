"""Methods pertaining to loading and configuring CTA "L" station data."""
import logging
from pathlib import Path
from confluent_kafka import avro
from .producer import Producer

logger = logging.getLogger(__name__)

class Dsrc(Producer):

    key_schema = avro.load(f"{Path(__file__).parents[0]}/models/dsrc_message_key.json")
    value_schema = avro.load(f"{Path(__file__).parents[0]}/models/dsrc_message_value.json")

    def __init__(self, message_id, value):

        super().__init__(
            topic_name="incomming.dsrc.message",
            key_schema=Dsrc.key_schema,
            value_schema=Dsrc.value_schema,
            num_partitions=3,
            num_replicas=1,
        )

        self.message_id = int(message_id)
        self.value = value

    def run(self):
        try:
            self.producer.produce(
                topic=self.topic_name,
                key={"timestamp": self.time_millis()},
                value={
                    "message_id": self.message_id,
                    "value": self.value
                }
            )
        except Exception as e:
            logger.fatal(e)
            raise e

    def set_value(self, value):
        self.value = value

    def set_message_id(self, message_id):
        self.message_id = message_id

    def __str__(self):
        return "message_id | {:^5} | {:<30} | value : | {:^5} ".format(
            self.message_id,
            self.value
        )

    def __repr__(self):
        return str(self)
