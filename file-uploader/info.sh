#!/bin/bash

make

if [ "$#" -ne 4 ]; then
 echo "Usage : ./play.sh <R video file> <L video file> <G video file> <G video name>"

else
  ./exTimecode.sh $1 Rtimecode.txt
  ./exTimecode.sh $2 Ltimecode.txt
  ./exTimecode.sh $3 Gtimecode.txt


  touch public/data.xml

  if [ -f $4 ]
    then
      ./parser Rtimecode.txt Ltimecode.txt Gtimecode.txt $4
      rm $4
      echo "rm"
    fi
fi

make clean
