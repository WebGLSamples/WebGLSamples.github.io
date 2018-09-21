#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <algorithm>
#include <stdlib.h>
#include <string.h>
#include "Program.h"
#include <map>
#include "Globals.h"
#include <regex>
#include "ASSERT.h"

using namespace std;

Program::Program(string vId, string fId)
{
	createProgram(vId, fId);
	createSetters();
}

Program::~Program()
{
	glDeleteProgram(program);

	for (auto& uniform : uniforms)
	{
		if (uniform.second != nullptr)
		{
			delete uniform.second;
			uniform.second = nullptr;
		}
	}
}

// TODO(yizhou) : refactor createProgram and loadProgram into Program.cpp
void Program::createProgram(string& vId, string& fId)
{
	string VertexShaderCode;
    
	ifstream VertexShaderStream(vId, ios::in);
	if (VertexShaderStream.is_open())
	{
		string Line = "";
		while (getline(VertexShaderStream, Line))
			VertexShaderCode += "\n" + Line;
		VertexShaderStream.close();
	}

	// Read the Fragment Shader code from the file
	string FragmentShaderCode;

	ifstream FragmentShaderStream(fId, ios::in);
	if (FragmentShaderStream.is_open()) {
		string Line = "";
		while (getline(FragmentShaderStream, Line))
			FragmentShaderCode += "\n" + Line;
		FragmentShaderStream.close();
	}

	const string fogUniforms =
		R"(uniform float fogPower;
		uniform float fogMult;
		uniform float fogOffset;
		uniform vec4 fogColor;)";
	const string fogCode =
		R"(outColor = mix(outColor, vec4(fogColor.rgb, diffuseColor.a),
		clamp(pow((v_position.z / v_position.w), fogPower) * fogMult - fogOffset,0.0,1.0));)";

    #ifdef __APPLE__
    VertexShaderCode = std::regex_replace(VertexShaderCode, std::regex(R"(#version 430 core)"), R"(#version 410 core)");
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(#version 430 core)"), R"(#version 410 core)");
    #endif
    
	// enable fog, reflection and normalMaps
	FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(// #fogUniforms)"), fogUniforms);
	FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(// #fogCode)"), fogCode);

    #ifdef _WIN32
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(^.*?// #noReflection\n)"), "");
    FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(^.*?// #noNormalMap\n)"), "");
    #else
	FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(\n.*?// #noReflection)"), "");
	FragmentShaderCode = std::regex_replace(FragmentShaderCode, std::regex(R"(\n.*?// #noNormalMap)"), "");
    #endif
	program = LoadShaders(VertexShaderCode, FragmentShaderCode);
}

void Program::createSetters()
{
	int params;
	GLsizei length, size;
	GLenum type;
	char name[100];

	glUseProgram(program);
	// Look up attributes
	glGetProgramiv(program, GL_ACTIVE_ATTRIBUTES, &params);
	for (int i = 0; i < params; ++i)
	{
		glGetActiveAttrib(program, i, 1024, &length, &size, &type, name);
		GLint index = glGetAttribLocation(program, name);
		ASSERT(index != -1);
		string namestr(name);
		namestr.erase(namestr.find_last_not_of(' ') + 1);
		attribLocs[namestr] = index;
	}

	// Look up uniforms
	glGetProgramiv(program, GL_ACTIVE_UNIFORMS, &params);
	for (int i = 0; i < params; ++i)
	{
		glGetActiveUniform(program, i, 1024, &length, &size, &type, name);
		string namestr(name);
		GLint index = glGetUniformLocation(program, name);
        ASSERT(index != -1);
        uniforms[namestr] = new Uniform(namestr, type, length, size, index);
	}

}

void Program::setAttrib(Buffer* buf, string name)
{
	glBindBuffer(GL_ARRAY_BUFFER, buf->getBuffer());
	GLuint index = attribLocs[name];
	glEnableVertexAttribArray(index);
	glVertexAttribPointer(
		index, buf->getNumComponents(), buf->getType(), buf->getNormalize(), buf->getStride(), buf->getOffset());

	ASSERT(glGetError() == GL_NO_ERROR);
}

inline bool endsWith(std::string const & value, std::string const & ending)
{
	if (ending.size() > value.size()) return false;
	return std::equal(ending.rbegin(), ending.rend(), value.rbegin());
}

GLuint Program::LoadShaders(string& VertexShaderCode, string& FragmentShaderCode){

	// Create the shaders
	GLuint VertexShaderID = glCreateShader(GL_VERTEX_SHADER);
	GLuint FragmentShaderID = glCreateShader(GL_FRAGMENT_SHADER);

	GLint Result = GL_FALSE;
	int InfoLogLength;

	// Compile Vertex Shader
	char const * VertexSourcePointer = VertexShaderCode.c_str();
	glShaderSource(VertexShaderID, 1, &VertexSourcePointer, NULL);
	glCompileShader(VertexShaderID);

	// Check Vertex Shader
	glGetShaderiv(VertexShaderID, GL_COMPILE_STATUS, &Result);
	if (!Result) {
		glGetShaderiv(VertexShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
		vector<char> VertexShaderErrorMessage(InfoLogLength);
		glGetShaderInfoLog(VertexShaderID, InfoLogLength, NULL, &VertexShaderErrorMessage[0]);
		fprintf(stdout, "%s\n", &VertexShaderErrorMessage[0]);
	}

	// Compile Fragment Shader
	char const * FragmentSourcePointer = FragmentShaderCode.c_str();
	glShaderSource(FragmentShaderID, 1, &FragmentSourcePointer, NULL);
	glCompileShader(FragmentShaderID);

	// Check Fragment Shader
	glGetShaderiv(FragmentShaderID, GL_COMPILE_STATUS, &Result);
	if (!Result) {
		glGetShaderiv(FragmentShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
		vector<char> FragmentShaderErrorMessage(InfoLogLength);
		glGetShaderInfoLog(FragmentShaderID, InfoLogLength, NULL, &FragmentShaderErrorMessage[0]);
		fprintf(stdout, "%s\n", &FragmentShaderErrorMessage[0]);
	}

	// Link the program
	fprintf(stdout, "Linking program\n");
	GLuint ProgramID = glCreateProgram();
	glAttachShader(ProgramID, VertexShaderID);
	glAttachShader(ProgramID, FragmentShaderID);
	glLinkProgram(ProgramID);

	// Check the program
	glGetProgramiv(ProgramID, GL_LINK_STATUS, &Result);
	if (!Result) {
		glGetProgramiv(ProgramID, GL_INFO_LOG_LENGTH, &InfoLogLength);
		vector<char> ProgramErrorMessage(max(InfoLogLength, int(1)));
		glGetProgramInfoLog(ProgramID, InfoLogLength, NULL, &ProgramErrorMessage[0]);
		fprintf(stdout, "%s\n", &ProgramErrorMessage[0]);
	}
	glDeleteShader(VertexShaderID);
	glDeleteShader(FragmentShaderID);

	return ProgramID;
}

GLuint Program::LoadShaders(string& VertexShaderCode, string& FragmentShaderCode, string& GeometryShaderCode) {
	// Create the shaders
	GLuint VertexShaderID = glCreateShader(GL_VERTEX_SHADER);
	GLuint FragmentShaderID = glCreateShader(GL_FRAGMENT_SHADER);
	GLuint GeometryShaderID = glCreateShader(GL_GEOMETRY_SHADER);

	GLint Result = GL_FALSE;
	int InfoLogLength;

	// Compile Vertex Shader
	char const * VertexSourcePointer = VertexShaderCode.c_str();
	glShaderSource(VertexShaderID, 1, &VertexSourcePointer, NULL);
	glCompileShader(VertexShaderID);

	// Check Vertex Shader
	glGetShaderiv(VertexShaderID, GL_COMPILE_STATUS, &Result);
	if (!Result) {
		glGetShaderiv(VertexShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
		vector<char> VertexShaderErrorMessage(InfoLogLength);
		glGetShaderInfoLog(VertexShaderID, InfoLogLength, NULL, &VertexShaderErrorMessage[0]);
		fprintf(stdout, "%s\n", &VertexShaderErrorMessage[0]);
	}

	// Compile Fragment Shader
	char const * FragmentSourcePointer = FragmentShaderCode.c_str();
	glShaderSource(FragmentShaderID, 1, &FragmentSourcePointer, NULL);
	glCompileShader(FragmentShaderID);

	// Check Fragment Shader
	glGetShaderiv(FragmentShaderID, GL_COMPILE_STATUS, &Result);
	if (!Result) {
		glGetShaderiv(FragmentShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
		vector<char> FragmentShaderErrorMessage(InfoLogLength);
		glGetShaderInfoLog(FragmentShaderID, InfoLogLength, NULL, &FragmentShaderErrorMessage[0]);
		fprintf(stdout, "%s\n", &FragmentShaderErrorMessage[0]);
	}

	// Compile Geometry Shader
	char const * GeometrySourcePointer = GeometryShaderCode.c_str();
	glShaderSource(GeometryShaderID, 1, &GeometrySourcePointer, NULL);
	glCompileShader(GeometryShaderID);

	// Check Geometry Shader
	glGetShaderiv(GeometryShaderID, GL_COMPILE_STATUS, &Result);
	if (!Result) {
		glGetShaderiv(GeometryShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
		vector<char> GeometryShaderErrorMessage(InfoLogLength);
		glGetShaderInfoLog(GeometryShaderID, InfoLogLength, NULL, &GeometryShaderErrorMessage[0]);
		fprintf(stdout, "%s\n", &GeometryShaderErrorMessage[0]);
	}

	// Link the program
	fprintf(stdout, "Linking program\n");
	GLuint ProgramID = glCreateProgram();
	glAttachShader(ProgramID, VertexShaderID);
	glAttachShader(ProgramID, GeometryShaderID);
	glAttachShader(ProgramID, FragmentShaderID);
	glLinkProgram(ProgramID);

	// Check the program
	glGetProgramiv(ProgramID, GL_LINK_STATUS, &Result);
	glGetProgramiv(ProgramID, GL_INFO_LOG_LENGTH, &InfoLogLength);
	vector<char> ProgramErrorMessage(max(InfoLogLength, int(1)));
	glGetProgramInfoLog(ProgramID, InfoLogLength, NULL, &ProgramErrorMessage[0]);
	fprintf(stdout, "%s\n", &ProgramErrorMessage[0]);

	glDeleteShader(VertexShaderID);
	glDeleteShader(GeometryShaderID);
	glDeleteShader(FragmentShaderID);

	return ProgramID;
}

void Program::use()
{
	glUseProgram(program);
}

int strEndWith(const char* str, const char* suffix)
{
	size_t strLen = strlen(str);
	size_t suffixLen = strlen(suffix);
	if (suffixLen <= strLen) {
		return strncmp(str + strLen - suffixLen, suffix, suffixLen) == 0;
	}
	return 0;
}

void Program::setUniform(const string& name, float v)
{
	if (uniforms.find(name) == uniforms.end())
	{
		return;
	}
	Uniform *uniform = uniforms[name];
	GLenum type = uniform->getType();
    GLint loc = uniform->getIndex();
    ASSERT(type == GL_FLOAT);
    glUniform1f(loc, v);

	ASSERT(glGetError() == GL_NO_ERROR);
}

void Program::setUniform(const string& name, vector<float>* v)
{
	if (uniforms.find(name) == uniforms.end())
	{
		return;
	}

	Uniform *uniform = uniforms[name];
	GLenum type = uniform->getType();
        GLint loc = uniform->getIndex();

	switch (type)
	{
		case GL_FLOAT_VEC4:
		{
			glUniform4fv(loc, 1, v->data());
			break;
		}
		case GL_FLOAT_VEC3:
		{
			glUniform3fv(loc, 1, v->data());
			break;
		}
		case GL_FLOAT_VEC2:
		{
			glUniform2fv(loc, 1, v->data());
			break;
		}
		case GL_FLOAT_MAT4:
		{
			glUniformMatrix4fv(loc, 1, false, v->data());
			break;
		}
		default:
		{
			printf("set uniform error\n");
		}
	}
	
	ASSERT(glGetError() == GL_NO_ERROR);
}

void Program::setUniform(const string& name, Texture* texture)
{
	if (uniforms.find(name) == uniforms.end())
	{
		return;
	}

	Uniform *uniform = uniforms[name];
	GLenum type = uniform->getType();
	ASSERT(type == GL_SAMPLER_2D || type == GL_SAMPLER_CUBE);
        GLint loc = uniform->getIndex();

	glUniform1i(loc, textureUnits[name]);
	glActiveTexture(GL_TEXTURE0 + textureUnits[name]);
	ASSERT(textureUnits[name] < 16);
	glBindTexture(texture->getTarget(), texture->getTexture());

	ASSERT(glGetError() == GL_NO_ERROR);
}

void Program::setTextureUnits(unordered_map<string, Texture*>* textureMap)
{
	int unit = 0;
	for (auto& texture : *textureMap)
	{
		textureUnits.insert(make_pair(texture.first, unit++));
	}
}
