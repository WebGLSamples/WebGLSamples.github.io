#include "AttribBuffer.h"

AttribBuffer::AttribBuffer(int numComponents, vector<float>& buffer, int size, string opt_type) :
    type(opt_type),
    buffer(buffer),
    numComponents(numComponents)
{
	if (type == "")
	{
		type = "Float32Array";
	}

	numElements = size / numComponents;
}

AttribBuffer::AttribBuffer(int numComponents, int numElements, string opt_type) :
	numComponents(numComponents),
    numElements(numElements),
	type(opt_type)
{
	if (type == "")
	{
		type = "Float32Array";
	}
}

void AttribBuffer::computeExtents(Extent& extent)
{
	getElement(0, extent.maxExtent);
	getElement(0, extent.minExtent);
	for (int ii = 1; ii < numElements; ++ii)
	{
		vector<float> element;
		getElement(ii, element);
		for (int jj = 0; jj < numComponents; ++jj)
		{
			extent.minExtent[jj] = extent.minExtent[jj] < element[jj] ? extent.minExtent[jj] : element[jj];
			extent.maxExtent[jj] = extent.maxExtent[jj] < element[jj] ? element[jj] : extent.maxExtent[jj];
		}
	}
}

void AttribBuffer::getElement(int index, vector<float>& vec)
{
	int offset = index * numComponents;
	for (int ii = 0; ii < numComponents; ++ii)
	{
		vec.push_back(buffer[offset + ii]);
	}
}

void AttribBuffer::setElement(int index, const vector<float>& value)
{
	int offset = index * numComponents;
	for (int ii = 0; ii < numComponents; ++ii) {
		buffer[offset + ii] = value[ii];
	}
}

void AttribBuffer::pushBack(vector<float> &vec)
{
	for (auto v : vec) {
		buffer.push_back(v);
	}
}
