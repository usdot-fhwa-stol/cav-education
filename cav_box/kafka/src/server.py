import socket
import socketserver

from tcp_handler.handler import TCPHandler
import os


if __name__ == "__main__":
    DSRC_LISTENER_HOST = os.getenv('DSRC_LISTENER_HOST', "0.0.0.0")
    DSRC_LISTENER_PORT = os.getenv('DSRC_LISTENER_PORT', 8882)

    HOST, PORT = DSRC_LISTENER_HOST, int(DSRC_LISTENER_PORT)

    # Create the server, binding to localhost on port 9999
    with socketserver.TCPServer((HOST, PORT), TCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()