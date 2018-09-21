#ifndef GLOBALS_H
#define GLOBALS_H

#include <map>
#include <unordered_map>
#include <vector>
#include "Scene.h"
#include "FPSTimer.h"
#include <cmath>
#include <string>

using namespace std;

#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
static const std::string slash="\\";
#define M_PI 3.141592653589793
#else
static const std::string slash="/";
#endif

class Scene;

static string path;
constexpr bool isFullScreen = true;
static FPSTimer g_fpsTimer;           // object to measure frames per second;
static unordered_map<string, Scene*> g_scenes; // each of the models
static unordered_map<string, multimap<string, vector<float>>> g_sceneGroups; // the placement of the models
static unordered_map<string, Program*> g_programMap; // store all compiled program in this map
static unordered_map<string, Texture*> g_textureMap; // store all loaded textures in this map
constexpr bool g_fog = true;
constexpr float g_tailOffsetMult = 1.0f;
constexpr float g_endOfDome = static_cast<float>(M_PI / 8);
constexpr float g_tankRadius = 74.0f;
constexpr float g_tankHeight = 36.0f;
constexpr float g_standHeight = 25.0f;
constexpr float g_sharkSpeed = 0.3f;
constexpr float g_sharkClockOffset = 17.0f;
constexpr float g_sharkXClock = 1.0f;
constexpr float g_sharkYClock = 0.17f;
constexpr float g_sharkZClock = 1.0f;
constexpr int g_numBubbleSets = 10;
constexpr float g_laserEta = 1.2f;
constexpr float g_laserLenFudge = 1.0f;
constexpr int g_numLightRays = 5;
constexpr int g_lightRayY = 50;
constexpr int g_lightRayDurationMin = 1;
constexpr int g_lightRayDurationRange = 1;
constexpr int g_lightRaySpeed = 4;
constexpr int g_lightRaySpread = 7;
constexpr int g_lightRayPosRange = 20;
constexpr float g_lightRayRotRange = 1.0f;
constexpr float g_lightRayRotLerp = 0.2f;
constexpr float g_lightRayOffset = static_cast<float>(M_PI * 2 / static_cast<float>(g_numLightRays));

static float g_then = 0.0f;
static float g_clock = 0.0f;
static float g_eyeClock = 0.0f;
static float g_speed = 1.0f;

constexpr float g_bubbleTimer = 0.0f;
constexpr int g_bubbleIndex = 0;

constexpr int g_numFish[] = { 1, 100, 500, 1000, 5000, 10000, 15000, 20000, 25000, 30000, 50000, 100000 };
static int g_fishSetting = 9;     // fish setting index

constexpr int numFishSmall = 100;
constexpr int numFishMedium = 1000;
constexpr int numFishBig = 10000;
constexpr int numFishLeftSmall = 80;
constexpr int numFishLeftBig = 160;
constexpr float sand_shininess = 5.0f;
constexpr float sand_specularFactor = 0.3f;
constexpr float generic_shininess = 50.0f;
constexpr float generic_specularFactor = 1.0f;
constexpr float outside_shininess = 50.0f;
constexpr float outside_specularFactor = 0.0f;
constexpr float seaweed_shininess = 50.0f;
constexpr float seaweed_specularFactor = 1.0f;
constexpr float inner_shininess = 50.0f;
constexpr float inner_specularFactor = 1.0f;
constexpr float fish_shininess = 5.0f;
constexpr float fish_specularFactor = 0.3f;

struct G_ui_per
{
	string obj;
	string name;
	float value;
	float max;
	float min;
};

static G_ui_per g_ui[] = { { "globals", "speed", 1.0f, 4.0f },
{ "globals", "targetHeight", 0.0f, 150.0f },
{ "globals", "targetRadius", 88.0f, 200.0f },
{ "globals", "eyeHeight", 19.0f, 150.0f },
{ "globals", "eyeSpeed", 0.06f,  1.0f },
{ "globals", "fieldOfView", 85.0f, 179.0f, 1.0f },
{ "globals", "ambientRed", 0.22f, 1.0f },
{ "globals", "ambientGreen", 0.25f, 1.0f },
{ "globals", "ambientBlue", 0.39f, 1.0f },
{ "globals", "fogPower", 14.5f, 50.0f },
{ "globals", "fogMult", 1.66f, 10.0f },
{ "globals", "fogOffset", 0.53f, 3.0f },
{ "globals", "fogRed", 0.54f, 1.0f },
{ "globals", "fogGreen", 0.86f, 1.0f },
{ "globals", "fogBlue", 1.0f, 1.0f },
{ "fish", "fishHeightRange", 1.0f, 3.0f },
{ "fish", "fishHeight", 25.0f, 50.0f },
{ "fish", "fishSpeed", 0.124f, 2.0f },
{ "fish", "fishOffset", 0.52f, 2.0f },
{ "fish", "fishXClock", 1.0f, 2.0f },
{ "fish", "fishYClock", 0.556f, 2.0f },
{ "fish", "fishZClock", 1.0f, 2.0f },
{ "fish", "fishTailSpeed", 1.0f, 30.0f },
{ "innerConst", "refractionFudge", 3.0f, 50.0f },
{ "innerConst", "eta", 1.0f, 1.20f },
{ "innerConst", "tankColorFudge", 0.8f, 2.0f }
};

static map<string, map<string, float>> g;            // set min value as initialize value

constexpr float g_fovFudge = 1.0f;
constexpr float g_net_offset[3] = { 0.0f, 0.0f, 0.0f };
constexpr float g_net_offsetMult = 1.21f;

struct G_viewSettings {
	float targetHeight = 63.3f;
	float targetRadius = 91.6f;
	float eyeHeight = 7.5f;
	float eyeRadius = 13.2f;
	float eyeSpeed = 0.0258f;
	float fieldOfView = 82.699f;
	float ambientRed = 0.218f;
	float ambientGreen = 0.502f;
	float ambientBlue = 0.706f;
	float fogPower = 16.5f;
	float fogMult = 1.5f; //2.02,
	float fogOffset = 0.738f;
	float fogRed = 0.338f;
	float fogGreen = 0.81f;
	float fogBlue = 1.0f;
	float refractionFudge = 3.0f;
	float eta = 1.0f;
	float tankColorFudge = 0.796f;
}constexpr g_viewSettings;

static vector<float> g_projection(16);
static vector<float> g_view(16);
static vector<float> g_world(16);
static vector<float> g_worldInverse(16);
static vector<float> g_worldInverseTraspose(16);
static vector<float> g_viewProjection(16);
static vector<float> g_worldViewProjection(16);
static vector<float> g_viewInverse(16);
static vector<float> g_viewProjectionInverse(16);
static vector<float> g_skyView(16);
static vector<float> g_skyViewProjection(16);
static vector<float> g_skyViewProjectionInverse(16);
static vector<float> g_eyePosition(3);
static vector<float> g_target(3);
static vector<float> g_up = { 0, 1, 0 };
static vector<float> g_lightWorldPos(3);
static vector<float> g_v3t0(3);
static vector<float> g_v3t1(3);
static vector<float> g_m4t0(16);
static vector<float> g_m4t1(16);
static vector<float> g_m4t2(16);
static vector<float> g_m4t3(16);
static vector<float> g_colorMult = { 1, 1, 1, 1 };
static vector<float> g_lightColor = { 1.0f, 1.0f, 1.0f, 1.0f };
static vector<float> g_specular = { 1.0f, 1.0f, 1.0f, 1.0f };
static vector<float> g_ambient(4);
static vector<float> g_fogColor = { 1.0f, 1.0f, 1.0f, 1.0f };

//Generic uniforms
typedef struct GenericConst_
{
	vector<float>* viewProjection;
	vector<float>* viewInverse;
	vector<float>* lightWorldPos;
	vector<float>* lightColor;
	vector<float>* specular;
	vector<float>* ambient;
	vector<float>* fogColor;
	float shininess;
	float specularFactor;
	float fogPower;
	float fogMult;
	float fogOffset;
}GenericConst;
static GenericConst sandConst, genericConst, seaweedConst, outsideConst;

typedef struct GenericPer_
{
	vector<float>* world;
	vector<float>* worldViewProjection;
	vector<float>* worldInverse;
	vector<float>* worldInverseTranspose;
	float time;
}GenericPer;

static GenericPer sandPer, genericPer, seaweedPer, outsidePer, innerPer, laserPer, skyPer;

typedef struct InnerConst_
{
	GenericConst genericConst;
	float eta;
	float tankColorFudge;
	float refractionFudge;
}InnerConst;

static InnerConst innerConst;

typedef struct SkyConst_
{
	vector<float>* viewProjectionInverse;
}SkyConst;

static SkyConst skyConst;

typedef struct FishPer_
{
	vector<float> worldPosition;
	vector<float> nextPosition;
	float scale;
	float time;
}FishPer;

static FishPer fishPer;

struct LightRayPer
{
	vector<float>* worldViewProjection;
	vector<float> colorMult = { 1, 1, 1, 1 };
};
static LightRayPer lightRayPer;

struct G_sceneInfo
{
	string name;
	string program[2];
	bool fog;
	string group;
	bool blend;
};
static map<string, G_sceneInfo> g_sceneInfoByName;

static G_sceneInfo g_sceneInfo[] = { { "SmallFishA", {"fishVertexShader", "fishReflectionFragmentShader"}, true },
    { "MediumFishA", {"fishVertexShader", "fishNormalMapFragmentShader"}, true },
    { "MediumFishB", {"fishVertexShader", "fishReflectionFragmentShader"}, true },
    { "BigFishA", {"fishVertexShader", "fishNormalMapFragmentShader"}, true },
    { "BigFishB", {"fishVertexShader", "fishNormalMapFragmentShader"}, true },
    { "Arch", {"", ""}, true },
    { "Coral", {"", ""}, true },
    { "CoralStoneA", {"", ""}, true },
    { "CoralStoneB", {"", ""}, true },
    { "EnvironmentBox", {"diffuseVertexShader", "diffuseFragmentShader"}, false, "outside" },
    { "FloorBase_Baked", {"", ""}, true },
    { "FloorCenter", {"", ""}, true },
    { "GlobeBase", {"diffuseVertexShader", "diffuseFragmentShader"} },
    { "GlobeInner", {"innerRefractionMapVertexShader", "innerRefractionMapFragmentShader"}, true, "inner" },
    { "GlobeOuter", {"outerRefractionMapVertexShader", "outerRefractionMapFragmentShader"}, false, "outer", false },
    { "RockA", {"", ""}, true },
    { "RockB", {"", ""}, true },
    { "RockC", {"", ""}, true },
    { "RuinColumn", {"", ""}, true },
    { "Skybox", {"diffuseVertexShader", "diffuseFragmentShader"}, false, "outside" },
    { "Stone", {"", ""}, true },
    { "Stones", {"", ""}, true },
    { "SunknShip", {"", ""}, true },
    { "SunknSub", {"", ""}, true },
    { "SupportBeams", {"", ""}, false, "outside" },
    { "SeaweedA", {"seaweedVertexShader", "seaweedFragmentShader"}, false, "seaweed", true },
    { "SeaweedB", {"seaweedVertexShader", "seaweedFragmentShader"}, false, "seaweed", true },
    { "TreasureChest", {"", ""}, true } };

static vector<string> g_skyBoxUrls = {
	"GlobeOuter_EM_positive_x.jpg",
	"GlobeOuter_EM_negative_x.jpg",
	"GlobeOuter_EM_positive_y.jpg",
	"GlobeOuter_EM_negative_y.jpg",
	"GlobeOuter_EM_positive_z.jpg",
	"GlobeOuter_EM_negative_z.jpg"
};

static string g_bubbleUrls = "OpenGL" + slash + "Aquarium" + slash + "assets" + slash + "static_assets" + slash + "bubble.png";

struct ConstUniforms
{
	float fishLength;
	float fishWaveLength;
	float fishBendAmount;
};

struct Fish {
	string name;
	float speed;
	float speedRange;
	float radius;
	float radiusRange;
	float tailSpeed;
	float heightOffset;
	float heightRange;

	ConstUniforms constUniforms;

	bool lasers;
	float laserRot;
	float laserOff[3];
	float laserScale[3];
	vector<int> num;
	vector<FishPer> fishData;
};

typedef struct FishConst_
{
	GenericConst genericConst;
	ConstUniforms constUniforms;
}FishConst;

static FishConst fishConst;

static Fish g_fishTable[] = { { "SmallFishA", 1.0f, 1.5f, 30.0f, 25.0f, 10.0f, 0.0f, 16.0f, {10.0f, 1.0f, 2.0f} },
    { "MediumFishA", 1.0f, 2.0f, 10.0f, 20.0f, 1.0f, 0.0f, 16.0f, {10.0f, -2.0f, 2.0f} },
    { "MediumFishB", 0.5f, 4.0f, 10.0f, 20.0f, 3.0f, -8.0f, 5.0f, {10.0f, -2.0f, 2.0f} },
    { "BigFishA", 0.5f, 0.5f, 50.0f, 3.0f, 1.5f, 0.0f, 16.0f, {10.0f, -1.0f, 0.5f}, true, 0.04f,{ 0.0f, 0.1f, 9.0f },{ 0.3f, 0.3f, 1000.0f } },
    { "BigFishB", 0.5f, 0.5f, 45.0f, 3.0f, 1.0f, 0.0f, 16.0f, {10.0f, -0.7f, 0.3f}, true, 0.04f,{ 0.0f, -0.3f, 9.0f },{ 0.3f, 0.3f, 1000.0f } } };
#endif
