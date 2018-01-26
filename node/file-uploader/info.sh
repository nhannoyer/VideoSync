#!/bin/bash

make

if [ "$#" -ne 3 ]; then
 echo "Usage : ./play.sh <R video file> <L video file> <G video file>"

else
  ./exTimecode.sh $1 Rtimecode.txt
  ./exTimecode.sh $2 Ltimecode.txt
  ./exTimecode.sh $3 GtimeCode.txt

  ./parser Rtimecode.txt Ltimecode.txt GtimeCode.txt
fi

make clean
