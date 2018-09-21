// Texture.cpp: Use stb image loader to loading images from files.

#include "Texture.h"

#include <iostream>
#include <stdio.h>

#include "ASSERT.h"

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

Texture::Texture(std::string name, const std::string &url) : mName(name), mFlip(true)
{
    std::string urlpath = url;
    mUrls.push_back(urlpath);
}

// Force loading 3 channel images to 4 channel by stb becasue Dawn doesn't support 3 channel
// formats currently. The group is discussing on whether webgpu shoud support 3 channel format.
// https://github.com/gpuweb/gpuweb/issues/66#issuecomment-410021505
bool Texture::loadImage(const std::string &filename, uint8_t **pixels)
{
    stbi_set_flip_vertically_on_load(mFlip);
    *pixels = stbi_load(filename.c_str(), &mWidth, &mHeight, 0, 4);
    if (*pixels == 0)
    {
        std::cout << stderr << "Couldn't open input file" << filename << std::endl;
        return false;
    }
    return true;
}

bool Texture::isPowerOf2(int value)
{
    return (value & (value - 1)) == 0;
}

// Free image data after upload to gpu
void Texture::DestroyImageData(uint8_t *pixels)
{
    free(pixels);
    pixels = nullptr;
}
