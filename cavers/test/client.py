#!/usr/bin/python3

import socket
from binascii import hexlify
import csv
from time import sleep

def main():
    TCP_IP = '127.0.0.1'
    TCP_PORT = 8882
    BUFFER_SIZE = 1024
    timebuffer = 0.1

    number_message = 10000
    cnt = 0

    # csvfile = open('spat_map_sample.csv')
    csvfile = open('BSM_TEST.csv')
    uperreader = csv.reader(csvfile, delimiter=',', quotechar='|')

    for row in uperreader:
        if(cnt > number_message):
            break
        hexed = hexlify(row[1].encode('utf-8'))
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((TCP_IP, TCP_PORT))
        s.send(hexed)
        data = s.recv(BUFFER_SIZE)
        s.close()
        print("received data:", data)
        sleep(timebuffer)
        cnt += 1

if __name__=="__main__":
    main()
