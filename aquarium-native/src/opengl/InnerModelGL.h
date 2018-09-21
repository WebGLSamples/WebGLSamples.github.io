// Defines inner model of OpenGL.

#pragma once
#ifndef INNERMODELGL_H
#define INNERMODELGL_H 1

#include "../InnerModel.h"
#include "ContextGL.h"
#include "ProgramGL.h"

class InnerModelGL : public InnerModel
{
  public:
    InnerModelGL(const ContextGL *context, Global *g, MODELGROUP type, MODELNAME name, bool blend);
    void applyUniforms() const override;
    void updatePerInstanceUniforms() const override;
    void init() override;
    void applyTextures() const override;
    void applyBuffers() const override;
    void draw() const override;

    std::pair<float *, int> worldViewProjectionUniform;
    std::pair<float *, int> worldUniform;
    // std::pair<float*, int> worldInverseUniform;
    std::pair<float *, int> worldInverseTransposeUniform;

    std::pair<float *, int> viewInverseUniform;
    std::pair<float *, int> lightWorldPosUniform;

    std::pair<float, int> etaUniform;
    std::pair<float, int> tankColorFudgeUniform;
    std::pair<float, int> refractionFudgeUniform;

    std::pair<float, int> fogPowerUniform;
    std::pair<float, int> fogMultUniform;
    std::pair<float, int> fogOffsetUniform;
    std::pair<float *, int> fogColorUniform;

    std::pair<TextureGL *, int> diffuseTexture;
    std::pair<TextureGL *, int> normalTexture;
    std::pair<TextureGL *, int> reflectionTexture;
    std::pair<TextureGL *, int> skyboxTexture;

    std::pair<BufferGL *, int> positionBuffer;
    std::pair<BufferGL *, int> normalBuffer;
    std::pair<BufferGL *, int> texCoordBuffer;

    std::pair<BufferGL *, int> tangentBuffer;
    std::pair<BufferGL *, int> binormalBuffer;

    BufferGL * indicesBuffer;

  private:
    ContextGL *contextGL;
};

#endif // !INNERMODELGL_H
