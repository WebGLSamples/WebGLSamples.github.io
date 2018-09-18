// FishModelGL.h: Defines fish model of OpenGL.

#pragma once
#ifndef FishModelGL_H
#define FishModelGL_H 1

#include <string>

#include "../FishModel.h"
#include "ContextGL.h"
#include "ProgramGL.h"

class FishModelGL : public FishModel
{
  public:
    FishModelGL(const ContextGL *context, Global *g, MODELGROUP type, MODELNAME name, bool blend);
    void applyUniforms() const override;
    void updatePerInstanceUnidorms() const override;
    void updateFishCommonUniforms(float fishLength,
                                  float fishBendAmount,
                                  float fishWaveLength) override;
    void init() override;
    void applyTextures() const override;
    void applyBuffers() const override;
    void draw() const override;

    void updateFishPerUniforms(float x,
                               float y,
                               float z,
                               float nextX,
                               float nextY,
                               float nextZ,
                               float scale,
                               float time) override;

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
    std::pair<float, int> fishLengthUniform;
    std::pair<float, int> fishWaveLengthUniform;
    std::pair<float, int> fishBendAmountUniform;

    std::pair<float[3], int> worldPositionUniform;
    std::pair<float[3], int> nextPositionUniform;
    std::pair<float, int> scaleUniform;
    std::pair<float, int> timeUniform;

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

#endif
