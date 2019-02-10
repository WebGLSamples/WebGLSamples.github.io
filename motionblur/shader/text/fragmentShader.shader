precision lowp float;
precision lowp int;

#define LOG2 1.442695

varying vec3 vWorldPosition;
varying vec4 vUVRanges;

uniform float alpha;
uniform float backgroundAlpha;
uniform float hasBackgroundColorFlag;
uniform float affectedByFogFlag;
uniform vec3 color;
uniform vec3 backgroundColor;
uniform vec3 cameraPosition;
uniform vec4 fogInfo;
uniform sampler2D glyphTexture;
uniform samplerCube cubeTexture;

void main(){
  float startU = vUVRanges[0];
  float endU = vUVRanges[1];
  float startV = vUVRanges[2];
  float endV = vUVRanges[3];
  float coordX = ((gl_PointCoord.x) * (endU - startU)) + startU;
  float coordY = ((1.0 - gl_PointCoord.y) * (endV - startV)) + startV;
  vec4 textureColor = texture2D(glyphTexture, vec2(coordX, coordY));

  if (startU < -300.0 || startV < -300.0 || endU < -300.0 || endV < -300.0){
    discard;
  }

  if (textureColor.a < 0.5){
    if (hasBackgroundColorFlag < 0.0){
      discard;
    }else{
      gl_FragColor = vec4(backgroundColor, backgroundAlpha);
      return;
    }
  }

  gl_FragColor = vec4(color, 1.0) * vec4(textureColor.r, textureColor.g, textureColor.b, alpha);

  if (affectedByFogFlag > 0.0){
    if (fogInfo[0] >= 0.0){
      float fogDensity = fogInfo[0];
      float fogR = fogInfo[1];
      float fogG = fogInfo[2];
      float fogB = fogInfo[3];
      float z = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = exp2(-fogDensity * fogDensity * z * z * LOG2);
      fogFactor = clamp(fogFactor, 0.0, 1.0);
      gl_FragColor = vec4(mix(vec3(fogR, fogG, fogB), gl_FragColor.rgb, fogFactor), gl_FragColor.a);
    }else if (fogInfo[0] < 0.0 && fogInfo[0] > -50.0){
      vec3 coord = normalize(vWorldPosition - cameraPosition);
      vec4 cubeTextureColor = textureCube(cubeTexture, coord) * vec4(fogInfo[1], fogInfo[2], fogInfo[3], 1.0);
      float fogDensity = -fogInfo[0];
      float z = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = exp2(-fogDensity * fogDensity * z * z * LOG2);
      gl_FragColor = vec4(mix(cubeTextureColor.rgb, gl_FragColor.rgb, fogFactor), gl_FragColor.a);
    }
  }
}
