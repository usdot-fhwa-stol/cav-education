import socket
import socketserver

from tcp_handler.handler import TCPHandler


if __name__ == "__main__":
    HOST, PORT = "127.0.0.1", 8882

    # Create the server, binding to localhost on port 9999
    with socketserver.TCPServer((HOST, PORT), TCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()