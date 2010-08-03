var wtu;
var gl;

var g_fpsTimer = null;  // Object to measure frames per second.
var g_prevFrameTime = 0.0;  // Time at which previous frame was rendered.
var g_drawOnce = false;  // True if the scene should be rendered only once.
var g_intervalId;  // Interval ID for render callback.

function reportNoWebGLSupport() {
  $("#header").after(
      '<div class="ui-state-error ui-widget" style="margin: 1em auto; text-align: center"> \
        Your browser does not support WebGL (or it is disabled). <br> \
        See <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL wiki</a> for details. \
      </div>');
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

  wtu = WebGLTestUtils;
  try {
    gl = wtu.create3DContext(canvas);
  } catch(e) {
    reportNoWebGLSupport();
    return false;
  };

  return true;
};

function setupScene() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};

function render() {
  if (g_drawOnce) {
    clearInterval(g_intervalId);
  };

  // Update FPS.
  var now = (new Date()).getTime() * 0.001;
  var elapsedSec = g_prevFrameTime == 0.0 ? 0.0 : now - g_prevFrameTime;
  g_prevFrameTime = now;
  g_fpsTimer.update(elapsedSec);
  $("#fps").html(g_fpsTimer.averageFPS);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
