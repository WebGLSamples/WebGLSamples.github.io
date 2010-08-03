var wu;
var gl;

var g_fpsTimer = null;  // Object to measure frames per second.
var g_prevFrameTime = 0.0;  // Time at which previous frame was rendered.
var g_totalElapsedSec = 0.0;  // Total elapsed time since the beginning of program.
var g_drawOnce = false;  // True if the scene should be rendered only once.
var g_intervalId = 0;  // Interval ID for render callback.

var g_uniforms = null;
var g_scene = null;

function reportNoWebGLSupport() {
  $("#header").after(
      '<div class="ui-state-error ui-widget" style="margin: 1em auto; text-align: center"> \
        Your browser does not support WebGL (or it is disabled). <br> \
        See <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL wiki</a> for details. \
      </div>');
};

function reportFPS(fps) {
  $("#fps").html(fps)
};

function setupUI() {
  $("#settings").accordion({header: 'h4'});
  $("#count-slider").slider({
      value: 10,
      min: 10,
      max: 100,
      step: 10,
      slide: function(event, ui) {
        $("#count").html(ui.value);
      }
  });
  $("#count").html($("#count-slider").slider("value"));
};

function setupWebGL() {
  var canvas = document.getElementById("canvas");
  if (!canvas) {
    reportNoWebGLSupport();
    return false;
  };

  wu = WebGLTestUtils;
  try {
    gl = wu.create3DContext(canvas);
  } catch(e) {
    reportNoWebGLSupport();
    return false;
  };

  return true;
};

function createProgramFromTags(vertexTagId, fragmentTagId) {
  return tdl.programs.loadProgram(
      document.getElementById(vertexTagId).text,
      document.getElementById(fragmentTagId).text);
}

SkyBox = function() {
  this.positions_ = new tdl.primitives.AttribBuffer(3, 4);

  var indices = new tdl.primitives.AttribBuffer(3, 2, 'Uint16Array');
  indices.push([0, 1, 2]);
  indices.push([0, 2, 3]);
  this.indices_ = indices;

  // View vector projected on the ground plane.
  this.projViewVec_ = new Float32Array(4);
  // A position on the horizon in clip space.
  this.horizonPos_ = new Float32Array(4);
  this.horizonY_ = 0.0;
};

SkyBox.prototype.update = function(uniforms) {
  var eyeProj = new Float32Array(4);
  tdl.fast.mulVectorMatrix4(
      eyeProj,
      uniforms.eye, uniforms.view);

  tdl.fast.subVector(
      this.projViewVec_,
      uniforms.target, uniforms.eye);
  this.projViewVec_[2] = 0.0;
  this.projViewVec_[3] = 0.0;

  tdl.fast.mulVectorMatrix4(
      this.horizonPos_,
      this.projViewVec_, uniforms.viewProjection);
  this.horizonY_ = this.horizonPos_[1] / this.horizonPos_[3];
};

SkyBox.prototype.drawSky = function(uniforms) {
};

SkyBox.prototype.drawGround = function(uniforms) {
};

function setupGround() {
  var program = createProgramFromTags('groundVShader', 'groundFShader');
  var arrays = tdl.primitives.createPlane(20, 20, 1, 1);
  delete arrays['normal'];
  delete arrays['texCoord'];

  return {
    model: new tdl.models.Model(program, arrays, null),
    uniformsConst: {worldViewProjection: g_uniforms.worldViewProjection},
    uniformsPer: {}
  };
};

function setupScene() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  g_uniforms = {
    eye: new Float32Array(4),
    target: new Float32Array(4),
    up: new Float32Array([0, 0, 1]),

    world: new Float32Array(16),
    view: new Float32Array(16),
    projection: new Float32Array(16),
    viewProjection: new Float32Array(16),
    worldViewProjection: new Float32Array(16)
  };
  g_scene = {
    ground: setupGround(),
    skybox: new SkyBox()
  };
};

function render() {
  if (g_drawOnce) {
    clearInterval(g_intervalId);
  };

  // Update FPS.
  var now = (new Date()).getTime() * 0.001;
  var elapsedSec = g_prevFrameTime == 0.0 ? 0.0 : now - g_prevFrameTime;
  g_totalElapsedSec += elapsedSec;
  g_prevFrameTime = now;
  g_fpsTimer.update(elapsedSec);
  reportFPS(g_fpsTimer.averageFPS);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Update camera.
  var eyeSpeed = 0.1;
  var eyeHeight = 20;
  var eyeRadius = 60;
  g_uniforms.eye[0] = Math.sin(g_totalElapsedSec * eyeSpeed) * eyeRadius;
  g_uniforms.eye[1] = Math.cos(g_totalElapsedSec * eyeSpeed) * eyeRadius;
  g_uniforms.eye[2] = eyeHeight;
  var canvas = $("#canvas");
  tdl.fast.matrix4.lookAt(
      g_uniforms.view,
      g_uniforms.eye, g_uniforms.target, g_uniforms.up);
  tdl.fast.matrix4.perspective(
      g_uniforms.projection,
      tdl.math.degToRad(30.0),
      canvas.width() / canvas.height(),
      1,
      5000);
  tdl.fast.matrix4.mul(
      g_uniforms.viewProjection,
      g_uniforms.view, g_uniforms.projection);

  // Draw ground.
  tdl.fast.matrix4.identity(g_uniforms.world);
  tdl.fast.matrix4.mul(
      g_uniforms.worldViewProjection,
      g_uniforms.world, g_uniforms.viewProjection);
  var ground = g_scene.ground;
  ground.model.drawPrep(ground.uniformsConst);
  ground.model.draw(ground.uniformsPer);

  // Draw sky.
  var skybox = g_scene.skybox;
  skybox.update(g_uniforms);
  skybox.drawSky(g_uniforms);
};

$(document).ready(function(){
  setupUI();
  if (!setupWebGL()) {
    return;
  };

  setupScene();
  g_fpsTimer = new tdl.fps.FPSTimer();
  g_intervalId = setInterval(render, 1000.0 / 70.0);
});
