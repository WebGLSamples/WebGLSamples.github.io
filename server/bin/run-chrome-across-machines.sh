#!/bin/bash

BASEURL=$1
GUSER=lg
GADDRESS=lg1
GPORT=8000
GDOMAIN=$GADDRESS:$GPORT
GURL=$BASEURL?settings=
SCRIPTDIR=`dirname $0`

function doit {
  ssh -x $GUSER@$1 "$SCRIPTDIR/start-chrome-on-one-machine.sh $GDOMAIN $GURL $2}}" &
}

node $SCRIPTDIR/../server.js --port $GPORT --address $GADDRESS
doit lg1 0 
doit lg2 1
doit lg3 2
doit lg4 3
doit lg5 4
doit lg6 -3
doit lg7 -2
doit lg8 -1

