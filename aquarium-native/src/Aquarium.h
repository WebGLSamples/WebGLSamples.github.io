// Aquarium.h: Define global variables, enums, constant variables and Class Aquarium.

#pragma once
#ifndef AQUARIUM_H
#define AQUARIUM_H 1

#include <string>
#include <unordered_map>

#include "Context.h"
#include "ContextFactory.h"
#include "FPSTimer.h"
#include "Model.h"
#include "Program.h"
#include "Texture.h"

class ContextFactory;
class Context;
class Texture;
class Program;
class Model;

#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
const std::string slash = "\\";
#define M_PI 3.141592653589793
#else
const std::string slash = "/";
#include "math.h"
#endif

const std::string repoFolder     = "aquarium";
const std::string sourceFolder   = "src";
const std::string shaderFolder   = "shaders";
const std::string resourceFolder = "assets";

enum MODELNAME : short
{
    MODELRUINCOlOMN,
    MODELARCH,
    MODELROCKA,
    MODELROCKB,
    MODELROCKC,
    MODELSUNKNSHIP,
    MODELFLOORCENTER,
    MODELFLOORBASE_BAKED,
    MODELSUNKNSUB,
    MODELCORAL,
    MODELSTONE,
    MODELSTONES,
    MODELCORALSTONEA,
    MODELCORALSTONEB,
    MODELGLOBEBASE,
    MODELTREASURECHEST,
    MODELENVIRONMENTBOX,
    MODELSUPPORTBEAMS,
    MODELSKYBOX,
    MODELGLOBEINNER,
    MODELSEAWEEDA,
    MODELSEAWEEDB,
    MODELSMALLFISHA,
    MODELMEDIUMFISHA,
    MODELMEDIUMFISHB,
    MODELBIGFISHA,
    MODELBIGFISHB,
    MODELMAX
};

enum MODELGROUP : short
{
    FISH,
    INNER,
    SEAWEED,
    GENERIC,
    OUTSIDE,
    GROUPMAX
};

struct G_sceneInfo
{
    std::string namestr;
    MODELNAME name;
    std::string program[2];
    bool fog;
    MODELGROUP type;
    bool blend;
};

enum FISHENUM : short
{
    BIG,
    MEDIUM,
    SMALL,
    MAX
};

const G_sceneInfo g_sceneInfo[] = {
    {"SmallFishA",
     MODELNAME::MODELSMALLFISHA,
     {"fishVertexShader", "fishReflectionFragmentShader"},
     true,
     MODELGROUP::FISH},
    {"MediumFishA",
     MODELNAME::MODELMEDIUMFISHA,
     {"fishVertexShader", "fishNormalMapFragmentShader"},
     true,
     MODELGROUP::FISH},
    {"MediumFishB",
     MODELNAME::MODELMEDIUMFISHB,
     {"fishVertexShader", "fishReflectionFragmentShader"},
     true,
     MODELGROUP::FISH},
    {"BigFishA",
     MODELNAME::MODELBIGFISHA,
     {"fishVertexShader", "fishNormalMapFragmentShader"},
     true,
     MODELGROUP::FISH},
    {"BigFishB",
     MODELNAME::MODELBIGFISHB,
     {"fishVertexShader", "fishNormalMapFragmentShader"},
     true,
     MODELGROUP::FISH},
    {"Arch", MODELNAME::MODELARCH, {"", ""}, true, MODELGROUP::GENERIC},
    {"Coral", MODELNAME::MODELCORAL, {"", ""}, true, MODELGROUP::GENERIC},
    {"CoralStoneA", MODELNAME::MODELCORALSTONEA, {"", ""}, true, MODELGROUP::GENERIC},
    {"CoralStoneB", MODELNAME::MODELCORALSTONEB, {"", ""}, true, MODELGROUP::GENERIC},
    {"EnvironmentBox",
     MODELNAME::MODELENVIRONMENTBOX,
     {"diffuseVertexShader", "diffuseFragmentShader"},
     false,
     MODELGROUP::OUTSIDE},
    {"FloorBase_Baked", MODELNAME::MODELFLOORBASE_BAKED, {"", ""}, true, MODELGROUP::GENERIC},
    {"FloorCenter", MODELNAME::MODELFLOORCENTER, {"", ""}, true, MODELGROUP::GENERIC},
    {"GlobeBase",
     MODELNAME::MODELGLOBEBASE,
     {"diffuseVertexShader", "diffuseFragmentShader"},
     false,
     MODELGROUP::GENERIC},
    {"GlobeInner",
     MODELNAME::MODELGLOBEINNER,
     {"innerRefractionMapVertexShader", "innerRefractionMapFragmentShader"},
     true,
     MODELGROUP::INNER},
    {"RockA", MODELNAME::MODELROCKA, {"", ""}, true, MODELGROUP::GENERIC},
    {"RockB", MODELNAME::MODELROCKB, {"", ""}, true, MODELGROUP::GENERIC},
    {"RockC", MODELNAME::MODELROCKC, {"", ""}, true, MODELGROUP::GENERIC},
    {"RuinColumn", MODELNAME::MODELRUINCOlOMN, {"", ""}, true, MODELGROUP::GENERIC},
    {"Stone", MODELNAME::MODELSTONE, {"", ""}, true, MODELGROUP::GENERIC},
    {"Stones", MODELNAME::MODELSTONES, {"", ""}, true, MODELGROUP::GENERIC},
    {"SunknShip", MODELNAME::MODELSUNKNSHIP, {"", ""}, true, MODELGROUP::GENERIC},
    {"SunknSub", MODELNAME::MODELSUNKNSUB, {"", ""}, true, MODELGROUP::GENERIC},
    {"SeaweedA",
     MODELNAME::MODELSEAWEEDA,
     {"seaweedVertexShader", "seaweedFragmentShader"},
     false,
     MODELGROUP::SEAWEED,
     true},
    {"SeaweedB",
     MODELNAME::MODELSEAWEEDB,
     {"seaweedVertexShader", "seaweedFragmentShader"},
     false,
     MODELGROUP::SEAWEED,
     true},
    {"Skybox",
     MODELNAME::MODELSKYBOX,
     {"diffuseVertexShader", "diffuseFragmentShader"},
     false,
     MODELGROUP::OUTSIDE},
    {"SupportBeams", MODELNAME::MODELSUPPORTBEAMS, {"", ""}, false, MODELGROUP::OUTSIDE},
    {"TreasureChest", MODELNAME::MODELTREASURECHEST, {"", ""}, true, MODELGROUP::GENERIC}};

const std::vector<std::string> g_skyBoxUrls = {
    "GlobeOuter_EM_positive_x.jpg", "GlobeOuter_EM_negative_x.jpg", "GlobeOuter_EM_positive_y.jpg",
    "GlobeOuter_EM_negative_y.jpg", "GlobeOuter_EM_positive_z.jpg", "GlobeOuter_EM_negative_z.jpg"};

struct Fish
{
    std::string name;
    MODELNAME modelName;
    FISHENUM type;
    float speed;
    float speedRange;
    float radius;
    float radiusRange;
    float tailSpeed;
    float heightOffset;
    float heightRange;

    float fishLength;
    float fishWaveLength;
    float fishBendAmount;

    bool lasers;
    float laserRot;
    float laserOff[3];
    float laserScale[3];
    int num;
};

static Fish fishTable[] = {{"SmallFishA", MODELNAME::MODELSMALLFISHA, FISHENUM::SMALL, 1.0f, 1.5f,
                            30.0f, 25.0f, 10.0f, 0.0f, 16.0f, 10.0f, 1.0f, 2.0f},
                           {"MediumFishA", MODELNAME::MODELMEDIUMFISHA, FISHENUM::MEDIUM, 1.0f,
                            2.0f, 10.0f, 20.0f, 1.0f, 0.0f, 16.0f, 10.0f, -2.0f, 2.0f},
                           {"MediumFishB", MODELNAME::MODELMEDIUMFISHB, FISHENUM::MEDIUM, 0.5f,
                            4.0f, 10.0f, 20.0f, 3.0f, -8.0f, 5.0f, 10.0f, -2.0f, 2.0f},
                           {"BigFishA",    MODELNAME::MODELBIGFISHA,
                            FISHENUM::BIG, 0.5f,
                            0.5f,          50.0f,
                            3.0f,          1.5f,
                            0.0f,          16.0f,
                            10.0f,         -1.0f,
                            0.5f,          true,
                            0.04f,         0.0f,
                            0.1f,          9.0f,
                            0.3f,          0.3f,
                            1000.0f},
                           {"BigFishB",    MODELNAME::MODELBIGFISHB,
                            FISHENUM::BIG, 0.5f,
                            0.5f,          45.0f,
                            3.0f,          1.0f,
                            0.0f,          16.0f,
                            10.0f,         -0.7f,
                            0.3f,          true,
                            0.04f,         0.0f,
                            -0.3f,         9.0f,
                            0.3f,          0.3f,
                            1000.0f}};

constexpr float g_tailOffsetMult      = 1.0f;
constexpr float g_endOfDome           = static_cast<float>(M_PI / 8);
constexpr float g_tankRadius          = 74.0f;
constexpr float g_tankHeight          = 36.0f;
constexpr float g_standHeight         = 25.0f;
constexpr float g_sharkSpeed          = 0.3f;
constexpr float g_sharkClockOffset    = 17.0f;
constexpr float g_sharkXClock         = 1.0f;
constexpr float g_sharkYClock         = 0.17f;
constexpr float g_sharkZClock         = 1.0f;
constexpr int g_numBubbleSets         = 10;
constexpr float g_laserEta            = 1.2f;
constexpr float g_laserLenFudge       = 1.0f;
constexpr int g_numLightRays          = 5;
constexpr int g_lightRayY             = 50;
constexpr int g_lightRayDurationMin   = 1;
constexpr int g_lightRayDurationRange = 1;
constexpr int g_lightRaySpeed         = 4;
constexpr int g_lightRaySpread        = 7;
constexpr int g_lightRayPosRange      = 20;
constexpr float g_lightRayRotRange    = 1.0f;
constexpr float g_lightRayRotLerp     = 0.2f;
constexpr float g_lightRayOffset =
    static_cast<float>(M_PI * 2 / static_cast<float>(g_numLightRays));
constexpr float g_bubbleTimer = 0.0f;
constexpr int g_bubbleIndex   = 0;

constexpr int g_numFishSmall             = 100;
constexpr int g_numFishMedium            = 1000;
constexpr int g_numFishBig               = 10000;
constexpr int g_numFishLeftSmall         = 80;
constexpr int g_numFishLeftBig           = 160;
constexpr float g_sand_shininess         = 5.0f;
constexpr float g_sand_specularFactor    = 0.3f;
constexpr float g_generic_shininess      = 50.0f;
constexpr float g_generic_specularFactor = 1.0f;
constexpr float g_outside_shininess      = 50.0f;
constexpr float g_outside_specularFactor = 0.0f;
constexpr float g_seaweed_shininess      = 50.0f;
constexpr float g_seaweed_specularFactor = 1.0f;
constexpr float g_inner_shininess        = 50.0f;
constexpr float g_inner_specularFactor   = 1.0f;
constexpr float g_fish_shininess         = 5.0f;
constexpr float g_fish_specularFactor    = 0.3f;

constexpr float g_speed           = 1.0f;
constexpr float g_targetHeight    = 63.3f;
constexpr float g_targetRadius    = 91.6f;
constexpr float g_eyeHeight       = 7.5f;
constexpr float g_eyeSpeed        = 0.0258f;
constexpr float g_filedOfView     = 82.699f;
constexpr float g_ambientRed      = 0.218f;
constexpr float g_ambientGreen    = 0.502f;
constexpr float g_ambientBlue     = 0.706f;
constexpr float g_fogPower        = 16.5f;
constexpr float g_fogMult         = 1.5f;
constexpr float g_fogOffset       = 0.738f;
constexpr float g_fogRed          = 0.338f;
constexpr float g_fogGreen        = 0.81f;
constexpr float g_fogBlue         = 1.0f;
constexpr float g_fishHeightRange = 1.0f;
constexpr float g_fishHeight      = 25.0f;
constexpr float g_fishSpeed       = 0.124f;
constexpr float g_fishOffset      = 0.52f;
constexpr float g_fishXClock      = 1.0f;
constexpr float g_fishYClock      = 0.556f;
constexpr float g_fishZClock      = 1.0f;
constexpr float g_fishTailSpeed   = 1.0f;
constexpr float g_refractionFudge = 3.0f;
constexpr float g_eta             = 1.0f;
constexpr float g_tankColorFudge  = 0.796f;
constexpr float g_fovFudge        = 1.0f;
constexpr float g_net_offset[3]   = {0.0f, 0.0f, 0.0f};
constexpr float g_net_offsetMult  = 1.21f;
constexpr float g_eyeRadius       = 13.2f;
constexpr float g_fieldOfView     = 82.699f;

struct Global
{
    float projection[16];
    float view[16];
    float world[16];
    float worldInverse[16];
    float worldInverseTraspose[16];
    float viewProjection[16];
    float worldViewProjection[16];
    float viewInverse[16];
    float viewProjectionInverse[16];
    float skyView[16];
    float skyViewProjection[16];
    float skyViewProjectionInverse[16];
    float eyePosition[3];
    float target[3];
    float up[3] = {0, 1, 0};
    float lightWorldPos[3];
    float v3t0[3];
    float v3t1[3];
    float m4t0[16];
    float m4t1[16];
    float m4t2[16];
    float m4t3[16];
    float colorMult[4]  = {1, 1, 1, 1};
    float lightColor[4] = {1.0f, 1.0f, 1.0f, 1.0f};
    float specular[4]   = {1.0f, 1.0f, 1.0f, 1.0f};
    float ambient[4];
    float fogColor[4] = {g_fogRed, g_fogGreen, g_fogBlue, 1.0f};
    float then;
    float mclock;
    float eyeClock;
};

class Aquarium
{
  public:
    Aquarium();
    ~Aquarium();
    void init(int argc, char **argv);
    void display();

  private:
    void render();
    Global g;
    unordered_map<std::string, MODELNAME> mModelEnumMap;
    std::unordered_map<std::string, Texture *> mTextureMap;
    std::unordered_map<std::string, Program *> mProgramMap;
    Model *mAquariumModels[MODELNAME::MODELMAX];
    Context *context;
    FPSTimer fpsTimer;  // object to measure frames per second;
    int mFishCount;
    std::string mBackendpath;
    std::string mPath;
    ContextFactory *factory;

    void updateUrls();
    void loadReource();
    void loadPlacement();
    void loadModels();
    void loadModel(const G_sceneInfo &info);
    void setupModelEnumMap();
    void setUpSkyBox(std::vector<std::string> *skyUrls);
    void calculateFishCount();
    float degToRad(float degrees);
    void updateWorldMatrixAndDraw(const Model *model);
    void updateGlobalUniforms();
    void drawBackground();
    void drawFishes();
    void drawSeaweed();
    void drawInner();
    void drawOutside();
    void updateWorldProjections(const float *world);
};

#endif
