// Model.cpp: Implement common functions of Model.

#include "Model.h"

void Model::setProgram(Program *prgm)
{
    mProgram = prgm;
}

Model::~Model()
{
    for (auto buf : bufferMap)
    {
        if (buf.second != nullptr)
        {
            delete buf.second;
            buf.second = nullptr;
        }
    }
}

void Model::applyPrograms() const
{
    mProgram->setProgram();
}

void Model::prepare(const Context *context)
{
    context->enableBlend(mBlend);
    applyPrograms();
    applyBuffers();
    applyTextures();
    applyUniforms();
}
