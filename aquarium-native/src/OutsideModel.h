// OutsideModel.h: Define outside model.

#pragma once
#ifndef OUTSIDEMODEL_H
#define OUTSIDEMODEL_H 1

#include "Model.h"

class OutsideModel : public Model
{
  public:
    OutsideModel(MODELGROUP type, MODELNAME name, bool blend) : Model(type, name, blend){};
};

#endif
