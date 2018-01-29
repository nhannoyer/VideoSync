#!/bin/bash

if [ "$#" -ne 2 ]; then
 echo "Usage : ./exTimecode.sh <video file> <txt file>"

else
# version qui recupere que le timecode et Duration en utilisant gawk
#echo "timecode" > $2
#ffmpeg -i $1 2>&1| gawk 'match($0, /timecode (.[^,]*)/,matches) {print matches[1]}' >> $2
#echo "duration" >> $2
#ffmpeg -i $1 2>&1| gawk 'match($0, /Duration: (.[^,]*)/,matches) {print matches[1]}' >> $2


# version qui retourne tout ce que genere la commande ffmpeg
ffmpeg -i $1 2>$2
fi
