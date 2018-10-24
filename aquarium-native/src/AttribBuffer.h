// AttribBuffer.h: Define AttribBuffer Class. Store vertex attributes such as positions and indexes.

#ifndef ATTRIBBUFFER_H
#define ATTRIBBUFFER_H

#include <string>
#include <vector>

class AttribBuffer
{
public:
  AttribBuffer() {}
  AttribBuffer(int numComponents, const std::vector<float> &buffer, int size, std::string opt_type);
  AttribBuffer(int numComponents,
               const std::vector<unsigned short> &buffer,
               int size,
               std::string opt_type);

  int getNumComponents() { return numComponents; }
  int getNumElements() { return numElements; }

  std::vector<float> *getBufferFloat() { return &bufferFloat; }
  std::vector<unsigned short> *getBufferUShort() { return &bufferUShort; }
  std::string getType() { return type; }

private:
  std::string type;
  std::vector<float> bufferFloat;
  std::vector<unsigned short> bufferUShort;
  int numComponents;
  int numElements;
};

#endif // ATTRIBBUFFER_H
