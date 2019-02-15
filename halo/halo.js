/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
tdl.require('tdl.webgl');

var gl = null;

//////////////////////////////////////////////////////////////////////////////
// Shader sub-module
(function() {

// static "class members" for vertex array and shader tracking.
var boundShader = null,
    enabledArrays = 0,
    shaderTypes = {
        'float': [1, 'f'],
        'vec2': [2, 'f'],
        'vec3': [3, 'f'],
        'vec4': [4, 'f'],
        'int': [1, 'i'],
        'ivec2': [2, 'i'],
        'ivec3': [3, 'i'],
        'ivec4': [4, 'i'],
        'mat2': [2, 'm'],
        'mat3': [3, 'm'],
        'mat4': [4, 'm'],
        'sampler2D': [1, 'i']
    };

var Shader = function(vertexId, fragmentId) {
    var vertexSource = document.getElementById(vertexId).text,
        fragmentSource = document.getElementById(fragmentId).text,
        re = /(uniform|attribute)\s+\S+\s+(\S+)\s+(\S+)\s*;/g,
        match = null,
        loadShaderSucceeded = false;

    this._arrays = 0;
    this._program = gl.createProgram();

    try {
        this.loadShader(gl.VERTEX_SHADER, vertexId);
        this.loadShader(gl.FRAGMENT_SHADER, fragmentId);
        loadShaderSucceeded = true;
    } finally {
        // Javascript doesn't have a real rethrow, do this terrible flag based
        // hack.
        if (!loadShaderSucceeded)
            gl.deleteProgram(this._program);
    }

    gl.linkProgram(this._program);
    if (!gl.getProgramParameter(this._program, gl.LINK_STATUS) &&
        !gl.isContextLost()) {
        tdl.log("programInfoLog:", gl.getProgramInfoLog(this._program));
        gl.deleteProgram(this._program);
        throw "Program " + vertexId + ", " + fragmentId + " didn't link."
    }

    while ((match = re.exec(vertexSource + '\n' + fragmentSource)) !== null) {
        var name = match[3],
            type = match[2],
            qualifier = match[1];
        if (qualifier == 'uniform')
            this.makeUniformFunction(name, type);
        else
            this.makeAttributeFunction(name);
    }
}
Shader.prototype = {
    loadShader: function(type, shaderId) {
        var shaderSource = document.getElementById(shaderId).text,
            shader = gl.createShader(type);

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) &&
            !gl.isContextLost()) {
            tdl.log(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            throw "Shader " + shaderId + " didn't compile.";
        }

        gl.attachShader(this._program, shader);
        gl.deleteShader(shader);
    },
    makeAttributeFunction: function(name) {
        var loc = gl.getAttribLocation(this._program, name);
        if (loc >= 0) {
            this._arrays |= 1 << loc;
            this[name] = function(size, type, normalized, stride,
                    ofs) {
                this.bind();
                gl.vertexAttribPointer(loc, size, type, normalized, stride,
                    ofs);
            }
        } else {
            this[name] = function() {};
        }
    },
    makeUniformFunction: function(name, typeName) {
        var size = shaderTypes[typeName][0],
            type = shaderTypes[typeName][1],
            loc = gl.getUniformLocation(this._program, name);
        switch (type) {
        case 'i':
        case 'f':
            this[name] = function() {
                // TODO: It feels wrong to have to copy arguments to prepend to
                // it
                this.bind();
                var args = [loc], i;
                for (i = 0; i < arguments.length; i++)
                    args.push(arguments[i]);
                gl['uniform' + size + type].apply(gl, args);
            };
            break;

        case 'm':
            this[name] = function(matrix) {
                this.bind();
                gl['uniformMatrix' + size + 'fv'](loc, gl.FALSE, matrix);
            }
            break;
        }
    },
    bind: function() {
        if (boundShader === this)
            return;

        boundShader = this;
        gl.useProgram(this._program);

        // Enable the correct vertex arrays
        var diff = enabledArrays ^ this._arrays,
            enable = diff & this._arrays,
            disable = diff & enabledArrays,
            i;

        for (i = 0; enable; i++, enable >>= 1)
            if (enable & 1)
                gl.enableVertexAttribArray(i);
        for (i = 0; disable; i++, disable >>= 1)
            if (disable & 1)
                gl.disableVertexAttribArray(i);
        enabledArrays = this._arrays;
    },
    free: function() {
        gl.deleteProgram(this._program);
    }
}
window.Shader = Shader;

})();


//////////////////////////////////////////////////////////////////////////////
// Time Log sub-module
(function(window) {

var TimeLog = function() {
    this.events = []
    this.times = {}
    this.reset();
}
TimeLog.prototype = {
    mark: function(name) {
        if (this.times[name] === undefined) {
            this.events.push(name);
            this.times[name] = [];
        }
        this.times[name].push(new Date().getTime());
    },
    reset: function() {
        this.events = [];
        this.times = {};
    },
    start: function() {
        this.mark('_start');
    },
    running: function() {
        return this.events.length > 0;
    },
    log: function() {
        tdl.log('Time log');
        for (var i = 1; i < this.events.length; i++) {
            var last_times = this.times[this.events[i - 1]],
                current_times = this.times[this.events[i]];
            var average = 0.;
            for (var j = 0, l = last_times.length; j < l; j++) {
                average += current_times[j] - last_times[j];
            }
            average /= last_times.length;
            tdl.log(this.events[i], average, 'ms');
        }
    },
    samples: function() {
        return this.times['_start'].length;
    }
}

window.TimeLog = TimeLog;

})(window);


//////////////////////////////////////////////////////////////////////////////
// Animation sub-module
(function() {

var range = function(low, high) {
    return (Math.random() * (high - low) + low) | 0;
}

var Animator = function(tricks, single) {
    this.tricks = tricks;
    this.running = [];
    this.next = 0;
    this.single = single;
    this.wasRunning = false;

    this.trickList = []
    for (trick in tricks) {
        this.running.push(false);
        this.trickList.push(trick);
    }
}
Animator.prototype = {
    run: function(now) {
        var running = false;
        for (var i = 0, l = this.trickList.length; i < l; i++) {
            if (this.running[i]) {
                if (this.tricks[this.trickList[i]].run(now)) {
                    this.running[i] = false;
                } else {
                    running = true;
                }
            }
        }

        // TODO: work on startup mess
        if (!this.wasRunning || !this.single)
            this.startTrick(now);
        this.wasRunning = running;
    },
    startTrick: function(now, trickNum) {
        if (trickNum === undefined) {
            var tries = 10;
            do {
                trickNum = (Math.random() * (this.trickList.length - 1) +
                    0.5) | 0;
                trick = this.tricks[this.trickList[trickNum]];
            } while ((this.running[trickNum] == true ||
                !trick.runnable(now)) &&
                --tries > 0);
            if (tries <= 0)
                return;
        }
        trick = this.tricks[this.trickList[trickNum]];

        // tdl.log('starting trick', this.trickList[trickNum]);
        this.running[trickNum] = true;
        trick.start(now);
    }
}
window.Animator = Animator;

var Trick = function(actions, conflicts) {
    this.actions = actions;
    this.conflict = [];
    this.animations = [];
    this.startTime = 0;
    this.cooldownTime = 0;
}
Trick.prototype = {
    start: function(now) {
        this.startTime = now;
        this.animations = [];
        this.actions(this);
    },
    run: function(now) {
        var done = true,
            time = now - this.startTime;

        for (var i = 0, l = this.animations.length; i < l; i++) {
            done = this.animations[i].run(time) && done;
        }
        if (done)
            this.animations = [];
        return done;
    },
    runnable: function(now) {
        return now > this.cooldownTime;
    },
    animate: function(obj, property, value, start, stop) {
        var animation = new Animation(obj, property, value, start, stop);
        this.animations.push(animation);
    },
    cooldown: function(when) {
        this.cooldownTime = this.startTime + range(when, 3 * when);
        if (Math.random < .3) {
            this.cooldownTiem += range(10000, 20000);
        }
    }
}
window.Trick = Trick;

var Animation = function(obj, property, value, start, stop) {
    this.obj = obj;
    this.property = property;
    this.right = value;
    this.start = start;
    this.stop = stop;
    this.state = 0;
}
Animation.prototype = {
    run: function(now) {
        if (this.state == 0 && now >= this.start) {
            this.state = 1;
            this.left = this.obj[this.property];
        }
        if (this.state == 1) {
            var alpha = (now - this.start) / (this.stop - this.start);
            if (alpha < 0.) {
                alpha = 0;
            } else if (alpha > 1.) {
                alpha = 1;
                this.state = 2;
            }
            this.obj[this.property] = alpha * (this.right - this.left) +
                this.left;
        }
        if (this.obj[this.property] === undefined) {
            tdl.log(this);
        }
        return this.state == 2;
    }
}

})();


//////////////////////////////////////////////////////////////////////////////
// Texture sub-module
(function() {

var mod = function(x, y) {
    return x - Math.floor( x / y) * y;
}

var hsvToRgb = function(hue, saturation, value) {
    // hue from 0. to 1. instead of the traditional 0 to 360

    hue = mod(hue, 1.);
    var c = value * saturation,
        x = c * (1 - Math.abs(mod(hue * 6., 2.) - 1.)),
        m = value - c,
        rgb;

    switch ((hue * 6.) | 0) {
    case 0: rgb = [c, x, 0]; break;
    case 1: rgb = [x, c, 0]; break;
    case 2: rgb = [0, c, x]; break;
    case 3: rgb = [0, x, c]; break;
    case 4: rgb = [x, 0, c]; break;
    case 5: rgb = [c, 0, x]; break;
    }

    rgb[0] = (255. * (rgb[0] + m) + 0.5) | 0;
    rgb[1] = (255. * (rgb[1] + m) + 0.5) | 0;
    rgb[2] = (255. * (rgb[2] + m) + 0.5) | 0;

    return rgb
}
window.hsvToRgb = hsvToRgb;

var makeColorRamp = function(h1, s1, v1, h2, s2, v2, size, count, limit) {
    var ramp = new Array(3 * size),
        hDiff = h2 - h1,
        sDiff = s2 - s1,
        vDiff = v2 - v1,
        pos = 0,
        posDir = 1,
        alpha = 0,
        rgb,
        i;

    for (i = 0; i < limit; i++) {
        alpha = pos / (count - 1);
        ramp[3 * i + 0] = h1 + alpha * hDiff;
        ramp[3 * i + 1] = s1 + alpha * sDiff;
        ramp[3 * i + 2] = v1 + alpha * vDiff;

        pos += posDir;
        if (pos < 0 || pos >= count) {
            posDir = -posDir;
            pos += 2 * posDir;
        }
    }
    for (; i < size; i++) {
        ramp[3 * i + 0] = ramp[3 * (limit - 1) + 0];
        ramp[3 * i + 1] = ramp[3 * (limit - 1) + 1];
        ramp[3 * i + 2] = ramp[3 * (limit - 1) + 2];
    }

    return ramp;
}
window.makeColorRamp = makeColorRamp;

var Texture = function(gl, size) {
    this.gl = gl;
    this.size = size;

    this.count = 8;
    this.limit = size;

    this.factors = new Array(3 * this.size);
    for (var i = 0; i < this.size; i++) {
        this.factors[3 * i + 0] = 0;
        this.factors[3 * i + 1] = 0;
        this.factors[3 * i + 2] = 1;
    }

    this.data = new Uint8Array(4 * size);
    for (var i = 0; i < this.size; i++)
        this.data[4 * i + 3] = 255;

    this.textureId = this.gl.createTexture();

    this.bind();
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
}
Texture.prototype = {
    bind: function() {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureId);
    },
    make: function() {
        var h1, s1, v1, h2, s2, v2;
        do {
            h1 = 2 * Math.random();
            s1 = Math.random();
            v1 = Math.random();
            h2 = 2 * Math.random();
            s2 = Math.random();
            v2 = Math.random();
        } while (s1 + s2 < .4 && v1 + v2 < .6);

        return makeColorRamp(h1, s1, v1, h2, s2, v2,
            this.size, this.count, this.limit, true);
    },
    upload: function(alpha) {
        var i, j, rgb;

        for (var i = 0; i < this.size; i++) {
            rgb = hsvToRgb(this.factors[3 * i + 0],
                this.factors[3 * i + 1], this.factors[3 * i + 2]);
            for (var j = 0; j < this.size; j++) {
                this.data[4 * i + 0] = rgb[0];
                this.data[4 * i + 1] = rgb[1];
                this.data[4 * i + 2] = rgb[2];
            }
        }

        this.bind();
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.size, 1,
            0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.data);
    }
}
window.Texture = Texture;

})();


//////////////////////////////////////////////////////////////////////////////
// Halo sub-module

(function() {

var makeMovePoints = function(halo) {
    return function(trick) {
        for (var i = 0, l = halo.points.length; i < l; i++) {
            var cuts = [];
            for (var j = 0; j < 6; j++) {
                cuts.push(10000. * Math.random());
            }
            cuts.sort(function(a, b) { return a - b; });

            var max = .1 + 1. / halo.viewMatrix[3 * (i & 1)],
                min = -max;

            var cv = halo.points[i];
            for (var j = 1, m = cuts.length; j < m; j++) {
                var length = Math.min(1., (cuts[j] - cuts[j - 1]) / 4000.),
                    low = Math.max(min, cv - length),
                    high = Math.min(max, cv + length),
                    v = Math.random() * (high - low) + low;
                cv = v;

                trick.animate(halo.points, i, v, cuts[j - 1], cuts[j]);
            }
        }
        trick.cooldown(0);
    }
}

var makeChangeOffset = function(halo) {
    return function(trick) {
        trick.animate(halo, 'offset', halo.offset + 10, 0, 3000);
        trick.animate(halo, 'offset', halo.offset, 3000, 6000);
        trick.cooldown(4000);
    }
}

var makeChangeWidth = function(halo) {
    return function(trick) {
        var width = 10 + 60 * Math.random();
        trick.animate(halo, 'invWidth', width, 0, 4000);
        trick.cooldown(10000);
    }
}

var makeLimitOut = function(halo) {
    return function(trick) {
        var nvs = makeColorRamp(0, 0, 0, 0, 0, 1,
            halo.texture.size, 2, 2);
        for (var i = 0; i < 3 * halo.texture.size; ++i) {
            trick.animate(halo.texture.factors, i, nvs[i], 0, 1000);
        }
        var nvs = makeColorRamp(0, 0, 0, 0, 0, 1,
            halo.texture.size, 2, halo.texture.size);
        for (var i = 2; i < halo.texture.size; i += 2) {
            for (var j = 0; j < 6; j++) {
                trick.animate(halo.texture.factors, 3 * i + j, nvs[3 * i + j],
                    1500 + i * 150, 1501 + i * 150);
            }
        }
        trick.cooldown(10000);
    }
}

var makeLimitIn = function(halo) {
    return function(trick) {
        for (var i = 0; i < halo.texture.size; i++) {
            trick.animate(halo.texture.factors, 3 * i + 0, 0, 0, 1000);
            trick.animate(halo.texture.factors, 3 * i + 1, 0, 0, 1000);
            trick.animate(halo.texture.factors, 3 * i + 2, 1, 0, 1000);
        }
        var nvs = halo.texture.make(),
            t = 1000;
        for (var i = halo.texture.size - 1; i >= 0; i -= 1) {
            for (var j = 0; j < 3; j++) {
                trick.animate(halo.texture.factors, 3 * i + j, nvs[3 * i + j],
                    t, t + 1);
            }
            t += 75;
        }
        trick.cooldown(10000);
    }
}

var makeBlendColors = function(halo) {
    return function(trick) {
        var nvs = halo.texture.make();
        for (var i = 0; i < 3 * halo.texture.size; i++) {
            trick.animate(halo.texture.factors, i, nvs[i], 0, 2000);
        }
        trick.cooldown(2000);
    }
}

var makeBlur = function(halo) {
    return function(trick) {
        trick.animate(halo, 'blur', 1., 0, 1000);
        trick.animate(halo, 'blur', 0., 3000, 4000);
        trick.cooldown(10000);
    }
}

var Halo = function() {
    this.viewMatrix = new Float32Array(4);
    this.pixelSize = 1.;
    this.timeLog = new TimeLog();
    this.invWidth = 35.;
    this.offset = 0.1;
    this.shader = new Shader("halo_vertex", "halo_fragment");
    this.blur = 0.;

    this.texture = new Texture(gl, 32);

    this.vbo = gl.createBuffer();
    this.ibo = gl.createBuffer();

    this.points = []
    for (var i = 0; i < 20; ++i) {
        // x, y
        this.points.push(2 * Math.random() - 1);
        this.points.push(2 * Math.random() - 1);
    }

    this.animator = new Animator({
        'movePoints': new Trick(makeMovePoints(this)),
        'changeOffset': new Trick(makeChangeOffset(this)),
        'limitOut': new Trick(makeLimitOut(this)),
        'limitIn': new Trick(makeLimitIn(this)),
        'blendColors': new Trick(makeBlendColors(this)),
        'changeWidth': new Trick(makeChangeWidth(this)),
        'blur': new Trick(makeBlur(this))
    }, false);
    this.animator.startTrick(new Date().getTime(), 2);

    var me = this;
    this.drawClosure = function() { me.draw(); }
}
Halo.prototype = {
    resize: function(width, height) {
        var ratio = width / height;
        this.viewMatrix[1] = this.viewMatrix[2] = 0.;
        if (ratio > 1.) {
            this.viewMatrix[0] = 1.;
            this.viewMatrix[3] = ratio;
            this.pixelSize = 2. / width;
        } else {
            this.viewMatrix[0] = 1. / ratio;
            this.viewMatrix[3] = 1.;
            this.pixelSize = 2. / height;
        }

        // Anti-aliasing adjustment factor
        this.pixelSize *= .7;
    },
    animate: function(now) {
        this.animator.run(now);
    },
    draw: function() {
        if (this.timeLog.running()) {
            this.timeLog.mark('browser');
            if (this.timeLog.samples() >= 200) {
                // this.timeLog.log();
                this.timeLog.reset();
            }
        }

        this.timeLog.start();

        this.timeLog.mark('animation');

        var verts = [];
        for (var i = 0; i < this.points.length; i += 2)
            verts.push(new Vertex(this.points[i], this.points[i + 1]));
        var tri = triangulate(verts, 1.2);
        this.timeLog.mark('triangulation');

        // TODO: These sizes are a bit conservative.
        // One vertex per edge
        // At most one triangle per edge
        var data = new Float32Array(6 * 4 * verts.length),
            idx = new Uint16Array(3 * 6 * verts.length),
            di = 0,
            ii = 0;

        for (var i = 0, l = verts.length; i < l; ++i) {
            var point = verts[i],
                anchor = di,
                count = 0,
                edge = point.edge,
                center;
            do {
                count += 1;
                center = edge.face.data.circumcenter();
                data[4 * di + 0] = center[0];
                data[4 * di + 1] = center[1];
                data[4 * di + 2] = point.x;
                data[4 * di + 3] = point.y;
                ++di;

                edge = edge.twin.next;
            } while (edge !== point.edge);

            for (j = 1; j < count - 1; ++j) {
                idx[ii++] = anchor;
                idx[ii++] = anchor + j;
                idx[ii++] = anchor + j + 1;
            }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STREAM_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STREAM_DRAW);
        this.timeLog.mark('vbo');

        gl.activeTexture(gl.TEXTURE0);
        this.texture.bind();
        this.texture.upload();
        this.timeLog.mark('texture');

        this.shader.bind();
        this.shader.position(2, gl.FLOAT, false, 16, 0);
        this.shader.control_point(2, gl.FLOAT, false, 16, 8);
        this.shader.view_transform(this.viewMatrix);
        this.shader.inv_width(this.invWidth);
        this.shader.offset(this.offset);
        this.shader.blur((this.invWidth * this.pixelSize) * (1 - this.blur) +
            this.blur);
        this.shader.tex(0);
        this.shader.inv_texture_size(1 / 32.);

        gl.drawElements(gl.TRIANGLES, ii, gl.UNSIGNED_SHORT, 0);
        this.timeLog.mark('draw');
    }
};
window.Halo = Halo;

var CircleTransition = function() {
    this.doneValue = 0;
    this.alpha = -1.5;
    this.sign = 1.;
}
CircleTransition.prototype = {
    done: function() {
        return this.doneValue > 0;
    },
    bind: function() {
        this.shader.bind();
        this.shader.alpha(this.alpha);
        this.shader.sign(this.sign);
    },
    shader: null
}

var makeCircle = function(master) {
    return function(trick) {
        var circle = new CircleTransition(),
            endAlpha = .1;
        master.setTransition(circle);

        if (Math.random() < .4) {
            circle.alpha = endAlpha;
            circle.sign = -1.;
            endAlpha = -1.5;
        }
        trick.animate(circle, 'alpha', endAlpha, 0, 1500);
        trick.animate(circle, 'doneValue', 1., 1500, 1501);
        trick.cooldown(5000);
    }
}

var SweepTransition = function() {
    this.origin = [0., 0.];
    this.sign = 1;
    this.alpha = 0.;
    this.doneValue = 0;
    this.target = null;
    this.end = null;

    while (Math.abs(this.origin[0]) < 1.5 && Math.abs(this.origin[1]) < 1.5) {
        this.origin[0] = 12. * Math.random() - 6.;
        this.origin[1] = 12. * Math.random() - 6.;
    }

    var corners = [[-1., -1.], [-1., 1.], [1., 1.], [1., -1.]],
        startAngle = 10.,
        endAngle = -10.;

    for (var i = 0; i < 4; i++) {
        angle = Math.atan2(corners[i][1] - this.origin[1],
            corners[i][0] - this.origin[0]);
        if (angle < startAngle) {
            this.target = corners[i];
            startAngle = angle;
        }
        if (angle > endAngle) {
            endAngle = angle;
            this.end = corners[i];
        }
    }

    self.first = 0;
}
SweepTransition.prototype = {
    done: function() {
        return this.doneValue > 0;
    },
    bind: function() {
        var A = this.target[1] - this.origin[1],
            B = this.origin[0] - this.target[0],
            C,
            inv_len = 1 / Math.sqrt(A * A + B * B);
        A *= inv_len;
        B *= inv_len;
        C = -(A * this.origin[0] + B * this.origin[1]),

        this.shader.bind();
        this.shader.line(A, B, C);
    }
}

var makeSweep = function(master) {
    return function(trick) {
        var sweep = new SweepTransition();
        master.setTransition(sweep);

        trick.animate(sweep.target, 0, sweep.end[0], 0, 1000);
        trick.animate(sweep.target, 1, sweep.end[1], 0, 1000);
        trick.animate(sweep, 'doneValue', 1., 1000, 1001);
        this.cooldown(8000);
    }
}

var Master = function() {
    this.halo = [new Halo(), new Halo()];
    this.fbo = [null, null];
    this.tex = [gl.createTexture(), gl.createTexture()];
    this.width = 1;
    this.height = 1;
    this.vbo = gl.createBuffer();
    this.transition = null;

    CircleTransition.prototype.shader = new Shader("base_effect_vertex",
        "circle_fragment");
    SweepTransition.prototype.shader = new Shader("base_effect_vertex",
        "sweep_fragment");

    this.animator = new Animator({
        'circle': new Trick(makeCircle(this)),
        'sweep': new Trick(makeSweep(this))
    }, true);

    // setup textures
    for (var i = 0; i < 2; i++) {
        gl.bindTexture(gl.TEXTURE_2D, this.tex[i]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    // setup vbo
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([-1., -1., 1., -1., 1., 1., -1., 1.]),
        gl.STATIC_DRAW);

    var me = this;
    this.drawClosure = function() {
        me.draw();
    };
}
Master.prototype = {
    preanimate: function() {
        // Work around janky animation startup by running the animations for a
        // while before starting.
        var now = new Date().getTime();
        for (var time = now - 20.; time < now; time += 0.1) {
            for (var i = 0; i < 2; i++) {
                this.halo[i].animate(now);
            }
            this.animator.run(now);
        }
    },
    draw: function() {
        var now = new Date().getTime();
        for (var i = 0; i < 2; i++) {
            this.halo[i].animate(now);
        }
        this.animator.run(now);

        if (!this.transition) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            this.halo[0].draw();
            return;
        }

        for (var i = 0; i < 2; i++) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo[i]);
            this.halo[i].draw();
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        this.transition.bind();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        this.transition.shader.position(2, gl.FLOAT, false, 8, 0);

        var viewMatrix = this.halo[0].viewMatrix,
            invDet = 1. / (viewMatrix[0] * viewMatrix[3] -
                viewMatrix[1] * viewMatrix[2]),
            invViewMatrix = new Float32Array([invDet * viewMatrix[3],
                -invDet * viewMatrix[1], -invDet * viewMatrix[2],
                invDet * viewMatrix[0]]);

        this.transition.shader.view_transform(invViewMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.tex[0]);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.tex[1]);

        this.transition.shader.tex0(0);
        this.transition.shader.tex1(1);
        // TODO: move pixelSize into master
        this.transition.shader.blur(2 * this.halo[0].pixelSize);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        if (this.transition.done()) {
            var t = this.halo[0];
            this.halo[0] = this.halo[1];
            this.halo[1] = t;
            this.transition = null;
        }
    },
    resize: function(width, height) {
        this.width = width;
        this.height = height;
        gl.viewport(0, 0, width, height);

        for (var i = 0; i < 2; i++) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(this.fbo[i]);

            gl.bindTexture(gl.TEXTURE_2D, this.tex[i]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
                gl.RGBA, gl.UNSIGNED_BYTE, null);

            this.fbo[i] = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo[i]);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D, this.tex[i], 0);

            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !=
                gl.FRAMEBUFFER_COMPLETE && !gl.isContextLost())
                throw "die";

            this.halo[i].resize(width, height);
        }
    },
    setTransition: function(transition) {
        this.transition = transition;
    }
}
window.Master = Master;

})();


//////////////////////////////////////////////////////////////////////////////
// Main
//
// This is the only module that should interact with the DOM

(function() {

var master;

var resize = function() {
    var canvas = document.getElementById("c");
        width = canvas.clientWidth,
        height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    master.resize(width, height);
}

var main = function() {
    var canvas = document.getElementById("c");
    var requestId;

    canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
    // tell the simulator when to lose context.
    canvas.loseContextInNCalls(10000);

    tdl.webgl.registerContextLostHandler(canvas, function() {
            cancelAnimationFrame(requestId);
        });
    tdl.webgl.registerContextRestoredHandler(canvas, function() {
            start();
        });

    // I hope you don't mind. This is just so all of these demos have
    // one place to handle WebGL not available since the spec is being updated
    // for how to report that and distinguish between the browser doesn't have
    // WebGL vs the hardware/drivers/etc is not up to it.
    gl = tdl.webgl.setupWebGL(canvas);
    if (!gl) {
        return;
    }

    window.addEventListener("resize", resize, false);
    start();

    function start() {
        master = new Master();
        window.master = master;

        resize();

        // This must be done after resize.
        master.preanimate();
        function render () {
            var ok = false;
            try {
                master.drawClosure();
                ok = true;
            } finally {
                if (ok) {
                  requestId = requestAnimationFrame(render);
                }
            }
        };
        render();
    }
}
// changed to work in IE so we can at least report the need WebGL
window.onload = main

})();

