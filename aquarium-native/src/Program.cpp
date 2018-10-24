// Program.cpp: Implements Program class.
// Load shaders from folder shaders.
// Compiles OpenGL shaders and check if compiled success.
// Apply Buffers, Textures and Uniforms to program.

#include "Program.h"

#include <algorithm>
#include <fstream>
#include <iostream>
#include <regex>

#include "ASSERT.h"

Program::Program(std::string vId, std::string fId)
{
    createProgramFromTags(vId, fId);
    createSetters();
}

Program::~Program()
{
    glDeleteProgram(program);

    for (auto &uniform : uniforms)
    {
        if (uniform.second != nullptr)
        {
            delete uniform.second;
            uniform.second = nullptr;
        }
    }
}

void Program::createProgramFromTags(const std::string &vId, const std::string &fId)
{
    std::ifstream VertexShaderStream(vId, std::ios::in);
    std::string VertexShaderCode((std::istreambuf_iterator<char>(VertexShaderStream)),
        std::istreambuf_iterator<char>());
    VertexShaderStream.close();

    std::ifstream FragmentShaderStream(fId, std::ios::in);
    std::string FragmentShaderCode((std::istreambuf_iterator<char>(FragmentShaderStream)),
        std::istreambuf_iterator<char>());
    FragmentShaderStream.close();

    const std::string fogUniforms =
        R"(uniform float fogPower;
        uniform float fogMult;
        uniform float fogOffset;
        uniform vec4 fogColor;)";
    const std::string fogCode =
        R"(outColor = mix(outColor, vec4(fogColor.rgb, diffuseColor.a),
        clamp(pow((v_position.z / v_position.w), fogPower) * fogMult - fogOffset,0.0,1.0));)";

#ifdef __APPLE__
    VertexShaderCode = std::regex_replace(VertexShaderCode, std::regex(R"(#version 450 core)"), R"(#version 410 core)");
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(#version 450 core)"), R"(#version 410 core)");
    #endif

    // enable fog, reflection and normalMaps
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(// #fogUniforms)"), fogUniforms);
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(// #fogCode)"), fogCode);

#ifdef _WIN32
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(^.*?// #noReflection\n)"), "");
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(^.*?// #noNormalMap\n)"), "");
    #else
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(\n.*?// #noReflection)"), "");
    FragmentShaderCode =
        std::regex_replace(FragmentShaderCode, std::regex(R"(\n.*?// #noNormalMap)"), "");
#endif
    program = LoadProgram(VertexShaderCode, FragmentShaderCode);
}

void Program::createSetters()
{
    int params;
    GLsizei length, size;
    GLenum type;
    char name[100];

    glUseProgram(program);

    // Look up attributes
    glGetProgramiv(program, GL_ACTIVE_ATTRIBUTES, &params);
    for (int i = 0; i < params; ++i)
    {
        glGetActiveAttrib(program, i, 1024, &length, &size, &type, name);
        GLint index = glGetAttribLocation(program, name);
        ASSERT(index != -1);
        std::string namestr(name);
        namestr.erase(namestr.find_last_not_of(' ') + 1);
        attribLocs[namestr] = index;
    }

    // Look up uniforms
    glGetProgramiv(program, GL_ACTIVE_UNIFORMS, &params);
    for (int i = 0; i < params; ++i)
    {
        glGetActiveUniform(program, i, 1024, &length, &size, &type, name);
        std::string namestr(name);
        GLint index = glGetUniformLocation(program, name);
        ASSERT(index != -1);
        uniforms[namestr] = new Uniform(namestr, type, length, size, index);
    }
}

void Program::setAttrib(const Buffer &buf, const std::string &name)
{
    glBindBuffer(GL_ARRAY_BUFFER, buf.getBuffer());
    GLuint index = attribLocs[name];
    glEnableVertexAttribArray(index);
    glVertexAttribPointer(index, static_cast<GLint>(buf.getNumComponents()), buf.getType(),
                          buf.getNormalize(), buf.getStride(), buf.getOffset());

    ASSERT(glGetError() == GL_NO_ERROR);
}

GLuint Program::LoadProgram(const std::string &VertexShaderCode,
                            const std::string &FragmentShaderCode)
{

    // Create the shaders
    GLuint VertexShaderID   = glCreateShader(GL_VERTEX_SHADER);
    GLuint FragmentShaderID = glCreateShader(GL_FRAGMENT_SHADER);

    GLint Result = GL_FALSE;
    int InfoLogLength;

    // Compile Vertex Shader
    char const *VertexSourcePointer = VertexShaderCode.c_str();
    glShaderSource(VertexShaderID, 1, &VertexSourcePointer, NULL);
    glCompileShader(VertexShaderID);

    // Check Vertex Shader
    glGetShaderiv(VertexShaderID, GL_COMPILE_STATUS, &Result);
    if (!Result)
    {
        glGetShaderiv(VertexShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
        std::vector<char> VertexShaderErrorMessage(InfoLogLength);
        glGetShaderInfoLog(VertexShaderID, InfoLogLength, NULL, &VertexShaderErrorMessage[0]);
        std::cout << stdout << &VertexShaderErrorMessage[0] << std::endl;
    }

    // Compile Fragment Shader
    char const *FragmentSourcePointer = FragmentShaderCode.c_str();
    glShaderSource(FragmentShaderID, 1, &FragmentSourcePointer, NULL);
    glCompileShader(FragmentShaderID);

    // Check Fragment Shader
    glGetShaderiv(FragmentShaderID, GL_COMPILE_STATUS, &Result);
    if (!Result)
    {
        glGetShaderiv(FragmentShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
        std::vector<char> FragmentShaderErrorMessage(InfoLogLength);
        glGetShaderInfoLog(FragmentShaderID, InfoLogLength, NULL, &FragmentShaderErrorMessage[0]);
        std::cout << stdout << &FragmentShaderErrorMessage[0] << std::endl;
    }

    // Link the program
    std::cout << stdout << "Linking program" << std::endl;
    GLuint ProgramID = glCreateProgram();
    glAttachShader(ProgramID, VertexShaderID);
    glAttachShader(ProgramID, FragmentShaderID);
    glLinkProgram(ProgramID);

    // Check the program
    glGetProgramiv(ProgramID, GL_LINK_STATUS, &Result);
    if (!Result)
    {
        glGetProgramiv(ProgramID, GL_INFO_LOG_LENGTH, &InfoLogLength);
        std::vector<char> ProgramErrorMessage(std::max(InfoLogLength, int(1)));
        glGetProgramInfoLog(ProgramID, InfoLogLength, NULL, &ProgramErrorMessage[0]);
        std::cout << stdout << &ProgramErrorMessage[0] << std::endl;
    }
    glDeleteShader(VertexShaderID);
    glDeleteShader(FragmentShaderID);

    return ProgramID;
}

void Program::use()
{
    glUseProgram(program);
}

void Program::setUniform(const std::string &name, float v)
{
    if (uniforms.find(name) == uniforms.end())
    {
        return;
    }
    Uniform *uniform = uniforms[name];
    GLenum type      = uniform->getType();
    GLint loc = uniform->getIndex();
    ASSERT(type == GL_FLOAT);
    glUniform1f(loc, v);

    ASSERT(glGetError() == GL_NO_ERROR);
}

void Program::setUniform(const std::string &name, const std::vector<float> *v)
{
    if (uniforms.find(name) == uniforms.end())
    {
        return;
    }

    Uniform *uniform = uniforms[name];
    GLenum type      = uniform->getType();
    GLint loc        = uniform->getIndex();

    switch (type)
    {
        case GL_FLOAT_VEC4:
        {
            glUniform4fv(loc, 1, v->data());
            break;
        }
        case GL_FLOAT_VEC3:
        {
            glUniform3fv(loc, 1, v->data());
            break;
        }
        case GL_FLOAT_VEC2:
        {
            glUniform2fv(loc, 1, v->data());
            break;
        }
        case GL_FLOAT_MAT4:
        {
            glUniformMatrix4fv(loc, 1, false, v->data());
            break;
        }
        default:
        {
            std::cout << "set uniform error" << std::endl;
        }
    }

    ASSERT(glGetError() == GL_NO_ERROR);
}

void Program::setUniform(const std::string &name, const Texture *texture)
{
    if (uniforms.find(name) == uniforms.end())
    {
        return;
    }

    Uniform *uniform = uniforms[name];
    GLenum type      = uniform->getType();
    ASSERT(type == GL_SAMPLER_2D || type == GL_SAMPLER_CUBE);
    GLint loc = uniform->getIndex();

    glUniform1i(loc, textureUnits[name]);
    glActiveTexture(GL_TEXTURE0 + textureUnits[name]);
    ASSERT(textureUnits[name] < 16);
    glBindTexture(texture->getTarget(), texture->getTexture());

    ASSERT(glGetError() == GL_NO_ERROR);
}

void Program::setTextureUnits(const std::unordered_map<std::string, Texture *> &textureMap)
{
    int unit = 0;
    for (auto &texture : textureMap)
    {
        textureUnits[texture.first] = unit++;
    }
}
