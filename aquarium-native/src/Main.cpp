// Main.cpp: Create context and window for OpenGL graphics API.
// Data preparation, load resources and wrap them into scenes.
// Implements logic of rendering background, fishes, seaweeds and
// other models. Calculate fish count for each type of fish.
// Update uniforms for each frame. Show fps for each frame.

#ifdef _WIN32
#include <direct.h>
#include "Windows.h"
#elif __APPLE__
#include <mach-o/dyld.h>
#else
#include <unistd.h>
#endif

#include <cmath>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

#include "ASSERT.h"
#include "Globals.h"
#include "Matrix.h"
#include "Model.h"
#include "Program.h"
#include "rapidjson/document.h"
#include "rapidjson/istreamwrapper.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"

#include "GLFW/glfw3.h"

#define min(a,b) ((a)<(b)?(a):(b))

void render();

// Define glfw window and the size of window
GLFWwindow *window;
int clientWidth;
int clientHeight;

// Get current path of the binary
std::string path;

// The number of fish is passed from cmd args directly
int g_numFish;

// Variables calculate time
float then = 0.0f;
float mClock = 0.0f;
float eyeClock = 0.0f;

void setGenericConstMatrix(GenericConst& genericConst) {
    genericConst.viewProjection = &viewProjection;
    genericConst.viewInverse    = &viewInverse;
    genericConst.lightWorldPos  = &lightWorldPos;
    genericConst.lightColor     = &lightColor;
    genericConst.specular       = &specular;
    genericConst.ambient        = &ambient;
    genericConst.fogColor       = &fogColor;
}

void setGenericPer(GenericPer& genericPer)
{
    genericPer.world                 = &world;
    genericPer.worldViewProjection   = &worldViewProjection;
    genericPer.worldInverse          = &worldInverse;
    genericPer.worldInverseTranspose = &worldInverseTraspose;
}

void initializeUniforms() {
    sandConst.shininess      = sand_shininess;
    sandConst.specularFactor = sand_specularFactor;

    genericConst.shininess      = generic_shininess;
    genericConst.specularFactor = generic_specularFactor;

    outsideConst.shininess      = outside_shininess;
    outsideConst.specularFactor = outside_shininess;

    seaweedConst.shininess      = seaweed_shininess;
    seaweedConst.specularFactor = seaweed_specularFactor;

    innerConst.shininess                   = inner_shininess;
    innerConst.specularFactor              = inner_specularFactor;
    innerConst.eta                         = g_viewSettings.eta;
    innerConst.refractionFudge             = g_viewSettings.refractionFudge;
    innerConst.tankColorFudge              = g_viewSettings.tankColorFudge;

    fishConst.genericConst.shininess      = fish_shininess;
    fishConst.genericConst.specularFactor = fish_specularFactor;

    setGenericConstMatrix(sandConst);
    setGenericConstMatrix(genericConst);
    setGenericConstMatrix(seaweedConst);
    setGenericConstMatrix(innerConst);
    setGenericConstMatrix(outsideConst);
    setGenericConstMatrix(fishConst.genericConst);
    setGenericPer(sandPer);
    setGenericPer(genericPer);
    setGenericPer(seaweedPer);
    setGenericPer(innerPer);
    setGenericPer(outsidePer);
    setGenericPer(laserPer);

    skyConst.viewProjectionInverse = &viewProjectionInverse;

    fishPer.worldPosition.resize(3);
    fishPer.nextPosition.resize(3);
}

void initializeGlobalInfo()
{
    for (auto &value : g_ui)
    {
        g[value.obj][value.name] = value.value;
    }
}

// Load json file from assets. Initialize g_sceneGroups and classify groups.
void LoadPlacement()
{
    std::ostringstream oss;
    oss << path << sourceFolder << slash << resourceFolder << slash
        << "PropPlacement.js";
    std::string proppath = oss.str();
    std::ifstream PlacementStream(proppath, std::ios::in);
    rapidjson::IStreamWrapper isPlacement(PlacementStream);
    rapidjson::Document document;
    document.ParseStream(isPlacement);

    ASSERT(document.IsObject());

    ASSERT(document.HasMember("objects"));
    const rapidjson::Value &objects = document["objects"];
    ASSERT(objects.IsArray());

    for (auto &info : g_sceneInfo)
    {
        g_sceneInfoByName[info.name] = info;
    }

        for (rapidjson::SizeType i = 0; i < objects.Size(); ++i)
        {
            const rapidjson::Value &name        = objects[i]["name"];
            const rapidjson::Value &worldMatrix = objects[i]["worldMatrix"];
            ASSERT(worldMatrix.IsArray() && worldMatrix.Size() == 16);

            std::string groupName = g_sceneInfoByName[name.GetString()].group;
            if (groupName == "")
            {
                groupName = "base";
            }

            std::multimap<std::string, std::vector<float>> &group = g_sceneGroups[groupName];

            std::vector<float> matrix;
            for (rapidjson::SizeType j = 0; j < worldMatrix.Size(); ++j)
            {
                matrix.push_back(worldMatrix[j].GetFloat());
            }
            group.insert(make_pair(name.GetString(), matrix));
        }
}

Scene *loadScene(const std::string &name, std::string *opt_programIds, bool fog)
{
    Scene *scene = new Scene(opt_programIds, fog);
    scene->load(path, name);
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

void onDestroy()
{
    for (auto &program : g_programMap)
    {
        if (program.second != nullptr)
        {
            delete program.second;
            program.second = nullptr;
        }
    }

    for (auto &texture : g_textureMap)
    {
        if (texture.second != nullptr)
        {
            delete texture.second;
            texture.second = nullptr;
        }
    }

    for (auto &scene : g_scenes)
    {
        delete scene.second;
    }
}

void getCurrentPath()
{
    // Get path of current build.
    char temp[100];
#if defined(WIN32) || defined(_WIN32) || defined(__WIN32)
    GetModuleFileName(NULL, temp, MAX_PATH);
    path = std::string(temp);
    size_t nPos = path.find_last_of(slash);
    std::ostringstream oss;
    oss << path.substr(0, nPos) << slash << ".." << slash << ".." << slash;
    path = oss.str();
#elif __APPLE__
    uint32_t size = sizeof(temp);
    _NSGetExecutablePath(temp, &size);
    path = std::string(temp);
    int nPos = path.find_last_of(slash);
    std::ostringstream oss;
    oss << path.substr(0, nPos) << slash << ".." << slash;
    path = oss.str();
#else
    ssize_t count = readlink("/proc/self/exe", temp, sizeof(temp));
    path = std::string(temp);
    int nPos = path.find_last_of(slash);
    std::ostringstream oss;
    oss << path.substr(0, nPos) << slash << ".." << slash;
    path = oss.str();
#endif
}

void initialize(int argc, char** argv)
{
    getCurrentPath();

    glEnable(GL_DEPTH_TEST);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    initializeGlobalInfo();
    initializeUniforms();
    LoadPlacement();

    LoadScenes();

    // "--num-fish" {numfish}: imply rendering fish count.
    char* pNext;
    for (int i = 1; i < argc; ++i)
    {
        std::string cmd(argv[i]);
        if (cmd == "--num-fish")
        {
            g_numFish = strtol(argv[i++ + 1], &pNext, 10);
        }
    }

    // Calculate fish count for each float of fish
    std::string floats[3] = {"Big", "Medium", "Small"};
    int totalFish = g_numFish;
        int numLeft = totalFish;
        for (auto &type : floats)
        {
            for (auto &fishInfo : g_fishTable)
            {
                std::string &fishName = fishInfo.name;
                if (fishName.find(type))
                {
                    continue;
                }
                int numfloat = numLeft;
                if (type == "Big")
                {
                    int temp = totalFish < numFishSmall ? 1 : 2;
                    numfloat = min(numLeft, temp);
                }
                else if (type == "Medium")
                {
                    if (totalFish < numFishMedium)
                    {
                        numfloat = min(numLeft, totalFish / 10);
                    }
                    else if (totalFish < numFishBig)
                    {
                        numfloat = min(numLeft, numFishLeftSmall);
                    }
                    else
                    {
                        numfloat = min(numLeft, numFishLeftBig);
                    }
                }
                numLeft = numLeft - numfloat;
                fishInfo.num = numfloat;
            }
    }
}

int main(int argc, char **argv) {

    // initialize GLFW
    if (!glfwInit())
    {
        std::cout << stderr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }

    glfwWindowHint(GLFW_SAMPLES, 4);

#ifdef __APPLE__
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
#elif _WIN32 || __linux__
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 5);
#endif
    
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

    GLFWmonitor *pMonitor = glfwGetPrimaryMonitor();
    const GLFWvidmode *mode = glfwGetVideoMode(pMonitor);
    clientWidth = mode->width;
    clientHeight = mode->height;

    window = glfwCreateWindow(clientWidth, clientHeight, "Aquarium", NULL, NULL);
    if (window == NULL)
    {
        std::cout << "Failed to open GLFW window." << std::endl;
        glfwTerminate();
        return false;
    }
    glfwWindowHint(GLFW_DECORATED, GL_FALSE);
    glfwMakeContextCurrent(window);

    if (!gladLoadGL())
    {
        std::cout << "Something went wrong!" << std::endl;
        exit(-1);
    }

    const char *renderer = (const char *)glGetString(GL_RENDERER);
    std::cout << renderer << std::endl;

    // Get the resolution of screen. The resolution on mac is about 4 times larger than size of
    // window.
    glfwGetFramebufferSize(window, &clientWidth, &clientHeight);
    glViewport(0, 0, clientWidth, clientHeight);

    initialize(argc, argv);

    while (!glfwWindowShouldClose(window))
    {
        if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
            glfwSetWindowShouldClose(window, GL_TRUE);

        render();

        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    glfwTerminate();

    onDestroy();

    return 0;
}

void DrawGroup(std::multimap<std::string, std::vector<float>> &group,
               GenericConst &constUniforms,
               GenericPer &perUniforms)
{
    Model *currentModel = nullptr;
    int ii              = 0;
    for (auto &object : group)
    {
        if (g_scenes.find(object.first) == g_scenes.end())
        {
            continue;
        }
        auto &scene = g_scenes[object.first];
        auto &info  = g_sceneInfoByName[object.first];

        if (info.blend)
        {
            glEnable(GL_BLEND);
        }
        else
        {
            glDisable(GL_BLEND);
        }

        auto &models = scene->getModels();
        for (auto &model : models)
        {
            if (model != currentModel)
            {
                currentModel = model;
                model->drawPrep(constUniforms);
            }

            world = std::vector<float>(object.second.begin(), object.second.end());
            matrix::mulMatrixMatrix4(worldViewProjection, world, viewProjection);
            matrix::inverse4(worldInverse, world);
            matrix::transpose4(worldInverseTraspose, worldInverse);
            perUniforms.time = mClock + (ii++);
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
    if (then == 0.0f)
    {
        elapsedTime = 0.0f;
    }
    else
    {
        elapsedTime = now - then;
    }
    then = now;

    g_fpsTimer.update(elapsedTime);
    std::cout << "FPS: " << g_fpsTimer.getAverageFPS() << std::endl;
    std::string text =
        "Aquarium FPS: " + std::to_string(static_cast<unsigned int>(g_fpsTimer.getAverageFPS()));
    glfwSetWindowTitle(window, text.c_str());

    mClock += elapsedTime * g_speed;
    eyeClock += elapsedTime * g_viewSettings.eyeSpeed;

    eyePosition[0] = sin(eyeClock) * g_viewSettings.eyeRadius;
    eyePosition[1] = g_viewSettings.eyeHeight;
    eyePosition[2] = cos(eyeClock) * g_viewSettings.eyeRadius;
    target[0]      = static_cast<float>(sin(eyeClock + M_PI)) * g_viewSettings.targetRadius;
    target[1]      = g_viewSettings.targetHeight;
    target[2]      = static_cast<float>(cos(eyeClock + M_PI)) * g_viewSettings.targetRadius;

    ambient[0] = g_viewSettings.ambientRed;
    ambient[1] = g_viewSettings.ambientGreen;
    ambient[2] = g_viewSettings.ambientBlue;

    glColorMask(true, true, true, true);
    glClearColor(0, 0.8f, 1, 0);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);

    float nearPlane = 1;
    float farPlane  = 25000.0f;
    float aspect    = static_cast<float>(clientWidth) / static_cast<float>(clientHeight);
    float top       = tan(matrix::degToRad(g_viewSettings.fieldOfView * g_fovFudge) * 0.5f) * nearPlane;
    float bottom    = -top;
    float left      = aspect * bottom;
    float right     = aspect * top;
    float width     = abs(right - left);
    float height    = abs(top - bottom);
    float xOff      = width * g_net_offset[0] * g_net_offsetMult;
    float yOff      = height * g_net_offset[1] * g_net_offsetMult;

    matrix::frustum(projection, left + xOff, right + xOff, bottom + yOff, top + yOff, nearPlane,
                    farPlane);
    matrix::cameraLookAt(viewInverse, eyePosition, target, up);
    matrix::inverse4(view, viewInverse);
    matrix::mulMatrixMatrix4(viewProjection, view, projection);
    matrix::inverse4(viewProjectionInverse, viewProjection);

    skyView     = view;
    skyView[12] = 0.0;
    skyView[13] = 0.0;
    skyView[14] = 0.0;
    matrix::mulMatrixMatrix4(skyViewProjection, skyView, projection);
    matrix::inverse4(skyViewProjectionInverse, skyViewProjection);

    matrix::getAxis(v3t0, viewInverse, 0);
    matrix::getAxis(v3t1, viewInverse, 1);
    matrix::mulScalarVector(20.0f, v3t0);
    matrix::mulScalarVector(30.0f, v3t1);
    matrix::addVector(lightWorldPos, eyePosition, v3t0);
    matrix::addVector(lightWorldPos, lightWorldPos, v3t1);

    glDisable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glBlendEquation(GL_FUNC_ADD);
    glEnable(GL_CULL_FACE);
    
    matrix::resetPseudoRandom();

    glDepthMask(true);

    if (g_fog)
    {
        genericConst.fogPower             = g_viewSettings.fogPower;
        genericConst.fogMult              = g_viewSettings.fogMult;
        genericConst.fogOffset            = g_viewSettings.fogOffset;
        fishConst.genericConst.fogPower   = g_viewSettings.fogPower;
        fishConst.genericConst.fogMult    = g_viewSettings.fogMult;
        fishConst.genericConst.fogOffset  = g_viewSettings.fogOffset;
        innerConst.fogPower               = g_viewSettings.fogPower;
        innerConst.fogMult                = g_viewSettings.fogMult;
        innerConst.fogOffset              = g_viewSettings.fogOffset;
        seaweedConst.fogPower             = g_viewSettings.fogPower;
        seaweedConst.fogMult              = g_viewSettings.fogMult;
        seaweedConst.fogOffset            = g_viewSettings.fogOffset;
        fogColor[0]                     = g_viewSettings.fogRed;
        fogColor[1]                     = g_viewSettings.fogGreen;
        fogColor[2]                     = g_viewSettings.fogBlue;
    }

    // Draw Scene
    if (g_sceneGroups.find("base") != g_sceneGroups.end())
    {
        DrawGroup(g_sceneGroups["base"], genericConst, genericPer);
    }

    // Draw Fishes
    glEnable(GL_BLEND);
    for (auto &fishInfo : g_fishTable)
    {
        std::string &fishName = fishInfo.name;
        int numFish           = fishInfo.num;

        Scene *scene = g_scenes[fishName];
        if (scene->loaded)
        {
            Model *fish             = scene->getModels()[0];
            auto &f                 = g["fish"];
            fishConst.constUniforms = fishInfo.constUniforms;
            fish->drawPrep(fishConst);
            float fishBaseClock                  = mClock * f["fishSpeed"];
            float fishRadius                     = fishInfo.radius;
            float fishRadiusRange                = fishInfo.radiusRange;
            float fishSpeed                      = fishInfo.speed;
            float fishSpeedRange                 = fishInfo.speedRange;
            float fishTailSpeed                  = fishInfo.tailSpeed * f["fishTailSpeed"];
            float fishOffset                     = f["fishOffset"];
            float fishClockSpeed                 = f["fishSpeed"];
            float fishHeight                     = f["fishHeight"] + fishInfo.heightOffset;
            float fishHeightRange                = f["fishHeightRange"] * fishInfo.heightRange;
            float fishXClock                     = f["fishXClock"];
            float fishYClock                     = f["fishYClock"];
            float fishZClock                     = f["fishZClock"];
            std::vector<float> &fishPosition     = fishPer.worldPosition;
            std::vector<float> &fishNextPosition = fishPer.nextPosition;
            for (int ii = 0; ii < numFish; ++ii)
            {
                float fishClock = fishBaseClock + ii * fishOffset;
                float speed =
                    fishSpeed + static_cast<float>(matrix::pseudoRandom()) * fishSpeedRange;
                float scale = 1.0f + static_cast<float>(matrix::pseudoRandom()) * 1;
                float xRadius =
                    fishRadius + static_cast<float>(matrix::pseudoRandom()) * fishRadiusRange;
                float yRadius = 2.0f + static_cast<float>(matrix::pseudoRandom()) * fishHeightRange;
                float zRadius =
                    fishRadius + static_cast<float>(matrix::pseudoRandom()) * fishRadiusRange;
                float fishSpeedClock = fishClock * speed;
                float xClock         = fishSpeedClock * fishXClock;
                float yClock         = fishSpeedClock * fishYClock;
                float zClock         = fishSpeedClock * fishZClock;

                fishPosition[0]     = sin(xClock) * xRadius;
                fishPosition[1]     = sin(yClock) * yRadius + fishHeight;
                fishPosition[2]     = cos(zClock) * zRadius;
                fishNextPosition[0] = sin(xClock - 0.04f) * xRadius;
                fishNextPosition[1] = sin(yClock - 0.01f) * yRadius + fishHeight;
                fishNextPosition[2] = cos(zClock - 0.04f) * zRadius;
                fishPer.scale       = scale;

                fishPer.time = fmod((mClock + ii * g_tailOffsetMult) * fishTailSpeed * speed,
                                    static_cast<float>(M_PI) * 2);
                fish->draw(fishPer);
            }
        }
    }

    // Draw tank
    if (g_sceneGroups.find("inner") != g_sceneGroups.end())
    {
        DrawGroup(g_sceneGroups["inner"], innerConst, innerPer);
    }

    // Draw seaweed
    if (g_sceneGroups.find("seaweed") != g_sceneGroups.end())
    {
        DrawGroup(g_sceneGroups["seaweed"], seaweedConst, seaweedPer);
    }

    // Draw outside
    if (g_sceneGroups.find("outside") != g_sceneGroups.end())
    {
        DrawGroup(g_sceneGroups["outside"], outsideConst, outsidePer);
    }
}
