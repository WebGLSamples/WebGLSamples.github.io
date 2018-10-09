#ifndef SHADERLOADER_H
#define SHADERLOADER_H

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <string>
#include <unordered_map>
#include "Buffer.h"
#include "Uniform.h"
#include "Texture.h"

using namespace std;

class Program
{
public:
	Program() {}
	Program(string vId, string fId);
	~Program();
	void use();
	void setUniform(const string& name, float v);
	void setUniform(const string& name, vector<float>* v);
	void setUniform(const string& name, Texture* texture);

	unordered_map<string, GLint>& getAttribLocs() { return attribLocs; }
	unordered_map<string, Uniform*>& getUniforms() { return uniforms; }

	void setTextureUnits(unordered_map<string, Texture*>* textureMap);
	void setAttrib(Buffer* buf, string name);

    GLuint getProgramId() {return program;}

private:
	void createProgram(string& vId, string& fId);

	GLuint LoadShaders(string& vertexShader, string& fragmentShader);
	GLuint LoadShaders(string& VertexShaderCode, string& FragmentShaderCode, string& GeometryShaderCode);
	void createSetters();

	GLuint program;
	unordered_map<string, GLint> attribLocs;     // name, location
	unordered_map<string, Uniform*> uniforms;      // name, type

	unordered_map<string, int> textureUnits;
};

#endif
