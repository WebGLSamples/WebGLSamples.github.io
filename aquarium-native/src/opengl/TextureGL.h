// TextureGL.h: Define Texture  wrapper class of OpenGL.

#pragma once
#ifndef TEXTUREGL_H
#define TEXTUREGL_H 1

#include <string>
#include <unordered_map>
#include <vector>
#include "glad/glad.h"

#include "../Texture.h"
#include "ContextGL.h"

class ContextGL;

class TextureGL : public Texture
{
  public:
    ~TextureGL() override;
    TextureGL(ContextGL *context, std::string name, std::string url);
    TextureGL(ContextGL *context, std::string name, const std::vector<std::string> &urls);

    const unsigned int getTextureId() const { return mTextureId; }
    const unsigned int getTarget() const { return mTarget; }
    void setTextureId(unsigned int texId) { mTextureId = texId; }

    void loadTexture();

  private:

    unsigned int mTarget;
    unsigned int mTextureId;
    unsigned int mFormat;
    ContextGL *context;
};

#endif // !TEXTUREGL_H
