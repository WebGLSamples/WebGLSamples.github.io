// Marching cubes in Javascript
//
// Extremely badly and suboptimally implemented.
//
// Yes, this is madness. But this should test those JS engines!
//
// Converted from the standard C implementation that's all over the web.

function MarchingCubesEffect() {
  var arrays = tdl.primitives.createCube(1.0)
  var program = createProgramFromTags("spinning_cube_vs", "spinning_cube_fs")
  var textures = []

  var proj = new Float32Array(16)
  var view = new Float32Array(16)
  var world = new Float32Array(16)

  var viewproj = new Float32Array(16)
  var worldviewproj = new Float32Array(16)

  var model = new tdl.models.Model(program, arrays, textures);

  var eyePosition = new Float32Array([0, 0, 2])
  var target = new Float32Array([0.3, 0, 0])

  // Marching cubes data
  var size = 32
  // Deltas
  var delta = 2.0 / size
  var yd = size
  var zd = size * size

  var field = new Float32Array(size * size * size)
  var normal_cache = new Float32Array(size * size * size * 3)

  var m4 = tdl.fast.matrix4

  // Temp buffer used in polygonize
  var vertlist = new Float32Array(12 * 3)

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.lookAt(view, eyePosition, target, up);

  function VertexInterpX(pout,offset,isolevel,p1,p2,valp1,valp2) {
    var mu = (isolevel - valp1) / (valp2 - valp1);
    pout[offset + 0] = p1[0] + mu * delta;
    pout[offset + 1] = p1[1];
    pout[offset + 2] = p1[2];
  }
  function VertexInterpY(pout,offset,isolevel,p1,p2,valp1,valp2) {
    var mu = (isolevel - valp1) / (valp2 - valp1);
    pout[offset + 0] = p1[0];
    pout[offset + 1] = p1[1] + mu * delta;
    pout[offset + 2] = p1[2];
  }
  function VertexInterpZ(pout,offset,isolevel,p1,p2,valp1,valp2) {
    var mu = (isolevel - valp1) / (valp2 - valp1);
    pout[offset + 0] = p1[0];
    pout[offset + 1] = p1[1];
    pout[offset + 2] = p1[2] + mu * delta
  }

  // Returns total number of triangles. Fills triangles.
  // TODO: Optimize to death, add normal calculations so that we can run
  // proper lighting shaders on the results. The grid parameter should be
  // implicit and removed.
  function polygonize(fx, fy, fz, q, isolevel) {
    var cubeindex = 0;
    if (field[q] < isolevel)         cubeindex |= 1;
    if (field[q+1] < isolevel)       cubeindex |= 2;
    if (field[q+1+yd] < isolevel)    cubeindex |= 4;
    if (field[q+yd] < isolevel)      cubeindex |= 8;
    if (field[q+zd] < isolevel)      cubeindex |= 16;
    if (field[q+1+zd] < isolevel)    cubeindex |= 32;
    if (field[q+1+yd+zd] < isolevel) cubeindex |= 64;
    if (field[q+yd+zd] < isolevel)   cubeindex |= 128;

    // If cube is entirely in/out of the surface - bail, nothing to draw.
    if (cubeindex == 0 || cubeindex == 255) return 0;
    var bits = edgeTable[cubeindex]
    var d = 2.0 / size;
    var fx2 = fx + d, fy2 = fy + d, fz2 = fz + d
    var grid = { p: [ [fx,  fy,  fz  ],
                      [fx2, fy,  fz  ],
                      [fx2, fy2, fz  ],
                      [fx,  fy2, fz  ],
                      [fx,  fy,  fz2],
                      [fx2, fy,  fz2],
                      [fx2, fy2, fz2],
                      [fx,  fy2, fz2]
                    ] }

    // Here we should compute normals for the eight corners of the cube.
    // They'll then get interpolated in VertexInterpX/Y/Z.
    // Or we could actually pass two pairs of normals per vertex and interpolate
    // in the vertex shader - more data but less computation in Javascript.
    //
    // Find the vertices where the surface intersects the cube. We could
    // reorder these to make it easier to share vertices between subsequenc
    // cubes.

    // Top of the cube
    if (bits & 1)    VertexInterpX(vertlist, 0, isolevel, grid.p[0], grid.p[1], field[q],    field[q+1]);
    if (bits & 2)    VertexInterpY(vertlist, 3, isolevel, grid.p[1], grid.p[2], field[q+1],  field[q+1+yd]);
    if (bits & 4)    VertexInterpX(vertlist, 6, isolevel, grid.p[3], grid.p[2], field[q+yd], field[q+1+yd]);
    if (bits & 8)    VertexInterpY(vertlist, 9, isolevel, grid.p[0], grid.p[3], field[q],    field[q+yd]);
    // Bottom of the cube
    if (bits & 16)   VertexInterpX(vertlist, 12, isolevel, grid.p[4], grid.p[5], field[q+zd],    field[q+1+zd]);
    if (bits & 32)   VertexInterpY(vertlist, 15, isolevel, grid.p[5], grid.p[6], field[q+1+zd],  field[q+1+yd+zd]);
    if (bits & 64)   VertexInterpX(vertlist, 18, isolevel, grid.p[7], grid.p[6], field[q+yd+zd], field[q+1+yd+zd]);
    if (bits & 128)  VertexInterpY(vertlist, 21, isolevel, grid.p[4], grid.p[7], field[q+zd],    field[q+yd+zd]);
    // Vertical lines of the cube
    if (bits & 256)  VertexInterpZ(vertlist, 24, isolevel, grid.p[0], grid.p[4], field[q],      field[q+zd]);
    if (bits & 512)  VertexInterpZ(vertlist, 27, isolevel, grid.p[1], grid.p[5], field[q+1],    field[q+1+zd]);
    if (bits & 1024) VertexInterpZ(vertlist, 30, isolevel, grid.p[2], grid.p[6], field[q+1+yd], field[q+1+yd+zd]);
    if (bits & 2048) VertexInterpZ(vertlist, 33, isolevel, grid.p[3], grid.p[7], field[q+yd],   field[q+yd+zd]);

    cubeindex <<= 4  // Re-purpose cubeindex into an offset into triTable.
    var numtris = 0, i = 0;
    while (triTable[cubeindex + i] != -1) {
      imm.posvoff(vertlist, 3 * triTable[cubeindex + i + 0]); imm.next()
      imm.posvoff(vertlist, 3 * triTable[cubeindex + i + 1]); imm.next()
      imm.posvoff(vertlist, 3 * triTable[cubeindex + i + 2]); imm.next()
      i += 3;
      numtris++;
    }
    return numtris;
  }
  
  var firstDraw = true

  this.render = function(framebuffer, time, global_time) {
    m4.rotationY(world, time * 0.2)
    m4.translate(world, [0, 0*Math.sin(time)*0.5, 0])
    m4.mul(viewproj, view, proj)
    m4.mul(worldviewproj, world, viewproj)

    gl.clearColor(0.2,0.2,0.2,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    var uniformsConst = {
      u_worldviewproj: worldviewproj
    }
    var uniformsPer = {
      u_worldviewproj: worldviewproj
    }

    model.drawPrep(uniformsConst)

    if (firstDraw) {
      for (var i = 0; i < size * size * size; i++) {
        field[i] = 0.0
      }

      // Fill the field with some metaballs. This is actually fairly fast but
      // can be greatly optimized using balls that fade out to zero, and
      // bounding boxes.
      
      for (var i = 0; i < 5; i++) {
        var ballx = Math.sin(i + time * (1 + 0.1 * i)) * 0.5;
        var bally = Math.cos(i + time * (1.2 + 0.14 * i)) * 0.5;
        var ballz = Math.cos(i + time * (0.9 + 0.23 * i)) * 0.5;

        for (var z = 0; z < size; z++) {
          var z_offset = size * size * z;
          var fz = (z - (size/2)) / (size/2) - ballz
          for (var y = 0; y < size; y++) {
            var y_offset = z_offset + size * y;
            var fy = (y - (size/2)) / (size/2) - bally
            for (var x = 0; x < size; x++) {
              var fx = (x - (size/2)) / (size/2) - ballx
              var val = 1.0/(0.01 + fx * fx + fy * fy + fz * fz) * 0.01
              field[y_offset + x] += val
            }
          }
        }
      }
    }

    var isolevel = 0.2

    imm.begin(gl.TRIANGLES, program)

    // Triangulate. This is the really slow part and it's done in a
    // hopelessly suboptimal way currently.
    var size2 = size / 2.0
    for (var z = 0; z < size - 1; z++) {
      var z_offset = size * size * z;
      var fz = (z - size2) / size2 //+ 1
      for (var y = 0; y < size - 1; y++) {
        var y_offset = z_offset + size * y;
        var fy = (y - size2) / size2 //+ 1
        for (var x = 0; x < size - 1; x++) {
          var fx = (x - size2) / size2 //+ 1
          var q = y_offset + x
          polygonize(fx, fy, fz, q, isolevel)
        }
      }
    }
    imm.end()
  }
}
