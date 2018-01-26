#!/bin/bash

make

if [ "$#" -ne 3 ]; then
 echo "Usage : ./play.sh <R video file> <L video file> <G video file>"

else
  ./exTimecode.sh $1 Rtimecode.txt
  ./exTimecode.sh $2 Ltimecode.txt
  ./exTimecode.sh $3 GtimeCode.txt

  ./parser Rtimecode.txt Ltimecode.txt GtimeCode.txt
  var=$(echo "($? * 0.01)" | bc)
  #if ["$var" -lt "1"]; then
  #  var=$(echo "0$var")
  #fi
if ["$var" -lt 0]; then
    ffplay -ss "-0$var" $1 -x 900 -y 900 -window_title right | ffplay $2 -x 900 -y 900 -window_title left
  else
   ffplay $1 -x 900 -y 900 -window_title right | ffplay -ss "0$var" $2 -x 900 -y 900 -window_title left
  fi
fi
