import socket
import binascii as ba
from binascii import hexlify, unhexlify
import time
import re

tcpip_listen = '10.0.2.15'
port_listen = 8010
sk_listen = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
# connect to port
sk_listen.bind((tcpip_listen,port_listen))
#sk_listen.setblocking(False)

tcpip_send = '127.0.0.1'
port_send = 8882

#sk_send=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
#sk_send.connect((tcpip_send,port_send))

msgIds=['0012','0013','0014'] # this needs to be updated
while True:
    print("Receiving Data")
    data = sk_listen.recvfrom(10000)
    datastr=str(data)
    data = str(data).replace("\\n"," ")
    data1 = datastr.split("\\n")
    for st in data1:
        for id in msgIds:
            if (st[0:4] == id):
                idx=0
            else:
                idx=-1
            if (idx > -1 ):
                if (int('0x'+st[idx+4],16)==8):
                    lenstr=int('0x'+st[idx+5:idx+8],16)*2+6 # including the 
                else:
                    lenstr=int('0x'+st[idx+4:idx+6],16)*2+6 # including the 
                if(lenstr <= len(st)):
                    print(hexlify(st[idx:idx+lenstr].encode('utf-8')))
		    sk_send=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
		    sk_send.connect((tcpip_send,port_send))
                    print("sent:: ",sk_send.send(hexlify(st[idx:idx+lenstr].encode('utf-8'))))
                    print("received:: ",sk_send.recv(1024))
		    sk_send.close()


                    break
