// SeaweedModelGL.h: Define seaweed model of OpeGL.

#pragma once
#ifndef SEAWEEDMODELGL_H
#define SEAWEEDMODELGL_H 1

#include "../SeaweedModel.h"
#include "ProgramGL.h"
#include "ContextGL.h"

class SeaweedModelGL : public SeaweedModel
{
  public:
    SeaweedModelGL(const ContextGL *context,
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

    void updateSeaweedModelTime(float time) override;

    std::pair<float *, int> worldUniform;

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

    std::pair<float *, int> viewProjectionUniform;
    std::pair<float, int> timeUniform;

    std::pair<TextureGL *, int> diffuseTexture;

    std::pair<BufferGL *, int> positionBuffer;
    std::pair<BufferGL *, int> normalBuffer;
    std::pair<BufferGL *, int> texCoordBuffer;

    BufferGL * indicesBuffer;

  private:
    ContextGL *contextGL;
};

#endif // !SEAWEEDMODELGL_H
