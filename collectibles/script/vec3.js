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

// basic vectors

function vec3(x, y, z)
{
	// the data
	this.x = x;
	this.y = y;
	this.z = z;
}

vec3.prototype.scale = function(s)
{
	this.x*=s;
	this.y*=s;
	this.z*=s;
};

vec3.prototype.getAsArray = function()
{
	return [ this.x, this.y, this.z ];
};

vec3.prototype.getAsWebGLFloatArray = function()
{
	return new Float32Array(this.getAsArray());
};

vec3.prototype.length = function()
{
     return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
};

vec3.prototype.lengthSqrd = function()
{
	return dotVec3(this, this);
};

vec3.prototype.normalize = function()
{
	length = this.length();
	if (length == 0) {
		// bad vector, just use something reasonable
		this.x = 0;
		this.y = 0;
		this.z = 1;
	} else if (length != 1) {
		this.x /= length;
		this.y /= length;
		this.z /= length;
	}
};


vec3.prototype.normalized = function()
{
	length = this.length();
	
	var v = new vec3(0.0, 0.0, 0.0);
	
	if(length == 0)
	{
	    v = lookVec();
	}
	else {
		v.x = this.x / length;
		v.y = this.y / length;
		v.z = this.z / length;
	}
	
	return v;
};


vec3.prototype.negate = function()
{
	this.x = -1*this.x;
	this.y = -1*this.y;
	this.z = -1*this.z;
};

vec3.prototype.setvec = function(v) 
{
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
};

vec3.prototype.toString = function()
{
	return "(" + this.x + "," + this.y + "," + this.z + ")";
};


function addVec3 (v1, v2)
{
	return new vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

function subVec3(v1, v2)
{
	return new vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

function dotVec3(v1, v2)
{
	return (v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
}

function crossVec3(v1, v2)
{
	return new vec3( (v1.y*v2.z - v2.y*v1.z), -(v1.x*v2.z - v2.x*v1.z), (v1.x*v2.y - v2.x*v1.y) );
}

function lerpVec3(vecA, vecB, lambda)
{
	var b = subVec3(vecB, vecA);
	b.scale(lambda);
	return addVec3(vecA,  b);
}

function negateVec3(vec)
{
   var v = new vec3(vec.x, vec.y, vec. z);
   v.x = -1*vec.x;
   v.y = -1*vec.y;
   v.z = -1*vec.z;
   
   return v;
}

function scaleVec3(vec, scale)
{
   var v = new vec3(vec.x, vec.y, vec. z);
   v.x *= scale;
   v.y *= scale;
   v.z *= scale;
   
   return v;
}


function zeroVec()
{
	return new vec3(0,0,0);
}

function rightVec()
{
	return new vec3(1,0,0);
}

function upVec()
{
	return new vec3(0,1,0);
}

function lookVec()
{
	return new vec3(0,0,1);
}

