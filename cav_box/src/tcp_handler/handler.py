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

    dsrc_message_producer = Dsrc(0, None)
    mfd = MessageFrameDecoder()
    def handle(self):

        self.data = self.request.recv(1024).strip()
        logging.info("{} Wrote:".format(self.client_address[0]))

        msg = self.mfd.decode(self.data)

        record_key = "J2735.DSRC.MessageFrame"
        record_value = json.dumps(msg())

        self.dsrc_message_producer.set_value(record_value)
        self.dsrc_message_producer.run()

        # just send back the same data, but upper-cased
        self.request.sendall(self.data.upper())
