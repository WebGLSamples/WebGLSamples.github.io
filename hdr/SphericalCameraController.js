// Copyright (c) 2012 Google, Inc. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

tdl.require('tdl.fast');

function SphericalCameraController() {
  // Clamped between -PI/2 to PI/2
  this.verticalRadians_ = 0;

  // Ideally between 0 and 2*PI, but OK if it goes out of that range
  this.horizontalRadians_ = 0;

  // Radius, should be > 0
  this.radius_ = 1;

  this.target_ = new Float32Array(3);

  // Temporaries
  this.eyePosition_ = new Float32Array(3);
  this.upVector_ = new Float32Array(3);
}

SphericalCameraController.prototype.setVerticalRadians = function(rads) {
  this.verticalRadians_ = rads;
};

SphericalCameraController.prototype.setHorizontalRadians = function(rads) {
  this.horizontalRadians_ = rads;
};

SphericalCameraController.prototype.setRadius = function(radius) {
  this.radius_ = radius;
};

SphericalCameraController.prototype.setTarget = function(x, y, z) {
  this.target_[0] = x;
  this.target_[1] = y;
  this.target_[2] = z;
};

SphericalCameraController.prototype.generateLookAt = function(viewMatrix) {
  function clamp(value, min, max) {
    return Math.min(max, Math.max(value, min));
  }

  var r = this.radius_;
  var phi = clamp(this.verticalRadians_, -Math.PI / 2.0, Math.PI / 2.0);
  var theta = this.horizontalRadians_;

  var eye = this.eyePosition_;
  var target = this.target_;
  var up = this.upVector_;

  eye[0] = target[0] + r * Math.cos(phi) * Math.cos(theta);
  eye[1] = target[1] + r * Math.sin(phi);
  eye[2] = target[2] + r * Math.cos(phi) * Math.sin(theta);

  up[0] = -Math.sin(phi) * Math.cos(theta);
  up[1] = Math.cos(phi);
  up[2] = -Math.sin(phi) * Math.sin(theta);

  var m4 = tdl.fast.matrix4;
  m4.lookAt(viewMatrix, eye, target, up);
};
