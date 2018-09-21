// ContextGL.cpp: Implements accessing functions to the graphics API of OpenGL.

#include "../ASSERT.h"

#include <algorithm>

#include "BufferGL.h"
#include "ContextGL.h"
#include "ProgramGL.h"
#include "TextureGL.h"

#include "FishModelGL.h"
#include "GenericModelGL.h"
#include "InnerModelGL.h"
#include "OutsideModelGL.h"
#include "SeaweedModelGL.h"

#include <iostream>

ContextGL::ContextGL() {}

ContextGL::~ContextGL() {}

bool ContextGL::createContext()
{
    // initialise GLFW
    if (!glfwInit())
    {
        std::cout << "Failed to initialise GLFW" << std::endl;
        return false;
    }

    glfwWindowHint(GLFW_SAMPLES, 4);

#ifdef __APPLE__
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
#elif _WIN32 || __linux__
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 5);
#endif

    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

    GLFWmonitor *pMonitor   = glfwGetPrimaryMonitor();
    const GLFWvidmode *mode = glfwGetVideoMode(pMonitor);
    mClientWidth            = mode->width;
    mClientHeight           = mode->height;

    mWindow = glfwCreateWindow(mClientWidth, mClientHeight, "Aquarium", NULL, NULL);
    if (mWindow == NULL)
    {
        std::cout << "Failed to open GLFW window." << std::endl;
        glfwTerminate();
        return false;
    }
    glfwWindowHint(GLFW_DECORATED, GL_FALSE);
    glfwMakeContextCurrent(mWindow);
    // Set the window full screen
    // glfwSetWindowPos(window, 0, 0);

    if (!gladLoadGL())
    {
        std::cout << "Something went wrong!" << std::endl;
        exit(-1);
    }

    const char *renderer = (const char *)glGetString(GL_RENDERER);
    std::cout << renderer << std::endl;

    // Get the resolution of screen
    glfwGetFramebufferSize(mWindow, &mClientWidth, &mClientHeight);

    glViewport(0, 0, mClientWidth, mClientHeight);

    return true;
}

Texture *ContextGL::createTexture(std::string name, std::string url)
{
    TextureGL *texture = new TextureGL(this, name, url);
    texture->loadTexture();
    return texture;
}

Texture *ContextGL::createTexture(std::string name, const std::vector<std::string> &urls)
{
    TextureGL *texture = new TextureGL(this, name, urls);
    texture->loadTexture();
    return texture;
}

void ContextGL::generateTexture(unsigned int *texture)
{
    glGenTextures(1, texture);
}

void ContextGL::bindTexture(unsigned int target, unsigned int textureId)
{
    glBindTexture(target, textureId);
}

void ContextGL::deleteTexture(unsigned int *texture)
{
    glDeleteTextures(1, texture);
}

void ContextGL::uploadTexture(unsigned int target,
                              unsigned int format,
                              int width,
                              int height,
                              unsigned char *pixels)
{
    glTexImage2D(target, 0, format, width, height, 0, format, GL_UNSIGNED_BYTE, pixels);
    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::setParameter(unsigned int target, unsigned int pname, int param)
{
    glTexParameteri(target, pname, param);
}

void ContextGL::generateMipmap(unsigned int target)
{
    glGenerateMipmap(target);
}

Buffer *ContextGL::createBuffer(int numComponents, const std::vector<float> &buf, bool isIndex)
{
    BufferGL *buffer = new BufferGL(this, static_cast<int>(buf.size()), numComponents, isIndex, GL_FLOAT, false);
    buffer->loadBuffer(buf);

    return buffer;
}

Buffer *ContextGL::createBuffer(int numComponents,
                                const std::vector<unsigned short> &buf,
                                bool isIndex)
{
    BufferGL *buffer =
        new BufferGL(this, static_cast<int>(buf.size()), numComponents, isIndex, GL_UNSIGNED_SHORT, true);
    buffer->loadBuffer(buf);

    return buffer;
}

Program *ContextGL::createProgram(std::string vId, std::string fId)
{
    ProgramGL *program = new ProgramGL(this, vId, fId);
    program->loadProgram();

    return program;
}

void ContextGL::setWindowTitle(const std::string &text)
{
    glfwSetWindowTitle(mWindow, text.c_str());
}

bool ContextGL::ShouldQuit()
{
    return glfwWindowShouldClose(mWindow);
}

void ContextGL::KeyBoardQuit()
{
    if (glfwGetKey(mWindow, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(mWindow, GL_TRUE);
}

void ContextGL::DoFlush()
{
    glfwSwapBuffers(mWindow);
    glfwPollEvents();
}

void ContextGL::Terminate()
{
    glfwTerminate();
}

int ContextGL::getUniformLocation(unsigned int programId, std::string name)
{
    GLint index = glGetUniformLocation(programId, name.c_str());
    ASSERT(glGetError() == GL_NO_ERROR);
    return index;
}

int ContextGL::getAttribLocation(unsigned int programId, std::string name)
{
    GLint index = glGetAttribLocation(programId, name.c_str());
    ASSERT(glGetError() == GL_NO_ERROR);
    return index;
}

void ContextGL::enableBlend(bool flag) const
{
    if (flag)
    {
        glEnable(GL_BLEND);
    }
    else
    {
        glDisable(GL_BLEND);
    }
}

void ContextGL::drawElements(BufferGL *buffer) const
{
    GLint totalComponents = buffer->getTotalComponents();
    GLenum type           = buffer->getType();
    glDrawElements(GL_TRIANGLES, totalComponents, type, 0);

    ASSERT(glGetError() == GL_NO_ERROR);
}

Model *ContextGL::createModel(Global *g, MODELGROUP type, MODELNAME name, bool blend)
{
    Model *model;
    switch (type)
    {
        case MODELGROUP::FISH:
            model = new FishModelGL(this, g, type, name, blend);
            break;
        case MODELGROUP::GENERIC:
            model = new GenericModelGL(this, g, type, name, blend);
            break;
        case MODELGROUP::INNER:
            model = new InnerModelGL(this, g, type, name, blend);
            break;
        case MODELGROUP::SEAWEED:
            model = new SeaweedModelGL(this, g, type, name, blend);
            break;
        case MODELGROUP::OUTSIDE:
            model = new OutsideModelGL(this, g, type, name, blend);
            break;
        default:
            model = nullptr;
            std::cout << "can not create model type" << std::endl;
    }

    return model;
}

void ContextGL::resetState()
{
    glEnable(GL_DEPTH_TEST);
    glColorMask(true, true, true, true);
    glClearColor(0, 0.8f, 1, 0);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glBlendEquation(GL_FUNC_ADD);
    glEnable(GL_CULL_FACE);
    glDepthMask(true);

    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::setUniform(int index, const float *v, int type) const
{
    ASSERT(index != -1);
    switch (type)
    {
        case GL_FLOAT:
        {
            glUniform1f(index, *v);
            break;
        }
        case GL_FLOAT_VEC4:
        {
            glUniform4fv(index, 1, v);
            break;
        }
        case GL_FLOAT_VEC3:
        {
            glUniform3fv(index, 1, v);
            break;
        }
        case GL_FLOAT_VEC2:
        {
            glUniform2fv(index, 1, v);
            break;
        }
        case GL_FLOAT_MAT4:
        {
            glUniformMatrix4fv(index, 1, false, v);
            break;
        }
        default:
        {
            std::cout << "set uniform error" << std::endl;
        }
    }

    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::setTexture(const TextureGL *texture, int index, int unit) const
{
    ASSERT(index != -1);
    glUniform1i(index, unit);
    glActiveTexture(GL_TEXTURE0 + unit);
    glBindTexture(texture->getTarget(), texture->getTextureId());

    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::setAttribs(BufferGL *bufferGL, int index) const
{
    ASSERT(index != -1);
    glBindBuffer(bufferGL->getTarget(), bufferGL->getBuffer());

    glEnableVertexAttribArray(index);
    glVertexAttribPointer(index, bufferGL->getNumComponents(), bufferGL->getType(),
                          bufferGL->getNormalize(), bufferGL->getStride(), bufferGL->getOffset());

    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::setIndices(BufferGL *bufferGL) const
{
    glBindBuffer(bufferGL->getTarget(), bufferGL->getBuffer());
}

void ContextGL::generateVAO(unsigned int *mVAO)
{
    glGenVertexArrays(1, mVAO);
}

void ContextGL::bindVAO(unsigned int vao)
{
    glBindVertexArray(vao);
}

void ContextGL::deleteVAO(unsigned int *mVAO)
{
    glDeleteVertexArrays(1, mVAO);
}

void ContextGL::generateBuffer(unsigned int *buf)
{
    glGenBuffers(1, buf);
}

void ContextGL::deleteBuffer(unsigned int *buf)
{
    glDeleteBuffers(1, buf);
}

void ContextGL::bindBuffer(unsigned int target, unsigned int buf)
{
    glBindBuffer(target, buf);
}

void ContextGL::uploadBuffer(unsigned int target, const std::vector<float> &buf)
{
    glBufferData(target, sizeof(GLfloat) * buf.size(), buf.data(), GL_STATIC_DRAW);

    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::uploadBuffer(unsigned int target, const std::vector<unsigned short> &buf)
{
    glBufferData(target, sizeof(GLushort) * buf.size(), buf.data(), GL_STATIC_DRAW);

    ASSERT(glGetError() == GL_NO_ERROR);
}

void ContextGL::generateProgram(unsigned int *program)
{
    *program = glCreateProgram();
}

void ContextGL::setProgram(unsigned int program)
{
    glUseProgram(program);
}

void ContextGL::deleteProgram(unsigned int *program)
{
    glDeleteProgram(*program);
}

bool ContextGL::compileProgram(unsigned int programId,
                               const string &VertexShaderCode,
                               const string &FragmentShaderCode)
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
        vector<char> VertexShaderErrorMessage(InfoLogLength);
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
        vector<char> FragmentShaderErrorMessage(InfoLogLength);
        glGetShaderInfoLog(FragmentShaderID, InfoLogLength, NULL, &FragmentShaderErrorMessage[0]);
        std::cout << stdout << &FragmentShaderErrorMessage[0] << std::endl;
    }

    // Link the program
    std::cout << stdout << "Linking program" << std::endl;

    glAttachShader(programId, VertexShaderID);
    glAttachShader(programId, FragmentShaderID);
    glLinkProgram(programId);

    // Check the program
    glGetProgramiv(programId, GL_LINK_STATUS, &Result);
    if (!Result)
    {
        glGetProgramiv(programId, GL_INFO_LOG_LENGTH, &InfoLogLength);
        vector<char> ProgramErrorMessage(max(InfoLogLength, int(1)));
        glGetProgramInfoLog(programId, InfoLogLength, NULL, &ProgramErrorMessage[0]);
        std::cout << stdout << &ProgramErrorMessage[0] << std::endl;
    }
    glDeleteShader(VertexShaderID);
    glDeleteShader(FragmentShaderID);

    return true;
}
