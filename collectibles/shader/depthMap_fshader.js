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
var depthMapFShader = [

"#ifdef GL_ES",
"precision highp float;",
"#endif",                     
"varying vec4 vPos;",

"void main()",
"{",

// pack into 32 bits using customer bitshift since bit operator & not available
//"   const vec4 bit_shift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);",
//"	const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);",
////"	vec4 depthColor = fract( ((vPos.z - 5.0)/10.0) * bit_shift);",
////"	vec4 depthColor = fract( (vPos.z*(99.0)+1.0) * bit_shift);",
//"	vec4 depthColor = fract( (vPos.z/vPos.w) * bit_shift);",
//"	depthColor = -(depthColor.xxyz * bit_mask);",
//"	gl_FragColor = depthColor;",
////"	gl_FragColor = vec4(0.0, depthColor.r/256.0, depthColor.g/256.0, 1.0);",
//"   float depth = (vPos.z - 5.0)/10.0;",
//"	gl_FragColor = vec4(depth, depth, depth, 1.0);",
"float shadow = 0.5;",
"	gl_FragColor = vec4(shadow,shadow,shadow, 1.0);",

"}"].join("\n");


