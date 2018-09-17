// ContextGL.h: Defines the accessing to graphics API of OpenGL.

#pragma once
#ifndef ContextGL_H
#define ContextGL_H 1

#include <vector>

#include "../Context.h"
#include "BufferGL.h"
#include "TextureGL.h"
#include "glad/glad.h"
#include "GLFW/glfw3.h"

class BufferGL;
class TextureGL;

class ContextGL : public Context
{
  public:
    ContextGL();
    ~ContextGL();
    bool createContext() override;
    void setWindowTitle(const std::string &text) override;
    bool ShouldQuit() override;
    void KeyBoardQuit() override;
    void DoFlush() override;
    void Terminate() override;

    void resetState() override;
    void enableBlend(bool flag) const override;

    Model *createModel(Global *g, MODELGROUP type, MODELNAME name, bool blend) override;
    int getUniformLocation(unsigned int programId, std::string name);
    int getAttribLocation(unsigned int programId, std::string name);
    void setUniform(int index, const float *v, int type) const;
    void setTexture(const TextureGL *texture, int index, int unit) const;
    void setAttribs(BufferGL *bufferGL, int index) const;
    void setIndices(BufferGL *bufferGL) const;
    void drawElements(BufferGL *buffer) const;

    Buffer *createBuffer(int numComponents,
                         const std::vector<float> &buffer,
                         bool isIndex) override;
    Buffer *createBuffer(int numComponents,
                         const std::vector<unsigned short> &buffer,
                         bool isIndex) override;
    void generateBuffer(unsigned int *buf);
    void deleteBuffer(unsigned int *buf);
    void bindBuffer(unsigned int target, unsigned int buf);
    void uploadBuffer(unsigned int target, const std::vector<float> &buf);
    void uploadBuffer(unsigned int target, const std::vector<unsigned short> &buf);

    Program *createProgram(std::string vId, std::string fId) override;
    void generateProgram(unsigned int *program);
    void setProgram(unsigned int program);
    void deleteProgram(unsigned int *program);
    bool compileProgram(unsigned int programId,
                        const string &VertexShaderCode,
                        const string &FragmentShaderCode);
    void bindVAO(unsigned int vao);
    void generateVAO(unsigned int *mVAO);
    void deleteVAO(unsigned int *mVAO);

    Texture *createTexture(std::string name, std::string url) override;
    Texture *createTexture(std::string name, const std::vector<std::string> &urls) override;
    void generateTexture(unsigned int *texture);
    void bindTexture(unsigned int target, unsigned int texture);
    void deleteTexture(unsigned int *texture);
    void uploadTexture(unsigned int target,
                       unsigned int format,
                       int width,
                       int height,
                       unsigned char *pixel);
    void setParameter(unsigned int target, unsigned int pname, int param);
    void generateMipmap(unsigned int target);

  private:
    GLFWwindow *mWindow;
};

#endif  // !ContextGL_H
