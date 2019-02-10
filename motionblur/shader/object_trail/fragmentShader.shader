precision lowp float;
precision lowp int;

#define LOG2 1.442695
#define ALPHA_TEST 0.5

varying float vDiscardFlag;
varying vec2 vFaceVertexUV;
varying vec3 vColor;
varying vec3 vTextureFlags;
varying vec3 vWorldPosition;
varying vec3 vEmissiveColor;
varying float vEmissiveIntensity;

uniform sampler2D diffuseMap;
uniform sampler2D emissiveMap;
uniform sampler2D alphaMap;
uniform samplerCube cubeTexture;
uniform float alpha;
uniform vec3 cameraPosition;
uniform vec4 fogInfo;

void main(){
  if (vDiscardFlag >= 5.0){
    discard;
  }

  float hasDiffuse  = vTextureFlags[0];
  float hasEmissive = vTextureFlags[1];
  float hasAlpha    = vTextureFlags[2];

  vec4 diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
  if (hasDiffuse > 0.0){
    diffuseColor = texture2D(diffuseMap, vFaceVertexUV);
  }

  gl_FragColor = vec4(vColor, alpha) * diffuseColor;

  if (hasAlpha > 0.0){
    float val = texture2D(alphaMap, vFaceVertexUV).g;
    gl_FragColor.a *= val;
    if (val <= ALPHA_TEST){
      discard;
    }
  }

  if (hasEmissive > 0.0){
    vec4 eColor = texture2D(emissiveMap, vFaceVertexUV);
    vec3 totalEmissiveRadiance = vec3(vEmissiveIntensity, vEmissiveIntensity, vEmissiveIntensity) * vEmissiveColor;
    totalEmissiveRadiance *= eColor.rgb;
    gl_FragColor.rgb += totalEmissiveRadiance;
  }

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
