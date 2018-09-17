// FishModel.h: Define fish model. Update fish specific uniforms.

#pragma once
#ifndef FISHMODEL_H
#define FISHMODEL_H 1

#include <string>

#include "Model.h"
#include "Texture.h"

class FishModel : public Model
{
  public:
    FishModel(MODELGROUP type, MODELNAME name, bool blend) : Model(type, name, blend){};

    virtual void updateFishCommonUnifroms(float fishLength,
                                          float fishBendAmount,
                                          float fishWaveLength) = 0;
    virtual void updateFishPerUniforms(float x,
                                       float y,
                                       float z,
                                       float nextX,
                                       float nextY,
                                       float nextZ,
                                       float scale,
                                       float time)              = 0;
};

#endif
