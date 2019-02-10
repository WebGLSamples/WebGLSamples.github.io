precision lowp float;
precision lowp int;

#define OBJECT_SIZE 1

attribute float mergedIndex;
attribute float expiredFlag;
attribute vec3 position;
attribute vec3 rgbThreshold;
attribute vec3 velocity;
attribute vec3 acceleration;
attribute vec4 targetColor;
attribute vec4 flags1;
attribute vec4 flags2;
attribute vec4 flags3;
attribute vec4 flags4;
attribute vec4 angularQuaternion;
attribute vec4 uvCoordinates;

varying vec4 vCalculatedColor;
varying float vDiscardFlag;
varying float vTextureFlag;
varying vec3 vRgbThreshold;
varying vec3 vWorldPosition;
varying vec4 vUVCoordinates;

uniform float mergedFlag;
uniform float time;
uniform float timeArray[OBJECT_SIZE];
uniform mat4 modelViewMatrix;
uniform mat4 modelViewMatrixArray[OBJECT_SIZE];
uniform mat4 worldMatrix;
uniform mat4 worldMatrixArray[OBJECT_SIZE];
uniform float hiddenArray[OBJECT_SIZE];
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 parentMotionMatrix;
uniform mat3 parentMotionMatrixArray[OBJECT_SIZE];
uniform float dissapearCoef;
uniform float dissapearCoefArray[OBJECT_SIZE];
uniform vec3 stopInfo;
uniform vec3 stopInfoArray[OBJECT_SIZE];

vec3 calculateColor(float timeValue){
  float colorStep = targetColor[3];
  vec3 color = vec3(flags4[0], flags4[1], flags4[2]);
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
  float selectedTime = time;
  if (mergedFlag > 5.0){
    int mi = int(mergedIndex);
    selectedTime = timeArray[mi];
  }
  float startTime = flags2[3];
  float respawnFlag = flags1[0];
  if (respawnFlag < 5.0){
    return startTime;
  }
  float x = selectedTime;
  for (float i = 0.0; i<10000000.0; i += 0.0000000001){
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
  vec3 parentVelocity = parentMotionMatrix[1];
  vec3 parentAcceleration = parentMotionMatrix[2];
  vec3 parentInitialPosition = parentMotionMatrix[0];
  vec3 color = vec3(flags4[0], flags4[1], flags4[2]);

  float skipFlag = -20.0;
  mat4 selectedMVMatrix = modelViewMatrix;
  mat4 selectedWorldMatrix = worldMatrix;
  float selectedTime = time;
  float selectedDissapearCoef = dissapearCoef;
  vec3 selectedStopInfo = stopInfo;
  if (mergedFlag > 5.0){
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
  }

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
    vCalculatedColor = vec4(calculateColor(timeOfThis), calculatedAlpha);

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

    vWorldPosition = (selectedWorldMatrix * vec4(newPosition, 1.0)).xyz;

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

    gl_PointSize = (500.0 - (selectedDissapearCoef * selectedTime)) * size / length(mvPosition.xyz);
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


  vTextureFlag = flags2[2];
  vRgbThreshold = rgbThreshold;
  vUVCoordinates = uvCoordinates;

}
