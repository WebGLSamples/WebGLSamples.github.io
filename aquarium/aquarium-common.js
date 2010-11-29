tdl.require('tdl.fast');
tdl.require('tdl.io');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.sync');

// globals
var math;                 // the math lib.
var fast;                 // the fast math lib.
var g_syncManager;
var g_sync = false;
var g_slave = false;

var g_viewSettingsIndex = 0;
var g_getCount = 0;
var g_putCount = 0;

var g_viewSettings = [
  // Inside 1
  {
    targetHeight: 63.3,
    targetRadius: 91.6,
    eyeHeight: 7.5,
    eyeRadius: 13.2,
    eyeSpeed: 0.0258,
    fieldOfView: 82.699,
    ambientRed: 0.218,
    ambientGreen: 0.502,
    ambientBlue: 0.706,
    fogPower: 16.5,
    fogMult: 2.02,
    fogOffset: 0.738,
    fogRed: 0.338,
    fogGreen: 0.81,
    fogBlue: 1,
    refractionFudge: 3,
    eta: 1,
    tankColorFudge: 0.796
  },
  // Outside 1
  {
    targetHeight: 17.1,
    targetRadius: 69.2,
    eyeHeight: 59.1,
    eyeRadius: 124.4,
    eyeSpeed: 0.0258,
    fieldOfView: 56.923,
    ambientRed: 0.218,
    ambientGreen: 0.246,
    ambientBlue: 0.394,
    fogPower: 27.1,
    fogMult: 1.46,
    fogOffset: 0.53,
    fogRed: 0.382,
    fogGreen: 0.602,
    fogBlue: 1,
    refractionFudge: 3,
    eta: 1,
    tankColorFudge: 1
  },
  // Inside Original
  {
    targetHeight: 0,
    targetRadius: 88,
    eyeHeight: 38,
    eyeRadius: 69,
    eyeSpeed: 0.0258,
    fieldOfView: 64,
    ambientRed: 0.218,
    ambientGreen: 0.246,
    ambientBlue: 0.394,
    fogPower: 16.5,
    fogMult: 2.02,
    fogOffset: 0.738,
    fogRed: 0.338,
    fogGreen: 0.81,
    fogBlue: 1,
    refractionFudge: 3,
    eta: 1,
    tankColorFudge: 0.796
  },
  // Outside Original
  {
    targetHeight: 72,
    targetRadius: 73,
    eyeHeight: 3.9,
    eyeRadius: 120,
    eyeSpeed: 0.0258,
    fieldOfView: 74,
    ambientRed: 0.218,
    ambientGreen: 0.246,
    ambientBlue: 0.394,
    fogPower: 27.1,
    fogMult: 1.46,
    fogOffset: 0.53,
    fogRed: 0.382,
    fogGreen: 0.602,
    fogBlue: 1,
    refractionFudge: 3,
    eta: 1,
    tankColorFudge: 1
  },
  // Center for LG
  {
    targetHeight: 24,
    targetRadius: 73,
    eyeHeight: 24,
    eyeRadius: 0,
    eyeSpeed: 0.06,
    fieldOfView: 60,
    ambientRed: 0.22,
    ambientGreen: 0.25,
    ambientBlue: 0.39,
    fogPower: 14.5,
    fogMult: 1.66,
    fogOffset: 0.53,
    fogRed: 0.54,
    fogGreen: 0.86,
    fogBlue: 1,
    refractionFudge: 3,
    eta: 1,
    tankColorFudge: 0.8
  },
  // Outside for LG
  {
    targetHeight: 20,
    targetRadius: 127,
    eyeHeight: 39.9,
    eyeRadius: 124,
    eyeSpeed: 0.06,
    fieldOfView: 24,
    ambientRed: 0.22,
    ambientGreen: 0.25,
    ambientBlue: 0.39,
    fogPower: 27.1,
    fogMult: 1.46,
    fogOffset: 0.53,
    fogRed: 0.382,
    fogGreen: 0.602,
    fogBlue: 1,
    refractionFudge: 3,
    eta: 1,
    tankColorFudge: 1
  }
];

var g = {
  globals: {
    fishSetting: 2,
    drawLasers: false
  },
  net: {
    timeout: 3000,
    fovMult: 1.1,
    offsetMult: 1.0,
    offset: [0, 0, 0],
    port: 8080
  },
  fish: {},
  innerConst: {},
  options: {
    normalMaps: { enabled: false, text: 'Normal Maps' },
    reflection: { enabled: false, text: 'Reflection' },
    tank:       { enabled: true,  text: 'Tank' },
    museum:     { enabled: true,  text: 'Museum' },
    fog:        { enabled: true,  text: 'Fog' },
    bubbles:    { enabled: true,  text: 'Bubbles' },
    lightRays:  { enabled: true,  text: 'Light Rays' }
  }
};

var g_uiWidgets = {};

var g_ui = [
  { obj: 'globals',    name: 'speed',           value: 1,     max:  4 },
  { obj: 'globals',    name: 'targetHeight',    value: 0,     max:  150 },
  { obj: 'globals',    name: 'targetRadius',    value: 88,    max:  200 },
  { obj: 'globals',    name: 'eyeHeight',       value: 19,    max:  150 },
  { obj: 'globals',    name: 'eyeRadius',       value: 60,    max:  200 },
  { obj: 'globals',    name: 'eyeSpeed',        value: 0.06,  max:  1 },
  { obj: 'globals',    name: 'fieldOfView',     value: 85,  max:  179, min: 1},
  { obj: 'globals',    name: 'ambientRed',      value: 0.22,  max:  1},
  { obj: 'globals',    name: 'ambientGreen',    value: 0.25,  max:  1},
  { obj: 'globals',    name: 'ambientBlue',     value: 0.39,  max:  1},
  { obj: 'globals',    name: 'fogPower',        value: 14.5,  max:  50},
  { obj: 'globals',    name: 'fogMult',         value: 1.66,  max:  10},
  { obj: 'globals',    name: 'fogOffset',       value: 0.53,  max:  3},
  { obj: 'globals',    name: 'fogRed',          value: 0.54,  max:  1},
  { obj: 'globals',    name: 'fogGreen',        value: 0.86,  max:  1},
  { obj: 'globals',    name: 'fogBlue',         value: 1.0,   max:  1},
  { obj: 'fish',       name: 'fishHeightRange', value: 1,     max:  3},
  { obj: 'fish',       name: 'fishHeight',      value: 25,    max:  50},
  { obj: 'fish',       name: 'fishSpeed',       value: 0.124, max:  2},
  { obj: 'fish',       name: 'fishOffset',      value: 0.52,  max:  2},
  { obj: 'fish',       name: 'fishXClock',      value: 1,     max:  2},
  { obj: 'fish',       name: 'fishYClock',      value: 0.556, max:  2},
  { obj: 'fish',       name: 'fishZClock',      value: 1,     max:  2},
  { obj: 'fish',       name: 'fishTailSpeed',   value: 1,     max:  30},
  { obj: 'innerConst', name: 'refractionFudge', value: 3,     max:  50},
  { obj: 'innerConst', name: 'eta',             value: 1,     max:  1.2},
  { obj: 'innerConst', name: 'tankColorFudge',  value: 0.8,   max:  2}
];

var g_netUI = [
  { obj: 'net',    name: 'timeout',     value: 3000,  max:  3000},
  { obj: 'net',    name: 'fovMult',     value: 1,     max:  2},
  { obj: 'net',    name: 'offsetMult',  value: 1,     max:  2}
];

function Log(msg) {
  if (g_logGLCalls) {
    tdl.log(msg);
  }
}

function getScriptText(id) {
  tdl.log("loading: ", id);
  var elem = document.getElementById(id);
  if (!elem) {
    throw 'no element: ' + id
  }
  return elem.text;
}

function setViewSettings(index) {
  function setGlobal(name, value) {
    $(g_uiWidgets.globals[name]).slider("value", value * 1000);
    g.globals[name] = value;
  }

  var viewSettings = g_viewSettings[index];
  setSettings({globals: viewSettings})
}

function advanceViewSettings() {
  setViewSettings(g_viewSettingsIndex);
  g_viewSettingsIndex = (g_viewSettingsIndex + 1) % g_viewSettings.length;
}

/**
 * Sets the count
 */
function setSetting(elem, id) {
  switch (id) {
  case 8:
    break;
  case 7:
    advanceViewSettings();
    break;
  default:
    g_numSettingElements[id] = elem;
    setSettings({globals:{fishSetting:id}});
    for (var otherElem in g_numSettingElements) {
      g_numSettingElements[otherElem].style.color = "gray";
    }
    elem.style.color = "red";
  }
}

/**
 * Sets up the count buttons.
 */
function setupCountButtons() {
  for (var ii = 0; ii < 100; ++ii) {
    var elem = document.getElementById("setSetting" + ii);
    if (!elem) {
      break;
    }
    g_setSettingElements.push(elem);
    elem.onclick = function(elem, id) {
      return function () {
        setSetting(elem, id);
      }}(elem, ii);
  }

  if (g_sync) {
    setSetting(document.getElementById("setSetting4"), 4);
  } else {
    setSetting(document.getElementById("setSetting2"), 2);
  }
  setSetting(document.getElementById("setSetting7"), 7);
}

/**
 * Initializes stuff.
 */
function initializeCommon() {
  setupCountButtons();

  function toggleOption(name, option, elem) {
    var options = { };
    options[name] = {enabled:!option.enabled};
    setSettings({options:options});
    elem.style.color = option.enabled ? "red" : "gray";
    switch (option.name) {
    case 'normalMaps':
      setShaders();
      break;
    case 'reflection':
      setShaders();
      break;
    case 'tank':
      break;
    case 'fog':
      setShaders();
      break;
    }
  }

  var optionsContainer = document.getElementById("optionsContainer");
  for (var name in g.options) {
    var option = g.options[name];
    option.name = name;
    var div = document.createElement('div');
    div.appendChild(document.createTextNode("-" + option.text));
    div.style.color = option.enabled ? "red" : "gray";
    div.setAttribute('class', "clickable");

    function toggle(name, option, div) {
      return function() {
        toggleOption(name, option, div);
        return false;
      };
    }

    option.toggle = toggle(name, option, div);
    $(div).click(option.toggle);
    div.onmousedown = function() { return false; };
    div.onstartselect = function() { return false; };
    optionsContainer.appendChild(div);
  }

  if (g_sync) {
    var server = window.location.href.match(/\/\/(.*?)\//)[1];
    tdl.log("server:", server);
    g.net.server = server;
    g_syncManager.init(g.net.server, g.net.port, g_slave);
    if (!g_slave) {
      g_viewSettingsIndex = 4;
      setViewSettings(g_viewSettingsIndex);
    }
  }

  return true;
}

var g_event;
var g_ui;

function getParamId(id) {
  return id.substr(6).replace(/(\w)/, function(m) {return m.toLowerCase() });
}

function setParam(event, qui, ui, obj, valueElem) {
  var id = event.target.id;
  var value = qui.value / 1000;
  valueElem.innerHTML = value;
  var inner = {}
  var settings = {};
  settings[ui.obj] = inner;
  inner[ui.name] = value;
  setSettings(settings);
}

function getUIValue(obj, id) {
  return obj[id] * 1000;
}

function setupSlider($, elem, ui, obj) {
  var textDiv = document.createElement('div');
  var labelDiv = document.createElement('span');
  labelDiv.appendChild(document.createTextNode(ui.name));
  var valueDiv = document.createElement('span');
  valueDiv.appendChild(
      document.createTextNode(getUIValue(obj, ui.name) / 1000));
  valueDiv.style.position = "absolute";
  valueDiv.style.right = "10px";
  var sliderDiv = document.createElement('div');
  sliderDiv.id = ui.name;
  textDiv.appendChild(labelDiv);
  textDiv.appendChild(valueDiv);
  elem.appendChild(textDiv);
  elem.appendChild(sliderDiv);
  if (!g_uiWidgets[ui.obj]) {
    g_uiWidgets[ui.obj] = { };
  }
  g_uiWidgets[ui.obj][ui.name] = sliderDiv;
  $(sliderDiv).slider({
    range: false,
    step: 1,
    max: ui.max * 1000,
    min: ui.min || 0,
    value: getUIValue(obj, ui.name),
    slide: function(event, qui) { setParam(event, qui, ui, obj, valueDiv); }
  });
}

function AddUI(uiObj) {
  var uiElem = document.getElementById('ui');
  for (var ii = 0; ii < uiObj.length; ++ii) {
    var ui = uiObj[ii];
    var obj = g[ui.obj];
    obj[ui.name] = ui.value;
    var div = document.createElement('div');
    setupSlider($, div, ui, obj);
    uiElem.appendChild(div);
  }
}

function setSettings(settings) {
  g_syncManager.setSettings(settings);
}

$(function(){

  AddUI(g_ui);

  g_syncManager = new tdl.sync.SyncManager(g);

  if (g.net.msg && g.net.msg.length) {
    $("#msgContainer").append(g.net.msg);
  } else {
    $("#msgContainer").hide();
  }

  if (g.net.id !== undefined) {
    g_sync = true;
    g.globals.fishSetting = 4;
    if (g.net.id != 0) {
      g_slave = true
    } else {
      $("#msgContainer").show();
      AddUI(g_netUI);
    }
  }

  $('#setSetting8').click(function() {
      $("#uiContainer").toggle('slow'); return false; });
  $("#uiContainer").toggle();
  $('#options').click(function() {
      $("#optionsContainer").toggle(); return false; });
  $("#optionsContainer").toggle();

  if (g_slave) {
    $('#topUI').hide();
  } else {
    $(document).keypress(function(event) {
      if (event.keyCode == 'l'.charCodeAt(0) ||
          event.keyCode == 'L'.charCodeAt(0)) {
        setSettings({drawLasers: !g.drawLasers});
      } else if (event.keyCode == ' '.charCodeAt(0)) {
        advanceViewSettings();
      }
    });
  }

  initialize();
});


