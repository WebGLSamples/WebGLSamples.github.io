
function CavesRenderer() {
  var proj = new Float32Array(16)
  var view = new Float32Array(16)
  var world = new Float32Array(16)


  var m4 = tdl.fast.matrix4

  m4.perspective(proj, tdl.math.degToRad(60), aspect, 0.1, 500);
  m4.identity(world);
  
  var cubes = new MarchingCubesEffect();


  this.render = function(framebuffer, time) {

	var orbit = 1.2;
	var eyePos = new Float32Array([Math.cos(time * 0.8) * orbit, Math.sin(time * 0.8) * orbit, 0]);
	//var eyePos = new Float32Array([0, 0, 0]);
	var target = new Float32Array([Math.cos(time * -0.47) * 0.2, Math.sin(time * -0.47) * 0.2, Math.sin(time * -0.51) * 0.6]);
	
	m4.lookAt(view, eyePos, target, up);

    gl.clearColor(0.0,0.0,0.2,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    cubes.render(framebuffer, time, world, view, proj);
  }
}
