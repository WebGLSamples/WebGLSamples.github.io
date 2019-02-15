/*
 * Portions Copyright 2011 Facebook, Inc. See jsgamebench-license.txt
 * for licensing information.
 */

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

// requires "SpriteLibrary.js"

tdl.require('tdl.fps');
tdl.require('tdl.webgl');

var atlas = new SpriteAtlas();
var canvas;
var gl;
var lastTime;
var spriteSystem;
var fpsTimer;
var fpsElem;
var countElements = [];

var browserWidth;
var browserHeight;

function parseURLQuery() {
  // Parses URL query into key/value pairs, returning a newly created object.
  var result = {};
  try {
    var s = window.location.href;
    var q = s.indexOf("?");
    var e = s.indexOf("#");
    if (e < 0) {
      e = s.length;
    }
    var query = s.substring(q + 1, e);
    var pairs = query.split("&");
    for (var ii = 0; ii < pairs.length; ++ii) {
      var keyValue = pairs[ii].split("=");
      var key = keyValue[0];
      var value = decodeURIComponent(keyValue[1]);
      var parsedValue = window.JSON.parse(value);
      result[key] = parsedValue;
    }
  } catch (e) {
  }
  return result;
}

function init() {
  canvas = document.getElementById('canvas');
  gl = tdl.webgl.setupWebGL(canvas, { antialias: false });
  if (!gl)
    return;
//  gl = tdl.webgl.makeDebugContext(gl);

  spriteSystem = new SpriteSystem(parseURLQuery());
  fpsTimer = new tdl.fps.FPSTimer();
  fpsElem = document.getElementById("fps");

  winresize();
  lastTime = new Date().getTime() * 0.001;
  
  setupCountButtons();

  atlas.onload = start;
  atlas.addSpriteSheet('ship', {url: 'images/ship_fbmark.png', frames: 2,
                                spritesPerRow: 2,
                                framepos: [[0, 0], [1, 0]],
                                width: 128, height: 128});
  atlas.addSpriteSheet('rock', {url: 'images/asteroid.png', frames: 60,
                                spritesPerRow: 8,
                                framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                                           [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                                           [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                                           [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
                                           [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
                                           [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
                                           [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
                                           [0, 7], [1, 7], [2, 7], [3, 7]],
                                width: 128, height: 128});


  atlas.addSpriteSheet('boom', {url: 'images/explosion.png', frames: 59,
                                spritesPerRow: 8,
                                framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                                           [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                                           [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                                           [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
                                           [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
                                           [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
                                           [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
                                           [0, 7], [1, 7], [2, 7]],
                                width: 256, height: 256});


  atlas.addSpriteSheet('powerup', {url: 'images/powerup.png', frames: 40,
                                spritesPerRow: 8,
                                   framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                                              [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                                              [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                                              [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
                                              [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]],
                                   width: 64, height: 64});

  atlas.startLoading();
}

function start() {
  setSelected(countElements[3]);
  generateSprites(2000);
  render();
}

function setupCountButtons() {
  var counts = [ 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 10000 ];

  var container = document.getElementById("topUI");
  for (var ii = 0; ii < counts.length; ++ii) {
    var div = document.createElement("div");
    div.style.cursor = "pointer";
    countElements.push(div);
    div.innerHTML = counts[ii];
    div.onclick = function(elem, count) {
      return function() {
        setSelected(elem);
        generateSprites(count);
      }}(div, counts[ii]);
    container.appendChild(div);
  }
}

function setSelected(elem) {
  for (var ii = 0; ii < countElements.length; ++ii) {
    countElements[ii].style.color = "gray";
  }
  elem.style.color = "red";
}

function generateSprites(numSprites) {
  spriteSystem.clearAllSprites();
  var spriteSheetIndex = 0;
  for (var ii = 0; ii < numSprites; ++ii) {
    if (spriteSheetIndex >= atlas.numSpriteSheets()) {
      spriteSheetIndex = 0;
    }
    var spriteSheet = atlas.getSpriteSheet(spriteSheetIndex);
    ++spriteSheetIndex;
    spriteSheet.createSprite(spriteSystem);
  }
}

function render() {
  requestAnimationFrame(render);
  var now = new Date().getTime() * 0.001;
  var deltaT = now - lastTime;
  fpsTimer.update(deltaT);
  fpsElem.innerHTML = fpsTimer.averageFPS;

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  spriteSystem.draw(atlas, deltaT);

  lastTime = now;
}

// The following code snippets were borrowed basically verbatim from JSGameBench.

function getWindowSize() {
  var width = 0;
  var height = 0;

  if (typeof(window.innerWidth) == 'number') {
    width = window.innerWidth;
    height = window.innerHeight;
  } else if (window.document.documentElement &&
             (window.document.documentElement.clientWidth ||
              window.document.documentElement.clientHeight)) {
    width = window.document.documentElement.clientWidth;
    height = window.document.documentElement.clientHeight;
  } else if (window.document.body &&
             (window.document.body.clientWidth ||
              window.document.body.clientHeight)) {
    width = window.document.body.clientWidth;
    height = window.document.body.clientHeight;
  }

  browserWidth = width;
  browserHeight = height;
}

function winresize() {
  getWindowSize();
  canvas.width = browserWidth;
  canvas.height = browserHeight;
  spriteSystem.setScreenSize(browserWidth, browserHeight);
}
