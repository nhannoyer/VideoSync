#!/bin/bash

make

if [ "$#" -ne 2 ]; then
 echo "Usage : ./play.sh <R video file> <L video file>"

else
  ./exTimecode.sh $1 Rtimecode.txt
  ./exTimecode.sh $2 Ltimecode.txt

  ./parser Rtimecode.txt Ltimecode.txt
  var=$(echo "($? * 0.01)" | bc)
  if ["$var" -lt 1]; then
    var=$(echo "0$var")
  fi
if ["$var" -lt 0]; then
    ffplay -ss "0$var" $1 | ffplay $2
  else
   ffplay $1 | ffplay -ss "0$var" $2
  fi
fi
