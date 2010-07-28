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
 * @fileoverview This file contains various functions and classes for rendering
 * gpu based particles.
 *
 * TODO: Add 3d oriented particles.
 */

tdl.provide('tdl.particles');

tdl.require('tdl.math');
tdl.require('tdl.programs');
tdl.require('tdl.textures');

/**
 * A Module with various GPU particle functions and classes.
 * Note: GPU particles have the issue that they are not sorted per particle
 * but rather per emitter.
 * @namespace
 */
tdl.particles = tdl.particles || {};

/**
 * Particle Effect strings
 * @type {!Array.<{name: string, fxString: string}>}
 */
tdl.particles.FX_STRINGS_GLSL = [
  { name: 'particle3d', shaders: {
    vertexShader: '' +
    'uniform mat4 world;\n' +
    'uniform mat4 worldViewProjection;\n' +
    'uniform vec3 worldVelocity;\n' +
    'uniform vec3 worldAcceleration;\n' +
    'uniform float timeRange;\n' +
    'uniform float time;\n' +
    'uniform float timeOffset;\n' +
    'uniform float frameDuration;\n' +
    'uniform float numFrames;\n' +
    '\n' +
    'attribute vec4 position; // uv, lifeTime, frameStart\n' +
    'attribute vec4 texCoord0; // position.xyz, startTime\n' +
    'attribute vec4 texCoord1; // velocity.xyz, startSize\n' +
    'attribute vec4 texCoord2; // acceleration.xyz, endSize\n' +
    'attribute vec4 texCoord3; // spinStart.x, spinSpeed.y\n' +
    'attribute vec4 texCoord4; // orientation\n' +
    'attribute vec4 color; //\n' +
    '\n' +
    'varying vec4 v_position;\n' +
    'varying vec2 v_texcoord;\n' +
    'varying float v_percentLife;\n' +
    'varying vec4 v_colorMult;\n' +
    '\n' +
    'void main() {\n' +
    '  vec4 uvLifeTimeFrameStart = position;\n' +
    '  vec4 positionStartTime = texCoord0;\n' +
    '  vec4 velocityStartSize = texCoord1;\n' +
    '  vec4 accelerationEndSize = texCoord2;\n' +
    '  vec4 spinStartSpinSpeed = texCoord3;\n' +
    '  vec4 orientation = texCoord4;\n' +
    '  vec4 colorMult = color;\n' +
    '  vec2 uv = uvLifeTimeFrameStart.xy;\n' +
    '  float lifeTime = uvLifeTimeFrameStart.z;\n' +
    '  float frameStart = uvLifeTimeFrameStart.w;\n' +
    '  vec3 position = positionStartTime.xyz;\n' +
    '  float startTime = positionStartTime.w;\n' +
    '  vec3 velocity = (world * vec4(velocityStartSize.xyz, 0)).xyz\n' +
    '      + worldVelocity;\n' +
    '  float startSize = velocityStartSize.w;\n' +
    '  vec3 acceleration = (world *\n' +
    '      vec4(accelerationEndSize.xyz, 0)).xyz + worldAcceleration;\n' +
    '  float endSize = accelerationEndSize.w;\n' +
    '  float spinStart = spinStartSpinSpeed.x;\n' +
    '  float spinSpeed = spinStartSpinSpeed.y;\n' +
    '\n' +
    '  float localTime = mod((time - timeOffset - startTime),\n' +
    '      timeRange);\n' +
    '  float percentLife = localTime / lifeTime;\n' +
    '\n' +
    '  float frame = mod(floor(localTime / frameDuration + frameStart),\n' +
    '                     numFrames);\n' +
    '  float uOffset = frame / numFrames;\n' +
    '  float u = uOffset + (uv.x + 0.5) * (1.0 / numFrames);\n' +
    '\n' +
    '  v_texcoord = vec2(u, uv.y + 0.5);\n' +
    '  v_colorMult = colorMult;\n' +
    '\n' +
    '  float size = mix(startSize, endSize, percentLife);\n' +
    '  size = (percentLife < 0.0 || percentLife > 1.0) ? 0.0 : size;\n' +
    '  float s = sin(spinStart + spinSpeed * localTime);\n' +
    '  float c = cos(spinStart + spinSpeed * localTime);\n' +
    '\n' +
    '  vec4 rotatedPoint = vec4((uv.x * c + uv.y * s) * size, 0.0,\n' +
    '                               (uv.x * s - uv.y * c) * size, 1.0);\n' +
    '  vec3 center = velocity * localTime +\n' +
    '                  acceleration * localTime * localTime + \n' +
    '                  position;\n' +
    '  \n' +
    '      vec4 q2 = orientation + orientation;\n' +
    '      vec4 qx = orientation.xxxw * q2.xyzx;\n' +
    '      vec4 qy = orientation.xyyw * q2.xyzy;\n' +
    '      vec4 qz = orientation.xxzw * q2.xxzz;\n' +
    '  \n' +
    '      mat4 localMatrix = mat4(\n' +
    '        (1.0 - qy.y) - qz.z, \n' +
    '        qx.y + qz.w, \n' +
    '        qx.z - qy.w,\n' +
    '        0,\n' +
    '  \n' +
    '        qx.y - qz.w, \n' +
    '        (1.0 - qx.x) - qz.z, \n' +
    '        qy.z + qx.w,\n' +
    '        0,\n' +
    '  \n' +
    '        qx.z + qy.w, \n' +
    '        qy.z - qx.w, \n' +
    '        (1.0 - qx.x) - qy.y,\n' +
    '        0,\n' +
    '  \n' +
    '        center.x, center.y, center.z, 1.0);\n' +
    '  rotatedPoint = localMatrix * rotatedPoint;\n' +
    '  gl_Position = worldViewProjection * rotatedPoint;\n' +
    '  v_percentLife = percentLife;\n' +
    '}\n',
    fragmentShader: '' +
    '#ifdef GL_ES\n' +
    'precision highp float;\n' +
    '#endif\n' +
    'varying vec4 v_position;\n' +
    'varying vec2 v_texcoord;\n' +
    'varying float v_percentLife;\n' +
    'varying vec4 v_colorMult;\n' +
    '\n' +
    '// We need to implement 1D!\n' +
    'uniform sampler2D rampSampler;\n' +
    'uniform sampler2D colorSampler;\n' +
    '\n' +
    'void main() {\n' +
    '  vec4 colorMult = texture2D(rampSampler, \n' +
    '      vec2(v_percentLife, 0.5)) * v_colorMult;\n' +
    '  vec4 color = texture2D(colorSampler, v_texcoord) * colorMult;\n' +
    '  gl_FragColor = color;\n' +
    '}\n' +
    '\n'}
  },
  { name: 'particle2d', shaders{
    vertexShader: '' +
    'uniform mat4 viewProjection;\n' +
    'uniform mat4 world;\n' +
    'uniform mat4 viewInverse;\n' +
    'uniform vec3 worldVelocity;\n' +
    'uniform vec3 worldAcceleration;\n' +
    'uniform float timeRange;\n' +
    'uniform float time;\n' +
    'uniform float timeOffset;\n' +
    'uniform float frameDuration;\n' +
    'uniform float numFrames;\n' +
    '\n' +
    'attribute vec4 position; // uv, lifeTime, frameStart\n' +
    'attribute vec4 texCoord0; // position.xyz, startTime\n' +
    'attribute vec4 texCoord1; // velocity.xyz, startSize\n' +
    'attribute vec4 texCoord2; // acceleration.xyz, endSize\n' +
    'attribute vec4 texCoord3; // spinStart.x, spinSpeed.y\n' +
    'attribute vec4 color; //\n' +
    '\n' +
    'varying vec4 v_position;\n' +
    'varying vec2 v_texcoord;\n' +
    'varying float v_percentLife;\n' +
    'varying vec4 v_colorMult;\n' +
    '\n' +
    'void main() {\n' +
    '  vec4 uvLifeTimeFrameStart = position;\n' +
    '  vec4 positionStartTime = texCoord0;\n' +
    '  vec4 velocityStartSize = texCoord1;\n' +
    '  vec4 accelerationEndSize = texCoord2;\n' +
    '  vec4 spinStartSpinSpeed = texCoord3;\n' +
    '  vec4 colorMult = color;\n' +
    '  vec2 uv = uvLifeTimeFrameStart.xy;\n' +
    '  float lifeTime = uvLifeTimeFrameStart.z;\n' +
    '  float frameStart = uvLifeTimeFrameStart.w;\n' +
    '  vec3 position = (world * vec4(positionStartTime.xyz, 1.0)).xyz;\n' +
    '  float startTime = positionStartTime.w;\n' +
    '  vec3 velocity = (world * vec4(velocityStartSize.xyz, 0)).xyz \n' +
    '      + worldVelocity;\n' +
    '  float startSize = velocityStartSize.w;\n' +
    '  vec3 acceleration = (world *\n' +
    '      vec4(accelerationEndSize.xyz, 0)).xyz + worldAcceleration;\n' +
    '  float endSize = accelerationEndSize.w;\n' +
    '  float spinStart = spinStartSpinSpeed.x;\n' +
    '  float spinSpeed = spinStartSpinSpeed.y;\n' +
    '\n' +
    '  float localTime = mod((time - timeOffset - startTime),\n' +
    '      timeRange);\n' +
    '  float percentLife = localTime / lifeTime;\n' +
    '\n' +
    '  float frame = mod(floor(localTime / frameDuration + frameStart),\n' +
    '                     numFrames);\n' +
    '  float uOffset = frame / numFrames;\n' +
    '  float u = uOffset + (uv.x + 0.5) * (1.0 / numFrames);\n' +
    '\n' +
    '  v_texcoord = vec2(u, uv.y + 0.5);\n' +
    '  v_colorMult = colorMult;\n' +
    '\n' +
    '  vec3 basisX = viewInverse[0].xyz;\n' +
    '  vec3 basisZ = viewInverse[1].xyz;\n' +
    '\n' +
    '  float size = mix(startSize, endSize, percentLife);\n' +
    '  size = (percentLife < 0.0 || percentLife > 1.0) ? 0.0 : size;\n' +
    '  float s = sin(spinStart + spinSpeed * localTime);\n' +
    '  float c = cos(spinStart + spinSpeed * localTime);\n' +
    '\n' +
    '  vec2 rotatedPoint = vec2(uv.x * c + uv.y * s, \n' +
    '                               -uv.x * s + uv.y * c);\n' +
    '  vec3 localPosition = vec3(basisX * rotatedPoint.x +\n' +
    '                                basisZ * rotatedPoint.y) * size +\n' +
    '                         velocity * localTime +\n' +
    '                         acceleration * localTime * localTime + \n' +
    '                         position;\n' +
    '\n' +
    '  gl_Position = (viewProjection * vec4(localPosition, 1.0));\n' +
    '  v_percentLife = percentLife;\n' +
    '}\n',
    fragmentShader: '' +
    '#ifdef GL_ES\n' +
    'precision highp float;\n' +
    '#endif\n' +
    'varying vec4 v_position;\n' +
    'varying vec2 v_texcoord;\n' +
    'varying float v_percentLife;\n' +
    'varying vec4 v_colorMult;\n' +
    '\n' +
    '// We need to implement 1D!\n' +
    'uniform sampler2D rampSampler;\n' +
    'uniform sampler2D colorSampler;\n' +
    '\n' +
    'void main() {\n' +
    '  vec4 colorMult = texture2D(rampSampler, \n' +
    '      vec2(v_percentLife, 0.5)) * v_colorMult;\n' +
    '  vec4 color = texture2D(colorSampler, v_texcoord) * colorMult;\n' +
    '  gl_FragColor = color;\n' +
    '}\n' +
    '\n'}
  }];

/**
 * Corner values.
 * @private
 * @type {!Array.<!Array.<number>>}
 */
tdl.particles.CORNERS_ = [
      [-0.5, -0.5],
      [+0.5, -0.5],
      [+0.5, +0.5],
      [-0.5, +0.5]];

/**
 * Creates a particle system.
 * You only need one of these to run multiple emitters of different types
 * of particles.
 * @param {!function(): number} opt_randomFunction A function that returns
 *     a random number between 0.0 and 1.0. This allows you to pass in a
 *     pseudo random function if you need particles that are reproducable.
 * @return {!tdl.particles.ParticleSystem} The created particle system.
 */
tdl.particles.createParticleSystem = function(opt_randomFunction) {
  return new tdl.particles.ParticleSystem(opt_randomFunction);
};

/**
 * An Object to manage Particles.
 * @constructor
 * @param {!function(): number} opt_randomFunction A function that returns
 *     a random number between 0.0 and 1.0. This allows you to pass in a
 *     pseudo random function if you need particles that are reproducable.
 */
tdl.particles.ParticleSystem = function(opt_randomFunction) {
  var particleStates = [];
  var programs = [];
  for (var ee = 0; ee < tdl.particles.FX_STRINGS.length; ++ee) {
    var info = tdl.particles.FX_STRINGS[ee];
    var program = tdl.programs.loadProgram(
        info.shaders.vertexShader,
        info.shaders.fragmentShader);
    programs.push(program);
  }

  // TODO(gman): make a circular dot texture.
  var pixel
  var colorTexture = tdl.textures.loadTexture([255, 255, 255, 255]);
  colorTexture.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  colorTexture.setParameter(gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  //var pixelBase = [0, 0.20, 0.70, 1, 0.70, 0.20, 0, 0];
  //var pixels = [];
  //for (var yy = 0; yy < 8; ++yy) {
  //  for (var xx = 0; xx < 8; ++xx) {
  //    var pixel = pixelBase[xx] * pixelBase[yy];
  //    pixels.push(pixel, pixel, pixel, pixel);
  //  }
  //}
  var rampTexture = tdl.textures.loadTexture({
      width: 4,
      height: 1,
      pixels: [255, 255, 255, 255,
               255, 255, 255, 170,
               255, 255, 255, 85,
               255, 255, 255, 0]);
  rampTexture.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

  this.randomFunction_ = opt_randomFunction || function() {
        return Math.random();
      };

  /**
   * The programs for particles.
   * @type {!Array.<!tdl.Effect>}
   */
  this.programs = programs;

  /**
   * The default color texture for particles.
   * @type {!tdl.Texture2D}
   */
  this.defaultColorTexture = colorTexture;


  /**
   * The default ramp texture for particles.
   * @type {!tdl.Texture2D}
   */
  this.defaultRampTexture = rampTexture;
};

/**
 * A ParticleSpec specifies how to emit particles.
 *
 * NOTE: For all particle functions you can specific a ParticleSpec as a
 * Javascript object, only specifying the fields that you care about.
 *
 * <pre>
 * emitter.setParameters({
 *   numParticles: 40,
 *   lifeTime: 2,
 *   timeRange: 2,
 *   startSize: 50,
 *   endSize: 90,
 *   positionRange: [10, 10, 10],
 *   velocity:[0, 0, 60], velocityRange: [15, 15, 15],
 *   acceleration: [0, 0, -20],
 *   spinSpeedRange: 4}
 * );
 * </pre>
 *
 * Many of these parameters are in pairs. For paired paramters each particle
 * specfic value is set like this
 *
 * particle.field = value + Math.random() - 0.5 * valueRange * 2;
 *
 * or in English
 *
 * particle.field = value plus or minus valueRange.
 *
 * So for example, if you wanted a value from 10 to 20 you'd pass 15 for value
 * and 5 for valueRange because
 *
 * 15 + or - 5  = (10 to 20)
 *
 * @constructor
 */
tdl.particles.ParticleSpec = function() {
  /**
   * The number of particles to emit.
   * @type {number}
   */
  this.numParticles = 1;

  /**
   * The number of frames in the particle texture.
   * @type {number}
   */
  this.numFrames = 1;

  /**
   * The frame duration at which to animate the particle texture in seconds per
   * frame.
   * @type {number}
   */
  this.frameDuration = 1;

  /**
   * The initial frame to display for a particular particle.
   * @type {number}
   */
  this.frameStart = 0;

  /**
   * The frame start range.
   * @type {number}
   */
  this.frameStartRange = 0;

  /**
   * The life time of the entire particle system.
   * To make a particle system be continuous set this to match the lifeTime.
   * @type {number}
   */
  this.timeRange = 99999999;

  /**
   * The startTime of a particle.
   * @type {?number}
   */
  this.startTime = null;
  // TODO: Describe what happens if this is not set. I still have some
  //     work to do there.

  /**
   * The lifeTime of a particle.
   * @type {number}
   */
  this.lifeTime = 1;

  /**
   * The lifeTime range.
   * @type {number}
   */
  this.lifeTimeRange = 0;

  /**
   * The starting size of a particle.
   * @type {number}
   */
  this.startSize = 1;

  /**
   * The starting size range.
   * @type {number}
   */
  this.startSizeRange = 0;

  /**
   * The ending size of a particle.
   * @type {number}
   */
  this.endSize = 1;

  /**
   * The ending size range.
   * @type {number}
   */
  this.endSizeRange = 0;

  /**
   * The starting position of a particle in local space.
   * @type {!tdl.math.Vector3}
   */
  this.position = [0, 0, 0];

  /**
   * The starting position range.
   * @type {!tdl.math.Vector3}
   */
  this.positionRange = [0, 0, 0];

  /**
   * The velocity of a paritcle in local space.
   * @type {!tdl.math.Vector3}
   */
  this.velocity = [0, 0, 0];

  /**
   * The velocity range.
   * @type {!tdl.math.Vector3}
   */
  this.velocityRange = [0, 0, 0];

  /**
   * The acceleration of a particle in local space.
   * @type {!tdl.math.Vector3}
   */
  this.acceleration = [0, 0, 0];

  /**
   * The accleration range.
   * @type {!tdl.math.Vector3}
   */
  this.accelerationRange = [0, 0, 0];

  /**
   * The starting spin value for a particle in radians.
   * @type {number}
   */
  this.spinStart = 0;

  /**
   * The spin start range.
   * @type {number}
   */
  this.spinStartRange = 0;

  /**
   * The spin speed of a particle in radians.
   * @type {number}
   */
  this.spinSpeed = 0;

  /**
   * The spin speed range.
   * @type {number}
   */
  this.spinSpeedRange = 0;

  /**
   * The color multiplier of a particle.
   * @type {!tdl.math.Vector4}
   */
  this.colorMult = [1, 1, 1, 1];

  /**
   * The color multiplier range.
   * @type {!tdl.math.Vector4}
   */
  this.colorMultRange = [0, 0, 0, 0];

  /**
   * The velocity of all paritcles in world space.
   * @type {!tdl.math.Vector3}
   */
  this.worldVelocity = [0, 0, 0];

  /**
   * The acceleration of all paritcles in world space.
   * @type {!tdl.math.Vector3}
   */
  this.worldAcceleration = [0, 0, 0];

  /**
   * Whether these particles are oriented in 2d or 3d. true = 2d, false = 3d.
   * @type {boolean}
   */
  this.billboard = true;

  /**
   * The orientation of a particle. This is only used if billboard is false.
   * @type {!tdl.quaternions.Quaternion}
   */
  this.orientation = [0, 0, 0, 1];
};

/**
 * Creates a particle emitter.
 * @param {!tdl.textures.Texture} opt_texture The texture to use
 *     for the particles. If you don't supply a texture a
 *     default is provided.
 * @return {!tdl.particles.ParticleEmitter} The new emitter.
 */
tdl.particles.ParticleSystem.prototype.createParticleEmitter =
    function(opt_texture) {
  return new tdl.particles.ParticleEmitter(this, opt_texture);
};

/**
 * Creates a Trail particle emitter.
 * You can use this for jet exhaust, etc...
 * @param {number} maxParticles Maximum number of particles to appear at once.
 * @param {!tdl.particles.ParticleSpec} parameters The parameters used to
 *     generate particles.
 * @param {!tdl.textures.Texture} opt_texture The texture to use
 *     for the particles. If you don't supply a texture a
 *     default is provided.
 * @param {!function(number, !tdl.particles.ParticleSpec): void}
 *     opt_perParticleParamSetter A function that is called for each particle to
 *     allow it's parameters to be adjusted per particle. The number is the
 *     index of the particle being created, in other words, if numParticles is
 *     20 this value will be 0 to 19. The ParticleSpec is a spec for this
 *     particular particle. You can set any per particle value before returning.
 * @return {!tdl.particles.Trail} A Trail object.
 */
tdl.particles.ParticleSystem.prototype.createTrail = function(
    maxParticles,
    parameters,
    opt_texture,
    opt_perParticleParamSetter) {
  return new tdl.particles.Trail(
      this,
      maxParticles,
      parameters,
      opt_texture,
      opt_perParticleParamSetter);
};

/**
 * A ParticleEmitter
 * @constructor
 * @param {!tdl.particles.ParticleSystem} particleSystem The particle system
 *     to manage this emitter.
 * @param {!tdl.textures.Texture} opt_texture The texture to use
 *     for the particles. If you don't supply a texture a
 *     default is provided.
 */
tdl.particles.ParticleEmitter = function(
    particleSystem,
    opt_texture) {
  var textures = {}
  var constUniforms = {  };
  constUniforms.time = 0;

  textures.rampSampler = particleSystem.defaultRampTexture;
  textures.colorSampler = opt_texture || particleSystem.defaultColorTexture;

//  var uvLifeTimeFrameStartField = vertexBuffer.createField('FloatField', 4);
//  var positionStartTimeField = vertexBuffer.createField('FloatField', 4);
//  var velocityStartSizeField = vertexBuffer.createField('FloatField', 4);
//  var accelerationEndSizeField = vertexBuffer.createField('FloatField', 4);
//  var spinStartSpinSpeedField = vertexBuffer.createField('FloatField', 4);
//  var orientationField = vertexBuffer.createField('FloatField', 4);
//  var colorMultField = vertexBuffer.createField('FloatField', 4);
//
//  var indexBuffer = pack.createObject('IndexBuffer');

  this.arrays = {};
  this.vertexBuffer_ = vertexBuffer;
  this.uvLifeTimeFrameStartField_ = uvLifeTimeFrameStartField.;
  this.positionStartTimeField_ = positionStartTimeField;
  this.velocityStartSizeField_ = velocityStartSizeField;
  this.accelerationEndSizeField_ = accelerationEndSizeField;
  this.spinStartSpinSpeedField_ = spinStartSpinSpeedField;
  this.orientationField_ = orientationField;
  this.colorMultField_ = colorMultField;
  this.indexBuffer_ = indexBuffer;

//  this.rampSampler_ = rampSampler;
//  this.rampTexture_ = particleSystem.defaultRampTexture;
//  this.colorSampler_ = colorSampler;

  /**
   * The particle system managing this emitter.
   * @type {!tdl.particles.ParticleSystem}
   */
  this.particleSystem = particleSystem;

  /**
   * The textures used by this emitter.
   * @type {!Object.<string, !tdl.textures.Texture>}
   */
  this.textures = textures;

  /**
   * The const uniforms used by this emitter.
   * @type {!Object.<string, *>}
   */
  this.constUniforms = constUniforms;
};

/**
 * Sets the colorRamp for the particles.
 * The colorRamp is used as a multiplier for the texture. When a particle
 * starts it is multiplied by the first color, as it ages to progressed
 * through the colors in the ramp.
 *
 * <pre>
 * particleEmitter.setColorRamp([
 *   1, 0, 0, 1,    // red
 *   0, 1, 0, 1,    // green
 *   1, 0, 1, 0]);  // purple but with zero alpha
 * </pre>
 *
 * The code above sets the particle to start red, change to green then
 * fade out while changing to purple.
 *
 * @param {!Array.<number>} colorRamp An array of color values in
 *     the form RGBA.
 */
tdl.particles.ParticleEmitter.prototype.setColorRamp = function(colorRamp) {
  var width = colorRamp.length / 4;
  if (width % 1 != 0) {
    throw 'colorRamp must have multiple of 4 entries';
  }

  var textures = this.textures;
  textures.rampSampler = tdl.textures.loadTexture({
     width: colorRamp.length / 4,
     height: 1,
     data: colorRamp});
  textures.rampSampler.setParameter(gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
};

/**
 * Validates and adds missing particle parameters.
 * @param {!tdl.particles.ParticleSpec} parameters The parameters to validate.
 */
tdl.particles.ParticleEmitter.prototype.validateParameters = function(
    parameters) {
  var defaults = new tdl.particles.ParticleSpec();
  for (var key in parameters) {
    if (typeof defaults[key] === 'undefined') {
      throw 'unknown particle parameter "' + key + '"';
    }
  }
  for (var key in defaults) {
    if (typeof parameters[key] === 'undefined') {
      parameters[key] = defaults[key];
    }
  }
};

/**
 * Creates particles.
 * @private
 * @param {number} firstParticleIndex Index of first particle to create.
 * @param {number} numParticles The number of particles to create.
 * @param {!tdl.particles.ParticleSpec} parameters The parameters for the
 *     emitters.
 * @param {!function(number, !tdl.particles.ParticleSpec): void}
 *     opt_perParticleParamSetter A function that is called for each particle to
 *     allow it's parameters to be adjusted per particle. The number is the
 *     index of the particle being created, in other words, if numParticles is
 *     20 this value will be 0 to 19. The ParticleSpec is a spec for this
 *     particular particle. You can set any per particle value before returning.
 */
tdl.particles.ParticleEmitter.prototype.createParticles_ = function(
    firstParticleIndex,
    numParticles,
    parameters,
    opt_perParticleParamSetter) {
  var uvLifeTimeFrameStart = this.arrays.uvLifeTimeFrameStart.buffer;
  var positionStartTime = this.arrays.positionStartTime.buffer;
  var velocityStartSize = this.arrays.velocityStartSize.buffer;
  var accelerationEndSize = this.arrays.accelerationEndSize.buffer;
  var spinStartSpinSpeed = this.arrays.spinStartSpinSpeed.buffer;
  var orientation = this.arrays.orientation.buffer;
  var colorMults = this.arrays.colorMults.buffer;

  // Set the globals.
  this.program = this.particleSystem.programs[parameters.billboard ? 1 : 0];
  var constUniforms = this.constUniforms;

  constUniforms.timeRange = parameters.timeRange;
  constUniforms.numFrames = parameters.numFrames;
  constUniforms.frameDuration = parameters.frameDuration;
  constUniforms.worldVelocity = new Float32Array(parameters.worldVelocity);
  constUniforms.worldAcceleration =
      new Float32Array(parameters.worldAcceleration);

  var random = this.particleSystem.randomFunction_;

  var plusMinus = function(range) {
    return (random() - 0.5) * range * 2;
  };

  // TODO: change to not allocate.
  var plusMinusVector = function(range) {
    var v = [];
    for (var ii = 0; ii < range.length; ++ii) {
      v.push(plusMinus(range[ii]));
    }
    return v;
  };

  for (var ii = 0; ii < numParticles; ++ii) {
    if (opt_perParticleParamSetter) {
      opt_perParticleParamSetter(ii, parameters);
    }
    var pLifeTime = parameters.lifeTime;
    var pStartTime = (parameters.startTime === null) ?
        (ii * parameters.lifeTime / numParticles) : parameters.startTime;
    var pFrameStart =
        parameters.frameStart + plusMinus(parameters.frameStartRange);
    var pPosition = tdl.math.addVector(
        parameters.position, plusMinusVector(parameters.positionRange));
    var pVelocity = tdl.math.addVector(
        parameters.velocity, plusMinusVector(parameters.velocityRange));
    var pAcceleration = tdl.math.addVector(
        parameters.acceleration,
        plusMinusVector(parameters.accelerationRange));
    var pColorMult = tdl.math.addVector(
        parameters.colorMult, plusMinusVector(parameters.colorMultRange));
    var pSpinStart =
        parameters.spinStart + plusMinus(parameters.spinStartRange);
    var pSpinSpeed =
        parameters.spinSpeed + plusMinus(parameters.spinSpeedRange);
    var pStartSize =
        parameters.startSize + plusMinus(parameters.startSizeRange);
    var pEndSize = parameters.endSize + plusMinus(parameters.endSizeRange);
    var pOrientation = parameters.orientation;

    // make each corner of the particle.
    for (var jj = 0; jj < 4; ++jj) {
      var offset0 = (ii * 4 + jj) * 4;
      var offset1 = offset0 + 1;
      var offset2 = offset0 + 2;
      var offset3 = offset0 + 3;

      uvLifeTimeFrameStart[offset0] = tdl.particles.CORNERS_[jj][0];
      uvLifeTimeFrameStart[offset1] = tdl.particles.CORNERS_[jj][1];
      uvLifeTimeFrameStart[offset2] = pLifeTime;
      uvLifeTimeFrameStart[offset3] = pFrameStart;

      positionStartTime[offset0] = pPosition[0];
      positionStartTime[offset1] = pPosition[1];
      positionStartTime[offset2] = pPosition[2];
      positionStartTime[offset3] = pStartTime;

      velocityStartSize[offset0] = pVelocity[0];
      velocityStartSize[offset1] = pVelocity[1];
      velocityStartSize[offset2] = pVelocity[2];
      velocityStartSize[offset3] = pStartSize;

      accelerationEndSize[offset0] = pAcceleration[0];
      accelerationEndSize[offset1] = pAcceleration[1];
      accelerationEndSize[offset2] = pAcceleration[2];
      accelerationEndSize[offset3] = pEndSize;

      spinStartSpinSpeed[offset0] = pSpinStart;
      spinStartSpinSpeed[offset1] = pSpinSpeed;
      spinStartSpinSpeed[offset2] = 0;
      spinStartSpinSpeed[offset3] = 0;

      orientation[offset0] = pOrientation[0];
      orientation[offset1] = pOrientation[1];
      orientation[offset2] = pOrientation[2];
      orientation[offset3] = pOrientation[3];

      colorMults[offset0] = pColorMult[0];
      colorMults[offset1] = pColorMult[1];
      colorMults[offset2] = pColorMult[2];
      colorMults[offset3] = pColorMult[3];
    }
  }

  firstParticleIndex *= 4;
  this.buffers.BufferSubData
  this.uvLifeTimeFrameStartField_.setAt(
      firstParticleIndex,
      uvLifeTimeFrameStart);
  this.positionStartTimeField_.setAt(
      firstParticleIndex,
      positionStartTime);
  this.velocityStartSizeField_.setAt(
      firstParticleIndex,
      velocityStartSize);
  this.accelerationEndSizeField_.setAt(
      firstParticleIndex,
      accelerationEndSize);
  this.spinStartSpinSpeedField_.setAt(
      firstParticleIndex,
      spinStartSpinSpeed);
  this.orientationField_.setAt(
      firstParticleIndex,
      orientation);
  this.colorMultField_.setAt(
      firstParticleIndex,
      colorMults);
};

/**
 * Allocates particles.
 * @private
 * @param {number} numParticles Number of particles to allocate.
 */
tdl.particles.ParticleEmitter.prototype.allocateParticles_ = function(
    numParticles) {
  tdl.arra

  var numElements = numParticles * 4;
  var arrays = {
    uvLifeTimeFrameStartField: new tdl.primitives.AttribBuffer(4, numElements),
    positionStartTimeField: new tdl.primitives.AttribBuffer(4, numElements),
    velocityStartSizeField: new tdl.primitives.AttribBuffer(4, numElements),
    accelerationEndSizeField: new tdl.primitives.AttribBuffer(4, numElements),
    spinStartSpinSpeedField: new tdl.primitives.AttribBuffer(4, numElements),
    orientationField: new tdl.primitives.AttribBuffer(4, numElements),
    colorMultField: new tdl.primitives.AttribBuffer(4, numElements),
    indices: new tdl.primitives.AttribBuffer(3, numParticles * 2, 'Uint16Array')};

  var indices = arrays.indices;
  for (var ii = 0; ii < numParticles; ++ii) {
    // Make 2 triangles for the quad.
    var startIndex = ii * 4;
    indices.push(startIndex + 0, startIndex + 1, startIndex + 2);
    indices.push(startIndex + 0, startIndex + 2, startIndex + 3);
  }

  this.arrays = arrays;
  this.numberPrimitives = numParticles * 6;
  this.numberVertices = numParticles * 4;
};

/**
 * Sets the parameters of the particle emitter.
 *
 * Each of these parameters are in pairs. The used to create a table
 * of particle parameters. For each particle a specfic value is
 * set like this
 *
 * particle.field = value + Math.random() - 0.5 * valueRange * 2;
 *
 * or in English
 *
 * particle.field = value plus or minus valueRange.
 *
 * So for example, if you wanted a value from 10 to 20 you'd pass 15 for value
 * and 5 for valueRange because
 *
 * 15 + or - 5  = (10 to 20)
 *
 * @param {!tdl.particles.ParticleSpec} parameters The parameters for the
 *     emitters.
 * @param {!function(number, !tdl.particles.ParticleSpec): void}
 *     opt_perParticleParamSetter A function that is called for each particle to
 *     allow it's parameters to be adjusted per particle. The number is the
 *     index of the particle being created, in other words, if numParticles is
 *     20 this value will be 0 to 19. The ParticleSpec is a spec for this
 *     particular particle. You can set any per particle value before returning.
 */
tdl.particles.ParticleEmitter.prototype.setParameters = function(
    parameters,
    opt_perParticleParamSetter) {
  this.validateParameters(parameters);

  var numParticles = parameters.numParticles;

  this.allocateParticles_(numParticles);

  this.createParticles_(
      0,
      numParticles,
      parameters,
      opt_perParticleParamSetter);
};

/**
 * Creates a OneShot particle emitter instance.
 * You can use this for dust puffs, explosions, fireworks, etc...
 * @return {!tdl.particles.OneShot} A OneShot object.
 */
tdl.particles.ParticleEmitter.prototype.createOneShot = function() {
  return new tdl.particles.OneShot(this);
};

/**
 * An object to manage a particle emitter instance as a one shot. Examples of
 * one shot effects are things like an explosion, some fireworks.
 * @constructor
 * @param {!tdl.particles.ParticleEmitter} emitter The emitter to use for the
 *     one shot.
 */
tdl.particles.OneShot = function(emitter) {
  this.emitter_ = emitter;
};

/**
 * Triggers the oneshot.??
 */
tdl.particles.OneShot.prototype.trigger = function(opt_position, opt_parent) {
  if (opt_parent) {
    this.setParent(opt_parent);
  }
  if (opt_position) {
    this.transform.identity();
    this.transform.translate(opt_position);
  }
  this.transform.visible = true;
  this.timeOffsetParam_.value = this.emitter_.clockParam.value;
};

/**
 * A type of emitter to use for particle effects that leave trails like exhaust.
 * @constructor
 * @extends {tdl.particles.ParticleEmitter}
 * @param {!tdl.particles.ParticleSystem} particleSystem The particle system
 *     to manage this emitter.
 * @param {number} maxParticles Maximum number of particles to appear at once.
 * @param {!tdl.particles.ParticleSpec} parameters The parameters used to
 *     generate particles.
 * @param {!tdl.textures.Texture} opt_texture The texture to use
 *     for the particles. If you don't supply a texture a
 *     default is provided.
 * @param {!function(number, !tdl.particles.ParticleSpec): void}
 *     opt_perParticleParamSetter A function that is called for each particle to
 *     allow it's parameters to be adjusted per particle. The number is the
 *     index of the particle being created, in other words, if numParticles is
 *     20 this value will be 0 to 19. The ParticleSpec is a spec for this
 *     particular particle. You can set any per particle value before returning.
 */
tdl.particles.Trail = function(
    particleSystem,
    maxParticles,
    parameters,
    opt_texture,
    opt_perParticleParamSetter) {
  tdl.particles.ParticleEmitter.call(
      this, particleSystem, opt_texture);

  this.allocateParticles_(maxParticles);
  this.validateParameters(parameters);

  this.parameters = parameters;
  this.perParticleParamSetter = opt_perParticleParamSetter;
  this.birthIndex_ = 0;
  this.maxParticles_ = maxParticles;
};

tdl.base.inherit(tdl.particles.Trail, tdl.particles.ParticleEmitter);

/**
 * Births particles from this Trail.
 * @param {!tdl.math.Vector3} position Position to birth particles at.
 */
tdl.particles.Trail.prototype.birthParticles = function(position) {
  var numParticles = this.parameters.numParticles;
  this.parameters.startTime = this.clockParam.value;
  this.parameters.position = position;
  while (this.birthIndex_ + numParticles >= this.maxParticles_) {
    var numParticlesToEnd = this.maxParticles_ - this.birthIndex_;
    this.createParticles_(this.birthIndex_,
                          numParticlesToEnd,
                          this.parameters,
                          this.perParticleParamSetter);
    numParticles -= numParticlesToEnd;
    this.birthIndex_ = 0;
  }
  this.createParticles_(this.birthIndex_,
                        numParticles,
                        this.parameters,
                        this.perParticleParamSetter);
  this.birthIndex_ += numParticles;
};


// For compatability with tdl code, the default language is tdl shading
// language.
tdl.particles.setLanguage('tdl');
