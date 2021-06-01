import socketserver
import json
import sys
import csv
import logging
import socket

from dsrc_message_decoder.message_frame_decoder import MessageFrameDecoder
from producers.dsrc import Dsrc
from binascii import hexlify, unhexlify

BUFFER_SIZE = 2048

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

        self.data = self.request.recv(BUFFER_SIZE).strip()
        logging.info("{} Wrote:".format(self.client_address[0]))

        if(self.data is None or self.data == b''):
            self.request.sendall(self.data.upper())
        else:
            try:
                key, msg = self.mfd.decode(self.data)
                logging.debug(msg)
                if(msg != None):
                    self.dsrc_message_producer.set_original_message(unhexlify(self.data).decode('utf-8'))
                    self.dsrc_message_producer.set_payload(msg)
                    self.dsrc_message_producer.set_message_type(key)
                    self.dsrc_message_producer.run()

                self.request.sendall(self.data.upper())

            except Exception as e:
                logging.error(e)
                self.request.sendall(self.data.upper())