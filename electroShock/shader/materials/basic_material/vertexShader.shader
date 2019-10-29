precision lowp float;
precision lowp int;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

#define INSERTION

#ifdef HAS_DISPLACEMENT
  uniform sampler2D displacementMap;
  uniform vec2 displacementInfo;
#endif
#ifdef HAS_TEXTURE
  varying vec2 vUV;
  uniform mat3 textureMatrix;
#endif
#ifdef HAS_SKYBOX_FOG
  uniform mat4 worldMatrix;
  varying vec3 vWorldPosition;
#endif

void main(){

  #ifdef HAS_TEXTURE
    vUV = (textureMatrix * vec3(uv, 1.0)).xy;
  #endif

  #ifdef HAS_SKYBOX_FOG
    vWorldPosition = (worldMatrix * vec4(position, 1.0)).xyz;
  #endif

  vec3 transformedPosition = position;
  #ifdef HAS_DISPLACEMENT
    vec3 objNormal = normalize(normal);
    transformedPosition += objNormal * (texture2D(displacementMap, vUV).r * displacementInfo.x + displacementInfo.y);
  #endif

  vec4 mvPosition = modelViewMatrix * vec4(transformedPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
