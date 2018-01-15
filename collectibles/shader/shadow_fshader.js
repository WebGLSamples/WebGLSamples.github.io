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
var shadow_fshader = [

"#define BLOCKER_SEARCH_NUM_SAMPLES 16",
"#define PCF_NUM_SAMPLES 16",
"#define NEAR_PLANE 4.5 ",
"#define LIGHT_WORLD_SIZE 3.0 ",
"#define LIGHT_FRUSTUM_WIDTH 8.0 ",
// Assuming that LIGHT_FRUSTUM_WIDTH == LIGHT_FRUSTUM_HEIGHT 
"#define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH) ",
"#define SHADOW_EPSILON 0.1",
"#define SMAP_SIZE 1024.0",
"#define texMapScale 1.0/SMAP_SIZE",

"#ifdef GL_ES",
"precision highp float;",
"#endif",

"uniform sampler2D shadowMap;",

"vec2 poissonDisk[16];",

"varying vec4 vShadowCoord;",
//"varying vec2 poissonDisk[16];",

// Function prototypes
"float unpackTex2D(sampler2D map, vec2 coord);",
"float PCSS(vec4 coords);",
"void FindBlocker(out float avgBlockerDepth, out float numBlockers, vec2 uv, float zReceiver );",
"float PenumbraSize(float zReceiver, float zBlocker); //Parallel plane estimation ",
"float PCF_Filter(vec2 uv, float zReceiver, float filterRadiusUV);",
				
"void main()",
"{",

// Project the texture coords and scale/offset to [0, 1].
"	vec4 shadowCoord    = vec4(vShadowCoord.xyz / vShadowCoord.w, vShadowCoord.w);",
"	vec4 rgba_depth = texture2D(shadowMap, shadowCoord.xy);",
//"	const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);",
//"	float d = dot(rgba_depth, bit_shift);",
//"	float shadowCoef = (shadowCoord.z > d + 0.7) ? (1.0) : (0.5);",
//"	float shadowCoef = PCF(shadowMap, shadowCoord);",
//"	float shadowCoef = PCSS(shadowCoord);",

//"	gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 - shadowCoef);",
//"	gl_FragColor = vec4( vec3(1.0, 1.0, 1.0)*shadowCoef, 1.0);",
"	gl_FragColor = vec4(0.0,0.0,0.0, rgba_depth.r);",

"}",



// shadow functions

"float unpackTex2D(sampler2D map, vec2 coord)",
"{",
"	vec4 rgba_depth = texture2D(map, coord.xy);",
"	const vec4 bit_shift = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);",
"	return dot(rgba_depth, bit_shift);",
"}",

"float PenumbraSize(float zReceiver, float zBlocker) //Parallel plane estimation ",
"{", 
	"return (zReceiver - zBlocker) / zBlocker; ",
"}",
"void FindBlocker(out float avgBlockerDepth, out float numBlockers, vec2 uv, float zReceiver )",
"{",
	//This uses similar triangle to compute what 
	//area of the shadow map we should search

	"float searchWidth = (LIGHT_SIZE_UV*(zReceiver - NEAR_PLANE) / zReceiver)/SMAP_SIZE; ",
	
	"float blockerSum = 0.0;",
	"numBlockers = 0.0;", 
	
	"for( int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++)",
	"{",
		"float shadowMapDepth = unpackTex2D(shadowMap, uv + poissonDisk[i]*searchWidth);",
		
		"if(shadowMapDepth + SHADOW_EPSILON < zReceiver)",
		"{",
			"blockerSum += shadowMapDepth;",
			"numBlockers++;",
		"}",
	"}",
	
	"avgBlockerDepth = blockerSum/numBlockers;",
"}",

"float PCF_Filter(vec2 uv, float zReceiver, float filterRadiusUV)",
"{",
   
	
	"float sum = 0.0;",
	"float scale = 10.0/SMAP_SIZE;",
	"float sample= 0.0;",
	"for(int i = 0; i < PCF_NUM_SAMPLES;i++)",
	"{",
        "vec2 sampleuv = uv + (poissonDisk[i]*scale);",
        "sample = unpackTex2D(shadowMap, sampleuv) + SHADOW_EPSILON;",
        "sum += sample < zReceiver ? 1.0 : 0.3;",
	"}",
	"return sum/float(PCF_NUM_SAMPLES);",
"}",

"float PCSS(vec4 coords)",
"{",
    "poissonDisk[0] = vec2( -0.94201624, -0.39906216 );",
    "poissonDisk[1] = vec2( 0.94558609, -0.76890725 );",
    "poissonDisk[2] = vec2( -0.094184101, -0.92938870);",
    "poissonDisk[3] = vec2( 0.34495938, 0.29387760 );",
    "poissonDisk[4] = vec2( -0.91588581, 0.45771432 );",
    "poissonDisk[5] = vec2( -0.81544232, -0.87912464 );",
    "poissonDisk[6] = vec2( -0.38277543, 0.27676845 );",
    "poissonDisk[7] = vec2( 0.97484398, 0.75648379 );",
    "poissonDisk[8] = vec2( 0.44323325, -0.97511554 );",
    "poissonDisk[9] = vec2( 0.53742981, -0.47373420 );",
    "poissonDisk[10] = vec2( -0.26496911, -0.41893023 );",
    "poissonDisk[11] = vec2( 0.79197514, 0.19090188 );",
    "poissonDisk[12] = vec2( -0.24188840, 0.99706507 );",
    "poissonDisk[13] = vec2( -0.81409955, 0.91437590 );",
    "poissonDisk[14] = vec2( 0.19984126, 0.78641367 );",
    "poissonDisk[15] = vec2( 0.14383161, -0.14100790 );", 
	
	"vec2 uv = coords.xy;",
	"float zReceiver = coords.z;", //assumed to be eye-space z
	
	//Step 1: blocker search
	"float avgBlockerDepth = 0.0;",
	"float numBlockers = 0.0;",
	
	"FindBlocker(avgBlockerDepth, numBlockers, uv, zReceiver);",
	
	"if(numBlockers < 1.0)",
	"{",
		// there are no blockers so early out to save filtering
		"return 0.1;",
	"}",
	
	//Step 2: penumbra size
	"float penumbraRatio = PenumbraSize(zReceiver, avgBlockerDepth);",
	"float filterRadiusUV = penumbraRatio*LIGHT_SIZE_UV*NEAR_PLANE/coords.z;",
	
	//Step 3: filtering
	"return PCF_Filter(uv, zReceiver, filterRadiusUV);",
	//"return PCF_Filter(uv, zReceiver, 5.0);",
"}"].join("\n");
