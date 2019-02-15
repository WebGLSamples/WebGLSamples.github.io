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

var exposure = 1.0;

var kMaxLocalSigma = 4.0;
var kMaxKernelWidth = 25;

var irradianceMap;
var reflectionMap;

function makeInt(value) {
  return value | 0;
}

function degToRad(value) {
  return value * Math.PI / 180;
}

function getScriptText(id) {
  //tdl.log("loading: ", id);
  var elem = document.getElementById(id);
  if (!elem) {
    throw 'no element: ' + id
  }
  return elem.text;
}

function allocate2DTexture(width, height, format, type) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);
  return texture;
}

function loadShader(shaderSource, shaderType) {
  // Create the shader object
  var shader = gl.createShader(shaderType);
  if (shader == null) {
    throw "Error: unable to create shader";
  }

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    lastError = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw "Error compiling shader '" + shaderSource + "': " + lastError;
  }

  return shader;
}

function createProgramFromTags(
    vertexTagId,
    fragmentTagId) {
  return tdl.programs.loadProgram(
    getScriptText(vertexTagId), getScriptText(fragmentTagId));
}

function keyPressHandler(e) {
  switch (e.which) {
  case 187: // '=', '+'
    if (e.shiftKey) {
      exposure += 1.0;
    } else {
      exposure *= 2;
    }
    break;
  case 189: // '-', '_'
    if (e.shiftKey) {
      exposure -= 1.0;
    } else {
      exposure *= 0.5;
    }
    break;
  }
}

$(document).keydown(keyPressHandler);

function initializeGraphics() {
  canvas = document.getElementById('canvas');
  gl = tdl.webgl.setupWebGL(canvas, { alpha: true });
  if (!gl) {
    return false;
  }
  // gl = tdl.webgl.makeDebugContext(gl);

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
    requestAnimationFrame(render);
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
    var size = Math.sqrt(this.arrayBuffers[0].byteLength / Float32Array.BYTES_PER_ELEMENT / 3);
    var tempArray = new Float32Array(this.arrayBuffers[0].byteLength / Float32Array.BYTES_PER_ELEMENT);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    for (var ii = 0; ii < this.arrayBuffers.length; ++ii) {
      var data = new DataView(this.arrayBuffers[ii]);
      var len = tempArray.length;
      // Incoming data is raw floating point values with little-endian byte ordering.
      for (var jj = 0; jj < len; ++jj) {
        tempArray[jj] = data.getFloat32(jj * Float32Array.BYTES_PER_ELEMENT, true);
      }
      gl.texImage2D(this.faceTargets[ii], 0, gl.RGB, size, size, 0, gl.RGB, gl.FLOAT, tempArray);
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

var HDREffect = function(pipeline, opt_fragmentShader, opt_vertexShader) {
  this.pipeline_ = pipeline;
  this.inputs_ = [];
  this.textureUniformLocations_ = [];
  this.outputTexture_ = null;

  if (opt_fragmentShader) {
    var program = gl.createProgram();
    var vert;
    if (!opt_vertexShader)
      vert = pipeline.vertexShader();
    else
      vert = loadShader(opt_vertexShader, gl.VERTEX_SHADER);
    gl.attachShader(program, vert);
    var frag = loadShader(opt_fragmentShader, gl.FRAGMENT_SHADER);
    gl.attachShader(program, frag);
    pipeline.bindAttribLocations(program);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      var error = gl.getProgramInfoLog(program);
      throw "Error in program linking:" + error;
    }
    gl.deleteShader(vert);
    gl.deleteShader(frag);

    this.program_ = program;
  }
};

HDREffect.prototype.name = function() {
  return "HDREffect";
};

HDREffect.prototype.outputSize = function() {
  // By default, make our output size the same as the first input's size.
  return this.inputs_[0].outputSize();
};

HDREffect.prototype.textureType = function() {
  return gl.FLOAT;
};

HDREffect.prototype.bindProgram = function() {
  gl.useProgram(this.program_);
};

HDREffect.prototype.inputs = function() {
  return this.inputs_;
};

HDREffect.prototype.textureUniformLocations = function() {
  return this.textureUniformLocations_;
};

// Returns null if the effect is supposed to render to the back buffer.
HDREffect.prototype.lockOutputTexture = function() {
  if (!this.outputTexture_) {
    this.outputTexture_ = this.pipeline_.lockTemporaryTexture(this);
  }
  return this.outputTexture_;
};

HDREffect.prototype.unlockOutputTexture = function() {
  this.pipeline_.releaseTemporaryTexture(this, this.outputTexture_);
  this.outputTexture_ = null;
}

HDREffect.prototype.addInput_ = function(effect, uniformName) {
  this.inputs_.push(effect);
  this.textureUniformLocations_.push(gl.getUniformLocation(this.program_, uniformName));
};

//----------------------------------------------------------------------

var TextureInputEffect = function(pipeline, texture) {
  HDREffect.call(this, pipeline, null);
  this.texture_ = texture;
};

tdl.base.inherit(TextureInputEffect, HDREffect);

TextureInputEffect.prototype.name = function() {
  return "TextureInputEffect";
};

TextureInputEffect.prototype.outputSize = function() {
  // Assumes expando properties "width" and "height" on texture object.
  return [ this.texture_.width, this.texture_.height ];
}

TextureInputEffect.prototype.lockOutputTexture = function() {
  return this.texture_;
};

TextureInputEffect.prototype.unlockOutputTexture = function() {
};

//----------------------------------------------------------------------

var ScaleDownEffect = function(pipeline, source) {
  var code = this.generateCode_(this.halveSize_(source.outputSize()));
  HDREffect.call(this, pipeline, code);
  this.addInput_(source, "u_source");
};

tdl.base.inherit(ScaleDownEffect, HDREffect);

ScaleDownEffect.prototype.name = function() {
  return "ScaleDownEffect";
};

ScaleDownEffect.prototype.outputSize = function() {
  var sourceSize = this.inputs()[0].outputSize();
  return this.halveSize_(sourceSize);
};

ScaleDownEffect.prototype.halveSize_ = function(size) {
  return [ makeInt(size[0] / 2), makeInt(size[1] / 2) ];
};

ScaleDownEffect.prototype.generateCode_ = function(textureSize) {
  var code = [];
  var horizTexelOffset = 1.0 / textureSize[0];
  var vertTexelOffset = 1.0 / textureSize[1];
  code.push("precision mediump float;");
  code.push("varying vec2 v_texCoord;");
  code.push("uniform sampler2D u_source;");
  code.push("void main() {");
  code.push("  vec4 c0 = texture2D(u_source, v_texCoord);");
  code.push("  vec4 c1 = texture2D(u_source, v_texCoord + vec2(" + horizTexelOffset + ", 0.0));");
  code.push("  vec4 c2 = texture2D(u_source, v_texCoord + vec2(0.0, " + vertTexelOffset + "));");
  code.push("  vec4 c3 = texture2D(u_source, v_texCoord + vec2(" + horizTexelOffset + ", " + vertTexelOffset + "));");
  code.push("  gl_FragColor = 0.25 * (c0 + c1 + c2 + c3);");
  code.push("}");
  return code.join("\n");
};

//----------------------------------------------------------------------

var DiscardLDREffect = function(pipeline, texture, threshold) {
  HDREffect.call(this, pipeline, getScriptText("discardLDRShader").replace(/THRESHOLD/g, "float(" + threshold + ")"));
  this.addInput_(texture, "u_source");
};

tdl.base.inherit(DiscardLDREffect, HDREffect);

DiscardLDREffect.prototype.name = function() {
  return "DiscardLDREffect";
};

//----------------------------------------------------------------------

var BlurEffect = function(pipeline, source, sigma, halfKernelWidth, vertical) {
  var code = this.generateCode_(sigma, halfKernelWidth, vertical, source.outputSize());
  HDREffect.call(this, pipeline, code);
  this.addInput_(source, "u_source");
};

tdl.base.inherit(BlurEffect, HDREffect);

BlurEffect.prototype.name = function() {
  return "BlurEffect";
};

// We lop off the sqrt(2 * pi) * sigma term, since we're going to normalize
// anyway.
function gauss(x, sigma) {
  return Math.exp(- (x * x) / (2.0 * sigma * sigma));
}

function buildKernel(sigma, kernelSize) {
  var halfWidth = (kernelSize - 1) / 2;
  var values = new Array(kernelSize);
  var sum = 0.0;
  for (i = 0; i < kernelSize; ++i) {
    values[i] = gauss(i - halfWidth, sigma);
    sum += values[i];
  }
  // Now normalize the kernel
  for (i = 0; i < kernelSize; ++i) {
    values[i] /= sum;
  }
  return values;
}

BlurEffect.prototype.generateCode_ = function(sigma, halfKernelWidth, vertical, textureSize) {
  var code = [];
  var horizTexelOffset = 1.0 / textureSize[0];
  var vertTexelOffset = 1.0 / textureSize[1];
  code.push("precision mediump float;");
  code.push("varying vec2 v_texCoord;");
  code.push("uniform sampler2D u_source;");
  code.push("void main() {");
  code.push("  vec4 sum;");
  var kernel = buildKernel(sigma, 2 * halfKernelWidth + 1);
  var first = true;
  for (var ii = -halfKernelWidth; ii <= halfKernelWidth; ++ii) {
    var xOffset, yOffset;
    if (vertical) {
      xOffset = 0;
      yOffset = ii * vertTexelOffset;
    } else {
      xOffset = ii * horizTexelOffset;
      yOffset = 0;
    }
    var operator = "+=";
    if (first) {
      // First sample.
      operator = "=";
      first = false;
    }
    code.push("  sum " + operator + " texture2D(u_source, v_texCoord + vec2(" + xOffset + ", " + yOffset + ")) * " + kernel[ii + halfKernelWidth] + ";");
  }
  code.push("  gl_FragColor = sum;");
  code.push("}");
  return code.join("\n");
};

//----------------------------------------------------------------------

// The direction is specified in radians from the +X axis, as in
// Cartesian coordinates.
var StreakEffect = function(pipeline, source, passNumber, directionInRadians) {
  var code = this.generateCode_(passNumber, directionInRadians, source.outputSize());
  HDREffect.call(this, pipeline, code);
  this.addInput_(source, "u_source");
};

tdl.base.inherit(StreakEffect, HDREffect);

StreakEffect.prototype.name = function() {
  return "StreakEffect";
};

StreakEffect.prototype.generateCode_ = function(passNumber, directionInRadians, textureSize) {
  var code = [];
  var horizTexelSize = 1.0 / textureSize[0];
  var vertTexelSize = 1.0 / textureSize[1];
  var horizStep = Math.cos(directionInRadians) * horizTexelSize;
  var vertStep = Math.sin(directionInRadians) * vertTexelSize;
  var attenuation = 0.9;
  code.push("precision mediump float;");
  code.push("varying vec2 v_texCoord;");
  code.push("uniform sampler2D u_source;");
  code.push("void main() {");
  code.push("  vec4 sum;");
  for (var ii = 0; ii < 4; ++ii) {
    var operator = "+=";
    if (ii == 0) {
      // First sample.
      operator = "=";
    }
    var b = Math.pow(4, passNumber - 1);
    var bxs = b * ii;
    var att = Math.pow(attenuation, bxs);
    // FIXME: add color modulation as suggested by Kawase.
    code.push("  sum " + operator + " texture2D(u_source, v_texCoord + vec2(" + horizStep * bxs + ", " + vertStep * bxs + ")) * float(" + att + ");");
  }
  code.push("  gl_FragColor = sum;");
  code.push("}");
  console.log("Streak code:");
  console.log(code.join("\n"));
  return code.join("\n");
};


//----------------------------------------------------------------------

var SummationEffect = function(pipeline, sources) {
  var code = this.generateCode_(sources.length);
  HDREffect.call(this, pipeline, code);
  for (var ii = 0; ii < sources.length; ++ii) {
    this.addInput_(sources[ii], "u_source" + ii);
  }
};

tdl.base.inherit(SummationEffect, HDREffect);

SummationEffect.prototype.name = function() {
  return "SummationEffect";
};

SummationEffect.prototype.generateCode_ = function(numSources) {
  var code = [];
  code.push("precision mediump float;");
  code.push("varying vec2 v_texCoord;");
  for (var ii = 0; ii < numSources; ++ii) {
    code.push("uniform sampler2D u_source" + ii + ";");
  }
  code.push("void main() {");
  code.push("  vec4 sum;");
  for (var ii = 0; ii < numSources; ++ii) {
    var operator = "+=";
    if (ii == 0) {
      // First sample.
      operator = "=";
    }
    code.push("  sum " + operator + " texture2D(u_source" + ii + ", v_texCoord);");
  }
  code.push("  gl_FragColor = sum;");
  code.push("}");
  return code.join("\n");
};

//----------------------------------------------------------------------

var BicubicUpsamplingEffect = function(pipeline, texture, destinationWidth, destinationHeight) {
  HDREffect.call(this, pipeline, getScriptText("bicubicUpsamplingShader"), getScriptText("bicubicUpsamplingVertexShader"));
  // HDREffect.call(this, pipeline, getScriptText("bicubicUpsamplingShader"));
  this.addInput_(texture, "u_source");
  this.bindProgram();
  var imageIncrementLoc = gl.getUniformLocation(this.program_, "u_imageIncrement");
  var sourceSize = texture.outputSize();
  console.log("Bicubic image increment is [" + 1.0 / sourceSize[0] + ", " + 1.0 / sourceSize[1] + "] (" + sourceSize[0] + " x " + sourceSize[1] + ")");
  gl.uniform2f(imageIncrementLoc, 1.0 / sourceSize[0], 1.0 / sourceSize[1]);
  var coefficientsLoc = gl.getUniformLocation(this.program_, "u_coefficients");
  gl.uniformMatrix4fv(coefficientsLoc, false, [
    0.0 / 18.0,   1.0 / 18.0,  16.0 / 18.0,   1.0 / 18.0,
    0.0 / 18.0,   9.0 / 18.0,   0.0 / 18.0,  -9.0 / 18.0,
   -6.0 / 18.0,  27.0 / 18.0, -36.0 / 18.0,  15.0 / 18.0,
    7.0 / 18.0, -21.0 / 18.0,  21.0 / 18.0,  -7.0 / 18.0
  ]);
  this.outputSize_ = [ destinationWidth, destinationHeight ];
};

tdl.base.inherit(BicubicUpsamplingEffect, HDREffect);

BicubicUpsamplingEffect.prototype.name = function() {
  return "BicubicUpsamplingEffect";
};

BicubicUpsamplingEffect.prototype.outputSize = function() {
  return this.outputSize_;
};


//----------------------------------------------------------------------

var ToneMappingEffect = function(pipeline, mainTexture, gammaSize, gamma, blurTexture, blurAmount) {
  HDREffect.call(this, pipeline, getScriptText("toneMappingShader"));
  this.gammaSize_ = gammaSize;
  this.blurAmount_ = blurAmount;
  this.gammaTexture_ = this.createGammaTexture_(gammaSize, gamma);
  this.exposureLoc_ = gl.getUniformLocation(this.program_, "u_exposure");
  this.blurAmountLoc_ = gl.getUniformLocation(this.program_, "u_blurAmount");
  this.gammaTextureLoc_ = gl.getUniformLocation(this.program_, "u_gammaTexture");
  this.addInput_(mainTexture, "u_source");
  this.addInput_(blurTexture, "u_blurred");
};

tdl.base.inherit(ToneMappingEffect, HDREffect);

ToneMappingEffect.prototype.name = function() {
  return "ToneMappingEffect";
};

ToneMappingEffect.prototype.bindProgram = function() {
  HDREffect.prototype.bindProgram.call(this);
  gl.uniform1f(this.exposureLoc_, exposure);
  gl.uniform1f(this.blurAmountLoc_, this.blurAmount_);
  this.pipeline_.setAuxiliaryTextures(this, [
    { location: this.gammaTextureLoc_,
      texture: this.gammaTexture_ }
  ]);
};

ToneMappingEffect.prototype.lockOutputTexture = function() {
  return null;
};

ToneMappingEffect.prototype.unlockOutputTexture = function() {
};

ToneMappingEffect.prototype.createGammaTexture_ = function(size, gamma) {
  var data = new Float32Array(3 * size);
  for (var ii = 0; ii < size; ++ii) {
    var x = (1.0 * ii) / (size - 1);
    data[3 * ii + 0] = Math.pow(x, gamma);
    data[3 * ii + 1] = 0.0;
    data[3 * ii + 2] = 0.0;
  }
  var texture = allocate2DTexture(size, 1, gl.RGB, gl.FLOAT);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, size, 1, gl.RGB, gl.FLOAT, data);
  return texture;
};

//----------------------------------------------------------------------


var HDRPipeline = function(backbuffer) {
  this.backbuffer_ = backbuffer;
  this.fbo_ = gl.createFramebuffer();

  var arrays = tdl.primitives.createPlane(2, 2, 1, 1);
  delete arrays['normal'];
  delete arrays['texCoord'];
  tdl.primitives.reorient(arrays,
      [1, 0, 0, 0,
       0, 0, 1, 0,
       0,-1, 0, 0,
       0, 0, 0, 1]);
  this.vertexBuffer_ = new tdl.buffers.Buffer(arrays['position'], gl.ARRAY_BUFFER);
  this.indexBuffer_ = new tdl.buffers.Buffer(arrays['indices'], gl.ELEMENT_ARRAY_BUFFER);

  var arrayHash = function arrayHash(arg) {
    return arg[0] * 31 + arg[1];
  }

  var arrayEquals = function arrayEquals(arg1, arg2) {
    return arg1[0] = arg2[0] && arg1[1] == arg2[1];
  }
  this.textureCaches_ = [];
  this.textureCaches_[gl.FLOAT] = new Hashtable(arrayHash, arrayEquals);
  this.textureCaches_[gl.UNSIGNED_BYTE] = new Hashtable(arrayHash, arrayEquals);

  this.outputEffect_ = null;
};

HDRPipeline.prototype.vertexShader = function() {
  return loadShader(getScriptText("hdrPipelineVertexShader"), gl.VERTEX_SHADER);
};

HDRPipeline.prototype.bindAttribLocations = function(program) {
  gl.bindAttribLocation(program, "position", 0);
};

HDRPipeline.prototype.setAuxiliaryTextures = function(effect, texturesAndLocations) {
  var baseTextureUnit = effect.textureUniformLocations().length;
  for (var ii = 0; ii < texturesAndLocations.length; ++ii) {
    gl.activeTexture(gl.TEXTURE0 + baseTextureUnit + ii);
    gl.bindTexture(gl.TEXTURE_2D, texturesAndLocations[ii].texture);
    gl.uniform1i(texturesAndLocations[ii].location, baseTextureUnit + ii);
  }
};

HDRPipeline.prototype.setOutputEffect = function(effect) {
  this.outputEffect_ = effect;
};

HDRPipeline.prototype.outputEffect = function() {
  return this.outputEffect_;
};

HDRPipeline.prototype.run = function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo_);
  var b = this.vertexBuffer_;
  gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer());
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer_.buffer());
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, b.numComponents(), b.type(), b.normalize(), b.stride(), b.offset());
  gl.disable(gl.DEPTH_TEST);

  this.viewport_ = [0, 0];

//  console.log("HDRPipeline");

  if (this.outputEffect_) {
    this.renderEffect_(this.outputEffect_);
  }
};

HDRPipeline.prototype.renderEffect_ = function(effect) {
  var inputs = effect.inputs();

  // Effects that don't have any inputs simply supply an output texture.
  if (!inputs || !inputs.length) {
//    console.log("Executing no-input effect " + effect.name());
    return;
  }

  // Our traversal order guarantees that all the inputs have been produced.
  var inputTextures = new Array(inputs.length);
  for (var ii = 0; ii < inputs.length; ++ii) {
    this.renderEffect_(inputs[ii]);
    inputTextures[ii] = inputs[ii].lockOutputTexture();
  }

//  console.log("Executing effect " + effect.name());

  effect.bindProgram();
  var textureUniformLocations = effect.textureUniformLocations();
  for (var ii = 0; ii < textureUniformLocations.length; ++ii) {
    gl.activeTexture(gl.TEXTURE0 + ii);
    gl.bindTexture(gl.TEXTURE_2D, inputTextures[ii]);
    gl.uniform1i(textureUniformLocations[ii], ii);
  }
  var outputTexture = effect.lockOutputTexture();
  // If the effect doesn't produce an output texture, then we're
  // supposed to render it to the real back buffer.
  if (outputTexture) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, outputTexture, 0);
    this.resetViewport_(outputTexture.width, outputTexture.height);
  } else {
    this.backbuffer_.bind();
  }
  // Draw the single quad.
  gl.drawElements(gl.TRIANGLES, this.indexBuffer_.totalComponents(), gl.UNSIGNED_SHORT, 0);
  // Unlock the input textures.
  for (var ii = 0; ii < inputs.length; ++ii) {
    inputs[ii].unlockOutputTexture();
  }
  // We leave the output's texture locked.
};

HDRPipeline.prototype.lockTemporaryTexture = function(effect) {
  var textureBucket = this.textureBucket_(effect);
  var texture = null;
  if (textureBucket.length > 0) {
    texture = textureBucket.splice(-1, 1)[0];
  }
  if (!texture) {
    var size = effect.outputSize();
    console.log("Allocating texture " + size[0] + " x " + size[1]);
    texture = allocate2DTexture(size[0], size[1], gl.RGBA, effect.textureType());
    texture.width = size[0];
    texture.height = size[1];
  }
  return texture;
};

HDRPipeline.prototype.releaseTemporaryTexture = function(effect, texture) {
  var textureBucket = this.textureBucket_(effect);
  textureBucket.push(texture);
};

HDRPipeline.prototype.resetViewport_ = function(width, height) {
  if (this.viewport_[0] != width || this.viewport_[1] != height) {
    gl.viewport(0, 0, width, height);
    this.viewport_[0] = width;
    this.viewport_[1] = height;
  }
};

HDRPipeline.prototype.textureBucket_ = function(effect) {
  var textureCache = this.textureCaches_[effect.textureType()];
  var size = effect.outputSize();
  // Avoid mutation of outputSize's return value by jshashtable library.
  var textureBucket = textureCache.get([size[0], size[1]]);
  if (!textureBucket) {
    textureBucket = [];
    textureCache.put([size[0], size[1]], textureBucket);
  }
  return textureBucket;
};

//----------------------------------------------------------------------

function buildBloomEffect(pipeline, inputEffect, blurRadius, canvasWidth, canvasHeight) {
  var sigma = blurRadius * 0.333333;
  var scaleFactor = 1;
  while (sigma > kMaxLocalSigma) {
    scaleFactor *= 2;
    sigma *= 0.5;
  }
  var source = inputEffect;
  for (var ii = 1; ii < scaleFactor; ii *= 2) {
    var scaleDown = new ScaleDownEffect(pipeline, source);
    source = scaleDown;
  }
  var halfWidth = Math.floor(sigma * 3);
  var blurX = new BlurEffect(pipeline, source, sigma, halfWidth, false);
  var blurY = new BlurEffect(pipeline, blurX, sigma, halfWidth, true);
  if (scaleFactor > 1) {
    return new BicubicUpsamplingEffect(pipeline, blurY, canvasWidth, canvasHeight);
  } else {
    return blurY;
  }
}

//----------------------------------------------------------------------

function buildStarEffect(pipeline, inputEffect, initialOffsetInRadians, numStreaks, passesPerStreak) {
  var streaks = [];
  var stepInRadians = 2.0 * Math.PI / numStreaks;

  for (var ii = 0; ii < numStreaks; ++ii) {
    var streakSource = inputEffect;
    var radians = ii * stepInRadians + initialOffsetInRadians;
    for (var jj = 0; jj < passesPerStreak; ++jj) {
      var streak = new StreakEffect(pipeline, streakSource, 1 + jj, radians);
      streakSource = streak;
    }
    streaks.push(streakSource);
  }
  return new SummationEffect(pipeline, streaks);
}

var HDRDemo = function() {
  var eyePosition = new Float32Array(3);
  var target = new Float32Array(3);
  var up = new Float32Array([0,1,0]);

  var projection = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);

  var viewProjection = new Float32Array(16);
  var viewDirectionProjectionInverse = new Float32Array(16);
  var worldViewProjection = new Float32Array(16);
  var m4t0 = new Float32Array(16);
  var m4t1 = new Float32Array(16);

  this.models = [];

  //  this.program = createProgramFromTags("diffuseVertexShader", "diffuseFragmentShader");
  // this.program = createProgramFromTags("irradianceVertexShader", "irradianceFragmentShader");
  this.program = createProgramFromTags("reflectionVertexShader", "reflectionFragmentShader");

  this.load("assets/teapot-12kverts/scene.js");

  reflectionMap = new HDRCubeMap(
    ["assets/grace_cross_mmp-posx.bin",
     "assets/grace_cross_mmp-negx.bin",
     "assets/grace_cross_mmp-posy.bin",
     "assets/grace_cross_mmp-negy.bin",
     "assets/grace_cross_mmp-posz.bin",
     "assets/grace_cross_mmp-negz.bin"]);
  irradianceMap = new HDRCubeMap(
    ["assets/grace_cross_irrad_mmp-posx.bin",
     "assets/grace_cross_irrad_mmp-negx.bin",
     "assets/grace_cross_irrad_mmp-posy.bin",
     "assets/grace_cross_irrad_mmp-negy.bin",
     "assets/grace_cross_irrad_mmp-posz.bin",
     "assets/grace_cross_irrad_mmp-negz.bin"]);

  var backbuffer = tdl.framebuffers.getBackBuffer(canvas);

  // Draw the initial version of the scene full-resolution into the
  // normal, LDR, back buffer, so that we get multisampling.
  var ldrSourceTexture = allocate2DTexture(canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE);
  // Hack the texture to have the expando properties the HDRPipeline
  // requires.
  ldrSourceTexture.width = canvas.width;
  ldrSourceTexture.height = canvas.height;
  var ldrSource = new TextureInputEffect(pipeline, ldrSourceTexture);

  // Draw the HDR version of the scene, which is used to compute the
  // glow pass, to a quarter-resolution floating-point back buffer.
  var floatBackbuffer = new tdl.framebuffers.Float32Framebuffer(canvas.width / 2, canvas.height / 2, true);
  // Hack the texture inside this framebuffer to have the expando
  // properties the HDRPipeline requires.
  var floatBackbufferTexture = floatBackbuffer.texture.texture;
  floatBackbufferTexture.width = floatBackbuffer.width;
  floatBackbufferTexture.height = floatBackbuffer.height;

  var skybox = setupSkybox();

  var cameraController = new SphericalCameraController();

  var pipeline = new HDRPipeline(backbuffer);
  var source = new TextureInputEffect(pipeline, floatBackbufferTexture);

  // High-quality bloom effect
  var bloom = buildBloomEffect(pipeline, source, 40, canvas.width, canvas.height);
  var toneMapping = new ToneMappingEffect(pipeline, ldrSource, 1024, 1.0 / 2.2, bloom, 0.5);

  /*
  // Star effect (looks pretty bad right now)
  var discardLDR = new DiscardLDREffect(pipeline, source, 10.0);
  var scaleDown = new ScaleDownEffect(pipeline, discardLDR);
  var streakSource = buildStarEffect(pipeline, scaleDown, degToRad(15), 6, 3);
  var bicubicUpsampling = new BicubicUpsamplingEffect(pipeline, streakSource, canvas.width, canvas.height);
  var toneMapping = new ToneMappingEffect(pipeline, ldrSource, 1024, 1.0 / 2.2, bicubicUpsampling, 0.25);
  */

  pipeline.setOutputEffect(toneMapping);

  this.drawScene_ = function(time) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Bug in Mac OS X graphics drivers? This re-enabling after
    // binding the auxiliary back buffer should not be necessary.
    gl.enable(gl.DEPTH_TEST);

    var eyeRadius = 100.0;
    var eyeHeight = 30.0;
    var eyeClock = time;

    cameraController.setRadius(eyeRadius);
    cameraController.setVerticalRadians(eyeHeight / eyeRadius);
    cameraController.setHorizontalRadians(time);
    cameraController.setTarget(0, 20, 0);

    m4.perspective(projection, math.degToRad(70), aspect, 0.1, 500);
    cameraController.generateLookAt(view);

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
      u_view: view,
      u_world: world,
      // u_lightDir: [-1.0, 1.0, 1.0],
      // u_lightColor: [0.8, 0.7, 0.6, 1.0],
      u_diffuseColor: [ 0.0, 0.0, 0.0 ],
      u_shininess: 0.95,
      u_irradianceMap: irradianceMap,
      u_reflectionMap: reflectionMap,
    };
    var uniformsPer = {};

    for (var ii = 0; ii < this.models.length; ++ii) {
      var model = this.models[ii];
      model.drawPrep(uniformsConst);
      model.draw(uniformsPer);
    }
  };

  this.render = function(time) {
    backbuffer.bind();
    this.drawScene_(time);
    gl.bindTexture(gl.TEXTURE_2D, ldrSourceTexture);
    gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, backbuffer.width, backbuffer.height);

    floatBackbuffer.bind();
    this.drawScene_(time);

    pipeline.run();
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
