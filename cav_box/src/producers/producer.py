"""Producer base-class providing common utilites and functionality"""
import logging
import time

from confluent_kafka import avro
from confluent_kafka.admin import AdminClient, NewTopic
from confluent_kafka.avro import AvroProducer

logger = logging.getLogger(__name__)

BOOTSTRAP_SERVERS = "PLAINTEXT://127.0.0.1:9092"
SCHEMA_REGISTRY_URL = "http://0.0.0.0:8081/"

class Producer:
    """Defines and provides common functionality amongst Producers"""

    # Tracks existing topics across all Producer instances
    existing_topics = set([])

    def __init__(self, topic_name, key_schema, value_schema, num_partitions=1, num_replicas=1):
        """Initializes a Producer object with basic settings"""
        self.topic_name = topic_name
        self.key_schema = key_schema
        self.value_schema = value_schema
        self.num_partitions = num_partitions
        self.num_replicas = num_replicas

        self.broker_properties = {
            "bootstrap.servers": BOOTSTRAP_SERVERS,
            "schema.registry.url": SCHEMA_REGISTRY_URL
        }

        # If the topic does not already exist, try to create it
        if self.topic_name not in Producer.existing_topics:
            self.create_topic()
            Producer.existing_topics.add(self.topic_name)

        self.producer = AvroProducer(
            self.broker_properties,
            default_key_schema=key_schema,
            default_value_schema=value_schema,
        )


    def create_topic(self):
        """Creates the producer topic if it does not already exist"""
        client = AdminClient(
            {"bootstrap.servers": self.broker_properties["bootstrap.servers"]}
        )

        topic_exsists = self.check_topic_exists(client, self.topic_name)

        if(topic_exsists):
            logger.info(f'Topic {self.topic_name} exsists. Will not create')
            return

        logger.info(f"Creating topic: {self.topic_name}")

        futures = client.create_topics([
            NewTopic(
                topic=self.topic_name,
                num_partitions=self.num_partitions,
                replication_factor=self.num_replicas
            )
        ])

        for topic, future in futures.items():
            try:
                future.result()
                logger.info("topic created")
            except Exception as e:
                logger.fatal("failed to create topic %s: %s", topic, e)


    def close(self):
        """Prepares the producer for exit by cleaning up the producer"""
        if self.producer is None:
            return

        logger.debug("flushing producer...")
        self.producer.flush()


    def time_millis(self):
        """Return the current time in milliseconds"""
        return int(round(time.time() * 1000))

    def check_topic_exists(self, client, topic_name):
        """Checks if the given topic exists"""
        topic_metadata = client.list_topics()
        topics = topic_metadata.topics
        return topic_name in topics
