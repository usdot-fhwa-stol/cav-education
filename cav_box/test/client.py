#!/usr/bin/env python

import socket
import binascii as ba
from binascii import hexlify, unhexlify
import csv
from time import sleep

TCP_IP = '127.0.0.1'
TCP_PORT = 8882
BUFFER_SIZE = 1024
timebuffer = 0.003

number_message = 100000
cnt = 0

csvfile = open('test.csv')
uperreader = csv.reader(csvfile, delimiter=',', quotechar='|')

for row in uperreader:
    if(cnt > number_message):
        break
    hexed = hexlify(row[1])
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((TCP_IP, TCP_PORT))
    s.send(hexed)
    data = s.recv(BUFFER_SIZE)
    s.close()
    print("received data:", data)
    sleep(timebuffer)
    cnt = cnt + 1
