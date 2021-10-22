import socket
import binascii as ba
from binascii import hexlify, unhexlify
import time
import re

udpip_listen = ''
port_listen = 8010
sk_listen = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
# connect to port
sk_listen.bind((udpip_listen,port_listen))
#sk_listen.setblocking(False)

tcpip_send = '192.168.0.146'
port_send = 26789

#sk_send=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
#sk_send.connect((tcpip_send,port_send))

msgIds=['0014','0013','0012'] # this needs to be updated
while True:
    print("Receiving Data")
    data = str(sk_listen.recvfrom(10000)[0])
    data = ''.join(data.split())
    print(data)
    for id1 in msgIds:
        idx = data.find(id1)
        print(idx, id1)
        if (idx > -1 ):
            if (int('0x'+data[idx+4],16)==8):
                lenstr=int('0x'+data[idx+5:idx+8],16)*2+6 # including the
            else:
                lenstr=int('0x'+data[idx+4:idx+6],16)*2+6 # including the
            print(lenstr)
            if(lenstr <= len(data)-idx+1):
                print(hexlify(data[idx:idx+lenstr].encode('utf-8')))
                sk_send=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
                #sk_send.connect((tcpip_send,port_send))
                print("sent:: ",sk_send.sendto(unhexlify(data[idx:idx+lenstr].encode('utf-8')),(tcpip_send,port_send)))
                #print("received:: ",sk_send.recv(1024))
                sk_send.close()
                break
        
