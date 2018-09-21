// ProgramGL.h: Defines Program wrapper of OpenGL.
// Load shaders from folder shaders/opengl.
// Compiles OpenGL shaders and check if compiled success.
// Apply Buffers, Textures and Uniforms to program.

#pragma once
#ifndef PROGRAMGL_H
#define PROGRAMGL_H 1

#include "../Program.h"

#ifndef SHADERLOADER_H
#define SHADERLOADER_H

#include <string>
#include <unordered_map>

#include "../Aquarium.h"
#include "BufferGL.h"
#include "ContextGL.h"
#include "TextureGL.h"

class ProgramGL : public Program
{
public:
    ProgramGL() {}
    ProgramGL(ContextGL *, string vId, string fId);
    ~ProgramGL() override;

    void setProgram() override;
    const GLuint getProgramId() const { return mProgramId; }
    const GLuint getVAOId() { return mVAO; }
    void loadProgram();

  private:
    GLuint mProgramId;
    GLuint mVAO;

    ContextGL *context;
};

#endif

#endif // !PROGRAMGL_H
