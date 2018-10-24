// Texture.h: Define Texture class.

#ifndef TEXTURE_H
#define TEXTURE_H

#include <string>
#include <unordered_map>
#include <vector>

#include "glad/glad.h"

class Texture
{
public:
  Texture() {}
  ~Texture();
  Texture(const std::string &url, bool flip);
  Texture(const std::vector<std::string> &urls);

  const GLuint getTexture() const { return texture; }
  const GLenum getTarget() const { return target; }
  void setTexture(GLuint texId) { texture = texId; }
  bool loadImageBySTB(const std::string &filename, uint8_t **pixels);
  void DestroyImageData(uint8_t *pixels);

private:
  std::vector<std::string> urls;
  GLenum target;
  GLuint texture;
  std::unordered_map<GLenum, GLint> params;
  int width;
  int height;
  bool flip;
  void setParameter(GLenum, GLint);
  void uploadTextures();
  bool isPowerOf2(int value);
};

#endif // !TEXTURE_H
