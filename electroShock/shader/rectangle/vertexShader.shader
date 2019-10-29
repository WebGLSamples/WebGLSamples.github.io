precision lowp float;
precision lowp int;

attribute float rectangleIndex;
uniform vec2 positions[24];

void main(){
  int indexInt = int(rectangleIndex);
  vec2 curPosition = positions[indexInt];
  gl_Position = vec4(curPosition.x, curPosition.y, 0.0, 1.0);
}
