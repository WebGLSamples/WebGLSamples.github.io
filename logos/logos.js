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
        See <a href="http://get.webgl.org">http://get.webgl.org</a> for details. \
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

  try {
    gl = tdl.webgl.create3DContext(canvas);
  } catch(e) {
  };

  if (!gl) {
    reportNoWebGLSupport();
    return false;
  }

  return true;
};

function setupSkybox(uniforms) {
  var program = tdl.programs.loadProgramFromScriptTags(
      'skyboxVShader','skyboxFShader');
  // Create a quad covering far plane in clip space.
  var positions = new tdl.primitives.AttribBuffer(3, 4);
  var zFar = 0.99;  // Small offset to avoid clipping.
  positions.push([-1.0, -1.0, zFar]);
  positions.push([ 1.0, -1.0, zFar]);
  positions.push([ 1.0,  1.0, zFar]);
  positions.push([-1.0,  1.0, zFar]);
  var indices = new tdl.primitives.AttribBuffer(3, 2, 'Uint16Array');
  indices.push([0, 1, 2]);
  indices.push([0, 2, 3]);
  var arrays = {
    position: positions,
    indices: indices
  };
  // Create a cubemap texture.
  var textures = {
    skybox: tdl.textures.loadTexture([
        'assets/skybox_positive_x.png',
        'assets/skybox_negative_x.png',
        'assets/skybox_positive_y.png',
        'assets/skybox_negative_y.png',
        'assets/skybox_positive_z.png',
        'assets/skybox_negative_z.png'])
  };
  return {
      model: new tdl.models.Model(program, arrays, textures),
      uniformsConst: {
          viewProjectionInverse: uniforms.viewProjectionInverse
      },
      uniformsPer: {}
  };
}

function setupGround(uniforms) {
  var program = tdl.programs.loadProgramFromScriptTags(
      'groundVShader', 'groundFShader');
  var arrays = tdl.primitives.createPlane(30, 30, 1, 1);
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
    eye: new Float32Array(3),
    target: new Float32Array([0, 1, 0]),
    up: new Float32Array([0, 1, 0]),

    world: new Float32Array(16),
    view: new Float32Array(16),
    projection: new Float32Array(16),
    viewProjection: new Float32Array(16),
    viewProjectionInverse: new Float32Array(16),
    worldViewProjection: new Float32Array(16)
  };
  g_scene = {
    ground: setupGround(g_uniforms),
    skybox: setupSkybox(g_uniforms)
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

  gl.clear(gl.DEPTH_BUFFER_BIT);

  // Update camera.
  var eyeSpeed = 0.1;
  var eyeHeight = 10;
  var eyeRadius = 60;
  g_uniforms.eye[0] = Math.sin(g_totalElapsedSec * eyeSpeed) * eyeRadius;
  g_uniforms.eye[1] = eyeHeight;
  g_uniforms.eye[2] = Math.cos(g_totalElapsedSec * eyeSpeed) * eyeRadius;
  var canvas = $("#canvas");
  tdl.fast.matrix4.lookAt(
      g_uniforms.view,
      g_uniforms.eye, g_uniforms.target, g_uniforms.up);
  tdl.fast.matrix4.perspective(
      g_uniforms.projection,
      tdl.math.degToRad(30.0),
      canvas.width() / canvas.height(),
      10,
      500);
  tdl.fast.matrix4.mul(
      g_uniforms.viewProjection,
      g_uniforms.view, g_uniforms.projection);
  tdl.fast.matrix4.inverse(
      g_uniforms.viewProjectionInverse,
      g_uniforms.viewProjection);

  // Draw ground.
  tdl.fast.matrix4.identity(g_uniforms.world);
  tdl.fast.matrix4.mul(
      g_uniforms.worldViewProjection,
      g_uniforms.world, g_uniforms.viewProjection);
  var ground = g_scene.ground;
  ground.model.drawPrep(ground.uniformsConst);
  ground.model.draw(ground.uniformsPer);

  // Draw skybox.
  var skybox = g_scene.skybox;
  skybox.model.drawPrep(skybox.uniformsConst);
  skybox.model.draw(skybox.uniformsPer);
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
