#ifndef UNIFORM_H
#define UNIFORM_H

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <string>

using namespace std;

class Uniform
{
public:
	Uniform() {};
	Uniform(string& name, GLenum type, int length, int size, GLint index);

	string& getName() { return name; }
	GLenum getType() { return type; }
	GLsizei getLength() { return length; }
	GLsizei getSize() { return size; }
	GLint getIndex() { return index; }

private:
	string name;
	GLenum type;
	GLsizei length, size;
	GLint index;
};

#endif // UNIFORM_H

