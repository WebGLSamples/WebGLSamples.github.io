#ifndef MODEL_H
#define MODEL_H

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <unordered_map>
#include <string>
#include "Buffer.h"
#include "Texture.h"
#include "Program.h"
#include "Extent.h"
#include "Globals.h"

using namespace std;

typedef struct GenericConst_ GenericConst;
typedef struct GenericPer_ GenericPer;
typedef struct SkyConst_ SkyConst;
typedef struct FishConst_ FishConst;
typedef struct FishPer_ FishPer;
typedef struct InnerConst_ InnerConst;

class Model
{
public:
	Model() {}
	~Model();
	Model(Program* program, unordered_map<string, AttribBuffer*>* arrayMap, unordered_map<string, Texture*>* textureMap, GLenum opt_mode);
	Extent extents;

	void drawPrep(GenericConst& constUniforms);
	void drawPrep(SkyConst& constUniforms);
	void drawPrep(FishConst& fishConst);
	void drawPrep(InnerConst& innerConst);
	void draw(GenericPer& perUniforms);
	void draw(FishPer& fishPer);

private:

	void setBuffers(unordered_map<string, AttribBuffer*>* arrayMap);
	void setBuffer(const string& name, AttribBuffer* arr);
	void applyBufferMap();
	void applyTextureMap();
	void drawPositions();

	unordered_map<string, Buffer*> bufferMap;
	unordered_map<string, Texture*>* textureMap;
	Program* program;

	GLenum mode;

};

#endif
