#ifndef PRIMITIVES_H
#define PROMITIVES_H 1

#include <map>
#include <string>
#include "AttribBuffer.h"
#include <vector>
#include "Globals.h"

using namespace std;

class Primitives
{
public:
	Primitives() {}
	~Primitives();
	unordered_map<string, AttribBuffer*>* createPlane(float width, float depth, float subdivisionsWidth, float subdivisionsDepth);
	void reorient(vector<float>& matrix);

private:
	vector<float> transformPoint(vector<float>& m, vector<float>& v);
	unordered_map<string, AttribBuffer*> arrays;
};

#endif