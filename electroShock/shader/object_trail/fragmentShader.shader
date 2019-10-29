precision lowp float;
precision lowp int;

#define LOG2 1.442695
#define ALPHA_TEST 0.5

varying float vDiscardFlag;
varying vec3 vColor;
uniform float alpha;

#define INSERTION

#ifdef HAS_TEXTURE
  varying vec2 vFaceVertexUV;
  varying vec3 vTextureFlags;
#endif
#ifdef HAS_EMISSIVE
  varying vec3 vEmissiveColor;
  varying float vEmissiveIntensity;
  uniform sampler2D emissiveMap;
#endif
#ifdef HAS_DIFFUSE
  uniform sampler2D diffuseMap;
#endif
#ifdef HAS_ALPHA
  uniform sampler2D alphaMap;
#endif
#ifdef HAS_SKYBOX_FOG
  varying vec3 vWorldPosition;
  uniform samplerCube cubeTexture;
  uniform vec3 cameraPosition;
#endif
#ifdef HAS_FOG
  uniform vec4 fogInfo;
#endif

void main(){
  if (vDiscardFlag >= 5.0){
    discard;
  }

  vec4 diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
  #ifdef HAS_TEXTURE
    float hasDiffuse  = vTextureFlags[0];
    float hasEmissive = vTextureFlags[1];
    float hasAlpha    = vTextureFlags[2];
    #ifdef HAS_DIFFUSE
      if (hasDiffuse > 0.0){
        diffuseColor = texture2D(diffuseMap, vFaceVertexUV);
      }
    #endif
    gl_FragColor = vec4(vColor, alpha) * diffuseColor;
    #ifdef HAS_ALPHA
      if (hasAlpha > 0.0){
        float val = texture2D(alphaMap, vFaceVertexUV).g;
        gl_FragColor.a *= val;
        if (val <= ALPHA_TEST){
          discard;
        }
      }
    #endif
    #ifdef HAS_EMISSIVE
      if (hasEmissive > 0.0){
        vec4 eColor = texture2D(emissiveMap, vFaceVertexUV);
        vec3 totalEmissiveRadiance = vec3(vEmissiveIntensity, vEmissiveIntensity, vEmissiveIntensity) * vEmissiveColor;
        totalEmissiveRadiance *= eColor.rgb;
        gl_FragColor.rgb += totalEmissiveRadiance;
      }
    #endif
  #else
    gl_FragColor = vec4(vColor, alpha) * diffuseColor;
  #endif

  #ifdef HAS_FOG
    #ifdef HAS_SKYBOX_FOG
      vec3 coord = normalize(vWorldPosition - cameraPosition);
      vec4 cubeTextureColor = textureCube(cubeTexture, coord) * vec4(fogInfo[1], fogInfo[2], fogInfo[3], 1.0);
      float fogDensity = -fogInfo[0];
      float z = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = exp2(-fogDensity * fogDensity * z * z * LOG2);
      gl_FragColor = vec4(mix(cubeTextureColor.rgb, gl_FragColor.rgb, fogFactor), gl_FragColor.a);
    #else
      float fogDensity = fogInfo[0];
      float fogR = fogInfo[1];
      float fogG = fogInfo[2];
      float fogB = fogInfo[3];
      float z = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = exp2(-fogDensity * fogDensity * z * z * LOG2);
      fogFactor = clamp(fogFactor, 0.0, 1.0);
      gl_FragColor = vec4(mix(vec3(fogR, fogG, fogB), gl_FragColor.rgb, fogFactor), gl_FragColor.a);
    #endif
  #endif
}
