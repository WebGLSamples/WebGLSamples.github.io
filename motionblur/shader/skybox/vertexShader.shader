precision lowp float;
precision lowp int;

attribute vec3 position;

varying vec3 vNormal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main(){
  vNormal = normalize(position.xyz);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
