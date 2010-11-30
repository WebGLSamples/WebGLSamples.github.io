g = {
    port: 8080,
    screenshotCount: 0
};


function extension(path) {
  var m = path.match(/\.[^\.]+$/);
  return m ? m[0] : "";
}

var getMimeType = function() {
  var mimeTypeMap = {
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.html': 'text/html'
  };

  return function(path) {
    var ext = extension(path);
    var mimeType = mimeTypeMap[ext];
    return mimeType;
  }
}();

var applySettings = function(obj, dst) {
  for (var name in obj) {
    var value = obj[name];
    if (typeof value == 'object') {
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
    io = require('../socket.io/'),
    sys = require('sys'),
    path = require('path'),
    querystring = require('querystring');

for (var ii = 2; ii < process.argv.length; ++ii) {
    var flag = process.argv[ii];
    //sys.print("" + ii + ":" + flag + "\n");
    switch (flag) {
    case '-h':
    case '--help':
  sys.print(
        "--help: this message\n" +
        "--port: port. Default 8080\n");
    process.exit(0);
    case '--port':
  g.port = parseInt(process.argv[++ii]);
  //sys.print("port: " + g.port + "\n");
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
    sys.print("Saved Screenshot: " + filename + "\n");
  }
}

server = http.createServer(function(req, res){
sys.print("req: " + req.method + '\n');
  // your normal server code
  if (req.method == "POST") {
    postHandler(req, function(query) {
      sys.print("query: " + query.cmd + '\n');
      switch (query.cmd) {
      case 'time':
        sendJSONResponse(res, { time: (new Date()).getTime() * 0.001 });
        break;
      case 'screenshot':
        saveScreenshotFromDataURL(query.dataURL);
        sendJSONResponse(res, { ok: true });
        break;
      default:
        send404(res);
        break;
      }
    });
  } else {
    var filePath = querystring.unescape(url.parse(req.url).pathname);
    var fullPath = path.join(process.cwd(), filePath);
    sys.print("path: " + fullPath + "\n");
    var mimeType = getMimeType(fullPath);
    if (mimeType) {
      fs.readFile(fullPath, function(err, data){
        if (err) {
          return send404(res);
        }
        res.writeHead(200, {'Content-Type': mimeType})
        res.write(data, 'utf8');
        res.end();
      });
    } else send404(res);
  }
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

sys.print("Listening on port: " + g.port + "\n");
server.listen(g.port);

// socket.io, I choose you
// simplest chat application evar
var io = io.listen(server),
    buffer = [];

var g_allSettings = {};
var g_clientIds = {};
var g_numClients = 0;

io.on('connection', function(client){
  g_clientIds[client.sessionId] = true;
  ++g_numClients;
  client.send(g_allSettings);

  client.on('message', function(message){
    console.log("msg:" + message);
    applySettings(message, g_allSettings);
    //client.broadcast(message);
    client.listener.broadcast(message);
  });

  client.on('disconnect', function(){
    delete g_clientIds[client.sessionId];
    --g_numClients;
    if (g_numClients == 0) {
      console.log("cleared all settings");
      g_allSettings = { };
    }
  });
});