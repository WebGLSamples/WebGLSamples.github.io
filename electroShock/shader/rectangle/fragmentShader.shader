precision lowp float;
precision lowp int;

uniform vec3 color;
uniform float alpha;

void main(){
  gl_FragColor = vec4(color, alpha);
}
