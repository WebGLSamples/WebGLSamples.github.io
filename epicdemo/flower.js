function FlowerEffect() {
  var arrays = tdl.primitives.createFlaredCube(0.01, 3.0, 40)
  var program = createProgramFromTags("flower_vs", "flower_fs")
  var textures = []

  var proj = new Float32Array(16)
  var view = new Float32Array(16)
  var world = new Float32Array(16)

  var viewproj = new Float32Array(16)
  var worldviewproj = new Float32Array(16)

  var model = new tdl.models.Model(program, arrays, textures);

  var eyePosition = new Float32Array([0, 0, 4])
  var target = new Float32Array([-1, 0, 0])

  var m4 = tdl.fast.matrix4

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.lookAt(view, eyePosition, target, up);

  this.render = function(framebuffer, time, global_time) {
    var t = (time - 0.1)
    var boom = 1-(t % 1)
    boom *= boom * boom
    
    m4.rotationY(world, time)
    m4.mul(viewproj, view, proj)
    m4.mul(worldviewproj, world, viewproj)

    gl.clearColor(0.1,0.2,0.3,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    var uniformsConst = {
      u_time: time - boom * 0.2,
      u_color: (Math.floor(curBeat) % 4 == 0) ?
          [0.1 + boom*0.3, 0.2 + boom*0.3, 0.3 + boom*0.2, 0] : 
          [0.3 + boom*0.3, 0.1 + boom*0.3, 0.05 + boom*0.2, 0]
    }
    var uniformsPer = {
      u_worldviewproj: worldviewproj
    }
    model.drawPrep(uniformsConst)
    model.draw(uniformsPer)
    gl.disable(gl.BLEND);
  }
}