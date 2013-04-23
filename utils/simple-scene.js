tdl.require('tdl.buffers');
tdl.require('tdl.fast');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.models');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.textures');

"use strict";

function SimpleScene(canvas, id, undefined){
  var g_eyeSpeed          = 0.5;
  var g_eyeHeight         = 2;
  var g_eyeRadius         = 2;

  var vertexShader = [
    "uniform mat4 worldViewProjection;",
    "uniform vec3 lightWorldPos;",
    "uniform mat4 world;",
    "uniform mat4 viewInverse;",
    "uniform mat4 worldInverseTranspose;",
    "attribute vec4 position;",
    "attribute vec3 normal;",
    "attribute vec2 texCoord;",
    "varying vec4 v_position;",
    "varying vec2 v_texCoord;",
    "varying vec3 v_normal;",
    "varying vec3 v_surfaceToLight;",
    "varying vec3 v_surfaceToView;",
    "void main() {",
    "  v_texCoord = texCoord;",
    "  v_position = (worldViewProjection * position);",
    "  v_normal = (worldInverseTranspose * vec4(normal, 0)).xyz;",
    "  v_surfaceToLight = lightWorldPos - (world * position).xyz;",
    "  v_surfaceToView = (viewInverse[3] - (world * position)).xyz;",
    "  gl_Position = v_position;",
    "}"
  ].join("\n");

  var fragmentShader = [
    "precision mediump float;",
    "uniform vec4 lightColor;",
    "varying vec4 v_position;",
    "varying vec2 v_texCoord;",
    "varying vec3 v_normal;",
    "varying vec3 v_surfaceToLight;",
    "varying vec3 v_surfaceToView;",
    "",
    "uniform sampler2D diffuseSampler;",
    "uniform vec4 specular;",
    "uniform sampler2D bumpSampler;",
    "uniform float shininess;",
    "uniform float specularFactor;",
    "",
    "vec4 lit(float l ,float h, float m) {",
    "  return vec4(1.0,",
    "              max(l, 0.0),",
    "              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,",
    "              1.0);",
    "}",
    "void main() {",
    "  vec4 diffuse = texture2D(diffuseSampler, v_texCoord);",
    "  vec3 normal = normalize(v_normal);",
    "  vec3 surfaceToLight = normalize(v_surfaceToLight);",
    "  vec3 surfaceToView = normalize(v_surfaceToView);",
    "  vec3 halfVector = normalize(surfaceToLight + surfaceToView);",
    "  vec4 litR = lit(dot(normal, surfaceToLight),",
    "                    dot(normal, halfVector), shininess);",
    "  gl_FragColor = vec4((",
    "  lightColor * (diffuse * litR.y",
    "                        + specular * litR.z * specularFactor)).rgb,",
    "      diffuse.a);",
    "}"
  ].join("\n");

  function setupModel() {
    var textures = {
      diffuseSampler: tdl.textures.loadTexture([255, 255, 255, 255])};
    var program = tdl.programs.loadProgram(
        vertexShader,
        fragmentShader);
    var arrays = tdl.primitives.createSphere(0.4, 10, 12);
    return new tdl.models.Model(program, arrays, textures);
  }

  var localGL = tdl.webgl.setupWebGL(canvas);
  if (!localGL) {
    return;
  }
  localGL.id = id;
  var model = setupModel();

  var math = tdl.math;
  var fast = tdl.fast;
  var clock = 0.0;
  var fpsElem = document.getElementById("fps");

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
  var modelConst = {
    viewInverse: viewInverse,
    lightWorldPos: lightWorldPos,
    specular: one4,
    shininess: 50,
    specularFactor: 0.2};
  var modelPer = {
    lightColor: new Float32Array([0,0,0,1]),
    world: world,
    worldViewProjection: worldViewProjection,
    worldInverse: worldInverse,
    worldInverseTranspose: worldInverseTranspose};

  var frameCount = 0;

  function render(elapsedTime) {
    tdl.webgl.makeCurrent(localGL);
    ++frameCount;

    clock += elapsedTime;
    eyePosition[0] = Math.sin(clock * g_eyeSpeed) * g_eyeRadius;
    eyePosition[1] = g_eyeHeight;
    eyePosition[2] = Math.cos(clock * g_eyeSpeed) * g_eyeRadius;

    gl.colorMask(true, true, true, true);
    gl.depthMask(true);
    gl.clearColor(0,0,0,0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    fast.matrix4.perspective(
        projection,
        math.degToRad(60),
        canvas.clientWidth / canvas.clientHeight,
        1,
        5000);
    fast.matrix4.lookAt(
        view,
        eyePosition,
        target,
        up);
    fast.matrix4.mul(viewProjection, view, projection);
    fast.matrix4.inverse(viewInverse, view);
    fast.matrix4.inverse(viewProjectionInverse, viewProjection);

    fast.matrix4.getAxis(v3t0, viewInverse, 0); // x
    fast.matrix4.getAxis(v3t1, viewInverse, 1); // y;
    fast.matrix4.getAxis(v3t2, viewInverse, 2); // z;
    fast.mulScalarVector(v3t0, 10, v3t0);
    fast.mulScalarVector(v3t1, 10, v3t1);
    fast.mulScalarVector(v3t2, 10, v3t2);
    fast.addVector(lightWorldPos, eyePosition, v3t0);
    fast.addVector(lightWorldPos, lightWorldPos, v3t1);
    fast.addVector(lightWorldPos, lightWorldPos, v3t2);

//      view: view,
//      projection: projection,
//      viewProjection: viewProjection,

    model.drawPrep(modelConst);
    var across = 2;
    var lightColor = modelPer.lightColor;
    var half = (across - 1) * 0.5;
    for (var xx = 0; xx < across; ++xx) {
      for (var yy = 0; yy < across; ++yy) {
        for (var zz = 0; zz < across; ++zz) {
          lightColor[0] = xx / (across - 1);
          lightColor[1] = yy / (across - 1);
          lightColor[2] = zz / (across - 1);
          var scale = (xx + yy + zz) % 4 / 4 + 0.5;
          fast.matrix4.scaling(m4t0, [scale, scale, scale]);
          fast.matrix4.translation(m4t1, [xx - half, yy - half, zz - half]);
          fast.matrix4.mul(world, m4t0, m4t1);
          fast.matrix4.mul(worldViewProjection, world, viewProjection);
          fast.matrix4.inverse(worldInverse, world);
          fast.matrix4.transpose(worldInverseTranspose, worldInverse);
          model.draw(modelPer);
        }
      }
    }

    // Set the alpha to 255.
    gl.colorMask(false, false, false, true);
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  this.render = render;
};

