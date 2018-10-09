#ifndef BUFFER_H
#define BUFFER_H

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include "AttribBuffer.h"

class Buffer
{
public:
	Buffer() {}
	Buffer(AttribBuffer* array, GLenum target);
	~Buffer();

	GLuint getBuffer() { return buf; }
	int getNumComponents() { return numComponents_; }
	int getNumElements() { return numElements_; }
	int getTotalComponents() { return totalComponents_; }
	GLenum getType() { return type_; }
	bool getNormalize() { return normalize_; }
	GLsizei getStride() { return stride_; }
	void* getOffset() { return offset_; }

private:
	GLuint buf;
	GLenum target;
	int numComponents_;
	int numElements_;
	int totalComponents_;
	GLenum type_;
	bool normalize_;
	GLsizei stride_;
	void* offset_;
};

#endif // !BUFFER_H

