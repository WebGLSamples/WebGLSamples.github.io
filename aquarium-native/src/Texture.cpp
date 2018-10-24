// Texture.cpp: Load images by stb lib, flip the texture if needed.
// Create texture2D or textureCubeMap, then upload the texture to gpu.

#include "Texture.h"

#include <iostream>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#include "ASSERT.h"

// initializs texture 2d
Texture::Texture(const std::string &url, bool flip) : flip(flip)
{
    std::string urlpath = url;
    urls.push_back(urlpath);
    target = GL_TEXTURE_2D;
    glGenTextures(1, &texture);

    uploadTextures();
}

// initializs cube map
Texture::Texture(const std::vector<std::string> &urls) : urls(urls)
{
    ASSERT(urls.size() == 6);
    target = GL_TEXTURE_CUBE_MAP;
    glGenTextures(1, &texture);

    uploadTextures();
}

Texture::~Texture()
{
    glDeleteTextures(1, &texture);
}

void Texture::setParameter(GLenum pname, GLint param)
{
    params[pname] = param;

    glTexParameteri(target, pname, param);
}

bool Texture::isPowerOf2(int value)
{
    return (value & (value - 1)) == 0;
}

// Force loading 3 channel images to 4 channel by stb becasue Dawn doesn't support 3 channel
// formats currently. The group is discussing on whether webgpu shoud support 3 channel format.
// https://github.com/gpuweb/gpuweb/issues/66#issuecomment-410021505
bool Texture::loadImageBySTB(const std::string &filename, uint8_t **pixels)
{
    stbi_set_flip_vertically_on_load(flip);
    *pixels = stbi_load(filename.c_str(), &width, &height, 0, 4);
    if (*pixels == 0)
    {
        std::cout << stderr << "Couldn't open input file" << filename << std::endl;
        return false;
    }
    return true;
}

// Free image data after upload to gpu
void Texture::DestroyImageData(uint8_t *pixels)
{
    free(pixels);
    pixels = nullptr;
}

void Texture::uploadTextures()
{
    glBindTexture(target, texture);
    unsigned char *pixels = nullptr;

    // create Texture2D
    if (target == GL_TEXTURE_2D)
    {
        glTexParameteri(target, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

        loadImageBySTB(urls[0], &pixels);
        glTexImage2D(target, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, pixels);
        DestroyImageData(pixels);
        ASSERT(glGetError() == GL_NO_ERROR);

        if (isPowerOf2(width) && isPowerOf2(height))
        {
            setParameter(GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
            glGenerateMipmap(target);
        }
        else
        {
            setParameter(GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
            setParameter(GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
            setParameter(GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        }
    }
    // create TextureCubeMap
    else if (target == GL_TEXTURE_CUBE_MAP)
    {
        for (unsigned int i = 0; i < 6; i++)
        {
            loadImageBySTB(urls[i], &pixels);
            glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, pixels);
            DestroyImageData(pixels);
        }
        ASSERT(glGetError() == GL_NO_ERROR);

        setParameter(GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        setParameter(GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        setParameter(GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
        setParameter(GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    }
    ASSERT(glGetError() == GL_NO_ERROR);
}
