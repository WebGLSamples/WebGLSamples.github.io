// AttribBuffer.cpp: Implements AttribBuffer.

#include "AttribBuffer.h"

AttribBuffer::AttribBuffer(int numComponents,
                           const std::vector<float> &buffer,
                           int size,
                           std::string opt_type)
    : type(opt_type), bufferFloat(buffer), numComponents(numComponents)
{
    numElements = size / numComponents;
}

AttribBuffer::AttribBuffer(int numComponents,
                           const std::vector<unsigned short> &buffer,
                           int size,
                           std::string opt_type)
    : type(opt_type), bufferUShort(buffer), numComponents(numComponents)
{
    numElements = size / numComponents;
}
