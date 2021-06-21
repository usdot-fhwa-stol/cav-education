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

import socket
import socketserver

from tcp_handler.handler import TCPHandler
import os
import logging


if __name__ == "__main__":
    LOGLEVEL = os.environ.get('LOGLEVEL', 'WARNING').upper()
    logging.basicConfig(level=LOGLEVEL)
    
    DSRC_LISTENER_HOST = os.getenv('DSRC_LISTENER_HOST', "0.0.0.0")
    DSRC_LISTENER_PORT = os.getenv('DSRC_LISTENER_PORT', 8882)

    HOST, PORT = DSRC_LISTENER_HOST, int(DSRC_LISTENER_PORT)

    # Create the server, binding to localhost on port 9999
    with socketserver.TCPServer((HOST, PORT), TCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()