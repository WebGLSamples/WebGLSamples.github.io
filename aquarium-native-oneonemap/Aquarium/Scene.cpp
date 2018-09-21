#include "Scene.h"
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/filereadstream.h"
#include <cstdio>
#include <map>
#include <vector>
#include "Texture.h"
#include "AttribBuffer.h"
#include "Globals.h"
#include <fstream>
#include "rapidjson/istreamwrapper.h"
#include "ASSERT.h"

using namespace std;

Scene::Scene(string* opt_programIds, bool fog) :
	programIds(opt_programIds),
	loaded(false),
    bad(false),
	fog(fog),
	ignore(false)
{}

Scene::~Scene()
{
	for (auto& program : g_programMap)
	{
		if (program.second != nullptr) {
			delete program.second;
			program.second = nullptr;
		}
	}

	for (auto& texture : g_textureMap)
	{
		if (texture.second != nullptr) {
			delete texture.second;
			texture.second = nullptr;
		}
	}

	for (auto& arr : arrayMap)
	{
		if (arr.second != nullptr)
		{
			delete arr.second;
			arr.second = nullptr;
		}
	}

	for (auto& model : modelVec)
	{
		if (model != nullptr)
		{
			delete model;
			model = nullptr;
		}
	}
}

void setUpSkyBox(string path, vector<string>& skyUrls)
{
	for (auto v : g_skyBoxUrls)
	{
		skyUrls.push_back(path + slash + v);
	}
}

void setAttribBuffer(vector<float>& vec, int size, unordered_map<string, AttribBuffer*>& arrayMap, int numComponents, string& type, string& name)
{
	AttribBuffer* attribbuffer = new AttribBuffer(numComponents, vec, size, type);
	arrayMap[name] = attribbuffer;
}

void Scene::load(string url)
{
	size_t pos = url.find_last_of(slash);      // position of "live" in str
	string imagePath = url.substr(0, pos);
    pos = imagePath.find("otc_share-aquarium");
    string programPath = imagePath.substr(0, pos + 19) + "OpenGL" + slash + "Aquarium" + slash + "shaders" + slash;

	this->url = url;
	this->loaded = true;

	ifstream PlacementStream(url, ios::in);
	rapidjson::IStreamWrapper is(PlacementStream);
	rapidjson::Document document;
	document.ParseStream(is);

	ASSERT(document.IsObject());

	const rapidjson::Value& models = document["models"];
	ASSERT(models.IsArray());

	for (auto& value : document["models"].GetArray())
	{
	    // set up textures
		const rapidjson::Value& textures = value["textures"];
		for (rapidjson::Value::ConstMemberIterator itr = textures.MemberBegin();
			itr != textures.MemberEnd(); ++itr)
		{
			string name = itr->name.GetString();
			string image = itr->value.GetString();

			if (g_textureMap.find(image) == g_textureMap.end()) {
				g_textureMap[image] = new Texture(imagePath + slash + image, true);
			}

			textureMap[name] = g_textureMap[image];
		}

		// set up vertices
		const rapidjson::Value& arrays = value["fields"];
		for (rapidjson::Value::ConstMemberIterator itr = arrays.MemberBegin();
			itr != arrays.MemberEnd(); ++itr)
		{
			string name = itr->name.GetString();
			int numComponents = itr->value["numComponents"].GetInt();
			string type = itr->value["type"].GetString();

			vector<float> vec;
			for (auto& data : itr->value["data"].GetArray())
			{
				vec.push_back(data.GetFloat());
			}
			setAttribBuffer(vec, static_cast<int>(vec.size()), arrayMap, numComponents, type, name);
		}	

		// setup program
		// There are 3 programs
		// DM
		// DM+NM
		// DM+NM+RM
		string type;
		string vsId;
		string fsId;

		// TODO(yizhou) : catch missing texture exception
		if (textureMap.find("diffuse") == textureMap.end())
		{
			printf("missing diffuse texture for %s", url.c_str());
		}

		if (programIds[0] != "" && programIds[1] != "")
		{
			type = "custom";
			vsId = programIds[0];
			fsId = programIds[1];

			if (g_textureMap.find("skybox") == g_textureMap.end()) {
				// set up skybox
				vector<string> skyUrls;
				setUpSkyBox(imagePath, skyUrls);
				textureMap["skybox"] = new Texture(skyUrls);
				g_textureMap["skybox"] = textureMap["skybox"];
			}
			else
			{
				textureMap["skybox"] = g_textureMap["skybox"];
			}
		} else if (textureMap.find("reflectionMap") != textureMap.end())
		{
			if (textureMap.find("normalMap") != textureMap.end()) {
				printf("missing normal Map for %s", url.c_str());
			}

			type = "reflection";
			vsId = "reflectionMapVertexShader";
			fsId = "reflectionMapFragmentShader";

			if (g_textureMap.find("skybox") == g_textureMap.end()) {
				// set up skybox
				vector<string> skyUrls;
				setUpSkyBox(imagePath, skyUrls);
				textureMap["skybox"] = new Texture(skyUrls);
				g_textureMap["skybox"] = textureMap["skybox"];
			}
			else
			{
				textureMap["skybox"] = g_textureMap["skybox"];
			}
		}
		else if (textureMap.find("normalMap") != textureMap.end())
		{
			type = "normalMap";
			vsId = "normalMapVertexShader";
			fsId = "normalMapFragmentShader";
		}
		else
		{
			type = "diffuse";
			vsId = "diffuseVertexShader";
			fsId = "diffuseFragmentShader";
		}

		Program* program;
		if (g_programMap.find(vsId + fsId) != g_programMap.end())
		{
			program =  g_programMap[vsId + fsId];
		}
		else
		{
			program = new Program(programPath + vsId, programPath + fsId);
                        g_programMap[vsId + fsId] = program;
		}

		Model* model = new Model(program, &arrayMap, &textureMap, 0);
		arrayMap["position"]->computeExtents(model->extents);
		modelVec.push_back(model);
	}
}
