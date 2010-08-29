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

function DisplayList() {
  var posBuf    = gl.createBuffer();
  var normalBuf = gl.createBuffer();
  var uvBuf     = gl.createBuffer();
  var colorBuf  = gl.createBuffer();

  var hasPos, hasNormal, hasUV, hasColor;

  var posArray    = new Growable('Float32Array');
  var normalArray = new Growable('Float32Array');
  var uvArray     = new Growable('Float32Array');
  var colorArray  = new Growable('Float32Array');

  this.begin = function() {
    hasPos    = false
    hasNormal = false
    hasUV     = false
    hasColor  = false
    posArray.clear();
    normalArray.clear();
    uvArray.clear();
    colorArray.clear();
  }

  this.end = function() {
    var arrays = {};
    if (hasPos) {
      arrays['position'] = posArray.getAttribBuffer(3);
    }
    if (hasNormal) {
      arrays['normal'] = normalArray.getAttribBuffer(3);
    }
    if (hasUV) {
      arrays['texCoord'] = uvArray.getAttribBuffer(2);
    }
    if (hasColor) {
      arrays['color'] = colorArray.getAttribBuffer(4);
    }
    
    var count = posArray.getLength() / 3;
    var indices = new tdl.primitives.AttribBuffer(1, count, 'Uint16Array');
    for (var i = 0; i < count; ++i) {
      indices.push([i]);
    }
    arrays['indices'] = indices;
    
    return arrays;
  }

  this.pos = function(x, y, z) {
    posArray.push(x);
    posArray.push(y);
    posArray.push(z);
    hasPos = true;
  }

  this.posv = function(vec) {
    posArray.pushArray(vec);
    hasPos = true;
  }

  this.posvoff = function(vec, offset) {
    posArray.push(vec[0 + offset]);
    posArray.push(vec[1 + offset]);
    posArray.push(vec[2 + offset]);
    hasPos = true;
  }

  this.posnormvoff = function(pos, norm, offset) {
    posArray.push(pos[0 + offset]);
    posArray.push(pos[1 + offset]);
    posArray.push(pos[2 + offset]);
    normalArray.push(norm[0 + offset]);
    normalArray.push(norm[1 + offset]);
    normalArray.push(norm[2 + offset]);
    hasPos = true;
    hasNormal = true;
  }

  this.posnormtriv = function(pos, norm, o1, o2, o3) {
    this.posnormvoff(pos, norm, o1);
    this.posnormvoff(pos, norm, o2);
    this.posnormvoff(pos, norm, o3);
  }
  
  this.postriv = function(pos, o1, o2, o3) {
    this.posvoff(pos, o1);
    this.posvoff(pos, o2);
    this.posvoff(pos, o3);
  }
  
  this.normal = function(x, y, z) {
    normalArray.push(x);
    normalArray.push(y);
    normalArray.push(z);
    hasNormal = true;
  }

  this.normalv = function(vec) {
    normalArray.pushArray(vec);
    hasNormal = true;
  }

  this.uvv = function(vec) {
    uvArray.pushArray(vec);
    hasUV = true;
  }
  
  this.uv = function(u, v) {
    uvArray.push(u);
    uvArray.push(v);
    hasUV = true;
  }

  this.color = function(r, g, b, a) {
    colorArray.push(r);
    colorArray.push(g);
    colorArray.push(b);
    colorArray.push(a);
    hasColor = true;
  }

  this.colorv = function(vec) {
    colorArray.pushArray(vec);
    hasColor = true;
  }

  // The quad spans X and Y, Z is constant.
  this.quad2d = function(x, y, w, h, z) {
    this.pos(x, y, z);         this.uv(0, 0);
    this.pos(x + w, y, z);     this.uv(1, 0);
    this.pos(x + w, y + h, z); this.uv(1, 1);
    this.pos(x, y, z);         this.uv(0, 0);
    this.pos(x + w, y + h, z); this.uv(1, 1);
    this.pos(x, y + h, z);     this.uv(0, 1);
  }

  this.quad2dcolor = function(x, y, w, h, z, r, g, b, a) {
    this.pos(x, y, z);         this.uv(0, 0); this.color(r,g,b,a);
    this.pos(x + w, y, z);     this.uv(1, 0); this.color(r,g,b,a);
    this.pos(x + w, y + h, z); this.uv(1, 1); this.color(r,g,b,a);
    this.pos(x, y, z);         this.uv(0, 0); this.color(r,g,b,a);
    this.pos(x + w, y + h, z); this.uv(1, 1); this.color(r,g,b,a);
    this.pos(x, y + h, z);     this.uv(0, 1); this.color(r,g,b,a);
  }
}