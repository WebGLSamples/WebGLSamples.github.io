precision lowp float;
precision lowp int;

attribute float alpha;
attribute float emissiveIntensity;
attribute float aoIntensity;
attribute vec2 uv;
attribute vec2 displacementInfo;
attribute vec3 color;
attribute vec3 position;
attribute vec3 positionOffset;
attribute vec3 emissiveColor;
attribute vec3 normal;
attribute vec4 quaternion;
attribute vec4 textureInfo;

uniform mat3 textureMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 worldMatrix;

uniform sampler2D displacementMap;

varying float vAlpha;
varying float vEmissiveIntensity;
varying float vAOIntensity;
varying vec2 vUV;
varying vec3 vColor;
varying vec3 vWorldPosition;
varying vec3 vEmissiveColor;

varying float hasDiffuseMap;
varying float hasEmissiveMap;
varying float hasAlphaMap;
varying float hasAOMap;

vec3 applyQuaternionToVector(vec3 vector, vec4 quaternion){
  float x = vector.x;
  float y = vector.y;
  float z = vector.z;
  float qx = quaternion.x;
  float qy = quaternion.y;
  float qz = quaternion.z;
  float qw = quaternion.w;
  float ix = (qw * x) + (qy * z) - (qz * y);
  float iy = (qw * y) + (qz * x) - (qx * z);
  float iz = (qw * z) + (qx * y) - (qy * x);
  float iw = (-1.0 * qx * x) - (qy * y) - (qz * z);
  float calculatedX = (ix * qw) + (iw * -1.0 * qx) + (iy * -1.0 * qz) - (iz * -1.0 * qy);
  float calculatedY = (iy * qw) + (iw * -1.0 * qy) + (iz * -1.0 * qx) - (ix * -1.0 * qz);
  float calculatedZ = (iz * qw) + (iw * -1.0 * qz) + (ix * -1.0 * qy) - (iy * -1.0 * qx);
  return vec3(calculatedX, calculatedY, calculatedZ);
}

void main(){

  vAlpha = alpha;
  vColor = color;
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
  transformedPosition = applyQuaternionToVector(transformedPosition, quaternion) + positionOffset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0);

}
