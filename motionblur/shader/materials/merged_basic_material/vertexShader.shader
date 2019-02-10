precision lowp float;
precision lowp int;

attribute float alpha;
attribute float emissiveIntensity;
attribute float aoIntensity;
attribute vec3 position;
attribute vec3 normal;
attribute vec3 color;
attribute vec3 emissiveColor;
attribute vec2 uv;
attribute vec2 displacementInfo;
attribute vec4 textureInfo;

uniform mat3 textureMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 worldMatrix;
uniform sampler2D displacementMap;

varying float vAlpha;
varying float vEmissiveIntensity;
varying float vAOIntensity;
varying vec3 vColor;
varying vec3 vWorldPosition;
varying vec3 vEmissiveColor;
varying vec2 vUV;

varying float hasDiffuseMap;
varying float hasEmissiveMap;
varying float hasAlphaMap;
varying float hasAOMap;

void main(){

  vColor = color;
  vAlpha = alpha;
  vUV = (textureMatrix * vec3(uv, 1.0)).xy;
  vEmissiveIntensity = emissiveIntensity;
  vAOIntensity = aoIntensity;
  vWorldPosition = (worldMatrix * vec4(position, 1.0)).xyz;
  vEmissiveColor = emissiveColor;

  hasDiffuseMap = -10.0;
  hasEmissiveMap = -10.0;
  hasAlphaMap = -10.0;
  hasAOMap = -10.0;
  if (textureInfo[0] > 0.0){
    hasDiffuseMap = 10.0;
  }
  if (textureInfo[1] > 0.0){
    hasEmissiveMap = 10.0;
  }
  if (textureInfo[2] > 0.0){
    hasAlphaMap = 10.0;
  }
  if (textureInfo[3] > 0.0){
    hasAOMap = 10.0;
  }

  vec3 transformedPosition = position;
  if (displacementInfo.x > -60.0 && displacementInfo.y > -60.0){
    vec3 objNormal = normalize(normal);
    transformedPosition += objNormal * (texture2D(displacementMap, vUV).r * displacementInfo.x + displacementInfo.y);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0);
}
