// BufferGL.cpp: Implements the index or vertex buffer wrappers and resource bindings of OpenGL.

#include "BufferGL.h"
#include "../ASSERT.h"

BufferGL::BufferGL(ContextGL *context,
                   int totalCmoponents,
                   int numComponents,
                   bool isIndex,
                   unsigned int type,
                   bool normalize)
    : context(context),
      mTotoalComponents(totalCmoponents),
      mNumComponents(numComponents),
      mTarget(isIndex ? GL_ELEMENT_ARRAY_BUFFER : GL_ARRAY_BUFFER),
      mType(type),
      mNormalize(normalize),
      mStride(0),
      mOffset(nullptr)
{
    mNumElements = mTotoalComponents / numComponents;
    context->generateBuffer(&mBuf);
}

void BufferGL::loadBuffer(const std::vector<float> &buf)
{
    context->bindBuffer(mTarget, mBuf);
    context->uploadBuffer(mTarget, buf);
}

void BufferGL::loadBuffer(const std::vector<unsigned short> &buf)
{
    context->bindBuffer(mTarget, mBuf);
    context->uploadBuffer(mTarget, buf);
}

BufferGL::~BufferGL()
{
    context->deleteBuffer(&mBuf);
}
