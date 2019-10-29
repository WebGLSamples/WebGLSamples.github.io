precision lowp float;
precision lowp int;

#define OBJECT_SIZE 1

attribute float expiredFlag;
attribute vec3 position;
attribute vec3 velocity;
attribute vec3 acceleration;
attribute vec4 flags1;
attribute vec4 flags2;
attribute vec4 flags3;
attribute vec4 flags4;
attribute vec4 angularQuaternion;

varying vec4 vCalculatedColor;
varying float vDiscardFlag;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float screenResolution;

#define INSERTION

#ifdef HAS_REF_HEIGHT
  uniform float refHeightCoef;
#endif
#ifdef IS_MERGED
  attribute float mergedIndex;
  uniform float timeArray[OBJECT_SIZE];
  uniform mat4 modelViewMatrixArray[OBJECT_SIZE];
  uniform mat4 worldMatrixArray[OBJECT_SIZE];
  uniform float hiddenArray[OBJECT_SIZE];
  uniform mat3 parentMotionMatrixArray[OBJECT_SIZE];
  uniform float dissapearCoefArray[OBJECT_SIZE];
  uniform vec3 stopInfoArray[OBJECT_SIZE];
#else
  uniform float time;
  uniform mat4 modelViewMatrix;
  uniform mat4 worldMatrix;
  uniform mat3 parentMotionMatrix;
  uniform float dissapearCoef;
  uniform vec3 stopInfo;
#endif
#ifdef HAS_SKYBOX_FOG
  varying vec3 vWorldPosition;
#endif

#ifdef HAS_TEXTURE
  attribute vec3 rgbThreshold;
  varying vec4 vUVCoordinates;
  attribute vec4 uvCoordinates;
  varying vec3 vRgbThreshold;
  varying float vTextureFlag;
#endif

#ifdef HAS_TARGET_COLOR
  attribute vec4 targetColor;
#endif

#ifdef HAS_TARGET_COLOR
  vec3 calculateColor(float timeValue){
    float colorStep = targetColor[3];
    vec3 color = vec3(flags4[0], flags4[1], flags4[2]);
    if (colorStep < -10.0){
      return color;
    }
    if (timeValue < 0.0){
      return color;
    }
    if ((colorStep * timeValue) >= 1.0){
      return vec3(targetColor.x, targetColor.y, targetColor.z);
    }
    vec3 diff = vec3(
      (targetColor.r - color.r),
      (targetColor.g - color.g),
      (targetColor.b - color.g)
    );
    float calculatedR = color.r + (colorStep * timeValue * (diff.r));
    float calculatedG = color.g + (colorStep * timeValue * (diff.g));
    float calculatedB = color.b + (colorStep * timeValue * (diff.b));
    return vec3(calculatedR, calculatedG, calculatedB);
  }
#endif

vec3 applyQuaternionToVector(vec3 vector, vec4 quaternion){
  float x = vector.x;
  float y = vector.y;
  float z = vector.z;
  float qx = quaternion.x;
  float qy = quaternion.y;
  float qz = quaternion.z;
  float qw = quaternion.w;
  float ix = (qw * x) + (qy * z) - (qz * y);
  float iy = (qw * y) + (qz * x) - (qx * z);
  float iz = (qw * z) + (qx * y) - (qy * x);
  float iw = (-1.0 * qx * x) - (qy * y) - (qz * z);
  float calculatedX = (ix * qw) + (iw * -1.0 * qx) + (iy * -1.0 * qz) - (iz * -1.0 * qy);
  float calculatedY = (iy * qw) + (iw * -1.0 * qy) + (iz * -1.0 * qx) - (ix * -1.0 * qz);
  float calculatedZ = (iz * qw) + (iw * -1.0 * qz) + (ix * -1.0 * qy) - (iy * -1.0 * qx);
  return vec3(calculatedX, calculatedY, calculatedZ);
}

float calculateAlpha(float alphaDeltaValue, float opacityValue, float timeValue){
  float alphaVariationMode = flags3[0];
  if (alphaVariationMode > 20.0){
    return (opacityValue + cos(alphaDeltaValue * timeValue));
  }else if (alphaVariationMode > 10.0){
    return (opacityValue + sin(alphaDeltaValue * timeValue));
  }else if (alphaVariationMode > 0.0){
    return (opacityValue + (alphaDeltaValue * timeValue));
  }
  return 1.0;
}

float isRecentlyRespawned(float timeNow){

  float respawnFlag = flags1[0];
  float lifetime = flags1[3];

  if (respawnFlag < 5.0){
    return 0.0;
  }

  float timeThen = (timeNow - 0.01666666666);
  float timeNowModulated = timeNow - (lifetime * floor(timeNow/lifetime));
  float timeThenModulated = timeThen - (lifetime * floor(timeThen/lifetime));
  if (timeNowModulated < timeThenModulated){
    return 7.0;
  }
  return 0.0;
}

float findRepeatTime(){
  float selectedTime;
  #ifdef IS_MERGED
    int mi = int(mergedIndex);
    selectedTime = timeArray[mi];
  #else
    selectedTime = time;
  #endif
  float startTime = flags2[3];
  float respawnFlag = flags1[0];
  if (respawnFlag < 5.0){
    return startTime;
  }
  float x = selectedTime;
  for (float i = 0.0; i<5000.0; i += 0.0001){
    float recentlyRespawnedFlag = isRecentlyRespawned((x - startTime));
    if (recentlyRespawnedFlag > 5.0){
      return x;
    }
    x = x - 0.01666666666;
    if (x < startTime || x < 0.0){
      break;
    }
  }
  return selectedTime;
}

float determinant(mat4 m) {
  float b00 = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  float b01 = m[0][0] * m[1][2] - m[0][2] * m[1][0];
  float b02 = m[0][0] * m[1][3] - m[0][3] * m[1][0];
  float b03 = m[0][1] * m[1][2] - m[0][2] * m[1][1];
  float b04 = m[0][1] * m[1][3] - m[0][3] * m[1][1];
  float b05 = m[0][2] * m[1][3] - m[0][3] * m[1][2];
  float b06 = m[2][0] * m[3][1] - m[2][1] * m[3][0];
  float b07 = m[2][0] * m[3][2] - m[2][2] * m[3][0];
  float b08 = m[2][0] * m[3][3] - m[2][3] * m[3][0];
  float b09 = m[2][1] * m[3][2] - m[2][2] * m[3][1];
  float b10 = m[2][1] * m[3][3] - m[2][3] * m[3][1];
  float b11 = m[2][2] * m[3][3] - m[2][3] * m[3][2];
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

float decomposeScaleFromWorldMatrix(mat4 worldMatrix){
  float sx = length(vec3(worldMatrix[0][0], worldMatrix[0][1], worldMatrix[0][2]));
  if (determinant(worldMatrix) < 0.0){
    sx = -1.0 * sx;
  }
  return sx;
}

void main(){

  float respawnFlag = flags1[0];
  float alphaDelta = flags1[1];
  float trailFlag = flags1[2];
  float lifetime = flags1[3];
  float size = flags2[0];
  float opacity = flags2[1];
  float startTime = flags2[3];
  float motionMode = flags3[1];
  float angularVelocity = flags3[2];
  float angularMotionRadius = flags3[3];
  float useWorldPositionFlag = flags4[3];
  vec3 parentVelocity;
  vec3 parentAcceleration;
  vec3 parentInitialPosition;
  vec3 color = vec3(flags4[0], flags4[1], flags4[2]);

  float skipFlag = -20.0;
  mat4 selectedMVMatrix;
  mat4 selectedWorldMatrix;
  float selectedTime;
  float selectedDissapearCoef;
  vec3 selectedStopInfo;
  #ifdef IS_MERGED
    int mi = int(mergedIndex);
    selectedMVMatrix = modelViewMatrixArray[mi];
    selectedWorldMatrix = worldMatrixArray[mi];
    selectedTime = timeArray[mi];
    parentVelocity = parentMotionMatrixArray[mi][1];
    parentAcceleration = parentMotionMatrixArray[mi][2];
    parentInitialPosition = parentMotionMatrixArray[mi][0];
    if (hiddenArray[mi] > 0.0){
      skipFlag = 20.0;
    }
    selectedDissapearCoef = dissapearCoefArray[mi];
    selectedStopInfo = stopInfoArray[mi];
  #else
    selectedMVMatrix = modelViewMatrix;
    selectedWorldMatrix = worldMatrix;
    selectedTime = time;
    selectedDissapearCoef = dissapearCoef;
    selectedStopInfo = stopInfo;
    parentVelocity = parentMotionMatrix[1];
    parentAcceleration = parentMotionMatrix[2];
    parentInitialPosition = parentMotionMatrix[0];
  #endif

  float parentStoppedFlag = selectedStopInfo[0];
  float stopTime = selectedStopInfo[1];
  float newLifetime = selectedStopInfo[2];

  if (parentStoppedFlag >= 5.0){
    respawnFlag = -10.0;
    if (startTime > stopTime){
      startTime = stopTime;
    }
  }

  if (selectedTime >= startTime && (skipFlag < 0.0)){
    float timeOfThis = (selectedTime - startTime);
    if (respawnFlag > 5.0){
      if (lifetime > 0.0){
        timeOfThis = timeOfThis - (lifetime * floor(timeOfThis/lifetime));
      }
    }
    float calculatedAlpha = calculateAlpha(alphaDelta, opacity, timeOfThis);
    #ifdef HAS_TARGET_COLOR
      vCalculatedColor = vec4(calculateColor(timeOfThis), calculatedAlpha);
    #else
      vCalculatedColor = vec4(flags4[0], flags4[1], flags4[2], calculatedAlpha);
    #endif

    vec3 chosenVelocity;
    vec3 chosenAcceleration;
    float chosenInitialAngle = position[0];
    float chosenAngularVelocity = angularVelocity;
    float chosenAngularAcceleration = position[1];
    float chosenAngularMotionRadius = angularMotionRadius;
    vec4 chosenAngularQuaternion = angularQuaternion;
    if (trailFlag < 5.0){
      chosenVelocity = velocity;
      chosenAcceleration = acceleration;
    }else{
      float trailTime = findRepeatTime();
      float diff = selectedTime - trailTime;
      timeOfThis = trailTime - diff;
      chosenVelocity = parentVelocity;
      chosenAcceleration = parentAcceleration;
    }

    vec4 mvPosition;
    vec3 newPosition;

    if (motionMode > 10.0 && useWorldPositionFlag < 5.0){
      float angleNow = chosenInitialAngle + (
        (chosenAngularVelocity * timeOfThis) +
        (0.5 * chosenAngularAcceleration * timeOfThis * timeOfThis)
      );
      float x = chosenAngularMotionRadius * cos(angleNow);
      float z = chosenAngularMotionRadius * sin(angleNow);
      vec3 tmp = vec3(x, 0.0, z);
      newPosition = applyQuaternionToVector(tmp, chosenAngularQuaternion);
    }else if (motionMode > 0.0 && useWorldPositionFlag < 5.0){
      newPosition = position + (chosenVelocity * timeOfThis) + (0.5 * timeOfThis * timeOfThis * chosenAcceleration);
    }

    #ifdef HAS_SKYBOX_FOG
      vWorldPosition = (selectedWorldMatrix * vec4(newPosition, 1.0)).xyz;
    #endif

    if (useWorldPositionFlag < 5.0){
      mvPosition = selectedMVMatrix * vec4(newPosition, 1.0);
    }else{
      float repeatTime = findRepeatTime();
      if (lifetime <= 0.0001){
        repeatTime = startTime;
      }
      if (parentStoppedFlag >= 5.0 && repeatTime > stopTime){
        repeatTime = stopTime;
      }
      newPosition = parentInitialPosition + (parentVelocity * repeatTime) + (0.5 * repeatTime * repeatTime * parentAcceleration);
      newPosition = newPosition + position + (velocity * timeOfThis) + (0.5 * timeOfThis * timeOfThis * acceleration);
      mvPosition = viewMatrix * vec4(newPosition, 1.0);
    }

    gl_PointSize = (500.0 - (selectedDissapearCoef * selectedTime)) * (size * screenResolution) / length(mvPosition.xyz) * decomposeScaleFromWorldMatrix(selectedWorldMatrix);
    #ifdef HAS_REF_HEIGHT
      gl_PointSize = gl_PointSize * refHeightCoef;
    #endif
    gl_Position = projectionMatrix * mvPosition;

  }

  if (skipFlag < 0.0){
    vDiscardFlag = -10.0;
    vDiscardFlag = expiredFlag;
    if (vCalculatedColor.a <= 0.01){
      vDiscardFlag = 10.0;
    }else{
      if (selectedTime < startTime){
        vDiscardFlag = 10.0;
      }else{
        if (lifetime > 0.0 && selectedTime >= (lifetime + startTime) && respawnFlag < 5.0){
          vDiscardFlag = 10.0;
        }
      }
    }
  }else{
    vDiscardFlag = 10.0;
  }
  #ifdef HAS_TEXTURE
    vTextureFlag = flags2[2];
    vRgbThreshold = rgbThreshold;
    vUVCoordinates = uvCoordinates;
  #endif
}
