#/bin/bash
# run this command from a device where packets are being captured 

echo "Usage: sniffer.sh <forward ip> <forward port>"

sudo tcpdump port 1516 or port 26789 -Aq | grep "Payload=" | cut -c9- | netcat -u $1 $2


