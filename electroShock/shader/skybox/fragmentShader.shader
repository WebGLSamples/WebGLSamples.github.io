precision lowp float;
precision lowp int;

varying vec3 vNormal;

uniform vec3 color;
uniform samplerCube cubeTexture;

void main(){
  vec4 skyboxColor = vec4(color, 1.0);
  gl_FragColor = textureCube(cubeTexture, vNormal) * skyboxColor;
}
