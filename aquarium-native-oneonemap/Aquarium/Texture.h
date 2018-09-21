#ifndef TEXTURE_H
#define TEXTURE_H
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Texture
{
public:
	Texture() {}
	~Texture();
	Texture(string url, bool flip);
	Texture(vector<string>& urls);

	void createTexture(int width, int height, vector<float>& pixels, GLuint opt_texture);

	GLuint getTexture() { return texture; }
	GLenum getTarget() { return target; }
	void setTexture(GLuint texId) { texture = texId; }

private:
	vector<string> urls;
	GLenum target;
	GLuint texture;
	unordered_map<GLenum, GLint> params;
	int width;
	int height;
	bool flip;

	void setParameter(GLenum, GLint);
	void updateTexture();
	bool isPowerOf2(int);
	void loadImage();
};



#endif // !TEXTURE_H

