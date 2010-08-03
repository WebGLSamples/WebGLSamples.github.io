var wtu;
var gl;

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

  try {
    gl = wtu.create3DContext(canvas);
  } catch(e) {
    reportNoWebGLSupport();
    return false;
  };

  // Initialize GL state.
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  return true;
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

$(document).ready(function(){
  wtu = WebGLTestUtils;

  setupUI();
  if (setupWebGL()) {
    render();
  }
});
