/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Simple immediate mode simulator with hardcoded streams.
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
      gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(program.attribLoc["position"])
      gl.vertexAttribPointer(program.attribLoc["position"], 3, gl.FLOAT, false, 0, 0);
    }
    if (hasNormal) {
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuf)
      gl.bufferData(gl.ARRAY_BUFFER, normalArray, gl.DYNAMIC_DRAW)
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

  this.posnormtriv = function(pos, norm, o1, o2, o3) {
    var c = count * 3
    posArray[c + 0] = pos[o1 + 0]
    posArray[c + 1] = pos[o1 + 1]
    posArray[c + 2] = pos[o1 + 2]
    posArray[c + 3] = pos[o2 + 0]
    posArray[c + 4] = pos[o2 + 1]
    posArray[c + 5] = pos[o2 + 2]
    posArray[c + 6] = pos[o3 + 0]
    posArray[c + 7] = pos[o3 + 1]
    posArray[c + 8] = pos[o3 + 2]
    normalArray[c + 0] = norm[o1 + 0] 
    normalArray[c + 1] = norm[o1 + 1]
    normalArray[c + 2] = norm[o1 + 2]
    normalArray[c + 3] = norm[o2 + 0] 
    normalArray[c + 4] = norm[o2 + 1]
    normalArray[c + 5] = norm[o2 + 2]
    normalArray[c + 6] = norm[o3 + 0] 
    normalArray[c + 7] = norm[o3 + 1]
    normalArray[c + 8] = norm[o3 + 2]
    hasPos = true
    hasNormal = true
    count += 3
    if (count >= maxCount - 3) {
      // TODO: Fix for other things than triangles and lines
      this.draw()
    }
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