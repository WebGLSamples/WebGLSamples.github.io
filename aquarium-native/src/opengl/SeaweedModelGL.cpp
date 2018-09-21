// SeaweedModelGL.cpp: Impplment seaweed model of OpenGL.

#include "SeaweedModelGL.h"

SeaweedModelGL::SeaweedModelGL(const ContextGL *context,
                               Global *g,
                               MODELGROUP type,
                               MODELNAME name,
                               bool blend)
    : SeaweedModel(type, name, blend)
{
    viewInverseUniform.first    = g->viewInverse;
    lightWorldPosUniform.first  = g->lightWorldPos;
    lightColorUniform.first     = g->lightColor;
    specularUniform.first       = g->specular;
    shininessUniform.first      = 50.0f;
    specularFactorUniform.first = 1.0f;
    ambientUniform.first        = g->ambient;
    worldUniform.first          = g->world;
    fogPowerUniform.first       = g_fogPower;
    fogMultUniform.first        = g_fogMult;
    fogOffsetUniform.first      = g_fogOffset;
    fogColorUniform.first       = g->fogColor;
    viewProjectionUniform.first = g->viewProjection;
}

void SeaweedModelGL::init()
{
    ProgramGL *programGL = static_cast<ProgramGL *>(mProgram);
    worldUniform.second  = contextGL->getUniformLocation(programGL->getProgramId(), "world");

    viewInverseUniform.second =
        contextGL->getUniformLocation(programGL->getProgramId(), "viewInverse");
    lightWorldPosUniform.second =
        contextGL->getUniformLocation(programGL->getProgramId(), "lightWorldPos");
    lightColorUniform.second =
        contextGL->getUniformLocation(programGL->getProgramId(), "lightColor");
    specularUniform.second  = contextGL->getUniformLocation(programGL->getProgramId(), "specular");
    ambientUniform.second   = contextGL->getUniformLocation(programGL->getProgramId(), "ambient");
    shininessUniform.second = contextGL->getUniformLocation(programGL->getProgramId(), "shininess");
    specularFactorUniform.second =
        contextGL->getUniformLocation(programGL->getProgramId(), "specularFactor");

    fogPowerUniform.second  = contextGL->getUniformLocation(programGL->getProgramId(), "fogPower");
    fogMultUniform.second   = contextGL->getUniformLocation(programGL->getProgramId(), "fogMult");
    fogOffsetUniform.second = contextGL->getUniformLocation(programGL->getProgramId(), "fogOffset");
    fogColorUniform.second  = contextGL->getUniformLocation(programGL->getProgramId(), "fogColor");

    viewProjectionUniform.second =
        contextGL->getUniformLocation(programGL->getProgramId(), "viewProjection");
    timeUniform.second = contextGL->getUniformLocation(programGL->getProgramId(), "time");

    diffuseTexture.first    = static_cast<TextureGL *>(textureMap["diffuse"]);
    diffuseTexture.second   = contextGL->getUniformLocation(programGL->getProgramId(), "diffuse");

    positionBuffer.first  = static_cast<BufferGL *>(bufferMap["position"]);
    positionBuffer.second = contextGL->getAttribLocation(programGL->getProgramId(), "position");
    normalBuffer.first    = static_cast<BufferGL *>(bufferMap["normal"]);
    normalBuffer.second   = contextGL->getAttribLocation(programGL->getProgramId(), "normal");
    texCoordBuffer.first  = static_cast<BufferGL *>(bufferMap["texCoord"]);
    texCoordBuffer.second = contextGL->getAttribLocation(programGL->getProgramId(), "texCoord");

    indicesBuffer = static_cast<BufferGL *>(bufferMap["indices"]);
}

void SeaweedModelGL::applyTextures() const
{
    contextGL->setTexture(diffuseTexture.first, diffuseTexture.second, 0);
}

void SeaweedModelGL::applyBuffers() const
{
    ProgramGL *programGL = static_cast<ProgramGL *>(mProgram);
    contextGL->bindVAO(programGL->getVAOId());

    contextGL->setAttribs(positionBuffer.first, positionBuffer.second);
    contextGL->setAttribs(normalBuffer.first, normalBuffer.second);
    contextGL->setAttribs(texCoordBuffer.first, texCoordBuffer.second);

    contextGL->setIndices(indicesBuffer);
}

void SeaweedModelGL::draw() const
{
    updatePerInstanceUniforms();

    contextGL->drawElements(indicesBuffer);
}

void SeaweedModelGL::applyUniforms() const
{
    contextGL->setUniform(viewInverseUniform.second, viewInverseUniform.first, GL_FLOAT_MAT4);
    contextGL->setUniform(lightWorldPosUniform.second, lightWorldPosUniform.first, GL_FLOAT_VEC3);
    contextGL->setUniform(lightColorUniform.second, lightColorUniform.first, GL_FLOAT_VEC4);
    contextGL->setUniform(specularUniform.second, specularUniform.first, GL_FLOAT_VEC4);
    contextGL->setUniform(shininessUniform.second, &shininessUniform.first, GL_FLOAT);
    contextGL->setUniform(specularFactorUniform.second, &specularFactorUniform.first, GL_FLOAT);
    contextGL->setUniform(ambientUniform.second, ambientUniform.first, GL_FLOAT_VEC4);
    contextGL->setUniform(fogPowerUniform.second, &fogPowerUniform.first, GL_FLOAT);
    contextGL->setUniform(fogMultUniform.second, &fogMultUniform.first, GL_FLOAT);
    contextGL->setUniform(fogOffsetUniform.second, &fogOffsetUniform.first, GL_FLOAT);
    contextGL->setUniform(fogColorUniform.second, fogColorUniform.first, GL_FLOAT_VEC4);
    contextGL->setUniform(viewProjectionUniform.second, viewProjectionUniform.first, GL_FLOAT_MAT4);
}

void SeaweedModelGL::updatePerInstanceUniforms() const
{
    contextGL->setUniform(worldUniform.second, worldUniform.first, GL_FLOAT_MAT4);
    contextGL->setUniform(timeUniform.second, &timeUniform.first, GL_FLOAT);
}

void SeaweedModelGL::updateSeaweedModelTime(float time)
{
    timeUniform.first = time;
}
