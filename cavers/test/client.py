#!/usr/bin/env python

import socket
import binascii as ba
from binascii import hexlify, unhexlify
import csv
from time import sleep

TCP_IP = '127.0.0.1'
TCP_PORT = 8882
BUFFER_SIZE = 1024
timebuffer = 0.1

number_message = 10000
cnt = 0

csvfile = open('spat_map_sample.csv')
# csvfile = open('BSM_TEST.csv')
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


# hexed = hexlify('001381131018003d0500006d4350c681f001043401418141801021a00c2c0d2c00c10d00caa0caa008086806cc0762005043401418141803021a00c400e4401c10d1194204ee01008688ca1027700904344650813b805021a2328409dc02c10d1194204ee01808688ca1027700d04344650813b807021a2328409dc03c10d1194204ee02008688ca1027701104144650813b809020a00c2e328404c10500cab194202808288ca1027701504144650813b80b020a2328409dc05c1051194204ee03008288ca1027701904144650813b80d020a2328409dc06c1051194204ee03808288ca1027701d04144650813b80f020a2328409dc07c1051194204ee04008288ca1027700440000005b91cf73920000005b91cf73920')
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# s.connect((TCP_IP, TCP_PORT))
# s.send(hexed)
# data = s.recv(BUFFER_SIZE)
# s.close()
# print("received data:", data)
# sleep(timebuffer)
