// hacks for debugging.
var g_count;
var g_elapsedTime;
var g_targetFPS;
var g_targetTime;
var g_velocity;
var g_direction;
var g_frames = [];

var PerfHarness = (function(undefined) {

  var countHistory = [];
  var totalCount = 0;
  var countIndex = 0;
  var count = 1;
  var velocity = 1;
  var direction = 1;
  var framesToAverage;
  var targetFPS = 50;
  var targetTime;
  var then;
  var callback;
  var canvas;

  var test = function() {
    var now = Date.now() * 0.001;
    var elapsedTime = now - then;
    then = now;
    var desiredDirection = (elapsedTime < targetTime) ? 1 : -1;
    if (direction != desiredDirection) {
      direction = desiredDirection;
      velocity = Math.max(Math.abs(Math.floor(velocity / 4)), 1) * direction;
    }
    if (g_frames.length < 1000) {
      g_frames.push(elapsedTime);
    }
    velocity *= 2;
    count += velocity;
    count = Math.max(1, count);

// hacks for debugging.
g_direction = direction;
g_velocity = velocity;
g_count = count;
g_elapsedTime = elapsedTime;
g_targetFPS = targetFPS;
g_targetTime = targetTime;

    totalCount -= countHistory[countIndex];
    totalCount += count;
    countHistory[countIndex] = count;
    countIndex = (countIndex + 1) % framesToAverage;

    callback(count, Math.floor(totalCount / framesToAverage), elapsedTime);

    window.requestAnimFrame(test, canvas);
  };

  var getTargetFPS = function() {
    return targetFPS;
  };

  var setTargetFPS = function(_targetFPS) {
    targetFPS = _targetFPS;
    targetTime = 1 / targetFPS;
  };

  var start = function(_canvas, _callback, opt_framesToAverage, opt_targetFPS) {
    canvas = _canvas;
    callback = _callback;

    framesToAverage = opt_framesToAverage || 60;

    for (var ii = 0; ii < framesToAverage; ++ii) {
      countHistory.push(0);
    }

    if (opt_targetFPS || !targetTime) {
      opt_targetFPS = opt_targetFPS || 50;  // we use 50 instead of 60 since timing is bad.
      setTargetFPS(opt_targetFPS)
    }

    then = Date.now() * 0.001;

    test();
  };

  return {
    getTargetFPS: getTargetFPS,
    start: start,
    setTargetFPS: setTargetFPS
  };
}());
