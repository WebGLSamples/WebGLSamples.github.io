#!/bin/bash

BASEURL=$1
GMSG=$2
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
  ssh -x $GUSER@$1 "export DISPLAY=:0.0 ; ~/chrome/chrome-linux/chrome --disable-popup-blocking --gkiosk --no-first-run --enable-webl --enable-accelerated-compositing http://$GDOMAIN/$GURL{\\\"net\\\":{\\\"ui\\\":$3\,\\\"sync\\\":true\,\\\"slave\\\":$4\,\\\"rotYMult\\\":$2\,\\\"port\\\":$GPORT\,\\\"msg\\\":\\\"$5\\\"}}" &
}

cd $SCRIPTDIR/../..
node $SCRIPTDIR/../server.js --port $GPORT &
#doit lg1 0  true  false "$GMSG"
doit lg1 0  false true  ""
doit lg2 1  false true  ""
doit lg3 2  false true  ""
doit lg4 3  false true  ""
doit lg5 4  false true  ""
doit lg6 -3 false true  ""
doit lg7 -2 false true  ""
doit lg8 -1 false true  ""

#ssh -x lg@lgtouch "export DISPLAY=:0.0 ; google-chrome --kiosk --no-first-run http://$GDOMAIN/aquarium/aquarium-control-panel.html?settings={\\\"net\\\":{\\\"port\\\":$GPORT}}" &

