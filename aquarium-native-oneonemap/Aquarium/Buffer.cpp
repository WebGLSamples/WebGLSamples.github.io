#include "Buffer.h"
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <type_traits>
#include <vector>
#include "ASSERT.h"

Buffer::Buffer(AttribBuffer* attribBuffer, GLenum target) :
	target(target),
	numComponents_(attribBuffer->getNumComponents()),
	numElements_(attribBuffer->getNumElements()),
	normalize_(true),
        stride_(0),
        offset_(nullptr)

{
	glGenBuffers(1, &buf);

	glBindBuffer(target, buf);
	
	totalComponents_ = numComponents_ * numElements_;
	
	auto buffer = attribBuffer->getBuffer();

	if (attribBuffer->getType() == "Float32Array")
	{
		type_ = GL_FLOAT;
		normalize_ = false;
		//vector<GLfloat> vec(buffer->begin(), buffer->end());
		glBufferData(target, sizeof(GLfloat) * buffer->size(), buffer->data(), GL_STATIC_DRAW);
	}
	else if (attribBuffer->getType() == "Uint8Array")
	{
		type_ = GL_UNSIGNED_BYTE;
		vector<GLubyte> vec(buffer->begin(), buffer->end());
		glBufferData(target, sizeof(GLubyte) * vec.size(), vec.data(), GL_STATIC_DRAW);
	}
	else if (attribBuffer->getType() == "Int8Array")
	{
		type_ = GL_BYTE;
		vector<GLbyte> vec(buffer->begin(), buffer->end());
		glBufferData(target, sizeof(GLbyte) * vec.size(), vec.data(), GL_STATIC_DRAW);
	}
	else if (attribBuffer->getType() == "Uint16Array")
	{
		type_ = GL_UNSIGNED_SHORT;
		vector<GLushort> vec(buffer->begin(), buffer->end());
		glBufferData(target, sizeof(GLushort) *vec.size(), vec.data(), GL_STATIC_DRAW);
	}
	else if (attribBuffer->getType() == "Int16Array")
	{
		type_ = GL_SHORT;
		vector<GLshort> vec(buffer->begin(), buffer->end());
		glBufferData(target, sizeof(GLshort) * vec.size(), vec.data(), GL_STATIC_DRAW);
	}
	else
	{
		// TODO(yizhou) : handle undefined type
		printf("bindBufferData undefined type.\n");
	}

	ASSERT(glGetError() == GL_NO_ERROR);

}

Buffer::~Buffer()
{
	glDeleteBuffers(1, &buf);
}
