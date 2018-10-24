// Buffer.h : Define Buffer Class and upload buffers to gpu.

#ifndef BUFFER_H
#define BUFFER_H

#include <vector>

#include "AttribBuffer.h"
#include "glad/glad.h"

class Buffer
{
public:
  Buffer() {}
  Buffer(AttribBuffer *array, GLenum target);
  ~Buffer();

  const GLuint getBuffer() const { return buf; }
  const int getNumComponents() const { return numComponents_; }
  const int getNumElements() const { return numElements_; }
  const int getTotalComponents() const { return totalComponents_; }
  const GLenum getType() const { return type_; }
  const bool getNormalize() const { return normalize_; }
  const GLsizei getStride() const { return stride_; }
  const void *getOffset() const { return offset_; }

private:
  GLuint buf;
  GLenum target;
  int numComponents_;
  int numElements_;
  int totalComponents_;
  GLenum type_;
  bool normalize_;
  GLsizei stride_;
  void *offset_;
};

#endif // !BUFFER_H
