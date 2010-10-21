#!/bin/bash

GDOMAIN=$1
GURL=$2
GID=$3

export DISPLAY=:0.0 
~/chrome/chrome-linux/chrome --no-first-run --enable-webl --enable-accelerated-compositing http://$GDOMAIN/$GURL{\"net\":{\"id\":$GID}}


