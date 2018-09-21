#include "Model.h"
#include "Buffer.h"
#include "Globals.h"
#include "ASSERT.h"

Model::Model(Program* program_, unordered_map<string, AttribBuffer*>* arrayMap, unordered_map<string, Texture*>* textureMap, GLenum opt_mode) :
	textureMap(textureMap),
	program(program_)
{
	setBuffers(arrayMap);

	program->setTextureUnits(textureMap);

	mode = opt_mode == 0 ? GL_TRIANGLES : opt_mode;
}

Model::~Model()
{
	for (auto buffer : bufferMap)
	{
		delete buffer.second;
		buffer.second = nullptr;
	}
}

void Model::setBuffer(const string& name, AttribBuffer* attribbuffer)
{
	GLenum target = name == "indices" ? GL_ELEMENT_ARRAY_BUFFER : GL_ARRAY_BUFFER;

	if (bufferMap.find(name) == bufferMap.end()) {
		Buffer* b = new Buffer(attribbuffer, target);
		bufferMap.insert(make_pair(name, b));
	}
}

void Model::setBuffers(unordered_map<string, AttribBuffer*>* arrayMap)
{
	for (unordered_map<string, AttribBuffer*>::iterator iter = arrayMap->begin();
		iter != arrayMap->end(); ++iter)
	{
		setBuffer(iter->first, iter->second);
	}
}

void Model::applyBufferMap()
{
	GLuint mVAO;
	glGenVertexArrays(1, &mVAO);
	glBindVertexArray(mVAO);

	// Apply array buffer and element buffer
	for (auto& buffer : bufferMap)
	{
		if (buffer.first == "indices")
		{
			glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer.second->getBuffer());
		}
		else
		{
			glBindBuffer(GL_ARRAY_BUFFER, buffer.second->getBuffer());
			auto &attribLocs = program->getAttribLocs();
			if (attribLocs.find(buffer.first) == attribLocs.end())
			{
				continue;
			}
			program->setAttrib(buffer.second, buffer.first);
		}
	}
}

void Model::applyTextureMap()
{
	// Apply textures
	for (unordered_map<string, Texture*>::iterator it = textureMap->begin(); it != textureMap->end(); ++it)
	{
		program->setUniform(it->first, it->second);
	}
}

void Model::drawPrep(GenericConst& constUniforms)
{
	program->use();

	applyBufferMap();
	applyTextureMap();

	// Apply other uniforms
	program->setUniform("ambient", constUniforms.ambient);
	program->setUniform("fogColor", constUniforms.fogColor);
	program->setUniform("fogMult", constUniforms.fogMult);
	program->setUniform("fogOffset", constUniforms.fogOffset);
	program->setUniform("fogPower", constUniforms.fogPower);
	program->setUniform("lightColor", constUniforms.lightColor);
	program->setUniform("shininess", constUniforms.shininess);
	program->setUniform("specular", constUniforms.specular);
	program->setUniform("specularFactor", constUniforms.specularFactor);
	program->setUniform("lightWorldPos", constUniforms.lightWorldPos);
	program->setUniform("viewInverse", constUniforms.viewInverse);
	program->setUniform("viewProjection", constUniforms.viewProjection);
}

void Model::drawPrep(SkyConst& constUniforms)
{
	program->use();

	applyBufferMap();
	applyTextureMap();

	program->setUniform("viewProjectionInverse", constUniforms.viewProjectionInverse);
}

void Model::drawPrep(FishConst& fishConst)
{
	drawPrep(fishConst.genericConst);

	program->setUniform("fishBendAmount", fishConst.constUniforms.fishBendAmount);
	program->setUniform("fishLength", fishConst.constUniforms.fishLength);
	program->setUniform("fishWaveLength", fishConst.constUniforms.fishWaveLength);
}

void Model::drawPrep(InnerConst& innerConst)
{
	drawPrep(innerConst.genericConst);

	program->setUniform("eta", innerConst.eta);
	program->setUniform("refractionFudge", innerConst.refractionFudge);
	program->setUniform("tankColorFudge", innerConst.tankColorFudge);
}

void Model::drawPositions()
{
	int totalComponents = 0;

	if (bufferMap.find("indices") != bufferMap.end())
	{
		totalComponents = bufferMap["indices"]->getTotalComponents();
		GLenum type = bufferMap["indices"]->getType();
		glDrawElements(mode, totalComponents, type, 0);
	}
	else
	{
		totalComponents = bufferMap["positions"]->getNumElements();
		glDrawArrays(mode, 0, totalComponents);
	}
}

void Model::draw(GenericPer& perUniforms)
{
	program->setUniform("world",perUniforms.world);
	program->setUniform("worldInverse", perUniforms.worldInverse);
	program->setUniform("worldInverseTranspose", perUniforms.worldInverseTranspose);
	program->setUniform("worldViewProjection", perUniforms.worldViewProjection);

	drawPositions();
	ASSERT(glGetError() == GL_NO_ERROR);
}

void Model::draw(FishPer& fishPer)
{
	program->setUniform("worldPosition", &fishPer.worldPosition);
	program->setUniform("nextPosition", &fishPer.nextPosition);
	program->setUniform("scale", fishPer.scale);
	program->setUniform("time", fishPer.time);

	drawPositions();
	ASSERT(glGetError() == GL_NO_ERROR);
}
