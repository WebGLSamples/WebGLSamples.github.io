#include "Primitives.h"

unordered_map<string, AttribBuffer*>* Primitives::createPlane(float width, float depth, float subdivisionsWidth, float subdivisionsDepth)
{
	if (subdivisionsWidth <= 0 || subdivisionsDepth <= 0) {
		printf("subdivisionWidth and subdivisionDepth must be > 0");
	}

	int numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
	AttribBuffer* positions = new AttribBuffer(3, numVertices, "Float32Array");
	AttribBuffer* normals = new AttribBuffer(3, numVertices, "Float32Array");
	AttribBuffer* texCoords = new AttribBuffer(2, numVertices, "Float32Array");
	
	for (int z = 0; z <= subdivisionsDepth; z++) {
		for (int x = 0; x <= subdivisionsWidth; x++) {
			float u = x / subdivisionsWidth;
			float v = z / subdivisionsDepth;
			vector<float> positionsVec = { (width * u - width * 0.5f),
			0,
			depth * v - depth * 0.5f };
			positions->pushBack(positionsVec);
			vector<float> normalsVec = { 0.0f, 1.0f, 0.0f };
			normals->pushBack(normalsVec);
			vector<float> texCoordsVec = { u, v };
			texCoords->pushBack(texCoordsVec);
		}
	}

	float numVertsAcross = subdivisionsWidth + 1;
	AttribBuffer* indices = new AttribBuffer(3, subdivisionsWidth * subdivisionsDepth * 2, "Uint16Array");

	for (int z = 0; z < subdivisionsDepth; z++) {
		for (int x = 0; x < subdivisionsWidth; x++) {
			// Make triangle 1 of quad.
			vector<float> indicesVec = {(z + 0) * numVertsAcross + x,
                                        (z + 1) * numVertsAcross + x,
                                        (z + 0) * numVertsAcross + x + 1};
			indices->pushBack(indicesVec);

			// Make triangle 2 of quad.
			indicesVec = { (z + 1) * numVertsAcross + x,
						  (z + 1) * numVertsAcross + x + 1,
						  (z + 0) * numVertsAcross + x + 1 };
			indices->pushBack(indicesVec);
		}
	}

	arrays["position"] = positions;
	arrays["normals"] = normals;
	arrays["texCoords"] = texCoords;
	arrays["indices"] = indices;

	return &arrays;
}

Primitives::~Primitives()
{
	for (auto& array : arrays)
	{
		if (array.second != nullptr)
		{
			delete array.second;
			array.second = nullptr;
		}
	}
}

vector<float> Primitives::transformPoint(vector<float>& m, vector<float>& v) {
	float v0 = v[0];
	float v1 = v[1];
	float v2 = v[2];
	float d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
	vector<float> vec = {
	(v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d,
	(v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d,
	(v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d
	};
	return vec;
};

void Primitives::reorient(vector<float>& matrix)
{
	AttribBuffer* position = arrays["position"];
	for (int ii = 0; ii < position->getNumElements(); ++ii) {
		vector<float> vec;
		position->getElement(ii, vec);
		position->setElement(ii, transformPoint(matrix, vec));
	}

	// TODO(yizhou) : reosient normal, tangent
}