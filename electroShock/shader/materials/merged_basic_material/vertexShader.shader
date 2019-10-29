precision lowp float;
precision lowp int;

attribute float alpha;
attribute vec3 color;
attribute vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying vec3 vColor;
varying float vAlpha;

#define INSERTION

#ifdef HAS_EMISSIVE
  attribute float emissiveIntensity;
  attribute vec3 emissiveColor;
  varying vec3 vEmissiveColor;
  varying float vEmissiveIntensity;
#endif
#ifdef HAS_AO
  attribute float aoIntensity;
  varying float vAOIntensity;
#endif
#ifdef HAS_DISPLACEMENT
  attribute vec3 normal;
  attribute vec2 displacementInfo;
  uniform sampler2D displacementMap;
  uniform vec2 totalDisplacementInfo;
#endif
#ifdef HAS_TEXTURE
  attribute vec2 uv;
  attribute vec4 textureInfo;
  attribute vec4 textureMatrixInfo;
  varying vec2 vUV;
  uniform vec2 totalTextureOffset;
  #ifdef HAS_AO
    varying float hasAOMap;
  #endif
  #ifdef HAS_DIFFUSE
    varying float hasDiffuseMap;
  #endif
  #ifdef HAS_EMISSIVE
    varying float hasEmissiveMap;
  #endif
  #ifdef HAS_ALPHA
    varying float hasAlphaMap;
  #endif
#endif
#ifdef HAS_SKYBOX_FOG
  uniform mat4 worldMatrix;
  varying vec3 vWorldPosition;
#endif

void main(){
  vColor = color;
  vAlpha = alpha;
  #ifdef HAS_TEXTURE
    vUV = (
      mat3(
        textureMatrixInfo.z, 0.0, 0.0,
        0.0, textureMatrixInfo.w, 0.0,
        textureMatrixInfo.x + totalTextureOffset.x, textureMatrixInfo.y + totalTextureOffset.y, 1.0
      ) * vec3(uv, 1.0)
    ).xy;
    #ifdef HAS_DIFFUSE
      hasDiffuseMap = -10.0;
      if (textureInfo[0] > 0.0){
        hasDiffuseMap = 10.0;
      }
    #endif
    #ifdef HAS_EMISSIVE
      vEmissiveIntensity = emissiveIntensity;
      vEmissiveColor = emissiveColor;
      hasEmissiveMap = -10.0;
      if (textureInfo[1] > 0.0){
        hasEmissiveMap = 10.0;
      }
    #endif
    #ifdef HAS_AO
      vAOIntensity = aoIntensity;
      hasAOMap = -10.0;
      if (textureInfo[3] > 0.0){
        hasAOMap = 10.0;
      }
    #endif
    #ifdef HAS_ALPHA
      hasAlphaMap = -10.0;
      if (textureInfo[2] > 0.0){
        hasAlphaMap = 10.0;
      }
    #endif
  #endif
  #ifdef HAS_SKYBOX_FOG
    vWorldPosition = (worldMatrix * vec4(position, 1.0)).xyz;
  #endif
  vec3 transformedPosition = position;
  #ifdef HAS_DISPLACEMENT
    if (displacementInfo.x > -60.0 && displacementInfo.y > -60.0){
      vec3 objNormal = normalize(normal);
      float totalDisplacementScale = displacementInfo.x * totalDisplacementInfo.x;
      float totalDisplacementBias = displacementInfo.y * totalDisplacementInfo.y;
      transformedPosition += objNormal * (texture2D(displacementMap, vUV).r * totalDisplacementScale + totalDisplacementBias);
    }
  #endif
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0);
}
