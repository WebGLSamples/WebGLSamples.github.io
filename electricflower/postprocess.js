/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// requires shaders: quad_vs radial_fs blur_fs copy_fs add_fs

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
  var qw_qh_fb = tdl.framebuffers.createFramebuffer(w / 4, h / 4, true)

  // Re-bind the backbuffer.
  backbuffer.bind()

  var blurQuadProgram = tdl.programs.loadProgramFromScriptTags("quad_vs", "blur_fs")
  var copyQuadProgram = tdl.programs.loadProgramFromScriptTags("quad_vs", "copy_fs")
  var addQuadProgram  = tdl.programs.loadProgramFromScriptTags("quad_vs", "add_fs")
  var radialQuadProgram = tdl.programs.loadProgramFromScriptTags("radial_vs", "radial_fs")

  this.focusBlur = function(framebuffer, params) {
    blurQuadProgram.use()
    blurQuadProgram.setUniform("mainSampler", render_fb.texture)

    qw_fb.bind()
    blurQuadProgram.setUniform("blurSize", [params.x / w, 0.0 / h])
    blurQuadProgram.setUniform("subtract", [0,0,0,0])
    quad.draw(blurQuadProgram)

    qw_qh_fb.bind()
    blurQuadProgram.setUniform("mainSampler", qw_fb.texture)
    blurQuadProgram.setUniform("blurSize", [0.0 / w, params.y / h])
    blurQuadProgram.setUniform("subtract", [0,0,0,0])
    quad.draw(blurQuadProgram)

    copyQuadProgram.use()
    copyQuadProgram.setUniform("mainSampler", qw_qh_fb.texture)
    framebuffer.bind()
    quad.draw(copyQuadProgram)
  }

  this.hypnoGlow = function(framebuffer, params) {
    blurQuadProgram.use()
    blurQuadProgram.setUniform("mainSampler", render_fb.texture)

    qw_fb.bind()
    blurQuadProgram.setUniform("blurSize", [params.x / w, 0.0 / h])
    blurQuadProgram.setUniform("subtract", [params.sub,params.sub,params.sub,0])
    quad.draw(blurQuadProgram)

    qw_qh_fb.bind()
    blurQuadProgram.setUniform("mainSampler", qw_fb.texture)
    blurQuadProgram.setUniform("blurSize", [0.0 / w, params.y / h])
    blurQuadProgram.setUniform("subtract", [0,0,0,0])
    quad.draw(blurQuadProgram)

    addQuadProgram.use()
    addQuadProgram.setUniform("mainSampler", qw_qh_fb.texture)
    addQuadProgram.setUniform("secondSampler", render_fb.texture)
    framebuffer.bind()
    quad.draw(addQuadProgram)
  }

  // Params: strength, glow(1.0=neutral)
  this.radialBlur = function(framebuffer, params) {
    if (params.strength <= 0.002) {
      framebuffer.bind()
      copyQuadProgram.use()
      copyQuadProgram.setUniform("mainSampler", render_fb.texture)
      quad.draw(copyQuadProgram)
      return
    }
    pingpong = [render_fb, bounce_fb]
    to = 1
    from = 0

    var passes = 3
    var amount = params.strength
    radialQuadProgram.use()
    radialQuadProgram.setUniform("mainSampler", pingpong[from].texture)
    for (var i = 0; i < passes; i++) {
      pingpong[to].bind()
      radialQuadProgram.setUniform("mainSampler", pingpong[from].texture)
      radialQuadProgram.setUniform("amount", amount)
      radialQuadProgram.setUniform("glow", params.glow)
      quad.draw(radialQuadProgram)
      amount /= 4.0
      to ^= 1
      from ^= 1
    }
    framebuffer.bind()
    copyQuadProgram.use()
    copyQuadProgram.setUniform("mainSampler", pingpong[from].texture)
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
