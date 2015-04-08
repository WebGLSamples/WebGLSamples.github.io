tdl.require('tdl.buffers');
tdl.require('tdl.fast');
tdl.require('tdl.fps');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.misc');
tdl.require('tdl.models');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.textures');
tdl.require('tdl.webgl');
window.onload = initialize;

// globals
var gl;                   // the gl context.
var canvas;               // the canvas
var math;                 // the math lib.
var fast;                 // the fast math lib.

var g_sortByModel       = false;
var g_eyeSpeed          = 0.5;
var g_eyeHeight         = 2;
var g_eyeRadius         = 9;
var g_maxObjects        = 250000;
var g_numObjects        = 100;
var g_modelsPerBlock    = 50;
var g_targetFrameRate   = 60 - 2;  // add some fudge so browser that runs at 58-59 can still run the test

function CreateApp() {
  // Create Geometry.
  var sphereArrays = tdl.primitives.createSphere(0.4, 6, 6);
  var cubeArrays = tdl.primitives.createCube(0.8);
  var coneArrays = tdl.primitives.createTruncatedCone(
      0.4, 0.0, 0.8, 12, 1, true, true);

  // Load textures
  var textures = {
      diffuseSampler: tdl.textures.loadTexture('happy-face.png')
  };

  // Create Shader Program
  var program = tdl.programs.loadProgramFromScriptTags(
      'sphereVertexShader',
      'sphereFragmentShader');

  // --Setup Models---------------------------------------
  var models = [
    new tdl.models.Model(program, sphereArrays, textures),
    new tdl.models.Model(program, cubeArrays, textures),
    new tdl.models.Model(program, coneArrays, textures)
  ];

  // -- Setup Instances ----------------------------------

  var instances = [];
  for (var ii = 0; ii < g_maxObjects; ++ii) {
    instances.push({
      x: 0,
      y: 0,
      z: 0,
      colorMult: new Float32Array([Math.random(), Math.random(), Math.random(), 1]),
      modelIndex: Math.floor(ii / g_modelsPerBlock) % models.length,
      xRadius: math.pseudoRandom() * 5,
      yRadius: math.pseudoRandom() * 5,
      zRadius: math.pseudoRandom() * 5,
      xClockSpeed: (math.pseudoRandom() + 0.5),
      yClockSpeed: (math.pseudoRandom() + 0.5),
      zClockSpeed: (math.pseudoRandom() + 0.5),
      xClock: math.pseudoRandom() * Math.PI * 2,
      yClock: math.pseudoRandom() * Math.PI * 2,
      zClock: math.pseudoRandom() * Math.PI * 2
    });
  }

  // pre-sort by model.
  if (g_sortByModel) {
    instances.sort(function(a, b) {
      if (a.modelIndex < b.modelIndex) return -1;
      if (a.modelIndex > b.modelIndex) return  1;
      return 0;
    });
  }

  // pre-allocate a bunch of arrays
  var projection = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);
  var worldInverse = new Float32Array(16);
  var worldInverseTranspose = new Float32Array(16);
  var viewProjection = new Float32Array(16);
  var worldViewProjection = new Float32Array(16);
  var viewInverse = new Float32Array(16);
  var viewProjectionInverse = new Float32Array(16);
  var eyePosition = new Float32Array(3);
  var target = new Float32Array(3);
  var up = new Float32Array([0,1,0]);
  var lightWorldPos = new Float32Array(3);
  var v3t0 = new Float32Array(3);
  var v3t1 = new Float32Array(3);
  var v3t2 = new Float32Array(3);
  var v3t3 = new Float32Array(3);
  var m4t0 = new Float32Array(16);
  var m4t1 = new Float32Array(16);
  var m4t2 = new Float32Array(16);
  var m4t3 = new Float32Array(16);
  var zero4 = new Float32Array(4);
  var one4 = new Float32Array([1,1,1,1]);

  // uniforms.
  var sharedUniforms = {
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    specular: one4,
    shininess: 50,
    specularFactor: 0.2,
  };
  var uniqueUniforms = {
    colorMult: new Float32Array([0,0,0,1]),
    world: world,
    worldViewProjection: worldViewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose
  };

  var clock = 0.0;
  function update(elapsedTime) {
    clock += elapsedTime;

    resizeCanvas();

    // Make the camera rotate around the scene.
    eyePosition[0] = Math.sin(clock * g_eyeSpeed) * g_eyeRadius;
    eyePosition[1] = g_eyeHeight;
    eyePosition[2] = Math.cos(clock * g_eyeSpeed) * g_eyeRadius;

    // --Update Instance Positions---------------------------------------
    var advance = elapsedTime / 2;
    for (var ii = 0; ii < g_numObjects; ++ii) {
      var instance = instances[ii];
      instance.xClock += advance * instance.xClockSpeed;
      instance.yClock += advance * instance.yClockSpeed;
      instance.zClock += advance * instance.zClockSpeed;
      instance.x = Math.sin(instance.xClock) * instance.xRadius;
      instance.y = Math.sin(instance.yClock) * instance.yRadius;
      instance.z = Math.cos(instance.zClock) * instance.zRadius;
    }
  }

  function render() {
    renderBegin();
    renderScene();
    renderEnd();
  }

  function renderBegin() {
    var m4 = fast.matrix4;
    // clear the screen.
    gl.colorMask(true, true, true, true);
    gl.depthMask(true);
    gl.clearColor(1,1,1,0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Compute a projection and view matrices.
    m4.perspective(
        projection,
        math.degToRad(60),
        canvas.clientWidth / canvas.clientHeight,
        1,
        5000);
    m4.lookAt(
        view,
        eyePosition,
        target,
        up);
    m4.mul(viewProjection, view, projection);
    m4.inverse(viewInverse, view);
    m4.inverse(viewProjectionInverse, viewProjection);

    // Put the light near the camera
    m4.getAxis(v3t0, viewInverse, 0); // x
    m4.getAxis(v3t1, viewInverse, 1); // y
    m4.getAxis(v3t2, viewInverse, 2); // z
    fast.mulScalarVector(v3t0, 10, v3t0);
    fast.mulScalarVector(v3t1, 10, v3t1);
    fast.mulScalarVector(v3t2, 10, v3t2);
    fast.addVector(lightWorldPos, eyePosition, v3t0);
    fast.addVector(lightWorldPos, lightWorldPos, v3t1);
    fast.addVector(lightWorldPos, lightWorldPos, v3t2);
  }

  function renderScene() {
    // -- Render Instances ---------------------------------------

    var m4 = fast.matrix4;
    var lastModel = null;
    for (var ii = 0; ii < g_numObjects; ++ii) {
      var instance = instances[ii];
      var model = models[instance.modelIndex];
      if (model != lastModel) {
        lastModel = model;
        model.drawPrep(sharedUniforms);
      }
      m4.translation(world, [instance.x, instance.y, instance.z]);
      m4.mul(worldViewProjection, world, viewProjection);
      m4.inverse(worldInverse, world);
      m4.transpose(worldInverseTranspose, worldInverse);
      uniqueUniforms.colorMult = instance.colorMult;
      model.drawPrep();
      model.draw(uniqueUniforms);
    }
  }

  function renderEnd() {
    // nothing to do.
  }

  return {
    update: update,
    render: render
  };
}

function resizeCanvas() {
  if (canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    console.log("resized canvas: " + canvas.width + ", " + canvas.height);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
  }
}

function initialize() {
  math = tdl.math;
  fast = tdl.fast;
  canvas = document.getElementById("canvas");
  var fpsTimer = new tdl.fps.FPSTimer();
  var fpsElem = document.getElementById("fps");
  var cntElem = document.getElementById("cnt");
  var avgElem = document.getElementById("avg");

  document.getElementById("title").innerHTML = document.getElementsByTagName("title")[0].innerHTML;

  var ctxOptions =  g_contextSettings || {
    alpha: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };
  tdl.misc.applyUrlSettings(ctxOptions);

  gl = tdl.webgl.setupWebGL(canvas, ctxOptions);
  if (!gl) {
    return false;
  }

  resizeCanvas();

  var app = CreateApp();

  PerfHarness.setTargetFPS(g_targetFrameRate);

  function render(count, averageCount, elapsedTime) {
    // Update the FPS timer.
    fpsTimer.update(elapsedTime);
    fpsElem.innerHTML = fpsTimer.averageFPS;

    cntElem.innerHTML = count;
    avgElem.innerHTML = averageCount;
    g_numObjects = count;

    app.update(elapsedTime);
    app.render();
  }
  var framesToAverage = 60;
  PerfHarness.start(canvas, render, framesToAverage);
  return true;
}

