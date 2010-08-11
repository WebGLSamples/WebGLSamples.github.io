// requires: quad_vs radial_fs blur_fs copy_fs


// Bind quad_vs or similar together with any fragment program you want,
// and draw(program).
function QuadDrawer() {
  var quadVerts = new Float32Array([-1.0, -1.0,  0.0,
                                     1.0, -1.0,  0.0,
                                    -1.0,  1.0,  0.0,
                                     1.0,  1.0,  0.0])
  var quadPosBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quadPosBuf)
  gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW)
  this.draw = function(program) {
    gl.bindBuffer(gl.ARRAY_BUFFER, quadPosBuf);
    gl.enableVertexAttribArray(program.attribLoc["position"])
    gl.vertexAttribPointer(program.attribLoc["position"], 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  } 
}

function PostProcessor(w, h) {
  // Create a set of render targets, useful for various post processing
  // effects.  
  var render_fb = tdl.framebuffers.createFramebuffer(w, h, true)
  var bounce_fb = tdl.framebuffers.createFramebuffer(w, h, true)
  
  var qw_fb = tdl.framebuffers.createFramebuffer(w / 4, h, true)
  var qw_qh_fb = tdl.framebuffers.createFramebuffer(w / 4, h, true)

  // Re-bind the backbuffer.
  backbuffer.bind()
  
  var blurQuadProgram = createProgramFromTags("quad_vs", "blur_fs")
  var copyQuadProgram = createProgramFromTags("quad_vs", "copy_fs")
  var radialQuadProgram = createProgramFromTags("radial_vs", "radial_fs")
  
  this.focusBlur = function(framebuffer, params) {
    blurQuadProgram.use()
    blurQuadProgram.setUniform("mainSampler", 0)
    
    qw_fb.bind()
    gl.bindTexture(gl.TEXTURE_2D, render_fb.texture.texture)
    blurQuadProgram.setUniform("blurSize", [params.x / w, 0.0 / h])
    quad.draw(blurQuadProgram)
    
    qw_qh_fb.bind()
    gl.bindTexture(gl.TEXTURE_2D, qw_fb.texture.texture)
    blurQuadProgram.setUniform("blurSize", [0.0 / w, params.y / h])
    quad.draw(blurQuadProgram)
    
    gl.bindTexture(gl.TEXTURE_2D, qw_qh_fb.texture.texture)
    copyQuadProgram.use()
    copyQuadProgram.setUniform("mainSampler", 0)
    framebuffer.bind()
    quad.draw(copyQuadProgram)
  }
  
  this.radialBlur = function(framebuffer, params) {
    if (params.strength <= 0.002) {
      framebuffer.bind()
      gl.bindTexture(gl.TEXTURE_2D, render_fb.texture.texture)
      copyQuadProgram.use()
      copyQuadProgram.setUniform("mainSampler", 0)
      quad.draw(copyQuadProgram)
      return
    }
    pingpong = [render_fb, bounce_fb]
    to = 1
    from = 0
    
    var passes = 3
    var amount = params.strength
    radialQuadProgram.use()
    for (var i = 0; i < passes; i++) {
      pingpong[to].bind()
      gl.bindTexture(gl.TEXTURE_2D, pingpong[from].texture.texture)
      radialQuadProgram.setUniform("amount", amount)
      quad.draw(radialQuadProgram)
      amount /= 4.0
      to ^= 1
      from ^= 1
    }
    framebuffer.bind()
    gl.bindTexture(gl.TEXTURE_2D, pingpong[from].texture.texture)
    copyQuadProgram.use()
    copyQuadProgram.setUniform("mainSampler", 0)
    quad.draw(copyQuadProgram)
  }

  // You can not call begin "recursively" unless your two effects use completely
  // independent buffers.
  this.begin = function() {
    render_fb.bind()
  }
  
  this.end = function(framebuffer, func, params) {
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)
    gl.disable(gl.BLEND)
    gl.activeTexture(gl.TEXTURE0)
    func(framebuffer, params)
  }
}
