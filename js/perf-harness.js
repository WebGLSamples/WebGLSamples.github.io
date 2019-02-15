var PerfHarness = (function(undefined) {

  const g = {
    count: 1,
    elapsedTime: 0,
    targetFPS: 50,
    targetTime: 1,
    velocity: 1,
    direction: 1,
    frames: [],
  };

  var countHistory = [];
  var totalCount = 0;
  var countIndex = 0;
  var skipFrames = 0;
  var framesToAverage;
  var then;
  var callback;
  var canvas;

  var getNow = (function() {
    var fn;
    var obj;
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

  var test = function() {
    var now = getNow();
    g.elapsedTime = now - then;
    then = now;
    var desiredDirection = (g.elapsedTime < g.targetTime) ? 1 : -1;
    if (g.direction != desiredDirection) {
      g.direction = desiredDirection;
      g.velocity = Math.max(Math.abs(Math.floor(g.velocity / 4)), 1) * g.direction;
      if (g.direction < 0) {
        skipFrames = 3;
      }
    } else if (skipFrames) {
      --skipFrames;
    } else {
      g.velocity *= 2;
    }

    if (g.frames.length < 1000) {
      g.frames.push(g.elapsedTime);
    }

    g.count += g.velocity;
    g.count = Math.max(1, g.count);

    totalCount -= countHistory[countIndex];
    totalCount += g.count;
    countHistory[countIndex] = g.count;
    countIndex = (countIndex + 1) % framesToAverage;

    callback(g.count, Math.floor(totalCount / framesToAverage), g.elapsedTime);

    requestAnimationFrame(test, canvas);
  };

  var getTargetFPS = function() {
    return targetFPS;
  };

  var setTargetFPS = function(_targetFPS) {
    g.targetFPS = _targetFPS;
    g.targetTime = 1 / g.targetFPS;
  };

  var start = function(_canvas, _callback, opt_framesToAverage, opt_targetFPS) {
    canvas = _canvas;
    callback = _callback;

    framesToAverage = opt_framesToAverage || 60;

    for (var ii = 0; ii < framesToAverage; ++ii) {
      countHistory.push(0);
    }

    if (opt_targetFPS || !g.targetTime) {
      opt_targetFPS = opt_targetFPS || 50;  // we use 50 instead of 60 since timing is bad.
      setTargetFPS(opt_targetFPS)
    }

    then = getNow();

    test();
  };

  return {
    getTargetFPS: getTargetFPS,
    start: start,
    setTargetFPS: setTargetFPS,

    // This is here for debugging
    g: g,

    endMarker: undefined
  };
}());
