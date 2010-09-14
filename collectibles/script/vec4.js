/*
Copyright (c) 2010 Human Engines Inc. All rights reserved.
 
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:
 
   * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.

   * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function vec4(x, y, z, w)
{
	// the data
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

vec4.prototype.getAsArray = function()
{
	return [ this.x, this.y, this.z, this.w ];
};

vec4.prototype.getAsWebGLFloatArray = function()
{
	return new Float32Array(this.getAsArray());
};

vec4.prototype.toString = function() 
{
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")" ;
};

vec4.prototype.toURLString = function() 
{
    var x = (this.x*10).toFixed(2);
    var y = (this.y*10).toFixed(2);
    var z = (this.z*10).toFixed(2);
    var w = (this.w*10).toFixed(2);
    return x + "," + y + "," + z + "," + w ;
};

vec4.prototype.setvec = function(v) 
{
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w;
};
