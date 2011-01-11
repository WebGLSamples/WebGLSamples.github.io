#!/bin/sh
g++ vertexcompression.cpp -o vertexcompression
./vertexcompression <Toria2.obj
gzip --best -c bytes16.bin   >bytes16.bin.gzip
gzip --best -c bytes16.utf8  >bytes16.utf8.gzip
gzip --best -c bytes32.bin   >bytes32.bin.gzip
gzip --best -c bytes32.utf8  >bytes32.utf8.gzip
gzip --best -c bytes9.bin    >bytes9.bin.gzip
gzip --best -c bytes9.utf8   >bytes9.utf8.gzip

