#!bin/bash

#Start Apache
httpd-foreground &

#Start Filebeat in the background
filebeat -e &

#Start Packet in the background
packetbeat -e &

#wait for all background processes
wait

