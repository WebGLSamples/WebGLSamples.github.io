function createApp(gl, settings) {
  // globals
  let g_maxImages = 0;
  let g_numImages = 0;
  const g_imageSize = 32;

  const vs = `
  uniform vec2 dimensions;
  attribute vec2 position;
  attribute vec2 texCoord;
  attribute vec2 worldPosition;
  attribute vec4 colorMult;
  varying vec2 v_texCoord;
  varying vec4 v_colorMult;
  void main() {
    v_texCoord = texCoord;
    v_colorMult = colorMult;
    gl_Position = vec4(
      (((position + worldPosition) / dimensions) * 2.0 - 1.0) * vec2(1, -1), 0, 1);
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


  function r(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

  const numVertsPerPlane = 4;
  const numPlanesPerBuffer = 65536 / numVertsPerPlane;
  const positions = [];
  const texcoords = [];
  const colors = [];
  const indices = [];
  for (let i = 0; i < numPlanesPerBuffer; ++i) {
    positions.push(0, 0, 32, 0, 0, 32, 32, 32);
    texcoords.push(.0, 0, 1, 0, 0, 1, 1, 1);
    const color = [r(1), r(1), r(1), r(0.5, 1)];
    colors.push(...color, ...color, ...color, ...color);
    const ndx = i * 4;
    indices.push(
        ndx    , ndx + 1, ndx + 2,
        ndx + 2, ndx + 1, ndx + 3);
  }

  function createBuffer(gl, data, Type, target) {
    target = target || gl.ARRAY_BUFFER;
    Type = Type || Float32Array;
    const buf = gl.createBuffer();
    gl.bindBuffer(target, buf);
    gl.bufferData(target, new Type(data), gl.STATIC_DRAW);
    return buf;
  }

  const positionBuffer = createBuffer(gl, positions);
  const texcoordBuffer = createBuffer(gl, texcoords);
  const indexBuffer = createBuffer(gl, indices, Uint16Array, gl.ELEMENT_ARRAY_BUFFER);

  function createInstanceSet(gl) {
    const instances = [];
    for (let i = 0; i < numPlanesPerBuffer; ++i) {
      instances.push({
        x: r(gl.canvas.width),
        y: r(gl.canvas.height),
        xVel: Math.sign(r(-1000, 1000)) * 60,
        yVel: Math.sign(r(-1000, 1000)) * 60,
        firstVertex: i * numVertsPerPlane,
        numVertices: numVertsPerPlane,
      });
    }
    return {
      instances,
      colorBuffer: createBuffer(gl, colors),
      worldPositionBuffer: createBuffer(gl, positions),
      worldPosition: new Float32Array(positions.length),
    };
  }

  const instanceSets = [];

  function addInstanceSet(gl) {
    const instanceSet = createInstanceSet(gl);
    instanceSets.push(instanceSet);
    g_maxImages += instanceSet.instances.length;
  }

  const textures = twgl.createTexture(gl, {
    src: '../google-io/2011/assets/google.png',
  });

  const program = twgl.createProgram(gl, [vs, fs]);
  const positionLoc = gl.getAttribLocation(program, 'position');
  const texcoordLoc = gl.getAttribLocation(program, 'texCoord');
  const worldPositionLoc = gl.getAttribLocation(program, 'worldPosition');
  const colorLoc = gl.getAttribLocation(program, 'colorMult');
  const dimensionsLoc = gl.getUniformLocation(program, 'dimensions');

  function fillRange(dst, offset, count, x, y) {
    for (let i = 0; i < count; ++i) {
      dst[offset++] = x;
      dst[offset++] = y;
    }
  }

  function update(elapsedTime, _numImages) {
    g_numImages = _numImages;

    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    while (g_maxImages < g_numImages) {
      addInstanceSet(gl);
    }

    // --Update Instance Positions---------------------------------------
    if (settings.update) {
      const width = gl.canvas.clientWidth - g_imageSize;
      const height = gl.canvas.clientHeight - g_imageSize;
      const advance = elapsedTime;
      const numSets = Math.ceil(g_numImages / numPlanesPerBuffer);
      for (let setNdx = 0; setNdx < numSets; ++setNdx) {
        const {instances, worldPosition, worldPositionBuffer} = instanceSets[setNdx];
        const numImages = Math.min(numPlanesPerBuffer, g_numImages - setNdx * numPlanesPerBuffer)
        for (let ii = 0; ii < numImages; ++ii) {
          const instance = instances[ii];
          instance.x += advance * instance.xVel;
          instance.y += advance * instance.yVel;
          if (instance.x < 0) {
            instance.x = 0;
            instance.xVel = Math.abs(instance.xVel);
          } else if (instance.x > width) {
            instance.x = width;
            instance.xVel = -Math.abs(instance.xVel);
          }
          if (instance.y < 0) {
            instance.y = 0;
            instance.yVel = Math.abs(instance.yVel);
          } else if (instance.y > height) {
            instance.y = height;
            instance.yVel = -Math.abs(instance.yVel);
          }
          fillRange(worldPosition, instance.firstVertex * 2, instance.numVertices, instance.x, instance.y);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, worldPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, worldPosition, gl.DYNAMIC_DRAW);
      }
    }
  }

  function render() {
    renderBegin();
    renderScene();
    renderEnd();
  }

  function renderBegin() {
    gl.colorMask(true, true, true, true);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.BLEND);

    if (settings.blend) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
  }

  function renderScene() {
    gl.useProgram(program);

    gl.uniform2f(dimensionsLoc, gl.canvas.width, gl.canvas.height);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.enableVertexAttribArray(texcoordLoc);
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    const numSets = Math.ceil(g_numImages / numPlanesPerBuffer);
    for (let setNdx = 0; setNdx < numSets; ++setNdx) {
      const {colorBuffer, worldPositionBuffer} = instanceSets[setNdx];
      const numImages = Math.min(numPlanesPerBuffer, g_numImages - setNdx * numPlanesPerBuffer);

      gl.bindBuffer(gl.ARRAY_BUFFER, worldPositionBuffer);
      gl.enableVertexAttribArray(worldPositionLoc);
      gl.vertexAttribPointer(worldPositionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.enableVertexAttribArray(colorLoc);
      gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

      gl.drawElements(gl.TRIANGLES, numImages * 6, gl.UNSIGNED_SHORT, 0);
    }
  }

  function renderEnd() {
    // nothing to do.
  }

  return {
    update: update,
    render: render,
  };
}

