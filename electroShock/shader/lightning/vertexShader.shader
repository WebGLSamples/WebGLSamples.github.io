precision lowp float;
precision lowp int;

#define INSERTION

attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform vec3 startPoint;

#ifdef HAS_SKYBOX_FOG
  varying vec3 vWorldPosition;
  uniform mat4 worldMatrix;
#endif

void main(){
  vec3 pos = vec3(startPoint.x + position.x, startPoint.y + position.y, startPoint.z + position.z);
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  #ifdef HAS_SKYBOX_FOG
    vWorldPosition = (worldMatrix * vec4(pos, 1.0)).xyz;
  #endif
}
