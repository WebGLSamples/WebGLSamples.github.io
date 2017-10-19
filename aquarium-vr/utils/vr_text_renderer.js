/*
Copyright (c) 2016, Brandon Jones.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
Heavily inspired by Mr. Doobs stats.js, this FPS counter is rendered completely
with WebGL, allowing it to be shown in cases where overlaid HTML elements aren't
usable (like WebVR), or if you want the FPS counter to be rendered as part of
your scene.

See stats-test.html for basic usage.
*/

/*
This VR textRenderer is mainly based on Brandon's WGLUStats toolkit but modified based on
the requriement.

See https://github.com/toji/webvr.info/blob/master/samples/js/third-party/wglu/wglu-stats.js
*/

var VRTextRenderer = (function() {

  "use strict";

  //--------------------
  // glMatrix functions
  //--------------------

  // These functions have been copied here from glMatrix (glmatrix.net) to allow
  // this file to run standalone.

  var mat4_multiply = function (out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
          a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
          a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

      // Cache only the current line of the second matrix
      var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
      out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
      out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
      out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
      return out;
  };

  var mat4_fromTranslation = function(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
  };

  //-------------------
  // Utility functions
  //-------------------

  function linkProgram(gl, vertexSource, fragmentSource, attribLocationMap) {
    // No error checking for brevity.
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    for (var attribName in attribLocationMap)
      gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);

    gl.linkProgram(program);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
  }

  function getProgramUniforms(gl, program) {
    var uniforms = {};
    var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    var uniformName = "";
    for (var i = 0; i < uniformCount; i++) {
      var uniformInfo = gl.getActiveUniform(program, i);
      uniformName = uniformInfo.name.replace("[0]", "");
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }

  //----------------------------
  // Seven-segment text display
  //----------------------------

  var sevenSegmentVS = [
    "uniform mat4 projectionMat;",
    "uniform mat4 modelViewMat;",
    "attribute vec4 modify;",
    "attribute vec2 position;",

    "void main() {",
    "  gl_Position = projectionMat * modelViewMat * vec4( position, 0.0, 1.0 );",
    "}",
  ].join("\n");

  var sevenSegmentFS = [
    "precision mediump float;",
    "uniform vec4 color;",

    "void main() {",
    "  gl_FragColor = color;",
    "}",
  ].join("\n");

  var SevenSegmentText = function (gl) {
    this.gl = gl;

    this.attribs = {
      position: 0,
      color: 1
    };

    this.program = linkProgram(gl, sevenSegmentVS, sevenSegmentFS, this.attribs);
    this.uniforms = getProgramUniforms(gl, this.program);

    var verts = [];
    var segmentIndices = {};
    var indices = [];

    var width = 0.5;
    var thickness = 0.25;
    this.fps = 0;
    this.kerning = 2.0;
    this.kerningForAlign = 1.0;

    this.matrix = new Float32Array(16);
    this.modelViewMat = new Float32Array(16);

    function defineSegment(id, left, top, right, bottom) {
      var idx = verts.length / 2;
      verts.push(
          left, top,
          right, top,
          right, bottom,
          left, bottom);

      segmentIndices[id] = [
          idx, idx+2, idx+1,
          idx, idx+3, idx+2];
    }

    var characters = {};
    this.characters = characters;

    function defineCharacter(c, segments) {
      var character = {
        character: c,
        offset: indices.length * 2,
        count: 0
      };

      for (var i = 0; i < segments.length; ++i) {
        var idx = segments[i];
        var segment = segmentIndices[idx];
        character.count += segment.length;
        indices.push.apply(indices, segment);
      }

      characters[c] = character;
    }

    /* Segment layout is as follows:

    |-0-|
    3   4
    |-1-|
    5   6
    |-2-|

    */

    defineSegment(0, -1, 1, width, 1-thickness);
    defineSegment(1, -1, thickness*0.5, width, -thickness*0.5);
    defineSegment(2, -1, -1+thickness, width, -1);
    defineSegment(3, -1, 1, -1+thickness, -thickness*0.5);
    defineSegment(4, width-thickness, 1, width, -thickness*0.5);
    defineSegment(5, -1, thickness*0.5, -1+thickness, -1);
    defineSegment(6, width-thickness, thickness*0.5, width, -1);


    defineCharacter("0", [0, 2, 3, 4, 5, 6]);
    defineCharacter("1", [4, 6]);
    defineCharacter("2", [0, 1, 2, 4, 5]);
    defineCharacter("3", [0, 1, 2, 4, 6]);
    defineCharacter("4", [1, 3, 4, 6]);
    defineCharacter("5", [0, 1, 2, 3, 6]);
    defineCharacter("6", [0, 1, 2, 3, 5, 6]);
    defineCharacter("7", [0, 4, 6]);
    defineCharacter("8", [0, 1, 2, 3, 4, 5, 6]);
    defineCharacter("9", [0, 1, 2, 3, 4, 6]);
    defineCharacter("A", [0, 1, 3, 4, 5, 6]);
    defineCharacter("B", [1, 2, 3, 5, 6]);
    defineCharacter("C", [0, 2, 3, 5]);
    defineCharacter("D", [1, 2, 4, 5, 6]);
    defineCharacter("E", [0, 1, 2, 4, 6]);
    defineCharacter("F", [0, 1, 3, 5]);
    defineCharacter("P", [0, 1, 3, 4, 5]);
    defineCharacter("-", [1]);
    defineCharacter(" ", []);
    defineCharacter("_", [2]); // Used for undefined characters

    this.vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  };

  SevenSegmentText.prototype.setFps = function(fps) {
    if (fps == undefined)
      this.fps = 0;

    this.fps = fps;
  };

  SevenSegmentText.prototype.render = function(projectionMat, modelViewMat, textMatrix, fps) {
    var gl = this.gl;
    var r = 0.0;
    var g = 1.0;
    var b = 0.0;
    var a = 1.0;

    gl.useProgram(this.program);

    gl.uniformMatrix4fv(this.uniforms.projectionMat, false, projectionMat);
    gl.uniform4f(this.uniforms.color, r, g, b, a);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.enableVertexAttribArray(this.attribs.position);
    gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 8, 0);

    // Actually it is FPS, but 5 is the same as S when presentation.
    var text = fps.toString(); //+ "FP5";
    var offset = 0;

    for (var i = 0; i < text.length; ++i) {
      var c;
      if (text[i] in this.characters) {
        c = this.characters[text[i]];
      } else {
        c = this.characters["_"];
      }

      if (c.count != 0) {
        if (c.character == "1") {
          offset -= 1.2;
        }
        mat4_fromTranslation(this.matrix, [offset, 0, 0]);
        mat4_multiply(this.modelViewMat, modelViewMat, textMatrix);
        mat4_multiply(this.matrix, this.modelViewMat, this.matrix);

        gl.uniformMatrix4fv(this.uniforms.modelViewMat, false, this.matrix);
        gl.drawElements(gl.TRIANGLES, c.count, gl.UNSIGNED_SHORT, c.offset);
      }
      
      offset += this.kerning;
    }
  }

  return SevenSegmentText;
})();
