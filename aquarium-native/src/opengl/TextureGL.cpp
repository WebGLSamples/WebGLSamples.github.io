// TextureGL.cpp. Wrap textures of OpenGL. Load image files and wrap into an OpenGL texture.

#include "TextureGL.h"

#include "../ASSERT.h"

// initializs texture 2d
TextureGL::TextureGL(ContextGL *context, std::string name, std::string url)
    : context(context), mTarget(GL_TEXTURE_2D), mFormat(GL_RGBA), Texture(name, url)
{
    context->generateTexture(&mTextureId);
}

// initializs cube map
TextureGL::TextureGL(ContextGL *context, std::string name, const std::vector<std::string> &urls)
    : context(context), mTarget(GL_TEXTURE_CUBE_MAP), mFormat(GL_RGBA), Texture(name, urls)
{
    ASSERT(urls.size() == 6);
    context->generateTexture(&mTextureId);
}

void TextureGL::loadTexture()
{
    context->bindTexture(mTarget, mTextureId);
    unsigned char *pixels = nullptr;

    if (mTarget == GL_TEXTURE_CUBE_MAP)
    {
        for (unsigned int i = 0; i < 6; i++)
        {
            loadImage(mUrls[i], &pixels);
            context->uploadTexture(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, mFormat, mWidth, mHeight,
                                   pixels);
            DestoryImageData(pixels);
        }

        context->setParameter(mTarget, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        context->setParameter(mTarget, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        context->setParameter(mTarget, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
        context->setParameter(mTarget, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    }
    else  // GL_TEXTURE_2D
    {
        loadImage(mUrls[0], &pixels);
        context->uploadTexture(mTarget, mFormat, mWidth, mHeight, pixels);
        DestoryImageData(pixels);

        if (isPowerOf2(mWidth) && isPowerOf2(mHeight))
        {
            context->setParameter(mTarget, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
            context->generateMipmap(mTarget);
        }
        else
        {
            context->setParameter(mTarget, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
            context->setParameter(mTarget, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
            context->setParameter(mTarget, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        }
        context->setParameter(mTarget, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    }
}

TextureGL::~TextureGL()
{
    context->deleteTexture(&mTextureId);
}
