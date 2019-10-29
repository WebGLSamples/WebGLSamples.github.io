precision lowp float;
precision lowp int;

attribute float size;

uniform vec4 expandInfo;
uniform float shrinkStartSize;

uniform float screenResolution;

#define INSERTION
#ifdef HAS_SIZE_SCALE
  uniform float sizeScale;
#endif

void main(){

  float expandFlag = expandInfo[0];
  float expandTargetSize = expandInfo[1];
  float expandTick = expandInfo[2];
  float expandDelta = expandInfo[3];

  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  if (expandFlag < 5.0 && expandFlag > -5.0){
    gl_PointSize = 5.0 * size * screenResolution;
  }else if (expandFlag > 5.0){
    float newSize = size + (expandDelta * expandTick);
    if (newSize <= expandTargetSize){
      gl_PointSize = 5.0 * newSize * screenResolution;
    }else{
      gl_PointSize = 5.0 * expandTargetSize * screenResolution;
    }
  }else if (expandFlag < -5.0){
    float newSize = shrinkStartSize - (expandDelta * expandTick);
    if (newSize > size){
      gl_PointSize = 5.0 * newSize * screenResolution;
    }else{
      gl_PointSize = 5.0 * size * screenResolution;
    }
  }

  #ifdef HAS_SIZE_SCALE
    gl_PointSize *= sizeScale;
  #endif
}
