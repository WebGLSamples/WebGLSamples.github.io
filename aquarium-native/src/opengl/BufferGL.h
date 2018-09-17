// BufferGL.h: Defines the buffer wrapper of OpenGL.

#pragma once
#ifndef BUFFERGL_H
#define BUFFERGL_H 1

#include <vector>
#include "glad/glad.h"

#include "../Buffer.h"
#include "ContextGL.h"

class ContextGL;

class BufferGL : public Buffer
{
  public:
    BufferGL(ContextGL *context,
             int totalCmoponents,
             int numComponents,
             bool isIndex,
             unsigned int type,
             bool normalize);
    ~BufferGL() override;

    const unsigned int getBuffer() const { return mBuf; }
    const int getNumComponents() const { return mNumComponents; }
    const int getTotalComponents() const { return mTotoalComponents; }
    const int getNumberElements() const { return mNumElements; }
    const unsigned int getType() const { return mType; }
    const bool getNormalize() const { return mNormalize; }
    const int getStride() const { return mStride; }
    const void *getOffset() const { return mOffset; }
    const unsigned int getTarget() const { return mTarget; }
    void loadBuffer(const std::vector<float> &buf);
    void loadBuffer(const std::vector<unsigned short> &buf);

  private:
    ContextGL *context;
    unsigned int mBuf;
    unsigned int mTarget;
    int mNumComponents;
    int mTotoalComponents;
    int mNumElements;
    unsigned int mType;
    bool mNormalize;
    int mStride;
    void *mOffset;
};

#endif
