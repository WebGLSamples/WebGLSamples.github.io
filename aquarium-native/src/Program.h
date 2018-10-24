// Program.h: Defines Program Class.

#ifndef SHADERLOADER_H
#define SHADERLOADER_H

#include <string>
#include <unordered_map>
#include <vector>

#include "Buffer.h"
#include "Texture.h"
#include "Uniform.h"

class Program
{
public:
  Program() {}
  Program(std::string vId, std::string fId);
  ~Program();
  void use();
  void setUniform(const std::string &name, float v);
  void setUniform(const std::string &name, const std::vector<float> *v);
  void setUniform(const std::string &name, const Texture *texture);

  const std::unordered_map<std::string, GLint> &getAttribLocs() const { return attribLocs; }
  const std::unordered_map<std::string, Uniform *> &getUniforms() const { return uniforms; }

  void setTextureUnits(const std::unordered_map<std::string, Texture *> &textureMap);
  void setAttrib(const Buffer &buf, const std::string &name);

  GLuint getProgramId() { return program; }

private:
  void createProgramFromTags(const std::string &vId, const std::string &fId);
  GLuint LoadProgram(const std::string &vertexShader, const std::string &fragmentShader);
  void createSetters();

  GLuint program;
  std::unordered_map<std::string, GLint> attribLocs;    // name, location
  std::unordered_map<std::string, Uniform *> uniforms;  // name, type

  std::unordered_map<std::string, int> textureUnits;
};

#endif
