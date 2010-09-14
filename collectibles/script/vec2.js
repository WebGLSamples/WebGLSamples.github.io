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

function vec2(x, y)
{
	
	this.x = x;
	this.y = y;
}

vec2.prototype.scale = function( scale)
{
   this.x*=scale; this.y*=scale;
};
	
vec2.prototype.lerp = function(vecA, ecB, lambda)
{
	b = subVec2(vecB, vecA);
	b.scale(lambda);
	return add(vecA,  b);
};
	
vec2.prototype.addVec2 = function(v1, v2)
{
	return new Vector2(v1.x + v2.x, v1.y + v2.y);
};

vec2.prototype.subVec2 = function(v1, v2)
{
	return new Vector2(v1.x - v2.x, v1.y - v2.y);
};
	
vec2.prototype.zeroVec2 = function()
{
	return new vec2(0,0);
};

vec2.prototype.rightVec2 = function()
{
	return new vec2(1,0);
};

vec2.prototype.upVec2 = function()
{
	return new vec2(0,1);
};
