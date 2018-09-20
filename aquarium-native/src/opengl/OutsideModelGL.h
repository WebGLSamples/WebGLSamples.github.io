// OutsideModelGL.h: Define the outside model of OpenGL.

#pragma once
#ifndef OutsideModelGL_H
#define OutsideModelGL_H 1
#include "ContextGL.h"
#include "ProgramGL.h"

#include "../OutsideModel.h"

class OutsideModelGL : public OutsideModel
{
  public:
    OutsideModelGL(const ContextGL *context,
                   Global *g,
                   MODELGROUP type,
                   MODELNAME name,
                   bool blend);
    void applyUniforms() const override;
    void updatePerInstanceUniforms() const override;
    void applyTextures() const override;
    void init() override;
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

    std::pair<BufferGL *, int> positionBuffer;
    std::pair<BufferGL *, int> normalBuffer;
    std::pair<BufferGL *, int> texCoordBuffer;

    BufferGL * indicesBuffer;

  private:
    ContextGL *contextGL;
};

#endif
