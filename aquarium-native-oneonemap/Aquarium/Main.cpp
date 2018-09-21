#include <stdio.h>
#include <stdlib.h>

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#ifdef __APPLE__
#include <GLUT/glut.h>
#elif _WIN32 || __linux__
#include <GL/glut.h>
#endif
#include <vector>
#include <fstream>
#include <cmath>
#include <string>

#include "Globals.h"
#include "Program.h"
#include "Primitives.h"
#include "Model.h"
#include "Matrix.h"
#include "ASSERT.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/istreamwrapper.h"
#ifdef _WIN32
#include <direct.h>
#define getcwd _getcwd
#else
#include <unistd.h>
#endif
using namespace std;
using namespace rapidjson;

void render();

GLuint programID;
GLuint pointsBuffer;
int clientWidth;
int clientHeight;
Model* skyBox;
Primitives* primitives;
GLuint fbo;
GLuint fbo2;
static int fboWidth = 1024;
static int fboHeight = 1024;
GLuint tex, depthstencilbuf, tex2, depthstencilbuf2;
Program *mProgram;
GLuint buf;
GLuint vao;
GLFWwindow *window;
// ParticleSystem particleSystem;

void setGenericConstMatrix(GenericConst& genericConst) {
	genericConst.viewProjection = &g_viewProjection;
	genericConst.viewInverse = &g_viewInverse;
	genericConst.lightWorldPos = &g_lightWorldPos;
	genericConst.lightColor = &g_lightColor;
	genericConst.specular = &g_specular;
	genericConst.ambient = &g_ambient;
	genericConst.fogColor = &g_fogColor;
}

void setGenericPer(GenericPer& genericPer)
{
	genericPer.world = &g_world;
	genericPer.worldViewProjection = &g_worldViewProjection;
	genericPer.worldInverse = &g_worldInverse;
	genericPer.worldInverseTranspose = &g_worldInverseTraspose;
}

void initializeUniforms() {
	sandConst.shininess = sand_shininess;
	sandConst.specularFactor = sand_specularFactor;

	genericConst.shininess = generic_shininess;
	genericConst.specularFactor = generic_specularFactor;

	outsideConst.shininess = outside_shininess;
	outsideConst.specularFactor = outside_shininess;

	seaweedConst.shininess = seaweed_shininess;
	seaweedConst.specularFactor = seaweed_specularFactor;

	innerConst.genericConst.shininess = inner_shininess;
	innerConst.genericConst.specularFactor = inner_specularFactor;
	innerConst.eta = g_viewSettings.eta;
	innerConst.refractionFudge = g_viewSettings.refractionFudge;
	innerConst.tankColorFudge = g_viewSettings.tankColorFudge;

	fishConst.genericConst.shininess = fish_shininess;
	fishConst.genericConst.specularFactor = fish_specularFactor;

	setGenericConstMatrix(sandConst);
	setGenericConstMatrix(genericConst);
	setGenericConstMatrix(seaweedConst);
	setGenericConstMatrix(innerConst.genericConst);
	setGenericConstMatrix(outsideConst);
	setGenericConstMatrix(fishConst.genericConst);
	setGenericPer(sandPer);
	setGenericPer(genericPer);
	setGenericPer(seaweedPer);
	setGenericPer(innerPer);
	setGenericPer(outsidePer);
	setGenericPer(laserPer);

	skyConst.viewProjectionInverse = &g_viewProjectionInverse;

        fishPer.worldPosition.resize(3);
        fishPer.nextPosition.resize(3);

	lightRayPer.worldViewProjection = &g_worldViewProjection;
}

void initializeGlobalInfo()
{
	for (auto& value : g_ui)
	{
		g[value.obj][value.name] = value.value;
	}

}

// Load json file from assets.Initialize g_sceneGroups and classify groups.
void LoadPlacement()
{
	string proppath = path + "OpenGL" + slash + "Aquarium" + slash + "assets" + slash + "PropPlacement.js";
	ifstream PlacementStream(proppath, ios::in);
	IStreamWrapper isPlacement(PlacementStream);
	Document document;
	document.ParseStream(isPlacement);

	ASSERT(document.IsObject());

	ASSERT(document.HasMember("objects"));
	const Value& objects = document["objects"];
	ASSERT(objects.IsArray());

	for (auto &info : g_sceneInfo)
	{
		g_sceneInfoByName[info.name] = info;
	}

	for (SizeType i = 0; i < objects.Size(); ++i) {
		const Value& name = objects[i]["name"];
		const Value& worldMatrix = objects[i]["worldMatrix"];
		ASSERT(worldMatrix.IsArray() && worldMatrix.Size() == 16);

		string groupName = g_sceneInfoByName[name.GetString()].group;
		if (groupName == "")
		{
			groupName = "base";
		}

		multimap<string, vector<float>> &group = g_sceneGroups[groupName];

		vector<float> matrix;
		for (SizeType j = 0; j < worldMatrix.Size(); ++j) {
			matrix.push_back(worldMatrix[j].GetFloat());
		}
		group.insert(make_pair(name.GetString(), matrix));
	}
}

Scene* loadScene(string &name, string* opt_programIds, bool fog)
{
	Scene* scene = new Scene(opt_programIds, fog);
	string scenepath = path + "OpenGL" + slash + "Aquarium" + slash + "assets" + slash + name + ".js";
	scene->load(scenepath);
	return scene;
}

// Initialize g_scenes.
void LoadScenes()
{
	for (auto &info : g_sceneInfo)
	{
		g_scenes[info.name] = loadScene(info.name, info.program, info.fog);
	}
}

void onDestory()
{
	delete skyBox;
	delete primitives;

	for (auto& program : g_programMap)
	{
		if (program.second != nullptr) {
			delete program.second;
			program.second = nullptr;
		}
	}

	for (auto & texture : g_textureMap)
	{
		if (texture.second != nullptr) {
			delete texture.second;
			texture.second = nullptr;
		}
	}

	for (auto& scene : g_scenes)
	{
		delete scene.second;
	}

    delete mProgram;
}

void setupSkybox(Model* skyBox)
{
	unordered_map<string, Texture*> textureMap;
	Texture *texture;
	if (g_textureMap.find("skybox") != g_textureMap.end()) {
		textureMap["skybox"] = g_textureMap["skybox"];
	}
	else
	{
		texture = new Texture(g_skyBoxUrls);
		g_textureMap["skybox"] = texture;
	}

	string skyBoxVertex = "skyboxVertexShader";
	string skyBoxFragment = "skyboxFragmentShader";

	Program* program;
	if (g_programMap.find(skyBoxVertex + skyBoxFragment) != g_programMap.end())
	{
		program = g_programMap[skyBoxVertex + skyBoxFragment];
	}
	else
	{
                string programPath = path + "OpenGL" + slash + "Aquarium" + slash + "shaders" + slash;
		program = new Program(programPath + skyBoxVertex, programPath + skyBoxFragment);
		g_programMap[skyBoxVertex + skyBoxFragment] = program;
	}

	primitives = new Primitives();
	unordered_map<string, AttribBuffer*>* arrays = primitives->createPlane(2, 2, 1, 1);
	arrays->erase("normals");
	arrays->erase("texCoords");
	vector<float> orientVec = { 1.0f, 0.0f, 0.0f, 0.0f,
		0.0f, 0.0f, 1.0f, 0.0f,
		0.0f, -1.0f, 0.0f, 0.0f,
		0.0f, 0.0f, 0.99f, 1.0f };
	primitives->reorient(orientVec);
	skyBox = new Model(program, arrays, &textureMap, 0);
}

void updateUrls()
{
    // Get path of current build
    char temp[100];
    getcwd(temp, 100);
    path = string(temp);
    std::size_t found = path.find("otc_share-aquarium");
    path = path.substr(0, found + 19);

    for (auto& v : g_skyBoxUrls)
	{
		v = path + "OpenGL" + slash + "Aquarium" + slash + "assets" + slash + v;
	}

	g_bubbleUrls = path + g_bubbleUrls;
}

// TODO(yizhou) : Load resources in multi thread mode.
void initialize(int argc, char** argv)
{
	updateUrls();

	glEnable(GL_DEPTH_TEST);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	initializeGlobalInfo();
	initializeUniforms();
	LoadPlacement();

	setupSkybox(skyBox);
	LoadScenes();

    #ifdef __APPLE__
	glGenFramebuffers(1, &fbo);
	glBindFramebuffer(GL_FRAMEBUFFER, fbo);

	glGenRenderbuffers(1, &tex);
	glBindRenderbuffer(GL_RENDERBUFFER, tex);
	glRenderbufferStorageMultisample(GL_RENDERBUFFER,, GL_RGBA8, fboWidth, fboHeight);

	glGenRenderbuffers(1, &depthstencilbuf);
	glBindRenderbuffer(GL_RENDERBUFFER, depthstencilbuf);
	glRenderbufferStorageMultisample(GL_RENDERBUFFER, 4, GL_DEPTH_COMPONENT16, fboWidth, fboHeight);

	glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, tex);
	glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, depthstencilbuf);

	ASSERT(glGetError() == GL_NO_ERROR);
	ASSERT(glCheckFramebufferStatus(GL_FRAMEBUFFER) == GL_FRAMEBUFFER_COMPLETE);

    glGenFramebuffers(1, &fbo2);
    glBindFramebuffer(GL_FRAMEBUFFER, fbo2);

    glGenTextures(1, &tex2);
    glBindTexture(GL_TEXTURE_2D, tex2);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA8, fboWidth, fboHeight, 0, GL_RGBA, GL_UNSIGNED_BYTE, nullptr);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

    glGenRenderbuffers(1, &depthstencilbuf2);
    glBindRenderbuffer(GL_RENDERBUFFER, depthstencilbuf2);
    glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH_COMPONENT16, fboWidth, fboHeight);

    glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, tex2, 0);
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, depthstencilbuf2);

    ASSERT(glGetError() == GL_NO_ERROR);
    ASSERT(glCheckFramebufferStatus(GL_FRAMEBUFFER) == GL_FRAMEBUFFER_COMPLETE);
	glBindRenderbuffer(GL_RENDERBUFFER, 0);
	glBindFramebuffer(GL_FRAMEBUFFER, 0);

    string vertexShader = path + "OpenGL" + slash + "Aquarium" + slash + "shaders" + slash + "VertexShader";
    string fragmentShader =path + "OpenGL" + slash + "Aquarium" + slash + "shaders" + slash + "FragmentShader";
    mProgram = new Program( vertexShader, fragmentShader);
    ASSERT(mProgram->getProgramId() != -1);
    #endif

	for (int i = 1; i < argc; ++i) {
		string cmd(argv[i]);
		if(cmd == "--fishIndex"){
			g_fishSetting = atoi(argv[i + 1]);
		}
	}

	// Calculate fish count for each float of fish
	string floats[3] = { "Big", "Medium", "Small" };
	for (auto& totalFish : g_numFish)
	{
		int numLeft = totalFish;
		for (auto& type : floats)
		{
			for (auto& fishInfo : g_fishTable)
			{
				string& fishName = fishInfo.name;
				if (fishName.find(type))
				{
					continue;
				}
				int numfloat = numLeft;
				if (type == "Big")
				{
					int temp = totalFish < numFishSmall ? 1 : 2;
					numfloat = numLeft < temp ? numLeft : temp;
				}
				else if (type == "Medium")
				{
					if (totalFish < numFishMedium)
					{
						numfloat = numLeft < (totalFish / 10) ? numLeft : ((totalFish / 10));
					}
					else if (totalFish < numFishBig)
					{
						numfloat = numLeft < numFishLeftSmall ? numLeft : numFishLeftSmall;
					}
					else
					{
						numfloat = numLeft < numFishLeftBig ? numLeft : numFishLeftBig;
					}
				}
				numLeft = numLeft - numfloat;
				fishInfo.num.push_back(numfloat);
			}
		}
	}

}

int main(int argc, char **argv) {
	//initialise GLFW
	if (!glfwInit()) {
		fprintf(stderr, "Failed to initialise GLFW\n");
		return -1;
	}

    #ifdef __APPLE__
	glfwWindowHint(GLFW_SAMPLES, 0);
    #elif _WIN32 || __linux__
	glfwWindowHint(GLFW_SAMPLES, 4);
    #endif

#ifdef __APPLE__
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
#elif _WIN32 || __linux__
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 5);
	glfwWindowHint(GLFW_OPENGL_PROFILE, 0);
#endif
    
	glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

	GLFWmonitor* pMonitor = isFullScreen ? glfwGetPrimaryMonitor() : NULL;
	const GLFWvidmode * mode = glfwGetVideoMode(pMonitor);
	clientWidth = mode->width;
	clientHeight = mode->height;

	window = glfwCreateWindow(clientWidth, clientHeight, "Aquarium", NULL, NULL);
	if (window == NULL) {
		fprintf(stderr, "Failed to open GLFW window. \n");
		glfwTerminate();
		return -1;
	}
	glfwWindowHint(GLFW_DECORATED, GL_FALSE);
	glfwMakeContextCurrent(window);
	//glfwSetWindowPos(window, 0, 0);

	//initialize GLEW
	glewExperimental = true;		// Needed for core profile
	if (glewInit() != GLEW_OK) {
		fprintf(stderr, "Failed to initialize GLEW\n");
		return -1;
	}

	const char* renderer = (const char *)glGetString(GL_RENDERER);
	printf("%s\n", renderer);

	initialize(argc, argv);
    
    glfwGetFramebufferSize(window, &clientWidth, &clientHeight);          // Get the resolution of screen
    #ifdef __APPLE__
	glViewport(0, 0, fboWidth, fboHeight);
    #else
	glViewport(0, 0, clientWidth, clientHeight);
    #endif

	while (!glfwWindowShouldClose(window))
	{
		if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
			glfwSetWindowShouldClose(window, GL_TRUE);

		render();

		glfwSwapBuffers(window);
		glfwPollEvents();
	}

	glfwTerminate();

	onDestory();

	return 0;
}

float degToRad(float degrees)
{
	return static_cast<float>(degrees * M_PI / 180.0);
}

// TODO(yizhou) : refactor DrawGroup
void DrawGroup(multimap<string, vector<float>>& group, GenericConst& constUniforms, GenericPer& perUniforms)
{
	Model* currentModel = nullptr;
	int ii = 0;
	for (auto& object : group)
	{
		if (g_scenes.find(object.first) == g_scenes.end())
		{
			printf("missing scene: %s", object.first.c_str());
			continue;
		}
		auto& scene = g_scenes[object.first];
		auto& info = g_sceneInfoByName[object.first];

		if (info.blend)
		{
			glEnable(GL_BLEND);
		}
		else
		{
			glDisable(GL_BLEND);
		}

		auto& models = scene->getModels();
		for (auto& model : models)
		{
			if (model != currentModel)
			{
				currentModel = model;
				model->drawPrep(constUniforms);
			}

			g_world = vector<float>(object.second.begin(), object.second.end());
			matrix::mulMatrixMatrix4(g_worldViewProjection, g_world, g_viewProjection);
			matrix::inverse4(g_worldInverse, g_world);
			matrix::transpose4(g_worldInverseTraspose, g_worldInverse);
			perUniforms.time = g_clock + (ii++);
			model->draw(perUniforms);
		}
	}
}

void DrawGroup(multimap<string, vector<float>>& group, InnerConst& innerConst, GenericPer& perUniforms)
{
	Model* currentModel = nullptr;
	int ii = 0;
	for (auto& object : group)
	{
		if (g_scenes.find(object.first) == g_scenes.end())
		{
			printf("missing scene: %s", object.first.c_str());
			continue;
		}
		auto& scene = g_scenes[object.first];
		auto& info = g_sceneInfoByName[object.first];

		if (info.blend)
		{
			glEnable(GL_BLEND);
		}
		else
		{
			glDisable(GL_BLEND);
		}

		auto& models = scene->getModels();
		for (auto& model : models)
		{
			if (model != currentModel)
			{
				currentModel = model;
				model->drawPrep(innerConst);
			}

			g_world = vector<float>(object.second.begin(), object.second.end());
			matrix::mulMatrixMatrix4(g_worldViewProjection, g_world, g_viewProjection);
			matrix::inverse4(g_worldInverse, g_world);
			matrix::transpose4(g_worldInverseTraspose, g_worldInverse);
			perUniforms.time = g_clock + (ii++);
			model->draw(perUniforms);
		}
	}
}

void render() {
	// Update our time
        #ifdef _WIN32
	float now = GetTickCount64() / 1000.0f;
        #else
        float now = clock() / 1000000.0f;
        #endif
	float elapsedTime = 0.0f;
	if (g_then == 0.0f) {
		elapsedTime = 0.0f;
	}
	else
	{
		elapsedTime = now - g_then;
	}
	g_then = now;

	// TODO(yizhou) : fps
	g_fpsTimer.update(elapsedTime);
	printf("FPS: %f\n, InstantFPS: %f\n", g_fpsTimer.getAverageFPS(), g_fpsTimer.getInstantaneousFPS());
	string text = "Aquarium FPS: " + to_string(static_cast<unsigned int>(g_fpsTimer.getAverageFPS()));
	glfwSetWindowTitle(window, text.c_str());

	g_clock += elapsedTime * g_speed;
	g_eyeClock += elapsedTime * g_viewSettings.eyeSpeed;

	g_eyePosition[0] = sin(g_eyeClock) * g_viewSettings.eyeRadius;
	g_eyePosition[1] = g_viewSettings.eyeHeight;
	g_eyePosition[2] = cos(g_eyeClock) * g_viewSettings.eyeRadius;
	g_target[0] = static_cast<float>(sin(g_eyeClock + M_PI)) * g_viewSettings.targetRadius;
	g_target[1] = g_viewSettings.targetHeight;
	g_target[2] = static_cast<float>(cos(g_eyeClock + M_PI)) * g_viewSettings.targetRadius;

	g_ambient[0] = g_viewSettings.ambientRed;
	g_ambient[1] = g_viewSettings.ambientGreen;
	g_ambient[2] = g_viewSettings.ambientBlue;

    #ifdef __APPLE__
    glBindFramebuffer(GL_FRAMEBUFFER, fbo);
    glViewport(0, 0, fboWidth, fboHeight);
    #endif

    glColorMask(true, true, true, true);
	glClearColor(0, 0.8f, 1, 0);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);

	float nearPlane = 1;
	float farPlane = 25000.0f;
	float aspect = static_cast<float>(clientWidth) / static_cast<float>(clientHeight);
	float top = tan(degToRad(g_viewSettings.fieldOfView * g_fovFudge) * 0.5f) * nearPlane;
	float bottom = -top;
	float left = aspect * bottom;
	float right = aspect * top;
	float width = abs(right - left);
	float height = abs(top - bottom);
	float xOff = width * g_net_offset[0] * g_net_offsetMult;
	float yOff = height * g_net_offset[1] * g_net_offsetMult;

	// TODO(yizhou) : set frustm and camera look at
	matrix::frustum(g_projection, left + xOff, right + xOff, 
		bottom + yOff, top + yOff,nearPlane, farPlane);
	matrix::cameraLookAt(g_viewInverse, g_eyePosition, g_target, g_up);
	matrix::inverse4(g_view, g_viewInverse);
	matrix::mulMatrixMatrix4(g_viewProjection, g_view, g_projection);
	matrix::inverse4(g_viewProjectionInverse, g_viewProjection);

	g_skyView = g_view;
	g_skyView[12] = 0.0;
	g_skyView[13] = 0.0;
	g_skyView[14] = 0.0;
	matrix::mulMatrixMatrix4(g_skyViewProjection, g_skyView, g_projection);
	matrix::inverse4(g_skyViewProjectionInverse, g_skyViewProjection);

	matrix::getAxis(g_v3t0, g_viewInverse, 0);
	matrix::getAxis(g_v3t1, g_viewInverse, 1);
	matrix::mulScalarVector(20.0f, g_v3t0);
	matrix::mulScalarVector(30.0f, g_v3t1);
	matrix::addVector(g_lightWorldPos, g_eyePosition, g_v3t0);
	matrix::addVector(g_lightWorldPos, g_lightWorldPos, g_v3t1);

	// Environment set up
	// Disable blending, enable cull face, enable depth buffer
	glDisable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
	glBlendEquation(GL_FUNC_ADD);
	glEnable(GL_CULL_FACE);

	matrix::resetPseudoRandom();

	glDepthMask(true);

	if (g_fog)
	{
		genericConst.fogPower = g_viewSettings.fogPower;
		genericConst.fogMult = g_viewSettings.fogMult;
		genericConst.fogOffset = g_viewSettings.fogOffset;
		fishConst.genericConst.fogPower = g_viewSettings.fogPower;
		fishConst.genericConst.fogMult = g_viewSettings.fogMult;
		fishConst.genericConst.fogOffset = g_viewSettings.fogOffset;
		innerConst.genericConst.fogPower = g_viewSettings.fogPower;
		innerConst.genericConst.fogMult = g_viewSettings.fogMult;
		innerConst.genericConst.fogOffset = g_viewSettings.fogOffset;
		seaweedConst.fogPower = g_viewSettings.fogPower;
		seaweedConst.fogMult = g_viewSettings.fogMult;
		seaweedConst.fogOffset = g_viewSettings.fogOffset;
		g_fogColor[0] = g_viewSettings.fogRed;
		g_fogColor[1] = g_viewSettings.fogGreen;
		g_fogColor[2] = g_viewSettings.fogBlue;
	}

	// Draw Scene
	if (g_sceneGroups.find("base") != g_sceneGroups.end())
	{
		DrawGroup(g_sceneGroups["base"], genericConst, genericPer);
	}

	// Draw Fishes
	glEnable(GL_BLEND);
	for (auto& fishInfo : g_fishTable)
	{
		string& fishName = fishInfo.name;
		int numFish = fishInfo.num[g_fishSetting];

		Scene* scene = g_scenes[fishName];
		if (scene->loaded)
		{
			Model* fish = scene->getModels()[0];
			auto& f = g["fish"];
			fishConst.constUniforms = fishInfo.constUniforms;
			fish->drawPrep(fishConst);
			float fishBaseClock = g_clock * f["fishSpeed"];
			float fishRadius = fishInfo.radius;
			float fishRadiusRange = fishInfo.radiusRange;
			float fishSpeed = fishInfo.speed;
			float fishSpeedRange = fishInfo.speedRange;
			float fishTailSpeed = fishInfo.tailSpeed * f["fishTailSpeed"];
			float fishOffset = f["fishOffset"];
			float fishClockSpeed = f["fishSpeed"];
			float fishHeight = f["fishHeight"] + fishInfo.heightOffset;
			float fishHeightRange = f["fishHeightRange"] * fishInfo.heightRange;
			float fishXClock = f["fishXClock"];
			float fishYClock = f["fishYClock"];
			float fishZClock = f["fishZClock"];
			vector<float>& fishPosition = fishPer.worldPosition;
                        vector<float>& fishNextPosition = fishPer.nextPosition;
			for (int ii = 0; ii < numFish; ++ii)
			{
				float fishClock = fishBaseClock + ii * fishOffset;
				float speed = fishSpeed + static_cast<float>(matrix::pseudoRandom()) * fishSpeedRange;
				float scale = 1.0f + static_cast<float>(matrix::pseudoRandom()) * 1;
				float xRadius = fishRadius + static_cast<float>(matrix::pseudoRandom()) * fishRadiusRange;
				float yRadius = 2.0f + static_cast<float>(matrix::pseudoRandom()) * fishHeightRange;
				float zRadius = fishRadius + static_cast<float>(matrix::pseudoRandom()) * fishRadiusRange;
				float fishSpeedClock = fishClock * speed;
				float xClock = fishSpeedClock * fishXClock;
				float yClock = fishSpeedClock * fishYClock;
				float zClock = fishSpeedClock * fishZClock;

				fishPosition[0] = sin(xClock) * xRadius;
				fishPosition[1] = sin(yClock) * yRadius + fishHeight;
				fishPosition[2] = cos(zClock) * zRadius;
				fishNextPosition[0] = sin(xClock - 0.04f) * xRadius;
				fishNextPosition[1] = sin(yClock - 0.01f) * yRadius + fishHeight;
				fishNextPosition[2] = cos(zClock - 0.04f) * zRadius;
				fishPer.scale = scale;

				fishPer.time = fmod((g_clock + ii * g_tailOffsetMult) * fishTailSpeed * speed, static_cast<float>(M_PI) * 2);
				fish->draw(fishPer);
			}
		}
	}

	// Draw tank
	if (g_sceneGroups.find("inner") != g_sceneGroups.end()) {
		DrawGroup(g_sceneGroups["inner"], innerConst, innerPer);
	}

	//Draw seaweed
	if (g_sceneGroups.find("seaweed") != g_sceneGroups.end()) {
		DrawGroup(g_sceneGroups["seaweed"], seaweedConst, seaweedPer);
	}

	// TODO(yizhou) : Draw lasers

	// Draw outside
	if (g_sceneGroups.find("outside") != g_sceneGroups.end()) {
		DrawGroup(g_sceneGroups["outside"], outsideConst, outsidePer);
	}

    #ifdef __APPLE__

    ASSERT(glGetError() == GL_NO_ERROR);
	glBindFramebuffer(GL_READ_FRAMEBUFFER, fbo);
	glBindFramebuffer(GL_DRAW_FRAMEBUFFER, fbo2);
	glBlitFramebuffer(0, 0, fboWidth, fboHeight, 0, 0, fboWidth, fboHeight, GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT, GL_NEAREST);
	ASSERT(glGetError() == GL_NO_ERROR);
    glBindFramebuffer(GL_READ_FRAMEBUFFER, fbo2);
    glBindFramebuffer(GL_DRAW_FRAMEBUFFER, 0);
    glBlitFramebuffer(0, 0, fboWidth, fboHeight, 0, 0, clientWidth, clientHeight, GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT, GL_NEAREST);
    ASSERT(glGetError() == GL_NO_ERROR);
    #endif
}
