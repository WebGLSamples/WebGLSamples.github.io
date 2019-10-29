precision lowp float;
precision lowp int;

uniform sampler2D inputTexture;
uniform float numberOfTap;
uniform vec2 resolution;
uniform vec2 direction;

varying vec2 vUV;

vec4 blur13() {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * direction;
  vec2 off2 = vec2(3.2941176470588234) * direction;
  vec2 off3 = vec2(5.176470588235294) * direction;
  color += texture2D(inputTexture, vUV) * 0.1964825501511404;
  color += texture2D(inputTexture, vUV + (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(inputTexture, vUV - (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(inputTexture, vUV + (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(inputTexture, vUV - (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(inputTexture, vUV + (off3 / resolution)) * 0.010381362401148057;
  color += texture2D(inputTexture, vUV - (off3 / resolution)) * 0.010381362401148057;
  return color;
}

vec4 blur9() {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(inputTexture, vUV) * 0.2270270270;
  color += texture2D(inputTexture, vUV + (off1 / resolution)) * 0.3162162162;
  color += texture2D(inputTexture, vUV - (off1 / resolution)) * 0.3162162162;
  color += texture2D(inputTexture, vUV + (off2 / resolution)) * 0.0702702703;
  color += texture2D(inputTexture, vUV - (off2 / resolution)) * 0.0702702703;
  return color;
}

vec4 blur5() {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture2D(inputTexture, vUV) * 0.29411764705882354;
  color += texture2D(inputTexture, vUV + (off1 / resolution)) * 0.35294117647058826;
  color += texture2D(inputTexture, vUV - (off1 / resolution)) * 0.35294117647058826;
  return color;
}

void main(){
  if (numberOfTap < 0.0){
    gl_FragColor = blur5();
  }else if (numberOfTap < 10.0){
    gl_FragColor = blur9();
  }else{
    gl_FragColor = blur13();
  }
}
