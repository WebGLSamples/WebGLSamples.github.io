// Texture.h: Define abstract Texture for Aquarium.

#pragma once
#ifndef  TEXTURE_H
#define TEXTURE_H 1

#include <string>
#include <vector>

class Texture
{
  public:
    virtual ~Texture(){};
    Texture() {}
    Texture(std::string name, const std::vector<std::string> &urls) : mName(name), mUrls(urls) {}
    Texture(std::string name, const std::string &url);
    std::string getName() { return mName; }

  protected:
    bool isPowerOf2(int);
    bool loadImage(const std::string &filename, uint8_t **pixels);
    void DestoryImageData(uint8_t *pixels);

    std::vector<std::string> mUrls;
    int mWidth;
    int mHeight;
    bool mFlip;

    std::string mName;
};

#endif // ! TEXTURE_H

