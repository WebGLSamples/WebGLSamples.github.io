// Simple immediate mode simulator with hardcoded streams.
//
// Specify the components you need, then call nextVertex()
//
// TODO: cleanup and move into tdl
//
// Do as much as you can within each begin/end, because stopping and
// starting over is EXPENSIVE.
//
// To be used for wacky text rendering and other minor graphics and animations,
// where vertex shader animation is just too much work. Could easily be extended
// into a sprite engine.
//
// Currently only supports positions, normals and texture coordinates,
// since those are what I need. Other or generic streams can be added as needed.

function ImmSim() {
  var posBuf    = gl.createBuffer()
  var normalBuf = gl.createBuffer()
  var uvBuf     = gl.createBuffer()

  var count = 0, prim = 0
  var hasPos, hasNormal, hasUV

  var maxCount = 1024

  var posArray    = new Float32Array(maxCount * 3)
  var normalArray = new Float32Array(maxCount * 3)
  var uvArray     = new Float32Array(maxCount * 2)

  this.begin = function(primitive) {
    prim      = primitive
    count     = 0
    hasPos    = false
    hasNormal = false
    hasUV     = false
  }

  this.end = function(program) {
    if (count == 0)
      return;
    this.draw(program)
  }

  // This should not be called from outside the class.
  this.draw = function(program) {
    // First, copy our logged data into stream buffers.
    if (hasPos) {
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posArray, 0, count * 3), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(program.attribLoc["position"])
      gl.vertexAttribPointer(program.attribLoc["position"], 3, gl.FLOAT, false, 0, 0);
    }
    if (hasNormal) {
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalArray, 0, count * 3), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(program.attribLoc["normal"])
      gl.vertexAttribPointer(program.attribLoc["normal"], 3, gl.FLOAT, false, 0, 0);
    }
    if (hasUV) {
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray, 0, count * 2), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(program.attribLoc["texCoord"])
      gl.vertexAttribPointer(program.attribLoc["texCoord"], 2, gl.FLOAT, false, 0, 0);
    }
    gl.drawArrays(prim, 0, count)
    count = 0
  }

  this.pos = function(x, y, z) {
    posArray[count * 3] = x
    posArray[count * 3 + 1] = y
    posArray[count * 3 + 2] = z
    hasPos = true
  }

  this.posv = function(vec) {
    posArray[count * 3]     = vec[0]
    posArray[count * 3 + 1] = vec[1]
    posArray[count * 3 + 2] = vec[2]
    hasPos = true
  }

  this.normal = function(x, y, z) {
    normalArray[count * 3] = x
    normalArray[count * 3 + 1] = y
    normalArray[count * 3 + 2] = z
    hasNormal = true
  }

  this.normalv = function(vec) {
    normalArray[count * 3]     = vec[0]
    normalArray[count * 3 + 1] = vec[1]
    normalArray[count * 3 + 2] = vec[2]
    hasNormal = true
  }

  this.uv = function(u, v) {
    uvArray[count * 2] = u
    uvArray[count * 2 + 1] = v
    hasUV = true
  }

  this.uvv = function(vec) {
    uvArray[count * 2] = vec[0] 
    uvArray[count * 2 + 1] = vec[1]
    hasUV = true
  }

  this.next = function() {
    count++;
    // keep some safety margin before we flush.
    if (count >= maxCount - 3) {
      this.draw()
    }
  }
}