//
// Copyright 2011, Google Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
(function($) {
  $.fn.gradientEditor = function(options) {

    var defaults = {  
      width: 512,  
      height: 40,
      stopWidth: 12,
      stopHeight: 10,
      initialColor: "#ff00ff",
      onChange: function() {},
      colors: [
        {position: 0.0, color: "#000000"},
        {position: 1.0, color: "#ffffff"}
      ]
    };  

    var options = $.extend(defaults, options);  

    function addGradientStops(gradient, stops) {
      for (var ii = 0; ii < stops.length; ++ii) {
        var stop = stops[ii];
        gradient.addColorStop(stop.position, stop.color);
      }
    }

    function makeCanvasGradient(ctx, stops) {
      var gradient = ctx.createLinearGradient(0, 0, options.width, 0);
      addGradientStops(gradient, stops);
      return gradient;
    }

    function makeCSSGradient(stops) {
      return '-webkit-linear-gradient(left, red, green, blue);';
      
      var css = [];
      for (var ii = 0; ii < stops.length; ++ii) {
        var stop = stops[ii];
        css.push('' + stop.color + ' ' + stop.position + '%');
      }
      var colors = css.join(", ");
      return '' +
        '-webkit-linear-gradient(left, ' + colors + ') ' +
        '-o-linear-gradient(left, ' + colors + ') ' +
        '-ms-linear-gradient(left, ' + colors + ') ' +
        '-moz-linear-gradient(left, ' + colors + ')';
    }

    function rgbHexToColorObj(color) {
      var hex = parseInt(
          ((color.indexOf('#') > -1) ? color.substring(1) : color), 16);
      return {
        r: (hex & 0xFF0000) >> 16, 
        g: (hex & 0x00FF00) >>  8, 
        b: (hex & 0x0000FF) >>  0, 
        a: 255
      };
    }

    return this.each(function() {
      var half = Math.floor(options.stopWidth / 2);
      var lastColor = options.initialColor;
      var copyable = false;

      var obj = $(this);
      obj.html(
        '<div class="gradient-editor-container">' + 
          '<div class="gradient-editor-gradient">' + 
            '<canvas></canvas>' +
          '</div>' +
          '<div class="gradient-editor-colors"></div>' + 
          '<div class="gradient-editor-color-editor"></div>' + 
          '<div class="gradient-editor-instructions">' +
            '<div>double click to add stop</div>' +
            '<div>drag stop down to remove</div>' + 
            '<div>alt-drag to duplicate</div>' + 
          '</div>' + 
        '</div>' 
      );
      var outer = $('.gradient-editor-container', obj); 
      var gradient = $('.gradient-editor-gradient', obj); 
      var canvasObj = $('.gradient-editor-gradient canvas', obj); 
      var canvas = canvasObj[0]; 
      var colors = $('.gradient-editor-colors', obj); 
      var colorEditor = $('.gradient-editor-color-editor', obj);
      var instructions = $('.gradient-editor-instructions', obj);
      var currentStop;

      colorEditor.css("position", "absolute");
      colorEditor.ColorPicker({
        color: rgbHexToColorObj(lastColor),
        flat: true,
        onChange: function(hsb, hex, rgb) {
          lastColor = '#' + hex.substr(0, 6);
          if (currentStop) {
            currentStop.setColor(lastColor);
            updateGradient(true);
          }
        }
      });
        
      colorEditor.css({ "left" : half,
                        "top"  : 5 + options.height + options.stopHeight + "px" });

      outer.css({ "position": "relative",
                  "width"   : options.width + 5 + options.stopWidth + "px",
                  "height"  : colorEditor[0].clientHeight + 10 + 
                               options.height + options.stopHeight + "px" });

      instructions.css({  "position": "absolute", 
                          "left"    : colorEditor[0].clientWidth + 10 + "px",
                          "top"     : options.height + 5 + options.stopHeight + "px"});

      gradient.css({"width"   : options.width,
                    "height"  : options.height,
                    "position": "absolute",
                    "left"    : half + "px"});

      colors.css({"width"   : options.width + options.stopWidth + 2,
                  "height"  : options.stopHeight,
                  "position": "absolute",
                  "top"     : options.height + "px"});
                    
      var stops = []
      var css = makeCSSGradient(stops);
      canvas.width = options.width;
      canvas.height = options.height;
      var ctx = canvas.getContext("2d");


                  
      function addStop(position, color) {
        var stop = {
          color: color,
          position: position,
          inside: true
        };
        stops.push(stop);
        currentStop = stop;

        var stopObj = $(
            '<div class="gradient-editor-color-stop">' + 
              '<div class="gradient-editor-color"></div>' + 
            '</div>');
        var colorObj = $('.gradient-editor-color', stopObj);
        
        
        stopObj.css({ "width" : options.stopWidth,
                      "height": options.stopHeight});
        colorObj.css({"width"           : options.stopWidth,
                      "height"          : options.stopHeight,
                      "backgroundColor" : color});
        
        
        stop.setColor = function(color) {
          stop.color = color;
          colorObj.css("backgroundColor", color);
        };
        stopObj.draggable({
          axis: 'x',
          containment: 'parent',
          cursor: 'pointer',
          drag: function(event, ui) {
            var update = false;
            var parentOffset = $(event.target).parent().offset(); 
            var y = event.pageY - parentOffset.top;
            var newPosition = Math.min(
                1, 
                Math.max(0, ui.position.left / options.width)); 
            if (!event.altKey) {
              copyable = true;
            }
            if (y < 20) {
              if (!stop.inside) {
                stop.inside = true;
                stops.push(stop);
                colorObj.show();
                update = true;
              } else {
                if (event.altKey && copyable) {
                  copyable = false;
                  addStop(newPosition, lastColor);
                }
              }
            } else if (y >= 20) {
              if (stop.inside) {
                stops.splice(stops.indexOf(stop), 1);
                stop.inside = false;
                colorObj.hide();
                update = true;
              }
            }
            if (newPosition != stop.position) {
              stop.position = newPosition;
              update = true;
            }
            if (update) {
              updateGradient(true);
            }
          },
          start: function(event, ui) {
             currentStop = stop;
             colorEditor.ColorPickerSetColor(rgbHexToColorObj(stop.color));
             copyable = true;
          },
          stop: function(event, ui) {
             if (!stop.inside) {
               currentStop = null;
               stopObj.draggable('destroy');
               colors.remove(stopObj);
             }
          }
        });
        stopObj.mousedown(function(event) {
          currentStop = stop;
          lastColor = stop.color;
          colorEditor.ColorPickerSetColor(rgbHexToColorObj(stop.color));
        });
        //stopObj.data('draggable').offset.click.left
        colors.append(stopObj);
        var p = "" + Math.floor(position * options.width) + " 0";
        stopObj.position({
          my: "left",
          at: "left",
          of: colors,
          offset: p
        });
      }

      for (var ii = 0; ii < options.colors.length; ++ii) {
        var stop = options.colors[ii];
        addStop(stop.position, stop.color);
      }

      colors.dblclick(function(event) {
        var parentOffset = $(event.target).parent().offset(); 
        var x = event.pageX - parentOffset.left - options.stopWidth / 2;
        addStop(Math.max(0, Math.min(1, x / options.width)), lastColor);
        updateGradient(true);
      });

      function copyStops(stops) {
        var newStops = [];
        for (var ii = 0; ii < stops.length; ++ii) {
          var stop = stops[ii];
          newStops.push({
            position: stop.position,
            color: stop.color
          });
        }
        return newStops;
      }

      function updateGradient(callback) {
        ctx.fillStyle = makeCanvasGradient(ctx, stops);
        ctx.fillRect(0, 0, options.width, options.height);
        if (callback) {
          options.onChange(copyStops(stops));
        }
      }

      updateGradient();
    });
  }  

})(jQuery);
