#ifndef SCENE_H
#define SCENE_H

#include <string>
#include "Program.h"
#include <vector>
#include "Model.h"

using namespace std;

class Model;

class Scene {
public:
	Scene() {}
	~Scene();
	Scene(string* opt_programIds, bool fog);

	void load(string url);

	vector<Model*>& getModels() { return modelVec; }
	
	bool loaded;

private:
	string* programIds;
	bool bad;

	bool fog;

	bool ignore;
	string url;

	vector<Model*> modelVec;
	unordered_map<string, Texture*> textureMap;
	unordered_map<string, AttribBuffer*> arrayMap;
};

#endif // !SCENE_H
