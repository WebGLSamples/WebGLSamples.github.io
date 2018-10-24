// Scene.h: Defines Scene class.

#ifndef SCENE_H
#define SCENE_H

#include <string>
#include <unordered_map>
#include <vector>

#include "AttribBuffer.h"
#include "Texture.h"

class Model;

class Scene {
public:
  Scene() {}
  ~Scene();
  Scene(std::string *opt_programIds, bool fog);

  void load(const std::string &path, const std::string &name);
  const std::vector<Model *> &getModels() const { return models; }

  bool loaded;

private:
  void setupSkybox(const std::string &path);

  std::string *programIds;
  bool fog;
  std::string url;
  std::vector<Model *> models;
  std::unordered_map<std::string, Texture *> textureMap;
  std::unordered_map<std::string, AttribBuffer *> arrayMap;
};

#endif // !SCENE_H
