// Simple immediate mode simulator with hardcoded streams.
//
// TODO: cleanup and move into tdl
//
// First call begin(). Pass in the primitive type and your shader program.
// For each vertex, specify the components you need, then call next().
// End, causing a draw, by calling end(). Do not call draw() directly.
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
//
// Will not behave correctly if you overflow it with strips. However it's okay
// to overflow it with triangles, lines or points - it'll just flush its buffer
// by drawing whatever it has.

function ImmSim() {
  var posBuf    = gl.createBuffer()
  var normalBuf = gl.createBuffer()
  var uvBuf     = gl.createBuffer()
  var colorBuf  = gl.createBuffer()

  var count = 0, prim = 0, primsize = 0
  var hasPos, hasNormal, hasUV, hasColor

  // TODO: Find the fastest size for this buffer.
  var maxCount = 4096
  var program = null
  
  var posArray    = new Float32Array(maxCount * 3)
  var normalArray = new Float32Array(maxCount * 3)
  var uvArray     = new Float32Array(maxCount * 2)
  var colorArray  = new Float32Array(maxCount * 4)

  this.begin = function(primitive, p_program) {
    prim      = primitive
    switch (prim) {
      case gl.TRIANGLES:
        primsize = 3
        break;
      case gl.LINES:
        primsize = 2
        break;
      case gl.POINTS:
        primsize = 1
        break;
      default:
        primsize = 1
        break;
    }
    program   = p_program
    count     = 0
    hasPos    = false
    hasNormal = false
    hasUV     = false
    hasColor  = false
  }

  this.end = function() {
    if (count == 0)
      return;
    for (var i = count * 3; i < posArray.length; i++)
      posArray[i] = 0.0;
    this.draw()
  }

  // This should not be called from outside the class.
  this.draw = function() {
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
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray, 0, count * 2), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(program.attribLoc["texCoord"])
      gl.vertexAttribPointer(program.attribLoc["texCoord"], 2, gl.FLOAT, false, 0, 0);
    }
    if (hasColor) {
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray, 0, count * 4), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(program.attribLoc["color"])
      gl.vertexAttribPointer(program.attribLoc["color"], 4, gl.FLOAT, false, 0, 0);
    }
    gl.drawArrays(prim, 0, count)
    count = 0
  }

  this.pos = function(x, y, z) {
    posArray[count * 3 + 0] = x
    posArray[count * 3 + 1] = y
    posArray[count * 3 + 2] = z
    hasPos = true
  }

  this.posv = function(vec) {
    posArray[count * 3 + 0] = vec[0]
    posArray[count * 3 + 1] = vec[1]
    posArray[count * 3 + 2] = vec[2]
    hasPos = true
  }

  this.posvoff = function(vec, offset) {
    posArray[count * 3 + 0] = vec[0 + offset]
    posArray[count * 3 + 1] = vec[1 + offset]
    posArray[count * 3 + 2] = vec[2 + offset]
    hasPos = true
  }

  this.posnormvoff = function(pos, norm, offset) {
    posArray[count * 3 + 0] = pos[0 + offset]
    posArray[count * 3 + 1] = pos[1 + offset]
    posArray[count * 3 + 2] = pos[2 + offset]
    normalArray[count * 3 + 0] = norm[0 + offset] 
    normalArray[count * 3 + 1] = norm[1 + offset]
    normalArray[count * 3 + 2] = norm[2 + offset]
    hasPos = true
    hasNormal = true
  }

  this.normal = function(x, y, z) {
    normalArray[count * 3]     = x
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

  this.uvv = function(vec) {
    uvArray[count * 2]     = vec[0] 
    uvArray[count * 2 + 1] = vec[1]
    hasUV = true
  }
  
  this.uv = function(u, v) {
    uvArray[count * 2]     = u
    uvArray[count * 2 + 1] = v
    hasUV = true
  }

  this.color = function(r, g, b, a) {
    colorArray[count * 4 + 0] = r
    colorArray[count * 4 + 1] = g
    colorArray[count * 4 + 2] = b
    colorArray[count * 4 + 2] = a
    hasColor = true
  }

  this.colorv = function(vec) {
    colorArray[count * 4 + 0] = vec[0]
    colorArray[count * 4 + 1] = vec[1]
    colorArray[count * 4 + 2] = vec[2]
    colorArray[count * 4 + 3] = vec[3]
    hasColor = true
  }

  // You must have started the batch with begin(gl.TRIANGLES) to use this.
  // The quad spans X and Y, Z is constant.
  this.quad2d = function(x, y, w, h, z) {
    this.pos(x, y, z);         this.uv(0, 0); this.next();
    this.pos(x + w, y, z);     this.uv(1, 0); this.next();
    this.pos(x + w, y + h, z); this.uv(1, 1); this.next();
    this.pos(x, y, z);         this.uv(0, 0); this.next();
    this.pos(x + w, y + h, z); this.uv(1, 1); this.next();
    this.pos(x, y + h, z);     this.uv(0, 1); this.next();
  }

  this.quad2dcolor = function(x, y, w, h, z, r, g, b, a) {
    this.pos(x, y, z);         this.uv(0, 0); this.color(r,g,b,a); this.next();
    this.pos(x + w, y, z);     this.uv(1, 0); this.color(r,g,b,a); this.next();
    this.pos(x + w, y + h, z); this.uv(1, 1); this.color(r,g,b,a); this.next();
    this.pos(x, y, z);         this.uv(0, 0); this.color(r,g,b,a); this.next();
    this.pos(x + w, y + h, z); this.uv(1, 1); this.color(r,g,b,a); this.next();
    this.pos(x, y + h, z);     this.uv(0, 1); this.color(r,g,b,a); this.next();
  }

  this.next = function() {
    count++;
    // keep some safety margin before we flush.
    if (count >= maxCount - 3) {
      // TODO: Fix for other things than triangles and lines
      if ((count % primsize) == 0) {
        this.draw()
      }
    }
  }
}