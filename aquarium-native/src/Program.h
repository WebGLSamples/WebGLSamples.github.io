// Program.h: Define base class for Programs of specific backends.

#pragma once
#ifndef PROGRAM_H
#define PROGRAM_H 1

#include <string>
#include <vector>
#include "Aquarium.h"
#include "Buffer.h"
#include "Texture.h"

enum UNIFORMNAME : short;

class Program
{
  public:
    Program(){};
    Program(std::string vertexShader, std::string fragmentShader)
        : vId(vertexShader), fId(fragmentShader)
    {
    }
    virtual ~Program(){};
    virtual void setProgram()                                       = 0;

  protected:
    std::string vId;
    std::string fId;
};

#endif // !PROGRAM_H

