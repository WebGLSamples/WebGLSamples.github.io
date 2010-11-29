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

/**
 * Initializes stuff.
 */
function initialize() {
  math = tdl.math;
  fast = tdl.fast;

  initializeCommon();

  return true;
}



