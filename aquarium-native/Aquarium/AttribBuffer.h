#ifndef ATTRIBBUFFER_H
#define ATTRIBBUFFER_H

#include <string>
#include <vector>
#include "Extent.h"

using namespace std;

class AttribBuffer
{
public:
	AttribBuffer() {}

	AttribBuffer(int numComponents, vector<float>& buffer, int size, string opt_type);
	AttribBuffer(int numComponents, int numElements, string opt_type);
	int getNumComponents() { return numComponents; }
	int getNumElements() { return numElements; }

	vector<float>* getBuffer() { return &buffer; }
	void pushBack(vector<float>& vec);
	string getType() { return type; }

	void computeExtents(Extent& extent);
	void getElement(int index, vector<float>& value);
	void setElement(int index, const vector<float>& vec);

private:

	string type;

	vector<float> buffer;
	int numComponents;
	int numElements;
};

#endif // ATTRIBBUFFER_H

