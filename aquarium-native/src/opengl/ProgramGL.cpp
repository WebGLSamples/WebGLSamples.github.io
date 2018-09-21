// ProgramGL.cpp: Implement Program wrapper of OpenGL.
// Load shaders from folder shaders/opengl.
// Compiles OpenGL shaders and check if compiled success.
// Apply Buffers, Textures and Uniforms to program.

#include "ProgramGL.h"

#include "glad/glad.h"
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <string.h>
#include "ProgramGL.h"
#include <map>
#include <regex>
#include "../ASSERT.h"
#include "../Texture.h"
#include "../Buffer.h"

ProgramGL::ProgramGL(ContextGL *context, string vId, string fId)
    : context(context), Program(vId, fId)
{
    context->generateProgram(&mProgramId);
    context->generateVAO(&mVAO);
}

ProgramGL::~ProgramGL()
{
    context->deleteVAO(&mVAO);
    context->deleteProgram(&mProgramId);
}

void ProgramGL::loadProgram()
{
    ifstream VertexShaderStream(vId, ios::in);
    std::string VertexShaderCode((std::istreambuf_iterator<char>(VertexShaderStream)),
                                 std::istreambuf_iterator<char>());
    VertexShaderStream.close();

    // Read the Fragment Shader code from the file
    ifstream FragmentShaderStream(fId, ios::in);
    std::string FragmentShaderCode((std::istreambuf_iterator<char>(FragmentShaderStream)),
                                   std::istreambuf_iterator<char>());
    FragmentShaderStream.close();

    const string fogUniforms =
        R"(uniform float fogPower;
        uniform float fogMult;
        uniform float fogOffset;
        uniform vec4 fogColor;)";
    const string fogCode =
        R"(outColor = mix(outColor, vec4(fogColor.rgb, diffuseColor.a),
        clamp(pow((v_position.z / v_position.w), fogPower) * fogMult - fogOffset,0.0,1.0));)";

#ifdef __APPLE__
    VertexShaderCode   = std::regex_replace(VertexShaderCode, std::regex(R"(#version 450 core)"),
                                          R"(#version 410 core)");
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(#version 450 core)"),
                                            R"(#version 410 core)");
#endif

    // enable fog, reflection and normalMaps
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(// #fogUniforms)"), fogUniforms);
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(// #fogCode)"), fogCode);

#ifdef _WIN32
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(^.*?// #noReflection\n)"), "");
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(^.*?// #noNormalMap\n)"), "");
#else
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(\n.*?// #noReflection)"), "");
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(\n.*?// #noNormalMap)"), "");
#endif

    bool status = context->compileProgram(mProgramId, VertexShaderCode, FragmentShaderCode);
    ASSERT(status);
}

void ProgramGL::setProgram()
{
    context->setProgram(mProgramId);
}
