// Model.cpp: Implements Model class. Apply program for its model.
// Update uniforms, textures and buffers for each frame.

#include "Model.h"

#include "ASSERT.h"
#include "Globals.h"

Model::Model(Program *program_,
             std::unordered_map<std::string, AttribBuffer *> *arrays,
             std::unordered_map<std::string, Texture *> *textures)
    : textures(textures), program(program_), mode(GL_TRIANGLES)
{
    setBuffers(arrays);

    program->setTextureUnits(*textures);
}

Model::~Model()
{
    for (auto buffer : buffers)
    {
        delete buffer.second;
        buffer.second = nullptr;
    }
}

void Model::setBuffer(const std::string &name, AttribBuffer *array)
{
    GLenum target = name == "indices" ? GL_ELEMENT_ARRAY_BUFFER : GL_ARRAY_BUFFER;

    if (buffers.find(name) == buffers.end())
    {
        Buffer *b = new Buffer(array, target);
        buffers[name] = b;
    }
}

void Model::setBuffers(std::unordered_map<std::string, AttribBuffer *> *arrays)
{
    for (std::unordered_map<std::string, AttribBuffer *>::iterator iter = arrays->begin();
         iter != arrays->end(); ++iter)
    {
        setBuffer(iter->first, iter->second);
    }
}

void Model::applyBuffers() const
{
    GLuint mVAO;
    glGenVertexArrays(1, &mVAO);
    glBindVertexArray(mVAO);

    // Apply array buffer and element buffer
    for (const auto &buffer : buffers)
    {
        if (buffer.first == "indices")
        {
            glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer.second->getBuffer());
        }
        else
        {
            glBindBuffer(GL_ARRAY_BUFFER, buffer.second->getBuffer());
            auto &attribLocs = program->getAttribLocs();
            if (attribLocs.find(buffer.first) == attribLocs.end())
            {
                continue;
            }
            program->setAttrib(*buffer.second, buffer.first);
        }
    }
}

void Model::applyTextures() const
{
    // Apply textures
    for (std::unordered_map<std::string, Texture *>::iterator it = textures->begin();
         it != textures->end(); ++it)
    {
        program->setUniform(it->first, it->second);
    }
}

void Model::drawPrep(const GenericConst &constUniforms)
{
    program->use();

    applyBuffers();
    applyTextures();

    // Apply other uniforms
    program->setUniform("ambient", constUniforms.ambient);
    program->setUniform("fogColor", constUniforms.fogColor);
    program->setUniform("fogMult", constUniforms.fogMult);
    program->setUniform("fogOffset", constUniforms.fogOffset);
    program->setUniform("fogPower", constUniforms.fogPower);
    program->setUniform("lightColor", constUniforms.lightColor);
    program->setUniform("shininess", constUniforms.shininess);
    program->setUniform("specular", constUniforms.specular);
    program->setUniform("specularFactor", constUniforms.specularFactor);
    program->setUniform("lightWorldPos", constUniforms.lightWorldPos);
    program->setUniform("viewInverse", constUniforms.viewInverse);
    program->setUniform("viewProjection", constUniforms.viewProjection);

    // The belowing uniforms belongs to innerConst
    program->setUniform("eta", constUniforms.eta);
    program->setUniform("refractionFudge", constUniforms.refractionFudge);
    program->setUniform("tankColorFudge", constUniforms.tankColorFudge);
}

void Model::drawPrep(const FishConst &fishConst)
{
    drawPrep(fishConst.genericConst);

    program->setUniform("fishBendAmount", fishConst.constUniforms.fishBendAmount);
    program->setUniform("fishLength", fishConst.constUniforms.fishLength);
    program->setUniform("fishWaveLength", fishConst.constUniforms.fishWaveLength);
}

void Model::drawFunc()
{
    int totalComponents = 0;

    if (buffers.find("indices") != buffers.end())
    {
        totalComponents = buffers["indices"]->getTotalComponents();
        GLenum type     = buffers["indices"]->getType();
        glDrawElements(mode, totalComponents, type, 0);
    }
    else
    {
        totalComponents = buffers["positions"]->getNumElements();
        glDrawArrays(mode, 0, totalComponents);
    }
}

void Model::draw(const GenericPer &perUniforms)
{
    program->setUniform("world", perUniforms.world);
    program->setUniform("worldInverse", perUniforms.worldInverse);
    program->setUniform("worldInverseTranspose", perUniforms.worldInverseTranspose);
    program->setUniform("worldViewProjection", perUniforms.worldViewProjection);

    drawFunc();
    ASSERT(glGetError() == GL_NO_ERROR);
}

void Model::draw(const FishPer &fishPer)
{
    program->setUniform("worldPosition", &fishPer.worldPosition);
    program->setUniform("nextPosition", &fishPer.nextPosition);
    program->setUniform("scale", fishPer.scale);
    program->setUniform("time", fishPer.time);

    drawFunc();
    ASSERT(glGetError() == GL_NO_ERROR);
}
