// Uniform.h: Define Uniform Class. Store uniform infos queried from shaders.

#ifndef UNIFORM_H
#define UNIFORM_H

#include <string>

#include "glad/glad.h"

class Uniform
{
public:
  Uniform(){};
  Uniform(const std::string &name, GLenum type, int length, int size, GLint index);

  const std::string &getName() const { return name; }
  const GLenum getType() const { return type; }
  const GLsizei getLength() const { return length; }
  const GLsizei getSize() const { return size; }
  const GLint getIndex() const { return index; }

private:
  std::string name;
  GLenum type;
  GLsizei length, size;
  GLint index;
};

#endif // UNIFORM_H
