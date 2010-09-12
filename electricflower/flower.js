function FlowerEffect() {
  var arrays = tdl.primitives.createFlaredCube(0.01, 3.0, 1400)
  var program = createProgramFromTags("flower_vs", "flower_fs")
  var textures = []

  var proj = new Float32Array(16)
  var view = new Float32Array(16)
  var world = new Float32Array(16)

  var viewproj = new Float32Array(16)
  var worldviewproj = new Float32Array(16)

  var model = new tdl.models.Model(program, arrays, textures);

  var eyePosition = new Float32Array([0, 0, 3])
  var target = new Float32Array([-0.3, 0, 0])

  var m4 = tdl.fast.matrix4

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.lookAt(view, eyePosition, target, up);

  // Returns RGBA quad as array.
  function hsv2rgb(h, s, v, a) {
    h *= 6
    var i = Math.floor(h);
    var f = h - i;
    if (!(i & 1)) f = 1 - f; // if i is even
    var m = v * (1 - s);
    var n = v * (1 - s * f);
    switch (i) {
      case 6:
      case 0: return [v, n, m, a]
      case 1: return [n, v, m, a]
      case 2: return [m, v, n, a]
      case 3: return [m, n, v, a]
      case 4: return [n, m, v, a]
      case 5: return [v, m, n, a]
    }
  }

  this.render = function(framebuffer, time, postproc) {
    m4.rotationY(world, time)
    m4.mul(viewproj, view, proj)
    m4.mul(worldviewproj, world, viewproj)

    if (postproc != 0) post.begin()
    
    gl.clearColor(0.1, 0.2, 0.3, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    var boom = 0.0 //0.5 + Math.sin(time)*0.5
    var uniformsConst = {
      u_time: time,
      u_color: hsv2rgb((time * 0.1) % 1.0, 1.0, 0.1, 1),
      u_color2: hsv2rgb((time * 0.22124) % 1.0, 1.0, 0.1, 0),
    }
    var uniformsPer = {
      u_worldviewproj: worldviewproj
    }
    model.drawPrep(uniformsConst)
    model.draw(uniformsPer)
    gl.disable(gl.BLEND);
    
    switch (postproc) {
      case 1:
        post.end(framebuffer, post.hypnoGlow, {x: 9, y: 9, sub: 0.2});
        break;
      case 2:
        post.end(framebuffer, post.focusBlur, {x: 2, y: 2});
        break;
      case 3:
        post.end(framebuffer, post.radialBlur, {strength: 0.3, glow: 1.0});
        break;
    }
  }
}