

function rand01() { return Math.random(); }
function randm11() { return Math.random() * 2 - 1; }
function rand_range(min, max) { return min + Math.random() * (max - min); }

function decayTo(x, target, dt) { return target + (x - target) / (1 + dt); }

function CavesMain() {
  var proj = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);

  var keyDown = [], mouseDown = [];

  var m4 = tdl.fast.matrix4;

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.identity(world);

  var size = 96;
  var tree = new field.FieldNode(0, 0, 0, size, 24+1);

  var cubes = new MarchingCubes(tree);

  var eyePos = new Float32Array([size/2,size/2,size*1.1]);
  var eyePosVel = new Float32Array([0, 0, 0]);
  var eyeRotTheta = 0, eyeRotPhi = 2.6;

  var forward = new Float32Array([20, 0, 0]);
  var left = new Float32Array(3);
  var up = new Float32Array([0, 0, 1]);

  var time = 0;

  var centerX = canvas.clientWidth / 2;
  var centerY = canvas.clientHeight / 2;
  var mouseX = centerX, mouseY = centerY;
  var laserDist = 0, nextCutDist = 0;

  function addBall(ballx, bally, ballz, radius, modifyEdges) {
    var min_x, max_x, min_y, max_y, min_z, max_z;
    if (modifyEdges) {
      min_x = Math.max(Math.floor(ballx - radius), 0);
      max_x = Math.min(Math.ceil(ballx + radius), size + 1);
      min_y = Math.max(Math.floor(bally - radius), 0);
      max_y = Math.min(Math.ceil(bally + radius), size + 1);
      min_z = Math.max(Math.floor(ballz - radius), 0);
      max_z = Math.min(Math.ceil(ballz + radius), size + 1);
    } else {
      min_x = Math.max(Math.floor(ballx - radius), 1);
      max_x = Math.min(Math.ceil(ballx + radius), size);
      min_y = Math.max(Math.floor(bally - radius), 1);
      max_y = Math.min(Math.ceil(bally + radius), size);
      min_z = Math.max(Math.floor(ballz - radius), 1);
      max_z = Math.min(Math.ceil(ballz + radius), size);
    }
    function uniform(node) {
      // TODO(libra): intersect sphere with cube to avoid unnecessary splits.
      // TODO(libra): just set value if this is an interior cube
      return true;  // 'Please subdivide this node.'
    }
    function buffer(node) {
      var minNodeX = node.minX;
      var minNodeY = node.minY;
      var minNodeZ = node.minZ;
      var nodeSize = node.blockSize;
      var array = node.buffer;
      // Get mins and maxes in node space.
      var min2_x = Math.max(min_x - minNodeX, 0);
      var max2_x = Math.min(max_x - minNodeX, nodeSize);
      var min2_y = Math.max(min_y - minNodeY, 0);
      var max2_y = Math.min(max_y - minNodeY, nodeSize);
      var min2_z = Math.max(min_z - minNodeZ, 0);
      var max2_z = Math.min(max_z - minNodeZ, nodeSize);
      for (var z = min2_z; z < max2_z; ++z) {
        var z_offset = nodeSize * nodeSize * z;
        var fz = minNodeZ + z - ballz;
        var fz2 = fz * fz;
        for (var y = min2_y; y < max2_y; ++y) {
          var y_offset = z_offset + nodeSize * y;
          var fy = minNodeY + y - bally;
          var fy2 = fy * fy;
          for (var x = min2_x; x < max2_x; ++x) {
            var fx = minNodeX + x - ballx;
            var fx2 = fx * fx;
            var dist = Math.sqrt(fx2 + fy2 + fz2);
            var val = Math.pow(dist / radius, 2.0);
            array[y_offset + x] *= Math.max(Math.min(val, 1.0), 0.0);
          }
        }
      }
      if (min2_x < max2_x && min2_y < max2_y && min2_z < max2_z) {
        node.dirty = true;
      }
    }
    tree.walkSubTree(min_x, max_x, min_y, max_y, min_z, max_z, uniform, buffer);
    //tree.walkTree(uniform, buffer);
  }

  function addFloor(min_z) {
    function uniform(node) {
      return (node.minZ + node.size >= min_z);
    }
    function buffer(node) {
      var minNodeZ = node.minZ;
      var nodeSize = node.blockSize;
      var array = node.buffer;
      // Get mins and maxes in node space.
      var min2_x = 0;
      var max2_x = nodeSize;
      var min2_y = 0;
      var max2_y = nodeSize;
      var min2_z = Math.max(min_z - minNodeZ, 0);
      var max2_z = nodeSize;
      for (var z = min2_z; z < max2_z; ++z) {
        var z_offset = nodeSize * nodeSize * z;
        for (var y = min2_y; y < max2_y; ++y) {
          var y_offset = z_offset + nodeSize * y;
          for (var x = min2_x; x < max2_x; ++x) {
            array[y_offset + x] = 0;
          }
        }
      }
      if (min2_z < max2_z) {
        node.dirty = true;
      }
    }
    tree.walkSubTree(0, size, 0, size, min_z, size, uniform, buffer);
  }

  addFloor(size - 0);
  var radius = 25.0;
  // Cut top surface.
  for (var i = 0; i < 100; ++i) {
    var ballx = rand01() * (size + radius * 4) - radius * 2;
    var bally = rand01() * (size + radius * 4) - radius * 2;
    var ballz = size + rand_range(0.3, 0.8) * radius;
    addBall(ballx, bally, ballz, radius, true);
  }
  // Add some random deep balls to find while digging!
  radius = 7.0;
  for (var i = 0; i < 25; ++i) {
    var ballx = randm11() * size/3 + size/2;
    var bally = randm11() * size/3 + size/2;
    var ballz = randm11() * size*0.1 + size*0.8;
    addBall(ballx, bally, ballz, radius);
  }
  // Calculate initial geometry.
  cubes.update();

  this.tick = function(time_delta) {
    time_delta = Math.min(time_delta, 0.1);
    time += time_delta;
    var relX = mouseX - centerX;
    var relY = mouseY - centerY;
    var dist = Math.sqrt(relX * relX + relY * relY);
    if (dist > 0) {
      var turn_rate = Math.pow(Math.min(dist, 200.0) / 200.0, 3) * (time_delta * 3);
      var multiplier = turn_rate / dist;
      relX *= multiplier;
      relY *= multiplier;
      
      eyeRotTheta = (eyeRotTheta - relX) % (Math.PI * 2);
      eyeRotPhi = Math.min(Math.max(eyeRotPhi + relY, 0.1), Math.PI-0.1);
    }
    forward[0] = Math.cos(eyeRotTheta) * Math.sin(eyeRotPhi);
    forward[1] = Math.sin(eyeRotTheta) * Math.sin(eyeRotPhi);
    forward[2] = Math.cos(eyeRotPhi);
    left[0] = -Math.sin(eyeRotTheta);
    left[1] = Math.cos(eyeRotTheta);

    var movement = 10;
    var decayRate = 20 * time_delta;
    var moveForward = 0, moveLeft = 0, moveUp = 0;
    if (keyDown[16]) {  // Shift
      movement = 20;
    }
    if (keyDown[87] || keyDown[38]) {  // W || up
      moveForward = movement;
    }
    if (keyDown[83] || keyDown[40]) {  // S || down
      moveForward = -movement;
    }
    if (keyDown[65] || keyDown[37]) {  // A || left
      moveLeft = movement;
    }
    if (keyDown[68] || keyDown[39]) {  // D || right
      moveLeft = -movement;
    }
    if (keyDown[32]) {  // Space
      moveUp = movement;
    }
    eyePosVel[0] = decayTo(eyePosVel[0], forward[0] * moveForward + left[0] * moveLeft + up[0] * moveUp, decayRate);
    eyePosVel[1] = decayTo(eyePosVel[1], forward[1] * moveForward + left[1] * moveLeft + up[1] * moveUp, decayRate);
    eyePosVel[2] = decayTo(eyePosVel[2], forward[2] * moveForward + left[2] * moveLeft + up[2] * moveUp, decayRate);
    eyePos[0] += eyePosVel[0] * time_delta;
    eyePos[1] += eyePosVel[1] * time_delta;
    eyePos[2] += eyePosVel[2] * time_delta;

    if (mouseDown[1]) {
      var needUpdate = false;
      for (laserDist += time_delta * 15; nextCutDist <= laserDist; nextCutDist += 0.8) {
        needUpdate = true;
        addBall(eyePos[0] + forward[0]*nextCutDist + randm11() * 1.0,
                eyePos[1] + forward[1]*nextCutDist + randm11() * 1.0,
                eyePos[2] + forward[2]*nextCutDist + randm11() * 1.0,
                4.0 + randm11() * 1.0);
      }
      if (needUpdate) {
        cubes.update();
      }
    } else {
      laserDist = 0;
      nextCutDist = 0;
    }
  }

  this.onMouseMove = function(x, y) {
    mouseX = x;
    mouseY = y;
  }

  this.onMouseDown = function(button) {
    mouseDown[button] = true;
  }

  this.onMouseUp = function(button) {
    mouseDown[button] = false;
  }

  this.onKeyDown = function(key) {
    //tdl.log(''+key);
    keyDown[key] = true;
  }

  this.onKeyUp = function(key) {
    keyDown[key] = false;
  }

  this.render = function(framebuffer) {
    var target = tdl.math.addVector(eyePos, forward);
    m4.lookAt(view, eyePos, target, up);

    gl.clearColor(0.4,0.6,0.8,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    cubes.render(framebuffer, world, view, proj);
  }
}
