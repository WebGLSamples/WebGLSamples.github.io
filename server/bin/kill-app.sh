#!/bin/bash

~/bin/lg-sudo-bg killall chrome
killall node
ssh -x lg@lgtouch killall chrome
