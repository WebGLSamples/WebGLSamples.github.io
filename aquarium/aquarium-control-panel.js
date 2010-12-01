tdl.require('tdl.clock');
tdl.require('tdl.fast');
tdl.require('tdl.io');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.sync');

// globals
var math;                 // the math lib.
var fast;                 // the fast math lib.
var g_setSettingElements = [];
var g_numSettingElements = {};

var g_ui = [
  { obj: 'globals', label: 'Look Down - Up',               name: 'targetHeight',    value: 0,     max:  150 },
  { obj: 'globals', label: 'Move Donw - Up',               name: 'eyeHeight',       value: 19,    max:  150 },
  { obj: 'globals', label: 'Distance from Center of Tank', name: 'eyeRadius',       value: 60,    max:  200 },
  { obj: 'globals', label: 'Field Of View',                name: 'fieldOfView',     value: 85,    max:  120, min: 1},
  { obj: 'globals', label: 'Fog Edge Sharpness',           name: 'fogPower',        value: 14.5,  max:  50},
  { obj: 'globals', label: 'Fog Amount',                   name: 'fogMult',         value: 1.66,  max:  10},
];

/**
 * Initializes stuff.
 */
function initialize() {
  math = tdl.math;
  fast = tdl.fast;

  initializeCommon();

  return true;
}


$(function(){
  g.net.sync = true;

  AddUI(g_ui);
  $("#reset").button().click(function() {
    resetViewSettings();
  });
  $("#changeView").button().click(function() {
    advanceViewSettings();
  });
  $("#lasers").button().click(function() {
    setSettings({drawLasers: !g.drawLasers});
  });
  $("#fish250").button().click(function() {
    setSettings({globals:{ fishSetting: 4}});
  });
  $("#fish1000").button().click(function() {
    setSettings({globals:{ fishSetting: 6}});
  });

  g_syncManager = new tdl.sync.SyncManager(g, updateUI);

  var div = document.getElementById("contentOuter");
  div.onmousedown = function() { return false; };
  div.onstartselect = function() { return false; };

  initialize();
});


