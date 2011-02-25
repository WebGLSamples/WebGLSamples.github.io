tdl.require('tdl.buffers');
tdl.require('tdl.clock');
tdl.require('tdl.fast');
tdl.require('tdl.fps');
tdl.require('tdl.framebuffers');
tdl.require('tdl.io');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.models');
tdl.require('tdl.particles');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.sync');
tdl.require('tdl.textures');
tdl.require('tdl.webgl');

// globals
var gl;                   // the gl context.
var canvas;               // the canvas
var theClock;
var math;                 // the math lib.
var fast;                 // the fast math lib.
var m4;                   // the fast matrix4 lib.
var aspect;
var g_fpsTimer;           // object to measure frames per second
var then = 0.0;
var frameCount = 0;
var totalFrameCount = 0;

function getScriptText(id) {
  //tdl.log("loading: ", id);
  var elem = document.getElementById(id);
  if (!elem) {
    throw 'no element: ' + id
  }
  return elem.text;
}

function createProgramFromTags(
    vertexTagId,
    fragmentTagId) {
  return tdl.programs.loadProgram(
    getScriptText(vertexTagId), getScriptText(fragmentTagId));
}

function initializeGraphics() {
  canvas = document.getElementById('canvas');
  gl = tdl.webgl.setupWebGL(canvas);
  if (!gl) {
    return false;
  }

  if (!gl.getExtension("OES_texture_float")) {
    alert("This demo requires the OES_texture_float extension");
    return false;
  }

  aspect = canvas.clientWidth / canvas.clientHeight;

  // Set some sane defaults.
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.disable(gl.BLEND);

  theClock = tdl.clock.createClock();
  math = tdl.math;
  fast = tdl.fast;
  m4 = tdl.fast.matrix4;

  return true;
}

window.onload = function() {
  g_fpsTimer = new tdl.fps.FPSTimer();
  if (initializeGraphics()) {
    demo = new HDRDemo();
    // Kick it off!
    mainloop();
  }
};

function mainloop() {
  var fpsElem = document.getElementById("fps");
  function render() {
    tdl.webgl.requestAnimationFrame(render, canvas);
    var now = theClock.getTime();
    var elapsedTime;
    if (then == 0.0) {
      elapsedTime = 0.0;
    } else {
      elapsedTime = now - then;
    }
    then = now;
    frameCount++;
    g_fpsTimer.update(elapsedTime);
    if (fpsElem)
      fpsElem.innerHTML = g_fpsTimer.averageFPS;

    aspect = canvas.clientWidth / canvas.clientHeight;
    demo.render(now);
    frameCount++;
    totalFrameCount++;
  }

  // Repeatedly run render(), attempt to hold 60 but the demo is
  // framerate independent so we will still keep sync even if we
  // lose frames.
  render();
};

//----------------------------------------------------------------------

// Loads an HDR cube map from six binary URLs in the order:
//   POSX, NEGX, POSY, NEGY, POSZ, NEGZ
var HDRCubeMap = function(urls) {
  this.arrayBuffers = [];
  this.faceTargets = [
    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
  ];
  var that = this;
  for (var ii = 0; ii < urls.length; ++ii) {
    var completion = function(faceIndex) {
      return function(arrayBuffer, exception) {
        if (arrayBuffer) {
          that.arrayBuffers[faceIndex] = arrayBuffer;
        }
        that.update_();
      }
    }(ii);
    tdl.io.loadArrayBuffer(urls[ii], completion);
  }
};

HDRCubeMap.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
};

HDRCubeMap.prototype.update_ = function() {
  var numLoaded = 0;
  for (var ii = 0; ii < this.arrayBuffers.length; ++ii) {
    if (this.arrayBuffers[ii]) {
      ++numLoaded;
    }
  }
  if (numLoaded == 6) {
    // Upload all faces to the GPU.
    // We assume each face is square and infer its size from the
    // length of the ArrayBuffer.
    //
    // FIXME: handle endianness differences between host and incoming data.
    var size = Math.sqrt(this.arrayBuffers[0].byteLength / Float32Array.BYTES_PER_ELEMENT / 3);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    for (var ii = 0; ii < this.arrayBuffers.length; ++ii) {
      gl.texImage2D(this.faceTargets[ii], 0, gl.RGB, size, size, 0, gl.RGB, gl.FLOAT, new Float32Array(this.arrayBuffers[ii]));
    }
    this.arrayBuffers = null;
    this.texture = texture;
  }
};

//----------------------------------------------------------------------

/**
 * Sets up the Skybox
 */
function setupSkybox() {
  var reflectionMap = new HDRCubeMap(
    ["assets/grace_cross_mmp-posx.bin",
     "assets/grace_cross_mmp-negx.bin",
     "assets/grace_cross_mmp-posy.bin",
     "assets/grace_cross_mmp-negy.bin",
     "assets/grace_cross_mmp-posz.bin",
     "assets/grace_cross_mmp-negz.bin"]);
  var textures = {
    u_skybox: reflectionMap
  };
  var program = tdl.programs.loadProgramFromScriptTags(
    'skyboxVertexShader',
    'skyboxFragmentShader');
  var arrays = tdl.primitives.createPlane(2, 2, 1, 1);
  delete arrays['normal'];
  delete arrays['texCoord'];
  tdl.primitives.reorient(arrays,
      [1, 0, 0, 0,
       0, 0, 1, 0,
       0,-1, 0, 0,
       0, 0, 0.99, 1]);
  return new tdl.models.Model(program, arrays, textures);
}

//----------------------------------------------------------------------

var HDRDemo = function() {
  var eyePosition = new Float32Array(3);
  var target = new Float32Array(3);
  var up = new Float32Array([0,1,0]);

  var projection = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);

  var worldView = new Float32Array(16);
  var viewProjection = new Float32Array(16);
  var viewDirectionProjectionInverse = new Float32Array(16);
  var worldViewProjection = new Float32Array(16);
  var m4t0 = new Float32Array(16);
  var m4t1 = new Float32Array(16);

  this.models = [];

  //  this.program = createProgramFromTags("diffuseVertexShader", "diffuseFragmentShader");
  this.program = createProgramFromTags("irradianceVertexShader", "irradianceFragmentShader");

  this.load("assets/teapot.js");

  var irradianceMap = new HDRCubeMap(
    ["assets/grace_cross_irrad_mmp-posx.bin",
     "assets/grace_cross_irrad_mmp-negx.bin",
     "assets/grace_cross_irrad_mmp-posy.bin",
     "assets/grace_cross_irrad_mmp-negy.bin",
     "assets/grace_cross_irrad_mmp-posz.bin",
     "assets/grace_cross_irrad_mmp-negz.bin"]);

  var backbuffer = tdl.framebuffers.getBackBuffer(canvas);

  var floatBackbuffer = new tdl.framebuffers.Float32Framebuffer(canvas.width, canvas.height, true);

  var skybox = setupSkybox();

  this.render = function(time) {
    
    backbuffer.bind();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var eyeRadius = 100.0;
    var eyeHeight = 30.0;
    var eyeClock = time;
    eyePosition[0] = Math.sin(eyeClock) * eyeRadius;
    eyePosition[1] = eyeHeight;
    eyePosition[2] = Math.cos(eyeClock) * eyeRadius;
    target[0] = 0.0;
    target[1] = 20.0;
    target[2] = 0.0;

    m4.perspective(projection, math.degToRad(70), aspect, 0.1, 500);
    m4.lookAt(
      view,
      eyePosition,
      target,
      up);
    m4.mul(viewProjection, view, projection);
    m4.identity(world);
    m4.mul(worldViewProjection, world, viewProjection);
    m4.copy(m4t0, view);
    m4.setTranslation(m4t0, [0, 0, 0]);
    m4.mul(m4t1, m4t0, projection);
    m4.inverse(viewDirectionProjectionInverse, m4t1);
    
    gl.depthMask(false);

    // Draw the skybox.
    var skyConst = {
      u_viewDirectionProjectionInverse: viewDirectionProjectionInverse,
    };
    var skyPer = {};
    skybox.drawPrep(skyConst);
    skybox.draw(skyPer);

    gl.depthMask(true);

    var uniformsConst = {
      u_worldViewProjection: worldViewProjection,
      u_worldView: worldView,
      u_world: world,
      // u_lightDir: [-1.0, 1.0, 1.0],
      // u_lightColor: [0.8, 0.7, 0.6, 1.0],
      u_irradianceMap: irradianceMap,
    };
    var uniformsPer = {};

    for (var ii = 0; ii < this.models.length; ++ii) {
      var model = this.models[0];
      model.drawPrep(uniformsConst);
      model.draw(uniformsPer);
    }
  };
};

HDRDemo.prototype.load = function(url) {
  var that = this;
  this.url = url;
  tdl.io.loadJSON(url, function(data, exception) {
      that.onload_(data, exception);
    });
};

HDRDemo.prototype.onload_ = function(data, exception) {
  if (!exception) {
    for (var mm = 0; mm < data.models.length; ++mm) {
      var model = data.models[mm];
      // setup textures
      var textures = {};
      for (var name in model.textures) {
        textures[name] = tdl.textures.loadTexture(
            'assets/' + model.textures[name], true);
      }
      // setup vertices
      var arrays = {};
      for (var name in model.fields) {
        var field = model.fields[name];
        arrays[name] = new tdl.primitives.AttribBuffer(
          field.numComponents,
          field.data,
          field.type);
      }
      // Correct for initial placement and orientation of model
      var tmp1 = new Float32Array(16);
      var tmp2 = new Float32Array(16);
      var tmp3 = new Float32Array(16);
      m4.translation(tmp1, [0, -10, 0]);
      m4.axisRotation(tmp2, [1, 0, 0], -Math.PI / 2);
      m4.mul(tmp3, tmp2, tmp1);
      tdl.primitives.reorientPositions(arrays['position'], tmp3);

      // setup program
      var model = new tdl.models.Model(this.program, arrays, textures);
      model.setProgram(this.program);
      model.extents = arrays.position.computeExtents();
      this.models.push(model);
    }
  }
};
