#include "Texture.h"
#include "SOIL.h"
#include "ASSERT.h"

// initializs texture 2d
Texture::Texture(string url, bool flip) : flip(flip)
{
	string urlpath = url;
	urls.push_back(urlpath);
	target = GL_TEXTURE_2D;	
	
    loadImage();
}

// initializs cube map
Texture::Texture(vector<string>& urls) : urls(urls)
{
	ASSERT(urls.size() == 6);
	target = GL_TEXTURE_CUBE_MAP;

	loadImage();
}

Texture::~Texture()
{
	glDeleteTextures(1, &texture);
}

// create texture from floats
void Texture::createTexture(int width, int height, vector<float>& pixels, GLuint opt_texture)
{
	if (opt_texture != 0u)
	{
		texture = opt_texture;
	}
	else {
		glGenTextures(1, &texture);
	}

	glBindTexture(GL_TEXTURE_2D, texture);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER,GL_LINEAR);

	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

	vector<GLubyte> data;
	for (auto v : pixels)
	{
		data.push_back(v * 255);
	}

	glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA8, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data.data());
    
	ASSERT(glGetError() == GL_NO_ERROR);
}


// Load images by SOIL. see http://www.lonesock.net/soil.html.
void Texture::loadImage()
{

	updateTexture();
}

void Texture::setParameter(GLenum pname, GLint param)
{
	params[pname] = param;
	
	glBindTexture(target, texture);
	glTexParameteri(target, pname, param);
}

bool Texture::isPowerOf2(int value)
{
	return (value & (value - 1)) == 0;
}

void Texture::updateTexture()
{
	glGenTextures(1, &texture);
	glBindTexture(target, texture);
	
	// create Texture2D
	if (target == GL_TEXTURE_2D) {
		glTexParameteri(target, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

		texture = SOIL_load_OGL_texture(urls[0].c_str(), SOIL_LOAD_RGBA, texture, SOIL_FLAG_INVERT_Y);   // vertically flip the texture
		ASSERT(glGetError() == GL_NO_ERROR);

		if (isPowerOf2(width) && isPowerOf2(height))
		{
			setParameter(GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
			glGenerateMipmap(target);
		}
		else
		{
			setParameter(GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
			setParameter(GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
			setParameter(GL_TEXTURE_MIN_FILTER, GL_LINEAR);
		}
	}
	// create TextureCubeMap
	else if (target == GL_TEXTURE_CUBE_MAP)
	{
		texture = SOIL_load_OGL_cubemap(urls[0].c_str(), urls[1].c_str(), urls[2].c_str(), urls[3].c_str(), urls[4].c_str(), urls[5].c_str(),
			SOIL_LOAD_RGBA, texture, 0);
		ASSERT(glGetError() == GL_NO_ERROR);

		setParameter(GL_TEXTURE_MAG_FILTER, GL_LINEAR);
		setParameter(GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
		setParameter(GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
	}
	ASSERT(glGetError() == GL_NO_ERROR);
}
