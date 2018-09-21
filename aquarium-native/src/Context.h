// Context.h: Defines the accessing to graphics API of a graphics backend.

#pragma once
#ifndef Context_H
#define Context_H 1

#include <string>

#include "Aquarium.h"
#include "Buffer.h"
#include "Model.h"
#include "Program.h"
#include "Texture.h"

#include <string>
#include <vector>

class Aquarium;
class Program;
class Buffer;
class Texture;
class Model;

enum MODELGROUP : short;
enum MODELNAME : short;
struct Global;

class Context
{
  public:
    Context(){};
    virtual bool createContext()                                                           = 0;
    virtual ~Context() {};
    virtual Texture *createTexture(std::string name, std::string url)                      = 0;
    virtual Texture *createTexture(std::string name, const std::vector<std::string> &urls) = 0;
    virtual Buffer *createBuffer(int numComponents,
                                 const std::vector<float> &buffer,
                                 bool isIndex)                                             = 0;
    virtual Buffer *createBuffer(int numComponents,
                                 const std::vector<unsigned short> &buffer,
                                 bool isIndex)                                             = 0;
    virtual Program *createProgram(std::string vId, std::string fId)                       = 0;
    virtual void setWindowTitle(const std::string &text)                                   = 0;
    virtual bool ShouldQuit()                                                              = 0;
    virtual void KeyBoardQuit()                                                            = 0;
    virtual void DoFlush()                                                                 = 0;
    virtual void Terminate()                                                               = 0;

    virtual void resetState()                 = 0;
    virtual void enableBlend(bool flag) const = 0;

    const int getClientWidth() const { return mClientWidth; };
    const int getclientHeight() const { return mClientHeight; };

    virtual Model *createModel(Global *g, MODELGROUP type, MODELNAME name, bool blend) = 0;

  protected:
    int mClientWidth;
    int mClientHeight;
};

#endif
