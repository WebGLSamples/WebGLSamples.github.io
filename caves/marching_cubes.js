
function MarchingCubes(tree) {
  var program = tdl.programs.loadProgramFromScriptTags(
      "marching_cube_vs", "marching_cube_fs");
  var textures = {
      diffuseSamplerWall: tdl.textures.loadTexture('assets/rock-color.png'),
      diffuseSamplerFloor: tdl.textures.loadTexture('assets/sand-color.png')
  };

  var dlist = new DisplayList();

  var worldview = new Float32Array(16);
  var viewproj = new Float32Array(16);
  var worldviewproj = new Float32Array(16);

  // Size of field.
  var size = tree.size;
  var blockSize = tree.blockSize;
  // Deltas
  var delta = 1.0;
  var yd = blockSize;
  var zd = blockSize * blockSize;
  var blockSize3 = blockSize * blockSize * blockSize;

  var modelMap = {};

  var m4 = tdl.fast.matrix4

  // Temp buffers used in polygonize.
  var vlist = new Float32Array(12 * 3);
  var nlist = new Float32Array(12 * 3);
  var normal_cache = new Float32Array(blockSize3 * 3);

  function lerp(a,b,t) { return a + (b - a) * t; }
  function VIntX(q,pout,nout,offset,isol,x,y,z,valp1,valp2) {
    var mu = (isol - valp1) / (valp2 - valp1);
    pout[offset + 0] = x + mu * delta;
    pout[offset + 1] = y;
    pout[offset + 2] = z;
    nout[offset + 0] = lerp(normal_cache[q],   normal_cache[q+3], mu);
    nout[offset + 1] = lerp(normal_cache[q+1], normal_cache[q+4], mu);
    nout[offset + 2] = lerp(normal_cache[q+2], normal_cache[q+5], mu);
  }
  function VIntY(q,pout,nout,offset,isol,x,y,z,valp1,valp2) {
    var mu = (isol - valp1) / (valp2 - valp1);
    pout[offset + 0] = x;
    pout[offset + 1] = y + mu * delta;
    pout[offset + 2] = z;
    var q2 = q + yd*3;
    nout[offset + 0] = lerp(normal_cache[q],   normal_cache[q2], mu);
    nout[offset + 1] = lerp(normal_cache[q+1], normal_cache[q2+1], mu);
    nout[offset + 2] = lerp(normal_cache[q+2], normal_cache[q2+2], mu);
  }
  function VIntZ(q,pout,nout,offset,isol,x,y,z,valp1,valp2) {
    var mu = (isol - valp1) / (valp2 - valp1);
    pout[offset + 0] = x;
    pout[offset + 1] = y;
    pout[offset + 2] = z + mu * delta;
    var q2 = q + zd*3;
    nout[offset + 0] = lerp(normal_cache[q],   normal_cache[q2], mu);
    nout[offset + 1] = lerp(normal_cache[q+1], normal_cache[q2+1], mu);
    nout[offset + 2] = lerp(normal_cache[q+2], normal_cache[q2+2], mu);
  }

  function wipeNormalCache() {
    for (var i = 0; i < blockSize3; i++) {
      normal_cache[i * 3] = 0.0;
    }
  }
  function compNorm(q, field) {
    if (normal_cache[q*3] == 0.0) {
      // If we clip to an edge and only diff across 1 unit, double the value in that axis.
      var dX = 0.5, dY = 0.5, dZ = 0.5;
      normal_cache[q*3    ] = (field[q>=1  ? q-1  : (dX=1, q)] - field[q<blockSize3-1  ? q+1  : (dX=1, q)]) * dX;
      normal_cache[q*3 + 1] = (field[q>=yd ? q-yd : (dY=1, q)] - field[q<blockSize3-yd ? q+yd : (dY=1, q)]) * dY;
      normal_cache[q*3 + 2] = (field[q>=zd ? q-zd : (dZ=1, q)] - field[q<blockSize3-zd ? q+zd : (dZ=1, q)]) * dZ;
    }
  }

  function polygonize(fx, fy, fz, q, isol, field) {
    var cubeindex = 0;
    var field0 = field[q];
    var field1 = field[q+1];
    var field2 = field[q+yd];
    var field3 = field[q+1+yd];
    var field4 = field[q+zd];
    var field5 = field[q+1+zd];
    var field6 = field[q+yd+zd];
    var field7 = field[q+1+yd+zd];

    if (field0 < isol) cubeindex |= 1;
    if (field1 < isol) cubeindex |= 2;
    if (field2 < isol) cubeindex |= 8;
    if (field3 < isol) cubeindex |= 4;
    if (field4 < isol) cubeindex |= 16;
    if (field5 < isol) cubeindex |= 32;
    if (field6 < isol) cubeindex |= 128;
    if (field7 < isol) cubeindex |= 64;

    // If cube is entirely in/out of the surface - bail, nothing to draw.
    var bits = edgeTable[cubeindex];
    if (bits == 0) return;

    var d = delta;
    var fx2 = fx + d, fy2 = fy + d, fz2 = fz + d;

    // Top of the cube
    if (bits & 1)    {compNorm(q, field);       compNorm(q+1, field);       VIntX(q*3,      vlist, nlist, 0, isol, fx,  fy,  fz, field0, field1); }
    if (bits & 2)    {compNorm(q+1, field);     compNorm(q+1+yd, field);    VIntY((q+1)*3,  vlist, nlist, 3, isol, fx2, fy,  fz, field1, field3); }
    if (bits & 4)    {compNorm(q+yd, field);    compNorm(q+1+yd, field);    VIntX((q+yd)*3, vlist, nlist, 6, isol, fx,  fy2, fz, field2, field3); }
    if (bits & 8)    {compNorm(q, field);       compNorm(q+yd, field);      VIntY(q*3,      vlist, nlist, 9, isol, fx,  fy,  fz, field0, field2); }
    // Bottom of the cube
    if (bits & 16)   {compNorm(q+zd, field);    compNorm(q+1+zd, field);    VIntX((q+zd)*3,    vlist, nlist, 12, isol, fx,  fy,  fz2, field4, field5); }
    if (bits & 32)   {compNorm(q+1+zd, field);  compNorm(q+1+yd+zd, field); VIntY((q+1+zd)*3,  vlist, nlist, 15, isol, fx2, fy,  fz2, field5, field7); }
    if (bits & 64)   {compNorm(q+yd+zd, field); compNorm(q+1+yd+zd, field); VIntX((q+yd+zd)*3, vlist, nlist, 18, isol, fx,  fy2, fz2, field6, field7); }
    if (bits & 128)  {compNorm(q+zd, field);    compNorm(q+yd+zd, field);   VIntY((q+zd)*3,    vlist, nlist, 21, isol, fx,  fy,  fz2, field4, field6); }
    // Vertical lines of the cube
    if (bits & 256)  {compNorm(q, field);       compNorm(q+zd, field);      VIntZ(q*3,        vlist, nlist, 24, isol, fx,  fy,  fz, field0, field4); }
    if (bits & 512)  {compNorm(q+1, field);     compNorm(q+1+zd, field);    VIntZ((q+1)*3,    vlist, nlist, 27, isol, fx2, fy,  fz, field1, field5); }
    if (bits & 1024) {compNorm(q+1+yd, field);  compNorm(q+1+yd+zd, field); VIntZ((q+1+yd)*3, vlist, nlist, 30, isol, fx2, fy2, fz, field3, field7); }
    if (bits & 2048) {compNorm(q+yd, field);    compNorm(q+yd+zd, field);   VIntZ((q+yd)*3,   vlist, nlist, 33, isol, fx,  fy2, fz, field2, field6); }

    cubeindex <<= 4;  // Re-purpose cubeindex into an offset into triTable.
    for (var i = 0; triTable[cubeindex + i] != -1; i += 3) {
      dlist.posnormtriv(vlist, nlist,
                        3 * triTable[cubeindex + i + 0],
                        3 * triTable[cubeindex + i + 1],
                        3 * triTable[cubeindex + i + 2]);
    }
  }

  function updateGeometry(isol) {
    function uniform(node) {
      return false;  // Don't subdivide.
    }
    function buffer(node) {
      if (node.dirty) {
        node.dirty = false;
        var minNodeX = node.minX;
        var minNodeY = node.minY;
        var minNodeZ = node.minZ;
        var nodeSize = node.blockSize;
        var array = node.buffer;
        wipeNormalCache();
        dlist.begin();
        for (var z = 0; z < nodeSize - 1; ++z) {
          var z_offset = nodeSize * nodeSize * z;
          var fz = minNodeZ + z;
          for (var y = 0; y < nodeSize - 1; ++y) {
            var y_offset = z_offset + nodeSize * y;
            var fy = minNodeY + y;
            for (var x = 0; x < nodeSize - 1; ++x) {
              var fx = minNodeX + x;
              var q = y_offset + x;
              polygonize(fx, fy, fz, q, isol, array);
            }
          }
        }
        var modelArrays = dlist.end();
        var key = minNodeX + ':' + minNodeY + ':' + minNodeZ;
        modelMap[key] = new tdl.models.Model(program, modelArrays, textures);
      }
    }
    tree.walkTree(uniform, buffer);
  }

  this.update = function() {
    var isol = 0.5;
    updateGeometry(isol);
  }

  this.render = function(framebuffer, world, view, proj) {
    m4.mul(viewproj, view, proj);
    m4.mul(worldview, world, view);
    m4.mul(worldviewproj, world, viewproj);

    var uniformsConst = {
      u_worldviewproj: worldviewproj,
      u_worldview: worldview,
      u_world: world,
      u_lightDir: [-1.0, 1.0, 1.0],
      u_lightColor: [0.8, 0.7, 0.6, 1.0],
      u_ambientUp: [0.1, 0.2, 0.4, 1.0],
      u_ambientDown: [0.3, 0.15, 0.02, 1.0],
    }

    for (var key in modelMap) {
      var model = modelMap[key];
      if (model.buffers.indices.numElements_ > 0) {
        model.drawPrep(uniformsConst);
        model.draw(uniformsConst);
      }
    }
  }
}
