precision lowp float;
precision lowp int;

uniform sampler2D sceneTexture;
uniform float threshold;
varying vec2 vUV;

void main(){
  vec4 sceneColor = texture2D(sceneTexture, vUV);
  vec3 grayScale = vec3(0.21, 0.72, 0.07);
  float brightness = dot(sceneColor.rgb, grayScale);
  if (brightness > threshold){
    gl_FragColor = sceneColor;
  }else{
    gl_FragColor = vec4(0.0);
  }
}
