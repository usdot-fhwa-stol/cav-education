import socketserver
import json
import sys
import csv
import logging
import socket

from dsrc_message_decoder.message_frame_decoder import MessageFrameDecoder
from producers.dsrc import Dsrc


class TCPHandler(socketserver.BaseRequestHandler):
    """
    The request handler class for our server.
    It is instantiated once per connection to the server, and must
    override the handle() method to implement communication to the
    client.
    """        

    dsrc_message_producer = Dsrc(0, None, None, None)
    mfd = MessageFrameDecoder()

    def handle(self):

        self.data = self.request.recv(1024).strip()
        logging.info("{} Wrote:".format(self.client_address[0]))

        print(self.data)
        msg = self.mfd.decode(self.data)

        record_key = "J2735.DSRC.MessageFrame"
        record_value = json.dumps(msg())

        print(msg())

        # message_id = msg()["messageId"]
        value = msg()["value"]

        # self.dsrc_message_producer.set_message_id(0)
        self.dsrc_message_producer.set_original_message(str(self.data))
        self.dsrc_message_producer.set_payload(record_value)
        self.dsrc_message_producer.set_payload(record_value)
        
        self.dsrc_message_producer.run()

        # just send back the same data, but upper-cased
        self.request.sendall(self.data.upper())



# ('BasicSafetyMessage', {'coreData': {'msgCnt': 117, 'id': "b'gE\\x8bk'", 'secMark': 24440, 'lat': 389565434, 'long': -771500475, 'elev': 745, 'accuracy': {'semiMajor': 255, 'semiMinor': 255, 'orientation': 65535}, 'transmission': 'neutral', 'speed': 8191, 'heading': 28800, 'angle': 127, 'accelSet': {'long': 2001, 'lat': 2001, 'vert': -127, 'yaw': 0}, 'brakes': {'wheelBrakes': (0, 5), 'traction': 'unavailable', 'abs': 'unavailable', 'scs': 'unavailable', 'brakeBoost': 'unavailable', 'auxBrakes': 'unavailable'}, 'size': {'width': 200, 'length': 500}}}) 