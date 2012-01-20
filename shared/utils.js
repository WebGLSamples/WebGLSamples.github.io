tdl.require('tdl.fullscreen');

var setupFullscreen = function(buttonId, fullscreenId) {
  function findElement(id) {
    var element = document.getElementById(id);
    if (element) {
      return element;
    }

    var elements = document.getElementsByTagName(id);
    if (elements) {
      return elements[0];
    }
  }

  var fullscreenElement = findElement(fullscreenId);
  var haveFullScreenSupport = (fullscreenElement.webkitRequestFullScreen ||
                               fullscreenElement.mozRequestFullScreen);
  if (!haveFullScreenSupport) {
    return;
  }

  var buttonElement = findElement(buttonId);
  buttonElement.className = 'icon';

  var exitFullscreen;
  var goFullscreen;

  var setButton = function(fullScreenEnabled) {
    if (fullScreenEnabled) {
      buttonElement.innerHTML = '<li class="exit"><a href="#non"></a></li>';
      buttonElement.onclick = exitFullscreen;
    } else {
      buttonElement.innerHTML = '<li class="full"><a href="#non"></a></li>';
      buttonElement.onclick = goFullscreen;
    }
  };

  tdl.fullscreen.onFullScreenChange(fullscreenElement, setButton);

  goFullscreen = function(event) {
    tdl.fullscreen.requestFullScreen(fullscreenElement);
    event.preventDefault();
    return false;
  }

  exitFullscreen = function(event) {
    tdl.fullscreen.cancelFullScreen(fullscreenElement);
    event.preventDefault();
    return false;
  }

  setButton(false);
};



