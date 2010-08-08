/*
 * Copyright 2009, Google Inc.
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


/**
 * @fileoverview This file contains objects to deal with WebGL
 *               programs.
 */

tdl.provide('tdl.programs');

/**
 * A module for programs.
 * @namespace
 */
tdl.programs = tdl.programs || {};

/**
 * All the programs currently loaded.
 * @type {!Object.<string, !tdl.programs.Program>}
 */
tdl.programs.programDB = {};

/**
 * All the programs currently loaded.
 * @type {!Object.<string, !WebGLShader>}
 */
tdl.programs.shaderDB = {};

tdl.programs.loadProgram = function(vertexShader, fragmentShader) {
  var id = vertexShader + fragmentShader;
  var program = tdl.programs.programDB[id];
  if (program) {
    return program;
  }
  program = new tdl.programs.Program(vertexShader, fragmentShader);
  tdl.programs.programDB[id] = program;
  return program;
};

tdl.programs.Program = function(vertexShader, fragmentShader) {
  // Compile shaders
  var program = wu.loadProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    throw ("could not compile program");
  }

  // TODO(gman): remove the need for this.
  function flatten(array){
    var flat = [];
    for (var i = 0, l = array.length; i < l; i++) {
      var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
      if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
    }
    return flat;
  }

  // Look up attribs.
  var attribs = {
  };
  // Also make a plain table of the locs.
  var attribLocs = {
  };

  function createAttribSetter(info) {
    var index = gl.getAttribLocation(program, info.name);
    if (info.size != 1) {
      throw("arrays of attribs not handled");
    }
    return function(b) {
        gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer());
        gl.enableVertexAttribArray(index);
        gl.vertexAttribPointer(
            index, b.numComponents(), b.type(), false, b.stride(), b.offset());
      };
  }

  var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (var ii = 0; ii < numAttribs; ++ii) {
    var info = gl.getActiveAttrib(program, ii);
    name = info.name;
    if (wu.endsWith(name, "[0]")) {
      name = name.substr(0, name.length - 3);
    }
    attribs[name] = createAttribSetter(info);
    var index = gl.getAttribLocation(program, info.name);
    attribLocs[name] = index
  }

  // Look up uniforms
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  var uniforms = {
  };

  function createUniformSetter(info) {
    var loc = gl.getUniformLocation(program, info.name);
    var type = info.type;
    if (info.size > 1 && wu.endsWith(info.name, "[0]")) {
      // It's an array.
      if (type == gl.FLOAT)
        return function(v) { gl.uniform1fv(loc, v); };
      if (type == gl.FLOAT_VEC2)
        return function(v) { gl.uniform2fv(loc, v); };
      if (type == gl.FLOAT_VEC3)
        return function(v) { gl.uniform3fv(loc, v); };
      if (type == gl.FLOAT_VEC4)
        return function(v) { gl.uniform4fv(loc, v); };
      if (type == gl.INT)
        return function(v) { gl.uniform1iv(loc, v); };
      if (type == gl.INT_VEC2)
        return function(v) { gl.uniform2iv(loc, v); };
      if (type == gl.INT_VEC3)
        return function(v) { gl.uniform3iv(loc, v); };
      if (type == gl.INT_VEC4)
        return function(v) { gl.uniform4iv(loc, v); };
      if (type == gl.BOOL)
        return function(v) { gl.uniform1iv(loc, v); };
      if (type == gl.BOOL_VEC2)
        return function(v) { gl.uniform2iv(loc, v); };
      if (type == gl.BOOL_VEC3)
        return function(v) { gl.uniform3iv(loc, v); };
      if (type == gl.BOOL_VEC4)
        return function(v) { gl.uniform4iv(loc, v); };
      if (type == gl.FLOAT_MAT2)
        return function(v) { gl.uniformMatrix2fv(loc, false, v); };
      if (type == gl.FLOAT_MAT3)
        return function(v) { gl.uniformMatrix3fv(loc, false, v); };
      if (type == gl.FLOAT_MAT4)
        return function(v) { gl.uniformMatrix4fv(loc, false, v); };
      if (type == gl.SAMPLER_2D)
        return function(v) { gl.uniform1iv(loc, v); };
      if (type == gl.SAMPLER_CUBE_MAP)
        return function(v) { gl.uniform1iv(loc, v); };
      throw ("unknown type: 0x" + type.toString(16));
    } else {
      if (type == gl.FLOAT)
        return function(v) { gl.uniform1f(loc, v); };
      if (type == gl.FLOAT_VEC2)
        return function(v) { gl.uniform2fv(loc, v); };
      if (type == gl.FLOAT_VEC3)
        return function(v) { gl.uniform3fv(loc, v); };
      if (type == gl.FLOAT_VEC4)
        return function(v) { gl.uniform4fv(loc, v); };
      if (type == gl.INT)
        return function(v) { gl.uniform1i(loc, v); };
      if (type == gl.INT_VEC2)
        return function(v) { gl.uniform2iv(loc, v); };
      if (type == gl.INT_VEC3)
        return function(v) { gl.uniform3iv(loc, v); };
      if (type == gl.INT_VEC4)
        return function(v) { gl.uniform4iv(loc, v); };
      if (type == gl.BOOL)
        return function(v) { gl.uniform1i(loc, v); };
      if (type == gl.BOOL_VEC2)
        return function(v) { gl.uniform2iv(loc, v); };
      if (type == gl.BOOL_VEC3)
        return function(v) { gl.uniform3iv(loc, v); };
      if (type == gl.BOOL_VEC4)
        return function(v) { gl.uniform4iv(loc, v); };
      if (type == gl.FLOAT_MAT2)
        return function(v) { gl.uniformMatrix2fv(loc, false, v); };
      if (type == gl.FLOAT_MAT3)
        return function(v) { gl.uniformMatrix3fv(loc, false, v); };
      if (type == gl.FLOAT_MAT4)
        return function(v) { gl.uniformMatrix4fv(loc, false, v); };
      if (type == gl.SAMPLER_2D)
        return function(v) { gl.uniform1i(loc, v); };
      if (type == gl.SAMPLER_CUBE)
        return function(v) { gl.uniform1i(loc, v); };
      throw ("unknown type: 0x" + type.toString(16));
    }
  }

  for (var ii = 0; ii < numUniforms; ++ii) {
    var info = gl.getActiveUniform(program, ii);
    name = info.name;
    if (wu.endsWith(name, "[0]")) {
      name = name.substr(0, name.length - 3);
    }
    uniforms[name] = createUniformSetter(info);
  }

  this.program = program;
  this.attrib = attribs;
  this.attribLoc = attribLocs;
  this.uniform = uniforms;
};

tdl.programs.Program.prototype.use = function() {
  gl.useProgram(this.program);
};

//function dumpValue(msg, name, value) {
//  var str;
//  if (value.length) {
//      str = value[0].toString();
//     for (var ii = 1; ii < value.length; ++ii) {
//       str += "," + value[ii];
//     }
//  } else {
//    str = value.toString();
//  }
//  console.log(msg + name + ": " + str);
//}

tdl.programs.Program.prototype.setUniform = function(uniform, value) {
  var func = this.uniform[uniform];
  if (func) {
    //dumpValue("SET UNI:", uniform, value);
    func(value);
  }
};


