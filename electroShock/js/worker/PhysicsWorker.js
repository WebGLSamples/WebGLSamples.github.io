importScripts("./WorkerImport.js");
var IS_WORKER_CONTEXT = true;

// CLASS DEFINITION
var PhysicsWorker = function(){
  this.record = false;
  this.idsByObjectName = new Object();
  this.objectsByID = new Object();
  this.reusableVec1 = new CANNON.Vec3();
  this.reusableVec2 = new CANNON.Vec3();
  this.setCollisionListenerBuffer = new Map();
  this.removeCollisionListenerBuffer = new Map();
  this.objectsWithCollisions = new Map();
  this.collisionsBuffer = new Map();
  this.performanceLogs = {isPerformanceLog: true, stepTime: 0}
}
PhysicsWorker.prototype.refresh = function(state){
  delete this.transferableMessageBody;
  delete this.transferableList;
  this.setCollisionListenerBuffer = new Map();
  this.removeCollisionListenerBuffer = new Map();
  this.objectsWithCollisionListeners = new Map();
  this.collisionsBuffer = new Map();
  this.idsByObjectName = new Object();
  this.objectsByID = new Object();
  var stateLoader = new StateLoaderLightweight(state);
  stateLoader.resetPhysics();
  stateLoader.loadPhysicsData();
  this.initPhysics();
  stateLoader.loadPhysics();
  var idCtr = 0;
  var idResponse = {isIDResponse: true, ids: []}
  var dynamicObjCount = 0;
  for (var objName in addedObjects){
    idResponse.ids.push({
      name: objName, id: idCtr
    });
    this.idsByObjectName[objName] = idCtr;
    this.objectsByID[idCtr] = addedObjects[objName];
    if (addedObjects[objName].physicsBody.mass > 0 || addedObjects[objName].isChangeable){
      dynamicObjCount ++;
      dynamicAddedObjects.set(objName, addedObjects[objName]);
    }
    idCtr ++;
  }
  for (var objName in objectGroups){
    idResponse.ids.push({
      name: objName, id: idCtr
    });
    this.idsByObjectName[objName] = idCtr;
    this.objectsByID[idCtr] = objectGroups[objName];
    if (objectGroups[objName].physicsBody.mass > 0 || objectGroups[objName].isChangeable){
      dynamicObjCount ++;
      dynamicObjectGroups.set(objName, objectGroups[objName]);
    }
    idCtr ++;
  }
  postMessage(idResponse);
}
PhysicsWorker.prototype.initPhysics = function(){
  physicsWorld.quatNormalizeSkip = quatNormalizeSkip;
  physicsWorld.quatNormalizeFast = quatNormalizeFast;
  physicsWorld.defaultContactMaterial.contactEquationStiffness = contactEquationStiffness;
  physicsWorld.defaultContactMaterial.contactEquationRelaxation = contactEquationRelaxation;
  physicsWorld.defaultContactMaterial.friction = friction;
  physicsSolver.iterations = physicsIterations;
  physicsSolver.tolerance = physicsTolerance;
  physicsWorld.solver = physicsSolver;
  physicsWorld.gravity.set(0, gravityY, 0);
  physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld);
}
PhysicsWorker.prototype.debug = function(){
  var response = {isDebug: true, bodies: []};
  for (var i = 0; i<physicsWorld.bodies.length; i++){
    response.bodies.push({
      name: physicsWorld.bodies[i].roygbivName,
      position: {x: physicsWorld.bodies[i].position.x, y: physicsWorld.bodies[i].position.y, z: physicsWorld.bodies[i].position.z},
      quaternion: {x: physicsWorld.bodies[i].quaternion.x, y: physicsWorld.bodies[i].quaternion.y, z: physicsWorld.bodies[i].quaternion.z, w: physicsWorld.bodies[i].quaternion.w}
    });
  }
  postMessage(response);
}
PhysicsWorker.prototype.setObjectCollisionCallback = function(obj){
  if (!obj){
    return;
  }
  if (!worker.objectsWithCollisionListeners.has(obj.name)){
    obj.collisionEvent = function(event){
      if (!obj.physicsWorkerCollisionInfo){
        obj.physicsWorkerCollisionInfo = new CollisionInfo();
      }
      var contact = event.contact;
      obj.physicsWorkerCollisionInfo.set(
        worker.idsByObjectName[event.body.roygbivName], contact.bi.position.x + contact.ri.x,
        contact.bi.position.y + contact.ri.y, contact.bi.position.z + contact.ri.z, contact.getImpactVelocityAlongNormal(),
        this.physicsBody.quaternion.x, this.physicsBody.quaternion.y, this.physicsBody.quaternion.z, this.physicsBody.quaternion.w
      );
      worker.collisionsBuffer.set(this.name, this);
    }.bind(obj);
    obj.physicsBody.addEventListener("collide", obj.collisionEvent);
    worker.objectsWithCollisionListeners.set(obj.name, obj);
  }
}
PhysicsWorker.prototype.removeObjectCollisionCallback = function(obj){
  if (!obj){
    return;
  }
  if (worker.objectsWithCollisionListeners.has(obj.name)){
    obj.physicsBody.removeEventListener("collide", obj.collisionEvent);
    worker.objectsWithCollisionListeners.delete(obj.name);
    if (worker.collisionsBuffer.has(obj.name)){
      worker.collisionsBuffer.delete(obj.name);
    }
  }
}
PhysicsWorker.prototype.insertCollisionIntoBuffer = function(obj){
  var i = worker.collisionDescriptionIndex;
  var collisionInfo = obj.physicsWorkerCollisionInfo;
  worker.collisionDescription[i] = worker.idsByObjectName[obj.name];
  worker.collisionDescription[i+1] = collisionInfo.targetObjectName;
  worker.collisionDescription[i+2] = collisionInfo.x; worker.collisionDescription[i+3] = collisionInfo.y; worker.collisionDescription[i+4] = collisionInfo.z;
  worker.collisionDescription[i+5] = collisionInfo.collisionImpact;
  worker.collisionDescription[i+6] = collisionInfo.quaternionX; worker.collisionDescription[i+7] = collisionInfo.quaternionY; worker.collisionDescription[i+8] = collisionInfo.quaternionZ; worker.collisionDescription[i+9] = collisionInfo.quaternionW;
  worker.collisionDescriptionIndex += 10;
}
PhysicsWorker.prototype.handleCollisions = function(collisionDescription){
  this.setCollisionListenerBuffer.forEach(this.setObjectCollisionCallback);
  this.removeCollisionListenerBuffer.forEach(this.removeObjectCollisionCallback);
  var collisionsSize = this.collisionsBuffer.size;
  if (collisionsSize > 0){
    if (!collisionDescription){
      collisionDescription = new Float32Array(10 * collisionsSize);
    }
    this.collisionDescription = collisionDescription;
    this.collisionDescriptionIndex = 0;
    this.collisionsBuffer.forEach(this.insertCollisionIntoBuffer);
    for (var i = this.collisionDescriptionIndex; i<this.collisionDescription.length; i++){
      this.collisionDescription[i] = -1;
    }
  }
  return collisionDescription;
}
PhysicsWorker.prototype.step = function(data){
  var startTime
  if (this.record){
    startTime = performance.now();
  }
  var collisionDescriptionArray = this.handleCollisions(data.collisionDescription);
  this.setCollisionListenerBuffer.clear(); this.removeCollisionListenerBuffer.clear(); this.collisionsBuffer.clear();
  if (collisionDescriptionArray){
    data.collisionDescription = collisionDescriptionArray;
  }
  var ary = data.objDescription;
  for (var i = 0; i<ary.length; i+=19){
    var obj = worker.objectsByID[ary[i]];
    obj.physicsBody.position.x = ary[i+1]; obj.physicsBody.position.y = ary[i+2]; obj.physicsBody.position.z = ary[i+3];
    obj.physicsBody.quaternion.x = ary[i+4]; obj.physicsBody.quaternion.y = ary[i+5]; obj.physicsBody.quaternion.z = ary[i+6]; obj.physicsBody.quaternion.w = ary[i+7];
    obj.setMass(ary[i+8]);
    obj.physicsBody.velocity.x = ary[i+9]; obj.physicsBody.velocity.y = ary[i+10]; obj.physicsBody.velocity.z = ary[i+11];
    this.reusableVec1.set(ary[i+12], ary[i+13], ary[i+14]); this.reusableVec2.set(ary[i+15], ary[i+16], ary[i+17]);
    if (this.reusableVec1.x != 0 || this.reusableVec1.y != 0 || this.reusableVec1.z != 0){
      obj.physicsBody.applyImpulse(this.reusableVec1, this.reusableVec2);
    }
    ary[i+12] = 0; ary[i+13] = 0; ary[i+14] = 0; ary[i+15] = 0; ary[i+16] = 0; ary[i+17] = 0;
    if (ary[i+18] == 1){
      if (obj.hidden){
        physicsWorld.addBody(obj.physicsBody);
        obj.hidden = false;
      }
    }else{
      if (!obj.hidden){
        physicsWorld.remove(obj.physicsBody);
        obj.hidden = true;
      }
    }
  }
  physicsWorld.step(STEP);
  for (var i = 0; i<ary.length; i+=19){
    var obj = worker.objectsByID[ary[i]];
    ary[i+1] = obj.physicsBody.position.x; ary[i+2] = obj.physicsBody.position.y; ary[i+3] = obj.physicsBody.position.z;
    ary[i+4] = obj.physicsBody.quaternion.x; ary[i+5] = obj.physicsBody.quaternion.y; ary[i+6] = obj.physicsBody.quaternion.z; ary[i+7] = obj.physicsBody.quaternion.w;
    ary[i+8] = obj.physicsBody.mass;
    ary[i+9] = obj.physicsBody.velocity.x; ary[i+10] = obj.physicsBody.velocity.y; ary[i+11] = obj.physicsBody.velocity.z;
  }
  if (!worker.transferableMessageBody){
    worker.transferableMessageBody = {objDescription: ary}
    worker.transferableList = [ary.buffer];
    if (data.collisionDescription){
      worker.transferableMessageBody.collisionDescription = data.collisionDescription;
      worker.transferableList.push(data.collisionDescription.buffer);
    }
  }else{
    worker.transferableMessageBody.objDescription = ary;
    worker.transferableList[0] = ary.buffer;
    if (data.collisionDescription){
      worker.transferableMessageBody.collisionDescription = data.collisionDescription;
      if (worker.transferableList.length == 1){
        worker.transferableList.push(data.collisionDescription.buffer);
      }else{
        worker.transferableList[1] = data.collisionDescription.buffer;
      }
    }
  }
  postMessage(worker.transferableMessageBody, worker.transferableList);
  if (this.record){
    this.performanceLogs.stepTime = performance.now() - startTime;
  }
}

PhysicsWorker.prototype.startRecording = function(){
  this.record = true;
}
PhysicsWorker.prototype.dumpPerformanceLogs = function(){
  postMessage(this.performanceLogs);
}
PhysicsWorker.prototype.setCollisionListener = function(objName){
  if (this.removeCollisionListenerBuffer.has(objName)){
    this.removeCollisionListenerBuffer.delete(objName);
  }
  var obj = addedObjects[objName] || objectGroups[objName];
  this.setCollisionListenerBuffer.set(objName, obj);
}
PhysicsWorker.prototype.removeCollisionListener = function(objName){
  if (this.setCollisionListenerBuffer.has(objName)){
    this.setCollisionListenerBuffer.delete(objName);
  }
  var obj = addedObjects[objName] || objectGroups[objName];
  this.removeCollisionListenerBuffer.set(objName, obj);
}

PhysicsWorker.prototype.dumpShapeCount = function(){
  var count = 0;
  for (var i = 0; i<physicsWorld.bodies.length; i++){
    count += physicsWorld.bodies[i].shapes.length;
  }
  console.log(count);
}
// START
var STEP = 1/60;
var PIPE = "|";
var UNDEFINED = "undefined";
var physicsShapeCache = new Object();
var dynamicAddedObjects = new Map();
var dynamicObjectGroups = new Map();
var addedObjects = new Object();
var objectGroups = new Object();
var physicsBodyGenerator = new PhysicsBodyGenerator();
var physicsWorld;
var quatNormalizeSkip, quatNormalizeFast, contactEquationStiffness, contactEquationRelaxation, friction;
var physicsIterations, physicsTolerance, physicsSolver, gravityY;
var worker = new PhysicsWorker();
self.onmessage = function(msg){
  if (msg.data.isSetCollisionListener){
    worker.setCollisionListener(msg.data.objName);
  }else if (msg.data.isRemoveCollisionListener){
    worker.removeCollisionListener(msg.data.objName);
  }else if (msg.data.isLightweightState){
    worker.refresh(msg.data);
  }else if (msg.data.isDebug){
    worker.debug();
  }else if (msg.data.startRecording){
    worker.startRecording();
  }else if (msg.data.dumpPerformanceLogs){
    worker.dumpPerformanceLogs();
  }else if(msg.data.dumpShapeCount){
    worker.dumpShapeCount();
  }else{
    worker.hasOwnership = true;
    worker.step(msg.data);
  }
}