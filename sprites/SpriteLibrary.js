/*
 * Copyright 2011, Google Inc.
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

//----------------------------------------------------------------------
// Helpers
//

function getScriptText(id) {
  //tdl.log("loading: ", id);
  var elem = document.getElementById(id);
  if (!elem) {
    throw 'no element: ' + id
  }
  return elem.text;
}

function loadShader(shaderSource, shaderType) {
  // Create the shader object
  var shader = gl.createShader(shaderType);
  if (shader == null) {
    throw "Error: unable to create shader";
  }

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    lastError = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw "Error compiling shader '" + shaderSource + "': " + lastError;
  }

  return shader;
}


//----------------------------------------------------------------------
// SpriteSheet
//

function SpriteSheet(atlas, name, params) {
  this.atlas_ = atlas;
  this.name_ = name;
  this.params_ = params;
  this.textureUnit_ = 0;
  this.perSpriteFrameOffset_ = 0;
}

SpriteSheet.prototype.startLoading = function() {
  var that = this;
  var image = new Image();
  this.image_ = image;
  image.onload = function() {
    that.onload_();
  };
  image.src = this.params_.url;
};

SpriteSheet.prototype.initialize = function(textureUnit, width, height) {
  this.textureUnit_ = textureUnit;
  this.textureWidth_ = width;
  this.textureHeight_ = height;
};

SpriteSheet.prototype.createSprite = function(system) {
  var screenWidth = system.screenWidth();
  var screenHeight = system.screenHeight();
  // Position the sprite at a random position
  var centerX = Math.random() * screenWidth;
  var centerY = Math.random() * screenHeight;
  // And at a random rotation
  var rotation = Math.random() * 2.0 * Math.PI;
  // Random velocity
  var velocityX = Math.random() * (screenWidth / 5.0) - screenWidth / 10.0;
  var velocityY = Math.random() * (screenHeight / 5.0) - screenHeight / 10.0;
  var perSpriteFrameOffset = this.perSpriteFrameOffset_++;
  if (this.perSpriteFrameOffset_ >= this.params_.frames) {
    this.perSpriteFrameOffset_ = 0;
  }
  // Generalize the sprite size to vec2 if sprites are non-square.
  var spriteSize = this.params_.width;
  var spriteTextureSizeX = (1.0 * this.params_.width) / this.textureWidth_;
  var spriteTextureSizeY = (1.0 * this.params_.height) / this.textureHeight_;
  var spritesPerRow = this.params_.spritesPerRow;
  var numFrames = this.params_.frames;
  var textureWeights = [ 0.0, 0.0, 0.0, 0.0 ];
  textureWeights[this.textureUnit_] = 1.0;
  system.addSprite(centerX, centerY,
                   rotation,
                   velocityX, velocityY,
                   perSpriteFrameOffset,
                   spriteSize,
                   spriteTextureSizeX, spriteTextureSizeY,
                   spritesPerRow,
                   numFrames,
                   textureWeights);
};

SpriteSheet.prototype.onload_ = function() {
  this.atlas_.spriteSheetLoaded_(this, this.image_, this.params_);
};

//----------------------------------------------------------------------
// SpriteAtlas
//

function SpriteAtlas() {
  this.onload = null;
  this.numOutstandingRequests_ = 0;
  this.spriteSheets_ = [];
  this.textures_ = [];
  this.currentTextureUnit_ = 0;
}

SpriteAtlas.prototype.addSpriteSheet = function(name, params) {
  this.spriteSheets_.push(new SpriteSheet(this, name, params));
};

SpriteAtlas.prototype.startLoading = function() {
  var len = this.spriteSheets_.length;
  this.numOutstandingRequests_ = len;
  for (var ii = 0; ii < len; ++ii) {
    this.spriteSheets_[ii].startLoading();
  }
};

SpriteAtlas.prototype.numSpriteSheets = function() {
  return this.spriteSheets_.length;
};

SpriteAtlas.prototype.getSpriteSheet = function(i) {
  return this.spriteSheets_[i];
};

SpriteAtlas.prototype.bindTextures = function() {
  for (var ii = 0; ii < this.currentTextureUnit_; ++ii) {
    gl.activeTexture(gl.TEXTURE0 + ii);
    gl.bindTexture(gl.TEXTURE_2D, this.textures_[ii]);
  }
};

SpriteAtlas.prototype.spriteSheetLoaded_ = function(sheet, image, params) {
  // Upload the sprite sheet into a texture. This is where we would
  // coalesce different sprites' animations into a single texture to
  // reduce the number of texture fetches we need to do in the
  // fragment shader.
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
//  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
  sheet.initialize(this.currentTextureUnit_, image.width, image.height);
  this.textures_[this.currentTextureUnit_] = texture;
  ++this.currentTextureUnit_;

  if (--this.numOutstandingRequests_ == 0) {
    if (this.onload) {
      this.onload();
    }
  }
};

//----------------------------------------------------------------------
// SpriteSystem
//

// "options" is a JavaScript object containing key/value pairs. The
// current options the sprite system watches for are:
//   slow: [true|false]   Whether to use the legacy bandwidth-intensive shader for comparison purposes.
function SpriteSystem(options) {
  SpriteSystem.initialize_();
  this.dumpOffsets();
  this.loadProgram_(options);
  this.frameOffset_ = 0;
  this.spriteBuffer_ = gl.createBuffer();
  this.clearAllSprites();
}

SpriteSystem.prototype.clearAllSprites = function() {
  // Might as well choose an even multiple of 6, which is the number
  // of vertices per sprite
  this.resizeCapacity_(120, false);
  this.frameOffset_ = 0;
  this.numVertices_ = 0;
  this.precisePositionView_ = null;
};

SpriteSystem.prototype.loadProgram_ = function(options) {
  var fragmentShaderName = (options && options['slow']) ? 'slowSpriteFragmentShader' : 'spriteFragmentShader';
  console.log("SpriteSystem using fragment shader " + fragmentShaderName);
  var vertexShader = loadShader(getScriptText('spriteVertexShader'), gl.VERTEX_SHADER);
  var fragmentShader = loadShader(getScriptText(fragmentShaderName), gl.FRAGMENT_SHADER);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    var error = gl.getProgramInfoLog(program);
    throw "Error in program linking:" + error;
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  this.program_ = program;

  this.frameOffsetLoc_ = gl.getUniformLocation(program, "u_frameOffset");
  this.screenDimsLoc_ = gl.getUniformLocation(program, "u_screenDims");

  this.centerPositionLoc_ = gl.getAttribLocation(program, "centerPosition");
  this.rotationLoc_ = gl.getAttribLocation(program, "rotation");
  this.perSpriteFrameOffsetLoc_ = gl.getAttribLocation(program, "perSpriteFrameOffset");
  this.spriteSizeLoc_ = gl.getAttribLocation(program, "spriteSize");
  this.cornerOffsetLoc_ = gl.getAttribLocation(program, "cornerOffset");
  this.spriteTextureSizeLoc_ = gl.getAttribLocation(program, "spriteTextureSize");
  this.spritesPerRowLoc_ = gl.getAttribLocation(program, "spritesPerRow");
  this.numFramesLoc_ = gl.getAttribLocation(program, "numFrames");
  this.textureWeightsLoc_ = gl.getAttribLocation(program, "textureWeights");

  this.texture0Loc_ = gl.getUniformLocation(program, "u_texture0");
  this.texture1Loc_ = gl.getUniformLocation(program, "u_texture1");
  this.texture2Loc_ = gl.getUniformLocation(program, "u_texture2");
  this.texture3Loc_ = gl.getUniformLocation(program, "u_texture3");
};

SpriteSystem.prototype.resizeCapacity_ = function(capacity, preserveOldContents) {
  // Capacity is actually specified in vertices.
  var oldPositionData = null;
  var oldConstantData = null;
  var oldStartPositionData = null;
  var oldVelocityData = null;
  var oldSpriteSizeData = null;
  if (preserveOldContents) {
    oldPositionData = this.positionData_;
    oldConstantData = this.constantData_;
    oldStartPositionData = this.startPositionData_;
    oldVelocityData = this.velocityData_;
    oldSpriteSizeData = this.spriteSizeData_;
  }

  this.capacity_ = capacity;
  this.positionData_ = new Float32Array(2 * capacity);
  this.constantData_ = new Float32Array(SpriteSystem.constantAttributeStride_ * capacity);
  // Keep the starting positions, velocities and sprite sizes around
  // in pure JS arrays as a concession to browsers where reads from
  // Float32Array aren't fast. This should not be necessary for much
  // longer.
  this.startPositionData_ = new Array(2 * capacity);
  this.velocityData_ = new Array(2 * capacity);
  this.spriteSizeData_ = new Array(capacity);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.spriteBuffer_);
  gl.bufferData(gl.ARRAY_BUFFER,
                Float32Array.BYTES_PER_ELEMENT * (this.positionData_.length + this.constantData_.length),
                gl.DYNAMIC_DRAW);

  if (preserveOldContents) {
    this.positionData_.set(oldPositionData);
    this.constantData_.set(oldConstantData);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positionData_);
    gl.bufferSubData(gl.ARRAY_BUFFER, Float32Array.BYTES_PER_ELEMENT * this.positionData_.length, this.constantData_);

    for (var ii = 0; ii < oldStartPositionData.length; ++ii) {
      this.startPositionData_[ii] = oldStartPositionData[ii];
    }
    for (var ii = 0; ii < oldVelocityData.length; ++ii) {
      this.velocityData_[ii] = oldVelocityData[ii];
    }
    for (var ii = 0; ii < oldSpriteSizeData.length; ++ii) {
      this.spriteSizeData_[ii] = oldSpriteSizeData[ii];
    }
  }
};

// The vertex attributes are laid out in the buffer in the following way:
// Block 1:
//   centerPosition
// Block 2 (interleaved):
//   rotation
//   spriteSize
//   cornerOffset
//   spriteTextureSize
//   spritesPerRow
//   numFrames
//
// The reason is that we want to be able to update the positions of
// the sprites independently, since the rest of the data for each
// sprite is constant after creation. We are doing the integration of
// the velocity in JavaScript to prove that it can be done at high
// speed, but in a special case like the JSGameBench scenario where
// sprites just move in a straight line, it would be much more
// efficient to send down a uniform time parameter and compute the
// position in the vertex shader, since then we would not need to
// iterate over all particles per frame and would not need to send
// down per-particle information per frame.

// These offsets are in units of floating-point numbers.
SpriteSystem.constantAttributeInfo_ = [
  { size: 1, offset: 0 }, // Rotation
  { size: 1, offset: 0 }, // Per-sprite frame offset
  { size: 1, offset: 0 }, // Sprite size
  { size: 2, offset: 0 }, // Corner offset
  { size: 2, offset: 0 }, // Sprite texture size
  { size: 1, offset: 0 }, // Sprites per row
  { size: 1, offset: 0 }, // Num frames
  { size: 4, offset: 0 }  // Texture weights
];
SpriteSystem.constantAttributeStride_ = 0;

SpriteSystem.ROTATION_INDEX = 0;
SpriteSystem.PER_SPRITE_FRAME_OFFSET_INDEX = 1;
SpriteSystem.SPRITE_SIZE_INDEX = 2;
SpriteSystem.CORNER_OFFSET_INDEX = 3;
SpriteSystem.SPRITE_TEXTURE_SIZE_INDEX = 4;
SpriteSystem.SPRITES_PER_ROW_INDEX = 5;
SpriteSystem.NUM_FRAMES_INDEX = 6;
SpriteSystem.TEXTURE_WEIGHTS_INDEX = 7;

SpriteSystem.offsetForIndex = function(index) {
  return SpriteSystem.constantAttributeInfo_[index].offset;
};

SpriteSystem.initialized_ = false;

SpriteSystem.initialize_ = function() {
  if (SpriteSystem.initialized_)
    return;
  console.log("Initializing globals for SpriteSystem");
  var constantAttributeInfo = SpriteSystem.constantAttributeInfo_;
  var cumulativeOffset = 0;
  for (var ii = 0; ii < constantAttributeInfo.length; ++ii) {
    constantAttributeInfo[ii].offset = cumulativeOffset;
    cumulativeOffset += constantAttributeInfo[ii].size;
  }
  SpriteSystem.constantAttributeStride_ = cumulativeOffset;  
  SpriteSystem.initialized_ = true;
};

SpriteSystem.prototype.dumpOffsets = function() {
  var constantAttributeInfo = SpriteSystem.constantAttributeInfo_;
  for (var ii = 0; ii < constantAttributeInfo.length; ++ii) {
    console.log("Attribute at index " + ii + ": size = " + constantAttributeInfo[ii].size + ", offset = " + constantAttributeInfo[ii].offset);
  }
  console.log("Constant attribute stride = " + SpriteSystem.constantAttributeStride_);
};

SpriteSystem.offsets_ = [
  [-0.5, -0.5],
  [-0.5,  0.5],
  [ 0.5, -0.5],
  [ 0.5, -0.5],
  [-0.5,  0.5],
  [ 0.5,  0.5]
];

SpriteSystem.prototype.setScreenSize = function(width, height) {
  this.screenWidth_ = width;
  this.screenHeight_ = height;
};

SpriteSystem.prototype.screenWidth = function() {
  return this.screenWidth_;
};

SpriteSystem.prototype.screenHeight = function() {
  return this.screenHeight_;
};

SpriteSystem.prototype.addSprite = function(centerX, centerY,
                                            rotation,
                                            velocityX, velocityY,
                                            perSpriteFrameOffset,
                                            spriteSize,
                                            spriteTextureSizeX, spriteTextureSizeY,
                                            spritesPerRow,
                                            numFrames,
                                            textureWeights) {
  var offsets = SpriteSystem.offsets_;
  for (var ii = 0; ii < offsets.length; ++ii) {
    this.addVertex_(centerX, centerY,
                    rotation,
                    velocityX, velocityY,
                    perSpriteFrameOffset,
                    spriteSize,
                    offsets[ii][0], offsets[ii][1],
                    spriteTextureSizeX, spriteTextureSizeY,
                    spritesPerRow,
                    numFrames,
                    textureWeights);
  }
};

SpriteSystem.prototype.setupConstantLoc_ = function(location, index) {
  if (location == -1)
    return; // Debugging
  var baseOffset = Float32Array.BYTES_PER_ELEMENT * this.positionData_.length;
  var constantStride = SpriteSystem.constantAttributeStride_;
  var constantAttributeInfo = SpriteSystem.constantAttributeInfo_;
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location,
                         constantAttributeInfo[index].size, gl.FLOAT, false,
                         constantStride * Float32Array.BYTES_PER_ELEMENT,
                         baseOffset + Float32Array.BYTES_PER_ELEMENT * constantAttributeInfo[index].offset);
};

SpriteSystem.prototype.draw = function(atlas, deltaTime) {
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  // Recompute all sprites' positions. Wrap around offscreen.
  var numVertices = this.numVertices_;
  for (var ii = 0; ii < numVertices; ++ii) {
    var newPosX = this.startPositionData_[2 * ii] + deltaTime * this.velocityData_[2 * ii];
    var newPosY = this.startPositionData_[2 * ii + 1] + deltaTime * this.velocityData_[2 * ii + 1];

    var spriteSize = this.spriteSizeData_[ii];
    if (newPosX > canvas.width + 1.1 * spriteSize) {
      newPosX = -spriteSize;
    } else if (newPosX < -1.1 * spriteSize) {
      newPosX = canvas.width + spriteSize;
    }

    if (newPosY > canvas.height + 1.1 * spriteSize) {
      newPosY = -spriteSize;
    } else if (newPosY < -1.1 * spriteSize) {
      newPosY = canvas.height + spriteSize;
    }

    this.startPositionData_[2 * ii] = newPosX;
    this.startPositionData_[2 * ii + 1] = newPosY;
    this.positionData_[2 * ii] = newPosX;
    this.positionData_[2 * ii + 1] = newPosY;
  }

  // Upload all sprites' positions.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.spriteBuffer_);
  if (!this.precisePositionView_ || this.precisePositionView_.length != 2 * numVertices) {
    this.precisePositionView_ = this.positionData_.subarray(0, 2 * numVertices);
  }
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.precisePositionView_);

  // Bind all textures.
  atlas.bindTextures();

  // Prepare to draw.
  gl.useProgram(this.program_);

  // Set up streams.
  gl.enableVertexAttribArray(this.centerPositionLoc_);
  gl.vertexAttribPointer(this.centerPositionLoc_, 2, gl.FLOAT, false, 0, 0);
  this.setupConstantLoc_(this.rotationLoc_, SpriteSystem.ROTATION_INDEX);
  this.setupConstantLoc_(this.perSpriteFrameOffsetLoc_, SpriteSystem.PER_SPRITE_FRAME_OFFSET_INDEX);
  this.setupConstantLoc_(this.spriteSizeLoc_, SpriteSystem.SPRITE_SIZE_INDEX);
  this.setupConstantLoc_(this.cornerOffsetLoc_, SpriteSystem.CORNER_OFFSET_INDEX);
  this.setupConstantLoc_(this.spriteTextureSizeLoc_, SpriteSystem.SPRITE_TEXTURE_SIZE_INDEX);
  this.setupConstantLoc_(this.spritesPerRowLoc_, SpriteSystem.SPRITES_PER_ROW_INDEX);
  this.setupConstantLoc_(this.numFramesLoc_, SpriteSystem.NUM_FRAMES_INDEX);
  this.setupConstantLoc_(this.textureWeightsLoc_, SpriteSystem.TEXTURE_WEIGHTS_INDEX);

  // Set up uniforms.
  gl.uniform1f(this.frameOffsetLoc_, this.frameOffset_++);
  gl.uniform4f(this.screenDimsLoc_,
               2.0 / this.screenWidth_,
               -2.0 / this.screenHeight_,
               -1.0,
               1.0);
  // FIXME: query atlas for the number of textures.
  gl.uniform1i(this.texture0Loc_, 0);
  gl.uniform1i(this.texture1Loc_, 1);
  gl.uniform1i(this.texture2Loc_, 2);
  gl.uniform1i(this.texture3Loc_, 3);

  // Do the draw call.
  gl.drawArrays(gl.TRIANGLES, 0, this.numVertices_);
};

SpriteSystem.prototype.addVertex_ = function(centerX, centerY,
                                             rotation,
                                             velocityX, velocityY,
                                             perSpriteFrameOffset,
                                             spriteSize,
                                             cornerOffsetX, cornerOffsetY,
                                             spriteTextureSizeX, spriteTextureSizeY,
                                             spritesPerRow,
                                             numFrames,
                                             textureWeights) {
  if (this.numVertices_ == this.capacity_) {
    this.resizeCapacity_(this.capacity_ * 2, true);
  }

  var vertexIndex = this.numVertices_;
  ++this.numVertices_;

  this.positionData_[2 * vertexIndex    ] = centerX;
  this.positionData_[2 * vertexIndex + 1] = centerY;
  this.startPositionData_[2 * vertexIndex    ] = centerX;
  this.startPositionData_[2 * vertexIndex + 1] = centerY;
  this.velocityData_[2 * vertexIndex    ] = velocityX;
  this.velocityData_[2 * vertexIndex + 1] = velocityY;
  this.spriteSizeData_[vertexIndex] = spriteSize;
  
  // Base index into the constant data
  var baseIndex = SpriteSystem.constantAttributeStride_ * vertexIndex;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.ROTATION_INDEX)] = rotation;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.PER_SPRITE_FRAME_OFFSET_INDEX)] = perSpriteFrameOffset;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.SPRITE_SIZE_INDEX)] = spriteSize;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.CORNER_OFFSET_INDEX)    ] = cornerOffsetX;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.CORNER_OFFSET_INDEX) + 1] = cornerOffsetY;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.SPRITE_TEXTURE_SIZE_INDEX)    ] = spriteTextureSizeX;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.SPRITE_TEXTURE_SIZE_INDEX) + 1] = spriteTextureSizeY;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.SPRITES_PER_ROW_INDEX)] = spritesPerRow;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.NUM_FRAMES_INDEX)] = numFrames;
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.TEXTURE_WEIGHTS_INDEX)    ] = textureWeights[0];
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.TEXTURE_WEIGHTS_INDEX) + 1] = textureWeights[1];
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.TEXTURE_WEIGHTS_INDEX) + 2] = textureWeights[2];
  this.constantData_[baseIndex + SpriteSystem.offsetForIndex(SpriteSystem.TEXTURE_WEIGHTS_INDEX) + 3] = textureWeights[3];

  // Upload the changes to the constant data immediately, since we
  // won't touch it again.
  gl.bindBuffer(gl.ARRAY_BUFFER, this.spriteBuffer_);
  gl.bufferSubData(gl.ARRAY_BUFFER,
                   Float32Array.BYTES_PER_ELEMENT * (this.positionData_.length + baseIndex),
                   this.constantData_.subarray(baseIndex, baseIndex + SpriteSystem.constantAttributeStride_));
};
