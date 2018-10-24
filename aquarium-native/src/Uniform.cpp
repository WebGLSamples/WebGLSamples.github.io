#include "Uniform.h"

Uniform::Uniform(const std::string &name, GLenum type, int length, int size, GLint index)
    : name(name), type(type), size(size), length(length), index(index)
{
}
