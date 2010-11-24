#!/bin/bash

BASEURL=$1
GUSER=lg
GADDRESS=lg1
GPORT=3128
GDOMAIN=$GADDRESS:$GPORT
GURL=$BASEURL?settings=
CWD=`pwd`
RELSCRIPTDIR=`dirname $0`
cd $RELSCRIPTDIR
SCRIPTDIR=`pwd`
cd $CWD

#lg-sudo-bg ntpdate -u pool.ntp.org

function doit {
  ssh -x $GUSER@$1 "export DISPLAY=:0.0 ; ~/chrome/chrome-linux/chrome --kiosk --no-first-run --enable-webl --enable-accelerated-compositing http://$GDOMAIN/$GURL{\\\"net\\\":{\\\"id\\\":$2\,\\\"port\\\":$GPORT}}" &
}

cd $SCRIPTDIR/../..
node $SCRIPTDIR/../server.js --port $GPORT &
doit lg1 0
doit lg2 1
doit lg3 2
doit lg4 3
doit lg5 4
doit lg6 -3
doit lg7 -2
doit lg8 -1

