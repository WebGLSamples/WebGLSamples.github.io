// GenericModel.h: Define generic model.

#pragma once
#ifndef GENERICMODEL_H
#define GENERICMODEL_H 1

#include "Model.h"

class GenericModel : public Model
{
  public:
    GenericModel(MODELGROUP type, MODELNAME name, bool blend) : Model(type, name, blend){};
};

#endif
