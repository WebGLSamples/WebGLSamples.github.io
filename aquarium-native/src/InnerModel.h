// InnerModel.h: Define inner model.

#pragma once
#ifndef INNERMODEL_H
#define INNERMODEL_H 1

#include "Model.h"

class InnerModel : public Model
{
  public:
    InnerModel(MODELGROUP type, MODELNAME name, bool blend) : Model(type, name, blend){};
};

#endif // !INNERMODEL_H
