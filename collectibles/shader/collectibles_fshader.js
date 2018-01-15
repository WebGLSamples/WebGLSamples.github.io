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
var vortexFShader = [

"#ifdef GL_ES",
"precision highp float;",
"#endif",                     

// layer textures (ie face, hair, or shirt pants)       
"uniform sampler2D layerMap1;",
"uniform sampler2D layerMap2;",

// spec map and "color-me" map
"uniform sampler2D colorMeMap1;",
"uniform sampler2D colorMeMap2;",


"uniform sampler2D normalMap1;",
"uniform sampler2D normalMap2;",


// environment map and environment diffuse map
"uniform sampler2D envDiff;",
"uniform sampler2D envMap;",

"uniform mat4 u_invMvMatrix;",          // inverse modelview matrix used with sticker
// stickers
"uniform sampler2D stickerMap0;",
"uniform sampler2D stickerMap1;",
"uniform sampler2D stickerMap2;",
"uniform sampler2D stickerMap3;",
"uniform sampler2D stickerMap4;",
"uniform sampler2D stickerMap5;",
"uniform sampler2D stickerMap6;",
"uniform sampler2D stickerMap7;",

// matrix uniforms
"uniform mat4 u_stickerMatrix0;",       // sticker matrices
"uniform mat4 u_stickerMatrix1;",       // sticker matrices
"uniform mat4 u_stickerMatrix2;",       // sticker matrices
"uniform mat4 u_stickerMatrix3;",       // sticker matrices
"uniform mat4 u_stickerMatrix4;",       // sticker matrices
"uniform mat4 u_stickerMatrix5;",       // sticker matrices
"uniform mat4 u_stickerMatrix6;",       // sticker matrices
"uniform mat4 u_stickerMatrix7;",       // sticker matrices

//vector uniforms
"uniform vec3 u_stickerPos0;",          // sticker locations
"uniform vec3 u_stickerPos1;",          // sticker locations
"uniform vec3 u_stickerPos2;",          // sticker locations
"uniform vec3 u_stickerPos3;",          // sticker locations
"uniform vec3 u_stickerPos4;",          // sticker locations
"uniform vec3 u_stickerPos5;",          // sticker locations
"uniform vec3 u_stickerPos6;",          // sticker locations
"uniform vec3 u_stickerPos7;",          // sticker locations

//material uniforms
"uniform vec4 	u_ambient;",
"uniform vec4 	u_diffuse;",
"uniform vec4 	u_specular;",
"uniform vec4 	u_fillColor1;",
"uniform vec4 	u_fillColor2;",
"uniform vec4 	u_skinColor;",
"uniform float 	u_shininess;",

// varyings
"varying vec3 vNormal;",				// Surface Normal
"varying vec3 vCPos;",					// position
"varying vec3 vECPos;",					// transformed position
"varying vec2 vTexcoord;",				// tex coords
"varying vec3 vEyePos;",
"varying vec3 vSrcNormal;", 			// Surface Normal Not Rotated

"vec3 srcNormal;",

// Function prototypes
// texture projection function
"vec4 TextureProject(mat4 texMat, vec3 texPos, sampler2D sampleMap, vec4 texelColor)",
"{",
"   float facing     = dot(normalize(texPos - vCPos), srcNormal);",
"   if (facing>0.0)",
"   {",
"       mat4 eye          = texMat * u_invMvMatrix;",
"       vec4 eyeVertex    = vec4(vECPos, 1.0);",//u_mvMatrix*vec4(vert, 1.0);",
"       vec4 texel        = eye * eyeVertex;",
"       vec4 stickerTexel = vec4(texture2D(sampleMap, texel.xy));",
"       texelColor.rgb    = (stickerTexel.rgb * stickerTexel.a) + (texelColor.rgb*(1.0-stickerTexel.a));",
"   }",
"   return texelColor;",
"}",

				
"void main()",
"{",

"	vec3 normal         = normalize(vNormal);",
"   srcNormal           = normalize(vSrcNormal);",

"   vec3 mapNormal = normalize(2.0*(texture2D(normalMap1, vTexcoord).xyz + texture2D(normalMap2, vTexcoord).xyz) - 2.0);",
"   mapNormal = mapNormal.x*(cross(vec3(0.0, 1.0, 0.0), normal)) + mapNormal.y*vec3(0.0, 1.0, 0.0) + mapNormal.z*normal;",

// create envmap coordinates
"   vec2 vEnvMapTexcoord = vec2(0.0, 0.0);",
"   vec3 toCam = vec3(vECPos.xyz - vEyePos.xyz);",
"   vec3 r = reflect( normalize(toCam), mapNormal);",
"   float m = 2.0 * sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) );",
"	vEnvMapTexcoord.x = r.x/m + 0.5;",
"	vEnvMapTexcoord.y = r.y/m + 0.5;",

// pre-sample
"   vec4 specTexel1 = texture2D(colorMeMap1, vTexcoord);",
"   vec4 specTexel2 = texture2D(colorMeMap2, vTexcoord);",
"   vec4 faceTexel = texture2D(layerMap1, vTexcoord);",
"   vec4 hairTexel = texture2D(layerMap2, vTexcoord);",

// lighting
"   vec4 envMapTexel1    = vec4(texture2D(envMap, vEnvMapTexcoord).rgb*specTexel1.r + texture2D(envDiff, vEnvMapTexcoord).rgb*(1.0 - specTexel1.r), 0.0)*u_skinColor;",
"   vec4 envMapTexel2    = (vec4(texture2D(envMap, vEnvMapTexcoord).rgb*specTexel2.r + texture2D(envDiff, vEnvMapTexcoord).rgb*(1.0 - specTexel2.r), 0.0))*0.2*u_skinColor;",

////debug
//"   vec4 envMapTexel1    = vec4(texture2D(envMap, vEnvMapTexcoord).rgb*(1.0 - specTexel1.r) + texture2D(envDiff, vEnvMapTexcoord).rgb*specTexel1.r, 0.0)*u_skinColor;",
//"   vec4 envMapTexel2    = (vec4(texture2D(envMap, vEnvMapTexcoord).rgb*(1.0 - specTexel2.r) + texture2D(envDiff, vEnvMapTexcoord).rgb*specTexel2.r, 0.0))*0.2*u_skinColor;",

// make the color scale from 1 to 0 (because when "colorMe" value is 0 the texture color needs to come through, thus, color cannot be 0 but must be 1.0)
"   vec4 colorMod1       = vec4(1.0, 1.0, 1.0, 1.0) - vec4(1.0 - u_fillColor1.r, 1.0 - u_fillColor1.g, 1.0 - u_fillColor1.b, 1.0 - u_fillColor1.a)*specTexel1.g;",
"   vec4 colorMod2       = vec4(1.0, 1.0, 1.0, 1.0) - vec4(1.0 - u_fillColor2.r, 1.0 - u_fillColor2.g, 1.0 - u_fillColor2.b, 1.0 - u_fillColor2.a)*specTexel2.g;",

// face
"   faceTexel.rgb    = colorMod1.rgb*faceTexel.rgb*faceTexel.a + envMapTexel1.rgb*(1.0 - faceTexel.a);",
"   hairTexel.rgb    = colorMod2.rgb*hairTexel.rgb*hairTexel.a + envMapTexel2.rgb*specTexel2.r;",

// frenel factor
"   float fresnelFactor = pow((1.0 - dot( normalize(-toCam), normal)),4.0)*(0.9 - 0.45*hairTexel.a);",

// hair
"   vec4 finalTexel     = vec4(hairTexel.rgb*hairTexel.a + faceTexel.rgb*(1.0 - hairTexel.a), 1.0);",

// sticker concatenation
"   finalTexel = TextureProject(u_stickerMatrix0, u_stickerPos0, stickerMap0, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix1, u_stickerPos1, stickerMap1, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix2, u_stickerPos2, stickerMap2, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix3, u_stickerPos3, stickerMap3, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix4, u_stickerPos4, stickerMap4, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix5, u_stickerPos5, stickerMap5, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix6, u_stickerPos6, stickerMap6, finalTexel);",
"   finalTexel = TextureProject(u_stickerMatrix7, u_stickerPos7, stickerMap7, finalTexel);",

"	gl_FragColor = vec4(finalTexel.rgb + vec3(fresnelFactor, fresnelFactor, fresnelFactor), 1.0);",

"}"].join("\n");
