importScripts("./WorkerImport.js");
var IS_WORKER_CONTEXT = true;
var isMobile = false;

var camera = {
  position: {
    x: 0, y: 0, z: 0
  }
};
var REUSABLE_VECTOR = new THREE.Vector3();
var COS30DEG = Math.cos(30 * Math.PI / 180);
var SIN30DEG = Math.sin(30 * Math.PI / 180);

var LightningWorker = function(){
  this.reset();
}

LightningWorker.prototype.startRecording = function(){
  this.isRecording = true;
}

LightningWorker.prototype.dumpPerformance = function(){
  postMessage({performance: this.performance});
}

LightningWorker.prototype.invalidateTransferableBody = function(){
  if (this.transferableMessageBody){
    delete this.transferableMessageBody;
    delete this.transferableList;
  }
}

LightningWorker.prototype.reset = function(){
  this.isRecording = false;
  this.lightnings = new Object();
  this.lightningIDsByLightningName = new Object();
  this.idCtr = 0;
  this.startEndPointBufferIndicesByLightningName = new Object();
}

LightningWorker.prototype.onLightningCreation = function(lightningDescription, isEditorLightning){
  var lightning = new Lightning(lightningDescription.name, lightningDescription.detailThreshold, 0, lightningDescription.maxDisplacement, lightningDescription.count, lightningDescription.colorName, lightningDescription.radius, lightningDescription.roughness);
  lightning.init(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0));
  if (!isEditorLightning){
    this.lightnings[this.idCtr ++] = lightning;
    this.lightningIDsByLightningName[lightning.name] = this.idCtr - 1;
    postMessage({idResponse: true, lightningName: lightning.name, id: this.idCtr - 1});
  }else{
    this.editorLightning = lightning;
  }
}

LightningWorker.prototype.onLightningDeletion = function(lightningName){
  var id = this.lightningIDsByLightningName[lightningName];
  delete this.lightnings[id];
  delete this.lightningIDsByLightningName[lightningName];
  delete this.startEndPointBufferIndicesByLightningName[lightningName];
}

LightningWorker.prototype.onSetCorrectionProperties = function(lightningName, correctionRefDistance, correctionRefLength){
  var lightningID = this.lightningIDsByLightningName[lightningName];
  var lightning = this.lightnings[lightningID];
  lightning.setCorrectionProperties(correctionRefDistance, correctionRefLength);
}

LightningWorker.prototype.onDisableCorrection = function(lightningName){
  var lightningID = this.lightningIDsByLightningName[lightningName];
  var lightning = this.lightnings[lightningID];
  lightning.disableCorrection();
}

LightningWorker.prototype.saveStartEndPointBufferIndices = function(payload){
  for (var lightningName in payload){
    this.startEndPointBufferIndicesByLightningName[lightningName] = payload[lightningName];
  }
}

LightningWorker.prototype.onEditorClose = function(){
  delete this.editorLightning;
}

LightningWorker.prototype.update = function(transferableMessageBody){
  var startTime
  if (this.isRecording){
    startTime = performance.now();
  }
  camera.position.x = transferableMessageBody.cameraPosition[0];
  camera.position.y = transferableMessageBody.cameraPosition[1];
  camera.position.z = transferableMessageBody.cameraPosition[2];
  for (var i = 0; i<transferableMessageBody.updateBuffer.length; i++){
    var id = transferableMessageBody.updateBuffer[i];
    if (id == -1){
      break;
    }else{
      var lightning = this.editorLightning? this.editorLightning: this.lightnings[id];
      var curStartEndPointBufferIndex = this.editorLightning? 0: this.startEndPointBufferIndicesByLightningName[lightning.name];
      lightning.startPoint.set(transferableMessageBody.startEndPoints[curStartEndPointBufferIndex], transferableMessageBody.startEndPoints[curStartEndPointBufferIndex + 1], transferableMessageBody.startEndPoints[curStartEndPointBufferIndex + 2]);
      lightning.endPoint.set(transferableMessageBody.startEndPoints[curStartEndPointBufferIndex + 3], transferableMessageBody.startEndPoints[curStartEndPointBufferIndex + 4], transferableMessageBody.startEndPoints[curStartEndPointBufferIndex + 5]);
      curStartEndPointBufferIndex += 6;
      lightning.update();
      lightning.positionsTypedAray = transferableMessageBody.buffer[lightning.name];
      for (var nodeID in lightning.renderMap){
        lightning.updateNodePositionInShader(lightning.renderMap[nodeID], true);
        lightning.updateNodePositionInShader(lightning.renderMap[nodeID], false);
      }
    }
  }
  if (this.isRecording){
    this.performance = performance.now() - startTime;
  }
}

var worker = new LightningWorker();

self.onmessage = function(msg){
  var data = msg.data;
  if (data.onLightningCreation){
    worker.onLightningCreation(data.lightning, data.isEditorLightning);
  }else if (data.onLightningDeletion){
    worker.onLightningDeletion(data.lightningName);
  }else if (data.reset){
    worker.reset();
  }else if (data.onSetCorrectionProperties){
    worker.onSetCorrectionProperties(data.lightningName, data.correctionRefDistance, data.correctionRefLength);
  }else if (data.onDisableCorrection){
    worker.onDisableCorrection(data.lightningName);
  }else if (data.isStartEndPointBufferIndices){
    worker.saveStartEndPointBufferIndices(data.payload);
  }else if (data.invalidateTransferableBody){
    worker.invalidateTransferableBody();
  }else if (data.onEditorClose){
    worker.onEditorClose();
  }else if (data.startRecording){
    worker.startRecording();
  }else if (data.dumpPerformance){
    worker.dumpPerformance();
  }else{
    worker.update(data);
    if (!worker.transferableMessageBody){
      worker.transferableMessageBody = data;
      worker.transferableList = [data.cameraPosition.buffer];
      for (var key in data.buffer){
        worker.transferableList.push(data.buffer[key].buffer);
      }
      worker.transferableList.push(data.startEndPoints.buffer);
      worker.transferableList.push(data.updateBuffer.buffer);
    }else{
      worker.transferableMessageBody = data;
      worker.transferableList[0] = data.cameraPosition.buffer;
      var i = 1;
      for (var key in data.buffer){
        worker.transferableList[i++] = data.buffer[key].buffer;
      }
      worker.transferableList[i] = data.startEndPoints.buffer;
      worker.transferableList[i+1] = data.updateBuffer.buffer;
    }
    postMessage(worker.transferableMessageBody, worker.transferableList);
  }
}