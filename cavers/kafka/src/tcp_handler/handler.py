#  *
#  * Copyright (C) 2019-2020 LEIDOS.
#  *
#  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
#  * use this file except in compliance with the License. You may obtain a copy of
#  * the License at
#  *
#  * http://www.apache.org/licenses/LICENSE-2.0
#  * Unless required by applicable law or agreed to in writing, software
#  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#  * License for the specific language governing permissions and limitations under
#  * the License.
#  *

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
                self.produce(self.data)
            except Exception as e:
                logging.error(e)
            self.request.sendall(self.data.upper())

    def produce(self, data):
        try:
            key, msg = self.mfd.decode(data)
            logging.debug(msg)
            if(msg != None):
                self.dsrc_message_producer.set_original_message(unhexlify(data).decode('utf-8'))
                self.dsrc_message_producer.set_payload(msg)
                self.dsrc_message_producer.set_message_type(key)
                self.dsrc_message_producer.run()

        except Exception as e:
            logging.error(e)