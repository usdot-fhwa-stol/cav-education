#!/usr/bin/python3

import socket
import time
import re
import argparse
import asyncio
from binascii import hexlify

def checkMessage(line):
    tempFrame = line[6:]
    if (len(tempFrame) > 510):
        frameSize = 8
        encodedSize = int(line[5:8], 16) * 2
    else:
        frameSize = 6
        encodedSize = int(line[4:6], 16) * 2

    newFrame = line[frameSize:]
    if (encodedSize == len(newFrame)):
        return True
    else:
        print("Not a valid message, continuing.")
        return False

def convertBytes(obj):
    if isinstance(obj, dict):
        return {k: convertBytes(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convertBytes(item) for item in obj]
    elif isinstance(obj, tuple):
        return [convertBytes(item) for item in obj]
    elif isinstance(obj, bytes):
        return obj.hex()
    else:
        return obj

def parse(data):
    msgIds=['0014'] # this can be updated to include other J2735 Message IDs
    for id in msgIds:
        idx = data.find(id)
        if (idx != -1):
            data = data[idx:].strip('\n')
            validity = checkMessage(data)
        
            if (validity == True):
                counter += 1
                return data
            else: None

def main():
    parser = argparse.ArgumentParser(description='Script to parse and forward J2735 V2X Messages as they are received over UDP')
    parser.add_argument('--udp_ip', help='IP address to receive UDP data.', type=str, default="127.0.0.1") 
    parser.add_argument('--udp_port', help='Port to receive UDP data.', type=int, default=5398)
    parser.add_argument('--tcp_ip', help='IP address to receive TCP data.', type=str, default="127.0.0.1") 
    parser.add_argument('--tcp_port', help='Port to receive TCP data.', type=int, default=8882)
    args = parser.parse_args()

    sk_listen = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sk_listen.bind((args.udp_ip, args.udp_port))

    print("Receiving Data")
    while True:
        rcvd_data = str(sk_listen.recvfrom(4096)[0].hex())
        if (len(rcvd_data) > 0):
            data = parse(rcvd_data)
            hex_data = hexlify(data.encode('utf-8'))
            sk_send = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            sk_send.connect((args.tcp_ip, args.tcp_port))
            sk_send.sendto(hex_data,(args.tcp_ip, args.tcp_port))
            print("sent:: ", hex_data)
            print("received:: ", sk_send.recv(4096))
            sk_send.close()

if __name__=="__main__":
    main()
