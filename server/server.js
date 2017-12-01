const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocketServer = require('ws').Server;

g = {
    port: 8080,
    screenshotCount: 0
};

var optionSpec = {
  options: [
   { option: 'port', alias: 'p', type: 'Int',     description: 'port. Default 8080'},
   { option: 'help', alias: 'h', type: 'Boolean', description: 'displays help'},
  ],
  helpStyle: {
    typeSeparator: '=',
    descriptionSeparator: ' : ',
    initialIndent: 4,
  },
};

const optionator = require('optionator')(optionSpec);

let args;
try {
  args = optionator.parse(process.argv);
} catch (e) {
  console.error(e);
  process.exit(1);  // eslint-disable-line
}

function printHelp() {
  console.log(optionator.generateHelp());
  process.exit(0);  // eslint-disable-line
};

if (args.help) {
  printHelp();
}

g.port = args.port || 8080;

const baseDir = path.join(__dirname, '..');

let app = express();
app.post('*', function(req, res) {
    let body = '';
    req.on('data', function(data) { body += data; });
    req.on('end', function() {
        postHandler(req, function(query) {
          console.log("query:", query.cmd);
          switch (query.cmd) {
          case 'time':
            sendJSONResponse(res, { time: (new Date()).getTime() * 0.001 });
            break;
          case 'screenshot':
            saveScreenshotFromDataURL(query.dataURL);
            sendJSONResponse(res, { ok: true });
            break;
          default:
            console.log("err: unknown post:", query);
            send404(res);
            break;
          }
        });
    });
});
app.use(express.static(baseDir));
const server = http.createServer(app);
server.listen(g.port, function() {
  startWebSocketServer(server);
  console.log(`listening at http://localhost:${g.port}`);
});

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

function saveScreenshotFromDataURL(dataURL) {
  var EXPECTED_HEADER = "data:image/png;base64,";
  if (dataUrl.startsWith(EXPECTED_HEADER)) {
    var filename = "screenshot-" + (g.screenshotCount++) + ".png";
    fs.writeFile(
        filename,
        dataURL.substr(
            EXPECTED_HEADER.length,
            dataURL.length - EXPECTED_HEADER.length),
        'base64');
    console.log("Saved Screenshot: ", filename);
  }
}

function startWebSocketServer(server) {
  const wsServer = new WebSocketServer({
    server: server,
  });

  let g_allSettings = {};
  const g_clients = [];

  function broadcast(message) {
    g_clients.forEach((client) => { client.send(message); });
  }

  wsServer.on('connection', function(client) {
    console.log("new connection");
    g_clients.push(client);

    client.send(JSON.stringify(g_allSettings));

    client.on('message', function(message){
        Object.assign(g_allSettings, JSON.parse(message));
        broadcast(message);
    });

    client.on('close', function(){
      console.log("close connection");
      g_clients.splice(g_clients.indexOf(client), 1);
      if (g_clients.length == 0) {
        console.log("cleared all settings");
        g_allSettings = { };
      }
    });
  });
}
