//
//Copyright (c) 2010 Human Engines Inc. All rights reserved.
// 
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are
//met:
// 
//   * Redistributions of source code must retain the above copyright
//notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above
//copyright notice, this list of conditions and the following disclaimer
//in the documentation and/or other materials provided with the
//distribution.
// 
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

var shadow_vshader = [
"attribute vec3 vert;",
"attribute vec3 normal;",
"attribute vec2 texcoord;",

// matrix uniforms
"uniform mat4 u_mvMatrix;",
"uniform mat4 u_projMatrix;",

"uniform mat4 u_shadowLightWorld;",
"uniform mat4 u_shadowBiasMatrix;",
"uniform mat4 u_vShadowLight;",

// varyings
"varying vec4 vShadowCoord;",

"void main()",
"{",

//	position normals and vert
"	vec4 pos	    = (u_mvMatrix*vec4(vert, 1.0));",

//	pass along the geo
"	gl_Position	= u_projMatrix * pos;",

//  compute vertex position from lights point of view 
"	mat4 shadowMat  = u_shadowBiasMatrix*u_projMatrix*u_vShadowLight;",
"   vShadowCoord    = shadowMat * vec4(vert, 1.0);",


"}"].join("\n");
