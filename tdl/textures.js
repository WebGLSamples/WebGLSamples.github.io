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
 * @fileoverview This file contains objects to manage textures.
 */

tdl.provide('tdl.textures');

/**
 * A module for textures.
 * @namespace
 */
tdl.textures = tdl.textures || {};

/**
 * All the textures currently loaded.
 * @type {!Object.<string, !tdl.textures.Texture>}
 */
tdl.textures.textureDB = {};

/**
 * Loads a texture
 * @param {{!tdl.math.Vector4|string|!Array.<string>|!img|!canvas}} Passing a
 *        color makes a solid 1pixel 2d texture, passing a URL
 *        makes a 2d texture with that url, passing an array of
 *        urls makes a cubemap, passing an img or canvas makes a 2d texture with
 *        that image.
 */
tdl.textures.loadTexture = function(arg) {
  var texture = tdl.textures.textureDB[arg.toString()];
  if (texture) {
    return texture;
  }
  if (typeof arg == 'string') {
    texture = new tdl.textures.Texture2D(arg);
  } else if (arg.length == 4 && typeof arg[0] == 'number') {
    texture = new tdl.textures.SolidTexture(arg);
  } else if (arg.length == 6 && typeof arg[0] == 'string') {
    texture = new tdl.textures.CubeMap(arg);
  } else if (arg.tagName == 'CANVAS' || arg.tagName == 'IMG') {
    texture = new tdl.textures.Texture2D(arg);
  } else if (arg.width) {
    texture = new tdl.textures.ColorTexture2D(arg);
  } else {
    throw "bad args";
  }
  tdl.textures.textureDB[arg.toString()] = texture;
  return texture;
};

tdl.textures.Texture = function(target) {
  this.target = target;
  this.texture = gl.createTexture();
  this.params = { };
};

tdl.textures.Texture.prototype.setParameter = function(pname, value) {
  this.params[pname] = value;
  gl.bindTexture(this.target, this.texture);
  gl.texParameteri(this.target, pname, value);
};

tdl.textures.Texture.prototype.recoverFromLostContext = function() {
  this.texture = gl.createTexture();
  gl.bindTexture(this.target, this.texture);
  for (var pname in this.params) {
    gl.texParameteri(this.target, pname, this.params[pname]);
  }
};

/**
 * A solid color texture.
 * @constructor
 * @param {!tdl.math.vector4} color.
 */
tdl.textures.SolidTexture = function(color) {
  tdl.textures.Texture.call(this, gl.TEXTURE_2D);
  this.color = color.slice(0, 4);
  this.uploadTexture();
};

tdl.base.inherit(tdl.textures.SolidTexture, tdl.textures.Texture);

tdl.textures.SolidTexture.prototype.uploadTexture = function() {
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  var pixel = new Uint8Array(this.color);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
};

tdl.textures.SolidTexture.prototype.recoverFromLostContext = function() {
  tdl.textures.Texture.recoverFromLostContext.call(this);
  this.uploadTexture();
};

tdl.textures.SolidTexture.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
};

/**
 * A color from an array of values texture.
 * @constructor
 * @param {!{width: number, height: number: pixels:
 *        !Array.<number>} data.
 */
tdl.textures.ColorTexture = function(data, opt_format, opt_type) {
  tdl.textures.Texture.call(this, gl.TEXTURE_2D);
  this.format = opt_format || gl.RGBA;
  this.type   = opt.type || gl.UNSIGNED_BYTE;
  if (data.pixels instanceof Array) {
    data.pixels = new Uint8Array(data.pixels);
  }
  this.data   = data;
  this.uploadTexture();
};

tdl.base.inherit(tdl.textures.ColorTexture, tdl.textures.Texture);

tdl.textures.ColorTexture.prototype.uploadTexture = function() {
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, this.format, this.data.width, this.data.height,
    0, this.format, this.type, this.data.pixels);
};

tdl.textures.ColorTexture.prototype.recoverFromLostContext = function() {
  tdl.textures.Texture.recoverFromLostContext.call(this);
  this.uploadTexture();
};

tdl.textures.ColorTexture.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
};

/**
 * @constructor
 * @param {{string|!Element}} url URL of image to load into texture.
 * @param {*} opt_updateOb Object with update function to call
 *     when texture is updated with image.
 */
tdl.textures.Texture2D = function(url, opt_updateOb) {
  tdl.textures.Texture.call(this, gl.TEXTURE_2D);
  var that = this;
  var img
  if (typeof url !== 'string') {
    img = url;
    this.loaded = true;
  } else {
    img = document.createElement('img');
    img.onload = function() {
      that.updateTexture();
    }
  }
  this.img = img;
  this.updateOb = opt_updateOb;
  this.uploadTexture();

  if (!this.loaded) {
    img.src = url;
  }
};

tdl.base.inherit(tdl.textures.Texture2D, tdl.textures.Texture);

tdl.textures.Texture2D.prototype.uploadTexture = function() {
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  if (this.loaded) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    var pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
  }
};

tdl.textures.Texture2D.prototype.updateTexture = function() {
  this.loaded = true;
  this.uploadTexture();
  if (this.updateOb) {
    this.updateOb.update();
  }
};

tdl.textures.Texture2D.prototype.recoverFromLostContext = function() {
  tdl.textures.Texture.recoverFromLostContext.call(this);
  this.uploadTexture();
};

tdl.textures.Texture2D.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
};

/**
 * Create a texture to be managed externally.
 * @constructor
 * @param {string} type GL enum for texture type.
 */
tdl.textures.ExternalTexture = function(type) {
  tdl.textures.Texture.call(this, type);
  this.type = type;
};

tdl.base.inherit(tdl.textures.ExternalTexture, tdl.textures.Texture);

tdl.textures.ExternalTexture.prototype.recoverFromLostContext = function() {
};

tdl.textures.ExternalTexture.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(this.type, this.texture);
}

/**
 * Create a 2D texture to be managed externally.
 * @constructor
 */
tdl.textures.ExternalTexture2D = function() {
  tdl.textures.ExternalTexture.call(this, gl.TEXTURE_2D);
};

tdl.base.inherit(tdl.textures.ExternalTexture2D, tdl.textures.ExternalTexture);

/**
 * Create and load a CubeMap.
 * @constructor
 * @param {!Array.<string>} urls The urls of the 6 faces, which
 *     must be in the order positive_x, negative_x positive_y,
 *     negative_y, positive_z, negative_Z
 * @param {*} opt_updateOb Object with update function to call
 *     when images have been uploaded into texture.
 */
tdl.textures.CubeMap = function(urls, opt_updateOb) {
  tdl.textures.Texture.call(this, gl.TEXTURE_CUBE_MAP);
  // TODO(gman): make this global.
  if (!tdl.textures.CubeMap.faceTargets) {
    tdl.textures.CubeMap.faceTargets = [
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
  }
  var faceTargets = tdl.textures.CubeMap.faceTargets;
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  this.updateOb = opt_updateOb;
  this.faces = [];
  var that = this;
  for (var ff = 0; ff < faceTargets.length; ++ff) {
    var face = { };
    this.faces[ff] = face;
    var img = document.createElement('img');
    face.img = img;
    img.onload = function(faceIndex) {
      return function() {
        that.updateTexture(faceIndex);
      }
    } (ff);
    img.src = urls[ff];
  }
  this.uploadTextures();
};

tdl.base.inherit(tdl.textures.CubeMap, tdl.textures.Texture);

/**
 * Check if all 6 faces are loaded.
 * @return {boolean} true if all 6 faces are loaded.
 */
tdl.textures.CubeMap.prototype.loaded = function() {
  for (var ff = 0; ff < this.faces.length; ++ff) {
    if (!this.faces[ff].loaded) {
      return false;
    }
  }
  return true;
};

/**
 * Uploads the images to the texture.
 */
tdl.textures.CubeMap.prototype.uploadTextures = function() {
  var all6FacesLoaded = this.loaded();
  var faceTargets = tdl.textures.CubeMap.faceTargets;
  for (var faceIndex = 0; faceIndex < this.faces.length; ++faceIndex) {
    var face = this.faces[faceIndex];
    var target = faceTargets[faceIndex];
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
    if (all6FacesLoaded) {
      gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, face.img);
    } else {
      var pixel = new Uint8Array([100,100,255,255]);
      gl.texImage2D(target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    }
  }
  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
};

/**
 * Recover from lost context.
 */
tdl.textures.CubeMap.prototype.recoverFromLostContext = function() {
  tdl.textures.Texture.recoverFromLostContext.call(this);
  this.uploadTextures();
};

/**
 * Update a just downloaded loaded texture.
 * @param {number} faceIndex index of face.
 */
tdl.textures.CubeMap.prototype.updateTexture = function(faceIndex) {
  // mark the face as loaded
  var face = this.faces[faceIndex];
  face.loaded = true;
  // If all 6 faces are loaded then upload to GPU.
  var loaded = this.loaded();
  if (loaded) {
    this.uploadTextures();
    if (this.updateOb) {
      this.updateOb.update();
    }
  }
};

/**
 * Binds the CubeMap to a texture unit
 * @param {number} unit The texture unit.
 */
tdl.textures.CubeMap.prototype.bindToUnit = function(unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
};


