// Utility matching goog.bind, but fault-tolerant
function bind(fn, target) {
  return function() {
    if (fn) {
      return fn.apply(target, arguments);
    }
  };
}

// Makes one class inherit from another.
// @param {!Object} subClass Class that wants to inherit.
// @param {!Object} superClass Class to inherit from.
inherit = function(subClass, superClass) {
  /**
   * TmpClass.
   * @ignore
   * @constructor
   */
  var TmpClass = function() { };
  TmpClass.prototype = superClass.prototype;
  subClass.prototype = new TmpClass();
};

// GL utilities
var GL = {};

// Perform stuff on document load
GL.setup = function() {
  // Normalize requestAnimationFrame (raf) methods
  // Captured here to give the debugger time to hook them
  GL.requestAnimationFrame = bind((window['requestAnimationFrame'] ||
      window['webkitRequestAnimationFrame'] ||
      window['mozRequestAnimationFrame']), window);


  GL.cancelRequestAnimationFrame = bind((window['cancelRequestAnimationFrame'] ||
      window['webkitCancelRequestAnimationFrame'] ||
      window['mozCancelRequestAnimationFrame']), window);
};

// Create and compile a shader
GL.createShader = function(gl, shaderType, source) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.isContextLost() && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    window.console.log('Error compiling shader:\n' + gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};

// Create and compile a program
GL.createProgram = function(gl, vertexSource, fragmentSource, attribBindings) {
  var vertexShader = GL.createShader(gl, gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = GL.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  for (var name in attribBindings) {
    var index = attribBindings[name];
    gl.bindAttribLocation(program, index, name);
  }

  gl.linkProgram(program);
  if (!gl.isContextLost() && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
    window.console.log('Error linking program:\n' + gl.getProgramInfoLog(program));
    return null;
  }

  return program;
};


// Base class for materials
var BaseMaterial = function(gl) {
  this.gl = gl;
};

BaseMaterial.prototype.use = function() {
  var gl = this.gl;

  gl.useProgram(this.program);
};


// Simple solid-color material
var SolidColorMaterial = function(gl) {
  BaseMaterial.call(this, gl);

  this.program = GL.createProgram(gl,
      SolidColorMaterial.vertexShader,
      SolidColorMaterial.fragmentShader, {
        'a_position': 0
      });
  this.program.displayName = 'SolidColorMaterial';
  this.u_matrix = gl.getUniformLocation(this.program, 'u_matrix');
  this.u_color = gl.getUniformLocation(this.program, 'u_color');
};

inherit(SolidColorMaterial, BaseMaterial);

SolidColorMaterial.prototype.setColor = function(r, g, b, a) {
  var gl = this.gl;

  gl.useProgram(this.program);
  gl.uniform4f(this.u_color, r, g, b, a);
};

SolidColorMaterial.vertexShader = [
  'uniform mat4 u_matrix;',
  'attribute vec3 a_position;',
  'void main() {',
  '  gl_Position = u_matrix * vec4(a_position, 1.0);',
  '}'
].join('\n');

SolidColorMaterial.fragmentShader = [
  'precision mediump float;',
  'uniform vec4 u_color;',
  'void main() {',
  '  gl_FragColor = u_color;',
  '}'
].join('\n');



// Simple vertex color material
var VertexColorMaterial = function(gl) {
  BaseMaterial.call(this, gl);

  this.program = GL.createProgram(gl,
      VertexColorMaterial.vertexShader,
      VertexColorMaterial.fragmentShader, {
        'a_position': 0,
        'a_color': 1
      });
  this.program.displayName = 'VertexColorMaterial';
  this.u_matrix = gl.getUniformLocation(this.program, 'u_matrix');
};

inherit(VertexColorMaterial, BaseMaterial);

VertexColorMaterial.vertexShader = [
  'uniform mat4 u_matrix;',
  'attribute vec3 a_position;',
  'attribute vec4 a_color;',
  'varying vec4 v_color;',
  'void main() {',
  '  gl_Position = u_matrix * vec4(a_position, 1.0);',
  '  a_color = a_color;',
  '}'
].join('\n');

VertexColorMaterial.fragmentShader = [
  'precision mediump float;',
  'varying vec4 v_color;',
  'void main() {',
  '  gl_FragColor = a_color;',
  '}'
].join('\n');



// Simple texture material
var TextureMaterial = function(gl) {
  BaseMaterial.call(this, gl);

  this.program = GL.createProgram(gl,
      TextureMaterial.vertexShader,
      TextureMaterial.fragmentShader, {
        'a_position': 0,
        'a_uv': 1
      });
  this.program.displayName = 'TextureMaterial';
  this.u_matrix = gl.getUniformLocation(this.program, 'u_matrix');
  this.u_sampler = gl.getUniformLocation(this.program, 'u_sampler');
};

inherit(TextureMaterial, BaseMaterial);

TextureMaterial.prototype.setSampler = function(sampler) {
  var gl = this.gl;

  gl.useProgram(this.program);
  gl.uniform1i(this.u_sampler, sampler);
};

TextureMaterial.vertexShader = [
  'uniform mat4 u_matrix;',
  'attribute vec3 a_position;',
  'attribute vec2 a_uv;',
  'varying vec2 v_uv;',
  'void main() {',
  '  gl_Position = u_matrix * vec4(a_position, 1.0);',
  '  v_uv = a_uv;',
  '}'
].join('\n');

TextureMaterial.fragmentShader = [
  'precision mediump float;',
  'uniform sampler2D u_sampler;',
  'varying vec2 v_uv;',
  'void main() {',
  '  gl_FragColor = texture2D(u_sampler, v_uv);',
  '}'
].join('\n');



// Simple 3D cube geometry
var SimpleCube = function(gl) {
  this.gl = gl;
  this.initialize();
};

SimpleCube.prototype.initialize = function() {
  var gl = this.gl;

  // Vertex buffer
  this.vertexBuffer = gl.createBuffer();
  this.vertexBuffer.displayName = 'SimpleCube VB';
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, SimpleCube.vertices, gl.STATIC_DRAW);

  // Index buffer
  this.indexBuffer = gl.createBuffer();
  this.indexBuffer.displayName = 'SimpleCube IB';
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, SimpleCube.indices, gl.STATIC_DRAW);
};

SimpleCube.prototype.setState = function() {
  var gl = this.gl;

  // Note: must match indices in e.g. TextureMaterial, above.
  gl.enableVertexAttribArray(0);
  gl.enableVertexAttribArray(1);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  var stride = 5 * Float32Array.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride,
                         3 * Float32Array.BYTES_PER_ELEMENT);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
};

// Draw the cube, resetting all state required
SimpleCube.prototype.draw = function(assumeStateSet) {
  var gl = this.gl;

  if (!assumeStateSet) {
    this.setState();
  }

  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
};

SimpleCube.vertices = new Float32Array([
// X,  Y,  Z, U, V
  -1, -1,  1, 0, 0, // Front face
   1, -1,  1, 1, 0,
   1,  1,  1, 1, 1,
  -1,  1,  1, 0, 1,
  -1, -1, -1, 1, 0, // Back face
  -1,  1, -1, 1, 1,
   1,  1, -1, 0, 1,
   1, -1, -1, 0, 0,
  -1,  1, -1, 0, 1, // Top face
  -1,  1,  1, 0, 0,
   1,  1,  1, 1, 0,
   1,  1, -1, 1, 1,
  -1, -1, -1, 1, 1, // Bottom face
   1, -1, -1, 0, 1,
   1, -1,  1, 0, 0,
  -1, -1,  1, 1, 0,
   1, -1, -1, 1, 0, // Right face
   1,  1, -1, 1, 1,
   1,  1,  1, 0, 1,
   1, -1,  1, 0, 0,
  -1, -1, -1, 0, 0, // Left face
  -1, -1,  1, 1, 0,
  -1,  1,  1, 1, 1,
  -1,  1, -1, 0, 1
]);

SimpleCube.indices = new Uint16Array([
   0,  1,  2,   0,  2,  3, // Front face
   4,  5,  6,   4,  6,  7, // Back face
   8,  9, 10,   8, 10, 11, // Top face
  12, 13, 14,  12, 14, 15, // Bottom face
  16, 17, 18,  16, 18, 19, // Right face
  20, 21, 22,  20, 22, 23  // Left face
]);

// A batch of cubes, placed at the specified 3D positions.
// @param {!Float32Array} positions An array of positions (interpreted as 3-vectors).
var BatchedCubes = function(gl, positions) {
  this.positions = positions;
  SimpleCube.call(this, gl);
};

inherit(BatchedCubes, SimpleCube);

BatchedCubes.prototype.translate = function(input, output, x, y, z) {
  for (var ii = 0; ii < input.length; ii += 5) {
    output[ii] = x + input[ii];
    output[ii + 1] = y + input[ii + 1];
    output[ii + 2] = z + input[ii + 2];
    output[ii + 3] = input[ii + 3];
    output[ii + 4] = input[ii + 4];
  }
};

BatchedCubes.prototype.offset = function(input, output, offset) {
  for (var ii = 0; ii < input.length; ++ii) {
    output[ii] = offset + input[ii];
  }
};

BatchedCubes.prototype.initialize = function() {
  var gl = this.gl;
  var positions = this.positions;
  var numCubes = positions.length / 3;
  this.numCubes = numCubes;

  // Vertex buffer
  this.vertexBuffer = gl.createBuffer();
  this.vertexBuffer.displayName = 'BatchedCubes VB';
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  var tempVertices = new Float32Array(SimpleCube.vertices.length);
  gl.bufferData(gl.ARRAY_BUFFER, numCubes * tempVertices.byteLength, gl.STATIC_DRAW);

  // Index buffer
  this.indexBuffer = gl.createBuffer();
  this.indexBuffer.displayName = 'BatchedCubes IB';
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  var tempIndices = new Uint16Array(SimpleCube.indices.length);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, numCubes * tempIndices.byteLength, gl.STATIC_DRAW);

  for (var ii = 0; ii < numCubes; ++ii) {
    this.translate(SimpleCube.vertices, tempVertices,
                   positions[3 * ii], positions[3 * ii + 1], positions[3 * ii + 2]);
    gl.bufferSubData(gl.ARRAY_BUFFER, ii * tempVertices.byteLength, tempVertices);
    var maximumIndex = 24; // From inspection of SimpleCube.indices array
    this.offset(SimpleCube.indices, tempIndices, ii * maximumIndex);
    gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, ii * tempIndices.byteLength, tempIndices);
  }
};

// Draw all of the cubes, resetting all state required
BatchedCubes.prototype.draw = function(assumeStateSet) {
  var gl = this.gl;

  if (!assumeStateSet) {
    this.setState();
  }

  gl.drawElements(gl.TRIANGLES, 36 * this.numCubes, gl.UNSIGNED_SHORT, 0);
};

// Draw a single cube (0..this.numCubes), resetting all state required
BatchedCubes.prototype.drawOne = function(assumeStateSet, index) {
  var gl = this.gl;

  if (!assumeStateSet) {
    this.setState();
  }

  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, index * SimpleCube.indices.byteLength);
};
