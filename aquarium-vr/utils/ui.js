tdl.require('tdl.textures');
tdl.require('tdl.io');
tdl.require('tdl.fast');
tdl.require('tdl.webgl');

var Ui = (function() {

  "use strict";
  
  var menuPrimitiveVS = [
    "uniform mat4 projectionMat;",
    "uniform mat4 modelViewMat;",
    "uniform vec2 position;",

    "void main() {",
    "  gl_Position = projectionMat * modelViewMat * vec4(position, 0.0, 1.0);",
    "  gl_PointSize = 5.0;",
    "}",
  ].join("\n");

  var menuPrimitiveFS = [
    "precision mediump float;",
    "uniform vec4 color;",
    "void main() {",
    "  gl_FragColor = color;",
    "}",
  ].join("\n");

  var menuLabelVS = [
    "uniform mat4 projectionMat;",
    "uniform mat4 modelViewMat;",
    "attribute vec2 position;",
    "attribute vec2 texCoord;",
    "attribute vec4 modifyMat;",
    "varying vec2 v_TexCoord;",

    "void main() {",
    "  v_TexCoord = texCoord;",
    "  gl_Position = projectionMat * modelViewMat * (modifyMat + vec4( position, 0.0, 1.0 ));",
    "}",
  ].join("\n");

  var menuLabelFS= [
    "precision mediump float;",
    "uniform sampler2D u_Sampler;",
    "varying vec2 v_TexCoord;",

    "void main() {",
    "  gl_FragColor = texture2D(u_Sampler, v_TexCoord);",
    "}",
  ].join("\n");

  //-------------------
  // Utility functions
  //-------------------

  function linkProgram(gl, vertexSource, fragmentSource, attribLocationMap) {
    // No error checking for brevity.
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    var compiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    var compilationLog = gl.getShaderInfoLog(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    compiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    compilationLog = gl.getShaderInfoLog(fragmentShader);


    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    for (var attribName in attribLocationMap) {
      gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);
    }

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

  function segmentPlaneInteracts(segmentBeginPoint, orientation, plane) {
    // 1. calculate line equation based on orientation quaternion.
    var q1 = orientation[0];
    var q2 = orientation[1];
    var q3 = orientation[2];
    var q0 = orientation[3];

    var x_factor = 2 * (q1 * q3 - q0 * q2);
    var y_factor = 2 * (q2 * q3 + q0 * q1);
    var z_factor = (1 - 2 * q1 * q1 - 2 * q2 * q2);

    // 2. Read our plane equation.
    // 3. calculate the interact point.
    var t = plane[3] / z_factor;

    return [x_factor * t, y_factor * t];
  }

  function generateVerts(verts, indices, data) {
    var left = data.vertex[0];
    var bottom = data.vertex[1];
    var right = data.vertex[2];
    var top = data.vertex[3];
    var idx = verts.length / 2;    
    verts.push(
      left, top,
      right, top,
      right, bottom,
      left, bottom);
    indices.push(
      idx, idx + 2, idx + 1,
      idx, idx + 3, idx + 2
    );
  }

  function generateTexVerts(verts, indices, data) {
    var left = data.vertex[0];
    var bottom = data.vertex[1];
    var right = data.vertex[2];
    var top = data.vertex[3];
    var idx = verts.length / 4;
    verts.push(
      left, top,
      right, top,
      right, bottom,
      left, bottom,
      // Texture coordinates;
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0);
    indices.push(
      idx, idx + 2, idx + 1,
      idx, idx + 3, idx + 2
    );
  }

  var Menu = function(gl, numFish) {
    this.gl = gl;
    this.fps = 0;
    this.loaded = false;

    // Utils
    this.gamepads = new gamepads();
    this.textRenderer = new VRTextRenderer(gl);

    // GL
    this.primitiveProgram = null;
    this.labelProgram = null;
    this.cursorProgram = null;
    this.primitiveAttribs = {
      position : 0,
    };
    this.labelAttribs = {
      position : 0,
      texCoord : 1,
      modifyMat : 2
    };
    this.primitiveUniforms = null;
    this.labelUniforms = null;    
    this.labelVerts = [];
    this.labelIndices = [];
    this.labelVertBuffer = null;
    this.labelIndicesBuffer = null;

    // Rendering. 
    this.numberOfFish = numFish;
    this.option = false;
    this.showFps = true;
    this.isMenuMode = false;
    this.cursorModelViewMat = new Float32Array(16);
    this.menuLayout = {};
    this.menu = {};

    // Query clicked label.
    this.clock = 0;
    this.clickedLabel;
    this.selectedLabelIndex = -1;
  }

  Menu.prototype.load = function(url) {
    var that = this;

    tdl.io.loadJSON(url, function(data, exception) {
      that.onload_(data, exception);
    });

    this.primitiveProgram = linkProgram(gl, menuPrimitiveVS, menuPrimitiveFS, this.primitiveAttribs);
    this.labelProgram = linkProgram(gl, menuLabelVS, menuLabelFS, this.labelAttribs);

    this.primitiveUniforms = getProgramUniforms(gl, this.primitiveProgram);
    this.labelUniforms = getProgramUniforms(gl, this.labelProgram);

    // Currently, cursor uses head-neck model. We pre-compute view matrix for cursor.
    // TODO : Add gamepad cursor support.
    tdl.fast.matrix4.inverse(this.cursorModelViewMat, fast.matrix4.translation(this.cursorModelViewMat, [0,0,6]));
  }

  Menu.prototype.onload_ = function(data, exception) {
    if (exception) {
      tdl.error("tdl load json file with exception : " + exception);
      return;
    } else {
      // Load labels
      var layout = []; // Record whole menu layout for rendering and selection.
      var textureIndex = []; // Record texture label id for fast selection.
      var numberIndex = []; // Record fish number label id for fast selection.
      var id = 0; // Generate id for each label.

      // Record metadata of labels with textures and load these textures.
      for (var index in data.menu.labels) {
        var labelInfo = {};
        labelInfo.vertexOffset = this.labelVerts.length * 2;
        labelInfo.indexOffset = this.labelIndices.length * 2;
        generateTexVerts(this.labelVerts, this.labelIndices, data.menu.labels[index]);
        labelInfo.texture = [];
        if (data.menu.labels[index].isSwitch) {
          labelInfo.texture[0] =  tdl.textures.loadTexture(
             './vr_assets/ui/' + data.menu.labels[index].texture[0], true);
          labelInfo.texture[1] = tdl.textures.loadTexture(
            './vr_assets/ui/' + data.menu.labels[index].texture[1], true);
        } else {
          labelInfo.texture[0] = tdl.textures.loadTexture(
             './vr_assets/ui/' + data.menu.labels[index].texture[0], true);
        }
        labelInfo.presentTextureId = 0;
        labelInfo.name = data.menu.labels[index].name;
        labelInfo.isSwitch = data.menu.labels[index].isSwitch;

        var textureLayout = {};
          textureLayout.name = data.menu.labels[index].name;
          textureLayout.isAdvancedSettings = !data.menu.labels[index].alwaysPresent;
          textureLayout.vertex = data.menu.labels[index].vertex;
          textureLayout.label = labelInfo;
          if (data.menu.labels[index].clickable) {
            textureLayout.clickable = true;
          } else {
            textureLayout.clickable = false;
          }
          layout.push(textureLayout);
          textureIndex.push(id++);
      }
      this.menu.textureIndex = textureIndex;

      // Record metadata of labels(numbers of fishes) that are rendered by text renderer.
      var numberLayoutLists = [];
      for (var index in this.numberOfFish) {
        var numberLayout = {};
        numberLayout.type = 0;
        numberLayout.name = index.toString();
        numberLayout.isAdvancedSettings = false;
        var lengthOfNumber = this.numberOfFish[index].toString().length;
        // Generate vertex for rendering number layout.
        numberLayout.vertex = [-1.0, 3.5 - index * 0.45, -1.0 + 0.33 * lengthOfNumber, 4.0 - index * 0.45];
        numberLayout.fishNumber = this.numberOfFish[index];
        numberLayout.clickable = true;
        layout.push(numberLayout);
        numberIndex.push(id++);
      }
      this.menu.numberIndex = numberIndex;
      this.menu.layout = layout;

      this.labelVertBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.labelVertBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.labelVerts), gl.DYNAMIC_DRAW);

      this.labelIndicesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.labelIndicesBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.labelIndices), gl.STATIC_DRAW);
      this.loaded = true;
    }
  }

  Menu.prototype.render = function(projectionMat, modelViewMat, orientations) {
    if (this.loaded == false) return;
    var gl = this.gl;
    var layout = this.menu.layout;
    var numberIndex = this.menu.numberIndex; // id of number label.
    var textureIndex = this.menu.textureIndex; // id of label with texture.

    if (this.isMenuMode) {
      // First we render number of fishes with help of text renderer.
      gl.useProgram(this.primitiveProgram);
      gl.uniformMatrix4fv(this.primitiveUniforms.projectionMat, false, projectionMat);
      gl.uniformMatrix4fv(this.primitiveUniforms.modelViewMat, false, this.cursorModelViewMat);
      gl.uniform4f(this.primitiveUniforms.color, 0.0, 1.0, 0.0, 1.0);
      gl.uniform2f(this.primitiveUniforms.position, 0.0, 0.0);
      gl.drawArrays(gl.POINTS, 0, 1);
      var textMatrix = [0.175, 0, 0, 0, 0, 0.175, 0, 0, 0, 0, 0, 1, -0.8, 4.0, 0, 1];
      for (var i in numberIndex) {
        var index = numberIndex[i];
        if (index == this.selectedLabelIndex) {
          textMatrix[14] = 0.5; // if a label is selected, it will move close to user.
        } else {
          textMatrix[14] = 0;
        }
        this.textRenderer.render(projectionMat, modelViewMat, textMatrix, layout[index].fishNumber);
        textMatrix[13] -= 0.5;
      }

      if (this.clickedLabel == "options") {
        this.option = !this.option;
      }

      if (this.clickedLabel == "fps") {
        this.showFps = !this.showFps;
      }

      // Then we render labels with textures.
      gl.useProgram(this.labelProgram);
      gl.uniformMatrix4fv(this.labelUniforms.projectionMat, false, projectionMat);
      gl.uniformMatrix4fv(this.labelUniforms.modelViewMat, false, modelViewMat);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.labelVertBuffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.labelIndicesBuffer);

      for (var i in textureIndex) {
        var index = textureIndex[i];
        if (!layout[index].isAdvancedSettings || this.option) {
          gl.disableVertexAttribArray(this.labelAttribs.modifyMat);
          if (index == this.selectedLabelIndex) {
            gl.vertexAttrib4f(this.labelAttribs.modifyMat, 0, 0, 0.5, 0); // selected label will move close to user.
          } else {
            gl.vertexAttrib4f(this.labelAttribs.modifyMat, 0, 0, 0, 0);
          }
          gl.enableVertexAttribArray(this.labelAttribs.position);
          gl.vertexAttribPointer(this.labelAttribs.position, 2 , gl.FLOAT, false, 8, layout[index].label.vertexOffset);
          gl.enableVertexAttribArray(this.labelAttribs.texCoord)
          gl.vertexAttribPointer(this.labelAttribs.texCoord, 2, gl.FLOAT, false, 8, layout[index].label.vertexOffset + 32);
          if (layout[index].name == this.clickedLabel) {
            if (layout[index].label.isSwitch) {
                layout[index].label.presentTextureId == 0 ? layout[index].label.presentTextureId += 1 : layout[index].label.presentTextureId -= 1;
            }
          } 
          layout[index].label.texture[layout[index].label.presentTextureId].bindToUnit(0);
          gl.uniform1i(this.labelUniforms.u_Sampler, 0);
          gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, layout[index].label.indexOffset);
        }
      }
      this.clickedLabel = null;
    } else if (this.showFps) {
      var textMatrix = new Float32Array([0.075, 0, 0, 0, 0, 0.075, 0, 0, 0, 0, 1, 0, -0.3625, 0.3625, 0.02, 1]);
      var statViewMatrix = new Float32Array(16);
      var modelViewMat = fast.matrix4.inverse(statViewMatrix, fast.matrix4.translation(statViewMatrix, [0, 0, 6]));
      this.textRenderer.render(projectionMat, modelViewMat, textMatrix, this.fps);
    }
  }

  Menu.prototype.queryClickedLabel = function(segmentBeginPoint, orientation) {
    if (orientation == null) return;
    var plane = [0, 0, 1, 10]; // Auxiliary plane to calculate interact point.
    var selectedPlane = [0, 0, 1, 9.5]; // Auxiliary plane to calculate interact point when label is selected.

    // Auxiliary bound for fast decision.
    var menuLeftBound = -1.0;
    var menuRightBound = 1.0;
    var menuTopBound = 5.5;
    var menuBottomBoundWithoutAdvancedSettings = -1.8;
    var menuBottomBoundWithAdvancedSettings = -5.3;

    var interactPoint = segmentPlaneInteracts(segmentBeginPoint, orientation, plane);
    var leftIndex = 0;
    var bottomIndex = 1;
    var rightIndex = 2;
    var topIndex = 3;
    var layout = this.menu.layout;
    var isAdvancedSettings = false;
    if (this.selectedLabelIndex >= 0) {
      var selectedInteractPoint = segmentPlaneInteracts(segmentBeginPoint, orientation, selectedPlane);
      if (layout[this.selectedLabelIndex].vertex[bottomIndex] < selectedInteractPoint[1]
            && layout[this.selectedLabelIndex].vertex[topIndex] >= selectedInteractPoint[1]
            && layout[this.selectedLabelIndex].vertex[leftIndex] < selectedInteractPoint[0]
            && layout[this.selectedLabelIndex].vertex[rightIndex] >= selectedInteractPoint[0]) { 
        // Stare 1.5 seconds to trigger click.
        if (new Date().getTime() - this.clock > 1500) {
          this.clickedLabel = layout[this.selectedLabelIndex].name;
          isAdvancedSettings = layout[this.selectedLabelIndex].isAdvancedSettings;
          this.selectedLabelIndex = -1;
        }
        return { name : this.clickedLabel, isAdvancedSettings : isAdvancedSettings};
      }
    }

    if (interactPoint[0] < menuLeftBound || interactPoint[0] > menuRightBound || interactPoint[1] > menuTopBound) { 
      this.selectedLabelIndex = -1;
      return;
    }
    if (this.option) {
      if (interactPoint[1] < menuBottomBoundWithAdvancedSettings) {
        this.selectedLabelIndex = -1;
        return;
      }
      for (var index in layout) {
        if (layout[index].clickable
              && layout[index].vertex[bottomIndex] < interactPoint[1] 
              && layout[index].vertex[topIndex] >= interactPoint[1]
              && layout[index].vertex[leftIndex] < interactPoint[0]
              && layout[index].vertex[rightIndex] >= interactPoint[0]) {
          this.clock = new Date().getTime();
          this.selectedLabelIndex = index;
          return;
        }
      }
    } else {
      if (interactPoint[1] < menuBottomBoundWithoutAdvancedSettings) {
        this.selectedLabelIndex = -1;
        return;
      }
      for (var index in layout) {
        if (layout[index].clickable
              && layout[index].vertex[bottomIndex] < interactPoint[1]
              && layout[index].vertex[topIndex] >= interactPoint[1]
              && layout[index].vertex[leftIndex] < interactPoint[0]
              && layout[index].vertex[rightIndex] >= interactPoint[0]) {
          this.clock = new Date().getTime();
          this.selectedLabelIndex = index;
          return;
        }
      }
    }
    this.selectedLabelIndex = -1;
    return;
  }

  Menu.prototype.setFps = function(fps) {
    this.fps = fps + "FP5";
  }

  Menu.prototype.changeMode = function() {
    this.isMenuMode = !this.isMenuMode;
  }

  Menu.prototype.queryGamepadStatus = function() {
    this.gamepads.update();
    if (this.gamepads.clicked) {
      this.isMenuMode = !this.isMenuMode;
    }
  }

  return Menu;
})();
