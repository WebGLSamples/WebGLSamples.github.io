

function CavesMain() {
  var proj = new Float32Array(16);
  var view = new Float32Array(16);
  var world = new Float32Array(16);

  var keyDown = [];

  var m4 = tdl.fast.matrix4;

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.identity(world);
  //m4.scaling(world, [0.7, 0.7, 0.7]);
  //m4.translate(world, [-16, -16, -16]);
  
  var size = 32;
  var tree = new field.FieldNode(0, 0, 0, size, 8);

  var cubes = new MarchingCubes(tree);

  var eyePos = [size/2,size/2,size/2];
  var eyeRotTheta = 0, eyeRotPhi = Math.PI/2;
  var forward = [20, 0, 0];
  var up = new Float32Array([0, 0, 1]);
  
  var time = 0;
  
  var mouseX = 0, mouseY = 0;

  function addBall(ballx, bally, ballz, radius) {
    var min_x = Math.max(Math.floor(ballx - radius), 0);
    var max_x = Math.min(Math.ceil(ballx + radius), size);
    var min_y = Math.max(Math.floor(bally - radius), 0);
    var max_y = Math.min(Math.ceil(bally + radius), size);
    var min_z = Math.max(Math.floor(ballz - radius), 0);
    var max_z = Math.min(Math.ceil(ballz + radius), size);
    function uniform(minNodeX, minNodeY, minNodeZ, nodeSize, value) {
      // TODO: intersect sphere with cube to avoid unnecessary splits.
      // TODO: allow 'set value' response for interior cubes.
      return true;  // 'Please subdivide this node.'
    }
    function buffer(minNodeX, minNodeY, minNodeZ, nodeSize, array) {
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
    }
    tree.walkSubTree(min_x, max_x, min_y, max_y, min_z, max_z, uniform, buffer);
    //tree.walkTree(uniform, buffer);
  }
  
  var radius = 7.0;
  for (var i = 0; i < 6; ++i) {
    function randm11() { return Math.random() * 2 - 1; }
    var ballx = randm11() * 16 + 16;
    var bally = randm11() * 16 + 16;
    var ballz = randm11() * 16 + 16;
    addBall(ballx, bally, ballz, radius);
  }
  cubes.update();

  this.tick = function(time_delta) {
    time_delta = Math.min(time_delta, 0.1);
    time += time_delta;
    var orbit = 1.1;
    //eyePos = new Float32Array([Math.cos(time)*orbit, Math.sin(time)*orbit, 0.3]);
    var mvX, mvY;
    mvX = Math.min(Math.max(mouseX - 400, -400), 400);
    mvY = Math.min(Math.max(mouseY - 400, -400), 400);
    mvX = Math.pow(mvX / 100, 3);
    mvY = Math.pow(mvY / 100, 3);
    eyeRotTheta = (eyeRotTheta - mvX * time_delta * 0.1) % (Math.PI * 2);
    eyeRotPhi += mvY * time_delta * 0.1;
    eyeRotPhi = Math.min(Math.max(eyeRotPhi, 0.1), Math.PI-0.1);
    
    forward = [Math.cos(eyeRotTheta)*Math.sin(eyeRotPhi),
               Math.sin(eyeRotTheta)*Math.sin(eyeRotPhi),
               Math.cos(eyeRotPhi)];
    
    var movement = time_delta * 9;
    var moveForward = 0, moveLeft = 0;
    if (keyDown[87]) {
      moveForward = movement;
    }
    if (keyDown[83]) {
      moveForward = -movement;
    }
    if (keyDown[65]) {
      moveLeft = movement;
    }
    if (keyDown[68]) {
      moveLeft = -movement;
    }
    eyePos[0] += forward[0] * moveForward - forward[1] * moveLeft;
    eyePos[1] += forward[1] * moveForward + forward[0] * moveLeft;
    eyePos[2] += forward[2] * moveForward;
  }
  
  this.onMouseMove = function(x, y) {
    mouseX = x;
    mouseY = y;
  }
  
  this.onKeyDown = function(key) {
    keyDown[key] = true;
    
    if (key === 32) {
      addBall(eyePos[0] + forward[0]*2,
              eyePos[1] + forward[1]*2,
              eyePos[2] + forward[2]*2,
              3.0);
      cubes.update();
    }
  }

  this.onKeyUp = function(key) {
    keyDown[key] = false;
  }

  this.render = function(framebuffer) {
    var target = tdl.math.addVector(eyePos, forward);
	  m4.lookAt(view, eyePos, target, up);

    gl.clearColor(0.0,0.0,0.2,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    cubes.render(framebuffer, world, view, proj);
  }
}
