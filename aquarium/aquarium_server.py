#!/usr/bin/python
#
# Copyright (c) 2006-2009 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

"""A simple server for multiple machine aquarium demo."""

import cgi
import Cookie
import os
import os.path
import sys
import re
import urlparse
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from optparse import OptionParser

verbose = False

def Log(*args):
  if verbose:
    print "".join(args)


class MyHandler(BaseHTTPRequestHandler):
  def __init__(self, *args):
    BaseHTTPRequestHandler.__init__(self, *args)

  def do_GET(self):
    global Gcount
    query = urlparse.urlparse(self.path)[4]
    kv = cgi.parse_qs(query)
    id = kv['id'][0]
    try:
      if kv['cmd'][0] == 'get':
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type',  'text/html')
        self.end_headers()
        self.wfile.write("{\"globals\":{\"speed\":%s}}" % id)
      elif self.path.endswith(".html"):
        filename = os.curdir + os.sep + self.path
        Log("GET:", filename)
        f = open(filename) #self.path has /test.html
        #note that this potentially makes every file on your computer
        #readable by the internet

        self.send_response(200)
        self.send_header('Content-type',  'text/html')
        self.end_headers()
        self.wfile.write(f.read())
        f.close()
        return
      elif self.path.endswith(".esp"):   #our dynamic content
        self.send_response(200)
        self.send_header('Content-type',  'text/html')
        self.end_headers()
        self.wfile.write("hey, today is the" + str(time.localtime()[7]))
        self.wfile.write(" day in the year " + str(time.localtime()[0]))
        return
      else:
        Log("foo")
      return

    except IOError:
      self.send_error(500,'Error: %s' % self.path)


  def do_POST(self):
    global rootnode
    try:
      ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
      Log("POST: ctype=", ctype, " pdict=", pdict)
      if ctype == 'multipart/form-data':
        query=cgi.parse_multipart(self.rfile, pdict)
      self.send_response(301)

      self.end_headers()
      upfilecontent = query.get('upfile')
      print "filecontent", upfilecontent[0]
      self.wfile.write("<HTML>POST OK.<BR><BR>");
      self.wfile.write(upfilecontent[0]);

    except :
      pass

def main(argv):
  global verbose
  parser = OptionParser()
  parser.add_option(
      "-p", "--port", type="int", default=80,
      help="port to bind do. Default = 80")
  parser.add_option(
      "-v", "--verbose", action="store_true", default=False,
      help="prints more output.")

  (options, args) = parser.parse_args(args=argv)
  verbose = options.verbose

  try:
    server = HTTPServer(('', options.port), MyHandler)
    print 'started httpserver on port %d...' % options.port
    server.serve_forever()
  except KeyboardInterrupt:
    print '^C received, shutting down server'
    server.socket.close()

if __name__ == '__main__':
  main(sys.argv[1:])

