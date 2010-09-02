// Copyright 2010 Google Inc. All Rights Reserved.
//
// TODO: This code uses a lot of undefined global variables so you currently
// can't create more than one instance. Should fix that.

function initWebGL(canvas) {
  try {
    gl = tdl.webgl.setupWebGL("viewContainer", canvas);
  }
  catch(e) {
  }
  if (!gl) {
    return null
  }
  return gl
}

function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }
  var theSource = "";
  var currentChild = shaderScript.firstChild;
  while (currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }
  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }
  gl.shaderSource(shader, theSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shader (" + shaderScript.type
          + "): " + gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function MorphDisplay(id) {
  var morphPos = 0.5
  var w = $(id).width()
  var h = $(id).height()

  var gl = null

  var morphShaderProgram = null

  var leftImage = null
  var rightImage = null

  var leftTexture = null
  var rightTexture = null

  var vertexCount = 0
  var leftFace = null
  var rightFace = null

  var leftPosBuffer = null
  var rightPosBuffer = null
  var leftTCBuffer = null
  var rightTCBuffer = null

  var leftCrop = null
  var rightCrop = null

  this.sliderValue = function(value) {
    morphPos = value
    this.draw()
  }

  function initShaders() {
    morphShaderProgram = tdl.shader.loadFromScriptNodes(gl, "shader-vs", "shader-fs")
  }

  function texCoordsFromVertices(verts, image, crop) {
    var xscale = crop.w / image.width
    var yscale = crop.h / image.height
    var xoffset = crop.x / image.width
    var yoffset = crop.y / image.height

    var count = verts.length / 3
    var tc = new Array(count * 2)
    for (var i = 0; i < count; i++) {
      tc[i * 2] = xoffset + xscale * (verts[i * 3] + 1) / 2
      tc[i * 2 + 1] = yoffset + yscale * (1.0 - (((verts[i * 3 + 1] + 1) / 2)))
    }
    return tc
  }

  function verticesFromFace(face) {
    // First just copy over all the normal verts
    var count = face.length
    verts = new Array(count * 3 + 12)
    for (var i = 0; i < count; i++) {
      verts[i * 3 + 0] = face[i].x * 2 - 1
      verts[i * 3 + 1] = (1 - face[i].y) * 2 - 1
      verts[i * 3 + 2] = 0
    }
    // Then add the four corners at the end.
    verts[face.length * 3 + 0] = -1
    verts[face.length * 3 + 1] = 1
    verts[face.length * 3 + 2] = 0
    verts[face.length * 3 + 3] = 1
    verts[face.length * 3 + 4] = 1
    verts[face.length * 3 + 5] = 0
    verts[face.length * 3 + 6] = 1
    verts[face.length * 3 + 7] = -1
    verts[face.length * 3 + 8] = 0
    verts[face.length * 3 + 9] = -1
    verts[face.length * 3 + 10] = -1
    verts[face.length * 3 + 11] = 0
    return verts
  }

  function initBuffers() {
    if (!leftFace || !rightFace)
      return
    var vertices1 = verticesFromFace(leftFace)
    var vertices2 = verticesFromFace(rightFace)
    var indices = [
      0, 11, 1,
      0, 12, 11,
      0, 7, 12,
      1, 11, 2,
      2, 11, 3,
      3, 11, 9,
      3, 9, 4,
      9, 10, 4,
      10, 5, 4,
      10, 6, 5,
      10, 12, 6,
      12, 6, 7,
      8, 9, 10,
      11, 8, 9,
      12, 11, 8,
      12, 10, 8,
      13, 0, 1,
      13, 1, 2,
      16, 13, 2,
      16, 2, 3,
      16, 3, 4,
      16, 4, 15,
      15, 4, 5,
      15, 5, 6,
      14, 15, 6,
      14, 6, 7,
      14, 7, 0,
      13, 14, 0
    ]

    vertexCount = indices.length

    var texcoords1 = texCoordsFromVertices(vertices1, leftImage, leftCrop);
    var texcoords2 = texCoordsFromVertices(vertices2, rightImage, rightCrop);

    leftPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, leftPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW);
    rightPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rightPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);
    leftTCBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, leftTCBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords1), gl.STATIC_DRAW)
    rightTCBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, rightTCBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords2), gl.STATIC_DRAW)
    indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new
        Uint16Array(indices), gl.STATIC_DRAW)
  }

  function deinitBuffers() {
    if (!leftPosBuffer) {
      return
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    gl.deleteBuffer(leftPosBuffer)
    gl.deleteBuffer(rightPosBuffer)
    gl.deleteBuffer(leftTCBuffer)
    gl.deleteBuffer(rightTCBuffer)
    gl.deleteBuffer(indexBuffer)
  }

  function changed() {
    deinitBuffers()
    initBuffers()
    draw()
  }

  function setImageToTexture(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    // choose a filter that doesn't require mips for NPOT
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // must use clamp to edge for NPOT
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  function initTextures() {
    leftTexture = gl.createTexture()
    rightTexture = gl.createTexture()
  }

  this.setLeftFace = function(face, image, crop) {
    leftFace = face
    leftCrop = crop
    leftImage = image
    setImageToTexture(image, leftTexture)
    changed()
  }

  this.setRightFace = function(face, image, crop) {
    rightFace = face
    rightCrop = crop
    rightImage = image
    setImageToTexture(image, rightTexture)
    changed()
  }

  function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    if (!leftFace || !rightFace || !leftPosBuffer) {
      return
    }
    morphShaderProgram.bind()
    var perspMatrix = new Float32Array(16)
    var transMatrix = new Float32Array(16)
    tdl.fast.matrix4.perspective(perspMatrix, 45, w/h, 0.1, 100.0)
    tdl.fast.matrix4.translation(transMatrix, [0.0, 0.0, -2.25])
    gl.uniformMatrix4fv(morphShaderProgram.uPMatrixLoc, false, perspMatrix)
    gl.uniformMatrix4fv(morphShaderProgram.uMVMatrixLoc, false, transMatrix);

    gl.enableVertexAttribArray(morphShaderProgram.aVPos1Loc);
    gl.enableVertexAttribArray(morphShaderProgram.aVPos2Loc);
    gl.enableVertexAttribArray(morphShaderProgram.aTC1Loc);
    gl.enableVertexAttribArray(morphShaderProgram.aTC2Loc);

    gl.bindBuffer(gl.ARRAY_BUFFER, leftPosBuffer);
    gl.vertexAttribPointer(morphShaderProgram.aVPos1Loc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, rightPosBuffer);
    gl.vertexAttribPointer(morphShaderProgram.aVPos2Loc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, leftTCBuffer);
    gl.vertexAttribPointer(morphShaderProgram.aTC1Loc, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, rightTCBuffer);
    gl.vertexAttribPointer(morphShaderProgram.aTC2Loc, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, leftTexture)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, rightTexture)

    gl.uniform1i(morphShaderProgram.uSampler1Loc, 0);
    gl.uniform1i(morphShaderProgram.uSampler2Loc, 1);
    gl.uniform1f(morphShaderProgram.fadeLoc, morphPos);
    gl.uniform1f(morphShaderProgram.morphLoc, morphPos);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0);
  }
  this.draw = draw

  function autoDraw() {
    changed()
    setTimeout(autoDraw, 500)
  }

  gl = initWebGL($(id)[0])
  if (!gl) {
    return
  }

  initShaders()
  initBuffers()
  initTextures()

  gl.clearColor(0, 0, 0, 1)
  gl.clearDepth(1.0)
  this.draw()
  var md = this
  setTimeout(autoDraw, 500)
}

