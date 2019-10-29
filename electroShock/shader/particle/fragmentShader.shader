precision lowp float;
precision lowp int;

#define LOG2 1.442695

#define INSERTION

#ifdef HAS_TEXTURE
  varying vec3 vRgbThreshold;
  varying float vTextureFlag;
  varying vec4 vUVCoordinates;
  uniform sampler2D texture;
#endif
#ifdef HAS_SKYBOX_FOG
  varying vec3 vWorldPosition;
  uniform samplerCube cubeTexture;
  uniform vec3 cameraPosition;
#endif
#ifdef HAS_FOG
  uniform vec4 fogInfo;
#endif

varying vec4 vCalculatedColor;
varying float vDiscardFlag;

float discardDueToTextureColor;

#ifdef HAS_TEXTURE
  vec4 getTexturedColor(){
    vec4 textureColor;
    if (vTextureFlag > 0.0){
      float startU = vUVCoordinates[0];
      float startV = vUVCoordinates[1];
      float endU = vUVCoordinates[2];
      float endV = vUVCoordinates[3];
      float coordX = ((gl_PointCoord.x) * (endU - startU)) + startU;
      float coordY = ((1.0 - gl_PointCoord.y) * (endV - startV)) + startV;
      textureColor = texture2D(texture, vec2(coordX, coordY));
    }else{
      textureColor = vec4(1, 1, 1, 1);
    }
    if (textureColor.a < 0.5 || textureColor.r < vRgbThreshold.r ||
              textureColor.g < vRgbThreshold.g || textureColor.b < vRgbThreshold.b){
      discardDueToTextureColor = 10.0;
    }
    return vCalculatedColor * textureColor;
  }
#endif

void main(){
  discardDueToTextureColor = 0.0;
  if (vDiscardFlag > 2.0){
    discard;
  }
  #ifdef HAS_TEXTURE
    gl_FragColor = getTexturedColor();
    if (discardDueToTextureColor > 5.0){
      discard;
      return;
    }
  #else
    gl_FragColor = vCalculatedColor;
  #endif
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
