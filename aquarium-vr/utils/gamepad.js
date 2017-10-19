var gamepads = (function() {
	'use strict';

	var gamepadAPI = function() {
	  this.controllers = [];
	  this.position = [];
	  this.clicked = false;
	  this.pressed = false;
	}

    function getGamepads() {
      if (navigator.getGamepads) {
	    return navigator.getGamepads();
	  }
	  return;
	}

	gamepadAPI.prototype.update = function() {
	  this.clicked = false;
	  var gamepads = getGamepads();
	  if (gamepads) {
	  for (var id in gamepads) {
	  if (gamepads[id] && gamepads[id].buttons) {
	    for (var index in gamepads[id].buttons) {
	      if (gamepads[id].buttons[index].pressed) {
			this.pressed = true;
			  return;
		  }
		}
		if (this.pressed) {
		  this.clicked = true;
		  this.pressed = false;
		  console.log("clicked");
		}
	  }
	}
  }
}

return gamepadAPI;
})();