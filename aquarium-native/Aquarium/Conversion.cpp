#include "Conversion.h"

vector<float> convertVec2Float(vector<double>* v)
{
	return vector<float>(v->begin(), v->end());
}

vector<double> convertVec2Double(vector<float>* v)
{
	return vector<double>(v->begin(), v->end());
}