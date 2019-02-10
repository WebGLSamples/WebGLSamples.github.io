precision lowp float;
precision lowp int;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform sampler2D displacementMap;
uniform mat3 textureMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 worldMatrix;
uniform vec2 displacementInfo;
uniform vec3 color;
uniform vec4 textureFlags;
uniform vec4 textureFlags2;
uniform float alpha;

varying vec3 vWorldPosition;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUV;
varying float hasDiffuseFlag;
varying float hasAlphaFlag;
varying float hasAOFlag;
varying float hasEmissiveFlag;

float hasDisplacementFlag;

void main(){

  hasDiffuseFlag      = textureFlags[0];
  hasAlphaFlag        = textureFlags[1];
  hasAOFlag           = textureFlags[2];
  hasDisplacementFlag = textureFlags[3];
  hasEmissiveFlag     = textureFlags2[0];

  vColor = color;
  vAlpha = alpha;
  vUV = (textureMatrix * vec3(uv, 1.0)).xy;
  vWorldPosition = (worldMatrix * vec4(position, 1.0)).xyz;

  vec3 transformedPosition = position;
  if (hasDisplacementFlag > 0.0){
    vec3 objNormal = normalize(normal);
    transformedPosition += objNormal * (texture2D(displacementMap, vUV).r * displacementInfo.x + displacementInfo.y);
  }

  vec4 mvPosition = modelViewMatrix * vec4(transformedPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
