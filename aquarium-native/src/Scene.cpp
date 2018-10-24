// Scene.cpp: Implements Scene.
// Load resources including images, vertexes and programs, then group them into models.

#include "Scene.h"

#include <cstdio>
#include <fstream>
#include <iostream>
#include <sstream>

#include "ASSERT.h"
#include "Globals.h"
#include "Model.h"
#include "Program.h"
#include "rapidjson/document.h"
#include "rapidjson/filereadstream.h"
#include "rapidjson/istreamwrapper.h"
#include "rapidjson/stringbuffer.h"

Scene::Scene(std::string *opt_programIds, bool fog) : programIds(opt_programIds), fog(fog) {}

Scene::~Scene()
{
    for (auto &program : g_programMap)
    {
        if (program.second != nullptr)
        {
            delete program.second;
            program.second = nullptr;
        }
    }

    for (auto &texture : g_textureMap)
    {
        if (texture.second != nullptr)
        {
            delete texture.second;
            texture.second = nullptr;
        }
    }

    for (auto &arr : arrayMap)
    {
        if (arr.second != nullptr)
        {
            delete arr.second;
            arr.second = nullptr;
        }
    }

    for (auto &model : models)
    {
        if (model != nullptr)
        {
            delete model;
            model = nullptr;
        }
    }
}

void Scene::setupSkybox(const std::string &path)
{
    for (auto &v : g_skyBoxUrls)
    {
        std::ostringstream url;
        url << path << sourceFolder << slash << resourceFolder << slash << v;

        v = url.str();
    }
}

void Scene::load(const std::string &path, const std::string &name)
{
    std::ostringstream oss;
    oss << path << sourceFolder << slash << resourceFolder << slash;
    std::string imagePath = oss.str();
    oss << name << ".js";
    std::string modelPath = oss.str();
    oss.str("");
    oss << path << sourceFolder << slash << shaderFolder << slash;
    std::string programPath = oss.str();

    this->url    = modelPath;
    this->loaded = true;

    std::ifstream PlacementStream(modelPath, std::ios::in);
    rapidjson::IStreamWrapper is(PlacementStream);
    rapidjson::Document document;
    document.ParseStream(is);
    ASSERT(document.IsObject());

    for (auto &value : document["models"].GetArray())
    {
        // set up textures
        const rapidjson::Value &textures = value["textures"];
        for (rapidjson::Value::ConstMemberIterator itr = textures.MemberBegin();
             itr != textures.MemberEnd(); ++itr)
        {
            std::string name  = itr->name.GetString();
            std::string image = itr->value.GetString();

            if (g_textureMap.find(image) == g_textureMap.end())
            {
                g_textureMap[image] = new Texture(imagePath + slash + image, true);
            }

            textureMap[name] = g_textureMap[image];
        }

        // set up vertices
        const rapidjson::Value &arrays = value["fields"];
        for (rapidjson::Value::ConstMemberIterator itr = arrays.MemberBegin();
             itr != arrays.MemberEnd(); ++itr)
        {
            std::string name  = itr->name.GetString();
            int numComponents = itr->value["numComponents"].GetInt();
            std::string type  = itr->value["type"].GetString();

            if (name == "indices")
            {
                std::vector<unsigned short> vec;
                for (auto &data : itr->value["data"].GetArray())
                {
                    vec.push_back(data.GetInt());
                }
                arrayMap[name] =
                    new AttribBuffer(numComponents, vec, static_cast<int>(vec.size()), type);
            }
            else
            {
                std::vector<float> vec;
                for (auto &data : itr->value["data"].GetArray())
                {
                    vec.push_back(data.GetFloat());
                }
                arrayMap[name] =
                    new AttribBuffer(numComponents, vec, static_cast<int>(vec.size()), type);
            }
        }

        // setup program
        // There are 3 programs
        // DM
        // DM+NM
        // DM+NM+RM
        std::string type;
        std::string vsId;
        std::string fsId;

        if (textureMap.find("diffuse") == textureMap.end())
        {
            std::cout << "missing diffuse texture for" << url.c_str() << std::endl;
        }

        if (g_textureMap.find("skybox") == g_textureMap.end())
        {
            setupSkybox(path);
            g_textureMap["skybox"] = new Texture(g_skyBoxUrls);
        }

        if (programIds[0] != "" && programIds[1] != "")
        {
            type = "custom";
            vsId = programIds[0];
            fsId = programIds[1];

            textureMap["skybox"] = g_textureMap["skybox"];
        }
        else if (textureMap.find("reflectionMap") != textureMap.end())
        {
            if (textureMap.find("normalMap") != textureMap.end())
            {
                std::cout << "missing normal Map for" << url.c_str() << std::endl;
            }

            type = "reflection";
            vsId = "reflectionMapVertexShader";
            fsId = "reflectionMapFragmentShader";

            textureMap["skybox"] = g_textureMap["skybox"];
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

        Program *program;
        if (g_programMap.find(vsId + fsId) != g_programMap.end())
        {
            program = g_programMap[vsId + fsId];
        }
        else
        {
            program                   = new Program(programPath + vsId, programPath + fsId);
            g_programMap[vsId + fsId] = program;
        }

        Model *model = new Model(program, &arrayMap, &textureMap);
        models.push_back(model);
    }
}
