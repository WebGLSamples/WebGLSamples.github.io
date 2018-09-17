// SeaweedModel.h: Define seaweed model.

#pragma once
#ifndef SEAWEEDMODEL_H
#define SEAWEEDMODEL_H 1

#include "Model.h"

class SeaweedModel : public Model
{
  public:
    SeaweedModel(MODELGROUP type, MODELNAME name, bool blend) : Model(type, name, blend){};

    virtual void updateSeaweedModelTime(float time) = 0;
};

#endif // !SEAWEEDMODEL_H
