precision lowp float;
precision lowp int;

attribute float size;

uniform vec4 expandInfo;
uniform float shrinkStartSize;

void main(){

  float expandFlag = expandInfo[0];
  float expandTargetSize = expandInfo[1];
  float expandTick = expandInfo[2];
  float expandDelta = expandInfo[3];

  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  if (expandFlag < 5.0 && expandFlag > -5.0){
    gl_PointSize = 5.0 * size;
  }else if (expandFlag > 5.0){
    float newSize = size + (expandDelta * expandTick);
    if (newSize <= expandTargetSize){
      gl_PointSize = 5.0 * newSize;
    }else{
      gl_PointSize = 5.0 * expandTargetSize;
    }
  }else if (expandFlag < -5.0){
    float newSize = shrinkStartSize - (expandDelta * expandTick);
    if (newSize > size){
      gl_PointSize = 5.0 * newSize;
    }else{
      gl_PointSize = 5.0 * size;
    }
  }
}
