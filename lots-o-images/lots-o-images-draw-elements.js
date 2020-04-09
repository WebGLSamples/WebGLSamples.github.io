function createApp(gl, settings) {
  let g_numImages = 100;
  const g_imageSize = 32;

  const m4 = twgl.m4;
  const vs = `
  uniform vec2 dimensions;
  uniform vec2 translation;
  uniform vec4 colorMult;
  attribute vec2 position;
  attribute vec2 texCoord;
  varying vec2 v_texCoord;
  varying vec4 v_colorMult;
  void main() {
    v_texCoord = texCoord;
    v_colorMult = colorMult;
    gl_Position = vec4(
      (((position + translation) / dimensions) * 2.0 - 1.0) * vec2(1, -1), 0, 1);
  }
  `;
  const fs = `
  precision mediump float;
  varying vec2 v_texCoord;
  varying vec4 v_colorMult;

  uniform sampler2D diffuseSampler;

  void main() {
    gl_FragColor = texture2D(diffuseSampler, v_texCoord) * v_colorMult;
  }
  `;

  const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
    position: { data: [0, 0, 32, 0, 0, 32, 32, 32], numComponents: 2, },
    texCoord: [0, 0, 1, 0, 0, 1, 1, 1],
    indices: [0, 1, 2, 2, 1, 3],
  });
  const texture = twgl.createTexture(gl, {src: '../google-io/2011/assets/google.png'});
  const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

  function r(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

  // -- Setup Instances ----------------------------------
  const instances = [];

  function addInstance() {
    const width = gl.canvas.width - g_imageSize;
    const height = gl.canvas.height - g_imageSize;
    const position = new Float32Array([r(width), r(height)]);
    const colorMult = new Float32Array([r(1), r(1), r(1), r(1)]);
    const vel = new Float32Array([1 * (r(1) < 0.5 ? -60 : 60), 1 * (r(1) < 0.5 ? -60 : 60)]);
    const instance = {
      position: position,
      colorMult: colorMult,
      vel: vel,
      uniforms: {
        translation: position,
        colorMult: colorMult
      },
    };
    instances.push(instance);
  }

  // pre-allocate a bunch of arrays
  const v3t0 = new Float32Array(3);
  const v3t1 = new Float32Array(3);
  const v3t2 = new Float32Array(3);
  const v3t3 = new Float32Array(3);
  const m4t0 = new Float32Array(16);
  const m4t1 = new Float32Array(16);
  const m4t2 = new Float32Array(16);
  const m4t3 = new Float32Array(16);
  const zero4 = new Float32Array(4);
  const one4 = new Float32Array([1,1,1,1]);
  const dimensions = new Float32Array([1, 1]);

  // uniforms.
  const sharedUniforms = {
      dimensions: dimensions,
      diffuseSampler: texture,
  };

  let clock = 0.0;
  function update(elapsedTime, _numImages) {
    g_numImages = _numImages;
    clock += elapsedTime;

    while (instances.length < _numImages) {
      addInstance();
    }

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // --Update Instance Positions---------------------------------------
    if (settings.update) {
      const width = canvas.width - g_imageSize;
      var height = canvas.height - g_imageSize;
      var advance = elapsedTime;
      for (var ii = 0; ii < g_numImages; ++ii) {
        var instance = instances[ii];
        instance.position[0] += advance * instance.vel[0];
        instance.position[1] += advance * instance.vel[1];
        if (instance.position[0] < 0) {
          instance.position[0] = 0;
          instance.vel[0] = -instance.vel[0];
        } else if (instance.position[0] > width) {
          instance.position[0] = width;
          instance.vel[0] = -instance.vel[0];
        }
        if (instance.position[1]  < 0) {
          instance.position[1]  = 0;
          instance.vel[1] = -instance.vel[1];
        } else if (instance.position[1]  > height) {
          instance.position[1]  = height;
          instance.vel[1] = -instance.vel[1];
        }
      }
    }
  }

  function render() {
    renderBegin();
    renderScene();
    renderEnd();
  }

  function renderBegin() {
    // clear the screen.
    gl.colorMask(true, true, true, true);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.BLEND);

    if (settings.blend) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    // Pass in the dimensions of the canvas.
    dimensions[0] = canvas.clientWidth;
    dimensions[1] = canvas.clientHeight;
  }

  function renderScene() {
    // -- Render Models ---------------------------------------
    // We only need to render each model once
    // as they contain all the instances.

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, sharedUniforms);

    for (let ii = 0; ii < g_numImages; ++ii) {
      const instance = instances[ii];
      twgl.setUniforms(programInfo, instance.uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);
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
