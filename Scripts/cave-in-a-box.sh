#!/bin/bash

### Bash script to test initial setup of CAVe - in -a - box 
# ...............             .................................
# |___Test PC___|             |_______CAVe - in - a - box_____| 
# |{this script}|---Wi-Fi-----|         {Wi-Fi router}        |
# |_____________|             | {RSU/OBU} {V2X Hub} {TSC}     |
#                             | {Tablet}                      | 
#                             |_______________________________|                   

echo "Test Script for CAVe - in - a - box"
echo "Usage: bash cave-in-a-box.sh [INTERFACE] [IPADDR/MASKNUMBER]"

echo "WARNING:: Make sure you are on a PRIVATE Network"

iface=$1
snet=$2

sudo nmap -e $iface -sN $snet

echo "Input Ip address of the device"

read -r ipaddr

nmap -e $iface -sS -v -A -T4 $ipaddr

echo "Do the Ports look OK?"



