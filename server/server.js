g = {
    port: 8080,
    screenshotCount: 0
};

function dumpObj(obj, label, opt_prefix) {
  var prefix = opt_prefix || '';
  util.print(prefix + "-----[ " + label + " ]---------\n");
  for (var key in obj) {
    util.print(prefix + "  " + key + ": " + obj[key] + "\n");
  }
}
function extension(path) {
  var m = path.match(/\.[^\.]+$/);
  return m ? m[0] : "";
}

var getMimeType = function() {
  var mimeTypeMap = {
    '.jpg': 'image/jpeg',
    '.ogv': 'video/ogg',
    '.webm': 'video/webm',
    '.mp4': 'video/mp4',
    '.png': 'image/png',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.html': 'text/html'
  };

  return function(path) {
    var ext = extension(path);
    var mimeType = mimeTypeMap[ext] || 'text/html';  // hack for google body? Could add some different rules?
    return mimeType;
  }
}();

var applySettings = function(obj, dst) {
  for (var name in obj) {
    var value = obj[name];
    if (value instanceof Array) {
      var newDst = dst[name];
      if (!newDst) {
        newDst = [];
        dst[name] = newDst;
      }
      applySettings(value, newDst);
    } else if (typeof value == 'object') {
      if (!dst[name]) {
        dst[name] = {};
      }
      applySettings(value, dst[name]);
      console.log("apply->: ", name);
    } else {
      console.log("apply: ", name, "=", value);
      dst[name] = value;
    }
  }
};

var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    WebSocketServer = require('../websocket/').server,
    util = require('util'),
    path = require('path'),
    querystring = require('querystring');

for (var ii = 2; ii < process.argv.length; ++ii) {
    var flag = process.argv[ii];
    //util.print("" + ii + ":" + flag + "\n");
    switch (flag) {
    case '-h':
    case '--help':
  util.print(
        "--help: this message\n" +
        "--port: port. Default 8080\n");
    process.exit(0);
    case '--port':
  g.port = parseInt(process.argv[++ii]);
  //util.print("port: " + g.port + "\n");
  break;
    }
}


function postHandler(request, callback) {
  var query_ = { };
  var content_ = '';

  request.addListener('data', function(chunk) {
    content_ += chunk;
  });

  request.addListener('end', function() {
    query_ = JSON.parse(content_);
    callback(query_);
  });
}

function sendJSONResponse(res, object) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(object), 'utf8');
  res.end();
}

function startsWith(str, start) {
  return (str.length >= start.length &&
          str.substr(0, start.length) == start);
}

function saveScreenshotFromDataURL(dataURL) {
  var EXPECTED_HEADER = "data:image/png;base64,";
  if (startsWith(dataURL, EXPECTED_HEADER)) {
    var filename = "screenshot-" + (g.screenshotCount++) + ".png";
    fs.writeFile(
        filename,
        dataURL.substr(
            EXPECTED_HEADER.length,
            dataURL.length - EXPECTED_HEADER.length),
        'base64');
    util.print("Saved Screenshot: " + filename + "\n");
  }
}

server = http.createServer(function(req, res){
util.print("req: " + req.method + '\n');
  // your normal server code
  if (req.method == "POST") {
    postHandler(req, function(query) {
      util.print("query: " + query.cmd + '\n');
      switch (query.cmd) {
      case 'time':
        sendJSONResponse(res, { time: (new Date()).getTime() * 0.001 });
        break;
      case 'screenshot':
        saveScreenshotFromDataURL(query.dataURL);
        sendJSONResponse(res, { ok: true });
        break;
      default:
        util.print("err: unknown post: " + query + "\n");
        send404(res);
        break;
      }
    });
  } else {
    var filePath = querystring.unescape(url.parse(req.url).pathname);
    var fullPath = path.join(process.cwd(), filePath);
    util.print("path: " + fullPath + "\n");
    var mimeType = getMimeType(fullPath);
    if (mimeType) {
      fs.readFile(fullPath, function(err, data){
        if (err) {
          util.print("err not found: " + fullPath + "\n");
          return send404(res);
        }
        res.writeHead(200, {'Content-Type': mimeType})
        res.write(data, 'utf8');
        res.end();
      });
    } else {
      util.print("err: unknown mimetype for " + fullPath + "\n");
      send404(res);
    }
  }
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

util.print("Listening on port: " + g.port + "\n");
server.listen(g.port);

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

var g_allSettings = {};
var g_clients = [];

function broadcast(message) {
  for (var ii = 0; ii < g_clients.length; ++ii) {
    g_clients[ii].sendUTF(message);
  }
}

wsServer.on('request', function(request) {
  util.print("new connection from: " + request.origin + "\n");
  var connection = request.accept(null, request.origin);
  g_clients.push(connection);

  connection.sendUTF(JSON.stringify(g_allSettings));

  connection.on('message', function(message){
    switch (message.type) {
    case 'utf8':
      console.log("msg:" + message.utf8Data);
      applySettings(JSON.parse(message.utf8Data), g_allSettings);
      broadcast(message.utf8Data);
      break;
    default:
      console.log("ERROR: unknown message type: " + message.type);
      break;
    }
  });

  connection.on('close', function(){
    util.print("close connection\n");
    g_clients.splice(g_clients.indexOf(connection), 1);
    if (g_clients.length == 0) {
      console.log("cleared all settings");
      g_allSettings = { };
    }
  });
});