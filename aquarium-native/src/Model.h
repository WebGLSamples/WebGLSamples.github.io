// Model.h: Define base Class Model for all of the models.
// Contains programs, textures and buffers info of models.
// Apply program for its model. Update uniforms, textures
// and buffers for each frame.

#pragma once
#ifndef MODEL_H
#define MODEL_H 1

#include <vector>

#include "Aquarium.h"
#include "Buffer.h"
#include "Context.h"
#include "Program.h"
#include "Texture.h"

class Aquarium;
class Program;
class Context;
class Texture;
class Buffer;

enum MODELGROUP : short;
enum MODELNAME : short;

class Model
{
  public:
    Model() {}
    Model(MODELGROUP type, MODELNAME name, bool blend)
        : mType(type), mName(name), mBlend(blend), mProgram(nullptr){};
    virtual ~Model();
    virtual void applyUniforms() const     = 0;
    virtual void updatePerInstanceUnidorms() const = 0;
    virtual void draw() const = 0;

    void applyPrograms() const;
    virtual void applyBuffers() const = 0;
    virtual void applyTextures() const = 0;
    void setProgram(Program *program);
    void prepare(const Context *context);
    virtual void init() = 0;

    std::vector<std::vector<float>> worldmatrixes;
    std::unordered_map<std::string, Texture *> textureMap;
    std::unordered_map<std::string, Buffer *> bufferMap;

  protected:
    Program *mProgram;

  private:
    MODELGROUP mType;
    MODELNAME mName;
    bool mBlend;
};

#endif
