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
var shadowProj_fshader = [
"#ifdef GL_ES",
"precision highp float;",
"#endif",

"uniform sampler2D shadowMap;",

"varying vec4 vShadowCoord;",
				
"void main()",
"{",

// Project the texture coords
"	vec4 shadowCoord    = vec4(vShadowCoord.xyz / vShadowCoord.w, vShadowCoord.w);",
"	vec4 shadow = texture2D(shadowMap, shadowCoord.xy);",
"   float alpha = 1.0 - dot(shadow.rgb, vec3(1.0, 1.0, 1.0))/2.0;",
"	gl_FragColor = vec4(0.0, 0.0, 0.0, shadow.a);",

"}"].join("\n");
