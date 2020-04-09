'use strict';

const PerfHarness = (function(undefined) {

  const g = {
    count: 1,
    elapsedTime: 0,
    targetFPS: 50,
    targetTime: 1,
    velocity: 200,
    direction: 1,
    frames: [],
  };

  const countHistory = [];
  let totalCount = 0;
  let countIndex = 0;
  let skipFrames = 0;
  let framesToAverage;
  let then;
  let callback;
  let canvas;

  const getNow = (function() {
    let fn;
    let obj;
    if (window.performance) {
      obj = window.performance;
      fn = window.performance.now ||
           window.performance.webkitNow ||
           window.performance.mozNow ||
           window.performance.opNow;
    }
    if (!fn) {
      obj = Date;
      fn = Date.now;
    }
    return function() {
      return fn.call(obj) * 0.001;
    };
  }());

  const elapsedTimes = [0, 0, 0, 0, 0, 0];
  let totalElapsedTime = 0;
  let elapsedTimeCursor = 0;
  let averageElapsedTime = 0;
  let highestElapsedTime = 0;
  const recordElapsedTime = function() {
    totalElapsedTime -= elapsedTimes[elapsedTimeCursor] + g.elapsedTime;
    elapsedTimes[elapsedTimeCursor] = g.elapsedTime;
    elapsedTimeCursor = (elapsedTimeCursor + 1) % elapsedTimes.length;
    averageElapsedTime = totalElapsedTime / elapsedTimes.length;
    highestElapsedTime = 0;
    for (let i = 0; i < elapsedTimes.length; ++i) {
      highestElapsedTime = Math.max(highestElapsedTime, elapsedTimes[i]);
    }
  };

  const accelerating = function() {
    if (highestElapsedTime > g.targetTime) {
      g.count = Math.max(g.count - g.velocity * 2, 1);
      //g.velocity = 100;//Math.max(1, g.velocity / 4 | 0);
      g.waitFrameCount = elapsedTimes.length * 2;
      state = waitingForStableFramerate;
      return;
    }
    //g.velocity = 100;//g.velocity * 1.01 + 1 | 0;
    g.count += g.velocity;
  };

  const waitingForStableFramerate = function() {
    --g.waitFrameCount;
    if (g.waitFrameCount < 0) {
      state = accelerating;
    }
  };

  let state = accelerating;

  const test = function() {
    const now = getNow();
    g.elapsedTime = now - then;
    then = now;
    recordElapsedTime();
    state();

    if (g.frames.length < 1000) {
      g.frames.push(g.elapsedTime);
    }

    totalCount -= countHistory[countIndex];
    totalCount += g.count;
    countHistory[countIndex] = g.count;
    countIndex = (countIndex + 1) % framesToAverage;

    callback(g.count, Math.floor(totalCount / framesToAverage), g.elapsedTime, g.velocity);

    requestAnimationFrame(test, canvas);
  };

  const getTargetFPS = function() {
    return g.targetFPS;
  };

  const setTargetFPS = function(_targetFPS) {
    g.targetFPS = _targetFPS;
    g.targetTime = 1 / g.targetFPS;
  };

  const setCount = function(v) {
    g.count = count;
  }

  const start = function(_canvas, _callback, opt_framesToAverage, opt_targetFPS) {
    canvas = _canvas;
    callback = _callback;

    framesToAverage = opt_framesToAverage || 60;

    for (let ii = 0; ii < framesToAverage; ++ii) {
      countHistory.push(0);
    }

    if (opt_targetFPS || !g.targetTime) {
      opt_targetFPS = opt_targetFPS || 50;  // we use 50 instead of 60 since timing is bad.
      setTargetFPS(opt_targetFPS);
    }

    then = getNow();

    test();
  };

  return {
    setCount: setCount,
    getTargetFPS: getTargetFPS,
    start: start,
    setTargetFPS: setTargetFPS,

    // This is here for debugging
    g: g,

    endMarker: undefined,
  };
}());
