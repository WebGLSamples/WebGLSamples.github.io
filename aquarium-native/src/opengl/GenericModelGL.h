// GenericModel.h: Defines generic model of OpenGL.

#pragma once
#ifndef GENERICMODELGL_H
#define GENERICMODELGL_H 1

#include "../GenericModel.h"
#include "ContextGL.h"
#include "ProgramGL.h"

class GenericModelGL : public GenericModel
{
  public:
    GenericModelGL(const ContextGL *context,
                   Global *g,
                   MODELGROUP type,
                   MODELNAME name,
                   bool blend);
    void applyUniforms() const override;
    void updatePerInstanceUniforms() const override;
    void init() override;
    void applyTextures() const override;
    void applyBuffers() const override;
    void draw() const override;

    std::pair<float *, int> worldViewProjectionUniform;
    std::pair<float *, int> worldUniform;
    std::pair<float *, int> worldInverseTransposeUniform;

    std::pair<float *, int> viewInverseUniform;
    std::pair<float *, int> lightWorldPosUniform;
    std::pair<float *, int> lightColorUniform;
    std::pair<float *, int> specularUniform;
    std::pair<float, int> shininessUniform;
    std::pair<float, int> specularFactorUniform;

    std::pair<float *, int> ambientUniform;

    std::pair<float, int> fogPowerUniform;
    std::pair<float, int> fogMultUniform;
    std::pair<float, int> fogOffsetUniform;
    std::pair<float *, int> fogColorUniform;

    std::pair<TextureGL *, int> diffuseTexture;
    std::pair<TextureGL *, int> normalTexture;

    std::pair<BufferGL *, int> positionBuffer;
    std::pair<BufferGL *, int> normalBuffer;
    std::pair<BufferGL *, int> texCoordBuffer;

    std::pair<BufferGL *, int> tangentBuffer;
    std::pair<BufferGL *, int> binormalBuffer;

    BufferGL * indicesBuffer;

  private:
    ContextGL *contextGL;
};

#endif
