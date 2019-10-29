precision lowp float;
precision lowp int;

#define LOG2 1.442695

varying vec4 vUVRanges;

uniform float alpha;
uniform vec3 color;
uniform sampler2D glyphTexture;

#define INSERTION

#ifdef HAS_BACKGROUND
  uniform float backgroundAlpha;
  uniform vec3 backgroundColor;
#endif
#ifdef HAS_SKYBOX_FOG
  uniform samplerCube cubeTexture;
  uniform vec3 cameraPosition;
  varying vec3 vWorldPosition;
#endif
#ifdef HAS_FOG
  uniform vec4 fogInfo;
#endif

void main(){
  float startU = vUVRanges[0];
  float endU = vUVRanges[1];
  float startV = vUVRanges[2];
  float endV = vUVRanges[3];
  float coordX = ((gl_PointCoord.x) * (endU - startU)) + startU;
  float coordY = ((1.0 - gl_PointCoord.y) * (endV - startV)) + startV;
  vec4 textureColor = texture2D(glyphTexture, vec2(coordX, coordY));

  if (startU < -300.0 || startV < -300.0 || endU < -300.0 || endV < -300.0){
    discard;
  }

  if (textureColor.a < 0.5){
    #ifdef HAS_BACKGROUND
      gl_FragColor = vec4(backgroundColor, backgroundAlpha);
      return;
    #else
      discard;
    #endif
  }

  gl_FragColor = vec4(color, 1.0) * vec4(textureColor.r, textureColor.g, textureColor.b, alpha);

  #ifdef HAS_FOG
    #ifdef HAS_SKYBOX_FOG
      vec3 coord = normalize(vWorldPosition - cameraPosition);
      vec4 cubeTextureColor = textureCube(cubeTexture, coord) * vec4(fogInfo[1], fogInfo[2], fogInfo[3], 1.0);
      float fogDensity = -fogInfo[0];
      float z = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = exp2(-fogDensity * fogDensity * z * z * LOG2);
      gl_FragColor = vec4(mix(cubeTextureColor.rgb, gl_FragColor.rgb, fogFactor), gl_FragColor.a);
    #else
      float fogDensity = fogInfo[0];
      float fogR = fogInfo[1];
      float fogG = fogInfo[2];
      float fogB = fogInfo[3];
      float z = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = exp2(-fogDensity * fogDensity * z * z * LOG2);
      fogFactor = clamp(fogFactor, 0.0, 1.0);
      gl_FragColor = vec4(mix(vec3(fogR, fogG, fogB), gl_FragColor.rgb, fogFactor), gl_FragColor.a);
    #endif
  #endif
}
