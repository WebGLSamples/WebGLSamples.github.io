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
  var yd = size
  var zd = size * size

  var field = new Float32Array(size * size * size)
  var normal_cache = new Float32Array(size * size * size * 3)

  var m4 = tdl.fast.matrix4

  // Temp buffer used in polygonize
  var vertlist = new Float32Array(12 * 3)

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.lookAt(view, eyePosition, target, up);

  function VertexInterp(pout,offset,isolevel,p1,p2,valp1,valp2) {
    // These three lines aren't strictly necessary for most input.
    // TODO: Disable them when done optimizing everything else.
    // if (Math.abs(isolevel - valp1) < 0.00001) return p1
    // if (Math.abs(isolevel - valp2) < 0.00001) return p2
    // if (Math.abs(valp1 - valp2)    < 0.00001) return p1
    var mu = (isolevel - valp1) / (valp2 - valp1);
    pout[offset + 0] = p1[0] + mu * (p2[0] - p1[0]);
    pout[offset + 1] = p1[1] + mu * (p2[1] - p1[1]);
    pout[offset + 2] = p1[2] + mu * (p2[2] - p1[2]);
  }

  // Returns total number of triangles. Fills triangles.
  // TODO: Optimize to death, add normal calculations so that we can run
  // proper lighting shaders on the results. The grid parameter should be
  // implicit and removed.
  function polygonize(grid, isolevel) {
    var cubeindex = 0;
    if (grid.val[0] < isolevel) cubeindex |= 1;
    if (grid.val[1] < isolevel) cubeindex |= 2;
    if (grid.val[2] < isolevel) cubeindex |= 4;
    if (grid.val[3] < isolevel) cubeindex |= 8;
    if (grid.val[4] < isolevel) cubeindex |= 16;
    if (grid.val[5] < isolevel) cubeindex |= 32;
    if (grid.val[6] < isolevel) cubeindex |= 64;
    if (grid.val[7] < isolevel) cubeindex |= 128;

    var bits = edgeTable[cubeindex]
    // If cube is entirely in/out of the surface - bail, nothing to draw.
    if (bits == 0) return 0;

    // Here we should compute normals for the eight corners of the cube.
    // They'll then get interpolated in VertexInterp or whatever replaces it.
    // Or we could actually pass two pairs of normals per vertex and interpolate
    // in the vertex shader - more data but less computation in Javascript.
    //
    // Find the vertices where the surface intersects the cube. We could
    // reorder these to make it easier to share vertices between subsequenc
    // cubes.

    // Top of the cube
    if (bits & 1)    VertexInterp(vertlist, 0, isolevel, grid.p[0], grid.p[1], grid.val[0], grid.val[1]);
    if (bits & 2)    VertexInterp(vertlist, 3, isolevel, grid.p[1], grid.p[2], grid.val[1], grid.val[2]);
    if (bits & 4)    VertexInterp(vertlist, 6, isolevel, grid.p[2], grid.p[3], grid.val[2], grid.val[3]);
    if (bits & 8)    VertexInterp(vertlist, 9, isolevel, grid.p[3], grid.p[0], grid.val[3], grid.val[0]);
    // Bottom of the cube
    if (bits & 16)   VertexInterp(vertlist, 12, isolevel, grid.p[4], grid.p[5], grid.val[4], grid.val[5]);
    if (bits & 32)   VertexInterp(vertlist, 15, isolevel, grid.p[5], grid.p[6], grid.val[5], grid.val[6]);
    if (bits & 64)   VertexInterp(vertlist, 18, isolevel, grid.p[6], grid.p[7], grid.val[6], grid.val[7]);
    if (bits & 128)  VertexInterp(vertlist, 21, isolevel, grid.p[7], grid.p[4], grid.val[7], grid.val[4]);
    // Vertical lines of the cube
    if (bits & 256)  VertexInterp(vertlist, 24, isolevel, grid.p[0], grid.p[4], grid.val[0], grid.val[4]);
    if (bits & 512)  VertexInterp(vertlist, 27, isolevel, grid.p[1], grid.p[5], grid.val[1], grid.val[5]);
    if (bits & 1024) VertexInterp(vertlist, 30, isolevel, grid.p[2], grid.p[6], grid.val[2], grid.val[6]);
    if (bits & 2048) VertexInterp(vertlist, 33, isolevel, grid.p[3], grid.p[7], grid.val[3], grid.val[7]);

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
    m4.rotationY(world, time)
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
    var d = 1.0 / (size / 2);

    // Triangulate. This is the really slow part and it's done in a
    // hopelessly suboptimal way currently.
    for (var z = 0; z < size - 1; z++) {
      var z_offset = size * size * z;
      var fz = (z - (size/2)) / (size/2) //+ 1
      for (var y = 0; y < size - 1; y++) {
        var y_offset = z_offset + size * y;
        var fy = (y - (size/2)) / (size/2) //+ 1
        for (var x = 0; x < size - 1; x++) {
          var fx = (x - (size/2)) / (size/2) //+ 1
          var q = y_offset + x
          var grid = { p: [ [fx,   fy,   fz  ],
                            [fx+d, fy,   fz  ],
                            [fx+d, fy+d, fz  ],
                            [fx,   fy+d, fz  ],
                            [fx,   fy,   fz+d],
                            [fx+d, fy,   fz+d],
                            [fx+d, fy+d, fz+d],
                            [fx,   fy+d, fz+d]
                          ],
                   val: [ field[q          ],
                          field[q+1        ],
                          field[q+1+ yd    ],
                          field[q+   yd    ],
                          field[q+       zd],
                          field[q+1+     zd],
                          field[q+1+ yd+ zd],
                          field[q+   yd+ zd]
                        ]
                 }
          polygonize(grid, isolevel)
        }
      }
    }
    imm.end()
  }
}
