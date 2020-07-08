'use strict';

/* global twgl, PerfHarness */

function createElem(tag, attrs = {}) {
  const elem = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        try {
        elem[key][k] = v;
        } catch (e) {
          debugger;  // eslint-disable-line no-debugger
        }
      }
    } else if (elem[key] === undefined) {
      elem.setAttribute(key, value);
    } else {
      elem[key] = value;
    }
  }
  return elem;
}

function addElem(tag, parent, attrs = {}) {
  const elem = createElem(tag, attrs);
  parent.appendChild(elem);
  return elem;
}

function noop() {
}

function addBool(parent, object, propertyName, callback = noop) {
  const div = addElem('div', parent, {className:'fps'});
  const id = `input-${performance.now()}-${Math.random() * 100000 | 0}`;
  const input = addElem('input', div, {
    type: 'checkbox',
    id,
    checked: object[propertyName],
  });
  addElem('label', div, {
    for: id,
    textContent: propertyName,
  });
  input.addEventListener('input', (e) => {
    const v = input.checked;
    object[propertyName] = v;
    callback(v);
  });
}

function initialize() {
  const canvas = document.querySelector("#canvas");
  const fpsElem = document.querySelector("#fps");
  const afpsElem = document.querySelector("#afps");
  const velElem = document.querySelector("#vel");
  const cntElem = document.querySelector("#cnt");
  const acntElem = document.querySelector("#acnt");
  const targetFPSElem = document.querySelector("#targetFPS");

  const query = new URLSearchParams(window.location.search);
  function getQueryBool(id) {
    const value = (query.get(id) || '').toLowerCase();
    return value === 'true' || value === '1';
  }

  const settings =  {
    alpha: getQueryBool('alpha'),
    antialias: getQueryBool('antialias'),
    preserveDrawingBuffer: getQueryBool('preserveDrawingBuffer'),
    blend: getQueryBool('blend'),
    update: true,
  };

  function reload() {
    const s = new URLSearchParams();
    s.set('alpha', settings.alpha);
    s.set('antialias', settings.antialias);
    s.set('preserveDrawingBuffer', settings.preserveDrawingBuffer);
    s.set('blend', settings.blend);
    window.location.search = s.toString();
  }

  const fpsContainer = document.querySelector('#fpsContainer');
  addBool(fpsContainer, settings, 'alpha', reload);
  addBool(fpsContainer, settings, 'preserveDrawingBuffer', reload);
  addBool(fpsContainer, settings, 'antialias', reload);
  addBool(fpsContainer, settings, 'blend');
  addBool(fpsContainer, settings, 'update');

  const targetFPS = 55;

  const setTargetFPS = function(targetFPS) {
    PerfHarness.setTargetFPS(targetFPS);
    targetFPSElem.textContent = targetFPS;
  };

  $("#targetFPSSlider").slider({
    max: 60,
    min: 1,
    value: targetFPS,
    slide: function(event, ui) {
      setTargetFPS(ui.value);
    },
  });
  setTargetFPS(targetFPS);

  document.querySelector("#title").textContent = document.querySelector("title").textContent;

  const ctxOptions = {
    alpha: settings.alpha,
    antialias: settings.antialias,
    preserveDrawingBuffer: settings.preserveDrawingBuffer,
    powerPreference: 'high-performance',
  };
  const gl = canvas.getContext('webgl', ctxOptions);
  if (!gl) {
    return false;
  }

  const app = createApp(gl, settings);

  const elapsedTimeHistory = new Array(10).fill(0);
  let elapsedTimeTotal = 0;
  let elapsedTimeHistoryCursor = 0;
  let elapsedTimeAverage = 0;
  let direction = 1;

  function updateElapsedTimeHistory(elapsedTime) {
    elapsedTimeTotal += elapsedTime - elapsedTimeHistory[elapsedTimeHistoryCursor];
    elapsedTimeHistory[elapsedTimeHistoryCursor++] = elapsedTime;
    elapsedTimeHistoryCursor %= elapsedTimeHistory.length;
    elapsedTimeAverage = elapsedTimeTotal / elapsedTimeHistory.length;
  }

  const numFramesForStable = 1;
  let lastDirection = 1;
  let sameDirectionCount = 0;
  let lastCount = 0;
  let directionMark;
  function trackCount(count) {
    const direction = Math.sign(count - lastCount);
    if (direction !== lastDirection) {
      sameDirectionCount = 0;
    } else {
      ++sameDirectionCount;
    }
    lastDirection = direction;
    if (sameDirectionCount < numFramesForStable) {
      directionMark = "-";
    } else {
      directionMark = direction > 0 ? '^' : 'v';
    }
  }

  function render(count, averageCount, elapsedTime, velocity) {
    updateElapsedTimeHistory(elapsedTime);
    trackCount(count);

    // Update the FPS timer.
    fpsElem.textContent = 1 / elapsedTime | 0;
    afpsElem.textContent = 1 / elapsedTimeAverage | 0;

    cntElem.textContent = `${count}${directionMark}`;

    app.update(elapsedTime, count);
    app.render();
  }
  PerfHarness.start(canvas, render, 60);
  return true;
}

initialize();
